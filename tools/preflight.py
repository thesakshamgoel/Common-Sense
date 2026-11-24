#!/usr/bin/env python3
"""Common Sense motion pre-flight (playbook Section 0a). Python 3 standard library only.

Usage:
  python3 tools/preflight.py --brief motion-brief.md [--tokens tokens.json] [--frames frames.json] [--strict]

Reads the tables in the filled-in motion brief (Script table, Variety table), an optional
tokens.json (spring damping values) and an optional frames.json (positions per frame).
Every finding is a WARN with a reason, because the playbook is guidance, not law. A warning
can be waived by listing it under Deviations in the brief. --strict exits 1 if any WARN remains.

tokens.json : {"overshoot_cap": 0.05, "springs": {"ui": {"damping": 0.85, "property": "translate"}}}
frames.json : {"fps": 30, "tracks": {"hero": [[x, y], ...], "camera": [[x, y], ...]},
               "hits": [frame, ...], "breaths": [[start, end], ...], "boundaries": [frame, ...]}
"""
import argparse, json, math, re, sys
from statistics import median

warns = []
def warn(check, msg): warns.append((check, msg))

def num(cell):
    m = re.search(r"-?\d+(?:\.\d+)?", cell or "")
    return float(m.group()) if m else None

def tables(text):
    """Return a list of (header_cells, rows) for every markdown table."""
    out, cur = [], []
    for line in text.splitlines() + [""]:
        if line.strip().startswith("|"):
            cur.append([c.strip() for c in line.strip().strip("|").split("|")])
        else:
            if len(cur) >= 2:
                out.append((cur[0], [r for r in cur[2:] if any(r)]))
            cur = []
    return out

def col(header, *keys):
    for i, h in enumerate(header):
        if any(k in h.lower() for k in keys):
            return i
    return None

def cell(row, i):
    return row[i] if i is not None and i < len(row) else ""

def check_script(header, rows):
    iw, ir, ih, ie, ic = (col(header, "words"), col(header, "read time"), col(header, "planned hold"),
                          col(header, "energy"), col(header, "carried"))
    energies = []
    for n, r in enumerate(rows, 1):
        sec = r[0] or f"row {n}"
        read = num(cell(r, ir)) or ((num(cell(r, iw)) or 0) / 2.5 or None)
        hold = num(cell(r, ih))
        if read and hold:
            ratio = hold / read
            if ratio < 1.0 or ratio > 1.5:
                warn("0a-A balance", f"{sec}: hold {hold:g}s / read {read:.2f}s = {ratio:.2f} (wanted 1.0-1.5)")
        e = num(cell(r, ie))
        if e is not None:
            energies.append(e)
        if ic is not None and n < len(rows) and not cell(r, ic).strip(" -"):
            warn("0a-C flow", f"{sec}: nothing named as carried to the next section")
    if len(energies) >= 3 and len(set(energies)) == 1:
        warn("0a-B pacing", f"every section has energy {energies[0]:g}: a flat curve")

def level(s, letter):
    m = re.search(rf"{letter}?\s*([0-3])", s or "", re.I)
    return int(m.group(1)) if m else None

def check_variety(header, rows):
    ix = {k: col(header, k) for k in ("foreground", "background", "colour world", "scale",
                                       "camera move", "layout", "transition", "length")}
    secs = []
    for r in rows:
        secs.append({k: cell(r, i).strip() for k, i in ix.items()} | {"name": r[0]})
    for s in secs:
        f, b = level(s["foreground"], "F"), level(s["background"], "B")
        if f is not None and b is not None and f + b not in (3, 4):
            warn("0a-F seesaw", f"{s['name']}: F{f} + B{b} = {f+b} (wanted 3 or 4)")
    axes = ("scale", "camera move", "layout", "colour world", "background", "transition")
    for a, b in zip(secs, secs[1:]):
        diff = sum(1 for k in axes if a[k].lower() != b[k].lower())
        if diff < 3:
            warn("0a-G variety", f"{a['name']} -> {b['name']}: differ on {diff} of 6 axes (wanted 3+)")
        for k in ("camera move", "transition"):
            if a[k] and a[k].lower() == b[k].lower():
                warn("0a-G variety", f"{a['name']} -> {b['name']}: same {k} twice in a row ({a[k]})")
    lens = [num(s["length"]) for s in secs]
    for i in range(len(lens) - 2):
        w = lens[i:i + 3]
        if all(w) and max(w) <= min(w) * 1.15:
            warn("0a-A metronome", f"{secs[i]['name']}..{secs[i+2]['name']}: three sections within 15% of each other")
    total = sum(x for x in lens if x)
    if 0 < total < 30:
        counts = {}
        for s in secs:
            counts[s["transition"].lower()] = counts.get(s["transition"].lower(), 0) + 1
        for t, c in counts.items():
            if t and c > 2:
                warn("0a-G variety", f"transition '{t}' used {c} times in a film of {total:g}s (wanted 2 or fewer)")

def check_tokens(path):
    d = json.load(open(path))
    cap = d.get("overshoot_cap", 0.05)
    for name, sp in d.get("springs", {}).items():
        z = sp.get("damping")
        if z is None:
            continue
        over = math.exp(-math.pi * z / math.sqrt(1 - z * z)) if 0 < z < 1 else 0.0
        if over > cap:
            warn("3 elasticity", f"spring '{name}': damping {z} overshoots {over*100:.1f}% (cap {cap*100:g}%)")
        if over > 0 and sp.get("property", "").lower() in ("opacity", "color", "colour"):
            warn("3 elasticity", f"spring '{name}': {sp['property']} must never overshoot")

def speeds(track):
    sp = [math.dist(a, b) for a, b in zip(track, track[1:])]
    return [sp[0] if sp else 0.0] + sp  # frame 0 takes frame 1's speed, so a track that starts moving is not a jump

def check_frames(path):
    d = json.load(open(path))
    fps = d.get("fps", 30)
    hits = d.get("hits", [])
    tracks = {k: speeds(v) for k, v in d["tracks"].items()}
    for name, sp in tracks.items():
        peak = max(sp) or 1
        bad = [i for i in range(1, len(sp)) if abs(sp[i] - sp[i-1]) > 0.35 * peak
               and not any(abs(i - h) <= 1 for h in hits)]
        if bad:
            warn("0a-D smoothness", f"{name}: speed jumps over 35% of peak at frames {bad[:5]}{' ...' if len(bad) > 5 else ''}")
        pos = d["tracks"][name]
        moving = [p for p, s in zip(pos, sp) if s > 0]
        if moving and sum(all(abs(c - round(c)) < 1e-9 for c in p) for p in moving) / len(moving) > 0.9:
            warn("0a-D smoothness", f"{name}: positions look rounded to whole pixels while moving")
    n = min(len(v) for v in tracks.values())
    energy = [sum(tracks[k][i] / (max(tracks[k]) or 1) for k in tracks) / len(tracks) for i in range(n)]
    floor = 0.15 * median(energy)
    breaths = d.get("breaths", [])
    run = 0
    for i, e in enumerate(energy + [1e9]):
        if e < floor and not any(a <= i <= b for a, b in breaths):
            run += 1
        else:
            if run > fps * 0.5:
                warn("0a-C flow", f"motion energy below 15% of median for {run/fps:.1f}s ending at frame {i}")
            run = 0
    if "camera" in tracks:
        cpeak = max(tracks["camera"]) or 1
        for b in d.get("boundaries", []):
            if b < len(tracks["camera"]) and tracks["camera"][b] < 0.05 * cpeak:
                warn("0a-C flow", f"camera nearly stopped at section boundary, frame {b}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--brief"); ap.add_argument("--tokens"); ap.add_argument("--frames")
    ap.add_argument("--strict", action="store_true")
    a = ap.parse_args()
    if not (a.brief or a.tokens or a.frames):
        ap.error("give at least one of --brief, --tokens, --frames")
    ran = []
    try:
        if a.brief:
            for header, rows in tables(open(a.brief).read()):
                joined = " ".join(header).lower()
                if "planned hold" in joined:
                    check_script(header, rows); ran.append("script table")
                elif "foreground" in joined:
                    check_variety(header, rows); ran.append("variety table")
        if a.tokens: check_tokens(a.tokens); ran.append("tokens")
        if a.frames: check_frames(a.frames); ran.append("frames")
    except (OSError, ValueError, KeyError) as e:
        print(f"preflight error: {e}"); return 2
    print("checked:", ", ".join(ran) or "nothing (no matching tables found)")
    for c, m in warns:
        print(f"WARN [{c}] {m}")
    print(f"{len(warns)} warning(s). Guidance, not law: waive with a reason under Deviations.")
    return 1 if (a.strict and warns) else 0

if __name__ == "__main__":
    sys.exit(main())

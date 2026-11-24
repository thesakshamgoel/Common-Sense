#!/usr/bin/env python3
"""Measure a reference video: scene lengths, hard cuts, energy per second, stillness, loudness.
Usage: python3 tools/ref_measure.py video.mp4 [--thresh 22]
Needs: python3, numpy, ffmpeg/ffprobe. Reads the file only. Writes nothing.
Numbers are approximate (160x90 grey frames). Use them to set targets, then check by eye."""
import subprocess, sys, json, numpy as np, re

def run(cmd): return subprocess.run(cmd, capture_output=True)

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    path = sys.argv[1]
    th = float(sys.argv[sys.argv.index("--thresh")+1]) if "--thresh" in sys.argv else 22.0
    pr = run(["ffprobe","-v","error","-select_streams","v:0","-show_entries","stream=r_frame_rate","-of","csv=p=0",path])
    if pr.returncode: print("ffprobe failed:", pr.stderr.decode()[:200]); sys.exit(2)
    n, d = pr.stdout.decode().strip().split("/"); fps = float(n)/float(d)
    raw = run(["ffmpeg","-v","error","-i",path,"-vf","scale=160:90,format=gray","-f","rawvideo","-"]).stdout
    a = np.frombuffer(raw, dtype=np.uint8).reshape(-1,90,160).astype(np.float32)
    if len(a) < 10: print("too few frames"); sys.exit(2)
    e = np.abs(np.diff(a,axis=0)).mean(axis=(1,2))
    k = max(1,int(0.25*fps)); b=[]; last=-999
    for i in range(k,len(a)-k):
        v = np.abs(a[i+k]-a[i-k]).mean()
        if v>th:
            if i-last > 0.6*fps: b.append(i)
            last = i
    t = [0]+[i/fps for i in b]+[len(a)/fps]; L=[t[j+1]-t[j] for j in range(len(t)-1)]
    sec = [float(e[int(s*fps):int((s+1)*fps)].mean()) for s in range(int(len(e)/fps))]
    still = float((e<0.15).mean())
    lu = run(["ffmpeg","-nostats","-i",path,"-af","ebur128=peak=true","-f","null","-"]).stderr.decode()
    I = re.findall(r"I:\s+(-?[\d.]+) LUFS",lu); P = re.findall(r"Peak:\s+(-?[\d.]+) dBFS",lu)
    out = {"fps":fps,"duration_s":round(len(a)/fps,2),"scene_boundaries_s":[round(x,2) for x in t],
           "scene_lengths_s":[round(x,2) for x in L],"scene_len_median_s":round(float(np.median(L)),2),
           "scene_len_min_s":round(min(L),2),"scene_len_max_s":round(max(L),2),
           "energy_per_second":[round(x,2) for x in sec],"fraction_frames_nearly_still":round(still,3),
           "loudness_lufs":float(I[-1]) if I else None,"true_peak_dbfs":float(P[-1]) if P else None}
    print(json.dumps(out,indent=1))
main()

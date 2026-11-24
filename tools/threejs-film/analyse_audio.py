#!/usr/bin/env python3
"""Precompute audio levels per video frame so a film can react to music without live playback.
Usage: python3 analyse_audio.py music.mp3 out.json [--fps 30] [--duration 15]
Needs: python3, numpy, ffmpeg. Writes only out.json.
Output: {fps, n, rms[], bass[], mid[], high[], flux[], beats[]} all 0-1 normalised, one value per frame.
beats = approximate onset times (s) from flux peaks, NOT a tempo grid. Check by ear or by plotting."""
import sys, json, subprocess, numpy as np

def main():
    if len(sys.argv) < 3: print(__doc__); sys.exit(2)
    src, out = sys.argv[1], sys.argv[2]
    fps = float(sys.argv[sys.argv.index("--fps")+1]) if "--fps" in sys.argv else 30.0
    dur = float(sys.argv[sys.argv.index("--duration")+1]) if "--duration" in sys.argv else None
    sr = 22050
    cmd = ["ffmpeg","-v","error","-i",src,"-ac","1","-ar",str(sr)] + (["-t",str(dur)] if dur else []) + ["-f","f32le","-"]
    p = subprocess.run(cmd, capture_output=True)
    if p.returncode or not p.stdout: print("decode failed:", p.stderr.decode()[:200]); sys.exit(2)
    x = np.frombuffer(p.stdout, dtype=np.float32)
    n = int(len(x)/sr*fps)
    hop = sr/fps; win = 2048
    rms=[];bass=[];mid=[];high=[]; prev=None; flux=[]
    fr = np.fft.rfftfreq(win, 1/sr)
    for i in range(n):
        c = int(i*hop); seg = x[c:c+win]
        if len(seg) < win: seg = np.pad(seg,(0,win-len(seg)))
        rms.append(float(np.sqrt(np.mean(seg**2))))
        sp = np.abs(np.fft.rfft(seg*np.hanning(win)))
        bass.append(float(sp[(fr>=20)&(fr<150)].sum())); mid.append(float(sp[(fr>=150)&(fr<2000)].sum())); high.append(float(sp[fr>=2000].sum()))
        flux.append(0.0 if prev is None else float(np.maximum(sp-prev,0).sum())); prev = sp
    def norm(a):
        a = np.array(a); m = np.percentile(a,98) or 1.0
        return np.clip(a/m,0,1)
    R,B,M,H,F = map(norm,(rms,bass,mid,high,flux))
    # onsets: local maxima of flux above 0.45 and at least 0.2 s apart
    beats=[]; last=-1
    for i in range(1,n-1):
        if F[i]>0.45 and F[i]>=F[i-1] and F[i]>=F[i+1] and (i-last)/fps>0.2: beats.append(round(i/fps,3)); last=i
    r = lambda a:[round(float(v),3) for v in a]
    json.dump({"fps":fps,"n":n,"rms":r(R),"bass":r(B),"mid":r(M),"high":r(H),"flux":r(F),"beats":beats}, open(out,"w"))
    print(f"ok: {n} frames, {len(beats)} onsets, wrote {out}")
main()

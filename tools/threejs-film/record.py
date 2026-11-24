#!/usr/bin/env python3
"""Record a deterministic web film frame by frame into an MP4 with its audio.
Usage: python3 record.py index.html out.mp4 [--audio music.mp3] [--duration 15] [--fps 30] [--size 1920x1080] [--draft]
The page must define window.renderFrame(t) (draws the exact frame for time t, sync) and a <canvas>.
Optional: window.filmReady (a Promise) that resolves when assets are loaded.
Needs: python3, playwright (python), Chrome or Chromium, ffmpeg. Serves the page's folder on an OS-assigned port.
--draft renders at half size. --query "bg=steel-edge-arc&glow=1" appends to the page URL. Writes frames straight into ffmpeg (no PNG folder). Never touches other files."""
import sys, os, subprocess, threading, http.server, socketserver, functools, base64, time

def arg(name, default=None):
    return sys.argv[sys.argv.index(name)+1] if name in sys.argv else default

def find_chrome():
    for c in ("/usr/bin/google-chrome","/usr/bin/chromium","/usr/bin/chromium-browser","/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"):
        if os.path.exists(c): return c
    return None

def progress(done, total, t0):
    """One line: percent, frame n/N, elapsed, ETA. Also drawn as a bar. Keep this in every render script."""
    el = time.time() - t0; pct = 100.0 * done / total
    eta = el / done * (total - done) if done else 0
    bar = "#" * int(pct // 5) + "-" * (20 - int(pct // 5))
    print(f"[{bar}] {pct:5.1f}%  frame {done}/{total}  elapsed {el:4.0f}s  ETA {eta:4.0f}s", flush=True)

def main():
    if len(sys.argv) < 3: print(__doc__); sys.exit(2)
    page, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    audio = arg("--audio"); dur = float(arg("--duration","15")); fps = int(arg("--fps","30"))
    w, h = map(int, arg("--size","1920x1080").split("x"))
    if "--draft" in sys.argv: w, h = w//2, h//2
    if not os.path.exists(page): print("page not found:", page); sys.exit(2)
    from playwright.sync_api import sync_playwright
    root = os.path.dirname(page)
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self,*a): pass
    H = functools.partial(Q, directory=root)
    srv = socketserver.TCPServer(("127.0.0.1",0), H); port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    n = int(round(dur*fps)); tmp = out + ".tmp.mp4"
    ff = subprocess.Popen(["ffmpeg","-v","error","-y","-f","image2pipe","-framerate",str(fps),"-i","-",
        "-c:v","libx264","-preset","veryfast","-crf","16","-pix_fmt","yuv420p","-r",str(fps),tmp], stdin=subprocess.PIPE)
    with sync_playwright() as pw:
        kw = {"executable_path": find_chrome()} if find_chrome() else {}
        b = pw.chromium.launch(headless=True, args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist","--disable-background-timer-throttling"], **kw)
        pg = b.new_page(viewport={"width":w,"height":h}, device_scale_factor=1)
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        q = arg("--query",""); pg.goto(f"http://127.0.0.1:{port}/{os.path.basename(page)}?w={w}&h={h}" + ("&"+q if q else ""))
        try: pg.evaluate("window.filmReady || Promise.resolve()")
        except Exception as e: print("filmReady failed:", e); sys.exit(2)
        if not pg.evaluate("typeof window.renderFrame==='function'"): print("window.renderFrame is not defined", errs); sys.exit(2)
        t0=time.time()
        for i in range(n):
            pg.evaluate(f"window.renderFrame({i/fps})")
            png = pg.locator("canvas").first.screenshot(type="png")
            ff.stdin.write(png)
            if i % max(1, fps // 2) == 0 or i == n - 1: progress(i + 1, n, t0)
        b.close()
    ff.stdin.close(); ff.wait()
    if ff.returncode: print("ffmpeg failed"); sys.exit(1)
    if audio:
        r = subprocess.run(["ffmpeg","-v","error","-y","-i",tmp,"-i",audio,"-map","0:v","-map","1:a","-c:v","copy","-c:a","aac","-b:a","192k","-t",str(dur),"-af",f"afade=t=out:st={max(dur-0.5,0)}:d=0.5",out])
        if r.returncode: print("mux failed"); sys.exit(1)
        os.remove(tmp)
    else: os.replace(tmp,out)
    pr = subprocess.run(["ffprobe","-v","error","-show_entries","stream=codec_type,width,height,r_frame_rate,nb_frames:format=duration","-of","compact",out],capture_output=True,text=True).stdout
    print("done:", out); print(pr)
    srv.shutdown()
if __name__=="__main__": main()

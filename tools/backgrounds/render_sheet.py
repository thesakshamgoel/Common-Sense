#!/usr/bin/env python3
"""Render the background library as a contact sheet PNG.
Usage: python3 render_sheet.py out.png [--t 0] [--set base|glow|orbs|lit|fx]    Needs playwright (python) and Chrome or Chromium. Writes only out.png."""
import sys, os, threading, http.server, socketserver, functools
def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    out = os.path.abspath(sys.argv[1]); t = sys.argv[sys.argv.index("--t")+1] if "--t" in sys.argv else "0"; sset = sys.argv[sys.argv.index("--set")+1] if "--set" in sys.argv else "base"
    here = os.path.dirname(os.path.abspath(__file__))
    from playwright.sync_api import sync_playwright
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self,*a): pass
    s = socketserver.TCPServer(("127.0.0.1",0), functools.partial(Q, directory=here)); port = s.server_address[1]
    threading.Thread(target=s.serve_forever, daemon=True).start()
    chrome = next((c for c in ("/usr/bin/google-chrome","/usr/bin/chromium","/Applications/Google Chrome.app/Contents/MacOS/Google Chrome") if os.path.exists(c)), None)
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"], **({"executable_path":chrome} if chrome else {}))
        pg = b.new_page(viewport={"width":1960,"height":2300}); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"http://127.0.0.1:{port}/sheet.html?t={t}&set={sset}"); pg.wait_for_function("window.done===true", timeout=120000)
        if errs: print("page errors:", errs); sys.exit(1)
        pg.screenshot(path=out, full_page=True); b.close()
    s.shutdown(); print("wrote", out)
main()

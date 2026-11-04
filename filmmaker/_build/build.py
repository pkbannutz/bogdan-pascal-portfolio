#!/usr/bin/env python3
"""Build the filmmaker section of the portfolio.

Reads filmmaker/_build/projects.json, downloads the stills from the Wix media
servers at near original quality (skips files that already exist), and writes
static HTML pages. Run from anywhere:  python3 filmmaker/_build/build.py
Add  --no-download  to only regenerate the pages.
"""
import concurrent.futures
import html
import json
import os
import sys
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
ASSETS = os.path.join(ROOT, "assets", "filmmaker")
OUT = os.path.join(ROOT, "filmmaker")
DATA = json.load(open(os.path.join(HERE, "projects.json"), encoding="utf-8"))
PROJECTS = DATA["include"]
ABOUT_PHOTO = "14a189_7e37d3565c01442e9a7aca5b79f1e771~mv2.jpg"
EMAIL = "hello@bogdanpascal.com"
IG = [("@bogdan.films", "https://www.instagram.com/bogdan.films"), ("@thebogdanpascal", "https://www.instagram.com/thebogdanpascal")]
E = html.escape


def wix(media_id, width):
    return "https://static.wixstatic.com/media/%s/v1/fit/w_%d,h_%d,q_88/x.jpg" % (media_id, width, width)


def fetch(job):
    url, path = job
    if os.path.exists(path) and os.path.getsize(path) > 2000:
        return (path, "kept")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            body = r.read()
            if not r.headers.get("Content-Type", "").startswith("image/") or len(body) < 2000:
                return (path, "bad response")
        open(path, "wb").write(body)
        return (path, "ok")
    except Exception as ex:  # noqa: BLE001
        return (path, "error %s" % ex)


def download():
    jobs = []
    for p in PROJECTS:
        d = os.path.join(ASSETS, p["slug"])
        jobs.append((wix(p["thumb"], 1600), os.path.join(d, "t.jpg")))
        for n, mid in enumerate(p["ids"], 1):
            jobs.append((wix(mid, 2400), os.path.join(d, "%02d.jpg" % n)))
    jobs.append((wix(ABOUT_PHOTO, 1600), os.path.join(ASSETS, "about", "bogdan.jpg")))
    bad, ok = [], 0
    with concurrent.futures.ThreadPoolExecutor(8) as ex:
        for path, status in ex.map(fetch, jobs):
            if status in ("ok", "kept"):
                ok += 1
            else:
                bad.append((os.path.relpath(path, ROOT), status))
    print("images ok: %d, failed: %d" % (ok, len(bad)))
    for b in bad:
        print("  FAILED", b)
    json.dump(bad, open(os.path.join(HERE, "download-failures.json"), "w"), indent=1)


def have(slug, name):
    return os.path.exists(os.path.join(ASSETS, slug, name))


def stills(p):
    out = []
    for n in range(1, len(p["ids"]) + 1):
        if have(p["slug"], "%02d.jpg" % n):
            out.append("/assets/filmmaker/%s/%02d.jpg" % (p["slug"], n))
    return out


def full_title(p):
    return p["title"] + (": " + p["sub"] if p.get("sub") else "")


def head(title, desc, image=""):
    og = '<meta property="og:image" content="%s">' % E(image) if image else ""
    return """<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s</title><meta name="description" content="%s"><meta property="og:title" content="%s"><meta property="og:description" content="%s">%s<meta name="theme-color" content="#0a0a0a">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/filmmaker/css/film.css"></head><body>
""" % (E(title), E(desc), E(title), E(desc), og)


NAV = """<nav class="nav mono"><a href="/filmmaker/">BP / FILMMAKER</a><div class="links"><a href="/filmmaker/#work">Work</a><a href="/filmmaker/about/">About</a><a href="/filmmaker/contact/">Contact</a></div></nav>
"""


def foot():
    ig = " ".join('<a href="%s" target="_blank" rel="noopener">%s</a>' % (u, E(n)) for n, u in IG)
    return """<footer class="foot"><h2>Let's<br>shoot.</h2><div class="r mono"><a href="mailto:%s">%s</a>%s<a href="/">Bogdan the athlete</a></div></footer>
<div class="legal mono"><span>&copy; Bogdan Pascal</span><span>Filmmaker, DoP and drone operator</span></div>
<script src="/filmmaker/js/film.js"></script></body></html>
""" % (EMAIL, EMAIL, ig)


def fs_for(title):
    n = len(title)
    if n <= 8:
        return 5.2
    if n <= 11:
        return 4.6
    if n <= 14:
        return 3.8
    if n <= 18:
        return 3.2
    return 2.8


def home():
    cards = []
    for i, p in enumerate(PROJECTS):
        if not have(p["slug"], "t.jpg"):
            continue
        t = "/assets/filmmaker/%s/t.jpg" % p["slug"]
        inv = " inv" if p.get("invert") else ""
        sub = "<small>%s</small>" % E(p["sub"]) if p.get("sub") else ""
        cards.append(
            '<a class="card" href="/filmmaker/work/%s/" style="--d:%.1fs" aria-label="%s"><span class="num mono">%02d</span>'
            '<div class="base"><img src="%s" alt="%s" loading="%s"></div>'
            '<div class="mk%s" style="background-image:url(%s);--fs:%svw">%s</div>'
            '<div class="cap"><h3>%s%s</h3><span class="mono">%s</span></div></a>'
            % (p["slug"], (i % 6) * 0.1, E(full_title(p)), i + 1, t, E(full_title(p)), "eager" if i < 6 else "lazy", inv, t, fs_for(p["title"]), E(p["title"]), E(p["title"]), sub, E(p["category"]))
        )
    hero_slugs = [s for s in ["sky-above", "geodome", "speedo", "inanimate-girl", "particle", "thorpepark"] if have(s, "t.jpg")]
    bgs = json.dumps(["/assets/filmmaker/%s/t.jpg" % s for s in hero_slugs])
    names = json.dumps([next(p["title"] for p in PROJECTS if p["slug"] == s) for s in hero_slugs])
    strip = "".join("%s<em>/</em>" % E(c) for c in DATA["clients"]) * 3
    first = next(p for p in PROJECTS if p["slug"] == hero_slugs[0]) if hero_slugs else PROJECTS[0]
    body = (
        head("Bogdan Pascal | Filmmaker and DoP", "Director of photography and drone operator. Commercials, brand films, music videos and shorts.", "/assets/filmmaker/%s/t.jpg" % first["slug"])
        + NAV
        + '<header class="hero" id="hero" data-bgs=\'%s\' data-names=\'%s\'><div class="title"><span>Cinema</span><span>in motion.</span></div>'
        '<div class="meta mono"><span class="tc" id="tc">00:00:00:00</span><span id="cur">%s</span><a class="btn mono" href="#work">See the work</a></div></header>'
        % (E(bgs, quote=True).replace("&#x27;", "&#39;"), E(names, quote=True).replace("&#x27;", "&#39;"), E(first["title"]))
        + '<div class="marquee mono" aria-label="Clients"><div>%s</div></div>' % strip
        + '<section id="work"><div class="lab mono"><span>Selected work</span><span>%02d films, hover a title to open it</span></div><div class="grid">%s</div></section>' % (len(cards), "".join(cards))
        + foot()
    )
    write(os.path.join(OUT, "index.html"), body)


def video(p, mid, kind):
    poster = "/assets/filmmaker/%s/t.jpg" % p["slug"]
    if kind == "vimeo":
        return '<div class="v"><iframe src="https://player.vimeo.com/video/%s?title=0&amp;byline=0&amp;portrait=0&amp;dnt=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="%s"></iframe></div>' % (mid, E(full_title(p)))
    if kind == "youtube":
        return '<div class="v"><iframe src="https://www.youtube-nocookie.com/embed/%s" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy" title="%s"></iframe></div>' % (mid, E(full_title(p)))
    return '<div class="v"><video controls playsinline preload="metadata" poster="%s"><source src="https://video.wixstatic.com/video/%s/1080p/mp4/file.mp4" type="video/mp4"></video></div>' % (poster, mid)


def project_pages():
    n = len(PROJECTS)
    for i, p in enumerate(PROJECTS):
        t = "/assets/filmmaker/%s/t.jpg" % p["slug"]
        nxt = PROJECTS[(i + 1) % n]
        vids = [video(p, m, "vimeo") for m in p["vimeo"]] + [video(p, m, "youtube") for m in p["youtube"]] + [video(p, m, "mp4") for m in p["mp4"]]
        sts = stills(p)
        sub = "<em>%s</em>" % E(p["sub"]) if p.get("sub") else ""
        credits = "".join("<li><b>%s</b> %s</li>" % (E(c.split(":", 1)[0] + ":"), E(c.split(":", 1)[1].strip())) if ":" in c else "<li>%s</li>" % E(c) for c in p["credits"])
        quote = ""
        if p.get("quote"):
            quote = '<section class="quote"><p>%s</p><span class="mono">%s</span></section>' % (E(p["quote"]["text"]), E(p["quote"]["by"]))
        gallery = ""
        if sts:
            gallery = '<section class="stills"><div class="lab mono"><span>Stills</span><span>%02d frames</span></div><div class="sg">%s</div></section>' % (
                len(sts), "".join('<a href="%s" data-lb><img src="%s" alt="%s still %d" loading="lazy"></a>' % (s, s, E(p["title"]), k) for k, s in enumerate(sts, 1)))
        nt = "/assets/filmmaker/%s/t.jpg" % nxt["slug"]
        body = (
            head(full_title(p) + " | Bogdan Pascal, Filmmaker", "%s. %s." % (full_title(p), p["category"]), t)
            + NAV
            + '<header class="ph"><div class="bgi" style="background-image:url(%s)"></div><div class="in"><h1>%s%s</h1><ul class="credits mono"><li>%s</li>%s</ul></div></header>' % (t, E(p["title"]), sub, E(p["category"]), credits)
            + ('<section class="media">%s</section>' % "".join(vids) if vids else "")
            + quote + gallery
            + '<a class="next" href="/filmmaker/work/%s/"><img src="%s" alt="" loading="lazy"><div><h2>%s</h2><span class="mono">Next film</span></div></a>' % (nxt["slug"], nt, E(nxt["title"]))
            + foot()
        )
        write(os.path.join(OUT, "work", p["slug"], "index.html"), body)


def about():
    photo = "/assets/filmmaker/about/bogdan.jpg"
    img = '<img src="%s" alt="Bogdan Pascal behind the camera">' % photo if os.path.exists(os.path.join(ASSETS, "about", "bogdan.jpg")) else ""
    body = (
        head("About | Bogdan Pascal, Filmmaker", "DoP and drone operator with more than a decade in parkour and stunts.")
        + NAV
        + '<main class="pg"><h1>About <i>me.</i></h1><div class="cols"><div>'
        "<p>I'm a director of photography and drone operator. Technology keeps me close to the newest tools and techniques in filmmaking.</p>"
        "<p>With more than a decade in parkour and stunts, I plan and execute camera moves, choreograph action and build camera movement into the story from the first frame.</p>"
        "<p>I work with Anda Teglas as BTHEVISUAL, a London based film production duo, on commercials, brand films, music videos and shorts.</p>"
        '<div class="contacts"><a href="mailto:%s">%s</a>%s</div></div><div>%s</div></div></main>' % (EMAIL, EMAIL, "".join('<a href="%s" target="_blank" rel="noopener">%s</a>' % (u, E(n)) for n, u in IG), img)
        + foot()
    )
    write(os.path.join(OUT, "about", "index.html"), body)


def contact():
    body = (
        head("Contact | Bogdan Pascal, Filmmaker", "Get in touch about cinematography, drone work and film production.")
        + NAV
        + '<main class="pg"><h1>Let\'s <i>talk.</i></h1><p>Commercials, brand films, music videos, shorts and drone work. Tell me about the project.</p>'
        '<div class="contacts"><a href="mailto:%s">%s</a>%s</div></main>' % (EMAIL, EMAIL, "".join('<a href="%s" target="_blank" rel="noopener">%s</a>' % (u, E(n)) for n, u in IG))
        + foot()
    )
    write(os.path.join(OUT, "contact", "index.html"), body)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "w", encoding="utf-8").write(text)


def check_no_em_dash():
    bad = []
    for base in (OUT, ASSETS):
        for dp, _, fs in os.walk(base):
            for f in fs:
                if f.endswith((".html", ".css", ".js")):
                    t = open(os.path.join(dp, f), encoding="utf-8").read()
                    if "—" in t or "&mdash;" in t:
                        bad.append(os.path.join(dp, f))
    print("em dash check:", "clean" if not bad else bad)


if __name__ == "__main__":
    if "--no-download" not in sys.argv:
        download()
    home()
    project_pages()
    about()
    contact()
    check_no_em_dash()
    print("pages written for %d projects" % len(PROJECTS))

"""Generate the Flowwork logo SVGs and components/logo-paths.ts.

Mark geometry (traced from the brand sheet): a disc split into four quarter
"petals" by straight gaps, each petal's inner corner rounded with a large
radius, the whole thing rotated ~22deg anticlockwise. The lime star and its
arms are simply the space between the petals.

Usage:
    python scripts/make_logos.py path/to/inter-latin-opsz-normal.woff2

The font is the variable Inter from the @fontsource-variable/inter npm package
(`npm pack @fontsource-variable/inter`, then look in package/files/).
Requires: pip install fonttools brotli
"""
import math
import os
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = sys.argv[1] if len(sys.argv) > 1 else "inter-latin-opsz-normal.woff2"
OUT = os.path.join(PROJ, "public", "brand")
os.makedirs(OUT, exist_ok=True)

LIME, BLACK, WHITE = "#C1FF72", "#0A0A0A", "#F7F7F5"
ROT = -22


def f(v):
    return f"{v:.3f}".rstrip("0").rstrip(".")


def petals(rp, a, rc, cx=50, cy=50, rot=ROT):
    """Four petals as one path string (absolute coords)."""
    out = []
    for k in range(4):
        ang = math.radians(rot + 90 * k)
        ca, sa = math.cos(ang), math.sin(ang)

        def T(x, y):
            return cx + x * ca - y * sa, cy + x * sa + y * ca

        e = math.sqrt(rp * rp - a * a)
        p0, p1, p2, p3 = T(a + rc, a), T(e, a), T(a, e), T(a, a + rc)
        out.append(
            f"M{f(p0[0])} {f(p0[1])}L{f(p1[0])} {f(p1[1])}"
            f"A{f(rp)} {f(rp)} 0 0 1 {f(p2[0])} {f(p2[1])}"
            f"L{f(p3[0])} {f(p3[1])}"
            f"A{f(rc)} {f(rc)} 0 0 1 {f(p0[0])} {f(p0[1])}Z"
        )
    return "".join(out)


def circle_path(r, cx=50, cy=50):
    return (f"M{f(cx - r)} {f(cy)}A{f(r)} {f(r)} 0 1 0 {f(cx + r)} {f(cy)}"
            f"A{f(r)} {f(r)} 0 1 0 {f(cx - r)} {f(cy)}Z")


# --- mark variants (100x100 box) ---------------------------------------------
R = 48
W = 4.6  # ring / arm width of the outline mark
P_FILLED = petals(rp=R, a=2.3, rc=24.0)
P_OUTLINE = petals(rp=R - W, a=W / 2, rc=21.5)
P_ICON = petals(rp=R, a=3.6, rc=24.0)  # chunkier gaps so favicons stay legible
RING_STAR = circle_path(R) + P_OUTLINE  # evenodd: disc minus petals


def svg(w, h, body, title="Flowwork"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(w)} {f(h)}" '
            f'width="{f(w)}" height="{f(h)}" role="img" aria-label="{title}">'
            f"<title>{title}</title>{body}</svg>\n")


def mark_outline(color=LIME):
    return f'<path fill="{color}" fill-rule="evenodd" d="{RING_STAR}"/>'


def mark_filled(petal=BLACK, star=LIME, p=P_FILLED):
    under = f'<circle cx="50" cy="50" r="{R - 0.4}" fill="{star}"/>' if star else ""
    return under + f'<path fill="{petal}" d="{p}"/>'


# --- wordmark: Inter Display, slightly lighter than Bold, tight tracking --------
font = instantiateVariableFont(TTFont(FONT), {"wght": 640, "opsz": 32})
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
TRACK = -0.06 * upm

x = 0.0
parts = []
for ch in "flowwork":
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
    parts.append(pen.getCommands())
    x += gs[g].width + TRACK
word_w = x - TRACK
asc = 0.727 * upm  # height of the ascenders in "flowwork"
WORD_D = "".join(parts)


def lockup(mark_body, word_color, mark_px=100):
    """Mark + wordmark. Ascender height = 0.64 x mark, gap = 0.24 x mark."""
    asc_px = mark_px * 0.64
    s = asc_px / asc
    tx = mark_px * 1.24
    base = mark_px / 2 + asc_px / 2
    body = (f'<g transform="scale({mark_px / 100:.4f})">{mark_body}</g>'
            f'<path fill="{word_color}" transform="translate({f(tx)} {f(base)}) scale({s:.6f})" d="{WORD_D}"/>')
    return svg(tx + word_w * s, mark_px, body)


files = {
    "flowwork-mark-lime.svg": svg(100, 100, mark_outline(LIME), "Flowwork mark"),
    "flowwork-mark-white.svg": svg(100, 100, mark_outline(WHITE), "Flowwork mark"),
    "flowwork-mark-filled.svg": svg(100, 100, mark_filled(BLACK, LIME), "Flowwork mark"),
    "flowwork-mark-black.svg": svg(100, 100, mark_filled(BLACK, None), "Flowwork mark"),
    "flowwork-logo-on-dark.svg": lockup(mark_outline(LIME), WHITE),
    "flowwork-logo-on-light.svg": lockup(mark_filled(BLACK, LIME), BLACK),
    "flowwork-logo-black.svg": lockup(mark_filled(BLACK, None), BLACK),
    "flowwork-logo-white.svg": lockup(mark_filled(WHITE, None), WHITE),
    "flowwork-logo-on-lime.svg": lockup(mark_filled(BLACK, None), BLACK),
    "app-icon-lime.svg": svg(100, 100, f'<rect width="100" height="100" rx="22" fill="{LIME}"/>'
                             f'<g transform="translate(14 14) scale(.72)">{mark_filled(BLACK, None, P_ICON)}</g>'),
    "app-icon-dark.svg": svg(100, 100, f'<rect width="100" height="100" rx="22" fill="{BLACK}"/>'
                             f'<g transform="translate(18 18) scale(.64)">{mark_outline(LIME)}</g>'),
}
for name, content in files.items():
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
        fh.write(content)

with open(os.path.join(PROJ, "app", "icon.svg"), "w", encoding="utf-8") as fh:
    fh.write(files["app-icon-lime.svg"])

with open(os.path.join(PROJ, "components", "logo-paths.ts"), "w", encoding="utf-8") as fh:
    fh.write(
        "// Generated by scripts/make_logos.py. Do not edit by hand.\n"
        "// Mark paths live in a 100x100 box. The wordmark path is in font units.\n\n"
        "/** Ring + star as one shape (render with fill-rule=\"evenodd\"). */\n"
        f'export const MARK_OUTLINE = "{RING_STAR}";\n\n'
        "/** The four petals of the solid mark. The star is the gap between them. */\n"
        f'export const MARK_PETALS = "{P_FILLED}";\n\n'
        f'export const WORDMARK = "{WORD_D}";\n'
        f"export const WORDMARK_WIDTH = {round(word_w, 2)};\n"
        f"export const WORDMARK_ASCENT = {asc};\n"
    )
print(f"wrote {len(files)} SVGs, app/icon.svg and components/logo-paths.ts")

"""Generate the shared social card with Pillow (authoring only)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
fonts = ROOT / 'public/assets/fonts'
canvas = Image.new('RGB', (1200, 630), '#1b1d19')
draw = ImageDraw.Draw(canvas)
serif = lambda size: ImageFont.truetype(str(fonts / 'serif-2.ttf'), size)
sans = lambda size: ImageFont.truetype(str(fonts / 'sans-0.ttf'), size)
gold, cream, muted = '#c5a775', '#eee9dd', '#a6a99b'
draw.line((72, 64, 1128, 64), fill='#55513f', width=1)
draw.text((72, 92), 'AKSHAT BAWA', font=sans(22), fill=gold)
draw.text((66, 169), 'Work & Wonder', font=serif(110), fill=cream)
draw.text((74, 322), 'Mathematics. Software. A life between the lines.', font=sans(27), fill=muted)
draw.text((74, 452), 'Projects  /  Experience  /  Original writing', font=sans(21), fill=cream)
draw.line((72, 529, 1128, 529), fill='#55513f', width=1)
draw.text((74, 555), 'IIT ROPAR', font=sans(17), fill=muted)
draw.text((886, 548), 'ab.', font=serif(48), fill=gold)
# Quiet book-spine lines echo the site's library without competing with the title.
for x, h in [(1000, 182), (1025, 214), (1050, 169), (1075, 197)]:
    draw.line((x, 456-h, x, 456), fill='#55513f', width=2)
out = ROOT / 'public/assets/images/social-preview.png'
canvas.save(out, optimize=True)
print(out)

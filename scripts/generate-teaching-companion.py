"""Regenerate the downloadable companion with reportlab (authoring only)."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/teaching/closest-pair-companion.pdf'
FONTS = ROOT / 'public/assets/fonts'
for name, filename in [('Body', 'sans-0.ttf'), ('Bold', 'sans-2.ttf'), ('Title', 'serif-4.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))
ink, muted, gold = map(HexColor, ['#252923', '#5a6056', '#8a6b3f'])
c = canvas.Canvas(str(OUT), pagesize=(595.28, 841.89))
c.setTitle('Closest pair, revisited | Akshat Bawa')
c.setAuthor('Akshat Bawa')
y = 0

def line(text, size=10.5, font='Body', color=ink, gap=10):
    global y
    style = ParagraphStyle('p', fontName=font, fontSize=size, leading=size*1.5, textColor=color)
    p = Paragraph(text, style)
    _, h = p.wrap(487, 750)
    p.drawOn(c, 54, y-h)
    y -= h+gap

def heading(text):
    line(text, 20, 'Title', ink, 5)

def start(number, label, title, subtitle):
    global y
    c.setFillColor(HexColor('#faf8f1')); c.rect(0, 0, 595.28, 841.89, fill=1, stroke=0)
    c.setStrokeColor(gold); c.setLineWidth(.6); c.line(54, 784, 541, 784)
    y = 764
    line('AKSHAT BAWA  /  TEACHING NOTES', 9, 'Bold', gold, 22)
    line(label.upper(), 9, 'Bold', muted, 8)
    line(title, 34, 'Title', ink, 10)
    line(subtitle, 10.5, 'Body', muted, 16)
    c.setFillColor(muted); c.setFont('Body', 8)
    c.drawString(54, 36, 'Companion revision - 14 October 2026 | Original lecture - 12 June 2024')
    c.drawRightString(541, 36, f'{number} / 3')

def end():
    if y < 65:
        raise RuntimeError(f'Page content overlaps footer at y={y}')
    c.showPage()

start(1, '01 / The argument', 'Closest pair, revisited.',
      'A corrected companion to my first lecture at AWaDH. The original notes and Python script remain available as a record of that lecture.')
heading('The question, precisely')
line('Given at least two points in the Euclidean plane, return one pair with minimum squared distance. Repeated coordinates are distinct observations and give a distance of zero. This implementation accepts integer coordinates so that distance comparisons remain exact.')
heading('Sort once. Preserve the order.')
line('Sort the points by x and separately by y. Split the x order at its midpoint. Partition the y order into those same two halves with a single stable pass. An x-rank identifies membership even when many points share an x coordinate.')
heading('The only remaining candidates')
line('After solving both halves, let d be the smaller distance found. A better cross-boundary pair must lie within d of the divider. Keep that strip in y order. For each point, compare at most the next seven points, stopping sooner when the vertical gap alone is already too large.')
heading('Why seven is enough')
line('Look above a strip point through height d. The relevant 2d-by-d rectangle has two halves, one for each recursive side. Subdivide each half into four d/2-by-d/2 cells. Two same-side points in one cell would be closer than d, contradicting the recursive result. At most eight points, including the starting point, can occupy this rectangle. Duplicate coordinates are handled before recursion.')
heading('What the bound actually says')
line('Sorting costs O(n log n). Each recursive level partitions and scans in O(n), giving T(n) = 2T(n/2) + O(n) and O(n log n) overall. This counts comparisons and arithmetic operations; very large integers add bit-arithmetic costs. Live auxiliary storage is O(n), with O(log n) recursive depth.', gap=0)
end()

start(2, '02 / From the original to the revision', 'Small details. Real consequences.',
      'The changes below concern the closest-pair argument and implementation; the archived files themselves are unchanged.')
for title, text in [
    ('A consistent boundary contract', 'The original brute-force helper returns different tuple shapes for fewer than two points. The revision rejects such input with ValueError. Every successful call returns indices, point coordinates, and an exact squared distance.'),
    ('Identity is not the same as position', 'Testing whether a coordinate tuple appears in the left list is linear work per point and can send duplicates into the wrong partition. Stable x-ranks make the y partition linear and unambiguous. Adjacent equal coordinates in x order return a zero-distance answer immediately.'),
    ('A strip bound matched to its proof', 'The lecture mentions six following points; the original Python loop checks four. This companion uses the standard conservative bound of seven and a vertical-gap early exit. The proof and the loop now describe the same algorithm.'),
    ('One answer, even when several tie', 'The revision intentionally returns one minimum pair. It does not enumerate every equally close pair. That distinction matters: n identical points have n(n-1)/2 zero-distance pairs, so listing all of them cannot have an O(n log n) output bound.'),
    ('A correction to the conclusion', 'On page 6 of the original PDF, the final time bound should be O(n log n), not logarithmic time. Re-sorting the strip at every recursive call would also lose this bound; the revision preserves the y order instead.'),
]:
    heading(title); line(text)
line('A background clarification: a space is compact when the whole space has the finite-subcover property. This does not require every subset to be compact, as the wording on page 1 suggests.', 9.5, 'Body', muted, 0)
end()

start(3, '03 / Try it, then challenge it', 'Evidence you can rerun.',
      'Python 3.10 or newer. No third-party packages are required by the implementation or its tests.')
heading('Keep the two Python files together')
line('Download closest_pair.py and test_closest_pair.py into the same folder. From that folder, run:', gap=8)
line('python closest_pair.py<br/>python -m unittest -v test_closest_pair.py', 10, 'Bold', gold, 22)
heading('A small example')
line('For [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)], the closest points are (2, 3) and (3, 4), at input indices 0 and 5. The returned squared distance is 2. Take its square root only if an approximate Euclidean distance is needed.')
heading('Checked on 14 October 2026')
line('All 12 test methods pass. They include 1,000 reproducible random inputs compared with an independent all-pairs oracle and all 502 subsets of a 3-by-3 integer grid containing at least two points. The assertions also check that the reported points and indices agree.')
line('Additional cases cover duplicates, horizontal and vertical lines, equal x coordinates, cross-boundary pairs, tied distances, very large integers, invalid input, generators, and preservation of the original input.')
heading('What the tests do not establish')
line('Passing these cases supports correctness; it does not prove the time bound or benchmark production performance. The complexity argument is on page 1. Floating-point coordinates are deliberately rejected. Accepting them would need an explicit policy for roundoff, overflow, and near-equal distances.')
heading('Further reading and source')
line('<link href="https://algs4.cs.princeton.edu/code/javadoc/edu/princeton/cs/algs4/ClosestPair.html" color="#8a6b3f">Princeton Algorithms, ClosestPair reference</link><br/><link href="https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/ClosestPair.java.html" color="#8a6b3f">Princeton Algorithms, implementation and strip argument</link><br/><link href="https://akshat180425.github.io/my-portfolio/experience/awadh/" color="#8a6b3f">My first lecture: original materials, companion, and Python downloads</link>', 9.5, gap=0)
end()
c.save()
print(OUT)



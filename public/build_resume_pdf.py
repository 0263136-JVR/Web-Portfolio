"""
Generates assets/resume-placeholder.pdf — a one-page CV styled to match the
website's design tokens (dark green / graphite / off-white). Edit the
content below with your real details, then rerun:

    python3 build_resume_pdf.py
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

GREEN_DEEP = HexColor("#123C32")
GRAPHITE   = HexColor("#1C2220")
GRAY_TEXT  = HexColor("#68716D")
GRAY_LINE  = HexColor("#E5E8E5")
OFF_WHITE  = HexColor("#F5F6F3")

PAGE_W, PAGE_H = letter
MARGIN = 22 * mm

c = canvas.Canvas("assets/resume-placeholder.pdf", pagesize=letter)

def line(x1, y1, x2, y2, color=GRAY_LINE, width=0.6):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)

def text(x, y, s, size=10, color=GRAPHITE, font="Helvetica", leading=None):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, s)

def wrapped(x, y, s, size=9.3, color=GRAY_TEXT, font="Helvetica", max_width=None, leading=13):
    max_width = max_width or (PAGE_W - 2 * MARGIN)
    c.setFillColor(color)
    c.setFont(font, size)
    lines = simpleSplit(s, font, size, max_width)
    for i, ln in enumerate(lines):
        c.drawString(x, y - i * leading, ln)
    return y - len(lines) * leading

y = PAGE_H - MARGIN

# --- Header ---
text(MARGIN, y, "YOUR NAME", size=22, color=GRAPHITE, font="Helvetica-Bold")
y -= 20
text(MARGIN, y, "Mechanical Engineer & 3D CAD Designer", size=12, color=GREEN_DEEP, font="Helvetica")
y -= 22
contact_line = "yourname@gmail.com   \u00b7   linkedin.com/in/your-profile   \u00b7   Your City, Country"
text(MARGIN, y, contact_line, size=9.3, color=GRAY_TEXT, font="Helvetica")
y -= 14
line(MARGIN, y, PAGE_W - MARGIN, y, GREEN_DEEP, 1.1)
y -= 26

def section_title(title, y):
    text(MARGIN, y, title.upper(), size=10.5, color=GREEN_DEEP, font="Helvetica-Bold")
    y -= 6
    line(MARGIN, y, PAGE_W - MARGIN, y, GRAY_LINE, 0.6)
    return y - 16

# --- Profile ---
y = section_title("Profile", y)
y = wrapped(MARGIN, y,
    "Mechanical engineer focused on 3D CAD design, product development, and engineering "
    "simulation. Experienced designing components and assemblies in SolidWorks, validating "
    "them with structural and thermal FEA, and preparing manufacturing-ready documentation.",
    size=9.6, color=GRAPHITE, leading=13.5)
y -= 20

# --- Experience ---
y = section_title("Experience", y)

def entry(y, period, role, org, bullets):
    text(MARGIN, y, role, size=10.3, color=GRAPHITE, font="Helvetica-Bold")
    c.setFillColor(GRAY_TEXT)
    c.setFont("Helvetica", 9)
    c.drawRightString(PAGE_W - MARGIN, y, period)
    y -= 13
    text(MARGIN, y, org, size=9.6, color=GREEN_DEEP, font="Helvetica")
    y -= 15
    for b in bullets:
        c.setFillColor(GRAY_TEXT)
        c.setFont("Helvetica", 9.2)
        c.drawString(MARGIN, y, "\u2014")
        y = wrapped(MARGIN + 12, y, b, size=9.2, color=GRAPHITE, max_width=PAGE_W - 2*MARGIN - 12, leading=12.5)
        y -= 3
    return y - 10

y = entry(y, "2024 \u2014 Present", "Mechanical Design Engineer", "Company Name", [
    "Designed and validated mechanical components in SolidWorks, from concept through manufacturing release.",
    "Ran structural and thermal FEA to confirm designs against performance requirements before tooling.",
    "Produced GD&T drawings and documentation for suppliers and internal manufacturing.",
])
y = entry(y, "2023 \u2014 2024", "Mechanical Engineering Intern", "Company Name", [
    "Supported a product development team on CAD modeling and design-for-manufacturing reviews.",
    "Built parametric models and assembly configurations for a multi-variant product line.",
])

# --- Education ---
y = section_title("Education", y)
text(MARGIN, y, "B.Sc. Mechanical Engineering", size=10.3, color=GRAPHITE, font="Helvetica-Bold")
c.setFillColor(GRAY_TEXT)
c.setFont("Helvetica", 9)
c.drawRightString(PAGE_W - MARGIN, y, "2020 \u2014 2025")
y -= 13
text(MARGIN, y, "Your University", size=9.6, color=GREEN_DEEP, font="Helvetica")
y -= 26

# --- Skills & Certifications (two columns) ---
y = section_title("Skills & Certifications", y)
col_w = (PAGE_W - 2 * MARGIN - 20) / 2
left_x = MARGIN
right_x = MARGIN + col_w + 20

text(left_x, y, "CAD", size=9.3, color=GRAPHITE, font="Helvetica-Bold")
wrapped(left_x, y - 13, "SolidWorks, Fusion 360, AutoCAD", size=9.2, color=GRAY_TEXT, max_width=col_w)

text(right_x, y, "Simulation", size=9.3, color=GRAPHITE, font="Helvetica-Bold")
wrapped(right_x, y - 13, "SolidWorks Simulation, ANSYS", size=9.2, color=GRAY_TEXT, max_width=col_w)

y -= 40
text(left_x, y, "Engineering", size=9.3, color=GRAPHITE, font="Helvetica-Bold")
wrapped(left_x, y - 13, "Mechanical design, DFM, prototyping, technical documentation", size=9.2, color=GRAY_TEXT, max_width=col_w)

text(right_x, y, "Certifications", size=9.3, color=GRAPHITE, font="Helvetica-Bold")
wrapped(right_x, y - 13, "Certified SolidWorks Associate (CSWA)", size=9.2, color=GRAY_TEXT, max_width=col_w)

# --- Footer ---
c.setFillColor(GRAY_TEXT)
c.setFont("Helvetica", 7.5)
c.drawString(MARGIN, MARGIN - 6, "This is a placeholder resume generated for the portfolio template \u2014 replace with your real CV content.")

c.showPage()
c.save()
print("Wrote assets/resume-placeholder.pdf")

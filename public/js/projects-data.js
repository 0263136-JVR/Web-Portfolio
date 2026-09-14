/* ==========================================================================
   PROJECT CONTENT
   Add, remove, or edit project objects here. Every page (home, projects,
   case study, gallery) reads from this single array — no need to touch
   the HTML to update your work.

   "art" fields reference generator keys in technical-art.js:
   iso | mesh | stress | thermal | exploded | ortho | render
   Replace ART.thumb(key) calls in the render scripts with a real
   <img src="assets/your-photo.jpg"> once you have project imagery —
   see README.md.
   ========================================================================== */

const PROJECTS = [
  {
    id: "drone-bracket",
    title: "Lightweight Bracket Redesign for a Quadrotor Frame",
    discipline: "Mechanical Component Design",
    software: ["SolidWorks", "ANSYS"],
    thumb: "iso",
    summary: "Topology-informed redesign of a motor mounting bracket to cut mass while holding stiffness under flight loads.",
    challenge: "The original aluminum bracket met strength requirements but carried more mass than the airframe budget allowed, and its solid-block geometry was slow and wasteful to machine.",
    approach: "Built a parametric SolidWorks model constrained by the mounting interface and motor envelope, then used load-case data from flight testing to guide material removal — favoring load-path-aligned ribs over uniform thinning.",
    cad: "Fully parametric part and assembly model with mate references to the motor and arm interfaces, so downstream geometry changes propagate automatically. Multiple rib-pattern iterations were modeled and compared side by side before committing to a direction.",
    sim: "Static structural FEA in ANSYS under combined thrust, vibration, and hard-landing load cases, with mesh refinement at fillets and bolt bosses. Displacement and von Mises stress results were checked against a minimum safety factor before each design iteration was accepted.",
    resultStats: [
      { value: "-34%", label: "mass vs. baseline" },
      { value: "2.6", label: "min. safety factor" },
      { value: "6", label: "design iterations" }
    ],
    gallery: ["iso", "exploded", "mesh", "stress", "render"]
  },
  {
    id: "modular-gearbox",
    title: "Modular Two-Stage Gearbox Assembly",
    discipline: "Complex CAD Assembly",
    software: ["Fusion 360"],
    thumb: "exploded",
    summary: "A serviceable gearbox assembly designed around interchangeable stages, easing future ratio changes without a full redesign.",
    challenge: "A single-ratio gearbox needed to become a platform that could support several reduction ratios for different product variants, without duplicating the full assembly for each one.",
    approach: "Split the design into a fixed housing interface and swappable internal gear-stage modules, using consistent datum planes so any stage combination assembles correctly on the first attempt.",
    cad: "Top-down assembly modeling with skeleton geometry defining shared interfaces, and configuration tables driving shaft length and bearing bore variants across the product family.",
    sim: "Motion study and interference analysis across all module combinations, plus a simplified gear-mesh contact check to confirm center-distance tolerances before releasing drawings.",
    resultStats: [
      { value: "3", label: "ratio variants from 1 platform" },
      { value: "0", label: "unique housings required" },
      { value: "40%", label: "faster variant turnaround" }
    ],
    gallery: ["exploded", "iso", "ortho", "render"]
  },
  {
    id: "heatsink-thermal",
    title: "Heat Sink Thermal Optimization for a Power Module",
    discipline: "Thermal Simulation",
    software: ["SolidWorks", "SolidWorks Simulation"],
    thumb: "thermal",
    summary: "Fin geometry study to keep a power electronics module within its rated junction temperature under sustained load.",
    challenge: "A power module was running close to its thermal limit under continuous load, and the enclosure left little room to simply add more surface area.",
    approach: "Modeled several fin geometries — straight, pin, and tapered — within the same envelope, and evaluated each against airflow direction and available clearance before simulating.",
    cad: "Parametric fin array driven by spacing and height parameters, allowing dozens of geometric variants to be generated and screened quickly within the fixed enclosure envelope.",
    sim: "Steady-state thermal simulation with convective boundary conditions matched to the enclosure's fan curve, comparing peak junction temperature and pressure drop across candidate geometries.",
    resultStats: [
      { value: "-18°C", label: "peak junction temp." },
      { value: "12%", label: "less material used" },
      { value: "3", label: "geometries screened" }
    ],
    gallery: ["thermal", "mesh", "ortho", "render"]
  },
  {
    id: "pressure-vessel",
    title: "Structural Validation of a Small Pressure Vessel",
    discipline: "Structural Simulation",
    software: ["ANSYS"],
    thumb: "stress",
    summary: "FEA-driven wall-thickness and nozzle-reinforcement study for a code-adjacent pressure vessel design.",
    challenge: "A vessel design needed to hold a target internal pressure with an adequate safety margin while avoiding unnecessary wall thickness that would add cost and weight.",
    approach: "Started from a thin-wall analytical estimate, then used FEA to check stress concentration at nozzle penetrations and heads, where hand calculations are least reliable.",
    cad: "Shell and solid hybrid model of the vessel body, heads, and nozzle reinforcement pads, with configurations for two wall-thickness options evaluated in parallel.",
    sim: "Linear static structural analysis under internal pressure loading, with local mesh refinement at nozzle-to-shell junctions to resolve stress concentration accurately.",
    resultStats: [
      { value: "3.1", label: "min. safety factor" },
      { value: "-9%", label: "wall thickness vs. estimate" },
      { value: "2", label: "reinforcement iterations" }
    ],
    gallery: ["stress", "mesh", "ortho", "render"]
  },
  {
    id: "molded-housing",
    title: "Injection-Molded Enclosure, Designed for Manufacturing",
    discipline: "Manufacturing Design",
    software: ["SolidWorks"],
    thumb: "render",
    summary: "A two-piece enclosure redesigned around molding constraints after early prototypes revealed sink marks and draft issues.",
    challenge: "An initial enclosure design prototyped well as a machined part but was not viable to injection mold as drawn — inconsistent wall thickness and missing draft would have caused defects at volume.",
    approach: "Reworked the part with uniform nominal wall thickness, added draft to every vertical face, and relocated bosses and ribs to avoid sink marks on the visible outer surface.",
    cad: "Full DFM pass in SolidWorks including draft analysis, wall-thickness analysis, and undercut checks, with the parting line planned into the geometry from the start rather than added afterward.",
    sim: "Basic mold-fill reasoning around gate placement and rib thickness, informed by wall-thickness and draft-angle checks rather than full mold-flow simulation.",
    resultStats: [
      { value: "1.8mm", label: "uniform wall thickness" },
      { value: "100%", label: "faces with adequate draft" },
      { value: "1", label: "parting line, no side actions" }
    ],
    gallery: ["render", "ortho", "exploded", "iso"]
  },
  {
    id: "reverse-engineered-part",
    title: "Reverse-Engineered Replacement for a Legacy Component",
    discipline: "Reverse Engineering",
    software: ["SolidWorks", "CATIA"],
    thumb: "ortho",
    summary: "Rebuilding an undocumented legacy part into a fully toleranced, manufacturable CAD model from physical measurement.",
    challenge: "A functioning legacy part had no drawings or CAD model available, and needed to be reproduced accurately enough to guarantee fit with surrounding components.",
    approach: "Measured the physical part with calipers and a CMM for critical features, cross-checked measurements against the mating assembly, and rebuilt the geometry as an intent-driven parametric model rather than a raw point-cloud copy.",
    cad: "Feature-based reconstruction referencing functional datums rather than the as-measured surface directly, so the resulting model tolerates the same manufacturing variation as the original.",
    sim: "Fit-check assembly simulation against the mating components to confirm the reconstructed geometry matched functional requirements before finalizing tolerances.",
    resultStats: [
      { value: "0.05mm", label: "fit-critical tolerance" },
      { value: "100%", label: "mating features validated" },
      { value: "1", label: "full drawing package produced" }
    ],
    gallery: ["ortho", "iso", "mesh", "render"]
  }
];

/* ==========================================================================
   PLACEHOLDER TECHNICAL ARTWORK
   These functions generate lightweight SVG line-art standing in for real
   CAD renders, simulation plots, and technical drawings. REPLACE the calls
   to these functions with real project photography/renders/exports as soon
   as you have them — see README.md, section "Swapping in real images".
   ========================================================================== */

const ART = {

  /* Isometric bracket / mechanical assembly, used in the hero and as a
     generic "CAD" figure. */
  isoAssembly(accent = "#123C32"){
    return `
    <svg viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#E5E8E5" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="640" height="520" fill="#FFFFFF"/>
      <rect width="640" height="520" fill="url(#grid)"/>
      <g fill="none" stroke="#1C2220" stroke-width="1.3" stroke-linejoin="round">
        <path d="M120 300 L260 230 L440 230 L440 340 L300 410 L120 340 Z" fill="#F5F6F3"/>
        <path d="M120 300 L120 220 L260 150 L440 150 L440 230" />
        <path d="M260 230 L260 150" />
        <path d="M300 410 L300 330" stroke-dasharray="4 4" />
        <path d="M120 340 L120 260" />
        <ellipse cx="230" cy="270" rx="20" ry="11" stroke="${accent}"/>
        <ellipse cx="340" cy="270" rx="20" ry="11" stroke="${accent}"/>
      </g>
      <g stroke="${accent}" stroke-width="1" fill="none" opacity="0.85">
        <line x1="120" y1="440" x2="440" y2="440"/>
        <line x1="120" y1="432" x2="120" y2="448"/>
        <line x1="440" y1="432" x2="440" y2="448"/>
      </g>
      <text x="120" y="462" font-family="IBM Plex Mono, monospace" font-size="11" fill="#68716D">320.0 mm</text>
      <g stroke="#68716D" stroke-width="1">
        <line x1="72" y1="150" x2="72" y2="230"/>
        <line x1="65" y1="150" x2="79" y2="150"/>
        <line x1="65" y1="230" x2="79" y2="230"/>
      </g>
      <text x="30" y="195" font-family="IBM Plex Mono, monospace" font-size="11" fill="#68716D">80.0</text>
      <g font-family="IBM Plex Mono, monospace" font-size="10" fill="${accent}">
        <text x="440" y="140">X</text>
        <text x="90" y="330">Y</text>
        <text x="470" y="480">Z</text>
      </g>
      <g stroke="${accent}" stroke-width="1">
        <line x1="470" y1="470" x2="500" y2="470"/>
        <line x1="470" y1="470" x2="470" y2="440"/>
        <line x1="470" y1="470" x2="450" y2="490"/>
      </g>
    </svg>`;
  },

  /* Wireframe mesh — stands in for an FEA mesh preview. */
  wireMesh(accent = "#123C32"){
    let lines = "";
    const rows = 9, cols = 12, w = 640, h = 460, ox = 20, oy = 40;
    for(let r = 0; r <= rows; r++){
      let d = "M";
      for(let c = 0; c <= cols; c++){
        const x = ox + (c / cols) * w;
        const wobble = Math.sin((r / rows) * Math.PI) * 30;
        const y = oy + (r / rows) * h + wobble;
        d += `${c === 0 ? "" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      lines += `<path d="${d}" fill="none" stroke="#C9D0CB" stroke-width="0.8"/>`;
    }
    for(let c = 0; c <= cols; c++){
      let d = "M";
      for(let r = 0; r <= rows; r++){
        const x = ox + (c / cols) * w;
        const wobble = Math.sin((r / rows) * Math.PI) * 30;
        const y = oy + (r / rows) * h + wobble;
        d += `${r === 0 ? "" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      lines += `<path d="${d}" fill="none" stroke="#C9D0CB" stroke-width="0.8"/>`;
    }
    return `
    <svg viewBox="0 0 680 540" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="540" fill="#FFFFFF"/>
      ${lines}
      <circle cx="340" cy="270" r="90" fill="none" stroke="${accent}" stroke-width="1.4"/>
    </svg>`;
  },

  /* Stress / thermal contour plot — authentic-feeling FEA colour ramp
     contained within a neutral frame. */
  contourPlot(mode = "stress"){
    const stops = mode === "stress"
      ? ["#123C32","#2E7D5B","#9BC53D","#F2C14E","#E4572E","#B23A2E"]
      : ["#123C32","#1F6E8C","#3EA8B5","#F2C14E","#E4572E"];
    const grad = stops.map((c,i) => `<stop offset="${(i/(stops.length-1)*100).toFixed(0)}%" stop-color="${c}"/>`).join("");
    return `
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg-${mode}" cx="42%" cy="40%" r="65%">
          ${grad}
        </radialGradient>
      </defs>
      <rect width="640" height="480" fill="#F5F6F3"/>
      <path d="M120 380 L160 140 L360 90 L500 160 L520 340 L360 420 L180 420 Z" fill="url(#rg-${mode})"/>
      <path d="M120 380 L160 140 L360 90 L500 160 L520 340 L360 420 L180 420 Z" fill="none" stroke="#1C2220" stroke-width="1"/>
      <g font-family="IBM Plex Mono, monospace" font-size="9" fill="#68716D">
        <rect x="24" y="440" width="200" height="8" fill="url(#rg-${mode})"/>
        <text x="24" y="462">MIN</text>
        <text x="200" y="462">MAX</text>
      </g>
    </svg>`;
  },

  /* Exploded view — offset stacked parts with alignment lines. */
  explodedView(accent = "#123C32"){
    return `
    <svg viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="520" fill="#FFFFFF"/>
      <g stroke="${accent}" stroke-width="1" stroke-dasharray="3 5" opacity="0.6">
        <line x1="220" y1="60" x2="220" y2="460"/>
        <line x1="420" y1="60" x2="420" y2="460"/>
      </g>
      <g fill="#F5F6F3" stroke="#1C2220" stroke-width="1.2" stroke-linejoin="round">
        <path d="M160 100 L480 100 L480 150 L160 150 Z"/>
        <path d="M180 200 L460 200 L460 260 L180 260 Z"/>
        <path d="M150 320 L490 320 L490 400 L150 400 Z"/>
        <rect x="290" y="430" width="60" height="34"/>
      </g>
      <g stroke="#68716D" stroke-width="1">
        <line x1="220" y1="150" x2="220" y2="200"/>
        <line x1="420" y1="150" x2="420" y2="200"/>
        <line x1="220" y1="260" x2="220" y2="320"/>
        <line x1="420" y1="260" x2="420" y2="320"/>
        <line x1="320" y1="400" x2="320" y2="430"/>
      </g>
    </svg>`;
  },

  /* Orthographic technical drawing with dimension lines. */
  orthoDrawing(accent = "#123C32"){
    return `
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#FFFFFF"/>
      <g fill="none" stroke="#1C2220" stroke-width="1.2">
        <rect x="110" y="90" width="220" height="140"/>
        <circle cx="220" cy="160" r="34"/>
        <rect x="380" y="90" width="150" height="140"/>
        <line x1="380" y1="160" x2="530" y2="160"/>
      </g>
      <g stroke="${accent}" stroke-width="0.9" fill="none">
        <line x1="110" y1="250" x2="330" y2="250"/>
        <line x1="110" y1="242" x2="110" y2="258"/>
        <line x1="330" y1="242" x2="330" y2="258"/>
        <line x1="95" y1="90" x2="95" y2="230"/>
        <line x1="87" y1="90" x2="103" y2="90"/>
        <line x1="87" y1="230" x2="103" y2="230"/>
      </g>
      <g font-family="IBM Plex Mono, monospace" font-size="10" fill="#68716D">
        <text x="195" y="268">220.00</text>
        <text x="50" y="165" transform="rotate(-90 50 165)">140.00</text>
        <text x="195" y="118">&#8960; 68.00</text>
      </g>
      <g fill="none" stroke="#1C2220" stroke-width="1">
        <rect x="110" y="300" width="420" height="120"/>
        <line x1="110" y1="340" x2="530" y2="340"/>
        <line x1="150" y1="300" x2="150" y2="420"/>
        <line x1="470" y1="300" x2="470" y2="420"/>
      </g>
    </svg>`;
  },

  /* Render-style final part shot — flat shaded isometric solid. */
  finalRender(accent = "#123C32", accent2 = "#2B312F"){
    return `
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#F5F6F3"/>
      <g stroke-linejoin="round">
        <path d="M160 260 L320 180 L480 260 L480 340 L320 420 L160 340 Z" fill="${accent}"/>
        <path d="M160 260 L320 180 L480 260 L320 340 Z" fill="${accent2}" opacity="0.85"/>
        <path d="M160 260 L320 340 L320 420 L160 340 Z" fill="${accent}" opacity="0.7"/>
        <circle cx="320" cy="270" r="26" fill="#F5F6F3" opacity="0.9"/>
      </g>
    </svg>`;
  },

  /* Small square thumbnail wrapper for gallery use */
  thumb(kind, accent){
    const map = {
      iso: this.isoAssembly(accent),
      mesh: this.wireMesh(accent),
      stress: this.contourPlot("stress"),
      thermal: this.contourPlot("thermal"),
      exploded: this.explodedView(accent),
      ortho: this.orthoDrawing(accent),
      render: this.finalRender(accent)
    };
    return map[kind] || map.iso;
  }
};

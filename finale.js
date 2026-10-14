/* ============================================================
   FINALE — the "main page" layer for the Tears site.
   Builds the whole finale DOM into #finale-root (in index.html),
   styled entirely by finale.css. Opened from the Works stage via
   #finaleOpenBtn; closed by its TUTUP button or the Esc key.
   While the finale is closed, no timer in this file is running.
   ============================================================ */
(function () {
  "use strict";

  var root = document.getElementById("finale-root");
  var openBtn = document.getElementById("finaleOpenBtn");
  if (!root) return;

  /* ================= THE EMBLEM ARTWORK =================
     The fish are the owner's own SVG file: two bold fish silhouettes
     in 180-degree rotational symmetry, six filled paths in all (two
     bodies, two outer fins, two inner fins), traced from an engraving
     reference. They are embedded below VERBATIM — every path's
     coordinates and translate transform exactly as in the file; the
     one allowed change is presentational: the fill, black in the
     file, is rendered as dark smoked glass — rgba(8,11,16,0.78) with
     a clean white outline — so the pair reads as dark silhouettes on
     the frosted-glass disc behind them. The file holds no glyph of
     its own — its two small central paths are the fishes' inner
     fins — so the six paths are never split apart: they turn
     together as one group, slowly clockwise around the emblem
     centre, while a separate glyph text stands still in the middle
     and the centre glow pulses behind the glass. A wheel of small
     neighbouring constellations turns slowly around the outside of
     the double ring. */

  /* the six paths of the owner's artwork file, verbatim, in file order */
var ART_PATHS = [
  { d: "M0 0 C0.8 0.68 1.6 1.35 2.43 2.05 C39.77 34.63 62.2 83.83 66 133 C68.24 180.02 50.73 224.29 19.25 259.44 C18.52 260.22 17.79 261 17.04 261.8 C15.16 263.83 13.42 265.92 11.69 268.06 C8.38 271.68 8.38 271.68 5 272 C4.01 271.34 3.02 270.68 2 270 C-1.57 270.08 -1.57 270.08 -5 271 C-7.23 274.34 -7.09 274.67 -6.62 278.38 C-6.56 282.5 -6.56 282.5 -8.35 284.52 C-10.5 285.91 -12.65 286.97 -15 288 C-15.96 288.44 -16.93 288.88 -17.92 289.34 C-28.48 293.96 -39.28 297.46 -50.85 294.2 C-58.33 290.92 -62.07 285.67 -65.13 278.27 C-68.86 264.28 -65.75 248.59 -59 236 C-57.74 236.06 -56.48 236.12 -55.19 236.19 C-51.96 236.18 -51.96 236.18 -49.06 234.88 C-47.51 232.14 -47.06 230.16 -47 227 C-48.81 224.13 -48.81 224.13 -51 222 C-49.37 216.99 -46.42 213.1 -43.38 208.88 C-42.83 208.11 -42.29 207.35 -41.73 206.56 C-39.48 203.41 -37.22 200.28 -34.85 197.21 C-10.45 165.56 5.37 119.55 0.7 79.42 C-2.75 57.42 -10.72 30.78 -28.44 16.12 C-36.58 10.21 -45.42 8.24 -55.49 9.25 C-69.44 11.95 -79.76 21.56 -87.83 32.81 C-90.53 35.53 -92.22 35.87 -96 36 C-99.24 33.93 -99.95 32.14 -101.19 28.5 C-103.47 17.45 -104.29 6.79 -98 -3 C-98.96 -3.29 -99.91 -3.58 -100.89 -3.88 C-124.16 -11.18 -124.16 -11.18 -130.38 -19.94 C-131.22 -22.72 -130.98 -24.27 -130 -27 C-127.05 -29.73 -124.87 -30.43 -120.91 -30.73 C-119.89 -30.81 -118.87 -30.89 -117.83 -30.98 C-116.73 -31.05 -115.63 -31.12 -114.5 -31.19 C-112.79 -31.3 -112.79 -31.3 -111.04 -31.42 C-68.87 -34.05 -33.03 -27.99 0 0 Z M5.74 144.61 C2.42 149.16 4.24 154.71 5 160 C5.17 161.27 5.17 161.27 5.35 162.57 C6.63 169.75 9.7 175.57 15.62 179.94 C21.4 183.47 26.36 183.94 33 183 C44 179.71 44 179.71 53 173 C54.07 170.44 54.16 169.43 53.19 166.81 C52.12 164.85 52.12 164.85 50 164 C43.6 163.4 39.16 166.04 33.54 168.79 C29.45 170.19 27.15 170.11 23 169 C20.14 166.79 19.53 164.95 18.97 161.44 C18.82 160.56 18.67 159.68 18.51 158.77 C18.21 156.93 17.92 155.08 17.63 153.23 C17.4 151.91 17.4 151.91 17.16 150.56 C17.03 149.76 16.91 148.96 16.77 148.13 C15.76 145.33 14.58 144.44 12 143 C8.08 142.61 8.08 142.61 5.74 144.61 Z M-17.69 188.74 C-19.25 191.43 -19.24 192.62 -18.85 195.67 C-18.73 196.56 -18.62 197.45 -18.5 198.36 C-18.36 199.3 -18.21 200.23 -18.06 201.19 C-17.92 202.14 -17.77 203.09 -17.62 204.06 C-16.12 212.86 -13.58 218.67 -6.25 224 C-0.97 226.83 4 228.04 9.91 226.5 C17.09 224.25 23.98 221.61 30 217 C31.32 214.06 31.32 214.06 31 211 C29.65 208.4 29.65 208.4 27 207 C22.17 206.9 18.87 208.47 14.56 210.56 C9.63 212.89 6.42 213.86 1 213 C-1.43 211.32 -2.75 209.93 -3.53 207.05 C-4.06 203.89 -4.42 200.73 -4.78 197.55 C-5.28 193.81 -5.59 191.54 -7.9 188.47 C-11.32 186.08 -14.66 185.62 -17.69 188.74 Z ", t: "translate(366,116)" },
  { d: "M0 0 C5.05 4.16 8.7 9.52 10 16 C10.91 29.16 10.58 43.63 3 55 C0.97 55 -1.06 55 -3.09 54.93 C-5.1 54.85 -5.1 54.85 -6.94 56.12 C-8.49 58.86 -8.94 60.84 -9 64 C-7.19 66.87 -7.19 66.87 -5 69 C-6.61 73.94 -9.48 77.72 -12.5 81.88 C-13.6 83.42 -14.69 84.96 -15.79 86.5 C-17.29 88.61 -18.8 90.72 -20.32 92.82 C-45.79 128.24 -62.74 174.09 -56.18 218.13 C-52.68 237.73 -44.02 262.04 -27.77 274.79 C-18.15 281.35 -8.46 283.08 3 281 C13.95 277.85 22.8 269.78 30.03 261.3 C31.94 259.07 33.8 256.95 36 255 C39.06 254.88 39.06 254.88 42 256 C46.16 262.32 46.23 268.99 46.31 276.31 C46.34 277.13 46.37 277.95 46.4 278.79 C46.46 284.92 45.09 288.71 42 294 C43.43 294.44 43.43 294.44 44.89 294.88 C68.16 302.18 68.16 302.18 74.38 310.94 C75.22 313.72 74.98 315.27 74 318 C71.05 320.73 68.87 321.43 64.91 321.73 C63.89 321.81 62.87 321.89 61.83 321.98 C60.73 322.05 59.63 322.12 58.5 322.19 C57.36 322.27 56.21 322.34 55.04 322.42 C12.87 325.05 -22.97 318.99 -56 291 C-56.8 290.32 -57.6 289.65 -58.43 288.95 C-95.03 257.02 -117.58 208.65 -121.83 160.52 C-124.92 113.6 -108.1 69.94 -77.6 34.18 C-76.09 32.51 -74.57 30.84 -73.04 29.2 C-71.16 27.17 -69.42 25.08 -67.69 22.94 C-64.38 19.32 -64.38 19.32 -61 19 C-60.01 19.66 -59.02 20.32 -58 21 C-54.93 20.81 -52.78 20.59 -50.29 18.72 C-48.79 17.08 -48.79 17.08 -49.02 14.95 C-49.14 14.2 -49.26 13.46 -49.38 12.69 C-49.46 9.74 -49.44 8.5 -47.46 6.25 C-34.53 -2.79 -14.31 -9.18 0 0 Z M-77 69 C-77.84 69.37 -78.67 69.74 -79.54 70.12 C-83.01 71.74 -84.83 72.75 -87 76 C-86.8 78.73 -86.28 80.53 -84.88 82.88 C-82.5 84.3 -80.83 84.15 -78.15 83.66 C-75.48 82.84 -73.08 81.66 -70.56 80.44 C-65.63 78.11 -62.42 77.14 -57 78 C-54.58 79.68 -53.26 81.08 -52.45 83.95 C-52.04 86.3 -51.72 88.64 -51.44 91 C-50.83 98.18 -50.83 98.18 -47 104 C-42.92 104.51 -41.47 104.31 -38 102 C-35.27 94.48 -38.27 83.13 -41.26 76 C-44.91 70.1 -49.65 66.33 -56.28 64.3 C-63.93 62.94 -70.13 65.86 -77 69 Z M-97.94 111.19 C-98.67 111.48 -99.4 111.77 -100.16 112.07 C-104.55 113.96 -107.48 115.74 -110 120 C-109.52 123.26 -109.52 123.26 -108 126 C-105.16 127.42 -103.17 127.24 -100 127 C-96.61 125.67 -96.61 125.67 -93.19 123.94 C-87.31 121.18 -83.35 120.47 -77 122 C-75.2 128.88 -73.63 135.66 -72.72 142.72 C-71.79 145.65 -70.66 146.52 -68 148 C-64.87 148.01 -64.87 148.01 -62 147 C-58.18 141.27 -60.56 132.83 -61.69 126.25 C-63.24 120.01 -66.86 114.18 -72.19 110.5 C-80.98 105.81 -89.11 107.61 -97.94 111.19 Z ", t: "translate(202,105)" },
  { d: "M0 0 C2.69 0.25 2.69 0.25 4.5 1.69 C10.63 6.06 18.43 3.83 25.33 2.74 C29.24 2.17 32.75 1.95 36.69 2.25 C37.68 3.24 37.68 3.24 38.69 4.25 C38.06 19.46 20.19 37.5 9.7 47.64 C-1.78 57.56 -13.87 64.58 -29.31 65.25 C-31.31 62.25 -31.31 62.25 -31.15 59.91 C-30.15 56.75 -28.7 54.41 -26.88 51.62 C-17.16 36.26 -10.1 20.41 -4.09 3.27 C-2.95 0.32 -2.95 0.32 0 0 Z ", t: "translate(433.3125,303.75)" },
  { d: "M0 0 C2 3 2 3 1.84 5.34 C0.84 8.5 -0.61 10.84 -2.44 13.62 C-12.15 28.99 -19.21 44.84 -25.22 61.98 C-26 64 -26 64 -27 65 C-29.95 65.32 -31.44 65.44 -33.81 63.56 C-39.94 59.19 -47.74 61.42 -54.64 62.51 C-58.55 63.08 -62.06 63.3 -66 63 C-68 61 -68 61 -68.39 58.84 C-67.84 54.82 -65.86 51.9 -63.69 48.56 C-63.24 47.86 -62.79 47.16 -62.33 46.44 C-49.36 26.55 -26.96 -2.34 0 0 Z ", t: "translate(108,143)" },
  { d: "M0 0 C4.34 1.23 6.28 3.16 8.96 6.6 C9.42 7.17 9.88 7.73 10.35 8.32 C15.74 15.13 20.28 22.53 24.64 30.04 C25.09 30.72 25.53 31.41 25.98 32.12 C27.41 36.24 25.77 39.99 24.04 43.77 C23.38 45.11 22.7 46.45 22.02 47.79 C21.66 48.49 21.3 49.2 20.93 49.92 C17.95 55.66 14.67 60.97 10.64 66.04 C9.91 66.97 9.18 67.9 8.42 68.86 C2.54 75.9 2.54 75.9 -1.45 76.5 C-4.36 76.04 -4.36 76.04 -6.13 74.84 C-17.14 58.63 -11.28 27.3 -7.92 9.35 C-7.32 6.25 -6.8 3.79 -5.2 1.08 C-3.36 0.04 -3.36 0.04 0 0 Z ", t: "translate(319.35546875,240.96484375)" },
  { d: "M0 0 C3.1 0.7 3.82 1.18 5.75 3.62 C13.3 24.01 11.23 53.23 4.75 73.62 C3.59 75.58 3.59 75.58 1.75 76.62 C-2.64 76.67 -4.65 76.15 -7.99 73.25 C-8.87 72.2 -9.73 71.14 -10.56 70.06 C-11.25 69.21 -11.25 69.21 -11.96 68.34 C-17.35 61.53 -21.89 54.13 -26.25 46.62 C-26.69 45.94 -27.13 45.25 -27.59 44.54 C-29.02 40.4 -27.35 36.86 -25.72 33 C-25.07 31.68 -24.42 30.37 -23.75 29.06 C-23.4 28.37 -23.04 27.67 -22.68 26.95 C-9.62 1.85 -9.62 1.85 0 0 Z ", t: "translate(194.25,194.375)" }
];

  /* sparkle + speck positions, in the emblem's original 600-unit
     design space; mapped into the 512 viewBox at build time */
  var SPARKS = [[150,210,9],[452,150,7],[470,330,10],[140,360,7],[395,455,8],[205,452,7],[300,86,6]];
  var SPECKS = [[120,300],[480,240],[250,505],[355,95],[105,420],[505,415],[180,120],[420,505]];

  /* small neighbouring constellations — plain stick figures, no names */
  var FIGS = [
          [ [[6,42],[20,24],[32,32],[46,12],[54,22]] ],
          [ [[8,10],[22,26],[40,30],[52,44]] ],
          [ [[10,46],[28,10],[50,40],[10,46]] ],
          [ [[6,22],[22,18],[36,28],[52,20]], [[22,18],[27,42]] ]
        ];

  var NS = "http://www.w3.org/2000/svg";
  var CX = 256, CY = 256;
  var K = 0.682667; /* 600-unit design space -> 512 viewBox factor */
  function mp(v) { return +(256 + (v - 300) * K).toFixed(1); }

  function el(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function sparkPath(x, y, s) {
    var q = +(s * 0.22).toFixed(1);
    return "M " + x + " " + (y - s) +
           " L " + (x + q) + " " + (y - q) + " L " + (x + s) + " " + y +
           " L " + (x + q) + " " + (y + q) + " L " + x + " " + (y + s) +
           " L " + (x - q) + " " + (y + q) + " L " + (x - s) + " " + y +
           " L " + (x - q) + " " + (y - q) + " Z";
  }

  function buildEmblem() {
    var svg = document.getElementById("finEmblemSvg");
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var i;

    var defs = el("defs", {});
    var grad = el("radialGradient", { id: "finGlowCenter", cx: "50%", cy: "50%", r: "50%" });
    grad.appendChild(el("stop", { offset: "0%", "stop-color": "#eef3f8", "stop-opacity": "0.20" }));
    grad.appendChild(el("stop", { offset: "55%", "stop-color": "#d2dae4", "stop-opacity": "0.06" }));
    grad.appendChild(el("stop", { offset: "100%", "stop-color": "#d2dae4", "stop-opacity": "0" }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    /* — neighbouring constellations: a dim zodiac-style wheel of small
       stick figures circling the emblem, counter-rotating very slowly — */
    var WR = 225.3; /* wheel radius in the 512 viewBox */
    var orbit = el("g", { "class": "fin-orbit" });
    orbit.appendChild(el("circle", { cx: CX, cy: CY, r: WR, fill: "none",
      stroke: "rgba(196,206,218,.12)", "stroke-width": 1, "stroke-dasharray": "1.5 7" }));
    for (i = 0; i < 8; i++) {
      var angDeg = 10 + i * 45;
      var ang = angDeg * Math.PI / 180;
      var fx = CX + WR * Math.cos(ang), fy = CY + WR * Math.sin(ang);
      var fig = FIGS[i % FIGS.length];
      var fg = el("g", { "class": "fin-fade",
        transform: "translate(" + fx.toFixed(1) + " " + fy.toFixed(1) + ") rotate(" + (angDeg + 90) + ") translate(-30 -28)",
        style: "--d:" + (1.1 + i * 0.14).toFixed(2) + "s" });
      fig.forEach(function (line) {
        fg.appendChild(el("polyline", {
          points: line.map(function (p) { return p[0] + "," + p[1]; }).join(" "),
          fill: "none", stroke: "rgba(196,206,218,.42)", "stroke-width": 1 }));
        line.forEach(function (p, j) {
          fg.appendChild(el("circle", { cx: p[0], cy: p[1], r: j === 0 ? 2.3 : 1.6, fill: "rgba(226,233,240,.6)" }));
        });
      });
      orbit.appendChild(fg);
    }
    svg.appendChild(orbit);

    /* soft light at the centre of the circle, gently pulsing */
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: 80.5, fill: "url(#finGlowCenter)",
      "class": "fin-glowpulse", style: "--d:1.35s" }));

    /* the glyph itself, standing still at the centre of the pair
       while the fish circle around it — as in the reference */
    var glyph = el("text", { x: CX, y: CY, "text-anchor": "middle",
      "dominant-baseline": "central", "font-size": 42,
      fill: "rgba(226,233,240,.92)", "class": "fin-fade", style: "--d:2.9s",
      "font-family": "'Segoe UI Symbol','Noto Sans Symbols 2','Noto Sans Symbols','DejaVu Sans',serif" });
    glyph.textContent = "♓";
    svg.appendChild(glyph);

    /* the thin double ring */
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: 194, fill: "none",
      stroke: "rgba(196,206,218,.38)", "stroke-width": 1, "class": "fin-fade", style: "--d:.05s" }));
    svg.appendChild(el("circle", { cx: CX, cy: CY, r: 177, fill: "none",
      stroke: "rgba(196,206,218,.2)", "stroke-width": 1, "class": "fin-fade", style: "--d:.2s" }));

    /* scattered star specks + sparkles inside the ring, twinkling */
    for (i = 0; i < SPECKS.length; i++) {
      svg.appendChild(el("circle", { cx: mp(SPECKS[i][0]), cy: mp(SPECKS[i][1]), r: 1.6,
        fill: "rgba(226,233,240,.55)", "class": "fin-twinkle",
        style: "--d:" + (1.9 + i * 0.06).toFixed(2) + "s" }));
    }
    for (i = 0; i < SPARKS.length; i++) {
      svg.appendChild(el("path", { d: sparkPath(mp(SPARKS[i][0]), mp(SPARKS[i][1]), +(SPARKS[i][2] * K).toFixed(1)),
        fill: "rgba(232,238,245,.85)", "class": "fin-twinkle",
        style: "--d:" + (2.1 + i * 0.12).toFixed(2) + "s" }));
    }

    /* The owner's fish artwork, embedded whole in its own nested
       512 x 512 viewBox, sized to sit inside the inner ring (the same
       placement the approved preview used): the six paths stay
       together as ONE group — never split apart — rendered as dark
       smoked glass (near-black semi-transparent fill, clean white
       outline) on the frosted disc, and the whole group turns slowly
       clockwise around the centre while the glyph stands still. */
    var art = el("svg", { x: 78.5, y: 78.5, width: 355, height: 355, viewBox: "0 0 512 512",
      "class": "fin-art", style: "--d:.5s" });
    var ag = el("g", { "class": "fin-spin" });
    ART_PATHS.forEach(function (p) {
      ag.appendChild(el("path", { d: p.d, transform: p.t,
        fill: "rgba(8,11,16,0.78)",
        stroke: "rgba(255,255,255,0.95)", "stroke-width": 1.4,
        "stroke-linejoin": "round" }));
    });
    art.appendChild(ag);
    svg.appendChild(art);
  }

  /* ================= THE FINALE DOM ================= */
  root.innerHTML =
    '<div class="fin-box">' +
      '<div class="fin-main">' +

        '<aside class="fin-left fin-rise" style="transition-delay:.04s" aria-label="Emblem dua ikan: artwork milik pemilik situs — dua siluet ikan gelap di atas cakram kaca buram, berputar perlahan mengelilingi glif di tengahnya">' +
          '<div class="fin-stars" id="finStars" aria-hidden="true"></div>' +
          '<div class="fin-emblem-wrap">' +
            '<div class="fin-glass-disc" aria-hidden="true"></div>' +
            '<svg id="finEmblemSvg" viewBox="0 0 512 512" role="img" aria-label="Dua siluet ikan gelap di atas cakram kaca buram, berputar perlahan mengelilingi sebuah glif di pusat, di dalam cincin ganda tipis"></svg>' +
          '</div>' +
        '</aside>' +

        '<div class="fin-right">' +

          '<header class="fin-head fin-rise" style="transition-delay:.08s">' +
            '<div class="fin-tears-type" role="img" aria-label="TEARS">' +
              '<span class="fin-typed" id="finTearsTyped" aria-hidden="true"></span><span class="fin-caret" aria-hidden="true">_</span>' +
            '</div>' +
            '<div class="fin-subrow">' +
              '<p class="fin-handle">@FathirThoriq</p>' +
              '<p class="fin-motto">Everyone Has the Same Chance</p>' +
              '<div class="fin-tools">' +
                '<button id="finReplayBtn" type="button">↺ PUTAR ULANG</button>' +
                '<button id="finCloseBtn" type="button">✕ TUTUP</button>' +
              '</div>' +
            '</div>' +
          '</header>' +

          '<div class="fin-mid">' +

            '<section class="fin-rise" style="transition-delay:.13s" aria-label="Profile">' +
              '<h3 class="fin-btitle">PROFILE</h3>' +
              '<h4 class="fin-name">Mohammad Yassir Thoriq Fathirurrizqy</h4>' +
              '<p class="fin-role">Informatics Engineering Student | Mobile &amp; Backend Developer</p>' +
              '<dl class="fin-rows">' +
                '<div><dt>Location</dt><dd>Jember, Jawa Timur</dd></div>' +
                '<div><dt>Email</dt><dd><a href="mailto:fathirthoriq9@gmail.com">fathirthoriq9@gmail.com</a></dd></div>' +
                '<div><dt>GitHub</dt><dd><a href="https://github.com/FathirThoriq">github.com/FathirThoriq</a></dd></div>' +
                '<div><dt>LinkedIn</dt><dd><a href="https://www.linkedin.com/in/fathir-thoriq-05a01a3a4">linkedin.com/in/fathir-thoriq-05a01a3a4</a></dd></div>' +
              '</dl>' +
              '<p class="fin-sub">PENGALAMAN</p>' +
              '<p class="fin-line"><b>UPA TIK UNEJ</b> — Network Technician Intern <span>(2023)</span></p>' +
              '<p class="fin-line"><b>PT Telkom Jember</b> — Warehouse Admin Intern <span>(2023)</span></p>' +
              '<p class="fin-sub">PENDIDIKAN</p>' +
              '<p class="fin-line"><b>Politeknik Negeri Jember</b> — Applied IT <span>| GPA: 3.67</span></p>' +
              '<p class="fin-line"><b>SMKN 5 Jember</b> — Computer &amp; Network Eng. <span>(2021–2024)</span></p>' +
            '</section>' +

            '<section class="fin-rise" style="transition-delay:.17s" aria-label="Technologies">' +
              '<h3 class="fin-btitle">STACK</h3>' +
              '<div class="fin-tech-row">' +
                '<span class="fin-tech"><span class="fin-key">J</span>JAVA</span>' +
                '<span class="fin-tech"><span class="fin-key">JS</span>JAVASCRIPT</span>' +
                '<span class="fin-tech"><span class="fin-key">P</span>PHP</span>' +
                '<span class="fin-tech"><span class="fin-key">Py</span>PYTHON</span>' +
                '<span class="fin-tech"><span class="fin-key">Da</span>DART</span>' +
                '<span class="fin-tech"><span class="fin-key">Fl</span>FLUTTER</span>' +
                '<span class="fin-tech"><span class="fin-key">La</span>LARAVEL</span>' +
                '<span class="fin-tech"><span class="fin-key">My</span>MYSQL</span>' +
                '<span class="fin-tech"><span class="fin-key">Gt</span>GIT</span>' +
              '</div>' +
            '</section>' +

            '<section class="fin-rise" style="transition-delay:.21s" aria-label="System">' +
              '<h3 class="fin-btitle">SYSTEM</h3>' +
              '<div class="fin-os-stage" id="finOsStage">' +
                '<pre class="fin-ascii" id="finOsAscii" aria-label="Logo ASCII sistem operasi yang berganti-ganti"></pre>' +
                '<p class="fin-osname" id="finOsName">FEDORA LINUX</p>' +
              '</div>' +
              '<p class="fin-sysline"><span class="fin-dia">◆</span><span id="finOsLine">Fedora Linux — daily driver</span></p>' +
              '<p class="fin-sysline"><span class="fin-dia">◆</span>Obsessed With Opensource &amp; FLOSS</p>' +
              '<p class="fin-sysline"><span class="fin-dia">◆</span>TIL notes, one honest commit at a time</p>' +
            '</section>' +

          '</div>' +

          '<section class="fin-works fin-rise" style="transition-delay:.25s" aria-label="Projects">' +
            '<h3 class="fin-btitle">PROJECTS <span class="fin-sec-note">things i built</span></h3>' +
            '<article class="fin-polter">' +
              '<div class="fin-p-top">' +
                '<div class="fin-p-id">' +
                  '<svg class="fin-ghost-bob" width="27" height="31" viewBox="0 0 26 30" aria-hidden="true">' +
                    '<path d="M13 1.5 C7 1.5 3 6 3 12.5 L3 28 L6.8 24.6 L10.2 28 L13.4 24.9 L16.6 28 L20 24.6 L23 28 L23 12.5 C23 6 19 1.5 13 1.5 Z" fill="none" stroke="#e8e8e8" stroke-width="1.8" stroke-linejoin="round" />' +
                    '<circle cx="9.2" cy="12.5" r="1.7" fill="#e8e8e8" />' +
                    '<circle cx="16.8" cy="12.5" r="1.7" fill="#e8e8e8" />' +
                  '</svg>' +
                  '<div>' +
                    '<h4><a href="https://github.com/FathirThoriq/Polter">Polter</a></h4>' +
                    '<p class="fin-p-tag">Polter : Unseen, Unheard, Done.</p>' +
                  '</div>' +
                '</div>' +
                '<p class="fin-p-meta">BROWSER EXTENSION · MANIFEST V3 · VANILLA JS &nbsp;·&nbsp; <a href="https://github.com/FathirThoriq/Polter">github.com/FathirThoriq/Polter</a></p>' +
              '</div>' +
              '<p class="fin-p-desc">A monochrome black-and-white browser extension (Manifest V3, vanilla JS) with a ghost mascot. It answers questions from a text selection, a screen-area capture, or direct form detection in the DOM — then fills the answers in automatically, never submitting the final form for you.</p>' +
            '</article>' +
            '<div class="fin-cards">' +
              '<a class="fin-card" href="https://github.com/FathirThoriq/Retrocam98">' +
                '<span class="fin-rname">RetroCam 98</span>' +
                '<span class="fin-rdesc">A retro camcorder-styled browser extension for complete webcam control in browser meetings — brightness, contrast, exposure, white balance, focus &amp; presets, plus an Auto mode that analyzes your frame and dials in the best settings.</span>' +
                '<span class="fin-rlang"><i></i>JavaScript · Manifest V3</span>' +
              '</a>' +
              '<a class="fin-card" href="https://floodcare.my.id">' +
                '<span class="fin-rname">FloodCare Mobile</span>' +
                '<span class="fin-rdesc">The mobile app of FloodCare — a flood education &amp; real-time flood reporting system. Built with Flutter &amp; Dart as a full-stack team project: PHP/Laravel/MySQL backend and web interface, database schema (ERD) design.</span>' +
                '<span class="fin-rlang"><i></i>Dart · Flutter</span>' +
              '</a>' +
              '<a class="fin-card" href="https://github.com/FathirThoriq/CodePlay">' +
                '<span class="fin-rname">CodePlay</span>' +
                '<span class="fin-rdesc">A Java project — code, play, repeat.</span>' +
                '<span class="fin-rlang"><i></i>Java</span>' +
              '</a>' +
            '</div>' +
          '</section>' +

          '<footer class="fin-foot fin-rise" style="transition-delay:.3s">' +
            '<span><span class="fin-fname">TEARS</span> &nbsp;—&nbsp; @FathirThoriq</span>' +
            '<nav>' +
              '<a href="https://github.com/FathirThoriq">GitHub</a>' +
              '<a href="mailto:fathirthoriq9@gmail.com">fathirthoriq9@gmail.com</a>' +
            '</nav>' +
          '</footer>' +

        '</div>' +
      '</div>' +
    '</div>';

  buildEmblem();
  buildStars();

  /* scattered stars across the left panel, around the emblem —
     deterministic pseudo-random so the sky is stable on every load */
  function buildStars() {
    var holder = document.getElementById("finStars");
    if (!holder) return;
    var seed = 987654321;
    function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
    var html = "";
    for (var i = 0; i < 90; i++) {
      var x = (rnd() * 100).toFixed(2), y = (rnd() * 100).toFixed(2);
      var s = (0.8 + rnd() * 1.9).toFixed(1);
      var big = rnd() > 0.88;
      if (big) s = (2.6 + rnd() * 1.2).toFixed(1);
      html += '<i style="left:' + x + '%;top:' + y + '%;width:' + s + 'px;height:' + s + 'px;--d:' + (rnd() * 2.4).toFixed(2) + 's;--t:' + (2.6 + rnd() * 2.2).toFixed(2) + 's' + (big ? ';box-shadow:0 0 6px 1px rgba(233,239,246,.55)' : '') + '"></i>';
    }
    holder.innerHTML = html;
  }

  /* ================= SYSTEM — OS LOGO ROTATION =================
     Cycles Fedora -> Arch -> Debian -> NixOS every ~2.5 s with a
     short fade. Runs only while the finale is open. */
  var OSES = [
          { name: "FEDORA LINUX", line: "Fedora Linux — daily driver",
            art: ["     .::::::::::.",
                  "    :::::  :::: :::",
                  "    :::       :::",
                  "    :::.::::::::'",
                  "    :::::::::::",
                  "    :::",
                  "    :::"].join("\n") },
          { name: "ARCH LINUX", line: "Arch Linux — rolling, minimal, DIY",
            art: ["          /\\",
                  "         /  \\",
                  "        / /\\ \\",
                  "       / /  \\ \\",
                  "      /  ____  \\",
                  "     /__/    \\__\\"].join("\n") },
          { name: "DEBIAN", line: "Debian — the universal operating system",
            art: ["      .-~~~~~~~~-.",
                  "     /  .-~~~~~~.  \\",
                  "    |  /  .-\"\"-.  \\ |",
                  "    |  |  (  _)  )  |",
                  "     \\  \\  '-'-'  /",
                  "      '-.________-'"].join("\n") },
          { name: "NIXOS", line: "NixOS — declarative & reproducible",
            art: ["       \\   |   /",
                  "        \\  |  /",
                  "    ------ * ------",
                  "        /  |  \\",
                  "       /   |   \\"].join("\n") }
        ];

  var osStage = document.getElementById("finOsStage");
  var osPre = document.getElementById("finOsAscii");
  var osNameEl = document.getElementById("finOsName");
  var osLineEl = document.getElementById("finOsLine");
  var osIdx = 0, osTimer = null, osSwapTimer = null, osRunning = false;

  function osShow(i) {
    if (!osPre || !osNameEl || !osLineEl) return;
    osPre.textContent = OSES[i].art;
    osNameEl.textContent = OSES[i].name;
    osLineEl.textContent = OSES[i].line;
  }
  function osStart() {
    if (osRunning || !osStage) return;
    osRunning = true;
    osShow(osIdx);
    osTimer = setInterval(function () {
      osStage.classList.add("fin-swap");
      osSwapTimer = setTimeout(function () {
        osIdx = (osIdx + 1) % OSES.length;
        osShow(osIdx);
        osStage.classList.remove("fin-swap");
      }, 360);
    }, 2500);
  }
  function osStop() {
    osRunning = false;
    if (osTimer) { clearInterval(osTimer); osTimer = null; }
    if (osSwapTimer) { clearTimeout(osSwapTimer); osSwapTimer = null; }
    if (osStage) osStage.classList.remove("fin-swap");
  }
  osShow(0);

  /* ================= TEARS — TYPEWRITER =================
     The big wordmark is typed letter by letter (T -> TE -> TEA ->
     TEAR -> TEARS) at ~150 ms per letter; once complete it reads
     "TEARS_" with the underscore blinking as a caret, holds ~2.5 s,
     then erases quickly and starts over — looping for as long as
     the finale is open. */
  var tearsSpan = document.getElementById("finTearsTyped");
  var TEARS_WORD = "TEARS";
  var tearsTimer = null, tearsRunning = false;
  var reducedMotion = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  function tearsSet(n) { if (tearsSpan) tearsSpan.textContent = TEARS_WORD.slice(0, n); }
  function tearsClear() { if (tearsTimer) { clearTimeout(tearsTimer); tearsTimer = null; } }
  function tearsTypeStep(n) {
    if (!tearsRunning) return;
    tearsSet(n);
    if (n < TEARS_WORD.length) {
      tearsTimer = setTimeout(function () { tearsTypeStep(n + 1); }, 150);
    } else {
      tearsTimer = setTimeout(function () { tearsDelStep(TEARS_WORD.length); }, 2500);
    }
  }
  function tearsDelStep(n) {
    if (!tearsRunning) return;
    if (n > 0) {
      tearsSet(n - 1);
      tearsTimer = setTimeout(function () { tearsDelStep(n - 1); }, 55);
    } else {
      tearsTimer = setTimeout(function () { tearsTypeStep(1); }, 420);
    }
  }
  function tearsStart() {
    if (!tearsSpan) return;
    if (reducedMotion) { tearsSet(TEARS_WORD.length); return; }
    if (tearsRunning) return;
    tearsRunning = true;
    tearsSet(0);
    tearsTimer = setTimeout(function () { tearsTypeStep(1); }, 380);
  }
  function tearsStop() { tearsRunning = false; tearsClear(); }

  /* ================= OPEN / CLOSE ================= */
  var closeBtn = document.getElementById("finCloseBtn");
  var replayBtn = document.getElementById("finReplayBtn");
  var isOpen = false;
  var prevBodyOverflow = "";
  var hideTimer = null;

  function openFinale() {
    if (isOpen) return;
    isOpen = true;
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    root.hidden = false;
    buildEmblem(); /* replay the emblem's entrance animations */
    void root.offsetWidth; /* reflow so the fade-in transition runs */
    root.classList.add("fin-open");
    root.setAttribute("aria-hidden", "false");
    prevBodyOverflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden"; /* lock the page scroll */
    tearsStart();
    osStart();
  }

  function closeFinale() {
    if (!isOpen) return;
    isOpen = false;
    tearsStop();
    osStop();
    root.classList.remove("fin-open");
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = prevBodyOverflow;
    hideTimer = setTimeout(function () { if (!isOpen) root.hidden = true; }, 560);
  }

  if (openBtn) openBtn.addEventListener("click", openFinale);
  if (closeBtn) closeBtn.addEventListener("click", closeFinale);
  if (replayBtn) replayBtn.addEventListener("click", function () {
    /* PUTAR ULANG: restart the whole site from the loading screen */
    try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (err) {}
    /* navigate to a fresh URL so no cached copy of the page or its
       scripts can survive — the site restarts from its loading screen */
    window.location.replace(window.location.pathname + "?replay=" + Date.now());
  });
  document.addEventListener("keydown", function (e) {
    if (isOpen && e.key === "Escape") closeFinale();
  });
})();

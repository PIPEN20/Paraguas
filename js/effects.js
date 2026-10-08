/* =============================================================================
 * effects.js - one subtle grey background animation per slide
 *
 * FX[i] is the animation of slide i (rain, ripples, light sweeps, rising
 * lines, bars, a network...). Only the active slide's layer is visible; the
 * others are paused (see css/effects.css). Random values come from a seeded
 * generator, so the page looks the same on every load.
 * ========================================================================== */

// --- helpers -----------------------------------------------------------------
// Tiny seeded random number generator (0..1).
let sd = 7;
const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
// Repeats a template n times and joins the result into one string.
const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join("");
// Falling raindrops, the whole layer rotated by `deg`.
const rain = (n, deg) =>
  `<div class="rain" style="transform:rotate(${deg}deg)">${rep(
    n,
    () => `<i style="--x:${rnd() * 100}%;--h:${40 + rnd() * 60}px;--t:${3 + rnd() * 3}s;--d:-${rnd() * 6}s">
      </i>`,
  )}</div>`;
// Expanding rings (ripples / signal waves). xf() and yf() give each ring its position in %.
const rgs = (n, t, s, xf, yf) =>
  `<div class="rg">${rep(
    n,
    (i) => `<i style="--x:${xf()}%;--y:${yf()}%;--t:${t}s;--d:-${(i * t) / n}s;--s:${s}">
      </i>`,
  )}</div>`;
// Thin lines rising from the bottom (energy / charging).
const rise = (n) =>
  `<div class="rise">${rep(
    n,
    () => `<i style="--x:${rnd() * 100}%;--h:${40 + rnd() * 70}px;--t:${5 + rnd() * 5}s;--d:-${rnd() * 9}s">
      </i>`,
  )}</div>`;
// Thin lines moving horizontally (urban movement).
const flow = (n) =>
  `<div class="flow">${rep(
    n,
    () => `<i style="--y:${rnd() * 100}%;--w:${60 + rnd() * 120}px;--t:${5 + rnd() * 6}s;--d:-${rnd() * 8}s">
      </i>`,
  )}</div>`;
// Bars that grow and shrink (business chart).
const bars = `<div class="bars">${rep(
  14,
  () => `<i style="--h:${25 + rnd() * 70}%;--t:${4 + rnd() * 4}s;--d:-${rnd() * 6}s">
      </i>`,
)}</div>`;
// Network of connected, pulsing nodes (partners).
const nodes = [
  [15, 15],
  [45, 30],
  [80, 12],
  [30, 50],
  [70, 48],
  [92, 34],
];
const net = `<svg class="net" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice">
      <path class="dl" d="M15 15L45 30L80 12M45 30L30 50L70 48L80 12M45 30L70 48L92 34L80 12M15 15L30 50" fill="none" stroke="rgba(255,255,255,.6)" stroke-width=".25" stroke-dasharray="1 1"/>${nodes.map((p, i) => `<circle class="nd" cx="${p[0]}" cy="${p[1]}" r="1.3" style="animation-delay:-${i * 0.7}s"/>`).join("")}</svg>`;
// Soft drifting clouds with light rain.
const clouds = `${rep(
  3,
  (i) => `<div class="cl" style="--x:${i * 30 - 10}%;--y:${5 + i * 25}%;--t:${14 + i * 5}s">
      </div>`,
)}${rain(8, 6)}`;
// --- one layer per slide ------------------------------------------------------
const FX = [
  `<div class="sweep">
      </div>
      <div class="sweep" style="animation-delay:-5s">
      </div>`,
  rain(40, 8),
  rgs(
    8,
    5,
    3,
    () => 10 + rnd() * 80,
    () => 10 + rnd() * 80,
  ),
  rain(34, 14),
  `<div class="spk">
      </div>`,
  rain(16, -15) + rain(16, 15),
  rgs(
    4,
    6,
    9,
    () => 22,
    () => 50,
  ),
  rgs(
    4,
    1.8,
    4,
    () => 50,
    () => 50,
  ),
  clouds,
  rise(28),
  flow(24),
  bars,
  net,
];
const bg = document.getElementById("bg"),
  fxs = FX.map((h) => {
    const d = document.createElement("div");
    d.className = "fx";
    d.innerHTML = h;
    bg.appendChild(d);
    return d;
  });

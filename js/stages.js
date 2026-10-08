/* =============================================================================
 * stages.js - the 4-step drawing of the reverse closing mechanism (slide 5)
 * Each stage is the umbrella with its ribs at a different angle; the stages
 * light up one after another (CSS class .stg in css/illustration.css).
 * ========================================================================== */

const closingStagesSVG = () => {
  const L = 64,
    H = 108,
    names = ["Abierto", "Se levanta", "Se invierte", "Cerrado"];
  return (
    `<svg class="rv" viewBox="0 0 520 268" style="width:100%">
      <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0L10 5L0 10z" fill="#fff"/>
      </marker>
      </defs>` +
    [62, 98, 140, 173]
      .map((t, k) => {
        const cx = 65 + k * 130,
          r = (t * Math.PI) / 180,
          dx = L * Math.sin(r),
          y = H + L * Math.cos(r),
          flipped = k >= 2,
          // top curve of the fabric: dome when open, sagging between the ribs once it flips
          tc = [H - 36, H - 12, H + 6, H + 2][k];
        return `<g class="stg" style="animation-delay:${k * 1.5}s">
      <path d="M${cx - dx} ${y}Q${cx} ${tc} ${cx + dx} ${y}Q${cx} ${flipped ? y - 14 : y + 14} ${cx - dx} ${y}Z" fill="${flipped ? "url(#gB)" : "#1b1f27"}" stroke="${flipped ? "#7fb8ff" : "#4da3ff"}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M${cx} ${H}L${cx - dx} ${y}M${cx} ${H}L${cx + dx} ${y}" stroke="#cfd5df" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${H}" r="4" fill="#dfe4ec"/>
      <path d="M${cx} ${H}V205" stroke="#8a93a3" stroke-width="5" stroke-linecap="round"/>
      <rect x="${cx - 8}" y="184" width="16" height="40" rx="7" fill="#15181e" stroke="#4da3ff" stroke-width="2"/>
      <text x="${cx}" y="252" fill="#fff" font-size="15" text-anchor="middle" font-family="Inter,sans-serif">${k + 1}. ${names[k]}</text>
      </g>`;
      })
      .join("") +
    [0, 1, 2]
      .map(
        (k) =>
          `<path class="stga" style="animation-delay:${k * 1.5 + 0.75}s" d="M${cx0(k) + 38} 34Q${cx0(k) + 65} 8 ${cx0(k) + 92} 34" fill="none" stroke="#fff" stroke-width="2.2" marker-end="url(#ah)"/>`,
      )
      .join("") +
    `</svg>`
  );
};
const cx0 = (k) => 65 + k * 130;

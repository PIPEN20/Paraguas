/* =============================================================================
 * stages.js - the 4-step drawing of the reverse closing mechanism (slide 5)
 * Each stage is the umbrella with its ribs at a different angle; the stages
 * light up one after another (CSS class .stg in css/illustration.css).
 * ========================================================================== */

const closingStagesSVG = () => {
  const L = 50,
    H = 70;
  return (
    `<svg class="rv" viewBox="0 0 480 215" style="width:100%">
      <defs>
      <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0 0L10 5L0 10z" fill="#fff"/>
      </marker>
      </defs>` +
    [62, 95, 138, 174]
      .map((t, k) => {
        const cx = 60 + k * 120,
          r = (t * Math.PI) / 180,
          dx = L * Math.sin(r),
          dy = L * Math.cos(r),
          y = H + dy,
          tc = H - 42 + k * 10;
        return `<g class="stg" style="animation-delay:${k * 1.5}s">
      <path d="M${cx - dx} ${y}Q${cx} ${tc} ${cx + dx} ${y}Q${cx} ${y + 14} ${cx - dx} ${y}Z" fill="${k < 2 ? "#1b1f27" : "#0f3a78"}" stroke="#4da3ff" stroke-width="1.5"/>
      <path d="M${cx} ${H}L${cx - dx} ${y}M${cx} ${H}L${cx + dx} ${y}" stroke="#aab0bb" stroke-width="2"/>
      <path d="M${cx} ${H}V185" stroke="#8a93a3" stroke-width="4" stroke-linecap="round"/>
      <rect x="${cx - 6}" y="165" width="12" height="32" rx="5" fill="#222" stroke="#4da3ff"/>
      <text x="${cx}" y="212" fill="#aab0bb" font-size="13" text-anchor="middle" font-family="Chakra Petch">${k + 1}</text>
      </g>`;
      })
      .join("") +
    [0, 1, 2]
      .map(
        (k) =>
          `<path d="M${88 + k * 120} 28Q${118 + k * 120} 6 ${146 + k * 120} 28" fill="none" stroke="#fff" stroke-width="1.8" marker-end="url(#ah)"/>`,
      )
      .join("") +
    `</svg>`
  );
};

/* =============================================================================
 * navigation.js - builds the slides and lets you move between them
 *   PC:      arrow keys (also PageUp/PageDown and Space)
 *   Touch:   tap the left / right half of the screen, or swipe
 *   Mouse:   click the left / right half
 * The current slide number is kept in the URL (#5 opens slide 5).
 * ========================================================================== */

// Create one <section> per slide.
const root = document.body,
  els = SLIDES.map((s) => {
    const d = document.createElement("section");
    d.className = "s";
    d.innerHTML = s.h;
    root.appendChild(d);
    return d;
  });
// Show slide n: animate the old slide out, the new one in, and update bar, counter and author.
const who = document.getElementById("who");
let cur = -1;
function go(n) {
  n = Math.max(0, Math.min(SLIDES.length - 1, n));
  if (n === cur) return;
  const dir = n > cur ? 1 : -1;
  els.forEach((e) => e.style.setProperty("--dir", dir));
  if (cur >= 0) {
    const o = els[cur];
    o.classList.remove("on");
    o.classList.add("out");
    setTimeout(() => o.classList.remove("out"), 700);
  }
  if (cur >= 0) fxs[cur].classList.remove("on");
  fxs[n].classList.add("on");
  cur = n;
  els[n].classList.remove("out");
  els[n].classList.add("on");
  els[n].scrollTop = 0;
  who.style.opacity = 0;
  setTimeout(() => {
    who.textContent = SLIDES[n].w || "";
    who.style.opacity = SLIDES[n].w ? 1 : 0;
  }, 250);
  document.getElementById("ct").textContent = n + 1 + " / " + SLIDES.length;
  document.getElementById("pr").style.width = ((n + 1) / SLIDES.length) * 100 + "%";
  location.hash = n + 1;
}
// Keyboard
addEventListener("keydown", (e) => {
  if (["ArrowRight", "PageDown", " "].includes(e.key)) {
    e.preventDefault();
    go(cur + 1);
  } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
    e.preventDefault();
    go(cur - 1);
  }
});
// Touch / mouse: pointer events are used because iPhone Safari does not fire "click" on empty areas.
// A short tap changes slide by screen half; a horizontal drag of 50px or more is a swipe.
let px = 0,
  py = 0;
const tap = (x) => go(x < innerWidth / 2 ? cur - 1 : cur + 1);
const end = (x, y) => {
  const dx = x - px,
    dy = y - py;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cur + (dx < 0 ? 1 : -1));
  else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) tap(x);
};
if (window.PointerEvent) {
  addEventListener("pointerdown", (e) => {
    px = e.clientX;
    py = e.clientY;
  });
  addEventListener("pointerup", (e) => end(e.clientX, e.clientY));
} else {
  addEventListener(
    "touchstart",
    (e) => {
      px = e.touches[0].clientX;
      py = e.touches[0].clientY;
    },
    { passive: true },
  );
  addEventListener("touchend", (e) => {
    const t = e.changedTouches[0];
    end(t.clientX, t.clientY);
    e.preventDefault();
  });
  addEventListener("mouseup", (e) => end(e.clientX, e.clientY));
  addEventListener("mousedown", (e) => {
    px = e.clientX;
    py = e.clientY;
  });
}
// Start on the slide given in the URL (default: first).
go(Math.max(0, (parseInt(location.hash.slice(1)) || 1) - 1));

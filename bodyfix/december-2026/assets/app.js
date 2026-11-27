
// Carousels: swipe, buttons, dots. Reels: tap to play. Keyboard: left/right for posts, Esc for all posts.
document.querySelectorAll(".carousel").forEach(function (c) {
  var t = c.querySelector(".track"), n = +c.dataset.count, prev = c.querySelector(".cprev"), next = c.querySelector(".cnext"),
      dots = c.querySelectorAll(".cdots span"), count = c.querySelector(".ccount");
  function at() { return Math.round(t.scrollLeft / t.clientWidth); }
  function show() { var i = at(); prev.hidden = i <= 0; next.hidden = i >= n - 1; dots.forEach(function (d, k) { d.classList.toggle("on", k === i); }); count.textContent = (i + 1) + "/" + n; }
  function go(i) { t.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * t.clientWidth }); }
  prev.onclick = function () { go(at() - 1); }; next.onclick = function () { go(at() + 1); };
  t.addEventListener("scroll", function () { requestAnimationFrame(show); }, { passive: true });
  c.go = go; c.at = at; show();
});
// Reels play on their own with the sound off (as on Instagram). The speaker button turns sound on; a tap on the video pauses or plays.
document.querySelectorAll(".reel").forEach(function (r) {
  var v = r.querySelector("video"), b = r.querySelector(".mute");
  var ICONS = { muted: "<path d=\"M4 9h4l5-4v14l-5-4H4z\"/><path d=\"m17 9 5 6M22 9l-5 6\"/>", sound: "<path d=\"M4 9h4l5-4v14l-5-4H4z\"/><path d=\"M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12\"/>" };
  v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () {});
  function show() { b.querySelector("svg").innerHTML = v.muted ? ICONS.muted : ICONS.sound; b.setAttribute("aria-label", v.muted ? "Turn sound on" : "Turn sound off"); }
  b.onclick = function (e) {
    e.stopPropagation(); v.muted = !v.muted; show();
    // if the browser refuses sound, keep the video playing silently
    var q = v.play(); if (q && q.catch) q.catch(function () { v.muted = true; show(); v.play(); });
  };
  v.onclick = function () { if (v.paused) v.play(); else v.pause(); };
});
document.addEventListener("keydown", function (e) {
  if (e.target.closest && e.target.closest("input,textarea,video")) return;
  if (e.key === "Escape") location.href = "index.html";
  if (e.key === "ArrowLeft" && NAV.prev) location.href = NAV.prev;
  if (e.key === "ArrowRight" && NAV.next) location.href = NAV.next;
});

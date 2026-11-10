/* BCM motion helpers. Scroll-triggered reveals via IntersectionObserver.
   Markup hooks:
     data-rv   gallery card entrance (staggered per batch)
     data-pv   card preview: plays .rise/.pop/.grow/.slide/.blur children
     data-in   generic container: gets .is-in when scrolled into view
     data-read editorial reading reveal, line by line (text is preserved)
     data-count numbers that count up to their exact final value
   With reduced motion (or no IntersectionObserver) nothing is hidden and counts show final values. */
(function () {
  "use strict";
  var osReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches, forced = false;
  try { forced = localStorage.getItem("bcm-motion") === "on"; } catch (e) {}
  var reduce = osReduce && !forced;
  if (osReduce && forced) document.documentElement.classList.add("m-force");
  var can = !reduce && "IntersectionObserver" in window;
  if (can) document.documentElement.classList.add("m-on");

  var io = can ? new IntersectionObserver(onHit, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }) : null;
  var splitEls = [];

  function fmt(v, d, el) {
    return (el.dataset.prefix || "") + v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) + (el.dataset.suffix || "");
  }
  function finalText(el) { return fmt(parseFloat(el.dataset.count), +el.dataset.decimals || 0, el); }
  function count(el) {
    var v = parseFloat(el.dataset.count), d = +el.dataset.decimals || 0;
    if (!can) { el.textContent = finalText(el); return; }
    var dur = +el.dataset.duration || 1100, delay = +el.dataset.delay || 0, t0 = null;
    el.textContent = fmt(0, d, el);
    function step(t) {
      if (t0 === null) t0 = t + delay;
      var p = Math.min(Math.max((t - t0) / dur, 0), 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = p < 1 ? fmt(v * e, d, el) : finalText(el);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Wrap each word in a span and record which line it sits on, without changing the text */
  function split(el) {
    if (el.__words) return;
    var words = [];
    (function walk(n) {
      [].slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            var s = document.createElement("span"); s.className = "w"; s.textContent = p;
            frag.appendChild(s); words.push(s);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1 && !c.classList.contains("w")) walk(c);
      });
    })(el);
    el.__words = words;
    splitEls.push(el);
    lines(el);
  }
  function lines(el) {
    var top = null, l = -1;
    el.__words.forEach(function (w) {
      var t = w.offsetTop;
      if (top === null || Math.abs(t - top) > 4) { l++; top = t; }
      w.style.setProperty("--l", l);
    });
  }
  var rz; window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { splitEls.forEach(function (e) { if (document.body.contains(e)) lines(e); }); }, 150); });

  var pending = [], flush = 0;
  function onHit(entries) {
    var hits = entries.filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
    hits.forEach(function (en, i) {
      var el = en.target; io.unobserve(el);
      if (el.hasAttribute("data-rv")) el.style.setProperty("--d", Math.min(i, 8) * 70 + "ms");
      reveal(el);
    });
  }
  function reveal(el) {
    el.classList.add("is-in");
    if (el.hasAttribute("data-read")) el.classList.add("is-read");
    [].forEach.call(el.querySelectorAll("[data-count]"), count);
    if (el.hasAttribute("data-count")) count(el);
  }

  var M = {
    /* Register everything inside root */
    scan: function (root) {
      var els = (root || document).querySelectorAll("[data-rv],[data-pv],[data-in],[data-read]");
      [].forEach.call(els, function (el) {
        if (!can) { [].forEach.call(el.querySelectorAll("[data-count]"), function (c) { c.textContent = finalText(c); }); return; }
        if (el.hasAttribute("data-read")) split(el);
        [].forEach.call(el.querySelectorAll("[data-count]"), function (c) { c.textContent = fmt(0, +c.dataset.decimals || 0, c); });
        io.observe(el);
      });
    },
    /* Play a scene again from the start */
    replay: function (el) {
      if (!can) return;
      var all = [].slice.call(el.querySelectorAll(".is-in,.is-read"));
      if (el.classList.contains("is-in") || el.classList.contains("is-read")) all.unshift(el);
      all.forEach(function (n) { n.classList.remove("is-in", "is-read"); });
      [].forEach.call(el.querySelectorAll("[data-count]"), function (c) { c.textContent = fmt(0, +c.dataset.decimals || 0, c); });
      void el.offsetWidth;
      setTimeout(function () { all.forEach(reveal); }, 80);
    },
    reduced: reduce
  };
  window.BCM_MOTION = M;

  /* If the device asks for reduced motion, say so and let the reviewer opt in to the animations */
  function note() {
    var bar = document.createElement("div"); bar.className = "m-note"; bar.setAttribute("role", "status");
    var on = osReduce && forced;
    bar.innerHTML = "<span>" + (on ? "Animations are on for this review. Your device is set to reduce motion." : "Your device is set to reduce motion, so animations are switched off.") + "</span><button type=\"button\">" + (on ? "Turn animations off" : "Play animations") + "</button>";
    bar.querySelector("button").addEventListener("click", function () {
      try { localStorage.setItem("bcm-motion", on ? "off" : "on"); } catch (e) { bar.firstChild.textContent = "This browser blocks saving the choice, so it can't be switched here."; return; }
      location.reload();
    });
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (osReduce) { if (document.body) note(); else document.addEventListener("DOMContentLoaded", note); }

  /* Tilt: on pointer devices a card's mock-up leans toward the pointer, then settles back */
  if (can && window.matchMedia("(hover:hover)").matches) {
    var cur = null;
    function rest(p) { if (p) { p.style.removeProperty("--rx"); p.style.removeProperty("--ry"); p.style.removeProperty("--sc"); } }
    document.addEventListener("pointermove", function (e) {
      var p = e.target.closest && e.target.closest(".bcm-card__preview");
      if (p !== cur) {
        rest(cur); cur = p;
        /* Hovering a card plays its preview again, so the motion can be seen on demand */
        if (p && p.classList.contains("is-in") && Date.now() - (p.__played || 0) > 1600) { p.__played = Date.now(); M.replay(p); }
      }
      if (!p) return;
      var r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      p.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
      p.style.setProperty("--rx", (-y * 6).toFixed(2) + "deg");
      p.style.setProperty("--sc", "1.015");
    }, { passive: true });
    document.addEventListener("pointerleave", function () { rest(cur); cur = null; });
  }
})();

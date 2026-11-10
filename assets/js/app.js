/* BCM Custom Blocks: gallery (grid or list) and block detail pages.
   Vanilla JS, hash routing, content from data/blocks.json. */
(function () {
  "use strict";
  var main = document.getElementById("bcm-main");
  var DATA = null, view = "gallery", spy = null, firstLoad = true;
  var reduce = window.BCM_MOTION ? window.BCM_MOTION.reduced : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { view = localStorage.getItem("bcm-view") || "gallery"; } catch (e) {}

  var HERO = {
    title: "BCM Custom Blocks",
    body: "A collection of custom blocks designed to bring richer storytelling and interactive experiences to BCM articles. Choose a block and build it directly in the WordPress editor."
  };
  var SECTIONS = [
    ["definition", "Definition"], ["how-it-works", "How it works"], ["expected", "What is expected"],
    ["provided", "What should be provided"], ["how-to-use", "How to use it"], ["where", "Where to use it"], ["examples", "Examples"]
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function catName(id) { return DATA.categories.filter(function (c) { return c.id === id; })[0].name; }
  function byId(id) { return DATA.blocks.filter(function (b) { return b.id === id; })[0]; }
  function metaLine(b) { return b.usedOn && b.usedOn.length ? "Used on: " + esc(b.usedOn.join(", ")) : ""; }

  /* ---------- Gallery ---------- */
  var ICON_GRID = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="5.5" height="5.5" rx="1.4"/><rect x="10.5" y="2" width="5.5" height="5.5" rx="1.4"/><rect x="2" y="10.5" width="5.5" height="5.5" rx="1.4"/><rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.4"/></svg>';
  var ICON_LIST = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12"/></svg>';

  function cardHTML(b, i) {
    return '<a class="bcm-card" data-rv style="--i:' + i + '" href="#/blocks/' + b.id + '">' +
      '<div class="bcm-card__preview" data-pv>' + window.BCM_PREVIEW(b.demo) + '</div>' +
      '<div class="bcm-card__body"><h2 class="bcm-card__title">' + esc(b.name) + '</h2>' +
      '<p class="bcm-card__desc">' + esc(b.cardDesc) + '</p>' +
      (metaLine(b) ? '<span class="bcm-card__meta">' + metaLine(b) + '</span>' : '') + '</div>' +
      '<span class="bcm-card__cta"><span class="cta-t">View demo</span> <span class="cta-a" aria-hidden="true">\u2192</span></span></a>';
  }

  function renderGallery() {
    document.title = "BCM Custom Blocks";
    main.innerHTML =
      '<section class="bcm-top"><h1>' + HERO.title + '</h1><p>' + HERO.body + '</p></section>' +
      '<div class="bcm-bar"><div class="bcm-toggle" data-view="' + view + '" role="group" aria-label="Layout"><span class="bcm-toggle__thumb" aria-hidden="true"></span>' +
      '<button type="button" data-view="gallery" aria-label="Gallery view" aria-pressed="' + (view === "gallery") + '">' + ICON_GRID + '</button>' +
      '<button type="button" data-view="list" aria-label="List view" aria-pressed="' + (view === "list") + '">' + ICON_LIST + '</button></div></div>' +
      '<div class="bcm-grid" id="bcm-grid" data-view="' + view + '">' + DATA.blocks.map(cardHTML).join("") + '</div>';
    firstLoad = false;
    window.BCM_MOTION.scan(main);
    main.querySelector(".bcm-toggle").addEventListener("click", function (e) {
      var t = e.target.closest("button[data-view]"); if (!t || t.dataset.view === view) return;
      setView(t.dataset.view);
    });
  }

  /* Layout switch with FLIP, so cards glide to their new place instead of jumping */
  function setView(next) {
    var grid = document.getElementById("bcm-grid");
    var cards = [].slice.call(grid.children);
    var first = cards.map(function (c) { return c.getBoundingClientRect(); });
    view = next;
    try { localStorage.setItem("bcm-view", view); } catch (e) {}
    var tg = main.querySelector(".bcm-toggle");
    tg.dataset.view = view;
    tg.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.view === view); });
        grid.dataset.view = view;
    if (reduce) return;
    cards.forEach(function (c, i) {
      var f = first[i], l = c.getBoundingClientRect();
      var dx = f.left - l.left, dy = f.top - l.top;
      c.animate([{ transform: "translate(" + dx + "px," + dy + "px)", opacity: .5 }, { transform: "none", opacity: 1 }],
        { duration: 520, delay: Math.min(i, 12) * 16, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
    });
  }

  /* ---------- Detail ---------- */
  function highlight(code) {
    return esc(code)
      .replace(/(&lt;!--|\/--&gt;)/g, '<span class="c">$1</span>')
      .replace(/(wp:bcm\/[a-z-]+)/, '<span class="k">$1</span>')
      .replace(/(&quot;[^&]*?&quot;)(\s*:)/g, '<span class="k">$1</span>$2')
      .replace(/(:\s*)(&quot;[^&]*?&quot;)/g, '$1<span class="s">$2</span>');
  }
  function fullCode(b) { return "<!-- wp:bcm/" + b.id + "\n" + b.codePretty + "\n/-->"; }
  function sec(id, title, html) { return '<section class="bcm-section" id="' + id + '"><h2>' + title + '</h2>' + html + '</section>'; }
  function ul(a) { return '<ul>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'; }

  function renderDetail(id) {
    var b = byId(id);
    if (!b) { location.hash = "#/"; return; }
    document.title = b.name + " | BCM Custom Blocks";
    var toc = SECTIONS.map(function (s) { return '<li><a href="#' + s[0] + '" data-sec="' + s[0] + '">' + s[1] + '</a></li>'; }).join("");
    var steps = b.howToUse.map(function (s) { return '<li><div><strong>' + esc(s.title) + '</strong>' + esc(s.detail) + '</div></li>'; }).join("");
    var ex = b.examples.length
      ? '<table class="bcm-used"><thead><tr><th>Used on</th><th>Story</th></tr></thead><tbody>' +
        b.examples.map(function (e) { return '<tr><td>' + esc(e.tag) + '</td><td><a href="' + esc(e.url) + '" target="_blank" rel="noopener">' + esc(e.headline) + '</a></td></tr>'; }).join("") + '</tbody></table>'
      : '<p>Live examples will be added once this block is on staging.</p>';
    main.innerHTML =
      '<div class="bcm-detail"><aside class="bcm-side"><h2>On this page</h2><ul class="bcm-toc">' + toc + '</ul></aside>' +
      '<article class="bcm-article"><a class="bcm-back" href="#/"><span class="bk-a" aria-hidden="true">\u2190</span> All components</a><h1>' + esc(b.name) + '</h1>' +
      '<p class="bcm-lede">' + esc(b.tagline) + '</p><div class="bcm-demo"><div class="bcm-card__preview" data-pv>' + window.BCM_PREVIEW(b.demo) + '</div>' + liveDemo(b) + '</div>' +
      sec("definition", "Definition", '<p>' + esc(b.definition) + '</p>') +
      sec("how-it-works", "How it works", '<p>' + esc(b.howItWorks) + '</p>') +
      sec("expected", "What is expected", ul(b.whatIsExpected)) +
      sec("provided", "What should be provided", ul(b.whatShouldBeProvided)) +
      sec("how-to-use", "How to use it", '<ol class="bcm-steps">' + steps + '</ol>' +
        '<p>Example block markup. Attribute names are illustrative; developers confirm the final ones.</p>' +
        '<figure class="bcm-code" style="margin-inline:0"><div class="bcm-code__bar"><span>block markup</span><button type="button" data-copy aria-live="polite">' + COPY_BTN + '</button></div><pre><code>' + highlight(fullCode(b)) + '</code></pre></figure>') +
      sec("where", "Where to use it", ul(b.whereToUse) + '<p class="bcm-note"><strong>Note:</strong> ' + esc(b.caution) + '</p>') +
      sec("examples", "Examples", ex) + '</article></div>';
    window.scrollTo(0, 0);
    prepMotion();
    var btn = main.querySelector("[data-copy]");
    btn.addEventListener("click", function () { copyCode(btn, fullCode(b)); });
    var seg = main.querySelector(".m-seg");
    if (seg) {
      var thumb = seg.querySelector(".m-seg__t"), scene = main.querySelector("[data-scene]"), qd = main.querySelector(".qd");
      var place = function () { var on = seg.querySelector('[aria-pressed="true"]'); thumb.style.width = on.offsetWidth + "px"; thumb.style.transform = "translateX(" + on.offsetLeft + "px)"; };
      place(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(place); window.addEventListener("resize", place);
      seg.addEventListener("click", function (e) {
        var bt = e.target.closest("button"); if (!bt) return;
        [].forEach.call(seg.querySelectorAll("button"), function (x) { x.setAttribute("aria-pressed", x === bt ? "true" : "false"); });
        qd.setAttribute("data-hl", bt.dataset.hl); place();
        window.BCM_MOTION.replay(scene);
      });
    }
    var replay = main.querySelector("[data-replay]");
    if (replay) replay.addEventListener("click", function () { window.BCM_MOTION.replay(main.querySelector("[data-scene]")); });
    main.querySelector(".bcm-toc").addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a) return;
      e.preventDefault();
      document.getElementById(a.dataset.sec).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
    setupSpy();
  }

  /* Hook the detail page into the motion system */
  function prepMotion() {
    main.classList.remove("rt"); void main.offsetWidth; main.classList.add("rt");
    [].forEach.call(main.querySelectorAll(".bcm-lede, .bcm-section > p:not(.bcm-note)"), function (p) { if (!p.querySelector("*")) p.setAttribute("data-read", ""); });
    [].forEach.call(main.querySelectorAll(".bcm-section ul:not(.bcm-examples), .bcm-steps"), function (l) {
      l.classList.add("m-stagger"); l.setAttribute("data-in", "");
      [].forEach.call(l.children, function (li, i) { li.style.setProperty("--n", i); });
    });
    window.BCM_MOTION.scan(main);
  }

  /* Live motion demos for the two blocks where motion carries meaning */
  var ICON_REPLAY = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1M2.5 2.5v3h3"/></svg>';
  function liveDemo(b) {
    var seg = '<div class="m-seg" role="group" aria-label="Highlight style"><i class="m-seg__t" aria-hidden="true"></i><button type="button" data-hl="mark" aria-pressed="true">Mark</button><button type="button" data-hl="underline" aria-pressed="false">Underline</button><button type="button" data-hl="flash" aria-pressed="false">Flash</button></div>';
    var head = function (t, withSeg) { return '<div class="bcm-live__head"><span>' + t + '</span><div class="bcm-live__tools">' + (withSeg ? seg : "") + '<button type="button" class="m-replay" data-replay>' + ICON_REPLAY + 'Replay</button></div></div>'; };
    if (b.id === "case-study-quote") {
      return '<div class="bcm-live" data-scene>' + head("Motion preview", true) +
        '<div class="qd" data-in data-hl="mark"><span class="qd-bar"></span><blockquote>' +
        '<span class="qd-open">The central opportunity is clear:</span> ' +
        '<span data-read style="--base:900ms">Naira Life Conference gives brands <mark class="mk" style="--md:2000ms">a credible platform to be recognized</mark>.</span>' +
        '</blockquote></div></div>';
    }
    if (b.id === "stats-grid") {
      var card = function (n, num, label, extra) { return '<div class="sd-card" style="--n:' + n + '">' + num + '<span class="sd-label">' + label + '</span>' + (extra || "") + '</div>'; };
      var n = function (v, o) { o = o || {}; return '<span class="sd-num' + (o.mk ? ' mk mk-flash' : '') + '"' + (o.mk ? ' style="--md:1500ms"' : '') + ' aria-hidden="true" data-count="' + v + '"' + (o.d ? ' data-decimals="' + o.d + '"' : "") + (o.p ? ' data-prefix="' + o.p + '"' : "") + (o.s ? ' data-suffix="' + o.s + '"' : "") + '>' + o.t + '</span><span class="bcm-sr">' + o.t + '</span>'; };
      return '<div class="bcm-live" data-scene>' + head("Motion preview") +
        '<div class="sd" data-in>' +
        card(0, n(1250, { t: "1,250", mk: true }), "Formatted number", "") +
        card(1, n(68, { s: "%", t: "68%" }), "Percentage", '<span class="sd-bar" style="--p:.68"><i></i></span>') +
        card(2, n(4.2, { p: "\u20a6", s: "m", d: 1, t: "\u20a64.2m" }), "Currency with decimal", "") +
        card(3, '<span class="sd-row"><svg class="sd-ring" viewBox="0 0 56 56" style="--p:.85" aria-hidden="true"><circle class="bg" cx="28" cy="28" r="24"/><circle class="fg" cx="28" cy="28" r="24"/></svg>' + n(85, { s: "%", t: "85%" }) + '</span>', "Circular progress", "") +
        '</div><p class="sd-note">Sample figures for motion preview only. Real stats come from the writer.</p></div>';
    }
    return "";
  }

  /* Copy button: swap the icon, then grow to fit the new label */
  var COPY_BTN = '<span class="cb-i"><svg class="cp" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2"/></svg><svg class="ok" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.200 3.200L13 4.800"/></svg></span><span class="cb-l">Copy</span>';
  function copyCode(btn, text) {
    var label = btn.querySelector(".cb-l");
    function setLabel(t, done) {
      var w0 = btn.getBoundingClientRect().width;
      label.textContent = t; btn.classList.toggle("is-done", !!done);
      var w1 = btn.getBoundingClientRect().width;
      if (!reduce && btn.animate && w0 !== w1) btn.animate([{ width: w0 + "px" }, { width: w1 + "px" }], { duration: 260, easing: "cubic-bezier(.2,.7,.2,1)" });
    }
    function ok() { setLabel("Copied", true); clearTimeout(btn.__t); btn.__t = setTimeout(function () { setLabel("Copy", false); }, 1800); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      var done = false; try { done = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      if (done) ok(); else { setLabel("Copy failed", false); setTimeout(function () { setLabel("Copy", false); }, 1800); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
  }

  function setupSpy() {
    var links = {}, toc = main.querySelector(".bcm-toc");
    var marker = document.createElement("span"); marker.className = "bcm-toc__marker"; marker.setAttribute("aria-hidden", "true"); toc.appendChild(marker);
    var prog = document.createElement("div"); prog.className = "bcm-progress"; prog.setAttribute("aria-hidden", "true"); prog.innerHTML = "<i></i>";
    main.querySelector(".bcm-side").appendChild(prog);
    main.querySelectorAll(".bcm-toc a").forEach(function (a) { links[a.dataset.sec] = a; });
    var first = true;
    var order = Object.keys(links);
    var set = function (id) {
      var ai = order.indexOf(id);
      order.forEach(function (k, i) { links[k].style.setProperty("--dist", Math.abs(i - ai)); });
      Object.keys(links).forEach(function (k) { if (k === id) links[k].setAttribute("aria-current", "true"); else links[k].removeAttribute("aria-current"); });
      var a = links[id]; if (!a) return;
      if (first) { marker.style.transition = "none"; }
      marker.style.transform = "translateY(" + (a.offsetTop + a.offsetHeight / 2 - 1) + "px)";
      if (first) { void marker.offsetWidth; marker.style.transition = ""; first = false; }
    };
    set("definition");
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) set(en.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    main.querySelectorAll(".bcm-section").forEach(function (s) { spy.observe(s); });

    /* Scroll-linked reading progress */
    var bar = prog.firstChild, art = main.querySelector(".bcm-article"), ticking = false;
    function upd() {
      ticking = false;
      var r = art.getBoundingClientRect(), total = r.height - window.innerHeight;
      var p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 1;
      bar.style.transform = "scaleX(" + p + ")";
    }
    spyScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } };
    window.addEventListener("scroll", spyScroll, { passive: true });
    upd();
  }
  var spyScroll = null;
  function teardownSpy() { if (spy) { spy.disconnect(); spy = null; } if (spyScroll) { window.removeEventListener("scroll", spyScroll); spyScroll = null; } }

  /* ---------- Router ---------- */
  function route() {
    if (!DATA) return;
    teardownSpy();
    var m = location.hash.match(/^#\/blocks\/([\w-]+)/);
    if (m) renderDetail(m[1]); else { renderGallery(); window.scrollTo(0, 0); }
    main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  var skel = setTimeout(function () { if (!DATA) main.innerHTML = '<div class="bcm-skel" aria-hidden="true"><i></i><i></i><i></i></div>'; }, 250);
  fetch("data/blocks.json").then(function (r) { return r.json(); }).then(function (d) { DATA = d; clearTimeout(skel); route(); })
    .catch(function () { main.innerHTML = '<p class="bcm-empty">Could not load the block list. Run a local server (see README) instead of opening the file directly.</p>'; });
})();

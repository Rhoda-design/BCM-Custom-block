/* BCM Custom Blocks: gallery (grid or list) and block detail pages.
   Vanilla JS, hash routing, content from data/blocks.json. */
(function () {
  "use strict";
  var main = document.getElementById("bcm-main");
  var DATA = null, view = "gallery", spy = null, firstLoad = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  function metaLine(b) { return esc(catName(b.category)) + (b.usedOn && b.usedOn.length ? " · Used on: " + esc(b.usedOn.join(", ")) : ""); }

  /* ---------- Gallery ---------- */
  var ICON_GRID = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="5.5" height="5.5" rx="1.4"/><rect x="10.5" y="2" width="5.5" height="5.5" rx="1.4"/><rect x="2" y="10.5" width="5.5" height="5.5" rx="1.4"/><rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.4"/></svg>';
  var ICON_LIST = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M3 5h12M3 9h12M3 13h12"/></svg>';

  function cardHTML(b, i) {
    return '<a class="bcm-card' + (firstLoad ? ' bcm-enter' : '') + '" style="--i:' + i + '" href="#/blocks/' + b.id + '">' +
      '<div class="bcm-card__preview">' + window.BCM_DIAGRAM(b.demo) + '</div>' +
      '<div class="bcm-card__body"><h2 class="bcm-card__title">' + esc(b.name) + '</h2>' +
      '<p class="bcm-card__desc">' + esc(b.cardDesc) + '</p>' +
      '<span class="bcm-card__meta">' + metaLine(b) + '</span></div></a>';
  }

  function renderGallery() {
    document.title = "BCM Custom Blocks";
    main.innerHTML =
      '<section class="bcm-top"><div><h1>' + HERO.title + '</h1><p>' + HERO.body + '</p></div>' +
      '<div class="bcm-toggle" data-view="' + view + '" role="group" aria-label="Layout"><span class="bcm-toggle__thumb" aria-hidden="true"></span>' +
      '<button type="button" data-view="gallery" aria-label="Gallery view" aria-pressed="' + (view === "gallery") + '">' + ICON_GRID + '</button>' +
      '<button type="button" data-view="list" aria-label="List view" aria-pressed="' + (view === "list") + '">' + ICON_LIST + '</button></div></section>' +
      '<div class="bcm-grid" id="bcm-grid" data-view="' + view + '">' + DATA.blocks.map(cardHTML).join("") + '</div>';
    firstLoad = false;
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
    cards.forEach(function (c) { c.classList.remove("bcm-enter"); c.style.animation = "none"; });
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
      '<article class="bcm-article"><a class="bcm-back" href="#/">← All components</a><h1>' + esc(b.name) + '</h1>' +
      '<p class="bcm-lede">' + esc(b.tagline) + '</p><div class="bcm-demo">' + window.BCM_DIAGRAM(b.demo) + '</div>' +
      sec("definition", "Definition", '<p>' + esc(b.definition) + '</p>') +
      sec("how-it-works", "How it works", '<p>' + esc(b.howItWorks) + '</p>') +
      sec("expected", "What is expected", ul(b.whatIsExpected)) +
      sec("provided", "What should be provided", ul(b.whatShouldBeProvided)) +
      sec("how-to-use", "How to use it", '<ol class="bcm-steps">' + steps + '</ol>' +
        '<p>Example block markup. Attribute names are illustrative; developers confirm the final ones.</p>' +
        '<figure class="bcm-code" style="margin-inline:0"><div class="bcm-code__bar"><span>block markup</span><button type="button" data-copy>Copy</button></div><pre><code>' + highlight(fullCode(b)) + '</code></pre></figure>') +
      sec("where", "Where to use it", ul(b.whereToUse) + '<p class="bcm-note"><strong>Note:</strong> ' + esc(b.caution) + '</p>') +
      sec("examples", "Examples", ex) + '</article></div>';
    window.scrollTo(0, 0);
    var btn = main.querySelector("[data-copy]");
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(fullCode(b)).then(done, function () {});
    });
    main.querySelector(".bcm-toc").addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a) return;
      e.preventDefault();
      document.getElementById(a.dataset.sec).scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
    setupSpy();
  }

  function setupSpy() {
    var links = {};
    main.querySelectorAll(".bcm-toc a").forEach(function (a) { links[a.dataset.sec] = a; });
    var set = function (id) { Object.keys(links).forEach(function (k) { if (k === id) links[k].setAttribute("aria-current", "true"); else links[k].removeAttribute("aria-current"); }); };
    set("definition");
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) set(en.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    main.querySelectorAll(".bcm-section").forEach(function (s) { spy.observe(s); });
  }
  function teardownSpy() { if (spy) { spy.disconnect(); spy = null; } }

  /* ---------- Router ---------- */
  function route() {
    if (!DATA) return;
    teardownSpy();
    var m = location.hash.match(/^#\/blocks\/([\w-]+)/);
    if (m) renderDetail(m[1]); else { renderGallery(); window.scrollTo(0, 0); }
    main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  fetch("data/blocks.json").then(function (r) { return r.json(); }).then(function (d) { DATA = d; route(); })
    .catch(function () { main.innerHTML = '<p class="bcm-empty">Could not load the block list. Run a local server (see README) instead of opening the file directly.</p>'; });
})();

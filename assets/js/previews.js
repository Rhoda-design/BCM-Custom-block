/* Card previews: small HTML mock-ups of each block, copied from the Figma gallery frames.
   Text sizes use container units (cqw) so each preview scales with its card.
   Cards with several frames emphasise one frame in full brand yellow. */
(function () {
  var ARROW = '<svg class="pv-swap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14m-3-3 3 3-3 3M20 16H6m3-3-3 3 3 3"/></svg>';
  var P = {
    "image-rail": '<div class="pv pv-rail"><div class="pv-track"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i></div></div>',
    "compendium-edition": '<div class="pv pv-edition"><h3>Health</h3><p>This edition brings together 8 contributors to uncover the health crises that rarely makes it to into political…</p><div class="pv-chips"><i class="f1"></i><i class="f2"></i><i class="f3"></i></div><span>Read The Essays</span></div>',
    "compendium-downloads": '<div class="pv pv-downloads"><div class="pv-copy"><h3>Download The Health Report</h3><p>Explore Nigeria’s healthcare system through expert essays, key insights, a…</p><b>Download report</b></div><i class="pv-cover"></i></div>',
    "case-quote": '<div class="pv pv-quote"><div><span></span><p>The central opportunity is clear…</p></div></div>',
    "kenburns": '<div class="pv pv-kb"><svg viewBox="0 0 100 82" aria-hidden="true"><g class="kb-arrows" fill="none" stroke="#6b6b69" stroke-width=".6" stroke-dasharray="2 1.6"><path d="M38 28 12 10m0 0h7m-7 0v6"/><path d="M62 28 88 10m0 0h-7m7 0v6"/><path d="M38 54 12 72m0 0h7m-7 0v-6"/><path d="M62 54 88 72m0 0h-7m7 0v-6"/></g><rect x="35" y="25" width="30" height="32" fill="none" stroke="#6b6b69" stroke-width=".5" stroke-dasharray="1.6 1.2"/><rect class="kb-focus" x="38.5" y="21" width="23" height="40" rx="1.5" fill="#ffb415" fill-opacity=".85"/></svg></div>',
    "swap": '<div class="pv pv-swap-prev"><i class="pv-img"></i><svg class="pv-up" viewBox="0 0 10 60" aria-hidden="true"><path d="M5 58V6m0 0L2 12m3-6 3 6" fill="none" stroke="#ffb415" stroke-width="1" stroke-linecap="round" stroke-dasharray="3 2.2"/></svg></div>',
    "category-page": '<div class="pv pv-category"><i class="pv-bar"></i><h3>One year in, Bosun Tijani’s critics still struggle to see his vision</h3><p>While the minister believes he should be praised for c…</p><b>Read story</b></div>',
    "bcm-section": '<div class="pv pv-section"><h4>IMPACT, MOMENTUM</h4><strong>The first edition of Naira Life Conference created strong proof of concept for recurring money focused IP.</strong><p>It showed that Nigerians are ready for honest, practical, and high-quality financial conversations, es…</p></div>',
    "horizontal": '<div class="pv pv-horizontal"><div class="pv-track"><i class="f1"></i><i class="f2"></i><i class="f3"></i></div>' + ARROW + '</div>',
    "stats-grid": '<div class="pv pv-stats"><div class="f1"><u></u><s></s><u></u></div><div class="f2"><u></u><s></s><u></u></div><div class="f3"><u></u><s></s><u></u></div></div>',
    "full-width-hero": '<div class="pv pv-hero"><i></i></div>'
  };
  window.BCM_PREVIEW = function (type) { return P[type] || ""; };
  window.BCM_PREVIEW_TYPES = Object.keys(P);
})();

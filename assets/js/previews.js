/* Card previews: small HTML mock-ups of each block, copied from the Figma gallery frames.
   Text sizes use container units (cqw) so each preview scales with its card.
   Cards with several frames emphasise one frame in full brand yellow. */
(function () {
  var ARROW = '<svg class="pv-swap rise" style="--n:3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14m-3-3 3 3-3 3M20 16H6m3-3-3 3 3 3"/></svg>';
  var P = {
    "image-rail": '<div class="pv pv-rail"><div class="pv-track"><i class="f1 grow" style="--n:0"></i><i class="f2 grow" style="--n:1"></i><i class="f3 grow" style="--n:2"></i><i class="f4 grow" style="--n:3"></i></div></div>',
    "compendium-edition": '<div class="pv pv-edition"><h3 class="rise" style="--n:0">Health</h3><p class="rise" style="--n:1">This edition brings together 8 contributors to uncover the health crises that rarely makes it to into political…</p><div class="pv-chips"><i class="f1 pop" style="--n:2"></i><i class="f2 pop" style="--n:3"></i><i class="f3 pop" style="--n:4"></i></div><span class="rise" style="--n:5">Read The Essays</span></div>',
    "compendium-downloads": '<div class="pv pv-downloads"><div class="pv-copy"><h3 class="rise" style="--n:0">Download The Health Report</h3><p class="rise" style="--n:1">Explore Nigeria’s healthcare system through expert essays, key insights, a…</p><b class="rise" style="--n:2">Download report</b></div><i class="pv-cover fade" style="--n:1"></i></div>',
    "case-quote": '<div class="pv pv-quote"><div><span class="bar-grow"></span><p class="rise" style="--n:1">The central opportunity is clear…</p></div></div>',
    "kenburns": '<div class="pv pv-kb"><svg viewBox="0 0 100 82" aria-hidden="true"><g class="kb-arrows" fill="none" stroke="#6b6b69" stroke-width=".6" stroke-dasharray="2 1.6"><path d="M38 28 12 10m0 0h7m-7 0v6"/><path d="M62 28 88 10m0 0h-7m7 0v6"/><path d="M38 54 12 72m0 0h7m-7 0v-6"/><path d="M62 54 88 72m0 0h-7m7 0v-6"/></g><rect x="35" y="25" width="30" height="32" fill="none" stroke="#6b6b69" stroke-width=".5" stroke-dasharray="1.6 1.2"/><rect class="kb-focus" x="38.5" y="21" width="23" height="40" rx="1.5" fill="#ffb415" fill-opacity=".85"/></svg></div>',
    "swap": '<div class="pv pv-swap-prev"><i class="pv-img blur colour" style="--n:0"></i><svg class="pv-up rise" style="--n:3" viewBox="0 0 10 60" aria-hidden="true"><path d="M5 58V6m0 0L2 12m3-6 3 6" fill="none" stroke="#ffb415" stroke-width="1" stroke-linecap="round" stroke-dasharray="3 2.2"/></svg></div>',
    "category-page": '<div class="pv pv-category"><i class="pv-bar blur" style="--n:0"></i><h3 class="rise" style="--n:1">One year in, Bosun Tijani’s critics still struggle to see his vision</h3><p class="rise" style="--n:2">While the minister believes he should be praised for c…</p><b class="rise" style="--n:3">Read story</b></div>',
    "bcm-section": '<div class="pv pv-section"><h4 class="rise" style="--n:0">IMPACT, MOMENTUM</h4><strong class="rise" style="--n:1">The first edition of Naira Life Conference created strong proof of concept for recurring money focused IP.</strong><p class="rise" style="--n:2">It showed that Nigerians are ready for honest, practical, and high-quality financial conversations, es…</p></div>',
    "horizontal": '<div class="pv pv-horizontal"><div class="pv-track"><i class="f1 slide" style="--n:0"></i><i class="f2 slide" style="--n:1"></i><i class="f3 slide" style="--n:2"></i></div>' + ARROW + '</div>',
    "stats-grid": '<div class="pv pv-stats"><div class="f1 pop" style="--n:0"><u></u><s></s><u></u></div><div class="f2 pop" style="--n:1"><u></u><s></s><u></u></div><div class="f3 pop" style="--n:2"><u></u><s></s><u></u></div></div>',
    "full-width-hero": '<div class="pv pv-hero"><i class="blur reveal" style="--n:0"></i></div>'
  };
  window.BCM_PREVIEW = function (type) { return P[type] || ""; };
  window.BCM_PREVIEW_TYPES = Object.keys(P);
})();

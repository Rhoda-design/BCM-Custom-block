/* Animated SVG diagrams for each block demo: type -> SVG markup. */
(function(){
function demoMarkup(type, color){
  const c = color || "var(--bcm-d-700)";
  if(type === "horizontal"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Three frames sliding sideways">
      <defs><marker id="ar-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" style="stroke:${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
      <g class="m-pan">
        <rect x="15" y="25" width="55" height="70" rx="6" fill="rgba(61,42,0,.06)" stroke="rgba(61,42,0,.35)"/>
        <rect x="92" y="25" width="55" height="70" rx="6" fill="rgba(61,42,0,.06)" stroke="rgba(61,42,0,.35)"/>
        <rect x="169" y="25" width="55" height="70" rx="6" fill="rgba(61,42,0,.06)" stroke="rgba(61,42,0,.35)"/>
      </g>
      <line x1="15" y1="112" x2="212" y2="112" class="m-flow" style="stroke:${c}" stroke-width="3" stroke-linecap="round" marker-end="url(#ar-h)"/>
    </svg>`;
  }
  if(type === "swap"){
    const clipId = "clip-swap-" + Math.random().toString(36).slice(2, 8);
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Images scrolling upward and swapping, like normal page scroll">
      <defs>
        <clipPath id="${clipId}"><rect x="55" y="15" width="140" height="90" rx="6"/></clipPath>
        <marker id="ar-vs" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" style="stroke:${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>
      </defs>
      <rect x="55" y="15" width="140" height="90" rx="6" fill="none" stroke="rgba(61,42,0,.35)" stroke-width="2"/>
      <g clip-path="url(#${clipId})">
        <g class="m-slide-up">
          <rect x="55" y="15" width="140" height="90" fill="rgba(61,42,0,.1)"/>
          <rect x="55" y="105" width="140" height="90" style="fill:${c}" opacity=".18"/>
        </g>
      </g>
      <line x1="212" y1="98" x2="212" y2="25" class="m-flow" style="stroke:${c}" stroke-width="3" stroke-linecap="round" marker-end="url(#ar-vs)"/>
    </svg>`;
  }
  if(type === "bcm-section"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="An eyebrow label above a bold headline and a description paragraph">
      <rect class="m-reveal" style="animation-delay:0s" x="30" y="20" width="60" height="7" rx="2" fill="rgba(61,42,0,.3)"/>
      <rect class="m-reveal" style="animation-delay:.3s;fill:${c}" x="30" y="38" width="180" height="12" rx="2"/>
      <rect class="m-reveal" style="animation-delay:.5s;fill:${c}" x="30" y="54" width="150" height="12" rx="2"/>
      <rect class="m-reveal" style="animation-delay:.8s" x="30" y="82" width="180" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
      <rect class="m-reveal" style="animation-delay:1s" x="30" y="94" width="150" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
    </svg>`;
  }
  if(type === "stats-grid"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A grid of stat cells, each with a bold number and a short label">
      <g class="m-pulse-soft" style="animation-delay:0s">
        <rect x="16" y="14" width="64" height="46" rx="4" style="fill:${c}" opacity=".18"/>
        <rect x="24" y="22" width="24" height="12" rx="2" fill="rgba(61,42,0,.5)"/>
        <rect x="24" y="46" width="34" height="6" rx="2" fill="rgba(61,42,0,.28)"/>
      </g>
      <g class="m-pulse-soft" style="animation-delay:.25s">
        <rect x="86" y="14" width="64" height="46" rx="4" style="fill:${c}" opacity=".3"/>
        <rect x="94" y="22" width="24" height="12" rx="2" fill="rgba(61,42,0,.5)"/>
        <rect x="94" y="46" width="34" height="6" rx="2" fill="rgba(61,42,0,.28)"/>
      </g>
      <g class="m-pulse-soft" style="animation-delay:.5s">
        <rect x="156" y="14" width="64" height="46" rx="4" style="fill:${c}" opacity=".22"/>
        <rect x="164" y="22" width="24" height="12" rx="2" fill="rgba(61,42,0,.5)"/>
        <rect x="164" y="46" width="34" height="6" rx="2" fill="rgba(61,42,0,.28)"/>
      </g>
      <rect x="16" y="66" width="64" height="46" rx="4" style="fill:${c}" opacity=".22"/>
      <rect x="86" y="66" width="64" height="46" rx="4" style="fill:${c}" opacity=".18"/>
      <rect x="156" y="66" width="64" height="46" rx="4" style="fill:${c}" opacity=".3"/>
    </svg>`;
  }
  if(type === "image-rail"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A caption above a horizontal row of images that continues past the frame">
      <rect x="20" y="14" width="120" height="7" rx="2" fill="rgba(61,42,0,.3)"/>
      <g class="m-pan">
        <rect x="14" y="34" width="60" height="60" rx="4" fill="rgba(61,42,0,.08)" stroke-width="2" style="stroke:${c}"/>
        <rect x="82" y="34" width="60" height="60" rx="4" fill="rgba(61,42,0,.08)" stroke-width="2" style="stroke:${c}"/>
        <rect x="150" y="34" width="60" height="60" rx="4" fill="rgba(61,42,0,.08)" stroke-width="2" style="stroke:${c}"/>
        <rect x="218" y="34" width="26" height="60" rx="4" fill="rgba(61,42,0,.05)" stroke-width="2" style="stroke:${c}" opacity=".45"/>
      </g>
    </svg>`;
  }
  if(type === "case-quote"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A quote in a light panel with a colored left border">
      <rect class="m-grow-y" x="20" y="20" width="4" height="90" style="fill:${c}"/>
      <rect x="34" y="20" width="186" height="90" fill="rgba(61,42,0,.05)"/>
      <rect class="m-reveal" style="animation-delay:.2s" x="50" y="42" width="150" height="8" rx="2" fill="rgba(61,42,0,.32)"/>
      <rect class="m-reveal" style="animation-delay:.4s" x="50" y="58" width="120" height="8" rx="2" fill="rgba(61,42,0,.32)"/>
      <rect class="m-reveal" style="animation-delay:.6s" x="50" y="74" width="90" height="8" rx="2" fill="rgba(61,42,0,.32)"/>
    </svg>`;
  }
  if(type === "full-width-hero"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A hero image spanning the full viewport width, with contained title text below it">
      <rect class="m-grow-x" x="0" y="10" width="240" height="58" fill="rgba(61,42,0,.07)" stroke-width="2" style="stroke:${c}"/>
      <line x1="0" y1="10" x2="0" y2="68" style="stroke:${c}" stroke-width="4"/>
      <line x1="240" y1="10" x2="240" y2="68" style="stroke:${c}" stroke-width="4"/>
      <rect class="m-reveal" style="animation-delay:.3s" x="26" y="84" width="120" height="9" rx="2" fill="rgba(61,42,0,.35)"/>
      <rect class="m-reveal" style="animation-delay:.5s" x="26" y="100" width="80" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
    </svg>`;
  }
  if(type === "category-page"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A featured story followed by a numbered list of related stories, each with a read-story button">
      <rect class="m-pulse-soft" x="20" y="8" width="200" height="32" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
      <g class="m-reveal" style="animation-delay:.3s">
        <circle cx="28" cy="56" r="7" style="fill:${c}"/>
        <rect x="42" y="52" width="95" height="7" rx="2" fill="rgba(61,42,0,.3)"/>
        <rect x="154" y="49" width="50" height="14" rx="7" style="fill:${c}" opacity=".85"/>
      </g>
      <g class="m-reveal" style="animation-delay:.6s">
        <circle cx="28" cy="80" r="7" style="fill:${c}"/>
        <rect x="42" y="76" width="95" height="7" rx="2" fill="rgba(61,42,0,.3)"/>
        <rect x="154" y="73" width="50" height="14" rx="7" style="fill:${c}" opacity=".85"/>
      </g>
      <g class="m-reveal" style="animation-delay:.9s">
        <circle cx="28" cy="104" r="7" style="fill:${c}"/>
        <rect x="42" y="100" width="95" height="7" rx="2" fill="rgba(61,42,0,.3)"/>
        <rect x="154" y="97" width="50" height="14" rx="7" style="fill:${c}" opacity=".85"/>
      </g>
    </svg>`;
  }
  if(type === "article-page"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Article page layout: title, byline, hero image, body text, related stories">
      <rect class="m-reveal" style="animation-delay:0s" x="20" y="14" width="130" height="10" rx="2" fill="rgba(61,42,0,.4)"/>
      <rect class="m-reveal" style="animation-delay:.2s" x="20" y="30" width="70" height="6" rx="2" fill="rgba(61,42,0,.22)"/>
      <rect class="m-reveal" style="animation-delay:.4s;stroke:${c}" x="20" y="44" width="200" height="52" rx="4" fill="none" stroke-width="2"/>
      <rect class="m-reveal" style="animation-delay:.7s" x="20" y="104" width="200" height="6" rx="2" fill="rgba(61,42,0,.22)"/>
      <rect class="m-reveal" style="animation-delay:.85s" x="20" y="115" width="160" height="6" rx="2" fill="rgba(61,42,0,.22)"/>
      <rect class="m-reveal" style="animation-delay:1.1s" x="20" y="130" width="28" height="8" rx="2" fill="rgba(61,42,0,.14)"/>
      <rect class="m-reveal" style="animation-delay:1.1s" x="54" y="130" width="28" height="8" rx="2" fill="rgba(61,42,0,.14)"/>
      <rect class="m-reveal" style="animation-delay:1.1s" x="88" y="130" width="28" height="8" rx="2" fill="rgba(61,42,0,.14)"/>
    </svg>`;
  }
  if(type === "listing-page"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Listing page layout: grid of story cards grouped by category">
      <g class="m-pulse-soft" style="animation-delay:0s">
        <rect x="16" y="16" width="66" height="46" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
        <rect x="20" y="66" width="58" height="5" rx="2" fill="rgba(61,42,0,.35)"/>
        <rect x="20" y="75" width="40" height="5" rx="2" fill="rgba(61,42,0,.2)"/>
      </g>
      <g class="m-pulse-soft" style="animation-delay:.25s">
        <rect x="90" y="16" width="66" height="46" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
        <rect x="94" y="66" width="58" height="5" rx="2" fill="rgba(61,42,0,.35)"/>
        <rect x="94" y="75" width="40" height="5" rx="2" fill="rgba(61,42,0,.2)"/>
      </g>
      <g class="m-pulse-soft" style="animation-delay:.5s">
        <rect x="164" y="16" width="60" height="46" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
        <rect x="168" y="66" width="52" height="5" rx="2" fill="rgba(61,42,0,.35)"/>
        <rect x="168" y="75" width="36" height="5" rx="2" fill="rgba(61,42,0,.2)"/>
      </g>
      <line x1="16" y1="98" x2="224" y2="98" stroke="rgba(61,42,0,.15)" stroke-width="1"/>
      <rect x="16" y="110" width="66" height="5" rx="2" fill="rgba(61,42,0,.25)"/>
      <rect x="90" y="110" width="66" height="5" rx="2" fill="rgba(61,42,0,.25)"/>
      <rect x="164" y="110" width="60" height="5" rx="2" fill="rgba(61,42,0,.25)"/>
    </svg>`;
  }
  if(type === "form-page"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Form page layout: labeled input fields and a call-to-action button">
      <rect class="m-reveal" style="animation-delay:0s" x="30" y="18" width="180" height="8" rx="2" fill="rgba(61,42,0,.4)"/>
      <g class="m-reveal" style="animation-delay:.3s">
        <rect x="30" y="38" width="60" height="6" rx="2" fill="rgba(61,42,0,.22)"/>
        <rect x="30" y="48" width="180" height="18" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
      </g>
      <g class="m-reveal" style="animation-delay:.6s">
        <rect x="30" y="76" width="60" height="6" rx="2" fill="rgba(61,42,0,.22)"/>
        <rect x="30" y="86" width="180" height="18" rx="4" fill="none" stroke-width="2" style="stroke:${c}"/>
      </g>
      <rect class="m-pulse-soft" x="30" y="114" width="90" height="18" rx="9" style="fill:${c}"/>
    </svg>`;
  }
  if(type === "newsletter-promo"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A branded newsletter image with a subscribe link beneath it">
      <rect x="40" y="14" width="160" height="66" rx="6" fill="rgba(61,42,0,.06)" stroke="rgba(61,42,0,.3)" stroke-width="2"/>
      <circle cx="120" cy="47" r="16" fill="none" style="stroke:${c}" stroke-width="2"/>
      <line x1="80" y1="100" x2="160" y2="100" style="stroke:${c}" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`;
  }
  if(type === "submission-cta"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A short line of text above a rounded call-to-action button">
      <rect x="45" y="30" width="150" height="8" rx="2" fill="rgba(61,42,0,.3)"/>
      <rect x="70" y="60" width="100" height="34" rx="17" style="fill:${c}"/>
    </svg>`;
  }
  if(type === "divider-link"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A single underlined link bounded by divider rules">
      <line x1="20" y1="28" x2="220" y2="28" stroke="rgba(61,42,0,.25)" stroke-width="1.5"/>
      <line x1="20" y1="70" x2="170" y2="70" style="stroke:${c}" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="20" y1="112" x2="220" y2="112" stroke="rgba(61,42,0,.25)" stroke-width="1.5"/>
    </svg>`;
  }
  if(type === "bio-card"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A subject photo beside a few short facts">
      <circle cx="55" cy="70" r="34" fill="rgba(61,42,0,.08)" stroke-width="2" style="stroke:${c}"/>
      <rect x="112" y="42" width="95" height="8" rx="2" fill="rgba(61,42,0,.35)"/>
      <rect x="112" y="60" width="75" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
      <rect x="112" y="74" width="85" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
      <rect x="112" y="88" width="60" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
    </svg>`;
  }
  if(type === "data-bars"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A bar chart breaking figures down by category">
      <rect x="30" y="70" width="30" height="40" style="fill:${c}" opacity=".55"/>
      <rect x="75" y="50" width="30" height="60" style="fill:${c}" opacity=".75"/>
      <rect x="120" y="30" width="30" height="80" style="fill:${c}"/>
      <rect x="165" y="58" width="30" height="52" style="fill:${c}" opacity=".65"/>
      <line x1="20" y1="112" x2="210" y2="112" stroke="rgba(61,42,0,.3)" stroke-width="1.5"/>
    </svg>`;
  }
  if(type === "survey-cta"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A callout card with explanatory text and a button">
      <rect x="30" y="18" width="180" height="90" rx="8" fill="none" stroke="rgba(61,42,0,.3)" stroke-width="2"/>
      <rect x="46" y="35" width="110" height="7" rx="2" fill="rgba(61,42,0,.32)"/>
      <rect x="46" y="49" width="90" height="6" rx="2" fill="rgba(61,42,0,.2)"/>
      <rect x="46" y="70" width="80" height="18" rx="9" style="fill:${c}"/>
    </svg>`;
  }
  if(type === "quote"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A pulled quote highlighted against body text lines">
      <line x1="20" y1="24" x2="150" y2="24" stroke="rgba(61,42,0,.25)" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="38" x2="120" y2="38" stroke="rgba(61,42,0,.25)" stroke-width="3" stroke-linecap="round"/>
      <rect x="20" y="54" width="200" height="4" rx="2" style="fill:${c}"/>
      <text x="30" y="98" font-family="Georgia, serif" font-size="56" style="fill:${c}" opacity=".9">&#8220;</text>
      <line x1="20" y1="116" x2="140" y2="116" stroke="rgba(61,42,0,.25)" stroke-width="3" stroke-linecap="round"/>
      <line x1="20" y1="130" x2="170" y2="130" stroke="rgba(61,42,0,.25)" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }
  if(type === "compendium-edition"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="An edition card with a title, key insight lines and a Read essay button">
      <rect x="24" y="12" width="192" height="116" rx="8" fill="rgba(61,42,0,.05)" stroke="rgba(61,42,0,.3)" stroke-width="2"/>
      <rect class="m-reveal" style="animation-delay:0s" x="40" y="26" width="110" height="10" rx="2" fill="rgba(61,42,0,.4)"/>
      <rect class="m-reveal" style="animation-delay:.3s" x="40" y="44" width="150" height="5" rx="2" fill="rgba(61,42,0,.2)"/>
      <g class="m-reveal" style="animation-delay:.6s"><circle cx="44" cy="64" r="3" style="fill:${c}"/><rect x="54" y="61" width="110" height="5" rx="2" fill="rgba(61,42,0,.28)"/></g>
      <g class="m-reveal" style="animation-delay:.8s"><circle cx="44" cy="78" r="3" style="fill:${c}"/><rect x="54" y="75" width="90" height="5" rx="2" fill="rgba(61,42,0,.28)"/></g>
      <rect class="m-pulse-soft" x="40" y="98" width="70" height="18" rx="9" style="fill:${c}"/>
    </svg>`;
  }
  if(type === "compendium-downloads"){
    return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="A report with a download button, and an email field with a Notify me button">
      <rect x="24" y="14" width="192" height="50" rx="8" fill="rgba(61,42,0,.05)" stroke="rgba(61,42,0,.3)" stroke-width="2"/>
      <rect x="38" y="26" width="90" height="8" rx="2" fill="rgba(61,42,0,.4)"/>
      <rect x="38" y="42" width="70" height="5" rx="2" fill="rgba(61,42,0,.2)"/>
      <rect class="m-pulse-soft" x="150" y="30" width="52" height="18" rx="9" style="fill:${c}"/>
      <rect x="24" y="82" width="120" height="26" rx="6" fill="none" stroke="rgba(61,42,0,.35)" stroke-width="2"/>
      <rect class="m-reveal" x="34" y="92" width="60" height="5" rx="2" fill="rgba(61,42,0,.3)"/>
      <rect x="152" y="82" width="64" height="26" rx="13" fill="none" style="stroke:${c}" stroke-width="2"/>
    </svg>`;
  }
  return `<svg class="diagram" viewBox="0 0 240 140" role="img" aria-label="Zooming out from a focal point to reveal the full frame">
    <defs><marker id="ar-k" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" style="stroke:${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
    <rect x="20" y="15" width="200" height="110" rx="8" fill="rgba(61,42,0,.05)" stroke="rgba(61,42,0,.35)"/>
    <rect class="m-pulse" x="140" y="52" width="58" height="42" rx="4" fill="none" stroke-dasharray="5 3" stroke-width="2" style="stroke:${c}"/>
    <circle cx="169" cy="73" r="3" style="fill:${c}"/>
    <line x1="138" y1="50" x2="22" y2="17" class="m-flow" style="stroke:${c}" stroke-width="1.6" marker-end="url(#ar-k)"/>
    <line x1="200" y1="50" x2="218" y2="17" class="m-flow" style="stroke:${c}" stroke-width="1.6" marker-end="url(#ar-k)"/>
    <line x1="138" y1="96" x2="22" y2="123" class="m-flow" style="stroke:${c}" stroke-width="1.6" marker-end="url(#ar-k)"/>
    <line x1="200" y1="96" x2="218" y2="123" class="m-flow" style="stroke:${c}" stroke-width="1.6" marker-end="url(#ar-k)"/>
  </svg>`;
}
window.BCM_DIAGRAM = demoMarkup;
})();

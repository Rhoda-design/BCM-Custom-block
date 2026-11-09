# BCM Custom Blocks

A static showcase of Big Cabal Media's custom WordPress (Gutenberg) blocks, for writers, designers, PMs and developers.
Plain HTML, CSS and JavaScript. No build step.

## Run locally
```bash
npm run dev     # http://localhost:8000, no dependencies to install
npm run check   # validates data/blocks.json (ids, categories, demo diagrams, example links)
npm run build   # validates, then writes the deployable site to dist/
```
Opening `index.html` directly will not work, because the page loads `data/blocks.json`.

## Structure
```
index.html              page shell, header and footer
data/blocks.json        every block: copy, steps, example markup
assets/css/tokens.css   design tokens: Figma neutrals and font, plus the amber tint/shade ramp
assets/img/             logos
scripts/build.mjs       validation and build (Node, no packages)
scripts/dev.mjs         local static server
assets/css/layout.css   layout, components and motion
assets/js/app.js        gallery, list/gallery toggle, filters, detail page, scroll-spy
assets/js/diagrams.js   animated SVG demo for each block
```

## Edit content
Everything on screen comes from `data/blocks.json`. To add a block, copy an entry, give it a new `id`,
set its `category` and pick a `demo` diagram. The `code` and `codePretty` fields hold the example block markup;
attribute names are illustrative until developers confirm them.

## Design rules
- Urbanist. Page and cards are white and warm grey.
- Yellow `#FFB415` is for attention only: the active marker in the side nav and the note band on a detail page. Illustrations use one amber ramp (`--bcm-d-900` to `--bcm-d-50` in `tokens.css`).
- The layout follows the component gallery reference: no category pills, an icon-only grid/list toggle, and a detail page with an "On this page" nav.
- The footer follows the Figma file exactly.
- All classes are prefixed `bcm-` so they will not clash with a WordPress theme.
- Routing uses the URL hash (`#/blocks/ken-burns`), so it works on any host, including a WordPress page.
- Motion respects `prefers-reduced-motion`.

## Deploy on Vercel
1. Push this repo to GitHub.
2. In Vercel choose **Add New, Project**, import the repo.
3. Framework preset: **Other**. `vercel.json` already sets the build command (`npm run build`) and output folder (`dist`). Deploy.

## Moving to WordPress
Copy `assets/` into the theme, enqueue `tokens.css`, `layout.css`, `diagrams.js` and `app.js`,
and add `<main id="bcm-main"></main>` to a page template. Point the `fetch` in `app.js` at the JSON file's URL.

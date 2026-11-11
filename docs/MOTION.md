# BCM Custom Blocks: motion system

Motion here explains what a component does or shows what changed. It is never decoration.

## Tokens (`assets/css/motion.css`)
| Token | Value | Used for |
|---|---|---|
| `--m-micro` | 200ms | hover, icons, toggles |
| `--m-button` | 260ms | buttons, links, copy button |
| `--m-card` | 460ms | card and mock-up reveals |
| `--m-text` | 600ms | editorial text reveals |
| `--m-count` | 1100ms | number count-up |
| `--m-out` / `--m-inout` / `--m-spring` | cubic-bezier | default / symmetric / small overshoot |
| `--m-step` | 70ms | gap between staggered siblings |

Scroll triggers use one `IntersectionObserver` (`assets/js/motion.js`). Elements are only hidden before they animate when `html.m-on` is set, which JS adds only when motion is allowed. With JS off or `prefers-reduced-motion`, everything is visible, counts show final values and all transitions are off.

## Hooks
`data-rv` gallery card · `data-pv` card preview (children use `.rise .pop .grow .slide .blur .bar-grow`) · `data-in` container reveal · `data-read` reading reveal · `data-count` count-up (`data-prefix`, `data-suffix`, `data-decimals`) · `.mk` highlight mark · `.m-stagger` list.

## Inventory and treatment
| Component | Content type | Treatment | Why |
|---|---|---|---|
| Gallery header (logo, title, description, toggle) | Intro | Rise, 80ms steps, once | Sets the tone without delaying content |
| Gallery cards (11) | Cards | Rise + slight scale as each enters the viewport, 70ms stagger per batch | Progressive, not all at once |
| View toggle | Control | Sliding thumb; cards glide to new positions (FLIP) | Shows the layout change is the same content |
| Image Rail/GIFs preview | Images | Frames grow from the bottom edge, slow pan | Mockup motion: Rise and Pan |
| Horizontal Scroll preview | Images | Frames slide in from the right, gentle pan | Echoes the horizontal movement |
| Ken Burns preview | Image | Focus frame zooms out, arrows flow | The real mechanic |
| Scroll Swap preview | Image | Blur-up, dashed arrow flows upward | Blur-up image; arrow shows scroll direction |
| Full Width Hero preview | Image | Blur-up, slow breathing | Blur-up image |
| Compendium Edition preview | Text-heavy | Title, body, chips (pop), link rise in order | Reading order |
| Compendium Downloads preview | Text, CTA | Text rise, cover blur-up | Same |
| Page Category Block preview | Text, CTA | Image blur-up, headline, text, button rise | Same |
| BCM Section preview | Text-heavy | Eyebrow, headline, body rise in order | Same |
| Stats Grid preview | Stats | Frames pop in, staggered | Staggered reveal |
| Case Study Quote preview | Quote | Border draws down, text rises | Draws the eye to the accent |
| Card hover | Interaction | Mock-up tilt (pointer devices only), link underline draws, arrow nudges | Feedback; touch devices skip it |
| Detail page text | Text | Reading reveal line by line; lists stagger | Editorial pace, text is never changed |
| Case Study Quote live demo | Quote | Card enters, opening phrase, rest line by line, then a highlight mark sweeps the phrase | The requested editorial sequence |
| Stats Grid live demo | Stats | Count-up (number, %, currency, decimal), bar fill, ring stroke, stagger | Sample figures, clearly labelled |
| Side nav | Navigation | One sliding yellow marker, scroll-linked reading progress | Shows where you are and how far |
| Section spotlight | Reading | Hovering a section dims the others to 55% (pointer devices only) | Focus without hiding anything |
| Copy button | Button | Icon swap, then the button grows to fit "Copied" | Success feedback; falls back if clipboard is blocked |
| Back link | Link | Arrow nudges left | Direction cue |
| Replay button | Button | Icon spins, scene restarts | Lets reviewers see a scene again |
| Loading | State | Shimmer placeholders only if loading takes over 250ms | Avoids a flash |

## Not done, on purpose
Glass tabs, filters and the sliding puzzle from the reference: this site has no tabs or filters, and no component to carry them. The pills were removed at the team lead's request.

## Reference patterns (component-gallery)
| Reference pattern | Where it is used here |
|---|---|
| Highlight: Mark / Underline / Flash | Case Study Quote demo has a three-way switch (Mark is the default); Stats Grid demo flashes the key figure |
| Mockup motion: Rise, Pan, Tilt, Reveal | Rise on text previews, Pan on Image Rail and Horizontal Scroll, Tilt follows the pointer on card previews, Reveal wipes the Full Width Hero in |
| Blur-up: Blur, Colour, Fade | Blur on category and hero, Colour (grey to colour) on Scroll Swap, Fade on Compendium Downloads cover |
| Focus dim | Hovering a section on a detail page dims the rest to 55% |
| Copy button: Swap and Grow | Code copy button |
| Article index: Ticks and Labels | Side nav tick length and label offset fall off with distance from the section being read |

## Moving highlight (Filters-style)
On Image Rail, Compendium Edition chips, Horizontal Scroll and Stats Grid previews, the one full-yellow frame glides to each sibling frame in turn, resizing to fit, then returns to the first. It runs once when the card enters view and again on hover or replay. Implemented in `hlPlay()` in `assets/js/motion.js` with ghost tint frames, so the yellow frame is the only full-yellow element at any moment. Off with reduced motion (the first frame stays yellow).

## Continuous loops
The moving highlight and every cursor demo now repeat while their card is on screen: roughly 4 seconds of motion, then a 2 second rest. Loops pause when the card scrolls out of view or the tab is hidden, and are off with reduced motion.

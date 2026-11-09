// Validates data/blocks.json, then copies the site into dist/ for deployment.
//   npm run check   validate only
//   npm run build   validate and write dist/
import { readFile, rm, mkdir, cp } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const checkOnly = process.argv.includes("--check");
const errors = [];
const fail = (msg) => errors.push(msg);

const data = JSON.parse(await readFile(join(root, "data/blocks.json"), "utf8"));

// previews.js registers window.BCM_PREVIEW; run it in a sandbox to test every demo type.
const sandbox = { window: {} };
vm.runInNewContext(await readFile(join(root, "assets/js/previews.js"), "utf8"), sandbox);
const diagram = sandbox.window.BCM_PREVIEW;

const cats = new Set(data.categories.map((c) => c.id));
const ids = new Set();
const required = ["id", "category", "name", "demo", "cardDesc", "tagline", "definition", "howItWorks", "whatIsExpected",
  "whatShouldBeProvided", "howToUse", "whereToUse", "caution", "examples", "code", "codePretty"];

for (const b of data.blocks) {
  const label = b.id || "(no id)";
  for (const k of required) if (b[k] === undefined || b[k] === "") fail(`${label}: missing "${k}"`);
  if (ids.has(b.id)) fail(`${label}: duplicate id`);
  ids.add(b.id);
  if (!/^[a-z0-9-]+$/.test(b.id || "")) fail(`${label}: id must be lowercase letters, numbers and dashes`);
  if (!cats.has(b.category)) fail(`${label}: unknown category "${b.category}"`);
  if (!String(diagram(b.demo)).includes("pv")) fail(`${label}: no preview for demo "${b.demo}"`);
  for (const e of b.examples || []) if (!/^https?:\/\//.test(e.url || "")) fail(`${label}: example needs a full URL`);
  try { JSON.parse(b.codePretty); } catch { fail(`${label}: codePretty is not valid JSON`); }
}
for (const c of data.categories) if (!data.blocks.some((b) => b.category === c.id)) fail(`category "${c.id}" has no blocks`);

if (errors.length) {
  console.error("Build stopped:\n - " + errors.join("\n - "));
  process.exit(1);
}
console.log(`OK: ${data.blocks.length} blocks in ${data.categories.length} categories.`);

if (!checkOnly) {
  const out = join(root, "dist");
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const p of ["index.html", "assets", "data"]) await cp(join(root, p), join(out, p), { recursive: true });
  console.log("Wrote dist/");
}

/* SETTINGS
   Formats, sizes, margin rules, logo-to-label gaps, and object-gap limits.
*/
const SETTINGS = {
  host: "127.0.0.1",
  port: 8765,
  formats: ["announcement", "statistic", "insight", "story", "educational"],
  sizes: {
    landscape: { w: 1200, h: 628 },
    square: { w: 1080, h: 1080 },
    portrait: { w: 1080, h: 1350 },
  },
  longHeadline: "Visibility across the network ".repeat(28).trim(),
  spacing: { def: null, min: 8, max: 960 },
  objectGaps: { def: null, min: 0, max: 960 },
  designedGaps: {
    announcement: { landscape: 26, square: 434.4, portrait: 575.28 },
    statistic: { landscape: 22, square: 28, portrait: 36 },
    insight: { landscape: 48, square: 60, portrait: 72 },
    story: { landscape: 138.6, square: 474.56, portrait: 734.2 },
    educational: { landscape: 20, square: 24, portrait: 28 },
  },
};

import { createServer } from "node:http";
import { readFile, mkdir, writeFile, readdir } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import worker, { matchYouTubeThumb, fetchYouTubeThumb } from "../worker.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sampleDir = join(root, "samples");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".md": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname.startsWith("/yt-thumb/")) {
    const match = matchYouTubeThumb(url.pathname);
    const request = new Request(url, { method: req.method || "GET" });
    const response = match
      ? await fetchYouTubeThumb(request, match)
      : new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8", "x-aog-thumb": "missing" } });
    const headers = {};
    response.headers.forEach((value, key) => { headers[key] = value; });
    const body = Buffer.from(await response.arrayBuffer());
    res.writeHead(response.status, headers);
    res.end(body);
    return;
  }
  const path = join(root, decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname));
  try {
    const body = await readFile(path);
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch (err) {
    res.writeHead(404);
    res.end("missing");
  }
});

await new Promise((resolve) => server.listen(SETTINGS.port, SETTINGS.host, resolve));

const failures = [];
const notes = [];
function check(cond, message) {
  if (!cond) failures.push(message);
}

check(matchYouTubeThumb("/yt-thumb/T3RRPQ_Csss/maxresdefault.jpg")?.file === "maxresdefault", "thumb route did not match maxres");
check(matchYouTubeThumb("/yt-thumb/T3RRPQ_Csss/hqdefault.jpg")?.id === "T3RRPQ_Csss", "thumb route did not match hq");
check(matchYouTubeThumb("/yt-thumb/short/maxresdefault.jpg") == null, "short id was accepted");
check(matchYouTubeThumb("/yt-thumb/T3RRPQ_CsssX/hqdefault.jpg") == null, "12-character id was accepted");
check(matchYouTubeThumb("/yt-thumb/T3RRPQ_Csss/sddefault.jpg") == null, "sddefault was accepted");
check(matchYouTubeThumb("/yt-thumb/%2e%2e/T3RRPQ_Csss/maxresdefault.jpg") == null, "encoded thumb path was accepted");
check(matchYouTubeThumb("/yt-thumb/T3RRPQ_Csss/maxresdefault.jpg/extra") == null, "extra thumb path was accepted");

const assetEnv = {
  ASSETS: {
    async fetch() {
      return new Response("asset", { status: 200, headers: { "content-type": "text/plain" } });
    },
  },
};
const staticHit = await worker.fetch(new Request("http://127.0.0.1/index.html"), assetEnv);
check(staticHit.status === 200 && await staticHit.text() === "asset", "static path did not reach the asset binding");
const badThumb = await worker.fetch(new Request("http://127.0.0.1/yt-thumb/not-an-id/maxresdefault.jpg"), assetEnv);
check(badThumb.status === 404 && badThumb.headers.get("x-aog-thumb") === "missing", `bad thumb path ${badThumb.status}`);
const missingMax = await worker.fetch(new Request("http://127.0.0.1/yt-thumb/jNQXAC9IVRw/maxresdefault.jpg"), assetEnv);
check(missingMax.status === 404 && missingMax.headers.get("x-aog-thumb") === "missing", `missing maxres ${missingMax.status} ${missingMax.headers.get("x-aog-thumb")}`);
const hqThumb = await worker.fetch(new Request("http://127.0.0.1/yt-thumb/jNQXAC9IVRw/hqdefault.jpg"), assetEnv);
const hqBytes = Buffer.from(await hqThumb.arrayBuffer());
check(hqThumb.status === 200 && hqThumb.headers.get("content-type") === "image/jpeg" && hqThumb.headers.get("x-aog-thumb") === "ok" && hqBytes.length > 1000 && hqBytes[0] === 0xff, "hq thumbnail was not a jpeg");
const maxThumb = await worker.fetch(new Request("http://127.0.0.1/yt-thumb/T3RRPQ_Csss/maxresdefault.jpg"), assetEnv);
const maxBytes = Buffer.from(await maxThumb.arrayBuffer());
check(maxThumb.status === 200 && maxThumb.headers.get("x-aog-thumb") === "ok" && maxBytes.length > 5000 && maxBytes[0] === 0xff, "maxres thumbnail was not a jpeg");

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1480, height: 1000 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  // Chrome logs a generic 404 line with no URL. The response listener records the URL.
  if (/^Failed to load resource: the server responded with a status of 404/.test(text)) return;
  consoleErrors.push(text);
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));
page.on("response", (res) => {
  if (res.status() >= 400 && !(res.status() === 404 && res.url().includes("/yt-thumb/"))) {
    consoleErrors.push(`${res.status()} ${res.url()}`);
  }
});

await page.goto(`http://${SETTINGS.host}:${SETTINGS.port}/`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready, null, { timeout: 20000 });

const brandLeak = await page.evaluate(() => document.body.innerText.toLowerCase().includes("aerolist"));
check(!brandLeak, "Aerolist brand text appeared in the studio");

await mkdir(sampleDir, { recursive: true });
const saved = [];
const priorBytes = {};
for (const name of await readdir(sampleDir)) {
  const match = name.match(/^aogalerts_(.+)_(\d+x\d+)_\d+\.png$/);
  if (!match || priorBytes[`${match[1]}-${match[2]}`]) continue;
  priorBytes[`${match[1]}-${match[2]}`] = await readFile(join(sampleDir, name));
}
const designedObjectGaps = {};

for (const format of SETTINGS.formats) {
  for (const size of Object.keys(SETTINGS.sizes)) {
    const expected = SETTINGS.sizes[size];
    const result = await page.evaluate(async ({ format, size }) => {
      window.AOG.loadSample(format, size);
      const layout = window.AOG.getLayout();
      const canvas = document.getElementById("preview");
      const ctx = canvas.getContext("2d");
      const pixel = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data.slice(0, 3));
      const mismatches = [];
      for (const box of layout.boxes) {
        const right = box.role === "signature"
          ? layout.signatureBottom + 0.75
          : layout.height - layout.rail - layout.marginBottom + 0.75;
        if (box.x < layout.marginX - 0.75) mismatches.push(`${box.id} left ${box.x.toFixed(1)}`);
        if (box.x + box.w > layout.width - layout.marginX + 0.75) mismatches.push(`${box.id} right ${(box.x + box.w).toFixed(1)}`);
        if (box.y < layout.marginTop - 0.75) mismatches.push(`${box.id} top ${box.y.toFixed(1)}`);
        if (box.y + box.h > right) mismatches.push(`${box.id} bottom ${(box.y + box.h).toFixed(1)} limit ${right.toFixed(1)}`);
        if (box.kind === "line") {
          const again = window.AOG.measureLine(box.text, box.weight, box.size, box.trackingEm);
          if (Math.abs(again - box.w) > 1.25) mismatches.push(`${box.id} measure ${again.toFixed(2)} vs ${box.w.toFixed(2)}`);
        }
      }
      const url = canvas.toDataURL("image/png");
      return {
        w: canvas.width,
        h: canvas.height,
        warnings: layout.warnings,
        mismatches,
        name: window.AOG.pngName(format, size),
        url,
        rail: pixel(Math.round(canvas.width / 2), canvas.height - 2),
        tag: layout.boxes.find((box) => box.id === "tag"),
        gap: layout.logoLabelGap,
        limit: layout.labelGapLimit,
        logoBottom: layout.logoBottom,
        spacing: window.AOG.getState().logoLabelSpacing,
        objectGaps: window.AOG.getState().objectGaps,
        measured: layout.measuredGaps,
      };
    }, { format, size });

    check(result.w === expected.w && result.h === expected.h, `${format} ${size} canvas ${result.w}x${result.h}`);
    const buf = Buffer.from(result.url.split(",")[1], "base64");
    const dim = pngSize(buf);
    check(dim.w === expected.w && dim.h === expected.h, `${format} ${size} png ${dim.w}x${dim.h}`);
    check(buf.length > 5000, `${format} ${size} png is tiny`);
    check(result.mismatches.length === 0, `${format} ${size} margins: ${result.mismatches.join("; ")}`);
    check(result.rail[0] > 210 && result.rail[1] < 50 && result.rail[2] < 55, `${format} ${size} rail ${result.rail.join(",")}`);
    check(result.tag, `${format} ${size} missing series tag`);
    const designedGap = SETTINGS.designedGaps[format][size];
    check(Math.abs(result.gap - designedGap) < 0.75, `${format} ${size} logo gap ${result.gap} designed ${designedGap}`);
    check(result.spacing.landscape == null && result.spacing.square == null && result.spacing.portrait == null, `${format} ${size} spacing was not the designed default`);
    const gapState = result.objectGaps || {};
    Object.keys(gapState).forEach((key) => {
      const slot = gapState[key];
      check(slot.landscape == null && slot.square == null && slot.portrait == null, `${format} ${size} ${key} was not the designed default`);
    });
    designedObjectGaps[`${format}-${size}`] = result.measured;
    const prior = priorBytes[`${format}-${expected.w}x${expected.h}`];
    check(prior && prior.equals(buf), `${format} ${size} default png changed`);
    check(result.tag.y >= result.logoBottom + SETTINGS.spacing.min - 0.75, `${format} ${size} label overlaps the logo`);
    if (result.warnings.length) notes.push(`${format} ${size}: ${result.warnings.join(" | ")}`);
    await writeFile(join(sampleDir, result.name), buf);
    saved.push(result.name);
  }
}

await page.evaluate((headline) => {
  const input = document.getElementById("headline");
  input.value = headline;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}, SETTINGS.longHeadline);
const longResult = await page.evaluate(() => {
  const layout = window.AOG.getLayout();
  const bad = layout.boxes.filter((box) => {
    const right = box.role === "signature"
      ? layout.signatureBottom + 0.75
      : layout.height - layout.rail - layout.marginBottom + 0.75;
    return box.x < layout.marginX - 0.75
      || box.x + box.w > layout.width - layout.marginX + 0.75
      || box.y + box.h > right;
  });
  return {
    warnings: layout.warnings,
    drawn: layout.drawnHeadline,
    min: layout.minHeadline,
    bad: bad.map((box) => box.id),
  };
});
check(longResult.warnings.some((item) => /below the minimum/i.test(item)), "long headline did not warn");
check(longResult.drawn < longResult.min, `long headline drew at ${longResult.drawn}, min ${longResult.min}`);
check(longResult.bad.length === 0, `long headline crossed margins: ${longResult.bad.join(",")}`);

await page.fill("#designName", "QA Storage Design");
await page.fill("#headline", "Unique headline for storage check");
await page.click("#saveDesign");
await page.waitForFunction(() => [...document.getElementById("savedDesigns").options].some((option) => option.textContent === "QA Storage Design"));
await page.reload({ waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready);
await page.selectOption("#savedDesigns", { label: "QA Storage Design" });
await page.click("#loadDesign");
await page.waitForFunction(() => document.getElementById("headline").value === "Unique headline for storage check");
const loaded = await page.inputValue("#headline");
check(loaded === "Unique headline for storage check", `loaded headline was "${loaded}"`);

await page.click('[data-format="statistic"]');
await page.fill("#source", "");
const emptySource = await page.textContent("#warnings");
check(/source line is required/i.test(emptySource || ""), "empty source did not warn");
await page.fill("#source", "Example data - placeholder figure for layout only");
const filled = await page.textContent("#warnings");
check(!/source line is required/i.test(filled || ""), "source warning stayed after filling the field");

const exported = await page.evaluate(() => window.AOG.exportDesignsJSON());
const parsed = JSON.parse(exported);
check(parsed.kind === "aogalerts-linkedin-designs" && parsed.designs.some((item) => item.name === "QA Storage Design"), "JSON export missed the saved design");

const spacingLimits = await page.evaluate(() => window.AOG.SETTINGS.logoLabelSpacing);
check(spacingLimits.def == null && spacingLimits.min === SETTINGS.spacing.min && spacingLimits.max === SETTINGS.spacing.max, "spacing min/max/default settings drifted");

for (const format of SETTINGS.formats) {
  for (const size of Object.keys(SETTINGS.sizes)) {
    const moved = await page.evaluate(async ({ format, size, min }) => {
      window.AOG.loadSample(format, size);
      const before = window.AOG.getLayout();
      const beforeTag = before.boxes.find((box) => box.id === "tag");
      const beforeSig = before.boxes.find((box) => box.id === "signature");
      const contentId = format === "statistic" ? "number" : "headline";
      const beforeContent = before.boxes.find((box) => box.id === contentId);
      const otherSize = size === "landscape" ? "square" : "landscape";
      const otherBefore = window.AOG.layoutFor(otherSize).boxes.find((box) => box.id === "tag").y;
      const room = Math.max(0, (before.labelGapLimit || 0) - before.logoLabelGap);
      const target = room > 36
        ? Math.round(before.logoLabelGap + Math.min(72, room - 4))
        : Math.max(min, Math.round(before.logoLabelGap - 72));
      const input = document.getElementById("logoLabelSpacing");
      input.value = String(target);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const after = window.AOG.getLayout();
      const afterTag = after.boxes.find((box) => box.id === "tag");
      const afterSig = after.boxes.find((box) => box.id === "signature");
      const afterContent = after.boxes.find((box) => box.id === contentId);
      const otherAfter = window.AOG.layoutFor(otherSize).boxes.find((box) => box.id === "tag").y;
      const png = await window.AOG.exportDataURL(size);
      return {
        target,
        beforeGap: before.logoLabelGap,
        afterGap: after.logoLabelGap,
        beforeTag: beforeTag.y,
        afterTag: afterTag.y,
        beforeContent: beforeContent && beforeContent.y,
        afterContent: afterContent && afterContent.y,
        sigSame: beforeSig.y === afterSig.y && beforeSig.x === afterSig.x,
        otherSame: otherBefore === otherAfter,
        stored: window.AOG.getState().logoLabelSpacing[size],
        otherStored: window.AOG.getState().logoLabelSpacing[otherSize],
        warnings: after.warnings,
        bad: (function problems(layout) {
          const bad = [];
          for (const box of layout.boxes) {
            const right = box.role === "signature"
              ? layout.signatureBottom + 0.75
              : layout.height - layout.rail - layout.marginBottom + 0.75;
            if (box.y + box.h > right) bad.push(`${box.id} bottom ${(box.y + box.h).toFixed(1)}`);
            if (box.id === "tag" && box.y < layout.logoBottom + min - 0.75) bad.push("tag overlaps logo");
          }
          return bad;
        })(after),
        png: png.startsWith("data:image/png"),
        label: document.querySelector("label[for='logoLabelSpacing']").childNodes[0].textContent.trim(),
        readout: document.getElementById("logoLabelSpacingOut").textContent,
        numberBox: Boolean(document.getElementById("logoLabelSpacingNum")),
      };
    }, { format, size, min: SETTINGS.spacing.min });

    check(moved.label === "Logo To Label Spacing", `${format} ${size} control label`);
    check(/px$/.test(moved.readout) && !moved.numberBox, `${format} ${size} spacing readout`);
    check(Math.abs(moved.afterGap - moved.beforeGap) > 12, `${format} ${size} spacing did not move the label (${moved.beforeGap} -> ${moved.afterGap}, target ${moved.target})`);
    check(Math.abs((moved.afterContent - moved.beforeContent) - (moved.afterTag - moved.beforeTag)) < 1.25, `${format} ${size} text did not move with the label`);
    check(moved.sigSame, `${format} ${size} signature moved`);
    check(moved.otherSame && moved.otherStored == null, `${format} ${size} changed a different size`);
    check(moved.bad.length === 0, `${format} ${size} spacing overflow: ${moved.bad.join("; ")}`);
    check(moved.png, `${format} ${size} export failed`);
    check(moved.stored == null || (moved.stored >= SETTINGS.spacing.min && moved.stored <= SETTINGS.spacing.max), `${format} ${size} stored ${moved.stored}`);
  }
}

await page.evaluate(() => {
  window.AOG.loadSample("insight", "square");
  const input = document.getElementById("logoLabelSpacing");
  input.value = "9999";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
const clampedHigh = await page.evaluate(() => window.AOG.getState().logoLabelSpacing.square);
check(clampedHigh <= SETTINGS.spacing.max, `high spacing stored ${clampedHigh}`);
await page.evaluate((min) => {
  const input = document.getElementById("logoLabelSpacing");
  input.value = "-40";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.value = String(min);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}, SETTINGS.spacing.min);
const atMin = await page.evaluate(() => {
  const layout = window.AOG.getLayout();
  const tag = layout.boxes.find((box) => box.id === "tag");
  return { stored: window.AOG.getState().logoLabelSpacing.square, tag: tag.y, logo: layout.logoBottom, bad: layout.boxes.some((box) => box.role !== "signature" && box.y + box.h > layout.height - layout.rail - layout.marginBottom + 0.75) };
});
check(atMin.stored === SETTINGS.spacing.min, `min spacing stored ${atMin.stored}`);
check(atMin.tag >= atMin.logo + SETTINGS.spacing.min - 0.75, "min spacing overlaps the logo");
check(!atMin.bad, "min spacing crossed the bottom margin");

await page.evaluate(() => {
  const old = {
    kind: "aogalerts-linkedin-designs",
    version: 1,
    designs: [{
      id: "old-design",
      name: "Old Design",
      design: {
        format: "insight",
        size: "landscape",
        seriesPreset: "the-aog-view",
        series: "The AOG View",
        headline: "Old headline stays at the designed gap",
        support: "Old support line",
        background: "white",
        headlineSize: 58,
        supportSize: 23,
      },
    }],
  };
  window.AOG.importDesignsJSON(JSON.stringify(old));
});
await page.selectOption("#savedDesigns", { label: "Old Design" });
await page.click("#loadDesign");
await page.waitForFunction(() => document.getElementById("headline").value === "Old headline stays at the designed gap");
const oldLoaded = await page.evaluate(() => {
  const state = window.AOG.getState();
  const layout = window.AOG.getLayout();
  return { spacing: state.logoLabelSpacing, gap: layout.logoLabelGap };
});
check(oldLoaded.spacing.landscape == null && oldLoaded.spacing.square == null && oldLoaded.spacing.portrait == null, "old JSON did not load the designed spacing");
const oldGaps = await page.evaluate(() => window.AOG.getState().objectGaps);
Object.keys(oldGaps).forEach((key) => {
  check(oldGaps[key].landscape == null && oldGaps[key].square == null && oldGaps[key].portrait == null, `old JSON set ${key}`);
});
check(Math.abs(oldLoaded.gap - SETTINGS.designedGaps.insight.landscape) < 0.75, `old JSON gap ${oldLoaded.gap}`);

await page.evaluate(() => {
  window.AOG.loadSample("statistic", "portrait");
  const input = document.getElementById("logoLabelSpacing");
  input.value = "120";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.fill("#designName", "Spacing Save");
await page.click("#saveDesign");
await page.reload({ waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready);
await page.selectOption("#savedDesigns", { label: "Spacing Save" });
await page.click("#loadDesign");
await page.waitForFunction(() => document.getElementById("logoLabelSpacingOut").textContent === "120 px");
const savedSpacing = await page.evaluate(() => window.AOG.getState().logoLabelSpacing);
check(savedSpacing.portrait === 120 && savedSpacing.landscape == null && savedSpacing.square == null, `saved spacing ${JSON.stringify(savedSpacing)}`);
const savedGap = await page.evaluate(() => window.AOG.getLayout().logoLabelGap);
check(Math.abs(savedGap - 120) < 1.25, `loaded portrait gap ${savedGap}`);
const squareKept = await page.evaluate(() => window.AOG.layoutFor("square").logoLabelGap);
check(Math.abs(squareKept - SETTINGS.designedGaps.statistic.square) < 0.75, `square export gap ${squareKept}`);

const objectLimits = await page.evaluate(() => window.AOG.SETTINGS.objectGaps);
check(objectLimits.def == null && objectLimits.min === SETTINGS.objectGaps.min && objectLimits.max === SETTINGS.objectGaps.max, "object gap min/max/default drifted");

const gapMoves = await page.evaluate(() => {
  const topOf = (layout, id) => {
    const parts = layout.boxes.filter((box) => box.id === id);
    if (!parts.length) return null;
    return Math.min(...parts.map((box) => box.y));
  };
  const problems = (layout) => {
    const bad = [];
    for (const box of layout.boxes) {
      const right = box.role === "signature"
        ? layout.signatureBottom + 0.75
        : layout.height - layout.rail - layout.marginBottom + 0.75;
      if (box.y + box.h > right) bad.push(`${box.id} bottom ${(box.y + box.h).toFixed(1)}`);
    }
    return bad;
  };
  const rows = [];
  for (const format of ["announcement", "statistic", "insight", "story", "educational", "video"]) {
    for (const size of ["landscape", "square", "portrait"]) {
      window.AOG.loadSample(format, size);
      const catalog = window.AOG.SETTINGS.gapCatalog.filter((item) => item.formats.includes(format) && (!item.sizes || item.sizes.includes(size)));
      const shown = [...document.querySelectorAll("[data-gap-wrap]")].filter((el) => !el.hidden).map((el) => el.dataset.gapWrap);
      rows.push({
        format,
        size,
        kind: "visibility",
        shown,
        expected: catalog.map((item) => item.key),
        labels: catalog.map((item) => {
          const node = document.querySelector(`label[for="gap-${item.key}"]`);
          return {
            key: item.key,
            label: node.childNodes[0].textContent.trim(),
            expected: item.label,
            readout: document.getElementById(`gap-${item.key}-out`).textContent,
            numberBox: Boolean(document.getElementById(`gap-${item.key}Num`)),
          };
        }),
      });
      catalog.forEach((item) => {
        window.AOG.loadSample(format, size);
        const before = window.AOG.getLayout();
        const measured = before.measuredGaps[item.key];
        const limit = before.gapLimits[item.key];
        const room = Number.isFinite(limit) && Number.isFinite(measured) ? limit - measured : 0;
        const target = room > 28
          ? Math.round(measured + Math.min(40, room - 2))
          : Math.max(0, Math.round(measured - 18));
        const otherSize = size === "landscape" ? "square" : "landscape";
        const otherBefore = topOf(window.AOG.layoutFor(otherSize), "tag");
        const input = document.getElementById("gap-" + item.key);
        input.value = String(target);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        const after = window.AOG.getLayout();
        const state = window.AOG.getState();
        rows.push({
          format,
          size,
          kind: "move",
          key: item.key,
          target,
          measured,
          beforeAbove: topOf(before, item.above),
          afterAbove: topOf(after, item.above),
          beforeBelow: topOf(before, item.below),
          afterBelow: topOf(after, item.below),
          beforeTag: topOf(before, "tag"),
          afterTag: topOf(after, "tag"),
          beforeSig: topOf(before, "signature"),
          afterSig: topOf(after, "signature"),
          beforeCard: topOf(before, "card-1"),
          afterCard: topOf(after, "card-1"),
          otherBefore,
          otherAfter: topOf(window.AOG.layoutFor(otherSize), "tag"),
          stored: state.objectGaps[item.key][size],
          otherStored: state.objectGaps[item.key][otherSize],
          bad: problems(after),
          warnings: after.warnings,
        });
      });
    }
  }
  return rows;
});

gapMoves.forEach((row) => {
  if (row.kind === "visibility") {
    check(JSON.stringify(row.shown) === JSON.stringify(row.expected), `${row.format} ${row.size} sliders ${row.shown.join(",")} expected ${row.expected.join(",")}`);
    row.labels.forEach((item) => {
      check(item.label === item.expected, `${row.format} ${row.size} label ${item.label}`);
      check(/^\d+ px$/.test(item.readout) && !item.numberBox, `${row.format} ${row.size} ${item.key} readout ${item.readout}`);
    });
    return;
  }
  const name = `${row.format} ${row.size} ${row.key}`;
  check(row.beforeAbove != null && Math.abs(row.afterAbove - row.beforeAbove) < 1.25, `${name} moved the object above (${row.beforeAbove} -> ${row.afterAbove})`);
  check(row.beforeBelow != null && Math.abs(row.afterBelow - row.beforeBelow) > 6, `${name} did not move the object below (${row.beforeBelow} -> ${row.afterBelow}, target ${row.target}, designed ${row.measured})`);
  check(Math.abs(row.afterTag - row.beforeTag) < 1.25, `${name} moved the series label`);
  check(row.beforeSig === row.afterSig, `${name} moved the signature`);
  check(row.otherBefore === row.otherAfter && row.otherStored == null, `${name} changed another size`);
  check(row.bad.length === 0, `${name} overflow: ${row.bad.join("; ")}`);
  check(row.stored == null || (row.stored >= SETTINGS.objectGaps.min && row.stored <= SETTINGS.objectGaps.max), `${name} stored ${row.stored}`);
  if (row.key === "stepLineSpacing") {
    check(Math.abs(row.afterCard - row.beforeCard) < 1.25, `${name} moved the step card`);
  }
});

await page.evaluate(() => {
  window.AOG.loadSample("educational", "portrait");
  const input = document.getElementById("gap-stepSpacing");
  input.value = "80";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.click("#resetSpacing");
const resetGaps = await page.evaluate(() => {
  const state = window.AOG.getState();
  const layout = window.AOG.getLayout();
  return {
    logo: state.logoLabelSpacing,
    step: state.objectGaps.stepSpacing,
    gap: layout.measuredGaps.stepSpacing,
  };
});
check(resetGaps.logo.portrait == null && resetGaps.step.portrait == null, `reset left spacing ${JSON.stringify(resetGaps)}`);

await page.evaluate(() => {
  window.AOG.loadSample("statistic", "square");
  const input = document.getElementById("gap-statementToContext");
  input.value = "40";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.fill("#designName", "Gap Save");
await page.click("#saveDesign");
const exportedGaps = JSON.parse(await page.evaluate(() => window.AOG.exportDesignsJSON()));
const savedGapDesign = exportedGaps.designs.find((item) => item.name === "Gap Save");
check(savedGapDesign && savedGapDesign.design.objectGaps.statementToContext.square === 40, "JSON export missed statement spacing");
await page.reload({ waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready);
await page.selectOption("#savedDesigns", { label: "Gap Save" });
await page.click("#loadDesign");
await page.waitForFunction(() => document.getElementById("gap-statementToContext-out").textContent === "40 px");
const loadedGap = await page.evaluate(() => window.AOG.getLayout().measuredGaps.statementToContext);
check(Math.abs(loadedGap - 40) < 1.25, `loaded statement gap ${loadedGap}`);

await page.setViewportSize({ width: 1480, height: 1280 });
const panelShots = [
  ["announcement", "landscape"],
  ["statistic", "landscape"],
  ["statistic", "portrait"],
  ["insight", "landscape"],
  ["story", "landscape"],
  ["educational", "landscape"],
  ["educational", "portrait"],
];
for (const [format, size] of panelShots) {
  await page.evaluate(({ format, size }) => {
    window.AOG.loadSample(format, size);
    document.querySelector(".panel").scrollTop = 220;
  }, { format, size });
  await page.locator(".panel").screenshot({ path: `/opt/cursor/artifacts/panel-${format}-${size}.png` });
}

const sheetPairs = await page.evaluate(async () => {
  const shots = [];
  const take = async (format, size, gaps) => {
    window.AOG.loadSample(format, size);
    const before = document.getElementById("preview").toDataURL("image/png");
    Object.entries(gaps).forEach(([key, value]) => {
      const input = document.getElementById("gap-" + key);
      input.value = String(value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    const after = document.getElementById("preview").toDataURL("image/png");
    const readouts = Object.keys(gaps).map((key) => {
      const label = document.querySelector(`label[for="gap-${key}"]`).childNodes[0].textContent.trim();
      return `${label} ${document.getElementById("gap-" + key + "-out").textContent}`;
    });
    return { format, size, before, after, readouts };
  };
  shots.push(await take("announcement", "landscape", { labelToHeadline: 48, headlineToSupport: 40, supportToCta: 48 }));
  shots.push(await take("statistic", "portrait", { labelToFigure: 56, figureToStatement: 64, statementToContext: 40 }));
  shots.push(await take("insight", "landscape", { labelToHeadline: 90, headlineToSupport: 48 }));
  shots.push(await take("story", "landscape", { labelToHeadline: 8, headlineToSupport: 8 }));
  shots.push(await take("educational", "portrait", { headlineToSteps: 48, stepSpacing: 72, stepLineSpacing: 28 }));
  return shots;
});

await mkdir("/opt/cursor/artifacts", { recursive: true });
const sheetCards = [];
for (const shot of sheetPairs) {
  const beforePath = `/opt/cursor/artifacts/before-${shot.format}-${shot.size}.png`;
  const afterPath = `/opt/cursor/artifacts/after-${shot.format}-${shot.size}.png`;
  await writeFile(beforePath, Buffer.from(shot.before.split(",")[1], "base64"));
  await writeFile(afterPath, Buffer.from(shot.after.split(",")[1], "base64"));
  sheetCards.push({ ...shot, beforePath, afterPath });
}
const sheetHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  body { margin: 0; background: #F4F6FA; color: #091D3B; font: 600 16px/1.4 Inter, sans-serif; }
  h1 { margin: 0; font-size: 22px; }
  header { padding: 22px 24px 8px; }
  .grid { display: grid; gap: 18px; padding: 8px 24px 28px; }
  .row { display: grid; grid-template-columns: 180px 1fr 1fr; gap: 12px; align-items: start; background: #fff; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; }
  h2 { margin: 0 0 8px; font-size: 15px; }
  p { margin: 0; color: #475569; font-size: 12px; font-weight: 500; }
  img { width: 100%; height: auto; display: block; border: 1px solid #E2E8F0; }
  .cap { margin: 6px 0 0; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
</style></head><body>
<header><h1>AOG Alerts spacing, before and after</h1><p>Left is the designed layout. Right uses the gap values under each image. The logo stays fixed.</p></header>
<div class="grid">
${sheetCards.map((card) => `<section class="row"><div><h2>${card.format}</h2><p>${card.size}</p><p>${card.readouts.join("<br>")}</p></div><div><img src="${card.beforePath}"><p class="cap">Designed</p></div><div><img src="${card.afterPath}"><p class="cap">Gaps changed</p></div></section>`).join("")}
</div></body></html>`;
await writeFile("/tmp/aog-spacing-sheet.html", sheetHtml);
await page.setViewportSize({ width: 1400, height: 900 });
await page.goto("file:///tmp/aog-spacing-sheet.html", { waitUntil: "networkidle" });
await page.screenshot({ path: "/opt/cursor/artifacts/spacing-before-after.png", fullPage: true });
await page.goto(`http://${SETTINGS.host}:${SETTINGS.port}/`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready);

await page.evaluate(() => {
  window.AOG.loadSample("announcement", "landscape");
  document.querySelector(".panel").scrollTop = 0;
});
await page.screenshot({ path: "/opt/cursor/artifacts/aogalerts-studio-ui.png" });

const parsedLinks = await page.evaluate(() => {
  const parse = window.AOG.parseYouTubeLink;
  const cases = [
    ["", ""],
    ["https://www.youtube.com/watch?v=T3RRPQ_Csss", "T3RRPQ_Csss"],
    ["https://www.youtube.com/watch?v=T3RRPQ_Csss&t=30s", "T3RRPQ_Csss"],
    ["https://youtu.be/T3RRPQ_Csss", "T3RRPQ_Csss"],
    ["https://youtu.be/T3RRPQ_Csss?t=12", "T3RRPQ_Csss"],
    ["https://www.youtube.com/shorts/T3RRPQ_Csss/", "T3RRPQ_Csss"],
    ["https://www.youtube.com/embed/T3RRPQ_Csss", "T3RRPQ_Csss"],
    ["https://www.youtube-nocookie.com/embed/T3RRPQ_Csss?start=4", "T3RRPQ_Csss"],
    ["https://m.youtube.com/watch?v=T3RRPQ_Csss", "T3RRPQ_Csss"],
    ["youtube.com/watch?v=T3RRPQ_Csss", "T3RRPQ_Csss"],
    ["https://vimeo.com/123456789", ""],
    ["https://www.youtube.com/playlist?list=PL1234567890", ""],
    ["https://www.youtube.com/watch?v=short", ""],
    ["https://www.youtube.com/watch?v=T3RRPQ_CsssX", ""],
  ];
  return cases.map(([input, id]) => {
    const parsed = parse(input);
    return { input, id, got: parsed.id, message: parsed.message, url: parsed.url };
  });
});
parsedLinks.forEach((row) => {
  check(row.got === row.id, `parse "${row.input}" -> "${row.got}" ${row.message}`);
  if (row.id) check(row.url === `https://www.youtube.com/watch?v=${row.id}` && !row.message, `canonical "${row.input}"`);
  if (!row.id && row.input) check(row.message.length > 12, `missing message for "${row.input}"`);
});

await page.evaluate(() => {
  window.AOG.loadSample("video", "landscape");
  const orig = window.fetch;
  window.__origFetch = orig;
  window.fetch = (input, init) => {
    const url = String(input);
    if (url.includes("/yt-thumb/")) {
      return Promise.resolve(new Response("no", {
        status: 502,
        headers: { "content-type": "text/plain", "x-aog-thumb": "unavailable" },
      }));
    }
    return orig(input, init);
  };
  const input = document.getElementById("youtubeUrl");
  input.value = "https://youtu.be/T3RRPQ_Csss";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.waitForFunction(() => window.AOG.getState().youtubeStatus === "error", null, { timeout: 10000 });
const routeNote = await page.textContent("#photoNote");
const routeStatus = await page.textContent("#status");
check(/upload a photo/i.test(routeNote || ""), `route failure note was "${routeNote}"`);
check(/upload a photo/i.test(routeStatus || ""), `route failure status was "${routeStatus}"`);
const routeExport = await page.evaluate(() => {
  try {
    const url = document.getElementById("preview").toDataURL("image/png");
    return url.startsWith("data:image/png");
  } catch (err) {
    return String(err);
  }
});
check(routeExport === true, `route failure export ${routeExport}`);
await page.evaluate(() => { window.fetch = window.__origFetch; });

await page.evaluate(() => window.AOG.loadSample("video", "landscape"));
await page.waitForFunction(() => {
  const state = window.AOG.getState();
  return state.youtubeStatus === "ready" || state.youtubeStatus === "error";
}, null, { timeout: 20000 });
const loadedVideo = await page.evaluate(() => window.AOG.getState());
check(loadedVideo.youtubeStatus === "ready", `thumbnail ${loadedVideo.youtubeStatus} ${loadedVideo.youtubeMessage}`);
check(loadedVideo.youtubeId === "T3RRPQ_Csss", `video id ${loadedVideo.youtubeId}`);
check(loadedVideo.series === "Watch", `series label ${loadedVideo.series}`);
const caption = await page.inputValue("#caption");
check((caption.split("https://www.youtube.com/watch?v=T3RRPQ_Csss").length - 1) === 1, `caption link count in "${caption}"`);
check(caption.endsWith("https://www.youtube.com/watch?v=T3RRPQ_Csss"), "caption did not end with the YouTube link");
const captionCount = (await page.textContent("#captionCount")).replace(/,/g, "");
check(captionCount.startsWith(String(caption.length) + " /"), `counter "${captionCount}" for ${caption.length} characters`);

await page.fill("#youtubeUrl", "https://www.youtube.com/shorts/T3RRPQ_Csss");
const sameCaption = await page.inputValue("#caption");
check(sameCaption === caption, "another form of the same link duplicated the caption");

await page.fill("#caption", "Post copy\nhttps://www.youtube.com/watch?v=T3RRPQ_Csss");
await page.fill("#youtubeUrl", "https://www.youtube.com/embed/jNQXAC9IVRw");
await page.waitForFunction(() => {
  const state = window.AOG.getState();
  return state.youtubeId === "jNQXAC9IVRw" && (state.youtubeStatus === "ready" || state.youtubeStatus === "error");
}, null, { timeout: 20000 });
const fallback = await page.evaluate(() => window.AOG.getState());
check(fallback.youtubeStatus === "ready", `hq fallback ${fallback.youtubeStatus} ${fallback.youtubeMessage}`);
const fallbackCaption = await page.inputValue("#caption");
check((fallbackCaption.match(/https:\/\/www\.youtube\.com\/watch\?v=jNQXAC9IVRw/g) || []).length === 1, `fallback caption "${fallbackCaption}"`);
check(!fallbackCaption.includes("T3RRPQ_Csss"), "old link stayed in the caption");

await page.fill("#youtubeUrl", "https://vimeo.com/123456789");
const vimeoError = await page.textContent("#youtubeError");
check(/not a YouTube URL/i.test(vimeoError || ""), `vimeo message "${vimeoError}"`);
await page.fill("#youtubeUrl", "https://www.youtube.com/watch?v=short");
const shortError = await page.textContent("#youtubeError");
check(/11 characters/i.test(shortError || ""), `short id message "${shortError}"`);

await page.fill("#youtubeUrl", "https://www.youtube.com/watch?v=T3RRPQ_Csss");
await page.waitForFunction(() => window.AOG.getState().youtubeStatus === "ready" && window.AOG.getState().youtubeId === "T3RRPQ_Csss", null, { timeout: 20000 });
await page.evaluate(() => window.AOG.loadSample("video", "landscape"));
const restoredCaption = await page.inputValue("#caption");
check((restoredCaption.match(/watch\?v=T3RRPQ_Csss/g) || []).length === 1, `restored caption "${restoredCaption}"`);

await mkdir("/opt/cursor/artifacts", { recursive: true });
const videoShots = [];
for (const size of ["landscape", "square", "portrait"]) {
  await page.evaluate((size) => window.AOG.loadSample("video", size), size);
  await page.waitForFunction(() => window.AOG.getState().youtubeStatus === "ready", null, { timeout: 20000 });
  const shot = await page.evaluate(() => {
    const canvas = document.getElementById("preview");
    const ctx = canvas.getContext("2d");
    const layout = window.AOG.getLayout();
    const play = layout.boxes.find((box) => box.id === "play");
    const pixel = (x, y) => Array.from(ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data);
    let exportError = "";
    try { canvas.toDataURL("image/png"); } catch (err) { exportError = String(err); }
    const photo = pixel(play.x - 24, play.y + play.h * 0.25);
    return {
      url: canvas.toDataURL("image/png"),
      w: canvas.width,
      h: canvas.height,
      exportError,
      play,
      tag: layout.boxes.find((box) => box.id === "tag"),
      white: pixel(play.x + 12, play.y + play.h / 2),
      red: pixel(play.x + play.w / 2, play.y + play.h / 2),
      rail: pixel(canvas.width / 2, canvas.height - 2),
      photo,
      gap: layout.logoLabelGap,
      measured: layout.measuredGaps,
      warnings: layout.warnings,
    };
  });
  videoShots.push({ size, ...shot, url: undefined });
  const buf = Buffer.from(shot.url.split(",")[1], "base64");
  const dim = pngSize(buf);
  const expected = SETTINGS.sizes[size];
  check(dim.w === expected.w && dim.h === expected.h, `video ${size} png ${dim.w}x${dim.h}`);
  check(!shot.exportError, `video ${size} export ${shot.exportError}`);
  check(shot.tag, `video ${size} missing series tag`);
  check(shot.play && shot.play.x >= 0, `video ${size} missing play button`);
  check(shot.white[0] > 220 && shot.white[1] > 220 && shot.white[2] > 220, `video ${size} play circle ${shot.white.join(",")}`);
  check(shot.red[0] > 180 && shot.red[1] < 80 && shot.red[2] < 80, `video ${size} play triangle ${shot.red.join(",")}`);
  check(shot.rail[0] > 210 && shot.rail[1] < 50 && shot.rail[2] < 55, `video ${size} rail ${shot.rail.join(",")}`);
  check(!(shot.photo[0] === 9 && shot.photo[1] === 29 && shot.photo[2] === 59), `video ${size} thumbnail did not draw`);
  const fileName = size === "landscape" ? "video-1200x628.png" : size === "square" ? "video-1080x1080.png" : "video-1080x1350.png";
  await writeFile(`/opt/cursor/artifacts/${fileName}`, buf);
  const expectedGap = { landscape: 200.08, square: 474.56, portrait: 734.2 }[size];
  const expectedTag = { landscape: 14, square: 16, portrait: 18 }[size];
  check(Math.abs(shot.gap - expectedGap) < 0.75, `video ${size} logo gap ${shot.gap}`);
  check(Math.abs(shot.measured.labelToHeadline - expectedTag) < 0.75, `video ${size} label gap ${shot.measured.labelToHeadline}`);
  check(Math.abs(shot.measured.headlineToSupport - expectedTag) < 0.75, `video ${size} support gap ${shot.measured.headlineToSupport}`);
  notes.push(`video ${size} logo gap ${shot.gap} object ${JSON.stringify(shot.measured)}`);
}

await page.evaluate(() => window.AOG.loadSample("video", "landscape"));
await page.waitForFunction(() => window.AOG.getState().youtubeStatus === "ready", null, { timeout: 20000 });
await page.check("#showDuration");
const durationOn = await page.evaluate(() => {
  const box = window.AOG.getLayout().boxes.find((item) => item.id === "duration");
  const canvas = document.getElementById("preview");
  return { text: box ? box.text : "", url: canvas.toDataURL("image/png") };
});
check(durationOn.text === "1:58", `duration badge "${durationOn.text}"`);
await writeFile("/opt/cursor/artifacts/video-duration-1200x628.png", Buffer.from(durationOn.url.split(",")[1], "base64"));
await page.uncheck("#showDuration");
const durationOff = await page.evaluate(() => window.AOG.getLayout().boxes.some((item) => item.id === "duration"));
check(durationOff === false, "duration badge stayed on after uncheck");

await page.setViewportSize({ width: 1680, height: 1100 });
await page.evaluate(() => {
  window.AOG.loadSample("video", "landscape");
  document.querySelector(".panel").scrollTop = 0;
});
await page.waitForFunction(() => window.AOG.getState().youtubeStatus === "ready", null, { timeout: 20000 });
await page.screenshot({ path: "/opt/cursor/artifacts/video-studio.png" });
await page.evaluate(() => {
  const panel = document.querySelector(".panel");
  const field = document.getElementById("youtubeUrl");
  if (field && panel) panel.scrollTop = Math.max(0, field.offsetTop - 80);
});
await page.locator(".panel").screenshot({ path: "/opt/cursor/artifacts/video-panel.png" });

check(consoleErrors.length === 0, `console errors: ${consoleErrors.join(" | ")}`);
check(saved.length === 15, `saved ${saved.length} samples`);

await browser.close();
await new Promise((resolve) => server.close(resolve));

const report = { failures, notes, saved, designedObjectGaps };
await writeFile("/tmp/aog-studio-report.json", JSON.stringify(report, null, 2));
if (failures.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
const roundedGaps = {};
Object.entries(designedObjectGaps).forEach(([key, gaps]) => {
  roundedGaps[key] = {};
  Object.entries(gaps).forEach(([name, value]) => {
    if (value == null || !Number.isFinite(value) || value < 0) return;
    roundedGaps[key][name] = Math.round(value * 100) / 100;
  });
});
console.log(JSON.stringify({ ok: true, samples: saved.length, notes, designedObjectGaps: roundedGaps }, null, 2));

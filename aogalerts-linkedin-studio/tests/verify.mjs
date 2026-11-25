/* SETTINGS
   Formats, sizes, margin rules, and the designed logo-to-label gaps.
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
  designedGaps: {
    announcement: { landscape: 26, square: 434.4, portrait: 575.28 },
    statistic: { landscape: 22, square: 28, portrait: 36 },
    insight: { landscape: 48, square: 60, portrait: 72 },
    story: { landscape: 138.6, square: 474.56, portrait: 734.2 },
    educational: { landscape: 20, square: 24, portrait: 28 },
  },
};

import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

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

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1480, height: 1000 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));
page.on("response", (res) => {
  if (res.status() >= 400) consoleErrors.push(`${res.status()} ${res.url()}`);
});

await page.goto(`http://${SETTINGS.host}:${SETTINGS.port}/`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready, null, { timeout: 20000 });

const brandLeak = await page.evaluate(() => document.body.innerText.toLowerCase().includes("aerolist"));
check(!brandLeak, "Aerolist brand text appeared in the studio");

await mkdir(sampleDir, { recursive: true });
const saved = [];

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
      const input = document.getElementById("logoLabelSpacingNum");
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
        label: document.querySelector("label[for='logoLabelSpacing']").textContent,
      };
    }, { format, size, min: SETTINGS.spacing.min });

    check(moved.label === "Logo To Label Spacing", `${format} ${size} control label`);
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
  const input = document.getElementById("logoLabelSpacingNum");
  input.value = "9999";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
const clampedHigh = await page.evaluate(() => window.AOG.getState().logoLabelSpacing.square);
check(clampedHigh <= SETTINGS.spacing.max, `high spacing stored ${clampedHigh}`);
await page.evaluate((min) => {
  const input = document.getElementById("logoLabelSpacingNum");
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
check(Math.abs(oldLoaded.gap - SETTINGS.designedGaps.insight.landscape) < 0.75, `old JSON gap ${oldLoaded.gap}`);

await page.evaluate(() => {
  window.AOG.loadSample("statistic", "portrait");
  const input = document.getElementById("logoLabelSpacingNum");
  input.value = "120";
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.fill("#designName", "Spacing Save");
await page.click("#saveDesign");
await page.reload({ waitUntil: "networkidle" });
await page.waitForFunction(() => window.AOG && window.AOG.ready);
await page.selectOption("#savedDesigns", { label: "Spacing Save" });
await page.click("#loadDesign");
await page.waitForFunction(() => document.getElementById("logoLabelSpacingNum").value === "120");
const savedSpacing = await page.evaluate(() => window.AOG.getState().logoLabelSpacing);
check(savedSpacing.portrait === 120 && savedSpacing.landscape == null && savedSpacing.square == null, `saved spacing ${JSON.stringify(savedSpacing)}`);
const savedGap = await page.evaluate(() => window.AOG.getLayout().logoLabelGap);
check(Math.abs(savedGap - 120) < 1.25, `loaded portrait gap ${savedGap}`);
const squareKept = await page.evaluate(() => window.AOG.layoutFor("square").logoLabelGap);
check(Math.abs(squareKept - SETTINGS.designedGaps.statistic.square) < 0.75, `square export gap ${squareKept}`);

await page.evaluate(() => {
  window.AOG.loadSample("announcement", "landscape");
  document.querySelector(".panel").scrollTop = 0;
});
await page.screenshot({ path: "/opt/cursor/artifacts/aogalerts-studio-ui.png" });

check(consoleErrors.length === 0, `console errors: ${consoleErrors.join(" | ")}`);
check(saved.length === 15, `saved ${saved.length} samples`);

await browser.close();
await new Promise((resolve) => server.close(resolve));

const report = { failures, notes, saved };
await writeFile("/tmp/aog-studio-report.json", JSON.stringify(report, null, 2));
if (failures.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, samples: saved.length, notes }, null, 2));

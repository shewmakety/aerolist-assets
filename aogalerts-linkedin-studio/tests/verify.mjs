/* SETTINGS
   Formats, sizes, and margin rules checked by the studio render.
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

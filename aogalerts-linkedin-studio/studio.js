/* SETTINGS
   Brand tokens, canvas sizes, sample copy, logo-to-label spacing,
   and the vertical gap between each stacked object.
   A brand change is an edit to this block.
*/
const SETTINGS = {
  fonts: {
    family: "Inter",
  },
  brand: {
    navy: "#091D3B",
    navy2: "#0F2A52",
    red: "#E31C23",
    redDeep: "#C4161C",
    gold: "#FFD000",
    text: "#0F172A",
    slate: "#475569",
    line: "#E2E8F0",
    paper: "#F4F6FA",
    white: "#FFFFFF",
    soft: "#DCE3EE",
  },
  rules: {
    headlineTracking: -0.03,
    headlineLineHeight: 1.06,
    supportLineHeight: 1.32,
    tagTracking: 0.14,
    tagPadTop: 0.42,
    tagPadX: 0.7,
    tagPadBottom: 0.38,
    tagRadius: 3,
    signatureText: "aogalerts.com",
    signatureInset: 6,
    signatureMark: 0.5,
    insightRule: 8,
    insightGap: 16,
    cardRadius: 8,
    cardTop: 4,
    cardPadX: 18,
    cardPadY: 16,
    watermarkAlpha: 0.06,
    announcementPhoto: 0.62,
    unitRatio: 0.34,
    badgeText: "EXAMPLE DATA",
    badgeTracking: 0.08,
    // Statistic and educational gaps that are not the shared spacing numbers.
    // Landscape statement-to-context is 8. Stacked statement-to-context is 12.
    // Stacked figure-to-statement adds 8 below afterHead.
    // A step line sits 6 below its title, and at least 8 below the number circle.
    statContextRow: 8,
    statContextStack: 12,
    statFigureExtra: 8,
    stepLineGap: 6,
    stepCircleClearance: 8,
  },
  storage: {
    key: "aogalerts-linkedin-studio",
    photoMaxChars: 1400000,
  },
  ui: {
    photoNote: "Default photo. If you post this image, add the photographer credit from CREDITS.md.",
    captionMax: 3000,
  },
  series: [
    { id: "now-live", label: "Now Live" },
    { id: "by-the-numbers", label: "By the Numbers" },
    { id: "the-aog-view", label: "The AOG View" },
    { id: "return-to-service", label: "Return to Service" },
    { id: "aog-explained", label: "AOG Explained" },
  ],
  icons: [
    ["plane", "Plane"],
    ["pin", "Pin"],
    ["bell", "Bell"],
    ["people", "People"],
    ["wrench", "Wrench"],
    ["clipboard", "Clipboard"],
    ["check", "Check"],
    ["clock", "Clock"],
    ["part", "Part"],
    ["message", "Message"],
  ],
  sizes: {
    landscape: {
      key: "landscape", w: 1200, h: 628,
      marginX: 64, marginTop: 52, marginBottom: 56,
      logo: 70, tag: 17, signature: 20, rail: 8,
      headline: { min: 54, max: 62, def: 58 },
      headlineCompact: { min: 44, max: 46, def: 46 },
      support: { min: 22, max: 25, def: 23 },
      numberSize: 240, sourceSize: 16, badgeSize: 12, triangle: 214,
    },
    square: {
      key: "square", w: 1080, h: 1080,
      marginX: 72, marginTop: 64, marginBottom: 68,
      logo: 84, tag: 20, signature: 24, rail: 10,
      headline: { min: 58, max: 76, def: 64 },
      headlineCompact: { min: 58, max: 76, def: 64 },
      support: { min: 26, max: 32, def: 28 },
      numberSize: 280, sourceSize: 18, badgeSize: 13, triangle: 268,
    },
    portrait: {
      key: "portrait", w: 1080, h: 1350,
      marginX: 72, marginTop: 64, marginBottom: 68,
      logo: 84, tag: 20, signature: 24, rail: 10,
      headline: { min: 58, max: 76, def: 66 },
      headlineCompact: { min: 58, max: 76, def: 66 },
      support: { min: 26, max: 32, def: 28 },
      numberSize: 300, sourceSize: 18, badgeSize: 13, triangle: 300,
    },
  },
  spacing: {
    landscape: { logo: 26, tag: 14, afterHead: 14, afterSupport: 16, textWidth: 760, cardGap: 32 },
    square: { logo: 32, tag: 16, afterHead: 16, afterSupport: 18, textWidth: 920, cardGap: 16 },
    portrait: { logo: 40, tag: 18, afterHead: 18, afterSupport: 20, textWidth: 920, cardGap: 22 },
    formats: {
      insight: { landscape: { logo: 48 }, square: { logo: 60 }, portrait: { logo: 72 } },
      announcement: {
        landscape: { textRight: 0.6 },
        square: { photoRatio: 0.48 },
        portrait: { photoRatio: 0.4 },
      },
      story: {
        landscape: { textWidth: 760 },
        square: { textWidth: 880 },
        portrait: { textWidth: 880 },
      },
      statistic: { landscape: { logo: 22 }, square: { logo: 28 }, portrait: { logo: 36 } },
      educational: { landscape: { logo: 20, tag: 12 }, square: { logo: 24 }, portrait: { logo: 28 } },
    },
  },
  // Distance from the logo bottom to the series label, in px at that size.
  // def null keeps the designed layout for every format and size.
  // A design stores one number per size. Export uses each size's own value.
  // A size left null keeps that size's designed gap. One scaled value does
  // not fit: designed gaps differ by format and size, and the story and tall
  // announcement layouts are not a scale of the landscape gap.
  logoLabelSpacing: {
    def: null,
    min: 8,
    max: 960,
  },
  // Vertical space between stacked objects, in px at that size.
  // def null keeps the designed gap. Each size stores its own number.
  // A size left null keeps that size's designed gap.
  // Old JSON with no objectGaps loads null and keeps the designed layout.
  objectGaps: {
    def: null,
    min: 0,
    max: 960,
  },
  // One control per vertical gap. sizes limits a control to those canvases.
  // above/below are the box ids the gap sits between.
  gapCatalog: [
    { key: "labelToHeadline", label: "Label To Headline", formats: ["announcement", "insight", "story", "educational"], above: "tag", below: "headline" },
    { key: "headlineToSupport", label: "Headline To Supporting", formats: ["announcement", "insight", "story"], above: "headline", below: "support" },
    { key: "supportToCta", label: "Supporting To CTA Line", formats: ["announcement"], above: "support", below: "cta" },
    { key: "labelToFigure", label: "Label To Figure", formats: ["statistic"], above: "tag", below: "number" },
    { key: "figureToStatement", label: "Figure To Statement", formats: ["statistic"], sizes: ["square", "portrait"], above: "number", below: "statement" },
    { key: "statementToContext", label: "Statement To Context", formats: ["statistic"], above: "statement", below: "context" },
    { key: "contextToSource", label: "Context To Source", formats: ["statistic"], above: "context", below: "source" },
    { key: "headlineToSteps", label: "Headline To Steps", formats: ["educational"], above: "headline", below: "card-1" },
    { key: "stepSpacing", label: "Step Spacing", formats: ["educational"], sizes: ["square", "portrait"], above: "card-1", below: "card-2" },
    { key: "stepLineSpacing", label: "Step Line Spacing", formats: ["educational"], above: "step-title-1", below: "step-line-1" },
  ],
  formats: {
    announcement: { label: "Announcement", headline: true, support: true, cta: true, photo: true, statistic: false, steps: false, backgrounds: null },
    statistic: { label: "Statistic", headline: false, support: false, cta: false, photo: false, statistic: true, steps: false, backgrounds: ["paper", "white", "navy"], headlineSizeLabel: "Statement size", supportSizeLabel: "Context size" },
    insight: { label: "Insight / Opinion", headline: true, support: true, cta: false, photo: false, statistic: false, steps: false, backgrounds: ["white", "paper", "navy"] },
    story: { label: "Aviation Story", headline: true, support: true, cta: false, photo: true, statistic: false, steps: false, backgrounds: null },
    educational: { label: "Educational", headline: true, support: false, cta: false, photo: false, statistic: false, steps: true, backgrounds: ["paper", "white", "navy"], supportSizeLabel: "Card text size" },
  },
  samples: {
    announcement: {
      seriesId: "now-live",
      background: "navy",
      fade: 68,
      desaturate: 0.35,
      headline: "Post an AOG event. Let the *right providers* come to you.",
      support: "Operators post the event once. MRO and parts providers unlock the details and send a quote.",
      cta: "Post your next AOG or MX event today",
      crops: {
        landscape: { zoom: 1.08, x: 58, y: 64 },
        square: { zoom: 1.16, x: 60, y: 84 },
        portrait: { zoom: 1.14, x: 58, y: 80 },
      },
    },
    statistic: {
      seriesId: "by-the-numbers",
      background: "paper",
      fade: 70,
      exampleData: true,
      number: "XX",
      unit: "%",
      statement: "of AOG events received a *first quote* within one hour",
      context: "Every hour on the ground has a cost. Faster first quotes mean faster return to service.",
      source: "Example data - placeholder figure for layout only",
    },
    insight: {
      seriesId: "the-aog-view",
      background: "white",
      fade: 70,
      headline: "AOG is rarely a parts problem. It's a *visibility* problem.",
      support: "The part usually exists somewhere. The provider who has it just doesn't know you need it yet.",
    },
    story: {
      seriesId: "return-to-service",
      background: "navy",
      fade: 76,
      headline: "Somewhere tonight, an aircraft is waiting on one part.",
      support: "Behind every AOG event is a team working to get it back in the air.",
      crops: {
        landscape: { zoom: 1.28, x: 56, y: 100 },
        square: { zoom: 1.62, x: 54, y: 100 },
        portrait: { zoom: 1.72, x: 50, y: 100 },
      },
    },
    educational: {
      seriesId: "aog-explained",
      background: "paper",
      fade: 70,
      headline: "How an AOG event reaches the *right provider*",
      steps: [
        { title: "Post the event", line: "Aircraft, part or task, and location.", icon: "clipboard" },
        { title: "Providers matched", line: "MRO and parts providers who cover it get the alert.", icon: "people" },
        { title: "Quotes come in", line: "They unlock the details and send a quote. You choose.", icon: "message" },
      ],
    },
  },
};

const $ = (id) => document.getElementById(id);
const assets = {};
let scratch = null;
let lastLayout = null;
const OBJECT_GAP_KEYS = SETTINGS.gapCatalog.map((item) => item.key);
let state = blankState();

function blankState() {
  return {
    format: "announcement",
    size: "landscape",
    seriesPreset: "now-live",
    series: "Now Live",
    headline: "",
    support: "",
    cta: "",
    headlineSize: 58,
    supportSize: 23,
    background: "navy",
    number: "XX",
    unit: "%",
    statement: "",
    context: "",
    source: "",
    exampleData: true,
    steps: [
      { title: "", line: "", icon: "clipboard" },
      { title: "", line: "", icon: "people" },
      { title: "", line: "", icon: "message" },
    ],
    photoZoom: 1,
    photoX: 50,
    photoY: 50,
    fade: 70,
    useDefaultPhoto: true,
    photoData: null,
    photoImg: null,
    caption: "",
    logoLabelSpacing: { landscape: null, square: null, portrait: null },
    objectGaps: freshObjectGaps(),
  };
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function headlineRange(format, sizeKey) {
  const size = SETTINGS.sizes[sizeKey];
  if (sizeKey === "landscape" && (format === "statistic" || format === "educational")) return size.headlineCompact;
  return size.headline;
}

function gapFor(view) {
  const base = SETTINGS.spacing[view.sizeKey];
  const over = (SETTINGS.spacing.formats[view.format] || {})[view.sizeKey] || {};
  return { ...base, ...over };
}

const GAP_CLAMP_WARNING = "Spacing was reduced so the text stays inside the layout.";

function freshSizeMap() {
  return { landscape: null, square: null, portrait: null };
}

function freshObjectGaps() {
  const out = {};
  OBJECT_GAP_KEYS.forEach((key) => { out[key] = freshSizeMap(); });
  return out;
}

function normalizeSizeMap(value, limits) {
  const out = freshSizeMap();
  if (!value || typeof value !== "object" || Array.isArray(value)) return out;
  ["landscape", "square", "portrait"].forEach((key) => {
    if (value[key] == null || value[key] === "") return;
    const n = Number(value[key]);
    if (Number.isFinite(n)) out[key] = clamp(Math.round(n), limits.min, limits.max);
  });
  return out;
}

function normalizeObjectGaps(value) {
  const out = freshObjectGaps();
  if (!value || typeof value !== "object" || Array.isArray(value)) return out;
  OBJECT_GAP_KEYS.forEach((key) => {
    out[key] = normalizeSizeMap(value[key], SETTINGS.objectGaps);
  });
  return out;
}

function objectGapsForSize(sizeKey) {
  const out = {};
  OBJECT_GAP_KEYS.forEach((key) => {
    const slot = state.objectGaps && state.objectGaps[key];
    out[key] = slot && slot[sizeKey] != null ? slot[sizeKey] : null;
  });
  return out;
}

function gapIsSet(view, key) {
  if (!view || !view.objectGaps) return false;
  const raw = view.objectGaps[key];
  return raw != null && raw !== "" && Number.isFinite(Number(raw));
}

function chosenGap(view, key, designed) {
  if (!gapIsSet(view, key)) return designed;
  return clamp(Math.round(Number(view.objectGaps[key])), SETTINGS.objectGaps.min, SETTINGS.objectGaps.max);
}

function bounds(boxes, id) {
  let y = Infinity;
  let bottom = -Infinity;
  let found = false;
  (boxes || []).forEach((box) => {
    if (box.id !== id) return;
    found = true;
    y = Math.min(y, box.y);
    bottom = Math.max(bottom, box.y + box.h);
  });
  if (!found) return null;
  return { y, bottom, h: bottom - y };
}

function unionBounds(a, b) {
  if (!a) return b;
  if (!b) return a;
  const y = Math.min(a.y, b.y);
  const bottom = Math.max(a.bottom, b.bottom);
  return { y, bottom, h: bottom - y };
}

function pairGap(above, below) {
  if (!above || !below) return null;
  return below.y - above.bottom;
}

function blockSize(boxes, id) {
  const line = (boxes || []).find((box) => box.id === id && Number.isFinite(box.size));
  return line ? line.size : null;
}

function contentBottom(boxes) {
  let bottom = 0;
  (boxes || []).forEach((box) => {
    if (box.role === "signature" || box.id === "source" || box.id === "badge") return;
    bottom = Math.max(bottom, box.y + box.h);
  });
  return bottom;
}

function measureObjectGaps(boxes) {
  const tag = bounds(boxes, "tag");
  const headline = bounds(boxes, "headline");
  const support = bounds(boxes, "support");
  const cta = bounds(boxes, "cta");
  const figure = unionBounds(bounds(boxes, "number"), bounds(boxes, "unit"));
  const statement = bounds(boxes, "statement");
  const context = bounds(boxes, "context");
  const source = bounds(boxes, "source");
  const card1 = bounds(boxes, "card-1");
  const card2 = bounds(boxes, "card-2");
  const title = bounds(boxes, "step-title-1");
  const line = bounds(boxes, "step-line-1");
  return {
    labelToHeadline: pairGap(tag, headline),
    headlineToSupport: pairGap(headline, support),
    supportToCta: pairGap(support, cta),
    labelToFigure: pairGap(tag, figure),
    figureToStatement: pairGap(figure, statement),
    statementToContext: pairGap(statement, context),
    contextToSource: pairGap(context, source),
    headlineToSteps: pairGap(headline, card1),
    stepSpacing: card1 && card2 && card2.y >= card1.bottom - 0.5 ? pairGap(card1, card2) : null,
    stepLineSpacing: pairGap(title, line),
  };
}

function measureGapLimits(layout, measured) {
  const min = SETTINGS.objectGaps.min;
  const max = SETTINGS.objectGaps.max;
  const edge = layout.height - layout.rail - layout.marginBottom;
  const slack = Math.max(0, edge - contentBottom(layout.boxes));
  const limits = {};
  Object.keys(measured).forEach((key) => {
    if (measured[key] == null || !Number.isFinite(measured[key])) return;
    limits[key] = clamp(Math.floor(measured[key] + slack), min, max);
  });
  const source = bounds(layout.boxes, "source");
  if (source && measured.contextToSource != null) {
    const room = Math.max(0, edge - source.bottom);
    limits.contextToSource = clamp(Math.floor(measured.contextToSource + room), min, max);
  }
  const card = bounds(layout.boxes, "card-1");
  const line = bounds(layout.boxes, "step-line-1");
  if (card && line && measured.stepLineSpacing != null) {
    const room = Math.max(0, card.y + card.h - 14 - line.bottom);
    limits.stepLineSpacing = clamp(Math.floor(measured.stepLineSpacing + room), min, max);
  }
  return limits;
}

function lowestSetGap(view, layout, skip) {
  let best = null;
  let bestY = -Infinity;
  SETTINGS.gapCatalog.forEach((item) => {
    if (skip && skip.has(item.key)) return;
    if (!gapIsSet(view, item.key)) return;
    if (!item.formats.includes(view.format)) return;
    if (item.sizes && !item.sizes.includes(view.sizeKey)) return;
    const below = bounds(layout.boxes, item.below);
    const y = below ? below.y : -1;
    if (y >= bestY) {
      bestY = y;
      best = item.key;
    }
  });
  return best;
}

let measuringDesign = false;

function designedLayout(view) {
  if (measuringDesign) throw new Error("Designed layout was measured while a measurement was already running.");
  measuringDesign = true;
  try {
    const clean = {};
    OBJECT_GAP_KEYS.forEach((key) => { clean[key] = null; });
    const canvas = document.createElement("canvas");
    return paintFrame(canvas, { ...view, objectGaps: clean });
  } finally {
    measuringDesign = false;
  }
}

function textAt(view, id, text, x, y, maxW, maxLines, maxHeight, range, theme, rules, display, lockBoxes) {
  const spec = textSpec(view, id, text, x, y, maxW, maxLines, maxHeight, range, theme, rules, display);
  if (!lockBoxes) return spec;
  const size = blockSize(lockBoxes, id);
  const block = bounds(lockBoxes, id);
  if (!size || !block) return spec;
  spec.pref = size;
  spec.min = Math.min(range.min, size);
  spec.maxHeight = Math.max(block.h + 2, 12);
  return spec;
}

const SPACING_CLAMP_WARNING = "Logo to label spacing was reduced so the text stays above the signature.";

function freshLabelSpacing() {
  return { landscape: null, square: null, portrait: null };
}

function normalizeLabelSpacing(value) {
  const out = freshLabelSpacing();
  const limits = SETTINGS.logoLabelSpacing;
  if (!value || typeof value !== "object" || Array.isArray(value)) return out;
  ["landscape", "square", "portrait"].forEach((key) => {
    if (value[key] == null || value[key] === "") return;
    const n = Number(value[key]);
    if (Number.isFinite(n)) out[key] = clamp(Math.round(n), limits.min, limits.max);
  });
  return out;
}

function measuredLabelLimit(boxes, logoBottom, gap, bodyBottom) {
  const limits = SETTINGS.logoLabelSpacing;
  let lowest = logoBottom + (Number.isFinite(gap) ? gap : 0);
  boxes.forEach((box) => {
    if (box.role === "signature" || box.id === "source" || box.id === "badge") return;
    lowest = Math.max(lowest, box.y + box.h);
  });
  const slack = Math.max(0, bodyBottom - lowest);
  const base = Number.isFinite(gap) ? gap : 0;
  return clamp(Math.floor(base + slack), limits.min, limits.max);
}

function resolveLabelPlacement(view, limit) {
  const limits = SETTINGS.logoLabelSpacing;
  const capped = clamp(Math.floor(limit), limits.min, limits.max);
  if (view.labelGap == null || !Number.isFinite(Number(view.labelGap))) return { gap: null, limit: capped };
  const requested = clamp(Math.round(Number(view.labelGap)), limits.min, limits.max);
  return { gap: clamp(requested, limits.min, capped), limit: capped };
}

function textOverflowPx(layout) {
  if (!layout || !layout.boxes) return 0;
  const limit = layout.height - layout.rail - layout.marginBottom;
  let over = 0;
  layout.boxes.forEach((box) => {
    const edge = box.role === "signature" ? layout.signatureBottom : limit;
    if (box.y + box.h > edge + 0.75) over = Math.max(over, box.y + box.h - edge);
  });
  return over;
}

function isDark(view) {
  if (view.format === "announcement" || view.format === "story") return true;
  return view.background === "navy";
}

function themeFor(view) {
  const b = SETTINGS.brand;
  if (isDark(view)) {
    return { bg: b.navy, headline: b.white, support: b.soft, signature: b.white, logo: "white", mark: "white", triangle: b.white };
  }
  return {
    bg: view.background === "white" ? b.white : b.paper,
    headline: b.navy,
    support: b.slate,
    signature: b.navy,
    logo: "color",
    mark: "navy",
    triangle: b.navy,
  };
}

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load " + src));
    img.src = src;
  });
}

function scratchCanvas(w, h) {
  if (!scratch) scratch = document.createElement("canvas");
  if (scratch.width !== w || scratch.height !== h) {
    scratch.width = w;
    scratch.height = h;
  }
  const ctx = scratch.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  return ctx;
}

function drawCover(ctx, img, dx, dy, dw, dh, zoom, posX, posY) {
  if (!img || dw < 1 || dh < 1) return;
  const z = Math.max(1, zoom || 1);
  const ir = img.width / img.height;
  const r = dw / dh;
  let sw;
  let sh;
  if (ir > r) {
    sh = img.height / z;
    sw = sh * r;
  } else {
    sw = img.width / z;
    sh = sw / r;
  }
  if (sw > img.width) { sh *= img.width / sw; sw = img.width; }
  if (sh > img.height) { sw *= img.height / sh; sh = img.height; }
  const sx = clamp((img.width - sw) * (clamp(posX, 0, 100) / 100), 0, Math.max(0, img.width - sw));
  const sy = clamp((img.height - sh) * (clamp(posY, 0, 100) / 100), 0, Math.max(0, img.height - sh));
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function tokenize(text) {
  const lines = String(text || "").replace(/\r/g, "").split("\n");
  const tokens = [];
  lines.forEach((line, index) => {
    const match = line.match(/\*([^*]+)\*/);
    const chunks = match
      ? [
          { text: line.slice(0, match.index), highlight: false },
          { text: match[1], highlight: true },
          { text: line.slice(match.index + match[0].length), highlight: false },
        ]
      : [{ text: line, highlight: false }];
    chunks.forEach((chunk) => {
      chunk.text.replace(/\*/g, "").split(/\s+/).filter(Boolean).forEach((word) => {
        tokens.push({ text: word, highlight: chunk.highlight });
      });
    });
    if (index < lines.length - 1) tokens.push({ break: true });
  });
  return tokens;
}

function measureTracked(ctx, text, trackingPx) {
  if (!text) return 0;
  let width = 0;
  for (let i = 0; i < text.length; i += 1) {
    width += ctx.measureText(text[i]).width;
    if (i < text.length - 1) width += trackingPx;
  }
  return width;
}

function drawTracked(ctx, text, x, baseline, trackingPx) {
  let cx = x;
  for (let i = 0; i < text.length; i += 1) {
    ctx.fillText(text[i], cx, baseline);
    cx += ctx.measureText(text[i]).width;
    if (i < text.length - 1) cx += trackingPx;
  }
}

function lineWidth(ctx, words, trackingPx) {
  if (!words.length) return 0;
  return measureTracked(ctx, words.map((word) => word.text).join(" "), trackingPx);
}

function takeParts(ctx, word, maxWidth, trackingPx) {
  if (lineWidth(ctx, [word], trackingPx) <= maxWidth) return [word];
  const parts = [];
  let cur = "";
  for (const ch of word.text) {
    const next = cur + ch;
    if (cur && lineWidth(ctx, [{ text: next, highlight: word.highlight }], trackingPx) > maxWidth) {
      parts.push({ text: cur, highlight: word.highlight });
      cur = ch;
    } else {
      cur = next;
    }
  }
  if (cur) parts.push({ text: cur, highlight: word.highlight });
  return parts.length ? parts : [word];
}

function greedyWrap(ctx, words, maxWidth, trackingPx) {
  const lines = [];
  let current = [];
  const push = () => {
    if (!current.length) return;
    lines.push({ words: current, width: lineWidth(ctx, current, trackingPx) });
    current = [];
  };
  words.forEach((word) => {
    takeParts(ctx, word, maxWidth, trackingPx).forEach((part) => {
      if (current.length && lineWidth(ctx, current.concat([part]), trackingPx) > maxWidth) push();
      current.push(part);
    });
  });
  push();
  return lines;
}

function balanceWrap(ctx, words, maxWidth, trackingPx, targetLines) {
  let low = 1;
  let high = maxWidth;
  let best = null;
  for (let i = 0; i < 18; i += 1) {
    const mid = (low + high) / 2;
    const lines = greedyWrap(ctx, words, Math.max(8, mid), trackingPx);
    const ok = lines.length <= targetLines && lines.every((line) => line.width <= maxWidth + 0.5);
    if (ok) {
      best = lines;
      high = mid;
    } else {
      low = mid;
    }
  }
  return best || greedyWrap(ctx, words, maxWidth, trackingPx);
}

function wrapRich(ctx, text, maxWidth, trackingPx, maxLines) {
  const tokens = tokenize(text);
  const paragraphs = [];
  let current = [];
  tokens.forEach((token) => {
    if (token.break) {
      paragraphs.push(current);
      current = [];
    } else current.push(token);
  });
  paragraphs.push(current);
  const lines = [];
  paragraphs.forEach((words) => {
    if (!words.length) return;
    const greedy = greedyWrap(ctx, words, maxWidth, trackingPx);
    if (greedy.length <= 1 || greedy.length > maxLines) lines.push(...greedy);
    else lines.push(...balanceWrap(ctx, words, maxWidth, trackingPx, greedy.length));
  });
  return lines;
}

function fitText(ctx, text, opt) {
  const clean = String(text || "").trim();
  if (!clean) return { size: opt.pref, lines: [], height: 0, belowMin: false, truncated: false };
  let size = Math.round(opt.pref);
  const floor = 8;
  while (size >= floor) {
    ctx.font = `${opt.weight} ${size}px ${SETTINGS.fonts.family}`;
    const lines = wrapRich(ctx, text, opt.maxWidth, size * opt.trackingEm, opt.maxLines);
    const height = lines.length * size * opt.lineHeight;
    const tooMany = lines.length > opt.maxLines;
    const tooWide = lines.some((line) => line.width > opt.maxWidth + 0.75);
    const tooTall = opt.maxHeight && height > opt.maxHeight + 0.75;
    if (!tooMany && !tooWide && !tooTall) {
      return { size, lines, height, belowMin: size < opt.min, truncated: false };
    }
    size -= 1;
  }
  ctx.font = `${opt.weight} ${floor}px ${SETTINGS.fonts.family}`;
  let lines = wrapRich(ctx, text, opt.maxWidth, floor * opt.trackingEm, 40);
  let truncated = false;
  if (opt.maxHeight) {
    const maxCount = Math.max(1, Math.floor(opt.maxHeight / (floor * opt.lineHeight)));
    if (lines.length > maxCount) {
      lines = lines.slice(0, maxCount);
      truncated = true;
    }
  }
  return { size: floor, lines, height: lines.length * floor * opt.lineHeight, belowMin: true, truncated };
}

function drawLines(ctx, layout, x, y, opt) {
  if (!layout.lines.length) return { bottom: y };
  ctx.font = `${opt.weight} ${layout.size}px ${SETTINGS.fonts.family}`;
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const trackingPx = layout.size * opt.trackingEm;
  const lineHeight = layout.size * opt.lineHeight;
  const probe = ctx.measureText("Hg");
  const ascent = probe.actualBoundingBoxAscent || layout.size * 0.78;
  const descent = probe.actualBoundingBoxDescent || layout.size * 0.22;
  const baselineFromTop = ascent + Math.max(0, (lineHeight - ascent - descent) / 2);
  const space = ctx.measureText(" ").width;
  layout.lines.forEach((line, index) => {
    const top = y + index * lineHeight;
    const baseline = top + baselineFromTop;
    let cx = x;
    line.words.forEach((word, wi) => {
      if (wi > 0) cx += trackingPx + space + trackingPx;
      ctx.fillStyle = word.highlight ? opt.highlight : opt.color;
      drawTracked(ctx, word.text, cx, baseline, trackingPx);
      cx += measureTracked(ctx, word.text, trackingPx);
    });
    const text = line.words.map((word) => word.text).join(" ");
    opt.out.boxes.push({
      id: opt.id,
      role: "text",
      kind: "line",
      text,
      weight: opt.weight,
      size: layout.size,
      trackingEm: opt.trackingEm,
      x,
      y: top,
      w: line.width,
      h: lineHeight,
    });
  });
  return { bottom: y + layout.lines.length * lineHeight };
}

function renderText(ctx, out, spec) {
  const layout = fitText(ctx, spec.text, spec);
  if (String(spec.text || "").trim()) {
    if (layout.belowMin) {
      out.warnings.push(`${spec.label} is below the minimum size (${spec.min} px) so it can stay inside the margins.`);
    }
    if (layout.truncated) out.warnings.push(`${spec.label} was shortened to stay inside the margins.`);
  }
  const drawn = drawLines(ctx, layout, spec.x, spec.y, {
    weight: spec.weight,
    trackingEm: spec.trackingEm,
    lineHeight: spec.lineHeight,
    color: spec.color,
    highlight: spec.highlight,
    id: spec.id,
    out,
  });
  if (spec.track === "headline") out.drawnHeadline = layout.lines.length ? layout.size : spec.pref;
  if (spec.track === "support") out.drawnSupport = layout.lines.length ? layout.size : spec.pref;
  return { layout, bottom: drawn.bottom };
}

function tagMetrics(ctx, text, size, maxWidth) {
  const label = String(text || "").trim().toUpperCase();
  if (!label) return null;
  let fontSize = size;
  while (fontSize >= 11) {
    ctx.font = `800 ${fontSize}px ${SETTINGS.fonts.family}`;
    const track = fontSize * SETTINGS.rules.tagTracking;
    const tw = measureTracked(ctx, label, track);
    const padX = SETTINGS.rules.tagPadX * fontSize;
    const width = tw + padX * 2;
    const height = (SETTINGS.rules.tagPadTop + 1 + SETTINGS.rules.tagPadBottom) * fontSize;
    if (width <= maxWidth || fontSize === 11) {
      return { label, fontSize, track, tw, width, height, padX, below: fontSize < size };
    }
    fontSize -= 1;
  }
  return null;
}

function drawTag(ctx, text, x, y, size, maxWidth, out) {
  const tag = tagMetrics(ctx, text, size, maxWidth);
  if (!tag) return { bottom: y, height: 0 };
  if (tag.below) out.warnings.push("Series label is below the standard size so it can stay inside the margins.");
  const r = SETTINGS.rules;
  roundRect(ctx, x, y, tag.width, tag.height, r.tagRadius);
  ctx.fillStyle = SETTINGS.brand.red;
  ctx.fill();
  ctx.font = `800 ${tag.fontSize}px ${SETTINGS.fonts.family}`;
  ctx.fillStyle = SETTINGS.brand.white;
  const probe = ctx.measureText(tag.label);
  const ascent = probe.actualBoundingBoxAscent || tag.fontSize * 0.78;
  const descent = probe.actualBoundingBoxDescent || tag.fontSize * 0.22;
  const textTop = y + r.tagPadTop * tag.fontSize;
  const baseline = textTop + (tag.fontSize - ascent - descent) / 2 + ascent;
  drawTracked(ctx, tag.label, x + tag.padX, baseline, tag.track);
  out.boxes.push({ id: "tag", role: "text", x, y, w: tag.width, h: tag.height });
  return { bottom: y + tag.height, height: tag.height };
}

function measureSignature(ctx, view) {
  const S = view.size;
  const size = S.signature;
  ctx.font = `800 ${size}px ${SETTINGS.fonts.family}`;
  const label = SETTINGS.rules.signatureText;
  const textWidth = measureTracked(ctx, label, 0);
  const mark = size * SETTINGS.rules.signatureMark;
  const gap = Math.round(size * 0.42);
  const width = mark + gap + textWidth;
  const probe = ctx.measureText(label);
  const ascent = probe.actualBoundingBoxAscent || size * 0.78;
  const descent = probe.actualBoundingBoxDescent || size * 0.22;
  const targetBottom = S.h - S.rail - (S.marginBottom - SETTINGS.rules.signatureInset);
  const baseline = targetBottom - descent;
  const top = baseline - ascent;
  const x = S.w - S.marginX - width;
  return { x, top, width, height: ascent + descent, baseline, mark, gap, label, size, targetBottom, ascent };
}

function drawSignature(ctx, sig, theme, out) {
  const markY = sig.top + (sig.ascent - sig.mark) / 2;
  ctx.fillStyle = SETTINGS.brand.red;
  ctx.fillRect(sig.x, markY, sig.mark, sig.mark);
  ctx.font = `800 ${sig.size}px ${SETTINGS.fonts.family}`;
  ctx.fillStyle = theme.signature;
  ctx.textBaseline = "alphabetic";
  drawTracked(ctx, sig.label, sig.x + sig.mark + sig.gap, sig.baseline, 0);
  out.boxes.push({ id: "signature", role: "signature", x: sig.x, y: sig.top, w: sig.width, h: sig.height });
}

function drawRail(ctx, view) {
  const S = view.size;
  ctx.fillStyle = SETTINGS.brand.red;
  ctx.fillRect(0, S.h - S.rail, S.w, S.rail);
}

function drawLogo(ctx, view) {
  const S = view.size;
  const img = themeFor(view).logo === "white" ? assets.logoWhite : assets.logo;
  const h = S.logo;
  const w = h * (img.width / img.height);
  ctx.drawImage(img, S.marginX, S.marginTop, w, h);
}

const ICONS = {
  plane(ctx) {
    ctx.beginPath();
    ctx.moveTo(2, 13.2);
    ctx.lineTo(21.5, 11.6);
    ctx.moveTo(8.2, 12.8);
    ctx.lineTo(12.6, 6.2);
    ctx.lineTo(15.2, 6.8);
    ctx.lineTo(11.2, 13.1);
    ctx.moveTo(4.2, 13);
    ctx.lineTo(6.4, 8.4);
    ctx.lineTo(8.4, 9.2);
    ctx.moveTo(17.2, 12.2);
    ctx.lineTo(19.6, 16.4);
    ctx.stroke();
  },
  pin(ctx) {
    ctx.beginPath();
    ctx.moveTo(12, 21.5);
    ctx.bezierCurveTo(12, 21.5, 5.2, 15.2, 5.2, 10.2);
    ctx.arc(12, 9.6, 6.6, Math.PI * 0.62, Math.PI * 0.38, false);
    ctx.bezierCurveTo(18.8, 15.2, 12, 21.5, 12, 21.5);
    ctx.moveTo(12, 12.2);
    ctx.arc(12, 9.5, 2.3, 0, Math.PI * 2);
    ctx.stroke();
  },
  bell(ctx) {
    ctx.beginPath();
    ctx.moveTo(6.2, 16.2);
    ctx.lineTo(6.2, 11);
    ctx.bezierCurveTo(6.2, 7.2, 8.6, 4.8, 12, 4.8);
    ctx.bezierCurveTo(15.4, 4.8, 17.8, 7.2, 17.8, 11);
    ctx.lineTo(17.8, 16.2);
    ctx.lineTo(6.2, 16.2);
    ctx.moveTo(10, 16.4);
    ctx.arc(12, 17.6, 2, Math.PI, 0);
    ctx.moveTo(12, 3.2);
    ctx.lineTo(12, 5);
    ctx.stroke();
  },
  people(ctx) {
    ctx.beginPath();
    ctx.arc(9, 8.2, 2.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(16.2, 9, 2.1, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(3.8, 18.8);
    ctx.bezierCurveTo(4.2, 14.8, 6.4, 13, 9, 13);
    ctx.bezierCurveTo(11.6, 13, 13.6, 14.8, 14.2, 18.8);
    ctx.moveTo(13.2, 14.2);
    ctx.bezierCurveTo(14.4, 13.2, 15.6, 12.8, 16.6, 12.8);
    ctx.bezierCurveTo(18.8, 12.8, 20.2, 14.4, 20.6, 17.8);
    ctx.stroke();
  },
  wrench(ctx) {
    ctx.beginPath();
    ctx.moveTo(14.6, 5.2);
    ctx.bezierCurveTo(17.8, 5.2, 20.2, 7.6, 20.2, 10.2);
    ctx.bezierCurveTo(20.2, 11.6, 19.6, 12.8, 18.6, 13.6);
    ctx.lineTo(8.2, 20.4);
    ctx.bezierCurveTo(7.2, 21.1, 5.8, 20.8, 5.1, 19.8);
    ctx.bezierCurveTo(4.4, 18.8, 4.7, 17.4, 5.7, 16.7);
    ctx.lineTo(9.4, 14.2);
    ctx.moveTo(14.2, 8.4);
    ctx.lineTo(16.6, 10.6);
    ctx.stroke();
  },
  clipboard(ctx) {
    roundRect(ctx, 6, 4.5, 12, 15.5, 2);
    ctx.stroke();
    roundRect(ctx, 9, 2.4, 6, 3.4, 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(9, 10);
    ctx.lineTo(15, 10);
    ctx.moveTo(9, 13.5);
    ctx.lineTo(15, 13.5);
    ctx.stroke();
  },
  check(ctx) {
    ctx.beginPath();
    ctx.moveTo(5, 12.5);
    ctx.lineTo(10, 17.2);
    ctx.lineTo(19.2, 6.8);
    ctx.stroke();
  },
  clock(ctx) {
    ctx.beginPath();
    ctx.arc(12, 12, 8, 0, Math.PI * 2);
    ctx.moveTo(12, 12);
    ctx.lineTo(12, 7.2);
    ctx.moveTo(12, 12);
    ctx.lineTo(15.6, 14.2);
    ctx.stroke();
  },
  part(ctx) {
    ctx.beginPath();
    ctx.moveTo(4, 8);
    ctx.lineTo(12, 4);
    ctx.lineTo(20, 8);
    ctx.lineTo(12, 12);
    ctx.closePath();
    ctx.moveTo(4, 8);
    ctx.lineTo(4, 16);
    ctx.lineTo(12, 20);
    ctx.lineTo(12, 12);
    ctx.moveTo(20, 8);
    ctx.lineTo(20, 16);
    ctx.lineTo(12, 20);
    ctx.stroke();
  },
  message(ctx) {
    roundRect(ctx, 3, 4, 18, 12, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(7, 16);
    ctx.lineTo(5.5, 20.5);
    ctx.lineTo(12, 16);
    ctx.stroke();
  },
};

function drawIcon(ctx, name, x, y, size, color) {
  const fn = ICONS[name] || ICONS.clipboard;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.75;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  fn(ctx);
  ctx.restore();
}

function drawChevron(ctx, cx, cy, s) {
  ctx.save();
  ctx.strokeStyle = SETTINGS.brand.red;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.22, cy - s * 0.42);
  ctx.lineTo(cx + s * 0.28, cy);
  ctx.lineTo(cx - s * 0.22, cy + s * 0.42);
  ctx.stroke();
  ctx.restore();
}

function paintAnnouncementPhoto(ctx, view) {
  const S = view.size;
  const gap = gapFor(view);
  const sctx = scratchCanvas(S.w, S.h);
  const fadeT = clamp(view.fade, 0, 100) / 100;
  if (view.desaturate) sctx.filter = `saturate(${(1 - view.desaturate).toFixed(3)})`;
  let photoBottom = S.h;
  if (S.key === "landscape") {
    const x = Math.round(S.w * (1 - SETTINGS.rules.announcementPhoto));
    drawCover(sctx, view.photo, x, 0, S.w - x, S.h, view.photoZoom, view.photoX, view.photoY);
    sctx.filter = "none";
    sctx.globalCompositeOperation = "destination-in";
    const fade = (S.w - x) * (0.22 + fadeT * 0.7);
    const g = sctx.createLinearGradient(x, 0, x + fade, 0);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.38, "rgba(0,0,0,0.12)");
    g.addColorStop(1, "rgba(0,0,0,1)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, S.w, S.h);
  } else {
    photoBottom = Math.round(S.h * (gap.photoRatio || 0.46));
    drawCover(sctx, view.photo, 0, 0, S.w, photoBottom, view.photoZoom, view.photoX, view.photoY);
    sctx.filter = "none";
    sctx.globalCompositeOperation = "destination-in";
    const fade = photoBottom * (0.2 + fadeT * 0.45);
    const g = sctx.createLinearGradient(0, photoBottom - fade, 0, photoBottom);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, S.w, S.h);
  }
  sctx.globalCompositeOperation = "source-over";
  ctx.drawImage(scratch, 0, 0);
  if (S.key !== "landscape") {
    const navy = SETTINGS.brand.navy;
    const radius = S.logo * 3.5;
    const scrim = ctx.createRadialGradient(S.marginX, S.marginTop + 8, 12, S.marginX + 16, S.marginTop + 18, radius);
    scrim.addColorStop(0, rgba(navy, 0.78));
    scrim.addColorStop(0.45, rgba(navy, 0.42));
    scrim.addColorStop(1, rgba(navy, 0));
    ctx.fillStyle = scrim;
    ctx.fillRect(0, 0, radius * 1.8, radius * 1.25);
  }
  return photoBottom;
}

function paintStoryPhoto(ctx, view) {
  const S = view.size;
  drawCover(ctx, view.photo, 0, 0, S.w, S.h, view.photoZoom, view.photoX, view.photoY);
  const t = clamp(view.fade, 0, 100) / 100;
  const navy = SETTINGS.brand.navy;
  const g = S.key === "landscape"
    ? ctx.createLinearGradient(0, 0, S.w * (0.78 + t * 0.22), 0)
    : ctx.createLinearGradient(0, S.h, 0, S.h - S.h * (0.58 + t * 0.28));
  g.addColorStop(0, rgba(navy, 0.96));
  g.addColorStop(0.46, rgba(navy, 0.9));
  g.addColorStop(0.72, rgba(navy, 0.42));
  g.addColorStop(1, rgba(navy, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S.w, S.h);
  const radius = S.logo * (S.key === "landscape" ? 2.4 : 3.8);
  const scrim = ctx.createRadialGradient(S.marginX, S.marginTop, 10, S.marginX, S.marginTop, radius);
  scrim.addColorStop(0, rgba(navy, S.key === "landscape" ? 0.18 : 0.55));
  scrim.addColorStop(1, rgba(navy, 0));
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, radius * 1.6, radius * 1.15);
}

function paintWatermark(ctx, view, theme) {
  const S = view.size;
  const img = theme.mark === "white" ? assets.tailWhite : assets.tail;
  const h = S.h * (S.key === "landscape" ? 0.78 : 0.62);
  const w = h * (img.width / img.height);
  ctx.save();
  ctx.globalAlpha = SETTINGS.rules.watermarkAlpha;
  ctx.drawImage(img, S.w - w * 0.78, (S.h - h) / 2, w, h);
  ctx.restore();
}

function paintTriangle(ctx, view, theme) {
  const S = view.size;
  const leg = S.triangle;
  ctx.beginPath();
  ctx.moveTo(S.w, 0);
  ctx.lineTo(S.w, leg);
  ctx.lineTo(S.w - leg, 0);
  ctx.closePath();
  ctx.fillStyle = theme.triangle;
  ctx.fill();
}

function footerPlan(ctx, view, theme, out) {
  const S = view.size;
  const sig = measureSignature(ctx, view);
  let bodyBottom = sig.top - 18;
  const jobs = [];
  if (view.format === "statistic") {
    const safeBottom = S.h - S.rail - S.marginBottom;
    const maxRow = Math.max(80, sig.x - S.marginX - 20);
    const badge = view.exampleData ? badgeMetrics(ctx, S.badgeSize) : null;
    const sourceText = String(view.source || "").trim();
    if (!sourceText) out.warnings.push("Source line is required.");
    let beside = false;
    let source = null;
    if (sourceText) {
      source = fitText(ctx, sourceText, {
        maxWidth: maxRow - (badge ? badge.w + 12 : 0),
        maxLines: 1,
        pref: S.sourceSize,
        min: Math.min(14, S.sourceSize),
        weight: 500,
        trackingEm: 0,
        lineHeight: 1.3,
      });
      const oneLine = source.lines.length === 1 && source.size === S.sourceSize;
      beside = Boolean(badge) && oneLine && source.lines[0].width + 12 + badge.w <= maxRow;
      if (!beside) {
        source = fitText(ctx, sourceText, {
          maxWidth: maxRow,
          maxLines: 2,
          pref: S.sourceSize,
          min: Math.min(14, S.sourceSize),
          weight: 500,
          trackingEm: 0,
          lineHeight: 1.3,
          maxHeight: S.sourceSize * 1.3 * 2 + 4,
        });
      }
      if (source.belowMin) {
        out.warnings.push(`Source line is below the minimum size (${S.sourceSize} px) so it can stay inside the margins.`);
      }
    }
    const badgeBlock = badge ? badge.h + (beside || !source ? 0 : 8) : 0;
    const sourceBlock = source ? source.height : 0;
    const blockH = beside ? Math.max(sourceBlock, badge ? badge.h : 0) : sourceBlock + badgeBlock;
    const top = safeBottom - blockH;
    bodyBottom = Math.min(bodyBottom, top - 16);
    const sourcePlan = { source, badge, beside, maxRow, sourceText, blockH, top };
    if (!gapIsSet(view, "contextToSource")) {
      jobs.push(() => paintStatisticSource(ctx, view, theme, out, sourcePlan, top));
    }
    jobs.push(() => drawSignature(ctx, sig, theme, out));
    return { bodyBottom, sourcePlan, draw() { jobs.forEach((job) => job()); } };
  }
  jobs.push(() => drawSignature(ctx, sig, theme, out));
  return { bodyBottom, sourcePlan: null, draw() { jobs.forEach((job) => job()); } };
}

function paintStatisticSource(ctx, view, theme, out, plan, top) {
  const S = view.size;
  const source = plan.source;
  const badge = plan.badge;
  const beside = plan.beside;
  const maxRow = plan.maxRow;
  const sourceText = plan.sourceText;
  if (source && sourceText) {
    renderText(ctx, out, {
      text: sourceText,
      x: S.marginX,
      y: top,
      maxWidth: beside ? maxRow - badge.w - 12 : maxRow,
      maxLines: beside ? 1 : 2,
      pref: source.size,
      min: source.size,
      weight: 500,
      trackingEm: 0,
      lineHeight: 1.3,
      color: theme.support,
      highlight: theme.support,
      id: "source",
      label: "Source line",
    });
  }
  if (badge) {
    const bx = beside ? S.marginX + source.lines[0].width + 12 : S.marginX;
    const by = beside ? top + (source.height - badge.h) / 2 : top + (source ? source.height + 8 : 0);
    drawBadge(ctx, badge, bx, by, out);
  }
}

function placeContextSource(ctx, view, theme, out, plan) {
  const S = view.size;
  const context = bounds(out.boxes, "context");
  const above = contentBottom(out.boxes);
  const designed = context ? plan.top - context.bottom : 0;
  const requested = chosenGap(view, "contextToSource", designed);
  let top = (context ? context.bottom : above) + requested;
  if (top < above) top = above;
  const maxTop = (S.h - S.rail - S.marginBottom) - plan.blockH;
  if (top > maxTop) top = maxTop;
  paintStatisticSource(ctx, view, theme, out, plan, top);
}

function badgeMetrics(ctx, size) {
  const label = SETTINGS.rules.badgeText;
  ctx.font = `800 ${size}px ${SETTINGS.fonts.family}`;
  const track = size * SETTINGS.rules.badgeTracking;
  const tw = measureTracked(ctx, label, track);
  const padX = size * 0.7;
  const padY = size * 0.42;
  return { label, size, track, tw, w: tw + padX * 2, h: size + padY * 2, padX, padY };
}

function drawBadge(ctx, badge, x, y, out) {
  roundRect(ctx, x, y, badge.w, badge.h, 2);
  ctx.fillStyle = SETTINGS.brand.gold;
  ctx.fill();
  ctx.font = `800 ${badge.size}px ${SETTINGS.fonts.family}`;
  ctx.fillStyle = SETTINGS.brand.navy;
  const probe = ctx.measureText(badge.label);
  const ascent = probe.actualBoundingBoxAscent || badge.size * 0.78;
  const descent = probe.actualBoundingBoxDescent || badge.size * 0.2;
  const baseline = y + badge.padY + (badge.size - ascent - descent) / 2 + ascent;
  drawTracked(ctx, badge.label, x + badge.padX, baseline, badge.track);
  out.boxes.push({ id: "badge", role: "text", x, y, w: badge.w, h: badge.h });
}

function columnWidth(view) {
  const S = view.size;
  const gap = gapFor(view);
  if (view.format === "announcement" && S.key === "landscape") {
    return Math.round(S.w * (gap.textRight || 0.6) - S.marginX) - 1;
  }
  if (gap.textWidth) return Math.min(gap.textWidth, S.w - S.marginX * 2 - 1);
  return S.w - S.marginX * 2 - 1;
}

function paintAnnouncementAnchored(ctx, view, theme, out, bodyBottom) {
  const designed = designedLayout(view);
  const S = view.size;
  const gap = gapFor(view);
  const x = S.marginX;
  const maxW = columnWidth(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const tagB = bounds(designed.boxes, "tag");
  let y = tagB ? tagB.y : S.marginTop + S.logo + gap.logo;
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + chosenGap(view, "labelToHeadline", gap.tag);
  const lockHead = !gapIsSet(view, "labelToHeadline");
  const head = renderText(ctx, out, textAt(view, "headline", view.headline, x, y, maxW, 3, bodyBottom - y - 70, range, theme, rules, true, lockHead ? designed.boxes : null));
  const afterHead = view.support.trim() ? chosenGap(view, "headlineToSupport", gap.afterHead) : 0;
  y = head.bottom + afterHead;
  const lockSupport = lockHead && !gapIsSet(view, "headlineToSupport");
  const support = renderText(ctx, out, textAt(view, "support", view.support, x, y, maxW, 2, bodyBottom - y - 36, S.support, theme, rules, false, lockSupport ? designed.boxes : null));
  if (view.cta.trim()) {
    drawCta(ctx, view, theme, out, x, support.bottom + chosenGap(view, "supportToCta", gap.afterSupport), maxW, bodyBottom);
  }
}

function paintAnnouncement(ctx, view, theme, out, bodyBottom, photoBottom) {
  const S = view.size;
  const gap = gapFor(view);
  const x = S.marginX;
  const maxW = columnWidth(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const anchored = S.key !== "landscape"
    && view.resolvedLabelGap == null
    && (gapIsSet(view, "labelToHeadline") || gapIsSet(view, "headlineToSupport") || gapIsSet(view, "supportToCta"));
  if (anchored) {
    paintAnnouncementAnchored(ctx, view, theme, out, bodyBottom);
    return;
  }
  if (S.key === "landscape" || view.resolvedLabelGap != null) {
    const gapPx = view.resolvedLabelGap == null ? gap.logo : view.resolvedLabelGap;
    const tagGap = gapIsSet(view, "labelToHeadline") ? chosenGap(view, "labelToHeadline", gap.tag) : gap.tag;
    const headGap = gapIsSet(view, "headlineToSupport") ? chosenGap(view, "headlineToSupport", gap.afterHead) : gap.afterHead;
    const ctaGap = gapIsSet(view, "supportToCta") ? chosenGap(view, "supportToCta", gap.afterSupport) : gap.afterSupport;
    let y = S.marginTop + S.logo + gapPx;
    const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
    y = tag.bottom + tagGap;
    const head = renderText(ctx, out, textSpec(view, "headline", view.headline, x, y, maxW, 3, bodyBottom - y - 70, range, theme, rules));
    y = head.bottom + headGap;
    const support = renderText(ctx, out, textSpec(view, "support", view.support, x, y, maxW, 2, bodyBottom - y - 36, S.support, theme, rules, false));
    y = support.bottom + ctaGap;
    drawCta(ctx, view, theme, out, x, y, maxW, bodyBottom);
    return;
  }
  const regionTop = Math.max(photoBottom + 8, S.marginTop + S.logo + 12);
  const regionH = Math.max(40, bodyBottom - regionTop);
  const tagH = (tagMetrics(ctx, view.series, S.tag, maxW) || { height: 0 }).height;
  const head = fitText(ctx, view.headline, { maxWidth: maxW, maxLines: 3, pref: view.headlineSize, min: range.min, weight: 800, trackingEm: rules.headlineTracking, lineHeight: rules.headlineLineHeight, maxHeight: regionH * 0.62 });
  const support = fitText(ctx, view.support, { maxWidth: maxW, maxLines: 2, pref: view.supportSize, min: S.support.min, weight: 500, trackingEm: 0, lineHeight: rules.supportLineHeight, maxHeight: regionH * 0.28 });
  const cta = fitText(ctx, view.cta, { maxWidth: Math.max(40, maxW - 36), maxLines: 1, pref: view.supportSize, min: S.support.min, weight: 500, trackingEm: 0, lineHeight: 1.2, maxHeight: S.support.max * 1.4 });
  const block = tagH + gap.tag + head.height + (view.support.trim() ? gap.afterHead : 0) + support.height + (view.cta.trim() ? gap.afterSupport : 0) + (view.cta.trim() ? cta.height : 0);
  let y = regionTop + Math.max(0, (regionH - block) / 2);
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + gap.tag;
  const drawnHead = renderText(ctx, out, { ...textSpec(view, "headline", view.headline, x, y, maxW, 3, head.height + 2, range, theme, rules), pref: head.size });
  y = drawnHead.bottom + (view.support.trim() ? gap.afterHead : 0);
  const drawnSupport = renderText(ctx, out, { ...textSpec(view, "support", view.support, x, y, maxW, 2, support.height + 2, S.support, theme, rules, false), pref: support.size });
  if (view.cta.trim()) drawCta(ctx, view, theme, out, x, drawnSupport.bottom + gap.afterSupport, maxW, bodyBottom);
}

function textSpec(view, id, text, x, y, maxW, maxLines, maxHeight, range, theme, rules, display) {
  const headline = display !== false && id !== "support" && id !== "context";
  return {
    text, x, y, maxWidth: maxW, maxLines, maxHeight: Math.max(12, maxHeight),
    pref: headline ? view.headlineSize : view.supportSize,
    min: range.min,
    weight: headline ? 800 : 500,
    trackingEm: headline ? rules.headlineTracking : 0,
    lineHeight: headline ? rules.headlineLineHeight : rules.supportLineHeight,
    color: headline ? theme.headline : theme.support,
    highlight: SETTINGS.brand.red,
    id,
    label: id === "headline" ? "Headline" : id === "support" ? "Supporting text" : "Text",
    track: headline ? "headline" : "support",
  };
}

function drawCta(ctx, view, theme, out, x, y, maxW, bodyBottom) {
  if (!view.cta.trim()) return;
  const S = view.size;
  const size = view.supportSize;
  const dashW = Math.round(size * 0.9);
  const dashH = Math.max(3, Math.round(size * 0.13));
  const gap = Math.round(size * 0.55);
  const spec = renderText(ctx, out, {
    text: view.cta,
    x: x + dashW + gap,
    y,
    maxWidth: Math.max(40, maxW - dashW - gap),
    maxLines: 1,
    maxHeight: Math.max(size, bodyBottom - y),
    pref: size,
    min: S.support.min,
    weight: 500,
    trackingEm: 0,
    lineHeight: 1.15,
    color: theme.headline,
    highlight: theme.headline,
    id: "cta",
    label: "CTA line",
    track: "support",
  });
  const mid = y + (spec.layout.height || size) / 2;
  ctx.fillStyle = SETTINGS.brand.gold;
  ctx.fillRect(x, mid - dashH / 2, dashW, dashH);
}

function paintStatistic(ctx, view, theme, out, bodyBottom) {
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const x = S.marginX;
  const right = S.w - S.marginX;
  const range = headlineRange(view.format, view.sizeKey);
  const gapPx = view.resolvedLabelGap == null ? gap.logo : view.resolvedLabelGap;
  const tagGap = gapIsSet(view, "labelToFigure") ? chosenGap(view, "labelToFigure", gap.tag) : gap.tag;
  let y = S.marginTop + S.logo + gapPx;
  const tag = drawTag(ctx, view.series, x, y, S.tag, right - x - 1, out);
  y = tag.bottom + tagGap;
  const stacked = S.key !== "landscape";
  let numSize = S.numberSize;
  const number = String(view.number || "").trim();
  const unit = String(view.unit || "").trim();
  const fitWidth = () => {
    ctx.font = `800 ${numSize}px ${SETTINGS.fonts.family}`;
    const nw = number ? measureTracked(ctx, number, numSize * rules.headlineTracking) : 0;
    const unitSize = Math.round(numSize * rules.unitRatio);
    ctx.font = `800 ${unitSize}px ${SETTINGS.fonts.family}`;
    const uw = unit ? measureTracked(ctx, unit, unitSize * rules.headlineTracking) : 0;
    const gapN = number && unit ? Math.round(numSize * 0.05) : 0;
    return { nw, uw, unitSize, gapN, width: nw + gapN + uw };
  };
  let block = fitWidth();
  const statementMax = stacked ? right - x - 1 : Math.max(180, right - x - block.width - 36);
  while (numSize > 72 && (block.width > right - x - (stacked ? 1 : 220))) {
    numSize -= 2;
    block = fitWidth();
  }
  if (numSize < S.numberSize) out.warnings.push(`The figure is below the layout size (${S.numberSize} px) so it can stay inside the margins.`);
  ctx.font = `800 ${numSize}px ${SETTINGS.fonts.family}`;
  const probe = ctx.measureText(number || "0");
  const ascent = probe.actualBoundingBoxAscent || numSize * 0.75;
  const descent = probe.actualBoundingBoxDescent || numSize * 0.08;
  const numTop = y;
  const baseline = numTop + ascent;
  if (number) {
    ctx.fillStyle = theme.headline;
    drawTracked(ctx, number, x, baseline, numSize * rules.headlineTracking);
    out.boxes.push({ id: "number", role: "text", kind: "line", text: number, weight: 800, size: numSize, trackingEm: rules.headlineTracking, x, y: numTop, w: block.nw, h: ascent + descent });
  }
  if (unit) {
    const unitX = x + block.nw + block.gapN;
    ctx.font = `800 ${block.unitSize}px ${SETTINGS.fonts.family}`;
    ctx.fillStyle = SETTINGS.brand.red;
    const up = ctx.measureText(unit);
    drawTracked(ctx, unit, unitX, baseline, block.unitSize * rules.headlineTracking);
    out.boxes.push({
      id: "unit", role: "text", kind: "line", text: unit, weight: 800, size: block.unitSize,
      trackingEm: rules.headlineTracking, x: unitX, y: baseline - (up.actualBoundingBoxAscent || block.unitSize * 0.75),
      w: block.uw, h: (up.actualBoundingBoxAscent || block.unitSize * 0.75) + (up.actualBoundingBoxDescent || 4),
    });
  }
  if (stacked) {
    const figureGap = gapIsSet(view, "figureToStatement")
      ? chosenGap(view, "figureToStatement", gap.afterHead + SETTINGS.rules.statFigureExtra)
      : gap.afterHead + SETTINGS.rules.statFigureExtra;
    const contextGap = gapIsSet(view, "statementToContext")
      ? chosenGap(view, "statementToContext", SETTINGS.rules.statContextStack)
      : SETTINGS.rules.statContextStack;
    let sy = numTop + ascent + descent + figureGap;
    const statement = renderText(ctx, out, {
      text: view.statement, x, y: sy, maxWidth: right - x - 1, maxLines: 4,
      maxHeight: bodyBottom - sy - 80, pref: view.headlineSize, min: range.min, weight: 800,
      trackingEm: rules.headlineTracking, lineHeight: rules.headlineLineHeight,
      color: theme.headline, highlight: SETTINGS.brand.red, id: "statement", label: "Statement", track: "headline",
    });
    sy = statement.bottom + contextGap;
    renderText(ctx, out, {
      text: view.context, x, y: sy, maxWidth: right - x - 1, maxLines: 3,
      maxHeight: bodyBottom - sy, pref: view.supportSize, min: S.support.min, weight: 500,
      trackingEm: 0, lineHeight: rules.supportLineHeight, color: theme.support, highlight: theme.support,
      id: "context", label: "Context", track: "support",
    });
  } else {
    const sx = x + block.width + 36;
    const sw = Math.max(120, right - sx);
    const statement = renderText(ctx, out, {
      text: view.statement, x: sx, y: numTop, maxWidth: sw, maxLines: 4,
      maxHeight: ascent, pref: view.headlineSize, min: range.min, weight: 800,
      trackingEm: rules.headlineTracking, lineHeight: rules.headlineLineHeight,
      color: theme.headline, highlight: SETTINGS.brand.red, id: "statement", label: "Statement", track: "headline",
    });
    const contextGap = gapIsSet(view, "statementToContext")
      ? chosenGap(view, "statementToContext", SETTINGS.rules.statContextRow)
      : SETTINGS.rules.statContextRow;
    renderText(ctx, out, {
      text: view.context, x: sx, y: statement.bottom + contextGap, maxWidth: sw, maxLines: 2,
      maxHeight: Math.max(20, bodyBottom - statement.bottom - contextGap), pref: view.supportSize, min: S.support.min, weight: 500,
      trackingEm: 0, lineHeight: rules.supportLineHeight, color: theme.support, highlight: theme.support,
      id: "context", label: "Context", track: "support",
    });
  }
}

function paintInsight(ctx, view, theme, out, bodyBottom) {
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const textX = S.marginX + rules.insightRule + rules.insightGap;
  const maxW = S.w - S.marginX - textX - 1;
  const gapPx = view.resolvedLabelGap == null ? gap.logo : view.resolvedLabelGap;
  const tagGap = gapIsSet(view, "labelToHeadline") ? chosenGap(view, "labelToHeadline", gap.tag) : gap.tag;
  const headGap = gapIsSet(view, "headlineToSupport") ? chosenGap(view, "headlineToSupport", gap.afterHead) : gap.afterHead;
  let y = S.marginTop + S.logo + gapPx;
  const tag = drawTag(ctx, view.series, textX, y, S.tag, maxW, out);
  y = tag.bottom + tagGap;
  const head = renderText(ctx, out, textSpec(view, "headline", view.headline, textX, y, maxW, 2, (bodyBottom - y) * 0.55, range, theme, rules));
  ctx.fillStyle = SETTINGS.brand.red;
  ctx.fillRect(S.marginX, y, rules.insightRule, Math.max(head.layout.height, range.min));
  y = head.bottom + headGap;
  renderText(ctx, out, textSpec(view, "support", view.support, textX, y, maxW, 3, bodyBottom - y, S.support, theme, rules, false));
}

function paintStoryFromLabelGap(ctx, view, theme, out, bodyBottom) {
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const x = S.marginX;
  const maxW = columnWidth(view);
  const tagGap = gapIsSet(view, "labelToHeadline") ? chosenGap(view, "labelToHeadline", gap.tag) : gap.tag;
  const headGap = gapIsSet(view, "headlineToSupport") ? chosenGap(view, "headlineToSupport", gap.afterHead) : gap.afterHead;
  let y = S.marginTop + S.logo + view.resolvedLabelGap;
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + tagGap;
  const head = renderText(ctx, out, textSpec(view, "headline", view.headline, x, y, maxW, 3, Math.max(range.min, bodyBottom - y), range, theme, rules));
  y = head.bottom + (String(view.support || "").trim() ? headGap : 0);
  renderText(ctx, out, textSpec(view, "support", view.support, x, y, maxW, 2, Math.max(12, bodyBottom - y), S.support, theme, rules, false));
}

function paintStoryAnchored(ctx, view, theme, out, bodyBottom) {
  const designed = designedLayout(view);
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const x = S.marginX;
  const maxW = columnWidth(view);
  const tagB = bounds(designed.boxes, "tag");
  let y = tagB ? tagB.y : S.marginTop + S.logo + 28;
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + chosenGap(view, "labelToHeadline", gap.tag);
  const lockHead = !gapIsSet(view, "labelToHeadline");
  const head = renderText(ctx, out, textAt(view, "headline", view.headline, x, y, maxW, 3, Math.max(range.min, bodyBottom - y), range, theme, rules, true, lockHead ? designed.boxes : null));
  const headGap = chosenGap(view, "headlineToSupport", gap.afterHead);
  const lockSupport = lockHead && !gapIsSet(view, "headlineToSupport");
  renderText(ctx, out, textAt(view, "support", view.support, x, head.bottom + headGap, maxW, 2, Math.max(12, bodyBottom - head.bottom - headGap), S.support, theme, rules, false, lockSupport ? designed.boxes : null));
}

function paintStory(ctx, view, theme, out, bodyBottom) {
  if (view.resolvedLabelGap != null) {
    paintStoryFromLabelGap(ctx, view, theme, out, bodyBottom);
    return;
  }
  if (gapIsSet(view, "labelToHeadline") || gapIsSet(view, "headlineToSupport")) {
    paintStoryAnchored(ctx, view, theme, out, bodyBottom);
    return;
  }
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const x = S.marginX;
  const maxW = columnWidth(view);
  const minY = S.marginTop + S.logo + 28;
  const avail = Math.max(80, bodyBottom - minY);
  const tagH = (tagMetrics(ctx, view.series, S.tag, maxW) || { height: 0 }).height;
  const room = Math.max(40, avail - tagH - gap.tag - gap.afterHead);
  const headFit = fitText(ctx, view.headline, {
    maxWidth: maxW, maxLines: 3, pref: view.headlineSize, min: range.min, weight: 800,
    trackingEm: rules.headlineTracking, lineHeight: rules.headlineLineHeight, maxHeight: room * 0.7,
  });
  const supFit = fitText(ctx, view.support, {
    maxWidth: maxW, maxLines: 2, pref: view.supportSize, min: S.support.min, weight: 500,
    trackingEm: 0, lineHeight: rules.supportLineHeight, maxHeight: Math.max(20, room - headFit.height),
  });
  const block = tagH + gap.tag + headFit.height + gap.afterHead + supFit.height;
  let y = Math.max(minY, bodyBottom - block);
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + gap.tag;
  const head = renderText(ctx, out, { ...textSpec(view, "headline", view.headline, x, y, maxW, 3, headFit.height + 2, range, theme, rules), pref: headFit.size });
  renderText(ctx, out, { ...textSpec(view, "support", view.support, x, head.bottom + gap.afterHead, maxW, 2, supFit.height + 2, S.support, theme, rules, false), pref: supFit.size });
}

function paintEducationalCards(ctx, view, theme, out, head, x, maxW, gap) {
  const S = view.size;
  const designed = designedLayout(view);
  const dHead = bounds(designed.boxes, "headline");
  const dCard = bounds(designed.boxes, "card-1");
  const dCard2 = bounds(designed.boxes, "card-2");
  const designedHeadGap = dHead && dCard ? dCard.y - dHead.bottom : gap.afterHead;
  const headGap = chosenGap(view, "headlineToSteps", designedHeadGap);
  const yCards = head.bottom + headGap;
  const steps = [0, 1, 2].map((i) => view.steps[i] || { title: "", line: "", icon: "clipboard" });
  const stacked = S.key !== "landscape";
  if (!stacked) {
    const gutter = gap.cardGap;
    const cardW = (maxW - gutter * 2) / 3;
    const cardH = dCard ? dCard.h : 156;
    steps.forEach((step, i) => {
      const cx = x + i * (cardW + gutter);
      drawCard(ctx, view, theme, out, step, i + 1, cx, yCards, cardW, cardH);
      if (i < 2) drawChevron(ctx, cx + cardW + gutter / 2, yCards + cardH / 2, 18);
    });
    return;
  }
  const designedBetween = dCard && dCard2 ? dCard2.y - dCard.bottom : gap.cardGap;
  const between = gapIsSet(view, "stepSpacing") ? chosenGap(view, "stepSpacing", designedBetween) : designedBetween;
  const cardH = dCard ? dCard.h : 132;
  steps.forEach((step, i) => {
    drawCard(ctx, view, theme, out, step, i + 1, x, yCards + i * (cardH + between), maxW, cardH);
  });
}

function paintEducational(ctx, view, theme, out, bodyBottom) {
  const S = view.size;
  const gap = gapFor(view);
  const rules = SETTINGS.rules;
  const range = headlineRange(view.format, view.sizeKey);
  const x = S.marginX;
  const maxW = S.w - S.marginX * 2 - 1;
  const gapPx = view.resolvedLabelGap == null ? gap.logo : view.resolvedLabelGap;
  const tagGap = gapIsSet(view, "labelToHeadline") ? chosenGap(view, "labelToHeadline", gap.tag) : gap.tag;
  let y = S.marginTop + S.logo + gapPx;
  const tag = drawTag(ctx, view.series, x, y, S.tag, maxW, out);
  y = tag.bottom + tagGap;
  const reserve = S.key === "landscape" ? 176 : S.key === "square" ? 460 : 560;
  const head = renderText(ctx, out, textSpec(view, "headline", view.headline, x, y, maxW, 2, Math.max(range.min, bodyBottom - y - reserve), range, theme, rules));
  const customCards = gapIsSet(view, "labelToHeadline") || gapIsSet(view, "headlineToSteps") || gapIsSet(view, "stepSpacing");
  if (customCards) {
    paintEducationalCards(ctx, view, theme, out, head, x, maxW, gap);
    return;
  }
  y = head.bottom + gap.afterHead;
  const zone = Math.max(80, bodyBottom - y);
  const stacked = S.key !== "landscape";
  const steps = [0, 1, 2].map((i) => view.steps[i] || { title: "", line: "", icon: "clipboard" });
  if (!stacked) {
    const gutter = gap.cardGap;
    const cardW = (maxW - gutter * 2) / 3;
    const room = Math.max(0, bodyBottom - y);
    const cardH = Math.min(room, 156);
    steps.forEach((step, i) => {
      const cx = x + i * (cardW + gutter);
      drawCard(ctx, view, theme, out, step, i + 1, cx, y, cardW, cardH);
      if (i < 2) drawChevron(ctx, cx + cardW + gutter / 2, y + cardH / 2, 18);
    });
    return;
  }
  const natural = 132;
  const minGap = gap.cardGap;
  const extra = Math.max(0, zone - (natural * 3 + minGap * 2));
  let between = minGap + Math.min(28, extra / 2);
  let cardH = Math.min(190, natural + Math.min(24, extra / 6));
  const used = cardH * 3 + between * 2;
  if (used > zone && zone > 0) {
    between = Math.min(between, Math.max(8, (zone - 144) / 2));
    cardH = Math.max(48, (zone - between * 2) / 3);
  }
  steps.forEach((step, i) => {
    drawCard(ctx, view, theme, out, step, i + 1, x, y + i * (cardH + between), maxW, cardH);
  });
}

function drawCard(ctx, view, theme, out, step, index, x, y, w, h) {
  const S = view.size;
  const b = SETTINGS.brand;
  ctx.save();
  roundRect(ctx, x, y, w, h, SETTINGS.rules.cardRadius);
  ctx.fillStyle = b.white;
  ctx.fill();
  ctx.clip();
  ctx.fillStyle = b.navy;
  ctx.fillRect(x, y, w, SETTINGS.rules.cardTop);
  ctx.restore();
  roundRect(ctx, x, y, w, h, SETTINGS.rules.cardRadius);
  ctx.strokeStyle = b.line;
  ctx.lineWidth = 1;
  ctx.stroke();
  out.boxes.push({ id: "card-" + index, role: "text", x, y, w, h });
  const padX = S.key === "landscape" ? 16 : 20;
  const padY = S.key === "landscape" ? 18 : 20;
  const circle = S.key === "landscape" ? 30 : 34;
  const cx = x + padX;
  const cy = y + padY + 2;
  ctx.beginPath();
  ctx.fillStyle = b.red;
  ctx.arc(cx + circle / 2, cy + circle / 2, circle / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `800 ${Math.round(circle * 0.48)}px ${SETTINGS.fonts.family}`;
  ctx.fillStyle = b.white;
  const num = String(index);
  const nw = measureTracked(ctx, num, 0);
  const np = ctx.measureText(num);
  const nAscent = np.actualBoundingBoxAscent || circle * 0.36;
  const nDescent = np.actualBoundingBoxDescent || circle * 0.08;
  const nBaseline = cy + circle / 2 + (nAscent - nDescent) / 2;
  drawTracked(ctx, num, cx + (circle - nw) / 2, nBaseline, 0);
  out.boxes.push({ id: "step-num-" + index, role: "text", kind: "line", text: num, weight: 800, size: Math.round(circle * 0.48), trackingEm: 0, x: cx + (circle - nw) / 2, y: nBaseline - nAscent, w: nw, h: nAscent + nDescent });
  const icon = S.key === "landscape" ? 26 : 30;
  drawIcon(ctx, step.icon, x + w - padX - icon, cy, icon, b.navy);
  const titleX = cx + circle + 10;
  const titleW = Math.max(40, x + w - padX - icon - 10 - titleX);
  const title = renderText(ctx, out, {
    text: step.title, x: titleX, y: cy, maxWidth: titleW, maxLines: 2,
    maxHeight: circle + 8, pref: Math.min(view.supportSize, S.key === "landscape" ? 22 : 26),
    min: S.key === "landscape" ? 16 : 18, weight: 800, trackingEm: -0.02, lineHeight: 1.12,
    color: b.navy, highlight: b.navy, id: "step-title-" + index, label: "Step title", track: "support",
  });
  const lineY = gapIsSet(view, "stepLineSpacing")
    ? Math.min(
        Math.max(cy + circle, title.bottom + chosenGap(view, "stepLineSpacing", SETTINGS.rules.stepLineGap)),
        Math.max(cy + circle, y + h - 14 - 16),
      )
    : Math.max(cy + circle + SETTINGS.rules.stepCircleClearance, title.bottom + SETTINGS.rules.stepLineGap);
  renderText(ctx, out, {
    text: step.line, x: titleX, y: lineY, maxWidth: x + w - padX - titleX,
    maxLines: 3, maxHeight: Math.max(16, y + h - 14 - lineY),
    pref: view.supportSize, min: S.support.min, weight: 500, trackingEm: 0,
    lineHeight: 1.25, color: b.slate, highlight: b.slate,
    id: "step-line-" + index, label: "Step line", track: "support",
  });
}

function paintFrame(canvas, view) {
  const S = view.size;
  const theme = themeFor(view);
  const out = { boxes: [], warnings: [], drawnHeadline: view.headlineSize, drawnSupport: view.supportSize };
  canvas.width = S.w;
  canvas.height = S.h;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, S.w, S.h);
  let photoBottom = 0;
  if (view.format === "announcement") photoBottom = paintAnnouncementPhoto(ctx, view);
  if (view.format === "story") paintStoryPhoto(ctx, view);
  if (view.format === "statistic") paintWatermark(ctx, view, theme);
  if (view.format === "insight") paintTriangle(ctx, view, theme);
  drawLogo(ctx, view);
  const footer = footerPlan(ctx, view, theme, out);
  const spacingLimit = view.labelGap == null || !Number.isFinite(Number(view.labelGap))
    ? SETTINGS.logoLabelSpacing.max
    : designedSpacingLimit(view);
  const placement = resolveLabelPlacement(view, spacingLimit);
  const drawView = { ...view, resolvedLabelGap: placement.gap };
  if (drawView.format === "announcement") paintAnnouncement(ctx, drawView, theme, out, footer.bodyBottom, photoBottom);
  if (drawView.format === "statistic") paintStatistic(ctx, drawView, theme, out, footer.bodyBottom);
  if (drawView.format === "insight") paintInsight(ctx, drawView, theme, out, footer.bodyBottom);
  if (drawView.format === "story") paintStory(ctx, drawView, theme, out, footer.bodyBottom);
  if (drawView.format === "educational") paintEducational(ctx, drawView, theme, out, footer.bodyBottom);
  if (footer.sourcePlan && gapIsSet(drawView, "contextToSource")) {
    placeContextSource(ctx, drawView, theme, out, footer.sourcePlan);
  }
  footer.draw();
  drawRail(ctx, view);
  const range = headlineRange(view.format, view.sizeKey);
  const tag = out.boxes.find((box) => box.id === "tag");
  const logoBottom = S.marginTop + S.logo;
  const logoLabelGap = tag ? tag.y - logoBottom : null;
  const labelGapLimit = placement.gap == null
    ? measuredLabelLimit(out.boxes, logoBottom, logoLabelGap, footer.bodyBottom)
    : placement.limit;
  const measuredGaps = measureObjectGaps(out.boxes);
  const gapLimits = measureGapLimits({
    height: S.h,
    rail: S.rail,
    marginBottom: S.marginBottom,
    boxes: out.boxes,
  }, measuredGaps);
  return {
    width: S.w,
    height: S.h,
    marginX: S.marginX,
    marginTop: S.marginTop,
    marginBottom: S.marginBottom,
    rail: S.rail,
    boxes: out.boxes,
    warnings: [...new Set(out.warnings)],
    headlineSize: view.headlineSize,
    drawnHeadline: out.drawnHeadline,
    minHeadline: range.min,
    supportSize: view.supportSize,
    drawnSupport: out.drawnSupport,
    minSupport: S.support.min,
    signatureBottom: S.h - S.rail - (S.marginBottom - SETTINGS.rules.signatureInset),
    logoBottom,
    logoLabelGap,
    labelGapLimit,
    measuredGaps,
    gapLimits,
  };
}

function designedSpacingLimit(view) {
  const canvas = document.createElement("canvas");
  const layout = paintFrame(canvas, { ...view, labelGap: null });
  return layout.labelGapLimit;
}

function paint(canvas, view) {
  const requested = view.labelGap;
  const requestedGaps = {};
  OBJECT_GAP_KEYS.forEach((key) => {
    requestedGaps[key] = view.objectGaps ? view.objectGaps[key] : null;
  });
  let layout = paintFrame(canvas, view);
  let labelGap = view.labelGap;
  let logoLimit = null;
  if (requested != null && Number.isFinite(Number(requested))) {
    let guard = 0;
    while (textOverflowPx(layout) > 0.75 && guard < 8) {
      guard += 1;
      const gap = layout.logoLabelGap;
      const next = Math.max(SETTINGS.logoLabelSpacing.min, Math.floor(gap - textOverflowPx(layout) - 1));
      if (!Number.isFinite(gap) || next >= gap - 0.5) break;
      labelGap = next;
      layout = paintFrame(canvas, { ...view, labelGap: next });
      layout.labelGapLimit = Math.min(layout.labelGapLimit, next);
      logoLimit = layout.labelGapLimit;
    }
  }
  const anyObject = OBJECT_GAP_KEYS.some((key) => requestedGaps[key] != null);
  if (anyObject) {
    let workingGaps = { ...requestedGaps };
    const skip = new Set();
    let guard = 0;
    while (textOverflowPx(layout) > 0.75 && guard < 16) {
      guard += 1;
      const working = { ...view, labelGap, objectGaps: workingGaps };
      const key = lowestSetGap(working, layout, skip);
      if (!key) break;
      const measured = layout.measuredGaps[key];
      const before = textOverflowPx(layout);
      const next = Math.max(SETTINGS.objectGaps.min, Math.floor(measured - before - 1));
      if (!Number.isFinite(measured) || next >= measured - 0.5) {
        skip.add(key);
        continue;
      }
      const previous = workingGaps[key];
      workingGaps = { ...workingGaps, [key]: next };
      const nextLayout = paintFrame(canvas, { ...view, labelGap, objectGaps: workingGaps });
      if (textOverflowPx(nextLayout) >= before - 0.5) {
        skip.add(key);
        workingGaps = { ...workingGaps, [key]: previous };
        layout = paintFrame(canvas, { ...view, labelGap, objectGaps: workingGaps });
        continue;
      }
      layout = nextLayout;
    }
  }
  if (logoLimit != null) layout.labelGapLimit = Math.min(layout.labelGapLimit, logoLimit);
  if (requested != null && Number.isFinite(Number(requested)) && Number.isFinite(layout.logoLabelGap) && requested - layout.logoLabelGap >= 2) {
    if (!layout.warnings.includes(SPACING_CLAMP_WARNING)) layout.warnings.push(SPACING_CLAMP_WARNING);
  }
  OBJECT_GAP_KEYS.forEach((key) => {
    const req = requestedGaps[key];
    const got = layout.measuredGaps && layout.measuredGaps[key];
    if (req != null && Number.isFinite(got) && req - got >= 2) {
      if (!layout.warnings.includes(GAP_CLAMP_WARNING)) layout.warnings.push(GAP_CLAMP_WARNING);
    }
  });
  return layout;
}

function photoForState() {
  if (!state.useDefaultPhoto && state.photoImg) return state.photoImg;
  if (state.format === "story") return assets.hangar;
  if (state.format === "announcement") return assets.engine;
  return null;
}

function buildView(sizeKey) {
  const key = sizeKey || state.size;
  const range = headlineRange(state.format, key);
  const support = SETTINGS.sizes[key].support;
  return {
    format: state.format,
    sizeKey: key,
    size: SETTINGS.sizes[key],
    series: state.series,
    headline: state.headline,
    support: state.support,
    cta: state.cta,
    headlineSize: clamp(state.headlineSize, range.min, range.max),
    supportSize: clamp(state.supportSize, support.min, support.max),
    background: state.background,
    number: state.number,
    unit: state.unit,
    statement: state.statement,
    context: state.context,
    source: state.source,
    exampleData: state.exampleData,
    steps: state.steps.map((step) => ({ ...step })),
    photoZoom: state.photoZoom,
    photoX: state.photoX,
    photoY: state.photoY,
    fade: state.fade,
    photo: photoForState(),
    desaturate: state.useDefaultPhoto && state.format === "announcement" ? SETTINGS.samples.announcement.desaturate : 0,
    labelGap: state.logoLabelSpacing[key],
    objectGaps: objectGapsForSize(key),
  };
}

function designedLabelGap(sizeKey) {
  const key = sizeKey || state.size;
  const fixed = state.format === "statistic"
    || state.format === "insight"
    || state.format === "educational"
    || (state.format === "announcement" && key === "landscape");
  const view = buildView(key);
  if (fixed) return gapFor(view).logo;
  view.labelGap = null;
  const clean = {};
  OBJECT_GAP_KEYS.forEach((gapKey) => { clean[gapKey] = null; });
  view.objectGaps = clean;
  const canvas = document.createElement("canvas");
  return paintFrame(canvas, view).logoLabelGap;
}

function renderNow() {
  try {
    lastLayout = paint($("preview"), buildView(state.size));
  } catch (err) {
    lastLayout = { boxes: [], warnings: ["Render error: " + err.message], width: 0, height: 0 };
  }
  const storedGap = state.logoLabelSpacing && state.logoLabelSpacing[state.size];
  if (storedGap != null && lastLayout && Number.isFinite(lastLayout.logoLabelGap)) {
    const applied = clamp(Math.round(lastLayout.logoLabelGap), SETTINGS.logoLabelSpacing.min, SETTINGS.logoLabelSpacing.max);
    if (Math.abs(storedGap - applied) >= 2) state.logoLabelSpacing[state.size] = applied;
  }
  if (state.objectGaps && lastLayout && lastLayout.measuredGaps) {
    OBJECT_GAP_KEYS.forEach((key) => {
      const stored = state.objectGaps[key][state.size];
      const applied = lastLayout.measuredGaps[key];
      if (stored == null || !Number.isFinite(applied)) return;
      const rounded = clamp(Math.round(applied), SETTINGS.objectGaps.min, SETTINGS.objectGaps.max);
      if (Math.abs(stored - rounded) >= 2) state.objectGaps[key][state.size] = rounded;
    });
  }
  fitPreview();
  showWarnings(lastLayout.warnings || []);
  const S = SETTINGS.sizes[state.size];
  $("specLine").textContent = `${S.w} × ${S.h} · ${SETTINGS.formats[state.format].label}`;
  $("preview").setAttribute("aria-label", `${SETTINGS.formats[state.format].label} preview, ${S.w} by ${S.h}`);
  const usesPhoto = state.format === "announcement" || state.format === "story";
  $("photoNote").hidden = !(usesPhoto && state.useDefaultPhoto);
  $("photoNote").textContent = SETTINGS.ui.photoNote;
  const status = $("status");
  if (lastLayout.warnings && lastLayout.warnings.length) {
    status.textContent = lastLayout.warnings[0];
    status.classList.add("warn");
  } else {
    status.textContent = `Ready · ${lastLayout.drawnHeadline} px headline · ${lastLayout.drawnSupport} px supporting`;
    status.classList.remove("warn");
  }
  updateOutputs();
}

function showWarnings(list) {
  const host = $("warnings");
  host.replaceChildren();
  list.forEach((text) => {
    const p = document.createElement("p");
    p.className = "warning";
    p.textContent = text;
    host.appendChild(p);
  });
}

function fitPreview() {
  const canvas = $("preview");
  const stage = $("stage");
  const maxW = stage.clientWidth || 800;
  const maxH = Math.max(280, window.innerHeight - 150);
  const scale = Math.min(maxW / canvas.width, maxH / canvas.height, 1);
  canvas.style.width = Math.round(canvas.width * scale) + "px";
  canvas.style.height = Math.round(canvas.height * scale) + "px";
}

function updateOutputs() {
  $("headlineSizeOut").textContent = Math.round(state.headlineSize) + " px";
  $("supportSizeOut").textContent = Math.round(state.supportSize) + " px";
  $("photoZoomOut").textContent = Number(state.photoZoom).toFixed(2) + "×";
  $("photoXOut").textContent = Math.round(state.photoX);
  $("photoYOut").textContent = Math.round(state.photoY);
  $("fadeOut").textContent = Math.round(state.fade);
  const spacing = $("logoLabelSpacing");
  const spacingOut = $("logoLabelSpacingOut");
  if (!spacing || !spacingOut || !state.logoLabelSpacing) return;
  const limits = SETTINGS.logoLabelSpacing;
  const measured = lastLayout && Number.isFinite(lastLayout.logoLabelGap) ? lastLayout.logoLabelGap : null;
  const stored = state.logoLabelSpacing[state.size];
  const shown = stored == null
    ? (measured == null ? limits.min : Math.round(measured))
    : (measured == null ? stored : Math.round(measured));
  const limit = lastLayout && Number.isFinite(lastLayout.labelGapLimit) ? lastLayout.labelGapLimit : limits.max;
  const sliderMax = Math.max(limits.min, limit, shown);
  spacing.min = String(limits.min);
  spacing.max = String(sliderMax);
  spacingOut.textContent = shown + " px";
  spacing.value = String(shown);
  updateGapControls();
}

function updateGapControls() {
  if (!state.objectGaps) return;
  SETTINGS.gapCatalog.forEach((item) => {
    const wrap = document.querySelector(`[data-gap-wrap="${item.key}"]`);
    const input = $("gap-" + item.key);
    const output = $("gap-" + item.key + "-out");
    if (!wrap || !input || !output) return;
    const show = item.formats.includes(state.format) && (!item.sizes || item.sizes.includes(state.size));
    wrap.hidden = !show;
    if (!show) return;
    const limits = SETTINGS.objectGaps;
    const measured = lastLayout && lastLayout.measuredGaps ? lastLayout.measuredGaps[item.key] : null;
    const stored = state.objectGaps[item.key][state.size];
    const shown = stored == null
      ? (measured == null || !Number.isFinite(measured) ? limits.min : Math.round(measured))
      : (measured == null || !Number.isFinite(measured) ? stored : Math.round(measured));
    const limit = lastLayout && lastLayout.gapLimits && Number.isFinite(lastLayout.gapLimits[item.key])
      ? lastLayout.gapLimits[item.key]
      : limits.max;
    const sliderMax = Math.max(limits.min, limit, shown);
    input.min = String(limits.min);
    input.max = String(sliderMax);
    output.textContent = shown + " px";
    input.value = String(shown);
  });
}

function designedObjectGap(sizeKey, key) {
  const view = buildView(sizeKey);
  view.objectGaps = { ...view.objectGaps, [key]: null };
  const canvas = document.createElement("canvas");
  const measured = paintFrame(canvas, view).measuredGaps[key];
  return Number.isFinite(measured) ? measured : null;
}

function updateCaptionCount() {
  const n = $("caption").value.length;
  $("captionCount").textContent = `${n.toLocaleString("en-US")} / ${SETTINGS.ui.captionMax.toLocaleString("en-US")}`;
  $("captionCount").style.color = n >= 2800 ? "#C4161C" : "";
}

function applyDefaultCrop() {
  const crop = (SETTINGS.samples[state.format].crops || {})[state.size] || { zoom: 1, x: 50, y: 50 };
  state.photoZoom = crop.zoom;
  state.photoX = crop.x;
  state.photoY = crop.y;
}

function loadSample(format, sizeKey) {
  const sample = SETTINGS.samples[format];
  state.format = format;
  state.size = sizeKey || state.size;
  state.seriesPreset = sample.seriesId;
  state.series = SETTINGS.series.find((item) => item.id === sample.seriesId).label;
  state.headline = sample.headline || "";
  state.support = sample.support || "";
  state.cta = sample.cta || "";
  state.number = sample.number || "XX";
  state.unit = sample.unit || "%";
  state.statement = sample.statement || "";
  state.context = sample.context || "";
  state.source = sample.source || "";
  state.exampleData = Boolean(sample.exampleData);
  state.background = sample.background;
  state.fade = sample.fade;
  state.steps = (sample.steps || blankState().steps).map((step) => ({ ...step }));
  state.useDefaultPhoto = true;
  state.photoData = null;
  state.photoImg = null;
  if ($("photoFile")) $("photoFile").value = "";
  state.headlineSize = headlineRange(format, state.size).def;
  state.supportSize = SETTINGS.sizes[state.size].support.def;
  state.logoLabelSpacing = freshLabelSpacing();
  state.objectGaps = freshObjectGaps();
  applyDefaultCrop();
  syncUI();
  renderNow();
}

function syncUI() {
  document.querySelectorAll("[data-format]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.format === state.format));
  });
  document.querySelectorAll("[data-size]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.size === state.size));
  });
  $("seriesPreset").value = state.seriesPreset;
  $("series").value = state.series;
  $("headline").value = state.headline;
  $("support").value = state.support;
  $("cta").value = state.cta;
  $("number").value = state.number;
  $("unit").value = state.unit;
  $("statement").value = state.statement;
  $("context").value = state.context;
  $("source").value = state.source;
  $("exampleData").checked = state.exampleData;
  $("background").value = state.background || "paper";
  $("caption").value = state.caption;
  const range = headlineRange(state.format, state.size);
  const support = SETTINGS.sizes[state.size].support;
  $("headlineSize").min = range.min;
  $("headlineSize").max = range.max;
  $("headlineSize").value = state.headlineSize;
  $("supportSize").min = support.min;
  $("supportSize").max = support.max;
  $("supportSize").value = state.supportSize;
  $("photoZoom").value = Math.round(state.photoZoom * 100);
  $("photoX").value = state.photoX;
  $("photoY").value = state.photoY;
  $("fade").value = state.fade;
  for (let i = 0; i < 3; i += 1) {
    const step = state.steps[i];
    $(`step${i + 1}Title`).value = step.title;
    $(`step${i + 1}Line`).value = step.line;
    $(`step${i + 1}Icon`).value = step.icon;
  }
  const spec = SETTINGS.formats[state.format];
  $("headlineField").hidden = !spec.headline;
  $("supportField").hidden = !spec.support;
  $("ctaField").hidden = !spec.cta;
  $("statisticField").hidden = !spec.statistic;
  $("stepsField").hidden = !spec.steps;
  $("photoField").hidden = !spec.photo;
  $("backgroundField").hidden = !spec.backgrounds;
  $("headlineSizeLabel").textContent = spec.headlineSizeLabel || "Headline size";
  $("supportSizeLabel").textContent = spec.supportSizeLabel || "Supporting size";
  updateOutputs();
  updateCaptionCount();
  refreshLibrary();
}

function readForm(event) {
  const target = event && event.target;
  if (target && target.id === "seriesPreset") {
    state.seriesPreset = target.value;
    if (state.seriesPreset !== "custom") {
      state.series = SETTINGS.series.find((item) => item.id === state.seriesPreset).label;
      $("series").value = state.series;
    }
  } else if (target && target.id === "series") {
    state.series = target.value;
    const match = SETTINGS.series.find((item) => item.label.toLowerCase() === state.series.trim().toLowerCase());
    state.seriesPreset = match ? match.id : "custom";
    $("seriesPreset").value = state.seriesPreset;
  } else {
    state.series = $("series").value;
  }
  state.headline = $("headline").value;
  state.support = $("support").value;
  state.cta = $("cta").value;
  state.number = $("number").value;
  state.unit = $("unit").value;
  state.statement = $("statement").value;
  state.context = $("context").value;
  state.source = $("source").value;
  state.exampleData = $("exampleData").checked;
  state.background = $("background").value;
  state.caption = $("caption").value;
  const range = headlineRange(state.format, state.size);
  const support = SETTINGS.sizes[state.size].support;
  state.headlineSize = clamp(Number($("headlineSize").value), range.min, range.max);
  state.supportSize = clamp(Number($("supportSize").value), support.min, support.max);
  state.photoZoom = clamp(Number($("photoZoom").value) / 100, 1, 2.4);
  state.photoX = clamp(Number($("photoX").value), 0, 100);
  state.photoY = clamp(Number($("photoY").value), 0, 100);
  state.fade = clamp(Number($("fade").value), 0, 100);
  if (target && target.id === "logoLabelSpacing") {
    const raw = String(target.value).trim();
    if (raw !== "") {
      const n = Math.round(Number(raw));
      const limits = SETTINGS.logoLabelSpacing;
      if (Number.isFinite(n)) {
        const designed = designedLabelGap(state.size);
        const clamped = clamp(n, limits.min, limits.max);
        state.logoLabelSpacing[state.size] = designed != null && Math.abs(clamped - designed) <= 1
          ? null
          : clamped;
      }
    }
  }
  if (target && target.dataset.gap && state.objectGaps[target.dataset.gap]) {
    const key = target.dataset.gap;
    const raw = String(target.value).trim();
    if (raw !== "") {
      const n = Math.round(Number(raw));
      if (Number.isFinite(n)) {
        const limits = SETTINGS.objectGaps;
        const designed = designedObjectGap(state.size, key);
        const clamped = clamp(n, limits.min, limits.max);
        state.objectGaps[key][state.size] = designed != null && Math.abs(clamped - designed) <= 1
          ? null
          : clamped;
      }
    }
  }
  state.steps = [1, 2, 3].map((i) => ({
    title: $(`step${i}Title`).value,
    line: $(`step${i}Line`).value,
    icon: $(`step${i}Icon`).value,
  }));
}

function onSize(size) {
  const oldRange = headlineRange(state.format, state.size);
  const oldSupport = SETTINGS.sizes[state.size].support;
  const headWasDefault = state.headlineSize === oldRange.def;
  const supportWasDefault = state.supportSize === oldSupport.def;
  state.size = size;
  const next = headlineRange(state.format, size);
  const nextSupport = SETTINGS.sizes[size].support;
  state.headlineSize = headWasDefault ? next.def : clamp(state.headlineSize, next.min, next.max);
  state.supportSize = supportWasDefault ? nextSupport.def : clamp(state.supportSize, nextSupport.min, nextSupport.max);
  if (state.useDefaultPhoto) applyDefaultCrop();
  syncUI();
  renderNow();
}

function snapshot() {
  return {
    version: 1,
    format: state.format,
    size: state.size,
    seriesPreset: state.seriesPreset,
    series: state.series,
    headline: state.headline,
    support: state.support,
    cta: state.cta,
    headlineSize: state.headlineSize,
    supportSize: state.supportSize,
    background: state.background,
    number: state.number,
    unit: state.unit,
    statement: state.statement,
    context: state.context,
    source: state.source,
    exampleData: state.exampleData,
    steps: state.steps.map((step) => ({ ...step })),
    photoZoom: state.photoZoom,
    photoX: state.photoX,
    photoY: state.photoY,
    fade: state.fade,
    useDefaultPhoto: state.useDefaultPhoto,
    photoData: state.useDefaultPhoto ? null : state.photoData,
    caption: state.caption,
    logoLabelSpacing: {
      landscape: state.logoLabelSpacing.landscape,
      square: state.logoLabelSpacing.square,
      portrait: state.logoLabelSpacing.portrait,
    },
    objectGaps: normalizeObjectGaps(state.objectGaps),
  };
}

function loadLibrary() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS.storage.key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function storeLibrary(list) {
  localStorage.setItem(SETTINGS.storage.key, JSON.stringify(list));
  refreshLibrary();
}

function refreshLibrary() {
  const select = $("savedDesigns");
  if (!select) return;
  const current = select.value;
  const list = loadLibrary();
  select.replaceChildren();
  if (!list.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No saved designs";
    select.appendChild(option);
    return;
  }
  list.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
  if (list.some((item) => item.id === current)) select.value = current;
}

async function compressImage(dataUrl, maxEdge, quality) {
  const img = await loadImage(dataUrl);
  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

async function photoForStorage(dataUrl) {
  if (!dataUrl) return { data: null, dropped: false };
  if (dataUrl.length <= SETTINGS.storage.photoMaxChars) return { data: dataUrl, dropped: false };
  let next = await compressImage(dataUrl, 1600, 0.72);
  if (next.length <= SETTINGS.storage.photoMaxChars) return { data: next, dropped: false };
  next = await compressImage(dataUrl, 1200, 0.6);
  if (next.length <= SETTINGS.storage.photoMaxChars) return { data: next, dropped: false };
  return { data: null, dropped: true };
}

async function saveDesign(name, design) {
  const trimmed = name.trim();
  if (!trimmed) {
    $("libraryStatus").textContent = "Name the design before saving.";
    return null;
  }
  const copy = design || snapshot();
  const photo = await photoForStorage(copy.photoData);
  copy.photoData = photo.data;
  if (photo.dropped) {
    copy.useDefaultPhoto = true;
    $("libraryStatus").textContent = "The photo is too large to store in this browser after compression. The design was saved without it.";
  } else {
    $("libraryStatus").textContent = "Saved.";
  }
  const list = loadLibrary();
  const existing = list.find((item) => item.name === trimmed);
  const record = existing || { id: crypto.randomUUID(), name: trimmed };
  record.name = trimmed;
  record.savedAt = new Date().toISOString();
  record.design = copy;
  if (!existing) list.push(record);
  storeLibrary(list);
  $("savedDesigns").value = record.id;
  return record;
}

async function applyDesign(design) {
  const next = blankState();
  Object.assign(next, design);
  next.logoLabelSpacing = normalizeLabelSpacing(design && design.logoLabelSpacing);
  next.objectGaps = normalizeObjectGaps(design && design.objectGaps);
  next.steps = (design.steps || next.steps).map((step) => ({ ...step }));
  next.photoImg = null;
  if (design.photoData && !design.useDefaultPhoto) {
    next.photoImg = await loadImage(design.photoData);
    next.useDefaultPhoto = false;
  } else {
    next.useDefaultPhoto = true;
    next.photoData = null;
  }
  state = next;
  syncUI();
  renderNow();
}

function stamp(date) {
  const d = date || new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

function pngName(format, sizeKey, date) {
  const S = SETTINGS.sizes[sizeKey];
  return `aogalerts_${format}_${S.w}x${S.h}_${stamp(date)}.png`;
}

function canvasBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function exportPNG(sizeKey) {
  const key = sizeKey || state.size;
  const canvas = key === state.size ? $("preview") : document.createElement("canvas");
  if (key !== state.size) paint(canvas, buildView(key));
  else renderNow();
  const blob = await canvasBlob(key === state.size ? $("preview") : canvas);
  return { blob, name: pngName(state.format, key), canvas: key === state.size ? $("preview") : canvas };
}

function exportDesignsObject() {
  return {
    kind: "aogalerts-linkedin-designs",
    version: 1,
    exportedAt: new Date().toISOString(),
    designs: loadLibrary(),
  };
}

function importDesignsText(text) {
  const parsed = JSON.parse(text);
  const incoming = Array.isArray(parsed) ? parsed : parsed.designs;
  if (!Array.isArray(incoming)) throw new Error("That file has no designs.");
  const list = loadLibrary();
  incoming.forEach((item) => {
    if (!item || !item.design) return;
    const record = {
      id: item.id || crypto.randomUUID(),
      name: item.name || "Imported design",
      savedAt: item.savedAt || new Date().toISOString(),
      design: item.design,
    };
    const index = list.findIndex((saved) => saved.id === record.id);
    if (index >= 0) list[index] = record;
    else list.push(record);
  });
  storeLibrary(list);
  $("libraryStatus").textContent = `Imported ${incoming.length} design${incoming.length === 1 ? "" : "s"}.`;
}

function buildSteps() {
  for (let i = 1; i <= 3; i += 1) {
    const host = $("step-" + i);
    host.innerHTML = `<strong>Step ${i}</strong>
      <label for="step${i}Title">Title</label>
      <input id="step${i}Title" autocomplete="off">
      <label for="step${i}Line">One line</label>
      <input id="step${i}Line" autocomplete="off">
      <label for="step${i}Icon">Icon</label>
      <select id="step${i}Icon"></select>`;
    const select = $(`step${i}Icon`);
    SETTINGS.icons.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    });
  }
}

function bindUI() {
  document.querySelectorAll("[data-format]").forEach((btn) => {
    btn.addEventListener("click", () => loadSample(btn.dataset.format, state.size));
  });
  document.querySelectorAll("[data-size]").forEach((btn) => {
    btn.addEventListener("click", () => onSize(btn.dataset.size));
  });
  document.querySelector(".panel").addEventListener("input", (event) => {
    if (event.target.id === "photoFile" || event.target.id === "importJson" || event.target.id === "designName") return;
    if (event.target.id === "caption") {
      state.caption = event.target.value;
      updateCaptionCount();
      return;
    }
    readForm(event);
    renderNow();
  });
  $("restoreSample").addEventListener("click", () => loadSample(state.format, state.size));
  $("resetSpacing").addEventListener("click", resetSpacing);
  $("photoFile").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    state.photoData = await compressImage(data, 2000, 0.86);
    state.photoImg = await loadImage(state.photoData);
    state.useDefaultPhoto = false;
    renderNow();
  });
  $("removePhoto").addEventListener("click", () => {
    state.useDefaultPhoto = true;
    state.photoData = null;
    state.photoImg = null;
    $("photoFile").value = "";
    applyDefaultCrop();
    syncUI();
    renderNow();
  });
  $("download").addEventListener("click", async () => {
    const file = await exportPNG(state.size);
    downloadBlob(file.blob, file.name);
  });
  $("downloadAll").addEventListener("click", async () => {
    for (const key of ["landscape", "square", "portrait"]) {
      const file = await exportPNG(key);
      downloadBlob(file.blob, file.name);
      await new Promise((resolve) => setTimeout(resolve, 180));
    }
    renderNow();
  });
  $("saveDesign").addEventListener("click", () => saveDesign($("designName").value));
  $("loadDesign").addEventListener("click", async () => {
    const record = loadLibrary().find((item) => item.id === $("savedDesigns").value);
    if (!record) return;
    $("designName").value = record.name;
    await applyDesign(record.design);
    $("libraryStatus").textContent = "Loaded.";
  });
  $("deleteDesign").addEventListener("click", () => {
    const id = $("savedDesigns").value;
    storeLibrary(loadLibrary().filter((item) => item.id !== id));
    $("libraryStatus").textContent = "Deleted.";
  });
  $("duplicateDesign").addEventListener("click", async () => {
    const base = ($("designName").value || state.series || "Design").trim();
    let name = base + " copy";
    const names = new Set(loadLibrary().map((item) => item.name));
    let n = 2;
    while (names.has(name)) {
      name = `${base} copy ${n}`;
      n += 1;
    }
    $("designName").value = name;
    await saveDesign(name);
  });
  $("exportJson").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(exportDesignsObject(), null, 2)], { type: "application/json" });
    downloadBlob(blob, "aogalerts-designs.json");
  });
  $("importJson").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      importDesignsText(await file.text());
    } catch (err) {
      $("libraryStatus").textContent = err.message || "Could not import that file.";
    }
    event.target.value = "";
  });
  $("copyCaption").addEventListener("click", async () => {
    const text = $("caption").value;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      $("caption").select();
      document.execCommand("copy");
    }
    $("copyCaption").textContent = "Copied";
    setTimeout(() => { $("copyCaption").textContent = "Copy"; }, 1400);
  });
  window.addEventListener("resize", fitPreview);
}

function resetSpacing() {
  state.logoLabelSpacing = freshLabelSpacing();
  state.objectGaps = freshObjectGaps();
  syncUI();
  renderNow();
}

function buildGapControls() {
  const host = $("gapControls");
  if (!host) return;
  host.replaceChildren();
  SETTINGS.gapCatalog.forEach((item) => {
    const wrap = document.createElement("div");
    wrap.dataset.gapWrap = item.key;
    const label = document.createElement("label");
    label.htmlFor = "gap-" + item.key;
    label.append(document.createTextNode(item.label + " "));
    const output = document.createElement("output");
    output.id = "gap-" + item.key + "-out";
    label.append(output);
    const input = document.createElement("input");
    input.id = "gap-" + item.key;
    input.type = "range";
    input.min = String(SETTINGS.objectGaps.min);
    input.max = String(SETTINGS.objectGaps.max);
    input.value = "0";
    input.dataset.gap = item.key;
    wrap.append(label, input);
    host.append(wrap);
  });
}

async function init() {
  buildSteps();
  buildGapControls();
  const preset = $("seriesPreset");
  SETTINGS.series.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.label;
    preset.appendChild(option);
  });
  const custom = document.createElement("option");
  custom.value = "custom";
  custom.textContent = "Custom";
  preset.appendChild(custom);
  bindUI();
  await Promise.all([
    document.fonts.load("500 28px Inter"),
    document.fonts.load("800 72px Inter"),
    document.fonts.load("800 240px Inter"),
  ]);
  await document.fonts.ready;
  const ctx = $("preview").getContext("2d");
  ctx.font = "500 100px Inter";
  const medium = ctx.measureText("AOG").width;
  ctx.font = "800 100px Inter";
  const extra = ctx.measureText("AOG").width;
  if (Math.abs(medium - extra) < 0.5) throw new Error("Inter weights did not load");
  const [logo, logoWhite, tail, tailWhite, engine, hangar] = await Promise.all([
    loadImage("logos/aog-alerts-logo.png"),
    loadImage("logos/aog-alerts-logo-white.png"),
    loadImage("logos/aog-alerts-tail.png"),
    loadImage("logos/aog-alerts-tail-white.png"),
    loadImage("photos/engine-cfm56.jpg"),
    loadImage("photos/hangar-tulsa.jpg"),
  ]);
  Object.assign(assets, { logo, logoWhite, tail, tailWhite, engine, hangar });
  loadSample("announcement", "landscape");
  window.AOG.ready = true;
}

window.AOG = {
  ready: false,
  SETTINGS,
  getState: () => snapshot(),
  getLayout: () => lastLayout,
  loadSample,
  renderNow,
  measureLine(text, weight, size, trackingEm) {
    const ctx = $("preview").getContext("2d");
    ctx.font = `${weight} ${size}px ${SETTINGS.fonts.family}`;
    ctx.letterSpacing = "0px";
    return measureTracked(ctx, text, size * trackingEm);
  },
  exportDesignsJSON: () => JSON.stringify(exportDesignsObject()),
  importDesignsJSON: importDesignsText,
  async   exportDataURL(sizeKey) {
    const file = await exportPNG(sizeKey || state.size);
    const canvas = file.canvas;
    return canvas.toDataURL("image/png");
  },
  layoutFor(sizeKey) {
    const canvas = document.createElement("canvas");
    return paint(canvas, buildView(sizeKey || state.size));
  },
  pngName,
};

init().catch((err) => {
  const status = $("status");
  status.textContent = err.message;
  status.classList.add("warn");
});

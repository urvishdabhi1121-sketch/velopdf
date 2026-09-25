// Local PDF processing engine — all operations run in the browser, no network.
// Built on pdf-lib. This module is the single abstraction layer the UI talks to;
// the implementation can later be swapped for a native Android engine.
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";

const readBytes = (file) => file.arrayBuffer();

async function load(file) {
  return PDFDocument.load(await readBytes(file), { ignoreEncryption: true });
}

async function save(doc, options) {
  return doc.save(options);
}

/** Merge multiple PDF files into one, preserving order. */
export async function mergePdfs(files, onProgress) {
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const src = await load(files[i]);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
    if (onProgress) onProgress(Math.round(((i + 1) / files.length) * 100));
  }
  return save(out);
}

/** Parse a range string like "1-3, 5, 8-10" into 1-based page numbers. */
export function parseRanges(input, max) {
  const result = [];
  for (const part of String(input).split(",")) {
    const p = part.trim();
    if (!p) continue;
    if (p.includes("-")) {
      const [a, b] = p.split("-").map((n) => parseInt(n, 10));
      if (Number.isFinite(a) && Number.isFinite(b)) for (let i = a; i <= b; i++) result.push(i);
    } else {
      const n = parseInt(p, 10);
      if (Number.isFinite(n)) result.push(n);
    }
  }
  return [...new Set(result)].filter((n) => n >= 1 && n <= max).sort((a, b) => a - b);
}

/** Build a new PDF containing only the given 1-based pages. */
export async function extractPages(file, pages) {
  const src = await load(file);
  const out = await PDFDocument.create();
  const copied = await out.copyPages(
    src,
    pages.map((p) => p - 1)
  );
  copied.forEach((p) => out.addPage(p));
  return save(out);
}

/** Build a new PDF with the given 1-based pages removed. */
export async function removePages(file, removeList) {
  const src = await load(file);
  const total = src.getPageCount();
  const remove = new Set(removeList);
  const keep = [];
  for (let i = 1; i <= total; i++) if (!remove.has(i)) keep.push(i);
  if (keep.length === 0) throw new Error("You can't remove every page of the document.");
  return extractPages(file, keep);
}

/** Split a PDF into individual single-page PDFs. Returns [{name, bytes}]. */
export async function splitToIndividual(file, onProgress) {
  const src = await load(file);
  const total = src.getPageCount();
  const results = [];
  for (let i = 0; i < total; i++) {
    const out = await PDFDocument.create();
    const [page] = await out.copyPages(src, [i]);
    out.addPage(page);
    results.push({ name: `page-${i + 1}.pdf`, bytes: await save(out) });
    if (onProgress) onProgress(Math.round(((i + 1) / total) * 100));
  }
  return results;
}

/** Split by ranges: each range group becomes one PDF. ranges = [[1,2,3],[4,5,6]]. */
export async function splitByRanges(file, groups, onProgress) {
  const src = await load(file);
  const results = [];
  for (let i = 0; i < groups.length; i++) {
    const out = await PDFDocument.create();
    const copied = await out.copyPages(
      src,
      groups[i].map((p) => p - 1)
    );
    copied.forEach((p) => out.addPage(p));
    results.push({ name: `part-${i + 1}.pdf`, bytes: await save(out) });
    if (onProgress) onProgress(Math.round(((i + 1) / groups.length) * 100));
  }
  return results;
}

/** Rotate pages. angle in degrees (90/180/270). pages optional (1-based); defaults to all. */
export async function rotatePdf(file, angle, pages) {
  const doc = await load(file);
  const all = doc.getPages();
  const targets = pages && pages.length ? pages : all.map((_, i) => i + 1);
  for (const p of targets) {
    const page = all[p - 1];
    if (!page) continue;
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + angle) % 360));
  }
  return save(doc);
}

/** Add page numbers. opts: { position, start, size, prefix, suffix }. */
export async function addPageNumbers(file, opts) {
  const doc = await load(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const { position = "bottom-center", start = 1, size = 12, prefix = "", suffix = "" } = opts;
  const pages = doc.getPages();
  pages.forEach((page, i) => {
    const num = start + i;
    const text = `${prefix}${num}${suffix}`;
    const { width, height } = page.getSize();
    const tw = font.widthOfTextAtSize(text, size);
    const m = 28;
    let x, y;
    y = position.includes("top") ? height - m - size : m;
    if (position.includes("left")) x = m;
    else if (position.includes("right")) x = width - m - tw;
    else x = (width - tw) / 2;
    page.drawText(text, { x, y, size, font, color: rgb(0.05, 0.09, 0.16) });
  });
  return save(doc);
}

/** Add a text watermark. opts: { text, opacity, size, rotation }. */
export async function addWatermark(file, opts) {
  const doc = await load(file);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const { text = "CONFIDENTIAL", opacity = 0.18, size = 48, rotation = 45 } = opts;
  if (!text.trim()) throw new Error("Watermark text can't be empty.");
  const pages = doc.getPages();
  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const tw = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - tw) / 2,
      y: (height - size) / 2,
      size,
      font,
      color: rgb(0.1, 0.1, 0.27),
      opacity,
      rotate: degrees(rotation),
    });
  });
  return save(doc);
}

/** Crop pages by removing margins (points). margins: {top,bottom,left,right}. */
export async function cropPdf(file, margins) {
  const doc = await load(file);
  doc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    page.setCropBox(
      margins.left,
      margins.bottom,
      Math.max(1, width - margins.left - margins.right),
      Math.max(1, height - margins.top - margins.bottom)
    );
  });
  return save(doc);
}

/** Convert images (jpg/png) into a single PDF, one image per page. */
export async function imagesToPdf(files, onProgress) {
  const doc = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const bytes = await readBytes(files[i]);
    const img = files[i].type.includes("png") ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    if (onProgress) onProgress(Math.round(((i + 1) / files.length) * 100));
  }
  return save(doc);
}

/** Password-protect a PDF (encrypts on save). */
export async function protectPdf(file, password) {
  if (!password || password.length < 1) throw new Error("Password can't be empty.");
  const doc = await load(file);
  return save(doc, { userPassword: password, ownerPassword: password });
}

/** Get page count for a file (used for previews). */
export async function pageCount(file) {
  const doc = await load(file);
  return doc.getPageCount();
}
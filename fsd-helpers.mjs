import { Paragraph, Table, TableRow, TableCell, TextRun, ImageRun, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType } from 'docx';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const IMG = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\700b2e24-1929-421d-b91a-d7ca98588532';

export async function img(name, maxW = 570) {
  const fp = path.join(IMG, name);
  if (!fs.existsSync(fp)) { console.warn('Missing:', name); return null; }
  const m = await sharp(fp).metadata();
  const r = Math.min(maxW / m.width, 1);
  const buf = await sharp(fp).resize(Math.round(m.width * r), Math.round(m.height * r)).png().toBuffer();
  return { buf, w: Math.round(m.width * r), h: Math.round(m.height * r) };
}

const bdr = { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };

export function tbl(headers, rows, widths) {
  const hRow = new TableRow({ tableHeader: true, children: headers.map((h, i) =>
    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, font: 'Arial', color: 'FFFFFF' })], alignment: AlignmentType.LEFT, spacing: { before: 40, after: 40 } })],
      shading: { type: ShadingType.SOLID, color: '2563EB', fill: '2563EB' }, borders,
      width: widths ? { size: widths[i], type: WidthType.PERCENTAGE } : undefined }))
  });
  const dRows = rows.map((row, ri) => new TableRow({ children: row.map((c, ci) =>
    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(c), size: 18, font: 'Arial' })], spacing: { before: 30, after: 30 } })],
      shading: ri % 2 === 1 ? { type: ShadingType.SOLID, color: 'F8FAFC', fill: 'F8FAFC' } : undefined, borders,
      width: widths ? { size: widths[ci], type: WidthType.PERCENTAGE } : undefined }))
  }));
  return new Table({ rows: [hRow, ...dRows], width: { size: 100, type: WidthType.PERCENTAGE } });
}

// Green header table for UC metadata
export function ucTbl(rows) {
  const bdr2 = { style: BorderStyle.SINGLE, size: 1, color: 'BBF7D0' };
  const b2 = { top: bdr2, bottom: bdr2, left: bdr2, right: bdr2 };
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: rows.map((row, ri) =>
    new TableRow({ children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row[0], bold: true, size: 19, font: 'Arial', color: '065F46' })] })],
        shading: { type: ShadingType.SOLID, color: 'ECFDF5', fill: 'ECFDF5' }, borders: b2, width: { size: 22, type: WidthType.PERCENTAGE } }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: row[1], size: 19, font: 'Arial' })] })],
        borders: b2, width: { size: 78, type: WidthType.PERCENTAGE } }),
    ] })
  ) });
}

export function h1(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true })], spacing: { before: 500, after: 200 } }); }
export function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, bold: true })], spacing: { before: 400, after: 150 } }); }
export function h3(t) { return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, bold: true })], spacing: { before: 300, after: 120 } }); }
export function p(t, opts = {}) { return new Paragraph({ children: [new TextRun({ text: t, size: 21, font: 'Arial', ...opts })], spacing: { after: 80 } }); }
export function bp(t) { return p(t, { bold: true, size: 22 }); }
export function empty() { return new Paragraph({}); }
export function step(n, t) { return new Paragraph({ children: [new TextRun({ text: `${n}. `, bold: true, size: 20, font: 'Arial' }), new TextRun({ text: t, size: 20, font: 'Arial' })], spacing: { after: 60 }, indent: { left: 280 } }); }
export function altStep(t) { return new Paragraph({ children: [new TextRun({ text: '↳ ' + t, size: 19, font: 'Arial', color: '6B7280', italics: true })], spacing: { after: 50 }, indent: { left: 560 } }); }

export async function imgPara(name, caption) {
  const r = []; const d = await img(name);
  if (d) r.push(new Paragraph({ children: [new ImageRun({ data: d.buf, transformation: { width: d.w, height: d.h }, type: 'png' })], alignment: AlignmentType.CENTER, spacing: { before: 150, after: 80 } }));
  if (caption) r.push(new Paragraph({ children: [new TextRun({ text: caption, italics: true, size: 17, color: '6B7280', font: 'Arial' })], alignment: AlignmentType.CENTER, spacing: { after: 180 } }));
  return r;
}

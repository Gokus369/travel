// Builds public/frames/v1 from the original film in frames/. Run with: node scripts/build-frames.mjs
//
//  - frame 1: paper tones flattened to the exact page colour, so the film opens seamlessly
//  - frames 2-34 skipped: 2-21 repeat frame 1, and the sun portal replaces the baked dissolve
//  - corner badge healed out of every remaining frame
//  - the beach card's garbled text repaired on frames 217-240
//
// If the film changes, write to a new version folder and update frameUrl in
// src/components/story/timeline.ts, because frames are cached for a year.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.join(import.meta.dirname, "..");
const source = path.join(root, "frames");
const output = path.join(root, "public/frames/v1");
const name = (frame) => `frame_${String(frame).padStart(4, "0")}.webp`;

const WIDTH = 1280;
const HEIGHT = 720;
const CHANNELS = 3;
const PAPER = [247, 240, 224];

// The badge and its soft shadow. Every edge sits inside the frame, so all four can anchor the fill.
const BADGE = { x0: 1098, y0: 588, x1: 1272, y1: 712 };
const FEATHER = 13;

async function buildOpening() {
  const { data, info } = await sharp(path.join(source, name(1))).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const cream = [244, 238, 219];
  for (let i = 0; i < data.length; i += CHANNELS) {
    const distance = Math.hypot(data[i] - cream[0], data[i + 1] - cream[1], data[i + 2] - cream[2]);
    const keep = Math.min(1, Math.max(0, (distance - 9) / 16));
    for (let c = 0; c < CHANNELS; c++) data[i + c] = Math.round(PAPER[c] * (1 - keep) + data[i + c] * keep);
  }
  await sharp(data, { raw: info }).webp({ quality: 92, effort: 5 }).toFile(path.join(output, name(1)));
}

const smooth = (values, radius) =>
  values.map((_, index) => {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, index - radius); j <= Math.min(values.length - 1, index + radius); j++) {
      sum += values[j];
      count++;
    }
    return sum / count;
  });

// Healing fill: a smooth colour field grown from the heavily averaged surroundings, which cannot
// streak, plus only the fine texture from beside the badge, so no objects get duplicated.
async function healBadge(buffer) {
  const target = await sharp(buffer).removeAlpha().raw().toBuffer();
  const soft = await sharp(buffer).removeAlpha().blur(5).raw().toBuffer();
  const width = BADGE.x1 - BADGE.x0;
  const height = BADGE.y1 - BADGE.y0;
  const at = (x, y) => (y * WIDTH + x) * CHANNELS;

  const sampleAround = (x, y, channel) => {
    let sum = 0;
    let count = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        sum += soft[at(Math.min(WIDTH - 1, x + dx), Math.min(HEIGHT - 1, y + dy)) + channel];
        count++;
      }
    }
    return sum / count;
  };
  const edge = (length, pick) => smooth(smooth(Array.from({ length }, (_, i) => pick(i)), 16), 16);

  const result = Buffer.from(target);
  for (let c = 0; c < CHANNELS; c++) {
    const left = edge(height, (y) => sampleAround(BADGE.x0 - 3, BADGE.y0 + y, c));
    const right = edge(height, (y) => sampleAround(BADGE.x1 + 3, BADGE.y0 + y, c));
    const top = edge(width, (x) => sampleAround(BADGE.x0 + x, BADGE.y0 - 3, c));
    const bottom = edge(width, (x) => sampleAround(BADGE.x0 + x, BADGE.y1 + 3, c));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const wl = 1 / (x + 4) ** 2;
        const wr = 1 / (width - x + 3) ** 2;
        const wt = 1 / (y + 4) ** 2;
        const wb = 1 / (height - y + 3) ** 2;
        const field = (wl * left[y] + wr * right[y] + wt * top[x] + wb * bottom[x]) / (wl + wr + wt + wb);
        const mirror = at(BADGE.x0 - 1 - x, BADGE.y0 + y) + c;
        const detail = target[mirror] - soft[mirror];
        const t = Math.min(1, Math.min(x, y, width - 1 - x, height - 1 - y) / FEATHER);
        const mask = t * t * (3 - 2 * t);
        const pixel = at(BADGE.x0 + x, BADGE.y0 + y) + c;
        result[pixel] = Math.max(0, Math.min(255, Math.round(target[pixel] * (1 - mask) + (field + detail * 0.7) * mask)));
      }
    }
  }
  return sharp(result, { raw: { width: WIDTH, height: HEIGHT, channels: CHANNELS } }).png().toBuffer();
}

// stats() ignores extract(), so the crop has to be rendered first.
async function meanColour(buffer, region) {
  const crop = await sharp(buffer).extract(region).png().toBuffer();
  const { channels } = await sharp(crop).stats();
  return channels.slice(0, 3).map((channel) => Math.round(channel.mean));
}

async function repairCard(buffer) {
  const card = await meanColour(buffer, { left: 800, top: 503, width: 40, height: 6 });
  const label = await meanColour(buffer, { left: 838, top: 536, width: 8, height: 26 });
  const font = `font-family="Segoe UI, Arial, sans-serif"`;
  const svg = `<svg width="240" height="110" xmlns="http://www.w3.org/2000/svg">
    <rect x="90" y="31" width="84" height="15" rx="2" fill="rgb(${card})"/>
    <rect x="91" y="51" width="96" height="35" rx="2" fill="rgb(${label})"/>
    <text x="93" y="43" ${font} font-size="12.5" font-weight="600" fill="#5a4b40">Wave Story</text>
    <text x="97" y="65" ${font} font-size="11.5" font-weight="600" fill="#f4f0e7">Varkala Beach</text>
    <text x="97" y="79" ${font} font-size="10.5" fill="#efe9dd">Begin your story</text>
  </svg>`;
  const overlay = await sharp(Buffer.from(svg)).blur(0.35).png().toBuffer();
  return sharp(buffer).composite([{ input: overlay, left: 660, top: 480 }]).png().toBuffer();
}

async function main() {
  fs.mkdirSync(output, { recursive: true });
  await buildOpening();

  for (let frame = 35; frame <= 240; frame++) {
    let buffer = await sharp(path.join(source, name(frame))).removeAlpha().png().toBuffer();
    buffer = await healBadge(buffer);
    if (frame >= 217) buffer = await repairCard(buffer);
    await sharp(buffer).webp({ quality: 80, effort: 5 }).toFile(path.join(output, name(frame)));
  }

  const files = fs.readdirSync(output);
  const bytes = files.reduce((sum, file) => sum + fs.statSync(path.join(output, file)).size, 0);
  console.log(`${files.length} frames, ${(bytes / 1048576).toFixed(1)} MB`);
}

main();

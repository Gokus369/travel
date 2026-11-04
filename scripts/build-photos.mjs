// Makes the smaller photo sizes that src/lib/imageLoader.ts serves, since GitHub Pages cannot resize
// images on request. Run with: node scripts/build-photos.mjs after adding or changing a photo.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const photos = path.join(import.meta.dirname, "../public/photos");
const files = fs.readdirSync(photos).filter((file) => file.endsWith(".jpg"));

for (const width of [640, 1280]) {
  const output = path.join(photos, `w${width}`);
  fs.mkdirSync(output, { recursive: true });
  for (const file of files) {
    await sharp(path.join(photos, file))
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(path.join(output, file));
  }
}

console.log(`${files.length} photos resized`);

// Builds 240×240 thumbnails (/public/menu/thumb/<id>.webp) used by menu rows on phones.
// Runs automatically at the end of fetch-images; run it alone after dropping in new photos.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(import.meta.dirname, '../public/menu');
fs.mkdirSync(path.join(dir, 'thumb'), { recursive: true });
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.webp'));
await Promise.all(
  files.map((f) => sharp(path.join(dir, f)).resize(240, 240).webp({ quality: 72 }).toFile(path.join(dir, 'thumb', f))),
);
console.log('thumbs:', files.length);

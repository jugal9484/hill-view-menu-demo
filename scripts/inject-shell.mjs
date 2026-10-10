// Inlines the pre-rendered hero into dist/index.html. Run after both vite builds.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^shell\.(m?js)$/.test(f));
const { renderShell } = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const file = path.join(root, 'dist/index.html');
const html = fs.readFileSync(file, 'utf8');
const slot = '<div id="hero-root"></div>';
if (!html.includes(slot)) throw new Error('hero-root placeholder not found');
fs.writeFileSync(file, html.replace(slot, () => `<div id="hero-root">${renderShell()}</div>`));
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('shell injected');

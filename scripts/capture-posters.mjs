/* Captures a still of each framed screen, shown while the live app loads.
 *
 *   app-demo/ (the synced demo build)  ──headless Chrome──▶  assets/app/<scene>-<chrome>.webp
 *
 * The stills are pictures of the same build the frames then run, so they can
 * never show something the product does not. Re-run after `npm run sync:app-demo`.
 *
 * Needs a headless-capable Chrome (CHROME_PATH, or one on PATH) and
 * ImageMagick's `magick` for the WebP conversion. Nothing is installed.
 * `chrome-headless-shell` is the dependable choice: on some machines the full
 * browser's headless mode never returns from `--screenshot`, which this script
 * reports instead of waiting forever.
 *
 *   CHROME_PATH=/path/to/chrome-headless-shell npm run posters
 */

import http from 'node:http';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets', 'app');

/* One entry per (scene, chrome) pair framed at a fixed desktop size in app.jsx.
   Frames that take their natural width (the shop page, the portal) have no
   still: their size depends on the column they sit in. */
const POSTERS = [
  ['empresa-panel', 'full', 1280, 800],
  ['empresa-ledger-verificado', 'full', 1280, 800],
  ['empresa-ledger-verificado', 'content', 1040, 800],
  ['empresa-datos', 'content', 1040, 800],
  ['empresa-solicitud-detalle', 'content', 1040, 800],
  ['empresa-ficha', 'content', 1040, 800],
  ['empresa-integracion-instalacion', 'content', 1040, 800]
];

const TYPES = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff'
};

async function chromePath() {
  const candidates = [
    process.env.CHROME_PATH, 'chrome-headless-shell', 'chromium', 'chromium-browser',
    'google-chrome', 'google-chrome-stable'
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      await run(candidate, ['--version'], { timeout: 10_000 });
      return candidate;
    } catch { /* try the next one */ }
  }
  throw new Error('No se encontró Chrome/Chromium. Define CHROME_PATH.');
}

await stat(join(root, 'app-demo', 'index.html')).catch(() => {
  throw new Error('Falta app-demo/. Ejecuta primero: npm run sync:app-demo');
});

const server = http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = normalize(join(root, pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (pathname.endsWith('/')) file = join(file, 'index.html');
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const base = `http://127.0.0.1:${server.address().port}`;

const chrome = await chromePath();
const work = await mkdtemp(join(tmpdir(), 'consenty-posters-'));
await mkdir(out, { recursive: true });

try {
  for (const [scene, mode, width, height] of POSTERS) {
    const png = join(work, `${scene}-${mode}.png`);
    const target = join(out, `${scene}-${mode}.webp`);
    // Each still starts from a fresh store, so all of them show the same day one.
    const url = `${base}/app-demo/?scene=${scene}&chrome=${mode}&latency=off&reset=1`;
    await run(chrome, [
      '--headless', '--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1',
      `--user-data-dir=${join(work, 'profile-' + scene + mode)}`,
      `--window-size=${width},${height}`, '--virtual-time-budget=8000',
      `--screenshot=${png}`, url
    ], { timeout: 60_000, killSignal: 'SIGKILL' }).catch((error) => {
      if (error.killed) {
        throw new Error(
          `${chrome} no terminó la captura de ${scene}. Prueba con chrome-headless-shell en CHROME_PATH.`
        );
      }
      throw error;
    });
    await run('magick', [png, '-quality', '82', '-define', 'webp:method=6', target]);
    console.log(`${scene}-${mode}.webp  ${((await stat(target)).size / 1024).toFixed(0)} kB`);
  }
} finally {
  server.close();
  await rm(work, { recursive: true, force: true });
}

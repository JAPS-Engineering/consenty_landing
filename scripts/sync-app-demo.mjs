/* Copies the embeddable demo build of the app into this site.
 *
 *   ../consenty_app/frontend/apps/dashboard/dist-demo/  ──▶  app-demo/
 *
 * The demo is the real dashboard, portal and widget running against a simulated
 * API in the browser (consenty_app/docs/architecture/demo-embebible.md). This
 * site frames it in <iframe>; GitHub Pages runs no build, so the copy is
 * committed like every other artifact here.
 *
 *   npm run sync:app-demo                 # after `npm run build:demo` in the app
 *   APP_DEMO_DIST=/other/dist-demo npm run sync:app-demo
 */

import { cp, rm, readdir, stat, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(
  root,
  process.env.APP_DEMO_DIST || '../consenty_app/frontend/apps/dashboard/dist-demo'
);
const target = resolve(root, 'app-demo');

try {
  await stat(resolve(source, 'index.html'));
} catch {
  console.error(
    `No hay build de demo en ${source}\n` +
    'Compílalo primero: cd ../consenty_app/frontend && npm run build:demo --workspace @consenty/dashboard'
  );
  process.exit(1);
}

/* Asset names carry a content hash, so a plain copy would leave every previous
   bundle behind. The directory is replaced whole. */
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });

/* Which app commit the frames are showing: the first thing to check when a
   screen here no longer matches the product. */
let revision = 'desconocido';
try {
  const run = promisify(execFile);
  const { stdout } = await run('git', ['-C', source, 'rev-parse', '--short', 'HEAD']);
  const { stdout: dirty } = await run('git', ['-C', source, 'status', '--porcelain', '--', '..']);
  revision = stdout.trim() + (dirty.trim() ? '+cambios-locales' : '');
} catch {
  /* Not a git checkout: the build is still usable. */
}
await writeFile(
  resolve(target, 'VERSION'),
  `consenty_app ${revision}\nsincronizado ${new Date().toISOString()}\n`
);

async function size(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    total += entry.isDirectory() ? await size(path) : (await stat(path)).size;
  }
  return total;
}
console.log(`app-demo/ actualizado: ${(await size(target) / 1e6).toFixed(2)} MB (${revision})`);

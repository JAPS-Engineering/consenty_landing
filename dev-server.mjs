import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 5173 is also Vite's default; PORT lets both run side by side.
const PORT = Number(process.env.PORT) || 5173;
// The booking form posts to the app's API. Locally the site sends it here, to
// its own origin, and this server forwards it: no CORS, and the backend can
// listen wherever it likes (API_TARGET=http://127.0.0.1:8017 npm run dev).
const API_TARGET = process.env.API_TARGET || 'http://localhost:8000';

function forwardToApi(req, res) {
  const target = new URL(req.url, API_TARGET);
  const upstream = http.request(
    target,
    { method: req.method, headers: { ...req.headers, host: target.host } },
    (answer) => {
      res.writeHead(answer.statusCode || 502, answer.headers);
      answer.pipe(res);
    }
  );
  upstream.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ detail: `No hay backend en ${API_TARGET}` }));
  });
  req.pipe(upstream);
}

let isBuilding = false;

const runBuild = async () => {
  if (isBuilding) return;
  isBuilding = true;

  return new Promise((resolve) => {
    const build = spawn('node', ['build.mjs'], { stdio: 'inherit' });
    build.on('close', () => {
      isBuilding = false;
      console.log(`\n✓ Build completado. Servidor escuchando en http://localhost:${PORT}\n`);
      resolve();
    });
  });
};

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
};

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    forwardToApi(req, res);
    return;
  }
  // Only the path picks the file: `/demo/?paso=evidencia` and
  // `/app-demo/?scene=empresa-panel` carry state in the query string.
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }
  let filePath = path.join(__dirname, pathname === '/' ? '/index.html' : pathname);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Si es un directorio, intenta servir index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Si no existe, intenta con 404.html
  if (!fs.existsSync(filePath)) {
    const notFoundPath = path.join(__dirname, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(notFoundPath));
      return;
    }
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(filePath));
});

server.listen(PORT, () => {
  console.log(`\n🚀 Servidor en desarrollo escuchando en http://localhost:${PORT}`);
  console.log(`📁 Vigilando cambios en: app.jsx, seo.json, index.html\n`);
});

// Vigilar cambios en archivos fuente
chokidar.watch(['app.jsx', 'seo.json', 'index.html'], { ignoreInitial: true }).on('change', async (file) => {
  console.log(`\n📝 Cambios detectados en ${file}`);
  console.log('🔨 Rebuilding...');
  await runBuild();
});

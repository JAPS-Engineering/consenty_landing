import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import chokidar from 'chokidar';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5173;

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
  let filePath = path.join(__dirname, req.url === '/' ? '/index.html' : req.url);

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

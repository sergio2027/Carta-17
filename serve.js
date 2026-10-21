const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg'
};

const server = http.createServer((req, res) => {
  const cleanUrl = decodeURI(req.url.split('?')[0]);
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);

  // Prevenir Directory Traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Acceso denegado');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404: Archivo no encontrado');
      } else {
        res.writeHead(500);
        res.end('500: Error interno del servidor');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('═══════════════════════════════════════════════════');
  console.log(` 💜 Carta Romántica lista en: ${url}`);
  console.log(' Presiona Ctrl + C en esta terminal para detenerlo.');
  console.log('═══════════════════════════════════════════════════');

  const startCmd = process.platform === 'win32' ? 'start' : 'open';
  exec(`${startCmd} ${url}`);
});

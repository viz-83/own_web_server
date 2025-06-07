import http from 'http';
import https from 'https';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { createServer as createHttpsServer } from 'https';
import { parse } from 'querystring';

// ESM __dirname polyfill
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTPS config
const sslOptions = {
  key: await fs.readFile(path.join(__dirname, 'cert', 'key.pem')),
  cert: await fs.readFile(path.join(__dirname, 'cert', 'cert.pem'))
};

// Helper: Get content type based on extension
const getContentType = (urlPath) => {
  if (urlPath.endsWith('.css')) return 'text/css';
  if (urlPath.endsWith('.js')) return 'application/javascript';
  if (urlPath.endsWith('.json')) return 'application/json';
  if (urlPath.endsWith('.jpg')) return 'image/jpeg';
  if (urlPath.endsWith('.png')) return 'image/png';
  return 'text/html';
};

// Main server logic
const handleRequest = async (req, res) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);

  const url = req.url;

  // JSON API Route
  if (url === '/api' && req.method === 'GET') {
    const data = {
      name: 'Vishnu K V',
      role: 'Full Stack Developer',
      interests: ['JavaScript', 'IoT', 'Web Servers']
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(data));
  }

  // POST Handler (e.g., /submit)
  if (url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });

    req.on('end', () => {
      const parsed = parse(body);
      console.log('POST Data:', parsed);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Form submitted!</h1><pre>${JSON.stringify(parsed, null, 2)}</pre>`);
    });

    return;
  }

  // Static file serving
  const filePath = path.join(__dirname, 'public', url === '/' ? 'index.html' : url);

  try {
    const file = await fs.readFile(filePath);
    const contentType = getContentType(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(file);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`<h1>404 - Not Found</h1><p>${url} does not exist.</p>`);
  }
};

// Start HTTPS server
const PORT = 3000;
createHttpsServer(sslOptions, handleRequest).listen(PORT, () => {
  console.log(`✅ HTTPS Server running at https://localhost:${PORT}`);
});

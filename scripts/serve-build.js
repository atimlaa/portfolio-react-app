/* eslint-disable no-console */
// Minimal static server that behaves like GitHub Pages for the built site:
// serves build/ under /portfolio-react-app/, resolves folder/index.html,
// and returns build/404.html with a real 404 status for unknown paths.
// Used by the Playwright tests: `node scripts/serve-build.js` (port 4173).

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "build");
const BASE = "/portfolio-react-app";
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain", ".pdf": "application/pdf",
  ".woff": "font/woff", ".woff2": "font/woff2", ".map": "application/json",
};

const send = (res, status, file) => {
  res.writeHead(status, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    if (!url.startsWith(BASE)) return send(res, 404, path.join(ROOT, "404.html"));
    const rel = url.slice(BASE.length) || "/";
    // GitHub Pages redirects /folder to /folder/
    const asDir = path.join(ROOT, rel, "index.html");
    if (!rel.endsWith("/") && fs.existsSync(asDir)) {
      res.writeHead(301, { Location: `${url}/` });
      return res.end();
    }
    const file = path.join(ROOT, rel.endsWith("/") ? path.join(rel, "index.html") : rel);
    if (file.startsWith(ROOT) && fs.existsSync(file) && fs.statSync(file).isFile()) return send(res, 200, file);
    return send(res, 404, path.join(ROOT, "404.html"));
  })
  .listen(PORT, () => console.log(`Serving build at http://localhost:${PORT}${BASE}/`));

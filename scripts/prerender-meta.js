/* eslint-disable no-console */
// Runs after `react-scripts build`.
//
// GitHub Pages is a static host, so each route needs its own HTML file:
//   build/privacy/index.html, build/terms/index.html, build/cookies/index.html
// Each copy gets that page's <title>, description, canonical and Open Graph
// tags, so Google and link previews (LinkedIn, X, Slack…) see the right text
// even without running JavaScript. build/404.html makes unknown URLs show the
// custom 404 page, and sitemap.xml lists every indexable page.

const fs = require("fs");
const path = require("path");
const seo = require("../src/seo/pages.json");

const BUILD = path.join(__dirname, "..", "build");
const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urlFor = (route) => (route === "/" || route === "/404" ? `${seo.siteUrl}/` : `${seo.siteUrl}${route}/`);

const render = (route) => {
  const page = seo.pages[route];
  const title = esc(page.title);
  const desc = esc(page.description);
  const url = urlFor(route);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);

  if (page.noindex) {
    html = html
      .replace(/(<meta name="robots" content=")[^"]*(")/, "$1noindex, follow$2")
      .replace(/<link rel="canonical"[^>]*>/, "");
  }
  return html;
};

const write = (file, html) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log("  wrote", path.relative(BUILD, file));
};

console.log("Prerendering per-page meta tags…");
const indexable = [];
for (const route of Object.keys(seo.pages)) {
  if (route === "/") {
    write(path.join(BUILD, "index.html"), render("/"));
    indexable.push(route);
  } else if (route === "/404") {
    write(path.join(BUILD, "404.html"), render("/404"));
  } else {
    write(path.join(BUILD, route.slice(1), "index.html"), render(route));
    indexable.push(route);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  indexable
    .map(
      (r) =>
        `  <url><loc>${urlFor(r)}</loc><lastmod>${today}</lastmod><priority>${r === "/" ? "1.0" : "0.3"}</priority></url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
write(path.join(BUILD, "sitemap.xml"), sitemap);

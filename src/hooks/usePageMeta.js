import { useEffect } from "react";
import seo from "../seo/pages.json";

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Keeps <title>, description, canonical and Open Graph tags in sync with the
// current route. The same values are baked into static HTML at build time by
// scripts/prerender-meta.js so crawlers that skip JavaScript still see them.
const usePageMeta = (path) => {
  useEffect(() => {
    const page = seo.pages[path] || seo.pages["/"];
    const url = path === "/" || path === "/404" ? `${seo.siteUrl}/` : `${seo.siteUrl}${path}/`;

    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    if (!page.noindex) setCanonical(url);
  }, [path]);
};

export default usePageMeta;

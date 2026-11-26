import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Render the same legal-page component at build time so the entire policy is
// accessible on static hosting, even without JavaScript or an SPA rewrite.
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom" });
try {
  const { LegalPage } = await server.ssrLoadModule("/src/App.tsx");
  const content = renderToStaticMarkup(React.createElement(LegalPage, { kind: "child-safety" }));
  const title = "Sociol Child Safety Standards | Sociol";
  const description = "Sociol prohibits CSAM and CSAE. Read our child-safety standards, how to report concerns, and how to contact our child-safety team.";
  let html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+(?:name="description"|property="og:description")\s+content=")[^"]*(")/g, `$1${description}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace("</head>", '<link rel="canonical" href="https://sociol.net/child-safety" /><meta property="og:url" content="https://sociol.net/child-safety" /></head>')
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    .replace(/<script\b[^>]*type="module"[^>]*><\/script>/g, "")
;
  // Vite SSR returns source asset paths; use the matching bundled logo instead.
  const assets = await import("node:fs/promises").then(fs => fs.readdir(new URL("../dist/assets/", import.meta.url)));
  const logo = assets.find(name => /^logo-[^.]+\.png$/.test(name));
  if (logo) html = html.replaceAll('"/assets/logo.png"', `"/assets/${logo}"`);
  await mkdir(new URL("../dist/child-safety/", import.meta.url), { recursive: true });
  await writeFile(new URL("../dist/child-safety/index.html", import.meta.url), html);
} finally {
  await server.close();
}

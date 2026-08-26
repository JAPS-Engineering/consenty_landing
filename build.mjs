/* Consenty build — turns the hand-edited index.html + seo.json into the deployed site.
 *
 *   app.jsx  ──babel──▶  app.js
 *   seo.json ──────────▶  seo.js                 (read by the router at runtime)
 *   index.html + seo.json ▶ <route>/index.html   (one indexable URL per screen)
 *                         ▶ sitemap.xml, robots.txt, manifest.webmanifest, 404.html
 *
 * GitHub Pages serves static files and runs no build, so every artifact is committed.
 * Run `npm run build` after touching app.jsx, index.html or seo.json.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { transformAsync } from '@babel/core';
import presetReact from '@babel/preset-react';

const seo = JSON.parse(await readFile('seo.json', 'utf8'));
const { site, pages } = seo;
const HOME = 'inicio';
const GENERATED = 'GENERADO por build.mjs — no editar a mano.';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (path) => site.origin + path;
const stamp = new Date().toISOString().slice(0, 10);

/* ---------------------------------------------------------------- *
 * 1. app.jsx → app.js
 * ---------------------------------------------------------------- */

const source = await readFile('app.jsx', 'utf8');
const { code } = await transformAsync(source, {
  filename: 'app.jsx',
  presets: [[presetReact, { runtime: 'classic' }]],
  babelrc: false,
  configFile: false,
  compact: false,
  comments: false
});
await writeFile('app.js', `/* ${GENERATED} Fuente: app.jsx */\n${code}\n`);

/* ---------------------------------------------------------------- *
 * 2. seo.json → seo.js
 * ---------------------------------------------------------------- */

await writeFile('seo.js',
  `/* ${GENERATED} Fuente: seo.json */\nwindow.CONSENTY_SEO = ${JSON.stringify(seo)};\n`);

/* ---------------------------------------------------------------- *
 * 3. Structured data
 * ---------------------------------------------------------------- */

/* Only facts the codebase actually establishes: legal name, city, country, logo, URL.
   No email or social profiles until real ones exist — invented identifiers in
   structured data are worse than absent ones. */
const organization = {
  '@type': 'Organization',
  '@id': abs('/#organization'),
  name: site.name,
  legalName: site.legalName,
  url: abs('/'),
  logo: { '@type': 'ImageObject', url: abs(site.logo), width: 512, height: 512 },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santiago',
    addressCountry: 'CL'
  }
};

const website = {
  '@type': 'WebSite',
  '@id': abs('/#website'),
  name: site.name,
  url: abs('/'),
  inLanguage: site.lang,
  publisher: { '@id': abs('/#organization') }
};

const softwareApplication = {
  '@type': 'SoftwareApplication',
  '@id': abs('/#software'),
  name: site.name,
  url: abs('/'),
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Gestión de consentimiento y cumplimiento normativo',
  operatingSystem: 'Web',
  inLanguage: site.lang,
  description: pages[HOME].description,
  publisher: { '@id': abs('/#organization') },
  featureList: [
    'Captura de consentimiento en web, e-commerce, app y canales offline',
    'Sello de tiempo, versión de términos y hash de evidencia por captura',
    'Panel DPO con supervisión de consentimientos, alertas y plazos',
    'Portal de titulares para los seis derechos BARCOP',
    'Expedientes de evidencia exportables para auditoría'
  ]
};

function breadcrumbs(key, page) {
  return {
    '@type': 'BreadcrumbList',
    '@id': abs(page.path) + '#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: page.nav, item: abs(page.path) }
    ]
  };
}

function graphFor(key, page) {
  const webPage = {
    '@type': 'WebPage',
    '@id': abs(page.path) + '#webpage',
    url: abs(page.path),
    name: page.title,
    description: page.description,
    inLanguage: site.lang,
    isPartOf: { '@id': abs('/#website') },
    about: { '@id': abs('/#organization') },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(site.ogImage) }
  };

  const graph = [organization, website, webPage];
  if (key === HOME) graph.push(softwareApplication);
  else {
    const crumb = breadcrumbs(key, page);
    webPage.breadcrumb = { '@id': crumb['@id'] };
    graph.push(crumb);
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/* ---------------------------------------------------------------- *
 * 4. index.html + seo.json → <route>/index.html
 * ---------------------------------------------------------------- */

const template = await readFile('index.html', 'utf8');
const MARKERS = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

if (!MARKERS.test(template)) {
  throw new Error('index.html no contiene el bloque <!-- seo:start --> … <!-- seo:end -->');
}

function seoBlock(key, page) {
  const url = abs(page.path);
  const image = abs(site.ogImage);
  const t = esc(page.title);
  const d = esc(page.description);
  const ld = JSON.stringify(graphFor(key, page), null, 2);

  return `<!-- seo:start — ${GENERATED} Fuente: seo.json (ruta "${key}"). -->
<title>${t}</title>
<meta name="description" content="${d}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${url}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${t}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${image}">
<meta name="twitter:image:alt" content="${t}">

<script type="application/ld+json">
${ld}
</script>
<!-- seo:end -->`;
}

const written = [];
for (const [key, page] of Object.entries(pages)) {
  const html = template.replace(MARKERS, () => seoBlock(key, page));
  if (key === HOME) {
    await writeFile('index.html', html);
    written.push('index.html');
  } else {
    const dir = page.path.replace(/^\/|\/$/g, '');
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}/index.html`, html);
    written.push(`${dir}/index.html`);
  }
}

/* Unknown paths: GitHub Pages serves 404.html. Boot the same SPA so a typo lands
   on the site instead of GitHub's error page, but keep it out of the index. */
const notFound = template
  .replace(MARKERS, () => `<!-- seo:start — ${GENERATED} -->
<title>Página no encontrada — ${esc(site.name)}</title>
<meta name="robots" content="noindex,follow">
<!-- seo:end -->`);
await writeFile('404.html', notFound);
written.push('404.html');

/* ---------------------------------------------------------------- *
 * 5. sitemap.xml, robots.txt, manifest.webmanifest
 * ---------------------------------------------------------------- */

const urls = Object.entries(pages).map(([key, page]) =>
  `  <url>
    <loc>${abs(page.path)}</loc>
    <lastmod>${stamp}</lastmod>
    <changefreq>${key === HOME ? 'weekly' : 'monthly'}</changefreq>
    <priority>${key === HOME ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

await writeFile('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

await writeFile('robots.txt',
  `# ${site.name} — ${site.origin}
User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`);

await writeFile('manifest.webmanifest', JSON.stringify({
  name: `${site.name} — Consentimiento a prueba de auditoría`,
  short_name: site.name,
  description: pages[HOME].description,
  lang: site.lang,
  start_url: '/',
  scope: '/',
  display: 'standalone',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
  ]
}, null, 2) + '\n');

written.push('sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'app.js', 'seo.js');
console.log('build ok:\n  ' + written.join('\n  '));

# Consenty | sitio web

Implementación de `Consenty Web.dc.html`, el design canvas del proyecto Claude Design
[Consenty Web](https://claude.ai/design/p/3738a235-50c2-4b22-896f-75fb9abe3791).

Sitio estático con siete pantallas, construido íntegramente sobre el **Consenty Design
System** (`_ds/cohere-design-system-8c6d9e32-…/`). Cada pantalla tiene su propia URL real e
indexable; el SPA se monta encima y navega sin recargar.

```bash
npm install       # una vez — solo Babel, para precompilar el JSX
npm run build     # tras editar app.jsx, index.html o seo.json
python3 -m http.server 8000   # → http://localhost:8000
```

GitHub Pages sirve estáticos y no ejecuta build, así que **todo el output se commitea**.

## Estructura

### Fuentes (editables a mano)

| Ruta | Qué es |
|---|---|
| `index.html` | Shell de producción y plantilla de las demás rutas. El bloque entre `<!-- seo:start -->` y `<!-- seo:end -->` lo regenera el build |
| `app.jsx` | La aplicación completa — chrome, siete pantallas y los dos módulos interactivos |
| `seo.json` | Fuente única de `title`, `description` y `path` por ruta |
| `build.mjs` | Compila el JSX y genera las páginas, el sitemap, `robots.txt` y el manifest |
| `assets/favicon.svg` | El swoosh terminal del lockup, aislado como marca de pestaña. Los PNG derivados se generan con `rsvg-convert` |
| `_ds/cohere-design-system-…/` | El design system: tokens, bundle y `readme.md` con la especificación |
| `vendor/` | React 18.3.1 UMD auto-hospedado |

### Generados por `npm run build` (no editar)

| Ruta | Qué es |
|---|---|
| `app.js` | `app.jsx` precompilado |
| `seo.js` | `seo.json` como `window.CONSENTY_SEO`, leído por el router |
| `<ruta>/index.html` | Una página por pantalla, con sus propios metadatos y JSON-LD |
| `404.html` | Arranca el mismo SPA, marcado `noindex` |
| `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | Derivados de `seo.json` |

## Pantallas

`inicio` · `plataforma` · `modulos` · `normativa` · `recursos` · `implementacion` · `demo`

## Diferencias respecto al design canvas

El canvas es un prototipo con estado en memoria. La implementación mantiene el diseño intacto
y añade lo que un sitio real necesita:

1. **Ruteo por rutas reales** (`/plataforma/`). El canvas guardaba la ruta en `state`, así que
   no había URLs compartibles ni botón atrás. Ahora cada pantalla tiene una URL propia servida
   como archivo estático, el historial funciona vía `pushState`/`popstate`, y `<title>`,
   `description` y `canonical` se sincronizan en cada navegación. Los enlaces `#/ruta`
   compartidos antes redirigen solos.
2. **La barra de plazo no reaparece en la sesión.** El readme del sistema lo exige; el canvas
   volvía a mostrarla en cada recarga. Se persiste en `sessionStorage`.
3. **Estado local por widget.** El calculador de brechas (`normativa`) y el widget de captura
   (`modulos`) llevan su propio estado en lugar de compartir un blob global.
4. **Confirmación en el formulario de demo.** El canvas tenía `submitDemo: () => {}`; ahora el
   envío muestra un acuse dentro de la misma banda índigo.
5. **Accesibilidad.** Enlace para saltar al contenido, `aria-current` en la navegación,
   `role="switch"` en los toggles de finalidad, `aria-pressed` en las píldoras del checklist,
   `role="status"` en el registro de evidencia y en el resultado del checklist, y
   `prefers-reduced-motion`.
6. **Tokens en vez de literales.** El canvas escribía `#4338ca`, `#f4f4f5`, `14px` a mano.
   La implementación usa `var(--color-indigo)`, `var(--surface-card-stone)`,
   `var(--radius-lg)`. Los `clamp()` responsivos y las medidas en `ch` se conservan literales
   porque son decisiones de layout del canvas, no tokens.

## Notas de integración

**El bundle local está podado.** Tal como lo entrega el proyecto de diseño, `_ds_bundle.js`
incluye además de los 15 componentes el click-through propio del proyecto (`ui_kits/website/*`),
y `WebsiteApp.jsx` ejecuta `ReactDOM.createRoot(document.getElementById('root')).render(...)`
como efecto de carga — es decir, el bundle se monta solo y pisa cualquier app que use `#root`.
Aquí se eliminaron esos 7 módulos (64.9 KB → 35.4 KB); los 15 componentes quedaron intactos.

> Un re-import desde el proyecto de diseño reintroduce los mockups y el auto-montaje. Hay que
> volver a podar el bundle, o montar la app en un id distinto de `root`.

**`window.Consenty`.** El namespace compilado se genera del título del proyecto
(`CohereDesignSystem_8c6d9e`) y no es editable a mano. `index.html` crea el alias una vez y
`app.jsx` lee los componentes desde ahí, como indica el readme del sistema.

**JSX precompilado.** El design system sugiere transpilar con Babel standalone en tiempo de
carga; aquí no se hace, porque son ~3 MB de compilador en el camino crítico y HTML vacío para
cualquier crawler que no ejecute JS. `build.mjs` compila `app.jsx` → `app.js` con
`@babel/preset-react`. **Editar `app.jsx` sin correr `npm run build` deja el sitio sirviendo
código viejo, sin avisar.**

**Iconos.** `Icon` los sirve desde `unpkg.com/lucide-static@0.428.0` (`_ds_bundle.js:257`). Es
una sustitución marcada en el design system, pendiente de reemplazo por un set licenciado —
y el último tercero que queda en el camino de render. React se auto-hospeda desde `vendor/`;
las fuentes siguen viniendo de Google Fonts vía `tokens/fonts.css`. Los tres tienen
`preconnect` en `index.html`.

## SEO

- Una URL indexable por pantalla, cada una con `title`, `description` y `canonical` propios
  (fuente: `seo.json`). El ruteo por hash anterior colapsaba las siete en `/`.
- JSON-LD por página: `Organization` + `WebSite` + `WebPage` en todas, `SoftwareApplication`
  en inicio y `BreadcrumbList` en las subpáginas. Solo con datos verificables — sin `email`
  ni `sameAs` hasta que existan un correo y un LinkedIn reales.
- `<noscript>` con `<h1>`, propuesta de valor y enlaces a las siete rutas, para crawlers que
  no renderizan JS.
- `robots.txt` apunta a `sitemap.xml`; hay que enviarlo en Google Search Console tras el
  primer despliegue.

## Pendientes heredados del design system

- **Sin imágenes.** `HeroPhotoCard` se renderiza como marco stone en la proporción correcta.
- **Nombres de clientes inventados** (Andesbank, Vitalis, Nortec, Grupo Araucaria, Cimar) en
  `TrustLogoStrip`. Requieren logos reales y autorización antes de cualquier uso externo.
- **`BlogFilterChip` usa `--text-card-heading-size` (32px)** como tamaño de fuente, así que los
  chips de filtro en `recursos` salen a 32px en vez del tamaño de UI. El canvas los dimensiona a
  32px de **alto**. Es un defecto del componente en el design system; no se parchó aquí para no
  divergir del sistema.

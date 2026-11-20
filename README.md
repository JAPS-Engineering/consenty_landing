# Consenty | sitio web

Implementación de `Consenty Web.dc.html`, el design canvas del proyecto Claude Design
[Consenty Web](https://claude.ai/design/p/3738a235-50c2-4b22-896f-75fb9abe3791).

Sitio estático con ocho pantallas, construido íntegramente sobre el **Consenty Design
System** (`_ds/cohere-design-system-8c6d9e32-…/`). Cada pantalla tiene su propia URL real e
indexable; el SPA se monta encima y navega sin recargar.

```bash
npm install       # una vez — solo Babel, para precompilar el JSX
npm run build     # tras editar app.jsx, index.html o seo.json
npm run dev       # compila, sirve en http://localhost:5173 y recompila al guardar
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
| `scripts/sync-app-demo.mjs` | Trae el build de demo de la app a `app-demo/` |
| `scripts/capture-posters.mjs` | Captura las imágenes fijas de `assets/app/` desde ese build |

### Generados por `npm run build` (no editar)

| Ruta | Qué es |
|---|---|
| `app.js` | `app.jsx` precompilado |
| `seo.js` | `seo.json` como `window.CONSENTY_SEO`, leído por el router |
| `<ruta>/index.html` | Una página por pantalla, con sus propios metadatos y JSON-LD |
| `404.html` | Arranca el mismo SPA, marcado `noindex` |
| `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | Derivados de `seo.json` |

### Traídos de la app (no editar)

| Ruta | Qué es |
|---|---|
| `app-demo/` | Build de demo de `consenty_app`: la aplicación real con una API simulada. Lo genera `npm run sync:app-demo` |
| `assets/app/*.webp` | Imagen fija de cada pantalla enmarcada, visible mientras carga la app. Las genera `npm run posters` |

## Pantallas

`inicio` · `plataforma` · `modulos` · `normativa` · `recursos` · `implementacion` · `demo` ·
`verificacion`

`demo` es la demo interactiva del producto y termina en el formulario para agendar una reunión
(`/demo/#agendar`), que es a donde apuntan los botones "Agendar demo".

## El producto, en vivo

El sitio no usa capturas ni maquetas: cada imagen de Consenty es Consenty. `consenty_app`
compila un segundo build de su SPA (consola, portal del titular y widget) que corre contra una
API simulada en el navegador, con una empresa ficticia y sin enviar nada a ningún servidor. Este
sitio lo copia a `app-demo/` y lo enmarca con `<iframe>`.

El contrato (escenas, parámetros de URL y mensajes) está en
`../consenty_app/docs/architecture/demo-embebible.md`. De este lado lo consume un solo
componente, `AppFrame`, en `app.jsx`:

- **Vista** (por defecto): la pantalla se ve viva pero no recibe clics ni foco, para que el
  scroll de la página nunca quede atrapado dentro. Las pantallas de consola se dibujan a tamaño
  de escritorio y se escalan a la columna; si la columna es demasiado angosta, el marco toma su
  ancho natural y la app muestra su propio diseño móvil.
- **Interactivo** (`interactive`): se puede usar. Solo en `/demo/` y en el widget de `/modulos/`.
- Los marcos se cargan al acercarse al viewport y los de vista se descargan al alejarse.

`/demo/` pone dos marcos lado a lado (el cliente y la empresa) sobre el mismo estado simulado, y
avanza su recorrido con los eventos que emite la app: el código de un solo uso que la página
muestra como "correo simulado", el guardado de permisos, la verificación del ledger, la
solicitud de derechos y su respuesta. `/demo/?paso=evidencia` abre un paso concreto y
`/demo/#agendar` lleva al formulario de contacto.

### Actualizar la app enmarcada

```bash
cd ../consenty_app/frontend && npm run build:demo --workspace @consenty/dashboard
cd ../../consenty_landing
npm run sync:app-demo     # reemplaza app-demo/ y anota el commit de la app en app-demo/VERSION
CHROME_PATH=/ruta/a/chrome-headless-shell npm run posters   # requiere también ImageMagick
```

`app-demo/` y `assets/app/` se commitean como el resto del output. Si se añade un marco de
tamaño fijo con una escena nueva, hay que sumarla a la lista de `scripts/capture-posters.mjs` y a
`POSTERS` en `app.jsx`; sin imagen fija el marco muestra un texto de espera y funciona igual.

`robots.txt` excluye `/app-demo/` y el documento lleva `noindex`: es un recurso de las páginas,
no una página.

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
   envío muestra un acuse dentro de la misma banda índigo, y solo cuando la app aceptó la
   solicitud: el formulario hace `POST /api/public/demo-requests` contra `app.consenty.japs.ing`
   (si el sitio corre en local, contra su propio origen: `npm run dev` reenvía `/api` al backend
   de `API_TARGET`, por defecto `http://localhost:8000`) y las solicitudes aparecen en la consola de
   Consenty, en **Plataforma → Demos**. Si el envío falla, el formulario lo dice y conserva lo
   escrito. El formulario del boletín sigue sin enviar nada: falta definir un destino.
5. **Accesibilidad.** Enlace para saltar al contenido, `aria-current` en la navegación,
   `role="switch"` en los toggles de finalidad, `aria-pressed` en las píldoras del checklist,
   `role="status"` en el registro de evidencia y en el resultado del checklist, y
   `prefers-reduced-motion`.
6. **Tokens en vez de literales.** El canvas escribía `#4338ca`, `#f4f4f5`, `14px` a mano.
   La implementación usa `var(--color-indigo)`, `var(--surface-card-stone)`,
   `var(--radius-lg)`. Los `clamp()` responsivos y las medidas en `ch` se conservan literales
   porque son decisiones de layout del canvas, no tokens.
7. **Prueba de conectividad real (`verificacion`).** El canvas comprobaba el desafío de
   Cloudflare cargando un `<img>` contra un endpoint que responde JavaScript, no una imagen —
   el `onerror` se dispara siempre, con o sin bloqueador, así que el diagnóstico reportaba
   "bloqueo" en el 100% de las visitas. La implementación carga el script real de Turnstile
   (`challenges.cloudflare.com/turnstile/v0/api.js`), que es justamente el recurso que un
   bloqueador de anuncios corta en la práctica.
8. **Scroll a anclas internas (`verificacion`).** Es la primera pantalla con enlaces a
   secciones de sí misma (`#empresa`, `#bloqueador`). Se agregó `scroll-behavior: smooth` y
   `scroll-margin-top` globales en `index.html` para que el header sticky no tape el destino.
9. **Footer: "Documentación API" reemplazado.** Ese link de la columna Recursos no tenía
   destino (`null`); el canvas lo reemplaza por "Verificación de formularios", que sí navega.
10. **Props de edición del canvas descartadas (`verificacion`).** `mostrarBarraPlazo`,
    `mostrarDiagnostico` y `tonoBandaCierre` no se exponen como props de React — la barra de
    plazo ya es global y el diagnóstico siempre está visible, mismo criterio que las demás
    pantallas.

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

- **Sin fotografías.** Las imágenes del sitio son el producto en vivo (ver arriba);
  `HeroPhotoCard` y `AgentConsoleCard` ya no se usan.
- **Nombres de clientes inventados** (Andesbank, Vitalis, Nortec, Grupo Araucaria, Cimar) en
  `TrustLogoStrip`. Requieren logos reales y autorización antes de cualquier uso externo.
- **`BlogFilterChip` usa `--text-card-heading-size` (32px)** como tamaño de fuente, así que los
  chips de filtro en `recursos` salen a 32px en vez del tamaño de UI. El canvas los dimensiona a
  32px de **alto**. Es un defecto del componente en el design system; no se parchó aquí para no
  divergir del sistema.

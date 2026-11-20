/* Consenty | consenty.japs.ing
 *
 * Implementation of the "Consenty Web.dc.html" design canvas.
 * Every component comes from the Consenty Design System bundle, read through the
 * window.Consenty alias so this file stays brand-consistent regardless of the
 * compiled namespace. Nothing here draws a brand glyph or invents a token.
 *
 * Copy is Spanish (es-CL); comments and identifiers stay English, per the system readme.
 */

const { useState, useEffect, useMemo, useCallback, useRef, Fragment } = React;

const DS = window.Consenty || {};
const {
  Wordmark, Button, Icon,
  FooterNewsletter,
  BlogFilterChip, ResearchTable, Input,
  CapabilityCard, DarkFeatureBand, ProductCard
} = DS;

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */

const GUTTER = 'clamp(20px,4vw,40px)';
const SHELL = { maxWidth: 1440, margin: '0 auto' };

/** Container at the system's 1440px max with the standard responsive gutters. */
function Shell({ pad = `0 ${GUTTER}`, as: Tag = 'div', style, children }) {
  return <Tag style={{ ...SHELL, padding: pad, ...style }}>{children}</Tag>;
}

/** Uppercase mono marker — the system's only all-caps device. */
function MonoLabel({ tone = 'muted', style, children }) {
  const color = {
    muted: 'var(--text-tertiary)',
    indigo: 'var(--color-indigo)',
    soft: '#a5a8f0',
    warning: 'var(--color-warning)',
    ink: 'var(--color-ink)'
  }[tone];
  return <span className="cns-mono-label" style={{ color, ...style }}>{children}</span>;
}

/** Rule-separated bullet row. `✓` is one of the three allowed unicode marks. */
function CheckRow({ children, last = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 0',
      borderTop: '1px solid var(--border-default)',
      borderBottom: last ? '1px solid var(--border-default)' : undefined,
      fontSize: 16
    }}>
      <span style={{ color: 'var(--color-success)' }}>✓</span>
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Content
 * ------------------------------------------------------------------ */

const DEADLINE = new Date('2026-12-01T00:00:00');

/** /demo/ opens on the interactive product demo; the booking form is its last section. */
const BOOKING = { hash: 'agendar' };

const NAV = [
  ['inicio', 'Inicio'],
  ['plataforma', 'Plataforma'],
  ['modulos', 'Módulos'],
  ['normativa', 'Normativa'],
  ['recursos', 'Recursos'],
  ['implementacion', 'Implementación']
];

const ROUTES = NAV.map(([r]) => r).concat('demo', 'verificacion');

/* Titles, descriptions and paths live in seo.json — build.mjs emits them as seo.js,
   which index.html loads before this file. One table feeds both the served HTML
   and the client-side navigation, so they can never drift apart. */
const SEO = (window.CONSENTY_SEO && window.CONSENTY_SEO.pages) || {};
const SITE = (window.CONSENTY_SEO && window.CONSENTY_SEO.site) || {};

const CLIENT_NAMES = [
  { name: 'Andesbank' },
  { name: 'Vitalis' },
  { name: 'Nortec' },
  { name: 'Grupo Araucaria' },
  {
    name: 'Lumisreg',
    height: 64,
    src: 'https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72tiJzwppdKX__4lX88B3wJ2ohWrdrCRBeN2orTuo5OWH1V3IC4kR44ij_UWjuRTrnpYj6yfVZiwsP2TFMyaHv5ENasCNofPSQFq61QSoAaEXXy1BaLMMKXFfo4hLbuwonhzVrKsJhSz8Y9NPZm9sZ30K81u97o2lo4fx1nnjmKa6pVY9QcWALtcM5gGqXk=w16383'
  },
  { name: 'Cimar' },
  { name: 'JAPS', src: '/assets/partners/japs-wordmark.svg' }
];

const MODULES = [
  {
    name: 'Captura integrada',
    description: 'Conectores y APIs livianas en cada punto donde tu empresa interactúa con las personas.',
    bullets: ['Widget web y centro de preferencias', 'Conectores CRM, e-commerce y offline', 'Sello de tiempo, versión y hash'],
    ctaLabel: 'Ver captura', anchor: 'captura'
  },
  {
    name: 'Panel DPO',
    description: 'Centro de mando para supervisar consentimientos, alertas y solicitudes de titulares.',
    bullets: ['Supervisión de todos los consentimientos', 'Alertas de cambios y plazos', 'Expedientes exportables'],
    ctaLabel: 'Ver panel', anchor: 'panel'
  },
  {
    name: 'Portal de titulares',
    description: 'Autoservicio para ejercer los seis derechos BARCOP sin trámites intermedios.',
    bullets: ['Acceso con RUT y correo', 'Los seis derechos BARCOP', 'Respuestas con trazabilidad'],
    ctaLabel: 'Ver portal', anchor: 'portal'
  }
];

const NORMATIVA_ROWS = [
  { title: 'Ley 21.719 — nuevo marco de protección de datos personales', topics: ['Vigencia'], date: '1 dic 2026' },
  { title: 'Agencia de Protección de Datos Personales (APDP): facultades', topics: ['Fiscalización'], date: '2026' },
  { title: 'Responsabilidad proactiva: qué debes poder demostrar', topics: ['Obligaciones'], date: 'Ago 2026' },
  { title: 'Derechos BARCOP y el plazo de 30 días', topics: ['Derechos'], date: 'Ago 2026' },
  { title: 'Escala de sanciones e infracciones gravísimas', topics: ['Riesgo'], date: 'Ago 2026' }
];

const RECURSOS = [
  { title: 'Checklist: llegar en regla al 1 de diciembre', topics: ['Normativa'], date: 'Ago 2026' },
  { title: 'Cómo reemplazar casillas pre-marcadas sin perder conversión', topics: ['Consentimiento'], date: 'Ago 2026' },
  { title: 'Responder una solicitud BARCOP en menos de 30 días', topics: ['Derechos BARCOP'], date: 'Jul 2026' },
  { title: 'Del Excel al registro único: migrar consentimientos existentes', topics: ['Implementación'], date: 'Jul 2026' },
  { title: 'Qué exige la APDP en un expediente de evidencia', topics: ['Normativa'], date: 'Jun 2026' },
  { title: 'Plantilla de finalidades y bases de licitud para retail', topics: ['Consentimiento'], date: 'Jun 2026' },
  { title: 'Integrar el widget de captura en un checkout en 30 minutos', topics: ['Implementación'], date: 'May 2026' }
];

const RECURSO_FILTERS = ['Todo', 'Normativa', 'Consentimiento', 'Derechos BARCOP', 'Implementación'];

const PILARES = [
  ['01', 'Cumplimiento legal out-of-the-box', 'El motor gestiona todo el ecosistema de derechos ARCOP+ —acceso, rectificación, cancelación, oposición, portabilidad y bloqueo— de forma automatizada. Se encarga de la parte compleja que la ley exige, para que tu empresa cumpla sin volverse experta legal.'],
  ['02', 'Gestión dinámica de datos', 'En lugar de guardar archivos estáticos, el sistema usa registros estructurados en JSON/XML. Eso permite generar comprobantes on-demand al instante, con la certeza de que el documento refleja siempre la realidad del consentimiento en la base de datos.'],
  ['03', 'Accesible para toda empresa', 'Pensado para el universo de empresas que no tienen grandes departamentos de TI. Con widgets simples y APIs livianas, cualquier negocio integra una capa de cumplimiento rápidamente.']
];

const RIESGOS = [
  ['Infracción gravísima', '20.000 UTM', 'Hasta ~$1.400 millones CLP por infracción, más daño reputacional directo.'],
  ['Reincidencia', '4% de los ingresos', 'Hasta 4% de los ingresos anuales por ventas, o multa triplicada.'],
  ['Medida accesoria', '30 días de suspensión', 'Suspensión de las operaciones de tratamiento de datos.'],
  ['Registro público', 'Registro de sancionados', 'Inscripción en el Registro Nacional de Sanciones de la APDP, afectando la confianza comercial.']
];

const SEMANAS = [
  ['Semana 1', 'Diagnóstico', 'Mapeo de los puntos de captura de datos existentes y de las bases de licitud vigentes.', 'Entregable: inventario de puntos de captura y brechas priorizadas.'],
  ['Semana 2', 'Configuración', 'Setup de Consenty, finalidades, versiones de términos y reglas de consentimiento.', 'Entregable: ambiente configurado y textos de consentimiento aprobados por legal.'],
  ['Semana 3', 'Integración', 'Conexión vía API y webhooks en los sistemas del cliente: web, e-commerce, CRM.', 'Entregable: capturas en producción con sello de tiempo y hash de evidencia.'],
  ['Semana 4', 'Despliegue', 'Portal BARCOP activo para titulares y capacitación al DPO o equipo legal.', 'Entregable: portal público, panel DPO operativo y primer expediente exportado.']
];

/* The booking form. `name` is the key the app's API expects
   (POST /api/public/demo-requests); `max` mirrors its limits so a visitor is
   stopped by the field, not by a rejected submission. */
const DEMO_FIELDS = [
  { name: 'contact_name', label: 'Nombre', required: true, max: 255, autoComplete: 'name' },
  { name: 'company_name', label: 'Empresa', required: true, max: 255, autoComplete: 'organization' },
  { name: 'contact_email', label: 'Correo corporativo', type: 'email', required: true, max: 254, autoComplete: 'email' },
  { name: 'job_title', label: 'Cargo', max: 120, autoComplete: 'organization-title' },
  { name: 'capture_channels', label: '¿Dónde capturas datos hoy?', as: 'textarea', full: true, max: 1000, placeholder: 'Web, e-commerce, sucursal, call center…' }
];

const FOOTER_COLUMNS = [
  ['Plataforma', [
    ['Captura integrada', 'modulos'],
    ['Panel DPO', 'modulos'],
    ['Portal de titulares', 'modulos'],
    ['Evidencia y auditoría', 'plataforma']
  ]],
  ['Industrias', [
    ['Retail y e-commerce', null],
    ['Banca y seguros', null],
    ['Salud', null],
    ['Educación', null]
  ]],
  ['Recursos', [
    ['Guías y checklists', 'recursos'],
    ['Normativa', 'normativa'],
    ['Implementación', 'implementacion'],
    ['Verificación de formularios', 'verificacion']
  ]],
  ['Empresa', [
    ['Nosotros', null],
    ['Seguridad', null],
    ['Contacto', 'demo', BOOKING],
    ['Estado del servicio', null]
  ]]
];

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */

/** Path for a route: 'inicio' is the site root, everything else a real directory.
 *  `target` adds a query string (`search`) and an in-page anchor (`hash`). */
function hrefFor(route, target) {
  const base = route === 'inicio' ? '/' : '/' + route + '/';
  if (!target) return base;
  return base + (target.search ? '?' + target.search : '') + (target.hash ? '#' + target.hash : '');
}

function readRoute() {
  const slug = (window.location.pathname || '/').replace(/^\/+|\/+$/g, '');
  if (!slug) return 'inicio';
  return ROUTES.indexOf(slug) !== -1 ? slug : 'inicio';
}

/* Links shared before the move to real paths still point at #/plataforma.
   Rewrite them in place — replace(), not assign(), so the old URL leaves history. */
(function redirectLegacyHash() {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  if (raw && ROUTES.indexOf(raw) !== -1) window.location.replace(hrefFor(raw));
})();

/** Keeps the served <head> and the client-side navigation showing the same metadata. */
function syncHead(route) {
  const page = SEO[route];
  if (!page) return;
  const origin = SITE.origin || window.location.origin;
  const url = origin + page.path;

  document.title = page.title;

  const set = (selector, attr, value) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', page.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:title"]', 'content', page.title);
  set('meta[property="og:description"]', 'content', page.description);
  set('meta[name="twitter:title"]', 'content', page.title);
  set('meta[name="twitter:description"]', 'content', page.description);
}

function readLocation() {
  return {
    route: readRoute(),
    search: window.location.search.replace(/^\?/, ''),
    hash: window.location.hash.replace(/^#/, '')
  };
}

/** History routing: one indexable URL per screen, working back button, deep links.
 *  `place.visit` changes on every navigation, including one that stays on the same
 *  screen and only moves to another anchor or query. */
function useRoute() {
  const [place, setPlace] = useState(() => ({ ...readLocation(), visit: 0 }));

  useEffect(() => {
    const onPop = () => setPlace((p) => ({ ...readLocation(), visit: p.visit + 1 }));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => { syncHead(place.route); }, [place.route]);

  useEffect(() => {
    // An anchor lands on its element (sections keep clear of the sticky header
    // through scroll-margin-top); anything else starts at the top.
    const anchor = place.hash && document.getElementById(place.hash);
    if (anchor) anchor.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [place.route, place.hash, place.visit]);

  const navigate = useCallback((next, target) => {
    const href = hrefFor(next, target);
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (href !== current) window.history.pushState(null, '', href);
    setPlace((p) => ({ ...readLocation(), visit: p.visit + 1 }));
  }, []);

  return [place, navigate];
}

function isPlainClick(e) {
  return !(e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
}

/* Intercept only the clicks the browser would handle as same-tab navigation.
   Ctrl/cmd/shift-click and middle-click fall through to the real href, which is
   also what a crawler follows. */
function navLinkProps(route, navigate, target) {
  return {
    href: hrefFor(route, target),
    onClick: (e) => {
      if (!isPlainClick(e)) return;
      e.preventDefault();
      navigate(route, target);
    }
  };
}

/* Design-system components that render their own <a> (ProductCard,
   CapabilityCard, ResearchTable) take an href but no click handler. One
   delegated listener turns any same-site link they render into client-side
   navigation, so they behave like every other link on the page. */
function routeLinkHandler(navigate) {
  return (e) => {
    if (!isPlainClick(e)) return;
    const anchor = e.target.closest && e.target.closest('a[href]');
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const slug = url.pathname.replace(/^\/+|\/+$/g, '');
    const route = slug === '' ? 'inicio' : slug;
    if (ROUTES.indexOf(route) === -1 || url.pathname !== hrefFor(route)) return;
    e.preventDefault();
    navigate(route, { search: url.search.replace(/^\?/, ''), hash: url.hash.replace(/^#/, '') });
  };
}

function useViewportHeight() {
  const [h, setH] = useState(() => window.innerHeight);
  useEffect(() => {
    const onResize = () => setH(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return h;
}

function useViewportWidth() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

const preventDefault = (e) => e.preventDefault();
const LOGIN_URL = 'https://app.consenty.japs.ing/login';

/* Where the booking form is sent: the app's public API. A local copy of the
   site posts to its own origin instead, where dev-server.mjs forwards /api to a
   local backend, so trying the form never writes to production. */
const API_ORIGIN = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
  ? ''
  : 'https://app.consenty.japs.ing';

/* ------------------------------------------------------------------ *
 * Chrome — announcement bar, nav, footer
 * ------------------------------------------------------------------ */

const BAR_KEY = 'consenty:deadline-bar-dismissed';
const pad2 = (n) => String(n).padStart(2, '0');

/** Ticks every second until DEADLINE; never goes negative. */
function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target - new Date()));

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, target - new Date())), 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

/** The one urgency device in the system. Dismissed for the rest of the session. */
function DeadlineBar({ onNavigate }) {
  const [visible, setVisible] = useState(() => {
    try { return window.sessionStorage.getItem(BAR_KEY) !== '1'; } catch (e) { return true; }
  });
  const { days, hours, minutes, seconds } = useCountdown(DEADLINE);

  const dismiss = () => {
    setVisible(false);
    try { window.sessionStorage.setItem(BAR_KEY, '1'); } catch (e) { /* private mode */ }
  };

  if (!visible) return null;

  return (
    <div style={{ background: 'var(--surface-alert)', borderBottom: '1px solid var(--color-coral)' }}>
      <div style={{
        ...SHELL, position: 'relative', padding: '8px clamp(44px,8vw,64px)', minHeight: 36,
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px 14px'
      }}>
        <MonoLabel tone="ink" style={{ fontSize: 12 }}>1 dic 2026</MonoLabel>
        <span style={{ fontSize: 13.5, lineHeight: 1.35, color: 'var(--color-ink)', textWrap: 'pretty' }}>
          La Ley 21.719 de protección de datos personales entra en vigencia el 1 de diciembre.
        </span>
        <span
          role="timer"
          aria-label={`Quedan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`}
          style={{
            display: 'inline-flex', alignItems: 'baseline', gap: '.5em', whiteSpace: 'nowrap',
            background: 'var(--color-coral)', color: '#fff', padding: '3px 10px',
            borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-mono)',
            fontSize: 12.5, fontWeight: 600, letterSpacing: '.01em', fontVariantNumeric: 'tabular-nums'
          }}
        >
          <span>{days}d</span>
          <span>{pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}</span>
        </span>
        <a
          {...navLinkProps('normativa', onNavigate)}
          style={{ fontSize: 13.5, color: 'var(--color-ink)', textUnderlineOffset: 3, whiteSpace: 'nowrap' }}
        >
          Ver checklist
        </a>
        <button
          onClick={dismiss}
          aria-label="Cerrar el aviso de vigencia"
          style={{
            position: 'absolute', top: 6, right: 'clamp(14px,3vw,40px)', background: 'none', border: 0,
            cursor: 'pointer', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1
          }}
        >×</button>
      </div>
    </div>
  );
}

function SiteHeader({ route, navigate, mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // A viewport that grows past the breakpoint must not leave the panel orphaned.
  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);
  useEffect(() => { setMenuOpen(false); }, [route]);

  const linkColor = (r) => (route === r ? 'var(--color-ink)' : 'var(--text-secondary)');

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface-page)' }}>
      <DeadlineBar onNavigate={navigate} />

      <div style={{ borderBottom: '1px solid var(--border-utility)' }}>
        <div style={{
          ...SHELL, padding: `0 ${GUTTER}`, height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16
        }}>
          <a
            data-plain {...navLinkProps('inicio', navigate)}
            aria-label="Consenty | ir al inicio"
            style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}
          >
            <Wordmark size={mobile ? 20 : 22} />
          </a>

          {!mobile && (
            <Fragment>
              <nav
                aria-label="Principal"
                style={{ display: 'flex', gap: 'clamp(16px,2.2vw,32px)', minWidth: 0, whiteSpace: 'nowrap' }}
              >
                {NAV.map(([r, label]) => (
                  <a
                    key={r} data-plain {...navLinkProps(r, navigate)}
                    aria-current={route === r ? 'page' : undefined}
                    style={{ fontSize: 14, color: linkColor(r), transition: 'var(--transition-color)' }}
                  >{label}</a>
                ))}
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                <a href={LOGIN_URL} data-plain style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Ingresar
                </a>
                <Button variant="primary" size="sm" onClick={() => navigate('demo', BOOKING)}>Agendar demo</Button>
              </div>
            </Fragment>
          )}

          {mobile && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menú" aria-expanded={menuOpen} aria-controls="menu-movil"
              style={{
                flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5,
                width: 44, height: 44, padding: '0 10px', background: 'none',
                border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-sm)', cursor: 'pointer'
              }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: 'block', height: 1.5, background: 'var(--color-ink)', borderRadius: 2 }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {mobile && menuOpen && (
        <div id="menu-movil" style={{ borderBottom: '1px solid var(--border-utility)', background: 'var(--surface-page)' }}>
          <div style={{ padding: `8px ${GUTTER} 24px`, display: 'grid', gap: 0 }}>
            {NAV.map(([r, label]) => (
              <a
                key={r} data-plain {...navLinkProps(r, navigate)}
                aria-current={route === r ? 'page' : undefined}
                style={{ fontSize: 17, color: 'var(--color-ink)', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}
              >{label}</a>
            ))}
            <a href={LOGIN_URL} data-plain
              style={{ fontSize: 17, color: 'var(--text-secondary)', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              Ingresar
            </a>
            <div style={{ marginTop: 20 }}>
              <Button variant="primary" onClick={() => navigate('demo', BOOKING)}>Agendar demo</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SiteFooter({ navigate }) {
  return (
    <footer style={{ background: 'var(--surface-inverse)', color: 'var(--color-on-dark)' }}>
      <div style={{
        ...SHELL, padding: `clamp(48px,7vw,80px) ${GUTTER}`,
        display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,64px)'
      }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <FooterNewsletter
            headline="Novedades y plazos, una vez al mes"
            legal="Al enviar este formulario aceptas recibir correos de Consenty. Puedes darte de baja cuando quieras."
          />
        </div>
        <div style={{
          flex: '2 1 480px', minWidth: 0, display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(50%,150px),1fr))', gap: 'clamp(28px,3vw,32px)'
        }}>
          {FOOTER_COLUMNS.map(([heading, links]) => (
            <div key={heading} style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
              <span style={{ fontSize: 14 }}>{heading}</span>
              {links.map(([label, target, place]) => (
                <a
                  key={label} data-plain
                  {...(target ? navLinkProps(target, navigate, place) : { href: '#', onClick: preventDefault })}
                  style={{ color: 'var(--text-muted)', fontSize: 13 }}
                >{label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-on-dark)' }}>
        <div style={{
          ...SHELL, padding: `24px ${GUTTER}`, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', gap: '12px 24px', color: 'var(--text-muted)', fontSize: 12
        }}>
          <span>© 2026 Consenty SpA · Santiago de Chile</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#" data-plain onClick={preventDefault} aria-label="LinkedIn de Consenty"
              style={{ color: 'inherit', display: 'flex', alignItems: 'center', opacity: .72 }}
            >
              <Icon name="linkedin" size={18} tone="light" />
            </a>
            <a
              href="#" data-plain onClick={preventDefault} aria-label="Escribir a Consenty por correo"
              style={{ color: 'inherit', display: 'flex', alignItems: 'center', opacity: .72 }}
            >
              <Icon name="mail" size={18} tone="light" />
            </a>
          </span>
          <span style={{ display: 'flex', gap: 24 }}>
            <a href="#" data-plain onClick={preventDefault} style={{ color: 'inherit' }}>Privacidad</a>
            <a href="#" data-plain onClick={preventDefault} style={{ color: 'inherit' }}>Términos</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ *
 * The product, live
 *
 * Every picture of Consenty on this site is Consenty itself: the real
 * dashboard, portal and widget, built from the app's own source into
 * /app-demo/ and framed here. It runs against a simulated API inside the
 * visitor's browser, with fictional data, and sends nothing anywhere
 * (consenty_app/docs/architecture/demo-embebible.md has the contract).
 * ------------------------------------------------------------------ */

const APP_DEMO = '/app-demo/';
const DEMO_SOURCE = 'consenty-demo';
const APP_HOST = 'app.consenty.japs.ing';
const SHOP_HOST = 'tiendaalba.example';

/* Stills captured from the same build (scripts/capture-posters.mjs), shown
   until the live screen is ready. Only frames with a fixed desktop size have one. */
const POSTERS = [
  'empresa-panel-full', 'empresa-ledger-verificado-full', 'empresa-ledger-verificado-content',
  'empresa-datos-content', 'empresa-solicitud-detalle-content', 'empresa-ficha-content',
  'empresa-integracion-instalacion-content'
];

let frameCounter = 0;

/** A stable id per mounted frame: the demo echoes it in every message. */
function useFrameId(preferred) {
  const ref = useRef(null);
  if (ref.current === null) {
    frameCounter += 1;
    ref.current = preferred || 'marco-' + frameCounter;
  }
  return ref.current;
}

function demoUrl(scene, frame, options) {
  const query = new URLSearchParams({ scene, frame });
  for (const key of ['chrome', 'latency', 'turnstile', 'requires', 'still']) {
    if (options[key]) query.set(key, options[key]);
  }
  if (options.reset) query.set('reset', '1');
  return APP_DEMO + '?' + query.toString();
}

/** Width of an element, tracked across resizes. */
function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () => setWidth(node.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

/** True while the element is on screen or about to be. */
function useNearViewport(margin) {
  const ref = useRef(null);
  const [near, setNear] = useState(typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries[entries.length - 1].isIntersecting),
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);
  return [ref, near];
}

/**
 * One screen of the real app in a flat card.
 *
 * Console screens are laid out at a desktop size and scaled to the card, so a
 * dashboard reads as a dashboard at any column width; once the card is too
 * narrow for that to stay legible, the frame takes its natural width and the
 * app shows its own phone layout. `fluid` screens (the shop page, the portal)
 * always use their natural width.
 *
 * A showcase frame is a live picture: it renders the app but takes no input,
 * so scrolling the page never gets trapped inside it. Only `interactive`
 * frames can be used, and those stay mounted once loaded.
 */
function AppFrame({
  scene, label, address,
  interactive = false, fluid = false, eager = false,
  chrome = 'full', turnstile, reset = false, requires,
  width = 1280, height = 800, naturalHeight = 620, fitHeight, autoHeight = false,
  frameId, onMessage, apiRef, tone = 'light', style
}) {
  const id = useFrameId(frameId);
  const [sizeRef, cardWidth] = useElementWidth();
  const [nearRef, near] = useNearViewport(interactive ? '600px' : '350px');
  const iframeRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [everNear, setEverNear] = useState(eager);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => { if (near) setEverNear(true); }, [near]);
  // A showcase frame far off screen gives its memory back; an interactive one
  // holds what the visitor did in it.
  const mounted = interactive ? everNear : (eager ? everNear : near);
  useEffect(() => { if (!mounted) setReady(false); }, [mounted]);

  const handlerRef = useRef(onMessage);
  handlerRef.current = onMessage;

  useEffect(() => {
    const onWindowMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.source !== DEMO_SOURCE || data.frame !== id) return;
      if (data.type === 'ready') setReady(true);
      // A single component reports how tall it is; the card takes that height.
      if (data.type === 'resize' && autoHeight && data.payload && data.payload.height > 0) {
        setContentHeight(Math.min(data.payload.height, 900));
      }
      if (handlerRef.current) handlerRef.current(data.type, data.payload || {});
    };
    window.addEventListener('message', onWindowMessage);
    return () => window.removeEventListener('message', onWindowMessage);
  }, [id, autoHeight]);

  useEffect(() => {
    if (!apiRef) return undefined;
    apiRef.current = {
      send: (type, payload) => {
        const target = iframeRef.current && iframeRef.current.contentWindow;
        if (target) {
          target.postMessage({ target: DEMO_SOURCE, v: 1, frame: id, type, payload }, window.location.origin);
        }
      }
    };
    return () => { apiRef.current = null; };
  }, [apiRef, id]);

  const natural = fluid || (cardWidth > 0 && cardWidth < 640);
  const scale = natural || cardWidth === 0 ? 1 : cardWidth / width;
  // `fitHeight` pins the card's height (two frames side by side must line up);
  // the app is then given however many logical pixels fill it at this scale.
  const logicalHeight = fitHeight && !natural ? Math.round(fitHeight / scale) : height;
  const boxHeight = natural
    ? (fitHeight || (autoHeight && contentHeight) || naturalHeight)
    : Math.round(logicalHeight * scale);
  // The address is fixed when the frame mounts. Changing an iframe's src
  // navigates it and adds an entry to the tab's history; a different screen is
  // a new frame (a new `key`) or a command sent to the one that is there.
  const [src] = useState(() => demoUrl(scene, id, {
    chrome, turnstile, reset, requires,
    // A frame that is only looked at loads quickly and shows no scrollbars.
    latency: interactive ? null : 'fast', still: interactive ? null : '1'
  }));
  const dark = tone === 'dark';
  const posterKey = scene + '-' + chrome;
  const poster = !natural && !interactive && POSTERS.indexOf(posterKey) !== -1
    ? '/assets/app/' + posterKey + '.webp'
    : null;

  return (
    <figure
      ref={nearRef} data-ui
      style={{
        margin: 0, minWidth: 0, overflow: 'hidden',
        border: `1px solid ${dark ? 'var(--border-on-dark)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)', ...style
      }}
    >
      {address && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          minHeight: 40, padding: '8px 16px',
          borderBottom: '1px solid var(--border-utility)', background: 'var(--surface-card-stone)'
        }}>
          <span style={{
            minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)'
          }}>{address}</span>
          <span style={{ flex: '0 0 auto', fontSize: 13, color: 'var(--text-secondary)' }}>
            {interactive ? 'En vivo · datos ficticios' : 'Datos ficticios'}
          </span>
        </div>
      )}
      <div ref={sizeRef} style={{ position: 'relative', height: boxHeight, background: 'var(--surface-card)' }}>
        {!ready && !poster && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            background: 'var(--surface-wash-mist)', color: 'var(--text-tertiary)', fontSize: 14
          }}>
            Abriendo Consenty…
          </div>
        )}
        {!ready && poster && (
          <img
            src={poster} alt="" decoding="async"
            loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : undefined}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none',
              objectFit: 'cover', objectPosition: 'left top'
            }}
          />
        )}
        {mounted && (
          <iframe
            ref={iframeRef}
            src={src}
            title={label}
            loading={eager ? undefined : 'lazy'}
            tabIndex={interactive ? undefined : -1}
            aria-hidden={interactive ? undefined : 'true'}
            {...(interactive ? {} : { inert: '' })}
            style={{
              position: 'absolute', top: 0, left: 0, border: 0, display: 'block',
              width: natural ? '100%' : width, height: natural ? '100%' : logicalHeight,
              transform: natural ? undefined : `scale(${scale})`, transformOrigin: '0 0',
              opacity: ready ? 1 : 0, transition: 'opacity var(--duration-slow) var(--ease-standard)',
              pointerEvents: interactive ? undefined : 'none'
            }}
          />
        )}
      </div>
      {!interactive && <figcaption className="cns-visually-hidden">{label}</figcaption>}
    </figure>
  );
}

/* The product's flow, start to finish. Each step names whose screen it is and
   which real screen shows it; the home page walks through them and /demo/
   lets the visitor do them. */
const FLOW = [
  {
    key: 'configura', icon: 'list-checks', short: 'Configurar', side: 'Tu empresa',
    title: 'Declaras qué datos usas y para qué',
    body: 'Cada permiso lleva su base legal, su plazo y un texto versionado. Lo que tu cliente verá sale de aquí.',
    scene: 'empresa-datos', address: APP_HOST + '/dashboard/tienda-alba/data-types'
  },
  {
    key: 'captura', icon: 'mouse-pointer-click', short: 'Capturar', side: 'Tu cliente',
    title: 'Tu cliente decide en tu propio formulario',
    body: 'El widget verifica su correo con un código y pide cada permiso por separado. Nada viene marcado.',
    // The widget open on its permissions, none of them decided yet.
    scene: 'titular-widget-permisos', address: SHOP_HOST + '/cotizar', fluid: true, tall: 720
  },
  {
    key: 'evidencia', icon: 'link', short: 'Evidencia', side: 'Tu empresa',
    title: 'Cada decisión queda encadenada en el ledger',
    body: 'Sello de tiempo, versión del texto y hash enlazado al anterior. La integridad se comprueba con un clic.',
    scene: 'empresa-ledger-verificado', address: APP_HOST + '/dashboard/tienda-alba/ledger'
  },
  {
    key: 'portal', icon: 'undo-2', short: 'Revocar', side: 'Tu cliente',
    title: 'Puede revocar cuando quiera, sin llamarte',
    body: 'En su portal ve qué autorizó, hasta cuándo, y lo cambia. La revocación llega a tu panel al instante.',
    scene: 'titular-portal', address: APP_HOST + '/portal/consentimientos', fluid: true
  },
  {
    key: 'derechos', icon: 'clock', short: 'Responder', side: 'Tu empresa',
    title: 'Respondes cada solicitud dentro del plazo',
    body: 'Las solicitudes de derechos llegan con folio, acuse y vencimiento a 30 días. La respuesta emite su documento.',
    scene: 'empresa-solicitud-detalle', address: APP_HOST + '/dashboard/tienda-alba/rights-requests'
  }
];

/** Arrow keys move between tabs, as the tabs pattern expects. */
function tabKeyHandler(count, current, select) {
  return (e) => {
    const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!move) return;
    e.preventDefault();
    const next = (current + move + count) % count;
    select(next);
    const tabs = e.currentTarget.parentNode.querySelectorAll('[role="tab"]');
    if (tabs[next]) tabs[next].focus();
  };
}

/** A list of steps beside the real screen each one produces. `items` follow
 *  the shape of FLOW; `cta` builds the action under the list for the step shown. */
function ScreenTour({ items, name, mobile, cta }) {
  const [index, setIndex] = useState(0);
  const step = items[index];

  return (
    <div style={{
      display: 'grid', gap: 'clamp(28px,4vw,56px)', alignItems: 'start',
      gridTemplateColumns: mobile ? '1fr' : 'minmax(300px,5fr) 8fr'
    }}>
      <div>
        <div role="tablist" aria-label={name} aria-orientation={mobile ? 'horizontal' : 'vertical'}
          className={mobile ? 'cns-flow-tabs cns-flow-tabs--row' : 'cns-flow-tabs'}>
          {items.map((item, i) => {
            const selected = i === index;
            return (
              <button
                key={item.key} role="tab" type="button"
                id={'tour-tab-' + item.key} aria-selected={selected} aria-controls={'tour-panel-' + items[0].key}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={tabKeyHandler(items.length, index, setIndex)}
                className="cns-flow-tab"
              >
                {item.icon && (
                  <span className="cns-flow-tab__icon">
                    <Icon name={item.icon} size={mobile ? 18 : 20} tone={selected ? 'dark' : 'muted'} />
                  </span>
                )}
                <span className="cns-flow-tab__text">
                  {!mobile && <span className="cns-flow-tab__side">{item.side}</span>}
                  <span className="cns-flow-tab__title">{mobile ? item.short : item.title}</span>
                  {selected && !mobile && <span className="cns-flow-tab__body">{item.body}</span>}
                </span>
              </button>
            );
          })}
        </div>
        {mobile && (
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{step.side}</span>
            <h3 className="cns-feature-heading" style={{ margin: '6px 0 0', textWrap: 'balance' }}>{step.title}</h3>
            <p className="cns-body" style={{ margin: '10px 0 0', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
              {step.body}
            </p>
          </div>
        )}
        {cta && <div style={{ marginTop: 'clamp(24px,3vw,36px)' }}>{cta(step)}</div>}
      </div>
      <div
        id={'tour-panel-' + items[0].key} role="tabpanel" aria-labelledby={'tour-tab-' + step.key}
        style={{ minWidth: 0 }}
      >
        <AppFrame
          key={step.key}
          scene={step.scene} label={step.side + ': ' + step.title} address={step.address}
          fluid={Boolean(step.fluid)} naturalHeight={step.tall || (step.fluid ? 640 : 600)}
          chrome={step.fluid ? 'full' : 'content'} width={1040} height={760}
        />
      </div>
    </div>
  );
}

/** Words on one side, the screen they describe on the other. */
function ProductSplit({ id, eyebrow, heading, body, children, frame, reverse = false, mobile, level = 2 }) {
  const Heading = 'h' + level;
  const text = (
    <div style={{ minWidth: 0 }}>
      {eyebrow && <MonoLabel tone="indigo">{eyebrow}</MonoLabel>}
      <Heading className="cns-card-heading" style={{
        margin: eyebrow ? '16px 0 0' : 0, maxWidth: '20ch',
        fontSize: 'clamp(26px,3.2vw,40px)', letterSpacing: '-0.02em', textWrap: 'balance'
      }}>{heading}</Heading>
      {body && (
        <p className="cns-body-large" style={{
          margin: '20px 0 0', maxWidth: '52ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.5vw,18px)', textWrap: 'pretty'
        }}>{body}</p>
      )}
      {children}
    </div>
  );
  const picture = <div style={{ minWidth: 0 }}>{frame}</div>;
  return (
    <div id={id} style={{
      display: 'grid', gap: 'clamp(28px,4vw,64px)', alignItems: 'center',
      gridTemplateColumns: mobile ? '1fr' : (reverse ? '7fr 5fr' : '5fr 7fr')
    }}>
      {reverse && !mobile ? picture : text}
      {reverse && !mobile ? text : picture}
    </div>
  );
}

/** A plain text link into the demo, opened on the step that shows the thing. */
function DemoLink({ navigate, step, children }) {
  return (
    <a {...navLinkProps('demo', navigate, { search: 'paso=' + step })} style={{
      display: 'inline-block', marginTop: 24, fontSize: 16, color: 'var(--text-link)', textUnderlineOffset: 3
    }}>{children}</a>
  );
}

/**
 * The e-mail a live widget "sent", as the notification it would be on the
 * visitor's own screen: it slides in over the page, carries the code large
 * enough to read at a glance, and stays until the code is used or it is closed.
 * Nothing is actually mailed; the code comes from the demo's own bridge.
 */
function MailToast({ mail }) {
  const [closed, setClosed] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setCopied(false); }, [mail]);
  if (!mail || closed === mail) return null;

  const copy = () => {
    try { navigator.clipboard.writeText(mail.code).catch(() => {}); } catch (e) { /* unavailable */ }
    setCopied(true);
  };

  return (
    <div className="cns-mail-toast" role="status" aria-live="polite">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="mail" size={16} tone="light" />
        <span style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,.72)' }}>Correo nuevo · simulado</span>
        <button
          type="button" onClick={() => setClosed(mail)} aria-label="Cerrar la notificación"
          className="cns-mail-toast__close"
        >×</button>
      </div>
      <div style={{ marginTop: 12, fontSize: 15 }}>Tu código de verificación de Consenty</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', marginTop: 8 }}>
        <strong className="cns-mail-toast__code">{mail.code}</strong>
        <button type="button" onClick={copy} className="cns-mail-toast__copy">
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.4, color: 'rgba(255,255,255,.72)' }}>
        Para {mail.email}. En producción llega al correo del titular; aquí no se envía nada.
      </div>
    </div>
  );
}

/** The one-time code a live widget "sent", shown where the visitor can read it. */
function useSimulatedMail() {
  const [mail, setMail] = useState(null);
  const onMessage = useCallback((type, payload) => {
    if (type === 'otp-sent') setMail(payload);
    if (type === 'otp-verified') setMail(null);
  }, []);
  return [mail, onMessage];
}

/**
 * Both sides of the product in one picture: a console screen, and beside it the
 * widget a customer sees, usable. They run on the same simulated state, so a
 * permission saved in the widget shows up in the console while you watch.
 */
function LiveHero({ scene, label, address, mobile }) {
  const [mail, onWidgetMessage] = useSimulatedMail();
  const height = mobile ? 560 : 600;
  const columns = mobile ? '1fr' : 'minmax(0,1fr) minmax(340px,400px)';

  return (
    <div>
      <MailToast mail={mail} />
      <div style={{ display: 'grid', gap: 'clamp(16px,2vw,24px)', alignItems: 'start', gridTemplateColumns: columns }}>
        <AppFrame eager scene={scene} label={label} address={address} fitHeight={height} />
        <AppFrame
          interactive fluid eager scene="titular-widget-autonomo"
          label="El widget de Consenty en el sitio de una tienda de ejemplo"
          address={SHOP_HOST + '/privacidad'} fitHeight={height} onMessage={onWidgetMessage}
        />
      </div>
      <div style={{
        display: 'grid', gap: '8px clamp(16px,2vw,24px)', gridTemplateColumns: columns,
        marginTop: 14, fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)'
      }}>
        <span style={{ textWrap: 'pretty' }}>
          Es la aplicación real, funcionando en tu navegador con una empresa ficticia.
        </span>
        <span style={{ textWrap: 'pretty' }}>
          {mail ? (
            <Fragment>
              Te llegó una notificación con el código:{' '}
              <strong style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em', color: 'var(--color-ink)' }}>
                {mail.code}
              </strong>
            </Fragment>
          ) : 'Prueba el widget con el RUT 12.345.678-5 y cualquier correo. El código llega como notificación.'}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shared marketing blocks
 * ------------------------------------------------------------------ */

/** DarkFeatureBand sets its heading at a fixed display size; on a phone that
 *  wraps to four lines. The same words, sized to the viewport. */
function bandHeading(text) {
  return <span style={{ display: 'block', fontSize: 'clamp(32px,5.6vw,60px)', textWrap: 'balance' }}>{text}</span>;
}

function useBandActions(navigate) {
  return (
    <Fragment>
      <Button variant="primary-inverse" onClick={() => navigate('demo', BOOKING)}>Agendar demo</Button>
      <a
        data-plain {...navLinkProps('implementacion', navigate)}
        style={{ color: 'var(--color-on-dark)', fontSize: 16 }}
      >Ver la implementación</a>
    </Fragment>
  );
}

function ModuleGrid() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24
    }}>
      {MODULES.map((m) => (
        <ProductCard
          key={m.name}
          name={m.name}
          description={m.description}
          bullets={m.bullets}
          ctaLabel={m.ctaLabel}
          href={hrefFor('modulos', { hash: m.anchor })}
        />
      ))}
    </div>
  );
}

/** One mark inside the marquee: a real logo image when `src` is set, otherwise
 *  the plain-text fallback TrustLogoStrip used (no artwork for the invented names). */
function LogoMarqueeCell({ item, decorative }) {
  // A logo hosted elsewhere can stop loading (a host that refuses hotlinks, a
  // moved file). The name in text is the same mark the cells without artwork
  // already use, and better than a broken-image icon in the strip.
  const [failed, setFailed] = useState(false);
  return (
    <span className="cns-logo-cell" aria-hidden={decorative ? 'true' : undefined}>
      {item.src && !failed
        ? <img
            src={item.src} alt={item.name} className="cns-logo-cell__img"
            style={item.height ? { height: item.height } : undefined}
            onError={() => setFailed(true)}
          />
        : item.name}
    </span>
  );
}

/** Eyebrow + infinite horizontal marquee of names/logos — same mechanism as the
 *  LogoWall on the japs.ing landing (japs/landing_v3): a duplicated flex
 *  track animated -50%, so the loop's seam is invisible, paused on
 *  hover/focus. */
function LogoMarquee({ eyebrow, items }) {
  return (
    <div style={{ textAlign: 'center', padding: 'clamp(48px,7vw,80px) 0' }}>
      {eyebrow && (
        <p className="cns-body-large" style={{ margin: '0 0 40px', color: 'var(--color-ink)' }}>
          {eyebrow}
        </p>
      )}
      <div className="cns-logo-marquee">
        <div className="cns-logo-track">
          {items.map((item) => <LogoMarqueeCell key={item.name} item={item} />)}
          {/* Second, aria-hidden copy closes the -50% loop seam; decorative, never a link. */}
          {items.map((item) => <LogoMarqueeCell key={`dup-${item.name}`} item={item} decorative />)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Inicio
 * ------------------------------------------------------------------ */

function HomeScreen({ navigate, daysLeft, mobile }) {
  const bandActions = useBandActions(navigate);

  return (
    <main id="contenido">
      <Shell pad={`clamp(56px,9vw,120px) ${GUTTER} 0`} style={{ textAlign: 'center' }}>
        <h1 className="cns-hero-display" style={{
          margin: '0 auto', maxWidth: '16ch', fontSize: 'clamp(38px,8.2vw,96px)',
          letterSpacing: '-0.035em', textWrap: 'balance'
        }}>
          Consentimiento a prueba de auditoría
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px auto 0', maxWidth: '60ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Captura, prueba y audita el consentimiento de tus clientes desde un solo lugar — sin frenar al
          negocio. Trazabilidad auditable en tiempo real para un proceso que la ley exige.
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
          gap: '20px 32px', marginTop: 40
        }}>
          <Button variant="primary" onClick={() => navigate('demo')}>Probar la demo</Button>
          <Button variant="secondary" onClick={() => navigate('demo', BOOKING)}>Agendar una reunión</Button>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
          gap: '8px 24px', marginTop: 32, fontSize: 14, color: 'var(--text-tertiary)'
        }}>
          <span>Quedan {daysLeft} días para el 1 de diciembre</span>
          <span style={{ color: 'var(--border-default)' }}>·</span>
          <span>Implementación en 4 semanas</span>
          <span style={{ color: 'var(--border-default)' }}>·</span>
          <span>Derechos BARCOP completos</span>
        </div>
      </Shell>

      {/* The hero picture is the product: the console a DPO opens every morning,
          and the widget that fills it. */}
      <Shell pad={`clamp(40px,7vw,80px) ${GUTTER} 0`}>
        <LiveHero
          mobile={mobile} scene="empresa-panel"
          label="Panel de control de Consenty con los consentimientos de una empresa de ejemplo"
          address={APP_HOST + '/dashboard/tienda-alba'}
        />
      </Shell>

      <Shell>
        <LogoMarquee
          eyebrow="Organizaciones que están preparando su cumplimiento con Consenty (nombres de referencia)"
          items={CLIENT_NAMES}
        />
      </Shell>

      <Shell pad={`0 ${GUTTER} clamp(64px,9vw,120px)`}>
        <h2 className="cns-section-heading" style={{
          margin: 0, maxWidth: '22ch',
          fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em', textWrap: 'balance'
        }}>
          Del formulario al expediente, en cinco pasos
        </h2>
        <p className="cns-body-large" style={{
          margin: '20px 0 clamp(32px,5vw,56px)', maxWidth: '58ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Lo que configura tu empresa, lo que ve tu cliente y lo que queda como prueba. Cada pantalla es
          la del producto.
        </p>
        <ScreenTour
          items={FLOW} name="Pasos del flujo" mobile={mobile}
          cta={(step) => (
            <Button
              variant="secondary"
              onClick={() => navigate('demo', { search: 'paso=' + (step.key === 'configura' ? 'captura' : step.key) })}
            >Hacer este paso en la demo</Button>
          )}
        />
      </Shell>

      <Shell pad={`0 ${GUTTER} clamp(64px,9vw,120px)`}>
        <h2 className="cns-section-heading" style={{
          margin: '0 0 clamp(32px,5vw,56px)', maxWidth: '24ch',
          fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em', textWrap: 'balance'
        }}>
          Cumplir no debería detener la operación
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          gap: 'clamp(28px,3.5vw,32px)'
        }}>
          <CapabilityCard
            icon={<Icon name="file-check" size={28} />}
            title="Consentimiento verificable"
            body="Cada permiso queda registrado con fecha, versión de términos y el texto exacto que aceptó el titular."
            linkLabel="Ver la captura"
            href={hrefFor('demo', { search: 'paso=captura' })}
          />
          <CapabilityCard
            icon={<Icon name="clock" size={28} />}
            title="Solicitudes de derechos en plazo"
            body="Los 30 días que fija la ley vienen integrados: folio, acuse, alertas y respuesta con su documento."
            linkLabel="Ver el flujo"
            href={hrefFor('demo', { search: 'paso=derechos' })}
          />
          <CapabilityCard
            icon={<Icon name="file-text" size={28} />}
            title="Expediente exportable"
            body="Ante una fiscalización de la APDP, el expediente completo de evidencia se exporta en minutos, no en semanas."
            linkLabel="Ver la evidencia"
            href={hrefFor('demo', { search: 'paso=evidencia' })}
          />
        </div>
      </Shell>

      {/* The band's own container and ground, with the record it describes
          beside the words instead of an empty half. */}
      <DarkFeatureBand tone="slate" style={{ padding: 'clamp(56px,8vw,96px) 0' }}>
        <div style={{
          display: 'grid', gap: 'clamp(32px,5vw,72px)', alignItems: 'center', marginTop: 'calc(var(--space-56) * -1)',
          gridTemplateColumns: mobile ? '1fr' : '5fr 7fr'
        }}>
          <div style={{ minWidth: 0 }}>
            <MonoLabel tone="soft">Evidencia</MonoLabel>
            <h2 className="cns-section-display" style={{
              margin: '24px 0 0', fontSize: 'clamp(32px,4.6vw,56px)', letterSpacing: '-0.03em', textWrap: 'balance'
            }}>
              Registros estructurados, no archivos estáticos
            </h2>
            <p className="cns-body-large" style={{
              margin: '24px 0 0', maxWidth: '52ch', color: 'rgba(255,255,255,.72)',
              fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
            }}>
              Cada captura genera un sello de tiempo, la versión exacta de los términos y un hash de
              evidencia inalterable. Los comprobantes se generan on-demand desde el registro, así que
              siempre reflejan la realidad de la base de datos.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, marginTop: 40 }}>
              {bandActions}
            </div>
          </div>
          <AppFrame
            tone="dark" scene="empresa-ficha" chrome="content" width={1040} height={720}
            label="El registro de un titular: consentimientos, identidad y línea de tiempo"
            address={APP_HOST + '/dashboard/tienda-alba/subjects'}
          />
        </div>
      </DarkFeatureBand>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <h2 className="cns-section-heading" style={{
          margin: '0 0 clamp(32px,5vw,56px)', maxWidth: '22ch',
          fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em'
        }}>
          Tres módulos, un solo registro
        </h2>
        <ModuleGrid />
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Plataforma
 * ------------------------------------------------------------------ */

/* What each pillar looks like in the product: the screen a visitor would be
   taken to if they asked "show me". */
const PILAR_SCREENS = [
  {
    scene: 'empresa-solicitud-detalle', address: APP_HOST + '/dashboard/tienda-alba/rights-requests',
    label: 'Una solicitud de derechos en la consola, con su folio, plazo y respuesta', step: 'derechos',
    link: 'Ver una solicitud en la demo'
  },
  {
    scene: 'empresa-ficha', address: APP_HOST + '/dashboard/tienda-alba/subjects',
    label: 'El registro de un titular: sus consentimientos, identidad y línea de tiempo', step: 'evidencia',
    link: 'Ver la evidencia en la demo'
  },
  {
    scene: 'empresa-integracion-instalacion', address: APP_HOST + '/dashboard/tienda-alba/integrations',
    label: 'La instalación de una integración: el código que se pega en el sitio', step: 'captura',
    link: 'Ver el widget en la demo'
  }
];

function PlataformaScreen({ navigate, mobile }) {
  const bandActions = useBandActions(navigate);

  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Plataforma</MonoLabel>
        <h1 className="cns-product-display" style={{
          margin: '20px 0 0', maxWidth: '18ch', fontSize: 'clamp(34px,6.4vw,72px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          Una obligación legal, convertida en operación automatizada
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px 0 0', maxWidth: '62ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Consenty recopila, organiza y gestiona consentimientos bajo los estándares que define la
          Ley 21.719, con trazabilidad auditable en tiempo real y sin frenar al negocio.
        </p>
      </Shell>

      {/* The registry itself, and the widget that writes to it: every permission
          saved on the right becomes a chained entry on the left. */}
      <Shell pad={`clamp(40px,6vw,80px) ${GUTTER} 0`}>
        <LiveHero
          mobile={mobile} scene="empresa-ledger-verificado"
          label="El ledger legal de Consenty con su cadena de evidencia verificada"
          address={APP_HOST + '/dashboard/tienda-alba/ledger'}
        />
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <h2 className="cns-section-heading" style={{
          margin: 0, maxWidth: '20ch', fontSize: 'clamp(30px,4.4vw,48px)',
          letterSpacing: '-0.025em', textWrap: 'balance'
        }}>
          Tres pilares, cada uno en pantalla
        </h2>
        <div style={{ display: 'grid', gap: 'clamp(56px,8vw,112px)', marginTop: 'clamp(40px,6vw,72px)' }}>
          {PILARES.map(([num, title, body], i) => (
            <ProductSplit
              key={num} level={3} mobile={mobile} reverse={i % 2 === 1}
              eyebrow={'Pilar ' + num} heading={title} body={body}
              frame={
                <AppFrame
                  scene={PILAR_SCREENS[i].scene} label={PILAR_SCREENS[i].label}
                  address={PILAR_SCREENS[i].address} chrome="content" width={1040} height={720}
                />
              }
            >
              <DemoLink navigate={navigate} step={PILAR_SCREENS[i].step}>{PILAR_SCREENS[i].link}</DemoLink>
            </ProductSplit>
          ))}
        </div>
      </Shell>

      <DarkFeatureBand
        tone="slate"
        eyebrow="Evidencia"
        heading={bandHeading("Respuesta inmediata ante una fiscalización")}
        body="Consenty exporta expedientes de evidencia con trazabilidad completa: sello de tiempo, versión de términos, hash y canal de cada captura. Demuestra la legitimidad del tratamiento y audita internamente el uso del producto."
        actions={bandActions}
      />

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <h2 className="cns-section-heading" style={{
          margin: '0 0 clamp(32px,5vw,56px)', maxWidth: '22ch',
          fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em'
        }}>
          Tres módulos, un solo registro
        </h2>
        <ModuleGrid />
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Módulos — each module is shown as the product itself
 * ------------------------------------------------------------------ */

function MailNote({ mail }) {
  return (
    <div style={{
      minHeight: 44, display: 'flex', alignItems: 'center', marginBottom: 10,
      fontSize: 14, lineHeight: 1.4, color: 'var(--text-secondary)'
    }}>
      {mail ? (
        <span style={{
          background: 'var(--surface-wash-indigo)', borderRadius: 'var(--radius-md)',
          padding: '10px 14px', color: 'var(--color-ink)'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>Correo simulado para {mail.email}: </span>
          tu código es{' '}
          <strong style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>{mail.code}</strong>
        </span>
      ) : 'Pruébalo como lo ve tu cliente: es el widget real, con datos de ejemplo.'}
    </div>
  );
}

function ModulosScreen({ navigate, mobile }) {
  const [mail, onWidgetMessage] = useSimulatedMail();

  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Módulos</MonoLabel>
        <h1 className="cns-product-display" style={{
          margin: '20px 0 0', maxWidth: '17ch', fontSize: 'clamp(34px,6.4vw,72px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          Captura, supervisión y autoservicio
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px 0 0', maxWidth: '60ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Tres componentes que cubren el ciclo completo del consentimiento: dónde se pide, quién lo
          supervisa y cómo lo ejerce el titular.
        </p>
      </Shell>

      {/* Componente 1 — captura: the widget, live, inside a customer's form */}
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <div id="captura" style={{
          display: 'grid', gap: 'clamp(32px,5vw,72px)', alignItems: 'start',
          gridTemplateColumns: mobile ? '1fr' : 'minmax(0,6fr) minmax(360px,5fr)'
        }}>
          <div style={{ minWidth: 0 }}>
            <MonoLabel>Componente 1</MonoLabel>
            <h2 className="cns-section-heading" style={{
              margin: '16px 0 0', maxWidth: '20ch', fontSize: 'clamp(28px,4.2vw,48px)',
              letterSpacing: '-0.025em', textWrap: 'balance'
            }}>
              Vinculación omnicanal de consentimiento
            </h2>
            <p className="cns-body-large" style={{
              margin: '24px 0 0', maxWidth: '52ch', color: 'var(--text-secondary)',
              fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
            }}>
              Consenty se conecta mediante conectores y APIs livianas a los puntos donde tu empresa
              interactúa con las personas. Cada captura genera un sello de tiempo, versión de términos
              y hash de evidencia.
            </p>
            <div style={{ marginTop: 36 }}>
              <CheckRow>Formulario web y e-commerce (checkout, registros)</CheckRow>
              <CheckRow>App móvil y centro de preferencias</CheckRow>
              <CheckRow>Canales offline: sucursal, call center, terreno</CheckRow>
              <CheckRow last>CRM y plataformas de marketing vía API o webhook</CheckRow>
            </div>
            <p className="cns-body" style={{ margin: '28px 0 0', maxWidth: '52ch', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
              En el formulario de al lado ninguna casilla viene marcada, cada permiso se acepta por
              separado y, al guardar, la decisión queda en el ledger.
            </p>
            <DemoLink navigate={navigate} step="captura">Ver cómo llega a la consola</DemoLink>
          </div>
          <div style={{ minWidth: 0 }}>
            <MailToast mail={mail} />
            <MailNote mail={mail} />
            <AppFrame
              interactive fluid scene="titular-widget"
              label="El formulario de una tienda de ejemplo con el widget de Consenty"
              address={SHOP_HOST + '/cotizar'} naturalHeight={680} onMessage={onWidgetMessage}
            />
          </div>
        </div>
      </Shell>

      {/* Componente 2 — Panel DPO */}
      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} 0`}>
        <div id="panel">
          <MonoLabel>Componente 2</MonoLabel>
          <h2 className="cns-section-heading" style={{
            margin: '16px 0 24px', maxWidth: '22ch', fontSize: 'clamp(28px,4.2vw,48px)',
            letterSpacing: '-0.025em', textWrap: 'balance'
          }}>
            Panel DPO: respuesta inmediata a auditorías
          </h2>
          <p className="cns-body-large" style={{
            margin: '0 0 clamp(32px,5vw,48px)', maxWidth: '62ch', color: 'var(--text-secondary)',
            fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
          }}>
            El Delegado de Protección de Datos o el equipo legal cuenta con un centro de mando para
            supervisar todos los consentimientos existentes, recibir alertas de cambios y atender
            solicitudes BARCOP de los titulares.
          </p>
          <AppFrame
            scene="empresa-panel" label="El panel de control de Consenty con indicadores y actividad reciente"
            address={APP_HOST + '/dashboard/tienda-alba'} height={760}
          />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
            gap: 'clamp(28px,3.5vw,32px)', marginTop: 'clamp(40px,5vw,56px)'
          }}>
            <CapabilityCard
              icon={<Icon name="activity" size={28} />}
              title="Supervisión continua"
              body="Estado de cada consentimiento y revocación, por titular, permiso y versión de términos."
            />
            <CapabilityCard
              icon={<Icon name="clock" size={28} />}
              title="Alertas y plazos"
              body="Los 30 días legales para responder una solicitud, con avisos antes del vencimiento."
            />
            <CapabilityCard
              icon={<Icon name="file-text" size={28} />}
              title="Expedientes exportables"
              body="Evidencia técnica inalterable, lista para presentar ante la APDP o una auditoría interna."
            />
          </div>
        </div>
      </Shell>

      {/* Componente 3 — Portal del titular */}
      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} clamp(64px,9vw,120px)`}>
        <div id="portal">
          <MonoLabel>Componente 3</MonoLabel>
          <h2 className="cns-section-heading" style={{
            margin: '16px 0 24px', maxWidth: '24ch', fontSize: 'clamp(28px,4.2vw,48px)',
            letterSpacing: '-0.025em', textWrap: 'balance'
          }}>
            Portal de consentimientos y derechos BARCOP
          </h2>
          <p className="cns-body-large" style={{
            margin: '0 0 clamp(32px,5vw,48px)', maxWidth: '62ch', color: 'var(--text-secondary)',
            fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
          }}>
            La Ley 21.719 obliga a facilitar el ejercicio de derechos sin trámites burocráticos. Con su
            cuenta activa, tus clientes acceden directamente al portal y ejercen sus derechos de forma
            autónoma y transparente.
          </p>
          <div style={{
            display: 'grid', gap: 'clamp(20px,2.4vw,32px)', alignItems: 'start',
            gridTemplateColumns: mobile ? '1fr' : '1fr 1fr'
          }}>
            <div style={{ minWidth: 0 }}>
              <AppFrame
                fluid scene="titular-portal" label="El portal del titular con los permisos que otorgó"
                address={APP_HOST + '/portal/consentimientos'} naturalHeight={640}
              />
              <p className="cns-body" style={{ margin: '14px 0 0', color: 'var(--text-secondary)' }}>
                Lo que autorizó, hasta cuándo, y un botón para revocarlo.
              </p>
            </div>
            <div style={{ minWidth: 0 }}>
              <AppFrame
                fluid scene="titular-solicitud" label="El formulario del portal para ejercer un derecho"
                address={APP_HOST + '/portal/solicitudes/nueva'} naturalHeight={640} chrome="content"
              />
              <p className="cns-body" style={{ margin: '14px 0 0', color: 'var(--text-secondary)' }}>
                Los derechos que puede ejercer, explicados sin jerga, con folio y acuse al enviar.
              </p>
            </div>
          </div>
          <DemoLink navigate={navigate} step="portal">Usar el portal en la demo</DemoLink>
        </div>
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Normativa — includes the readiness checklist
 * ------------------------------------------------------------------ */

const RISK = {
  ok: {
    label: 'Al día',
    color: 'var(--color-success)',
    copy: 'Tu operación cubre los requisitos básicos de responsabilidad proactiva. El siguiente paso es acreditar evidencia técnica inalterable ante una fiscalización.',
    exposure: 'Baja'
  },
  medio: {
    label: 'Por vencer',
    color: 'var(--color-warning)',
    copy: 'Hay prácticas que la ley ya no permite o evidencia que no podrías acreditar. Son ajustes acotados si empiezas ahora.',
    exposure: 'Hasta 20.000 UTM (~$1.400 millones CLP)'
  },
  alto: {
    label: 'En riesgo',
    color: 'var(--color-error)',
    copy: 'Sin registro único, con casillas pre-marcadas o sin canal de derechos, una fiscalización de la APDP encontraría infracciones acreditables desde el primer día.',
    exposure: 'Hasta 20.000 UTM por infracción, 4% de ingresos por reincidencia y 30 días de suspensión'
  }
};

/** Yes/No pill. `goodWhenOn` says which answer the law rewards. */
function AnswerPill({ on, goodWhenOn, onClick, label }) {
  const good = goodWhenOn ? on : !on;
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      aria-label={label}
      style={{
        flex: '0 0 auto', fontFamily: 'var(--font-ui)', fontSize: 13, minHeight: 32,
        padding: '6px 16px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
        border: '1px solid var(--border-default)',
        background: good ? 'var(--surface-card)' : 'var(--surface-alert)',
        color: good ? 'var(--color-ink)' : 'var(--color-warning)',
        transition: 'var(--transition-color)'
      }}
    >{on ? 'Sí' : 'No'}</button>
  );
}

function ChecklistCard({ daysLeft }) {
  const [puntos, setPuntos] = useState(6);
  const [registro, setRegistro] = useState(false);
  const [premarcadas, setPremarcadas] = useState(true);
  const [canal, setCanal] = useState(false);

  const gaps = (registro ? 0 : 1) + (premarcadas ? 1 : 0) + (canal ? 0 : 1) + (puntos > 8 ? 1 : 0);
  const risk = RISK[gaps >= 3 ? 'alto' : gaps === 0 ? 'ok' : 'medio'];

  const rowStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
  };
  // On the indigo wash a neutral hairline disappears; the rule is tinted instead.
  const washRule = '1px solid rgba(67,56,202,.15)';

  return (
    <div style={{
      flex: '1 1 320px', minWidth: 0, background: 'var(--surface-wash-indigo)',
      borderRadius: 'var(--radius-lg)', padding: 'clamp(24px,3vw,40px)'
    }}>
      <MonoLabel tone="indigo">Checklist 1 dic</MonoLabel>
      <h3 className="cns-card-heading" style={{ margin: '16px 0 0', fontSize: 'clamp(24px,2.6vw,32px)' }}>
        Quedan {daysLeft} días
      </h3>
      <p className="cns-body" style={{ margin: '12px 0 24px', color: 'var(--text-secondary)' }}>
        Cuatro preguntas para saber dónde estás parado hoy.
      </p>

      <div style={{ display: 'grid', gap: 16 }}>
        <div>
          <label htmlFor="puntos-captura" style={{ fontSize: 14, display: 'block', marginBottom: 10 }}>
            Puntos de captura de datos: <strong>{puntos}</strong>
          </label>
          <input
            id="puntos-captura" type="range" min="1" max="20" value={puntos}
            onChange={(e) => setPuntos(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-indigo)' }}
          />
        </div>

        <div style={{ ...rowStyle, borderTop: washRule, paddingTop: 16 }}>
          <span style={{ fontSize: 15 }}>Registro único y centralizado</span>
          <AnswerPill on={registro} goodWhenOn onClick={() => setRegistro((v) => !v)} label="Registro único y centralizado" />
        </div>
        <div style={rowStyle}>
          <span style={{ fontSize: 15 }}>Casillas pre-marcadas</span>
          <AnswerPill on={premarcadas} goodWhenOn={false} onClick={() => setPremarcadas((v) => !v)} label="Casillas pre-marcadas" />
        </div>
        <div style={rowStyle}>
          <span style={{ fontSize: 15 }}>Canal para derechos BARCOP</span>
          <AnswerPill on={canal} goodWhenOn onClick={() => setCanal((v) => !v)} label="Canal para derechos BARCOP" />
        </div>

        <div role="status" style={{ borderTop: washRule, paddingTop: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <span className="cns-mono-label" style={{
              padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)',
              border: '1px solid var(--border-default)', fontSize: 12, color: risk.color
            }}>{risk.label}</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              {gaps} {gaps === 1 ? 'brecha detectada' : 'brechas detectadas'}
            </span>
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.5, textWrap: 'pretty' }}>{risk.copy}</p>
          <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--text-secondary)' }}>
            Exposición máxima estimada: <strong>{risk.exposure}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function NormativaScreen({ daysLeft, navigate, mobile }) {
  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Normativa · Ley 21.719</MonoLabel>
        <h1 className="cns-product-display" style={{
          margin: '20px 0 0', maxWidth: '16ch', fontSize: 'clamp(34px,6.4vw,72px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          El nuevo estándar de privacidad en Chile
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px 0 0', maxWidth: '62ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Chile promulga un marco regulatorio moderno con estándares equivalentes al RGPD europeo y crea
          la Agencia de Protección de Datos Personales (APDP), con facultades reales de fiscalización y
          sanción.
        </p>
      </Shell>

      <Shell pad={`clamp(40px,6vw,80px) ${GUTTER} 0`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 360px', minWidth: 0 }}>
            <h2 className="cns-section-heading" style={{
              margin: 0, maxWidth: '20ch', fontSize: 'clamp(28px,4.2vw,48px)',
              letterSpacing: '-0.025em', textWrap: 'balance'
            }}>
              Nuevas responsabilidades proactivas
            </h2>
            <p className="cns-body-large" style={{
              margin: '20px 0 0', maxWidth: '50ch', color: 'var(--text-secondary)',
              fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
            }}>
              Las organizaciones deben demostrar responsabilidad proactiva de forma continua:
            </p>
            <div style={{ marginTop: 32 }}>
              <CheckRow><strong>Registrar la trazabilidad exacta</strong> de cada consentimiento y revocación.</CheckRow>
              <CheckRow><strong>Atender solicitudes de derechos BARCOP</strong> en un plazo máximo de 30 días.</CheckRow>
              <CheckRow last><strong>Acreditar evidencia técnica inalterable</strong> frente a auditorías de la Agencia.</CheckRow>
            </div>
          </div>
          <ChecklistCard daysLeft={daysLeft} />
        </div>
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} 0`}>
        <h2 className="cns-section-heading" style={{
          margin: '0 0 16px', maxWidth: '24ch', fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em'
        }}>
          El riesgo del incumplimiento
        </h2>
        <p className="cns-body-large" style={{
          margin: '0 0 clamp(32px,5vw,56px)', maxWidth: '58ch',
          color: 'var(--text-secondary)', fontSize: 'clamp(16px,1.6vw,18px)'
        }}>
          Sanciones severas, medidas operativas y daño reputacional directo.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
          gap: 1, background: 'var(--border-utility)', border: '1px solid var(--border-utility)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden'
        }}>
          {RIESGOS.map(([eyebrow, figure, body]) => (
            <div key={eyebrow} style={{ background: 'var(--surface-card)', padding: 'clamp(24px,3vw,40px)' }}>
              <MonoLabel tone="warning">{eyebrow}</MonoLabel>
              <h3 className="cns-card-heading" style={{ margin: '14px 0 0', fontSize: 'clamp(24px,2.6vw,32px)' }}>{figure}</h3>
              <p className="cns-body" style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>{body}</p>
            </div>
          ))}
        </div>
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} 0`}>
        <ProductSplit
          mobile={mobile}
          heading="El plazo de 30 días, dentro del producto"
          body="Cada solicitud de derechos entra con folio, acuse de recibo y fecha de vencimiento. La consola avisa antes de que venza, y la respuesta emite el documento que se le entrega al titular."
          frame={
            <AppFrame
              scene="empresa-solicitud-detalle" chrome="content" width={1040} height={720}
              label="Una solicitud de derechos en la consola, con su vencimiento y la respuesta"
              address={APP_HOST + '/dashboard/tienda-alba/rights-requests'}
            />
          }
        >
          <DemoLink navigate={navigate} step="derechos">Presentar y responder una solicitud en la demo</DemoLink>
        </ProductSplit>
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <h2 className="cns-section-heading" style={{
          margin: '0 0 40px', maxWidth: '22ch', fontSize: 'clamp(30px,4.4vw,48px)', letterSpacing: '-0.025em'
        }}>
          Documentos y plazos
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <ResearchTable rows={NORMATIVA_ROWS} />
        </div>
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Recursos
 * ------------------------------------------------------------------ */

function RecursosScreen({ navigate }) {
  const [filter, setFilter] = useState('Todo');
  const rows = useMemo(
    () => (filter === 'Todo' ? RECURSOS : RECURSOS.filter((r) => r.topics.indexOf(filter) !== -1)),
    [filter]
  );

  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Recursos</MonoLabel>
        <h1 className="cns-product-display" style={{
          margin: '20px 0 0', maxWidth: '16ch', fontSize: 'clamp(34px,6.4vw,72px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          Guías para llegar en regla
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px 0 0', maxWidth: '58ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Checklists, plantillas y análisis prácticos para equipos legales, de seguridad y de marketing.
        </p>
        <div role="group" aria-label="Filtrar por tema" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 40 }}>
          {RECURSO_FILTERS.map((f) => (
            <BlogFilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>
      </Shell>

      <Shell pad={`clamp(32px,5vw,56px) ${GUTTER} clamp(64px,9vw,120px)`}>
        <div style={{ overflowX: 'auto' }}>
          <ResearchTable rows={rows} />
        </div>
      </Shell>

      <DarkFeatureBand
        tone="slate"
        eyebrow="Del papel al producto"
        heading={bandHeading("Lo que explican las guías, funcionando")}
        body="Captura un consentimiento, revísalo en el ledger y responde una solicitud de derechos en la demo: es el producto real, con datos de ejemplo, en tu navegador."
        actions={
          <Fragment>
            <Button variant="primary-inverse" onClick={() => navigate('demo')}>Probar la demo</Button>
            <a
              data-plain {...navLinkProps('demo', navigate, BOOKING)}
              style={{ color: 'var(--color-on-dark)', fontSize: 16 }}
            >Agendar una reunión</a>
          </Fragment>
        }
      />
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Implementación
 * ------------------------------------------------------------------ */

/* What weeks 2 to 4 leave running, as the screens the client ends up with. */
const ENTREGABLES = [
  {
    key: 'semana-2', icon: 'list-checks', short: 'Semana 2', side: 'Semana 2 · Configuración',
    title: 'Tus datos y permisos, definidos',
    body: 'Qué datos tratas, con qué base legal y por cuánto tiempo, con el texto que legal aprobó.',
    scene: 'empresa-datos', address: APP_HOST + '/dashboard/tienda-alba/data-types'
  },
  {
    key: 'semana-3', icon: 'code-xml', short: 'Semana 3', side: 'Semana 3 · Integración',
    title: 'El widget instalado en tu formulario',
    body: 'Un fragmento de código por formulario. Cada envío llega con un comprobante que tu servidor valida.',
    scene: 'empresa-integracion-instalacion', address: APP_HOST + '/dashboard/tienda-alba/integrations'
  },
  {
    key: 'semana-4', icon: 'door-open', short: 'Semana 4', side: 'Semana 4 · Despliegue',
    title: 'El portal abierto a tus titulares',
    body: 'Cada persona entra con su RUT y correo, ve lo que autorizó y ejerce sus derechos sin intermediarios.',
    scene: 'titular-portal', address: APP_HOST + '/portal/consentimientos', fluid: true
  }
];

function ImplementacionScreen({ navigate, mobile }) {
  const bandActions = useBandActions(navigate);
  const cols = mobile ? '1fr' : '180px 1fr 1fr';

  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Implementación</MonoLabel>
        <h1 className="cns-product-display" style={{
          margin: '20px 0 0', maxWidth: '16ch', fontSize: 'clamp(34px,6.4vw,72px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          Cuatro semanas, escalable desde el día uno
        </h1>
        <p className="cns-body-large" style={{
          margin: '24px 0 0', maxWidth: '60ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Un plan acotado, con entregables por semana y sin depender de un gran equipo de TI.
        </p>
      </Shell>

      <Shell pad={`clamp(40px,6vw,80px) ${GUTTER} 0`}>
        <div style={{ display: 'grid', gap: 0, borderTop: '1px solid var(--border-default)' }}>
          {SEMANAS.map(([week, title, body, deliverable]) => (
            <div key={week} style={{
              display: 'grid', gridTemplateColumns: cols, gap: 'clamp(12px,2vw,40px)',
              padding: 'clamp(24px,3vw,36px) 0', borderBottom: '1px solid var(--border-default)'
            }}>
              <MonoLabel tone="indigo">{week}</MonoLabel>
              <div>
                <h3 className="cns-card-heading" style={{ margin: 0, fontSize: 'clamp(22px,2.6vw,32px)' }}>{title}</h3>
                <p className="cns-body" style={{ margin: '10px 0 0', color: 'var(--text-secondary)' }}>{body}</p>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{deliverable}</div>
            </div>
          ))}
        </div>
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} 0`}>
        <h2 className="cns-section-heading" style={{
          margin: 0, maxWidth: '22ch', fontSize: 'clamp(30px,4.4vw,48px)',
          letterSpacing: '-0.025em', textWrap: 'balance'
        }}>
          Lo que queda funcionando cada semana
        </h2>
        <p className="cns-body-large" style={{
          margin: '20px 0 clamp(32px,5vw,56px)', maxWidth: '58ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
        }}>
          Los entregables no son documentos: son pantallas del producto ya configuradas para tu
          empresa.
        </p>
        <ScreenTour
          items={ENTREGABLES} name="Entregables por semana" mobile={mobile}
          cta={() => <Button variant="secondary" onClick={() => navigate('demo')}>Probar la demo</Button>}
        />
      </Shell>

      <DarkFeatureBand
        tone="indigo"
        eyebrow="Soporte"
        heading={bandHeading("No necesitas un área de TI para partir")}
        body="Widgets listos para pegar, APIs livianas y acompañamiento durante las cuatro semanas. Si tu equipo es pequeño, nosotros hacemos la integración."
        actions={bandActions}
        style={{ marginTop: 'clamp(64px,9vw,120px)' }}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Demo — the product, used from both sides, then the booking form
 * ------------------------------------------------------------------ */

const CONSOLE_PATH = '/dashboard/tienda-alba';

/* The guided tour. Each step says whose turn it is, what to do in the real
   screen, which screens both sides show, and which event from the app (see the
   demo's bridge) proves the visitor did it. `requires` is the past a step
   needs when someone lands on it directly. */
const TOUR = [
  {
    key: 'captura', label: 'Capturar', side: 'cliente',
    title: 'Pide el consentimiento en un formulario',
    todo: [
      'Pulsa «Completar con datos de ejemplo» y luego «Completar ahora».',
      'Pide el código, escríbelo y acepta que Consenty guarde tu identidad.',
      'Marca los permisos que quieras y guarda tus preferencias.'
    ],
    client: 'titular-widget', company: CONSOLE_PATH + '/ledger',
    doneBy: ['cliente', 'consents-saved'],
    done: 'Guardado. Mira la consola: las decisiones ya están en el ledger.'
  },
  {
    key: 'evidencia', label: 'Evidencia', side: 'empresa', requires: 'ana-granted',
    title: 'Comprueba la prueba en el ledger',
    todo: [
      'Las filas de arriba son las decisiones recién guardadas, con su sello de tiempo y su hash.',
      'Pulsa «Verificar integridad» para recalcular toda la cadena.'
    ],
    client: 'titular-widget', company: CONSOLE_PATH + '/ledger',
    doneBy: ['empresa', 'ledger-verified'],
    done: 'Cadena verificada. Si alguien alterara una fila, aquí aparecería rota.'
  },
  {
    key: 'portal', label: 'Revocar', side: 'cliente', requires: 'ana-granted',
    title: 'Revoca un permiso desde el portal',
    todo: [
      'Este es el portal que recibe cada titular, con todo lo que autorizó.',
      'Pulsa «Revocar» en «Enviar promociones» y luego «Guardar consentimientos».'
    ],
    client: 'titular-portal', company: CONSOLE_PATH + '/alerts',
    doneBy: ['cliente', 'consents-saved'],
    done: 'Revocado. La empresa recibió la alerta y el ledger sumó la revocación.'
  },
  {
    key: 'derechos', label: 'Solicitar', side: 'cliente', requires: 'ana-granted',
    title: 'Ejerce un derecho como titular',
    todo: [
      'Elige un derecho, por ejemplo Acceso, y sigue los pasos del formulario.',
      'Al confirmar recibes un folio y un acuse de recibo.'
    ],
    client: 'titular-solicitud', company: CONSOLE_PATH + '/rights-requests',
    doneBy: ['cliente', 'rights-request-created'],
    done: 'Solicitud presentada. Ya está en la bandeja de la empresa, con su plazo de 30 días.'
  },
  {
    key: 'respuesta', label: 'Responder', side: 'empresa', requires: 'ana-granted,ana-request',
    title: 'Responde la solicitud dentro del plazo',
    todo: [
      'Abre la solicitud más reciente: es la primera de la lista.',
      'Escribe el fundamento de la respuesta y pulsa «Emitir documento y guardar».'
    ],
    client: 'titular-solicitudes', company: CONSOLE_PATH + '/rights-requests',
    doneBy: ['empresa', 'rights-request-updated'],
    done: 'Respondida. El titular ya ve la resolución y su documento en el portal.'
  }
];

const CLIENT_ADDRESS = {
  'titular-widget': SHOP_HOST + '/cotizar',
  'titular-portal': APP_HOST + '/portal/consentimientos',
  'titular-solicitud': APP_HOST + '/portal/solicitudes/nueva',
  'titular-solicitudes': APP_HOST + '/portal/solicitudes'
};

const COMPANY_SCENE = {
  [CONSOLE_PATH + '/ledger']: 'empresa-ledger',
  [CONSOLE_PATH + '/alerts']: 'empresa-alertas',
  [CONSOLE_PATH + '/rights-requests']: 'empresa-solicitudes'
};

function tourIndex(search) {
  const wanted = new URLSearchParams(search).get('paso');
  const found = TOUR.findIndex((step) => step.key === wanted);
  return found === -1 ? 0 : found;
}

function ProductDemo({ place, mobile }) {
  // A visit that starts at the first step starts clean; a deep link to a later
  // step keeps whatever is there and asks the demo for the past it needs.
  const [run, setRun] = useState(() => ({ id: 0, start: tourIndex(place.search) }));
  const [index, setIndex] = useState(run.start);
  const [done, setDone] = useState({});
  const [mail, setMail] = useState(null);
  const [side, setSide] = useState(TOUR[run.start].side);
  const [companyPath, setCompanyPath] = useState(TOUR[run.start].company);
  const companyApi = useRef(null);
  const firstMount = useRef(true);
  const viewportHeight = useViewportHeight();
  const step = TOUR[index];
  const stepRef = useRef(step);
  stepRef.current = step;

  // A link to another step while already on the page (the home page's cards).
  useEffect(() => {
    const wanted = tourIndex(place.search);
    if (new URLSearchParams(place.search).has('paso')) goTo(wanted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.search, place.visit]);

  function goTo(next) {
    setIndex(next);
    setSide(TOUR[next].side);
    setMail(null);
    if (TOUR[next].company !== companyPath) {
      setCompanyPath(TOUR[next].company);
      // The console is one signed-in app: it changes screen, it is not reloaded.
      if (companyApi.current) companyApi.current.send('navigate', { path: TOUR[next].company });
    }
  }

  // Only the first screen of a run starts from a clean slate; coming back to
  // the first step later must not erase what the visitor has done since.
  useEffect(() => { firstMount.current = false; }, [run.id]);

  function restart() {
    firstMount.current = true;
    setRun((current) => ({ id: current.id + 1, start: 0 }));
    setIndex(0);
    setDone({});
    setMail(null);
    setSide(TOUR[0].side);
    setCompanyPath(TOUR[0].company);
  }

  const onEvent = (from) => (type, payload) => {
    if (type === 'otp-sent') setMail(payload);
    if (type === 'otp-verified') setMail(null);
    const current = stepRef.current;
    if (current.doneBy[0] === from && current.doneBy[1] === type) {
      setDone((state) => ({ ...state, [current.key]: true }));
    }
  };

  const isDone = Boolean(done[step.key]);
  const last = index === TOUR.length - 1;
  const fresh = run.start === 0;
  // Both screens and the status line above them should fit under the header.
  const frameHeight = mobile
    ? Math.max(460, Math.min(640, viewportHeight - 300))
    : Math.max(520, Math.min(760, viewportHeight - 250));

  const mailNote = mail && (
    <div style={{
      background: 'var(--surface-wash-indigo)', borderRadius: 'var(--radius-md)',
      padding: '10px 14px', fontSize: 14, lineHeight: 1.4
    }}>
      <span style={{ color: 'var(--text-secondary)' }}>Correo simulado para {mail.email}: </span>
      tu código es{' '}
      <strong style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>{mail.code}</strong>
    </div>
  );
  const doneNote = isDone && (
    <div role="status" style={{
      display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px',
      borderLeft: '2px solid var(--color-success)', paddingLeft: 14, fontSize: 15, lineHeight: 1.4
    }}>
      <span style={{ flex: '1 1 260px', textWrap: 'pretty' }}>
        {step.done}{last ? ' Ese es el recorrido completo.' : ''}
      </span>
      {!last && (
        <Button variant="primary" size="sm" onClick={() => goTo(index + 1)}>
          Siguiente: {TOUR[index + 1].label.toLowerCase()}
        </Button>
      )}
    </div>
  );

  const client = (
    <AppFrame
      key={`cliente-${run.id}-${step.client}`}
      interactive fluid eager frameId="cliente"
      scene={step.client} address={CLIENT_ADDRESS[step.client]}
      label="Lo que ve el cliente de la tienda de ejemplo"
      reset={fresh && firstMount.current && index === 0}
      requires={fresh ? undefined : step.requires}
      fitHeight={frameHeight} onMessage={onEvent('cliente')}
    />
  );
  const company = (
    <AppFrame
      key={`empresa-${run.id}`}
      interactive eager frameId="empresa" apiRef={companyApi}
      scene={COMPANY_SCENE[TOUR[run.start].company]}
      address={APP_HOST + companyPath}
      label="La consola de Consenty de la empresa de ejemplo"
      requires={fresh ? undefined : TOUR[run.start].requires}
      width={1180} fitHeight={frameHeight} onMessage={onEvent('empresa')}
    />
  );

  return (
    <div>
      <MailToast mail={mail} />
      <div role="tablist" aria-label="Pasos de la demo" className="cns-flow-tabs cns-flow-tabs--row">
        {TOUR.map((item, i) => (
          <button
            key={item.key} role="tab" type="button" className="cns-flow-tab"
            id={'demo-tab-' + item.key} aria-selected={i === index} aria-controls="demo-guia"
            tabIndex={i === index ? 0 : -1}
            onClick={() => goTo(i)} onKeyDown={tabKeyHandler(TOUR.length, index, goTo)}
          >
            <span
              className="cns-flow-tab__title"
              style={done[item.key] ? { color: 'var(--color-success)' } : undefined}
            >
              {item.label}
              {done[item.key] && <span className="cns-visually-hidden"> (hecho)</span>}
            </span>
          </button>
        ))}
      </div>

      <div
        id="demo-guia" role="tabpanel" aria-labelledby={'demo-tab-' + step.key}
        style={{ padding: 'clamp(18px,2.2vw,28px) 0' }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>
          {step.side === 'cliente' ? 'Ahora eres el cliente' : 'Ahora eres la empresa'}
        </span>
        <h2 className="cns-feature-heading" style={{
          margin: '4px 0 0', fontSize: 'clamp(20px,2vw,26px)', textWrap: 'balance'
        }}>{step.title}</h2>
        <ol style={{
          margin: '12px 0 0', paddingLeft: 20, display: 'grid', gap: 4,
          fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '80ch'
        }}>
          {step.todo.map((line) => <li key={line}>{line}</li>)}
        </ol>
      </div>

      {mobile && (
        <div role="tablist" aria-label="Lado de la demo" className="cns-flow-tabs cns-flow-tabs--row"
          style={{ marginBottom: 16 }}>
          {[['cliente', 'Tu cliente'], ['empresa', 'Tu empresa']].map(([key, label]) => (
            <button
              key={key} role="tab" type="button" className="cns-flow-tab"
              aria-selected={side === key} onClick={() => setSide(key)}
            >
              <span className="cns-flow-tab__title">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* What just happened sits right above the screens, where the visitor is
          looking: the one-time code over the client's side, the result of the
          step over the company's. The row keeps its height so nothing jumps. */}
      {mobile ? (
        <div style={{ display: 'grid', gap: 10, marginBottom: 12 }}>{mailNote}{doneNote}</div>
      ) : (
        <div style={{
          display: 'grid', gap: 20, alignItems: 'center', minHeight: 52, marginBottom: 10,
          gridTemplateColumns: 'minmax(360px,440px) minmax(0,1fr)'
        }}>
          <div>{mailNote || <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Tu cliente</span>}</div>
          <div>{doneNote || <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Tu empresa</span>}</div>
        </div>
      )}

      <div style={{
        display: 'grid', gap: 20, alignItems: 'start',
        gridTemplateColumns: mobile ? '1fr' : 'minmax(360px,440px) minmax(0,1fr)'
      }}>
        <div style={{ minWidth: 0, display: mobile && side !== 'cliente' ? 'none' : 'block' }}>{client}</div>
        <div style={{ minWidth: 0, display: mobile && side !== 'empresa' ? 'none' : 'block' }}>{company}</div>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        gap: '12px 24px', marginTop: 20, fontSize: 14, color: 'var(--text-tertiary)'
      }}>
        <span style={{ maxWidth: '70ch', textWrap: 'pretty' }}>
          Empresa, personas y datos son ficticios. La aplicación corre en tu navegador: lo que
          escribas no se envía ni se guarda en ningún servidor.
        </span>
        <button type="button" onClick={restart} style={{
          background: 'none', border: 0, padding: 0, cursor: 'pointer', fontSize: 14,
          color: 'var(--color-ink)', textDecoration: 'underline', textUnderlineOffset: 3
        }}>Reiniciar la demo</button>
      </div>
    </div>
  );
}

const BOOKING_ERRORS = {
  rate: 'Recibimos varias solicitudes desde tu red. Inténtalo de nuevo en una hora.',
  invalid: 'Revisa los datos marcados e inténtalo de nuevo.',
  failed: 'No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos.'
};

function bookingFieldError(field, value) {
  const text = value.trim();
  if (field.required && !text) return 'Completa este campo.';
  if (field.type === 'email' && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return 'Escribe un correo válido.';
  }
  return null;
}

/**
 * The "Agendar demo" form. It posts to the app, where the request shows up for
 * Consenty's team under Plataforma → Demos; the thank-you appears only once the
 * app has accepted it, so nobody is told "we will write to you" about a request
 * that never arrived.
 *
 * Built from the design system's Input and Button rather than its
 * ContactFormCard, which renders the same card but gives its fields no name
 * and its caller no values.
 */
function BookingForm({ onSent }) {
  const [values, setValues] = useState(() => (
    DEMO_FIELDS.reduce((all, field) => ({ ...all, [field.name]: '' }), {})
  ));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [problem, setProblem] = useState(null);
  const trapRef = useRef(null);
  const sending = status === 'sending';

  const setValue = (name) => (e) => {
    const value = e.target.value;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: null }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const found = {};
    for (const field of DEMO_FIELDS) {
      const message = bookingFieldError(field, values[field.name]);
      if (message) found[field.name] = message;
    }
    setErrors(found);
    const first = DEMO_FIELDS.find((field) => found[field.name]);
    if (first) {
      setProblem(BOOKING_ERRORS.invalid);
      const input = e.currentTarget.elements.namedItem(first.name);
      if (input && input.focus) input.focus();
      return;
    }

    setStatus('sending');
    setProblem(null);
    try {
      const response = await fetch(API_ORIGIN + '/api/public/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `website` is a field no person sees; the app drops submissions that fill it.
        body: JSON.stringify({ ...values, website: trapRef.current ? trapRef.current.value : '' })
      });
      if (response.ok) {
        onSent();
        return;
      }
      setProblem(
        response.status === 429 ? BOOKING_ERRORS.rate
          : response.status === 422 ? BOOKING_ERRORS.invalid
            : BOOKING_ERRORS.failed
      );
    } catch (cause) {
      setProblem(BOOKING_ERRORS.failed);
    }
    setStatus('idle');
  };

  return (
    <form onSubmit={submit} noValidate style={{
      background: 'var(--color-canvas)', color: 'var(--color-ink)',
      borderRadius: 'var(--radius-lg)', padding: 'clamp(24px,3vw,var(--space-xxl))',
      display: 'grid', gap: 'var(--space-xl)', fontFamily: 'var(--font-ui)'
    }}>
      <h3 className="cns-card-heading" style={{ margin: 0, fontWeight: 400 }}>Cuéntanos de tu operación</h3>
      <p style={{ margin: 0, fontSize: 'var(--text-body-size)', color: 'var(--text-secondary)' }}>
        Te contactamos dentro de un día hábil para coordinar la sesión.
      </p>
      <div style={{
        display: 'grid', gap: 'var(--space-lg)',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))'
      }}>
        {DEMO_FIELDS.map((field) => (
          <Input
            key={field.name} name={field.name} label={field.label} type={field.type} as={field.as}
            required={field.required} aria-required={field.required ? 'true' : undefined}
            aria-invalid={errors[field.name] ? 'true' : undefined}
            placeholder={field.placeholder} maxLength={field.max} autoComplete={field.autoComplete}
            value={values[field.name]} onChange={setValue(field.name)} disabled={sending}
            error={errors[field.name] || undefined}
            style={field.full || field.as === 'textarea' ? { gridColumn: '1 / -1' } : undefined}
          />
        ))}
      </div>
      <div aria-hidden="true" className="cns-visually-hidden">
        <label>
          Sitio web
          <input ref={trapRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {problem && (
        <p role="alert" style={{ margin: 0, fontSize: 15, color: 'var(--color-error)' }}>{problem}</p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 20px' }}>
        <Button variant="primary" type="submit" disabled={sending}>
          {sending ? 'Enviando…' : 'Agendar demo comercial'}
        </Button>
        <span style={{ flex: '1 1 200px', fontSize: 13, color: 'var(--text-secondary)', textWrap: 'pretty' }}>
          Tus datos llegan al equipo de Consenty para coordinar la reunión.
        </span>
      </div>
    </form>
  );
}

function DemoScreen({ place, mobile }) {
  const [sent, setSent] = useState(false);

  return (
    <main id="contenido">
      {/* Kept short on purpose: this page is for using the product, and the
          two screens should be reachable without scrolling past a hero. */}
      <Shell pad={`clamp(28px,4vw,56px) ${GUTTER} 0`}>
        <MonoLabel tone="indigo">Demo interactiva</MonoLabel>
        <h1 className="cns-section-heading" style={{
          margin: '14px 0 0', fontSize: 'clamp(30px,4.2vw,52px)',
          letterSpacing: '-0.03em', textWrap: 'balance'
        }}>
          Recorre Consenty de punta a punta
        </h1>
        <p className="cns-body-large" style={{
          margin: '14px 0 0', maxWidth: '84ch', color: 'var(--text-secondary)',
          fontSize: 'clamp(16px,1.5vw,18px)', textWrap: 'pretty'
        }}>
          Haz de cliente y de empresa a la vez: el sitio de una tienda de ejemplo con el widget de
          Consenty, y la consola que usa su equipo. Es el producto real con datos ficticios.
        </p>
      </Shell>

      <Shell pad={`clamp(20px,3vw,32px) ${GUTTER} clamp(64px,9vw,120px)`}>
        <ProductDemo place={place} mobile={mobile} />
      </Shell>

      <div id="agendar" style={{ background: 'var(--surface-band-indigo)', color: 'var(--color-on-dark)' }}>
        <Shell pad={`clamp(48px,7vw,100px) ${GUTTER}`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>
              <MonoLabel tone="soft">Agendar demo</MonoLabel>
              <h2 className="cns-section-display" style={{
                margin: '20px 0 0', maxWidth: '16ch', fontSize: 'clamp(32px,5.6vw,60px)',
                letterSpacing: '-0.03em', textWrap: 'balance'
              }}>
                ¿Listos para proteger su negocio?
              </h2>
              <p className="cns-body-large" style={{
                margin: '24px 0 0', maxWidth: '48ch', color: 'rgba(255,255,255,.72)',
                fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
              }}>
                Agendemos una sesión de trabajo de 30 minutos para analizar sus puntos de captura
                actuales y diseñar un plan de adaptación a la medida de su empresa.
              </p>
              <div style={{
                marginTop: 'clamp(32px,5vw,48px)', display: 'grid', gap: 14,
                fontSize: 16, color: 'rgba(255,255,255,.72)'
              }}>
                {[
                  'Revisión de tus canales de captura actuales',
                  'La misma demo, con tus formularios y tus permisos',
                  'Plan de 4 semanas con responsables y entregables'
                ].map((line) => (
                  <div key={line} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: '#a5a8f0' }}>✓</span>{line}
                  </div>
                ))}
              </div>
              <p style={{ margin: 'clamp(32px,5vw,48px) 0 0', fontSize: 14, color: 'rgba(255,255,255,.72)' }}>
                www.consenty.japs.ing
              </p>
            </div>

            <div style={{ flex: '1 1 360px', minWidth: 0 }}>
              {sent ? (
                <div role="status" style={{
                  background: 'var(--surface-on-dark-panel)', border: '1px solid var(--border-on-dark)',
                  borderRadius: 'var(--radius-md)', padding: 'clamp(24px,3vw,40px)'
                }}>
                  <MonoLabel tone="soft">Solicitud recibida</MonoLabel>
                  <h3 className="cns-card-heading" style={{ margin: '16px 0 0', fontSize: 'clamp(24px,2.6vw,32px)' }}>
                    Gracias, te escribimos pronto
                  </h3>
                  <p className="cns-body" style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.72)' }}>
                    Te contactamos dentro de un día hábil para coordinar la sesión de 30 minutos.
                  </p>
                </div>
              ) : (
                <BookingForm onSent={() => setSent(true)} />
              )}
            </div>
          </div>
        </Shell>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Verificación de formularios
 * ------------------------------------------------------------------ */

const FLUJO_STEPS = [
  ['El titular escribe su correo', 'Paso 1'],
  ['Desafío de seguridad — invisible, sin clics', 'Paso 2'],
  ['Se envía el código de verificación', 'Paso 3']
];

/** Bordered outline button — no DS Button variant matches this look, same pattern as AnswerPill. */
function CopyDomainButton() {
  const [copied, setCopied] = useState(false);

  const copyDomain = () => {
    /* writeText() returns a Promise — a bare try/catch doesn't see a permission
       rejection, only a synchronous throw when the Clipboard API isn't there at all. */
    try { navigator.clipboard.writeText('challenges.cloudflare.com').catch(() => {}); } catch (e) { /* unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={copyDomain}
      style={{
        marginTop: 20, height: 36, padding: '0 14px', background: 'none',
        border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-button)',
        fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--color-indigo)', cursor: 'pointer',
        transition: 'var(--transition-color)'
      }}
    >{copied ? 'Dominio copiado' : 'Copiar challenges.cloudflare.com'}</button>
  );
}

/** One numbered cause: eyebrow tags, title/body on the left, "Qué hacer" content on the right. */
function CausaRow({ numero, tag, tagTone = 'muted', titulo, cuerpo, aviso, children }) {
  return (
    <div style={{
      display: 'grid', gap: 'clamp(16px,2vw,40px)',
      padding: 'clamp(28px,4vw,40px) 0', borderBottom: '1px solid var(--border-default)'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 16 }}>
        <MonoLabel tone="indigo">{numero}</MonoLabel>
        <MonoLabel tone={tagTone}>{tag}</MonoLabel>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'clamp(24px,4vw,64px)' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <h3 className="cns-card-heading" style={{ margin: 0, fontSize: 'clamp(22px,2.6vw,32px)', textWrap: 'balance' }}>
            {titulo}
          </h3>
          <p className="cns-body" style={{ margin: '12px 0 0', maxWidth: '48ch', color: 'var(--text-secondary)' }}>
            {cuerpo}
          </p>
          {/* The widget's own notice for this cause, so a visitor can match it
              against what they saw in the form they came from. */}
          <div style={{ marginTop: 24, maxWidth: 470 }}>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 10 }}>
              El aviso que muestra el formulario en este caso:
            </div>
            <AppFrame
              fluid autoHeight scene={aviso} naturalHeight={340}
              label={'Aviso del widget de Consenty: ' + titulo}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* The canvas pings a made-up Cloudflare endpoint via new Image() — that URL serves JS, not an
   image, so onerror always fires and the check would report "blocked" on every single visit,
   bloqueador or not. Loading the real Turnstile script is what a blocker would actually catch,
   and the run token guards against a stale timeout overwriting a result that already landed. */
function ConnectivityCheck() {
  const [check, setCheck] = useState('');
  const tokenRef = useRef(0);

  const runCheck = () => {
    const token = ++tokenRef.current;
    setCheck('Probando…');
    const done = (msg) => { if (tokenRef.current === token) setCheck(msg); };
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?probe=' + Date.now();
    script.onload = () => { done('Tu navegador alcanza el servicio. Vuelve al formulario y reintenta.'); script.remove(); };
    script.onerror = () => { done('Algo está bloqueando la conexión — revisa la causa 01.'); script.remove(); };
    document.head.appendChild(script);
    setTimeout(() => {
      setCheck((cur) => (cur === 'Probando…' ? 'Sin respuesta — revisa la causa 01.' : cur));
    }, 6000);
  };

  return (
    <div style={{
      marginTop: 'clamp(32px,5vw,48px)', background: 'var(--surface-card)',
      border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-lg)',
      padding: 'clamp(24px,3vw,36px)', display: 'flex', flexWrap: 'wrap',
      gap: 'clamp(20px,3vw,40px)', alignItems: 'center'
    }}>
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <MonoLabel>Prueba rápida</MonoLabel>
        <p className="cns-body" style={{ margin: '12px 0 0', maxWidth: '46ch', color: 'var(--color-ink)' }}>
          Comprueba si tu navegador alcanza el servicio del desafío. No envía datos tuyos ni
          queda registrado en ningún consentimiento.
        </p>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button variant="primary" onClick={runCheck}>Probar conexión</Button>
        <span role="status" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{check}</span>
      </div>
    </div>
  );
}

function VerificacionScreen() {
  return (
    <main id="contenido">
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            <MonoLabel tone="indigo">Verificación de formularios</MonoLabel>
            <h1 className="cns-product-display" style={{
              margin: '20px 0 0', maxWidth: '17ch', fontSize: 'clamp(34px,6.4vw,72px)',
              letterSpacing: '-0.03em', textWrap: 'balance'
            }}>
              Una persona real detrás de cada consentimiento
            </h1>
            <p className="cns-body-large" style={{
              margin: '24px 0 0', maxWidth: '60ch', color: 'var(--text-secondary)',
              fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
            }}>
              Antes de enviar un código de verificación, Consenty ejecuta un desafío de seguridad
              de Cloudflare Turnstile. Es invisible: en el caso normal el titular no ve nada ni
              tiene que hacer nada.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'clamp(28px,4vw,40px)' }}>
              <Button variant="primary" href="#bloqueador">Llegué desde un formulario</Button>
              <a href="#empresa" style={{
                display: 'inline-flex', alignItems: 'center', height: 44,
                fontSize: 15, color: 'var(--text-link)'
              }}>
                Cómo protege tu registro
              </a>
            </div>
          </div>
          <div style={{
            flex: '1 1 380px', minWidth: 0, background: 'var(--surface-card-stone)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(24px,3vw,36px)'
          }}>
            <MonoLabel>Flujo normal</MonoLabel>
            <div style={{ display: 'grid', gap: 0, marginTop: 20 }}>
              {FLUJO_STEPS.map(([desc, paso]) => (
                <div key={paso} style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  gap: 16, padding: '16px 0', borderBottom: '1px solid var(--border-default)'
                }}>
                  <span style={{ fontSize: 15, color: 'var(--color-ink)' }}>{desc}</span>
                  <MonoLabel>{paso}</MonoLabel>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginTop: 20,
              fontSize: 14, color: 'var(--color-success)'
            }}>
              <span>✓</span><span>Tiempo típico: menos de un segundo</span>
            </div>
          </div>
        </div>
      </Shell>

      <div style={{ marginTop: 'clamp(64px,9vw,120px)' }}>
        <DarkFeatureBand
          tone="slate"
          eyebrow="Por qué existe"
          heading={bandHeading("El registro solo prueba algo si la decisión es atribuible")}
          body="Sin este control, cualquiera podría generar consentimientos masivos a nombre de terceros y contaminar el registro que tu empresa después tiene que exhibir. La verificación separa a las personas de los scripts antes de que se emita el código."
        >
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            gap: 'clamp(24px,3vw,40px)'
          }}>
            <CapabilityCard
              tone="dark" title="Evidencia atribuible"
              body="Cada consentimiento del registro queda asociado a una persona que superó el control, no a un proceso automatizado."
            />
            <CapabilityCard
              tone="dark" title="Sin abuso del envío"
              body="Impide que el formulario se use para bombardear con códigos correos de personas que nunca lo pidieron."
            />
          </div>
        </DarkFeatureBand>
      </div>

      <div id="empresa">
        <Shell pad={`clamp(64px,9vw,120px) ${GUTTER} 0`}>
          <MonoLabel tone="indigo">Para la empresa</MonoLabel>
          <h2 className="cns-section-heading" style={{
            margin: '16px 0 0', maxWidth: '22ch', fontSize: 'clamp(30px,4.4vw,48px)',
            letterSpacing: '-0.025em', textWrap: 'balance'
          }}>
            Un control que no le cuesta nada al titular
          </h2>
          <p className="cns-body-large" style={{
            margin: '20px 0 clamp(32px,5vw,56px)', maxWidth: '58ch', color: 'var(--text-secondary)',
            fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
          }}>
            Protege la validez probatoria del registro sin agregar un paso al formulario.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
            gap: 'clamp(24px,3vw,40px)'
          }}>
            <CapabilityCard
              title="Validez probatoria"
              body="El registro que exhibes ante la Agencia queda libre de consentimientos generados en masa a nombre de terceros."
            />
            <CapabilityCard
              title="Cero fricción"
              body="Es invisible. El titular solo lo percibe cuando su propio navegador bloquea el desafío."
            />
            <CapabilityCard
              title="Degradación controlada"
              body="Si el desafío falla, el widget explica qué pasó y cómo seguir en lugar de quedarse colgado sin respuesta."
            />
            <CapabilityCard
              title="Configurable por tenant"
              body="Cada empresa usa su propia cuenta de Cloudflare o la de Consenty, según cómo quiera administrar las claves."
            />
          </div>
        </Shell>
      </div>

      <div style={{
        background: 'var(--surface-wash-mist)', marginTop: 'clamp(64px,9vw,120px)',
        borderTop: '1px solid var(--border-utility)'
      }}>
        <div id="bloqueador">
          <Shell pad={`clamp(56px,8vw,100px) ${GUTTER}`}>
            <MonoLabel tone="indigo">Para el titular</MonoLabel>
            <h2 className="cns-section-heading" style={{
              margin: '16px 0 0', maxWidth: '20ch', fontSize: 'clamp(30px,4.4vw,48px)',
              letterSpacing: '-0.025em', textWrap: 'balance'
            }}>
              ¿Llegaste aquí desde un formulario?
            </h2>
            <p className="cns-body-large" style={{
              margin: '20px 0 0', maxWidth: '58ch', color: 'var(--text-secondary)',
              fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
            }}>
              Significa que el control de seguridad no pudo completarse en tu navegador. Hay
              tres causas posibles, ordenadas de la más común a la menos frecuente.
            </p>

            <div style={{
              display: 'grid', gap: 0, marginTop: 'clamp(32px,5vw,56px)',
              borderTop: '1px solid var(--border-default)'
            }}>
              <CausaRow
                numero="Causa 01 · la más común" tag="Puedes resolverlo tú"
                aviso="componente-verificacion-bloqueada"
                titulo="Un bloqueador o una VPN está filtrando el desafío"
                cuerpo="Extensiones como bloqueadores de anuncios, antirrastreo o una VPN pueden cortar la conexión con el servicio que ejecuta el control."
              >
                <div style={{
                  flex: '1 1 320px', minWidth: 0, background: 'var(--surface-card)',
                  border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(20px,2.4vw,28px)'
                }}>
                  <MonoLabel>Qué hacer</MonoLabel>
                  <ol style={{
                    margin: '16px 0 0', paddingLeft: 20, display: 'grid', gap: 12,
                    fontSize: 15, lineHeight: 1.55, color: 'var(--color-ink)'
                  }}>
                    <li>Abre la extensión desde la barra del navegador y elige permitir este sitio.</li>
                    <li>O agrega <code style={{
                      fontFamily: 'var(--font-mono)', fontSize: 13.5, background: 'var(--surface-card-stone)',
                      padding: '2px 6px', borderRadius: 'var(--radius-sm)'
                    }}>challenges.cloudflare.com</code> a las excepciones.</li>
                    <li>Vuelve al formulario y reintenta.</li>
                  </ol>
                  <CopyDomainButton />
                </div>
              </CausaRow>

              <CausaRow
                numero="Causa 02" tag="Puedes resolverlo tú"
                aviso="componente-verificacion-sin-respuesta"
                titulo="El desafío no respondió a tiempo"
                cuerpo="Una conexión intermitente o una pestaña en segundo plano pueden dejar el control a medio camino."
              >
                <div style={{
                  flex: '1 1 320px', minWidth: 0, background: 'var(--surface-card)',
                  border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(20px,2.4vw,28px)'
                }}>
                  <MonoLabel>Qué hacer</MonoLabel>
                  <ol style={{
                    margin: '16px 0 0', paddingLeft: 20, display: 'grid', gap: 12,
                    fontSize: 15, lineHeight: 1.55, color: 'var(--color-ink)'
                  }}>
                    <li>Vuelve al formulario y reintenta.</li>
                    <li>Si vuelve a pasar, usa la verificación manual que ofrece el propio widget: aparece una casilla para marcar.</li>
                  </ol>
                </div>
              </CausaRow>

              <CausaRow
                numero="Causa 03" tag="No depende de ti" tagTone="warning"
                aviso="componente-verificacion-restringida"
                titulo="El sitio incrusta el formulario de forma restringida"
                cuerpo="El formulario está dentro de un marco con permisos limitados y el control no puede ejecutarse ahí."
              >
                <div style={{
                  flex: '1 1 320px', minWidth: 0, background: 'var(--surface-card-stone)',
                  borderRadius: 'var(--radius-lg)', padding: 'clamp(20px,2.4vw,28px)'
                }}>
                  <MonoLabel>Qué hacer</MonoLabel>
                  <p className="cns-body" style={{ margin: '16px 0 0', color: 'var(--color-ink)' }}>
                    Desde tu navegador no hay nada que puedas cambiar. Avisa a la empresa dueña
                    del formulario: tiene que ajustar cómo lo incrusta en su sitio.
                  </p>
                </div>
              </CausaRow>
            </div>

            <ConnectivityCheck />
          </Shell>
        </div>
      </div>

      <DarkFeatureBand
        tone="indigo"
        eyebrow="Si nada funciona"
        heading={bandHeading("Tus derechos siguen vigentes")}
        body="Contacta a la empresa dueña del formulario y cuéntale qué pasó: puede completar tu solicitud por otra vía. Como titular, puedes ejercer tus derechos igualmente por los canales que esa empresa publique — el problema técnico no los suspende."
      />
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * App
 * ------------------------------------------------------------------ */

function App() {
  const [place, navigate] = useRoute();
  const route = place.route;
  const width = useViewportWidth();
  const mobile = width < 1080;
  const onLinkClick = useMemo(() => routeLinkHandler(navigate), [navigate]);

  const daysLeft = useMemo(
    () => Math.max(0, Math.ceil((DEADLINE - new Date()) / 86400000)),
    []
  );

  const screens = {
    inicio: <HomeScreen navigate={navigate} daysLeft={daysLeft} mobile={mobile} />,
    plataforma: <PlataformaScreen navigate={navigate} mobile={mobile} />,
    modulos: <ModulosScreen navigate={navigate} mobile={mobile} />,
    normativa: <NormativaScreen daysLeft={daysLeft} navigate={navigate} mobile={mobile} />,
    recursos: <RecursosScreen navigate={navigate} />,
    implementacion: <ImplementacionScreen navigate={navigate} mobile={mobile} />,
    demo: <DemoScreen place={place} mobile={mobile} />,
    verificacion: <VerificacionScreen />
  };

  return (
    <div
      onClick={onLinkClick}
      style={{ background: 'var(--surface-page)', maxWidth: '100vw', overflowX: 'hidden' }}
    >
      <SiteHeader route={route} navigate={navigate} mobile={mobile} />
      {screens[route]}
      <SiteFooter navigate={navigate} />
    </div>
  );
}

/* Surface any component that failed to evaluate in the bundle rather than
   rendering a silently incomplete page. */
const bundleErrors = (window.Consenty && window.Consenty.__errors) || [];
if (bundleErrors.length) {
  console.error('Consenty Design System: componentes con error', bundleErrors);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

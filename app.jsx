/* Consenty | consenty.japs.ing
 *
 * Implementation of the "Consenty Web.dc.html" design canvas.
 * Every component comes from the Consenty Design System bundle, read through the
 * window.Consenty alias so this file stays brand-consistent regardless of the
 * compiled namespace. Nothing here draws a brand glyph or invents a token.
 *
 * Copy is Spanish (es-CL); comments and identifiers stay English, per the system readme.
 */

const { useState, useEffect, useMemo, useCallback, Fragment } = React;

const DS = window.Consenty || {};
const {
  Wordmark, Button, Icon,
  TrustLogoStrip, FooterNewsletter,
  BlogFilterChip, ResearchTable, ContactFormCard,
  AgentConsoleCard, CapabilityCard, DarkFeatureBand, HeroPhotoCard, ProductCard
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

const NAV = [
  ['inicio', 'Inicio'],
  ['plataforma', 'Plataforma'],
  ['modulos', 'Módulos'],
  ['normativa', 'Normativa'],
  ['recursos', 'Recursos'],
  ['implementacion', 'Implementación']
];

const ROUTES = NAV.map(([r]) => r).concat('demo');

/* Titles, descriptions and paths live in seo.json — build.mjs emits them as seo.js,
   which index.html loads before this file. One table feeds both the served HTML
   and the client-side navigation, so they can never drift apart. */
const SEO = (window.CONSENTY_SEO && window.CONSENTY_SEO.pages) || {};
const SITE = (window.CONSENTY_SEO && window.CONSENTY_SEO.site) || {};

const CLIENT_NAMES = ['Andesbank', 'Vitalis', 'Nortec', 'Grupo Araucaria', 'Cimar'];
const INTEGRATIONS = ['E-commerce', 'CRM', 'API'];

const MODULES = [
  {
    name: 'Captura integrada',
    description: 'Conectores y APIs livianas en cada punto donde tu empresa interactúa con las personas.',
    bullets: ['Widget web y centro de preferencias', 'Conectores CRM, e-commerce y offline', 'Sello de tiempo, versión y hash'],
    ctaLabel: 'Ver captura'
  },
  {
    name: 'Panel DPO',
    description: 'Centro de mando para supervisar consentimientos, alertas y solicitudes de titulares.',
    bullets: ['Supervisión de todos los consentimientos', 'Alertas de cambios y plazos', 'Expedientes exportables'],
    ctaLabel: 'Ver panel'
  },
  {
    name: 'Portal de titulares',
    description: 'Autoservicio para ejercer los seis derechos BARCOP sin trámites intermedios.',
    bullets: ['Acceso con RUT y correo', 'Los seis derechos BARCOP', 'Respuestas con trazabilidad'],
    ctaLabel: 'Ver portal'
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

const BARCOP = [
  ['B', 'Bloqueo', 'Suspender temporalmente el uso de sus datos.'],
  ['A', 'Acceso', 'Consultar y conocer los datos almacenados.'],
  ['R', 'Rectificación', 'Corregir información inexacta o incompleta.'],
  ['C', 'Cancelación', 'Eliminar datos o revocar autorizaciones.'],
  ['O', 'Oposición', 'Oponerse al tratamiento para fines específicos.'],
  ['P', 'Portabilidad', 'Solicitar y transferir sus datos estructurados.']
];

const PILARES = [
  ['01', 'Cumplimiento legal out-of-the-box', 'El motor gestiona todo el ecosistema de derechos ARCOP+ —acceso, rectificación, cancelación, oposición, portabilidad y bloqueo— de forma automatizada. Se encarga de la parte compleja que la ley exige, para que tu empresa cumpla sin volverse experta legal.'],
  ['02', 'Gestión dinámica de datos', 'En lugar de guardar archivos estáticos, el sistema usa registros estructurados en JSON/XML. Eso permite generar comprobantes on-demand al instante, con la certeza de que el documento refleja siempre la realidad del consentimiento en la base de datos.'],
  ['03', 'Accesible para toda empresa', 'Pensado para el universo de empresas que no tienen grandes departamentos de TI. Con widgets simples y APIs livianas, cualquier negocio integra una capa de cumplimiento rápidamente.']
];

const ALTA_STEPS = [
  ['01', 'RUT y correo', 'El titular ingresa los datos mínimos para iniciar.'],
  ['02', 'Activación', 'Se habilita automáticamente su cuenta de acceso al portal.'],
  ['03', 'Trazabilidad', 'Tu empresa obtiene registro y evidencia auditables desde el primer día.']
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

const DEMO_FIELDS = [
  { name: 'nombre', label: 'Nombre', required: true },
  { name: 'empresa', label: 'Empresa', required: true },
  { name: 'email', label: 'Correo corporativo', type: 'email', required: true },
  { name: 'cargo', label: 'Cargo' },
  { name: 'canales', label: '¿Dónde capturas datos hoy?', as: 'textarea', full: true, placeholder: 'Web, e-commerce, sucursal, call center…' }
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
    ['Documentación API', null]
  ]],
  ['Empresa', [
    ['Nosotros', null],
    ['Seguridad', null],
    ['Contacto', 'demo'],
    ['Estado del servicio', null]
  ]]
];

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */

/** Path for a route: 'inicio' is the site root, everything else a real directory. */
function hrefFor(route) {
  return route === 'inicio' ? '/' : '/' + route + '/';
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

/** History routing: one indexable URL per screen, working back button, deep links. */
function useRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onPop = () => setRoute(readRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    syncHead(route);
    window.scrollTo(0, 0);
  }, [route]);

  const navigate = useCallback((next) => {
    if (readRoute() === next) {
      window.scrollTo(0, 0);
      return;
    }
    window.history.pushState(null, '', hrefFor(next));
    setRoute(next);
  }, []);

  return [route, navigate];
}

/* Intercept only the clicks the browser would handle as same-tab navigation.
   Ctrl/cmd/shift-click and middle-click fall through to the real href, which is
   also what a crawler follows. */
function navLinkProps(route, navigate) {
  return {
    href: hrefFor(route),
    onClick: (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      navigate(route);
    }
  };
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
          href="#/normativa"
          onClick={() => onNavigate('normativa')}
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
                <a href="#ingresar" data-plain onClick={preventDefault} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Ingresar
                </a>
                <Button variant="primary" size="sm" onClick={() => navigate('demo')}>Agendar demo</Button>
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
            <a href="#ingresar" data-plain onClick={preventDefault}
              style={{ fontSize: 17, color: 'var(--text-secondary)', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              Ingresar
            </a>
            <div style={{ marginTop: 20 }}>
              <Button variant="primary" onClick={() => navigate('demo')}>Agendar demo</Button>
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
              {links.map(([label, target]) => (
                <a
                  key={label} data-plain
                  {...(target ? navLinkProps(target, navigate) : { href: '#', onClick: preventDefault })}
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
 * Shared marketing blocks
 * ------------------------------------------------------------------ */

function useBandActions(navigate) {
  return (
    <Fragment>
      <Button variant="primary-inverse" onClick={() => navigate('demo')}>Agendar demo</Button>
      <a
        href="#/implementacion" data-plain
        onClick={() => navigate('implementacion')}
        style={{ color: 'var(--color-on-dark)', fontSize: 16 }}
      >Ver la implementación</a>
    </Fragment>
  );
}

/** The evidence/console overlay used on the hero and platform media cards. */
function ConsoleOverlay() {
  return (
    <AgentConsoleCard
      title="Consenty · Registro de consentimientos"
      status="Al día"
      integrations={INTEGRATIONS}
      prompt="¿Qué base de licitud respalda la campaña de octubre?"
      response="3.482 consentimientos vigentes · 2 flujos requieren revisión · expediente listo para exportar."
    />
  );
}

function ModuleGrid({ navigate }) {
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
          onClick={() => navigate('modulos')}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Inicio
 * ------------------------------------------------------------------ */

function HomeScreen({ navigate, daysLeft }) {
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
          <Button variant="primary" onClick={() => navigate('demo')}>Agendar demo</Button>
          <Button variant="secondary" onClick={() => navigate('plataforma')}>Ver la plataforma</Button>
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

      <Shell pad={`clamp(40px,7vw,80px) ${GUTTER} 0`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ flex: '3 1 420px', minWidth: 0 }}>
            <HeroPhotoCard ratio="16 / 9" radius="var(--radius-lg)" overlay={<ConsoleOverlay />} />
          </div>
          <div style={{ flex: '1 1 260px', minWidth: 0 }}>
            <HeroPhotoCard
              ratio="3 / 4" radius="var(--radius-lg)"
              caption="Equipos de legal, seguridad y marketing sobre un mismo registro."
            />
          </div>
        </div>
      </Shell>

      <Shell>
        <TrustLogoStrip
          eyebrow="Organizaciones que están preparando su cumplimiento con Consenty (nombres de referencia)"
          names={CLIENT_NAMES}
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
            body="Cada permiso queda registrado con fecha, canal, versión de términos y el texto exacto que aceptó el titular."
            linkLabel="Ver la captura"
            onClick={() => navigate('modulos')}
          />
          <CapabilityCard
            icon={<Icon name="clock" size={28} />}
            title="Solicitudes BARCOP en plazo"
            body="Los 30 días que fija la ley vienen integrados: alertas, responsables y respuesta con evidencia adjunta."
            linkLabel="Ver el flujo"
            onClick={() => navigate('modulos')}
          />
          <CapabilityCard
            icon={<Icon name="file-text" size={28} />}
            title="Expediente exportable"
            body="Ante una fiscalización de la APDP, el expediente completo de evidencia se exporta en minutos, no en semanas."
            linkLabel="Ver un expediente"
            onClick={() => navigate('plataforma')}
          />
        </div>
      </Shell>

      <DarkFeatureBand
        tone="slate"
        eyebrow="Evidencia"
        heading="Registros estructurados, no archivos estáticos"
        body="Cada captura genera un sello de tiempo, la versión exacta de los términos y un hash de evidencia inalterable. Los comprobantes se generan on-demand desde el registro, así que siempre reflejan la realidad de la base de datos."
        actions={bandActions}
      />

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <MonoLabel>Módulos</MonoLabel>
        <div style={{ marginTop: 32 }}>
          <ModuleGrid navigate={navigate} />
        </div>
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Plataforma
 * ------------------------------------------------------------------ */

function PlataformaScreen({ navigate, narrow }) {
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

      <Shell pad={`clamp(40px,6vw,80px) ${GUTTER} 0`}>
        <HeroPhotoCard
          ratio={narrow ? '4 / 3' : '21 / 9'}
          radius="var(--radius-lg)"
          overlay={<ConsoleOverlay />}
        />
      </Shell>

      <Shell pad={`clamp(64px,9vw,120px) ${GUTTER}`}>
        <MonoLabel>3 pilares</MonoLabel>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
          gap: 'clamp(28px,3.5vw,32px)', marginTop: 32
        }}>
          {PILARES.map(([num, title, body]) => (
            <div key={num} style={{ borderTop: '1px solid var(--border-default)', paddingTop: 28 }}>
              <MonoLabel tone="indigo">{num}</MonoLabel>
              <h2 className="cns-card-heading" style={{ margin: '16px 0 0', fontSize: 'clamp(24px,2.6vw,32px)' }}>
                {title}
              </h2>
              <p className="cns-body" style={{ margin: '16px 0 0', color: 'var(--text-secondary)', textWrap: 'pretty' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Shell>

      <DarkFeatureBand
        tone="slate"
        eyebrow="Evidencia"
        heading="Respuesta inmediata ante una fiscalización"
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
        <ModuleGrid navigate={navigate} />
      </Shell>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Módulos — includes the live consent widget
 * ------------------------------------------------------------------ */

const PURPOSES = [
  { key: 'comerciales', title: 'Comunicaciones comerciales', detail: 'Ofertas y novedades por correo.' },
  { key: 'perfilamiento', title: 'Perfilamiento y recomendaciones', detail: 'Personalizar lo que ves según tu actividad.' },
  { key: 'terceros', title: 'Compartir con terceros', detail: 'Socios comerciales seleccionados.' }
];

/**
 * Capture widget exactly as a titular sees it: nothing pre-checked, one toggle per
 * purpose, and an evidence record emitted on save.
 */
function ConsentWidget() {
  const [accepted, setAccepted] = useState([false, false, false]);
  const [evidence, setEvidence] = useState(null);

  const toggle = (i) => () => {
    setAccepted((prev) => prev.map((v, n) => (n === i ? !v : v)));
    setEvidence(null); // the receipt describes a saved state, not a pending one
  };

  const save = () => setEvidence(Date.now());

  const chosen = PURPOSES.filter((p, i) => accepted[i]).map((p) => p.key);
  const record = evidence && {
    timestamp: new Date(evidence).toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
    finalidades: chosen.length ? chosen.join(', ') : 'ninguna aceptada',
    hash: 'sha256:' + (evidence.toString(16) + '9f2c41ab7d').slice(0, 16)
  };

  return (
    <div style={{
      flex: '1 1 320px', minWidth: 0, background: 'var(--surface-card)',
      border: '1px solid var(--border-utility)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'
    }}>
      <div style={{ padding: '24px clamp(18px,2.5vw,28px) 18px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="cns-feature-heading">Tus preferencias de datos</div>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)' }}>
          Términos v2.4 · Puedes cambiarlas cuando quieras.
        </p>
      </div>

      <div style={{ padding: '4px clamp(18px,2.5vw,28px)' }}>
        {PURPOSES.map((p, i) => (
          <div key={p.key} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
            padding: '18px 0',
            borderBottom: i < PURPOSES.length - 1 ? '1px solid var(--border-subtle)' : undefined
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>{p.detail}</div>
            </div>
            <button
              onClick={toggle(i)}
              role="switch" aria-checked={accepted[i]} aria-label={p.title}
              style={{
                flex: '0 0 auto', width: 48, height: 28, borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-default)', cursor: 'pointer', padding: 2,
                display: 'flex', alignItems: 'center',
                justifyContent: accepted[i] ? 'flex-end' : 'flex-start',
                background: accepted[i] ? 'var(--color-indigo)' : 'var(--border-utility)',
                transition: 'var(--transition-color)'
              }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 'var(--radius-full)', background: '#fff', display: 'block' }} />
            </button>
          </div>
        ))}
      </div>

      <div style={{
        padding: '18px clamp(18px,2.5vw,28px) 24px', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 20px'
      }}>
        <Button variant="primary" size="sm" onClick={save}>Guardar preferencias</Button>
        <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Se registra con sello de tiempo y hash</span>
      </div>

      {record && (
        <div
          role="status"
          style={{ background: 'var(--surface-inverse)', color: 'var(--color-on-dark)', padding: '24px clamp(18px,2.5vw,28px)' }}
        >
          <MonoLabel tone="soft">Registro de evidencia</MonoLabel>
          <div style={{
            marginTop: 16, display: 'grid', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.72)'
          }}>
            {[
              ['timestamp', record.timestamp, false],
              ['finalidades', record.finalidades, false],
              ['versión términos', 'v2.4', false],
              ['canal', 'web / checkout', false],
              ['hash', record.hash, true]
            ].map(([k, v, wrap]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <span>{k}</span>
                <span style={{ color: 'var(--color-on-dark)', wordBreak: wrap ? 'break-all' : undefined }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModulosScreen({ navigate }) {
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

      {/* Componente 1 — captura omnicanal */}
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
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
          </div>

          <div style={{
            flex: '1 1 320px', minWidth: 0, background: 'var(--surface-card-stone)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(24px,3vw,36px)'
          }}>
            <MonoLabel>Alta del titular</MonoLabel>
            <div style={{ marginTop: 28, display: 'grid', gap: 0 }}>
              {ALTA_STEPS.map(([num, title, body], i) => (
                <div key={num} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20,
                  paddingBottom: i < ALTA_STEPS.length - 1 ? 24 : 0,
                  paddingTop: i > 0 ? 24 : 0,
                  borderBottom: i < ALTA_STEPS.length - 1 ? '1px solid var(--border-utility)' : undefined
                }}>
                  <MonoLabel tone="indigo">{num}</MonoLabel>
                  <div>
                    <div className="cns-feature-heading">{title}</div>
                    <p className="cns-body" style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>

      {/* Widget de captura — interactive */}
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
        <div style={{
          background: 'var(--surface-wash-mist)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)', padding: 'clamp(24px,4vw,56px)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px,5vw,64px)' }}>
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <MonoLabel tone="indigo">Widget de captura</MonoLabel>
              <h2 className="cns-section-heading" style={{
                margin: '20px 0 0', maxWidth: '18ch', fontSize: 'clamp(28px,4.2vw,48px)',
                letterSpacing: '-0.025em', textWrap: 'balance'
              }}>
                Pruébalo como lo ve tu cliente
              </h2>
              <p className="cns-body-large" style={{
                margin: '24px 0 0', maxWidth: '46ch', color: 'var(--text-secondary)',
                fontSize: 'clamp(16px,1.6vw,18px)', textWrap: 'pretty'
              }}>
                Ninguna casilla viene pre-marcada, cada finalidad se acepta por separado, y al guardar
                se emite el registro de evidencia.
              </p>
            </div>
            <ConsentWidget />
          </div>
        </div>
      </Shell>

      {/* Componente 2 — Panel DPO */}
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} 0`}>
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
        <AgentConsoleCard
          title="Panel DPO · Solicitudes BARCOP"
          status="En plazo"
          integrations={INTEGRATIONS}
          prompt="Exportar expediente de evidencia — titular 12.345.678-9"
          response="Expediente listo: 14 consentimientos, 3 revocaciones, 1 solicitud de portabilidad. Trazabilidad completa desde marzo 2026."
        />
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          gap: 'clamp(28px,3.5vw,32px)', marginTop: 'clamp(40px,5vw,56px)'
        }}>
          <CapabilityCard
            icon={<Icon name="activity" size={28} />}
            title="Supervisión continua"
            body="Estado de cada consentimiento y revocación, por canal, finalidad y versión de términos."
          />
          <CapabilityCard
            icon={<Icon name="clock" size={28} />}
            title="Alertas y plazos"
            body="Los 30 días legales para responder BARCOP, con avisos antes del vencimiento y responsable asignado."
          />
          <CapabilityCard
            icon={<Icon name="file-text" size={28} />}
            title="Expedientes exportables"
            body="Evidencia técnica inalterable, lista para presentar ante la APDP o una auditoría interna."
          />
        </div>
      </Shell>

      {/* Componente 3 — Portal BARCOP */}
      <Shell pad={`clamp(48px,7vw,100px) ${GUTTER} clamp(64px,9vw,120px)`}>
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
        {/* 1px grid gap over a rule-colored ground: containment by rules, not by boxes. */}
        <div className="cns-barcop-grid" style={{
          display: 'grid',
          gap: 1, background: 'var(--border-utility)', border: '1px solid var(--border-utility)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden'
        }}>
          {BARCOP.map(([letter, title, body]) => (
            <div key={letter} style={{ background: 'var(--surface-card)', padding: 'clamp(24px,3vw,32px)' }}>
              <MonoLabel tone="indigo">{letter}</MonoLabel>
              <h3 className="cns-feature-heading" style={{ margin: '12px 0 0' }}>{title}</h3>
              <p className="cns-body" style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>{body}</p>
            </div>
          ))}
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

function NormativaScreen({ daysLeft }) {
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

function RecursosScreen() {
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
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Implementación
 * ------------------------------------------------------------------ */

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

      <DarkFeatureBand
        tone="indigo"
        eyebrow="Soporte"
        heading="No necesitas un área de TI para partir"
        body="Widgets listos para pegar, APIs livianas y acompañamiento durante las cuatro semanas. Si tu equipo es pequeño, nosotros hacemos la integración."
        actions={bandActions}
        style={{ marginTop: 'clamp(64px,9vw,120px)' }}
      />
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * Screen: Agendar demo
 * ------------------------------------------------------------------ */

function DemoScreen() {
  const [sent, setSent] = useState(false);

  return (
    <main id="contenido">
      <div style={{ background: 'var(--surface-band-indigo)', color: 'var(--color-on-dark)' }}>
        <Shell pad={`clamp(48px,7vw,100px) ${GUTTER}`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
            <div style={{ flex: '1 1 340px', minWidth: 0 }}>
              <MonoLabel tone="soft">Agendar demo</MonoLabel>
              <h1 className="cns-section-display" style={{
                margin: '20px 0 0', maxWidth: '16ch', fontSize: 'clamp(32px,5.6vw,60px)',
                letterSpacing: '-0.03em', textWrap: 'balance'
              }}>
                ¿Listos para proteger su negocio?
              </h1>
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
                  'Demostración del panel DPO y del portal de titulares',
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
                  <h2 className="cns-card-heading" style={{ margin: '16px 0 0', fontSize: 'clamp(24px,2.6vw,32px)' }}>
                    Gracias, te escribimos pronto
                  </h2>
                  <p className="cns-body" style={{ margin: '12px 0 0', color: 'rgba(255,255,255,.72)' }}>
                    Te contactamos dentro de un día hábil para coordinar la sesión de 30 minutos.
                  </p>
                </div>
              ) : (
                <ContactFormCard
                  heading="Cuéntanos de tu operación"
                  body="Te contactamos dentro de un día hábil para coordinar la sesión."
                  fields={DEMO_FIELDS}
                  submitLabel="Agendar demo comercial"
                  onSubmit={() => setSent(true)}
                />
              )}
            </div>
          </div>
        </Shell>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ *
 * App
 * ------------------------------------------------------------------ */

function App() {
  const [route, navigate] = useRoute();
  const width = useViewportWidth();
  const mobile = width < 1080;
  const narrow = width < 700;

  const daysLeft = useMemo(
    () => Math.max(0, Math.ceil((DEADLINE - new Date()) / 86400000)),
    []
  );

  const screens = {
    inicio: <HomeScreen navigate={navigate} daysLeft={daysLeft} />,
    plataforma: <PlataformaScreen navigate={navigate} narrow={narrow} />,
    modulos: <ModulosScreen navigate={navigate} />,
    normativa: <NormativaScreen daysLeft={daysLeft} />,
    recursos: <RecursosScreen />,
    implementacion: <ImplementacionScreen navigate={navigate} mobile={mobile} />,
    demo: <DemoScreen />
  };

  return (
    <div style={{ background: 'var(--surface-page)', maxWidth: '100vw', overflowX: 'hidden' }}>
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

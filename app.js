/* GENERADO por build.mjs — no editar a mano. Fuente: app.jsx */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment
} = React;
const DS = window.Consenty || {};
const {
  Wordmark,
  Button,
  Icon,
  TrustLogoStrip,
  FooterNewsletter,
  BlogFilterChip,
  ResearchTable,
  ContactFormCard,
  AgentConsoleCard,
  CapabilityCard,
  DarkFeatureBand,
  HeroPhotoCard,
  ProductCard
} = DS;
const GUTTER = 'clamp(20px,4vw,40px)';
const SHELL = {
  maxWidth: 1440,
  margin: '0 auto'
};
function Shell({
  pad = `0 ${GUTTER}`,
  as: Tag = 'div',
  style,
  children
}) {
  return React.createElement(Tag, {
    style: {
      ...SHELL,
      padding: pad,
      ...style
    }
  }, children);
}
function MonoLabel({
  tone = 'muted',
  style,
  children
}) {
  const color = {
    muted: 'var(--text-tertiary)',
    indigo: 'var(--color-indigo)',
    soft: '#a5a8f0',
    warning: 'var(--color-warning)',
    ink: 'var(--color-ink)'
  }[tone];
  return React.createElement("span", {
    className: "cns-mono-label",
    style: {
      color,
      ...style
    }
  }, children);
}
function CheckRow({
  children,
  last = false
}) {
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '16px 0',
      borderTop: '1px solid var(--border-default)',
      borderBottom: last ? '1px solid var(--border-default)' : undefined,
      fontSize: 16
    }
  }, React.createElement("span", {
    style: {
      color: 'var(--color-success)'
    }
  }, "\u2713"), React.createElement("span", null, children));
}
const DEADLINE = new Date('2026-12-01T00:00:00');
const NAV = [['inicio', 'Inicio'], ['plataforma', 'Plataforma'], ['modulos', 'Módulos'], ['normativa', 'Normativa'], ['recursos', 'Recursos'], ['implementacion', 'Implementación']];
const ROUTES = NAV.map(([r]) => r).concat('demo');
const SEO = window.CONSENTY_SEO && window.CONSENTY_SEO.pages || {};
const SITE = window.CONSENTY_SEO && window.CONSENTY_SEO.site || {};
const CLIENT_NAMES = ['Andesbank', 'Vitalis', 'Nortec', 'Grupo Araucaria', 'Cimar'];
const INTEGRATIONS = ['E-commerce', 'CRM', 'API'];
const MODULES = [{
  name: 'Captura integrada',
  description: 'Conectores y APIs livianas en cada punto donde tu empresa interactúa con las personas.',
  bullets: ['Widget web y centro de preferencias', 'Conectores CRM, e-commerce y offline', 'Sello de tiempo, versión y hash'],
  ctaLabel: 'Ver captura'
}, {
  name: 'Panel DPO',
  description: 'Centro de mando para supervisar consentimientos, alertas y solicitudes de titulares.',
  bullets: ['Supervisión de todos los consentimientos', 'Alertas de cambios y plazos', 'Expedientes exportables'],
  ctaLabel: 'Ver panel'
}, {
  name: 'Portal de titulares',
  description: 'Autoservicio para ejercer los seis derechos BARCOP sin trámites intermedios.',
  bullets: ['Acceso con RUT y correo', 'Los seis derechos BARCOP', 'Respuestas con trazabilidad'],
  ctaLabel: 'Ver portal'
}];
const NORMATIVA_ROWS = [{
  title: 'Ley 21.719 — nuevo marco de protección de datos personales',
  topics: ['Vigencia'],
  date: '1 dic 2026'
}, {
  title: 'Agencia de Protección de Datos Personales (APDP): facultades',
  topics: ['Fiscalización'],
  date: '2026'
}, {
  title: 'Responsabilidad proactiva: qué debes poder demostrar',
  topics: ['Obligaciones'],
  date: 'Ago 2026'
}, {
  title: 'Derechos BARCOP y el plazo de 30 días',
  topics: ['Derechos'],
  date: 'Ago 2026'
}, {
  title: 'Escala de sanciones e infracciones gravísimas',
  topics: ['Riesgo'],
  date: 'Ago 2026'
}];
const RECURSOS = [{
  title: 'Checklist: llegar en regla al 1 de diciembre',
  topics: ['Normativa'],
  date: 'Ago 2026'
}, {
  title: 'Cómo reemplazar casillas pre-marcadas sin perder conversión',
  topics: ['Consentimiento'],
  date: 'Ago 2026'
}, {
  title: 'Responder una solicitud BARCOP en menos de 30 días',
  topics: ['Derechos BARCOP'],
  date: 'Jul 2026'
}, {
  title: 'Del Excel al registro único: migrar consentimientos existentes',
  topics: ['Implementación'],
  date: 'Jul 2026'
}, {
  title: 'Qué exige la APDP en un expediente de evidencia',
  topics: ['Normativa'],
  date: 'Jun 2026'
}, {
  title: 'Plantilla de finalidades y bases de licitud para retail',
  topics: ['Consentimiento'],
  date: 'Jun 2026'
}, {
  title: 'Integrar el widget de captura en un checkout en 30 minutos',
  topics: ['Implementación'],
  date: 'May 2026'
}];
const RECURSO_FILTERS = ['Todo', 'Normativa', 'Consentimiento', 'Derechos BARCOP', 'Implementación'];
const BARCOP = [['B', 'Bloqueo', 'Suspender temporalmente el uso de sus datos.'], ['A', 'Acceso', 'Consultar y conocer los datos almacenados.'], ['R', 'Rectificación', 'Corregir información inexacta o incompleta.'], ['C', 'Cancelación', 'Eliminar datos o revocar autorizaciones.'], ['O', 'Oposición', 'Oponerse al tratamiento para fines específicos.'], ['P', 'Portabilidad', 'Solicitar y transferir sus datos estructurados.']];
const PILARES = [['01', 'Cumplimiento legal out-of-the-box', 'El motor gestiona todo el ecosistema de derechos ARCOP+ —acceso, rectificación, cancelación, oposición, portabilidad y bloqueo— de forma automatizada. Se encarga de la parte compleja que la ley exige, para que tu empresa cumpla sin volverse experta legal.'], ['02', 'Gestión dinámica de datos', 'En lugar de guardar archivos estáticos, el sistema usa registros estructurados en JSON/XML. Eso permite generar comprobantes on-demand al instante, con la certeza de que el documento refleja siempre la realidad del consentimiento en la base de datos.'], ['03', 'Accesible para toda empresa', 'Pensado para el universo de empresas que no tienen grandes departamentos de TI. Con widgets simples y APIs livianas, cualquier negocio integra una capa de cumplimiento rápidamente.']];
const ALTA_STEPS = [['01', 'RUT y correo', 'El titular ingresa los datos mínimos para iniciar.'], ['02', 'Activación', 'Se habilita automáticamente su cuenta de acceso al portal.'], ['03', 'Trazabilidad', 'Tu empresa obtiene registro y evidencia auditables desde el primer día.']];
const RIESGOS = [['Infracción gravísima', '20.000 UTM', 'Hasta ~$1.400 millones CLP por infracción, más daño reputacional directo.'], ['Reincidencia', '4% de los ingresos', 'Hasta 4% de los ingresos anuales por ventas, o multa triplicada.'], ['Medida accesoria', '30 días de suspensión', 'Suspensión de las operaciones de tratamiento de datos.'], ['Registro público', 'Registro de sancionados', 'Inscripción en el Registro Nacional de Sanciones de la APDP, afectando la confianza comercial.']];
const SEMANAS = [['Semana 1', 'Diagnóstico', 'Mapeo de los puntos de captura de datos existentes y de las bases de licitud vigentes.', 'Entregable: inventario de puntos de captura y brechas priorizadas.'], ['Semana 2', 'Configuración', 'Setup de Consenty, finalidades, versiones de términos y reglas de consentimiento.', 'Entregable: ambiente configurado y textos de consentimiento aprobados por legal.'], ['Semana 3', 'Integración', 'Conexión vía API y webhooks en los sistemas del cliente: web, e-commerce, CRM.', 'Entregable: capturas en producción con sello de tiempo y hash de evidencia.'], ['Semana 4', 'Despliegue', 'Portal BARCOP activo para titulares y capacitación al DPO o equipo legal.', 'Entregable: portal público, panel DPO operativo y primer expediente exportado.']];
const DEMO_FIELDS = [{
  name: 'nombre',
  label: 'Nombre',
  required: true
}, {
  name: 'empresa',
  label: 'Empresa',
  required: true
}, {
  name: 'email',
  label: 'Correo corporativo',
  type: 'email',
  required: true
}, {
  name: 'cargo',
  label: 'Cargo'
}, {
  name: 'canales',
  label: '¿Dónde capturas datos hoy?',
  as: 'textarea',
  full: true,
  placeholder: 'Web, e-commerce, sucursal, call center…'
}];
const FOOTER_COLUMNS = [['Plataforma', [['Captura integrada', 'modulos'], ['Panel DPO', 'modulos'], ['Portal de titulares', 'modulos'], ['Evidencia y auditoría', 'plataforma']]], ['Industrias', [['Retail y e-commerce', null], ['Banca y seguros', null], ['Salud', null], ['Educación', null]]], ['Recursos', [['Guías y checklists', 'recursos'], ['Normativa', 'normativa'], ['Implementación', 'implementacion'], ['Documentación API', null]]], ['Empresa', [['Nosotros', null], ['Seguridad', null], ['Contacto', 'demo'], ['Estado del servicio', null]]]];
function hrefFor(route) {
  return route === 'inicio' ? '/' : '/' + route + '/';
}
function readRoute() {
  const slug = (window.location.pathname || '/').replace(/^\/+|\/+$/g, '');
  if (!slug) return 'inicio';
  return ROUTES.indexOf(slug) !== -1 ? slug : 'inicio';
}
(function redirectLegacyHash() {
  const raw = (window.location.hash || '').replace(/^#\/?/, '');
  if (raw && ROUTES.indexOf(raw) !== -1) window.location.replace(hrefFor(raw));
})();
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
  const navigate = useCallback(next => {
    if (readRoute() === next) {
      window.scrollTo(0, 0);
      return;
    }
    window.history.pushState(null, '', hrefFor(next));
    setRoute(next);
  }, []);
  return [route, navigate];
}
function navLinkProps(route, navigate) {
  return {
    href: hrefFor(route),
    onClick: e => {
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
const preventDefault = e => e.preventDefault();
const BAR_KEY = 'consenty:deadline-bar-dismissed';
const pad2 = n => String(n).padStart(2, '0');
function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => Math.max(0, target - new Date()));
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, target - new Date())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds % 86400 / 3600),
    minutes: Math.floor(totalSeconds % 3600 / 60),
    seconds: totalSeconds % 60
  };
}
function DeadlineBar({
  onNavigate
}) {
  const [visible, setVisible] = useState(() => {
    try {
      return window.sessionStorage.getItem(BAR_KEY) !== '1';
    } catch (e) {
      return true;
    }
  });
  const {
    days,
    hours,
    minutes,
    seconds
  } = useCountdown(DEADLINE);
  const dismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(BAR_KEY, '1');
    } catch (e) {}
  };
  if (!visible) return null;
  return React.createElement("div", {
    style: {
      background: 'var(--surface-alert)',
      borderBottom: '1px solid var(--color-coral)'
    }
  }, React.createElement("div", {
    style: {
      ...SHELL,
      position: 'relative',
      padding: '8px clamp(44px,8vw,64px)',
      minHeight: 36,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px 14px'
    }
  }, React.createElement(MonoLabel, {
    tone: "ink",
    style: {
      fontSize: 12
    }
  }, "1 dic 2026"), React.createElement("span", {
    style: {
      fontSize: 13.5,
      lineHeight: 1.35,
      color: 'var(--color-ink)',
      textWrap: 'pretty'
    }
  }, "La Ley 21.719 de protecci\xF3n de datos personales entra en vigencia el 1 de diciembre."), React.createElement("span", {
    role: "timer",
    "aria-label": `Quedan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`,
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '.5em',
      whiteSpace: 'nowrap',
      background: 'var(--color-coral)',
      color: '#fff',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: '.01em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, React.createElement("span", null, days, "d"), React.createElement("span", null, pad2(hours), ":", pad2(minutes), ":", pad2(seconds))), React.createElement("a", {
    href: "#/normativa",
    onClick: () => onNavigate('normativa'),
    style: {
      fontSize: 13.5,
      color: 'var(--color-ink)',
      textUnderlineOffset: 3,
      whiteSpace: 'nowrap'
    }
  }, "Ver checklist"), React.createElement("button", {
    onClick: dismiss,
    "aria-label": "Cerrar el aviso de vigencia",
    style: {
      position: 'absolute',
      top: 6,
      right: 'clamp(14px,3vw,40px)',
      background: 'none',
      border: 0,
      cursor: 'pointer',
      fontSize: 16,
      color: 'var(--text-secondary)',
      lineHeight: 1
    }
  }, "\xD7")));
}
function SiteHeader({
  route,
  navigate,
  mobile
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!mobile) setMenuOpen(false);
  }, [mobile]);
  useEffect(() => {
    setMenuOpen(false);
  }, [route]);
  const linkColor = r => route === r ? 'var(--color-ink)' : 'var(--text-secondary)';
  return React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--surface-page)'
    }
  }, React.createElement(DeadlineBar, {
    onNavigate: navigate
  }), React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-utility)'
    }
  }, React.createElement("div", {
    style: {
      ...SHELL,
      padding: `0 ${GUTTER}`,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, React.createElement("a", _extends({
    "data-plain": true
  }, navLinkProps('inicio', navigate), {
    "aria-label": "Consenty | ir al inicio",
    style: {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto'
    }
  }), React.createElement(Wordmark, {
    size: mobile ? 20 : 22
  })), !mobile && React.createElement(Fragment, null, React.createElement("nav", {
    "aria-label": "Principal",
    style: {
      display: 'flex',
      gap: 'clamp(16px,2.2vw,32px)',
      minWidth: 0,
      whiteSpace: 'nowrap'
    }
  }, NAV.map(([r, label]) => React.createElement("a", _extends({
    key: r,
    "data-plain": true
  }, navLinkProps(r, navigate), {
    "aria-current": route === r ? 'page' : undefined,
    style: {
      fontSize: 14,
      color: linkColor(r),
      transition: 'var(--transition-color)'
    }
  }), label))), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      whiteSpace: 'nowrap',
      flex: '0 0 auto'
    }
  }, React.createElement("a", {
    href: "#ingresar",
    "data-plain": true,
    onClick: preventDefault,
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Ingresar"), React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => navigate('demo')
  }, "Agendar demo"))), mobile && React.createElement("button", {
    onClick: () => setMenuOpen(v => !v),
    "aria-label": "Men\xFA",
    "aria-expanded": menuOpen,
    "aria-controls": "menu-movil",
    style: {
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 5,
      width: 44,
      height: 44,
      padding: '0 10px',
      background: 'none',
      border: '1px solid var(--border-utility)',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer'
    }
  }, [0, 1, 2].map(i => React.createElement("span", {
    key: i,
    style: {
      display: 'block',
      height: 1.5,
      background: 'var(--color-ink)',
      borderRadius: 2
    }
  }))))), mobile && menuOpen && React.createElement("div", {
    id: "menu-movil",
    style: {
      borderBottom: '1px solid var(--border-utility)',
      background: 'var(--surface-page)'
    }
  }, React.createElement("div", {
    style: {
      padding: `8px ${GUTTER} 24px`,
      display: 'grid',
      gap: 0
    }
  }, NAV.map(([r, label]) => React.createElement("a", _extends({
    key: r,
    "data-plain": true
  }, navLinkProps(r, navigate), {
    "aria-current": route === r ? 'page' : undefined,
    style: {
      fontSize: 17,
      color: 'var(--color-ink)',
      padding: '16px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }), label)), React.createElement("a", {
    href: "#ingresar",
    "data-plain": true,
    onClick: preventDefault,
    style: {
      fontSize: 17,
      color: 'var(--text-secondary)',
      padding: '16px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, "Ingresar"), React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, React.createElement(Button, {
    variant: "primary",
    onClick: () => navigate('demo')
  }, "Agendar demo")))));
}
function SiteFooter({
  navigate
}) {
  return React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--color-on-dark)'
    }
  }, React.createElement("div", {
    style: {
      ...SHELL,
      padding: `clamp(48px,7vw,80px) ${GUTTER}`,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(40px,6vw,64px)'
    }
  }, React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minWidth: 0
    }
  }, React.createElement(FooterNewsletter, {
    headline: "Novedades y plazos, una vez al mes",
    legal: "Al enviar este formulario aceptas recibir correos de Consenty. Puedes darte de baja cuando quieras."
  })), React.createElement("div", {
    style: {
      flex: '2 1 480px',
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(50%,150px),1fr))',
      gap: 'clamp(28px,3vw,32px)'
    }
  }, FOOTER_COLUMNS.map(([heading, links]) => React.createElement("div", {
    key: heading,
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, heading), links.map(([label, target]) => React.createElement("a", _extends({
    key: label,
    "data-plain": true
  }, target ? navLinkProps(target, navigate) : {
    href: '#',
    onClick: preventDefault
  }, {
    style: {
      color: 'var(--text-muted)',
      fontSize: 13
    }
  }), label)))))), React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-on-dark)'
    }
  }, React.createElement("div", {
    style: {
      ...SHELL,
      padding: `24px ${GUTTER}`,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '12px 24px',
      color: 'var(--text-muted)',
      fontSize: 12
    }
  }, React.createElement("span", null, "\xA9 2026 Consenty SpA \xB7 Santiago de Chile"), React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, React.createElement("a", {
    href: "#",
    "data-plain": true,
    onClick: preventDefault,
    "aria-label": "LinkedIn de Consenty",
    style: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      opacity: .72
    }
  }, React.createElement(Icon, {
    name: "linkedin",
    size: 18,
    tone: "light"
  })), React.createElement("a", {
    href: "#",
    "data-plain": true,
    onClick: preventDefault,
    "aria-label": "Escribir a Consenty por correo",
    style: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      opacity: .72
    }
  }, React.createElement(Icon, {
    name: "mail",
    size: 18,
    tone: "light"
  }))), React.createElement("span", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, React.createElement("a", {
    href: "#",
    "data-plain": true,
    onClick: preventDefault,
    style: {
      color: 'inherit'
    }
  }, "Privacidad"), React.createElement("a", {
    href: "#",
    "data-plain": true,
    onClick: preventDefault,
    style: {
      color: 'inherit'
    }
  }, "T\xE9rminos")))));
}
function useBandActions(navigate) {
  return React.createElement(Fragment, null, React.createElement(Button, {
    variant: "primary-inverse",
    onClick: () => navigate('demo')
  }, "Agendar demo"), React.createElement("a", {
    href: "#/implementacion",
    "data-plain": true,
    onClick: () => navigate('implementacion'),
    style: {
      color: 'var(--color-on-dark)',
      fontSize: 16
    }
  }, "Ver la implementaci\xF3n"));
}
function ConsoleOverlay() {
  return React.createElement(AgentConsoleCard, {
    title: "Consenty \xB7 Registro de consentimientos",
    status: "Al d\xEDa",
    integrations: INTEGRATIONS,
    prompt: "\xBFQu\xE9 base de licitud respalda la campa\xF1a de octubre?",
    response: "3.482 consentimientos vigentes \xB7 2 flujos requieren revisi\xF3n \xB7 expediente listo para exportar."
  });
}
function ModuleGrid({
  navigate
}) {
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
      gap: 24
    }
  }, MODULES.map(m => React.createElement(ProductCard, {
    key: m.name,
    name: m.name,
    description: m.description,
    bullets: m.bullets,
    ctaLabel: m.ctaLabel,
    onClick: () => navigate('modulos')
  })));
}
function HomeScreen({
  navigate,
  daysLeft
}) {
  const bandActions = useBandActions(navigate);
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(56px,9vw,120px) ${GUTTER} 0`,
    style: {
      textAlign: 'center'
    }
  }, React.createElement("h1", {
    className: "cns-hero-display",
    style: {
      margin: '0 auto',
      maxWidth: '16ch',
      fontSize: 'clamp(38px,8.2vw,96px)',
      letterSpacing: '-0.035em',
      textWrap: 'balance'
    }
  }, "Consentimiento a prueba de auditor\xEDa"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px auto 0',
      maxWidth: '60ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Captura, prueba y audita el consentimiento de tus clientes desde un solo lugar \u2014 sin frenar al negocio. Trazabilidad auditable en tiempo real para un proceso que la ley exige."), React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px 32px',
      marginTop: 40
    }
  }, React.createElement(Button, {
    variant: "primary",
    onClick: () => navigate('demo')
  }, "Agendar demo"), React.createElement(Button, {
    variant: "secondary",
    onClick: () => navigate('plataforma')
  }, "Ver la plataforma")), React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px 24px',
      marginTop: 32,
      fontSize: 14,
      color: 'var(--text-tertiary)'
    }
  }, React.createElement("span", null, "Quedan ", daysLeft, " d\xEDas para el 1 de diciembre"), React.createElement("span", {
    style: {
      color: 'var(--border-default)'
    }
  }, "\xB7"), React.createElement("span", null, "Implementaci\xF3n en 4 semanas"), React.createElement("span", {
    style: {
      color: 'var(--border-default)'
    }
  }, "\xB7"), React.createElement("span", null, "Derechos BARCOP completos"))), React.createElement(Shell, {
    pad: `clamp(40px,7vw,80px) ${GUTTER} 0`
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24
    }
  }, React.createElement("div", {
    style: {
      flex: '3 1 420px',
      minWidth: 0
    }
  }, React.createElement(HeroPhotoCard, {
    ratio: "16 / 9",
    radius: "var(--radius-lg)",
    overlay: React.createElement(ConsoleOverlay, null)
  })), React.createElement("div", {
    style: {
      flex: '1 1 260px',
      minWidth: 0
    }
  }, React.createElement(HeroPhotoCard, {
    ratio: "3 / 4",
    radius: "var(--radius-lg)",
    caption: "Equipos de legal, seguridad y marketing sobre un mismo registro."
  })))), React.createElement(Shell, null, React.createElement(TrustLogoStrip, {
    eyebrow: "Organizaciones que est\xE1n preparando su cumplimiento con Consenty (nombres de referencia)",
    names: CLIENT_NAMES
  })), React.createElement(Shell, {
    pad: `0 ${GUTTER} clamp(64px,9vw,120px)`
  }, React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '0 0 clamp(32px,5vw,56px)',
      maxWidth: '24ch',
      fontSize: 'clamp(30px,4.4vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Cumplir no deber\xEDa detener la operaci\xF3n"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
      gap: 'clamp(28px,3.5vw,32px)'
    }
  }, React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "file-check",
      size: 28
    }),
    title: "Consentimiento verificable",
    body: "Cada permiso queda registrado con fecha, canal, versi\xF3n de t\xE9rminos y el texto exacto que acept\xF3 el titular.",
    linkLabel: "Ver la captura",
    onClick: () => navigate('modulos')
  }), React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "clock",
      size: 28
    }),
    title: "Solicitudes BARCOP en plazo",
    body: "Los 30 d\xEDas que fija la ley vienen integrados: alertas, responsables y respuesta con evidencia adjunta.",
    linkLabel: "Ver el flujo",
    onClick: () => navigate('modulos')
  }), React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "file-text",
      size: 28
    }),
    title: "Expediente exportable",
    body: "Ante una fiscalizaci\xF3n de la APDP, el expediente completo de evidencia se exporta en minutos, no en semanas.",
    linkLabel: "Ver un expediente",
    onClick: () => navigate('plataforma')
  }))), React.createElement(DarkFeatureBand, {
    tone: "slate",
    eyebrow: "Evidencia",
    heading: "Registros estructurados, no archivos est\xE1ticos",
    body: "Cada captura genera un sello de tiempo, la versi\xF3n exacta de los t\xE9rminos y un hash de evidencia inalterable. Los comprobantes se generan on-demand desde el registro, as\xED que siempre reflejan la realidad de la base de datos.",
    actions: bandActions
  }), React.createElement(Shell, {
    pad: `clamp(64px,9vw,120px) ${GUTTER}`
  }, React.createElement(MonoLabel, null, "M\xF3dulos"), React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, React.createElement(ModuleGrid, {
    navigate: navigate
  }))));
}
function PlataformaScreen({
  navigate,
  narrow
}) {
  const bandActions = useBandActions(navigate);
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Plataforma"), React.createElement("h1", {
    className: "cns-product-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '18ch',
      fontSize: 'clamp(34px,6.4vw,72px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "Una obligaci\xF3n legal, convertida en operaci\xF3n automatizada"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '62ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Consenty recopila, organiza y gestiona consentimientos bajo los est\xE1ndares que define la Ley 21.719, con trazabilidad auditable en tiempo real y sin frenar al negocio.")), React.createElement(Shell, {
    pad: `clamp(40px,6vw,80px) ${GUTTER} 0`
  }, React.createElement(HeroPhotoCard, {
    ratio: narrow ? '4 / 3' : '21 / 9',
    radius: "var(--radius-lg)",
    overlay: React.createElement(ConsoleOverlay, null)
  })), React.createElement(Shell, {
    pad: `clamp(64px,9vw,120px) ${GUTTER}`
  }, React.createElement(MonoLabel, null, "3 pilares"), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
      gap: 'clamp(28px,3.5vw,32px)',
      marginTop: 32
    }
  }, PILARES.map(([num, title, body]) => React.createElement("div", {
    key: num,
    style: {
      borderTop: '1px solid var(--border-default)',
      paddingTop: 28
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, num), React.createElement("h2", {
    className: "cns-card-heading",
    style: {
      margin: '16px 0 0',
      fontSize: 'clamp(24px,2.6vw,32px)'
    }
  }, title), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '16px 0 0',
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, body))))), React.createElement(DarkFeatureBand, {
    tone: "slate",
    eyebrow: "Evidencia",
    heading: "Respuesta inmediata ante una fiscalizaci\xF3n",
    body: "Consenty exporta expedientes de evidencia con trazabilidad completa: sello de tiempo, versi\xF3n de t\xE9rminos, hash y canal de cada captura. Demuestra la legitimidad del tratamiento y audita internamente el uso del producto.",
    actions: bandActions
  }), React.createElement(Shell, {
    pad: `clamp(64px,9vw,120px) ${GUTTER}`
  }, React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '0 0 clamp(32px,5vw,56px)',
      maxWidth: '22ch',
      fontSize: 'clamp(30px,4.4vw,48px)',
      letterSpacing: '-0.025em'
    }
  }, "Tres m\xF3dulos, un solo registro"), React.createElement(ModuleGrid, {
    navigate: navigate
  })));
}
const PURPOSES = [{
  key: 'comerciales',
  title: 'Comunicaciones comerciales',
  detail: 'Ofertas y novedades por correo.'
}, {
  key: 'perfilamiento',
  title: 'Perfilamiento y recomendaciones',
  detail: 'Personalizar lo que ves según tu actividad.'
}, {
  key: 'terceros',
  title: 'Compartir con terceros',
  detail: 'Socios comerciales seleccionados.'
}];
function ConsentWidget() {
  const [accepted, setAccepted] = useState([false, false, false]);
  const [evidence, setEvidence] = useState(null);
  const toggle = i => () => {
    setAccepted(prev => prev.map((v, n) => n === i ? !v : v));
    setEvidence(null);
  };
  const save = () => setEvidence(Date.now());
  const chosen = PURPOSES.filter((p, i) => accepted[i]).map(p => p.key);
  const record = evidence && {
    timestamp: new Date(evidence).toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
    finalidades: chosen.length ? chosen.join(', ') : 'ninguna aceptada',
    hash: 'sha256:' + (evidence.toString(16) + '9f2c41ab7d').slice(0, 16)
  };
  return React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-utility)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      padding: '24px clamp(18px,2.5vw,28px) 18px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, React.createElement("div", {
    className: "cns-feature-heading"
  }, "Tus preferencias de datos"), React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "T\xE9rminos v2.4 \xB7 Puedes cambiarlas cuando quieras.")), React.createElement("div", {
    style: {
      padding: '4px clamp(18px,2.5vw,28px)'
    }
  }, PURPOSES.map((p, i) => React.createElement("div", {
    key: p.key,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: '18px 0',
      borderBottom: i < PURPOSES.length - 1 ? '1px solid var(--border-subtle)' : undefined
    }
  }, React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, p.title), React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)',
      marginTop: 4
    }
  }, p.detail)), React.createElement("button", {
    onClick: toggle(i),
    role: "switch",
    "aria-checked": accepted[i],
    "aria-label": p.title,
    style: {
      flex: '0 0 auto',
      width: 48,
      height: 28,
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--border-default)',
      cursor: 'pointer',
      padding: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: accepted[i] ? 'flex-end' : 'flex-start',
      background: accepted[i] ? 'var(--color-indigo)' : 'var(--border-utility)',
      transition: 'var(--transition-color)'
    }
  }, React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      display: 'block'
    }
  }))))), React.createElement("div", {
    style: {
      padding: '18px clamp(18px,2.5vw,28px) 24px',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '12px 20px'
    }
  }, React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: save
  }, "Guardar preferencias"), React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-tertiary)'
    }
  }, "Se registra con sello de tiempo y hash")), record && React.createElement("div", {
    role: "status",
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--color-on-dark)',
      padding: '24px clamp(18px,2.5vw,28px)'
    }
  }, React.createElement(MonoLabel, {
    tone: "soft"
  }, "Registro de evidencia"), React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'grid',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'rgba(255,255,255,.72)'
    }
  }, [['timestamp', record.timestamp, false], ['finalidades', record.finalidades, false], ['versión términos', 'v2.4', false], ['canal', 'web / checkout', false], ['hash', record.hash, true]].map(([k, v, wrap]) => React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, React.createElement("span", null, k), React.createElement("span", {
    style: {
      color: 'var(--color-on-dark)',
      wordBreak: wrap ? 'break-all' : undefined
    }
  }, v))))));
}
function ModulosScreen({
  navigate
}) {
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "M\xF3dulos"), React.createElement("h1", {
    className: "cns-product-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '17ch',
      fontSize: 'clamp(34px,6.4vw,72px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "Captura, supervisi\xF3n y autoservicio"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '60ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Tres componentes que cubren el ciclo completo del consentimiento: d\xF3nde se pide, qui\xE9n lo supervisa y c\xF3mo lo ejerce el titular.")), React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(40px,6vw,80px)'
    }
  }, React.createElement("div", {
    style: {
      flex: '1 1 380px',
      minWidth: 0
    }
  }, React.createElement(MonoLabel, null, "Componente 1"), React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '16px 0 0',
      maxWidth: '20ch',
      fontSize: 'clamp(28px,4.2vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Vinculaci\xF3n omnicanal de consentimiento"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '52ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Consenty se conecta mediante conectores y APIs livianas a los puntos donde tu empresa interact\xFAa con las personas. Cada captura genera un sello de tiempo, versi\xF3n de t\xE9rminos y hash de evidencia."), React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, React.createElement(CheckRow, null, "Formulario web y e-commerce (checkout, registros)"), React.createElement(CheckRow, null, "App m\xF3vil y centro de preferencias"), React.createElement(CheckRow, null, "Canales offline: sucursal, call center, terreno"), React.createElement(CheckRow, {
    last: true
  }, "CRM y plataformas de marketing v\xEDa API o webhook"))), React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minWidth: 0,
      background: 'var(--surface-card-stone)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(24px,3vw,36px)'
    }
  }, React.createElement(MonoLabel, null, "Alta del titular"), React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'grid',
      gap: 0
    }
  }, ALTA_STEPS.map(([num, title, body], i) => React.createElement("div", {
    key: num,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 20,
      paddingBottom: i < ALTA_STEPS.length - 1 ? 24 : 0,
      paddingTop: i > 0 ? 24 : 0,
      borderBottom: i < ALTA_STEPS.length - 1 ? '1px solid var(--border-utility)' : undefined
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, num), React.createElement("div", null, React.createElement("div", {
    className: "cns-feature-heading"
  }, title), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '8px 0 0',
      color: 'var(--text-secondary)'
    }
  }, body)))))))), React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement("div", {
    style: {
      background: 'var(--surface-wash-mist)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: 'clamp(24px,4vw,56px)'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(32px,5vw,64px)'
    }
  }, React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minWidth: 0
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Widget de captura"), React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '20px 0 0',
      maxWidth: '18ch',
      fontSize: 'clamp(28px,4.2vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Pru\xE9balo como lo ve tu cliente"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '46ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Ninguna casilla viene pre-marcada, cada finalidad se acepta por separado, y al guardar se emite el registro de evidencia.")), React.createElement(ConsentWidget, null)))), React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, null, "Componente 2"), React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '16px 0 24px',
      maxWidth: '22ch',
      fontSize: 'clamp(28px,4.2vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Panel DPO: respuesta inmediata a auditor\xEDas"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '0 0 clamp(32px,5vw,48px)',
      maxWidth: '62ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "El Delegado de Protecci\xF3n de Datos o el equipo legal cuenta con un centro de mando para supervisar todos los consentimientos existentes, recibir alertas de cambios y atender solicitudes BARCOP de los titulares."), React.createElement(AgentConsoleCard, {
    title: "Panel DPO \xB7 Solicitudes BARCOP",
    status: "En plazo",
    integrations: INTEGRATIONS,
    prompt: "Exportar expediente de evidencia \u2014 titular 12.345.678-9",
    response: "Expediente listo: 14 consentimientos, 3 revocaciones, 1 solicitud de portabilidad. Trazabilidad completa desde marzo 2026."
  }), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
      gap: 'clamp(28px,3.5vw,32px)',
      marginTop: 'clamp(40px,5vw,56px)'
    }
  }, React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "activity",
      size: 28
    }),
    title: "Supervisi\xF3n continua",
    body: "Estado de cada consentimiento y revocaci\xF3n, por canal, finalidad y versi\xF3n de t\xE9rminos."
  }), React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "clock",
      size: 28
    }),
    title: "Alertas y plazos",
    body: "Los 30 d\xEDas legales para responder BARCOP, con avisos antes del vencimiento y responsable asignado."
  }), React.createElement(CapabilityCard, {
    icon: React.createElement(Icon, {
      name: "file-text",
      size: 28
    }),
    title: "Expedientes exportables",
    body: "Evidencia t\xE9cnica inalterable, lista para presentar ante la APDP o una auditor\xEDa interna."
  }))), React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} clamp(64px,9vw,120px)`
  }, React.createElement(MonoLabel, null, "Componente 3"), React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '16px 0 24px',
      maxWidth: '24ch',
      fontSize: 'clamp(28px,4.2vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Portal de consentimientos y derechos BARCOP"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '0 0 clamp(32px,5vw,48px)',
      maxWidth: '62ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "La Ley 21.719 obliga a facilitar el ejercicio de derechos sin tr\xE1mites burocr\xE1ticos. Con su cuenta activa, tus clientes acceden directamente al portal y ejercen sus derechos de forma aut\xF3noma y transparente."), React.createElement("div", {
    className: "cns-barcop-grid",
    style: {
      display: 'grid',
      gap: 1,
      background: 'var(--border-utility)',
      border: '1px solid var(--border-utility)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, BARCOP.map(([letter, title, body]) => React.createElement("div", {
    key: letter,
    style: {
      background: 'var(--surface-card)',
      padding: 'clamp(24px,3vw,32px)'
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, letter), React.createElement("h3", {
    className: "cns-feature-heading",
    style: {
      margin: '12px 0 0'
    }
  }, title), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '8px 0 0',
      color: 'var(--text-secondary)'
    }
  }, body))))));
}
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
function AnswerPill({
  on,
  goodWhenOn,
  onClick,
  label
}) {
  const good = goodWhenOn ? on : !on;
  return React.createElement("button", {
    onClick: onClick,
    "aria-pressed": on,
    "aria-label": label,
    style: {
      flex: '0 0 auto',
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      minHeight: 32,
      padding: '6px 16px',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      border: '1px solid var(--border-default)',
      background: good ? 'var(--surface-card)' : 'var(--surface-alert)',
      color: good ? 'var(--color-ink)' : 'var(--color-warning)',
      transition: 'var(--transition-color)'
    }
  }, on ? 'Sí' : 'No');
}
function ChecklistCard({
  daysLeft
}) {
  const [puntos, setPuntos] = useState(6);
  const [registro, setRegistro] = useState(false);
  const [premarcadas, setPremarcadas] = useState(true);
  const [canal, setCanal] = useState(false);
  const gaps = (registro ? 0 : 1) + (premarcadas ? 1 : 0) + (canal ? 0 : 1) + (puntos > 8 ? 1 : 0);
  const risk = RISK[gaps >= 3 ? 'alto' : gaps === 0 ? 'ok' : 'medio'];
  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  };
  const washRule = '1px solid rgba(67,56,202,.15)';
  return React.createElement("div", {
    style: {
      flex: '1 1 320px',
      minWidth: 0,
      background: 'var(--surface-wash-indigo)',
      borderRadius: 'var(--radius-lg)',
      padding: 'clamp(24px,3vw,40px)'
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Checklist 1 dic"), React.createElement("h3", {
    className: "cns-card-heading",
    style: {
      margin: '16px 0 0',
      fontSize: 'clamp(24px,2.6vw,32px)'
    }
  }, "Quedan ", daysLeft, " d\xEDas"), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '12px 0 24px',
      color: 'var(--text-secondary)'
    }
  }, "Cuatro preguntas para saber d\xF3nde est\xE1s parado hoy."), React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, React.createElement("div", null, React.createElement("label", {
    htmlFor: "puntos-captura",
    style: {
      fontSize: 14,
      display: 'block',
      marginBottom: 10
    }
  }, "Puntos de captura de datos: ", React.createElement("strong", null, puntos)), React.createElement("input", {
    id: "puntos-captura",
    type: "range",
    min: "1",
    max: "20",
    value: puntos,
    onChange: e => setPuntos(Number(e.target.value)),
    style: {
      width: '100%',
      accentColor: 'var(--color-indigo)'
    }
  })), React.createElement("div", {
    style: {
      ...rowStyle,
      borderTop: washRule,
      paddingTop: 16
    }
  }, React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Registro \xFAnico y centralizado"), React.createElement(AnswerPill, {
    on: registro,
    goodWhenOn: true,
    onClick: () => setRegistro(v => !v),
    label: "Registro \xFAnico y centralizado"
  })), React.createElement("div", {
    style: rowStyle
  }, React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Casillas pre-marcadas"), React.createElement(AnswerPill, {
    on: premarcadas,
    goodWhenOn: false,
    onClick: () => setPremarcadas(v => !v),
    label: "Casillas pre-marcadas"
  })), React.createElement("div", {
    style: rowStyle
  }, React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Canal para derechos BARCOP"), React.createElement(AnswerPill, {
    on: canal,
    goodWhenOn: true,
    onClick: () => setCanal(v => !v),
    label: "Canal para derechos BARCOP"
  })), React.createElement("div", {
    role: "status",
    style: {
      borderTop: washRule,
      paddingTop: 20
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement("span", {
    className: "cns-mono-label",
    style: {
      padding: '4px 12px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      fontSize: 12,
      color: risk.color
    }
  }, risk.label), React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, gaps, " ", gaps === 1 ? 'brecha detectada' : 'brechas detectadas')), React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 15,
      lineHeight: 1.5,
      textWrap: 'pretty'
    }
  }, risk.copy), React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Exposici\xF3n m\xE1xima estimada: ", React.createElement("strong", null, risk.exposure)))));
}
function NormativaScreen({
  daysLeft
}) {
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Normativa \xB7 Ley 21.719"), React.createElement("h1", {
    className: "cns-product-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '16ch',
      fontSize: 'clamp(34px,6.4vw,72px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "El nuevo est\xE1ndar de privacidad en Chile"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '62ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Chile promulga un marco regulatorio moderno con est\xE1ndares equivalentes al RGPD europeo y crea la Agencia de Protecci\xF3n de Datos Personales (APDP), con facultades reales de fiscalizaci\xF3n y sanci\xF3n.")), React.createElement(Shell, {
    pad: `clamp(40px,6vw,80px) ${GUTTER} 0`
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(40px,6vw,80px)'
    }
  }, React.createElement("div", {
    style: {
      flex: '1 1 360px',
      minWidth: 0
    }
  }, React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: 0,
      maxWidth: '20ch',
      fontSize: 'clamp(28px,4.2vw,48px)',
      letterSpacing: '-0.025em',
      textWrap: 'balance'
    }
  }, "Nuevas responsabilidades proactivas"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '20px 0 0',
      maxWidth: '50ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Las organizaciones deben demostrar responsabilidad proactiva de forma continua:"), React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, React.createElement(CheckRow, null, React.createElement("strong", null, "Registrar la trazabilidad exacta"), " de cada consentimiento y revocaci\xF3n."), React.createElement(CheckRow, null, React.createElement("strong", null, "Atender solicitudes de derechos BARCOP"), " en un plazo m\xE1ximo de 30 d\xEDas."), React.createElement(CheckRow, {
    last: true
  }, React.createElement("strong", null, "Acreditar evidencia t\xE9cnica inalterable"), " frente a auditor\xEDas de la Agencia."))), React.createElement(ChecklistCard, {
    daysLeft: daysLeft
  }))), React.createElement(Shell, {
    pad: `clamp(64px,9vw,120px) ${GUTTER} 0`
  }, React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '0 0 16px',
      maxWidth: '24ch',
      fontSize: 'clamp(30px,4.4vw,48px)',
      letterSpacing: '-0.025em'
    }
  }, "El riesgo del incumplimiento"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '0 0 clamp(32px,5vw,56px)',
      maxWidth: '58ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)'
    }
  }, "Sanciones severas, medidas operativas y da\xF1o reputacional directo."), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
      gap: 1,
      background: 'var(--border-utility)',
      border: '1px solid var(--border-utility)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, RIESGOS.map(([eyebrow, figure, body]) => React.createElement("div", {
    key: eyebrow,
    style: {
      background: 'var(--surface-card)',
      padding: 'clamp(24px,3vw,40px)'
    }
  }, React.createElement(MonoLabel, {
    tone: "warning"
  }, eyebrow), React.createElement("h3", {
    className: "cns-card-heading",
    style: {
      margin: '14px 0 0',
      fontSize: 'clamp(24px,2.6vw,32px)'
    }
  }, figure), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '10px 0 0',
      color: 'var(--text-secondary)'
    }
  }, body))))), React.createElement(Shell, {
    pad: `clamp(64px,9vw,120px) ${GUTTER}`
  }, React.createElement("h2", {
    className: "cns-section-heading",
    style: {
      margin: '0 0 40px',
      maxWidth: '22ch',
      fontSize: 'clamp(30px,4.4vw,48px)',
      letterSpacing: '-0.025em'
    }
  }, "Documentos y plazos"), React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, React.createElement(ResearchTable, {
    rows: NORMATIVA_ROWS
  }))));
}
function RecursosScreen() {
  const [filter, setFilter] = useState('Todo');
  const rows = useMemo(() => filter === 'Todo' ? RECURSOS : RECURSOS.filter(r => r.topics.indexOf(filter) !== -1), [filter]);
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Recursos"), React.createElement("h1", {
    className: "cns-product-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '16ch',
      fontSize: 'clamp(34px,6.4vw,72px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "Gu\xEDas para llegar en regla"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '58ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Checklists, plantillas y an\xE1lisis pr\xE1cticos para equipos legales, de seguridad y de marketing."), React.createElement("div", {
    role: "group",
    "aria-label": "Filtrar por tema",
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 40
    }
  }, RECURSO_FILTERS.map(f => React.createElement(BlogFilterChip, {
    key: f,
    label: f,
    active: filter === f,
    onClick: () => setFilter(f)
  })))), React.createElement(Shell, {
    pad: `clamp(32px,5vw,56px) ${GUTTER} clamp(64px,9vw,120px)`
  }, React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, React.createElement(ResearchTable, {
    rows: rows
  }))));
}
function ImplementacionScreen({
  navigate,
  mobile
}) {
  const bandActions = useBandActions(navigate);
  const cols = mobile ? '1fr' : '180px 1fr 1fr';
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER} 0`
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, "Implementaci\xF3n"), React.createElement("h1", {
    className: "cns-product-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '16ch',
      fontSize: 'clamp(34px,6.4vw,72px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "Cuatro semanas, escalable desde el d\xEDa uno"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '60ch',
      color: 'var(--text-secondary)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Un plan acotado, con entregables por semana y sin depender de un gran equipo de TI.")), React.createElement(Shell, {
    pad: `clamp(40px,6vw,80px) ${GUTTER} 0`
  }, React.createElement("div", {
    style: {
      display: 'grid',
      gap: 0,
      borderTop: '1px solid var(--border-default)'
    }
  }, SEMANAS.map(([week, title, body, deliverable]) => React.createElement("div", {
    key: week,
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      gap: 'clamp(12px,2vw,40px)',
      padding: 'clamp(24px,3vw,36px) 0',
      borderBottom: '1px solid var(--border-default)'
    }
  }, React.createElement(MonoLabel, {
    tone: "indigo"
  }, week), React.createElement("div", null, React.createElement("h3", {
    className: "cns-card-heading",
    style: {
      margin: 0,
      fontSize: 'clamp(22px,2.6vw,32px)'
    }
  }, title), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '10px 0 0',
      color: 'var(--text-secondary)'
    }
  }, body)), React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, deliverable))))), React.createElement(DarkFeatureBand, {
    tone: "indigo",
    eyebrow: "Soporte",
    heading: "No necesitas un \xE1rea de TI para partir",
    body: "Widgets listos para pegar, APIs livianas y acompa\xF1amiento durante las cuatro semanas. Si tu equipo es peque\xF1o, nosotros hacemos la integraci\xF3n.",
    actions: bandActions,
    style: {
      marginTop: 'clamp(64px,9vw,120px)'
    }
  }));
}
function DemoScreen() {
  const [sent, setSent] = useState(false);
  return React.createElement("main", {
    id: "contenido"
  }, React.createElement("div", {
    style: {
      background: 'var(--surface-band-indigo)',
      color: 'var(--color-on-dark)'
    }
  }, React.createElement(Shell, {
    pad: `clamp(48px,7vw,100px) ${GUTTER}`
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'clamp(40px,6vw,80px)'
    }
  }, React.createElement("div", {
    style: {
      flex: '1 1 340px',
      minWidth: 0
    }
  }, React.createElement(MonoLabel, {
    tone: "soft"
  }, "Agendar demo"), React.createElement("h1", {
    className: "cns-section-display",
    style: {
      margin: '20px 0 0',
      maxWidth: '16ch',
      fontSize: 'clamp(32px,5.6vw,60px)',
      letterSpacing: '-0.03em',
      textWrap: 'balance'
    }
  }, "\xBFListos para proteger su negocio?"), React.createElement("p", {
    className: "cns-body-large",
    style: {
      margin: '24px 0 0',
      maxWidth: '48ch',
      color: 'rgba(255,255,255,.72)',
      fontSize: 'clamp(16px,1.6vw,18px)',
      textWrap: 'pretty'
    }
  }, "Agendemos una sesi\xF3n de trabajo de 30 minutos para analizar sus puntos de captura actuales y dise\xF1ar un plan de adaptaci\xF3n a la medida de su empresa."), React.createElement("div", {
    style: {
      marginTop: 'clamp(32px,5vw,48px)',
      display: 'grid',
      gap: 14,
      fontSize: 16,
      color: 'rgba(255,255,255,.72)'
    }
  }, ['Revisión de tus canales de captura actuales', 'Demostración del panel DPO y del portal de titulares', 'Plan de 4 semanas con responsables y entregables'].map(line => React.createElement("div", {
    key: line,
    style: {
      display: 'flex',
      gap: 12
    }
  }, React.createElement("span", {
    style: {
      color: '#a5a8f0'
    }
  }, "\u2713"), line))), React.createElement("p", {
    style: {
      margin: 'clamp(32px,5vw,48px) 0 0',
      fontSize: 14,
      color: 'rgba(255,255,255,.72)'
    }
  }, "www.consenty.japs.ing")), React.createElement("div", {
    style: {
      flex: '1 1 360px',
      minWidth: 0
    }
  }, sent ? React.createElement("div", {
    role: "status",
    style: {
      background: 'var(--surface-on-dark-panel)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-md)',
      padding: 'clamp(24px,3vw,40px)'
    }
  }, React.createElement(MonoLabel, {
    tone: "soft"
  }, "Solicitud recibida"), React.createElement("h2", {
    className: "cns-card-heading",
    style: {
      margin: '16px 0 0',
      fontSize: 'clamp(24px,2.6vw,32px)'
    }
  }, "Gracias, te escribimos pronto"), React.createElement("p", {
    className: "cns-body",
    style: {
      margin: '12px 0 0',
      color: 'rgba(255,255,255,.72)'
    }
  }, "Te contactamos dentro de un d\xEDa h\xE1bil para coordinar la sesi\xF3n de 30 minutos.")) : React.createElement(ContactFormCard, {
    heading: "Cu\xE9ntanos de tu operaci\xF3n",
    body: "Te contactamos dentro de un d\xEDa h\xE1bil para coordinar la sesi\xF3n.",
    fields: DEMO_FIELDS,
    submitLabel: "Agendar demo comercial",
    onSubmit: () => setSent(true)
  }))))));
}
function App() {
  const [route, navigate] = useRoute();
  const width = useViewportWidth();
  const mobile = width < 1080;
  const narrow = width < 700;
  const daysLeft = useMemo(() => Math.max(0, Math.ceil((DEADLINE - new Date()) / 86400000)), []);
  const screens = {
    inicio: React.createElement(HomeScreen, {
      navigate: navigate,
      daysLeft: daysLeft
    }),
    plataforma: React.createElement(PlataformaScreen, {
      navigate: navigate,
      narrow: narrow
    }),
    modulos: React.createElement(ModulosScreen, {
      navigate: navigate
    }),
    normativa: React.createElement(NormativaScreen, {
      daysLeft: daysLeft
    }),
    recursos: React.createElement(RecursosScreen, null),
    implementacion: React.createElement(ImplementacionScreen, {
      navigate: navigate,
      mobile: mobile
    }),
    demo: React.createElement(DemoScreen, null)
  };
  return React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }
  }, React.createElement(SiteHeader, {
    route: route,
    navigate: navigate,
    mobile: mobile
  }), screens[route], React.createElement(SiteFooter, {
    navigate: navigate
  }));
}
const bundleErrors = window.Consenty && window.Consenty.__errors || [];
if (bundleErrors.length) {
  console.error('Consenty Design System: componentes con error', bundleErrors);
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));

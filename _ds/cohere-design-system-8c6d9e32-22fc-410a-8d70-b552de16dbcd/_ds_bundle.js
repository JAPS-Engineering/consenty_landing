/* @ds-bundle: {"format":4,"namespace":"CohereDesignSystem_8c6d9e","components":[{"name":"AnnouncementBar","sourcePath":"components/core/AnnouncementBar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"FooterNewsletter","sourcePath":"components/core/FooterNewsletter.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"TrustLogoStrip","sourcePath":"components/core/TrustLogoStrip.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"BlogFilterChip","sourcePath":"components/editorial/BlogFilterChip.jsx"},{"name":"ResearchTable","sourcePath":"components/editorial/ResearchTable.jsx"},{"name":"ContactFormCard","sourcePath":"components/forms/ContactFormCard.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"AgentConsoleCard","sourcePath":"components/marketing/AgentConsoleCard.jsx"},{"name":"CapabilityCard","sourcePath":"components/marketing/CapabilityCard.jsx"},{"name":"DarkFeatureBand","sourcePath":"components/marketing/DarkFeatureBand.jsx"},{"name":"HeroPhotoCard","sourcePath":"components/marketing/HeroPhotoCard.jsx"},{"name":"ProductCard","sourcePath":"components/marketing/ProductCard.jsx"}],"sourceHashes":{"components/core/AnnouncementBar.jsx":"0f967673be87","components/core/Button.jsx":"4bb6780cbd40","components/core/FooterNewsletter.jsx":"b89de46ed381","components/core/Icon.jsx":"809bbf845d1b","components/core/TrustLogoStrip.jsx":"b1774d5b8da8","components/core/Wordmark.jsx":"0269e1ba7be3","components/editorial/BlogFilterChip.jsx":"c865c413b347","components/editorial/ResearchTable.jsx":"1a828aa901a5","components/forms/ContactFormCard.jsx":"038f6753f6d7","components/forms/Input.jsx":"44cfeac4c7ec","components/marketing/AgentConsoleCard.jsx":"0574d5949541","components/marketing/CapabilityCard.jsx":"3a3e9953871a","components/marketing/DarkFeatureBand.jsx":"7a1c1864d6e3","components/marketing/HeroPhotoCard.jsx":"b112e2c64ddd","components/marketing/ProductCard.jsx":"39a4012d97cc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CohereDesignSystem_8c6d9e = window.CohereDesignSystem_8c6d9e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/AnnouncementBar.jsx
try { (() => {
function AnnouncementBar({
  message,
  linkLabel = 'Ver más',
  href = '#',
  onDismiss,
  tone = 'neutral',
  style
}) {
  const deadline = tone === 'deadline';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 36,
      background: deadline ? 'var(--surface-alert)' : 'var(--color-primary)',
      color: deadline ? 'var(--color-ink)' : 'var(--color-on-dark)',
      boxShadow: deadline ? 'inset 0 -1px 0 var(--color-coral)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-micro-size)',
      lineHeight: 'var(--text-micro-lh)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 'var(--space-sm)',
      alignItems: 'baseline'
    }
  }, deadline ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--text-mono-label-ls)',
      fontSize: 10,
      color: 'var(--color-coral)'
    }
  }, "1 dic 2026") : null, message, linkLabel ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: 'inherit',
      textUnderlineOffset: '3px'
    }
  }, linkLabel) : null), onDismiss ? /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      right: 'var(--space-lg)',
      background: 'none',
      border: 0,
      color: 'inherit',
      cursor: 'pointer',
      fontSize: 14,
      lineHeight: 1,
      padding: 4
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-ui)',
  fontSize: 'var(--text-button-size)',
  lineHeight: 'var(--text-button-lh)',
  fontWeight: 'var(--text-button-weight)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--space-sm)',
  cursor: 'pointer',
  textDecoration: 'none',
  border: '1px solid transparent',
  transition: 'var(--transition-color)',
  whiteSpace: 'nowrap'
};
const variants = {
  primary: {
    background: 'var(--action-fill)',
    color: 'var(--action-on-fill)',
    borderRadius: 'var(--radius-button)',
    padding: '12px 24px'
  },
  'primary-inverse': {
    background: 'var(--color-canvas)',
    color: 'var(--color-primary)',
    borderRadius: 'var(--radius-button)',
    padding: '12px 24px'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-indigo)',
    fontSize: 'var(--text-body-size)',
    lineHeight: 'var(--text-body-lh)',
    fontWeight: 400,
    borderRadius: 'var(--radius-xs)',
    padding: '8px 0',
    textDecoration: 'underline',
    textUnderlineOffset: '4px'
  },
  'pill-outline': {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-pill)',
    padding: '6px 14px'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  icon,
  onClick,
  style,
  children,
  ...rest
}) {
  const sizing = size === 'lg' ? {
    padding: '16px 32px',
    fontSize: 'var(--text-body-size)'
  } : size === 'sm' ? {
    padding: '8px 16px'
  } : null;
  const s = {
    ...base,
    ...variants[variant],
    ...(variant === 'secondary' ? null : sizing),
    ...(disabled ? {
      opacity: .4,
      cursor: 'not-allowed'
    } : null),
    ...style
  };
  const Tag = href && !disabled ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    style: s
  }, rest), children, icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex'
    }
  }, icon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/FooterNewsletter.jsx
try { (() => {
function FooterNewsletter({
  label = 'Novedades regulatorias',
  headline,
  legal,
  placeholder = 'Email corporativo',
  onSubmit,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--color-on-dark)',
      padding: 'var(--space-40)',
      display: 'grid',
      gap: 'var(--space-xl)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-indigo-soft)',
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      fontSize: 'var(--text-mono-label-size)',
      letterSpacing: 'var(--text-mono-label-ls)'
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-card-heading-size)',
      lineHeight: 'var(--text-card-heading-lh)',
      letterSpacing: 'var(--text-card-heading-ls)',
      maxWidth: '20ch'
    }
  }, headline), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      borderBottom: '1px solid var(--border-on-dark)',
      paddingBottom: 'var(--space-md)',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    style: {
      flex: 1,
      background: 'transparent',
      border: 0,
      outline: 'none',
      color: 'var(--color-on-dark)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-size)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    "aria-label": "Suscribirse",
    style: {
      background: 'none',
      border: 0,
      color: 'var(--color-on-dark)',
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1,
      padding: 0
    }
  }, "\u2192")), legal ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--color-muted)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-micro-size)',
      lineHeight: 'var(--text-micro-lh)',
      maxWidth: 420
    }
  }, legal) : null);
}
Object.assign(__ds_scope, { FooterNewsletter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FooterNewsletter.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.428.0/icons/';
function Icon({
  name,
  size = 20,
  tone = 'dark',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: CDN + name + '.svg',
    alt: "",
    "aria-hidden": "true",
    width: size,
    height: size,
    style: {
      width: size,
      height: size,
      display: 'block',
      filter: tone === 'light' ? 'invert(1)' : tone === 'muted' ? 'opacity(.55)' : 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/TrustLogoStrip.jsx
try { (() => {
function TrustLogoStrip({
  eyebrow,
  names = [],
  tone = 'light',
  style
}) {
  const color = tone === 'dark' ? 'var(--color-on-dark)' : 'var(--color-ink)';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      textAlign: 'center',
      padding: 'var(--space-section) 0',
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-56)',
      color,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-body-large-size)',
      lineHeight: 'var(--text-body-large-lh)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 'var(--space-64)',
      rowGap: 'var(--space-xxl)'
    }
  }, names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      color,
      opacity: .85,
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-feature-heading-size)',
      letterSpacing: '-0.32px'
    }
  }, n))));
}
Object.assign(__ds_scope, { TrustLogoStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TrustLogoStrip.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
const SWOOSH = 'M743.378 141H714.222C720.904 124.419 732.265 107.287 742.5 95C746.018 95.6976 748.05 102.781 749.905 104.815C746.5 88.5 728.5 73 713 68.5V51.5C737 53.5 747 66 760.5 75.5C808.424 33.3631 871.721 26.921 907 28.085C816.834 40.9896 760.349 108.739 743.378 141Z';
const WORD = 'M63.259 95.944C63.259 87.0693 65.179 79.176 69.019 72.264C72.859 65.2667 78.1923 59.848 85.019 56.008C91.931 52.0827 99.739 50.12 108.443 50.12C119.11 50.12 128.24 52.936 135.835 58.568C143.43 64.2 148.507 71.88 151.067 81.608H127.003C125.211 77.8533 122.651 74.9947 119.323 73.032C116.08 71.0693 112.368 70.088 108.187 70.088C101.446 70.088 95.9843 72.4347 91.803 77.128C87.6216 81.8213 85.531 88.0933 85.531 95.944C85.531 103.795 87.6216 110.067 91.803 114.76C95.9843 119.453 101.446 121.8 108.187 121.8C112.368 121.8 116.08 120.819 119.323 118.856C122.651 116.893 125.211 114.035 127.003 110.28H151.067C148.507 120.008 143.43 127.688 135.835 133.32C128.24 138.867 119.11 141.64 108.443 141.64C99.739 141.64 91.931 139.72 85.019 135.88C78.1923 131.955 72.859 126.536 69.019 119.624C65.179 112.712 63.259 104.819 63.259 95.944ZM212.087 141.896C203.639 141.896 195.874 139.933 188.791 136.008C181.794 132.083 176.204 126.621 172.023 119.624C167.927 112.541 165.879 104.605 165.879 95.816C165.879 87.0267 167.927 79.1333 172.023 72.136C176.204 65.1387 181.794 59.6773 188.791 55.752C195.874 51.8267 203.639 49.864 212.087 49.864C220.535 49.864 228.258 51.8267 235.255 55.752C242.338 59.6773 247.884 65.1387 251.895 72.136C255.991 79.1333 258.039 87.0267 258.039 95.816C258.039 104.605 255.991 112.541 251.895 119.624C247.799 126.621 242.252 132.083 235.255 136.008C228.258 139.933 220.535 141.896 212.087 141.896ZM212.087 121.928C219.255 121.928 224.972 119.539 229.239 114.76C233.591 109.981 235.767 103.667 235.767 95.816C235.767 87.88 233.591 81.5653 229.239 76.872C224.972 72.0933 219.255 69.704 212.087 69.704C204.834 69.704 199.031 72.0507 194.679 76.744C190.412 81.4373 188.279 87.7947 188.279 95.816C188.279 103.752 190.412 110.109 194.679 114.888C199.031 119.581 204.834 121.928 212.087 121.928ZM355.72 141H333.832L297.224 85.576V141H275.336V51.144H297.224L333.832 106.824V51.144H355.72V141ZM409.218 141.896C402.647 141.896 396.759 140.829 391.554 138.696C386.349 136.563 382.167 133.405 379.01 129.224C375.938 125.043 374.317 120.008 374.146 114.12H397.442C397.783 117.448 398.935 120.008 400.898 121.8C402.861 123.507 405.421 124.36 408.578 124.36C411.821 124.36 414.381 123.635 416.258 122.184C418.135 120.648 419.074 118.557 419.074 115.912C419.074 113.693 418.306 111.859 416.77 110.408C415.319 108.957 413.485 107.763 411.266 106.824C409.133 105.885 406.061 104.819 402.05 103.624C396.247 101.832 391.511 100.04 387.842 98.248C384.173 96.456 381.015 93.8107 378.37 90.312C375.725 86.8133 374.402 82.248 374.402 76.616C374.402 68.2533 377.431 61.7253 383.49 57.032C389.549 52.2533 397.442 49.864 407.17 49.864C417.069 49.864 425.047 52.2533 431.106 57.032C437.165 61.7253 440.407 68.296 440.834 76.744H417.154C416.983 73.8427 415.917 71.5813 413.954 69.96C411.991 68.2533 409.474 67.4 406.402 67.4C403.757 67.4 401.623 68.1253 400.002 69.576C398.381 70.9413 397.57 72.9467 397.57 75.592C397.57 78.4933 398.935 80.7547 401.666 82.376C404.397 83.9973 408.663 85.7467 414.466 87.624C420.269 89.5867 424.962 91.464 428.546 93.256C432.215 95.048 435.373 97.6507 438.018 101.064C440.663 104.477 441.986 108.872 441.986 114.248C441.986 119.368 440.663 124.019 438.018 128.2C435.458 132.381 431.703 135.709 426.754 138.184C421.805 140.659 415.959 141.896 409.218 141.896ZM482.464 68.68V86.856H511.776V103.752H482.464V123.464H515.616V141H460.576V51.144H515.616V68.68H482.464ZM615.33 141H593.442L556.834 85.576V141H534.946V51.144H556.834L593.442 106.824V51.144H615.33V141ZM700.956 51.144V68.68H677.148V141H655.26V68.68H631.452V51.144H700.956Z';

/** Consenty logo — the supplied lockup: wordmark plus gradient swoosh.
    Two approved treatments: 'dark' for light backgrounds (ink word, indigo→pink swoosh)
    and 'light' for dark/indigo bands (white word, pink→indigo swoosh). variant="letter" flattens
    the swoosh to one flat color for monochrome output — the swoosh IS the terminal "y", never drop it. */
function Wordmark({
  size = 24,
  tone = 'dark',
  accent,
  variant = 'check',
  style
}) {
  const uid = React.useId().replace(/:/g, '');
  const isLight = tone === 'light';
  const mono = variant === 'letter';
  const ink = mono && accent ? accent : isLight ? '#FFFFFF' : '#1A1A1A';
  const base = isLight ? '#FF79BA' : '#4338CA';
  const stop = isLight ? '#4338CA' : '#FF79BA';
  // `size` is letter height; the artwork box is 176 tall with 93 of that being letters.
  const h = size * (176 / 93);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 907 176",
    width: h * 907 / 176,
    height: h,
    role: "img",
    "aria-label": "Consenty",
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: SWOOSH,
    fill: mono ? ink : base
  }), mono ? null : /*#__PURE__*/React.createElement("path", {
    d: SWOOSH,
    fill: `url(#cg${uid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: WORD,
    fill: ink
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `cg${uid}`,
    x1: "880.455",
    y1: "28",
    x2: "754.995",
    y2: "107.573",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0.0480769",
    stopColor: stop
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#4338CA",
    stopOpacity: "0"
  }))));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/editorial/BlogFilterChip.jsx
try { (() => {
function BlogFilterChip({
  label,
  active = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-pressed": active,
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-card-heading-size)',
      fontWeight: 400,
      lineHeight: 'var(--text-card-heading-lh)',
      letterSpacing: 'var(--text-card-heading-ls)',
      padding: '8px 14px',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      transition: 'var(--transition-color)',
      background: active ? 'var(--color-indigo)' : 'transparent',
      color: active ? 'var(--color-on-primary)' : 'var(--color-indigo)',
      border: `1px solid ${active ? 'var(--color-indigo)' : 'var(--border-utility)'}`,
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { BlogFilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/BlogFilterChip.jsx", error: String((e && e.message) || e) }); }

// components/editorial/ResearchTable.jsx
try { (() => {
function ResearchTable({
  rows = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-default)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: r.href || '#',
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
      gap: 'var(--space-xxl)',
      padding: 'var(--space-28) 0',
      borderBottom: '1px solid var(--border-default)',
      textDecoration: 'none',
      color: 'var(--color-ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-large-size)',
      lineHeight: 'var(--text-body-large-lh)',
      maxWidth: '62ch'
    }
  }, r.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)'
    }
  }, (r.topics || []).map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      fontSize: 'var(--text-button-size)',
      whiteSpace: 'nowrap'
    }
  }, t))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      fontSize: 'var(--text-caption-size)',
      whiteSpace: 'nowrap'
    }
  }, r.date))));
}
Object.assign(__ds_scope, { ResearchTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/ResearchTable.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  type = 'text',
  placeholder,
  required,
  error,
  as = 'input',
  rows = 4,
  style,
  ...rest
}) {
  const Tag = as;
  const fieldStyle = {
    width: '100%',
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--text-body-size)',
    lineHeight: 'var(--text-body-lh)',
    color: 'var(--color-ink)',
    background: 'var(--color-canvas)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--border-utility)'}`,
    borderRadius: 'var(--radius-xs)',
    padding: '12px 16px',
    outline: 'none',
    transition: 'var(--transition-color)',
    resize: as === 'textarea' ? 'vertical' : undefined
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: 'var(--space-sm)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-caption-size)',
      color: 'var(--text-secondary)'
    }
  }, label, required ? ' *' : '') : null, /*#__PURE__*/React.createElement(Tag, _extends({
    type: as === 'input' ? type : undefined,
    rows: as === 'textarea' ? rows : undefined,
    placeholder: placeholder,
    style: fieldStyle,
    onFocus: e => {
      e.currentTarget.style.borderColor = 'var(--input-focus)';
    },
    onBlur: e => {
      e.currentTarget.style.borderColor = error ? 'var(--color-error)' : 'var(--border-utility)';
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)',
      fontSize: 'var(--text-micro-size)'
    }
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/ContactFormCard.jsx
try { (() => {
function ContactFormCard({
  heading,
  body,
  fields = [],
  submitLabel = 'Submit',
  onSubmit,
  style
}) {
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit();
    },
    style: {
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-xxl)',
      display: 'grid',
      gap: 'var(--space-xl)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, heading ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-card-heading-size)',
      fontWeight: 400,
      lineHeight: 'var(--text-card-heading-lh)',
      letterSpacing: 'var(--text-card-heading-ls)'
    }
  }, heading) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-size)',
      color: 'var(--text-secondary)'
    }
  }, body) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
      gap: 'var(--space-lg)'
    }
  }, fields.map(f => /*#__PURE__*/React.createElement(__ds_scope.Input, {
    key: f.name,
    label: f.label,
    type: f.type,
    as: f.as,
    required: f.required,
    placeholder: f.placeholder,
    style: f.full || f.as === 'textarea' ? {
      gridColumn: '1 / -1'
    } : undefined
  }))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    type: "submit",
    style: {
      justifySelf: 'start'
    }
  }, submitLabel));
}
Object.assign(__ds_scope, { ContactFormCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ContactFormCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/AgentConsoleCard.jsx
try { (() => {
function AgentConsoleCard({
  title = 'Agent',
  status = 'Running',
  prompt,
  response,
  integrations = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-dark)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-xl)',
      display: 'grid',
      gap: 'var(--space-lg)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body-size)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-xs)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-full)',
      padding: '2px 10px',
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      fontSize: 'var(--text-micro-size)',
      letterSpacing: 'var(--text-mono-label-ls)',
      color: 'var(--color-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-success)'
    }
  }), status)), integrations.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-sm)'
    }
  }, integrations.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: 'var(--surface-on-dark-panel)',
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-xs)',
      padding: '4px 10px',
      fontSize: 'var(--text-micro-size)',
      color: 'var(--color-on-dark)'
    }
  }, i))) : null, prompt ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-on-dark)',
      borderRadius: 'var(--radius-xs)',
      padding: 'var(--space-md)',
      color: 'var(--color-muted)',
      fontSize: 'var(--text-caption-size)'
    }
  }, prompt) : null, response ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-on-dark-panel)',
      borderRadius: 'var(--radius-xs)',
      padding: 'var(--space-lg)',
      fontSize: 'var(--text-caption-size)',
      lineHeight: 1.5
    }
  }, response) : null);
}
Object.assign(__ds_scope, { AgentConsoleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/AgentConsoleCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CapabilityCard.jsx
try { (() => {
function CapabilityCard({
  icon,
  title,
  body,
  linkLabel,
  href = '#',
  tone = 'light',
  rule = true,
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'grid',
      gap: 'var(--space-md)',
      padding: 'var(--space-xl) 0 0',
      borderTop: rule ? `1px solid ${dark ? 'var(--border-on-dark)' : 'var(--border-default)'}` : 'none',
      color: dark ? 'var(--color-on-dark)' : 'var(--color-ink)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      display: 'flex',
      alignItems: 'center'
    }
  }, icon) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-feature-heading-size)',
      fontWeight: 400,
      lineHeight: 'var(--text-feature-heading-lh)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--text-body-lh)',
      color: dark ? 'rgba(255,255,255,.72)' : 'var(--text-secondary)'
    }
  }, body), linkLabel ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      color: 'inherit',
      fontSize: 'var(--text-body-size)',
      textUnderlineOffset: '4px',
      justifySelf: 'start'
    }
  }, linkLabel) : null);
}
Object.assign(__ds_scope, { CapabilityCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CapabilityCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/DarkFeatureBand.jsx
try { (() => {
function DarkFeatureBand({
  eyebrow,
  heading,
  body,
  actions,
  tone = 'indigo',
  rounded = false,
  children,
  style
}) {
  const bg = tone === 'slate' ? 'var(--surface-band-slate)' : tone === 'ink' ? 'var(--surface-inverse)' : 'var(--surface-band-indigo)';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg,
      color: 'var(--color-on-dark)',
      padding: 'var(--space-section) 0',
      borderRadius: rounded ? 'var(--radius-lg)' : 0,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: `0 clamp(20px,4vw,40px)`
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: 'var(--space-xl)',
      color: 'var(--color-indigo-soft)',
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      fontSize: 'var(--text-mono-label-size)',
      letterSpacing: 'var(--text-mono-label-ls)'
    }
  }, eyebrow) : null, heading ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      maxWidth: '18ch',
      fontSize: 'var(--text-section-display-size)',
      fontWeight: 400,
      lineHeight: 'var(--text-section-display-lh)',
      letterSpacing: 'var(--text-section-display-ls)'
    }
  }, heading) : null, body ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-xl) 0 0',
      maxWidth: '56ch',
      fontSize: 'var(--text-body-large-size)',
      lineHeight: 'var(--text-body-large-lh)',
      color: 'rgba(255,255,255,.72)'
    }
  }, body) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 'var(--space-xl)',
      marginTop: 'var(--space-40)'
    }
  }, actions) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-56)'
    }
  }, children) : null));
}
Object.assign(__ds_scope, { DarkFeatureBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/DarkFeatureBand.jsx", error: String((e && e.message) || e) }); }

// components/marketing/HeroPhotoCard.jsx
try { (() => {
function HeroPhotoCard({
  src,
  alt = '',
  caption,
  ratio = '4 / 3',
  radius = 'var(--radius-lg)',
  overlay,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      borderRadius: radius,
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--color-stone)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      width: '100%',
      display: 'grid',
      placeItems: 'center'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      fontSize: 'var(--text-micro-size)',
      letterSpacing: 'var(--text-mono-label-ls)',
      color: 'var(--color-slate)'
    }
  }, "Image placeholder")), overlay ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--space-xl)',
      right: 'var(--space-xl)',
      bottom: 'var(--space-xl)'
    }
  }, overlay) : null, caption ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      padding: 'var(--space-md) var(--space-lg)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-caption-size)',
      color: 'var(--text-secondary)'
    }
  }, caption) : null);
}
Object.assign(__ds_scope, { HeroPhotoCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/HeroPhotoCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProductCard.jsx
try { (() => {
function ProductCard({
  name,
  description,
  bullets = [],
  ctaLabel = 'Ver más',
  href = '#',
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: 'var(--surface-card-stone)',
      color: 'var(--color-ink)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-xxl)',
      display: 'grid',
      gap: 'var(--space-xl)',
      alignContent: 'start',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--text-card-heading-size)',
      fontWeight: 400,
      lineHeight: 'var(--text-card-heading-lh)',
      letterSpacing: 'var(--text-card-heading-ls)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--text-body-lh)',
      color: 'var(--text-secondary)'
    }
  }, description), ctaLabel ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "pill-outline",
    size: "sm",
    href: href,
    style: {
      justifySelf: 'start'
    }
  }, ctaLabel) : null, bullets.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid var(--border-default)',
      margin: 0
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 'var(--space-md)'
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: 'grid',
      gridTemplateColumns: '16px 1fr',
      gap: 'var(--space-md)',
      fontSize: 'var(--text-body-size)',
      lineHeight: 'var(--text-body-lh)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--color-ink)'
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, b))))) : null);
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProductCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FooterNewsletter = __ds_scope.FooterNewsletter;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.TrustLogoStrip = __ds_scope.TrustLogoStrip;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.BlogFilterChip = __ds_scope.BlogFilterChip;

__ds_ns.ResearchTable = __ds_scope.ResearchTable;

__ds_ns.ContactFormCard = __ds_scope.ContactFormCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.AgentConsoleCard = __ds_scope.AgentConsoleCard;

__ds_ns.CapabilityCard = __ds_scope.CapabilityCard;

__ds_ns.DarkFeatureBand = __ds_scope.DarkFeatureBand;

__ds_ns.HeroPhotoCard = __ds_scope.HeroPhotoCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

})();


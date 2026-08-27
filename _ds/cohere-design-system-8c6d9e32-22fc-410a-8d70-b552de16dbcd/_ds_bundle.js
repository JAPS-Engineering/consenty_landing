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
const SWOOSH = 'M707 141.349H680.622C684 126.312 692.265 106.136 702.5 93.8489C705.5 96.3489 708.595 102.497 709.5 105.312C705 89.3125 694 74.8125 672 68.849V51.849C697 52.8125 714.5 68.3125 720 75.3125C758 43.3122 791.5 41.8131 825.5 45.3125C762.5 51.7173 722 90.3125 707 141.349Z';
const WORD = 'M20.259 95.944C20.259 87.0693 22.179 79.176 26.019 72.264C29.859 65.2667 35.1923 59.848 42.019 56.008C48.931 52.0827 56.739 50.12 65.443 50.12C76.1096 50.12 85.2403 52.936 92.835 58.568C100.43 64.2 105.507 71.88 108.067 81.608H84.003C82.211 77.8533 79.651 74.9947 76.323 73.032C73.0803 71.0693 69.3683 70.088 65.187 70.088C58.4456 70.088 52.9843 72.4347 48.803 77.128C44.6216 81.8213 42.531 88.0933 42.531 95.944C42.531 103.795 44.6216 110.067 48.803 114.76C52.9843 119.453 58.4456 121.8 65.187 121.8C69.3683 121.8 73.0803 120.819 76.323 118.856C79.651 116.893 82.211 114.035 84.003 110.28H108.067C105.507 120.008 100.43 127.688 92.835 133.32C85.2403 138.867 76.1096 141.64 65.443 141.64C56.739 141.64 48.931 139.72 42.019 135.88C35.1923 131.955 29.859 126.536 26.019 119.624C22.179 112.712 20.259 104.819 20.259 95.944ZM169.087 141.896C160.639 141.896 152.874 139.933 145.791 136.008C138.794 132.083 133.204 126.621 129.023 119.624C124.927 112.541 122.879 104.605 122.879 95.816C122.879 87.0267 124.927 79.1333 129.023 72.136C133.204 65.1387 138.794 59.6773 145.791 55.752C152.874 51.8267 160.639 49.864 169.087 49.864C177.535 49.864 185.258 51.8267 192.255 55.752C199.338 59.6773 204.884 65.1387 208.895 72.136C212.991 79.1333 215.039 87.0267 215.039 95.816C215.039 104.605 212.991 112.541 208.895 119.624C204.799 126.621 199.252 132.083 192.255 136.008C185.258 139.933 177.535 141.896 169.087 141.896ZM169.087 121.928C176.255 121.928 181.972 119.539 186.239 114.76C190.591 109.981 192.767 103.667 192.767 95.816C192.767 87.88 190.591 81.5653 186.239 76.872C181.972 72.0933 176.255 69.704 169.087 69.704C161.834 69.704 156.031 72.0507 151.679 76.744C147.412 81.4373 145.279 87.7947 145.279 95.816C145.279 103.752 147.412 110.109 151.679 114.888C156.031 119.581 161.834 121.928 169.087 121.928ZM312.72 141H290.832L254.224 85.576V141H232.336V51.144H254.224L290.832 106.824V51.144H312.72V141ZM366.218 141.896C359.647 141.896 353.759 140.829 348.554 138.696C343.349 136.563 339.167 133.405 336.01 129.224C332.938 125.043 331.317 120.008 331.146 114.12H354.442C354.783 117.448 355.935 120.008 357.898 121.8C359.861 123.507 362.421 124.36 365.578 124.36C368.821 124.36 371.381 123.635 373.258 122.184C375.135 120.648 376.074 118.557 376.074 115.912C376.074 113.693 375.306 111.859 373.77 110.408C372.319 108.957 370.485 107.763 368.266 106.824C366.133 105.885 363.061 104.819 359.05 103.624C353.247 101.832 348.511 100.04 344.842 98.248C341.173 96.456 338.015 93.8107 335.37 90.312C332.725 86.8133 331.402 82.248 331.402 76.616C331.402 68.2533 334.431 61.7253 340.49 57.032C346.549 52.2533 354.442 49.864 364.17 49.864C374.069 49.864 382.047 52.2533 388.106 57.032C394.165 61.7253 397.407 68.296 397.834 76.744H374.154C373.983 73.8427 372.917 71.5813 370.954 69.96C368.991 68.2533 366.474 67.4 363.402 67.4C360.757 67.4 358.623 68.1253 357.002 69.576C355.381 70.9413 354.57 72.9467 354.57 75.592C354.57 78.4933 355.935 80.7547 358.666 82.376C361.397 83.9973 365.663 85.7467 371.466 87.624C377.269 89.5867 381.962 91.464 385.546 93.256C389.215 95.048 392.373 97.6507 395.018 101.064C397.663 104.477 398.986 108.872 398.986 114.248C398.986 119.368 397.663 124.019 395.018 128.2C392.458 132.381 388.703 135.709 383.754 138.184C378.805 140.659 372.959 141.896 366.218 141.896ZM439.464 68.68V86.856H468.776V103.752H439.464V123.464H472.616V141H417.576V51.144H472.616V68.68H439.464ZM572.33 141H550.442L513.834 85.576V141H491.946V51.144H513.834L550.442 106.824V51.144H572.33V141ZM657.956 51.144V68.68H634.148V141H612.26V68.68H588.452V51.144H657.956Z';

/** Consenty logo — the supplied lockup: wordmark plus gradient swoosh.
    Two approved treatments: 'dark' for light backgrounds (ink word, indigo→pink swoosh)
    and 'light' for dark/indigo bands (white word, pink→indigo swoosh). variant="letter" flattens
    the swoosh to one flat color for monochrome output — the swoosh IS the terminal "y", never drop it.
    The swoosh carries two overlaid gradients: the accent fade (pink↔indigo) and an ink fade that
    roots its base in the word's own color — dark ink on 'dark', inverted to white on 'light'. */
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
  const inkStop = isLight ? '#FFFFFF' : '#1A1A1A';
  const inkFade = isLight ? '#FFFFFF' : '#666666';
  // `size` is letter height; the artwork box is 192 tall with 93 of that being letters.
  const h = size * (192 / 93);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 826 192",
    width: h * 826 / 192,
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
  }), mono ? null : /*#__PURE__*/React.createElement("path", {
    d: SWOOSH,
    fill: `url(#ig${uid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: WORD,
    fill: ink
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `cg${uid}`,
    x1: "793.5",
    y1: "50.8125",
    x2: "714.032",
    y2: "108",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0.0480769",
    stopColor: stop
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#4338CA",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `ig${uid}`,
    x1: "695",
    y1: "141.312",
    x2: "712.5",
    y2: "90.8125",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: inkStop
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: inkFade,
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


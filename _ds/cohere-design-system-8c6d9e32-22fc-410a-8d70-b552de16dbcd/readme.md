# Consenty Design System

A design system for **Consenty** — an enterprise consent & privacy-compliance platform (modules: Consentimiento, Solicitudes, Registro; surfaces: marketing site, resource library, regulatory library, demo request). Buyer: CEO / CISO / DPO. Market: Spanish-speaking (es-CL) enterprise.

## Where this system sits

Consenty lives at the intersection of three worlds, and the design has to feel like it lives exactly there:

- **Legal / regulatory** → precision, authority, no ambiguity.
- **Security / compliance tech** → solidity, audit-proof, evidence over adjectives.
- **Modern enterprise software** → simple, fluid, frictionless.

**The clichés to avoid:** the cybersecurity costume (padlocks, shields, black-and-matrix-green) and the legaltech costume (gavels, columns, classical serifs). Consenty should read closer to Stripe or Vanta than to a digital notary.

The message carries two notes at once: **regulatory urgency** (the 1 December deadline) and **operational calm** (nothing breaks, the business keeps moving). The system encodes that split — urgency gets exactly one dedicated device (the coral deadline bar), and everything else is calm.

## Provenance

Structure, component inventory, spacing rhythm and layout rules were inherited from an earlier enterprise-web system in this project and then rebranded end-to-end: new palette, new type, tighter radii, indigo primary actions, Spanish copy, a compliance product model, and a new deadline pattern. The retired source document has been removed. No Figma file, no repository, no logo files and no imagery were supplied.

> **How to read components:** every page that loads `_ds_bundle.js` aliases it once — `<script>window.Consenty=window.<compiled namespace></script>` — and then reads components as `const { Button } = window.Consenty`. The compiled namespace itself is generated from the project title and is not editable by hand; the alias keeps every source file brand-consistent regardless.

---

## CONTENT FUNDAMENTALS

**Language.** Spanish (es-CL) for all product and marketing copy. Documentation and code comments stay in English. Neutral second person ("tu equipo", "cuéntanos"), never "usted", never "los usuarios" — say "titulares", "tus equipos", "legal", "marketing".

**Voice.** Sober, declarative, verifiable. Copy sounds like an operations platform talking to a legal and security buyer: obligations, plazos, evidencia. Every claim is checkable. Never alarmist about the law, never dismissive of it either — state the date and move to what to do about it.

**Casing.** Sentence case everywhere — headlines, buttons, nav, labels. The only uppercase is the mono label (JetBrains Mono, +0.6px tracking) for category and system markers: `NORMATIVA`, `MÓDULOS`, `1 DIC 2026`, `EN PLAZO`. Never all-caps a headline or a button.

**Length.** Headlines 4–9 words, one oversized headline per page. Leads one or two sentences at 18px. Body 16px, rarely more than three sentences per block. Buttons 2–3 words.

**Examples in register**
- Hero: *Consentimiento a prueba de auditoría*
- Lead: *Captura, prueba y audita el consentimiento de tus clientes desde un solo lugar — sin frenar al negocio.*
- Band heading: *Tus datos no salen de tu perímetro*
- Deadline bar: *La nueva ley de protección de datos personales entra en vigencia el 1 de diciembre.* · *Ver checklist*
- CTA labels: *Agendar demo* · *Hablar con ventas* · *Ver la plataforma* · *Descargar checklist* · *Leer la documentación*
- Status chips: *Al día* · *En plazo* · *Por vencer*

**Avoid:** exclamation marks, fear-selling ("multas millonarias", "no te arriesgues"), "revolucionario" / "el futuro del compliance", invented statistics, legal advice phrased as certainty, and citing a specific law number or article — say "la nueva ley de protección de datos personales" unless the client supplies the exact citation.

**Emoji: never.** Unicode only for functional marks: `✓` in bullet rows, `→` on the newsletter submit, `×` on the bar dismiss.

**Vibe.** A compliance platform that produces evidence. Restraint reads as trustworthiness; the whitespace does the reassuring.

---

## VISUAL FOUNDATIONS

**Colors.** Neutral white canvas dominates. Ink `#18181b` carries the footer, console cards and the highest-contrast text. **Indigo `#4338ca` is the action color** — primary buttons, links, focus, taxonomy labels — and `#3730a3` is its hover. Two dark bands invert the page: deep indigo `#2a2166` (platform, capability, form) and slate deep `#1e2532` (security, audit, evidence). Neutral stone `#f4f4f5` is the card surface; indigo wash `#eef0fc` and mist `#f6f8fa` back single sections. **Coral `#d97757` is reserved — it means "deadline".** It appears in the announcement bar's rule and date stamp and nowhere else; it is never a decorative accent. Semantic states: `#17795e` compliant, `#b45309` due soon, `#b42318` error. Max two background colors per page beyond white.

**Type.** Two faces, one mono. **Inter Tight** carries every heading from 96px hero down to 24px feature heading, at weight 500–600 with tight negative tracking (−3.36px at 96px). **Inter** carries body, buttons, forms and microcopy at 400/500. **JetBrains Mono** is uppercase technical labels only. Hierarchy comes from size, weight (400 vs 500) and surface contrast — never from 700-weight shouting.

**Spacing & layout.** 8px base with honest one-offs (2, 6, 10, 20, 22, 28, 36, 56, 60, 64). Section rhythm 80px, often 120px. Container max 1440px with 40px gutters. Nav is a fixed three-zone row (wordmark left, links centered, sign-in + CTA right), sticky, 72px, 1px bottom rule. Feature grids 3-up, collapsing 3 → 2 → 1. Forms use paired two-column rows.

**Corner radii.** Deliberately tighter than a consumer product: 4px utility, **6px buttons and inputs** (never pills for actions), 10px cards, 14px media and grouped blocks, 20px large containers, full only for status chips, filter pills and dots.

**Cards.** Flat. No drop shadows anywhere. A card is a surface (`#f4f4f5` stone, `#18181b` ink, translucent white on dark) plus a radius; on white it gets a hairline or nothing at all — a top rule and open space often replace the box entirely. Elevation is surface alternation, not depth.

**Borders & rules.** 1px, always. `#d4d4d8` list rules and dividers, `#e4e4e7` inputs and utility rules, `#f0f0f1` faintest containment, `rgba(255,255,255,.18)` on dark bands. Rules are the primary containment device.

**Shadows.** None in the UI. `--shadow-media` exists as a barely-there lift for a floating media card and should almost never be used.

**Backgrounds.** Flat fields only — no patterns, no textures, no noise, no decorative gradients, no hand-drawn illustration. Imagery appears as **rounded cards with visible corners** (14px), never as a full-bleed backdrop behind text, so no scrims are needed.

**Imagery vibe.** Cool, real, unstaged: workplace photography of legal and security teams, screens and documents, abstract renders in indigo and slate. No stock handshakes, no padlock icons, no gavels, no binary-code overlays. Client and partner logos are always monochrome.

**Transparency & blur.** Only on dark bands: `rgba(255,255,255,.06)` inner panels, `.18` borders, `.72` secondary text. No frosted glass, no backdrop blur.

**Animation.** Minimal and functional: 200ms color/background/opacity on `cubic-bezier(.4,0,.2,1)`. No bounce, no spring, no scroll-jacking, no parallax, no countdown that ticks in the viewport.

**Hover.** Indigo fills darken to `#3730a3`; links and monochrome logos drop to ~70–85% opacity; nav links shift from secondary to ink; outline pills invert to an ink fill when selected. Never a hue change on hover.

**Press.** Opacity ~0.86 on the fill. No scale transform, no shadow change.

**Focus.** Indigo `#4338ca` 2px outline with 2px offset; inputs move their border to the same indigo. Errors use `#b42318` for border and message.

**Fixed elements.** Only the announcement bar (36px) and the nav (72px, sticky). No floating action buttons, no sticky sidebars.

---

## THE DEADLINE PATTERN

Regulatory urgency has exactly one home: `AnnouncementBar tone="deadline"`.

- Soft alert wash `#fbeade` background, ink text, 1px coral bottom rule, a mono `1 DIC 2026` stamp before the message.
- One short sentence stating the fact, plus one action link (*Ver checklist*).
- Dismissible. It never reappears in the same session, and it is never duplicated by a second urgency device on the page.
- Everywhere else, the deadline is stated as plain copy in a heading or CTA (*Prepara tu organización antes del 1 de diciembre*) — no coral, no countdown timer, no red.

`tone="neutral"` (ink strip) is for ordinary product news.

---

## ICONOGRAPHY

- **Substitution (flagged):** [Lucide](https://lucide.dev) from CDN (`unpkg.com/lucide-static@0.428.0/icons/<name>.svg`) — 24px grid, 2px geometric stroke, no fills. Wrapped by `Icon` (`components/core/Icon.jsx`) with a `tone` prop that inverts glyphs to white on dark bands. Replace with a licensed set when one exists.
- **Allowed glyph vocabulary:** documents, checks, clocks, servers, people, plugs, activity. `shield-check` is used sparingly, for security sections only. **No padlocks, no gavels, no scales of justice, no fingerprints.**
- **No hand-drawn SVGs.** Nothing in this project draws a brand glyph by hand.
- **Sizes:** 16px inline, 20px default, 28–32px capability glyphs.
- **Logo (supplied artwork):** the `Wordmark` component renders the real lockup — wordmark plus the gradient swoosh — in two approved treatments: `tone="dark"` (ink word, indigo→pink swoosh) on light surfaces, `tone="light"` (white word, pink→indigo swoosh) on indigo, slate and ink bands. `size` is the letter height. `variant="letter"` flattens the lockup to one flat color for monochrome output — the swoosh is the terminal "y" and is never removed. Never retype, recolor, rotate or redraw the mark; clear space is one letter height on every side. Static files: `assets/logo.svg`, `assets/logo-inverse.svg`. See `guidelines/brand-wordmark.card.html`.

## Gaps & substitutions — please review

1. **Logo is final artwork** (supplied Aug 2026, light + dark versions). Only two treatments are approved; anything else needs new artwork, not a prop.
2. **No imagery.** Every photo and render is a stone placeholder frame at the correct radius and ratio.
3. **Icons substituted** (Lucide, as above).
4. **Client names are invented** (Andesbank, Vitalis, Nortec, Grupo Araucaria, Cimar) — replace with real logos and permission before any external use.
5. **No legal citation.** Copy never names a law number or article; supply the exact citation if it should appear.
6. **No app UI kit.** Consent capture, the DSAR queue and the records register are shown only as the marketing console mockup (`AgentConsoleCard`); building the app would be invention.
7. **Bundle namespace** is generated from the project title, so it is not renamed in the compiled output; source files use the `window.Consenty` alias instead (see above).

---

## Index

**Root** — `styles.css` (the single entry point consumers link; `@import` lines only), `readme.md`, `SKILL.md`, `thumbnail.html`.

**`tokens/`** — `fonts.css` (Inter Tight / Inter / JetBrains Mono), `colors.css`, `typography.css` (scale tokens + `.cns-*` type classes), `spacing.css`, `radius.css`, `motion.css`, `base.css`.

**`components/`** — 15 families, each with `.jsx` + `.d.ts` + `.prompt.md`, one card HTML per directory.

| Group | Components |
|---|---|
| `core/` | `Wordmark`, `Button`, `AnnouncementBar`, `TrustLogoStrip`, `FooterNewsletter`, `Icon` |
| `marketing/` | `HeroPhotoCard`, `AgentConsoleCard`, `CapabilityCard`, `DarkFeatureBand`, `ProductCard` |
| `editorial/` | `BlogFilterChip`, `ResearchTable` |
| `forms/` | `Input`, `ContactFormCard` |

Names are structural, not literal: `AgentConsoleCard` is the evidence/console overlay, `ResearchTable` is the regulatory document list, `BlogFilterChip` filters the resource library. `Button` variants: `primary` (indigo), `primary-inverse` (white, for dark bands), `secondary` (underlined indigo text), `pill-outline` (topic filters). `DarkFeatureBand` tones: `indigo` (default), `slate`, `ink`.

**`ui_kits/website/`** — consenty.cl click-through: `index.html`, `Chrome.jsx`, `HomeScreen.jsx`, `ProductScreen.jsx`, `BlogScreen.jsx`, `ResearchScreen.jsx`, `ContactScreen.jsx`, `WebsiteApp.jsx`, `README.md`.

**`guidelines/`** — 19 specimen cards: colors (brand, surfaces, text, rules, semantic), type (display, headings, body, utility, mono, families), spacing (scale, rhythm, radius, elevation), brand (wordmark, band inversion, interaction states, iconography).

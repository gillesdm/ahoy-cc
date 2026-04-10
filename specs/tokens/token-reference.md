# Token Reference

Master map of every CSS custom property defined in `prototype/src/tokens.css`.

- **Layer 1** tokens are defined by `@teamleader/ahoy` — listed here for discoverability only.
- **Layer 2** tokens are defined in `tokens.css` — use these in all component CSS.

---

## Colors

### Layer 2 — Semantic (use these)

| Variable | Layer 1 source | Fallback | Purpose |
|----------|---------------|----------|---------|
| `--color-text` | `--color-teal-darkest` | `#1c1e22` | Primary body text |
| `--color-text-subtle` | `--color-teal-dark` | `#293b4d` | Secondary / caption text |
| `--color-bg` | `--color-neutral-lightest` | `#ffffff` | Page background |
| `--color-surface` | `--color-white` | `#ffffff` | Card / panel surface |
| `--color-border` | `--color-neutral-dark` | `#bebfc7` | Dividers and borders |
| `--color-accent` | `--color-mint` | `#00b2b2` | Brand primary, CTA |
| `--color-accent-bg` | `--color-mint-lightest` | `#f0fafa` | Accent background fill |
| `--color-accent-border` | `--color-mint-dark` | `#008c8c` | Accent hover border |
| `--color-focus` | `--color-mint` | `#00b2b2` | Focus ring color |
| `--color-link` | `--color-teal-darkest` | `#1c1e22` | Link text |
| `--color-link-bg` | `--color-neutral-light` | `#f7f7fb` | Link pill background |
| `--color-error` | `--color-ruby-dark` | `#e05c1a` | Error / destructive |
| `--color-success` | `--color-mint-dark` | `#008c8c` | Success state |
| `--color-warning` | `--color-gold-dark` | `#ed9b00` | Warning state |

### Navigation (Sidebar organism)

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-nav-bg` | `#2a3b4d` | Sidebar background — Ahoy `--color-teal-dark` primitive; no generic semantic alias exists for inverted dark nav surfaces |
| `--color-nav-item-hover` | `rgba(255,255,255,0.08)` | Nav item background on hover |
| `--color-nav-item-active` | `rgba(255,255,255,0.15)` | Nav item background when active (current page) |
| `--color-nav-item-active-hover` | `rgba(255,255,255,0.20)` | Nav item background when active and hovered |

### Legacy aliases (backward-compat, prefer `--color-*` above)

| Variable | Maps to |
|----------|---------|
| `--accent` | `var(--color-accent)` |
| `--accent-bg` | `var(--color-accent-bg)` |
| `--accent-border` | `var(--color-accent-border)` |
| `--border` | `var(--color-border)` |
| `--text-h` | `var(--color-text)` |
| `--social-bg` | `var(--color-link-bg)` |
| `--shadow` | `var(--box-shadow-200)` |

---

## Spacing

### Layer 2 — Scale

| Variable | Resolves to | Value |
|----------|------------|-------|
| `--space-1` | `--spacer-smallest` | 3px |
| `--space-2` | `--spacer-smaller` | 6px |
| `--space-3` | _(raw)_ | 8px |
| `--space-4` | `--spacer-small` | 12px |
| `--space-5` | `--spacer-regular` | 18px |
| `--space-6` | `--spacer-medium` | 24px |
| `--space-7` | `--spacer-big` | 36px |
| `--space-8` | `--spacer-bigger` | 48px |
| `--space-9` | `--spacer-biggest` | 72px |

### Layer 2 — Project-specific

| Variable | Value | Where used |
|----------|-------|-----------|
| `--space-xxs` | 5px | `.counter` block padding |
| `--space-xs-alt` | 10px | `.counter` inline padding |
| `--space-icon` | 16px | Icon margin-bottom |
| `--space-mobile` | 20px | Mobile horizontal padding |
| `--space-icon-lg` | 22px | Icon element dimensions |
| `--space-gap-lg` | 25px | `#center` column gap |
| `--space-section` | 32px | Section padding |
| `--space-spacer` | 88px | Desktop spacer height |

---

## Typography

| Variable | Value | Purpose |
|----------|-------|---------|
| `--font-family-base` | `var(--font-family-inter)` | All text |
| `--font-size-xs` | `calc(1.2 * var(--unit))` = 12px | Small / caption |
| `--font-size-sm` | `calc(1.4 * var(--unit))` = 14px | Body default |
| `--font-size-base` | `calc(1.6 * var(--unit))` = 16px | UI text, links |
| `--font-size-lg` | `calc(1.8 * var(--unit))` = 18px | Subheading |
| `--font-size-xl` | `calc(2.4 * var(--unit))` = 24px | Page heading |
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | UI text |
| `--font-weight-semibold` | 600 | Emphasis |
| `--font-weight-bold` | 700 | Headings |
| `--line-height-tight` | `calc(1.8 * var(--unit))` = 18px | Compact |
| `--line-height-base` | `calc(2.1 * var(--unit))` = 21px | Body |
| `--line-height-loose` | `calc(2.4 * var(--unit))` = 24px | Relaxed |
| `--line-height-heading` | `calc(3 * var(--unit))` = 30px | Headings |
| `--letter-spacing-caps` | `0.06em` | Standard UPPERCASE tracking (H4, section headers) |
| `--letter-spacing-caps-wide` | `0.08em` | Wide UPPERCASE tracking (eyebrow / decorative) |
| `--font-feature-tabular` | `'lnum' 1, 'tnum' 1` | Monospaced / numeric text |

---

## Border Radius

| Variable | Resolves to | Value | Usage |
|----------|------------|-------|-------|
| `--radius-sm` | `--border-radius-small` | 2px | Tags, badges |
| `--radius-md` | `--border-radius-medium` | 4px | Standard (default) |
| `--radius-lg` | `--border-radius-large` | 8px | Cards, modals |
| `--radius-round` | `--border-radius-round` | 50% | Circles |
| `--radius-counter` | _(raw)_ | 5px | `.counter` element |
| `--radius-link` | _(raw)_ | 6px | Link pill buttons |

---

## Elevation / Shadows

| Variable | Ahoy source | Value | Usage |
|----------|-------------|-------|-------|
| `--elevation-1` | `--box-shadow-100` | `0 1px 1px 0 rgba(42,59,77,.12)` | Subtle lift |
| `--elevation-2` | `--box-shadow-200` | `0 2px 6px 0 rgba(42,59,77,.24)` | Normal lift |
| `--elevation-3` | `--box-shadow-300` | `0 6px 10px 0 rgba(42,59,77,.24)` | Raised |
| `--elevation-4` | `--box-shadow-400` | `0 24px 32px 0 rgba(42,59,77,.36)` | Floating |

---

## Z-Index

| Variable | Value | Usage |
|----------|-------|-------|
| `--z-below` | -1 | Behind page (pseudo-elements) |
| `--z-base` | 0 | Default stacking |
| `--z-above` | 1 | Slightly elevated (hero overlays) |
| `--z-overlay` | 10 | Dropdowns, tooltips |
| `--z-modal` | 100 | Modal dialogs |
| `--z-toast` | 1000 | Toast notifications |

---

## Motion

| Variable | Value | Purpose |
|----------|-------|---------|
| `--duration-fast` | `var(--animation-duration)` = 0.35s | Ahoy animations |
| `--duration-base` | 0.3s | Hover micro-interactions |
| `--easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General state changes |
| `--easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `--easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |
| `--transition-border` | `border-color 0.3s ease-default` | Border hover |
| `--transition-shadow` | `box-shadow 0.3s ease-default` | Shadow hover |

---

## Layer 1 Reference: Key Ahoy Primitives

These are defined by `@teamleader/ahoy` and injected at runtime.
Do not redefine. Use Layer 2 aliases instead.

```
--unit: 10px
--spacer-unit: 3px
--spacer-smallest .. --spacer-biggest  (3px – 72px)
--border-radius-small .. --border-radius-round  (2px – 50%)
--box-shadow-100 .. --box-shadow-400
--animation-duration: 0.35s
--animation-curve-default: cubic-bezier(0.4, 0, 0.2, 1)
--color-{family}-{shade}  (7 families × 5 shades + black + white)
--font-family-inter
```

---

## Uses

- [Color](../foundations/color.md) — source for all `--color-*` semantic aliases
- [Spacing](../foundations/spacing.md) — source for all `--space-*` scale tokens
- [Typography](../foundations/typography.md) — source for all `--font-*` and `--line-height-*` tokens
- [Radius](../foundations/radius.md) — source for all `--radius-*` tokens
- [Elevation](../foundations/elevation.md) — source for all `--elevation-*` tokens
- [Motion](../foundations/motion.md) — source for all `--duration-*`, `--easing-*`, and `--transition-*` tokens

## Used by

- [Button](../atoms/button.md) — consumes color, spacing, radius, elevation, motion tokens
- [Input](../atoms/input.md) — consumes color, typography, radius, motion tokens
- [IconButton](../atoms/icon-button.md) — consumes color tokens
- [Counter](../molecules/counter.md) — consumes color, spacing, typography, radius, motion tokens
- [Hero](../molecules/hero.md) — consumes z-index tokens (`--z-base`, `--z-above`)
- [Next Steps](../organisms/next-steps.md) — consumes color, spacing, typography, radius, elevation, motion tokens
- [Layout](../patterns/layout.md) — consumes spacing and color tokens for section structure

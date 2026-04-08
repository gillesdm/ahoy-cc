# Color

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `ahoy-demo/src/tokens.css`

## Overview

Colors come from two layers:

1. **Layer 1 — Ahoy palette** — HSL-based primitives injected by `@teamleader/ahoy/dist/es/index.css`. Never reference these in component CSS directly.
2. **Layer 2 — Semantic aliases** — Defined in `tokens.css`. Always use these.

---

## Layer 1: Ahoy Color Palette

All colors follow the pattern `--color-{family}-{shade}`.

| Family | Lightest | Light | Base | Dark | Darkest |
|--------|----------|-------|------|------|---------|
| `mint` | `hsl(180, 50%, 96%)` | `hsl(180, 58%, 58%)` | `hsl(180, 100%, 35%)` | `hsl(181, 100%, 27%)` | `hsl(182, 100%, 15%)` |
| `teal` | `hsl(215, 67%, 96%)` | `hsl(213, 31%, 81%)` | `hsl(212, 18%, 48%)` | `hsl(211, 29%, 23%)` | `hsl(220, 10%, 11%)` |
| `neutral` | `hsl(0, 0%, 100%)` | `hsl(240, 23%, 97%)` | `hsl(240, 4%, 90%)` | `hsl(240, 3%, 76%)` | `hsl(240, 4%, 53%)` |
| `aqua` | `hsl(212, 100%, 97%)` | `hsl(212, 100%, 90%)` | `hsl(212, 100%, 80%)` | `hsl(212, 100%, 47%)` | `hsl(212, 100%, 33%)` |
| `ruby` | `hsl(13, 100%, 96%)` | `hsl(15, 100%, 83%)` | `hsl(15, 100%, 63%)` | `hsl(15, 82%, 50%)` | `hsl(15, 100%, 30%)` |
| `gold` | `hsl(39, 100%, 95%)` | `hsl(40, 100%, 78%)` | `hsl(40, 100%, 70%)` | `hsl(40, 100%, 46%)` | `hsl(25, 100%, 28%)` |
| `violet` | `hsl(243, 100%, 95%)` | `hsl(243, 96%, 91%)` | `hsl(253, 100%, 56%)` | `hsl(253, 100%, 36%)` | `hsl(253, 100%, 24%)` |
| `black` | — | — | `hsl(0, 0%, 0%)` | — | — |
| `white` | — | — | `hsl(0, 0%, 100%)` | — | — |

---

## Layer 2: Semantic Aliases (use these in components)

### Text colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text` | `var(--color-teal-darkest)` | Primary body text |
| `--color-text-subtle` | `var(--color-teal-dark)` | Secondary / caption text |

### Background colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `var(--color-neutral-lightest)` | Page background |
| `--color-surface` | `var(--color-white)` | Card / panel surface |
| `--color-link-bg` | `var(--color-neutral-light)` | Social link pill background |
| `--color-accent-bg` | `var(--color-mint-lightest)` | Accent / counter background |

### Border colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `var(--color-neutral-dark)` | Default dividers and borders |
| `--color-accent-border` | `var(--color-mint-dark)` | Accent hover border |

### Interactive / Brand

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `var(--color-mint)` | Brand primary, CTA |
| `--color-focus` | `var(--color-mint)` | Focus ring |
| `--color-link` | `var(--color-teal-darkest)` | Link text |

### Semantic states

| Token | Value | Usage |
|-------|-------|-------|
| `--color-error` | `var(--color-ruby-dark)` | Error messages, destructive |
| `--color-success` | `var(--color-mint-dark)` | Success confirmation |
| `--color-warning` | `var(--color-gold-dark)` | Warning notices |

### Legacy aliases (App.css compatibility)

These map the Vite starter template variable names to semantic tokens.
Do not introduce new usage of these names — use `--color-*` instead.

| Legacy | Maps to |
|--------|---------|
| `--accent` | `var(--color-accent)` |
| `--accent-bg` | `var(--color-accent-bg)` |
| `--accent-border` | `var(--color-accent-border)` |
| `--border` | `var(--color-border)` |
| `--text-h` | `var(--color-text)` |
| `--social-bg` | `var(--color-link-bg)` |
| `--shadow` | `var(--box-shadow-200)` |

---

## Rules

- **Never** use raw hex, `rgb()`, or `hsl()` in component CSS.
- **Never** reference `--color-*` palette tokens directly in components — use semantic aliases.
- For new colors not in the palette, discuss with the design team before adding a Layer 2 alias.

---

## Used by

- [Button](../atoms/button.md) — `--color-accent`, `--color-accent-bg`, `--color-accent-border`, `--color-focus`, `--color-text`, `--color-surface`
- [Input](../atoms/input.md) — Layer 1 palette tokens for border, background, and validation states
- [IconButton](../atoms/icon-button.md) — `--color-neutral-darkest-hsl`, `--color-teal-darkest` for interaction states
- [Counter](../molecules/counter.md) — `--color-accent`, `--color-accent-bg`, `--color-accent-border`, `--color-focus`
- [Next Steps](../organisms/next-steps.md) — `--color-border`, `--color-link-bg`, `--color-text`, `--color-link`
- [Layout](../patterns/layout.md) — `--color-border` for section dividers
- [Token Reference](../tokens/token-reference.md) — master reference listing all semantic aliases

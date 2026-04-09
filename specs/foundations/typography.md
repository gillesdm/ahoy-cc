# Typography

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `ahoy-demo/src/tokens.css`

## Overview

Typography is built on Ahoy's `--unit: 10px` base and the Inter variable font.
All sizes use `calc(N × var(--unit))` so they scale if `--unit` changes.

---

## Font Family

| Token | Value | Usage |
|-------|-------|-------|
| `--font-family-base` | `var(--font-family-inter)` | All text in the project |
| `--font-family-inter` _(Ahoy)_ | `'Inter', trebuchet ms, verdana, Arial, sans-serif` | Ahoy primitive |

**Font loading:** Inter is loaded as a variable font (weight 100–900) from Teamleader's CDN via `@font-face` in Ahoy's CSS. No separate font import needed.

---

## Font Sizes

| Token | Calc | Rendered | Ahoy class equivalent |
|-------|------|----------|-----------------------|
| `--font-size-xs` | `1.2 × --unit` | **12px** | `.text-small`, `.ui-text-small` |
| `--font-size-sm` | `1.4 × --unit` | **14px** | `.text-body`, `.ui-text-body`, `.heading-5` |
| `--font-size-base` | `1.6 × --unit` | **16px** | `.text-display`, `.heading-3` |
| `--font-size-lg` | `1.8 × --unit` | **18px** | `.heading-2` |
| `--font-size-xl` | `2.4 × --unit` | **24px** | `.heading-1` |

---

## Font Weights

| Token | Value | Ahoy class equivalent |
|-------|-------|-----------------------|
| `--font-weight-regular` | `400` | `.text` |
| `--font-weight-medium` | `500` | `.ui-text`, `.heading-2`, `.heading-3` |
| `--font-weight-semibold` | `600` | `.text strong`, `.heading-5` |
| `--font-weight-bold` | `700` | `.ui-text strong`, `.heading-1`, `.heading-4` |

---

## Line Heights

| Token | Calc | Rendered |
|-------|------|----------|
| `--line-height-tight` | `1.8 × --unit` | **18px** |
| `--line-height-base` | `2.1 × --unit` | **21px** |
| `--line-height-loose` | `2.4 × --unit` | **24px** |
| `--line-height-heading` | `3 × --unit` | **30px** |

---

## Letter Spacing

Only uppercase styles use a non-zero letter spacing. All other styles have `letter-spacing: normal`.
Values are expressed in `em` so they scale with font size.

| Token | Value | Usage |
|-------|-------|-------|
| `--letter-spacing-caps` | `0.06em` | Standard uppercase tracking — Heading 4, section headers |
| `--letter-spacing-caps-wide` | `0.08em` | Wide uppercase tracking — eyebrow / decorative text |

```css
/* correct */
letter-spacing: var(--letter-spacing-caps);
letter-spacing: var(--letter-spacing-caps-wide);

/* wrong — never use raw values */
letter-spacing: 0.06em;
letter-spacing: 0.08em;
```

---

## Font Features

Monospaced and numeric display contexts use tabular lining numerals via `font-feature-settings`.

| Token | Value | Usage |
|-------|-------|-------|
| `--font-feature-tabular` | `'lnum' 1, 'tnum' 1` | Monospaced / numeric text |

```css
/* correct */
font-feature-settings: var(--font-feature-tabular);

/* wrong */
font-feature-settings: 'lnum' 1, 'tnum' 1;
```

---

## Ahoy Type Classes (reference)

Use Ahoy's utility classes on HTML elements when possible instead of manually applying font tokens.

| Class | Size | Weight | Line height | Letter spacing | Notes |
|-------|------|--------|-------------|----------------|-------|
| `.heading-1` | 24px | 700 | 30px | — | Page title |
| `.heading-2` | 18px | 500 | 24px | — | Section title |
| `.heading-3` | 16px | 500 | 21px | — | Subsection |
| `.heading-4` | 12px | 700 | 18px | `--letter-spacing-caps` (0.06em) | Label — UPPERCASE |
| `.heading-5` | 14px | 600 | 18px | — | Card title |
| `.text-display` | 16px | 400 | 24px | — | Prominent body |
| `.text-body` | 14px | 400 | 21px | — | Default body |
| `.text-body-compact` | 14px | 400 | 18px | — | Dense body |
| `.text-small` | 12px | 400 | 18px | — | Caption / metadata |
| `.ui-text-display` | 16px | 500 | 24px | — | UI control large |
| `.ui-text-body` | 14px | 500 | 18px | — | UI control default |
| `.ui-text-small` | 12px | 500 | 18px | — | UI control small |

---

## Monospaced

Used for numeric display (amounts, counts, IDs). Inter Regular with tabular lining numerals — not a separate typeface.

| Style | Size token | Weight token | Line height token | Feature token |
|-------|-----------|--------------|-------------------|---------------|
| Monospaced Small | `--font-size-xs` (12px) | `--font-weight-regular` | `--line-height-tight` (18px) | `--font-feature-tabular` |
| Monospaced Body | `--font-size-sm` (14px) | `--font-weight-regular` | `--line-height-tight` (18px) | `--font-feature-tabular` |
| Monospaced Display | `--font-size-base` (16px) | `--font-weight-regular` | `--line-height-loose` (24px) | `--font-feature-tabular` |

```css
/* Example: numeric value in a table cell */
.amount {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-tight);
  font-feature-settings: var(--font-feature-tabular);
}
```

---

## Lists

Lists follow the text scale. Use standard `<ul>` / `<ol>` markup; apply Ahoy text classes to the list element or its `<li>` children.

| List size | Size token | Weight token | Line height token |
|-----------|-----------|--------------|-------------------|
| Small | `--font-size-xs` (12px) | `--font-weight-regular` | `--line-height-tight` (18px) |
| Body | `--font-size-sm` (14px) | `--font-weight-regular` | `--line-height-base` (21px) |
| Display | `--font-size-base` (16px) | `--font-weight-regular` | `--line-height-loose` (24px) |

---

## Rules

- **Never** use raw pixel values in `font-size`, `font-weight`, or `letter-spacing` properties.
- Use Ahoy type classes (`.text-body`, `.heading-*`, etc.) on HTML elements when possible.
- When you must set `font-size` in CSS, use `--font-size-*` tokens.
- When you must set `font-weight` in CSS, use `--font-weight-*` tokens.
- When you must set `letter-spacing` in CSS, use `--letter-spacing-caps` (the only non-zero value in the system).
- When you need tabular/lining numerals, use `font-feature-settings: var(--font-feature-tabular)`.

---

## Used by

- [Button](../atoms/button.md) — `--font-size-base`, `--font-weight-medium`
- [Input](../atoms/input.md) — `--font-family-inter` (via Ahoy's `--font-family-base`)
- [Counter](../molecules/counter.md) — `--font-size-base`
- [Next Steps](../organisms/next-steps.md) — `--font-size-base` for link pill text
- [Token Reference](../tokens/token-reference.md) — master reference listing all type tokens

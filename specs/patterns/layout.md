# Layout Patterns

## Metadata
- **Category:** Pattern
- **Status:** Stable
- **File:** `ahoy-demo/src/App.css` — `#root`, `#center`, `#spacer`, `#next-steps`

## Overview

Layout patterns define how the page is structured, how content flows from top to bottom, and how spacing is applied between sections and elements.

---

## Page Flow

The demo app follows a single-column vertical flow:

```
┌─────────────────────────────────────┐
│              .hero                  │  ← Logo display (top of page)
├─────────────────────────────────────┤
│             #center                 │  ← Counter + Button (main content)
├─────────────────────────────────────┤
│             #spacer                 │  ← Visual separator bar
├─────────────────────────────────────┤
│           #next-steps               │  ← Two-column navigation links
└─────────────────────────────────────┘
```

All sections stack vertically inside `#root`, which is a flex column centered on the page.

---

## Root Layout

`#root` establishes the page container:

```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
```

No spacing tokens are applied to `#root` itself — sections own their own padding.

---

## Center Section (`#center`)

The main content area uses a two-column flex row to place the counter and button side by side:

```
#center (flex row, centered)
├── .counter    ← left column
└── <Button />  ← right column
```

| Property | Token | Value |
|----------|-------|-------|
| `gap` | `--space-gap-lg` | 25px |
| `align-items` | — | `center` |
| `flex-wrap` | — | `wrap` (collapses on narrow viewports) |

---

## Spacer Section (`#spacer`)

A horizontal rule that provides visual breathing room between `#center` and `#next-steps`:

| Property | Token | Value |
|----------|-------|-------|
| `height` (desktop) | `--space-spacer` | 88px |
| `height` (mobile) | `--space-8` | 48px |
| `border-top` | `--color-border` | neutral-dark divider |
| `width` | — | `100%` |

---

## Next Steps Section (`#next-steps`)

Two-column layout using flex row with equal-width columns:

| Property | Token | Value |
|----------|-------|-------|
| Padding (desktop) | `--space-section` | 32px all sides |
| Padding (mobile) | `--space-6` `--space-mobile` | 24px top/bottom, 20px sides |
| Column divider | `--color-border` | `border-right` on `#docs` column |

On mobile (`< 1024px`), columns stack vertically and the column divider becomes a bottom border.

---

## Responsive Breakpoint

The single breakpoint in this project is `1024px`. CSS `var()` cannot be used in `@media` queries — use the literal value:

```css
/* Correct */
@media (max-width: 1024px) { … }

/* Wrong — var() does not work in media queries */
@media (max-width: var(--breakpoint-md)) { … }
```

### Responsive behaviour by section

| Section | Desktop | Mobile (< 1024px) |
|---------|---------|-------------------|
| `#center` | Flex row, 25px gap | Flex column, centered |
| `#spacer` | 88px tall | 48px tall |
| `#next-steps` | Flex row, 32px padding | Flex column, 24px / 20px padding |
| `#docs` | Right border | Bottom border |

---

## Spacing Between Elements

### Vertical rhythm within a section

| Context | Token | Value |
|---------|-------|-------|
| Icon → heading | `--space-icon` | 16px |
| Heading → body text | — | browser default margin |
| Body text → link list | `--space-section` | 32px (`margin-top` on `ul`) |
| Between link pills | `--space-3` | 8px (`gap` on `ul`) |

### Vertical rhythm between sections

| Gap | Method | Value |
|-----|--------|-------|
| Hero → `#center` | No explicit gap — natural flow | — |
| `#center` → `#spacer` | `--space-6` margin on `.counter` | 24px |
| `#spacer` → `#next-steps` | `#spacer` height token | 88px / 48px |

---

## Content Flow Rules

1. **Top to bottom:** Hero (brand) → action zone (`#center`) → separator → navigation (`#next-steps`).
2. **No horizontal scroll:** All sections are full-width; inner content is centered.
3. **Mobile stacks:** Every flex-row section collapses to flex-column at the 1024px breakpoint.
4. **Section padding owns its space:** Each section (`#next-steps`) applies its own padding. Do not add external margins between sibling sections.
5. **Zero is valid without a token:** Margin/padding of `0` never requires a token.

---

## Uses

- [Color](../foundations/color.md) — `--color-border` for section dividers
- [Spacing](../foundations/spacing.md) — `--space-gap-lg`, `--space-section`, `--space-6`, `--space-mobile`, `--space-8`, `--space-spacer`, `--space-icon`, `--space-3`

## Used by

- [Counter](../molecules/counter.md) — lives inside `#center`
- [Next Steps](../organisms/next-steps.md) — implements `#next-steps` and `#spacer` layout
- [Hero](../molecules/hero.md) — occupies the top slot in the page flow

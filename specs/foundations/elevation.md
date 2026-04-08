# Elevation (Shadows)

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `ahoy-demo/src/tokens.css`

## Overview

Elevation tokens create the illusion of depth using box shadows. Ahoy defines four levels. Project aliases map these to semantic `--elevation-N` names.

The shadow color is derived from `--color-teal-darkest` (rgb 42, 59, 77) with varying opacity.

---

## Token Reference

| Token | Ahoy source | Shadow value | Usage |
|-------|-------------|--------------|-------|
| `--elevation-1` | `--box-shadow-100` | `0 1px 1px 0 rgba(42,59,77,.12)` | Subtle lift — hovered list items |
| `--elevation-2` | `--box-shadow-200` | `0 2px 6px 0 rgba(42,59,77,.24)` | Normal lift — dropdowns, cards |
| `--elevation-3` | `--box-shadow-300` | `0 6px 10px 0 rgba(42,59,77,.24)` | Raised — popovers, focused cards |
| `--elevation-4` | `--box-shadow-400` | `0 24px 32px 0 rgba(42,59,77,.36)` | Floating — modals, drawers |

The legacy alias `--shadow` maps to `--elevation-2` (`--box-shadow-200`) for App.css compatibility.

---

## Ahoy Utility Classes

Ahoy provides shadow utility classes that use a `::before` pseudo-element approach:

- `.box-shadow-100` — subtle
- `.box-shadow-200` — normal
- `.box-shadow-300` — raised
- `.box-shadow-400` — floating

These classes require `position: relative` on the element.

---

## Usage in this project

The `.counter` link hover state uses `--shadow` (= `--elevation-2`):

```css
a:hover {
  box-shadow: var(--shadow);
}
```

---

## Rules

- **Never** use raw `box-shadow` values — always reference an elevation token.
- Prefer `--elevation-N` tokens for new code; use `--shadow` only for legacy compatibility.
- Do not create custom shadows — use the four Ahoy levels.
- Higher elevation = more prominent = reserved for fewer, more important elements.

---

## Used by

- [Button](../atoms/button.md) — `--elevation-2` on hover state
- [Next Steps](../organisms/next-steps.md) — `--elevation-2` for link pill hover shadow
- [Token Reference](../tokens/token-reference.md) — master reference listing all elevation tokens

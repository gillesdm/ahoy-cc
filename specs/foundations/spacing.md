# Spacing

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `prototype/src/tokens.css`

## Overview

Spacing is built on two layers:

1. **Ahoy spacers** — multiples of a 3px base unit (`--spacer-unit`).
2. **Project `--space-N` scale** — an 9-step alias scale that references Ahoy spacers where aligned, plus project-specific tokens for values outside the Ahoy grid.

---

## Layer 1: Ahoy Spacer Scale

Base unit: `--spacer-unit: 3px`

| Token | Formula | Value |
|-------|---------|-------|
| `--spacer-smallest` | 1 × 3px | **3px** |
| `--spacer-smaller` | 2 × 3px | **6px** |
| `--spacer-small` | 4 × 3px | **12px** |
| `--spacer-regular` | 6 × 3px | **18px** |
| `--spacer-medium` | 8 × 3px | **24px** |
| `--spacer-big` | 12 × 3px | **36px** |
| `--spacer-bigger` | 16 × 3px | **48px** |
| `--spacer-biggest` | 24 × 3px | **72px** |

---

## Layer 2: Project `--space-N` Scale

Use `--space-N` in all new component code. Reference Ahoy spacers only if you need Ahoy's exact token name for library interop.

| Token | Resolves to | Value | Notes |
|-------|------------|-------|-------|
| `--space-1` | `--spacer-smallest` | **3px** | Micro gap |
| `--space-2` | `--spacer-smaller` | **6px** | Tight padding |
| `--space-3` | _(raw)_ | **8px** | Standard gap (list/link) |
| `--space-4` | `--spacer-small` | **12px** | Link padding |
| `--space-5` | `--spacer-regular` | **18px** | Compact section gap |
| `--space-6` | `--spacer-medium` | **24px** | Standard section padding |
| `--space-7` | `--spacer-big` | **36px** | Large section padding |
| `--space-8` | `--spacer-bigger` | **48px** | Spacer bar (mobile) |
| `--space-9` | `--spacer-biggest` | **72px** | Jumbo layout spacing |

### Project-specific tokens

Values outside the 3px Ahoy grid, used for intentional design decisions:

| Token | Value | Where used |
|-------|-------|-----------|
| `--space-xxs` | **5px** | `.counter` block padding |
| `--space-xs-alt` | **10px** | `.counter` inline padding |
| `--space-icon` | **16px** | Icon margin; matches body font-size |
| `--space-mobile` | **20px** | Horizontal padding on mobile viewports |
| `--space-icon-lg` | **22px** | Icon element dimensions |
| `--space-gap-lg` | **25px** | `#center` column gap |
| `--space-section` | **32px** | Standard section padding (`#next-steps`) |
| `--space-spacer` | **88px** | Desktop `#spacer` bar height |

---

## Rules

- **Never** use raw pixel values in `padding`, `margin`, or `gap` properties.
- Use the `--space-N` scale for new work. Avoid introducing new project-specific tokens unless no scale value is close.
- `0` is always valid without a token (unitless zero has no unit, needs no abstraction).
- CSS `@media` queries **cannot** use `var()` — use the literal `1024px` breakpoint value.

---

## Used by

- [Button](../atoms/button.md) — `--space-2`, `--space-4` for padding
- [Counter](../molecules/counter.md) — `--space-xxs`, `--space-xs-alt` (padding), `--space-6` (margin-bottom)
- [Next Steps](../organisms/next-steps.md) — `--space-section`, `--space-6`, `--space-mobile`, `--space-3`, `--space-4`, `--space-2`, `--space-icon`, `--space-8`, `--space-spacer`
- [Layout](../patterns/layout.md) — `--space-gap-lg`, `--space-section`, `--space-spacer`, `--space-8`, `--space-mobile`
- [Token Reference](../tokens/token-reference.md) — master reference listing all scale and project-specific tokens

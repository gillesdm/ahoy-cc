# Motion & Transitions

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `ahoy-demo/src/tokens.css`

## Overview

Motion tokens control animation timing and easing. Consistent motion creates a polished, intentional feel. Ahoy defines the core easing curves and a base duration; the project adds `--duration-base` for slightly faster interactions.

---

## Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-base` | `0.3s` | Hover state transitions (border, shadow) |
| `--duration-fast` | `var(--animation-duration)` = `0.35s` | Ahoy component animations |

> **Why two durations?** `--duration-base` (0.3s) comes from the original Vite template's interaction style and is used for micro-interactions. `--duration-fast` matches Ahoy's own animation timing.

---

## Easing Tokens

| Token | Ahoy source | Curve | Usage |
|-------|-------------|-------|-------|
| `--easing-default` | `--animation-curve-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General-purpose (fast-out-slow-in) |
| `--easing-enter` | `--animation-curve-linear-out-slow-in` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `--easing-exit` | `--animation-curve-fast-out-linear-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |

---

## Transition Shorthand Tokens

Pre-composed `transition` values for the most common cases:

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-border` | `border-color var(--duration-base) var(--easing-default)` | Border color on hover/focus |
| `--transition-shadow` | `box-shadow var(--duration-base) var(--easing-default)` | Box shadow on hover |

---

## Ahoy Keyframe Animations

Ahoy defines global keyframe animations (injected via `index.css`):

| Name | Description |
|------|-------------|
| `pulse` | Opacity cycle 0.25 → 1 → 0.25 (loading indicators) |
| `spin` | Full 360° rotation (spinners) |
| `fadeIn` | Opacity 0 → 1 |
| `fadeOut` | Opacity 1 → 0 |

---

## Usage in this project

```css
/* Counter border on hover */
.counter {
  transition: var(--transition-border);
}

/* Link shadow on hover */
a {
  transition: var(--transition-shadow);
}
```

---

## Rules

- **Never** use raw duration values (e.g. `0.3s`, `300ms`) in `transition` or `animation`.
- Use `--transition-border` and `--transition-shadow` for those common cases.
- For custom transitions: `transition: {property} var(--duration-base) var(--easing-default)`.
- Match easing to intent: `--easing-enter` for appearing, `--easing-exit` for disappearing, `--easing-default` for state changes.

---

## Used by

- [Button](../atoms/button.md) — `--transition-border`, `--transition-shadow`
- [Input](../atoms/input.md) — border and shadow transitions (Ahoy internal)
- [Counter](../molecules/counter.md) — `--transition-border` for hover animation
- [Next Steps](../organisms/next-steps.md) — `--transition-shadow` for link pill hover
- [Token Reference](../tokens/token-reference.md) — master reference listing all motion tokens

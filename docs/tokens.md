# Tokens & Audit

Every visual decision in this project uses a named CSS custom property (a "token") instead of a raw value. This is what keeps the prototype consistent with the real product — and what makes developer handoff clean.

---

## Why tokens?

When a designer says "use the brand colour" and a developer hard-codes `#00b2b2`, those two things become disconnected the moment the brand colour changes. Tokens are the shared name that keeps them in sync:

```css
/* ❌ Hard-coded — breaks if brand colour changes */
color: #00b2b2;

/* ✅ Token — updates everywhere when the token changes */
color: var(--color-accent);
```

Claude enforces this automatically. The audit script catches anything that slips through.

---

## Token reference

### Colour

| What you want | Token |
|---|---|
| Primary text | `var(--color-text)` |
| Subtle / secondary text | `var(--color-text-subtle)` |
| Disabled text | `var(--color-text-disabled)` |
| Page background | `var(--color-bg)` |
| Card / panel surface | `var(--color-surface)` |
| Dividers and borders | `var(--color-border)` |
| Brand / mint green | `var(--color-accent)` |
| Destructive / error | `var(--color-negative)` |
| Success | `var(--color-positive)` |
| Warning | `var(--color-warning)` |

### Spacing

| Scale | Token | Approx. value |
|---|---|---|
| 1 (tightest) | `var(--space-1)` | 4px |
| 2 | `var(--space-2)` | 8px |
| 3 | `var(--space-3)` | 12px |
| 4 | `var(--space-4)` | 16px |
| 5 | `var(--space-5)` | 24px |
| 6 | `var(--space-6)` | 32px |
| 7 | `var(--space-7)` | 48px |
| 8 | `var(--space-8)` | 64px |
| 9 (largest) | `var(--space-9)` | 96px |

### Typography

| What you want | Token |
|---|---|
| Extra small text | `var(--font-size-xs)` |
| Small text | `var(--font-size-sm)` |
| Body text | `var(--font-size-base)` |
| Large text | `var(--font-size-lg)` |
| Extra large / heading | `var(--font-size-xl)` |
| Regular weight | `var(--font-weight-regular)` |
| Medium weight | `var(--font-weight-medium)` |
| Semibold weight | `var(--font-weight-semibold)` |
| Bold weight | `var(--font-weight-bold)` |

### Border radius

| What you want | Token |
|---|---|
| Subtle rounding | `var(--radius-sm)` |
| Standard rounding | `var(--radius-md)` |
| Large rounding | `var(--radius-lg)` |
| Fully round (pill/circle) | `var(--radius-round)` |

### Elevation (shadows)

| Level | Token | When to use |
|---|---|---|
| 1 | `var(--elevation-1)` | Cards, subtle lift |
| 2 | `var(--elevation-2)` | Dropdowns, popovers |
| 3 | `var(--elevation-3)` | Modals, dialogs |
| 4 | `var(--elevation-4)` | Toasts, notifications |

### Motion

| What you want | Token |
|---|---|
| Border transitions | `var(--transition-border)` |
| Shadow transitions | `var(--transition-shadow)` |

### Z-index

| Layer | Token |
|---|---|
| Below content | `var(--z-below)` |
| Base layer | `var(--z-base)` |
| Above content | `var(--z-above)` |
| Overlay / backdrop | `var(--z-overlay)` |
| Modal | `var(--z-modal)` |
| Toast / notification | `var(--z-toast)` |

The complete list of every token is in [`specs/tokens/token-reference.md`](../specs/tokens/token-reference.md).

---

## Running the token audit

The audit script scans every file in `ahoy-demo/src/` and flags raw values that should be tokens instead — hex colours, pixel values, raw durations.

```bash
node scripts/token-audit.js
```

### Clean output

```
✅ Token audit passed — 0 violations found.
```

### Output with violations

```
❌ Token audit failed — 3 violations found.

  ahoy-demo/src/App.css:14   color: #1a1a2e  → use var(--color-text)
  ahoy-demo/src/App.css:27   margin: 16px    → use var(--space-4)
  ahoy-demo/src/Hero.tsx:8   duration: 200ms → use var(--transition-border)
```

### Fixing violations

You can fix them manually by replacing each flagged value with the suggested token, or ask Claude to do it:

```
Run the token audit and fix any violations you find.
```

> [!WARNING]
> The audit must pass with zero errors before any changes are committed. This is enforced by convention — the output is your confirmation before handing off to a developer.

---

## Where tokens are defined

Token definitions live in `ahoy-demo/src/tokens.css`. These are Layer 2 tokens — semantic aliases that sit on top of Ahoy's raw design primitives. Claude reads this file to know which tokens are available before writing any styles.

If a token you need doesn't exist, ask Claude to add it following the existing pattern in `tokens.css`.

# Border Radius

## Metadata
- **Category:** Foundation
- **Status:** Stable
- **Source:** `@teamleader/ahoy` + `ahoy-demo/src/tokens.css`

## Overview

Border radius tokens define the corner rounding for UI elements. Ahoy provides three standard sizes plus full-circle. Two project-specific values cover design cases between the standard steps.

---

## Token Reference

| Token | Resolves to | Value | Usage |
|-------|------------|-------|-------|
| `--radius-sm` | `--border-radius-small` | **2px** | Subtle rounding — tags, badges |
| `--radius-md` | `--border-radius-medium` | **4px** | Standard rounding — inputs, tooltips |
| `--radius-lg` | `--border-radius-large` | **8px** | Prominent rounding — cards, modals |
| `--radius-round` | `--border-radius-round` | **50%** | Full circle — avatars, icon buttons |
| `--radius-counter` | _(raw)_ | **5px** | `.counter` display element |
| `--radius-link` | _(raw)_ | **6px** | Link pill buttons in `#next-steps` |

---

## Visual Scale

```
2px  ▪  subtle       --radius-sm
4px  ▪▪ standard     --radius-md
5px  ●  counter      --radius-counter
6px  ●  link pill    --radius-link
8px  ●● prominent    --radius-lg
50% ⬤  circle       --radius-round
```

---

## Rules

- **Never** use raw pixel values in `border-radius`.
- Choose the nearest standard token first (`--radius-sm/md/lg`).
- Use `--radius-counter` and `--radius-link` only for their specific elements.
- For new components, use `--radius-md` as the default.

---

## Used by

- [Button](../atoms/button.md) — `--radius-md`
- [Input](../atoms/input.md) — `--radius-md` (via Ahoy's `--input-border-radius`)
- [Counter](../molecules/counter.md) — `--radius-counter`
- [Next Steps](../organisms/next-steps.md) — `--radius-link` for link pill corners
- [Token Reference](../tokens/token-reference.md) — master reference listing all radius tokens

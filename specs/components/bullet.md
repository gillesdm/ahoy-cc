# Bullet

## Metadata
- **Name**: Bullet
- **Category**: Data Display / Indicators
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/bullet`

## Overview

**When to use**: Use Bullet to display a small colored dot as a status indicator or visual accent alongside text. Common uses: status indicators in list rows, legend dots in charts, color-coded tags in tables. The `borderColor` / `borderTint` props add an inset ring around the dot for added contrast.

**When not to use**: Do not use Bullet for numerical counts (use `Counter`). Do not use as the sole conveyance of status information — always pair with a text label for accessibility.

## Anatomy

```
  ●       ← span.bullet (.{color} .{size}) — circular, inline-block
```

Optional ring:
```
  ◉       ← box-shadow: 0 0 0 2px {border-color}
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-border` (`--color-neutral-dark`) | `color="neutral"` fill |
| `--color-accent` (`--color-mint`) | `color="mint"` fill |
| `--color-text-subtle` (teal-dark) | `color="teal"` fill |
| `--color-error` (ruby-dark) | `color="ruby"` fill |
| `--color-warning` (gold-dark) | `color="gold"` fill |
| Color family tokens (violet-dark, aqua-dark) | `color="violet"` / `color="aqua"` fills |
| `--radius-round` (50%) | Circular shape |

Size → CSS var mapping:
| Size | `--size` |
|---|---|
| `small` | 9px |
| `medium` | 12px |
| `large` | 18px |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls diameter: 9/12/18 px |
| `color` | `'neutral' \| 'mint' \| 'violet' \| 'teal' \| 'ruby' \| 'gold' \| 'aqua'` | `'neutral'` | Fill color of the dot |
| `borderColor` | Same color families as `color` | — | Adds a 2 px box-shadow ring around the dot |
| `borderTint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | — | Tint of the ring color |
| `className` | `string` | — | Additional class on the root span |
| `...others` | `BoxProps` | — | Box layout props (margin, etc.) |

## States

Bullet has no interactive states. Appearance is fully determined by `color`, `size`, and `borderColor` props.

## Code Example

```tsx
import Bullet from '@teamleader/ahoy/dist/es/components/bullet';
import { TextBody } from '@teamleader/ahoy/dist/es/components/typography';
import Box from '@teamleader/ahoy/dist/es/components/box';

// Simple status dot
<Box display="flex" alignItems="center">
  <Bullet color="mint" size="small" marginRight={2} />
  <TextBody>Active</TextBody>
</Box>

// With border ring (e.g. selected state in a legend)
<Bullet color="ruby" size="medium" borderColor="ruby" borderTint="dark" />

// Inline in heading
<h3>
  <Bullet color="gold" size="large" />
  Pending review
</h3>
```

## Cross-references
- `Counter` — numeric count badge
- `Badge` — text label pill
- `Icon` — icon-based status indicators

# SelectCard

## Metadata
- **Name:** SelectCard
- **Category:** Form / Selection
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/selectCard`

## Overview
A card-shaped button used for visually rich single-choice selection, typically in onboarding flows or configuration wizards. Displays an illustration, optional content, and a checkmark indicator when selected.

**When to use:**
- Choosing between a small number of options (2–4) where illustrations aid comprehension
- Onboarding, setup wizards, feature selection screens

**When not to use:**
- Long lists of options — use Select or RadioGroup
- Options without visual differentiation — RadioGroup is cleaner

## Anatomy

```
Box[button][data-teamleader-ui implied]
├── CheckmarkIcon (.select-icon)   — top-right corner, visible when selected
├── <span>.select-illustration     — centred illustration slot
└── children                       — label / description content
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-lightest` | Default card background |
| `--color-neutral` | Card border (default) |
| `--color-neutral-light` | Disabled card background |
| `--color-mint-lightest` (`--color-accent-bg`) | Selected card background |
| `--color-mint-dark` (`--color-accent-border`) | 2 px selection ring + focus ring |
| `--border-radius-medium` (`--radius-md`) | Card corner radius (4 px) |
| `--elevation-1` (custom `--shadow`) | Subtle box-shadow (4-layer composite) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | — | Shows the checkmark icon and applies the selected ring |
| `disabled` | `boolean` | — | Disables the button; mutes illustration to 30 % opacity |
| `illustration` | `ReactNode` | — | Illustration or icon rendered in the centred slot |
| `className` | `string` | — | Extra class names on the root element |
| `children` | `ReactNode` | — | Label or description content below the illustration |

All standard HTML `<button>` attributes are forwarded.

## States

| State | Visual Description |
|-------|--------------------|
| Default | White card, `--color-neutral` border, subtle shadow |
| Hover | 2 px `--color-mint-dark` ring overlaid on shadow |
| Focus-visible | Same as hover — 2 px `--color-mint-dark` ring |
| Selected | Mint-tinted background + 2 px ring + `CheckmarkIcon` visible |
| Disabled | `--color-neutral-light` background; illustration fades to 30 % |

## Code Example

```tsx
import SelectCard from '@teamleader/ahoy/dist/es/components/selectCard';
import { IllustrationRocketMedium } from '@teamleader/ahoy-illustrations';

function PlanPicker() {
  const [plan, setPlan] = React.useState('starter');

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <SelectCard
        selected={plan === 'starter'}
        illustration={<IllustrationRocketMedium />}
        onClick={() => setPlan('starter')}
      >
        Starter
      </SelectCard>
      <SelectCard
        selected={plan === 'pro'}
        illustration={<IllustrationStarMedium />}
        onClick={() => setPlan('pro')}
      >
        Pro
      </SelectCard>
    </div>
  );
}
```

## Cross-references
- `RadioGroup` / `RadioButton` — text-only mutually exclusive selection
- `CheckmarkIcon` — the selection indicator embedded in this component
- `Select` — dropdown for many options

# Toggle

## Metadata
- **Name:** Toggle
- **Category:** Form / Selection
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/toggle`

## Overview
A binary on/off switch rendered as a sliding pill track. Functionally equivalent to a checkbox but visually communicates immediate effect (settings, feature flags, preferences). Supports an optional inline tooltip icon for additional context.

**When to use:**
- Enabling/disabling a feature or setting that takes effect immediately
- Preferences panels, filter toggles, notification settings

**When not to use:**
- Multi-step forms where the change only applies on submit — use Checkbox
- Selecting one of several options — use RadioGroup

## Anatomy

```
Box[label][data-teamleader-ui="toggle"]
├── <input type="checkbox">   (visually hidden, 0×0)
├── span.track                (pill-shaped background)
│     └── span.thumb         (circular knob that slides)
└── span.label?               (shown when label or children provided)
      ├── TextSmall | TextBodyCompact | TextDisplay
      ├── children
      └── TooltippedIcon?     (info icon with tooltip, when tooltip prop set)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-light` | Track background (unchecked) |
| `--color-neutral-dark` | Track border + thumb border (unchecked) |
| `--color-neutral-lightest` | Thumb background |
| `--color-neutral` | Track background on hover (unchecked) |
| `--color-neutral-darkest` | Track border on hover (unchecked) |
| `--color-mint` (`--color-accent`) | Track background when checked |
| `--color-mint-dark` (`--color-accent-border`) | Track border + thumb border when checked |
| `--color-mint-darkest` | Checked focus ring |
| `--color-mint-lightest` | Disabled + checked track background |
| `--spacer-small` | Gap between track and label |
| `--spacer-smallest` | Label top-padding (medium/large) |
| `--animation-duration` | Track/thumb transition (÷2) |
| `--animation-curve-default` | Transition easing |

Size dimensions (set as CSS custom properties):
- Small: track 30×18 px, thumb 12×12 px
- Medium: track 42×24 px, thumb 18×18 px
- Large: track 54×30 px, thumb 24×24 px

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the toggle is on |
| `onChange` | `(event) => void` | — | Called when the toggle changes state |
| `disabled` | `boolean` | `false` | Disables interaction; mutes appearance |
| `label` | `string` | — | Text label rendered beside the track |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls track/thumb dimensions and label typography |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of the label relative to the track |
| `fullWidth` | `boolean` | `false` | Stretches the toggle to fill its container (space-between layout) |
| `maxLines` | `number` | — | Clamp the label text to N lines |
| `tooltip` | `ReactNode` | — | Content for the inline info tooltip icon |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | — | Position of the tooltip |
| `tooltipProps` | `object` | — | Additional props forwarded to the `Tooltip` HOC |
| `className` | `string` | — | Extra class names |
| `children` | `ReactNode` | — | Additional content inside the label span |

## States

| State | Visual Description |
|-------|--------------------|
| Off (default) | Light grey track, white thumb at left edge |
| Off + hover | Track darkens slightly; border darkens |
| On (checked) | Mint track; thumb slides to right edge |
| On + hover | Mint-dark track |
| Focus-visible (off) | 1 px ring + `--color-neutral-darkest` border |
| Focus-visible (on) | 1 px ring + `--color-mint-darkest` border |
| Disabled (off) | Neutral grey track, transparent border; `pointer-events: none` |
| Disabled (on) | Mint-lightest track, white thumb |
| Label left | Track is on the right; layout reverses via `flex-direction: row-reverse` |
| Full width | Toggle stretches to container width; label and track separated by `justify-content: space-between` |

## Code Example

```tsx
import Toggle from '@teamleader/ahoy/dist/es/components/toggle';

function NotificationSettings() {
  const [emailEnabled, setEmailEnabled] = React.useState(true);

  return (
    <Toggle
      checked={emailEnabled}
      onChange={(e) => setEmailEnabled(e.target.checked)}
      label="Email notifications"
      size="medium"
      tooltip="Receive an email for each new event"
    />
  );
}
```

## Cross-references
- `Checkbox` — multiple independent selections; no immediate effect connotation
- `RadioButton` — mutually exclusive choices
- `Tooltip` — used for the inline info icon tooltip

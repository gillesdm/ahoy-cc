# Tooltip

## Metadata
- **Name:** Tooltip (Higher-Order Component)
- **Category:** Overlay / Feedback
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/tooltip`

## Overview
A Higher-Order Component (HOC) factory that wraps any component with tooltip behaviour. The tooltip floats near the wrapped element and shows on hover (with configurable delay) or on click. Built on Radix UI `@radix-ui/react-tooltip` for positioning, with custom show/hide state management.

**When to use:**
- Explaining icon-only buttons or controls that lack visible labels
- Providing supplementary context for truncated text or data values
- Info icons on form labels (as used by Toggle's tooltip prop)

**When not to use:**
- Interactive content within the tooltip — tooltips are non-interactive (`pointer-events: none`)
- Content that must always be visible — use a label or inline description
- Mobile-primary experiences — hover tooltips are not accessible on touch devices

## Anatomy

```
Tooltip(ComposedComponent)
└── RadixTooltip.Root (open controlled by internal state)
      ├── RadixTooltip.Trigger
      │     └── ComposedComponent (original wrapped component)
      └── RadixTooltip.Portal
            └── RadixTooltip.Content[data-teamleader-ui="tooltip"]
                  ├── Box.inner
                  │     └── div.text   (tooltip content)
                  └── RadixTooltip.Arrow → div.arrow (diamond pointer)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-white` | Tooltip background |
| `--color-teal-darkest` | Tooltip text colour |
| `hsl(--color-teal-dark-hsl / 20%)` | Border colour of inner container and arrow |
| `--box-shadow-200` (`--elevation-2`) | Tooltip drop shadow |
| `--unit` | Border-radius (0.4×=4 px), arrow size (0.8×=8 px), max-width (265 px) |
| `--font-family-inter` | Tooltip text font |
| `--spacer-smaller` | Icon margin inside tooltip |

Animation: scale from 0 to 1 (`animate-tooltip` keyframe) over 200 ms with `cubic-bezier(0.4, 0, 0.2, 1)`.

## Props / API

The HOC pattern: `const TooltippedButton = Tooltip(Button)`. The wrapped component then accepts:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `ReactNode` | — | Content to display in the tooltip; if falsy, no tooltip is rendered |
| `tooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Which side of the trigger the tooltip appears on |
| `tooltipShowDelay` | `number` | `100` | Milliseconds before the tooltip appears on hover |
| `tooltipHideOnClick` | `boolean` | `true` | Hides the tooltip when the trigger is clicked |
| `tooltipShowOnClick` | `boolean` | `false` | Shows the tooltip on click (instead of/in addition to hover) |
| `tooltipActive` | `boolean` | — | Controlled open state (overrides internal hover state) |
| `onTooltipEntered` | `() => void` | — | Called when the tooltip becomes visible |
| `zIndex` | `number` | `700` | z-index of the tooltip portal |

All other props are forwarded to the wrapped `ComposedComponent`.

## States

| State | Visual Description |
|-------|--------------------|
| Hidden | No tooltip rendered |
| Entering | Scales from 0 to 1 with fade (200 ms) |
| Visible | White card with border, drop shadow, arrow pointing to trigger |
| `tooltipActive: true` | Controlled open; hover/click handling bypassed |

## Code Example

```tsx
import Tooltip from '@teamleader/ahoy/dist/es/components/tooltip';
import Icon from '@teamleader/ahoy/dist/es/components/icon';
import { IconInfoBadgedSmallOutline } from '@teamleader/ahoy-icons';

// Create a tooltipped version of any component
const TooltippedIcon = Tooltip(Icon);

function HelpIcon() {
  return (
    <TooltippedIcon
      tooltip="This field is required for invoicing"
      tooltipPosition="top"
    >
      <IconInfoBadgedSmallOutline />
    </TooltippedIcon>
  );
}

// Used inline on a button
const TooltippedButton = Tooltip(Button);

<TooltippedButton
  tooltip="Archive this contact"
  tooltipPosition="bottom"
  icon={<IconArchiveMediumOutline />}
  level="secondary"
/>
```

## Cross-references
- `Toggle` — uses `Tooltip(Icon)` internally for the inline info tooltip
- `StatusBar` — wraps the bar in `Tooltip('span')` for legend display
- `Popover` — for interactive floating content (menu, form, etc.)

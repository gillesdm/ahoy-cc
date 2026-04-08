# MarketingTab

## Metadata
- **Name:** MarketingTab
- **Category:** Marketing / Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingTab`

## Overview
**When to use:** Use MarketingTab for tab navigation items that represent locked or upgrade-gated features within a tab bar. It always renders a `MarketingLockBadge` as a trailing element, making the upgrade affordance visible inline with the navigation label. Typical use: a tab bar where some tabs are available only on higher plans.

**When not to use:** Do not use for standard unlocked navigation tabs. Use the standard `Tab` component for those. Do not render MarketingTab in isolation — it is designed to sit inside a horizontal tab bar container alongside regular `Tab` items.

## Anatomy

```
┌──────────────────────────────────────────┐
│  [label text]  [MarketingLockBadge]      │  ← .wrapper (height: 48px)
│                                          │
│  ──────────────────────────── (active    │
│  ══════════════════════════ 3px violet   │
│                               underline) │
└──────────────────────────────────────────┘
```

- **Root element:** `Box` with `data-teamleader-ui="marketing-tab"`, flex row, height 48px, `borderRadius=0`
- **Text:** `Heading5` (size=small) or `Heading4` (size=medium)
- **Lock badge:** `MarketingLockBadge` with `marginLeft={3}`, size matches tab size
- **Active indicator:** `::after` pseudo-element — 3px inset bottom shadow in violet; hidden by default (`transform: scale(0,1)`), shown when active (`scale(1,1)`)

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Active underline color (`inset 0 -3px 0 0 var(--color-violet)` via `::after` box-shadow) |
| `--color-violet-light` | Badge background (via MarketingLockBadge) |
| `--color-violet-lightest` | Hover background |
| `--color-violet` | Lock icon color (via MarketingLockBadge) |
| `--color-neutral-lightest` | Default tab background |
| `--color-neutral-darkest` | Default and active text color |
| `--color-neutral` | Focus-visible inset ring |
| `--color-teal-darkest` | Active state text color |
| `--animation-duration` | Underline transition duration |
| `--animation-curve-fast-out-slow-in` | Underline transition easing |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | `false` | Whether the tab is currently selected. Shows the violet underline indicator. |
| `size` | `'small' \| 'medium'` | `'medium'` | Controls typography (`Heading5` for small, `Heading4` for medium) and lock badge size, and horizontal spacing. |
| `onClick` | `(event: MouseEvent) => void` | `undefined` | Click handler. |
| `children` | `ReactNode` | — | Tab label content. |
| `className` | `string` | `undefined` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root Box element. |

MarketingTab also accepts Box layout props.

### Size-dependent spacing

| Size | `marginHorizontal` | `paddingHorizontal` | Typography |
|---|---|---|---|
| `small` | 1 (3px) | 2 (6px) | `Heading5` (14px, weight 600) |
| `medium` | 2 (6px) | 3 (9px) | `Heading4` (12px, weight 700, uppercase) |

## States

| State | Visual Description |
|---|---|
| Default | Neutral-lightest background, neutral-darkest text, no underline |
| Hover | Violet-lightest background, neutral-darkest text, cursor pointer |
| Focus-visible | `inset 0 0 0 2px --color-neutral` ring |
| Active | Teal-darkest text; 3px violet bottom underline via animated `::after` |
| Inactive | Underline hidden (`transform: scale(0,1)`) |

## Code Example

```tsx
import MarketingTab from '@teamleader/ahoy/dist/es/components/marketingTab';
import Tab from '@teamleader/ahoy/dist/es/components/tab';
import { useState } from 'react';

function FeatureTabBar() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #bebfc7' }}>
      {/* Standard unlocked tab */}
      <Tab
        active={activeTab === 'overview'}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </Tab>

      {/* Locked marketing tab */}
      <MarketingTab
        active={activeTab === 'analytics'}
        size="medium"
        onClick={() => openUpgradeDialog('analytics')}
      >
        Analytics
      </MarketingTab>

      <MarketingTab
        active={activeTab === 'automation'}
        size="medium"
        onClick={() => openUpgradeDialog('automation')}
      >
        Automation
      </MarketingTab>
    </div>
  );
}
```

## Cross-references
- `MarketingLockBadge` — always embedded as the trailing element
- `Tab` — standard unlocked tab component
- `MarketingMenuItem` — alternative marketing navigation pattern for sidebar menus

# Avatar

## Metadata
- **Name**: Avatar
- **Category**: Data Display / Identity
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/avatar`

## Overview

**When to use**: Use Avatar to represent a person, team, or account visually. Supports image, initials (auto-generated from `fullName`), anonymous fallback, team icon, account icon, and a "creatable" (add) variant. Use `AvatarStack` to render multiple overlapping or spaced avatars in a row or column.

**When not to use**: Do not use as a generic icon container. Do not use the `editable` prop outside of profile-editing flows. Do not use `hero` size inline with body text.

## Anatomy

```
┌──────────────────────────────┐
│  .wrapper (.is-{size} .is-{shape})
│  ┌────────────────────────┐  │
│  │  AvatarImage           │  │  ← if imageUrl provided
│  │  AvatarInitials        │  │  ← if fullName, no image
│  │  AvatarAnonymous       │  │  ← fallback
│  │  AvatarTeam            │  │  ← if team=true
│  │  AvatarAccount         │  │  ← if account=true
│  │  AvatarAdd             │  │  ← if creatable=true
│  └────────────────────────┘  │
│  [.children badge]           │  ← positioned absolute, top-right
└──────────────────────────────┘
```

Parts:
- **Wrapper** — Box with size (`--size` CSS var), shape border-radius, selectable/selected ring
- **Image** — `<img>` with `object-fit: cover` (or `contain`); falls back to initials on load error
- **Initials** — Heading4 with color derived from `id` hash; editable overlay on hover for medium/large/hero
- **Badge slot** (`.children`) — absolute-positioned, used for notification dots, status icons, etc.
- **Overlay** — edit camera icon overlay (AvatarOverlay), shown on hover when `editable=true`

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-bg` (`--color-neutral-lightest`) | Stack overlap ring color |
| `--color-accent` (aqua-dark) | Selected ring color |
| `--color-focus` (aqua-light) | Hover ring on selectable avatar |
| `--radius-round` (50%) | Circle shape |
| `--radius-md` (4px) | Rounded shape |
| `--font-family-base` | Initials font (`--font-family-inter`) |
| `--font-weight-medium` (500) | Overflow count font weight |
| `--space-1` / `--space-2` | Selectable padding (size-dependent) |

## Props / API

### Avatar

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'hero'` | `'medium'` | Controls `--size` CSS variable: 24/30/48/72/144 px |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | Border-radius shape of the avatar |
| `fullName` | `string` | — | Used for initials generation and tooltip label |
| `imageUrl` | `string` | — | Image source; falls back to initials on error |
| `id` | `string` | — | Hashed to deterministically pick initials background color |
| `selectable` | `boolean` | `false` | Adds padding and hover/selected ring styles |
| `selected` | `boolean` | `false` | Shows aqua ring; renders close icon over image |
| `tooltip` | `boolean` | `false` | Wraps avatar in Tooltip showing `fullName` |
| `tooltipProps` | `TooltipProps` | — | Override tooltip content / position |
| `editable` | `boolean` | — | Shows overlay with camera icon on hover (medium+) |
| `onImageChange` | `() => void` | — | Called when editable overlay is clicked |
| `creatable` | `boolean` | — | Renders AvatarAdd (plus icon) instead of image/initials |
| `team` | `boolean` | — | Renders AvatarTeam (team icon) |
| `account` | `boolean` | — | Renders AvatarAccount (account icon) |
| `objectFit` | `'cover' \| 'contain'` | `'cover'` | CSS object-fit for the image element |
| `children` | `ReactNode` | — | Rendered in the absolute `.children` badge slot |
| `className` | `string` | — | Additional class on the wrapper |

### AvatarStack

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | (same as Avatar) | `'medium'` | Propagated to all child Avatars |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Row or column layout |
| `displayMax` | `number` | `99` | Max avatars before overflow counter appears |
| `inverse` | `boolean` | `false` | Light vs dark overlap ring color |
| `selectable` | `boolean` | `false` | Propagated; switches to spaced (non-overlapping) layout |
| `tooltip` | `boolean` | `false` | Propagated to child Avatars |
| `onOverflowClick` | `() => void` | — | Called when the overflow counter is clicked |
| `getNamesOverflowLabel` | `(names: string[]) => string` | — | Custom tooltip label for overflow count |

## States

| State | Visual description |
|---|---|
| Default | Avatar renders with image or initials, no ring |
| Selectable hover | Aqua-light ring (`box-shadow: 0 0 0 3px --color-aqua-light`) |
| Selected | Aqua-dark ring + close icon overlay replacing image/initials |
| Editable hover | Camera overlay (teal-dark 84% bg) appears on bottom half |
| Stack overlapping | Avatars overlap with white ring sized to their size variant |
| Stack overflow | Overflow pill with remaining count shown at end of stack |

## Code Example

```tsx
import Avatar from '@teamleader/ahoy/dist/es/components/avatar';
import { AvatarStack } from '@teamleader/ahoy/dist/es/components/avatar';

// Basic image avatar
<Avatar
  size="medium"
  shape="circle"
  fullName="Jane Doe"
  imageUrl="https://example.com/jane.jpg"
  tooltip
/>

// Initials fallback
<Avatar size="large" fullName="John Smith" id="user-123" />

// Selectable
<Avatar
  size="small"
  fullName="Alex B"
  selectable
  selected={isSelected}
/>

// Stack
<AvatarStack size="small" displayMax={5}>
  <Avatar fullName="Alice A" id="a1" />
  <Avatar fullName="Bob B" id="b1" />
  <Avatar fullName="Carol C" id="c1" />
</AvatarStack>
```

## Cross-references
- `Tooltip` — wraps Avatar when `tooltip=true`
- `Icon` — used for selected state overlay icons
- `AvatarFilterSelection` — filter UI combining Avatar list with a Popover search

# Passport

## Metadata
- **Name:** Passport (Passport, EmptyPassport)
- **Category:** Data Display / Overlay
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/passport`

## Overview
**When to use:** Use `Passport` to show a contextual entity card — typically triggered on hover or focus of a name/avatar link — displaying a summary of a contact, company, or user: avatar, name, description lines, and optional action links. Use `EmptyPassport` when the entity exists but has incomplete or missing data, prompting the user to fill it in.

**When not to use:** Do not use as a standalone card in a page layout — use `Card` for that. Do not use when the data set is large; `Passport` is designed for compact 300px-wide snapshots. Do not nest interactive elements beyond links inside the passport content.

## Anatomy

### Passport

```
┌─ Passport (Popover, 300px wide) ────────────────────┐
│  padding: --space-4                                  │
│  ┌─ Header row ───────────────────────────────────┐  │
│  │  ┌─ Avatar (48px) ─┐  ┌─ Content ───────────┐  │  │
│  │  │  <Avatar small> │  │  <Heading3> title    │  │  │
│  │  │                 │  │  <TextBody> desc...  │  │  │
│  │  └─────────────────┘  └────────────────────┘  │  │
│  └────────────────────────────────────────────────┘  │
│  ┌─ Line items (optional) ────────────────────────┐  │
│  │  [Icon]  <TextBody> line text / Link           │  │
│  │  [Icon]  <TextBody> line text / Link           │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### EmptyPassport

```
┌─ EmptyPassport (Popover, max 240px) ──────────────┐
│  paddingHorizontal: --space-6  paddingVertical: --space-5
│  ┌─ Column (centered) ─────────────────────────┐  │
│  │  <Avatar small>  (optional)                 │  │
│  │  <Heading3> title                           │  │
│  │  <TextBody> description  (optional)         │  │
│  │  <TextBody><Link> link  (optional)          │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```

Parts:
- **Popover wrapper** — floats via `Popover` with `backdrop=false`; inherits all Popover positioning props
- **Avatar** — Ahoy `Avatar` component at `size="small"`; accepts all Avatar props via spread
- **Title** — `Heading3` with overflow/ellipsis; can be a plain string or a `Link` props object
- **Description** — one or more `TextBody` lines (string or `string[]`)
- **Line items** — array of `{ icon, children, href?, onClick? }`; icon is teal or aqua depending on interactivity
- **Empty state link** — a `Link` rendered below the description in `EmptyPassport`

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-surface` (`--color-white`) | Popover inner background |
| `--color-border` (`--color-neutral-dark`) | Popover border ring (via Popover neutral/lightest theme) |
| `--elevation-2` (`--box-shadow-200`) | Popover drop shadow |
| `--space-4` (`--spacer-small`, 12px) | Inner padding (Passport) |
| `--space-5` (`--spacer-regular`, 18px) | Vertical padding (EmptyPassport) |
| `--space-6` (`--spacer-medium`, 24px) | Horizontal padding (EmptyPassport) |
| `--color-text` (`--color-teal-darkest`) | Title and body text colour |
| `--color-text-subtle` (`--color-teal-dark`) | Neutral description text (EmptyPassport) |
| `--color-accent` (`--color-mint`) / aqua-dark | Line item icon when interactive |
| `--radius-md` (`--border-radius-medium`) | Popover corner radius |

## Props / API

### Passport

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| LinkProps` | — | Entity name; string renders as plain text, object renders as `Link` |
| `avatar` | `AvatarProps` | — | Props spread onto the `Avatar` component |
| `description` | `string \| string[]` | — | One or more description lines below the title |
| `lineItems` | `LineItem[]` | — | Additional detail rows with optional icon and link |
| `className` | `string` | — | Additional CSS classes |
| `...others` | `PopoverProps` | — | All `Popover` props (anchorEl, direction, position, active, etc.) |

#### LineItem shape

| Key | Type | Description |
|-----|------|-------------|
| `icon` | `ReactNode` | Icon rendered in the left 48px column |
| `children` | `ReactNode` | Text content of the line |
| `href` | `string` | Makes the line a link (`<a>`) |
| `onClick` | `() => void` | Makes the line a clickable link |

### EmptyPassport

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Primary empty-state heading |
| `avatar` | `AvatarProps` | — | Optional avatar shown above the title |
| `description` | `string` | — | Optional explanatory text |
| `link` | `LinkProps` | — | Optional call-to-action link at the bottom |
| `className` | `string` | — | Additional CSS classes |
| `...others` | `PopoverProps` | — | All `Popover` props |

## States

| State | Visual description |
|-------|--------------------|
| Default | 300px white card floating via Popover |
| Title as link | Heading3 renders a teal `Link` with hover underline |
| Line item — interactive | Icon coloured aqua-dark; text rendered as Link |
| Line item — static | Icon coloured teal-darkest; text as plain TextBody |
| EmptyPassport | Centered column, max 240px, neutral description text |
| Long title | Truncated with `text-overflow: ellipsis; white-space: nowrap` |

## Code Example

```tsx
import Passport from '@teamleader/ahoy/dist/es/components/passport';
import { EmptyPassport } from '@teamleader/ahoy/dist/es/components/passport';

// Full passport
<Passport
  active={hovered}
  anchorEl={anchorRef.current}
  direction="south"
  title={{ href: '/contacts/1', children: 'Jane Doe' }}
  avatar={{ imageUrl: '/avatars/jane.jpg' }}
  description={['CEO at Acme Corp', 'Brussels, Belgium']}
  lineItems={[
    { icon: <IconPhoneSmallOutline />, children: '+32 123 456 789', href: 'tel:+32123456789' },
    { icon: <IconEmailSmallOutline />, children: 'jane@acme.com', href: 'mailto:jane@acme.com' },
  ]}
/>

// Empty state
<EmptyPassport
  active={hovered}
  anchorEl={anchorRef.current}
  title="No contact linked"
  description="Link a contact to see their details here."
  link={{ href: '/contacts/new', children: 'Add a contact' }}
/>
```

## Cross-references
- `popover` — the floating layer `Passport` wraps
- `avatar` — avatar component used inside both variants
- `link` — used for interactive title and line items
- `typography` — `Heading3`, `TextBody` used for text content

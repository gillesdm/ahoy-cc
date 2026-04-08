# StatusLabel

## Metadata
- **Name:** StatusLabel
- **Category:** Data Display / Feedback
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/statusLabel`

## Overview
A small pill-shaped inline label used to communicate the status of a record or entity. Colour-coded by semantic meaning (e.g. success, warning, error, neutral).

**When to use:**
- Showing the current state of an entity (invoice status, task state, deal phase)
- Inline within tables, cards, or detail views

**When not to use:**
- Counting items — use `Counter` or `Badge`
- Long descriptive text — truncation will hide content

## Anatomy

```
UITextBody | UITextSmall [data-teamleader-ui="status-label"]
  (element: "span", display: inline-flex, pill shape)
└── span.inner   (overflow hidden, text-overflow ellipsis, white-space nowrap)
      └── children (label text)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-{color}-lightest` | Background (non-neutral colours) |
| `--color-neutral-light` | Background for `color: 'neutral'` |
| `--color-{color}-light` | Border (non-neutral colours) |
| `--color-neutral-dark` | Border for `color: 'neutral'` |
| `--color-{color}-darkest` | Text colour (non-neutral) |
| `--color-teal-dark` | Text colour for `color: 'neutral'` |
| `--radius-round` (50 %) | Implied by pill shape (12 px / 9 px border-radius) |

Colour options: `neutral`, `mint`, `aqua`, `violet`, `gold`, `ruby`, `teal`.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'neutral' \| 'mint' \| 'aqua' \| 'violet' \| 'gold' \| 'ruby' \| 'teal'` | `'neutral'` | Colour theme (controls background, border, and text colour) |
| `size` | `'small' \| 'medium'` | `'medium'` | Medium = 24 px height, radius 12 px; Small = 18 px height, radius 9 px |
| `className` | `string` | — | Extra class names |
| `children` | `ReactNode` | — | The label text (will be truncated with ellipsis if too long) |

All Box props are forwarded to the root element.

## States

| State | Visual Description |
|-------|--------------------|
| `neutral` | Light grey background, grey border, teal-dark text |
| `mint` | Mint-lightest background, mint-light border, mint-darkest text |
| `gold` | Gold-lightest background, gold-light border, gold-darkest text (warning) |
| `ruby` | Ruby-lightest background, ruby-light border, ruby-darkest text (error/danger) |
| `aqua` | Aqua-lightest background, aqua-light border, aqua-darkest text |
| `violet` | Violet-lightest background, violet-light border, violet-darkest text |
| `teal` | Teal-lightest background, teal-light border, teal-darkest text |

## Code Example

```tsx
import StatusLabel from '@teamleader/ahoy/dist/es/components/statusLabel';

function InvoiceStatus({ status }) {
  const colorMap = {
    paid: 'mint',
    overdue: 'ruby',
    pending: 'gold',
    draft: 'neutral',
  };

  return (
    <StatusLabel color={colorMap[status] ?? 'neutral'}>
      {status}
    </StatusLabel>
  );
}
```

## Cross-references
- `Badge` — numeric count indicator
- `Counter` — inline numeric count (often used alongside labels)
- `Tag` — removable label chip (different interaction model)

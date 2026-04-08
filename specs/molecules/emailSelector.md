# EmailSelector

## Metadata
- **Name:** EmailSelector
- **Category:** Form / Input
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/emailSelector`

## Overview
**When to use:** Use EmailSelector when a user needs to enter one or more email addresses in a freeform tag-input style — typical for "To:", "CC:", or "BCC:" fields. Each entered address becomes a removable pill/tag. Addresses can be validated on entry, and an autocomplete suggestion list can be provided.

**When not to use:** Do not use EmailSelector for single-email fields where a plain `Input` with `type="email"` and validation suffices. Do not use for non-email tag inputs — use a generic tag-input or multi-select component for non-email values.

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│  [tag: alice@example.com ✕]  [tag: bob@co.com ✕]  [input_] │  ← .label-input container
└─────────────────────────────────────────────────────────────┘
  ↓ (on tag click / when editing)
┌─────────────────────────────────────────────────────────────┐
│  [tag: alice@example.com ✕]  [editing input field        ]  │
│                             ┌───────────────────────────┐   │
│                             │  suggestion@example.com   │   │  ← autocomplete popup (.autocomplete)
│                             │  other@company.org        │   │
│                             └───────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

ValidationText appears below the container for error/warning messages.
```

**Tag states:** each tag (Label component) can be: normal, editing (inline input), invalid (ruby tint), or first-locked (`disableRemovalOfFirst`).

## Tokens Used

| CSS Token | Role |
|---|---|
| `--radius-md` (`--border-radius-medium`, 4px) | Container and tag border radius |
| `--color-border` (`--color-neutral-dark`) | Default container border |
| `--color-text` (`--color-neutral-darkest`) | Active/hover container border and double-ring focus |
| `--color-error` (`--color-ruby-dark`) | Error state border and double-ring |
| `--color-warning` (`--color-gold-dark`) | Warning state border and double-ring |
| `--space-1` (`--spacer-smallest`, 3px) | Container padding (minus 1px for border offset) |
| `--z-overlay` (10 → theme uses 500 for overlay-z-index) | Autocomplete dropdown z-index |
| `max-width: 300px` | Maximum tag width (`--max-label-width`) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultSelection` | `EmailOption[]` | `[]` | Initial set of email tags (uncontrolled) |
| `onChange` | `(selection: EmailOption[]) => void` | — | Called with the current valid selection whenever it changes |
| `onBlur` | `(event?) => void` | — | Called when focus leaves the entire component |
| `onFocus` | `(event) => void` | — | Called when the component gains focus |
| `onBottomReached` | `() => void` | — | Called when autocomplete dropdown is scrolled to the bottom (for infinite-load) |
| `validator` | `(option: EmailOption) => boolean \| string` | — | Custom validation function; `true` = valid, `false` = invalid (shows red tag), `string` = warning message |
| `suggestions` | `EmailOption[]` | — | Autocomplete suggestions shown while typing; already-selected addresses are excluded automatically |
| `renderSuggestion` | `(option: EmailOption) => ReactNode` | — | Custom renderer for each suggestion row |
| `error` | `string \| boolean` | — | Error message or flag shown via `ValidationText` below the field |
| `warning` | `string \| boolean` | — | Warning message or flag (validator-generated warnings take precedence) |
| `id` | `string` | — | `id` applied to the hidden focus input element |
| `menuFullWidth` | `boolean` | — | Makes the autocomplete dropdown match the container width |
| `disableRemovalOfFirst` | `boolean` | — | Prevents removing the first tag (e.g., the sender address) |

**EmailOption shape:**
```ts
{ email: string; name?: string; [key: string]: unknown }
```

## States

| State | Visual Description |
|---|---|
| Default (empty) | Single-line bordered container with cursor text |
| Hover | Border changes to `--color-neutral-darkest` |
| Active (editing) | Border becomes `--color-neutral-darkest` + 1px inset double-ring |
| Error | Red (`--color-ruby-dark`) border + double-ring; `ValidationText` below |
| Warning | Gold (`--color-gold-dark`) border + double-ring; `ValidationText` below |
| Tag — normal | Pill with email text and ✕ remove button |
| Tag — invalid | Ruby background tint, ruby-colored ✕ button |
| Tag — editing | Inline contenteditable with autocomplete dropdown |
| Autocomplete open | Fixed-position dropdown (max-height 230px, scrollable) |

## Code Example

```tsx
import EmailSelector from '@teamleader/ahoy/dist/es/components/emailSelector';

const [emails, setEmails] = useState([]);

<EmailSelector
  defaultSelection={[{ email: 'sender@example.com' }]}
  disableRemovalOfFirst
  suggestions={[
    { email: 'alice@example.com', name: 'Alice' },
    { email: 'bob@example.com', name: 'Bob' },
  ]}
  validator={(option) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(option.email);
    return valid || 'Invalid email address';
  }}
  onChange={setEmails}
  error={formErrors.recipients}
/>
```

## Cross-references
- `ValidationText` — used internally to render error/warning messages below the field
- `Input` — for single email address fields
- `Select` — for selecting from a fixed list of options
- `Tag` / `Label` — internal pill component rendered per email address

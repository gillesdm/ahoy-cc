# WysiwygEditor

## Metadata
- **Name:** WysiwygEditor
- **Category:** Form / Input
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/wysiwygEditor`

## Overview
A rich text editor built on `react-draft-wysiwyg` with a fixed toolbar supporting bold, italic, ordered/unordered lists, and hyperlinks. Validates with the same error/warning/success/help pattern as other Ahoy form inputs.

**When to use:**
- Multi-line text fields where basic formatting is required (email body, notes, descriptions)
- When users need to add links or structure content with lists

**When not to use:**
- Plain text areas — use `Input` with `multiline`
- Advanced rich text (tables, images, code blocks) — this editor is intentionally limited
- Read-only formatted content display — render HTML directly

## Anatomy

```
Box[data-teamleader-ui="wysiwyg-editor"]
├── Editor (react-draft-wysiwyg)
│     ├── div.toolbar (top bar)
│     │     ├── InlineStylingOptions  (Bold, Italic buttons)
│     │     ├── ListStylingOptions    (Unordered, Ordered list buttons)
│     │     └── LinkOptions           (Link button + URL popover)
│     └── div.input  (DraftJS content editable area)
│           └── DraftEditor (contenteditable)
└── ValidationText (error | warning | success | help)
```

The wrapper element receives state classes: `has-focus`, `has-error`, `has-success`, `has-warning`, `has-placeholder`.

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-dark` | Default wrapper border |
| `--color-neutral-darkest` | Focused / hovered wrapper border + ring |
| `--color-neutral-light` | Toolbar background |
| `--color-neutral` | Toolbar bottom border |
| `--color-neutral-darkest` | Placeholder text (unfocused) |
| `--color-neutral-dark` | Placeholder text (focused) |
| `--color-white` | Editor area background |
| `--color-ruby-dark` (`--color-error`) | Error border + ring |
| `--color-mint-dark` (`--color-success`) | Success border + ring |
| `--color-gold-dark` (`--color-warning`) | Warning border + ring |
| `--font-family-inter` | Editor and toolbar text font |
| `--unit` | Border-radius (0.4×=4 px), min-height (9.3×=93 px), toolbar height (43 px) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string \| boolean` | — | Error message; activates ruby border + ring |
| `warning` | `string \| boolean` | — | Warning message; activates gold border + ring |
| `success` | `string \| boolean` | — | Success message; activates mint border + ring |
| `helpText` | `string` | — | Help text shown below the editor |
| `locale` | `'en' \| 'es' \| 'it' \| 'nl' \| 'fr' \| 'de'` | `'en'` | Locale for toolbar UI translations |
| `width` | `string \| number` | — | CSS width of the outer Box |
| `autoFocus` | `boolean` | — | Focuses the editor on mount |
| `inputClassName` | `string` | — | Extra class names on the editable area |
| `onFocus` | `(event) => void` | — | Called when the editor receives focus |
| `onBlur` | `(event) => void` | — | Called when the editor loses focus |
| `onInputFocus` | `(event) => void` | — | Called on every focus event within the editor |
| `onInputBlur` | `(event) => void` | — | Called on every blur event within the editor |
| `onKeyDown` | `(event) => void` | — | Called on keydown within the editor wrapper |
| `className` | `string` | — | Extra class names on the wrapper element |

All `react-draft-wysiwyg` `Editor` props are forwarded (e.g. `editorState`, `onEditorStateChange`, `placeholder`).

## States

| State | Visual Description |
|-------|--------------------|
| Default | White editor area, neutral toolbar, `--color-neutral-dark` border |
| Hover | Border shifts to `--color-neutral-darkest` |
| Focused (`has-focus`) | Border + 1 px ring in `--color-neutral-darkest` |
| Error (`has-error`) | Ruby border + ring |
| Warning (`has-warning`) | Gold border + ring |
| Success (`has-success`) | Mint border + ring |
| With placeholder | Placeholder text visible in editor area |
| Placeholder hidden | Placeholder hidden once content type is non-plain (list, etc.) |

## Code Example

```tsx
import WysiwygEditor from '@teamleader/ahoy/dist/es/components/wysiwygEditor';
import { EditorState } from 'draft-js';

function NoteEditor({ onChange, error }) {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  return (
    <WysiwygEditor
      editorState={editorState}
      onEditorStateChange={(state) => {
        setEditorState(state);
        onChange(state);
      }}
      placeholder="Write a note…"
      locale="en"
      error={error}
      helpText="Supports bold, italic, lists and links"
    />
  );
}
```

## Cross-references
- `Input` — plain text input without rich formatting
- `ValidationText` — rendered below the editor for feedback messages
- `Label` — pair with this component for accessible form labelling

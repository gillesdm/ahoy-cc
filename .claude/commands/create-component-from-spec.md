---
description: Generate a React component from a design spec, wiring in Ahoy library components and local project components automatically
argument-hint: "[spec-path-or-component-name]"
allowed-tools: Glob Grep Read Write Bash AskUserQuestion
---

`$ARGUMENTS` is the spec path (e.g. `specs/organisms/top-bar.md`) or a component name (e.g. `top-bar` or `TopBar`). If empty, ask the user which spec to use.

---

## Step 0 — Resolve the spec file

Run these **in parallel**:
- `Glob specs/**/*.md` → build the spec inventory (canonical name + path for every file)
- `Glob ahoy-demo/src/components/*.tsx` → list existing local component files

**Resolve the argument:**

If `$ARGUMENTS` is empty, use `AskUserQuestion` to ask:

> Which spec would you like to turn into a component?
> Provide the path (e.g. `specs/organisms/top-bar.md`) or the component name (e.g. `TopBar`).

Otherwise:
- If it contains `/` or ends in `.md` → treat it as a literal path.
- If it looks like a component name → normalise it (lowercase, strip spaces and punctuation) and match against the spec inventory using exact-then-partial matching.
- If no match is found → tell the user and stop.

## Step 1 — Read the spec

Read the resolved spec file in full. Extract and record:

| Field | Where to find it |
|-------|-----------------|
| **Component name** | `# Heading` on line 1 |
| **Category** | `**Category:**` in Metadata |
| **Ahoy import** | `**Import:**` in Metadata (if present) |
| **Tokens Used** | Every `var(--token)` in the Tokens Used table |
| **Non-tokenised values** | The Non-tokenised table (if present) |
| **Props / API** | The Props / API table |
| **States** | The States table |
| **Code Example** | The TSX code block |
| **Uses entries** | Every line in the Uses section that links to another `.md` file |

Derive the output names:
- **TSX file name** → PascalCase of the component name (e.g. `TopBar.tsx`)
- **CSS file name** → same base (e.g. `TopBar.css`)
- **CSS root class** → kebab-case (e.g. `.top-bar`)

## Step 2 — Resolve sub-component dependencies

Work through every entry in the **Uses** section.

### 2a — Skip foundations
If the link target path starts with `foundations/` → it is a token source only. Record the tokens it contributes but skip component resolution. No import needed.

### 2b — Read each referenced spec
For every non-foundation spec linked in Uses, read that spec file. Extract:
- `**Name:**` — display name
- `**Import:**` — Ahoy import path (if present)
- `**Category:**` — Atom / Molecule / Organism / etc.

### 2c — Classify each dependency into one of three buckets

**Bucket A — Ahoy package**
Condition: the referenced spec has an `**Import:**` containing `@teamleader/ahoy`.
Verify with Glob:
```
ahoy-demo/node_modules/@teamleader/ahoy/dist/es/components/{name}/**
```
If at least one file matches → confirmed Ahoy. Record the exact import path from the spec.

**Bucket B — Local project component**
Condition: no Ahoy import, OR Ahoy package lookup produced no results.
Check with Glob:
```
ahoy-demo/src/components/{ComponentName}.tsx
```
If found → confirmed local. Record the relative import path.

**Bucket C — Not yet implemented**
Neither check produced a result. Will be implemented as an inline placeholder inside the new component.

## Step 3 — Check output path

Check whether `ahoy-demo/src/components/{ComponentName}.tsx` already exists (it will appear in the Glob from Step 0).

If it exists → flag it in the plan as "(already exists — will overwrite)".

## Step 4 — Present the plan and ask for confirmation

Compile the findings from steps 1–3, then use `AskUserQuestion` to present the plan and ask how to proceed.

Format the question body exactly like this (fill in real values; omit any section that has no entries):

---
Here's what I'll create from `{spec-path}`:

**Output files:**
- `ahoy-demo/src/components/{ComponentName}.tsx` _(already exists — will overwrite)_ ← only if applicable
- `ahoy-demo/src/components/{ComponentName}.css`

**Sub-components from `@teamleader/ahoy`:**
| Component | Import |
|-----------|--------|
| Button | `import { Button } from '@teamleader/ahoy/dist/es/components/button'` |
| … | … |

**Sub-components from local project:**
| Component | File |
|-----------|------|
| Sidebar | `./Sidebar` |
| … | … |

**CSS tokens only (no component import):**
`--color-bg`, `--color-border`, `--color-text`, …

**Inline placeholders (not yet implemented as a separate component):**
- {Name} — will render as a minimal `<div>` matching the spec anatomy

How would you like to proceed?

**1. Proceed** — generate the component exactly as planned
**2. Proceed with adjustments** — generate the component, but apply the note you add below
**3. Cancel** — stop, write nothing

---

Provide options `1`, `2`, `3` to `AskUserQuestion`.

**Interpret the response:**
- `1` → proceed exactly as planned.
- `2 [note]` → proceed but incorporate the note as additional instructions while writing.
- `3` → stop immediately, write nothing, confirm cancellation to the user.

## Step 5 — Write `{ComponentName}.tsx`

Follow these rules strictly:

**Props type**
Define `type {ComponentName}Props` from the spec's Props / API table. Use the exact prop names, TypeScript types, and defaults listed there. If the spec has no props, omit the type and use a plain function signature.

**Imports — order matters**
```tsx
import './{ComponentName}.css';
// Bucket A — Ahoy imports (alphabetical by component name)
import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}';
// Bucket B — local imports (relative paths)
import LocalComponent from './LocalComponent';
```

**Component body**
- Use Bucket A and B components with their confirmed import paths wherever the spec's Code Example or Anatomy references them.
- For Bucket C sub-components, render a `<div className="{component-name}__{part}" aria-label="{Part name}" />` placeholder with a `{/* TODO: implement {Name} */}` comment.
- Apply BEM class names: `.{component-name}` on the root, `.{component-name}__{part}` on named sub-regions, `.{component-name}--{modifier}` on state variants.
- Wire up all props from the Props / API table.
- Implement state variants (e.g. disabled, active) using conditional class names.
- Never use inline styles. Never use Tailwind classes.

**Export**
Default export the component. Also export the Props type as a named export.

## Step 6 — Write `{ComponentName}.css`

Follow these rules:

- Use the CSS root class derived in Step 1 (e.g. `.top-bar`) on the root element.
- Map every entry in the spec's **Tokens Used** table to a CSS property using `var(--token)` — never raw hex, px, or ms values.
- For **Non-tokenised** values, include the value and add a `/* non-tokenised: {reason from spec} */` comment on the same line.
- Define rules for all state variants listed in the **States** table (e.g. `.{component-name}--active`, `.{component-name}--disabled`).
- Keep selectors flat (one BEM level) where possible.

## Step 7 — Run the token audit

```bash
node scripts/token-audit.js
```

- **Exit code 0** → proceed to Step 8.
- **Non-zero** → read the error output, identify the raw value(s), fix them in the generated files, and re-run. Repeat until exit code 0. Do not claim completion until the audit passes.

## Step 8 — Output the summary

```
Created:
  ahoy-demo/src/components/{ComponentName}.tsx
  ahoy-demo/src/components/{ComponentName}.css

Sub-components used:
  @teamleader/ahoy  — {Name}, {Name}
  Local project     — {Name}
  Inline placeholder — {Name}  ← add TODO to implement separately

Token audit: ✓ passed (exit 0)
```

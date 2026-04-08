Create a new spec file for the Figma design at: $ARGUMENTS

## Step 0 — Build the spec inventory

Before touching Figma, scan `specs/` to build a live index of what already exists.
Run this in parallel with Step 1.

For each `.md` file found under `specs/`, record:
- **canonical name**: filename without extension, lowercased (e.g. `button`, `icon-button`, `splitButton` → `splitbutton`)
- **relative path** from `specs/` root (e.g. `atoms/button.md`)
- **display name**: derive from the `# Heading` on line 1 if readable, else titlecase the filename

Store this as the **spec inventory**. You will use it in Step 2 to detect existing specs.

## Step 1 — Read the Figma design

Parse the URL to extract `fileKey` and `nodeId`:
- `figma.com/design/:fileKey/:name?node-id=:nodeId` — convert `-` to `:` in nodeId

Call all three **in parallel**:
- `get_design_context` with `fileKey` + `nodeId` — primary source for code, tokens, hints
- `get_screenshot` — visual reference
- `get_metadata` with `fileKey` + `nodeId` — node tree to discover child component names

## Step 2 — Identify sub-components and cross-reference existing specs

Analyse the component tree from `get_metadata` and the code from `get_design_context`.

### 2a — Extract component names

From the node tree, collect every distinct component/instance name (Figma layer names like "Button", "Badge", "Icon", "Card Header", etc.).

Normalise each name for matching: strip spaces, lowercase, remove punctuation → e.g. "Icon Button" → `iconbutton`, "Split Button" → `splitbutton`.

### 2b — Match against spec inventory

For each found component name, check if a spec already exists:

| Match strategy | Example |
|---|---|
| Exact normalised match | `button` → `atoms/button.md` |
| Contains match | `primarybutton` contains `button` → `atoms/button.md` |
| Ahoy component match | Figma "IconButton" → `components/icon.md` or `atoms/icon-button.md` |

### 2c — Decide what to create vs reference

Output a **spec plan** to the user before writing anything:

```
Spec plan for <ComponentName>:

Will CREATE:
  specs/<category>/<name>.md           (new)
  specs/<category>/<sub-component>.md  (new sub-component, split out)

Will REFERENCE (already specced — no new file):
  specs/atoms/button.md       → Button
  specs/components/badge.md   → Badge
```

**Rules:**
- If the top-level Figma node contains 2+ independently reusable sub-components that are not yet specced, create a separate spec file for each.
- Never create a spec for a component that already exists in the inventory — reference it instead.
- A sub-component is "independently reusable" if it appears as a named Figma component/instance, not just a visual grouping.
- If a component already exists in the spec inventory, add it only as a cross-reference link in the parent spec's **Uses** section.

### 2d — Ask the user to confirm the plan

**Do not write any files yet.** Use `AskUserQuestion` to present the plan and ask for approval.

Format the question like this:

---
Here's what I'm planning to do:

**Will CREATE** (new spec files):
- `specs/<category>/<name>.md`
- `specs/<category>/<sub-component>.md`

**Will REFERENCE** (already specced — no new file):
- `specs/atoms/button.md` → Button
- `specs/components/badge.md` → Badge

How would you like to proceed?

**1. Proceed** — write all specs as planned
**2. Proceed with adjustments** — write the specs, but apply the note you add below
**3. Re-plan** — discard this plan and re-analyse with your note as new guidance
**4. Cancel** — stop, write nothing

_Select a number and optionally add a note (e.g. "2 – also add a dark mode variant section")_

---

Then wait for the user's response before continuing.

**Interpret the response:**
- `1` or no number → proceed exactly as planned
- `2 [note]` → proceed but incorporate the note as additional instructions while writing
- `3 [note]` → go back to Step 1/2 and re-analyse, treating the note as updated guidance; present a new plan before writing
- `4` → stop immediately, write nothing, confirm cancellation to the user

## Step 3 — Determine category and output path

For each new spec to create, choose the most appropriate category:

| Category | Folder | When |
|----------|--------|------|
| Foundation | `specs/foundations/` | Color, spacing, typography, radius, elevation, motion |
| Atom | `specs/atoms/` | Smallest reusable Ahoy component (Button, Input, IconButton) |
| Molecule | `specs/molecules/` | Two or more atoms composed into a named pattern |
| Organism | `specs/organisms/` | Complex section composed of molecules and atoms |
| Pattern | `specs/patterns/` | Layout or interaction convention |
| Component | `specs/components/` | Ahoy library component with a direct import path |

Filename: kebab-case of the component name, e.g. `split-button.md`.

## Step 4 — Write each spec

Use the structure below. Populate every section with real data derived from the Figma design. Omit sections that genuinely don't apply (e.g. no Props/API for a Foundation; no States for a purely static layout).

---

### Template: Atom / Molecule / Organism / Pattern

```
# {ComponentName}

## Metadata
- **Name:** {ComponentName}
- **Category:** {Atom | Molecule | Organism | Pattern}
- **Status:** {Stable | Demo | Experimental}
- **Source:** `@teamleader/ahoy` — `components/{name}`
- **Import:** `import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}'`

## Overview

**When to use:**
- {primary use case}
- {secondary use case}

**When not to use:**
- {anti-pattern or alternative}

## Anatomy

\```
{ASCII box diagram of the component, labelling each visual region}
\```

1. **Root** — {description}
2. **{Part}** — {description}

## Tokens Used

| Role | Token |
|------|-------|
| Background | `var(--color-bg)` |
| Text | `var(--color-text)` |
| Border | `var(--color-border)` |
| Spacing | `var(--space-N)` |
| Radius | `var(--radius-md)` |
| Shadow | `var(--elevation-N)` |
| Transition | `var(--transition-shadow)` |

If a structural value is intentionally not tokenised (e.g. a fixed logo height), add a second table:

| Property | Value | Reason |
|----------|-------|--------|
| `.element` width | `{N}px` | {reason — unique to this composition, not a reusable decision} |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `propName` | `type` | `default` | description |

## States

| State | Visual |
|-------|--------|
| Default | {description} |
| Hover | {description} |
| Focus visible | {description} |
| Disabled | {description} |

## Code Example

\```tsx
import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}';

<ComponentName prop="value" />
\```

## Uses

List every spec this component depends on, using relative markdown links.
For each foundation consumed, link it. For each sub-component that already had
a spec in the inventory (Step 2), link it here instead of re-speccing it:

- [Color](../foundations/color.md) — `--color-*` tokens consumed
- [Spacing](../foundations/spacing.md) — `--space-*` tokens consumed
- [Typography](../foundations/typography.md) — `--font-*` tokens consumed
- [Radius](../foundations/radius.md) — `--radius-*` tokens consumed
- [Elevation](../foundations/elevation.md) — `--elevation-*` tokens consumed
- [Motion](../foundations/motion.md) — `--transition-*` tokens consumed
- [{ExistingComponent}](../{category}/{existing-component}.md) — {role in this composition}

## Used by

_List specs that compose this component, using relative markdown links. If none yet: "No known usages yet."_
```

---

### Template: Component (Ahoy library)

Same structure as above, but:
- Replace `Source` + `Import` with a single **Import path** line
- Replace `Used by` with a **Cross-references** section listing related Ahoy components by name

---

## Token rules (must follow)

- Never write raw hex, `rgb()`, `hsl()`, pixel values, or ms durations directly.
- All visual properties must map to a `var(--token)` from `specs/tokens/token-reference.md` Layer 2.
- Non-tokenised structural values (dimensions unique to a composition) are allowed but must be called out explicitly in a separate "Non-tokenised" table with a reason.
- Cross-reference all consumed foundations and peer components using relative markdown links.

## Step 5 — Save and confirm

Write all new spec files to their correct paths under `specs/`.

After writing, print a summary:
```
Created:
  specs/<category>/<name>.md

Referenced (no new file — already specced):
  specs/atoms/button.md
  specs/components/badge.md
```

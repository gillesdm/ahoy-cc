---
description: Create a new design spec through a guided interview — name, anatomy, states, props
argument-hint: "[component-name]"
allowed-tools: Glob Grep Read Write
---

$ARGUMENTS is the component name or description, if provided.

## Before you begin — scan the spec inventory

Silently run Glob on `specs/**/*.md` to build the **spec inventory**. For every file found, record:
- **canonical name** — filename without extension, lowercased (`button`, `icon-button`)
- **relative path** — from repo root (`specs/atoms/button.md`)
- **display name** — from the `# Heading` on line 1, else titlecase the filename
- **category** — the subfolder (`atoms`, `molecules`, `organisms`, `patterns`, `foundations`)

Do this before sending any message to the user.

If `$ARGUMENTS` closely matches an existing spec's canonical name, open with:

> A spec for **{name}** already exists at `specs/{path}`. Did you mean to update it, or are you creating something with a similar name?

Then stop and wait.

---

## Interview — one question at a time

Ask the questions below **one at a time**. Wait for the user's answer before asking the next. After each answer, note what you've learned and use it to make the next question more specific.

---

### Q1 — Name & purpose

If `$ARGUMENTS` was not provided, open with:

> What component or pattern would you like to spec?

Once you have the name (from `$ARGUMENTS` or the user's answer), send:

> I'll create a spec for **{name}**.
>
> **What is it, and what does it do?** Include when to use it and when not to. A sentence or two is fine.

After the answer:
- Extract or confirm the component name
- Note the primary use case and any anti-patterns
- Check the spec inventory for related specs that may be relevant as cross-references
- Form a working hypothesis about category (Atom / Molecule / Organism) — you'll confirm this later without asking

---

### Q2 — Visual anatomy

Tailor the example hint to what was described in Q1:

> **Describe its visual parts** — what regions, elements, or pieces make it up, and how are they arranged?
>
> _(e.g. {anatomy example relevant to Q1 answer})_
>
> As rough or detailed as you like.

After the answer:
- Identify distinct visual regions and their arrangement
- Note any sub-components implied (icon, label, badge, button, etc.)
- Infer which foundation tokens are likely in play (color, spacing, typography, radius, elevation, motion)

---

### Q3 — Sub-components & origin

Pre-populate with what you inferred in Q2:

> Based on your description, it looks like it might contain: _{list sub-components inferred from Q2, or omit this line if none were obvious}_. Does that sound right? Anything to add or remove?
>
> Also: is this from the **Ahoy library** (`@teamleader/ahoy`), a **custom component**, or a mix?

After the answer:
- Cross-reference each sub-component against the spec inventory (REFERENCE vs CREATE)
- Confirm source (Ahoy / custom / mixed)
- Infer the Ahoy import path if applicable

---

### Q4 — States

Pre-suggest states based on the component type from Q1–Q3:

> **Which states does it have?**
>
> Based on what you've described, I'd expect at least: _{inferred states — e.g. `default`, `hover`, `disabled` for an interactive component; or "none, it's purely static" for a layout primitive}_.
>
> Confirm, correct, or extend:
> `default` · `hover` · `focus` · `active / selected` · `disabled` · `error` · `loading` · `empty` · `expanded / collapsed` · other

After the answer: record confirmed states and note any state-specific visual changes.

---

### Q5 — Props & configuration

Pre-fill with likely props inferred from Q1–Q4:

> **What can be configured on this component?**
>
> From your description, these props seem likely: _{list inferred props with types — e.g. `label (string)`, `disabled (boolean)`, `size ('sm' | 'md' | 'lg')`; or omit if nothing is obvious}_.
>
> Confirm, adjust, or extend. For each prop: name · type · what it controls.

Wait for the answer before moving on.

---

## After the interview — infer without asking

### Determine category

| Signal from the answers | Infer |
|-------------------------|-------|
| Single Ahoy primitive, no named sub-components | **Atom** |
| Composes 2+ atoms into a named unit with one clear purpose | **Molecule** |
| Large, self-contained page section with multiple molecules | **Organism** |
| Layout or structural convention (how things arrange, not what they are) | **Pattern** |
| Core visual language (color, spacing, type, radius, elevation, motion) | **Foundation** |

When in doubt between Atom and Molecule: if it contains another named component from the inventory, it's at least a Molecule.

### Determine filename

kebab-case of the component name. Examples: `split-button.md`, `empty-state.md`.

### Match sub-components

For each sub-component named in Q3:
- Found in inventory → **REFERENCE** (no new file, link it in Uses)
- Not found + independently reusable → **CREATE** (new spec file)

Only create a sub-component spec if it can stand alone. A purely decorative grouping that only exists inside this component is not independently reusable.

### Identify foundations consumed

Infer from anatomy, props, and states:
- Text color, background, border → Color
- Margin, padding, gap → Spacing
- Font size, weight, line height → Typography
- Rounded corners → Radius
- Drop shadow, depth → Elevation
- Transitions, animations → Motion

---

## Present the plan

Send a single message with the plan below, then wait. **Do not write any files yet.**

---

Here's my plan for the **{ComponentName}** spec:

**Category:** {Atom | Molecule | Organism | Pattern} — _{one-sentence reasoning}_

**Output:** `specs/{category}/{filename}.md`

**Will CREATE** (new spec files):
- `specs/{category}/{filename}.md` ← main spec
- `specs/{category}/{sub-component}.md` ← _(only if unspecced and independently reusable)_

**Will REFERENCE** (already specced — no new file):
- `specs/atoms/button.md` → Button
- `specs/foundations/color.md` → Color tokens

**Foundations inferred from your description:** Color · Spacing · Typography _(list what applies)_

**Gaps I'll mark as TODO:**
- _{any unknowns — exact prop types, import path, non-tokenised dimensions}_

How would you like to proceed?

**1. Proceed** — write the spec as planned
**2. Proceed with adjustments** — write it and apply the note you add below
**3. Re-plan** — discard this plan and re-analyse with your note as new guidance
**4. Cancel** — stop, write nothing

_Select a number and optionally add a note (e.g. "2 – it's actually a molecule, also add a tooltip sub-component")_

---

**Interpret the response:**
- `1` or blank → proceed exactly as planned
- `2 [note]` → proceed and incorporate the note while writing
- `3 [note]` → revise the plan with the note; present a new plan before writing
- `4` → stop, confirm cancellation

---

## Write the spec

Populate every section from the interview answers. Omit sections that genuinely don't apply (no Props/API for a Foundation; no States for a static layout primitive). Mark anything genuinely unknown as `TODO`.

```markdown
# {ComponentName}

## Metadata
- **Name:** {ComponentName}
- **Category:** {Atom | Molecule | Organism | Pattern | Foundation}
- **Status:** {Stable | Demo | Experimental}
- **Source:** {`@teamleader/ahoy` — `components/{name}` | Custom | TODO}
- **Import:** {`import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}'` | Custom — no import path | TODO}

## Overview

**When to use:**
- {primary use case from Q1}

**When not to use:**
- {anti-pattern from Q1, or "TODO — add guidance"}

## Anatomy

```
{ASCII box diagram derived from Q2 — label every visual region}
```

1. **Root** — {description}
2. **{Part}** — {description}

## Tokens Used

| Role | Token |
|------|-------|
| {role inferred from anatomy/states} | `var(--token)` |

{If any structural values are intentionally not tokenised, add:}

| Property | Value | Reason |
|----------|-------|--------|
| {property} | {value} | {why it's not a token} |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| {from Q5} | {type} | {default} | {description} |

## States

| State | Visual |
|-------|--------|
| {from Q4} | {description of appearance} |

## Code Example

```tsx
{import statement}

{minimal realistic usage covering 2–3 common cases}
```

## Uses

- [Color](../foundations/color.md) — `--color-*` tokens consumed
- [Spacing](../foundations/spacing.md) — `--space-*` tokens consumed
- [{ExistingSubComponent}](../{category}/{name}.md) — {role in this composition}

## Used by

_No known usages yet._
```

### Token rules

- Never write raw hex, `rgb()`, `hsl()`, pixel values, or `ms` durations
- All visual properties must map to a `var(--token)` from `specs/tokens/token-reference.md` Layer 2
- Non-tokenised structural values are allowed but must appear in a separate table with a reason

---

## Confirm and summarise

After writing, print:

```
Created:
  specs/{category}/{filename}.md

Referenced (no new file):
  specs/atoms/button.md
  specs/foundations/color.md

TODOs left in the spec:
  - {any gaps}

Next: open the spec to fill in TODOs, or run /figma-spec with a Figma URL to enrich it with visual data.
```

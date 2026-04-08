Create a new spec file through a guided interview.

The argument (if provided) is the component name or a short description: $ARGUMENTS

---

## Step 0 — Scan the spec inventory

Before asking any questions, scan `specs/` to build a live index of what already exists.

For each `.md` file found under `specs/`, record:
- **canonical name**: filename without extension, lowercased (e.g. `button`, `icon-button`)
- **relative path** from repo root (e.g. `specs/atoms/button.md`)
- **display name**: derive from the `# Heading` on line 1, else titlecase the filename
- **category**: the subfolder it lives in (`atoms`, `molecules`, `organisms`, `patterns`, `foundations`)

Store this as the **spec inventory**. You will use it throughout to detect duplicates and find cross-references.

If `$ARGUMENTS` matches (or closely resembles) an existing spec's canonical name, stop and tell the user:
> A spec for **{name}** already exists at `specs/{path}`. Did you mean to update it, or are you creating something with a similar name? Clarify before continuing.

---

## Step 1 — Interview the user

Ask all five questions in a **single message**. Do not split them across multiple turns.

Number each question clearly. Tell the user upfront that the more detail they give, the less you'll need to ask.

---

Here is the message to send:

---

I'll create a spec file for **{component name from $ARGUMENTS, or "your component" if none given}**. The more detail you give here, the less I'll need to ask later.

**1. Name & purpose**
What is the component's name, and what does it do? Include when it should be used and when it shouldn't. _(1–4 sentences is fine.)_

**2. Visual anatomy**
Describe its visual parts — what regions, elements, or pieces make it up, and how they're arranged. For example: _"a row with an icon on the left, a label and sublabel stacked in the middle, and an optional badge on the right"_. Be as rough or detailed as you like.

**3. Sub-components & origin**
Does it contain other components inside it (e.g. Button, Icon, Badge, Input, Avatar)? List them if so.
Also: is this from the **Ahoy library** (`@teamleader/ahoy`), a **custom component** you're building, or something in between?

**4. States**
Which interactive or visual states does it have? List what applies:
`default` · `hover` · `focus` · `active / selected` · `disabled` · `error` · `loading` · `empty` · `expanded / collapsed` · other
_(Say "none" if it's a purely static component.)_

**5. Props & configuration**
What can be configured on this component? List the main props — name, type, and what they control.
For example: `label (string) — the button text` · `disabled (boolean) — disables interaction` · `size ('small' | 'medium' | 'large') — controls padding and font size`

---

Wait for the user's answers before continuing.

---

## Step 2 — Infer everything you can; ask only what you can't

From the user's answers, derive as much as possible without asking follow-up questions.

### 2a — Determine category

Use this decision tree — **do not ask the user**. Present your reasoning in the plan (Step 3).

| Signal from the answers | Infer |
|---|---|
| Standalone, no sub-components, maps to a single Ahoy primitive | **Atom** |
| Composes 2+ atoms or sub-components into a named unit with a clear single purpose | **Molecule** |
| Large, self-contained page section; contains multiple molecules | **Organism** |
| Layout or structural convention (how things are arranged, not what they are) | **Pattern** |
| Core visual language (colour, spacing, type, radius, elevation, motion) | **Foundation** |

When in doubt between Atom and Molecule: if it contains another named component from the spec inventory, it's at least a Molecule.

### 2b — Determine filename

kebab-case of the component name. Examples: `split-button.md`, `sidebar-menu-item.md`, `empty-state.md`.

### 2c — Identify foundations consumed

From the anatomy, props, and states described, infer which foundation tokens the component likely uses:

- Text colour, background, border → [Color](../specs/foundations/color.md)
- Margin, padding, gap → [Spacing](../specs/foundations/spacing.md)
- Font size, weight, line height → [Typography](../specs/foundations/typography.md)
- Rounded corners → [Radius](../specs/foundations/radius.md)
- Drop shadow, depth → [Elevation](../specs/foundations/elevation.md)
- Transitions, animations → [Motion](../specs/foundations/motion.md)

### 2d — Match sub-components to the spec inventory

For every sub-component the user mentioned in Q3:
- Normalise the name (lowercase, no spaces/punctuation)
- Check against the spec inventory
- If found → mark as **REFERENCE** (no new file)
- If not found → mark as **CREATE** (new spec)

Only create a sub-component spec if it is independently reusable. A purely decorative grouping that only exists inside this component is not independently reusable.

### 2e — Infer the import path

- Ahoy components: `import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}'`
- Custom components: note it as custom, no import path
- Unknown: leave a `TODO` placeholder

---

## Step 3 — Present the plan

Present the plan and ask for approval in a single message. **Do not write any files yet.**

Format:

---

Here's my plan for the **{ComponentName}** spec:

**Category:** {Atom | Molecule | Organism | Pattern} — _{one-sentence reasoning}_

**Output file:** `specs/{category}/{filename}.md`

**Will CREATE** (new spec files):
- `specs/{category}/{filename}.md` ← the main spec
- `specs/{category}/{sub-component}.md` ← _(only if sub-component is unspecced and independently reusable)_

**Will REFERENCE** (already specced — no new file):
- `specs/atoms/button.md` → Button
- `specs/foundations/color.md` → colour tokens

**Foundations inferred from your description:**
- Color, Spacing, Typography _(list what applies)_

**What I'll fill in from your answers:**
- ✅ Anatomy · States · Props / API · Code example · Uses / Used by

**What I'm less certain about** _(will mark as TODO in the spec)_:
- {any gap — e.g. exact prop types, import path, non-tokenised dimensions}

How would you like to proceed?

**1. Proceed** — write the spec as planned
**2. Proceed with adjustments** — write it, but apply the note you add below
**3. Re-plan** — discard this plan, re-analyse with your note as new guidance
**4. Cancel** — stop, write nothing

_Select a number and optionally add a note (e.g. "2 – it's actually a molecule, and it also contains a tooltip")_

---

Wait for the user's response before writing anything.

**Interpret the response:**
- `1` or blank → proceed exactly as planned
- `2 [note]` → proceed but incorporate the note
- `3 [note]` → revise the plan with the note as updated guidance; present a new plan before writing
- `4` → stop immediately, confirm cancellation

---

## Step 4 — Write the spec

Use this template. Populate every section from the interview answers. Omit sections that genuinely don't apply (e.g. no Props/API for a purely visual Foundation; no States for a static layout primitive). Mark anything genuinely unknown as `TODO`.

---

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
- {secondary use case from Q1}

**When not to use:**
- {anti-pattern from Q1, or "TODO — add guidance"}

## Anatomy

{ASCII box diagram derived from Q2. Label every visual region.}

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

{minimal realistic usage snippet covering the 2–3 most common cases}
```

## Uses

{Link every foundation consumed and every sub-component referenced from the spec inventory.}

- [Color](../foundations/color.md) — `--color-*` tokens consumed
- [Spacing](../foundations/spacing.md) — `--space-*` tokens consumed
- [{ExistingSubComponent}](../{category}/{name}.md) — {role in this composition}

## Used by

_No known usages yet._
```

---

### Token rules

- Never write raw hex, `rgb()`, `hsl()`, pixel values, or `ms` durations directly
- All visual properties must map to a `var(--token)` from `specs/tokens/token-reference.md` Layer 2
- Non-tokenised structural values are allowed but must be called out in a separate table with a reason

---

## Step 5 — Confirm and summarise

After writing, print:

```
Created:
  specs/{category}/{filename}.md

Referenced (no new file — already specced):
  specs/atoms/button.md
  specs/foundations/color.md

TODOs left in the spec:
  - Import path (unknown — mark as TODO if custom and not confirmed)
  - {any other gaps}

Next: open the spec file and fill in any TODOs, or run /figma-spec with a Figma URL to enrich it with visual data.
```

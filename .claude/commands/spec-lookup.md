---
description: Look up relevant design specs before implementing UI. Invoke automatically whenever a user asks to build, modify, or style a component, page section, or UI element. Pass the component or feature description as the argument.
argument-hint: "[component-or-feature-description]"
allowed-tools: Glob Grep Read
---

$ARGUMENTS is the component name or feature description. If empty, infer it from the user's most recent request.

## Goal

Before any UI work begins, surface the specs that apply to this request so the implementation uses the right tokens, components, and patterns from the start.

## Step 1 — Extract the subject

Determine what the user wants to build or modify. Use `$ARGUMENTS` if provided; otherwise extract the subject from their last message (component name, page area, or UI feature).

## Step 2 — Build the spec inventory

Run `Glob specs/**/*.md` to collect all spec files. For each file record:
- **canonical name** — filename without extension, lowercased (`button`, `icon-button`)
- **relative path** — from repo root (`specs/atoms/button.md`)
- **category** — the subfolder (`foundations`, `atoms`, `molecules`, `organisms`, `patterns`, `tokens`)

## Step 3 — Find relevant specs

Match the subject against the spec inventory using three passes (run in parallel where possible):

**Pass A — Direct name match**
Normalise the subject: strip spaces, lowercase, remove punctuation. Check for exact or partial match against canonical spec names.

**Pass B — Keyword search**
Use `Grep` to search spec file contents for the subject's key terms (component name, visual role, interaction type). Limit to `specs/**/*.md`.

**Pass C — Foundation coverage**
Always include the following foundations when any visual work is involved:
- `specs/foundations/color.md`
- `specs/foundations/spacing.md`
- `specs/foundations/typography.md`

Add `specs/foundations/radius.md`, `specs/foundations/elevation.md`, and `specs/foundations/motion.md` only if the component uses rounded corners, shadows, or transitions respectively.

## Step 4 — Read and extract

For each matched spec file, read it and extract:
- **Tokens Used** table — every `var(--token)` required
- **Props / API** table — available props and their types
- **States** table — which visual states exist
- **Code Example** — the canonical import and usage pattern
- **Uses** section — dependencies on other specs or foundations

If a spec file is very long, read only the sections listed above.

Also read `specs/tokens/token-reference.md` if the subject requires tokens not listed in the matched specs.

## Step 5 — Output a spec summary

Present a concise, actionable brief before implementation starts. Use this format:

---

### Spec brief for: {subject}

**Relevant specs found:**
| Spec | Path | Why it applies |
|------|------|----------------|
| {Name} | `specs/{path}` | {one-line reason} |

**Tokens to use:**
| Role | Token |
|------|-------|
| {role} | `var(--token)` |

**Component(s) to use:**
```tsx
import { ComponentName } from '@teamleader/ahoy/dist/es/components/{name}';
```
_(List only components that exist in the matched specs. If none apply, write "No Ahoy component — custom implementation.")_

**Key constraints from the specs:**
- {bullet per spec rule that affects this request — e.g. required props, forbidden raw values, token restrictions}

**Gaps / TODOs:**
- {anything not covered by existing specs — list as TODO or note where to look next}

---

After presenting this brief, continue with the user's original request, applying all constraints above.

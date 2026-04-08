# Figma Integration

The `/figma-spec` command turns any Figma component directly into a spec file — without writing anything yourself.

---

## How to run it

Select a frame or component in Figma, copy its link, then paste it into Claude Code:

```
/figma-spec https://www.figma.com/design/YOUR_FILE_KEY/File-Name?node-id=123-456
```

**Where to find the URL in Figma:**
1. Select the frame or component you want to spec
2. Right-click → **Copy link to selection**
3. Paste it after `/figma-spec`

> [!TIP]
> For best results, select a **named component frame** — not a raw group or a page. Named Figma components produce richer spec output with correct token mappings and state documentation.

---

## What `/figma-spec` does

1. **Reads the Figma design** — fetches the component tree, screenshot, and design tokens directly from the Figma API
2. **Scans existing specs** — checks what's already specced so it never creates a duplicate
3. **Shows you a plan** — lists exactly which files it will create and which it will only reference
4. **Waits for your approval** — you confirm (or adjust) the plan before anything is written
5. **Writes the spec files** — creates correctly structured `.md` files in the right folder

---

## Reviewing the plan

Before writing any files, Claude presents a plan like this:

```
Here's what I'm planning to do:

Will CREATE (new spec files):
  specs/organisms/notification-banner.md
  specs/molecules/notification-icon.md

Will REFERENCE (already specced — no new file):
  specs/atoms/button.md       → Dismiss button
  specs/foundations/color.md  → colour tokens consumed

How would you like to proceed?
  1. Proceed
  2. Proceed with adjustments — add a note below
  3. Re-plan — discard and re-analyse
  4. Cancel
```

Reply with a number. You can attach instructions to options 2 or 3:

```
2 – also add a dark mode variant section to the spec
```

```
3 – the icon is a separate reusable component, please spec it separately
```

> [!IMPORTANT]
> Claude will not write any files until you approve the plan. Always review the "Will CREATE" list — if something is already specced under a different name, use option 3 to re-plan.

---

## Tips for good spec output

**Name your Figma frames clearly.**
A frame called "Notification Banner / Default" produces a much richer spec than one called "Frame 42". The name becomes the spec's title and informs the anatomy labels.

**Include all states in the same frame or component set.**
If your component has hover, focus, disabled, and error states, select the component set (not a single variant). Claude will document all states in one pass.

**Use Figma variables where possible.**
When your Figma file uses variables that map to Ahoy tokens, `/figma-spec` can resolve them automatically. If you're using raw hex values in Figma, Claude will still find the closest token match — but named variables are more reliable.

**Spec sub-components separately first.**
If a complex component (e.g. a notification banner) contains a sub-component (e.g. a custom icon badge) that doesn't have a spec yet, spec the sub-component first. Then spec the parent. This gives Claude the dependency chain it needs.

---

## After the spec is written

Once the spec files exist, Claude will use them automatically any time you ask to build that component. You don't need to reference the file explicitly — though you can for extra precision:

```
Build the notification banner from specs/organisms/notification-banner.md.
```

If the spec needs updating after a Figma design change, re-run `/figma-spec` with the same URL. Claude will detect the existing spec and offer to update it rather than duplicate it.

# Developer Handoff

When the prototype is ready, handing it off to a developer is straightforward. Because the prototype was built using the same Ahoy conventions used in production, there's no translation step.

---

## What the developer receives

| | What it means in practice |
|---|---|
| ✅ **Production-ready component imports** | Same Ahoy import paths used in the real product — no refactoring needed |
| ✅ **Token-based styles** | No raw hex values, pixel values, or magic numbers — every value is a named CSS custom property |
| ✅ **Spec files for every decision** | The developer reads the same source Claude used — nothing is implicit or tribal knowledge |
| ✅ **A passing token audit** | Confirmed by `node scripts/token-audit.js` before handoff |

---

## Handoff checklist

Before passing the prototype to a developer, verify the following:

- [ ] The prototype looks and behaves as intended at `http://localhost:5173`
- [ ] The token audit passes with zero violations:
  ```bash
  node scripts/token-audit.js
  ```
- [ ] All components you've added have a corresponding spec in `specs/`
- [ ] Any components without a spec have been created via `/create-spec` or `/figma-spec`

---

## What to tell the developer

Share the following in your handoff message:

```
The prototype is in ahoy-demo/src/.
It follows the specs in specs/.
Run node scripts/token-audit.js to confirm it's clean.
```

If specific components need attention, reference their spec files directly:

```
The sidebar nav is built to specs/organisms/sidebar.md.
The hero section is built to specs/molecules/hero.md.
The counter variant we discussed is documented in specs/molecules/counter.md.
```

---

## What developers can skip

Because the prototype already follows production conventions, developers don't need to:

- Hunt for the correct Ahoy import path — it's already right
- Guess which token to use for a colour or spacing value — it's already a token
- Reverse-engineer design decisions — the spec explains each one
- Clean up one-off values — the audit has already flagged and fixed them

---

## If the developer has questions

Point them to the relevant spec. Every component spec has an **Overview** section (when to use it), a **Props / API** section (what can be configured), and a **Code Example** (a working snippet they can copy directly).

For questions about the token system, [`docs/tokens.md`](./tokens.md) and [`specs/tokens/token-reference.md`](../specs/tokens/token-reference.md) are the authoritative references.

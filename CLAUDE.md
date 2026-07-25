# kittechsix-landing

## Kittech-Six LLC Brand Standard (MANDATORY — ratified 2026-07-25)

@~/Desktop/claude-brain/agent-instructions/brand.md

Every surface of this app follows the company design system. The short version:
**burnt umber `#BF5700` = where you are in the workflow** (nav, active stage, selected
tool, links, neutral actions); **forest green `#228B22` = clinically safe**;
**brick red `#B22222` = clinically dangerous**. Wayfinding never borrows a signal color —
places are told apart by label and icon. There is no fourth color.

Canvas `#FFF8F2`. Geist. Glass cards, `.btn-3d` actions, three-band shell, entrance-only motion.
Reference implementation: `~/Desktop/my-vertigo-app/apps/web/`.

**Tier C** (vanilla TS/JS or static HTML): use `assets/brand.css` (plain CSS, no Tailwind) + the `.kt-*` class contract. Self-host Geist woff2; never `<link>` Google Fonts (CSP).

Before shipping UI work:
```bash
bash ~/.claude/skills/kittech-brand/scripts/brand-audit.sh .
```
Exit 1 on any FAIL. Full port procedure: `/kittech-brand`. Never hand-tune a brand token
here — change it in my-vertigo-app, re-extract into the skill, then re-port.

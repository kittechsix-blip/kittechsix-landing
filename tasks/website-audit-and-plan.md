# Kittech-Six: the complete building collection

Audited September 7, 2026. Scope: public website, existing site implementation, shared-brain project summaries, Cabinet metadata, and Instar’s editorial library metadata. No personal records, source datasets, private operational records, or credentials are included in the public catalog.

## What the audit found

| Finding | Evidence | Rebuild response |
| --- | --- | --- |
| The spoken domain is easy to get wrong | kittechsix.org failed DNS resolution; kittech-six.org returned the live site | Preserve the working canonical domain. Confirm ownership of the unhyphenated domain before considering a redirect; do not purchase or alter DNS without approval. |
| The website underrepresents the work | Existing work registry contains nine clinical apps. Cabinet contains 57 folders; shared-brain records cover additional workflows and learning projects. | 53 public-safe project entries spanning five areas, plus 68 AI guides and eight copyable starter workflows. Folder counts are not product counts. |
| The first screen frames everything as medical software | Existing hero introduces a physician-run clinical software studio and a hard-coded “Six apps online” label | Broaden the identity to physician, educator, and builder. Introduce paths by visitor intent. Derive project counts from the catalog. |
| Lectures and teaching are scattered | Public cardiac-toxicology and vision-loss decks, USGIV Academy, and AI Engineering Roadmap live independently | A learning collection links directly to the existing published material. No rehosting of lecture assets or source transcripts. |
| Reusable methods are hard to discover from the portfolio | Instar has 68 capability entries; original landing navigation has Work / Consulting / Studio / Legal | A searchable skill index, eight editable starter prompts, copy feedback, and links to the full methods. |
| Project metadata needs editorial review | Cabinet’s landing-site URL pointed to the ventilator project; lecture record also included an obsolete authenticated preview | Curated, explicit public URLs. All 86 distinct project/guide URLs returned HTTP 200 during this audit. HTTP success does not establish app usability, lack of authentication, or clinical validation. |
| Availability is heterogeneous | Some projects are local, protected, unfinished, or internal | Separate availability labels from clinical readiness. Available-only filter excludes prototypes and restricted entries. |
| A huge automatic brain export would leak context and create noise | Brain contains internal infrastructure, personal context, and implementation history | No runtime connection or automatic raw-brain import. Public summaries live in an explicit editorial catalog. |
| Older site code has unrelated debt | Existing task list records CAPTCHA/rate-limit work; old metadata contains hard-coded clinical counts | Preserve existing features and clinical content. Do not present the rebuild as a clinical re-audit or a fix to unrelated form security. |

## Implemented information architecture

- Home: Andy’s introduction, three visitor-intent paths, six selected projects, and collection search.
- Projects: text search, category filters, availability filter, project details, related work, and open actions.
- Learn: lectures, clinical learning, AI education, and a link to the curriculum-building method.
- Workflows: eight editable/copyable portable prompts, plus all 68 current Instar capability entries searchable by name, description, level, and type.
- How I build: problem → brief → prototype → verification → repeatable system → shareable result.
- About: public professional profile and demonstrated capabilities linked to real work.
- Existing clinical overview/tour/demo, consulting, studio, legal, and contact routes remain reachable.

## Inventory reconciliation

The 57 Cabinet folders are not 57 independently publishable products:

- Three myVentKitt implementation variants share one product entry.
- myMedKitt v2’s consult source package belongs to the v2 project entry.
- Claude Brain and Codex Brain belong to the Shared Brain entry.
- Supporting scripts belong to the automation system, not a separate public product.
- Bench Studio’s ownership/configuration kit belongs to Bench Studio; attribution explicitly identifies it as adapted work.
- Kittech-Six LLC and the landing repository are represented by the website itself and its profile/consulting/legal pages.
- Learning is represented by the named learning products, not its umbrella folder.
- Asset and archive directories are not active products.
- One personal/family project is intentionally withheld from the public catalog pending explicit privacy clearance. No source data was opened for publication.
- All other named clinical, automation, education, consumer, and experimental projects from Cabinet have a public-safe catalog entry.
- Additional project/workflow records from the shared brain and this request include Instar, InfoKitt, Wingman, Ask My Apps, Teach, Workflow Kitt, AI Engineering Roadmap, Prompt Architect, OpenClaw, Hermes, and Just Do It.
- The public description of In-Range remains deliberately limited. Prompt Architect and Just Do It lack confirmed launch destinations. These are cataloged without invented release claims.

## Design decisions

Preserve the existing copper frame and the approved copper marketing palette. Extend the Atlantic-inspired typography, flat white surfaces, and hairline separation. Use the existing public portrait and app icons. No new assets, dependencies, database, paid AI feature, or hosting migration are needed.

Use the existing vanilla TypeScript/hash-router architecture. A full framework migration would increase maintenance without improving the requested directory. Existing deep links remain compatible. Canonical fleet contract tokens were restored from the brand skill; the marketing accent exception remains intact.

## Keep the collection current

1. When a project becomes suitable for sharing, add or update its curated record in `src/data/studio-catalog.ts`. Clinical overview records continue to come from the existing app registry.
2. Use a stable public alias, not a deployment-specific preview. Record restrictions honestly; do not infer “available” from HTTP 200 alone.
3. Add a new portable starter recipe to `src/data/workflows.ts` only when the method is useful outside Andy’s private setup. Keep full skill instructions in their canonical library.
4. Review Instar’s metadata changes before updating `src/data/skill-library.ts`. The index is an editorial snapshot, not a live sync.
5. Run the catalog check, public-link check, TypeScript build, and brand audit. Check the changed visitor journey on phone and desktop. Advance the service-worker cache version for subsequent releases.
6. Publish in one reviewed release. Never use a project-folder dump as the public content source.

Potential later work, not silently enabled: verify and redirect the unhyphenated domain if owned; add private project access behind real authentication if desired; pre-render project-specific public URLs for richer per-project search and sharing previews. Current hash routes have client-side titles but share the root social metadata.

## Verification

- Strict TypeScript compilation passed.
- Catalog validation passed: 53 project IDs, 68 guide IDs, eight workflow source links; HTTPS destinations, categories, required fields, icon files, and 101 offline assets.
- All 86 distinct project/guide URLs returned HTTP 200; authenticated/project-state caveat remains explicit.
- Brand audit: 54 pass, zero fail, one warning for existing colors in legacy tour/illustration code, two non-applicable skips.
- Browser: desktop and 390 px phone homepage have no horizontal overflow or broken images. Project search finds USGIV for “ultrasound”; missing search resets from zero to 53 projects. Skill search finds the curriculum entry. Copy feedback confirmed.
- Existing quality/criteria.md is absent. This scoped checklist and the focused catalog verifier provide the task’s acceptance criteria without introducing a new process framework.
- Hosted release status and any final browser findings are recorded below before handoff.

Final browser sweep: 63 routes at 390 px, no missing H1 or horizontal overflow; browser runtime-error list empty. Clipboard write confirmation verified; the automation browser disallows clipboard reads, so clipboard readback is not claimed.

Accessibility follow-up: 200% root text sizing on the early-pregnancy project did not cause horizontal overflow. Mobile menu makes the background inert, traps keyboard focus, and restores the background on Escape.

## Published result

Live: https://kittech-six.org/
Source: e2f35dd, pushed to origin/main. Hosted preview was verified byte-for-byte against the local hub module before promotion. Public production serves the same SHA-256 module and service-worker cache v33. Production mobile homepage title, H1, project count, and horizontal layout verified.

The site remains a curated public directory. Local-only projects need their own release work before they can be opened remotely; this rebuild does not expose a workstation or deploy every private app. The unhyphenated domain remains unresolved. Shared-brain project records were not changed during this release.

## Landing-page refinement — September 7, 2026

Andy prefers the original elegant, single-screen Contents Page as the front door. Restored that hero and its copper frame, with five destinations: Projects, Learn, Workflows, Studio, Contact. Studio expands to About Andy, How I Build, Consulting, the original Studio, and Legal. The expanded editorial collection remains at /#/collection; all new collection routes are preserved. The homepage uses no portrait. A replacement real photograph is pending from Andy.

Design lesson: a request to broaden the catalog does not imply replacing a valued landing-page composition. Preserve the simple entry surface and place deeper content behind its navigation.

Portrait follow-up: replaced the previous synthetic headshot throughout the site with an identity-preserving edited portrait based on Andy’s supplied photograph. The room background was removed, framing tightened, and the gray shirt and natural skin texture retained. Displayed in color. Source photo remains untouched and is not published. New versioned JPEG asset prevents stale cache reuse; offline cache advanced to v35. TypeScript and catalog checks pass; desktop and phone profile layout verified. Source commit 50d93d5 pushed to main.

Portrait refinement: at Andy’s request, used the approved real-photo-based face with the earlier white coat, embroidered name, copper tie, and stethoscope, seated on a stretcher in an empty generated trauma-room scene. Saved a separate versioned asset; earlier portraits and original photo remain unchanged. Site references updated together; cache v36. Commit 811ad10.

Close-up correction: Andy rejected the wider seated portrait. Restored the approved close-up’s framing and head scale, with clinical clothing and a blurred treatment-room background. New asset `andy-kitlowski-clinical-closeup.jpg`; no widened body composition. Site references updated; cache v37; source commit ba98e47.

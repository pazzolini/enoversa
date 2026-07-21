---
title: "Enoversa audit against the Anti-Slop Guide"
updated: "2026-07-21"
status: "Automated pass; human validation pending"
score: 94
---

# Enoversa audit against the Anti-Slop Guide

## Outcome

Enoversa is strongly aligned with `AI_ASSISTED_WEB_DESIGN_GUIDE.md` and passes the current automated acceptance suite. The responsive overflow, undersized standalone targets and missing map failure states found in the initial audit have been corrected. Keyboard, reduced-motion and zoom-equivalent reflow coverage have also been added. Full checklist compliance remains pending until the human protocol has been run with real participants; the custom cursor remains a deliberate unresolved divergence from the guide.

No production change or deployment was made as part of this audit.

## Design thesis and user job

**Design thesis:** Enoversa behaves like a restrained field journal in which each editorial section uses its own form of evidence—scores, documentary photography, bibliography or geography—inside one precise typographic system.

**Primary user job:** Discover and read independent notes and longer writing about low-intervention wine, its people, ideas and useful places.

**Signature:** A dark, sparse editorial grid combines a large Manrope hierarchy with monospaced indexing; Selections add a separate, content-driven colour system while Portraits, Essays and Addresses use documentary, bibliographic and geographic evidence respectively.

## Score

| Dimension | Score | Evidence |
| --- | ---: | --- |
| Design | 38 / 40 | Clear hierarchy, disciplined palette, deliberate grid and typography, with section-specific treatments. The custom-cursor choice remains outside the guide. |
| Usability | 29 / 30 | Clear routes and navigation, useful filters, URL state, explicit loading/error states, keyboard operation, responsive reflow, target sizing and strong performance. Real-participant evidence remains pending. |
| Creativity | 17 / 20 | The field-journal concept and content-specific section identities are recognizable and non-template; the cursor/noise layer is less specific. |
| Content | 10 / 10 | Real editorial content, concrete voice, no invented testimonials or metrics, and clear separation of content types. |
| **Total before penalties** | **94 / 100** | |
| Anti-slop penalties | **0** | None of the guide's fixed penalty conditions was conclusively observed. The issues below are already reflected in the dimension scores. |
| **Final** | **94 / 100** | **Automated pass: above the 80-point threshold; human validation remains pending.** |

## What already follows the guide

- Content determines the structure. The site does not use a generic landing-page sequence, filler copy, invented proof or a universal card system.
- Selections, Portraits, Essays and Addresses have visibly and editorially distinct roles.
- The palette is restrained and semantic; visual effects are limited to the grain layer, restrained transitions, a single pulse and the cursor treatment.
- Navigation uses native links and buttons, exposes `aria-expanded`, closes with Escape in the implementation, and has a skip link and visible global `:focus-visible` treatment.
- `prefers-reduced-motion` disables smooth scrolling, animation and transitions.
- Touch-oriented filters and map controls generally use 44 px heights; filter state is expressed through `aria-pressed`, not colour alone.
- Content routes remain static HTML. The MapLibre layer is progressively loaded, while the full Addresses list remains available in HTML.
- Portrait images include useful alt text, captions, responsive sources, intrinsic dimensions and appropriate eager/lazy loading.
- Canonical metadata, Open Graph data, RSS, sitemap, robots and the page language are present.
- The current test suite covers primary navigation, keyboard focus, filters and URL state, portrait media, tablet/zoom-equivalent reflow, target sizes, reduced motion, map success and failure states, RSS and sitemap output.
- Automated results are strong: Astro check returned 0 errors and 0 warnings; the production build completed; all 22 Playwright tests passed; Lighthouse scored 99–100 performance, 94–95 accessibility and 100 best practices and SEO on the four configured routes.

## Findings

### Resolved — Homepage horizontal overflow from 640 px through small-laptop widths

The initial audit found horizontal overflow at 640, 767, 768, 900 and 1024 px. The map shells now use explicit fluid heights instead of transferring a minimum height through `aspect-ratio`, and the homepage map column can shrink with `min-width: 0`.

Browser verification after the fix reported no overflow at 640, 768 or 1024 px. At 768 px, the map now occupies approximately 409 × 448 px within its column instead of imposing a width near 796 px. Automated regression coverage runs at all three widths; 640 px is also the reflow proxy for a 1280 px viewport at 200% browser zoom.

An actual browser-zoom session remains part of the human protocol because viewport equivalence does not reproduce every browser and operating-system zoom behaviour.

### Medium — The custom cursor contradicts the guide

On fine pointers, the site hides the native cursor for the document, links and buttons and replaces it with a 10 px decorative dot. Browser inspection confirmed `cursor: none` for the body and homepage link. The guide explicitly prohibits custom cursors that reduce precision.

The implementation correctly disables the custom cursor for coarse pointers and reduced-motion users, but the treatment is not necessary to the editorial thesis and weakens conventional affordance. Prefer the native cursor and keep identity in focus, hover, type and composition.

### Resolved — Standalone links meet the target-size baseline

Standalone homepage, menu, footer, Selection-methodology, map-credit and Address action links now have intentional target dimensions. Compact Index links use 28 px minimum height; primary standalone actions use 44 px. Automated checks found no annotated visible target below 24 × 24 px on the homepage or Addresses page in either browser profile.

The Index also keeps `visibility` changes immediate so links enter the keyboard tab order without waiting for a visual transition.

### Resolved — Maps expose explicit failure and fallback states

Both map surfaces now catch initialization failures, detect an offline start, react to pre-load map errors and time out a stalled load. They replace the indefinite loading message with an announced status explaining the available fallback. The homepage retains its Address-index action; the Addresses page retains the complete HTML list and external map links.

Playwright blocks the OpenFreeMap style request and verifies the failure copy and retained primary content on both routes.

### Low — A third-party map-style warning appears in a clean development session

After the Addresses map loaded successfully, the console reported that the OpenFreeMap style requested a missing `circle-11` image. It did not prevent the canvas or markers from rendering, and Lighthouse remained above budget, but the guide expects clean console and network behaviour. Confirm whether the production style produces the same warning and either handle `styleimagemissing` or choose a style without the missing sprite reference.

### Pending human evidence — Complete the usability protocol

Automated coverage now includes tablet/zoom-equivalent reflow, skip-link and Index operation by keyboard, minimum target sizes, reduced-motion CSS behaviour and map failure fallbacks. Longer translations, a full internal-link sweep, assistive-technology use and actual 200% browser zoom remain outside the automated suite.

`HUMAN_USABILITY_TEST_PROTOCOL.md` now defines participants, tasks, comprehension questions, acceptance criteria and a result record. Its status is `Ready to run`; no results have been invented. This is the remaining external step before claiming complete human validation.

## Recommended order

1. Run `HUMAN_USABILITY_TEST_PROTOCOL.md` with at least three real participants and record the result.
2. Decide whether to retain the custom cursor as an explicit project exception or remove it to follow the guide strictly.
3. Include actual 200% browser zoom and assistive-technology checks in the human/accessibility session.

## Validation record

Commands run on 2026-07-21:

```text
npm run check             passed: 0 errors, 0 warnings, 0 hints
npm run build             passed: 28 static pages generated
npm run test:e2e          passed: 22 tests
npm run test:lighthouse   passed all configured budgets
```

Lighthouse results:

| Route | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` | 99 | 95 | 100 | 100 |
| `/selections` | 100 | 95 | 100 | 100 |
| `/addresses` | 99 | 94 | 100 | 100 |
| `/portraits/claudio-miguel-marzagana-elementales` | 99 | 95 | 100 | 100 |

## Limitations

This is a repository, browser and automated audit, not a WCAG conformance certification. It does not include completed assistive-technology testing, field Core Web Vitals at the 75th percentile, a real mid-range mobile device, a production-network trace, translation QA or completed representative-user testing.

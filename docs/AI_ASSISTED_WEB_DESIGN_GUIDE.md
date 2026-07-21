---
title: "Anti-Slop Guide for AI-Assisted Web Design"
subtitle: "Principles, process, and acceptance criteria for design and development agents"
version: "1.0"
updated: "2026-07-21"
language: "en"
audience:
  - "AI agents"
  - "designers"
  - "creative developers"
  - "product teams"
---

# Anti-Slop Guide for AI-Assisted Web Design

## 0. Purpose

This document serves as a **working specification and evaluation framework for an agent that designs or implements websites**.

The goal is not to imitate Awwwards sites superficially, nor to add animations, WebGL, or oversized typography to every project. The goal is to reproduce what the strongest projects tend to have in common:

- a recognizable idea;
- visual decisions connected to the content and the brand;
- clear hierarchy;
- typography treated as a design material;
- movement with a narrative or operational function;
- rigorous implementation;
- an accessible, responsive, and fast experience;
- enough detail to prevent the result from looking like an automatic assembly of components.

The central rule is:

> **Do not design something merely to make it look “well designed.” Design it so that a specific idea feels inevitable.**

---

## 1. What Awwwards Actually Values

The official Awwwards evaluation system gives the greatest weight to four dimensions:[^1]

| Dimension | Weight |
|---|---:|
| Design | 40% |
| Usability | 30% |
| Creativity | 20% |
| Content | 10% |

The Developer Award adds recurring technical criteria: semantics and SEO, animations and transitions, accessibility, performance optimization, responsive design, and the quality of markup and metadata.[^2]

This has two important consequences.

### 1.1 An award-worthy website is not merely visual

Aesthetics carry the greatest weight, but **60% of the evaluation falls outside visual design in the narrow sense**. A spectacular landing page that is difficult to navigate, slow, empty, or inaccessible is not a strong result.

### 1.2 There is no single “Awwwards style”

A sample of recent winners reveals very different directions:

- **Lacoste — Polo Factory**: a visit-like experience, restrained palette, 3D, and WebGL tied to the manufacturing process.[^3]
- **IZANAMI**: typography, storytelling, scrolling, parallax, and transitions serving a specific cultural idea.[^4]
- **Hiroto Sato**: a monochrome portfolio using 3D, motion, and authorial interactions.[^5]
- **CoffeeTech**: a clean, minimal language combined with a three-dimensional product and 360-degree visualization.[^6]
- **RISK**: video, horizontal composition, and effects appropriate to a post-production studio.[^7]
- **Lando Norris**, Site of the Year 2025: acidic color, gestures, energy, 3D, and rhythm aligned with the identity of a Formula 1 driver.[^8]

The common element is not a palette, a typeface, or a library. It is the **coherence between concept, content, form, and behavior**.

> The agent should not ask, “What style is fashionable?” It should ask, “What visual language would only make sense for this project?”

---

## 2. Important Limitation: Awwwards Does Not Equal Universal Suitability

Awwwards frequently favors promotional, editorial, cultural, fashion, portfolio, and brand-experience websites. These projects tolerate—and sometimes require—a greater degree of theatricality.

A banking website, clinical system, productivity application, or public service may require:

- lower animation density;
- more conventional navigation;
- greater predictability;
- higher information density;
- less reliance on narrative scrolling;
- far more complex states and flows.

The agent should therefore apply this hierarchy:

1. **fitness for the user’s task;**
2. **clarity and robustness;**
3. **identity and memorability;**
4. **spectacle, only when it reinforces the previous three.**

Never sacrifice discoverability, readability, or operation to obtain a gallery-worthy image.

---

# Part I — Design Principles

## 3. Start With a Thesis, Not Components

Before creating a layout, the agent must formulate a **one-sentence design thesis**.

An acceptable thesis:

> “The site behaves like a living archive: images accumulate, overlap, and reveal relationships as the visitor investigates.”

An insufficient thesis:

> “The site will be modern, elegant, premium, and interactive.”

The second sentence merely stacks adjectives without producing decisions.

### Required deliverables before the first component

```yaml
design_thesis: "A concrete sentence explaining how the site works and why."
primary_user_job: "What the visitor needs to accomplish."
emotional_register: ["3 specific attributes"]
signature_move: "One memorable interaction or composition."
content_center: "The element that should dominate the experience."
non_goals:
  - "What the site will not attempt to be."
banned_defaults:
  - "Visual or structural patterns forbidden in this project."
```

The agent must not proceed until it can explain how the thesis changes:

- the grid;
- the hierarchy;
- the typography;
- the imagery;
- the motion;
- the navigation.

---

## 4. Build From Real Content

The strongest projects do not treat content as filler. Content determines structure.

Implementation should begin with:

1. a content inventory;
2. editorial hierarchy;
3. relationships between blocks;
4. user actions;
5. required states;
6. only then, visual composition.

Awwwards case studies show teams consolidating content and layout before adding motion. In the Dropbox Brand Guidelines project, content, structure, accessibility, and performance came before the interactive layers.[^9]

### Prohibitions

The agent must not:

- create sections merely because a landing page “normally has them”;
- invent testimonials, customers, metrics, or awards;
- use lorem ipsum in a version presented as final;
- turn every piece of content into a card;
- force arbitrary quantities such as “three benefits” or “six features”;
- write copy that could belong to any company.

---

## 5. Art Direction Must Emerge From the Subject

Identity is not a layer applied at the end. It is an interpretation of the project.

Required questions:

- What is the central material, gesture, place, period, or process?
- What texture, rhythm, or convention genuinely belongs to this world?
- Should the project feel precise, intimate, monumental, technical, fragile, urgent, or quiet?
- Which references come from outside web design: books, posters, cinema, architecture, photography, scientific interfaces, archives?
- Which choices would be inappropriate for a competitor?

### Substitution test

Mentally replace the logo and copy with those of three competitors.

If the website still feels plausible without significant changes, the art direction is still generic.

---

## 6. Make Fewer Choices, but Make Them Strong

Weak websites accumulate signals of “design”:

- gradient;
- glass;
- shadow;
- noise;
- glow;
- custom cursor;
- parallax;
- smooth scrolling;
- cards;
- expressive lettering;
- video;
- 3D.

Strong websites choose a small number of rules and explore them with discipline.

### Concentration rule

Each project should define:

- **1 dominant spatial idea**;
- **1 dominant motion behavior**;
- **1 dominant typographic logic**;
- **1 dominant visual signature**;
- **0–2 supporting effects**.

Any additional effect must answer:

> “What information, relationship, or emotion would be weaker without this?”

If the answer is vague, remove it.

---

## 7. Treat Typography as Architecture

Awwwards describes typography as the deliberate combination of typeface, size, line length, leading, tracking, kerning, color, and consistency.[^10]

The agent must define a system, not merely choose “a beautiful font.”

```yaml
type_system:
  display:
    role: "primary message or editorial headings"
    family: "..."
    weight: "..."
    optical_size: "..."
    line_height: "..."
    tracking: "..."
  body:
    role: "long-form reading"
    family: "..."
    max_line_length: "55–75 characters"
    line_height: "..."
  utility:
    role: "metadata, navigation, captions"
    family: "..."
    casing: "..."
```

### Criteria

- Scale should express hierarchy, not merely dramatic contrast.
- Body text must remain comfortable on small screens.
- The layout must survive long headings, translations, and zoom.
- Artistic line breaks must not destroy readability in other languages.
- A display typeface must not be used indiscriminately.
- Wide letterspacing in uppercase text must serve a purpose, not act as an automatic “editorial” device.
- Oversized typography must justify the space it occupies.

In the Cartier project, the team manually adapted typographic compositions across three languages because translating text without revisiting line breaks and proportions destroyed the layout’s balance.[^11]

---

## 8. Use the Grid to Create Rhythm, Not Monotony

A grid is an infrastructure of relationships.

The agent must define:

- the number of columns at each breakpoint;
- margins;
- gutters;
- maximum width;
- spacing scale;
- dominant alignments;
- intentional exceptions;
- rules for text, imagery, and immersive elements.

### Grounded asymmetry

Asymmetry can create tension and movement, but it requires clear anchors:

- repeated alignments;
- consistent intervals;
- recognizable proportions;
- continuity between sections.

The Bloom case study combines an editorial grid, dynamic scale, and asymmetrical balance to avoid monotony without losing structure.[^12]

### Slop signal

Spacing that looks approximately correct but does not follow a scale. A 26 px gap, followed by 31 px and then 37 px, without a reason, reveals the absence of a system.

---

## 9. Color: Semantic System Before Decoration

A restrained palette can be as expressive as an extensive one. Several recent winners use only two dominant colors while producing very different results.[^3][^4][^5]

Define:

```yaml
color_roles:
  canvas: "primary background"
  surface: "functional surfaces"
  text_primary: "dominant text"
  text_secondary: "metadata"
  accent: "emphasis and actions"
  signal_success: "state"
  signal_warning: "state"
  signal_error: "state"
```

### Rules

- Brand color should not be used at every point of attention.
- Gradients should belong to the concept, not replace an identity.
- Contrast must meet WCAG 2.2 AA.
- States must not depend on color alone.
- Dark mode is not an automatic color inversion.
- The agent must test imagery and overlays under real conditions.

---

## 10. Imagery: Evidence, Atmosphere, or Structure

Every image should perform at least one function:

- show;
- prove;
- contextualize;
- create atmosphere;
- organize the narrative;
- enable comparison;
- reveal detail.

### Avoid

- interchangeable stock imagery;
- fake device mockups;
- AI-generated portraits presented as real people;
- atmospheric images that communicate nothing about the product;
- four images with the same composition;
- arbitrary crops;
- inconsistent visual treatment;
- generated imagery without control over anatomy, text, or continuity.

### Prefer

- original photography;
- archives and documents;
- material details;
- illustration with a consistent visual language;
- diagrams;
- process imagery;
- generative art connected to data or interaction;
- crops defined by composition and breakpoint.

---

## 11. Motion Should Explain, Guide, or Transform

Animation is not proof of quality. It is a temporal layer of meaning.

Valid functions:

- showing cause and effect;
- indicating continuity;
- revealing hierarchy;
- confirming an action;
- preserving orientation during a transition;
- representing a process;
- controlling narrative rhythm;
- translating a physical characteristic of the brand.

Awwwards has repeatedly argued that motion and scrolling should reinforce storytelling and personality rather than be added arbitrarily.[^13] In projects such as Cartier’s editorial year, each scrolling behavior was tied to specific content: a roll of film, a mirror, the passage of time, or a manufacturing process.[^11]

### Motion budget

```yaml
motion:
  principle: "How the system moves."
  entrance: "When and why elements appear."
  transition: "How orientation is preserved."
  feedback: "How actions are confirmed."
  durations:
    micro: "100–200ms"
    component: "180–350ms"
    narrative: "content-dependent"
  easing: "Defined curves, not random ones."
  reduced_motion: "Alternative without intense spatial transformation."
```

### Prohibitions

- animating every element when it enters the viewport;
- applying the same fade-up to every section;
- using bounce or elastic easing by default;
- smooth scrolling that reduces user control;
- hover states that imply clickability on inactive elements;
- hiding essential content until an animation finishes;
- scroll locking;
- ignoring `prefers-reduced-motion`.

---

## 12. Interaction Must Have Affordance, Response, and Consequence

Every interaction must answer three questions:

1. **How do I know it is interactive?**
2. **How do I know the action was received?**
3. **What changed after the action?**

A common indicator of vibe-coded interfaces is the presence of elements that react to hover but do nothing when activated.[^14]

### Rules

- Do not turn static text into pseudo-buttons.
- Links and buttons must have semantically distinct behaviors.
- Hover cannot be the only signal because it does not exist on touch devices.
- Every control needs a visible focus state.
- Disabled states should explain the condition when necessary.
- Destructive actions should allow confirmation or reversal.
- Feedback should not depend solely on a temporary toast.
- Do not create custom cursors that reduce precision.

---

## 13. Responsive Design Means Recomposition

Shrinking a desktop layout until it fits on a phone is not responsive design.

At each breakpoint, the agent must decide:

- content priority;
- order;
- density;
- scale;
- navigation;
- gestures;
- crops;
- motion behavior;
- which content should no longer remain side by side;
- which elements require an alternative.

### Minimum tests

- 320 × 568;
- 375 × 812;
- 768 × 1024;
- 1024 × 768;
- 1440 × 900;
- 1920 × 1080;
- 200% zoom;
- mobile landscape orientation;
- text 30–50% longer;
- translation;
- touch and mouse input.

---

## 14. Accessibility Is Part of the Direction, Not a Final Correction

WCAG organizes accessibility around four principles: content must be perceivable, operable, understandable, and robust.[^15]

Minimum requirements:

- semantic HTML;
- logical heading order;
- keyboard navigation;
- visible focus;
- skip link;
- associated labels;
- accessible names;
- useful alternative text;
- captions or transcripts when applicable;
- AA contrast;
- reflow and zoom support;
- suitable touch targets;
- no keyboard traps;
- an alternative to drag interactions;
- announceable status messages;
- `prefers-reduced-motion`;
- functional content without WebGL;
- defined page language.

WCAG 2.2 establishes, with exceptions, a minimum target size of 24 × 24 CSS px at level AA; 44 × 44 px remains a more comfortable target.[^16]

### Progressive enhancement principle

An advanced visual experience may use Canvas, WebGL, or 3D, but:

- the primary content must exist in HTML;
- navigation must remain available;
- failure of the advanced layer must not block the page;
- a fallback must exist;
- the agent must test assistive technology.

The Cartier implementation combined HTML content with a progressive WebGL layer to preserve accessibility without abandoning the visual experience.[^11]

---

## 15. Performance Is an Aesthetic Property

A website that responds late, shifts content, or blocks scrolling feels unfinished regardless of its visual direction.

Current Core Web Vitals targets, evaluated at the 75th percentile on mobile and desktop:[^17]

| Metric | Target |
|---|---:|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |

### Rules

- Reserve dimensions for media.
- Compress and serve images by size and format.
- Subset fonts and preload only when justified.
- Avoid enormous hero videos.
- Defer non-essential JavaScript.
- Limit DOM size and wrapper depth.
- Use transform and opacity for motion whenever appropriate.
- Do not send WebGL to devices that do not benefit from it.
- Define budgets for JavaScript, images, fonts, and requests.
- Test slow networks and mid-range hardware.
- Do not hide a long wait behind a sophisticated loading animation.

The Dropbox and Cartier case studies describe extensive QA, manual optimization, dedicated image formats, and device-specific tuning—evidence that a “fluid” appearance results from engineering, not a preset.[^9][^11]

---

# Part II — Indicators of a Vibe-Coded Website

## 16. Methodological Note

No single sign proves that a website was created with AI. Many of these patterns existed before coding agents.

The diagnosis should be probabilistic:

- one rounded component is not slop;
- twenty rounded components, generic copy, missing states, inconsistent spacing, and a structure identical to dozens of templates form a meaningful pattern.

Recent research into web vibe coding identifies a risk of **homogenization**, especially when creators accept the first polished output produced from vague prompts. The authors propose “productive friction”: requiring the system to make decisions explicit, present alternatives, and return control to the creator.[^18]

---

## 17. Common Visual Signals

### 17.1 Regression toward the mean

- white, gray, beige, or cream background;
- a single accent color;
- neutral sans-serif typography;
- rounded corners on nearly everything;
- soft shadows;
- homogeneous cards;
- icons from an unmodified library;
- a “clean” appearance with no lasting identity.

Evaluations of AI prototyping tools have found precisely this tendency: sans-serif typography, neutral minimalism, bright accents, and weak brand expression.[^19]

### 17.2 “Premium AI” clichés

- purple-to-blue or cyan gradients;
- gradient text;
- glassmorphism;
- blurred orbs;
- neon glow;
- mesh gradients;
- dark backgrounds with particles;
- futuristic grid lines;
- floating dashboard mockups;
- excessive pills.

### 17.3 “Sophisticated editorial” clichés

A trend observed in recent AI-tool outputs combines:

- cream;
- rust orange;
- large italic serif typography;
- widely spaced subheadings;
- horizontal tickers;
- rounded rectangles;
- slightly desaturated color.[^20]

None of these elements is inherently bad. The automatic repetition of the combination creates the template effect.

### 17.4 Unnecessary bento layouts

- a grid of boxes in different sizes;
- each box repeating an icon, title, and paragraph;
- no real relationship between box size and importance;
- a composition used even when a list, table, sequence, or narrative would be better.

### 17.5 Cards inside cards

- nested surfaces;
- borders at every layer;
- blocks that do not need containment;
- excessive radius and shadow;
- loss of hierarchy because everything looks like a component.

### 17.6 Automatic symmetry

- everything centered;
- sections with the same width;
- predictable image-text alternation;
- repeated three-column layouts;
- every heading receiving the same treatment;
- constant rhythm with no climax, pause, or exception.

---

## 18. Structural Signals

### 18.1 The universal landing page

Typical sequence:

1. navbar;
2. badge;
3. headline;
4. subheadline;
5. two CTAs;
6. mockup;
7. logos;
8. three benefits;
9. feature bento;
10. metrics;
11. testimonials;
12. pricing;
13. FAQ;
14. final CTA.

This architecture may be appropriate, but it becomes slop when applied without regard to:

- the product’s stage;
- the audience’s real questions;
- the complexity of the service;
- the available evidence;
- the purpose of the visit.

### 18.2 Components before information

The agent decides, “I need cards,” before understanding the content. The result is truncated or invented text created to fill a pre-existing shape.

### 18.3 Nominal hierarchy

There are large and small headings, but the visual order does not match the task. Secondary elements occupy more space than the primary action.

NN/g found flaws in grouping, contrast, spacing, and hierarchy in AI-generated prototypes that only became apparent under detailed inspection.[^19]

### 18.4 Decorative navigation

- unnecessarily hidden menus;
- unexpected horizontal scrolling;
- indicators without labels;
- essential links only in the footer;
- transitions that delay page changes;
- a logo that does not return to the homepage;
- sections that appear clickable but are not.

### 18.5 One page for everything

AI tends to compress complex systems into a visually complete homepage. Information that required separate pages, states, or tasks is placed inside one continuous scroll.

---

## 19. Signals of Generated Copy

### Vocabulary

- “revolutionize”;
- “elevate”;
- “unlock”;
- “empower”;
- “effortless”;
- “seamless”;
- “cutting-edge”;
- “next-generation”;
- “transform the way you…”;
- “everything you need, in one place”;
- “built for modern teams.”

### Structures

- “It is not just X—it is Y.”
- “From X to Y.”
- “More than X.”
- “Where X meets Y.”
- “The future of X starts here.”
- three abstract adjectives;
- short sentences with no verifiable information;
- excessive em dashes;
- slogans that do not survive replacing the brand name.

### False or superficial content

- statistics without sources;
- invented testimonials;
- avatars of nonexistent people;
- company logos used without authorization;
- FAQs that merely repeat the hero;
- features described without conditions or limits;
- no pricing, process, examples, or evidence.

### Specificity test

Remove the brand name.

If the copy could be used by thirty companies in the same category, rewrite it.

---

## 20. Functional Signals

### 20.1 “Pretty but dysfunctional”

- buttons without actions;
- forms that do not validate;
- filters that only change appearance;
- components with hover states but no click behavior;
- `#` links;
- fixed data presented as a real dashboard;
- search that does not search;
- menus that close unpredictably.

### 20.2 Only the happy path

Missing:

- loading;
- empty;
- no results;
- error;
- offline;
- permissions;
- expired session;
- success;
- undo;
- confirmation;
- partial data;
- very long text;
- missing image;
- timeout;
- rate limit.

Poor treatment of edge cases is one of the most recurring signals identified in vibe-coded products.[^14]

### 20.3 Errors without a voice

Messages such as:

> “Something went wrong. Please try again.”

do not explain:

- what happened;
- whether the data was saved;
- what the user can do;
- whether they should wait;
- how to get help.

### 20.4 Local inconsistency

- the same button has three different heights;
- different names are used for the same action;
- modals follow different rules;
- icons use incompatible styles;
- margins are approximate;
- date formatting is inconsistent;
- mobile navigation is missing functionality.

---

## 21. Technical Signals

- `div` used for everything;
- no landmarks;
- headings chosen by size rather than structure;
- click events attached to non-interactive elements;
- missing focus states;
- heavy dependencies for simple effects;
- multiple animation libraries;
- duplicated CSS;
- magic values throughout the code;
- arbitrary breakpoints;
- enormous components;
- mixed logic and presentation;
- unidentified mock data;
- console errors;
- failed requests;
- no error boundaries;
- no tests;
- secrets exposed in the frontend;
- unprotected forms;
- images without dimensions;
- CLS;
- hydration errors;
- missing metadata, sitemap, or canonical URLs;
- incorrectly configured robots directives;
- library components left almost unchanged.

Recent benchmarks show that end-to-end development by agents remains far from reliable. In a benchmark containing 100 specifications and hundreds of workflows, the best result reported in the latest version reached 61.8%; self-testing during generation strongly correlated with better performance.[^21]

The operational conclusion is simple:

> **An agent that has not tested has not finished.**

---

# Part III — Required Process for the Agent

## 22. Phase 0 — Discovery

Before proposing UI, collect:

```yaml
project:
  purpose: ""
  audience: ""
  primary_user_job: ""
  secondary_jobs: []
  conversion_or_outcome: ""
  content_available: []
  content_missing: []
  brand_attributes: []
  brand_anti_attributes: []
  references:
    positive: []
    negative: []
  technical_constraints: []
  accessibility_requirements: "WCAG 2.2 AA"
  performance_budget: {}
  localization: []
  analytics_and_privacy: ""
```

### High-value questions

- What should the visitor understand within the first ten seconds?
- Which action should they be able to complete?
- What evidence exists?
- Which content is genuinely unique?
- Which part deserves the greatest attention?
- What should the website not look like?
- Which websites are relevant because of their principles, not their appearance?
- Which users and contexts may create edge cases?

---

## 23. Phase 1 — Three Genuinely Different Directions

Generate three proposals that vary in:

- spatial model;
- hierarchy;
- density;
- typography;
- role of imagery;
- navigation;
- motion logic.

Do not present:

- the same page with three palettes;
- three radius variants;
- a light, dark, and colorful version.

For each direction:

```yaml
direction:
  name: ""
  thesis: ""
  why_it_fits: ""
  layout_model: ""
  type_logic: ""
  image_logic: ""
  motion_logic: ""
  signature_move: ""
  risks: []
  what_it_refuses: []
```

Choose one direction only after comparing trade-offs.

---

## 24. Phase 2 — Architecture and Wireframe

Build the version without ornament:

- real content;
- headings;
- navigation;
- flows;
- actions;
- forms;
- states;
- sequence;
- responsive behavior;
- keyboard support.

The wireframe must work without:

- gradients;
- shadows;
- animation;
- 3D;
- atmospheric imagery.

If it does not, the visual direction is still masking a structural problem.

---

## 25. Phase 3 — Visual System

Define tokens before creating complete pages.

```yaml
tokens:
  spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
  radii:
    none: 0
    small: 4
    medium: 10
    large: 20
  type_scale: {}
  colors: {}
  borders: {}
  shadows: {}
  motion: {}
  breakpoints: {}
  containers: {}
```

The values are examples, not mandatory defaults.

### Require explicit decisions

- Why does this radius exist?
- Why is there a shadow?
- Why is this section contained?
- Why is this image full bleed?
- Why is this text centered?
- Why does this interaction require animation?
- Why is this information presented as a card?

---

## 26. Phase 4 — Progressive Implementation

Recommended order:

1. semantic HTML;
2. content and routes;
3. responsive layout;
4. components and states;
5. accessibility;
6. imagery and typography;
7. motion;
8. experimental layers;
9. optimization;
10. QA.

This order prevents the visual experience from concealing fundamental flaws.

---

## 27. Phase 5 — State Matrix

For every interactive component:

| State | Implemented | Tested |
|---|---:|---:|
| default |  |  |
| hover |  |  |
| focus |  |  |
| active |  |  |
| disabled |  |  |
| loading |  |  |
| success |  |  |
| error |  |  |
| empty |  |  |
| long content |  |  |
| permission denied |  |  |
| offline/timeout |  |  |

Not every component needs every state, but any omission must be deliberate.

---

## 28. Phase 6 — Required Testing

### Functional

- Every link.
- Every button.
- Valid and invalid forms.
- Back and forward navigation.
- Refreshing internal routes.
- Empty content.
- API errors.
- Expired sessions.
- Slow data.
- Duplicate actions.
- Permissions.
- Keyboard operation.

### Visual

- Minimum breakpoints.
- Long content.
- 200% zoom.
- Missing images.
- Font loading.
- Reduced motion.
- High contrast.
- Dark mode, when available.
- Different image ratios.
- Mobile landscape.

### Technical

- Lighthouse.
- axe or equivalent.
- component tests;
- end-to-end tests for primary flows;
- no console errors;
- no unexpected request failures;
- metadata;
- sitemap;
- robots;
- Open Graph;
- performance on mid-range hardware.

### Human

- testing with representative people;
- five-second test;
- execution of the primary task;
- comprehension questions;
- observation of hesitation;
- collection of the language used by participants.

---

# Part IV — Evaluation Framework

## 29. Adapted Awwwards Score — 100 Points

### Design — 40

| Criterion | Points |
|---|---:|
| Clear visual thesis | 8 |
| Hierarchy and composition | 8 |
| Typography | 8 |
| Image and color direction | 8 |
| Craft and consistency | 8 |

### Usability — 30

| Criterion | Points |
|---|---:|
| Clear primary task | 7 |
| Navigation and orientation | 5 |
| Affordance and feedback | 4 |
| States and edge cases | 4 |
| Responsive behavior | 4 |
| Accessibility | 3 |
| Performance | 3 |

### Creativity — 20

| Criterion | Points |
|---|---:|
| Project specificity | 8 |
| Memorable signature | 6 |
| Non-template solution | 6 |

### Content — 10

| Criterion | Points |
|---|---:|
| Voice and clarity | 4 |
| Evidence and detail | 3 |
| Completeness and structure | 3 |

---

## 30. Anti-Slop Penalties

Subtract:

| Failure | Penalty |
|---|---:|
| Generic copy in primary sections | −5 |
| Default landing-page structure | −4 |
| Identity visibly inherited from a library | −5 |
| Cards used as a universal solution | −3 |
| Accumulated visual clichés without a concept | −4 |
| Elements with false affordance | −5 |
| Incomplete primary flow | −8 |
| Missing critical states | −5 |
| Keyboard or contrast failures | −8 |
| Core Web Vitals clearly ignored | −5 |
| Invented content, metrics, or testimonials | −10 |
| Console errors or dead links | −5 |
| No testing | −10 |

### Approval rule

Do not publish when:

- final score < 80;
- any primary flow fails;
- false content exists;
- there is a keyboard trap;
- the website depends exclusively on hover;
- no error handling exists;
- no functional mobile version exists;
- it has not been tested with real content.

---

# Part V — Operational Prompt for an Agent

## 31. Reusable Instruction

```text
Act as a design director, UX designer, and creative developer. Your goal is
not to generate a visually polished landing page as quickly as possible. Your
goal is to produce an experience that is specific, coherent, accessible,
responsive, fast, and technically robust.

Before writing code:

1. Identify the user’s primary job, the real content, and the constraints.
2. Formulate a one-sentence design thesis.
3. Propose three structurally different directions.
4. Define one visual signature and one interaction signature.
5. List the defaults and clichés forbidden in this project.
6. Build the architecture, wireframe, and state matrix.
7. Explain every meaningful decision in terms of content, brand, or task.

Do not automatically use:
- beige backgrounds or purple/cyan gradients;
- glassmorphism;
- bento grids;
- cards for every piece of content;
- rounded corners on every element;
- a hero with a badge, headline, two CTAs, and a mockup;
- copy such as “revolutionize,” “elevate,” “unlock,” or “seamless”;
- invented testimonials, metrics, or logos;
- fade-up animations in every section;
- hover states without a function;
- Shadcn or Radix components without a project-specific visual direction.

Implement semantic HTML, content, routes, responsive layout, interactions, and
states first. Add motion and effects only after the base experience is correct.

For every effect, answer:
- What function does it perform?
- What content does it reinforce?
- What happens under reduced motion?
- What is the performance cost?
- What is the fallback?

Test:
- primary flows and edge cases;
- keyboard operation and focus;
- contrast and zoom;
- mobile and desktop;
- long content and translations;
- loading, empty, error, offline, and timeout states;
- links, forms, and routes;
- console, network, accessibility, and Core Web Vitals.

Do not declare the work complete without presenting:
- Design, Usability, Creativity, and Content scores;
- anti-slop penalties;
- test results;
- remaining limitations.
```

---

# Part VI — Condensed Final Checklist

## 32. Before Designing

- [ ] Real content exists.
- [ ] The user and the task are defined.
- [ ] A design thesis exists.
- [ ] References and anti-references exist.
- [ ] Specific defaults have been rejected.
- [ ] Three directions have been compared.

## 33. Before Implementing Effects

- [ ] The wireframe works.
- [ ] The hierarchy is clear.
- [ ] The mobile version has been composed.
- [ ] Critical states have been mapped.
- [ ] Navigation works with a keyboard.
- [ ] The typographic system is defined.
- [ ] The grid and tokens are consistent.

## 34. Before Publishing

- [ ] Nothing has been invented.
- [ ] Every link and button works.
- [ ] No false affordances exist.
- [ ] Loading, empty, and error states are resolved.
- [ ] The website works with reduced motion.
- [ ] It meets WCAG 2.2 AA for applicable requirements.
- [ ] LCP, INP, and CLS meet their targets, or a documented justification exists.
- [ ] No console errors exist.
- [ ] It has been tested across different screens and input methods.
- [ ] The design remains recognizable without the logo.
- [ ] At least one decision could not be transferred to a competitor.
- [ ] The final score is ≥ 80 and no critical failures remain.

---

# 35. Summary

The opposite of AI slop is not maximalism, brutalism, 3D, or a “more human” aesthetic.

It is **verifiable intention**.

A website stops looking generated when:

- every choice has a reason;
- the structure derives from specific content;
- there are refusals, not merely additions;
- details follow a system;
- difficult states receive as much attention as the hero;
- the implementation is tested;
- aesthetics cannot be separated from identity and task.

AI can accelerate composition and implementation. It should not silently occupy the place where taste, decision, conflict, revision, and responsibility should exist.

---

# Sources

[^1]: Awwwards, “Evaluation System”: https://www.awwwards.com/about-evaluation/
[^2]: Awwwards, Developer Award evaluation pages, for example “Sunday”: https://www.awwwards.com/sites/sunday
[^3]: Awwwards, “Lacoste — Polo Factory,” Site of the Day, July 21, 2026: https://www.awwwards.com/sites/lacoste-polo-factory
[^4]: Awwwards, “IZANAMI,” Site of the Day, July 18, 2026: https://www.awwwards.com/sites/izanami
[^5]: Awwwards, “Hiroto Sato,” Site of the Day, July 17, 2026: https://www.awwwards.com/sites/hiroto-sato
[^6]: Awwwards, “CoffeeTech®,” Site of the Day, July 16, 2026: https://www.awwwards.com/sites/coffeetech-r
[^7]: Awwwards, “RISK,” Site of the Day, July 15, 2026: https://www.awwwards.com/sites/risk
[^8]: Awwwards, “Lando Norris,” Site of the Year 2025: https://www.awwwards.com/sites/lando-norris
[^9]: Awwwards, “Case Study: Dropbox Brand Guidelines,” May 7, 2025: https://www.awwwards.com/case-study-dropbox-brand-guidelines.html
[^10]: Awwwards, “Typography — Best Website Examples”: https://www.awwwards.com/websites/typography/
[^11]: Awwwards, “Behind the Scenes: Designing and Building 365 — A Year of Cartier,” May 21, 2025: https://www.awwwards.com/behind-the-scenes-designing-and-building-365-a-year-of-cartier.html
[^12]: Awwwards, “Case Study — Bloom,” July 16, 2025: https://www.awwwards.com/case-study-bloom.html
[^13]: Awwwards, “6 Web Design Trends You Must Know,” and other articles on animation and storytelling: https://www.awwwards.com/6-web-design-trends-you-must-know-for-2015-2016.html
[^14]: Business Insider, “There are 3 telltale signs that you used AI to make your app,” July 7, 2026: https://www.businessinsider.com/ai-coded-app-user-interface-experience-design-2026-7
[^15]: W3C Web Accessibility Initiative, “Accessibility Principles”: https://www.w3.org/WAI/fundamentals/accessibility-principles/
[^16]: W3C, “Web Content Accessibility Guidelines (WCAG) 2.2”: https://www.w3.org/TR/WCAG22/
[^17]: web.dev, “Web Vitals”: https://web.dev/articles/vitals
[^18]: Shin et al., “Interrogating Design Homogenization in Web Vibe Coding,” arXiv, 2026: https://arxiv.org/html/2603.13036v1
[^19]: Nielsen Norman Group, “Good from Afar, But Far from Good: AI Prototyping in Real Design Contexts,” October 24, 2025: https://www.nngroup.com/articles/ai-prototyping/
[^20]: The New Yorker, “The A.I.-Design Aesthetic That’s Taking Over the Internet,” July 2026: https://www.newyorker.com/the-ai-design-aesthetic-thats-taking-over-the-internet
[^21]: Tran et al., “Vibe Code Bench: Evaluating AI Models on End-to-End Web Application Development,” version 3, May 2026: https://arxiv.org/abs/2603.04601

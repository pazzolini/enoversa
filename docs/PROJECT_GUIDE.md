# Enoversa project guide

This is the central source of truth for the Enoversa repository. It is written for editors, developers, new contributors and coding agents. Update this document whenever the architecture, editorial model, deployment process or visual system changes.

## 1. Project identity

Enoversa is an independent wine journal edited by Vítor Ferreira and Catarina Teixeira. The current site is Volume II. The previous edition remains available at `legacy.enoversa.com` and must not be overwritten by deployments from this repository.

The journal has four editorial sections:

- **Selections**: individual wine notes with a structured score.
- **Portraits**: narrative visits and profiles of people or projects.
- **Essays**: longer cultural, critical or historical writing.
- **Addresses**: wineries, wine shops, bars and restaurants that the editors recommend.

The canonical site is `https://enoversa.com`. The interface and current editorial copy are in English. Do not introduce mixed-language interface copy without an explicit language strategy.

## 2. Technology

- Astro 7 static site generation
- TypeScript
- Tailwind CSS 4
- Astro Content Collections with Zod validation
- MapLibre GL with OpenFreeMap tiles
- Self-hosted Manrope and JetBrains Mono through Fontsource
- Playwright end-to-end tests
- Lighthouse quality budgets
- GitHub Actions deployment to Hostinger by FTP

The production build is fully static and is written to `dist/`.

## 3. Repository map

```text
src/
  components/              Reusable Astro UI components
  content/
    selections/            Wine notes
    portraits/             Narrative profiles and visits
    essays/                Cultural and critical essays
    places/                Addresses displayed on the map
  layouts/                 Shared HTML shell, metadata and footer
  pages/                   Route entry points
  styles/global.css        Fonts, palette and global behaviour
  utils/moodColors.js      Selection-card colours keyed by first tag
public/
  images/                  Production website images
  .htaccess                Hostinger security headers
scripts/
  lighthouse.mjs           Automated Lighthouse budgets
  render-instagram-assets.mjs
                            Deterministic social asset renderer
social/instagram/          Exported Instagram assets; not deployed
tests/e2e/                 Playwright tests
.github/workflows/         Quality and Hostinger deployment workflow
docs/PROJECT_GUIDE.md      This guide
AGENTS.md                   Mandatory repository instructions for agents
```

## 4. Local development

Requirements:

- Node.js 22.12 or newer
- npm
- Google Chrome only when rendering social assets

Install and start the site:

```sh
npm install
npm run dev
```

Astro normally serves the site at `http://localhost:4321`. If the port is occupied, Astro chooses the next available port and prints it in the terminal.

Useful commands:

```sh
npm run check          # Astro and content-schema validation
npm run build          # production build in dist/
npm run preview        # serve the production build locally
npm run test:e2e       # Playwright tests
npm run test:lighthouse
npm run test:quality   # audit, check, build, E2E and Lighthouse
npm run render:social  # regenerate Instagram assets
```

Run `npm run check` and `npm run build` after content or UI changes. Run the relevant E2E tests for navigation, filters, maps, responsive behaviour or route changes. Use `npm run test:quality` before a release or a material structural change.

## 5. Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and section overview |
| `/about` | Volume II and editors |
| `/methodology` | Scoring framework |
| `/selections` | Filterable wine-note index |
| `/selections/[slug]` | Individual wine note |
| `/portraits` | Portrait index |
| `/portraits/[slug]` | Individual portrait |
| `/essays` | Essay index |
| `/essays/[slug]` | Individual essay |
| `/addresses` | Interactive recommendation map |
| `/rss.xml` | RSS feed |
| `/sitemap-index.xml` | Sitemap index |

Unknown routes must resolve to the generated `404.html` page.

## 6. Content collections

All frontmatter schemas live in `src/content.config.ts`. A malformed entry stops the build. File names become URL slugs, so use stable, descriptive, lowercase slugs. Avoid changing a published slug without adding an explicit redirect strategy.

### 6.1 Selections

Location: `src/content/selections/`

```yaml
---
title: "Wine name"
producer: "Producer"
country: "Country"
region: "Region"
vintage: "2024"
type: "White" # Red, White, Sparkling, Rosé or Dessert
grapes: "Variety or blend"
price: "23 €"
tags: ["Salt", "Granite"]
vibe: "Sharp. Salt. Ready."
metrics:
  liveliness: 2
  drinkability: 2
  balance: 1
  complexity: 1
  emotion: 1
service: # optional; omit when it was not recorded
  glass: "Zalto Universal"
  decant: "No"
  temperature: "10 °C"
  tastedOver: "Two hours"
excerpt: "A short, concrete index description."
date: 2026-07-18
tastingDate: 2026-07-18
---
```

Scoring rules:

- Each of the five metrics is scored from 0 to 2.
- The displayed total is the sum of the metrics and has a maximum of 10.
- Never invent a score or adjust metrics to fit prose.
- The written note remains the editorial record; the metrics describe the editors' assessment.

Price rules:

- Use whole euros without decimal cents: `23 €`, not `22.99 €`.
- Do not research or infer a price unless explicitly requested.

The optional `service` block is only included when the information was recorded at the tasting. Do not backfill old notes with assumptions.

The first tag controls the colour of the selection card through `src/utils/moodColors.js`. Add a new colour mapping deliberately when introducing a new leading tag; otherwise the card receives the default black treatment.

Selection vibes use exactly three full-stop-separated descriptors. Prefer concrete nouns where they sound natural. Canonical forms include `Oil`, `Salt`, `Lift`, `Grip`, `Flowers`, `Chalk`, `Brine` and `Juice`; the schema rejects their competing adjective forms. Do not force awkward nominalisations: deliberate descriptors such as `Dry`, `Sharp`, `Ready` and `Austere` may remain. When a concept appears in both tags and vibes, use the same canonical form.

### 6.2 Portraits

Location: `src/content/portraits/`

```yaml
---
title: "Project or person"
role: "Full name, role"
location: "Place"
tags: ["Project", "Region", "Theme"]
excerpt: "A specific narrative introduction."
date: 2026-07-18
hero:
  src: "/images/portraits/example/hero-2400.webp"
  srcSmall: "/images/portraits/example/hero-1200.webp"
  alt: "Literal description of the image."
  caption: "Name, place and date."
---
```

Portraits are narrative and documentary. They do not use wine-card vibes, selection metrics or scores. Quotes must come from a transcript or an editor-confirmed recollection. Preserve factual details such as names, arrival times, geography and sequence of events.

Website portrait images should normally be exported as WebP at 2400 px and 1200 px widths. Write useful alt text and a concise caption. Do not overwrite original photographs.

### 6.3 Essays

Location: `src/content/essays/`

Required fields include `title`, `type`, `tags`, `vibe`, `excerpt` and `date`; `location` and `image` are optional. Allowed types are `Culture`, `Terroir`, `Travel` and `Journal`.

Essays use an editorial and bibliographic identity. Confirm quotations, translations, titles, dates and editions. Respect quotation and copyright limits when working from external material.

### 6.4 Addresses

Location: `src/content/places/`

```yaml
---
title: "Place name"
categories: ["Bar", "Restaurant"]
city: "City"
country: "Country"
coordinates:
  latitude: 41.1234
  longitude: -8.1234
note: "A concise reason to visit."
address: "Optional street address"
website: "https://example.com"
mapsUrl: "https://www.google.com/maps/..."
relatedUrl: "/portraits/example"
---
```

Allowed categories are `Winery`, `Wine Shop`, `Bar` and `Restaurant`. A place may use more than one category. Coordinates and URLs must be verified from the supplied map location or an authoritative source. Notes describe the place and why it is useful; avoid generic travel-copy language.

Addresses follow an explicit geographical progression from Portugal: Portugal, Spain, France and Ireland. Countries not yet listed in that sequence appear afterwards in alphabetical order until their position is decided. Within each country, entries are ordered by city and then by place name. Use the shared comparator in `src/utils/placeSort.ts` so the Addresses page and homepage map remain consistent as places are added.

## 7. Editorial voice

The desired voice is personal, precise, sober and occasionally funny. It should sound like an editor with a real memory of the wine or place.

Prefer:

- concrete sensory details;
- specific observations and circumstances;
- short factual transitions;
- uncertainty when the evidence is uncertain;
- the editors' original vocabulary.

Avoid:

- generic manifesto language;
- inflated claims unsupported by the note;
- repeated rhetorical oppositions such as “not only X, but Y”;
- formulaic conclusions that restate the introduction;
- excessive em dashes;
- phrases that explain an internal design decision to the reader;
- invented prices, grapes, production methods, scores, quotes or visit details.

When editing existing prose, preserve the editor's meaning and idiosyncratic phrasing. Remove artificial polish before removing personality.

## 8. Visual system

Core colours are defined in `src/styles/global.css`:

- background: `#050505`
- surface: `#121212`
- line: `#222222`
- primary text: `#EAEAEA`
- muted text: `#A3A3A3`
- dim text: `#777777`
- accent terracotta: `#D66A57`

Typography:

- Manrope for headings and body copy;
- JetBrains Mono for labels, metadata, filters and scores;
- large website headings generally use a light Manrope weight and tight tracking.

Section identities must remain distinct:

- **Selections** use the coloured pour-over-inspired cards, three-word vibes and score bars.
- **Portraits** are led by documentary photography, names, places and voices.
- **Essays** use a more typographic and bibliographic presentation.
- **Addresses** use maps, place photography and practical information.

Do not apply the selection-card language to Portraits or Essays.

## 9. Instagram assets

Generated assets live outside `public/` in `social/instagram/`, so they are not included in the website deployment. Edit `scripts/render-instagram-assets.mjs` and run `npm run render:social`; do not manually rebuild the typography in another application unless a deliberate one-off treatment is required.

Current export standards:

- Feed posts and carousels: **1080 × 1440 px**, 3:4 portrait.
- Every item in one carousel must use the same orientation.
- Profile image: **1080 × 1080 px**, with the wordmark kept inside the circular safe area.
- Reels and Stories: prepare separately at 1080 × 1920 px when needed.

Social identities:

- Selections: wine card, real bottle photograph, tasting note and score.
- Portraits: photographic cover, place or work image, verified quote and narrative excerpt.
- Essays: typographic cover, quotation or argument, reference and link to the full text.

Never generate a fake bottle, label, person or documentary scene to stand in for a real editorial image.

## 10. Metadata, discovery and feeds

`src/layouts/MainLayout.astro` provides canonical URLs, descriptions, Open Graph data, Twitter card data and the RSS link. The canonical production origin is configured in `astro.config.mjs`.

Astro generates the sitemap index. `src/pages/rss.xml.js` generates the RSS feed. Changes to content routes must keep both endpoints valid.

The HTML document is currently marked `lang="en"`. Revisit this only as part of an explicit multilingual strategy.

## 11. Security and privacy

Production security headers are defined in `public/.htaccess` and copied to `dist/`. They include CSP, HSTS, Permissions Policy, frame protection, MIME sniffing protection, referrer policy and cross-origin policies.

Any new third-party script, font, map endpoint, iframe, analytics service, newsletter or embedded media may require:

1. a privacy review;
2. consent or a privacy policy;
3. a CSP update;
4. performance and accessibility testing.

Do not weaken the CSP broadly to make a third-party integration work.

## 12. Testing and quality gates

The current Playwright suite covers:

- navigation to Selections;
- selection filters and URL state;
- portrait image loading and overflow;
- address-map filters and mobile layout;
- the homepage interactive map;
- RSS and sitemap generation.

Lighthouse checks `/`, `/selections`, `/addresses` and the Marzagana portrait. Minimum scores are 80 for performance and 90 for accessibility, best practices and SEO.

Add or update tests when changing navigation, filters, map behaviour, content routes, responsive layouts, feeds or deployment-critical output.

## 13. Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:

1. install with `npm ci`;
2. audit production dependencies;
3. validate Astro and content;
4. build the static site;
5. run Playwright;
6. run Lighthouse;
7. upload the validated `dist/` artifact;
8. deploy that artifact to Hostinger by FTP.

Required GitHub secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

The FTP action deploys to the FTP account root, which must correspond to the production `public_html`. The workflow excludes `legacy/**`; never remove that exclusion while the old site remains at `legacy.enoversa.com`.

After changing `.htaccess`, clear the Hostinger CDN cache and verify the live response headers. Keep SSL and Force HTTPS enabled for both the main and legacy domains.

## 14. Safe contribution workflow

1. Read this guide and inspect the relevant existing content or component.
2. Check `git status` and preserve unrelated user changes.
3. Make the smallest coherent change.
4. Validate content against `src/content.config.ts`.
5. Check desktop and mobile presentation where the change is visual.
6. Run proportionate tests.
7. Report changed files, validation performed and any unresolved editorial decision.

Do not commit, push, deploy, change production settings or contact external services unless explicitly authorised.

## 15. Known editorial decisions

- Volume II is the active edition.
- The previous site remains at `legacy.enoversa.com`.
- Rui Pires and the Bageiras visit were Legacy placeholders and must not be reintroduced.
- Selection scores use five metrics with two bars each, totalling 10.
- Service specifications are optional and are not retroactively invented.
- Prices in new notes are rounded to whole euros.
- Portraits and Essays do not reuse the three-word Selection card.
- The Instagram feed begins with the three Volume II transition posts, followed by the Marzagana Elementales Portrait.

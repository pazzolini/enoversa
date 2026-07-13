# Enoversa

Editorial journal about low-intervention wines, built as a static Astro site.

## Requirements

- Node.js 22.12 or newer (the pinned local version is in `.nvmrc`)
- npm

## Local development

```sh
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Validation

```sh
npm run test:quality
```

This runs the production dependency audit, Astro validation, static build, desktop and mobile Playwright tests, and Lighthouse budgets. The production output is written to `dist/`.

## Content

Markdown entries live in:

- `src/content/selections/`
- `src/content/portraits/`
- `src/content/essays/`

Their frontmatter schemas and loaders are defined in `src/content.config.ts`. A schema validation error stops the build, preventing malformed content from being published.

## Deployment notes

The GitHub Actions workflow validates the site before every deployment to `main`. If validation passes, the exact tested `dist/` artifact is uploaded to Hostinger by FTP.

The repository needs these GitHub Actions secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

The corresponding FTP credentials are available in the Hostinger hPanel. On Hostinger, keep SSL and Force HTTPS enabled for both `enoversa.com` and `legacy.enoversa.com`. After the first deployment containing new security headers, clear the Hostinger CDN cache and verify the response headers.

The site is statically generated. The production host must:

- serve the generated `dist/` directory;
- return `dist/404.html` for unknown routes;
- preserve the `.htaccess` file included in `dist/`.

The canonical production origin is configured in `astro.config.mjs`. Security headers are defined in `public/.htaccess` and copied into the root of every production build.

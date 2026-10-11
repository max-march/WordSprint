# Repository guidance

## Build and run

Use Node.js `>=22.12.0` and npm from the repository root.

- `npm ci` installs the locked dependencies.
- `npm run dev` starts the Astro development server at `http://localhost:4321`.
- `npm run build` creates the static production site in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run astro -- --help` shows available Astro CLI commands.

There are currently no test or lint scripts, test runner, or test files in the repository, so no full-suite or single-test command is configured. Use `npm run build` to check that site changes compile.

## Architecture

Astro owns page routing and the shared document shell. Files in `src/pages/` define routes; `src/pages/index.astro` composes `src/layouts/BaseLayout.astro`, which supplies the document metadata, shared `Header`, global reset, and base page styles.

Keep mostly static presentation in `.astro` components. Interactive UI is implemented as React islands and hydrated from the page with an explicit Astro client directive. The word-count form is the current island; it uses `client:load` and a CSS module. Preserve that hydration strategy unless a change is verified in the browsers the site supports.

## Project conventions

- Keep site-wide reset and body/main styles in `BaseLayout.astro`; component-specific Astro styles belong with their component.
- React component styles are imported from adjacent `.module.css` files and referenced through the imported module object.
- The shared visual palette is a deep navy background with pale text and gold accents; the header uses Playfair Display with Georgia fallbacks.
- Feature work follows `public/SKILL.md`: inspect the working tree first, ask before proceeding when it is dirty, and ask whether to use a proposed `cp/feat/<slug>` branch or stay on the current branch when it is clean. After implementation, offer the proposed commit message and ask whether to commit.

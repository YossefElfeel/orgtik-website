# Prototype Instructions

## OrgTik project scope

- The user requested a public GitHub repository for this project. Publish the frontend, assets, brand PDF, plans, and QA documentation. Local dependencies, credentials, logs, builds, ZIP downloads, and unused hosting-worker infrastructure are excluded by the root `.gitignore`.
- The public repository has no Sites worker or `test:sites` command. The optional Sites instructions below apply only if the user later requests a Sites deployment and that infrastructure is restored. Do not add backend code as part of ordinary frontend work.

- The user selected the cinematic direction on 2026-09-21. Cinematic is now the sole website direction; the comparison gallery, alternate direction routes, source files, and selection controls have been removed.
- The user supplied the official logo exports in `../assits/LOGO`; use those files instead of PDF-extracted logo approximations.
- The Services section should use premium expandable service rows inspired by the supplied dark accordion reference, translated into OrgTik's own cinematic brand language.
- The FAQ should end with a prominent violet contact band, not a small text-only link.
- The FAQ follows the Services hierarchy: a full-width heading row, a dark-plum accordion with generous unnumbered rows, and a compact violet contact band aligned below. Question text stays off-white, brightens on hover/focus, and is white when open; reserve the stronger violet accent for the active toggle. Answers use readable muted lavender.
- Testimonials use previous/next arrows and a scroll-snap track: three visible cards on desktop/tablet, one on mobile, with native horizontal scrolling and keyboard arrows/Home/End. Disable controls at the boundaries. The user approved clearly labeled placeholders; do not invent client names, quotes, endorsements, or ratings.
- Footer links are readable (16px desktop, 15px mobile), with a dedicated logo/back-to-top row, top-aligned brand and navigation columns, and grouped social/origin details. Keep the animated bottom glow but use overflow clipping so it cannot create an internally scrollable footer or excess bottom space.
- Use the shared `src/Action.jsx` component for CTAs: 54px pill, 12px label, and a consistent circular arrow. The header uses the same anatomy at 46px. Light/dark and secondary variants belong to this system; tabs, disclosures, and navigation remain distinct controls.
- Frontend only. Use the original assets and colors from `../ORGTIK.pdf`, with an actual animated video placeholder in each hero. Never recreate the custom logo as text.
- Do not implement backend services, real authentication, transactions, or message delivery. All contact/account/plan behavior is labelled as a local preview.
- Build static client output only for this task. The starter's optional hosting files are untouched and not used or included in preview delivery.
- Continue future design work in the cinematic visual language unless the user explicitly changes direction.
- Keep all current work on this single page and frontend only; use on-page overlays for project and plan previews.
- The standard OrgTik logo is horizontal: official icon to the left of the official wordmark.
- Use restrained scroll reveals, smooth service/FAQ disclosures, contextual hover cursors, and an atmospheric closing section. Respect reduced motion and touch input.
- The platform explorer automatically advances every eight seconds, with automatic pauses during hover, keyboard interaction, and when offscreen.
- Keep the platform explorer free of the separate counter/status/tour toolbar.
- Do not show motion pause/play controls. Decorative motion plays automatically while visible, respecting reduced-motion and data-saving preferences.
- Build & grow uses a “Let’s build” cursor; Run it better uses “Explore plans”; work imagery uses “View project”.
- The footer includes Facebook, Instagram, LinkedIn, X, TikTok, Pinterest, Snapchat, and YouTube icons, plus “Made in Switzerland” with a Swiss flag. Only link confirmed social profile URLs; do not invent handles.
- The user confirmed that social icons should remain unlinked placeholders for now.
- Platform details use larger balanced headlines, violet sentence emphasis, a grouped feature list, and a prominent rounded plan CTA. Preserve the real copy and eight-second rotation.
- The approach section uses a hover stage selector for Understand, Design, Deliver, and Evolve, paired with large supplied OrgTik imagery and the original stage narrative. Preserve mobile tap and keyboard navigation, including arrows, Home, and End, with a stacked mobile layout.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

# OrgTik cinematic website

The selected OrgTik landing-page direction, built with React and Vite from the original OrgTik brand PDF. Cinematic is the sole visual direction and opens directly at the site root.

## Experience

- Full-bleed cinematic hero using original brand artwork and a 12-second H.264 motion loop.
- Responsive desktop, tablet, and mobile layouts.
- Automatic decorative motion with reduced-motion and data-saving fallbacks; no visible playback controls.
- Interactive six-module explorer with keyboard navigation.
- Hover-selected approach stages with original OrgTik imagery and narrative, plus mobile tap and keyboard navigation.
- Eight-second automatic system tour that continues during mouse hover and pointer clicks, with pauses for keyboard interaction, visibility, and reduced motion; no separate status toolbar or playback controls.
- Smooth Services and FAQ disclosures, replayable scroll entrances, and contextual project/gateway cursors.
- Persistent scroll navigation and a “View all projects” CTA with an on-page collection preview.
- Subtle glass navigation, full-image gateway cards with staged text entrances, and Lenis mouse-wheel smoothing with native touch/dialog scrolling and reduced-motion support.
- Six labeled testimonial placeholders with previous/next navigation: three visible on desktop, one on mobile, plus horizontal scrolling and keyboard support. Replace with approved client stories when supplied.
- Light editorial FAQ with a split introduction, accessible animated questions, and a full-width violet contact band. The footer retains readable navigation, official horizontal branding, and a clipped animated glow.
- One shared pill-button system across CTAs, with context-aware light/dark and secondary variants.
- On-page project viewer with keyboard dismissal and an automatically animated closing section.
- Local plan, account, and enquiry previews. No backend, authentication, payment, or message delivery is implemented.
- Self-hosted Montserrat typography and the official OrgTik logo exports from `../assits/LOGO`.

## Development

Requires Node.js and npm. From this directory:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

```sh
npm run format:check
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

The static build is written to `dist/client`. Serve the app at the domain root because assets use absolute paths.

## Source map

- `src/App.jsx`: single-direction app shell and local preview dialogs.
- `src/Cinematic.jsx`: selected landing-page composition.
- `src/shared.jsx`: navigation, video, modules, process, FAQ, footer, and dialogs.
- `src/Action.jsx`: shared CTA component and arrow anatomy.
- `src/Experience.jsx`: service disclosures, project viewer, testimonial cards, contextual cursors, and closing section.
- `src/content.js`: platform, services, and process content.
- `src/design.css`: responsive design system and animation rules.

`public/assets/manifest.json` records the supplied source for imagery and official logo assets. `public/assets/video-manifest.json` describes the Cinematic video encodes.

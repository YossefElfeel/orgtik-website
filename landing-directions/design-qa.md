# Reference implementation QA

Date: 2026-09-28

Source: user-supplied `OrgTik Website3.html`.
Implementation: `http://127.0.0.1:4173/`.

## Result

Passed visual and interaction checks. All ten page groups are implemented as editable React components, with source imagery, typography, colors, section treatments, and interactions. No document-viewer runtime or external font/icon CDN is required.

## Browser coverage

- 26 views checked: all ten page groups plus product, service-family, and service-detail views, at 1440 × 1000 and 390 × 844.
- No JavaScript exceptions, console warnings, or horizontal document overflow in the final sweep.
- Desktop header/navigation and browser Back.
- Six-product software bundle, billing duration, plan comparison, product detail.
- Service bundle and contact handoff.
- Contact validation and local success state.
- Password-reset preview.
- Insights search, empty state, and article navigation.
- Reversible roadmap voting.
- Mobile navigation, focus containment, Escape, focus restoration, and scroll unlock.
- Legacy route mapping, product selection from query parameters, and disabled comparison for an empty workspace.

Results: `qa/browser-results.json`, `qa/interaction-results.json`.
Screenshots: `qa/reference-desktop.png`, `qa/desktop-home.png`, `qa/desktop-services.png`, `qa/desktop-software.png`, and matching mobile captures.

## Build checks

- Production build completed successfully (`dist/client`).
- Prettier check passed.
- Git whitespace check passed.
- The final production build was rerun for the pull request after removing the redundant accessibility attribute; it passed without compiler warnings.

## Corrections during verification

Corrected malformed navigation attributes inherited from the export, removed duplicate class helpers and duplicate data properties, resolved dynamic hover rules, used local root-relative assets, hid decorative icons from accessible button names, added mobile-menu keyboard handling, promoted index-page headings, and retained older route/selection links.

## Scope

Forms, account actions, votes, estimates, and plan choices remain clearly labelled local previews. Backend delivery, authentication, payments, production legal approval, deployment, and cross-browser certification were not part of this update. Verification used local Chromium/Edge because the in-app browser automation was unavailable.

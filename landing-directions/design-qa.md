# OrgTik cinematic website design QA

Status: passed after the approach hover interaction refinement.

## Scope

Latest follow-up (2026-09-21): testimonials now have six explicitly labeled placeholders on a native scroll-snap track with three visible at desktop/tablet and one on mobile. Previous/next buttons, keyboard Home/End, range updates, and boundary disabled states verified. FAQ uses a full-width dark panel with off-white/white question states, violet active toggle, readable muted-lavender answers, and an aligned compact contact band. Footer links are 16px desktop / 15px mobile; a separate logo row and top-aligned navigation replace the bottom-aligned tiny-link layout. `overflow: clip` fixes the decorative glow causing internal footer scrolling; confirmed footer scrollTop is zero and mobile bottom padding is 28px. Desktop 1440 × 1000, tablet 768 × 1024, and mobile 390 × 844 checks showed no horizontal page overflow. Contact dialog and FAQ keyboard behavior remain functional. Earlier entries below describe previous iterations.

The selected Cinematic landing page is the only public experience. The comparison gallery, selection controls, Editorial direction, and Connected direction have been removed.

## Visual source

- `../ORGTIK.pdf` remains the source of truth for typography, color, and brand imagery.
- `../assits/LOGO` is the source of truth for the official OrgTik logo exports used in the interface and favicon.
- Cinematic evidence lives in `qa/cinematic-desktop.png`, `qa/cinematic-tablet.png`, `qa/cinematic-mobile.png`, and the full-page captures.

## Verification checklist

- [x] Formatting passes.
- [x] Production build passes.
- [x] Root URL opens the Cinematic page directly.
- [x] No comparison or direction-selection UI is visible.
- [x] Hero media, desktop navigation, and content sections render without console warnings or errors.
- [x] At 1440 × 900, all eight sections span the viewport cleanly, no interactive elements are clipped, and there is no horizontal overflow.
- [x] The premium Services accordion uses supplied OrgTik imagery, animated disclosures, and allows at most one service open at a time.
- [x] The platform tour automatically advances every eight seconds; manual selection and keyboard navigation work. Hover, focus, offscreen, and hidden-page states pause progression. The separate status toolbar and playback controls were removed as requested.
- [x] Desktop contextual cursors show “Let’s build”, “Explore plans”, and “View project”. Gateway actions navigate to Services or open the existing plan preview on this page.
- [x] Project previews open in an on-page dialog; next/previous controls work, Escape closes it, and trigger focus is restored.
- [x] Editorial FAQ disclosures animate and keep only the selected answer open.
- [x] The closing section has automatic animated brand imagery and light, with offscreen pausing and no visible motion controls.
- [x] Reduced-motion and non-hover input fallbacks are included in the implementation.
- [x] The post-FAQ contact band remains visually distinct and readable at desktop, tablet, and mobile widths.
- [x] The expanded footer has a complete navigation and contact hierarchy; its bottom aurora remains decorative and respects reduced-motion preferences.
- [x] At 390 × 844, the service panel stacks to one column and the page has no horizontal overflow.
- [x] The final browser pass reports no console warnings or errors.

The earlier motion-pass production build contained 51.02 kB of CSS (11.77 kB gzip) and 305.66 kB of JavaScript (90.74 kB gzip). That pass was visually inspected in the browser at 1440 × 900 and 390 × 844; the saved screenshots above document the earlier cinematic baseline. The control-removal check confirmed no playback/status controls remain, the hero video is playing and looping, and the platform advances automatically.

The footer social update was inspected at 1440 × 900 and 390 × 844: eight named social icons, the Swiss flag, and “Made in Switzerland” are visible without horizontal overflow. Social icons remain unlinked placeholders by user request. Browser warning/error logs are empty.

Backend services, real accounts, payment, enquiry delivery, databases, and external API integrations remain outside this frontend prototype.

FAQ / testimonials / CTA refinement (2026-09-21): FAQ rows now use larger type and continuous rules, with a full-width violet contact band. Three clearly labeled placeholder testimonial cards render side by side at 1440px and 768px, and stack at 390px. These are not real endorsements. All primary CTAs use the shared Action component (54px height, 12px label, pill silhouette, circular arrow), with a 46px header variant and matching secondary treatment. Inspected at 1440 × 1000 and 390 × 844; measured at 768 × 1024. No horizontal overflow. Verified keyboard FAQ expansion, mobile FAQ expansion, contact dialog opening/closing, and enabled/disabled plan-review states. A fresh reload produced no new warning/error logs; transient HMR import errors during multi-file editing were resolved. Final production build: 51.48 kB CSS (11.88 kB gzip), 312.90 kB JavaScript (92.45 kB gzip). Formatting and whitespace checks pass. Current screenshots were inspected inline; saved QA images remain the earlier baseline.

Platform refinement: inspected at 1440px and 390px widths with no horizontal overflow or browser warnings/errors. Platform copy and features are preserved; the new plan CTA opens the existing local preview with HR selected. Production build, formatting, and diff whitespace checks passed.

Approach refinement: the main agent visually inspected the hover stage selector at 1440 × 1000 and 390 × 844 with no horizontal overflow or browser warnings/errors. Verified interactions: clicking Design, ArrowDown from Design to Deliver, tapping Evolve on mobile, and mouse pointer entry selecting Design without a click. The large supplied OrgTik images and original stage narratives retain the cinematic Montserrat typography and violet palette. The fresh read-only reviewer returned “ship” for code, interactions, and accessibility; this was not pixel approval. The final production build passes with 52.32 kB CSS (11.97 kB gzip) and 306.87 kB JavaScript (91.14 kB gzip). Formatting and diff whitespace checks pass.

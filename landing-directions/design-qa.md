# OrgTik cinematic website design QA

## Services closing CTA containment — 2026-09-21

Source visual truth: `C:/Users/USER/AppData/Local/Temp/codex-clipboard-9b078f29-4145-4c92-8007-2d7aa1d00889.png` (1892 × 472), showing the earlier full-bleed Services CTA, plus the approved homepage `.faq-contact-band` as the requested contained treatment.

Implementation evidence: browser-rendered `/services#page-cta`, inspected at 1440 × 900 and 390 × 844 CSS viewports at density 1. The desktop panel measures approximately 1313 px wide with a 56 px left margin and 16 px radius; the mobile panel measures approximately 335 px wide with a 20 px left margin. The browser provider displayed the rendered captures inline; no persistent screenshot file was produced.

State: Services overview closing action immediately before the footer. Full-view comparison verified that the warm-paper surround separates the CTA from the dark process section and footer. Focused comparison verified the contained frame, two-column desktop composition, stacked mobile composition, official OrgTik mark, preserved heading/body/action copy, and functioning `/contact?intent=services` link.

Findings: no actionable P0/P1/P2 issues remain. The earlier full-width violet fill was replaced by a homepage-aligned contained card. Typography remains Montserrat with the established display hierarchy; spacing uses the shared 56/20 px responsive gutters; the gradient reuses the homepage contact-band colors; the decorative mark is the official SVG asset rather than a recreation; and all app-specific copy remains unchanged.

Comparison history: the source capture showed a full-viewport violet region with no outer paper margin. The implementation adds the requested warm-paper frame, 16 px radius, restrained homepage gradient, and responsive internal padding. Post-fix desktop/mobile browser captures show no horizontal overflow. Browser warning/error logs are empty.

final result: passed

## Routed website templates — 2026-09-21

Extended the approved cinematic homepage system across the plan's remaining P02–P18 template families: Services overview, five service families including OrgTik hosting, reusable service detail, Insights/category/article, About, Contact, Legal, Sitemap, not found, Roadmap, Platform, six module pages, Plans, sign in/recovery, Work, and case study.

The route shell preserves the official logo, Montserrat hierarchy, deep-plum and violet palette, warm-paper reading sections, 54px CTA anatomy, responsive media treatment, and restrained motion. Major marketing heroes use the existing branded motion or approved PDF-derived assets. Article, legal, sitemap, sign-in, work, and error templates use quieter static treatments where the plan prioritizes reading or task clarity.

Functional verification covered route titles and headings, the fifth hosting family and managed-hosting detail, category/project filters, module selection and URL summary state, contact validation and explicit local success state, roadmap detail dialog and scroll unlock, sign-in preview, recovery route, and unknown-route recovery. Contact, account, pricing, roadmap, legal, case-study proof, and product imagery clearly state their preview or owner-review status.

Browser checks covered all 18 template families at 1440 × 900 and representative commercial/content/utility routes at 390 × 844. The tested pages had no horizontal overflow and browser warning/error logs were empty. `npm run format:check` passes. The latest `npm run build` passes with 85.26 kB CSS (18.59 kB gzip) and 416.05 kB JavaScript (119.64 kB gzip), within the plan's gzip budgets.

Remaining release dependencies are content and ownership decisions: approved client evidence, quotations and metrics; final legal wording; commercial plan names and prices; confirmed product availability and captures; verified contact details; and approved historical/roadmap claims.

final result: passed for frontend template implementation; content approval pending

## Review comments verification — 2026-09-21

Source visual truth: `qa/cinematic-full-wide.png` (1424 × 6196) for the existing cinematic composition, plus the user’s requested CTA placement and fifth-service requirements. Brand imagery and palette remain grounded in `../ORGTIK.pdf` and `../assits/LOGO`.

Implementation evidence: `qa/work-heading-updated.png` and `qa/hosting-service-updated.png` (1265 × 791 provider output from a 1280 × 800 CSS viewport), plus `qa/work-heading-mobile-updated.png` and `qa/hosting-service-mobile-updated.png` (375 × 811 provider output from a 390 × 844 CSS viewport). Density was approximately 1. The combined review input is `qa/review-comments-comparison.jpg` (1600 × 1205); it places the earlier work-section capture with the revised desktop and mobile states in one board.

State reviewed: the projects introduction with the CTA beside the descriptive copy; the same introduction stacked on mobile; OrgTik hosting expanded on desktop and mobile; the projects overview dialog opened from the relocated CTA.

Focused comparison was required because the requested changes concern the section-introduction alignment and one accordion row. The combined board makes the relocated CTA, new service row, supplied brand imagery, and responsive treatment readable without relying on a full-page reduction.

Findings: no actionable P0/P1/P2 issues remain. The CTA now sits in the right-hand introduction column on desktop and follows the description on mobile. OrgTik hosting is service 05, uses the existing disclosure anatomy and a supplied OrgTik brand application, and avoids unsupported uptime or performance claims.

Required fidelity surfaces: Montserrat hierarchy and optical weights are unchanged; the two-column heading rhythm matches adjacent split introductions; the existing plum, violet, paper, and pale-lavender tokens are reused; imagery remains an original PDF brand asset with the established crop and treatment; copy clearly describes managed hosting, monitoring/backups, and performance care. No replacement logo, fabricated customer proof, or custom illustration was introduced.

Interaction and technical checks: the relocated button opens the existing accessible project dialog; OrgTik hosting expands and collapses through the shared disclosure; desktop and mobile pages have no horizontal overflow; browser warning/error logs are empty. `npm run format:check` and `npm run build` pass. Production output is 55.82 kB CSS (12.77 kB gzip) and 338.45 kB JavaScript (99.29 kB gzip).

final result: passed

Status: passed after the approach hover interaction refinement.

## Scope

Gateway and scroll refinement (2026-09-21): gateway choices now use full-bleed official brand photography with a deep bottom fade, white bottom-aligned copy, pale hover cursors, and independent category/title/body/action entrances. Section and accordion entrances trigger further inside the viewport; imagery uses controlled cropping and supported scroll-linked drift. Added Lenis 1.3.26 for mouse-wheel/anchor smoothing, with native touch/nested scrolling and a reduced-motion fallback. Background scrolling locks while a dialog is open. The floating navbar now has 85%-opaque plum glass, a 16px blur, active-section indication, and an opaque accessibility fallback. Verified desktop 1440px and mobile 390px card layout, readable fades, navbar treatment, anchors, keyboard menu opening/closing, and scroll lock. Fixed hidden custom cursors causing horizontal overflow after resizing. Browser logs were clean; build and formatting pass. Package installation reported five existing-toolchain dependency advisories (one moderate, four high); no broad dependency upgrades were applied in this visual task.

Motion and navigation follow-up (2026-09-21): section entrances now replay on viewport re-entry with bounded grouped stagger and project-image cropping, using a visible fallback and a reduced-motion guard. The platform timer continues under mouse hover and pointer selection; keyboard interaction still pauses it. Testimonials advance one card every 3 seconds, loop to the start, and pause offscreen, during keyboard interaction, with reduced motion, or while a dialog is open. Autoplay does not announce live-region changes. Added a fixed navbar with a solid scrolled surface and anchor offsets, plus a shared “View all projects” CTA opening the two supplied projects in an on-page collection. FAQ, closing, and footer contact actions consistently say “Talk to us”. Verified desktop 1440px and mobile 390px navigation, gallery selection/close, carousel advancement and keyboard pause, with no horizontal overflow. Build and formatting checks pass.

FAQ rollback (2026-09-21): restored the light split-layout FAQ from merged PR #1, including its question colors and full-width violet contact band. Testimonial navigation, shared CTAs, and the refined footer remain unchanged. The dark FAQ described in the earlier follow-up below is superseded.

Scoped refinements (2026-09-21): removed the decorative platform feature-list badges and their reserved column. Light-section contextual cursors now use deep plum with white text; dark-section project cursors retain their light treatment. Verified the desktop hover cursor, icon-free platform, restored FAQ at 1440px and 390px, keyboard disclosure, and local contact dialog. No horizontal page overflow at either width. Production build, formatting, and diff whitespace checks pass.

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

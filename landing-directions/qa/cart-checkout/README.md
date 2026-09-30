# Cart and checkout verification

Verified 2026-09-30 against a local production build on port 4180.

- Added software bundles, workspace plans, individual product plans, service bundles and service plans through the UI.
- Confirmed duplicate prevention, distinct billing selections, refresh persistence, item removal and configuration links.
- Confirmed empty cart and direct empty-checkout recovery.
- Confirmed required-name and email validation, all contact fields, selected-item details in the enquiry preview and return to editing.
- Kept all enquiries local: no server delivery or payment. Customer details are not written to browser storage.
- Inspected cart and checkout at 1440px, 390px and 320px, including wrapping, responsive layouts and original-header compatibility.
- Corrected the compact language cue, original menu width and scrollbar-related minimum-width overflow. Final 320px checks showed a 305px client width and 305px document scroll width on Software, cart and checkout.

The captures use test cart selections. The checkout form is empty; no customer data is present in these screenshots. The original screenshot set is `cart-{1440,390,320}.jpg`, `checkout-{1440,390,320}.jpg`, and `software-header-320.jpg`.

`npm run build`, `npm run format:check`, and all five `npm run test:cart` checks passed. A fresh read-only reviewer inspected the screenshots and code; all three listed responsive findings were scored resolved after correction. The optional Impeccable detector could not run because its engine was not installed, so visual verification used rendered captures and source review.

The CMS integration remains deferred by request. See the project README and `src/reference/checkout-enquiry.js` for the payload boundary.

## Cart interaction enhancement — 2026-09-30

The cart now groups software and services, exposes the scope/plan/duration beside each estimate, offers undo for the latest removal, and keeps a checkout action visible on mobile. Both service and software add actions become “View in cart” for the exact saved configuration. Adding shows a persistent, dismissible selection preview with cart, checkout and continue-browsing actions.

UI verification covered the Launch service bundle, the Graphic design Connected plan, and the CRM Essential plan; add feedback, cart counts, navigation dismissal, checkout handoff, return focus, duration changes, removal/undo and saved selections were checked. Temporary individual-plan test selections were removed afterward. All six data tests, the production build, formatting and whitespace checks passed.

New captures are `cart-enhanced-1440.jpg`, `cart-enhanced-390.jpg`, `cart-enhanced-390-middle.jpg`, `cart-enhanced-390-bottom.jpg`, `cart-enhanced-320.jpg`, `service-add-enhanced-{1440,390}.jpg` and `software-add-enhanced-390.jpg`. These are viewport captures: full-page capture was unavailable in this browser session. At 320px the cart client and scroll widths both measured 305px; the fixed mobile checkout bar measured 78.8px high. No customer details were entered or stored in this pass.

The fresh visual/source review found one focus-ring contrast issue. Scoped dark-purple outlines now cover the light cart and notification surfaces while the plum summary retains its light outline. Keyboard checks confirmed visible focus on configuration, Remove, Undo removal, Dismiss and Continue browsing. Focus captures are `cart-remove-focus-1440.jpg`, `cart-undo-focus-390.jpg`, `cart-close-focus-390.jpg` and `cart-continue-focus-390.jpg`. The reviewer scored that finding resolved in a bounded follow-up and cleared the fix. The production build and CSS formatting passed again after the correction; documentation was rechecked without behavior drift.

## Cart workspace refinement — 2026-09-30

The cart was further reworked around a compact title/count, All items/Software/Services filters, a continuous item list with native detail disclosures, separate monthly/project estimates and category breakdowns. Existing configurators now offer Save changes when opened from Edit selection. Saving replaces the original item; cancelling leaves it untouched. Removal feedback is inline, and clear-all offers inline confirmation and undo. Mobile retains checkout and a direct estimate link. See `cart-workspace-direction.md` for the scope and design contract.

UI verification changed Complete suite from Connected (CHF 176/month) to Launch (CHF 147/month) and back, and Graphic design from Focus (CHF 1'800/project) to Connected (CHF 4'200/project) and back. Both edits kept four total cart items. Launch bundle edit/cancel, filters, a filtered empty state, disclosure details, removal/undo, clear-all/undo, refresh persistence, estimate navigation and the full checkout handoff were checked. The original four test selections were restored. Keyboard Undo had a dark focus outline; Escape dismissed inline feedback and returned focus to the cart heading. No customer data was entered.

All eight `test:cart` checks, `format:check`, the production build and whitespace checks passed. The final narrow layout measured 305px for both client and scroll widths. Captures are viewport images: `cart-workspace-{1440,390,320}.jpg`, `cart-workspace-bottom-1440.jpg`, `cart-workspace-details-390.jpg`, `cart-workspace-estimate-390.jpg`, `cart-workspace-empty-390.jpg` and `cart-edit-software-1440.jpg`. Full-page capture and the optional detector remain unavailable. No claim is made that the separate interactions suite was rerun.

The final bounded visual/source review cleared two corrections: the cart estimate overview now prefixes every billing-period total containing priced services and each service breakdown with “From”, and “Keep items” returns focus to “Clear cart” after cancelling clear-all. Supporting recaptures are `cart-keep-items-focus-1440.jpg` and `cart-workspace-estimate-320.jpg`. The reviewer marked both findings resolved, accepted the recaptures and returned a ship disposition within that fix scope; no material regressions from those two corrections were evident.

## Service feature details — 2026-09-30

Service rows now expose “View service features” through the existing native disclosure. Each service in a bundle has its own heading and feature checklist. Individual and family plans use the same published plan scope as the service package cards. The service catalogue and plan-feature helper are shared with Services; saved selection IDs resolve features without changing the cart storage schema or checkout payload. Unknown IDs retain the selected name and show that feature details require confirmation.

Verified the existing Graphic design Focus selection and every service in the Care and Launch bundles, mouse and keyboard opening/closing, visible keyboard focus, and preserved selections after cancelling an edit. The Services configurator still shows the matching Focus, Connected and Partnership features. Checkout still carries all four saved items into the empty contact form. No customer data was entered.

Checked 1440px, 1024px, 390px and 320px layouts. Client and scroll widths matched at 1024px (1009px), 390px (375px) and 320px (305px). Captures are `service-features-{1440,390,320}.jpg` and `service-bundle-features-1440.jpg`. All ten `test:cart` checks, the production build, formatting and whitespace checks passed. The two new tests cover catalogue lookup for saved selections, non-mutation, unknown IDs, and service/family plan scope. No separate agent review or interactions-suite rerun is claimed for this narrow addition.

# OrgTik frontend

React + Vite implementation of the supplied **OrgTik Website3.html** reference. See the [repository README](../README.md) for routes and scope.

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

## Verification

```sh
npm run format:check
npm run test:cart
npm run build
```

Output: `dist/client`. Configure an SPA fallback for every page path.

## Editing

The ten page components in `src/reference` contain each page's content, presentation, and interaction state. `site.css` contains global accessibility and typography rules; `states.css` preserves the reference's hover treatments. Navigation lives in `src/reference/navigation.js` and `src/App.jsx`. Assets use root-relative URLs and local fonts, so nested routes do not depend on third-party CDNs.

The import utility converts the supplied export into regular React source. It is a migration tool, not a build step. Do not rerun it over subsequent manual changes without reviewing the diff. The bundled document runtime and editable image-upload widget are not shipped. `image-slot.js` is a display-only image element preserving the reference's image framing and logo mirrors.

## Plans

Services and software share one plan ladder: **Starter**, **Complete** and **Ongoing** (`src/reference/plan-ladder.js`).

- `service-catalog.js` holds the services, the ready-made bundles (Launch, Visibility, Care) and the price rule. Each service costs its plan price, then a multi-service saving applies: 5% for two, 10% for three or four, 15% for five or more, and at least 12% when a ready-made bundle is included. A department overview is all of its services under the same rule.
- `software-catalog.js` holds the six products, billing terms, bundles (Operations, Growth, All-in-one suite) and the subscription price. Plans add setup and support at ×1, ×1.2 and ×1.45.
- `plan-pricing.js` connects cart items to both catalogues: legacy plan names, re-pricing, plan options, comparison data and "what you get".

Prices are never stored as the source of truth. The builders, plan cards, cart, checkout and `/plans` all compute them from the catalogues, so the same selection shows the same price everywhere. Adding a service or product never lowers the saving.

Each builder recommends a plan by fit and explains why. It pre-selects that plan once on arrival, shows all three plan totals for the exact selection, and writes its state to the URL. `PlanPicker.jsx` is the shared plan chooser. `PlanCompare.jsx` is the shared comparison table and native dialog, with "Show differences only".

`/plans` (Plans & pricing) lists every service, department overview, bundle and software product with its three prices, a software billing-term switch, and compare-and-choose dialogs. It is linked from the builders, plan sections, cart, footers and sitemap, not from the top navigation.

## Cart and checkout

Selections persist in browser local storage (`orgtik.cart.v1`). Saved items are migrated on load: Focus, Essential and Launch become Starter; Connected becomes Complete; Partnership becomes Ongoing. Every known item is then re-priced from the catalogue, and the cart check notes any item whose price changed. Identical configurations are combined.

Each cart item shows its plan with a Starter/Complete/Ongoing switcher and the price difference for each option. Changes are instant and can be undone; identical results are merged. Ongoing services have a 1-, 3-, 6- or 12-month Monthly commitment. Projects state that their timeline is agreed in the brief and does not change the price. Software items have an inline billing term.

"What you get" is visible by default, with a factual hint of what the next plan adds and for how much. "Compare plans" opens the shared comparison with the current plan marked and "Switch to" buttons. "Edit services" or "Edit products" opens the builder, where only the main button replaces the edited item.

The cart check flags overlapping selections with a one-click fix that never drops a higher plan, and flags Ongoing items without a commitment. The estimate overview shows monthly and one-off estimates, the total for the chosen periods (monthly items × their commitment or term, plus projects) and the savings included. Changes are announced politely to screen readers. The mobile bar shows the amounts.

Promises are limited to those OrgTik has confirmed (`PlanPromises.jsx`): reply within 1 business day, free scoping call, change anything before you sign, and nothing is charged.

`/checkout` carries the selection into a contact form. Name and a valid email are required. Two optional one-tap questions ask when to start and the best way to reach you; choosing phone requires a phone number. The summary and the enquiry preview show each item's plan and period with all totals. Submitting creates a clearly labelled local enquiry preview: no payment, server request or contact-data storage occurs.

The future CMS integration starts at `src/reference/checkout-enquiry.js`. `createCheckoutEnquiry(items, values)` returns a versioned payload (schema 2) containing the customer, preferences, message, items with plan IDs, selections, periods and estimates, and the totals. Connect delivery in the checkout submit handler when the CMS endpoint is available. The CMS must validate selections against its own catalogue and calculate commercial prices itself; client estimates are for presentation only.

Previous source remains available in Git history. Planning documents outside this folder describe earlier iterations and are not the current visual specification.

## Browser verification

`tools/verify.cjs`, `tools/interactions.cjs`, and `tools/capture.cjs` use Playwright and connect to a local browser debugging endpoint at port 9222. Set `PLAYWRIGHT_MODULE_PATH` to the available Playwright package when it is provided by the workspace runtime. These are development checks, not production dependencies. See `design-qa.md` for the actual coverage and build status.

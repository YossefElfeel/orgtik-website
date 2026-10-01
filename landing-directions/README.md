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

## Cart and checkout

Software bundles, workspace plans, product plans, service bundles and service plans can be added to the shared `/cart`. Selections persist in browser local storage, including scope, plan, duration and prototype estimates. Identical configurations are added once; distinct plans or durations remain separate. Monthly and project estimates are shown separately.

Adding an item shows a dismissible selection preview with its scope, estimate and cart/checkout actions. Added software configurations show “View in cart.” Added service plans and bundles instead show “Remove from cart” on the same button; removing stays on Services, returns the button to “Add to cart” and offers Undo. Service notifications also offer “Remove item” for immediate correction on mobile. Editing an existing item still uses “Save changes.” The cart provides All items/Software/Services filters, expandable scope details, and an estimate breakdown by billing type and category. The cart estimate overview prefixes billing-period totals containing priced services, and each service breakdown, with “From”. Filters affect the visible list only; checkout includes every cart item. Mobile keeps checkout and a direct estimate link available.

Each service item has a “View service features” disclosure. Bundles group the features under each selected service; individual and family plans show the published scope for Focus, Connected or Partnership. The cart and Services page share `src/reference/service-catalog.js`, so existing saved selections resolve current features without being added again. Unrecognized service IDs show a confirmation message instead of invented feature details.

Service and family plan comparisons offer 1-, 3-, 6- and 12-month durations above the cards. The selected term appears on each plan, persists in its configuration URL and is included in cart and checkout data. Edit selection restores the saved duration. Different durations remain distinct cart configurations. Monthly rates and project estimates retain their published amounts; existing selections keep their saved duration.

Department comparisons with multiple services also offer Filter by service. Choose the department overview or a specific service; all three cards update their scope, features and cart selection without changing the duration or published prices. The plan-service query parameter preserves the filter on refresh and when reopening Edit plan from the cart. Single-service departments and service-detail comparisons retain their fixed scope.

Plan cards display a calendar period tag, explicit per-month or per-project pricing, and the estimated full-period amount for monthly plans. Saved service periods are also highlighted in the cart, where multi-month estimates appear above the feature disclosure. These totals use the existing monthly rate; project estimates are not multiplied by duration.

The bundle builder filters service choices by department while retaining all selections. Counts identify selected services in other departments, and quick-start bundles return the filter to All. Both individual plans and bundles carry a numeric service period.

The builder begins with Choose how we work, then Pick your services. Duration and department filters sit above the service choices in that second step. The visible and keyboard order follow the same sequence.

Every service cart row uses the builder's shared native duration radios, saving immediately without navigation. Each row has its own labelled radio group. It updates the item, edit URL and checkout payload while retaining its scope, billing and price. Changing to an already-saved configuration combines the selections; Undo restores the original cart, including both items when combined. Older selections retain their current wording and have no numeric term selected until a duration is chosen. Software periods are edited through their existing configurator.

Cart services follow the builder's configuration order: How we work, Service duration and Selected services. Department labels come from the shared catalogue, with the complete selected scope visible before opening features. Edit in builder restores a bundle's work type, period and services; individual selections offer Edit plan. Work type is shown for review and changed through the existing configurator.

“Edit selection” opens the existing configuration with “Save changes” actions. The original stays in the cart until saving replaces it in place, without duplicating an already selected configuration. Cancel returns to the unchanged cart. Editing is temporary and ends on leaving that service/software page. Cart removal and confirmed clear-all actions show inline feedback with undo for the latest action. “Keep items” cancels the clear-all confirmation and returns focus to “Clear cart”. Navigation dismisses feedback; cart contents remain saved.

`/checkout` carries the selected items into a contact form for name, email, phone, company and project notes. Name and a valid email are required. Submitting creates a clearly labelled local enquiry preview; no payment, server request or contact-data storage occurs. The cart stays available because this preview does not deliver an enquiry.

The future CMS integration starts at `src/reference/checkout-enquiry.js`: `createCheckoutEnquiry(items, values)` returns a versioned payload containing the customer, message, item IDs and selections, plan, duration and estimates. Connect delivery in the checkout submit handler when the CMS endpoint is available. The CMS must validate selections against its catalog and calculate commercial prices itself; client estimates are for presentation only. Add pending, failure/retry and actual-success states when connecting that endpoint.

Previous source remains available in Git history. Planning documents outside this folder describe earlier iterations and are not the current visual specification.

## Browser verification

`tools/verify.cjs`, `tools/interactions.cjs`, and `tools/capture.cjs` use Playwright and connect to a local browser debugging endpoint at port 9222. Set `PLAYWRIGHT_MODULE_PATH` to the available Playwright package when it is provided by the workspace runtime. These are development checks, not production dependencies. See `design-qa.md` for the actual coverage and build status.

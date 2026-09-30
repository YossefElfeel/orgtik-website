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

Adding an item shows a dismissible selection preview with its scope, estimate and cart/checkout actions. Added configurations show a “View in cart” action on both service and software pages. The cart provides All items/Software/Services filters, expandable scope details, and an estimate breakdown by billing type and category. The cart estimate overview prefixes billing-period totals containing priced services, and each service breakdown, with “From”. Filters affect the visible list only; checkout includes every cart item. Mobile keeps checkout and a direct estimate link available.

Each service item has a “View service features” disclosure. Bundles group the features under each selected service; individual and family plans show the published scope for Focus, Connected or Partnership. The cart and Services page share `src/reference/service-catalog.js`, so existing saved selections resolve current features without being added again. Unrecognized service IDs show a confirmation message instead of invented feature details.

“Edit selection” opens the existing configuration with “Save changes” actions. The original stays in the cart until saving replaces it in place, without duplicating an already selected configuration. Cancel returns to the unchanged cart. Editing is temporary and ends on leaving that service/software page. Cart removal and confirmed clear-all actions show inline feedback with undo for the latest action. “Keep items” cancels the clear-all confirmation and returns focus to “Clear cart”. Navigation dismisses feedback; cart contents remain saved.

`/checkout` carries the selected items into a contact form for name, email, phone, company and project notes. Name and a valid email are required. Submitting creates a clearly labelled local enquiry preview; no payment, server request or contact-data storage occurs. The cart stays available because this preview does not deliver an enquiry.

The future CMS integration starts at `src/reference/checkout-enquiry.js`: `createCheckoutEnquiry(items, values)` returns a versioned payload containing the customer, message, item IDs and selections, plan, duration and estimates. Connect delivery in the checkout submit handler when the CMS endpoint is available. The CMS must validate selections against its catalog and calculate commercial prices itself; client estimates are for presentation only. Add pending, failure/retry and actual-success states when connecting that endpoint.

Previous source remains available in Git history. Planning documents outside this folder describe earlier iterations and are not the current visual specification.

## Browser verification

`tools/verify.cjs`, `tools/interactions.cjs`, and `tools/capture.cjs` use Playwright and connect to a local browser debugging endpoint at port 9222. Set `PLAYWRIGHT_MODULE_PATH` to the available Playwright package when it is provided by the workspace runtime. These are development checks, not production dependencies. See `design-qa.md` for the actual coverage and build status.

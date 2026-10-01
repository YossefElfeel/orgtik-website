# Purchasing prototype

The journey is `/plans` or a service/software page → builder → `/cart` → `/checkout` → CRM handoff preview. Services and software have separate builders and share one cart. Hosting is an external purchase at https://orgtik.ch.

## Architecture

- `src/reference/purchase-catalog.js`: approved sample prices, stable catalog IDs, bundle templates, URL compatibility, migration, and one integer-minor-unit pricing implementation.
- `PurchaseUI.jsx` / `PurchaseControls.jsx` / `purchase.css`: shared bundle, duration, configuration, pricing, dialog, and notification components.
- `purchase-store.js`: cart v2, migration, explicit overlap choices, content replacement, persistence, and Undo.
- `PurchasePlans.jsx`, `PurchaseCart.jsx`, `PurchaseCheckout.jsx`: discovery, review, payment, and confirmation. Existing Services/Software page shells retain their content and visual system.
- `purchase-adapter.js`: deterministic mock payment and CRM integration boundary. No network, email, actual accounts, invoices, or card fields.

Prices are editable sample CHF monthly amounts. Duration savings are 0%, 5%, 10%, 15% for 1/3/6/12 months. Group savings are 0%, 5%, 10%, 15% for 1/2/3–4/5+ distinct items. Each line uses the larger rate; ties are duration savings. Round its full-period amount once, sum line totals, and derive monthly equivalents from those payable totals. Taxes are unconfigured. Advertising management excludes media spend.

## Storage and legacy links

`orgtik.cart.v2` in localStorage contains configurations and migration messages. The original `orgtik.cart.v1` remains intact; migration also attempts to write `orgtik.cart.v1.backup`. Each migrated group requires review, even where its duration is valid. Old project or 24-month terms require explicit selection. Hosting is removed with an external-link notice. Blocked storage still permits an in-memory cart.

Builder links preserve `services` or `modules`, shared `duration`, line-level `terms`, `renew`, and `bundle`. Software legacy `module`, `mode`, monthly/annual/biennial terms, and `#/plans/...` links retain valid scope; service `plan-service` links retain the chosen service. Obsolete tier choices no longer affect scope or price.

`orgtik.purchase-preview.v1` in sessionStorage stores an immutable preview receipt and CRM setup status. It excludes customer details and always restores account access as unverified. A new populated cart starts a new checkout. Payment failures preserve cart configuration; success removes the paid groups and cannot be undone into another charge.

## CRM integration contract

`createCRMHandoffRequest(order, customer, verified)` produces:

```
{
  purchaseReference,
  customerContext: { name, email, company, verified } | null,
  purchases: [{ id, name, kind, lines: [
    { catalogId, name, months, autoRenew, monthlyMinor,
      subtotal, total, saving, discount, reason, activation }
  ] }],
  amounts: { subtotal, saving, total, monthlyEquivalent, valid },
  currency: "CHF"
}
```

`provisionCRM` returns `{ purchaseReference, status, access, destination }`. Ready setup is idempotent for its purchase reference. Failed/pending setup may retry independently of payment. A refresh retry can omit customer context: a production backend would retrieve it by the authenticated purchase reference, never browser claims.

Production must confirm payment through the payment backend, calculate authoritative prices, create/associate the verified CRM customer, associate order/payment/invoice records, and initiate account access. The mock's browser flags are demonstration data, never production payment or authentication evidence.

Set `VITE_CRM_PORTAL_URL` to the supplied HTTPS portal destination and restart Vite when ready. With no destination, account actions open an explicit handoff preview. The guest preview requires simulated email ownership verification before account access and never looks up or discloses whether an email has an existing account. Demo sign-in represents a verified returning customer. No identity persists on refresh.

Software activation is `active-preview`; services are `awaiting-onboarding`, with the period not started. Real onboarding, password setup, invoices, payment history, and dashboards remain in the CRM project.

## Validation

The latest UI review is documented in [qa/journey-review/README.md](qa/journey-review/README.md), including before/after captures. The [initial purchasing acceptance pass](qa/purchasing/README.md) covers the wider legacy-link and migration scenarios.

The cart's content editor previews its draft price and requires Save or Cancel before checkout. Duration and renewal changes outside that editor still save immediately with Undo. Mobile purchase actions remain reachable while scrolling; checkout displays its expandable order review before billing.

Run `npm run test:cart`, `npm run format:check`, and `npm run build`. Unit tests cover all catalog subsets/duration combinations, discount thresholds/ties/rounding, mixed groups, overlap resolution, edits/Undo/persistence, legacy migration and invalid terms, payment retry/idempotency, CRM recovery, activation, and identity-free receipt restoration.

Browser scenarios:

1. Customize a bundle, override one duration, cancel/accept shared replacement, filter without losing selections, and add to cart.
2. Edit contents, cancel, save, reload; change duration and renewal, then Undo. Add an overlapping bundle and exercise both explicit choices.
3. Add software to the same cart. Inspect directory, department, and individual package prices; follow legacy entry links. Verify Hosting has only its external action.
4. Continue as guest, check name/email validation, choose declined/cancelled demo outcomes, and retry with the same cart.
5. Pay successfully with CRM failed or pending; refresh confirmation and retry account setup without paying. Verify guest email handoff and returning demo customer access.
6. Inspect 320, 390, 768, and 1440px layouts, keyboard controls, dialog Escape/focus return, live total announcements, and browser errors.

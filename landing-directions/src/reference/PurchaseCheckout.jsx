import React, { useState, useRef, useEffect } from "react";
import { CommerceLayout } from "./CommerceLayout";
import {
  useCart,
  completeCartPurchase,
  dismissCartNotice,
} from "./purchase-store.js";
import {
  quoteCart,
  money,
  termLabel,
  CRM_PORTAL_URL,
} from "./purchase-catalog.js";
import { QuoteSummary, PreviewNote, OrderContents } from "./PurchaseUI";
import { EmptyPurchaseCart } from "./PurchaseCart";
import { PurchaseAction, PurchaseDialog } from "./PurchaseControls";
import {
  simulatePayment,
  provisionCRM,
  validateCustomer,
  savePurchaseSession,
  loadPurchaseSession,
  clearPurchaseSession,
} from "./purchase-adapter.js";

function Confirmation({ order, crm, onCRM, verified, onRestart }) {
  const [busy, setBusy] = useState(false);
  const [handoff, setHandoff] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const heading = useRef(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);
  const retry = async () => {
    if (busy) return;
    setBusy(true);
    try {
      onCRM(await provisionCRM(order, { scenario: "ready", verified }));
    } finally {
      setBusy(false);
    }
  };
  let portal = null;
  try {
    const url = new URL(CRM_PORTAL_URL);
    if (url.protocol === "https:") portal = url.href;
  } catch {}
  return (
    <div className="purchase-confirmation">
      <section className="purchase-checkout-panel">
        <span className="purchase-confirmed">
          <i className="ph ph-check-circle" aria-hidden="true" /> Payment
          confirmed in preview
        </span>
        <h2 ref={heading} tabIndex={-1}>
          Access your customer account.
        </h2>
        <p>
          Demo order <strong>{order.reference}</strong> ·{" "}
          {money(order.quote.total)} paid in the preview. No real charge was
          made.
        </p>
        <div className="purchase-alert" role="status">
          <strong>
            {crm.status === "ready"
              ? "Your account access is ready."
              : crm.status === "failed"
                ? "Payment succeeded. Account setup needs another try."
                : "Payment succeeded. We’re preparing account access."}
          </strong>
          <p>
            {crm.status === "ready"
              ? "View purchases, payments, and invoices in your OrgTik customer account."
              : "Your purchase is saved. You will not be asked to pay again."}
          </p>
        </div>
        {crm.status === "ready" ? (
          <PurchaseAction onClick={() => setHandoff(true)}>
            {crm.access === "verified-existing"
              ? "Go to my account"
              : "Set up my account"}
          </PurchaseAction>
        ) : (
          <PurchaseAction onClick={retry} disabled={busy}>
            {busy
              ? "Preparing account…"
              : crm.status === "failed"
                ? "Retry account setup"
                : "Check account setup"}
          </PurchaseAction>
        )}
        <p className="purchase-caption">
          Software activates after payment. Service periods begin after
          onboarding confirms activation in the CRM.
        </p>
      </section>
      <section className="purchase-checkout-panel">
        <h2>Your purchase</h2>
        <table className="purchase-receipt">
          <thead>
            <tr>
              <th>Package and duration</th>
              <th>Paid upfront</th>
            </tr>
          </thead>
          <tbody>
            {order.groups.flatMap((g) =>
              g.lines.map((line) => (
                <tr key={`${g.id}:${line.catalogId}`}>
                  <td>
                    {line.name}
                    <small>
                      {termLabel(line.months)} ·{" "}
                      {line.autoRenew ? "Auto-renewal on" : "Manual renewal"}
                    </small>
                    <small>
                      {line.activation === "active-preview"
                        ? "Active in preview"
                        : "Awaiting onboarding — period not started"}
                    </small>
                    {line.autoRenew && (
                      <small>
                        Renews for {termLabel(line.months)} at{" "}
                        {money(line.total)} in the preview
                      </small>
                    )}
                  </td>
                  <td>
                    {money(line.total)}
                    <small>
                      {line.discount}% {line.reason} saving
                    </small>
                  </td>
                </tr>
              )),
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Total paid in preview</th>
              <th>{money(order.quote.total)}</th>
            </tr>
          </tfoot>
        </table>
        <p>
          Invoices and payment history will be available in the CRM. No real
          invoice was generated.
        </p>
        <button
          type="button"
          className="purchase-text-button"
          onClick={onRestart}
        >
          Continue browsing
        </button>
      </section>
      <PurchaseDialog
        open={handoff}
        title="Your CRM account"
        onClose={() => setHandoff(false)}
      >
        <span className="purchase-eyebrow">Handoff preview</span>
        <p>
          {verified || emailVerified
            ? "Demo identity verified. In production, the CRM opens your customer account with your purchases, payments, and invoices."
            : "The CRM verifies your email before granting access. A new customer sets up their account; an existing customer securely accesses their current account."}
        </p>
        <p>No email was sent and no real account was created.</p>
        {!verified && !emailVerified ? (
          <PurchaseAction onClick={() => setEmailVerified(true)}>
            Simulate email verification
          </PurchaseAction>
        ) : portal ? (
          <PurchaseAction href={portal}>Continue to CRM</PurchaseAction>
        ) : (
          <div className="purchase-alert">
            Account access verified in the preview. The CRM portal destination
            will be configured before the live integration.
          </div>
        )}
      </PurchaseDialog>
    </div>
  );
}
export default function PurchaseCheckout() {
  const { items } = useCart();
  const [saved] = useState(() => (items.length ? null : loadPurchaseSession()));
  const [order, setOrder] = useState(saved?.order || null);
  const [crm, setCRM] = useState(
    saved?.crm || { status: "pending", access: "verification-required" },
  );
  const [channel, setChannel] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [outcome, setOutcome] = useState("success");
  const [crmScenario, setCRMScenario] = useState("ready");
  const [sessionSaved, setSessionSaved] = useState(true);
  const busy = useRef(false);
  const controller = useRef(null);
  const attempt = useRef(null);
  const form = useRef(null);
  const panel = useRef(null);
  const previousChannel = useRef({ channel, verified });
  useEffect(() => {
    if (
      previousChannel.current.channel !== channel ||
      previousChannel.current.verified !== verified
    )
      (
        form.current?.elements.name || panel.current?.querySelector("button")
      )?.focus();
    previousChannel.current = { channel, verified };
  }, [channel, verified]);
  useEffect(() => () => controller.current?.abort(), []);
  const updateCRM = (value) => {
    setCRM(value);
    if (order) setSessionSaved(savePurchaseSession(order, value));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (busy.current) return;
    const problems = validateCustomer(customer);
    setErrors(problems);
    setError("");
    if (Object.keys(problems).length) {
      form.current?.elements[Object.keys(problems)[0]]?.focus();
      return;
    }
    if (!quoteCart(items).valid) {
      setError("Return to the cart and review your selection.");
      return;
    }
    busy.current = true;
    setProcessing(true);
    controller.current = new AbortController();
    attempt.current ||= `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    try {
      const purchase = await simulatePayment({
        groups: items,
        customer,
        reference: attempt.current,
        outcome,
        signal: controller.current.signal,
      });
      const pending = {
        status: "pending",
        access: verified ? "verified-existing" : "verification-required",
      };
      setOrder(purchase);
      setCRM(pending);
      setSessionSaved(savePurchaseSession(purchase, pending));
      completeCartPurchase(purchase.groups.map((g) => g.id));
      dismissCartNotice();
      const setup = await provisionCRM(purchase, {
        scenario: crmScenario,
        verified,
        customer,
      });
      setCRM(setup);
      setSessionSaved(savePurchaseSession(purchase, setup));
    } catch (problem) {
      setError(
        problem.message === "cancelled"
          ? "Payment cancelled. Your cart has been kept."
          : problem.message,
      );
    } finally {
      busy.current = false;
      setProcessing(false);
    }
  };
  const field = (id, label, type = "text", required = true) => (
    <label key={id}>
      {label}
      {required ? " *" : " (optional)"}
      <input
        name={id}
        type={type}
        maxLength={id === "email" ? 254 : 200}
        autoComplete={id === "company" ? "organization" : id}
        value={customer[id]}
        readOnly={verified && id === "email"}
        onChange={(e) => {
          setCustomer({ ...customer, [id]: e.target.value });
          if (id === "email") setVerified(false);
        }}
        required={required}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `payment-${id}-error` : undefined}
      />
      {errors[id] && (
        <span className="purchase-error" id={`payment-${id}-error`}>
          {errors[id]}
        </span>
      )}
    </label>
  );
  return (
    <CommerceLayout checkout complete={!!order}>
      <div className="purchase-surface">
        <div className="commerce-intro">
          <span className="purchase-eyebrow">
            {order ? "Your purchase" : "The next step"}
          </span>
          <h1>
            {order ? "Purchase confirmed." : "Checkout."}
            {!order && <span>One last step.</span>}
          </h1>
          <p>
            {order
              ? "Your payment is complete. Continue to your account for purchases, payments, and invoices."
              : "Pay for your selected periods upfront. Manage purchases, payments, and invoices in your OrgTik account."}
          </p>
        </div>
        {!sessionSaved && (
          <p className="purchase-alert">
            This browser cannot retain the preview receipt. Keep this tab open
            to review your confirmation.
          </p>
        )}
        {order ? (
          <Confirmation
            order={order}
            crm={crm}
            onCRM={updateCRM}
            verified={verified}
            onRestart={() => {
              clearPurchaseSession();
              window.__orgNav?.("/plans");
            }}
          />
        ) : !items.length ? (
          <EmptyPurchaseCart />
        ) : (
          <div className="purchase-layout purchase-checkout-layout">
            <details className="purchase-mobile-order">
              <summary>
                <span>
                  Review your order ·{" "}
                  {items.reduce((n, g) => n + g.lines.length, 0)} items
                  <strong>{money(quoteCart(items).total)} due today</strong>
                </span>
                <i className="ph ph-caret-down" aria-hidden="true" />
              </summary>
              <OrderContents groups={items} />
              <p>
                Full selected periods paid upfront. You save{" "}
                {money(quoteCart(items).saving)}. Tax calculation is not
                configured in this prototype.
              </p>
              <a href="/cart">Edit your selection</a>
            </details>
            <section ref={panel} className="purchase-checkout-panel">
              {!channel ? (
                <>
                  <h2>How would you like to continue?</h2>
                  <p>
                    Your purchase includes an OrgTik customer account where you
                    can view purchases, payments, and invoices.
                  </p>
                  <div className="purchase-dialog__actions">
                    <PurchaseAction onClick={() => setChannel("guest")}>
                      Continue as guest
                    </PurchaseAction>
                    <PurchaseAction
                      secondary
                      onClick={() => setChannel("signin")}
                    >
                      Sign in
                    </PurchaseAction>
                  </div>
                </>
              ) : channel === "signin" && !verified ? (
                <>
                  <h2>Sign in to your account</h2>
                  <p>
                    This is a local sign-in preview. Use the demo account to
                    return to checkout; no password or real credentials are
                    needed.
                  </p>
                  <PurchaseAction
                    onClick={() => {
                      setVerified(true);
                      setCustomer({
                        name: "Demo Customer",
                        email: "customer@example.test",
                        company: "",
                      });
                    }}
                  >
                    Use demo account
                  </PurchaseAction>
                  <button
                    className="purchase-text-button"
                    type="button"
                    onClick={() => setChannel("guest")}
                  >
                    Continue as guest instead
                  </button>
                </>
              ) : (
                <form
                  ref={form}
                  onSubmit={submit}
                  noValidate
                  aria-busy={processing}
                >
                  <div className="purchase-toolbar">
                    <h2>{verified ? "Welcome back." : "Billing details"}</h2>
                    <button
                      type="button"
                      disabled={processing}
                      onClick={() => {
                        setChannel("");
                        setVerified(false);
                      }}
                    >
                      Change checkout choice
                    </button>
                  </div>
                  <p>
                    {verified
                      ? "Demo account verified. Your purchase will be associated with your existing CRM account."
                      : "Your purchase includes an OrgTik customer account where you can view purchases, payments, and invoices. Account access is set up after payment."}
                  </p>
                  <fieldset
                    disabled={processing}
                    className="purchase-billing-fields"
                  >
                    <div className="purchase-fields">
                      {field("name", "Full name")}
                      {field("email", "Email address", "email")}
                      <details className="purchase-company">
                        <summary>Add company details (optional)</summary>
                        {field("company", "Company", "text", false)}
                      </details>
                    </div>
                  </fieldset>
                  <div className="purchase-payment-method">
                    <i className="ph ph-credit-card" aria-hidden="true" />
                    <div>
                      <strong>Demo payment method</strong>
                      <p>No card details required. No real charge.</p>
                    </div>
                  </div>
                  {error && (
                    <p className="purchase-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={processing || !quoteCart(items).valid}
                    className="commerce-action purchase-action"
                  >
                    <span>
                      {processing
                        ? "Processing demo payment…"
                        : `Pay ${money(quoteCart(items).total)}`}
                    </span>
                    <span className="commerce-action__arrow">
                      <i className="ph ph-lock-simple" aria-hidden="true" />
                    </span>
                  </button>
                  {processing && (
                    <button
                      type="button"
                      className="purchase-text-button"
                      onClick={() => controller.current?.abort()}
                    >
                      Cancel payment
                    </button>
                  )}
                  {!quoteCart(items).valid && (
                    <p className="purchase-error">
                      Your selection needs review.{" "}
                      <a href="/cart">Return to cart</a>.
                    </p>
                  )}
                  <details className="purchase-demo-controls">
                    <summary>Preview payment and account states</summary>
                    <div className="purchase-fields">
                      <label>
                        Payment result
                        <select
                          disabled={processing}
                          value={outcome}
                          onChange={(e) => setOutcome(e.target.value)}
                        >
                          <option value="success">Successful payment</option>
                          <option value="declined">Declined payment</option>
                          <option value="cancelled">Cancelled payment</option>
                        </select>
                      </label>
                      <label>
                        CRM setup result
                        <select
                          disabled={processing}
                          value={crmScenario}
                          onChange={(e) => setCRMScenario(e.target.value)}
                        >
                          <option value="ready">Account ready</option>
                          <option value="pending">Setup pending</option>
                          <option value="failed">Setup failed</option>
                        </select>
                      </label>
                    </div>
                  </details>
                </form>
              )}
            </section>
            <QuoteSummary groups={items} title="Your order">
              <OrderContents groups={items} />
              <a href="/cart">Edit your selection</a>
            </QuoteSummary>
          </div>
        )}
        <PreviewNote />
      </div>
    </CommerceLayout>
  );
}

import React from "react";
import { cartTotals, formatCHF, formatItemEstimate } from "./cart-store";

export function CartSummary({
  items,
  children,
  showItems = false,
  cart = false,
}) {
  const totals = cartTotals(items);
  if (cart)
    return (
      <aside
        id="cart-estimate"
        className="commerce-summary cart-estimate"
        aria-label="Selection summary"
      >
        <h2>Estimate overview</h2>
        <p>
          All {items.length} {items.length === 1 ? "item is" : "items are"}{" "}
          included
        </p>
        <div className="cart-estimate__totals">
          {[
            {
              billing: "monthly",
              label: "Monthly estimate",
              suffix: "/ month",
              total: totals.monthly,
            },
            {
              billing: "project",
              label: "Project estimate",
              suffix: "one-off",
              total: totals.project,
            },
          ].map((period) => {
            const selected = items.filter(
              (item) =>
                item.billing === period.billing && item.estimate !== null,
            );
            if (!selected.length) return null;
            return (
              <section
                className="cart-estimate__period"
                key={period.billing}
                aria-label={period.label}
              >
                <dl>
                  <dt>{period.label}</dt>
                  <dd>
                    {selected.some((item) => item.kind === "service") && (
                      <small>From</small>
                    )}
                    {formatCHF(period.total)}
                    <span>{period.suffix}</span>
                  </dd>
                </dl>
                <ul>
                  {[
                    { kind: "software", label: "Software" },
                    { kind: "service", label: "Services" },
                  ].map((group) => {
                    const entries = selected.filter(
                      (item) => item.kind === group.kind,
                    );
                    return entries.length ? (
                      <li key={group.kind}>
                        <span>
                          {group.label}
                          <small>
                            {entries.length}{" "}
                            {entries.length === 1 ? "item" : "items"}
                          </small>
                        </span>
                        <b>
                          {group.kind === "service" && "From "}
                          {formatCHF(
                            entries.reduce(
                              (sum, item) => sum + item.estimate,
                              0,
                            ),
                          )}
                        </b>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            );
          })}
          {totals.onRequest && (
            <div className="cart-estimate__request">
              <span>Items priced on request</span>
              <strong>
                {items.filter((item) => item.estimate === null).length}
              </strong>
            </div>
          )}
        </div>
        {children}
        <p className="cart-estimate__note">
          Preview estimates. Final scope, pricing, taxes and terms will be
          confirmed with the team.
        </p>
      </aside>
    );
  return (
    <aside className="commerce-summary" aria-label="Selection summary">
      <h2>Your selection</h2>
      <p>
        {items.length} {items.length === 1 ? "item" : "items"} to discuss with
        OrgTik
      </p>
      {showItems && (
        <ul className="commerce-summary__items">
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <span>
                {item.selections.map((selection) => selection.name).join(", ")}
              </span>
              <span>{item.duration}</span>
              <span>{formatItemEstimate(item)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="commerce-totals">
        {items.some(
          (item) => item.billing === "monthly" && item.estimate !== null,
        ) && (
          <div>
            <dt>Monthly estimate</dt>
            <dd>
              {formatCHF(totals.monthly)}
              <small> / month</small>
            </dd>
          </div>
        )}
        {items.some(
          (item) => item.billing === "project" && item.estimate !== null,
        ) && (
          <div>
            <dt>Project estimate</dt>
            <dd>From {formatCHF(totals.project)}</dd>
          </div>
        )}
        {totals.onRequest && (
          <div>
            <dt>Additional items</dt>
            <dd>On request</dd>
          </div>
        )}
      </dl>
      <p className="commerce-summary__note">
        Prototype estimates. Final scope, pricing, taxes and terms will be
        confirmed with the team. Nothing is charged at checkout.
      </p>
      {children}
    </aside>
  );
}

export function EmptyCart({ checkout = false }) {
  return (
    <div className="commerce-empty">
      <i className="ph ph-shopping-cart" aria-hidden="true" />
      <h2>
        {checkout ? "Choose something to get started." : "Your cart is empty."}
      </h2>
      <p>
        Add a service bundle or software plan to your cart, then share your
        contact details with your selection.
      </p>
      <div className="commerce-empty__actions">
        <a href="/services#svc-builder" className="commerce-action">
          Explore service bundles{" "}
          <span className="commerce-action__arrow">
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </span>
        </a>
        <a
          href="/software#plan-builder"
          className="commerce-action commerce-action--secondary"
        >
          Explore software plans{" "}
          <span className="commerce-action__arrow">
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  );
}

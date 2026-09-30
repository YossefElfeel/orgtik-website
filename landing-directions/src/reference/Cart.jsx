import React, { useEffect, useRef, useState } from "react";
import { CommerceLayout } from "./CommerceLayout";
import { CartSummary, EmptyCart } from "./CartSummary";
import { getServiceFeatures } from "./service-catalog";
import {
  beginCartEdit,
  cancelCartEdit,
  clearCart,
  dismissCartNotice,
  formatCHF,
  removeCartItem,
  undoCartRemoval,
  useCart,
} from "./cart-store";
import "./cart.css";

function CartItem({ item }) {
  const name =
    item.plan && item.name.endsWith(` · ${item.plan}`)
      ? item.name.slice(0, -(item.plan.length + 3))
      : item.name;
  const scope = item.kind === "software" ? "product" : "service";
  return (
    <li className="cart-row" id={`cart-item-${encodeURIComponent(item.id)}`}>
      <div className="cart-row__main">
        <span className="cart-row__icon" aria-hidden="true">
          <i
            className={`ph ${item.kind === "software" ? "ph-circles-three-plus" : "ph-stack"}`}
          />
        </span>
        <div className="cart-row__identity">
          <h3>{name}</h3>
          <p className="cart-row__meta">
            {item.plan && <strong>{item.plan}</strong>}
            <span>{item.duration}</span>
          </p>
        </div>
        <div className="cart-row__estimate">
          {item.estimate === null ? (
            <strong>On request</strong>
          ) : (
            <>
              <strong>
                {item.kind === "service" && <small>From </small>}
                {formatCHF(item.estimate)}
              </strong>
              <span>
                {item.billing === "monthly" ? "per month" : "per project"}
              </span>
            </>
          )}
        </div>
      </div>
      <details className="cart-row__details">
        <summary
          aria-label={
            item.kind === "service"
              ? `View service features in ${item.name}`
              : `Included products in ${item.name}`
          }
        >
          <span>
            <b>
              {item.kind === "service"
                ? "View service features"
                : `${item.selections.length} product${item.selections.length !== 1 ? "s" : ""} included`}
            </b>
            <span className="cart-row__preview">
              {item.kind === "service" &&
                `${item.selections.length} ${scope}${item.selections.length !== 1 ? "s" : ""} · `}
              {item.selections
                .slice(0, 3)
                .map((selection) => selection.name)
                .join(", ")}
              {item.selections.length > 3 &&
                ` + ${item.selections.length - 3} more`}
            </span>
          </span>
          <i className="ph ph-caret-down" aria-hidden="true" />
        </summary>
        <div className="cart-row__expanded">
          {item.kind === "service" ? (
            <div className="cart-service-features">
              {item.selections.map((selection) => {
                const features = getServiceFeatures(selection.id, item.plan);
                return (
                  <section
                    key={selection.id}
                    aria-label={`Features of ${selection.name}`}
                  >
                    <h4>{selection.name}</h4>
                    {features.length ? (
                      <ul>
                        {features.map((feature) => (
                          <li key={feature}>
                            <i className="ph ph-check" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Feature details will be confirmed with the team.</p>
                    )}
                  </section>
                );
              })}
            </div>
          ) : (
            <ul>
              {item.selections.map((selection) => (
                <li key={selection.id}>
                  <i className="ph ph-check" aria-hidden="true" />
                  {selection.name}
                </li>
              ))}
            </ul>
          )}
          {item.billing === "monthly" && item.commitmentMonths > 1 && (
            <p>
              {item.commitmentMonths}-month duration
              {item.estimate !== null &&
                ` · ${formatCHF(item.estimate * item.commitmentMonths)} estimated over the full duration`}
            </p>
          )}
        </div>
      </details>
      <div className="cart-row__actions">
        <a
          href={item.sourceHref}
          onClick={(event) => {
            if (
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey &&
              event.button === 0
            )
              beginCartEdit(item.id);
          }}
          aria-label={`Edit ${item.name}`}
        >
          <i className="ph ph-pencil-simple" aria-hidden="true" /> Edit
          selection
        </a>
        <button
          type="button"
          aria-label={`Remove ${item.name}`}
          onClick={() => {
            removeCartItem(item.id);
            requestAnimationFrame(() =>
              document.getElementById("cart-undo-removal")?.focus(),
            );
          }}
        >
          <i className="ph ph-trash" aria-hidden="true" /> Remove
        </button>
      </div>
    </li>
  );
}

function CartActivity({ notice }) {
  const activityRef = useRef(null);
  useEffect(() => {
    if (!notice) return;
    const keydown = (event) => {
      if (event.key !== "Escape") return;
      const focusedInside = activityRef.current?.contains(
        document.activeElement,
      );
      dismissCartNotice();
      if (focusedInside) document.getElementById("cart-title")?.focus();
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [notice]);
  if (!notice) return null;
  const canUndo = ["removed", "cleared"].includes(notice.type);
  return (
    <div className="cart-activity" ref={activityRef}>
      <i
        className={`ph ${canUndo ? "ph-trash" : "ph-check-circle"}`}
        aria-hidden="true"
      />
      <p role="status">{notice.text}</p>
      {canUndo && (
        <button
          id="cart-undo-removal"
          type="button"
          onClick={() => {
            undoCartRemoval();
            requestAnimationFrame(() => {
              const target = notice.item
                ? document
                    .getElementById(
                      `cart-item-${encodeURIComponent(notice.item.id)}`,
                    )
                    ?.querySelector("button")
                : document.getElementById("cart-title");
              target?.focus();
            });
          }}
        >
          Undo
        </button>
      )}
      <button
        className="cart-activity__dismiss"
        type="button"
        aria-label="Dismiss cart update"
        onClick={() => {
          const focusedInside = activityRef.current?.contains(
            document.activeElement,
          );
          dismissCartNotice();
          if (focusedInside) document.getElementById("cart-title")?.focus();
        }}
      >
        <i className="ph ph-x" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function Cart() {
  const { items, persistent, notice } = useCart();
  const [filter, setFilter] = useState("all");
  const [confirmClear, setConfirmClear] = useState(false);
  const clearButtonRef = useRef(null);
  useEffect(() => {
    cancelCartEdit();
  }, []);
  useEffect(() => {
    setConfirmClear(false);
  }, [items]);
  const groups = [
    { kind: "software", label: "Software", href: "/software#plan-builder" },
    { kind: "service", label: "Services", href: "/services#svc-builder" },
  ];
  const visibleGroups = groups.filter(
    (group) => filter === "all" || filter === group.kind,
  );
  const visibleCount = items.filter(
    (item) => filter === "all" || item.kind === filter,
  ).length;
  return (
    <CommerceLayout className="commerce-page--cart">
      <div className="cart-heading">
        <div>
          <h1 id="cart-title" tabIndex={-1}>
            Your cart <span>{items.length}</span>
          </h1>
          <p>Your services and software, ready for the next conversation.</p>
        </div>
        <a href="/services" className="cart-back-link">
          <i className="ph ph-arrow-left" aria-hidden="true" /> Continue
          exploring
        </a>
      </div>
      <CartActivity notice={notice} />
      {!items.length ? (
        <EmptyCart />
      ) : (
        <>
          <div className="cart-workspace">
            <section className="cart-selection" aria-label="Cart items">
              <div className="cart-toolbar">
                <div
                  className="cart-filters"
                  role="group"
                  aria-label="Filter cart items"
                >
                  {[{ kind: "all", label: "All items" }, ...groups].map(
                    (group) => {
                      const count = items.filter(
                        (item) =>
                          group.kind === "all" || item.kind === group.kind,
                      ).length;
                      return (
                        <button
                          type="button"
                          key={group.kind}
                          aria-pressed={filter === group.kind}
                          onClick={() => setFilter(group.kind)}
                        >
                          {group.label}
                          <span>{count}</span>
                        </button>
                      );
                    },
                  )}
                </div>
                <button
                  ref={clearButtonRef}
                  className="cart-clear"
                  type="button"
                  onClick={() => setConfirmClear(!confirmClear)}
                  aria-expanded={confirmClear}
                >
                  <i className="ph ph-trash" aria-hidden="true" /> Clear cart
                </button>
              </div>
              {confirmClear && (
                <div className="cart-clear-confirm">
                  <p>Remove all {items.length} items? You can undo this.</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        requestAnimationFrame(() =>
                          document.getElementById("cart-undo-removal")?.focus(),
                        );
                      }}
                    >
                      Clear all items
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmClear(false);
                        clearButtonRef.current?.focus();
                      }}
                    >
                      Keep items
                    </button>
                  </div>
                </div>
              )}
              <div className="cart-list">
                <div className="cart-list__heading">
                  <h2>Review your selection</h2>
                  <span>
                    <i
                      className={`ph ${persistent ? "ph-check-circle" : "ph-info"}`}
                      aria-hidden="true"
                    />
                    {persistent
                      ? "Saved on this device"
                      : "Saved for this visit"}
                  </span>
                </div>
                {visibleGroups.map((group) => {
                  const selected = items.filter(
                    (item) => item.kind === group.kind,
                  );
                  if (!selected.length) return null;
                  return (
                    <section
                      className="cart-category"
                      key={group.kind}
                      aria-label={`${group.label} selections`}
                    >
                      <div className="cart-category__heading">
                        <h2>
                          {group.label}
                          <span>{selected.length}</span>
                        </h2>
                        <a href={group.href}>
                          Add {group.label.toLowerCase()}
                          <i className="ph ph-plus" aria-hidden="true" />
                        </a>
                      </div>
                      <ul>
                        {selected.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </ul>
                    </section>
                  );
                })}
                {!visibleCount && (
                  <div className="cart-filter-empty">
                    <h3>
                      No {filter === "software" ? "software" : "services"} in
                      your cart yet.
                    </h3>
                    <p>Explore the options or return to your selected items.</p>
                    <a
                      href={groups.find((group) => group.kind === filter)?.href}
                    >
                      Explore {filter === "software" ? "software" : "services"}
                      <i className="ph ph-arrow-up-right" aria-hidden="true" />
                    </a>
                    <button type="button" onClick={() => setFilter("all")}>
                      Show all items
                    </button>
                  </div>
                )}
              </div>
              <div className="cart-browse">
                <div>
                  <h2>Anything else you need?</h2>
                  <p>Combine the tools and expertise that suit your work.</p>
                </div>
                <div>
                  {groups.map((group) => (
                    <a key={group.kind} href={group.href}>
                      {group.label}
                      <i className="ph ph-arrow-up-right" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
              {!persistent && (
                <p className="commerce-storage-note">
                  Your browser couldn’t save the cart. It will stay available
                  during this visit.
                </p>
              )}
            </section>
            <CartSummary items={items} cart>
              <a
                href="/checkout"
                className="commerce-action commerce-action--light"
              >
                Continue to checkout
                <span className="commerce-action__arrow">
                  <i className="ph ph-arrow-right" aria-hidden="true" />
                </span>
              </a>
              <div className="cart-next">
                <i className="ph ph-user-circle" aria-hidden="true" />
                <div>
                  <strong>Next: your contact details</strong>
                  <p>Your selected items will be included in the form.</p>
                </div>
              </div>
              <p className="cart-no-payment">
                <i className="ph ph-check" aria-hidden="true" /> No payment
                required at checkout
              </p>
            </CartSummary>
          </div>
          <div className="cart-checkout-bar">
            <div>
              <strong>
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </strong>
              <a href="#cart-estimate">
                View estimate{" "}
                <i className="ph ph-caret-up" aria-hidden="true" />
              </a>
            </div>
            <a
              href="/checkout"
              className="commerce-action commerce-action--light"
            >
              Checkout
              <span className="commerce-action__arrow">
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </span>
            </a>
          </div>
        </>
      )}
    </CommerceLayout>
  );
}

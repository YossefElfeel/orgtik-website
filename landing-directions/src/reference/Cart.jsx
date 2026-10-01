import React, { useEffect, useRef, useState } from "react";
import { CommerceLayout } from "./CommerceLayout";
import { CartSummary, EmptyCart } from "./CartSummary";
import { ServiceDuration } from "./ServiceDuration";
import { PlanPicker } from "./PlanPicker";
import { PlanCompareDialog, PlanCompareTable } from "./PlanCompare";
import { PromiseList } from "./PlanPromises";
import { getServicePeriodEstimate } from "./service-duration";
import { SOFTWARE_TERMS } from "./software-catalog";
import { planName } from "./plan-ladder";
import {
  getItemIncludes,
  getItemPlanOptions,
  getItemRecommendation,
  getPlanAdditions,
  getPlanComparison,
  resolveSelection,
} from "./plan-pricing";
import {
  beginCartEdit,
  cancelCartEdit,
  cartTotals,
  clearCart,
  dismissCartNotice,
  dismissRepricedNote,
  formatCHF,
  getCartChecks,
  itemLabel,
  removeCartItem,
  undoCartRemoval,
  undoCartUpdate,
  updateCartItem,
  useCart,
} from "./cart-store";
import "./cart.css";

const rowId = (id) => `cart-item-${encodeURIComponent(id)}`;

// After an inline change the row gets a new ID; keep focus on the same control.
function focusControl(id, control) {
  requestAnimationFrame(() =>
    document
      .getElementById(rowId(id))
      ?.querySelector(`[data-control="${control}"] input:checked`)
      ?.focus({ preventScroll: true }),
  );
}

function priceText(option) {
  return `${formatCHF(option.estimate)}${option.billing === "monthly" ? " / month" : ""}`;
}

function deltaText(option) {
  if (option.delta === null)
    return option.billing === "monthly" ? "billed monthly" : "one project";
  if (option.delta === 0) return "your plan";
  return `${option.delta > 0 ? "+" : "−"}${formatCHF(Math.abs(option.delta))}`;
}

function CartItem({ item, onCompare }) {
  const [showAll, setShowAll] = useState(false);
  const ids = item.selections.map((entry) => entry.id);
  const known = Boolean(resolveSelection(item.kind, ids));
  const options = known ? getItemPlanOptions(item) : [];
  const recommendation = known ? getItemRecommendation(item) : null;
  const includes = known ? getItemIncludes(item) : null;
  const additions = known
    ? getPlanAdditions(item.kind, item.planId, ids)
    : null;
  const nextOption = options.find(
    (option) => option.planId === additions?.planId,
  );
  const ongoing = item.kind === "service" && item.planId === "ongoing";
  const commitmentChosen = Boolean(item.duration) && ongoing;
  const periodEstimate = getServicePeriodEstimate(item);
  const softwareTotal =
    item.kind === "software" &&
    item.estimate !== null &&
    item.commitmentMonths > 1
      ? item.estimate * item.commitmentMonths
      : null;
  const label = itemLabel(item);
  const lines = (includes || []).flatMap((group) => group.items);
  const collapsible = lines.length > 7;
  const visibleGroups =
    collapsible && !showAll
      ? includes.slice(0, Math.max(1, Math.min(2, includes.length - 1)))
      : includes;
  const why =
    recommendation &&
    (recommendation.planId === item.planId
      ? `Good fit: ${recommendation.why}`
      : `We recommend ${planName(recommendation.planId)}. ${recommendation.why}`);
  const change = (changes, control) => {
    const updated = updateCartItem(item.id, changes);
    if (updated) focusControl(updated.id, control);
  };
  return (
    <li className="cart-row" id={rowId(item.id)}>
      <div className="cart-row__main">
        <span className="cart-row__icon" aria-hidden="true">
          <i
            className={`ph ${item.kind === "software" ? "ph-circles-three-plus" : item.selections.length > 1 ? "ph-stack" : "ph-briefcase"}`}
          />
        </span>
        <div className="cart-row__identity">
          <h3>{item.name}</h3>
          <p className="cart-row__meta">
            <strong>{item.plan} plan</strong>
            <span>
              {item.kind === "software"
                ? `${item.selections.length} product${item.selections.length === 1 ? "" : "s"}`
                : item.selections.length > 1
                  ? `${item.selections.length} services`
                  : "Service"}
            </span>
          </p>
        </div>
        <div className="cart-row__estimate" aria-live="off">
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
              {(periodEstimate || softwareTotal) &&
                item.commitmentMonths > 1 && (
                  <span className="cart-row__period-total">
                    {item.duration}: {item.kind === "service" && "from "}
                    {formatCHF(periodEstimate || softwareTotal)}
                  </span>
                )}
            </>
          )}
        </div>
      </div>
      {known ? (
        <div className="cart-row__config">
          <div data-control="plan">
            <PlanPicker
              layout="segments"
              label={`Plan for ${item.name}`}
              options={options.map((option) => ({
                planId: option.planId,
                name: option.name,
                price: priceText(option),
                note: deltaText(option),
                recommended: recommendation?.planId === option.planId,
              }))}
              value={item.planId}
              onChange={(planId) => change({ planId }, "plan")}
              why={why}
            />
          </div>
          {item.kind === "service" &&
            (ongoing ? (
              <div data-control="period">
                <ServiceDuration
                  months={commitmentChosen ? item.commitmentMonths : null}
                  groupLabel={`Monthly commitment for ${item.name}`}
                  headingLevel={4}
                  variant="compact"
                  hint={
                    commitmentChosen
                      ? "Changes save automatically."
                      : "Choose how many months to plan for."
                  }
                  onChange={(months) =>
                    change({ commitmentMonths: months }, "period")
                  }
                />
              </div>
            ) : (
              <p className="cart-row__timeline">
                <i className="ph ph-briefcase" aria-hidden="true" />
                <span>
                  <strong>One-off project.</strong> The timeline is agreed in
                  your brief and doesn’t change the price.
                </span>
              </p>
            ))}
          {item.kind === "software" && (
            <div data-control="period">
              <ServiceDuration
                months={item.termId}
                groupLabel={`Billing term for ${item.name}`}
                label="Billing term"
                headingLevel={4}
                variant="compact"
                hint="A longer term lowers the monthly price."
                options={SOFTWARE_TERMS.map((term) => ({
                  value: term.id,
                  label: term.discount
                    ? `${term.label} · −${Math.round(term.discount * 100)}%`
                    : term.label,
                }))}
                onChange={(termId) => change({ termId }, "period")}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="cart-row__timeline">
          <i className="ph ph-info" aria-hidden="true" />
          <span>Details for this item will be confirmed with the team.</span>
        </p>
      )}
      {includes && (
        <div className="cart-row__includes">
          <h4>What you get</h4>
          <div className="cart-includes">
            {visibleGroups.map((group) => (
              <section key={group.title} aria-label={group.title}>
                <h5>
                  {group.title}
                  {group.tag && <small>{group.tag}</small>}
                </h5>
                <ul>
                  {group.items.map((entry) => (
                    <li key={entry}>
                      <i className="ph ph-check" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                  {(group.excluded || []).map((entry) => (
                    <li key={entry} className="is-excluded">
                      <i className="ph ph-minus" aria-hidden="true" />
                      <span>
                        {entry}
                        <span className="plan-sr-only"> (not included)</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {collapsible && (
            <button
              type="button"
              className="cart-includes__toggle"
              aria-expanded={showAll}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less" : `Show everything (${lines.length})`}
              <i
                className={`ph ${showAll ? "ph-caret-up" : "ph-caret-down"}`}
                aria-hidden="true"
              />
            </button>
          )}
          {additions && nextOption && (
            <p className="cart-row__upgrade">
              <i className="ph ph-arrow-circle-up" aria-hidden="true" />
              <span>
                <strong>{nextOption.name}</strong>
                {nextOption.delta !== null
                  ? " adds "
                  : " turns this into a monthly rhythm and adds "}
                {additions.items.join(", ").replace(/, ([^,]*)$/, " and $1")}
                {nextOption.delta !== null
                  ? ` for ${deltaText(nextOption)}.`
                  : ` at ${priceText(nextOption)}.`}
              </span>
            </p>
          )}
          {known && !additions && (
            <p className="cart-row__upgrade">
              <i className="ph ph-seal-check" aria-hidden="true" />
              <span>This is the most complete plan for {item.name}.</span>
            </p>
          )}
        </div>
      )}
      <div className="cart-row__actions">
        {known && (
          <button
            type="button"
            onClick={onCompare}
            aria-label={`Compare plans for ${item.name}`}
          >
            <i className="ph ph-columns" aria-hidden="true" />
            Compare plans
          </button>
        )}
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
          aria-label={`Edit ${item.kind === "service" ? "services" : "products"} for ${label}`}
        >
          <i className="ph ph-pencil-simple" aria-hidden="true" />
          {item.kind === "service" ? "Edit services" : "Edit products"}
        </a>
        <button
          type="button"
          aria-label={`Remove ${label}`}
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

function removeAndFocus(id) {
  removeCartItem(id);
  requestAnimationFrame(() =>
    document.getElementById("cart-undo-removal")?.focus(),
  );
}

function CartChecks({ items, repriced }) {
  const [kept, setKept] = useState([]);
  const checks = getCartChecks(items).filter(
    (check) => !kept.includes(check.key),
  );
  const byId = (id) => items.find((item) => item.id === id);
  const quote = (id) => `“${itemLabel(byId(id))}”`;
  return (
    <section className="cart-checks" aria-labelledby="cart-checks-title">
      <h2 id="cart-checks-title">
        <i className="ph ph-shield-check" aria-hidden="true" /> Cart check
      </h2>
      {!checks.length && !repriced.length ? (
        <p className="cart-checks__ok">
          Everything looks consistent: no duplicates, and every item has a plan
          {items.some(
            (item) => item.planId === "ongoing" && item.kind === "service",
          )
            ? " and a commitment"
            : ""}
          .
        </p>
      ) : (
        <ul>
          {repriced.length > 0 && (
            <li>
              <p>
                {repriced.length === 1
                  ? "One saved item was"
                  : `${repriced.length} saved items were`}{" "}
                updated to the current plan prices, so every page shows the same
                number.
              </p>
              <div>
                <button type="button" onClick={dismissRepricedNote}>
                  Got it
                </button>
              </div>
            </li>
          )}
          {checks.map((check) =>
            check.type === "overlap" ? (
              <li key={check.key}>
                <p>
                  <strong>{check.names.join(", ")}</strong>{" "}
                  {check.names.length === 1 ? "appears" : "appear"} in{" "}
                  {quote(check.itemIds[0])} and {quote(check.itemIds[1])}.
                  {check.fix.action === "remove-item" &&
                    ` ${quote(check.fix.keepId)} already covers it.`}
                  {check.fix.action === "choose" &&
                    (byId(check.itemIds[0]).billing !==
                    byId(check.itemIds[1]).billing
                      ? " That works if you want a project first and monthly help after. Otherwise keep one."
                      : " Keep the plan you want.")}
                </p>
                <div>
                  {check.fix.action === "remove-item" && (
                    <button
                      type="button"
                      onClick={() => removeAndFocus(check.fix.itemId)}
                    >
                      Remove {quote(check.fix.itemId)}
                    </button>
                  )}
                  {check.fix.action === "remove-selection" && (
                    <button
                      type="button"
                      onClick={() => {
                        updateCartItem(check.fix.itemId, {
                          removeSelectionIds: check.fix.selectionIds,
                        });
                        requestAnimationFrame(() =>
                          document.getElementById("cart-undo-removal")?.focus(),
                        );
                      }}
                    >
                      Take {check.names.join(", ")} out of{" "}
                      {quote(check.fix.itemId)}
                    </button>
                  )}
                  {check.fix.action === "choose" &&
                    check.fix.itemIds.map((id) => (
                      <button
                        type="button"
                        key={id}
                        onClick={() => removeAndFocus(id)}
                      >
                        Remove {quote(id)}
                      </button>
                    ))}
                  <button
                    type="button"
                    className="cart-checks__secondary"
                    onClick={() => setKept([...kept, check.key])}
                  >
                    Keep both
                  </button>
                </div>
              </li>
            ) : (
              <li key={check.key}>
                <p>
                  Choose a monthly commitment for {quote(check.itemIds[0])} so
                  the period total is complete.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(rowId(check.itemIds[0]))
                        ?.querySelector('[data-control="period"] input')
                        ?.focus()
                    }
                  >
                    Choose commitment
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
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
  const updated = notice.type === "item-updated";
  const canUndo = ["removed", "cleared"].includes(notice.type) || updated;
  const removed = ["removed", "cleared"].includes(notice.type);
  return (
    <div className="cart-activity" ref={activityRef}>
      <i
        className={`ph ${removed ? "ph-trash" : "ph-check-circle"}`}
        aria-hidden="true"
      />
      <p role="status">{notice.text}</p>
      {canUndo && (
        <button
          id="cart-undo-removal"
          type="button"
          onClick={() => {
            if (updated) undoCartUpdate();
            else undoCartRemoval();
            requestAnimationFrame(() => {
              const focusItem = notice.originalItem || notice.item;
              const row = focusItem
                ? document.getElementById(rowId(focusItem.id))
                : null;
              const target = focusItem
                ? updated
                  ? row?.querySelector("input:checked") ||
                    row?.querySelector("input")
                  : row?.querySelector("button")
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
  const { items, persistent, notice, repriced } = useCart();
  const [filter, setFilter] = useState("all");
  const [confirmClear, setConfirmClear] = useState(false);
  const [compareId, setCompareId] = useState(null);
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
  const compareItem = items.find((item) => item.id === compareId);
  const comparison =
    compareItem &&
    getPlanComparison(
      compareItem.kind,
      compareItem.selections.map((entry) => entry.id),
      { termId: compareItem.termId, currentPlanId: compareItem.planId },
    );
  const totals = cartTotals(items);
  return (
    <CommerceLayout className="commerce-page--cart">
      <div className="cart-heading">
        <div>
          <h1 id="cart-title" tabIndex={-1}>
            Your cart <span>{items.length}</span>
          </h1>
          <p>
            Change plans and periods right here. Every total updates as you go.
          </p>
        </div>
        <a href="/plans" className="cart-back-link">
          <i className="ph ph-columns" aria-hidden="true" /> See all plans and
          prices
        </a>
      </div>
      <PromiseList className="cart-promises" />
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
              <CartChecks items={items} repriced={repriced} />
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
                          <CartItem
                            key={item.id}
                            item={item}
                            onCompare={() => setCompareId(item.id)}
                          />
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
                  <p>
                    Compare every plan in one place, or build another selection.
                  </p>
                </div>
                <div>
                  <a href="/plans">
                    All plans and prices
                    <i className="ph ph-arrow-up-right" aria-hidden="true" />
                  </a>
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
                  <p>
                    Your selection travels with the form. We reply within 1
                    business day.
                  </p>
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
                {[
                  totals.monthly > 0 && `${formatCHF(totals.monthly)} / month`,
                  totals.project > 0 && `${formatCHF(totals.project)} one-off`,
                ]
                  .filter(Boolean)
                  .join(" + ") ||
                  `${items.length} ${items.length === 1 ? "item" : "items"}`}
              </strong>
              <a href="#cart-estimate">
                {items.length} {items.length === 1 ? "item" : "items"} · View
                estimate <i className="ph ph-caret-up" aria-hidden="true" />
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
      <PlanCompareDialog
        open={Boolean(compareItem)}
        onClose={() => setCompareId(null)}
        title={compareItem ? `Plans for ${compareItem.name}` : "Compare plans"}
        description="Your current plan is marked. Switching updates your cart straight away, and you can undo it."
      >
        {compareItem && (
          <PlanCompareTable
            caption={`Plans for ${compareItem.name}`}
            plans={comparison.plans}
            groups={comparison.groups}
            renderAction={(plan) =>
              plan.planId === compareItem.planId ? (
                <span className="commerce-action commerce-action--current">
                  <span>Current plan</span>
                  <span className="commerce-action__arrow">
                    <i className="ph ph-check" aria-hidden="true" />
                  </span>
                </span>
              ) : (
                <button
                  type="button"
                  className="commerce-action"
                  onClick={() => {
                    const updated = updateCartItem(compareItem.id, {
                      planId: plan.planId,
                    });
                    setCompareId(null);
                    if (updated) focusControl(updated.id, "plan");
                  }}
                >
                  <span>Switch to {plan.name}</span>
                  <span className="commerce-action__arrow">
                    <i className="ph ph-arrows-left-right" aria-hidden="true" />
                  </span>
                </button>
              )
            }
          />
        )}
      </PlanCompareDialog>
    </CommerceLayout>
  );
}

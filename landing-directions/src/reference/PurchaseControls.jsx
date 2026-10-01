import React, { useEffect, useRef, useId } from "react";
import {
  MONTHS,
  TERM_SAVINGS,
  termLabel,
  findItem,
  groupName,
  groupFingerprint,
} from "./purchase-catalog.js";
import {
  useCart,
  addCartItem,
  removeCartItem,
  undoCartUpdate,
  dismissCartNotice,
  resolveOverlap,
} from "./purchase-store.js";
import "./commerce.css";
import "./purchase.css";

export function PurchaseAction({
  children,
  onClick,
  href,
  disabled = false,
  secondary = false,
  ...props
}) {
  const contents = (
    <>
      <span>{children}</span>
      <span className="commerce-action__arrow">
        <i className="ph ph-arrow-up-right" aria-hidden="true" />
      </span>
    </>
  );
  return href ? (
    <a
      {...props}
      href={href}
      className={`commerce-action purchase-action ${secondary ? "purchase-action--secondary" : ""}`}
    >
      {contents}
    </a>
  ) : (
    <button
      {...props}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`commerce-action purchase-action ${secondary ? "purchase-action--secondary" : ""}`}
    >
      {contents}
    </button>
  );
}
export function PurchaseDialog({ open, title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      ref.current?.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
      else document.querySelector(".purchase-toast button")?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="purchase-dialog"
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
    >
      <div className="purchase-dialog__head">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="purchase-icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <i className="ph ph-x" aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function DurationPicker({
  months,
  onChange,
  label = "Duration",
  displayLabel,
  showSavings = false,
}) {
  const id = useId();
  return (
    <fieldset className="purchase-duration" aria-label={label}>
      <legend>{displayLabel || label}</legend>
      <div>
        {MONTHS.map((m) => (
          <label key={m}>
            <input
              type="radio"
              name={id}
              value={m}
              aria-label={`${termLabel(m)}${showSavings && m > 1 ? ` Save ${TERM_SAVINGS[m]}%` : ""}`}
              checked={months === m}
              onChange={() => onChange(m)}
            />
            <span>
              {m} mo
              {showSavings && m > 1 && <small>Save {TERM_SAVINGS[m]}%</small>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
export function AddPackageButton({
  item,
  disabled = false,
  removable = true,
  onAction,
  ...props
}) {
  const { items } = useCart();
  const existing =
    item && items.find((g) => groupFingerprint(g) === groupFingerprint(item));
  return (
    <PurchaseAction
      {...props}
      disabled={disabled || !item?.lines.length}
      onClick={() => {
        if (existing && removable) removeCartItem(existing.id);
        else if (existing) window.__orgNav?.("/cart");
        else addCartItem(item);
        onAction?.();
      }}
      aria-label={
        existing && !removable
          ? `View ${groupName(item)} in cart`
          : `${existing && removable ? "Remove" : "Add"} ${item ? groupName(item) : "selection"} ${existing && removable ? "from" : "to"} cart`
      }
    >
      {existing
        ? removable
          ? "Remove from cart"
          : "View in cart"
        : "Add to cart"}
    </PurchaseAction>
  );
}
export function CartLink() {
  const { items } = useCart();
  return (
    <a
      href="/cart"
      className="cart-link"
      aria-label={`Cart, ${items.length} ${items.length === 1 ? "plan" : "plans"}`}
    >
      <i className="ph ph-shopping-cart" aria-hidden="true" />
      <span className="cart-link__count">{items.length}</span>
    </a>
  );
}
export function CartNotice() {
  const { notice, conflict } = useCart();
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape" && !conflict) dismissCartNotice();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [conflict]);
  return (
    <>
      {notice && (
        <aside className="purchase-toast" aria-label="Cart update">
          <p role="status">{notice.text}</p>
          <div className="purchase-toolbar">
            {notice.undo && (
              <button onClick={undoCartUpdate} type="button">
                Undo
              </button>
            )}
            <a href="/cart">View cart</a>
            <button
              type="button"
              onClick={dismissCartNotice}
              aria-label="Dismiss cart update"
            >
              Dismiss
            </button>
          </div>
        </aside>
      )}
      <PurchaseDialog
        open={!!conflict}
        title="Already in your cart"
        onClose={() => resolveOverlap("cancel")}
      >
        <p>
          Choose which configuration to keep. Other items will be added and each
          plan’s savings will be recalculated.
        </p>
        <ul className="purchase-feature-list">
          {conflict?.overlaps.map((l) => (
            <li key={l.catalogId}>
              {findItem(l.catalogId, conflict.group.kind)?.name} · existing{" "}
              {termLabel(l.months)} → incoming{" "}
              {termLabel(
                conflict.group.lines.find((n) => n.catalogId === l.catalogId)
                  ?.months,
              )}
            </li>
          ))}
        </ul>
        <div className="purchase-dialog__actions">
          <PurchaseAction onClick={() => resolveOverlap("keep")}>
            Keep existing items
          </PurchaseAction>
          <PurchaseAction secondary onClick={() => resolveOverlap("replace")}>
            Use incoming items
          </PurchaseAction>
        </div>
      </PurchaseDialog>
    </>
  );
}
export function CartEditBar() {
  return null;
}
export const AddToCartButton = AddPackageButton;

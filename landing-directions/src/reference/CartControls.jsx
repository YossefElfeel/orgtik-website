import React, { useEffect, useRef } from "react";
import {
  addCartItem,
  cartTotals,
  cancelCartEdit,
  dismissCartNotice,
  formatCHF,
  formatItemEstimate,
  removeCartItem,
  undoCartRemoval,
  useCart,
} from "./cart-store";
import "./commerce.css";

export function CartLink() {
  const { items } = useCart();
  return (
    <a
      href="/cart"
      className="cart-link"
      aria-label={`Cart, ${items.length} ${items.length === 1 ? "item" : "items"}`}
      title="View cart"
    >
      <i className="ph ph-shopping-cart" aria-hidden="true" />
      <span key={items.length} className="cart-link__count" aria-hidden="true">
        {items.length}
      </span>
    </a>
  );
}

export function AddToCartButton({
  item,
  style,
  className = "",
  disabled = false,
  removable = false,
  describedBy,
}) {
  const { items, editingId } = useCart();
  const editing = items.find(
    (entry) => entry.id === editingId && entry.kind === item?.kind,
  );
  const inCart =
    !editing && item && items.some((entry) => entry.id === item.id);
  const actionRef = useRef(null);
  const preserveFocus = useRef(false);
  useEffect(() => {
    if (preserveFocus.current) {
      actionRef.current?.focus();
      preserveFocus.current = false;
    }
  }, [inCart]);
  if (inCart && !disabled && !removable)
    return (
      <a
        ref={actionRef}
        href="/cart"
        style={style}
        className={`commerce-action commerce-action--in-cart ${className}`}
        aria-label={`View ${item.name} in cart`}
        aria-describedby={describedBy}
        data-cart-item-id={item.id}
      >
        <span>View in cart</span>
        <span className="commerce-action__arrow">
          <i className="ph ph-check" aria-hidden="true" />
        </span>
      </a>
    );
  return (
    <button
      ref={actionRef}
      type="button"
      disabled={disabled || !item}
      data-cart-item-id={item?.id}
      onClick={() => {
        preserveFocus.current = document.activeElement === actionRef.current;
        if (inCart && removable) removeCartItem(item.id);
        else addCartItem(item);
      }}
      style={style}
      className={`commerce-action${inCart && removable ? " commerce-action--remove" : ""} ${className}`}
      aria-label={
        item
          ? inCart && removable
            ? `Remove ${item.name} from cart`
            : `${editing ? "Save" : "Add"} ${item.name} to cart`
          : "Add to cart"
      }
      aria-describedby={describedBy}
    >
      <span>
        {editing
          ? "Save changes"
          : inCart && removable
            ? "Remove from cart"
            : "Add to cart"}
      </span>
      <span className="commerce-action__arrow">
        <i
          className={`ph ${editing ? "ph-check" : inCart && removable ? "ph-minus" : "ph-plus"}`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

function findCartItemAction(id) {
  return (
    document
      .getElementById(`cart-item-${encodeURIComponent(id)}`)
      ?.querySelector("button") ||
    [...document.querySelectorAll("[data-cart-item-id]")].find(
      (element) => element.dataset.cartItemId === id,
    )
  );
}

export function CartEditBar({ path }) {
  const { items, editingId } = useCart();
  const item = items.find((entry) => entry.id === editingId);
  const previousPath = useRef(path);
  useEffect(() => {
    if (
      previousPath.current !== path &&
      item &&
      path !== `/${item.kind === "software" ? "software" : "services"}`
    )
      cancelCartEdit();
    previousPath.current = path;
  }, [path, item]);
  if (
    !item ||
    path !== `/${item.kind === "software" ? "software" : "services"}`
  )
    return null;
  return (
    <aside className="cart-edit-bar" aria-label="Editing cart selection">
      <i className="ph ph-pencil-simple" aria-hidden="true" />
      <div>
        <strong>Editing {item.name}</strong>
        <p>Choose your new option, then save changes to replace this item.</p>
      </div>
      <a href="/cart" onClick={cancelCartEdit}>
        Cancel
      </a>
    </aside>
  );
}

export function CartNotice({ path }) {
  const { items, notice } = useCart();
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);
  useEffect(() => {
    dismissCartNotice();
  }, [path]);
  const closeNotice = () => {
    const focusedInside = panelRef.current?.contains(document.activeElement);
    dismissCartNotice();
    if (focusedInside) {
      const target = returnFocusRef.current?.isConnected
        ? returnFocusRef.current
        : document.querySelector("main h1[tabindex]");
      target?.focus();
    }
  };
  useEffect(() => {
    if (
      notice &&
      document.activeElement !== document.body &&
      !panelRef.current?.contains(document.activeElement)
    )
      returnFocusRef.current = document.activeElement;
  }, [notice]);
  useEffect(() => {
    const keydown = (event) => {
      if (event.key === "Escape" && panelRef.current) closeNotice();
    };
    window.addEventListener("popstate", dismissCartNotice);
    window.addEventListener("hashchange", dismissCartNotice);
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("popstate", dismissCartNotice);
      window.removeEventListener("hashchange", dismissCartNotice);
      window.removeEventListener("keydown", keydown);
    };
  }, []);
  const removed = notice?.type === "removed";
  const totals = cartTotals(items);
  if (path === "/cart" || (notice && !notice.item)) return null;
  return (
    <aside
      ref={panelRef}
      className={`cart-notice${notice ? " cart-notice--visible" : ""}${removed ? " cart-notice--removed" : ""}`}
      aria-label="Cart update"
    >
      <span role="status" className="cart-notice__announcement">
        {notice?.text}
      </span>
      {notice && (
        <>
          <div className="cart-notice__heading">
            <span className="cart-notice__check">
              <i
                className={`ph ${removed ? "ph-trash" : "ph-check"}`}
                aria-hidden="true"
              />
            </span>
            <h2>
              {removed
                ? "Item removed"
                : notice.type === "existing"
                  ? "Already in your cart"
                  : notice.type === "restored"
                    ? "Back in your cart"
                    : notice.type === "updated"
                      ? "Cart updated"
                      : "Added to your cart"}
            </h2>
            <button
              className="cart-notice__close"
              type="button"
              onClick={closeNotice}
              aria-label="Dismiss cart notification"
            >
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          </div>
          <div className="cart-notice__item">
            <strong>{notice.item.name}</strong>
            <span>
              {notice.item.duration}
              {notice.item.plan && ` · ${notice.item.plan}`}
            </span>
            {!removed && (
              <p>
                {notice.item.selections
                  .map((selection) => selection.name)
                  .join(", ")}
              </p>
            )}
            {!removed && <b>{formatItemEstimate(notice.item)}</b>}
          </div>
          {removed ? (
            <button
              id="cart-undo-removal"
              type="button"
              className="commerce-action"
              onClick={() => {
                undoCartRemoval();
                requestAnimationFrame(() => {
                  const target = findCartItemAction(notice.item.id);
                  if (target) {
                    target.focus({ preventScroll: true });
                    returnFocusRef.current = target;
                  }
                });
              }}
            >
              Undo removal{" "}
              <span className="commerce-action__arrow">
                <i
                  className="ph ph-arrow-counter-clockwise"
                  aria-hidden="true"
                />
              </span>
            </button>
          ) : (
            <>
              <div className="cart-notice__total">
                <span>
                  {items.length} {items.length === 1 ? "item" : "items"} in your
                  cart
                </span>
                <span>
                  {totals.monthly > 0 && `${formatCHF(totals.monthly)} / month`}
                  {totals.monthly > 0 && totals.project > 0 && " + "}
                  {totals.project > 0 &&
                    `${formatCHF(totals.project)} / project`}
                  {totals.onRequest &&
                    `${totals.monthly > 0 || totals.project > 0 ? " + " : ""}items on request`}
                </span>
              </div>
              <div className="cart-notice__actions">
                <a
                  href="/cart"
                  className="commerce-action commerce-action--secondary"
                >
                  View cart{" "}
                  <span className="commerce-action__arrow">
                    <i className="ph ph-shopping-cart" aria-hidden="true" />
                  </span>
                </a>
                <a href="/checkout" className="commerce-action">
                  Checkout{" "}
                  <span className="commerce-action__arrow">
                    <i className="ph ph-arrow-right" aria-hidden="true" />
                  </span>
                </a>
              </div>
              <div className="cart-notice__footer">
                <button
                  type="button"
                  className="cart-notice__continue"
                  onClick={closeNotice}
                >
                  Continue browsing
                </button>
                {notice.item.kind === "service" && (
                  <button
                    type="button"
                    className="cart-notice__remove"
                    aria-label={`Remove ${notice.item.name} from cart`}
                    onClick={() => {
                      removeCartItem(notice.item.id);
                      requestAnimationFrame(() => {
                        const target = findCartItemAction(notice.item.id);
                        if (target) {
                          target.focus({ preventScroll: true });
                          returnFocusRef.current = target;
                        }
                      });
                    }}
                  >
                    Remove item
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </aside>
  );
}

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CommerceLayout } from "./CommerceLayout";
import {
  useCart,
  updateLine,
  updateGroup,
  addCartItem,
  removeCartItem,
  clearCart,
  acknowledgeMigration,
  dismissMigrationMessages,
  dismissCartNotice,
} from "./purchase-store.js";
import {
  createGroup,
  groupName,
  groupTerm,
  quoteCart,
  quoteGroup,
  HOSTING_URL,
  money,
} from "./purchase-catalog.js";
import {
  ConfigurationEditor,
  PackageLines,
  QuoteSummary,
  PreviewNote,
  MobilePurchaseBar,
} from "./PurchaseUI";
import { PurchaseAction, PurchaseDialog } from "./PurchaseControls";

function CartGroup({ group, onEditState }) {
  const [draft, setDraft] = useState(null);
  const editing = !!draft;
  useEffect(() => {
    onEditState(group.id, editing);
    return () => onEditState(group.id, false);
  }, [group.id, editing, onEditState]);
  const section = useRef(null);
  const editButton = useRef(null);
  const wasEditing = useRef(false);
  const recoverRemovalFocus = () =>
    requestAnimationFrame(() => {
      const target =
        section.current?.querySelector("button") ||
        document.querySelector(".purchase-toast button");
      target?.focus();
    });
  useEffect(() => {
    if (draft && !wasEditing.current)
      section.current?.querySelector("input")?.focus();
    if (!draft && wasEditing.current) editButton.current?.focus();
    wasEditing.current = !!draft;
  }, [draft]);
  const save = () => {
    if (!draft.lines.length) removeCartItem(group.id);
    else addCartItem({ ...draft, needsReview: false }, { replaceId: group.id });
    setDraft(null);
  };
  return (
    <section
      ref={section}
      className="purchase-cart-group"
      aria-label={groupName(group)}
    >
      <header>
        <div>
          <span className="purchase-eyebrow">
            {group.kind === "service" ? "Services" : "Software"}
          </span>
          <h2>{groupName(group)}</h2>
          <p>
            {group.lines.length} items · {groupTerm(group)} ·{" "}
            {money(quoteGroup(group).total)} upfront
          </p>
        </div>
        <button
          type="button"
          className="purchase-text-button"
          aria-label={`Remove ${groupName(group)} plan`}
          onClick={() => {
            removeCartItem(group.id);
            recoverRemovalFocus();
          }}
        >
          Remove plan <i className="ph ph-trash" aria-hidden="true" />
        </button>
      </header>
      {draft ? (
        <>
          <ConfigurationEditor group={draft} onChange={setDraft} />
          <div className="purchase-draft-actions">
            <p role="status">
              {draft.lines.length ? (
                <>
                  After saving:{" "}
                  <strong>{money(quoteGroup(draft).total)}</strong> upfront for
                  this plan.
                </>
              ) : (
                "Saving removes this plan from your cart."
              )}
            </p>
            <div className="purchase-toolbar">
              <PurchaseAction
                onClick={save}
                disabled={draft.lines.some((l) => !l.months)}
              >
                Save changes
              </PurchaseAction>
              <button type="button" onClick={() => setDraft(null)}>
                Cancel edits
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <PackageLines
            compact
            group={group}
            onChange={(id, patch) => updateLine(group.id, id, patch)}
            onRemove={(id) => {
              updateGroup(group.id, {
                lines: group.lines.filter((l) => l.catalogId !== id),
              });
              recoverRemovalFocus();
            }}
          />
          {group.needsReview && (
            <div className="purchase-alert">
              <p>
                Saved packages now include the full listed scope at the new
                sample prices. Choose any missing durations and confirm your
                selection.
              </p>
              <PurchaseAction
                secondary
                disabled={group.lines.some((l) => !l.months)}
                onClick={() => acknowledgeMigration(group.id)}
              >
                Confirm updated package
              </PurchaseAction>
            </div>
          )}
          <button
            ref={editButton}
            type="button"
            className="purchase-text-button"
            onClick={() => {
              dismissCartNotice();
              setDraft(createGroup(group));
            }}
          >
            Customize contents{" "}
            <i className="ph ph-pencil-simple" aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  );
}
export function EmptyPurchaseCart() {
  return (
    <div className="purchase-empty">
      <span className="purchase-eyebrow">A place to begin</span>
      <h2>Your next chapter starts here.</h2>
      <p>
        Choose a ready-made bundle or build your own selection of services and
        software.
      </p>
      <div>
        <PurchaseAction href="/services#service-bundles">
          Explore services
        </PurchaseAction>
        <PurchaseAction href="/software#software-bundles" secondary>
          Explore software
        </PurchaseAction>
      </div>
    </div>
  );
}
export default function PurchaseCart() {
  const { items, messages, persistent } = useCart();
  const [clear, setClear] = useState(false);
  const [editingIds, setEditingIds] = useState([]);
  const onEditState = useCallback(
    (id, editing) =>
      setEditingIds((ids) =>
        editing
          ? ids.includes(id)
            ? ids
            : [...ids, id]
          : ids.includes(id)
            ? ids.filter((x) => x !== id)
            : ids,
      ),
    [],
  );
  const editing = editingIds.some((id) => items.some((g) => g.id === id));
  const quote = quoteCart(items);
  const checkoutAction =
    quote.valid && !editing ? (
      <PurchaseAction href="/checkout">Continue to checkout</PurchaseAction>
    ) : (
      <PurchaseAction disabled>
        {editing ? "Finish editing first" : "Review selections"}
      </PurchaseAction>
    );
  return (
    <CommerceLayout>
      <div
        className={`purchase-surface ${items.length ? "purchase-with-mobile-bar" : ""}`}
      >
        <div className="commerce-intro">
          <span className="purchase-eyebrow">Review your selection</span>
          <h1>Your cart.</h1>
          <p>Review your items, durations, and renewal before paying.</p>
        </div>
        {!persistent && (
          <p className="purchase-alert">
            Your browser cannot save this cart. Keep this tab open while
            completing the preview.
          </p>
        )}
        {messages.length > 0 && (
          <div className="purchase-alert" role="status">
            {messages.map((m) => (
              <p key={m}>{m}</p>
            ))}
            {messages.some((m) => m.includes("Hosting")) && (
              <a href={HOSTING_URL}>Continue to hosting</a>
            )}
            <button
              type="button"
              className="purchase-text-button"
              onClick={dismissMigrationMessages}
            >
              Dismiss migration note
            </button>
          </div>
        )}
        {!items.length ? (
          <EmptyPurchaseCart />
        ) : (
          <div className="purchase-layout">
            <div>
              <div className="purchase-toolbar">
                <span>
                  {items.length} configured{" "}
                  {items.length === 1 ? "plan" : "plans"}
                  <small className="purchase-autosave">
                    Duration and renewal changes save automatically.
                  </small>
                </span>
                <button type="button" onClick={() => setClear(true)}>
                  Clear cart
                </button>
              </div>
              {items.map((group) => (
                <CartGroup
                  group={group}
                  key={group.id}
                  onEditState={onEditState}
                />
              ))}
              <div className="purchase-toolbar">
                <a href="/services#svc-builder">Add services</a>
                <a href="/software#plan-builder">Add software</a>
              </div>
            </div>
            <QuoteSummary groups={items} title="Order summary">
              {checkoutAction}
              {editing ? (
                <p role="status">
                  Save or cancel your content edits before continuing. This
                  total reflects your saved cart.
                </p>
              ) : !quote.valid ? (
                <>
                  <p>
                    Choose all durations and confirm updated packages before
                    checkout.
                  </p>
                </>
              ) : null}
            </QuoteSummary>
          </div>
        )}
        <PreviewNote />
        {items.length > 0 && (
          <MobilePurchaseBar
            groups={items}
            note={
              editing ? "Saved cart · edits pending" : "Due today · upfront"
            }
          >
            {checkoutAction}
          </MobilePurchaseBar>
        )}
        <PurchaseDialog
          open={clear}
          title="Clear your cart?"
          onClose={() => setClear(false)}
        >
          <p>Remove all configured plans. You can undo this action.</p>
          <div className="purchase-dialog__actions">
            <PurchaseAction
              onClick={() => {
                clearCart();
                setClear(false);
              }}
            >
              Clear cart
            </PurchaseAction>
            <PurchaseAction secondary onClick={() => setClear(false)}>
              Keep my plans
            </PurchaseAction>
          </div>
        </PurchaseDialog>
      </div>
    </CommerceLayout>
  );
}

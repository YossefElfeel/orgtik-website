import { useSyncExternalStore } from "react";
import { withServiceDuration } from "./service-duration.js";

export const CART_STORAGE_KEY = "orgtik.cart.v1";
const listeners = new Set();

// Only selections are persisted. Customer details stay in checkout memory.
export function createCartItem(input) {
  if (!input || !["software", "service"].includes(input.kind)) return null;
  const selections = Array.isArray(input.selections)
    ? input.selections.filter(
        (item) =>
          item && typeof item.id === "string" && typeof item.name === "string",
      )
    : [];
  if (!selections.length || typeof input.name !== "string") return null;
  const item = {
    kind: input.kind,
    name: input.name.slice(0, 200),
    selections: [
      ...new Map(
        selections.map((entry) => [
          entry.id,
          { id: entry.id.slice(0, 150), name: entry.name.slice(0, 200) },
        ]),
      ).values(),
    ].slice(0, 30),
    plan: typeof input.plan === "string" ? input.plan.slice(0, 100) : "",
    duration:
      typeof input.duration === "string" ? input.duration.slice(0, 100) : "",
    billing: input.billing === "monthly" ? "monthly" : "project",
    estimate:
      Number.isFinite(input.estimate) && input.estimate >= 0
        ? Math.round(input.estimate)
        : null,
    commitmentMonths:
      Number.isInteger(input.commitmentMonths) && input.commitmentMonths > 0
        ? input.commitmentMonths
        : 1,
    sourceHref:
      typeof input.sourceHref === "string" &&
      /^\/(software|services)(?:[?#]|$)/.test(input.sourceHref)
        ? input.sourceHref
        : "/" + (input.kind === "software" ? "software" : "services"),
  };
  item.id = JSON.stringify([
    item.kind,
    item.selections.map((entry) => entry.id).sort(),
    item.plan,
    item.duration,
    item.billing,
  ]);
  return item;
}

function readCart(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return [];
    return [
      ...new Map(
        parsed
          .slice(0, 100)
          .map(createCartItem)
          .filter(Boolean)
          .map((item) => [item.id, item]),
      ).values(),
    ];
  } catch {
    return [];
  }
}

let initialItems = [];
let persistent = true;
try {
  initialItems = readCart(window.localStorage.getItem(CART_STORAGE_KEY));
} catch {
  persistent = false;
}
let snapshot = {
  items: initialItems,
  notice: null,
  persistent,
  editingId: null,
};

function publish(
  items,
  notice = null,
  persist = true,
  editingId = snapshot.editingId,
) {
  if (persist) {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      persistent = false;
    }
  }
  snapshot = { items, notice, persistent, editingId };
  listeners.forEach((listener) => listener());
}

export function addCartItem(input) {
  const item = createCartItem(input);
  if (!item) return;
  const editing = snapshot.items.find(
    (entry) => entry.id === snapshot.editingId && entry.kind === item.kind,
  );
  if (editing) {
    const index = snapshot.items.indexOf(editing);
    const items = snapshot.items.filter((entry) => entry.id !== editing.id);
    if (!items.some((entry) => entry.id === item.id))
      items.splice(index, 0, item);
    publish(
      items,
      {
        key: performance.now(),
        type: "updated",
        item,
        text: `${editing.name} updated in your cart.`,
      },
      true,
      null,
    );
    return;
  }
  const existing = snapshot.items.find((entry) => entry.id === item.id);
  publish(existing ? snapshot.items : [...snapshot.items, item], {
    key: performance.now(),
    type: existing ? "existing" : "added",
    item,
    text: existing
      ? `${item.name} is already in your cart.`
      : `${item.name} added to your cart.`,
  });
}

export function beginCartEdit(id) {
  if (snapshot.items.some((item) => item.id === id))
    publish(snapshot.items, null, false, id);
}

export function updateServicePeriod(id, value) {
  const original = snapshot.items.find((item) => item.id === id);
  const input = withServiceDuration(original, value);
  const item = input && createCartItem(input);
  if (!item) return null;
  if (item.id === original.id) return original;
  const duplicate = snapshot.items.some((entry) => entry.id === item.id);
  const previousItems = snapshot.items;
  const items = previousItems
    .filter((entry) => entry.id !== item.id)
    .map((entry) => (entry.id === original.id ? item : entry));
  publish(
    items,
    {
      key: performance.now(),
      type: "period-updated",
      item,
      originalItem: original,
      previousItems,
      text: `${item.name}: ${item.duration} saved.${duplicate ? " Matching selections combined." : ""}`,
    },
    true,
    null,
  );
  return item;
}

export function undoServicePeriod() {
  const notice = snapshot.notice;
  if (notice?.type !== "period-updated") return;
  publish(notice.previousItems, {
    key: performance.now(),
    type: "period-restored",
    item: notice.originalItem,
    text: `${notice.originalItem.name}: previous period restored.`,
  });
}

export function cancelCartEdit() {
  if (snapshot.editingId) publish(snapshot.items, snapshot.notice, false, null);
}

export function clearCart() {
  if (!snapshot.items.length) return;
  publish(
    [],
    {
      key: performance.now(),
      type: "cleared",
      items: snapshot.items,
      text: "All items removed from your cart.",
    },
    true,
    null,
  );
}

export function removeCartItem(id) {
  const index = snapshot.items.findIndex((item) => item.id === id);
  if (index < 0) return;
  const item = snapshot.items[index];
  publish(
    snapshot.items.filter((item) => item.id !== id),
    {
      key: performance.now(),
      type: "removed",
      item,
      index,
      text: `${item.name} removed from your cart.`,
    },
    true,
    snapshot.editingId === id ? null : snapshot.editingId,
  );
}

export function undoCartRemoval() {
  const notice = snapshot.notice;
  if (notice?.type === "cleared") {
    publish(notice.items, {
      key: performance.now(),
      type: "restored-all",
      text: "Your selection restored to your cart.",
    });
    return;
  }
  if (notice?.type !== "removed") return;
  const items = [...snapshot.items];
  if (!items.some((item) => item.id === notice.item.id))
    items.splice(Math.min(notice.index, items.length), 0, notice.item);
  publish(items, {
    key: performance.now(),
    type: "restored",
    item: notice.item,
    text: `${notice.item.name} restored to your cart.`,
  });
}

export function dismissCartNotice() {
  snapshot = { ...snapshot, notice: null };
  listeners.forEach((listener) => listener());
}

export function useCart() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => snapshot,
  );
}

window.addEventListener("storage", (event) => {
  if (event.key === CART_STORAGE_KEY || event.key === null) {
    publish(
      readCart(event.key === null ? null : event.newValue),
      null,
      false,
      null,
    );
  }
});

export function cartTotals(items) {
  return {
    monthly: items
      .filter((item) => item.billing === "monthly")
      .reduce((sum, item) => sum + (item.estimate || 0), 0),
    project: items
      .filter((item) => item.billing === "project")
      .reduce((sum, item) => sum + (item.estimate || 0), 0),
    onRequest: items.some((item) => item.estimate === null),
  };
}

export function formatCHF(amount) {
  return "CHF " + new Intl.NumberFormat("de-CH").format(amount);
}

export function formatItemEstimate(item) {
  if (item.estimate === null) return "On request";
  return `${item.kind === "service" ? "From " : ""}${formatCHF(item.estimate)}${item.billing === "monthly" ? " / month" : " / project"}`;
}

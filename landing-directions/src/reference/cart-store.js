import { useSyncExternalStore } from "react";
import { SERVICE_DURATIONS, getServiceDuration } from "./service-duration.js";
import { SOFTWARE_TERMS, getSoftwareTerm } from "./software-catalog.js";
import { formatCHF, isPlanId, planBilling, planName } from "./plan-ladder.js";
import { normalizePlanItem, serviceCommitmentFrom } from "./plan-pricing.js";

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
  // Known selections are always priced from the catalogue, never from saved numbers.
  const priced = normalizePlanItem(item, input);
  priced.id = JSON.stringify([
    priced.kind,
    priced.selections.map((entry) => entry.id).sort(),
    priced.planId,
    priced.duration,
    priced.billing,
  ]);
  return priced;
}

export function itemLabel(item) {
  return item.plan ? `${item.name} · ${item.plan}` : item.name;
}

function readCart(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return { items: [], repriced: [] };
    const repriced = [];
    const items = parsed
      .slice(0, 100)
      .map((entry) => {
        const item = createCartItem(entry);
        if (
          item &&
          Number.isFinite(entry?.estimate) &&
          Math.round(entry.estimate) !== item.estimate
        )
          repriced.push(item.id);
        return item;
      })
      .filter(Boolean);
    const unique = [...new Map(items.map((item) => [item.id, item])).values()];
    return {
      items: unique,
      repriced: unique
        .filter((item) => repriced.includes(item.id))
        .map((item) => item.id),
    };
  } catch {
    return { items: [], repriced: [] };
  }
}

let initial = { items: [], repriced: [] };
let persistent = true;
try {
  initial = readCart(window.localStorage.getItem(CART_STORAGE_KEY));
} catch {
  persistent = false;
}
let snapshot = {
  items: initial.items,
  notice: null,
  persistent,
  editingId: null,
  // Saved items whose price changed when the current plan rules were applied.
  repriced: initial.repriced,
};

function publish(
  items,
  notice = null,
  persist = true,
  editingId = snapshot.editingId,
  repriced = snapshot.repriced.filter((id) =>
    items.some((item) => item.id === id),
  ),
) {
  if (persist) {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      persistent = false;
    }
  }
  snapshot = { items, notice, persistent, editingId, repriced };
  listeners.forEach((listener) => listener());
}

export function dismissRepricedNote() {
  if (snapshot.repriced.length)
    publish(snapshot.items, snapshot.notice, false, snapshot.editingId, []);
}

export function addCartItem(input, { replace = true } = {}) {
  const item = createCartItem(input);
  if (!item) return;
  const editing =
    replace &&
    snapshot.items.find(
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
        text: `${itemLabel(editing)} updated in your cart.`,
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
      ? `${itemLabel(item)} is already in your cart.`
      : `${itemLabel(item)} added to your cart.`,
  });
}

export function beginCartEdit(id) {
  if (snapshot.items.some((item) => item.id === id))
    publish(snapshot.items, null, false, id);
}

// Change an item's plan, Ongoing commitment or software billing term in place.
export function updateCartItem(id, changes = {}) {
  const original = snapshot.items.find((item) => item.id === id);
  if (!original) return null;
  const input = { ...original };
  let summary = "";
  if (changes.planId !== undefined) {
    if (!isPlanId(changes.planId)) return null;
    input.planId = changes.planId;
    input.plan = planName(changes.planId);
    if (original.kind === "service") {
      input.billing = planBilling("service", changes.planId);
      if (changes.planId === "ongoing" && !serviceCommitmentFrom(original)) {
        input.commitmentMonths = 1;
        input.duration = getServiceDuration(1).label;
      }
    }
    summary = `${input.plan} plan selected`;
  }
  if (changes.commitmentMonths !== undefined) {
    const months = Number(changes.commitmentMonths);
    if (
      original.kind !== "service" ||
      input.planId !== "ongoing" ||
      !SERVICE_DURATIONS.includes(months)
    )
      return null;
    input.commitmentMonths = months;
    input.duration = getServiceDuration(months).label;
    summary = `${input.duration} saved`;
  }
  if (changes.removeSelectionIds !== undefined) {
    const remaining = original.selections.filter(
      (entry) => !changes.removeSelectionIds.includes(entry.id),
    );
    if (!remaining.length || remaining.length === original.selections.length)
      return null;
    input.selections = remaining;
    const removed = original.selections
      .filter((entry) => changes.removeSelectionIds.includes(entry.id))
      .map((entry) => entry.name)
      .join(", ");
    summary = `${removed} removed, price updated`;
  }
  if (changes.termId !== undefined) {
    if (
      original.kind !== "software" ||
      !SOFTWARE_TERMS.some((term) => term.id === changes.termId)
    )
      return null;
    input.termId = changes.termId;
    input.duration = getSoftwareTerm(changes.termId).label;
    summary = `${input.duration} billing selected`;
  }
  const item = createCartItem(input);
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
      type: "item-updated",
      item,
      originalItem: original,
      previousItems,
      text: `${original.name}: ${summary}.${duplicate ? " Matching selections combined." : ""}`,
    },
    true,
    null,
  );
  return item;
}

export function undoCartUpdate() {
  const notice = snapshot.notice;
  if (notice?.type !== "item-updated") return;
  publish(notice.previousItems, {
    key: performance.now(),
    type: "item-restored",
    item: notice.originalItem,
    text: `${itemLabel(notice.originalItem)} restored.`,
  });
}

export function updateServicePeriod(id, value) {
  return updateCartItem(id, { commitmentMonths: value });
}

export const undoServicePeriod = undoCartUpdate;

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
      text: `${itemLabel(item)} removed from your cart.`,
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
    text: `${itemLabel(notice.item)} restored to your cart.`,
  });
}

export function dismissCartNotice() {
  snapshot = { ...snapshot, notice: null };
  listeners.forEach((listener) => listener());
}

export function getCartSnapshot() {
  return snapshot;
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
    const next = readCart(event.key === null ? null : event.newValue);
    publish(next.items, null, false, null, next.repriced);
  }
});

const periodMonths = (item) =>
  item.billing === "monthly" ? item.commitmentMonths || 1 : 1;

export function cartTotals(items) {
  const priced = items.filter((item) => item.estimate !== null);
  const sum = (list, value) =>
    list.reduce((total, item) => total + value(item), 0);
  return {
    monthly: sum(
      priced.filter((item) => item.billing === "monthly"),
      (item) => item.estimate,
    ),
    project: sum(
      priced.filter((item) => item.billing === "project"),
      (item) => item.estimate,
    ),
    // Monthly items × their commitment or term, plus one-off projects.
    periodTotal: sum(priced, (item) => item.estimate * periodMonths(item)),
    savings: sum(
      priced,
      (item) =>
        Math.max(0, (item.listPrice ?? item.estimate) - item.estimate) *
        periodMonths(item),
    ),
    onRequest: items.some((item) => item.estimate === null),
  };
}

const PLAN_RANK = { starter: 1, complete: 2, ongoing: 3 };

// Overlapping selections and missing choices, each with a suggested fix that never loses a higher plan.
export function getCartChecks(items) {
  const checks = [];
  items.forEach((a, index) => {
    items.slice(index + 1).forEach((b) => {
      if (a.kind !== b.kind) return;
      const aIds = a.selections.map((entry) => entry.id);
      const bIds = b.selections.map((entry) => entry.id);
      const shared = a.selections.filter((entry) => bIds.includes(entry.id));
      if (!shared.length) return;
      const aInB = aIds.every((id) => bIds.includes(id));
      const bInA = bIds.every((id) => aIds.includes(id));
      let fix;
      if (aInB && bInA) fix = { action: "choose", itemIds: [a.id, b.id] };
      else if (aInB || bInA) {
        const [small, big] = aInB ? [a, b] : [b, a];
        fix =
          (PLAN_RANK[small.planId] || 0) <= (PLAN_RANK[big.planId] || 0)
            ? { action: "remove-item", itemId: small.id, keepId: big.id }
            : {
                action: "remove-selection",
                itemId: big.id,
                selectionIds: shared.map((entry) => entry.id),
              };
      } else {
        // Partial overlap: take the shared services out of the lower plan.
        const lower =
          (PLAN_RANK[a.planId] || 0) < (PLAN_RANK[b.planId] || 0) ? a : b;
        fix = {
          action: "remove-selection",
          itemId: lower.id,
          selectionIds: shared.map((entry) => entry.id),
        };
      }
      checks.push({
        type: "overlap",
        key: `overlap:${a.id}:${b.id}`,
        itemIds: [a.id, b.id],
        names: shared.map((entry) => entry.name),
        fix,
      });
    });
    if (
      a.kind === "service" &&
      a.planId === "ongoing" &&
      !SERVICE_DURATIONS.includes(
        a.duration === getServiceDuration(a.commitmentMonths).label
          ? a.commitmentMonths
          : null,
      )
    )
      checks.push({
        type: "commitment",
        key: `commitment:${a.id}`,
        itemIds: [a.id],
      });
  });
  return checks;
}

export { formatCHF };

// Service prices are "from" estimates; software subscriptions are exact.
export function formatItemEstimate(item) {
  if (item.estimate === null) return "On request";
  return `${item.kind === "service" ? "From " : ""}${formatCHF(item.estimate)}${item.billing === "monthly" ? " / month" : " / project"}`;
}

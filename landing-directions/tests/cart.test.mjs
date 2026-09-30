import assert from "node:assert/strict";
import { test } from "node:test";
import {
  SERVICE_FAMILIES,
  getServiceFeatures,
} from "../src/reference/service-catalog.js";

const storage = new Map();
const events = new Map();
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value),
  },
  addEventListener: (type, handler) => events.set(type, handler),
};

const {
  CART_STORAGE_KEY,
  createCartItem,
  addCartItem,
  beginCartEdit,
  cancelCartEdit,
  clearCart,
  removeCartItem,
  undoCartRemoval,
  cartTotals,
} = await import("../src/reference/cart-store.js");
const { createCheckoutEnquiry, validateCheckout } =
  await import("../src/reference/checkout-enquiry.js");
const software = {
  kind: "software",
  name: "Operations bundle",
  plan: "Connected",
  duration: "12 months",
  selections: [
    { id: "hr", name: "HR" },
    { id: "files", name: "Files" },
    { id: "tasks", name: "Tasks" },
  ],
  billing: "monthly",
  estimate: 72,
  commitmentMonths: 12,
  sourceHref: "/software#plan-builder",
};

test("Saved service IDs resolve current feature details for every bundle selection", () => {
  const original = JSON.stringify(SERVICE_FAMILIES);
  for (const family of SERVICE_FAMILIES) {
    for (const service of family.children) {
      const savedSelection = JSON.parse(
        JSON.stringify({
          id: `${family.slug}/${service.slug}`,
          name: service.name,
        }),
      );
      const features = getServiceFeatures(savedSelection.id);
      assert.deepEqual(features, service.capabilities);
      features.push("A local test mutation");
    }
  }
  assert.equal(JSON.stringify(SERVICE_FAMILIES), original);
  assert.deepEqual(getServiceFeatures("unavailable/service"), []);
});

test("Cart feature details preserve the selected plan scope for services and families", () => {
  const id = "design/graphic-design";
  assert.deepEqual(getServiceFeatures(id, "Focus"), [
    "Campaign design",
    "Clear brief and success criteria",
    "Defined delivery window",
  ]);
  assert.deepEqual(getServiceFeatures(id, "Connected"), [
    "Campaign design",
    "Business materials",
    "Digital asset systems",
    "One connected delivery roadmap",
  ]);
  assert.deepEqual(getServiceFeatures(id, "Partnership"), [
    "Campaign design",
    "Business materials",
    "Digital asset systems",
    "Ongoing support rhythm",
    "Improvement roadmap",
  ]);
  assert.deepEqual(getServiceFeatures("design", "Focus"), [
    "Graphic design",
    "Clear brief and success criteria",
    "Defined delivery window",
  ]);
  assert.deepEqual(
    getServiceFeatures("design", "Connected").slice(0, 3),
    SERVICE_FAMILIES[0].children.map((service) => service.name),
  );
});

test("Cart persists configuration, prevents duplicates, and distinguishes billing and plan choices", () => {
  addCartItem(software);
  addCartItem({ ...software, selections: software.selections.toReversed() });
  let saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].commitmentMonths, 12);
  assert.deepEqual(saved[0].selections, software.selections);
  addCartItem({ ...software, duration: "Monthly", commitmentMonths: 1 });
  addCartItem({ ...software, plan: "Partnership" });
  saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 3);
  removeCartItem(saved[0].id);
  assert.equal(JSON.parse(storage.get(CART_STORAGE_KEY)).length, 2);
});

test("Removal can be undone once, restoring a service and its original position without duplicates", () => {
  events.get("storage")({ key: CART_STORAGE_KEY, newValue: "[]" });
  addCartItem(software);
  addCartItem({
    ...software,
    kind: "service",
    name: "Care bundle",
    plan: "Ongoing",
    billing: "monthly",
    estimate: 3800,
  });
  addCartItem({ ...software, plan: "Partnership" });
  const original = JSON.parse(storage.get(CART_STORAGE_KEY));
  removeCartItem(original[1].id);
  assert.equal(JSON.parse(storage.get(CART_STORAGE_KEY)).length, 2);
  undoCartRemoval();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  undoCartRemoval();
  removeCartItem("missing-item");
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  // Leave the original test fixture unchanged for the following checks.
  events.get("storage")({
    key: CART_STORAGE_KEY,
    newValue: JSON.stringify(
      original.filter((item) => item.kind === "software"),
    ),
  });
});

test("Mixed monthly and project estimates stay separate, and on-request pricing is marked", () => {
  const items = [
    createCartItem(software),
    createCartItem({
      ...software,
      kind: "service",
      name: "Launch bundle",
      billing: "project",
      estimate: 4752,
    }),
    createCartItem({ ...software, name: "Custom plan", estimate: null }),
  ];
  assert.deepEqual(cartTotals(items), {
    monthly: 72,
    project: 4752,
    onRequest: true,
  });
});

test("Stored input cannot introduce unsafe configuration links or malformed selections", () => {
  assert.equal(createCartItem(null), null);
  assert.equal(createCartItem({ ...software, selections: [] }), null);
  assert.equal(
    createCartItem({ ...software, sourceHref: "javascript:alert(1)" })
      .sourceHref,
    "/software",
  );
  assert.equal(
    createCartItem({ ...software, sourceHref: "//example.com" }).sourceHref,
    "/software",
  );
  assert.equal(createCartItem({ ...software, estimate: -10 }).estimate, null);
});

test("Storage failures do not lose the in-memory cart, and malformed cross-tab data recovers", () => {
  const persist = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("Storage unavailable");
  };
  assert.doesNotThrow(() => addCartItem({ ...software, plan: "Essential" }));
  window.localStorage.setItem = persist;
  addCartItem({ ...software, plan: "Essential" });
  assert.equal(JSON.parse(storage.get(CART_STORAGE_KEY)).length, 3);
  assert.doesNotThrow(() =>
    events.get("storage")({ key: CART_STORAGE_KEY, newValue: "bad JSON" }),
  );
  addCartItem(software);
  assert.equal(JSON.parse(storage.get(CART_STORAGE_KEY)).length, 1);
});

test("Checkout requires contactable details and bundles selected items into a CMS-ready enquiry", () => {
  const values = {
    name: "  Preview Customer  ",
    email: " customer@example.com ",
    phone: " +41 00 000 0000 ",
    company: " Example Team ",
    message: " A new workspace. ",
  };
  assert.deepEqual(validateCheckout(values), {});
  assert.deepEqual(
    Object.keys(validateCheckout({ ...values, name: " ", email: "invalid" })),
    ["name", "email"],
  );
  const cartBefore = storage.get(CART_STORAGE_KEY);
  const enquiry = createCheckoutEnquiry([createCartItem(software)], values);
  assert.equal(enquiry.schemaVersion, 1);
  assert.equal(enquiry.status, "local-preview");
  assert.equal(enquiry.customer.name, "Preview Customer");
  assert.equal(enquiry.customer.email, "customer@example.com");
  assert.equal(enquiry.items[0].duration, "12 months");
  assert.equal(enquiry.items[0].plan, "Connected");
  assert.equal(enquiry.items[0].selections.length, 3);
  assert.equal(enquiry.estimate.monthly, 72);
  assert.equal(enquiry.message, "A new workspace.");
  assert.equal(
    storage.get(CART_STORAGE_KEY),
    cartBefore,
    "Customer details must not be persisted",
  );
});

test("Editing preserves the original until save, replaces it in place, and avoids duplicate configurations", () => {
  events.get("storage")({ key: CART_STORAGE_KEY, newValue: "[]" });
  addCartItem(software);
  addCartItem({ ...software, plan: "Partnership" });
  const original = JSON.parse(storage.get(CART_STORAGE_KEY));
  beginCartEdit(original[0].id);
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  cancelCartEdit();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  beginCartEdit(original[0].id);
  addCartItem({
    ...software,
    duration: "24 months",
    commitmentMonths: 24,
    estimate: 64,
  });
  let saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 2);
  assert.equal(saved[0].duration, "24 months");
  assert.equal(saved[0].estimate, 64);
  assert.equal(saved[1].id, original[1].id);
  beginCartEdit(saved[0].id);
  addCartItem({ ...software, plan: "Partnership" });
  saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].id, original[1].id);
});

test("Clearing the cart supports undo and restores all selections in their original order", () => {
  events.get("storage")({ key: CART_STORAGE_KEY, newValue: "[]" });
  addCartItem(software);
  addCartItem({
    ...software,
    kind: "service",
    name: "Launch bundle",
    billing: "project",
    estimate: 4752,
  });
  const original = JSON.parse(storage.get(CART_STORAGE_KEY));
  clearCart();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), []);
  undoCartRemoval();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  undoCartRemoval();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
});

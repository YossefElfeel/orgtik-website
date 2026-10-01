import assert from "node:assert/strict";
import { test } from "node:test";
import {
  SERVICE_DURATIONS,
  getServiceDuration,
  getServicePeriodEstimate,
} from "../src/reference/service-duration.js";
import {
  SERVICE_FAMILIES,
  getServiceFeatures,
  getServiceChoices,
  getServicePlanSelection,
  getServicePlanFeatures,
} from "../src/reference/service-catalog.js";

const storage = new Map();
test("service period estimates multiply monthly rates without changing project prices", () => {
  const item = { kind: "service", billing: "monthly", estimate: 1450 };
  assert.deepEqual(
    SERVICE_DURATIONS.map((commitmentMonths) =>
      getServicePeriodEstimate({ ...item, commitmentMonths }),
    ),
    [1450, 4350, 8700, 17400],
  );
  const project = {
    ...item,
    billing: "project",
    estimate: 1800,
    commitmentMonths: 6,
  };
  assert.equal(getServicePeriodEstimate(project), null);
  assert.equal(project.estimate, 1800);
  assert.equal(
    getServicePeriodEstimate({ ...item, commitmentMonths: 3, estimate: null }),
    null,
  );
  assert.equal(
    getServicePeriodEstimate({ ...item, commitmentMonths: 3, estimate: 0 }),
    0,
  );
  assert.equal(
    getServicePeriodEstimate({ ...item, commitmentMonths: 24 }),
    null,
  );
  assert.equal(
    getServicePeriodEstimate({
      ...item,
      commitmentMonths: 3,
      kind: "software",
    }),
    null,
  );
});
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
  updateServicePeriod,
  undoServicePeriod,
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

test("Service duration accepts the four supported terms and recovers invalid saved links", () => {
  assert.deepEqual(SERVICE_DURATIONS, [1, 3, 6, 12]);
  for (const months of SERVICE_DURATIONS) {
    const query = new URLSearchParams(`duration=${months}`);
    assert.deepEqual(getServiceDuration(query.get("duration")), {
      months,
      label: `${months} month${months === 1 ? "" : "s"}`,
    });
  }
  for (const value of [null, "", "invalid", "0", "2", "-3", "6.5", "24"]) {
    assert.deepEqual(getServiceDuration(value), {
      months: 1,
      label: "1 month",
    });
  }
});

test("Service plan durations stay distinct, undo correctly and reach checkout with their billing", () => {
  events.get("storage")({ key: CART_STORAGE_KEY, newValue: "[]" });
  const service = {
    kind: "service",
    name: "Graphic design · Partnership",
    plan: "Partnership",
    selections: [{ id: "design/graphic-design", name: "Graphic design" }],
    billing: "monthly",
    estimate: 1450,
  };
  for (const months of SERVICE_DURATIONS) {
    const duration = getServiceDuration(months);
    const input = {
      ...service,
      duration: duration.label,
      commitmentMonths: duration.months,
      sourceHref: `/services?duration=${months}#/service/design/graphic-design`,
    };
    addCartItem(input);
    addCartItem(input);
  }
  let saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 4);
  assert.equal(new Set(saved.map((item) => item.id)).size, 4);
  const sixMonths = saved.find((item) => item.commitmentMonths === 6);
  removeCartItem(sixMonths.id);
  assert.deepEqual(
    JSON.parse(storage.get(CART_STORAGE_KEY)).map(
      (item) => item.commitmentMonths,
    ),
    [1, 3, 12],
  );
  undoCartRemoval();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), saved);
  addCartItem({
    ...service,
    name: "Graphic design · Focus",
    plan: "Focus",
    billing: "project",
    estimate: 1800,
    duration: "6 months",
    commitmentMonths: 6,
    sourceHref: "/services?duration=6#/service/design/graphic-design",
  });
  saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.deepEqual(cartTotals(saved), {
    monthly: 5800,
    project: 1800,
    onRequest: false,
  });
  const enquiry = createCheckoutEnquiry(saved, {
    name: "QA Preview",
    email: "qa@example.com",
    phone: "",
    company: "",
    message: "",
  });
  assert.deepEqual(
    enquiry.items
      .slice(0, 4)
      .map((item) => [item.duration, item.commitmentMonths, item.estimate]),
    [
      ["1 month", 1, 1450],
      ["3 months", 3, 1450],
      ["6 months", 6, 1450],
      ["12 months", 12, 1450],
    ],
  );
  assert.equal(enquiry.items[4].billing, "project");
  assert.equal(enquiry.items[4].estimate, 1800);
  assert.equal(
    new URL(
      enquiry.items[2].sourceHref,
      "https://example.com",
    ).searchParams.get("duration"),
    "6",
  );
});

test("department filters resolve every service without changing the shared catalog", () => {
  const original = JSON.stringify(SERVICE_FAMILIES);
  const all = getServiceChoices();
  assert.equal(all.length, 11);
  assert.equal(new Set(all.map((item) => item.id)).size, 11);
  for (const family of SERVICE_FAMILIES) {
    const choices = getServiceChoices(family.slug);
    assert.equal(choices.length, family.children.length);
    assert.ok(choices.every((item) => item.id.startsWith(`${family.slug}/`)));
    assert.deepEqual(
      choices,
      all.filter((item) => item.f.slug === family.slug),
    );
  }
  assert.deepEqual(getServiceChoices("unknown"), []);
  assert.equal(JSON.stringify(SERVICE_FAMILIES), original);
});

test("cart period changes preserve service scope, billing and prices and update checkout and edit links", () => {
  clearCart();
  addCartItem(software);
  addCartItem({
    kind: "service",
    name: "Graphic design · Focus",
    plan: "Focus",
    selections: [{ id: "design/graphic-design", name: "Graphic design" }],
    duration: "Defined scope",
    billing: "project",
    estimate: 1800,
    sourceHref: "/services#/service/design/graphic-design",
  });
  addCartItem({
    kind: "service",
    name: "Care bundle",
    plan: "",
    selections: [
      { id: "hosting/managed-hosting", name: "Managed website hosting" },
    ],
    duration: "Ongoing partnership",
    billing: "monthly",
    estimate: 3800,
    sourceHref:
      "/services?services=hosting/managed-hosting&engagement=partner#svc-builder",
  });
  const original = JSON.parse(storage.get(CART_STORAGE_KEY));
  const focus = updateServicePeriod(original[1].id, "6");
  assert.equal(focus.duration, "6 months");
  assert.equal(focus.commitmentMonths, 6);
  assert.equal(focus.estimate, 1800);
  assert.equal(focus.billing, "project");
  assert.deepEqual(focus.selections, original[1].selections);
  assert.equal(
    new URL(focus.sourceHref, "https://example.com").hash,
    "#/service/design/graphic-design",
  );
  const beforeCare = JSON.parse(storage.get(CART_STORAGE_KEY));
  const care = updateServicePeriod(original[2].id, 3);
  const link = new URL(care.sourceHref, "https://example.com");
  assert.equal(link.searchParams.get("duration"), "3");
  assert.equal(link.searchParams.get("services"), "hosting/managed-hosting");
  assert.equal(link.searchParams.get("engagement"), "partner");
  assert.equal(link.hash, "#svc-builder");
  const saved = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(saved.length, 3);
  assert.deepEqual(saved[0], original[0]);
  assert.equal(original[1].duration, "Defined scope");
  assert.equal(getServicePeriodEstimate(care), 11400);
  assert.deepEqual(cartTotals(saved), {
    monthly: 3872,
    project: 1800,
    onRequest: false,
  });
  const enquiry = createCheckoutEnquiry(saved, {
    name: "QA Preview",
    email: "qa@example.com",
    phone: "",
    company: "",
    message: "",
  });
  assert.deepEqual(
    enquiry.items
      .slice(1)
      .map((item) => [item.duration, item.commitmentMonths]),
    [
      ["6 months", 6],
      ["3 months", 3],
    ],
  );
  undoServicePeriod();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), beforeCare);
  undoServicePeriod();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), beforeCare);
  assert.equal(updateServicePeriod(saved[0].id, 3), null);
  assert.equal(updateServicePeriod(focus.id, 24), null);
  assert.equal(updateServicePeriod("missing", 3), null);
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), beforeCare);
});

test("changing to an existing period combines identical selections and Undo restores both", () => {
  clearCart();
  const item = {
    kind: "service",
    name: "Graphic design · Partnership",
    plan: "Partnership",
    selections: [{ id: "design/graphic-design", name: "Graphic design" }],
    billing: "monthly",
    estimate: 1450,
    sourceHref: "/services?duration=3#/service/design/graphic-design",
  };
  addCartItem({ ...item, duration: "3 months", commitmentMonths: 3 });
  addCartItem(software);
  addCartItem({ ...item, duration: "6 months", commitmentMonths: 6 });
  addCartItem({
    ...item,
    plan: "On request",
    duration: "1 month",
    commitmentMonths: 1,
    estimate: null,
  });
  const original = JSON.parse(storage.get(CART_STORAGE_KEY));
  const updated = updateServicePeriod(original[2].id, 3);
  const combined = JSON.parse(storage.get(CART_STORAGE_KEY));
  assert.equal(combined.length, 3);
  assert.equal(combined.filter((entry) => entry.id === updated.id).length, 1);
  assert.equal(cartTotals(combined).monthly, 1522);
  undoServicePeriod();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
  const onRequest = updateServicePeriod(original[3].id, 12);
  assert.equal(onRequest.estimate, null);
  assert.equal(getServicePeriodEstimate(onRequest), null);
  undoServicePeriod();
  assert.deepEqual(JSON.parse(storage.get(CART_STORAGE_KEY)), original);
});

test("department plan filters resolve service scope and retain it through cart duration edits", () => {
  const originalCatalog = JSON.stringify(SERVICE_FAMILIES);
  for (const family of SERVICE_FAMILIES) {
    const overview = getServicePlanSelection(family.slug);
    assert.equal(overview.id, family.slug);
    assert.equal(overview.service, null);
    for (const service of family.children) {
      const selected = getServicePlanSelection(family.slug, service.slug);
      assert.equal(selected.id, `${family.slug}/${service.slug}`);
      assert.equal(selected.name, service.name);
      for (const plan of ["Focus", "Connected", "Partnership"])
        assert.deepEqual(
          getServicePlanFeatures(plan, selected.capabilities),
          getServiceFeatures(selected.id, plan),
        );
    }
    assert.deepEqual(getServicePlanSelection(family.slug, "unknown"), overview);
  }
  assert.equal(getServicePlanSelection("unknown", "graphic-design"), null);
  assert.equal(
    getServicePlanSelection("marketing", "graphic-design").service,
    null,
  );
  assert.equal(JSON.stringify(SERVICE_FAMILIES), originalCatalog);
  clearCart();
  const selected = getServicePlanSelection("design", "brand-development");
  addCartItem({
    kind: "service",
    name: selected.name + " · Focus",
    plan: "Focus",
    selections: [{ id: selected.id, name: selected.name }],
    duration: "3 months",
    commitmentMonths: 3,
    billing: "project",
    estimate: 1800,
    sourceHref:
      "/services?duration=3&plan-service=brand-development#/family/design",
  });
  const item = JSON.parse(storage.get(CART_STORAGE_KEY))[0];
  const updated = updateServicePeriod(item.id, 6);
  const link = new URL(updated.sourceHref, "https://example.com");
  assert.equal(link.searchParams.get("plan-service"), "brand-development");
  assert.equal(link.searchParams.get("duration"), "6");
  assert.equal(link.hash, "#/family/design");
  assert.deepEqual(updated.selections, item.selections);
  assert.equal(updated.estimate, 1800);
});

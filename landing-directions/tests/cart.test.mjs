import assert from "node:assert/strict";
import { test } from "node:test";
import {
  SERVICE_DURATIONS,
  getServiceDuration,
  getServicePeriodEstimate,
} from "../src/reference/service-duration.js";
import {
  SERVICE_BUNDLES,
  SERVICE_FAMILIES,
  getServiceChoices,
  getServicePlanFeatures,
  getServicePlanSelection,
  getServiceSavingHint,
  getServiceSavingRate,
  priceServices,
  recommendServicePlan,
} from "../src/reference/service-catalog.js";
import {
  SOFTWARE_PRODUCTS,
  getSoftwareBundleRate,
  getSoftwareSavingHint,
  priceSoftware,
  recommendSoftwarePlan,
} from "../src/reference/software-catalog.js";
import {
  PLAN_IDS,
  planBilling,
  planIdFromLabel,
} from "../src/reference/plan-ladder.js";
import { getItemPlanOptions } from "../src/reference/plan-pricing.js";

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
  updateCartItem,
  undoCartUpdate,
  updateServicePeriod,
  undoServicePeriod,
  cartTotals,
  getCartChecks,
  getCartSnapshot,
} = await import("../src/reference/cart-store.js");
const { createCheckoutEnquiry, validateCheckout } =
  await import("../src/reference/checkout-enquiry.js");

const saved = () => JSON.parse(storage.get(CART_STORAGE_KEY));
const resetCart = (items = []) =>
  events.get("storage")({
    key: CART_STORAGE_KEY,
    newValue: JSON.stringify(items),
  });
const allServiceIds = getServiceChoices().map((entry) => entry.id);
const operations = {
  kind: "software",
  name: "Operations bundle",
  planId: "complete",
  termId: "annual",
  selections: [
    { id: "hr", name: "HR" },
    { id: "files", name: "Files" },
    { id: "tasks", name: "Tasks" },
  ],
};
const graphicDesign = (planId, months) => ({
  kind: "service",
  name: "Graphic design",
  planId,
  selections: [{ id: "design/graphic-design", name: "Graphic design" }],
  ...(months
    ? { duration: getServiceDuration(months).label, commitmentMonths: months }
    : {}),
});
const contact = {
  name: "QA Preview",
  email: "qa@example.com",
  phone: "",
  company: "",
  message: "",
};

test("service period estimates multiply monthly rates without changing project prices", () => {
  const item = { kind: "service", billing: "monthly", estimate: 1450 };
  assert.deepEqual(
    SERVICE_DURATIONS.map((commitmentMonths) =>
      getServicePeriodEstimate({ ...item, commitmentMonths }),
    ),
    [1450, 4350, 8700, 17400],
  );
  const project = { ...item, billing: "project", estimate: 1800 };
  assert.equal(getServicePeriodEstimate(project), null);
  assert.equal(
    getServicePeriodEstimate({ ...item, commitmentMonths: 3, estimate: null }),
    null,
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

test("one plan ladder replaces Focus, Essential, Launch, Connected and Partnership", () => {
  assert.deepEqual(PLAN_IDS, ["starter", "complete", "ongoing"]);
  for (const label of ["Focus", "Essential", "Launch plan", "Starter"])
    assert.equal(planIdFromLabel(label), "starter");
  for (const label of ["Connected", "Connected plan", "Complete"])
    assert.equal(planIdFromLabel(label), "complete");
  for (const label of ["Partnership", "Partnership plan", "Ongoing"])
    assert.equal(planIdFromLabel(label), "ongoing");
  assert.equal(planIdFromLabel("On request"), null);
  assert.equal(planIdFromLabel(""), null);
  assert.equal(planBilling("service", "starter"), "project");
  assert.equal(planBilling("service", "complete"), "project");
  assert.equal(planBilling("service", "ongoing"), "monthly");
  assert.equal(planBilling("software", "starter"), "monthly");
});

test("service prices are per service and savings never drop when a service is added", () => {
  assert.equal(
    priceServices(["design/graphic-design"], "starter").estimate,
    1800,
  );
  assert.equal(
    priceServices(["design/graphic-design"], "complete").estimate,
    4200,
  );
  assert.equal(
    priceServices(["design/graphic-design"], "ongoing").estimate,
    1450,
  );
  assert.equal(priceServices(["development"], "starter").estimate, 3420);
  assert.equal(priceServices(["design"], "complete").estimate, 11340);
  const launch = SERVICE_BUNDLES.find((bundle) => bundle.id === "launch").ids;
  assert.deepEqual(
    PLAN_IDS.map((planId) => priceServices(launch, planId).estimate),
    [4752, 11088, 3828],
  );
  assert.equal(
    getServiceSavingRate([...launch, "design/graphic-design"]),
    0.12,
    "Adding a fourth service to a bundle keeps the bundle saving",
  );
  for (const order of [
    allServiceIds,
    [...allServiceIds].reverse(),
    [...launch, ...allServiceIds],
  ]) {
    const picked = [];
    let previous = 0;
    for (const id of order) {
      if (picked.includes(id)) continue;
      picked.push(id);
      const rate = getServiceSavingRate(picked);
      assert.ok(
        rate >= previous,
        `saving dropped at ${picked.length} services`,
      );
      previous = rate;
    }
  }
});

test("department overviews price exactly like the same builder selection and cart item", () => {
  for (const family of SERVICE_FAMILIES) {
    const overview = getServicePlanSelection(family.slug);
    assert.deepEqual(
      overview.ids,
      family.children.map((service) => `${family.slug}/${service.slug}`),
    );
    for (const planId of PLAN_IDS) {
      const builder = priceServices(overview.ids, planId);
      const item = createCartItem({
        kind: "service",
        name: family.name,
        planId,
        selections: [{ id: family.slug, name: family.name }],
      });
      assert.equal(item.estimate, builder.estimate);
      assert.equal(item.billing, builder.billing);
      assert.equal(item.selections.length, family.children.length);
    }
  }
});

test("service plan features are cumulative and department plans cover every service", () => {
  for (const id of allServiceIds) {
    const starter = getServicePlanFeatures("starter", [id]);
    const complete = getServicePlanFeatures("complete", [id]);
    const ongoing = getServicePlanFeatures("ongoing", [id]);
    // "Everything in Starter" and "Everything in Complete as a monthly rhythm" must be literally true.
    assert.ok(starter.every((line) => complete.includes(line)));
    assert.ok(
      complete
        .filter((line) => line !== "Defined delivery window")
        .every((line) => ongoing.includes(line)),
    );
    assert.ok(ongoing.includes("Monthly delivery rhythm"));
  }
  const design = getServicePlanSelection("design");
  const starter = getServicePlanFeatures("starter", design.ids);
  for (const service of SERVICE_FAMILIES[0].children)
    assert.ok(starter.some((line) => line.startsWith(service.name + ":")));
});

test("recommendations follow fit and always explain why", () => {
  const care = SERVICE_BUNDLES.find((bundle) => bundle.id === "care").ids;
  const launch = SERVICE_BUNDLES.find((bundle) => bundle.id === "launch").ids;
  assert.equal(recommendServicePlan(care).planId, "ongoing");
  assert.equal(recommendServicePlan(launch).planId, "complete");
  assert.equal(
    recommendServicePlan(["design/graphic-design"]).planId,
    "starter",
  );
  assert.equal(
    recommendServicePlan(["it-support/website-management"]).planId,
    "ongoing",
  );
  assert.equal(
    recommendServicePlan([
      "development/web-development",
      "it-support/website-management",
    ]).planId,
    "complete",
  );
  assert.equal(recommendServicePlan([]), null);
  assert.equal(recommendSoftwarePlan(["crm"]).planId, "starter");
  assert.equal(recommendSoftwarePlan(["crm", "marketing"]).planId, "complete");
  for (const ids of [care, launch, ["design/graphic-design"]])
    assert.ok(recommendServicePlan(ids).why.length > 20);
});

test("saving hints point to the next real saving", () => {
  assert.match(
    getServiceSavingHint([
      "design/brand-development",
      "development/web-development",
    ]).text,
    /Add SEO services to complete the Launch bundle and save 12% instead of 5%/,
  );
  assert.equal(
    getServiceSavingHint(["design/graphic-design"]).text,
    "Add 1 more service to save 5%.",
  );
  assert.equal(
    getServiceSavingHint(SERVICE_BUNDLES[0].ids).text,
    "Add 2 more services to save 15%.",
  );
  assert.equal(getServiceSavingHint(allServiceIds), null);
  assert.match(
    getSoftwareSavingHint(["hr", "tasks"]).text,
    /Add Files to complete the Operations bundle and save 15% instead of 10%/,
  );
  assert.match(
    getSoftwareSavingHint(["hr", "crm", "tasks", "marketing", "website"]).text,
    /Add Files to get the All-in-one suite and save 25%/,
  );
  assert.equal(
    getSoftwareSavingHint(["crm"]).text,
    "Add a second product to save 10%.",
  );
});

test("software prices agree across builder, product plans, compare view and cart", () => {
  const all = SOFTWARE_PRODUCTS.map((product) => product.id);
  assert.equal(priceSoftware(all, "starter", "monthly").estimate, 147);
  assert.equal(priceSoftware(all, "complete", "monthly").estimate, 176);
  assert.equal(priceSoftware(all, "ongoing", "annual").estimate, 181);
  assert.equal(
    priceSoftware(["hr", "tasks", "files"], "complete", "annual").estimate,
    72,
  );
  assert.equal(priceSoftware(["hr"], "starter", "annual").estimate, 33);
  assert.equal(priceSoftware(["hr"], "complete", "annual").estimate, 40);
  assert.equal(priceSoftware(["hr"], "ongoing", "annual").estimate, 48);
  assert.equal(getSoftwareBundleRate(["hr", "tasks", "files", "crm"]), 0.15);
  assert.equal(priceSoftware(all, "starter", "annual").total, 1500);
  const item = createCartItem(operations);
  assert.equal(item.estimate, 72);
  assert.equal(item.name, "Operations bundle");
  assert.deepEqual(
    getItemPlanOptions(item).map((option) => [
      option.planId,
      option.estimate,
      option.delta,
    ]),
    [
      ["starter", 60, -12],
      ["complete", 72, 0],
      ["ongoing", 87, 15],
    ],
  );
});

test("cart migrates saved Focus, Essential, Launch and Partnership items without changing their prices", () => {
  const legacy = [
    {
      kind: "service",
      name: "Graphic design · Focus",
      plan: "Focus",
      selections: [{ id: "design/graphic-design", name: "Graphic design" }],
      duration: "6 months",
      commitmentMonths: 6,
      billing: "project",
      estimate: 1800,
      sourceHref: "/services?duration=6#/service/design/graphic-design",
    },
    {
      kind: "service",
      name: "Care bundle",
      plan: "",
      selections: SERVICE_BUNDLES[2].ids.map((id) => ({ id, name: id })),
      duration: "6 months",
      commitmentMonths: 6,
      billing: "monthly",
      estimate: 3828,
      sourceHref: "/services?engagement=partner#svc-builder",
    },
    {
      kind: "software",
      name: "HR · Essential",
      plan: "Essential",
      selections: [{ id: "hr", name: "HR" }],
      duration: "12 months",
      commitmentMonths: 12,
      billing: "monthly",
      estimate: 33,
      sourceHref: "/software?duration=annual#/product/hr",
    },
    {
      kind: "software",
      name: "Complete suite · Launch plan",
      plan: "Launch plan",
      selections: SOFTWARE_PRODUCTS.map((product) => ({
        id: product.id,
        name: product.formal,
      })),
      duration: "Monthly",
      commitmentMonths: 1,
      billing: "monthly",
      estimate: 147,
      sourceHref: "/software#/plans/complete/monthly/hr",
    },
    {
      kind: "service",
      name: "Web design services · Connected",
      plan: "Connected",
      selections: [{ id: "design", name: "Web design services" }],
      duration: "3 months",
      commitmentMonths: 3,
      billing: "project",
      estimate: 4200,
      sourceHref: "/services#/family/design",
    },
  ];
  resetCart(legacy);
  const items = getCartSnapshot().items;
  assert.deepEqual(
    items.map((item) => [
      item.name,
      item.planId,
      item.billing,
      item.estimate,
      item.duration,
    ]),
    [
      ["Graphic design", "starter", "project", 1800, ""],
      ["Care bundle", "ongoing", "monthly", 3828, "6 months"],
      ["HR", "starter", "monthly", 33, "12 months"],
      ["All-in-one suite", "starter", "monthly", 147, "Monthly"],
      ["Web design services", "complete", "project", 11340, ""],
    ],
  );
  assert.deepEqual(getCartSnapshot().repriced, [items[4].id]);
  for (const item of items)
    assert.match(
      item.sourceHref,
      /^\/(services|software)\?.*#(svc|plan)-builder$/,
    );
  resetCart();
});

test("cart persists configuration, prevents duplicates, and distinguishes plans and terms", () => {
  resetCart();
  addCartItem(operations);
  addCartItem({
    ...operations,
    selections: operations.selections.toReversed(),
  });
  assert.equal(saved().length, 1);
  assert.equal(saved()[0].commitmentMonths, 12);
  assert.deepEqual(
    saved()[0].selections.map((entry) => entry.id),
    ["hr", "files", "tasks"],
  );
  addCartItem({ ...operations, termId: "monthly" });
  addCartItem({ ...operations, planId: "ongoing" });
  assert.equal(saved().length, 3);
  removeCartItem(saved()[0].id);
  assert.equal(saved().length, 2);
});

test("removal can be undone once, restoring an item and its original position without duplicates", () => {
  resetCart();
  addCartItem(operations);
  addCartItem({ ...graphicDesign("ongoing", 3) });
  addCartItem({ ...operations, planId: "ongoing" });
  const original = saved();
  removeCartItem(original[1].id);
  assert.equal(saved().length, 2);
  undoCartRemoval();
  assert.deepEqual(saved(), original);
  undoCartRemoval();
  removeCartItem("missing-item");
  assert.deepEqual(saved(), original);
});

test("totals separate monthly and one-off amounts, add period totals and savings, and mark on-request items", () => {
  const items = [
    createCartItem(operations),
    createCartItem({
      kind: "service",
      name: "Launch bundle",
      planId: "starter",
      selections: SERVICE_BUNDLES[0].ids.map((id) => ({ id, name: id })),
    }),
    createCartItem(graphicDesign("ongoing", 6)),
    createCartItem({
      kind: "software",
      name: "Custom plan",
      selections: [{ id: "unlisted", name: "Unlisted product" }],
      billing: "monthly",
      estimate: null,
    }),
  ];
  assert.deepEqual(cartTotals(items), {
    monthly: 72 + 1450,
    project: 4752,
    periodTotal: 72 * 12 + 4752 + 1450 * 6,
    savings: (Math.round(83 * 1.2) - 72) * 12 + (5400 - 4752),
    onRequest: true,
  });
});

test("stored input cannot introduce unsafe configuration links or malformed selections", () => {
  const unknown = {
    kind: "software",
    name: "Imported",
    selections: [{ id: "unknown", name: "Unknown" }],
    estimate: 10,
  };
  assert.equal(createCartItem(null), null);
  assert.equal(createCartItem({ ...operations, selections: [] }), null);
  assert.equal(
    createCartItem({ ...unknown, sourceHref: "javascript:alert(1)" })
      .sourceHref,
    "/software",
  );
  assert.equal(
    createCartItem({ ...unknown, sourceHref: "//example.com" }).sourceHref,
    "/software",
  );
  assert.equal(createCartItem({ ...unknown, estimate: -10 }).estimate, null);
  assert.equal(
    createCartItem({ ...operations, estimate: 1 }).estimate,
    72,
    "Known selections ignore saved prices",
  );
});

test("storage failures do not lose the in-memory cart, and malformed cross-tab data recovers", () => {
  resetCart();
  const persist = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("Storage unavailable");
  };
  assert.doesNotThrow(() => addCartItem({ ...operations, planId: "starter" }));
  assert.equal(getCartSnapshot().items.length, 1);
  window.localStorage.setItem = persist;
  addCartItem({ ...operations, planId: "ongoing" });
  assert.equal(saved().length, 2);
  assert.doesNotThrow(() =>
    events.get("storage")({ key: CART_STORAGE_KEY, newValue: "bad JSON" }),
  );
  addCartItem(operations);
  assert.equal(saved().length, 1);
});

test("checkout requires contactable details and bundles items, totals and optional answers into an enquiry", () => {
  const values = {
    name: "  Preview Customer  ",
    email: " customer@example.com ",
    phone: " +41 00 000 0000 ",
    company: " Example Team ",
    message: " A new workspace. ",
    start: "soon",
    contact: "carrier-pigeon",
  };
  assert.deepEqual(validateCheckout(values), {});
  assert.deepEqual(
    Object.keys(validateCheckout({ ...values, name: " ", email: "invalid" })),
    ["name", "email"],
  );
  const cartBefore = storage.get(CART_STORAGE_KEY);
  const enquiry = createCheckoutEnquiry([createCartItem(operations)], values);
  assert.equal(enquiry.schemaVersion, 2);
  assert.equal(enquiry.status, "local-preview");
  assert.equal(enquiry.customer.name, "Preview Customer");
  assert.equal(enquiry.customer.email, "customer@example.com");
  assert.deepEqual(enquiry.preferences, { start: "soon", contact: null });
  assert.equal(enquiry.items[0].duration, "12 months");
  assert.equal(enquiry.items[0].plan, "Complete");
  assert.equal(enquiry.items[0].selections.length, 3);
  assert.equal(enquiry.estimate.monthly, 72);
  assert.equal(enquiry.estimate.periodTotal, 864);
  assert.equal(enquiry.message, "A new workspace.");
  assert.equal(
    storage.get(CART_STORAGE_KEY),
    cartBefore,
    "Customer details must not be persisted",
  );
});

test("editing preserves the original until save, replaces it in place, and avoids duplicate configurations", () => {
  resetCart();
  addCartItem(operations);
  addCartItem({ ...operations, planId: "ongoing" });
  const original = saved();
  beginCartEdit(original[0].id);
  assert.deepEqual(saved(), original);
  cancelCartEdit();
  assert.deepEqual(saved(), original);
  beginCartEdit(original[0].id);
  addCartItem({ ...operations, termId: "biennial" });
  let next = saved();
  assert.equal(next.length, 2);
  assert.equal(next[0].duration, "24 months");
  assert.equal(
    next[0].estimate,
    priceSoftware(["hr", "tasks", "files"], "complete", "biennial").estimate,
  );
  assert.equal(next[1].id, original[1].id);
  beginCartEdit(next[0].id);
  addCartItem({ ...operations, planId: "ongoing" });
  next = saved();
  assert.equal(next.length, 1);
  assert.equal(next[0].id, original[1].id);
});

test("clearing the cart supports undo and restores all selections in their original order", () => {
  resetCart();
  addCartItem(operations);
  addCartItem({
    kind: "service",
    name: "Launch bundle",
    planId: "starter",
    selections: SERVICE_BUNDLES[0].ids.map((id) => ({ id, name: id })),
  });
  const original = saved();
  clearCart();
  assert.deepEqual(saved(), []);
  undoCartRemoval();
  assert.deepEqual(saved(), original);
  undoCartRemoval();
  assert.deepEqual(saved(), original);
});

test("service duration accepts the four supported terms and recovers invalid saved links", () => {
  assert.deepEqual(SERVICE_DURATIONS, [1, 3, 6, 12]);
  for (const months of SERVICE_DURATIONS) {
    const query = new URLSearchParams(`duration=${months}`);
    assert.deepEqual(getServiceDuration(query.get("duration")), {
      months,
      label: `${months} month${months === 1 ? "" : "s"}`,
    });
  }
  for (const value of [null, "", "invalid", "0", "2", "-3", "6.5", "24"])
    assert.deepEqual(getServiceDuration(value), {
      months: 1,
      label: "1 month",
    });
});

test("Ongoing commitments stay distinct, project plans drop them, and checkout keeps billing", () => {
  resetCart();
  for (const months of SERVICE_DURATIONS) {
    addCartItem(graphicDesign("ongoing", months));
    addCartItem(graphicDesign("ongoing", months));
  }
  const ongoing = saved();
  assert.equal(ongoing.length, 4);
  assert.equal(new Set(ongoing.map((item) => item.id)).size, 4);
  addCartItem(graphicDesign("starter", 6));
  const all = saved();
  assert.equal(all[4].duration, "");
  assert.equal(all[4].commitmentMonths, 1);
  assert.equal(all[4].billing, "project");
  assert.deepEqual(cartTotals(all), {
    monthly: 5800,
    project: 1800,
    periodTotal: 1450 * (1 + 3 + 6 + 12) + 1800,
    savings: 0,
    onRequest: false,
  });
  const enquiry = createCheckoutEnquiry(all, contact);
  assert.deepEqual(
    enquiry.items.map((item) => [
      item.duration,
      item.commitmentMonths,
      item.estimate,
      item.billing,
    ]),
    [
      ["1 month", 1, 1450, "monthly"],
      ["3 months", 3, 1450, "monthly"],
      ["6 months", 6, 1450, "monthly"],
      ["12 months", 12, 1450, "monthly"],
      ["", 1, 1800, "project"],
    ],
  );
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
  }
  assert.deepEqual(getServiceChoices("unknown"), []);
  assert.equal(JSON.stringify(SERVICE_FAMILIES), original);
});

test("switching plans in the cart reprices in place, merges identical items and Undo restores them", () => {
  resetCart();
  addCartItem(graphicDesign("starter"));
  addCartItem(operations);
  addCartItem(graphicDesign("complete"));
  const original = saved();
  const ongoing = updateCartItem(original[0].id, { planId: "ongoing" });
  assert.equal(ongoing.billing, "monthly");
  assert.equal(ongoing.estimate, 1450);
  assert.equal(ongoing.duration, "1 month");
  assert.equal(saved()[0].id, ongoing.id, "the item stays in place");
  undoCartUpdate();
  assert.deepEqual(saved(), original);
  const merged = updateCartItem(original[0].id, { planId: "complete" });
  assert.equal(merged.estimate, 4200);
  assert.equal(saved().length, 2);
  assert.match(getCartSnapshot().notice.text, /Matching selections combined/);
  undoCartUpdate();
  assert.deepEqual(saved(), original);
  assert.equal(updateCartItem(original[0].id, { planId: "premium" }), null);
  assert.equal(updateCartItem("missing", { planId: "ongoing" }), null);
  assert.equal(
    updateCartItem(original[0].id, { planId: "starter" }).id,
    original[0].id,
  );
});

test("commitments apply only to Ongoing services and software terms reprice the subscription", () => {
  resetCart();
  addCartItem(graphicDesign("starter"));
  addCartItem(graphicDesign("ongoing", 3));
  addCartItem(operations);
  const [starter, ongoing, software] = saved();
  assert.equal(
    updateServicePeriod(starter.id, 6),
    null,
    "project plans have no commitment",
  );
  const sixMonths = updateServicePeriod(ongoing.id, "6");
  assert.equal(sixMonths.commitmentMonths, 6);
  assert.equal(getServicePeriodEstimate(sixMonths), 8700);
  undoServicePeriod();
  assert.equal(saved()[1].commitmentMonths, 3);
  assert.equal(updateServicePeriod(ongoing.id, 24), null);
  const monthly = updateCartItem(software.id, { termId: "monthly" });
  assert.equal(
    monthly.estimate,
    priceSoftware(["hr", "tasks", "files"], "complete", "monthly").estimate,
  );
  assert.equal(monthly.commitmentMonths, 1);
  assert.equal(updateCartItem(software.id, { commitmentMonths: 3 }), null);
  assert.equal(updateCartItem(monthly.id, { termId: "weekly" }), null);
});

test("cart checks find overlapping selections and missing commitments", () => {
  const launch = createCartItem({
    kind: "service",
    name: "Launch bundle",
    planId: "complete",
    selections: SERVICE_BUNDLES[0].ids.map((id) => ({ id, name: id })),
  });
  const web = createCartItem({
    kind: "service",
    name: "Web",
    planId: "starter",
    selections: [{ id: "development/web-development", name: "Web" }],
  });
  const suite = createCartItem({
    kind: "software",
    name: "Suite",
    planId: "starter",
    selections: SOFTWARE_PRODUCTS.map((product) => ({
      id: product.id,
      name: product.formal,
    })),
  });
  const crm = createCartItem({
    kind: "software",
    name: "CRM",
    planId: "starter",
    termId: "annual",
    selections: [{ id: "crm", name: "CRM" }],
  });
  const legacyOngoing = createCartItem({
    kind: "service",
    name: "Care",
    plan: "Partnership",
    selections: [{ id: "hosting/managed-hosting", name: "Hosting" }],
    duration: "Ongoing partnership",
    billing: "monthly",
  });
  const checks = getCartChecks([launch, web, suite, crm, legacyOngoing]);
  const overlaps = checks.filter((check) => check.type === "overlap");
  assert.equal(overlaps.length, 2);
  assert.deepEqual(overlaps[0].names, ["Web development and programming"]);
  assert.deepEqual(overlaps[0].fix, {
    action: "remove-item",
    itemId: web.id,
    keepId: launch.id,
  });
  assert.deepEqual(overlaps[1].fix, {
    action: "remove-item",
    itemId: crm.id,
    keepId: suite.id,
  });
  assert.deepEqual(
    checks
      .filter((check) => check.type === "commitment")
      .map((check) => check.itemIds[0]),
    [legacyOngoing.id],
  );
  const twice = getCartChecks([
    createCartItem(graphicDesign("starter")),
    createCartItem(graphicDesign("ongoing", 3)),
  ]);
  assert.equal(twice.length, 1);
  assert.equal(twice[0].fix.action, "choose");
  assert.deepEqual(getCartChecks([launch, suite]), []);
});

test("overlap fixes keep the higher plan and can be undone", () => {
  resetCart();
  const visibility = SERVICE_BUNDLES.find(
    (bundle) => bundle.id === "visibility",
  );
  addCartItem({
    kind: "service",
    name: "Visibility bundle",
    planId: "starter",
    selections: visibility.ids.map((id) => ({ id, name: id })),
  });
  addCartItem(graphicDesign("complete"));
  const [bundle, single] = saved();
  const [check] = getCartChecks(saved());
  assert.deepEqual(check.fix, {
    action: "remove-selection",
    itemId: bundle.id,
    selectionIds: ["design/graphic-design"],
  });
  const trimmed = updateCartItem(check.fix.itemId, {
    removeSelectionIds: check.fix.selectionIds,
  });
  assert.equal(trimmed.selections.length, 2);
  assert.equal(
    trimmed.estimate,
    priceServices(visibility.ids.slice(1), "starter").estimate,
  );
  assert.equal(saved()[1].id, single.id, "the Complete plan is kept");
  assert.deepEqual(getCartChecks(saved()), []);
  undoCartUpdate();
  assert.equal(saved()[0].id, bundle.id);
  assert.equal(
    updateCartItem(single.id, {
      removeSelectionIds: ["design/graphic-design"],
    }),
    null,
    "an item cannot lose its last service",
  );
});

test("every service and software selection keeps savings from dropping as it grows", () => {
  const ids = allServiceIds;
  for (let mask = 1; mask < 1 << ids.length; mask++) {
    const picked = ids.filter((_, index) => mask & (1 << index));
    const rate = getServiceSavingRate(picked);
    for (let index = 0; index < ids.length; index++) {
      if (mask & (1 << index)) continue;
      assert.ok(getServiceSavingRate([...picked, ids[index]]) >= rate);
    }
  }
  const products = SOFTWARE_PRODUCTS.map((product) => product.id);
  for (let mask = 1; mask < 1 << products.length; mask++) {
    const picked = products.filter((_, index) => mask & (1 << index));
    const rate = getSoftwareBundleRate(picked);
    for (let index = 0; index < products.length; index++) {
      if (mask & (1 << index)) continue;
      assert.ok(getSoftwareBundleRate([...picked, products[index]]) >= rate);
    }
  }
});

test("a plan card and the builder create the same cart item for the same choice", () => {
  const design = getServicePlanSelection("design");
  const fromPlanCard = createCartItem({
    kind: "service",
    name: design.name,
    planId: "complete",
    selections: design.ids.map((id) => ({ id, name: id })),
  });
  const fromBuilder = createCartItem({
    kind: "service",
    name: "Custom service bundle",
    planId: "complete",
    selections: [...design.ids].reverse().map((id) => ({ id, name: "x" })),
  });
  assert.equal(fromPlanCard.id, fromBuilder.id);
  assert.equal(fromPlanCard.name, "Web design services");
  const productPage = createCartItem({
    kind: "software",
    name: "HR · Essential",
    planId: "complete",
    termId: "annual",
    selections: [{ id: "hr", name: "HR" }],
  });
  const softwareBuilder = createCartItem({
    kind: "software",
    name: "Single product",
    planId: "complete",
    termId: "annual",
    selections: [{ id: "hr", name: "People" }],
  });
  assert.equal(productPage.id, softwareBuilder.id);
});

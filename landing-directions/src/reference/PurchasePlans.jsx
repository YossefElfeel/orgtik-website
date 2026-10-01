import React, { useState } from "react";
import { CommerceLayout } from "./CommerceLayout";
import {
  CATALOG,
  HOSTING_URL,
  groupFromIds,
  money,
  configurationHref,
  quoteGroup,
} from "./purchase-catalog.js";
import { BundleCollection, PreviewNote } from "./PurchaseUI";
import {
  DurationPicker,
  AddPackageButton,
  PurchaseAction,
} from "./PurchaseControls";
export default function PurchasePlans() {
  const [kind, setKind] = useState("service");
  const [department, setDepartment] = useState("all");
  const [months, setMonths] = useState(1);
  const entries = CATALOG.filter((i) => i.kind === kind);
  const departments = [
    ...new Map(entries.map((i) => [i.department, i.departmentName])).entries(),
  ];
  const visible = entries.filter(
    (i) => department === "all" || i.department === department,
  );
  return (
    <CommerceLayout steps={false}>
      <div className="purchase-surface">
        <div className="commerce-intro">
          <span className="purchase-eyebrow">One package. Your duration.</span>
          <h1>
            Bundles & pricing.<span>Choose your starting point.</span>
          </h1>
          <p>
            Start with a collection or choose individual packages. Customize
            every detail before paying.
          </p>
        </div>
        <div className="purchase-entry-links">
          <span>Start with a bundle below, or choose each item yourself.</span>
          <PurchaseAction
            secondary
            href={
              kind === "service"
                ? "/services#svc-builder"
                : "/software#plan-builder"
            }
          >
            Build your own plan
          </PurchaseAction>
        </div>
        <div
          className="purchase-filters"
          role="group"
          aria-label="Package type"
        >
          <button
            type="button"
            aria-pressed={kind === "service"}
            onClick={() => {
              setKind("service");
              setDepartment("all");
            }}
          >
            Services
          </button>
          <button
            type="button"
            aria-pressed={kind === "software"}
            onClick={() => {
              setKind("software");
              setDepartment("all");
            }}
          >
            Software
          </button>
        </div>
        <div className="purchase-filters" role="group" aria-label="Department">
          <button
            type="button"
            aria-pressed={department === "all"}
            onClick={() => setDepartment("all")}
          >
            All departments
          </button>
          {departments.map(([id, name]) => (
            <button
              key={id}
              type="button"
              aria-pressed={department === id}
              onClick={() => setDepartment(id)}
            >
              {name}
            </button>
          ))}
        </div>
        <h2 className="purchase-directory-heading">Ready-made bundles</h2>
        <BundleCollection kind={kind} department={department} />
        <div className="purchase-heading">
          <div>
            <span className="purchase-eyebrow">
              Pick one. Or bring them together.
            </span>
            <h2>Individual packages</h2>
          </div>
          <DurationPicker
            label="Package duration"
            months={months}
            onChange={setMonths}
            showSavings
          />
        </div>
        <div className="purchase-directory">
          {visible.map((item) => {
            const group = groupFromIds(kind, [item.id], months);
            const quote = quoteGroup(group);
            return (
              <article className="purchase-directory-row" key={item.id}>
                <div>
                  <span className="purchase-eyebrow">
                    {item.departmentName}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.capabilities.join(" · ")}</p>
                </div>
                <div>
                  <strong>{money(quote.total)}</strong>
                  <small>
                    {months} {months === 1 ? "month" : "months"} upfront
                  </small>
                  <small>
                    {money(Math.round(quote.monthlyEquivalent))}/month
                    equivalent
                  </small>
                </div>
                <div>
                  <AddPackageButton item={group} />
                  <a href={configurationHref(group)}>Customize selection</a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="purchase-directory-footer">
          <PurchaseAction
            href={
              kind === "service"
                ? "/services#svc-builder"
                : "/software#plan-builder"
            }
          >
            Build a custom plan
          </PurchaseAction>
          <a href={HOSTING_URL}>
            Hosting is purchased on the OrgTik hosting website{" "}
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <PreviewNote />
      </div>
    </CommerceLayout>
  );
}

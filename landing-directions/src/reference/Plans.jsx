import React, { useState } from "react";
import { CommerceLayout } from "./CommerceLayout";
import { AddToCartButton } from "./CartControls";
import { PlanCompareDialog, PlanCompareTable } from "./PlanCompare";
import { PromiseList } from "./PlanPromises";
import { ServiceDuration } from "./ServiceDuration";
import { createCartItem } from "./cart-store";
import { PLAN_IDS, PLANS, formatCHF, planName } from "./plan-ladder";
import { getPlanComparison } from "./plan-pricing";
import {
  SERVICE_BUNDLES,
  SERVICE_FAMILIES,
  getServiceEntry,
  getServicePlanSelection,
  getServiceSavingRate,
  priceServices,
  recommendServicePlan,
} from "./service-catalog";
import {
  SOFTWARE_BUNDLES,
  SOFTWARE_PRODUCTS,
  SOFTWARE_TERMS,
  nameSoftwareSelection,
  priceSoftware,
  recommendSoftwarePlan,
} from "./software-catalog";
import "./cart.css";
import "./plans.css";

const percent = (rate) => `${Math.round(rate * 100)}%`;

function PriceCell({ kind, planId, estimate, recommended }) {
  const monthly = kind === "software" || planId === "ongoing";
  return (
    <td
      role="cell"
      data-plan={planName(planId)}
      className={recommended ? "is-recommended" : undefined}
    >
      <span className="plans-table__price">
        {kind === "service" && <small>From </small>}
        <b>{formatCHF(estimate)}</b>
        <small>{monthly ? " / month" : " / project"}</small>
      </span>
      {recommended && <span className="plans-table__rec">Recommended</span>}
    </td>
  );
}

function PlansTable({ caption, kind, rows, termId, onCompare }) {
  return (
    <table className="plans-table" role="table">
      <caption className="plan-sr-only">{caption}</caption>
      <thead role="rowgroup">
        <tr role="row">
          <th scope="col" role="columnheader">
            {kind === "software" ? "Product or bundle" : "Service"}
          </th>
          {PLAN_IDS.map((id) => (
            <th scope="col" role="columnheader" key={id}>
              {planName(id)}
              <small>
                {
                  PLANS[id][kind === "software" ? "software" : "service"]
                    .subtitle
                }
              </small>
            </th>
          ))}
          <th scope="col" role="columnheader">
            <span className="plan-sr-only">Compare</span>
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((row) => {
          const recommended = (
            kind === "software" ? recommendSoftwarePlan : recommendServicePlan
          )(row.ids)?.planId;
          return (
            <tr role="row" key={row.key}>
              <th scope="row" role="rowheader">
                <span className="plans-table__name">{row.title}</span>
                {row.detail && (
                  <span className="plans-table__detail">{row.detail}</span>
                )}
              </th>
              {PLAN_IDS.map((planId) => (
                <PriceCell
                  key={planId}
                  kind={kind}
                  planId={planId}
                  recommended={recommended === planId}
                  estimate={
                    kind === "software"
                      ? priceSoftware(row.ids, planId, termId).estimate
                      : priceServices(row.ids, planId).estimate
                  }
                />
              ))}
              <td role="cell" className="plans-table__action">
                <button
                  type="button"
                  onClick={() =>
                    onCompare({ kind, ids: row.ids, title: row.title })
                  }
                  aria-label={`Compare and choose a plan for ${row.title}`}
                >
                  Compare
                  <i className="ph ph-arrow-right" aria-hidden="true" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Plans() {
  const [view, setView] = useState("all");
  const [department, setDepartment] = useState("all");
  const [termId, setTermId] = useState("annual");
  const [compare, setCompare] = useState(null);
  const families = SERVICE_FAMILIES.filter(
    (family) => department === "all" || family.slug === department,
  );
  const comparison =
    compare &&
    getPlanComparison(compare.kind, compare.ids, {
      termId: compare.kind === "software" ? termId : undefined,
    });
  const softwareRows = [
    ...SOFTWARE_PRODUCTS.map((product) => ({
      key: product.id,
      ids: [product.id],
      title: product.formal,
      detail: product.tasks.join(" · "),
    })),
    ...SOFTWARE_BUNDLES.map((bundle) => ({
      key: bundle.id,
      ids: bundle.ids,
      title: bundle.name,
      detail: `${bundle.ids.length} products · ${percent(bundle.rate)} saving`,
    })),
  ];
  return (
    <CommerceLayout steps={false} className="commerce-page--plans">
      <div className="commerce-intro plans-intro">
        <h1>
          Every plan and price.
          <span>In one place.</span>
        </h1>
        <p>
          Starter, Complete and Ongoing work the same way for every service and
          software product. Compare them here, or build a combination and we’ll
          recommend the plan that fits.
        </p>
      </div>
      <PromiseList className="plans-promises" />

      <section className="plans-ladder" aria-labelledby="plans-ladder-title">
        <h2 id="plans-ladder-title">How the three plans work</h2>
        <ol className="plans-ladder__grid">
          {PLAN_IDS.map((id, index) => (
            <li key={id}>
              <span className="plans-ladder__step">0{index + 1}</span>
              <h3>{planName(id)}</h3>
              <dl>
                <div>
                  <dt>Services</dt>
                  <dd>{PLANS[id].service.body}</dd>
                </div>
                <div>
                  <dt>Software</dt>
                  <dd>{PLANS[id].software.body}</dd>
                </div>
                <div>
                  <dt>Billed</dt>
                  <dd>
                    {id === "ongoing"
                      ? "Monthly, for services and software"
                      : "Per project for services, monthly for software"}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
        <p className="plans-ladder__note">
          Each plan includes everything in the plan before it. Choosing several
          services or products adds a saving automatically, and adding more
          never lowers it.
        </p>
      </section>

      <div className="plans-toolbar">
        <div className="cart-filters" role="group" aria-label="Show plans for">
          {[
            ["all", "Everything"],
            ["services", "Services"],
            ["software", "Software"],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-pressed={view === id}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view !== "software" && (
        <section
          className="plans-section"
          aria-labelledby="plans-services-title"
        >
          <div className="plans-section__heading">
            <div>
              <h2 id="plans-services-title">Services</h2>
              <p>
                Prices are per service. Two services save 5%, three or four save
                10% and five or more save 15%. A ready-made bundle always saves
                at least 12%.
              </p>
            </div>
            <a href="/services#svc-builder">
              Build a service bundle
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </a>
          </div>
          <div
            className="plans-departments"
            role="group"
            aria-label="Filter services by department"
          >
            {[
              { slug: "all", short: "All departments" },
              ...SERVICE_FAMILIES,
            ].map((family) => (
              <button
                type="button"
                key={family.slug}
                aria-pressed={department === family.slug}
                onClick={() => setDepartment(family.slug)}
              >
                {family.short}
              </button>
            ))}
          </div>
          {families.map((family) => {
            const overview = getServicePlanSelection(family.slug);
            return (
              <div className="plans-group" key={family.slug}>
                <h3>{family.name}</h3>
                <PlansTable
                  caption={`${family.name} plans`}
                  kind="service"
                  onCompare={setCompare}
                  rows={[
                    ...family.children.map((service) => ({
                      key: service.slug,
                      ids: [`${family.slug}/${service.slug}`],
                      title: service.name,
                      detail: service.outcome,
                    })),
                    ...(family.children.length > 1
                      ? [
                          {
                            key: `${family.slug}-all`,
                            ids: overview.ids,
                            title: `All ${family.short} services`,
                            detail: `${overview.ids.length} services · ${percent(getServiceSavingRate(overview.ids))} saving`,
                          },
                        ]
                      : []),
                  ]}
                />
              </div>
            );
          })}
          {department === "all" && (
            <div className="plans-group">
              <h3>Ready-made bundles</h3>
              <PlansTable
                caption="Ready-made service bundle plans"
                kind="service"
                onCompare={setCompare}
                rows={SERVICE_BUNDLES.map((bundle) => ({
                  key: bundle.id,
                  ids: bundle.ids,
                  title: bundle.name,
                  detail: `${bundle.ids
                    .map((id) => getServiceEntry(id).c.name)
                    .join(", ")} · 12% saving`,
                }))}
              />
            </div>
          )}
        </section>
      )}

      {view !== "services" && (
        <section
          className="plans-section"
          aria-labelledby="plans-software-title"
        >
          <div className="plans-section__heading">
            <div>
              <h2 id="plans-software-title">Software</h2>
              <p>
                Every plan includes the full product. Plans differ in how much
                setup and support you get. Bundles save 15%, all six products
                save 25%.
              </p>
            </div>
            <a href="/software#plan-builder">
              Build a software workspace
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </a>
          </div>
          <ServiceDuration
            variant="compact"
            label="Billing term"
            hint="A longer term lowers the monthly price. Prices below update."
            months={termId}
            onChange={setTermId}
            options={SOFTWARE_TERMS.map((term) => ({
              value: term.id,
              label: term.discount
                ? `${term.label} · −${percent(term.discount)}`
                : term.label,
            }))}
          />
          <div className="plans-group">
            <PlansTable
              caption="Software plans"
              kind="software"
              termId={termId}
              onCompare={setCompare}
              rows={softwareRows}
            />
          </div>
        </section>
      )}

      <section className="plans-help" aria-labelledby="plans-help-title">
        <h2 id="plans-help-title">Not sure where to start?</h2>
        <p>
          Pick what you need and the builder recommends a plan, with the reason.
          You can change it in your cart at any time.
        </p>
        <div>
          <a href="/services#svc-builder" className="commerce-action">
            Build a service bundle
            <span className="commerce-action__arrow">
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </span>
          </a>
          <a
            href="/software#plan-builder"
            className="commerce-action commerce-action--secondary"
          >
            Build a software workspace
            <span className="commerce-action__arrow">
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </span>
          </a>
          <a href="/contact" className="commerce-text-link">
            Talk to us <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
        <p className="plans-help__note">
          Prototype estimates. Final scope, pricing, taxes and terms are
          confirmed with the team.
        </p>
      </section>

      <PlanCompareDialog
        open={Boolean(compare)}
        onClose={() => setCompare(null)}
        title={compare ? `${compare.title} plans` : "Compare plans"}
        description={
          compare?.kind === "software"
            ? "Every plan includes the same products. Setup and support change by plan."
            : "All three plans for the same services. Prices already include any multi-service saving."
        }
      >
        {compare && (
          <PlanCompareTable
            caption={`${compare.title} plans`}
            plans={comparison.plans}
            groups={comparison.groups}
            renderAction={(plan) => (
              <AddToCartButton
                removable={compare.kind === "service"}
                onAction={() => setCompare(null)}
                item={createCartItem({
                  kind: compare.kind,
                  name:
                    compare.kind === "software"
                      ? nameSoftwareSelection(compare.ids)
                      : compare.title,
                  planId: plan.planId,
                  termId: compare.kind === "software" ? termId : undefined,
                  selections: compare.ids.map((id) => ({ id, name: id })),
                  ...(compare.kind === "service" && plan.planId === "ongoing"
                    ? { duration: "1 month", commitmentMonths: 1 }
                    : {}),
                })}
              />
            )}
          />
        )}
      </PlanCompareDialog>
    </CommerceLayout>
  );
}

import React, { useState, useEffect, useRef, useId } from "react";
import {
  CATALOG,
  BUNDLES,
  MONTHS,
  HOSTING_URL,
  findItem,
  findBundle,
  createGroup,
  groupFromIds,
  groupFromLocation,
  groupName,
  groupTerm,
  quoteGroup,
  quoteCart,
  money,
  termLabel,
  configurationHref,
} from "./purchase-catalog.js";
import {
  AddPackageButton,
  DurationPicker,
  PurchaseAction,
  PurchaseDialog,
} from "./PurchaseControls";

export function PreviewNote() {
  return (
    <p className="purchase-note">
      <i className="ph ph-info" aria-hidden="true" /> Prices in CHF. Full
      selected periods are paid upfront.
    </p>
  );
}
export function PurchaseHeading({ eyebrow, title, accent, children }) {
  return (
    <div className="purchase-heading">
      <div>
        <span className="purchase-eyebrow">{eyebrow}</span>
        <h2>
          {title}
          {accent && <span>{accent}</span>}
        </h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}
export function OrderContents({ groups }) {
  return (
    <div className="purchase-order-contents">
      {groups.map((group) => (
        <div key={group.id} className="purchase-order-group">
          <strong>{groupName(group)}</strong>
          <ul>
            {quoteGroup(group).lines.map((line) => (
              <li key={line.catalogId}>
                <span>
                  {line.name}
                  <small>
                    {termLabel(line.months)} ·{" "}
                    {line.autoRenew ? "Auto-renewal on" : "Manual renewal"}
                  </small>
                </span>
                <b>{money(line.total)}</b>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export function MobilePurchaseBar({
  groups,
  scopeRef,
  children,
  note = "Due today · upfront",
}) {
  const [visible, setVisible] = useState(!scopeRef);
  useEffect(() => {
    if (!scopeRef?.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(scopeRef.current);
    return () => observer.disconnect();
  }, [scopeRef]);
  return visible ? (
    <aside className="purchase-mobile-bar" aria-label="Purchase actions">
      <div>
        <small>{note}</small>
        <strong>{money(quoteCart(groups).total)}</strong>
      </div>
      {children}
    </aside>
  ) : null;
}
export function QuoteSummary({
  groups,
  title = "Your selection",
  id,
  children,
}) {
  const quote = quoteCart(groups);
  const summary = useRef(null);
  useEffect(() => {
    const element = summary.current;
    const measure = () =>
      element.style.setProperty(
        "--purchase-summary-height",
        `${element.offsetHeight}px`,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <aside className="purchase-summary" id={id} ref={summary}>
      <span className="purchase-eyebrow">{title}</span>
      <div className="purchase-summary__amount">
        <small>Due today</small>
        <strong>{money(quote.total)}</strong>
        <span>Full selected periods, paid upfront</span>
      </div>
      <p className="purchase-sr-only" role="status" aria-live="polite">
        Due today {money(quote.total)}. Savings {money(quote.saving)}.
      </p>
      <dl>
        <div>
          <dt>Before savings</dt>
          <dd>{money(quote.subtotal)}</dd>
        </div>
        <div>
          <dt>Your savings</dt>
          <dd>−{money(quote.saving)}</dd>
        </div>
        <div>
          <dt>Tax</dt>
          <dd>Not calculated</dd>
        </div>
      </dl>
      <p className="purchase-summary__equivalent">
        {money(Math.round(quote.monthlyEquivalent))}/month equivalent.
        {groups.some((g) => groupTerm(g) === "Mixed durations") &&
          " Items have different periods."}
      </p>
      {children}
      <p className="purchase-summary__foot">
        Includes your OrgTik account for purchases, payments, and invoices.
      </p>
      <a href="/plans">
        Explore all bundles & pricing{" "}
        <i className="ph ph-arrow-up-right" aria-hidden="true" />
      </a>
    </aside>
  );
}
export function PackageLines({
  group,
  onChange,
  onRemove,
  renewal = true,
  compact = false,
}) {
  const quoted = quoteGroup(group);
  return (
    <div className="purchase-lines">
      {group.lines.some((line) => !line.months) && (
        <p className="purchase-alert">
          Your earlier duration is no longer available. Choose 1, 3, 6, or 12
          months for each item before continuing.
        </p>
      )}
      {quoted.lines.map((line) => {
        const item = findItem(line.catalogId, group.kind);
        return (
          <article
            className={`purchase-line ${compact ? "purchase-line--compact" : ""}`}
            key={line.catalogId}
          >
            <div className="purchase-line__heading">
              <div>
                <span className="purchase-eyebrow">{item.departmentName}</span>
                <h3>{item.name}</h3>
              </div>
              <strong>
                {line.months ? money(line.total) : "Choose duration"}
                <small>upfront</small>
              </strong>
            </div>
            <details
              className="purchase-capabilities"
              open={compact ? undefined : true}
            >
              <summary>
                Included capabilities <span>{item.capabilities.length}</span>
              </summary>
              <ul className="purchase-feature-list">
                {item.capabilities.map((c) => (
                  <li key={c}>
                    <i className="ph ph-check" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </details>
            {item.id === "marketing/digital-advertising-switzerland" && (
              <p className="purchase-caption">
                Management only; media spend is separate.
              </p>
            )}
            {onChange ? (
              <DurationPicker
                label={`Duration for ${item.name}`}
                displayLabel="Duration"
                months={line.months}
                onChange={(months) => onChange(line.catalogId, { months })}
              />
            ) : (
              <p>
                {termLabel(line.months)} ·{" "}
                {line.autoRenew ? "Automatic renewal" : "Manual renewal"}
              </p>
            )}
            <div className="purchase-line__foot">
              <span>
                {line.discount > 0
                  ? `${line.discount}% ${line.reason} saving · ${money(line.saving)} saved`
                  : "Monthly base price"}
                {line.months && (
                  <>
                    {" "}
                    · {money(Math.round(line.monthlyEquivalent))}/month
                    equivalent
                  </>
                )}
              </span>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(line.catalogId)}
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              )}
            </div>
            {renewal && onChange && (
              <label className="purchase-check">
                <input
                  type="checkbox"
                  aria-label={`Automatically renew ${item.name}`}
                  checked={line.autoRenew}
                  onChange={(e) =>
                    onChange(line.catalogId, { autoRenew: e.target.checked })
                  }
                />
                <span>
                  Automatic renewal
                  {line.months ? (
                    <small>
                      Every {termLabel(line.months)} at {money(line.total)}
                    </small>
                  ) : (
                    ""
                  )}
                </span>
              </label>
            )}
          </article>
        );
      })}
    </div>
  );
}
export function ConfigurationEditor({
  group,
  onChange,
  showLines = true,
  onClear,
}) {
  const [department, setDepartment] = useState("all");
  const [pendingMonths, setPendingMonths] = useState(null);
  const [sharedDuration, setSharedDuration] = useState(true);
  const durationId = useId();
  useEffect(() => {
    setDepartment("all");
    setPendingMonths(null);
    setSharedDuration(true);
  }, [group.id]);
  const options = CATALOG.filter((i) => i.kind === group.kind);
  const departments = [
    ...new Map(options.map((i) => [i.department, i.departmentName])).entries(),
  ];
  const visible = options.filter(
    (i) => department === "all" || i.department === department,
  );
  const hidden = group.lines.filter(
    (l) => !visible.some((i) => i.id === l.catalogId),
  ).length;
  const applyDuration = (months) => {
    onChange({
      ...group,
      defaultMonths: months,
      lines: group.lines.map((l) => ({ ...l, months })),
    });
    setPendingMonths(null);
  };
  const toggle = (id) =>
    onChange({
      ...group,
      lines: group.lines.some((l) => l.catalogId === id)
        ? group.lines.filter((l) => l.catalogId !== id)
        : [
            ...group.lines,
            { catalogId: id, months: group.defaultMonths, autoRenew: false },
          ],
    });
  const individualLines = (
    <PackageLines
      group={group}
      compact
      onChange={(id, patch) =>
        onChange({
          ...group,
          lines: group.lines.map((line) =>
            line.catalogId === id ? { ...line, ...patch } : line,
          ),
        })
      }
      onRemove={toggle}
    />
  );
  return (
    <div className="purchase-editor">
      <div className="purchase-editor__step">
        <span className="purchase-step">01</span>
        <div className="purchase-editor__selection-copy">
          <div className="purchase-editor__selection-title">
            <h3>
              Choose your {group.kind === "software" ? "products" : "services"}
            </h3>
            <button
              type="button"
              className="purchase-editor__clear"
              onClick={() =>
                onClear ? onClear() : onChange({ ...group, lines: [] })
              }
            >
              Clear all
            </button>
          </div>
          <p>One package each. The same features at every duration.</p>
        </div>
      </div>
      <div
        className="purchase-filters"
        role="group"
        aria-label="Filter by department"
      >
        <button
          type="button"
          aria-pressed={department === "all"}
          onClick={() => setDepartment("all")}
        >
          All
        </button>
        {departments.map(([id, name]) => (
          <button
            type="button"
            key={id}
            aria-pressed={department === id}
            onClick={() => setDepartment(id)}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="purchase-caption" role="status">
        {group.lines.length} selected
        {hidden > 0 ? ` · ${hidden} in other departments` : ""}
      </p>
      <div className="purchase-options">
        {visible.map((item) => {
          const selected = group.lines.some((l) => l.catalogId === item.id);
          return (
            <label
              className={`purchase-option ${selected ? "is-selected" : ""}`}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggle(item.id)}
              />
              <span>
                <span className="purchase-eyebrow">{item.departmentName}</span>
                <strong>{item.name}</strong>
                <span>{item.capabilities.join(" · ")}</span>
                <b>
                  {money(item.monthlyMinor)}
                  <small> / month base price</small>
                </b>
              </span>
            </label>
          );
        })}
      </div>
      <div className="purchase-editor__step">
        <span className="purchase-step">02</span>
        <div className="purchase-editor__duration-copy">
          <div className="purchase-editor__duration-title">
            <h3>Set your shared duration</h3>
            <label className="purchase-duration-switch">
              <input
                type="checkbox"
                role="switch"
                aria-label="Use shared duration"
                aria-controls={`${durationId}-controls`}
                aria-describedby={`${durationId}-note`}
                checked={sharedDuration}
                onChange={(event) => setSharedDuration(event.target.checked)}
              />
              <span aria-hidden="true" />
            </label>
          </div>
          <p id={`${durationId}-note`}>
            {sharedDuration
              ? "Apply one period to all items. Turn off shared duration to set each item individually."
              : "Shared duration is off. Choose a duration for each item below; other items keep their selected durations."}
          </p>
        </div>
      </div>
      <div id={`${durationId}-controls`}>
        {sharedDuration && (
          <DurationPicker
            label="Shared duration"
            months={group.defaultMonths}
            showSavings
            onChange={(months) =>
              group.lines.some((line) => line.months !== group.defaultMonths)
                ? setPendingMonths(months)
                : applyDuration(months)
            }
          />
        )}
        {showLines &&
          !sharedDuration &&
          group.lines.length > 0 &&
          individualLines}
      </div>
      <PurchaseDialog
        open={pendingMonths !== null}
        title="Replace individual durations?"
        onClose={() => setPendingMonths(null)}
      >
        <p>
          Your selection has individual durations. Apply{" "}
          {termLabel(pendingMonths)} to every item?
        </p>
        <div className="purchase-dialog__actions">
          <PurchaseAction onClick={() => applyDuration(pendingMonths)}>
            Apply to all
          </PurchaseAction>
          <PurchaseAction secondary onClick={() => setPendingMonths(null)}>
            Keep my durations
          </PurchaseAction>
        </div>
      </PurchaseDialog>
    </div>
  );
}
export function BundleCard({ bundle, onCustomize }) {
  const [months, setMonths] = useState(1);
  const group = groupFromIds(bundle.kind, bundle.ids, months, bundle.id);
  const quote = quoteGroup(group);
  return (
    <article
      className={`purchase-bundle ${bundle.recommended ? "purchase-bundle--recommended" : ""}`}
    >
      <div className="purchase-bundle__top">
        <span className="purchase-eyebrow">
          {bundle.kind === "software"
            ? "Software bundle"
            : bundle.department.replace("-", " ")}
        </span>
        {bundle.recommended && (
          <span className="purchase-badge">Recommended</span>
        )}
      </div>
      <h3>{bundle.name}</h3>
      <p>{bundle.why}</p>
      <ul className="purchase-feature-list">
        {bundle.ids.map((id) => (
          <li key={id}>
            <i className="ph ph-check" aria-hidden="true" />
            {findItem(id, bundle.kind).name}
          </li>
        ))}
      </ul>
      <div className="purchase-bundle__pricing">
        <small>{termLabel(months)} · paid upfront</small>
        <strong>{money(quote.total)}</strong>
        <span>
          {money(Math.round(quote.monthlyEquivalent))}/month equivalent
        </span>
        <span className="purchase-saving">Save {money(quote.saving)}</span>
      </div>
      <DurationPicker
        label={`Duration for ${bundle.name}`}
        displayLabel="Choose your duration"
        months={months}
        onChange={setMonths}
      />
      <div className="purchase-bundle__actions">
        <AddPackageButton item={group} />
        {onCustomize ? (
          <button
            type="button"
            onClick={() => onCustomize(group)}
            className="purchase-text-button"
            aria-label={`Customize ${bundle.name}`}
          >
            Customize <i className="ph ph-arrow-right" aria-hidden="true" />
          </button>
        ) : (
          <a
            href={configurationHref(group)}
            className="purchase-text-button"
            aria-label={`Customize ${bundle.name}`}
          >
            Customize <i className="ph ph-arrow-right" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
export function BundleCollection({ kind, department = "all", onCustomize }) {
  const bundles = BUNDLES.filter(
    (b) =>
      b.kind === kind && (department === "all" || b.department === department),
  );
  return (
    <div className="purchase-bundles">
      {bundles.map((bundle) => (
        <BundleCard key={bundle.id} bundle={bundle} onCustomize={onCustomize} />
      ))}
    </div>
  );
}
export function PurchasingOverview({ kind, initialIds, initialDuration }) {
  const [group, setGroup] = useState(() => {
    let g = groupFromLocation(kind, window.location);
    if (initialIds?.length) {
      g = groupFromIds(
        kind,
        initialIds,
        initialDuration === "annual"
          ? 12
          : initialDuration === "monthly"
            ? 1
            : 1,
      );
      if (initialDuration === "biennial")
        g.lines.forEach((l) => {
          l.months = null;
        });
    }
    return g;
  });
  const [department, setDepartment] = useState("all");
  const builder = useRef(null);
  useEffect(() => {
    const restore = () => setGroup(groupFromLocation(kind, window.location));
    window.addEventListener("hashchange", restore);
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("hashchange", restore);
      window.removeEventListener("popstate", restore);
    };
  }, [kind]);
  const update = (next) => {
    setGroup(createGroup(next));
    const url = new URL(configurationHref(next), location.origin);
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  };
  const configure = (next) => {
    update(next);
    requestAnimationFrame(() => {
      builder.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      builder.current?.querySelector("input")?.focus({ preventScroll: true });
    });
  };
  const departments = [
    ...new Map(
      CATALOG.filter((i) => i.kind === kind).map((i) => [
        i.department,
        i.departmentName,
      ]),
    ).entries(),
  ];
  return (
    <div className="purchase-surface">
      <section className="purchase-section" id={`${kind}-bundles`}>
        <div className="purchase-container">
          <PurchaseHeading
            eyebrow="Start with a bundle"
            title="Ready-made bundles."
          >
            A curated collection you can make your own. Every package keeps the
            same features at every duration.
          </PurchaseHeading>
          <div className="purchase-entry-links">
            <span>Prefer to choose each item?</span>
            <PurchaseAction secondary onClick={() => configure(group)}>
              Build your own plan
            </PurchaseAction>
          </div>
          <div
            className="purchase-filters"
            role="group"
            aria-label="Bundle departments"
          >
            <button
              type="button"
              aria-pressed={department === "all"}
              onClick={() => setDepartment("all")}
            >
              All
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
          <BundleCollection
            kind={kind}
            department={department}
            onCustomize={configure}
          />
          <PreviewNote />
        </div>
      </section>
      <section
        ref={builder}
        className="purchase-section purchase-section--tint purchase-with-mobile-bar purchase-builder"
        id={kind === "software" ? "plan-builder" : "svc-builder"}
      >
        <div className="purchase-container">
          <PurchaseHeading
            eyebrow="Build your own"
            title={
              kind === "software"
                ? "Build your software plan."
                : "Build your service plan."
            }
          >
            Choose your items, set their durations, and review your plan.
          </PurchaseHeading>
          <div className="purchase-toolbar">
            <span>
              {group.lines.length ? groupName(group) : "Choose your first item"}
            </span>
          </div>
          <div className="purchase-layout">
            <ConfigurationEditor
              group={group}
              onChange={update}
              onClear={() => update(groupFromIds(kind, []))}
            />
            <QuoteSummary groups={[group]}>
              <p>
                {group.lines.length}{" "}
                {kind === "software" ? "products" : "services"} ·{" "}
                {groupTerm(group)}
              </p>
              <AddPackageButton
                item={group}
                disabled={!quoteGroup(group).valid}
              />
              <details className="purchase-summary-selection" open>
                <summary>Your selected packages</summary>
                {group.lines.length ? (
                  <OrderContents groups={[group]} />
                ) : (
                  <p>Choose an item to see your plan here.</p>
                )}
              </details>
            </QuoteSummary>
          </div>
          <PreviewNote />
        </div>
        <MobilePurchaseBar groups={[group]} scopeRef={builder}>
          <AddPackageButton
            item={group}
            removable={false}
            disabled={!quoteGroup(group).valid}
          />
        </MobilePurchaseBar>
      </section>
    </div>
  );
}
export function PackageSection({ kind, id, department }) {
  const legacyId = new URLSearchParams(location.search).get("plan-service");
  const legacyEntry =
    findItem(legacyId, kind) || findItem(`${department}/${legacyId}`, kind);
  const entry =
    findItem(id, kind) ||
    (legacyEntry?.department === department ? legacyEntry : null);
  const [group, setGroup] = useState(() => {
    if (!entry) return groupFromIds(kind, []);
    const url = new URL(window.location.href);
    url.searchParams.set(
      kind === "software" ? "modules" : "services",
      entry.id,
    );
    url.searchParams.delete("bundle");
    return groupFromLocation(kind, url);
  });
  if (department === "hosting")
    return (
      <section className="purchase-section purchase-surface" id="plans-section">
        <div className="purchase-container">
          <PurchaseHeading
            eyebrow="OrgTik hosting"
            title="A home for your website."
          >
            Explore hosting options and purchase directly on our hosting
            website.
          </PurchaseHeading>
          <PurchaseAction href={HOSTING_URL}>
            Continue to hosting
          </PurchaseAction>
        </div>
      </section>
    );
  if (!entry)
    return (
      <section className="purchase-section purchase-surface" id="plans-section">
        <div className="purchase-container">
          <PurchaseHeading
            eyebrow="Department bundles"
            title="A connected selection."
            accent="One clear starting point."
          >
            Choose a collection for this department, then customize its services
            and durations.
          </PurchaseHeading>
          <BundleCollection kind={kind} department={department} />
          <PurchaseAction
            href={`/${kind === "service" ? "services" : "software"}#${kind === "service" ? "svc-builder" : "plan-builder"}`}
            secondary
          >
            Build a custom plan
          </PurchaseAction>
          <PreviewNote />
        </div>
      </section>
    );
  const update = (catalogId, patch) => {
    const next = {
      ...group,
      defaultMonths: patch.months || group.defaultMonths,
      lines: group.lines.map((l) => ({ ...l, ...patch })),
    };
    setGroup(next);
    const url = new URL(location.href);
    url.searchParams.set("duration", next.lines[0].months);
    url.searchParams.delete("terms");
    if (next.lines[0].autoRenew) url.searchParams.set("renew", entry.id);
    else url.searchParams.delete("renew");
    url.searchParams.delete("plan");
    history.replaceState(
      history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  };
  return (
    <section className="purchase-section purchase-surface" id="plans-section">
      <div className="purchase-container">
        <PurchaseHeading
          eyebrow="One complete package"
          title={entry.name + "."}
          accent="Choose your duration."
        >
          All listed features are included at every duration. Longer periods
          reduce your effective monthly price.
        </PurchaseHeading>
        <div className="purchase-layout">
          <PackageLines group={group} onChange={update} />
          <QuoteSummary groups={[group]}>
            <p>
              {termLabel(group.lines[0]?.months)} ·{" "}
              {kind === "service"
                ? "Starts after onboarding"
                : "Activates after payment"}
            </p>
            <AddPackageButton
              item={group}
              disabled={!quoteGroup(group).valid}
            />
            <a href={configurationHref(group)}>
              Combine with more {kind === "service" ? "services" : "products"}
            </a>
          </QuoteSummary>
        </div>
        <PreviewNote />
      </div>
    </section>
  );
}

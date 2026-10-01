import React from "react";
import { formatCHF } from "./cart-store";
import { getServicePeriodEstimate } from "./service-duration";
import "./service-plan.css";

export function ServicePlanPrice({ item, id }) {
  const monthly = item.billing === "monthly";
  const periodEstimate = getServicePeriodEstimate(item);
  return (
    <div className="service-plan-price" id={id}>
      <p className="service-plan-price__label">
        {monthly ? "Monthly estimate" : "Project estimate"}
      </p>
      <p className="service-plan-price__rate">
        <strong>
          {item.estimate === null ? (
            "On request"
          ) : (
            <>
              <small>From</small> {formatCHF(item.estimate)}
            </>
          )}
        </strong>
        {item.estimate !== null && (
          <span>{monthly ? "/ month" : "/ project"}</span>
        )}
      </p>
      <dl className="service-plan-price__period">
        <dt>
          {periodEstimate !== null
            ? `Estimate for ${item.duration}`
            : "Selected period"}
        </dt>
        <dd>
          {periodEstimate !== null
            ? `From ${formatCHF(periodEstimate)}`
            : item.duration}
        </dd>
      </dl>
      <p className="service-plan-price__note">
        {item.estimate === null
          ? "Estimate confirmed with the team."
          : monthly
            ? `Monthly rate × ${item.commitmentMonths} month${item.commitmentMonths === 1 ? "" : "s"}.`
            : "Project estimate for the selected period."}
      </p>
    </div>
  );
}

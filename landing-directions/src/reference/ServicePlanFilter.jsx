import React, { useId } from "react";
import "./service-plan-filter.css";

export function ServicePlanFilter({ family, value, onChange }) {
  const id = useId();
  return (
    <div className="service-plan-filter">
      <div>
        <label htmlFor={id}>Filter by service</label>
        <p id={`${id}-hint`}>Choose a service to compare its plan features.</p>
      </div>
      <div className="service-plan-filter__field">
        <select
          id={id}
          aria-describedby={`${id}-hint`}
          aria-controls="service-plan-cards"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="all">{family.short} department overview</option>
          {family.children.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
        <i className="ph ph-caret-down" aria-hidden="true" />
      </div>
    </div>
  );
}

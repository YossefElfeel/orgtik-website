import React from "react";
import { SERVICE_DURATIONS, getServiceDuration } from "./service-duration";
import "./service-duration.css";

export function ServiceDuration({ months, onChange }) {
  return (
    <div className="service-duration" data-reveal="up">
      <div>
        <h3 id="service-duration-label">Service duration</h3>
        <p id="service-duration-hint">Included with your selected plan.</p>
      </div>
      <fieldset
        aria-labelledby="service-duration-label"
        aria-describedby="service-duration-hint"
      >
        <legend className="service-duration__legend">Service duration</legend>
        <div className="service-duration__options">
          {SERVICE_DURATIONS.map((value) => (
            <label key={value} className="service-duration__option">
              <input
                type="radio"
                name="service-plan-duration"
                value={value}
                checked={months === value}
                onChange={() => onChange(value)}
              />
              <span>{getServiceDuration(value).label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

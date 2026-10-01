import React, { useId } from "react";
import { SERVICE_DURATIONS, getServiceDuration } from "./service-duration";
import "./service-duration.css";

export function ServiceDuration({
  months,
  onChange,
  groupLabel,
  hint = "Included with your selected plan.",
  headingLevel = 3,
}) {
  const id = useId();
  const Heading = `h${headingLevel}`;
  return (
    <div className="service-duration" data-reveal="up">
      <div>
        <Heading className="service-duration__heading" id={`${id}-label`}>
          Service duration
        </Heading>
        <p id={`${id}-hint`}>{hint}</p>
      </div>
      <fieldset
        aria-label={groupLabel}
        aria-labelledby={groupLabel ? undefined : `${id}-label`}
        aria-describedby={`${id}-hint`}
      >
        <legend className="service-duration__legend">Service duration</legend>
        <div className="service-duration__options">
          {SERVICE_DURATIONS.map((value) => (
            <label key={value} className="service-duration__option">
              <input
                type="radio"
                name={`${id}-duration`}
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

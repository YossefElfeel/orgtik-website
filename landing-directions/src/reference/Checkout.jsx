import React, { useEffect, useRef, useState } from "react";
import { CommerceLayout } from "./CommerceLayout";
import { CartSummary, EmptyCart } from "./CartSummary";
import { formatCHF, formatItemEstimate, useCart } from "./cart-store";
import {
  CONTACT_OPTIONS,
  START_OPTIONS,
  createCheckoutEnquiry,
  validateCheckout,
} from "./checkout-enquiry";

const NEXT_STEPS = [
  ["ph-chat-circle-text", "We reply within 1 business day."],
  ["ph-phone-call", "A free scoping call confirms the scope and price."],
  ["ph-arrows-clockwise", "You can change anything before you sign."],
];

// Optional one-tap answers; a second tap on the chosen pill clears it.
function ChoiceGroup({ name, legend, options, value, onChange }) {
  return (
    <fieldset className="commerce-choice">
      <legend>
        {legend} <small>(optional)</small>
      </legend>
      <div>
        {options.map((option) => (
          <label key={option.id}>
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              onClick={() => value === option.id && onChange("")}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function Checkout() {
  const { items } = useCart();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    start: "",
    contact: "",
  });
  const [errors, setErrors] = useState({});
  const [enquiry, setEnquiry] = useState(null);
  const confirmationRef = useRef(null);
  useEffect(() => {
    if (enquiry) confirmationRef.current?.focus();
  }, [enquiry]);

  const submit = (event) => {
    event.preventDefault();
    const validation = validateCheckout(values);
    setErrors(validation);
    if (Object.keys(validation).length) {
      event.currentTarget.elements[Object.keys(validation)[0]]?.focus();
      return;
    }
    if (!items.length) return;
    setEnquiry(createCheckoutEnquiry(items, values));
  };

  const field = (name, label, type, autocomplete, required = false) => (
    <label className="commerce-field" key={name}>
      <span>
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autocomplete}
        required={required}
        maxLength={name === "email" ? 254 : 200}
        value={values[name]}
        onChange={(event) => {
          setValues({ ...values, [name]: event.target.value });
          if (errors[name]) setErrors({ ...errors, [name]: "" });
        }}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `checkout-${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="commerce-field__error" id={`checkout-${name}-error`}>
          {errors[name]}
        </span>
      )}
    </label>
  );

  return (
    <CommerceLayout checkout>
      <div className="commerce-intro">
        <h1>
          {enquiry ? "Your enquiry." : "Let’s talk."}
          <span>
            {enquiry ? "Ready to review." : "Start with your details."}
          </span>
        </h1>
        <p>
          {enquiry
            ? "Your selection and contact details are brought together below. This preview stays in your browser."
            : "Your selected items travel with this form. Tell us how to reach you and anything we should know about the work."}
        </p>
      </div>
      {enquiry ? (
        <section
          className="commerce-confirmation"
          aria-labelledby="enquiry-ready"
        >
          <div className="commerce-confirmation__heading">
            <i className="ph ph-check-circle" aria-hidden="true" />
            <div>
              <h2 id="enquiry-ready" tabIndex={-1} ref={confirmationRef}>
                Enquiry preview ready, {enquiry.customer.name}.
              </h2>
              <p>
                No request has been sent. This is a local preview until enquiry
                delivery is connected.
              </p>
            </div>
          </div>
          <div className="commerce-confirmation__grid">
            <div>
              <h3>Contact details</h3>
              <dl className="commerce-contact-details">
                <div>
                  <dt>Name</dt>
                  <dd>{enquiry.customer.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{enquiry.customer.email}</dd>
                </div>
                {enquiry.customer.phone && (
                  <div>
                    <dt>Phone</dt>
                    <dd>{enquiry.customer.phone}</dd>
                  </div>
                )}
                {enquiry.customer.company && (
                  <div>
                    <dt>Company</dt>
                    <dd>{enquiry.customer.company}</dd>
                  </div>
                )}
              </dl>
              {(enquiry.preferences.start || enquiry.preferences.contact) && (
                <dl className="commerce-contact-details">
                  {enquiry.preferences.start && (
                    <div>
                      <dt>Ideal start</dt>
                      <dd>
                        {
                          START_OPTIONS.find(
                            (option) => option.id === enquiry.preferences.start,
                          ).label
                        }
                      </dd>
                    </div>
                  )}
                  {enquiry.preferences.contact && (
                    <div>
                      <dt>Best way to reach you</dt>
                      <dd>
                        {
                          CONTACT_OPTIONS.find(
                            (option) =>
                              option.id === enquiry.preferences.contact,
                          ).label
                        }
                      </dd>
                    </div>
                  )}
                </dl>
              )}
              {enquiry.message && (
                <>
                  <h3>About your project</h3>
                  <p className="commerce-message">{enquiry.message}</p>
                </>
              )}
            </div>
            <div>
              <h3>Selected items</h3>
              <ul className="commerce-confirmation__items">
                {enquiry.items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong>
                    <span>
                      {[item.plan && `${item.plan} plan`, item.duration]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                    <span>
                      {item.selections
                        .map((selection) => selection.name)
                        .join(", ")}
                    </span>
                    <span>{formatItemEstimate(item)}</span>
                  </li>
                ))}
              </ul>
              <dl className="commerce-totals commerce-totals--light">
                {enquiry.estimate.monthly > 0 && (
                  <div>
                    <dt>Monthly</dt>
                    <dd>
                      {enquiry.items.some(
                        (item) =>
                          item.kind === "service" && item.billing === "monthly",
                      ) && "From "}
                      {formatCHF(enquiry.estimate.monthly)} / month
                    </dd>
                  </div>
                )}
                {enquiry.estimate.project > 0 && (
                  <div>
                    <dt>One-off projects</dt>
                    <dd>From {formatCHF(enquiry.estimate.project)}</dd>
                  </div>
                )}
                <div>
                  <dt>Total for your chosen periods</dt>
                  <dd>From {formatCHF(enquiry.estimate.periodTotal)}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="commerce-confirmation__actions">
            <button
              type="button"
              className="commerce-action"
              onClick={() => setEnquiry(null)}
            >
              Edit details{" "}
              <i className="ph ph-pencil-simple" aria-hidden="true" />
            </button>
            <a href="/cart" className="commerce-text-link">
              Return to cart{" "}
              <i className="ph ph-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </section>
      ) : !items.length ? (
        <EmptyCart checkout />
      ) : (
        <div className="commerce-grid">
          <form
            className="commerce-form"
            noValidate
            onSubmit={submit}
            aria-labelledby="contact-details-title"
          >
            <div className="commerce-form__heading">
              <h2 id="contact-details-title">Your contact details</h2>
              <p>Required fields are marked with an asterisk.</p>
            </div>
            <div className="commerce-fields">
              {field("name", "Full name", "text", "name", true)}
              {field("email", "Email address", "email", "email", true)}
              {field("company", "Company", "text", "organization")}
              {field("phone", "Phone number", "tel", "tel")}
            </div>
            <label className="commerce-field">
              <span>
                Anything else we should know? <small>(optional)</small>
              </span>
              <textarea
                name="message"
                rows={5}
                maxLength={5000}
                placeholder="Your goals, timeline, or a little about your team."
                value={values.message}
                onChange={(event) =>
                  setValues({ ...values, message: event.target.value })
                }
              />
            </label>
            <ChoiceGroup
              name="start"
              legend="When would you like to start?"
              options={START_OPTIONS}
              value={values.start}
              onChange={(start) => setValues({ ...values, start })}
            />
            <ChoiceGroup
              name="contact"
              legend="Best way to reach you"
              options={CONTACT_OPTIONS}
              value={values.contact}
              onChange={(contact) => {
                setValues({ ...values, contact });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
            />
            <div className="commerce-next-steps">
              <h3>What happens next</h3>
              <ol>
                {NEXT_STEPS.map(([icon, text]) => (
                  <li key={text}>
                    <i className={`ph ${icon}`} aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ol>
            </div>
            <div className="commerce-preview-note">
              <i className="ph ph-info" aria-hidden="true" />
              <p>
                Form preview · no enquiry is sent. Your contact details are not
                saved.
              </p>
            </div>
            <p className="commerce-privacy">
              Your details are intended for discussing this selection with
              OrgTik. <a href="/legal#/privacy">Privacy policy</a>
            </p>
            <button type="submit" className="commerce-action">
              Preview enquiry{" "}
              <span className="commerce-action__arrow">
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </span>
            </button>
          </form>
          <CartSummary items={items} showItems>
            <a href="/cart" className="commerce-summary__edit">
              Edit selected items{" "}
              <i className="ph ph-pencil-simple" aria-hidden="true" />
            </a>
          </CartSummary>
        </div>
      )}
    </CommerceLayout>
  );
}

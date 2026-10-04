import React from "react";
import { SiteHeader } from "./SiteHeader";

export function CommerceLayout({
  checkout = false,
  complete = false,
  steps = true,
  className = "",
  children,
}) {
  return (
    <div className={`commerce-page ${className}`}>
      <SiteHeader />
      <main id="top" className="commerce-main">
        {steps && (
          <nav aria-label="Checkout steps" className="commerce-steps">
            <a href="/cart" aria-current={!checkout ? "step" : undefined}>
              <span>1</span> Cart
            </a>
            <i className="ph ph-arrow-right" aria-hidden="true" />
            <span aria-current={checkout && !complete ? "step" : undefined}>
              <span>2</span> Payment
            </span>
            <i className="ph ph-arrow-right" aria-hidden="true" />
            <span aria-current={complete ? "step" : undefined}>
              <span>3</span> Account
            </span>
          </nav>
        )}
        {children}
      </main>
      <footer className="commerce-footer">
        <a href="/" className="commerce-footer__logo">
          <img
            src="/assets/logo/orgtik-mark-white.svg"
            alt=""
            className="commerce-brand__mark"
          />
          <img
            src="/assets/logo/orgtik-wordmark-white.svg"
            alt="OrgTik home"
            className="commerce-brand__wordmark"
          />
        </a>
        <p>Strategy. Design. Technology.</p>
        <div>
          <a href="/plans">Bundles &amp; pricing</a>
          <a href="/contact">Talk to us</a>
          <a href="/legal#/privacy">Privacy policy</a>
        </div>
      </footer>
    </div>
  );
}

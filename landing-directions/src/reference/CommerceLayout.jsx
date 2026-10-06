import React from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

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
      <SiteFooter />
    </div>
  );
}

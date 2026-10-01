import React, { useEffect, useState } from "react";
import { CartLink } from "./CartControls";
import { LanguageMenu } from "./LanguageMenu";

export function CommerceLayout({
  checkout = false,
  steps = true,
  className = "",
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const keydown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  return (
    <div className={`commerce-page ${className}`}>
      <header className="commerce-header">
        <a href="/" className="commerce-logo">
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
        <nav
          aria-label="Main navigation"
          className={`commerce-nav${menuOpen ? " commerce-nav--open" : ""}`}
          id="commerce-navigation"
        >
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ["Software", "/software"],
            ["Work", "/work"],
            ["About", "/about"],
            ["Insights", "/insights"],
          ].map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="commerce-header__actions">
          <CartLink />
          <LanguageMenu compact />
          <button
            type="button"
            className="commerce-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="commerce-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i
              className={`ph ${menuOpen ? "ph-x" : "ph-list"}`}
              aria-hidden="true"
            />
          </button>
          <a href="/contact" className="commerce-header__contact">
            Talk to us <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        </div>
      </header>
      <main id="top" className="commerce-main">
        {steps && (
          <nav aria-label="Checkout steps" className="commerce-steps">
            <a href="/cart" aria-current={!checkout ? "step" : undefined}>
              <span>1</span> Your cart
            </a>
            <i className="ph ph-arrow-right" aria-hidden="true" />
            <span aria-current={checkout ? "step" : undefined}>
              <span>2</span> Contact details
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
          <a href="/plans">Plans &amp; pricing</a>
          <a href="/contact">Talk to us</a>
          <a href="/legal#/privacy">Privacy policy</a>
        </div>
      </footer>
    </div>
  );
}

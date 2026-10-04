import React, { useEffect, useId, useRef, useState } from "react";
import { CartLink } from "./CartControls";
import { LanguageMenu } from "./LanguageMenu";
import { AccountControl } from "./AccountControl";

const LINKS = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Software", "/software"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Insights", "/insights"],
];

function ProjectLink({ onClick, className = "" }) {
  return (
    <a
      href="/contact"
      className={`commerce-header__contact ${className}`}
      onClick={onClick}
    >
      Start a project
      <span>
        <i className="ph ph-arrow-up-right" aria-hidden="true" />
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [wide, setWide] = useState(
    () => matchMedia("(min-width: 1180px)").matches,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuId = useId();
  useEffect(() => {
    const query = matchMedia("(min-width: 1180px)");
    const resize = () => {
      setWide(query.matches);
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const overflow = document.body.style.overflow;
    menu.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      menu.close();
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);
  return (
    <>
      <header className="site-header commerce-header">
        <a href="/" className="commerce-logo" aria-label="OrgTik home">
          <img
            src="/assets/logo/orgtik-mark-white.svg"
            alt=""
            className="commerce-brand__mark"
          />
          <img
            src="/assets/logo/orgtik-wordmark-white.svg"
            alt="OrgTik"
            className="commerce-brand__wordmark"
          />
        </a>
        {wide && (
          <nav aria-label="Main navigation" className="commerce-nav">
            {LINKS.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
        )}
        <div className="commerce-header__actions">
          <CartLink />
          <LanguageMenu compact={!wide} />
          {!wide && <AccountControl compact />}
          {wide ? (
            <>
              <AccountControl />
              <ProjectLink />
            </>
          ) : (
            <button
              type="button"
              className="commerce-menu site-menu-trigger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen(true)}
            >
              <span className="site-menu-trigger__label">Menu</span>
              <i className="ph ph-list" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>
      <dialog
        ref={menuRef}
        id={menuId}
        className="commerce-mobile-menu"
        aria-label="Navigation menu"
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [
            ...menuRef.current.querySelectorAll("a[href], button"),
          ];
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="commerce-mobile-menu__head">
          <img src="/assets/logo/orgtik-wordmark-white.svg" alt="OrgTik" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <i className="ph ph-x" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Main navigation">
          {LINKS.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {label}
              <i className="ph ph-arrow-up-right" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <AccountControl
          menu
          onNavigate={() => setMenuOpen(false)}
          onSignOut={() => setMenuOpen(false)}
        />
        <ProjectLink
          className="commerce-mobile-menu__contact"
          onClick={() => setMenuOpen(false)}
        />
      </dialog>
    </>
  );
}

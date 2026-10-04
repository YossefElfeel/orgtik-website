import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import {
  getPreviewCustomer,
  subscribePreviewCustomer,
  signOutPreviewCustomer,
} from "./purchase-identity.js";
import { CRM_PORTAL_URL } from "./purchase-catalog.js";
import { PurchaseAction, PurchaseDialog } from "./PurchaseControls";
import { LanguageMenu } from "./LanguageMenu";
import "./account-control.css";

export function AccountControl({
  compact = false,
  menu = false,
  onNavigate,
  onSignOut,
}) {
  const customer = useSyncExternalStore(
    subscribePreviewCustomer,
    getPreviewCustomer,
    getPreviewCustomer,
  );
  const [open, setOpen] = useState(false);
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({});
  const root = useRef(null);
  const trigger = useRef(null);
  const panel = useRef(null);
  const panelId = useId();
  let portal = null;
  try {
    const url = new URL(CRM_PORTAL_URL);
    if (url.protocol === "https:") portal = url.href;
  } catch {}

  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      const bounds = trigger.current?.getBoundingClientRect();
      if (!bounds) return;
      const viewportWidth = document.documentElement.clientWidth;
      const width = Math.min(304, viewportWidth - 32);
      const top = bounds.bottom + 12;
      setPanelPosition({
        top,
        left: Math.max(
          16,
          Math.min(bounds.right - width, viewportWidth - width - 16),
        ),
        width,
        maxHeight: `calc(100svh - ${top + 16}px)`,
      });
    };
    position();
    window.addEventListener("resize", position);
    return () => window.removeEventListener("resize", position);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector("a, button")?.focus();
    const outside = (event) => {
      if (
        !root.current?.contains(event.target) &&
        !panel.current?.contains(event.target)
      )
        setOpen(false);
    };
    const escape = (event) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      setOpen(false);
      trigger.current?.focus();
    };
    document.addEventListener("pointerdown", outside);
    root.current?.addEventListener("keydown", escape);
    panel.current?.addEventListener("keydown", escape);
    const currentRoot = root.current;
    const currentPanel = panel.current;
    return () => {
      document.removeEventListener("pointerdown", outside);
      currentRoot?.removeEventListener("keydown", escape);
      currentPanel?.removeEventListener("keydown", escape);
    };
  }, [open]);

  useEffect(() => {
    if (!customer) {
      setOpen(false);
      setHandoffOpen(false);
    }
  }, [customer]);

  const signOut = () => {
    const header = document.querySelector(".site-header");
    setOpen(false);
    signOutPreviewCustomer();
    onSignOut?.();
    if (!onSignOut)
      requestAnimationFrame(() => {
        header
          ?.querySelector(
            '[data-account-signin], button[aria-label="Open menu"]',
          )
          ?.focus();
      });
  };

  if (!customer) {
    if (compact) return null;
    return (
      <a
        href="/sign-in"
        data-account-signin
        className={`site-account__guest${menu ? " site-account__guest--menu" : ""}`}
        onClick={onNavigate}
      >
        Sign in
        {menu && <i className="ph ph-arrow-up-right" aria-hidden="true" />}
      </a>
    );
  }

  const name = customer.name || "Your account";
  const words = customer.name.split(/\s+/).filter(Boolean);
  const initials = words.length
    ? (
        Array.from(words[0])[0] +
        (words.length > 1 ? Array.from(words.at(-1))[0] : "")
      ).toUpperCase()
    : Array.from(customer.email)[0].toUpperCase();
  const navigate = () => {
    setOpen(false);
    onNavigate?.();
  };
  const accountContents = (
    <>
      <div className="site-account__identity">
        <span className="site-account__avatar" aria-hidden="true">
          {initials}
        </span>
        <div>
          <small>Signed in</small>
          <strong>{name}</strong>
          <span>{customer.email}</span>
        </div>
      </div>
      <div className="site-account__links">
        {portal ? (
          <a href={portal} onClick={navigate}>
            <i className="ph ph-user-circle" aria-hidden="true" /> My account
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setHandoffOpen(true);
            }}
          >
            <i className="ph ph-user-circle" aria-hidden="true" /> My account
            <i className="ph ph-arrow-up-right" aria-hidden="true" />
          </button>
        )}
        <button type="button" onClick={signOut}>
          <i className="ph ph-sign-out" aria-hidden="true" /> Sign out
        </button>
      </div>
      {(compact || menu) && (
        <div className="site-account__language">
          <span>Language</span>
          <LanguageMenu />
        </div>
      )}
    </>
  );

  return (
    <div
      ref={root}
      className={`site-account site-account--signed-in${compact ? " site-account--compact" : ""}${menu ? " site-account--menu" : ""}`}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !panel.current?.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      {menu ? (
        accountContents
      ) : (
        <>
          <button
            ref={trigger}
            type="button"
            className="site-account__trigger"
            aria-label={`Account, signed in as ${customer.name || customer.email}`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
              }
            }}
          >
            <span className="site-account__avatar" aria-hidden="true">
              {initials}
            </span>
            <span className="site-account__label">{words[0] || "Account"}</span>
            <i className="ph ph-caret-down" aria-hidden="true" />
          </button>
          {open &&
            createPortal(
              <div
                ref={panel}
                id={panelId}
                className="site-account__panel"
                style={panelPosition}
                role="region"
                aria-label="Account options"
              >
                {accountContents}
              </div>,
              document.body,
            )}
        </>
      )}
      <PurchaseDialog
        open={handoffOpen}
        title="Your OrgTik account"
        onClose={() => {
          setHandoffOpen(false);
          requestAnimationFrame(() => trigger.current?.focus());
        }}
      >
        <p>
          Your customer account brings your purchases, payments, invoices, and
          onboarding together.
        </p>
        <p>
          Customer portal access will be available once the account connection
          is configured.
        </p>
        <PurchaseAction
          secondary
          onClick={() => {
            setHandoffOpen(false);
            requestAnimationFrame(() => trigger.current?.focus());
          }}
        >
          Continue browsing
        </PurchaseAction>
      </PurchaseDialog>
    </div>
  );
}

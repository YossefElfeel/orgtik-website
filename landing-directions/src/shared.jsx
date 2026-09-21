import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  List,
  X,
  Check,
  CheckCircle,
  Plus,
  Stack,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
  TiktokLogo,
  PinterestLogo,
  SnapchatLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { modules, steps } from "./content";
import { Disclosure } from "./Experience";
import { Action } from "./Action";
export { Action } from "./Action";

export const asset = (name) => `/assets/${name}`;
export function Logo({ light = false, emblem = false, ...props }) {
  const variant = light ? "white" : "black";
  if (emblem) {
    return (
      <img
        {...props}
        className={`brand-logo emblem ${props.className || ""}`}
        src={asset(`logo/orgtik-mark-${variant}.svg`)}
        alt="OrgTik"
        width="247"
        height="250"
      />
    );
  }
  return (
    <span
      {...props}
      className={`brand-logo ${props.className || ""}`}
      role="img"
      aria-label="OrgTik"
    >
      <img
        className="brand-logo-mark"
        src={asset(`logo/orgtik-mark-${variant}.svg`)}
        alt=""
        width="247"
        height="250"
        aria-hidden="true"
      />
      <img
        className="brand-logo-wordmark"
        src={asset(`logo/orgtik-wordmark-${variant}.svg`)}
        alt=""
        width="673"
        height="197"
        aria-hidden="true"
      />
    </span>
  );
}
export function Eyebrow({ children, number, className = "" }) {
  return (
    <p className={`eyebrow ${className}`}>
      {number && <span className="eyebrow-number">{number}</span>}
      {children}
    </p>
  );
}
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function VideoScene({
  kind,
  className = "",
  label = "Brand in motion",
  showLabel = true,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(() => window.innerWidth < 700);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const saveData = !!navigator.connection?.saveData;
  const canLoad = !reduced && !saveData;
  const stem = `${kind}-${mobile ? "mobile" : "desktop"}`;
  useEffect(() => {
    const m = matchMedia("(max-width:699px)");
    const change = () => setMobile(m.matches);
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inside = true;
    const sync = () => {
      if (document.hidden || !inside || !canLoad) el.pause();
      else el.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inside = entry.isIntersecting;
        sync();
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [canLoad, stem]);
  return (
    <div className={`video-scene ${className} ${ready ? "video-ready" : ""}`}>
      <picture>
        <source
          media="(max-width:699px)"
          srcSet={asset(`${kind}-mobile.webp`)}
        />
        <img
          className="video-poster"
          src={asset(`${kind}-desktop.webp`)}
          alt=""
          fetchPriority="high"
          width="1280"
          height="720"
        />
      </picture>
      <video
        ref={ref}
        key={stem}
        className={playing ? "is-playing" : ""}
        src={canLoad ? asset(`${stem}.mp4`) : undefined}
        poster={asset(`${stem}.webp`)}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        onPlaying={() => {
          setPlaying(true);
          setReady(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
        }}
      />
      {showLabel && <span className="scene-label">{label}</span>}
    </div>
  );
}

export function Header({
  theme = "dark",
  onContact,
  onAccount,
  onPlan,
  currentPath = window.location.pathname,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const [activeSection, setActiveSection] = useState("");
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    const sections = [...document.querySelectorAll("main > section[id]")];
    let frame;
    const update = () => {
      setScrolled(window.scrollY > 24);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= 180)
        .at(-1);
      setActiveSection(current?.id || "");
      frame = undefined;
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  const links = [
    ["Home", "/"],
    ["Platform", "/platform"],
    ["Services", "/services"],
    ["Work", "/work"],
    ["Insights", "/insights"],
    ["About", "/about"],
  ];
  return (
    <header className={`site-header ${theme}`} data-scrolled={scrolled}>
      <a className="logo-link" href="/" aria-label="OrgTik home">
        <Logo light={theme === "dark"} />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, url]) => (
          <a
            key={name}
            href={url}
            aria-current={
              currentPath === url ||
              (url !== "/" && currentPath.startsWith(`${url}/`)) ||
              (currentPath === "/" && url === `/#${activeSection}`)
                ? "page"
                : undefined
            }
          >
            {name}
          </a>
        ))}
        <button onClick={onPlan}>Plans</button>
      </nav>
      <div className="header-actions">
        <button className="account-link" onClick={onAccount}>
          Sign in <ArrowUpRight size={13} />
        </button>
        <Action className="header-cta" compact onClick={onContact}>
          Start a project
        </Action>
      </div>
      <button
        ref={trigger}
        className="menu-trigger icon-button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <List size={26} />
      </button>
      <dialog
        className="mobile-nav"
        ref={dialog}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <div className="mobile-nav-top">
          <Logo />
          <button
            aria-label="Close navigation"
            className="icon-button"
            onClick={close}
          >
            <X size={25} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([name, url], i) => (
            <a
              key={url}
              href={url}
              onClick={close}
              aria-current={
                currentPath === url ||
                (url !== "/" && currentPath.startsWith(`${url}/`))
                  ? "page"
                  : undefined
              }
            >
              <small>0{i + 1}</small>
              {name}
              <ArrowUpRight size={24} />
            </a>
          ))}
          <button
            onClick={() => {
              close();
              onPlan();
            }}
          >
            Plans <ArrowUpRight size={24} />
          </button>
          <button
            onClick={() => {
              close();
              onAccount();
            }}
          >
            Sign in <ArrowUpRight size={24} />
          </button>
        </nav>
        <Action
          onClick={() => {
            close();
            onContact();
          }}
        >
          Start a project
        </Action>
      </dialog>
    </header>
  );
}

export function ModuleExplorer({ variant = "cinematic", onPlan }) {
  const [selected, setSelected] = useState("hr");
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const root = useRef(null);
  const reduced = useReducedMotion();
  const running = !focused && visible && pageVisible && !reduced;
  const active = modules.find((m) => m.id === selected);
  const activeIndex = modules.indexOf(active);
  const Icon = active.icon;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(root.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  function keyboard(e, index) {
    if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const next =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? 5
            : (index + (e.key === "ArrowRight" ? 1 : 5)) % 6;
      setSelected(modules[next].id);
      e.currentTarget.parentElement.children[next].focus();
    }
  }
  return (
    <div
      ref={root}
      className={`module-explorer explorer-${variant}`}
      data-running={running}
      onPointerDown={() => setFocused(false)}
      onKeyDownCapture={() => setFocused(true)}
      onFocusCapture={(e) => {
        if (e.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="module-tabs"
        role="tablist"
        aria-label="Explore business modules"
      >
        {modules.map((m, i) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={selected === m.id}
            aria-controls={`${variant}-module-panel`}
            id={`${variant}-tab-${m.id}`}
            tabIndex={selected === m.id ? 0 : -1}
            onKeyDown={(e) => keyboard(e, i)}
            onClick={() => setSelected(m.id)}
          >
            <m.icon size={20} />
            <span>{m.formal}</span>
            <span className="module-tab-number">{m.number}</span>
            {selected === m.id && (
              <span
                key={selected}
                className="module-timer"
                aria-hidden="true"
                onAnimationEnd={() => {
                  if (running)
                    setSelected(modules[(activeIndex + 1) % modules.length].id);
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div
        className="module-panel"
        data-reveal="stagger"
        id={`${variant}-module-panel`}
        role="tabpanel"
        aria-labelledby={`${variant}-tab-${active.id}`}
        tabIndex="0"
      >
        <div key={selected} className="module-copy">
          <h3>
            {active.title.split(/(?<=\.) /).map((sentence, index) => (
              <span
                key={sentence}
                className={index > 0 ? "module-title-accent" : undefined}
              >
                {index > 0 ? " " : ""}
                {sentence}
              </span>
            ))}
          </h3>
          <p>{active.description}</p>
          <div className="module-capabilities">
            <ul>
              {active.tasks.map((t) => (
                <li key={t}>
                  <Check size={15} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Action
            className="module-plan-action"
            onClick={() => onPlan(active.id)}
          >
            Explore your combination
          </Action>
        </div>
        <div className="module-art">
          <img
            src={asset("brand-phone.webp")}
            alt="OrgTik brand application on a device"
            loading="lazy"
            width="1920"
            height="1072"
          />
          <span className="art-caption">
            Brand application · Platform concept
          </span>
          <div key={selected} className="module-art-label">
            <Icon size={24} />
            <div>
              <small>One part of your workspace</small>
              <strong>{active.formal}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const processArt = [
  ["brand-glass.webp", "The OrgTik mark held on a transparent glass surface"],
  [
    "brand-tablet.webp",
    "OrgTik's visual identity applied to a digital surface",
  ],
  [
    "brand-cards.webp",
    "The OrgTik identity brought together in a printed card system",
  ],
  ["brand-phone.webp", "OrgTik's identity carried into a mobile experience"],
];

export function Process() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  function navigate(event, index) {
    const directions = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else if (event.key in directions)
      next = (index + directions[event.key] + steps.length) % steps.length;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }
  return (
    <div className="process-studio" data-reveal="stagger">
      <div
        className="process-selector"
        role="tablist"
        aria-label="Our process stages"
        aria-orientation="vertical"
      >
        {steps.map(([name], index) => (
          <button
            key={name}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            role="tab"
            id={`process-tab-${index}`}
            aria-controls="process-detail"
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setSelected(index);
            }}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span className="process-index" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="process-name">{name}</span>
            <span className="process-select-arrow" aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>
          </button>
        ))}
      </div>
      <div
        className="process-detail"
        id="process-detail"
        role="tabpanel"
        aria-labelledby={`process-tab-${selected}`}
        tabIndex={0}
      >
        <div className="process-image-stage">
          {processArt.map(([filename, alt], index) => (
            <img
              key={filename}
              src={asset(filename)}
              alt={selected === index ? alt : ""}
              aria-hidden={selected !== index}
              className={selected === index ? "is-active" : ""}
              loading="lazy"
              width="1920"
              height="1072"
            />
          ))}
        </div>
        <div className="process-narrative" key={selected}>
          <h3>{steps[selected][1]}</h3>
          <p>{steps[selected][2]}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [selected, setSelected] = useState(0);
  const questions = [
    [
      "Can we start with a single project?",
      "Yes. Start with the website, identity, workflow, or campaign that matters most. We can shape a focused brief and build from there.",
    ],
    [
      "How do the services and platform fit together?",
      "Our services shape your digital presence. The platform concept brings your everyday business tools together. We help you explore the combination that fits your team.",
    ],
    [
      "Can I choose only the modules I need?",
      "Explore a single module or combine several in the plan preview. Final availability, features, and pricing will be confirmed with the OrgTik team.",
    ],
  ];
  return (
    <div className="faq-list">
      {questions.map(([q, a], index) => (
        <Disclosure
          key={q}
          className="faq-item"
          reveal
          open={selected === index}
          onToggle={() => setSelected(selected === index ? null : index)}
          header={<span className="faq-question">{q}</span>}
        >
          <p className="faq-answer">{a}</p>
        </Disclosure>
      ))}
    </div>
  );
}

// Add the confirmed OrgTik profile URLs here when supplied.
const socialProfiles = [
  { name: "Facebook", icon: FacebookLogo, href: null },
  { name: "Instagram", icon: InstagramLogo, href: null },
  { name: "LinkedIn", icon: LinkedinLogo, href: null },
  { name: "X", icon: XLogo, href: null },
  { name: "TikTok", icon: TiktokLogo, href: null },
  { name: "Pinterest", icon: PinterestLogo, href: null },
  { name: "Snapchat", icon: SnapchatLogo, href: null },
  { name: "YouTube", icon: YoutubeLogo, href: null },
];

export function Footer({ theme = "dark", onContact, onPlan }) {
  return (
    <footer className={`site-footer ${theme}`}>
      <div className="footer-aurora" aria-hidden="true" />
      <div className="footer-top">
        <a href="/" aria-label="OrgTik home">
          <Logo light={theme === "dark"} />
        </a>
        <a href="#top" className="back-top" aria-label="Back to top">
          <span>Back to top</span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-main" data-reveal="stagger">
        <div className="footer-intro">
          <h2>
            Make the next move <em>matter.</em>
          </h2>
          <p>
            Strategy, design, and technology brought together around one clear
            ambition: moving your business forward.
          </p>
          <Action onClick={onContact} secondary className="footer-contact">
            Talk to us
          </Action>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <div>
            <h3>Explore</h3>
            <a href="/platform">Platform</a>
            <a href="/services">Services</a>
            <a href="/work">Selected work</a>
            <a href="/insights">Insights</a>
            <a href="/about">About OrgTik</a>
          </div>
          <div>
            <h3>Start here</h3>
            <button onClick={onPlan}>Explore plans</button>
            <button onClick={onContact}>Tell us about your project</button>
            <a href="/roadmap">Roadmap</a>
            <a href="/sitemap">Sitemap</a>
          </div>
        </nav>
      </div>
      <div className="footer-connect">
        <div
          className="footer-socials"
          role="group"
          aria-label="OrgTik social media"
        >
          {socialProfiles.map(({ name, icon: Icon, href }) =>
            href ? (
              <a
                key={name}
                className="footer-social"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`OrgTik on ${name} (opens in a new tab)`}
                title={name}
              >
                <Icon
                  size={25}
                  weight={name === "X" ? "regular" : "fill"}
                  aria-hidden="true"
                />
              </a>
            ) : (
              <span
                key={name}
                className="footer-social"
                role="img"
                aria-label={`${name}: profile link not yet configured`}
                title={`${name} · Profile link coming soon`}
              >
                <Icon
                  size={25}
                  weight={name === "X" ? "regular" : "fill"}
                  aria-hidden="true"
                />
              </span>
            ),
          )}
        </div>
        <span className="footer-origin">
          <span className="swiss-flag" role="img" aria-label="Swiss flag" />
          Made in Switzerland
        </span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 OrgTik.</span>
        <span className="footer-status">
          <i aria-hidden="true" /> Independent digital partner
        </span>
        <span>Strategy. Design. Technology.</span>
      </div>
    </footer>
  );
}

export function Modal({ type, onClose, initialModule }) {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(
    initialModule ? [initialModule] : [],
  );
  const previous = useRef(document.activeElement);
  useEffect(() => {
    ref.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous.current?.focus?.();
    };
  }, []);
  const title =
    type === "contact"
      ? "What would you like to build?"
      : type === "plan"
        ? "Make room for what matters."
        : "Your OrgTik workspace.";
  function chooseModule(id) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  }
  function submit(e) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    if (
      !String(data.get("name")).trim() ||
      !String(data.get("message")).trim()
    ) {
      setError("Please enter your name and a short message.");
      return;
    }
    setError("");
    setSent(true);
  }
  return (
    <dialog
      className={`experience-modal modal-${type}`}
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="modal-title"
    >
      <div className="modal-top">
        <Logo />
        <button
          onClick={onClose}
          className="icon-button"
          aria-label="Close dialog"
        >
          <X size={23} />
        </button>
      </div>
      <Eyebrow>Let’s connect</Eyebrow>
      <h2 id="modal-title">{title}</h2>
      {type === "contact" &&
        (sent ? (
          <div className="form-success" role="status">
            <CheckCircle size={44} weight="light" />
            <h3>Your preview is complete.</h3>
            <p>
              No message was sent. This form demonstrates the enquiry
              experience.
            </p>
            <Action onClick={onClose}>Back to the page</Action>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="preview-notice">
              Design preview · No message will be sent. Please use example
              details.
            </p>
            <label>
              I'm interested in
              <select
                name="interest"
                defaultValue={initialModule ? "Platform" : "A new project"}
              >
                <option>A new project</option>
                <option>Platform</option>
                <option>Brand & design</option>
                <option>Ongoing support</option>
              </select>
            </label>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="off"
                  placeholder="Alex Taylor"
                  required
                  maxLength="100"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="alex@example.com"
                  required
                />
              </label>
            </div>
            <label>
              A little about your project
              <textarea
                name="message"
                rows="3"
                placeholder="Tell us what needs to work better…"
                required
                maxLength="2000"
              />
            </label>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <Action type="submit">Preview enquiry</Action>
          </form>
        ))}
      {type === "plan" && (
        <>
          <p>Start with one focus. Connect more when you’re ready.</p>
          <div className="plan-choices">
            {modules.map((m) => (
              <button
                key={m.id}
                aria-pressed={selected.includes(m.id)}
                onClick={() => chooseModule(m.id)}
                className={selected.includes(m.id) ? "selected" : ""}
              >
                <m.icon size={24} />
                {m.formal}
                {selected.includes(m.id) ? (
                  <Check size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </button>
            ))}
          </div>
          <div className="plan-summary" aria-live="polite">
            <span>
              {selected.length
                ? `${selected.length} module${selected.length !== 1 ? "s" : ""} in your workspace`
                : "Choose a module to begin"}
            </span>
            <strong>Contact for pricing</strong>
          </div>
          <p className="preview-notice">
            Local concept preview. No subscription or payment is created.
            Features and availability are subject to confirmation.
          </p>
          <Action disabled={!selected.length} onClick={() => setSent(true)}>
            Review this combination
          </Action>
          {sent && (
            <p className="plan-result" role="status">
              Your combination:{" "}
              {modules
                .filter((m) => selected.includes(m.id))
                .map((m) => m.formal)
                .join(" + ")}
              . This selection is for exploration only.
            </p>
          )}
        </>
      )}
      {type === "account" && (
        <>
          <p>A focused place for your everyday business tools.</p>
          <div className="account-preview">
            <Stack size={42} weight="light" />
            <h3>Account access is a future connection.</h3>
            <p>
              This landing-page preview doesn’t authenticate users or collect
              passwords.
            </p>
          </div>
          <Action onClick={onClose}>Keep exploring</Action>
        </>
      )}
    </dialog>
  );
}

export function useReveals() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      !("IntersectionObserver" in window) ||
      !Element.prototype.animate
    )
      return;
    const els = document.querySelectorAll("[data-reveal]");
    const animations = new Map();
    const entered = new Set();
    const targets = (el) => {
      if (el.dataset.reveal === "gateway")
        return [...el.querySelectorAll(".gateway-media, .gateway-copy > *")];
      return el.dataset.reveal === "stagger" ? [...el.children] : [el];
    };
    const cancel = (el) => {
      animations.get(el)?.cancel();
      animations.delete(el);
    };
    const focus = (event) => {
      // Keyboard navigation should never wait for an entrance to finish.
      animations.forEach((animation, el) => {
        if (el.contains(event.target)) cancel(el);
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const items = targets(entry.target);
          if (!entry.isIntersecting) {
            // A moving entrance can briefly cross the viewport edge itself.
            if (!items.some((el) => animations.has(el)))
              entered.delete(entry.target);
            return;
          }
          if (entered.has(entry.target)) return;
          entered.add(entry.target);
          const compact = window.innerWidth <= 700;
          items.forEach((el, index) => {
            cancel(el);
            if (el.contains(document.activeElement)) return;
            const bounds = el.getBoundingClientRect();
            // Do not choreograph cards outside the horizontal carousel viewport.
            if (bounds.right <= 0 || bounds.left >= window.innerWidth) return;
            const cardImage = el.classList.contains("gateway-media");
            const image = entry.target.dataset.reveal === "image" || cardImage;
            const heading = el.matches("h2, h3");
            const animation = el.animate(
              [
                {
                  opacity: 0.04,
                  transform: cardImage
                    ? "none"
                    : `translate3d(0, ${compact ? 28 : 52}px, 0)`,
                  ...(image ? { clipPath: "inset(0 0 18% 0)" } : {}),
                  ...(heading ? { clipPath: "inset(0 0 70% 0)" } : {}),
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  ...(image || heading ? { clipPath: "inset(0)" } : {}),
                },
              ],
              {
                duration: image ? 1000 : 850,
                delay: Math.min(index * 110, 330),
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "backwards",
              },
            );
            animations.set(el, animation);
            animation.onfinish = () => {
              cancel(el);
              const rect = entry.target.getBoundingClientRect();
              if (rect.bottom <= 0 || rect.top >= window.innerHeight)
                entered.delete(entry.target);
            };
          });
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    document.addEventListener("focusin", focus);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", focus);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
  }, [reduced]);
}

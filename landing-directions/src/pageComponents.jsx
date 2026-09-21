import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Info,
  Sparkle,
} from "@phosphor-icons/react";
import { Action, Eyebrow, Footer, Header, VideoScene } from "./shared";

export function SiteLayout({
  children,
  navigate,
  path,
  header = true,
  footer = true,
}) {
  return (
    <div className="cinematic route-site" id="top">
      {header && (
        <Header
          currentPath={path}
          onContact={() => navigate("/contact")}
          onAccount={() => navigate("/sign-in")}
          onPlan={() => navigate("/pricing")}
        />
      )}
      <main id="main-content">{children}</main>
      {footer && (
        <Footer
          onContact={() => navigate("/contact")}
          onPlan={() => navigate("/pricing")}
        />
      )}
    </div>
  );
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <b>{item.label}</b>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  body,
  primary,
  secondary,
  image = "brand-glass.webp",
  imageAlt = "OrgTik brand application",
  video = false,
  compact = false,
  children,
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero-compact" : ""}`}>
      <div className="page-hero-media" aria-hidden={!imageAlt}>
        {video ? (
          <VideoScene kind="cinematic" label="OrgTik / Brand in motion" />
        ) : (
          <img
            src={`/assets/${image}`}
            alt={imageAlt}
            width="1920"
            height="1072"
          />
        )}
      </div>
      <div className="page-hero-scrim" />
      <div className="wrap page-hero-content">
        {children}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>
          {title} {accent && <span>{accent}</span>}
        </h1>
        {body && <p>{body}</p>}
        {(primary || secondary) && (
          <div className="hero-actions">
            {primary && <Action href={primary.href}>{primary.label}</Action>}
            {secondary && (
              <Action href={secondary.href} secondary>
                {secondary.label}
              </Action>
            )}
          </div>
        )}
      </div>
      {!compact && (
        <a className="page-hero-down" href="#page-content">
          Continue <ArrowDown size={16} />
        </a>
      )}
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  number,
  title,
  body,
  inverse = false,
  action,
}) {
  return (
    <div className={`page-section-intro ${inverse ? "inverse" : ""}`}>
      <div>
        <Eyebrow number={number}>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      <div className="page-section-side">
        {body && <p>{body}</p>}
        {action && <Action href={action.href}>{action.label}</Action>}
      </div>
    </div>
  );
}

export function BrandMedia({ image, alt, label, tall = false }) {
  return (
    <figure className={`brand-media ${tall ? "brand-media-tall" : ""}`}>
      <img
        src={`/assets/${image}`}
        alt={alt}
        width="1920"
        height="1072"
        loading="lazy"
      />
      {label && <figcaption>{label}</figcaption>}
    </figure>
  );
}

export function PreviewNote({
  children = "Frontend preview · No live service or transaction is connected.",
}) {
  return (
    <p className="preview-note">
      <Info size={16} aria-hidden="true" /> {children}
    </p>
  );
}

export function FeatureList({ items }) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} weight="bold" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedSteps({ items }) {
  return (
    <ol className="numbered-steps">
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PageCTA({
  eyebrow = "Start a conversation",
  title,
  body,
  href = "/contact",
  label = "Talk to us",
  contained = false,
}) {
  return (
    <section
      id="page-cta"
      className={`page-cta-shell ${contained ? "page-cta-shell-contained" : ""}`}
    >
      <div className={`page-cta ${contained ? "page-cta-contained" : ""}`}>
        {contained ? (
          <img
            className="page-cta-mark"
            src="/assets/logo/orgtik-mark-white.svg"
            alt=""
            aria-hidden="true"
            width="247"
            height="250"
          />
        ) : (
          <div className="page-cta-orbit" aria-hidden="true">
            <Sparkle size={26} />
          </div>
        )}
        <div className="wrap page-cta-inner">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title}</h2>
          </div>
          <div>
            <p>{body}</p>
            <Action href={href} tone="light">
              {label}
            </Action>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialLink({ href, eyebrow, title, body, meta, image }) {
  return (
    <a className="editorial-link" href={href}>
      {image && (
        <span className="editorial-link-media">
          <img
            src={`/assets/${image}`}
            alt=""
            width="960"
            height="720"
            loading="lazy"
          />
        </span>
      )}
      <span className="editorial-link-copy">
        <small>{eyebrow}</small>
        <strong>{title}</strong>
        {body && <span>{body}</span>}
        {meta && <em>{meta}</em>}
      </span>
      <span className="editorial-link-arrow" aria-hidden="true">
        <ArrowUpRight size={20} />
      </span>
    </a>
  );
}

export function EmptyState({ title, body, action }) {
  return (
    <div className="empty-state" role="status">
      <span aria-hidden="true">00</span>
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}

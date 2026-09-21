import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  Quotes,
  User,
} from "@phosphor-icons/react";
import { services } from "./content";
import { Action } from "./Action";

export function Disclosure({
  open,
  onToggle,
  header,
  children,
  className = "",
}) {
  const id = useId();
  return (
    <article className={`disclosure ${className}`} data-open={open}>
      <h3 className="disclosure-heading">
        <button
          className="disclosure-trigger"
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
        >
          {header}
          <span className="disclosure-toggle" aria-hidden="true">
            <Plus size={18} />
          </span>
        </button>
      </h3>
      <div
        className="disclosure-panel"
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        inert={!open}
      >
        <div className="disclosure-clip">{children}</div>
      </div>
    </article>
  );
}

export function Services({ onContact }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="service-stage" data-reveal>
      <div className="service-stage-intro">
        <span>From first impression to what comes next.</span>
        <span>
          Four ways forward <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="service-accordions">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Disclosure
              key={service.title}
              className="service-item"
              open={selected === index}
              onToggle={() => setSelected(selected === index ? null : index)}
              header={
                <>
                  <span className="service-glyph">
                    <Icon size={24} weight="light" />
                  </span>
                  <span className="service-title">
                    {service.title}
                    <small aria-hidden="true">{service.index}</small>
                  </span>
                  <span className="service-tags" aria-hidden="true">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </>
              }
            >
              <div className="service-detail">
                <figure className="service-visual">
                  <img
                    src={`/assets/${service.image}`}
                    alt={service.imageAlt}
                    loading="lazy"
                    width="1920"
                    height="1072"
                  />
                  <figcaption>
                    <span>{service.category}</span>
                    <small>{service.caption}</small>
                  </figcaption>
                </figure>
                <div className="service-story">
                  <span className="service-story-index" aria-hidden="true">
                    {service.index}
                  </span>
                  <h4>{service.category}.</h4>
                  <p>{service.text}</p>
                  <div className="service-deliverables">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Action
                    onClick={onContact}
                    className="service-cta"
                    tone="light"
                  >
                    Start a project
                  </Action>
                </div>
              </div>
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
}

const projects = [
  {
    image: "brand-cards.webp",
    title: "Identity, made tangible.",
    alt: "OrgTik business cards with a metallic violet identity",
    category: "Brand identity",
    text: "The OrgTik identity in print. Sculptural forms, a deep violet palette, and a wordmark designed to carry through every touchpoint.",
  },
  {
    image: "brand-tablet.webp",
    title: "A presence that carries through.",
    alt: "The OrgTik identity displayed on a tablet",
    category: "Digital presence",
    text: "The same identity, translated to a digital surface. A consistent visual language that connects the brand across screens and physical applications.",
  },
];

export function CursorTarget({
  as: Tag = "button",
  label = "View project",
  className = "",
  children,
  ...props
}) {
  const cursor = useRef(null);
  function move(event) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    cursor.current.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
  }
  return (
    <Tag
      {...props}
      className={`cursor-target ${className}`}
      onPointerMove={move}
      onPointerEnter={move}
    >
      {children}
      <span className="context-cursor" ref={cursor} aria-hidden="true">
        <span>
          {label}
          <ArrowUpRight size={20} />
        </span>
      </span>
    </Tag>
  );
}

export function Projects() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const previousFocus = useRef(null);
  const isOpen = selected !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <div className="brand-story-images project-gallery">
        {projects.map((project, index) => (
          <figure
            className={
              index === 0 ? "brand-story-primary" : "brand-story-secondary"
            }
            key={project.image}
            data-reveal
          >
            <CursorTarget
              className="project-trigger"
              aria-label={`View project: ${project.title}`}
              onClick={(event) => {
                previousFocus.current = event.currentTarget;
                setSelected(index);
              }}
            >
              <img
                src={`/assets/${project.image}`}
                alt={project.alt}
                loading="lazy"
                width="1920"
                height="1072"
              />
              <span className="project-open-icon" aria-hidden="true">
                <ArrowUpRight size={24} />
              </span>
            </CursorTarget>
            <figcaption>
              <span>{project.title}</span>
              <small>{project.category}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      {isOpen && (
        <dialog
          className="project-dialog"
          ref={dialog}
          aria-labelledby="project-title"
          onCancel={(event) => {
            event.preventDefault();
            setSelected(null);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="project-dialog-top">
            <span>OrgTik / {projects[selected].category}</span>
            <button
              className="icon-button"
              aria-label="Close project"
              onClick={() => setSelected(null)}
            >
              <X size={24} />
            </button>
          </div>
          <img
            key={projects[selected].image}
            className="project-dialog-image"
            src={`/assets/${projects[selected].image}`}
            alt={projects[selected].alt}
            width="1920"
            height="1072"
          />
          <div className="project-dialog-copy">
            <div>
              <h2 id="project-title">{projects[selected].title}</h2>
              <p>{projects[selected].text}</p>
            </div>
            <div className="project-pagination">
              <button
                className="icon-button"
                aria-label="Previous project"
                onClick={() =>
                  setSelected(
                    (selected + projects.length - 1) % projects.length,
                  )
                }
              >
                <ArrowLeft size={22} />
              </button>
              <span>
                {selected + 1} / {projects.length}
              </span>
              <button
                className="icon-button"
                aria-label="Next project"
                onClick={() => setSelected((selected + 1) % projects.length)}
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

// Deliberately editorial placeholders, not invented client endorsements.
const testimonialPreviews = [
  {
    focus: "Brand & identity",
    quote:
      "A client’s perspective on building a clearer, more distinctive brand.",
  },
  {
    focus: "Digital experiences",
    quote: "A client’s story of bringing their digital experience to life.",
  },
  {
    focus: "Connected systems",
    quote: "A client’s experience of making everyday work feel more connected.",
  },
];

export function Testimonials() {
  return (
    <section
      className="testimonials-section section-pad"
      id="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="wrap" data-reveal>
        <div className="testimonials-heading">
          <h2 id="testimonials-title">
            In our clients’ <span>words.</span>
          </h2>
          <p>
            Testimonial preview.
            <br />
            Approved client stories will appear here.
          </p>
        </div>
        <ul className="testimonial-grid" aria-label="Testimonial placeholders">
          {testimonialPreviews.map((testimonial) => (
            <li className="testimonial-card" key={testimonial.focus}>
              <figure>
                <div className="testimonial-meta">
                  <Quotes size={32} weight="fill" aria-hidden="true" />
                  <span>{testimonial.focus}</span>
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <span className="testimonial-placeholder">
                  Placeholder testimonial
                </span>
                <figcaption>
                  <span className="testimonial-avatar" aria-hidden="true">
                    <User size={22} weight="light" />
                  </span>
                  <span>
                    <strong>Client name</strong>
                    <small>Role, company · Placeholder</small>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Closing({ onContact }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className={`cinematic-closing section-pad ${visible ? "is-visible" : ""}`}
      ref={ref}
    >
      <div className="closing-art" aria-hidden="true">
        <img
          src="/assets/brand-glass.webp"
          alt=""
          loading="lazy"
          width="1920"
          height="1072"
        />
      </div>
      <div className="closing-light closing-light-one" aria-hidden="true" />
      <div className="closing-light closing-light-two" aria-hidden="true" />
      <div className="wrap closing-content" data-reveal>
        <p className="eyebrow">The next connection starts here</p>
        <h2>
          <span>What could we</span>
          <span>
            build <em>together?</em>
          </span>
        </h2>
        <p className="closing-description">
          Your next idea. Our shared ambition.
        </p>
        <Action className="closing-action" onClick={onContact}>
          Start a conversation
        </Action>
      </div>
    </section>
  );
}

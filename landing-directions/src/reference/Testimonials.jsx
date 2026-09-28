import { useEffect, useId, useRef, useState } from "react";
import "./testimonials.css";

const entries = [
  {
    id: "brand",
    category: "Services",
    topic: "Brand & digital design",
    detail:
      "Space for approved feedback about brand strategy, identity, and digital design.",
  },
  {
    id: "crm",
    category: "Software",
    topic: "Customer relationships",
    detail:
      "Space for approved feedback about the CRM and managing customer relationships.",
  },
  {
    id: "development",
    category: "Services",
    topic: "Web & platform development",
    detail:
      "Space for approved feedback about building and launching a digital experience.",
  },
  {
    id: "operations",
    category: "Software",
    topic: "Connected operations",
    detail:
      "Space for approved feedback about bringing everyday business systems together.",
  },
  {
    id: "support",
    category: "Services",
    topic: "Hosting & ongoing support",
    detail:
      "Space for approved feedback about hosting, maintenance, and ongoing support.",
  },
  {
    id: "people",
    category: "Software",
    topic: "People & HR",
    detail:
      "Space for approved feedback about people management and the HR workspace.",
  },
];

export function Testimonials({ scope = "All", project }) {
  const [filter, setFilter] = useState("All");
  const [position, setPosition] = useState({ start: true, end: false });
  const section = useRef(null),
    track = useRef(null),
    paused = useRef(false),
    visible = useRef(false),
    lastAction = useRef(0);
  const id = useId();
  const items = project
    ? [
        {
          id: project.slug,
          category:
            project.slug === "connected-platform-concept"
              ? "Software"
              : "Services",
          topic: project.name,
          detail:
            "Space reserved for approved feedback specifically about " +
            project.name +
            ". No client testimonial has been supplied for this project.",
        },
      ]
    : entries.filter(
        (item) =>
          (scope === "All" || item.category === scope) &&
          (scope !== "All" || filter === "All" || item.category === filter),
      );
  const update = () => {
    const el = track.current;
    if (el)
      setPosition({
        start: el.scrollLeft < 4,
        end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
      });
  };
  const move = (direction, manual = true) => {
    const el = track.current;
    if (!el) return;
    if (manual) lastAction.current = Date.now();
    const step =
      (el.firstElementChild?.getBoundingClientRect().width || el.clientWidth) +
      20;
    el.scrollBy({
      left: direction * step,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  useEffect(() => {
    track.current?.scrollTo({ left: 0, behavior: "instant" });
    update();
    const resize = new ResizeObserver(update);
    if (track.current) resize.observe(track.current);
    return () => resize.disconnect();
  }, [filter, scope, project?.slug]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(section.current);
    const timer = setInterval(() => {
      const el = track.current;
      if (
        !el ||
        !visible.current ||
        paused.current ||
        document.hidden ||
        document.querySelector('[role="dialog"], dialog[open]') ||
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        Date.now() - lastAction.current < 3000 ||
        el.scrollWidth <= el.clientWidth + 4
      )
        return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
        el.scrollTo({ left: 0, behavior: "smooth" });
      else move(1, false);
    }, 3000);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);
  return (
    <section
      className="testimonials"
      ref={section}
      aria-labelledby={id}
      onKeyDownCapture={() => {
        paused.current = true;
      }}
      onFocusCapture={() => {
        paused.current = true;
      }}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) paused.current = false;
      }}
      onPointerDown={() => {
        lastAction.current = Date.now();
      }}
      onWheel={() => {
        lastAction.current = Date.now();
      }}
    >
      <div className="testimonials__inner">
        <div className="testimonials__heading">
          <div>
            <p className="testimonials__eyebrow">Testimonials</p>
            <h2 id={id}>
              {project
                ? "Feedback on this project"
                : scope === "Services"
                  ? "Feedback on our services"
                  : scope === "Software"
                    ? "Feedback on our software"
                    : "Across services and software"}
            </h2>
          </div>
          <p className="testimonials__note">
            Client feedback will appear here once approved. These cards are
            labelled placeholders, not client endorsements.
          </p>
        </div>
        <div className="testimonials__toolbar">
          {scope === "All" && !project ? (
            <div
              className="testimonials__filters"
              role="group"
              aria-label="Filter testimonials"
            >
              {["All", "Services", "Software"].map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          ) : (
            <span className="testimonials__context">
              {project ? project.name : scope + " testimonials"}
            </span>
          )}
          {items.length > 1 && (
            <div className="testimonials__controls">
              <button
                type="button"
                aria-label="Previous testimonials"
                disabled={position.start}
                onClick={() => move(-1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                disabled={position.end}
                onClick={() => move(1)}
              >
                →
              </button>
            </div>
          )}
        </div>
        <div
          className="testimonials__track"
          ref={track}
          tabIndex={items.length > 1 ? 0 : undefined}
          role="region"
          aria-label="Testimonial cards"
          onScroll={update}
          onKeyDown={(e) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
              return;
            e.preventDefault();
            lastAction.current = Date.now();
            if (e.key === "ArrowLeft" || e.key === "ArrowRight")
              move(e.key === "ArrowRight" ? 1 : -1);
            else
              track.current.scrollTo({
                left: e.key === "Home" ? 0 : track.current.scrollWidth,
                behavior: "instant",
              });
          }}
        >
          {items.map((item) => (
            <article className="testimonials__card" key={item.id}>
              <div className="testimonials__tags">
                <span
                  className={
                    "testimonials__tag testimonials__tag--" +
                    item.category.toLowerCase()
                  }
                >
                  {item.category}
                </span>
                {project && (
                  <span className="testimonials__tag">Project feedback</span>
                )}
              </div>
              <h3>{item.topic}</h3>
              <p>{item.detail}</p>
              <div className="testimonials__placeholder">
                <span aria-hidden="true">○</span> Testimonial placeholder ·
                awaiting approval
              </div>
            </article>
          ))}
        </div>
        <p className="testimonials__count" aria-live="polite">
          {items.length} {items.length === 1 ? "placeholder" : "placeholders"}
          {scope === "All" && !project && filter !== "All"
            ? " · " + filter
            : ""}
        </p>
      </div>
    </section>
  );
}

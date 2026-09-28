import { useEffect, useId, useRef, useState } from "react";
import "./testimonials.css";

const entries = [
  {
    id: "brand",
    category: "Services",
    topic: "Brand & digital design",
    detail: "A client’s story of bringing their digital experience to life.",
  },
  {
    id: "crm",
    category: "Software",
    topic: "Customer relationships",
    detail: "A client’s experience of building closer customer relationships.",
  },
  {
    id: "development",
    category: "Services",
    topic: "Web & platform development",
    detail:
      "A client’s perspective on turning a digital idea into something people can use.",
  },
  {
    id: "operations",
    category: "Software",
    topic: "Connected operations",
    detail:
      "A client’s experience of making everyday work feel more connected.",
  },
  {
    id: "support",
    category: "Services",
    topic: "Hosting & ongoing support",
    detail:
      "A client’s story of keeping their digital business moving forward.",
  },
  {
    id: "people",
    category: "Software",
    topic: "People & HR",
    detail: "A client’s perspective on making more time for their people.",
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
            "A client’s perspective on " +
            project.name +
            ". A project story awaiting approval.",
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
        first:
          Math.round(
            el.scrollLeft /
              (el.firstElementChild.getBoundingClientRect().width +
                parseFloat(getComputedStyle(el).columnGap)),
          ) + 1,
        last: Math.round(
          (el.scrollLeft +
            el.clientWidth +
            parseFloat(getComputedStyle(el).columnGap)) /
            (el.firstElementChild.getBoundingClientRect().width +
              parseFloat(getComputedStyle(el).columnGap)),
        ),
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
      parseFloat(getComputedStyle(el).columnGap);
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
          <h2 id={id}>
            In our clients’ <span>words.</span>
          </h2>
          <p className="testimonials__note">
            Testimonial preview.
            <br />
            Approved client stories will appear here.
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
            <p className="testimonials__context">
              {project ? project.name : scope + " testimonials"}
            </p>
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
              <div className="testimonials__card-top">
                <i className="ph-fill ph-quotes" aria-hidden="true" />
                <div className="testimonials__category">
                  <span>{item.topic}</span>
                  <span
                    className={
                      "testimonials__tag testimonials__tag--" +
                      item.category.toLowerCase()
                    }
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <p className="testimonials__quote">{item.detail}</p>
              <div
                className="testimonials__rating"
                role="img"
                aria-label="Five-star rating preview; not a client rating"
              >
                <span aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className="ph-fill ph-star" />
                  ))}
                </span>
                <span aria-hidden="true">Rating preview</span>
              </div>

              <div className="testimonials__client">
                <span className="testimonials__avatar">
                  <i className="ph-light ph-user" aria-hidden="true" />
                </span>
                <div>
                  <strong>Client name</strong>
                  <p>Role, company · Placeholder</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="testimonials__bottom">
          <p className="testimonials__count">
            {String(position.first || 1).padStart(2, "0")}–
            {String(Math.min(position.last || 1, items.length)).padStart(
              2,
              "0",
            )}{" "}
            <span>of {String(items.length).padStart(2, "0")}</span>
          </p>
          {items.length > 1 && (
            <div className="testimonials__controls">
              <button
                type="button"
                aria-label="Previous testimonials"
                disabled={position.start}
                onClick={() => move(-1)}
              >
                <i className="ph ph-arrow-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                disabled={position.end}
                onClick={() => move(1)}
              >
                <i className="ph ph-arrow-right" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

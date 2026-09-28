import { PROJECTS } from "./projects";
import "./service-work.css";

export function ServiceWork({ family, service }) {
  const category =
    family.slug === "marketing" ? "digital-marketing" : family.slug;
  const relatedCategory = {
    design: "development",
    development: "hosting",
    "digital-marketing": "design",
    "it-support": "hosting",
    hosting: "it-support",
  }[category];
  const projects = [
    ...PROJECTS.filter((project) => project.service === category),
    ...PROJECTS.filter((project) => project.service === relatedCategory),
  ].slice(0, 2);
  if (!projects.length) return null;
  return (
    <section
      className="service-work"
      id="service-work"
      aria-labelledby="service-work-title"
    >
      <div className="service-work__inner">
        <div className="service-work__heading">
          <div>
            <p className="service-work__eyebrow">
              <span>(04)</span>
              <span className="service-work__eyebrow-rule" aria-hidden="true" />
              <span>Related work · {family.short}</span>
            </p>
            <h2 id="service-work-title">
              See the thinking.
              <br />
              <span>Explore the work.</span>
            </h2>
          </div>
          <p>
            Explore related {family.short.toLowerCase()} work alongside{" "}
            {service.name.toLowerCase()}. Each project is labelled with its
            current status.
          </p>
        </div>
        <div className="service-work__grid">
          {projects.map((project) => (
            <a
              className="service-work__card"
              key={project.slug}
              href={"/work#/project/" + project.slug}
            >
              <img
                src={"/assets/" + project.image}
                alt={project.name + " — project imagery"}
                loading="lazy"
              />
              <div className="service-work__body">
                <div className="service-work__tags">
                  <span>{project.status}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <span className="service-work__link">
                  View project{" "}
                  <i className="ph ph-arrow-up-right" aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
        <a className="service-work__all" href="/work">
          View all work <i className="ph ph-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

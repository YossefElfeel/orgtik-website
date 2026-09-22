import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Broadcast,
  CheckCircle,
  CirclesThreePlus,
  Code,
  Copy,
  Eye,
  EyeSlash,
  HardDrives,
  Lifebuoy,
  Lightning,
  MagnifyingGlass,
  Megaphone,
  Minus,
  Palette,
  Plus,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { Action, Eyebrow, Logo, Process } from "./shared";
import { CursorTarget, Testimonials } from "./Experience";
import { modules } from "./content";
import {
  insightCategories,
  insights,
  legalPages,
  planOptions,
  projects,
  roadmapItems,
  serviceFamilies,
} from "./siteContent";
import {
  BrandMedia,
  Breadcrumbs,
  EditorialLink,
  EmptyState,
  FeatureList,
  NumberedSteps,
  PageCTA,
  PageHero,
  PreviewNote,
  SectionIntro,
  SiteLayout,
} from "./pageComponents";

const processSteps = [
  {
    title: "Understand",
    body: "Clarify the business need, the audience, and what a useful outcome must change.",
  },
  {
    title: "Design",
    body: "Turn the right questions into a shared direction, system, and practical delivery plan.",
  },
  {
    title: "Deliver",
    body: "Bring design and technology together into something people can use with confidence.",
  },
  {
    title: "Evolve",
    body: "Learn from the work, improve the system, and keep the next decision connected.",
  },
];

const serviceTestimonialPreviews = [
  {
    focus: "Marketing · Campaign direction",
    quote:
      "A future client story about turning scattered activity into one campaign direction the team could follow.",
  },
  {
    focus: "IT support · Continuity",
    quote:
      "A future client perspective on having a responsive partner who already understood the systems behind the work.",
  },
  {
    focus: "Development · Delivery",
    quote:
      "A future client story about moving from a complex idea to a clear, dependable digital product.",
  },
  {
    focus: "Design · Identity",
    quote:
      "A future client perspective on building a visual system that made the next decision easier.",
  },
  {
    focus: "Hosting · Ongoing care",
    quote:
      "A future client story about connecting hosting, maintenance, and support around one accountable relationship.",
  },
];

const HOSTING_EXTERNAL_URL = "https://orgtik.ch";

const recommendationPlans = [
  {
    id: "launch",
    number: "01",
    eyebrow: "Start focused",
    title: "Launch plan",
    body: "Shape the selected systems into a clear first release your team can understand and adopt.",
    scope: "Selected systems",
    features: [
      "Configuration workshop",
      "Core workspace setup",
      "Guided launch plan",
      "Team handover session",
    ],
  },
  {
    id: "connected",
    number: "02",
    eyebrow: "Build the flow",
    title: "Connected plan",
    body: "Connect the selected systems around the work, decisions, and handoffs that matter most.",
    scope: "Systems + connected workflows",
    featured: true,
    features: [
      "Everything in Launch",
      "Workflow and role mapping",
      "Cross-system coordination",
      "Adoption support",
    ],
  },
  {
    id: "partnership",
    number: "03",
    eyebrow: "Keep evolving",
    title: "Partnership plan",
    body: "Launch the selected workspace with an ongoing rhythm for support, learning, and improvement.",
    scope: "Systems + ongoing evolution",
    features: [
      "Everything in Connected",
      "Improvement roadmap",
      "Ongoing support rhythm",
      "Evolution planning",
    ],
  },
];

const durationOptions = [
  { id: "monthly", label: "Monthly", months: 1, discount: 0 },
  { id: "annual", label: "12 months", months: 12, discount: 0.15 },
  { id: "biennial", label: "24 months", months: 24, discount: 0.22 },
];

const planModeMeta = {
  single: "1 product · Maximum flexibility",
  operations: "3 products · 15% bundle saving",
  growth: "3 products · 15% bundle saving",
  complete: "6 products · 25% bundle saving",
  custom: "Choose 2–5 · 10% bundle saving",
};

const servicePackages = [
  {
    id: "focus",
    name: "Focus",
    note: "One service, one clear outcome, and a defined delivery window.",
    price: 1800,
  },
  {
    id: "connected",
    name: "Connected",
    note: "A coordinated bundle for two adjacent capabilities that need to move together.",
    price: 4200,
    featured: true,
  },
  {
    id: "partnership",
    name: "Partnership",
    note: "An ongoing service rhythm with delivery, support, and measured improvement.",
    price: 1450,
    recurring: true,
  },
];

const formatCHF = (value) =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);

function getWorkspacePrice(selected, mode, durationId = "annual") {
  const duration =
    durationOptions.find((option) => option.id === durationId) ||
    durationOptions[1];
  const subtotal = modules
    .filter((module) => selected.includes(module.id))
    .reduce((sum, module) => sum + module.monthlyPrice, 0);
  const bundleDiscount =
    mode === "complete"
      ? 0.25
      : ["operations", "growth"].includes(mode)
        ? 0.15
        : selected.length > 1
          ? 0.1
          : 0;
  const bundledMonthly = subtotal * (1 - bundleDiscount);
  const monthly = Math.round(bundledMonthly * (1 - duration.discount));
  return {
    duration,
    subtotal,
    bundleDiscount,
    monthly,
    billingTotal: monthly * duration.months,
  };
}

function WorkspaceConstellation() {
  const [activeId, setActiveId] = useState("website");
  const active = modules.find((module) => module.id === activeId) || modules[0];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = modules.findIndex((module) => module.id === current);
        return modules[(index + 1) % modules.length].id;
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="workspace-constellation"
      aria-label="Interactive view of connected OrgTik SaaS products"
    >
      <div className="constellation-glow" aria-hidden="true" />
      <div
        className="constellation-ring constellation-ring-outer"
        aria-hidden="true"
      />
      <div
        className="constellation-ring constellation-ring-inner"
        aria-hidden="true"
      />
      <div className="constellation-pulse pulse-one" aria-hidden="true" />
      <div className="constellation-pulse pulse-two" aria-hidden="true" />
      {modules.map((module, index) => {
        const Icon = module.icon;
        return (
          <button
            type="button"
            className={`constellation-node ${activeId === module.id ? "active" : ""}`}
            style={{ "--node-index": index }}
            key={module.id}
            onPointerEnter={() => setActiveId(module.id)}
            onFocus={() => setActiveId(module.id)}
            onClick={() => setActiveId(module.id)}
            aria-pressed={activeId === module.id}
          >
            <Icon
              size={21}
              weight={activeId === module.id ? "fill" : "regular"}
            />
            <span>{module.formal}</span>
          </button>
        );
      })}
      <div className="constellation-core" aria-live="polite">
        <span>
          <ActiveIcon size={27} weight="fill" />
        </span>
        <small>Shared context</small>
        <strong>{active.formal}</strong>
        <p>{active.short}</p>
      </div>
      <div className="constellation-status">
        <Broadcast size={15} weight="fill" /> Context synced
      </div>
    </div>
  );
}

const matchFamily = (slug) =>
  serviceFamilies.find((family) => family.slug === slug);
const matchService = (family, slug) =>
  family?.children.find((service) => service.slug === slug);
const matchModule = (slug) => modules.find((module) => module.id === slug);

const serviceFamilyIcons = {
  marketing: Megaphone,
  "it-support": Lifebuoy,
  development: Code,
  design: Palette,
  hosting: HardDrives,
};

function ServicesOverview({ navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="Services / Five connected capabilities"
        title="Expert teams for the systems"
        accent="your customers depend on."
        body="Choose the outcome you need. We’ll connect the right strategy, design, technology, hosting, and support around it."
        primary={{ label: "Find the right service", href: "#service-families" }}
        secondary={{
          label: "Start a project",
          href: "/contact?intent=services",
        }}
        video
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap" id="service-families">
          <SectionIntro
            number="01"
            eyebrow="Where should we begin?"
            title="Five paths. One connected team."
            body="Start with the problem in front of you. Each pathway can stand alone or connect to the others as the work grows."
          />
          <div className="module-card-grid cinematic-card-grid service-overview-grid">
            {serviceFamilies.map((family, index) => {
              const FamilyIcon = serviceFamilyIcons[family.slug];
              return (
                <CursorTarget
                  as="a"
                  label={`Explore ${family.name}`}
                  className="module-card service-overview-card"
                  href={`/services/${family.slug}`}
                  key={family.slug}
                >
                  <span className="module-card-media" aria-hidden="true">
                    <img
                      src={`/assets/${family.image}`}
                      alt=""
                      loading={index > 1 ? "lazy" : "eager"}
                    />
                    <span className="module-card-icon">
                      <FamilyIcon size={23} weight="fill" />
                    </span>
                  </span>
                  <span className="module-card-copy">
                    <small>
                      {String(index + 1).padStart(2, "0")} · {family.kicker}
                    </small>
                    <h3>{family.name}</h3>
                    <p>{family.intro}</p>
                    <span className="module-card-action">
                      Explore services <ArrowRight size={17} />
                    </span>
                  </span>
                </CursorTarget>
              );
            })}
          </div>
        </div>
      </section>
      <section className="page-section deep-section services-process-section">
        <div className="wrap">
          <div className="process-heading" data-reveal="stagger">
            <Eyebrow number="02">One engagement, clearly shaped</Eyebrow>
            <h2>
              One engagement.
              <br />
              <span>Clearly shaped.</span>
            </h2>
            <p>
              Understand the need. Design the direction.
              <br />
              Deliver the work. Keep it evolving.
            </p>
          </div>
          <Process />
        </div>
      </section>
      <Testimonials
        items={serviceTestimonialPreviews}
        heading="What the right expertise"
        accent="could change."
        intro={
          <>
            Service testimonial preview.
            <br />
            Approved client stories will appear here.
          </>
        }
        id="service-testimonials"
      />
      <PageCTA
        title="Not sure which service fits?"
        body="Bring us the business problem. We’ll help shape the right starting point without forcing the work into a predefined package."
        href="/contact?intent=services"
        label="Find your starting point"
        contained
      />
    </SiteLayout>
  );
}

function ServiceFamilyPage({ family, navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow={`Services / ${family.name}`}
        title={family.title}
        body={family.intro}
        primary={{ label: "Choose a service", href: "#family-services" }}
        secondary={{
          label: "Discuss the outcome",
          href: `/contact?service=${family.slug}`,
        }}
        image={family.image}
      >
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: family.name },
          ]}
        />
      </PageHero>
      <section className="page-section paper-section" id="page-content">
        <div className="wrap">
          <SectionIntro
            number="01"
            eyebrow={family.kicker}
            title={`One connected team for better ${family.name.toLowerCase()}.`}
            body="Choose one focused service or combine the capabilities that need to move together. Every engagement starts with a clear outcome."
          />
          <div className="family-card-grid" id="family-services">
            {family.children.map((service, index) => (
              <CursorTarget
                as="a"
                label={`Explore ${service.name}`}
                className="family-card"
                href={`/services/${family.slug}/${service.slug}`}
                key={service.slug}
              >
                <span className="family-card-media" aria-hidden="true">
                  <img src={`/assets/${family.image}`} alt="" loading="lazy" />
                </span>
                <span className="family-card-copy">
                  <span className="family-card-number">
                    {String(index + 1).padStart(2, "0")} · {family.kicker}
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.outcome}</p>
                  <span className="family-card-action">
                    Explore the service <ArrowRight size={18} />
                  </span>
                </span>
              </CursorTarget>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section deep-section">
        <div className="wrap media-story-grid">
          <BrandMedia
            image={family.image}
            alt={`OrgTik brand application for ${family.name}`}
            label="Brand-led service experience"
            tall
          />
          <div className="media-story-copy">
            <Eyebrow number="02">How the work connects</Eyebrow>
            <h2>Focused enough to start. Flexible enough to grow.</h2>
            <p>
              Begin with the immediate need, then connect the adjacent expertise
              only when it strengthens the outcome.
            </p>
            <FeatureList
              items={[
                "A clear brief and success criteria",
                "One connected delivery rhythm",
                "Practical outputs at every stage",
              ]}
            />
          </div>
        </div>
      </section>
      <section className="page-section paper-section service-plans-section">
        <div className="wrap">
          <SectionIntro
            number="03"
            eyebrow="Ways to work together"
            title="Start focused or connect the services."
            body="Indicative frontend pricing helps compare engagement shapes. The final scope and estimate are confirmed before work begins."
          />
          <div className="service-package-grid">
            {servicePackages.map((option) => (
              <article
                className={option.featured ? "featured" : ""}
                key={option.id}
              >
                <span className="service-package-icon">
                  {option.id === "focus" ? (
                    <Lightning size={22} />
                  ) : option.id === "connected" ? (
                    <CirclesThreePlus size={22} />
                  ) : (
                    <Sparkle size={22} />
                  )}
                </span>
                <small>
                  {option.featured ? "Most flexible" : "Engagement option"}
                </small>
                <h3>{option.name}</h3>
                <p>{option.note}</p>
                <div className="service-package-price">
                  <span>From</span>
                  <strong>{formatCHF(option.price)}</strong>
                  <small>{option.recurring ? "/ month" : "/ engagement"}</small>
                </div>
                <a
                  href={`/contact?service=${family.slug}&package=${option.id}`}
                >
                  Discuss {option.name.toLowerCase()} <ArrowRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        title={`Ready to improve ${family.name.toLowerCase()}?`}
        body="Tell us what needs to work better and we’ll shape the right engagement around it."
        href={`/contact?service=${family.slug}`}
        label="Discuss the project"
      />
    </SiteLayout>
  );
}

function ServiceDetailPage({ family, service, navigate, path }) {
  const related = family.children.filter((item) => item.slug !== service.slug);
  const isHosting = family.slug === "hosting";
  const sampleProject = projects.find(
    (project) => project.service === family.slug,
  );
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow={`${family.name} / ${service.name}`}
        title={service.outcome}
        body={service.summary}
        primary={{
          label: isHosting ? "Open hosting website" : "Discuss this project",
          href: isHosting
            ? HOSTING_EXTERNAL_URL
            : `/contact?service=${service.slug}`,
        }}
        secondary={{ label: "See the approach", href: "#service-approach" }}
        image={family.image}
      >
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: family.name, href: `/services/${family.slug}` },
            { label: service.name },
          ]}
        />
      </PageHero>
      <section className="page-section paper-section" id="page-content">
        <div className="wrap outcome-grid">
          <div>
            <Eyebrow number="01">The outcome</Eyebrow>
            <h2>Built around the result, not a list of deliverables.</h2>
          </div>
          <div>
            <p className="lead-copy">{service.summary}</p>
            <FeatureList items={service.capabilities} />
          </div>
        </div>
      </section>
      <section className="page-section deep-section" id="service-approach">
        <div className="wrap">
          <SectionIntro
            number="02"
            eyebrow="A practical path"
            title="From the current problem to a stronger system."
            body="Each phase has a visible output, so the work stays understandable and decisions stay connected."
          />
          <NumberedSteps items={processSteps} />
        </div>
      </section>
      <section className="page-section paper-section">
        <div className="wrap engagement-grid">
          <div>
            <Eyebrow number="03">Engagement</Eyebrow>
            <h2>A clear scope before the work begins.</h2>
            <p>
              Pricing follows the agreed outcome, level of complexity, and
              delivery model. We’ll define the scope and estimate before any
              commitment.
            </p>
            <Action
              href={
                isHosting
                  ? HOSTING_EXTERNAL_URL
                  : `/contact?service=${service.slug}`
              }
            >
              {isHosting ? "Continue to hosting" : "Request an estimate"}
            </Action>
          </div>
          <BrandMedia
            image={family.image}
            alt={`OrgTik visual for ${service.name}`}
            label="Service concept · Owner review required"
          />
        </div>
      </section>
      {sampleProject && (
        <section className="page-section paper-section service-project-section">
          <div className="wrap">
            <SectionIntro
              number="04"
              eyebrow="A project in this service"
              title="See the direction in a real page flow."
              body="Each service now connects to a labelled OrgTik-owned, concept, or mock project with a gallery and related insight content."
            />
            <a
              className="service-project-card"
              href={`/work/${sampleProject.slug}`}
            >
              <span className="service-project-media">
                <img
                  src={`/assets/${sampleProject.image}`}
                  alt=""
                  loading="lazy"
                />
              </span>
              <span className="service-project-copy">
                <small>
                  {sampleProject.status} · {sampleProject.category}
                </small>
                <strong>{sampleProject.name}</strong>
                <span>{sampleProject.summary}</span>
                <em>
                  View project <ArrowRight size={17} />
                </em>
              </span>
            </a>
          </div>
        </section>
      )}
      {related.length > 0 && (
        <section className="page-section paper-section related-section">
          <div className="wrap">
            <SectionIntro
              eyebrow="Related services"
              title="Keep the next capability connected."
            />
            <div className="related-links">
              {related.map((item) => (
                <EditorialLink
                  key={item.slug}
                  href={`/services/${family.slug}/${item.slug}`}
                  eyebrow={family.name}
                  title={item.name}
                  body={item.outcome}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <PageCTA
        title={
          isHosting
            ? "Ready to choose your hosting?"
            : "Bring us the part that needs to work better."
        }
        body={
          isHosting
            ? "Continue to the external OrgTik website to review availability and start the hosting conversation."
            : "We’ll turn the problem into a practical next step and a transparent scope."
        }
        href={
          isHosting ? HOSTING_EXTERNAL_URL : `/contact?service=${service.slug}`
        }
        label={isHosting ? "Visit hosting website" : "Discuss this project"}
      />
    </SiteLayout>
  );
}

function InsightsPage({ category, navigate, path }) {
  const [query, setQuery] = useState("");
  const filtered = insights.filter((article) => {
    const categoryMatch =
      !category || article.category.toLowerCase() === category.toLowerCase();
    const queryMatch = `${article.title} ${article.excerpt}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  });
  const featured = filtered[0] || insights[0];
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="Insights / Practical thinking"
        title="Ideas for better"
        accent="digital systems."
        body="Thinking on growth, technology, operations, and the work connecting them."
        primary={{
          label: "Read the featured insight",
          href: `/insights/${featured.slug}`,
        }}
        image="brand-tablet.webp"
      >
        <Breadcrumbs
          items={[
            { label: "Insights" },
            ...(category ? [{ label: category }] : []),
          ]}
        />
      </PageHero>
      <section className="page-section paper-section" id="page-content">
        <div className="wrap">
          <div className="filter-bar">
            <div className="filter-links" aria-label="Insight categories">
              <a className={!category ? "active" : ""} href="/insights">
                All
              </a>
              {insightCategories.map((item) => (
                <a
                  className={
                    category?.toLowerCase() === item.toLowerCase()
                      ? "active"
                      : ""
                  }
                  href={`/insights/category/${item.toLowerCase().replaceAll(" ", "-")}`}
                  key={item}
                >
                  {item}
                </a>
              ))}
            </div>
            <label className="search-field">
              <MagnifyingGlass size={18} aria-hidden="true" />
              <span className="sr-only">Search insights</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search insights"
              />
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </p>
          {filtered.length ? (
            <div className="insights-grid">
              {filtered.map((article, index) => (
                <EditorialLink
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  eyebrow={`${article.category} · ${article.readingTime}`}
                  title={article.title}
                  body={article.excerpt}
                  meta={article.date}
                  image={article.image}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matching insights"
              body="Try another phrase or return to all topics."
              action={<Action href="/insights">Clear search</Action>}
            />
          )}
        </div>
      </section>
      <PageCTA
        title="Turn an idea into a useful next move."
        body="If an insight connects with a problem you are solving, let’s talk about what it could become."
        href="/contact?intent=insight"
      />
    </SiteLayout>
  );
}

function ArticlePage({ article, navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        compact
        eyebrow={`${article.category} / ${article.readingTime}`}
        title={article.title}
        body={article.excerpt}
        image={article.image}
      >
        <Breadcrumbs
          items={[
            { label: "Insights", href: "/insights" },
            {
              label: article.category,
              href: `/insights/category/${article.category.toLowerCase().replaceAll(" ", "-")}`,
            },
            { label: article.title },
          ]}
        />
      </PageHero>
      <article className="article-layout paper-section" id="page-content">
        <div className="wrap article-grid">
          <aside className="article-aside">
            <span>Published</span>
            <strong>{article.date}</strong>
            <span>Reading time</span>
            <strong>{article.readingTime}</strong>
            <nav aria-label="On this page">
              <a href="#why">Why it matters</a>
              <a href="#system">See the system</a>
              <a href="#next">Choose the next step</a>
            </nav>
          </aside>
          <div className="article-body">
            <p className="standfirst">
              The strongest digital experiences do more than look coherent. They
              make the relationship between the customer promise, the team’s
              work, and the underlying systems easier to understand.
            </p>
            <h2 id="why">Why the connection matters</h2>
            <p>
              A website often begins as a communication project. As the business
              grows, it becomes part of a broader operating picture: enquiries
              enter, teams respond, files move, campaigns learn, and customers
              expect continuity.
            </p>
            <p>
              Designing each surface separately creates friction between those
              moments. A connected approach starts with the journey and makes
              the hand-offs visible before choosing tools or features.
            </p>
            <blockquote>
              Clarity is the result of making the important relationships
              visible.
            </blockquote>
            <h2 id="system">See the whole system before adding more</h2>
            <p>
              Map the people, decisions, information, and tools involved. Look
              for repeated work, unclear ownership, and moments where customers
              have to start again. These are usually more valuable signals than
              a longer feature list.
            </p>
            <ul>
              <li>Start with the outcome and the person who needs it.</li>
              <li>
                Connect content, interface, and operational responsibility.
              </li>
              <li>
                Measure the quality of the hand-off, not only the activity.
              </li>
            </ul>
            <div className="article-callout">
              <Eyebrow>Key takeaway</Eyebrow>
              <p>
                A useful system reduces the number of times people need to
                reconstruct context.
              </p>
            </div>
            <h2 id="next">Choose one meaningful next step</h2>
            <p>
              Improvement does not require replacing everything. Begin with the
              point where the current journey loses the most clarity, then
              design the surrounding system so the change can grow without
              becoming isolated again.
            </p>
            <PreviewNote>
              Editorial preview · Final articles require owner review and
              migration.
            </PreviewNote>
          </div>
        </div>
      </article>
      <PageCTA
        eyebrow="Related solution"
        title="Build a clearer digital system."
        body="Connect the customer-facing experience with the tools and support behind it."
        href="/services/development"
        label="Explore development"
      />
    </SiteLayout>
  );
}

function AboutPage({ navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="About OrgTik"
        title="We build what businesses"
        accent="depend on."
        body="OrgTik connects strategy, technology, and operations so companies can move with fewer gaps."
        primary={{ label: "See the journey", href: "#journey" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
        video
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap manifesto-grid">
          <Eyebrow number="01">What we believe</Eyebrow>
          <h2>
            Better work begins when the parts stop competing for attention.
          </h2>
          <div>
            <p>
              Brand, product, website, infrastructure, and everyday operations
              should feel like parts of the same direction. We bring the right
              disciplines together around the problem the business actually
              needs to solve.
            </p>
            <p>
              That means fewer hand-offs without context, clearer decisions, and
              work designed to keep creating value after launch.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section deep-section" id="journey">
        <div className="wrap">
          <SectionIntro
            number="02"
            eyebrow="Our journey"
            title="A practice built by connecting the work."
            body="A concise company narrative awaiting owner-approved milestones and team detail."
          />
          <div className="journey-line">
            {[
              [
                "01",
                "A clearer idea",
                "Connect design and technology around the same business outcome.",
              ],
              [
                "02",
                "A broader system",
                "Bring operations, software, and ongoing support into the relationship.",
              ],
              [
                "03",
                "A shared direction",
                "Create one team rhythm from first question to continuous improvement.",
              ],
              [
                "04",
                "What comes next",
                "Keep building useful systems for businesses in Switzerland and beyond.",
              ],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <PreviewNote>
            Company milestones and people details require owner approval before
            publication.
          </PreviewNote>
        </div>
      </section>
      <section className="page-section paper-section">
        <div className="wrap principles-grid">
          <SectionIntro
            number="03"
            eyebrow="Working principles"
            title="How we protect the quality of the outcome."
          />
          {[
            [
              "Ask before assuming",
              "Understand the people, constraints, and operating reality before drawing the solution.",
            ],
            [
              "Make decisions visible",
              "Give teams enough context to judge the work and carry it forward.",
            ],
            [
              "Design for what follows",
              "Build the system around change, ownership, and ongoing care.",
            ],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <PageCTA
        title="Bring the whole problem."
        body="We’ll help find the most useful place to start and keep the wider system in view."
      />
    </SiteLayout>
  );
}

function ContactPage({ navigate, path, search }) {
  const params = new URLSearchParams(search);
  const inferredIntent =
    params.get("intent") === "platform" || params.get("module")
      ? "Platform"
      : params.get("intent") === "support"
        ? "Support"
        : "Services";
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {};
    if (!String(data.get("name") || "").trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || "")))
      next.email = "Enter a valid example email.";
    if (!String(data.get("message") || "").trim())
      next.message = "Tell us briefly what needs to work better.";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="Contact / Start with the problem"
        title="Tell us what needs"
        accent="to work better."
        body="A website, a workflow, a system, or the tools behind the business—start with the part that matters now."
        image="brand-phone.webp"
        compact
      />
      <section className="contact-section paper-section" id="page-content">
        <div className="wrap contact-layout">
          <aside className="contact-details">
            <Eyebrow number="01">Start here</Eyebrow>
            <h2>A calm first conversation.</h2>
            <p>
              Share the context you have. The preview below shows the intended
              enquiry journey; no message is transmitted.
            </p>
            <dl>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+41318127484">+41 31 812 74 84</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:info@orgtik.ch">info@orgtik.ch</a>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>
                  Muristrasse 3<br />
                  3123 Belp, Switzerland
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  Monday–Friday
                  <br />
                  08:00–17:00
                </dd>
              </div>
            </dl>
            <PreviewNote>
              Email ownership and company details require final owner
              verification.
            </PreviewNote>
          </aside>
          <div className="contact-form-panel">
            {sent ? (
              <div className="form-success page-form-success" role="status">
                <CheckCircle size={48} weight="light" />
                <Eyebrow>Preview complete</Eyebrow>
                <h2>Your enquiry journey is ready.</h2>
                <p>
                  No message was sent and no information was stored. In the live
                  experience, this state will explain what happens next.
                </p>
                <Action onClick={() => setSent(false)}>
                  Start another preview
                </Action>
              </div>
            ) : (
              <form className="page-form" onSubmit={submit} noValidate>
                <PreviewNote>
                  Please use example information. This frontend does not send or
                  save form data.
                </PreviewNote>
                <fieldset>
                  <legend>What can we help with?</legend>
                  <div className="choice-row">
                    {[
                      "Services",
                      "Platform",
                      "Support",
                      "Partnership",
                      "Other",
                    ].map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name="intent"
                          value={option}
                          defaultChecked={option === inferredIntent}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="form-row">
                  <label>
                    Your name{" "}
                    <input
                      name="name"
                      autoComplete="off"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <small id="name-error">{errors.name}</small>
                    )}
                  </label>
                  <label>
                    Email address{" "}
                    <input
                      name="email"
                      type="email"
                      autoComplete="off"
                      placeholder="alex@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <small id="email-error">{errors.email}</small>
                    )}
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Company <input name="company" autoComplete="off" />
                  </label>
                  <label>
                    Phone <span className="optional">Optional</span>
                    <input name="phone" type="tel" autoComplete="off" />
                  </label>
                </div>
                <label>
                  What needs to work better?{" "}
                  <textarea
                    name="message"
                    rows="6"
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <small id="message-error">{errors.message}</small>
                  )}
                </label>
                <p className="form-consent">
                  By continuing in a future connected version, you would confirm
                  that OrgTik may use these details to respond to your enquiry.
                  Review the privacy policy before launch.
                </p>
                <Action type="submit">Preview submission</Action>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function PlatformPage({ navigate, path, search }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="OrgTik Business Suite / Working name"
        title="One workspace. Six systems."
        accent="Built to work together."
        body="Start with one module and expand when the business is ready. Every step stays connected to the same clearer operating picture."
        primary={{ label: "Build your plan", href: "#plan-builder" }}
        secondary={{ label: "Explore the modules", href: "#modules" }}
        video
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap">
          <SectionIntro
            number="01"
            eyebrow="Choose a starting point"
            title="Six focused systems. One familiar way to work."
            body="The descriptions below are public product positioning. Availability, limits, integrations, and product captures require product-owner confirmation."
          />
          <div className="module-card-grid cinematic-card-grid" id="modules">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <CursorTarget
                  as="a"
                  label={`Explore ${module.formal}`}
                  className="module-card"
                  href={`/platform/${module.id}`}
                  key={module.id}
                >
                  <span className="module-card-media" aria-hidden="true">
                    <img
                      src={`/assets/${module.image}`}
                      alt=""
                      loading={index > 1 ? "lazy" : "eager"}
                    />
                    <span className="module-card-icon">
                      <Icon size={23} weight="fill" />
                    </span>
                  </span>
                  <span className="module-card-copy">
                    <small>
                      {module.number} · {module.category}
                    </small>
                    <h3>{module.formal}</h3>
                    <p>{module.description}</p>
                    <span className="module-card-action">
                      Explore product <ArrowRight size={17} />
                    </span>
                  </span>
                </CursorTarget>
              );
            })}
          </div>
        </div>
      </section>
      <section className="page-section deep-section">
        <div className="wrap workflow-demo">
          <div>
            <Eyebrow number="02">One workspace</Eyebrow>
            <h2>Let the context move with the work.</h2>
            <p>
              A lead becomes a relationship. The relationship becomes work. The
              work creates files, tasks, updates, and new customer moments. The
              platform direction connects those hand-offs.
            </p>
            <FeatureList
              items={[
                "Consistent navigation across selected modules",
                "Role-aware access and team invitations",
                "Shared support, updates, backups, and export planning",
              ]}
            />
          </div>
          <WorkspaceConstellation />
        </div>
      </section>
      <SaaSConfigurator path={path} search={search} />
      <Testimonials />
      <PageCTA
        eyebrow="Your workspace"
        title="Choose what belongs in it."
        body="Build a local configuration, review the modules, and carry the selection into the enquiry preview."
        href="#plan-builder"
        label="Build your plan"
      />
    </SiteLayout>
  );
}

function ProductDemo({ module }) {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const ActiveIcon = module.icon;
  const active = module.useCases[activeUseCase];

  return (
    <div className="product-demo">
      <div
        className="product-demo-nav"
        role="tablist"
        aria-label={`${module.formal} demo scenarios`}
      >
        {module.useCases.map((useCase, index) => (
          <button
            type="button"
            role="tab"
            id={`${module.id}-demo-tab-${index}`}
            aria-controls={`${module.id}-demo-panel`}
            aria-selected={activeUseCase === index}
            tabIndex={activeUseCase === index ? 0 : -1}
            key={useCase.title}
            onClick={() => setActiveUseCase(index)}
            onMouseEnter={() => setActiveUseCase(index)}
            onFocus={() => setActiveUseCase(index)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? module.useCases.length - 1
                    : (activeUseCase +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        module.useCases.length) %
                      module.useCases.length;
              setActiveUseCase(next);
              requestAnimationFrame(() =>
                document
                  .getElementById(`${module.id}-demo-tab-${next}`)
                  ?.focus(),
              );
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {useCase.title}
          </button>
        ))}
      </div>
      <div
        className="product-demo-stage"
        id={`${module.id}-demo-panel`}
        role="tabpanel"
        aria-labelledby={`${module.id}-demo-tab-${activeUseCase}`}
      >
        <div className="product-demo-status">
          <span>
            <i /> Live prototype
          </span>
          <span>
            {module.formal} · Scenario {activeUseCase + 1}
          </span>
        </div>
        <div className="product-screen" key={`${module.id}-${activeUseCase}`}>
          <div className="product-screen-chrome" aria-hidden="true">
            <span>
              <i />
              <i />
              <i />
            </span>
            <strong>OrgTik / {module.formal}</strong>
            <em>Preview</em>
          </div>
          <div className="product-screen-body">
            <aside aria-label={`${module.formal} preview navigation`}>
              <span className="product-screen-logo">
                <ActiveIcon size={22} weight="light" />
              </span>
              {module.tasks.map((task, index) => (
                <span
                  className={index === activeUseCase ? "active" : ""}
                  key={task}
                >
                  <i /> {task}
                </span>
              ))}
            </aside>
            <div className="product-screen-main">
              <div className="product-screen-heading">
                <span>
                  <small>Example {activeUseCase + 1}</small>
                  <strong>{active.title}</strong>
                </span>
                <span className="product-screen-new" aria-hidden="true">
                  New item <Plus size={14} />
                </span>
              </div>
              <div className="product-screen-metrics" aria-hidden="true">
                <span>
                  <small>Ready</small>
                  <strong>{8 + activeUseCase * 3}</strong>
                </span>
                <span>
                  <small>In progress</small>
                  <strong>{4 + activeUseCase}</strong>
                </span>
                <span>
                  <small>Completed</small>
                  <strong>{18 + activeUseCase * 7}</strong>
                </span>
              </div>
              <div className="product-screen-list" aria-hidden="true">
                {module.highlights.map((highlight, index) => (
                  <span
                    className={index === activeUseCase ? "active" : ""}
                    key={highlight.title}
                  >
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    <strong>{highlight.title}</strong>
                    <em>{index === activeUseCase ? "Active" : "Ready"}</em>
                  </span>
                ))}
              </div>
            </div>
            <aside className="product-screen-detail">
              <small>How to use it</small>
              <strong>{active.title}</strong>
              <p>{active.body}</p>
              <div>
                <span>Feature</span>
                <b>{module.highlights[activeUseCase].title}</b>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

const moduleConnections = {
  hr: ["tasks", "files"],
  crm: ["marketing", "website"],
  files: ["tasks", "hr"],
  tasks: ["files", "hr"],
  marketing: ["crm", "website"],
  website: ["marketing", "crm"],
};

function SaaSNextSteps() {
  return (
    <section className="page-section deep-section saas-next-steps">
      <div className="wrap">
        <SectionIntro
          number="04"
          eyebrow="What happens next"
          title="Choose. Review. Discuss."
          body="The frontend makes the product, duration, and estimate easy to compare before the final commercial conversation."
        />
        <NumberedSteps
          variant="cards"
          items={[
            {
              title: "Choose",
              body: "Confirm the product and the support level that fits the way your team wants to begin.",
            },
            {
              title: "Review",
              body: "Compare the duration, included capabilities, and estimated monthly investment.",
            },
            {
              title: "Discuss",
              body: "Carry the preferred option into a focused commercial conversation with OrgTik.",
            },
          ]}
        />
      </div>
    </section>
  );
}

function ProductPlans({ module, path, search }) {
  const params = new URLSearchParams(search);
  const requestedDuration = params.get("duration") || "annual";
  const [duration, setDuration] = useState(
    durationOptions.some((option) => option.id === requestedDuration)
      ? requestedDuration
      : "annual",
  );
  const productPrice = getWorkspacePrice([module.id], "single", duration);
  const ProductIcon = module.icon;
  const tierNames = {
    launch: "Essential",
    connected: "Connected",
    partnership: "Partnership",
  };

  useEffect(() => {
    const next = new URLSearchParams();
    next.set("mode", "single");
    next.set("duration", duration);
    next.set("modules", module.id);
    window.history.replaceState({}, "", `${path}?${next}#plan-builder`);
  }, [duration, module.id, path]);

  const featuresFor = (plan) => {
    if (plan.id === "launch") {
      return [module.tasks[0], module.tasks[1], "Guided setup and handover"];
    }
    if (plan.id === "connected") {
      return [...module.tasks, "Workflow and role mapping"];
    }
    return [...module.tasks, "Ongoing support", "Improvement roadmap"];
  };

  return (
    <section className="page-section paper-section product-plan-section">
      <div className="wrap" id="plan-builder">
        <SectionIntro
          number="03"
          eyebrow={`${module.formal} plans`}
          title={`Choose the right ${module.formal} plan.`}
          body={`You have already chosen ${module.formal}. Compare only the setup and support levels for this product, then carry the preferred option into the conversation.`}
        />
        <div className="product-plan-choice">
          <span className="product-plan-choice-icon" aria-hidden="true">
            <ProductIcon size={25} weight="fill" />
          </span>
          <span>
            <small>Selected product</small>
            <strong>{module.formal}</strong>
            <em>{module.short}</em>
          </span>
          <span className="product-plan-choice-status">
            Fixed for this comparison
          </span>
        </div>
        <div
          className="duration-selector product-duration-selector"
          aria-label={`${module.formal} subscription duration`}
        >
          <div>
            <small>Subscription duration</small>
            <strong>Choose your billing commitment</strong>
          </div>
          <div className="duration-options">
            {durationOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                className={duration === option.id ? "selected" : ""}
                aria-pressed={duration === option.id}
                onClick={() => setDuration(option.id)}
              >
                <span>{option.label}</span>
                <small>
                  {option.discount
                    ? `${Math.round(option.discount * 100)}% saving`
                    : "Flexible"}
                </small>
              </button>
            ))}
          </div>
        </div>
        <PreviewNote>
          Prototype CHF estimates for {module.formal}. Final limits, taxes,
          availability, and contractual terms require confirmation.
        </PreviewNote>
        <div className="recommendation-grid product-plan-grid">
          {recommendationPlans.map((plan) => {
            const levelMultiplier =
              plan.id === "launch" ? 1 : plan.id === "connected" ? 1.2 : 1.45;
            const monthlyPrice = Math.round(
              productPrice.monthly * levelMultiplier,
            );
            const tierName = tierNames[plan.id];
            return (
              <article
                className={`recommendation-card ${plan.featured ? "featured" : ""}`}
                key={plan.id}
              >
                <div className="recommendation-card-top">
                  <small>{plan.number}</small>
                  {plan.featured && <span>Recommended</span>}
                </div>
                <p className="recommendation-eyebrow">{module.formal}</p>
                <h3>{tierName}</h3>
                <p className="recommendation-body">
                  {plan.id === "launch"
                    ? `Start ${module.formal} with the essential setup and a guided team handover.`
                    : plan.id === "connected"
                      ? `Shape ${module.formal} around the workflows, roles, and adoption support your team needs.`
                      : `Keep ${module.formal} supported, reviewed, and improving after launch.`}
                </p>
                <div className="recommendation-scope">
                  <small>Product scope</small>
                  <strong>
                    {module.formal} · {tierName}
                  </strong>
                </div>
                <FeatureList items={featuresFor(plan)} />
                <div className="recommendation-commercial">
                  <span>
                    <small>Monthly estimate</small>
                    <strong>{formatCHF(monthlyPrice)}</strong>
                  </span>
                  <span>
                    <small>Billing period</small>
                    <strong>{productPrice.duration.label}</strong>
                  </span>
                </div>
                <Action
                  href={`/contact?intent=platform&plan=${plan.id}&mode=single&duration=${duration}&modules=${module.id}`}
                  tone={plan.featured ? "light" : undefined}
                >
                  Choose {tierName}
                </Action>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ModulePage({ module, navigate, path, search }) {
  const related = moduleConnections[module.id].map((id) =>
    modules.find((item) => item.id === id),
  );
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow={`Platform / ${module.formal}`}
        title={module.title}
        body={module.description}
        primary={{
          label: `View ${module.formal} plans`,
          href: "#plan-builder",
        }}
        secondary={{
          label: "Build a product bundle",
          href: `/platform?module=${module.id}&mode=custom#plan-builder`,
        }}
        image={module.image}
      >
        <Breadcrumbs
          items={[
            { label: "Platform", href: "/platform" },
            { label: module.formal },
          ]}
        />
      </PageHero>
      <section className="page-section paper-section" id="page-content">
        <div className="wrap product-outcome">
          <div className="outcome-grid">
            <div>
              <Eyebrow number="01">Built for the everyday work</Eyebrow>
              <h2>{module.short}</h2>
              <Action href="#product-demo" className="product-demo-action">
                View {module.formal} demo
              </Action>
            </div>
            <div>
              <p className="lead-copy">{module.description}</p>
            </div>
          </div>
          <div className="product-highlight-grid" data-reveal="stagger">
            {module.highlights.map((highlight, index) => (
              <article key={highlight.title}>
                <div className="product-highlight-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div className="product-highlight-icon" aria-hidden="true">
                    {index === 0 ? (
                      <Lightning size={23} />
                    ) : index === 1 ? (
                      <CirclesThreePlus size={23} />
                    ) : (
                      <Sparkle size={23} />
                    )}
                  </div>
                </div>
                <div className="product-highlight-copy">
                  <h3>{highlight.title}</h3>
                  <p>{highlight.body}</p>
                  <span className="product-highlight-feature">
                    <CheckCircle size={18} weight="fill" aria-hidden="true" />
                    {module.tasks[index]}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="page-section deep-section product-demo-section"
        id="product-demo"
      >
        <div className="wrap product-demo-layout">
          <div className="product-demo-intro">
            <Eyebrow number="02">Ways to use {module.formal}</Eyebrow>
            <h2>
              See the work move.
              <span>One scenario at a time.</span>
            </h2>
            <div className="product-demo-side">
              <p>
                Choose a common {module.formal} moment to preview how context,
                ownership, and the next action stay connected.
              </p>
              <PreviewNote>
                Interactive frontend demo · Interface and workflow details
                remain prototype content until product captures are approved.
              </PreviewNote>
            </div>
          </div>
          <ProductDemo module={module} />
        </div>
      </section>
      <ProductPlans module={module} path={path} search={search} />
      <SaaSNextSteps />
      <Testimonials
        items={module.testimonials}
        heading={`What ${module.formal} could`}
        accent="change."
        intro={
          <>
            Product-specific testimonial preview.
            <br />
            Approved client stories will appear here.
          </>
        }
        id={`${module.id}-testimonials`}
      />
      <section
        className="page-section paper-section related-section related-product-section"
        id="related-products"
      >
        <div className="wrap">
          <SectionIntro
            number="05"
            eyebrow="Works better together"
            title="Connect the modules around the work."
            body="Choose only the systems the team needs now, then explore the adjacent parts of the workspace."
          />
          <div className="module-card-grid cinematic-card-grid related-product-grid">
            {related.map((item) => {
              const RelatedIcon = item.icon;
              return (
                <CursorTarget
                  as="a"
                  label={`Explore ${item.formal}`}
                  className="module-card"
                  href={`/platform/${item.id}`}
                  key={item.id}
                >
                  <span className="module-card-media" aria-hidden="true">
                    <img src={`/assets/${item.image}`} alt="" loading="lazy" />
                    <span className="module-card-icon">
                      <RelatedIcon size={23} weight="fill" />
                    </span>
                  </span>
                  <span className="module-card-copy">
                    <small>
                      {item.category} · Works with {module.formal}
                    </small>
                    <h3>{item.formal}</h3>
                    <p>{item.description}</p>
                    <span className="module-card-action">
                      Explore product <ArrowRight size={17} />
                    </span>
                  </span>
                </CursorTarget>
              );
            })}
          </div>
        </div>
      </section>
      <PageCTA
        title={`Put ${module.formal} in your workspace.`}
        body={`Compare the three ${module.formal} support levels, then bring the best fit into a focused conversation.`}
        href="#plan-builder"
        label={`Review ${module.formal} plans`}
      />
    </SiteLayout>
  );
}

function SaaSConfigurator({ path, search }) {
  const params = new URLSearchParams(search);
  const initialModule = params.get("module");
  const initialModules = (params.get("modules") || initialModule || "")
    .split(",")
    .filter((id) => modules.some((module) => module.id === id));
  const initialMode =
    params.get("mode") || (initialModule ? "single" : "custom");
  const [mode, setMode] = useState(
    planOptions.some((item) => item.id === initialMode)
      ? initialMode
      : "custom",
  );
  const [selected, setSelected] = useState(() =>
    initialMode === "single" ? initialModules.slice(0, 1) : initialModules,
  );
  const initialDuration = params.get("duration") || "annual";
  const [duration, setDuration] = useState(
    durationOptions.some((option) => option.id === initialDuration)
      ? initialDuration
      : "annual",
  );
  const toggle = (id) => {
    setSelected((current) => {
      if (mode === "single") return [id];
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };
  useEffect(() => {
    const next = new URLSearchParams();
    next.set("mode", mode);
    next.set("duration", duration);
    if (selected.length) next.set("modules", selected.join(","));
    window.history.replaceState({}, "", `${path}?${next}#plan-builder`);
    try {
      sessionStorage.setItem(
        "orgtik-plan-preview",
        JSON.stringify({ mode, selected, duration }),
      );
    } catch {
      /* optional local continuity */
    }
  }, [mode, selected, duration, path]);
  const chosenNames = modules
    .filter((module) => selected.includes(module.id))
    .map((module) => module.formal);
  const price = getWorkspacePrice(selected, mode, duration);
  return (
    <>
      <section className="page-section paper-section plan-configurator-section">
        <div className="wrap plan-builder" id="plan-builder">
          <SectionIntro
            number="03"
            eyebrow="Choose how to start"
            title="Choose the products. See how the bundle changes."
            body="Start with one product, choose a ready-made bundle, take the complete suite, or shape a custom workspace. Duration and savings update in the same view."
          />
          <div className="plan-mode-grid">
            {planOptions.map((option) => (
              <button
                key={option.id}
                className={mode === option.id ? "selected" : ""}
                onClick={() => {
                  setMode(option.id);
                  if (option.id === "operations")
                    setSelected(["hr", "tasks", "files"]);
                  else if (option.id === "growth")
                    setSelected(["crm", "marketing", "website"]);
                  else if (option.id === "complete")
                    setSelected(modules.map((module) => module.id));
                  else if (option.id === "single" && selected.length > 1)
                    setSelected(selected.slice(0, 1));
                }}
                aria-pressed={mode === option.id}
              >
                <small>{option.name}</small>
                <span>{option.note}</span>
                <em>{planModeMeta[option.id]}</em>
              </button>
            ))}
          </div>
          <div className="duration-selector" aria-label="Subscription duration">
            <div>
              <small>02 · Subscription duration</small>
              <strong>Choose your billing commitment</strong>
            </div>
            <div className="duration-options">
              {durationOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={duration === option.id ? "selected" : ""}
                  aria-pressed={duration === option.id}
                  onClick={() => setDuration(option.id)}
                >
                  <span>{option.label}</span>
                  <small>
                    {option.discount
                      ? `${Math.round(option.discount * 100)}% saving`
                      : "Flexible"}
                  </small>
                </button>
              ))}
            </div>
          </div>
          <div className="plan-compose">
            <div className="plan-selection">
              <div className="plan-selection-heading">
                <div>
                  <small>03 · Select products</small>
                  <h3>Build your combination.</h3>
                </div>
                <span aria-live="polite">
                  {selected.length}{" "}
                  {selected.length === 1 ? "product" : "products"}
                </span>
              </div>
              <div className="plan-modules" aria-label="Select modules">
                {modules.map((module) => {
                  const Icon = module.icon;
                  const active = selected.includes(module.id);
                  return (
                    <button
                      key={module.id}
                      onClick={() => toggle(module.id)}
                      className={active ? "selected" : ""}
                      aria-pressed={active}
                    >
                      <Icon size={22} />
                      <span className="plan-module-content">
                        <span className="plan-module-heading">
                          <strong>{module.formal}</strong>
                          <small>{module.short}</small>
                        </span>
                        <span className="plan-module-features">
                          {module.tasks.map((task) => (
                            <span key={task}>
                              <CheckCircle
                                size={14}
                                weight="fill"
                                aria-hidden="true"
                              />
                              {task}
                            </span>
                          ))}
                        </span>
                        <span className="plan-module-meta">
                          <span>{module.category}</span>
                          <span>From {formatCHF(module.monthlyPrice)}/mo</span>
                        </span>
                      </span>
                      {active ? <Minus size={16} /> : <Plus size={16} />}
                    </button>
                  );
                })}
              </div>
            </div>
            <aside className="plan-summary" aria-live="polite">
              <Eyebrow>Your review</Eyebrow>
              <h3>{planOptions.find((option) => option.id === mode)?.name}</h3>
              <p>
                {chosenNames.length
                  ? chosenNames.join(" · ")
                  : "Choose at least one module to shape the conversation."}
              </p>
              <dl>
                <div>
                  <dt>Products</dt>
                  <dd>{selected.length || "—"}</dd>
                </div>
                <div>
                  <dt>Bundle saving</dt>
                  <dd>{Math.round(price.bundleDiscount * 100)}%</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{price.duration.label}</dd>
                </div>
              </dl>
              <div className="plan-price-total">
                <small>Estimated monthly</small>
                <strong>
                  {selected.length ? formatCHF(price.monthly) : "—"}
                </strong>
                <span>
                  {price.duration.months > 1 && selected.length
                    ? `${formatCHF(price.billingTotal)} billed for ${price.duration.label.toLowerCase()}`
                    : "per workspace / month"}
                </span>
              </div>
              <PreviewNote>
                Prototype pricing · No payment or subscription is created.
              </PreviewNote>
              <Action
                href={`/pricing/plans?mode=${mode}&duration=${duration}&modules=${selected.join(",")}`}
                aria-disabled={!selected.length}
                onClick={(event) => {
                  if (!selected.length) event.preventDefault();
                }}
              >
                Review three SaaS plans
              </Action>
            </aside>
          </div>
        </div>
      </section>
      <SaaSNextSteps />
    </>
  );
}

function PricingRedirect({ navigate, search }) {
  useEffect(() => {
    navigate(`/platform${search || ""}#plan-builder`);
  }, [navigate, search]);
  return null;
}

function PlanOptionsPage({ navigate, path, search }) {
  const params = new URLSearchParams(search);
  const selectedIds = (params.get("modules") || "")
    .split(",")
    .filter((id) => modules.some((module) => module.id === id));
  const selectedModules = modules.filter((module) =>
    selectedIds.includes(module.id),
  );
  const requestedMode = params.get("mode") || "custom";
  const mode = planOptions.some((option) => option.id === requestedMode)
    ? requestedMode
    : "custom";
  const modeName = planOptions.find((option) => option.id === mode)?.name;
  const requestedDuration = params.get("duration") || "annual";
  const duration = durationOptions.some(
    (option) => option.id === requestedDuration,
  )
    ? requestedDuration
    : "annual";
  const workspacePrice = getWorkspacePrice(selectedIds, mode, duration);
  const modulesValue = selectedIds.join(",");
  const editHref = `/platform?mode=${mode}&duration=${duration}${modulesValue ? `&modules=${modulesValue}` : ""}#plan-builder`;

  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="SaaS products / Plan comparison"
        title="One workspace."
        accent="Three levels of support."
        body="Your selected products and duration stay fixed while onboarding, workflow guidance, and ongoing care change by plan."
        primary={{ label: "Compare the plans", href: "#plan-options" }}
        secondary={{ label: "Edit your systems", href: editHref }}
        video
        compact
      >
        <Breadcrumbs
          items={[
            { label: "SaaS plans", href: editHref },
            { label: "Recommendations" },
          ]}
        />
      </PageHero>
      <section className="page-section paper-section" id="plan-options">
        <div className="wrap plan-recommendations">
          <div className="plan-review-context">
            <div>
              <Eyebrow number="01">Your selected workspace</Eyebrow>
              <h2>
                {selectedModules.length
                  ? `${selectedModules.length} product${selectedModules.length === 1 ? "" : "s"}, three ways forward.`
                  : "Choose your systems first."}
              </h2>
              <p>
                {selectedModules.length
                  ? `${modeName} · ${workspacePrice.duration.label} · Your products stay consistent while the level of onboarding and support changes.`
                  : "Return to the plan builder and select at least one system before comparing these recommendations."}
              </p>
            </div>
            <a className="text-link" href={editHref}>
              Edit selection <ArrowRight size={17} />
            </a>
          </div>

          {selectedModules.length ? (
            <>
              <div
                className="selected-system-list"
                aria-label="Selected systems"
              >
                {selectedModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <span key={module.id}>
                      <Icon size={17} aria-hidden="true" />
                      {module.formal}
                    </span>
                  );
                })}
              </div>
              <PreviewNote>
                Prototype CHF pricing for product review. Final limits,
                contractual terms, taxes, and availability require approval.
              </PreviewNote>
              <div className="recommendation-grid">
                {recommendationPlans.map((plan) => {
                  const levelMultiplier =
                    plan.id === "launch"
                      ? 1
                      : plan.id === "connected"
                        ? 1.2
                        : 1.45;
                  const monthlyPrice = Math.round(
                    workspacePrice.monthly * levelMultiplier,
                  );
                  const contactHref = `/contact?intent=platform&plan=${plan.id}&mode=${mode}&duration=${duration}&modules=${modulesValue}`;
                  return (
                    <article
                      className={`recommendation-card ${plan.featured ? "featured" : ""}`}
                      key={plan.id}
                    >
                      <div className="recommendation-card-top">
                        <small>{plan.number}</small>
                        {plan.featured && <span>Recommended</span>}
                      </div>
                      <p className="recommendation-eyebrow">{plan.eyebrow}</p>
                      <h3>{plan.title}</h3>
                      <p className="recommendation-body">{plan.body}</p>
                      <div className="recommendation-scope">
                        <small>Workspace scope</small>
                        <strong>{plan.scope}</strong>
                      </div>
                      <FeatureList items={plan.features} />
                      <div className="recommendation-commercial">
                        <span>
                          <small>Monthly estimate</small>
                          <strong>{formatCHF(monthlyPrice)}</strong>
                        </span>
                        <span>
                          <small>Billing period</small>
                          <strong>{workspacePrice.duration.label}</strong>
                        </span>
                      </div>
                      <Action
                        href={contactHref}
                        tone={plan.featured ? "light" : undefined}
                      >
                        Choose {plan.title.replace(" plan", "")}
                      </Action>
                    </article>
                  );
                })}
              </div>
            </>
          ) : (
            <EmptyState
              title="No systems selected"
              body="Build a workspace first, then return here to compare the three launch plans."
              action={
                <Action href="/platform#plan-builder">
                  Build your workspace
                </Action>
              }
            />
          )}
        </div>
      </section>
      <PageCTA
        eyebrow="A plan shaped around the work"
        title="Bring the selected systems into one useful conversation."
        body="We’ll clarify the fit, final limits, and commercial details before anything is agreed."
        href={`/contact?intent=platform&mode=${mode}&duration=${duration}&modules=${modulesValue}`}
        label="Talk through the options"
      />
    </SiteLayout>
  );
}

function WorkPage({ navigate, path, search }) {
  const params = new URLSearchParams(search);
  const initial = params.get("filter") || "All";
  const [filter, setFilter] = useState(initial);
  const filters = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);
  useEffect(() => {
    const next =
      filter === "All" ? path : `${path}?filter=${encodeURIComponent(filter)}`;
    window.history.replaceState({}, "", next);
  }, [filter, path]);
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="Selected work / Evidence and direction"
        title="Work that connects"
        accent="the whole business."
        body="A growing collection of brand, platform, and service stories. Current entries are clearly labelled while approved client evidence is prepared."
        image="brand-cards.webp"
        primary={{ label: "Explore the work", href: "#work-list" }}
        secondary={{
          label: "Start a similar project",
          href: "/contact?intent=services",
        }}
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap" id="work-list">
          <div className="filter-bar">
            <div className="filter-links" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="result-count">{visible.length} stories</span>
          </div>
          <div className="work-editorial-grid">
            {visible.map((project, index) => (
              <a
                className={`work-card ${index === 0 ? "work-card-lead" : ""}`}
                href={`/work/${project.slug}`}
                key={project.slug}
              >
                <span className="work-card-media">
                  <img
                    src={`/assets/${project.image}`}
                    alt=""
                    width="1920"
                    height="1072"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </span>
                <span className="work-card-copy">
                  <small>
                    {project.status} · {project.category}
                  </small>
                  <strong>{project.name}</strong>
                  <span>{project.summary}</span>
                  <em>
                    View project <ArrowRight size={17} />
                  </em>
                </span>
              </a>
            ))}
          </div>
          {!visible.length && (
            <EmptyState
              title="No work in this view"
              body="Clear the filters or start a conversation about the outcome you need."
              action={
                <Action onClick={() => setFilter("All")}>Clear filters</Action>
              }
            />
          )}
        </div>
      </section>
      <PageCTA
        title="Create the next story."
        body="Start with the problem, the result you need, and the part of the business it should connect."
      />
    </SiteLayout>
  );
}

function CaseStudyPage({ project, navigate, path }) {
  const relatedInsights = insights
    .filter((article) => article.category === project.insightCategory)
    .slice(0, 2);
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        compact
        eyebrow={`${project.category} / ${project.status}`}
        title={project.transformation}
        body={project.summary}
        image={project.image}
      >
        <Breadcrumbs
          items={[{ label: "Work", href: "/work" }, { label: project.name }]}
        />
      </PageHero>
      <section className="page-section paper-section" id="page-content">
        <div className="wrap project-facts">
          <div>
            <span>Project</span>
            <strong>{project.name}</strong>
          </div>
          <div>
            <span>Sector</span>
            <strong>{project.sector}</strong>
          </div>
          <div>
            <span>Engagement</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>Evidence</span>
            <strong>{project.status}</strong>
          </div>
        </div>
      </section>
      <section className="page-section paper-section narrative-section">
        <div className="wrap narrative-grid">
          <div>
            <Eyebrow number="01">The challenge</Eyebrow>
            <h2>Make the relationship between the parts visible.</h2>
          </div>
          <div>
            <p>
              The story demonstrates the intended case-study structure while
              approved client media, measurements, and quotations are prepared.
              It focuses on the business problem, the design decisions, and what
              the connected system makes possible.
            </p>
            <PreviewNote>
              No client endorsement or quantitative result is implied.
            </PreviewNote>
          </div>
        </div>
      </section>
      <section className="project-showcase deep-section">
        <BrandMedia
          image={project.image}
          alt={`${project.name} visual`}
          label={`${project.status} · Review before public release`}
        />
      </section>
      <section className="page-section paper-section project-gallery-section">
        <div className="wrap">
          <SectionIntro
            number="02"
            eyebrow="Project gallery"
            title="The direction, seen across touchpoints."
            body="A visual gallery gives each project room to show the system, details, and real-world application instead of relying on a single hero image."
          />
          <div className="project-detail-gallery">
            {(project.gallery || [project.image]).map((image, index) => (
              <figure key={`${image}-${index}`}>
                <img
                  src={`/assets/${image}`}
                  alt={`${project.name} visual ${index + 1}`}
                  loading={index ? "lazy" : "eager"}
                />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {index === 0
                    ? "System view"
                    : index === 1
                      ? "Experience detail"
                      : "Brand in context"}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section paper-section">
        <div className="wrap">
          <SectionIntro
            number="03"
            eyebrow="The work"
            title="One direction, expressed across the system."
            body="Strategy, design, technology, and ongoing care are sequenced around a shared definition of success."
          />
          <NumberedSteps items={processSteps} />
        </div>
      </section>
      <section className="page-section deep-section">
        <div className="wrap result-moment">
          <Eyebrow number="04">The result</Eyebrow>
          <h2>A qualitative outcome, described honestly.</h2>
          <p>
            This preview shows how verified metrics, baselines, periods, and
            sources will appear once approved. Until then, the result remains a
            clear narrative rather than a fabricated percentage.
          </p>
        </div>
      </section>
      {relatedInsights.length > 0 && (
        <section className="page-section paper-section related-insights-section">
          <div className="wrap">
            <SectionIntro
              number="05"
              eyebrow="Related thinking"
              title={`Insights connected to ${project.category.toLowerCase()}.`}
              body="Continue with practical thinking selected by the type of work shown in this project."
            />
            <div className="related-insight-grid">
              {relatedInsights.map((article) => (
                <EditorialLink
                  key={article.slug}
                  href={`/insights/${article.slug}`}
                  eyebrow={`${article.category} · ${article.readingTime}`}
                  title={article.title}
                  body={article.excerpt}
                  image={article.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <PageCTA
        title="Start a similar project."
        body="Bring us the challenge and the evidence you want the work to create."
        href={`/contact?project=${project.slug}`}
        label="Discuss the project"
      />
    </SiteLayout>
  );
}

function RoadmapDialog({ item, onClose }) {
  const ref = useRef(null);
  const previous = useRef(document.activeElement);
  useEffect(() => {
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous.current?.focus?.();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="roadmap-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="roadmap-dialog-title"
    >
      <div className="roadmap-dialog-top">
        <Logo />
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close roadmap item"
        >
          <X size={24} />
        </button>
      </div>
      <Eyebrow>
        {item.status} · {item.theme} · Demo content
      </Eyebrow>
      <h2 id="roadmap-dialog-title">{item.title}</h2>
      <p>{item.body}</p>
      <div className="roadmap-status-line" aria-label="Example roadmap status">
        <span className="done">Open</span>
        <span className={item.status !== "Next" ? "done" : ""}>Planned</span>
        <span
          className={
            item.status === "Now" || item.status === "Shipped" ? "done" : ""
          }
        >
          In progress
        </span>
        <span className={item.status === "Shipped" ? "done" : ""}>Shipped</span>
      </div>
      <PreviewNote>
        This roadmap item is a synthetic frontend demonstration, not a public
        commitment.
      </PreviewNote>
      <div className="dialog-actions">
        <Action onClick={onClose}>Return to roadmap</Action>
        <button
          className="copy-action"
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
        >
          <Copy size={17} /> Copy page link
        </button>
      </div>
    </dialog>
  );
}

function RoadmapPage({ navigate, path }) {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const visible = roadmapItems.filter(
    (item) =>
      (status === "All" || item.status === status) &&
      `${item.title} ${item.theme} ${item.body}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        eyebrow="OrgTik timeline / Frontend demonstration"
        title="From first commit"
        accent="to what’s next."
        body="A living map of what has been shaped, what is being explored, and how useful ideas can move through the system."
        primary={{ label: "Explore the timeline", href: "#timeline" }}
        secondary={{ label: "Submit an idea", href: "#submit-idea" }}
        video
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap" id="timeline">
          <SectionIntro
            number="01"
            eyebrow="Every milestone, mapped"
            title="See the work as a connected journey."
            body="All dates and roadmap statements below are synthetic preview content until historical sources and product ownership are confirmed."
          />
          <div className="filter-bar">
            <div className="filter-links" aria-label="Roadmap status">
              {["All", "Shipped", "Now", "Next"].map((item) => (
                <button
                  key={item}
                  className={status === item ? "active" : ""}
                  onClick={() => setStatus(item)}
                  aria-pressed={status === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="search-field">
              <MagnifyingGlass size={18} />
              <span className="sr-only">Search roadmap</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search roadmap"
              />
            </label>
          </div>
          <div className="timeline-list">
            {visible.map((item) => (
              <button
                className="timeline-item"
                key={`${item.year}-${item.title}`}
                onClick={(event) => {
                  setActive(item);
                  event.currentTarget.dataset.dialogTrigger = "true";
                }}
              >
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-node" aria-hidden="true" />
                <span className="timeline-copy">
                  <small>
                    {item.status} · {item.theme} · Demo
                  </small>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </span>
                <ArrowRight size={20} />
              </button>
            ))}
          </div>
          {!visible.length && (
            <EmptyState
              title="No roadmap items match"
              body="Try another status or search phrase."
              action={
                <Action
                  onClick={() => {
                    setStatus("All");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Action>
              }
            />
          )}
        </div>
      </section>
      <section className="page-section deep-section" id="submit-idea">
        <div className="wrap idea-layout">
          <div>
            <Eyebrow number="02">Shape what comes next</Eyebrow>
            <h2>Submit an idea.</h2>
            <p>
              Tell us what would make digital work simpler, safer, or faster.
              This interaction demonstrates the future participation journey.
            </p>
            <NumberedSteps
              items={[
                {
                  title: "Tell us the idea",
                  body: "One sentence is enough when the problem is clear.",
                },
                {
                  title: "We review it",
                  body: "A future connected service would categorize and evaluate the suggestion.",
                },
                {
                  title: "Useful ideas move forward",
                  body: "Approved items can become visible roadmap entries with clear status.",
                },
              ]}
            />
          </div>
          <form
            className="idea-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <PreviewNote>
              No idea is transmitted in this frontend preview.
            </PreviewNote>
            <label>
              Your name
              <input autoComplete="off" />
            </label>
            <label>
              Email address
              <input
                type="email"
                autoComplete="off"
                placeholder="alex@example.com"
              />
            </label>
            <label>
              Idea category
              <select defaultValue="">
                <option value="" disabled>
                  Choose a category
                </option>
                <option>Platform</option>
                <option>Services</option>
                <option>Hosting</option>
                <option>Accessibility</option>
              </select>
            </label>
            <label>
              Describe the idea
              <textarea rows="5" placeholder="What problem would this solve?" />
            </label>
            <Action
              type="button"
              onClick={() =>
                setActive({
                  year: "Preview",
                  status: "Open",
                  theme: "Submitted idea",
                  title: "Your idea preview is ready",
                  body: "No information was sent. This demonstrates the confirmation state for a future connected roadmap.",
                })
              }
            >
              Preview submission
            </Action>
          </form>
        </div>
      </section>
      <PageCTA
        title="The line keeps drawing."
        body="Every project adds a node. Bring us the next useful milestone."
      />
      {active && (
        <RoadmapDialog item={active} onClose={() => setActive(null)} />
      )}
    </SiteLayout>
  );
}

function LegalPage({ page, navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        compact
        eyebrow="Legal / Owner review required"
        title={page.title}
        body={page.summary}
        image="brand-glass.webp"
      >
        <Breadcrumbs items={[{ label: "Legal" }, { label: page.title }]} />
      </PageHero>
      <section className="legal-layout paper-section" id="page-content">
        <div className="wrap legal-grid">
          <aside>
            <Eyebrow>On this page</Eyebrow>
            {page.sections.map(([title], index) => (
              <a href={`#legal-${index}`} key={title}>
                {title}
              </a>
            ))}
            <a href="/contact">Contact OrgTik</a>
          </aside>
          <article>
            <PreviewNote>
              Template preview · Replace with verbatim, owner-approved legal
              wording before public release.
            </PreviewNote>
            <p className="legal-updated">
              Last interface update: 21 September 2026
            </p>
            {page.sections.map(([title, body], index) => (
              <section id={`legal-${index}`} key={title}>
                <h2>{title}</h2>
                <p>{body}</p>
              </section>
            ))}
          </article>
        </div>
      </section>
    </SiteLayout>
  );
}

function SitemapPage({ navigate, path }) {
  const groups = [
    [
      "Company",
      [
        ["Home", "/"],
        ["About", "/about"],
        ["Contact", "/contact"],
        ["Roadmap", "/roadmap"],
      ],
    ],
    [
      "Platform",
      [
        ["Overview", "/platform"],
        ...modules.map((module) => [module.formal, `/platform/${module.id}`]),
        ["SaaS plan builder", "/platform#plan-builder"],
        ["Sign in", "/sign-in"],
      ],
    ],
    [
      "Services",
      [
        ["Overview", "/services"],
        ...serviceFamilies.flatMap((family) => [
          [family.name, `/services/${family.slug}`],
          ...family.children.map((service) => [
            service.name,
            `/services/${family.slug}/${service.slug}`,
          ]),
        ]),
      ],
    ],
    [
      "Work",
      [
        ["All work", "/work"],
        ...projects.map((project) => [project.name, `/work/${project.slug}`]),
      ],
    ],
    [
      "Insights",
      [
        ["All insights", "/insights"],
        ...insightCategories.map((category) => [
          category,
          `/insights/category/${category.toLowerCase().replaceAll(" ", "-")}`,
        ]),
      ],
    ],
    [
      "Legal",
      [
        ["Imprint", "/legal/imprint"],
        ["Privacy policy", "/legal/privacy"],
        ["Terms and conditions", "/legal/terms"],
      ],
    ],
  ];
  return (
    <SiteLayout navigate={navigate} path={path}>
      <PageHero
        compact
        eyebrow="Website directory"
        title="Find anything"
        accent="on OrgTik."
        body="A human-readable view of the frontend route registry, including the fifth OrgTik hosting service family."
        image="brand-tablet.webp"
      />
      <section className="page-section paper-section" id="page-content">
        <div className="wrap sitemap-grid">
          {groups.map(([title, links], index) => (
            <section key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <div>
                {links.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                    <ArrowRight size={15} />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function SignInPage({ recovery = false, navigate, path }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState("default");
  const submit = (event) => {
    event.preventDefault();
    setState("success");
  };
  return (
    <SiteLayout navigate={navigate} path={path} header={false} footer={false}>
      <section className="account-screen">
        <div className="account-atmosphere" aria-hidden="true">
          <img src="/assets/logo/orgtik-mark-white.svg" alt="" />
        </div>
        <div className="account-brand">
          <a href="/">
            <Logo light />
          </a>
          <p>OrgTik workspace preview</p>
        </div>
        <div className="account-panel">
          {state === "success" ? (
            <div className="account-success" role="status">
              <CheckCircle size={46} weight="light" />
              <Eyebrow>Frontend demonstration</Eyebrow>
              <h1>
                {recovery
                  ? "Recovery preview complete."
                  : "Sign-in preview complete."}
              </h1>
              <p>
                No credentials were checked, sent, or stored. A real account
                service is outside this frontend scope.
              </p>
              <Action onClick={() => setState("default")}>
                Return to the form
              </Action>
              <a href="/">Back to OrgTik</a>
            </div>
          ) : (
            <>
              <Eyebrow>
                {recovery ? "Account recovery" : "Account access"}
              </Eyebrow>
              <h1>{recovery ? "Find your way back." : "Welcome back."}</h1>
              <p>
                {recovery
                  ? "Preview the recovery request using a synthetic email address."
                  : "Sign in to access your OrgTik workspace."}
              </p>
              <PreviewNote>
                Use example details only. This screen does not contact an
                authentication service.
              </PreviewNote>
              <form className="account-form" onSubmit={submit}>
                <label>
                  Email address
                  <input
                    type="email"
                    autoComplete="off"
                    required
                    placeholder="alex@example.com"
                  />
                </label>
                {!recovery && (
                  <div className="password-group">
                    <label htmlFor="preview-password">Password</label>
                    <span className="password-field">
                      <input
                        id="preview-password"
                        type={show ? "text" : "password"}
                        autoComplete="off"
                        required
                        placeholder="Example only"
                      />
                      <button
                        type="button"
                        onClick={() => setShow((current) => !current)}
                        aria-label={
                          show
                            ? "Hide example password"
                            : "Show example password"
                        }
                      >
                        {show ? <EyeSlash size={19} /> : <Eye size={19} />}
                      </button>
                    </span>
                  </div>
                )}
                <Action type="submit">
                  {recovery ? "Preview recovery" : "Preview sign in"}
                </Action>
              </form>
              <div className="account-links">
                {recovery ? (
                  <a href="/sign-in">Return to sign in</a>
                ) : (
                  <a href="/sign-in/recovery">Forgot password?</a>
                )}
                <a href="/platform#plan-builder">
                  Need an account? Choose a plan
                </a>
                <a href="/contact?intent=support">Contact support</a>
              </div>
            </>
          )}
        </div>
        <div className="account-legal">
          <a href="/legal/privacy">Privacy</a>
          <a href="/legal/terms">Terms</a>
        </div>
      </section>
    </SiteLayout>
  );
}

function NotFoundPage({ navigate, path }) {
  return (
    <SiteLayout navigate={navigate} path={path}>
      <section className="not-found">
        <div className="not-found-line" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <div className="wrap">
          <Eyebrow>404 / Connection interrupted</Eyebrow>
          <span className="not-found-code">404</span>
          <h1>This page has moved—or the connection broke.</h1>
          <p>
            Try one of the paths below, or tell us what you were looking for.
          </p>
          <div className="hero-actions">
            <Action href="/">Go to homepage</Action>
            <Action href="/services" secondary>
              Explore services
            </Action>
            <a className="text-link" href="/contact">
              Contact OrgTik <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

export function RoutePage({ path, search, navigate }) {
  let page;
  let title = "OrgTik";
  if (path === "/services") {
    page = <ServicesOverview {...{ navigate, path }} />;
    title = "Services";
  } else if (path.startsWith("/services/")) {
    const [, , familySlug, serviceSlug] = path.split("/");
    const family = matchFamily(familySlug);
    const service = matchService(family, serviceSlug);
    if (family && service) {
      page = <ServiceDetailPage {...{ family, service, navigate, path }} />;
      title = service.name;
    } else if (family && !serviceSlug) {
      page = <ServiceFamilyPage {...{ family, navigate, path }} />;
      title = family.name;
    }
  } else if (path === "/platform") {
    page = <PlatformPage {...{ navigate, path, search }} />;
    title = "Platform";
  } else if (path.startsWith("/platform/")) {
    const module = matchModule(path.split("/")[2]);
    if (module) {
      page = <ModulePage {...{ module, navigate, path, search }} />;
      title = module.formal;
    }
  } else if (path === "/pricing/plans") {
    page = <PlanOptionsPage {...{ navigate, path, search }} />;
    title = "Plan recommendations";
  } else if (path === "/pricing") {
    page = <PricingRedirect {...{ navigate, search }} />;
    title = "Plans";
  } else if (path === "/work") {
    page = <WorkPage {...{ navigate, path, search }} />;
    title = "Work";
  } else if (path.startsWith("/work/")) {
    const project = projects.find((item) => item.slug === path.split("/")[2]);
    if (project) {
      page = <CaseStudyPage {...{ project, navigate, path }} />;
      title = project.name;
    }
  } else if (path === "/insights") {
    page = <InsightsPage {...{ navigate, path }} />;
    title = "Insights";
  } else if (path.startsWith("/insights/category/")) {
    const categorySlug = path.split("/")[3];
    const category = insightCategories.find(
      (item) => item.toLowerCase().replaceAll(" ", "-") === categorySlug,
    );
    if (category) {
      page = <InsightsPage {...{ category, navigate, path }} />;
      title = `${category} insights`;
    }
  } else if (path.startsWith("/insights/")) {
    const article = insights.find((item) => item.slug === path.split("/")[2]);
    if (article) {
      page = <ArticlePage {...{ article, navigate, path }} />;
      title = article.title;
    }
  } else if (path === "/about") {
    page = <AboutPage {...{ navigate, path }} />;
    title = "About";
  } else if (path === "/contact") {
    page = <ContactPage {...{ navigate, path, search }} />;
    title = "Contact";
  } else if (path === "/roadmap") {
    page = <RoadmapPage {...{ navigate, path }} />;
    title = "Roadmap";
  } else if (path.startsWith("/legal/")) {
    const legal = legalPages[path.split("/")[2]];
    if (legal) {
      page = <LegalPage page={legal} {...{ navigate, path }} />;
      title = legal.title;
    }
  } else if (path === "/sitemap") {
    page = <SitemapPage {...{ navigate, path }} />;
    title = "Sitemap";
  } else if (path === "/sign-in") {
    page = <SignInPage {...{ navigate, path }} />;
    title = "Sign in";
  } else if (path === "/sign-in/recovery") {
    page = <SignInPage recovery {...{ navigate, path }} />;
    title = "Account recovery";
  }
  if (!page) title = "Page not found";
  useEffect(() => {
    document.title = `${title} | OrgTik`;
  }, [title]);
  return page || <NotFoundPage {...{ navigate, path }} />;
}

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import {
  Header,
  Footer,
  VideoScene,
  Eyebrow,
  Action,
  ModuleExplorer,
  Process,
  FAQ,
} from "./shared";
import {
  Services,
  Projects,
  Testimonials,
  Closing,
  CursorTarget,
} from "./Experience";

export default function Cinematic({ onContact, onAccount, onPlan }) {
  return (
    <div className="landing cinematic" id="top">
      <Header onContact={onContact} onAccount={onAccount} onPlan={onPlan} />
      <main id="main-content">
        <section className="cinematic-hero" aria-labelledby="hero-title">
          <VideoScene kind="cinematic" label="OrgTik / Brand in motion" />
          <div className="cinematic-scrim" />
          <div className="hero-content wrap">
            <Eyebrow>
              <span className="live-dot" /> Digital services + business software
            </Eyebrow>
            <h1 id="hero-title">
              Build the <br />
              business. <br />
              <span>Run it better.</span>
            </h1>
            <p>
              Ideas, experiences, and systems. <br />
              Connected to move your business forward.
            </p>
            <div className="hero-actions">
              <Action href="#platform">Explore the platform</Action>
              <Action secondary onClick={onContact}>
                Start a project
              </Action>
            </div>
          </div>
          <div className="hero-bottom wrap">
            <a href="#possibilities">
              A more connected way forward <ArrowDown size={16} />
            </a>
            <span>Strategy. Design. Technology.</span>
          </div>
        </section>
        <section
          className="cinematic-gateway light-section section-pad"
          id="possibilities"
        >
          <div className="wrap">
            <div className="section-heading" data-reveal="stagger">
              <Eyebrow number="01">A clearer way forward</Eyebrow>
              <h2>
                One partner. <br />
                <span className="muted-ink">Both sides of your business.</span>
              </h2>
            </div>
            <div className="gateway-pair">
              <CursorTarget
                as="a"
                href="#services"
                label="Let’s build"
                className="gateway-item gateway-build"
                data-reveal="gateway"
              >
                <span className="gateway-media" aria-hidden="true">
                  <img
                    src="/assets/brand-cards.webp"
                    alt=""
                    width="1920"
                    height="1072"
                    loading="lazy"
                  />
                </span>
                <div className="gateway-copy">
                  <small>Expert digital services</small>
                  <h3>Build & grow.</h3>
                  <p>
                    Shape your brand. Create your digital presence. Connect with
                    the people who matter.
                  </p>
                  <span className="gateway-action">
                    Explore services
                    <span className="gateway-action-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </span>
                </div>
              </CursorTarget>
              <CursorTarget
                label="Explore plans"
                className="gateway-item gateway-run"
                data-reveal="gateway"
                onClick={() => onPlan()}
              >
                <span className="gateway-media" aria-hidden="true">
                  <img
                    src="/assets/brand-phone.webp"
                    alt=""
                    width="1920"
                    height="1072"
                    loading="lazy"
                  />
                </span>
                <div className="gateway-copy">
                  <small>Modular business software</small>
                  <h3>Run it better.</h3>
                  <p>
                    Give your team a clearer way to organize people,
                    relationships, and everyday work.
                  </p>
                  <span className="gateway-action">
                    Explore plans
                    <span className="gateway-action-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </span>
                </div>
              </CursorTarget>
            </div>
          </div>
        </section>
        <section className="cinematic-platform section-pad" id="platform">
          <div className="wrap">
            <div
              className="section-heading heading-split"
              data-reveal="stagger"
            >
              <div>
                <Eyebrow number="02">Your business, connected</Eyebrow>
                <h2>
                  Six systems. <br />
                  One bigger picture.
                </h2>
              </div>
              <p>
                The tools behind the work. <br />
                Choose a starting point and explore <br />
                what belongs in your workspace.
              </p>
            </div>
            <div>
              <ModuleExplorer onPlan={onPlan} />
            </div>
          </div>
        </section>
        <section
          className="cinematic-services section-pad light-section"
          id="services"
        >
          <div className="wrap">
            <div className="services-heading" data-reveal="stagger">
              <Eyebrow number="03">Built around your business</Eyebrow>
              <h2>
                Good ideas deserve <span>great execution.</span>
              </h2>
              <p>
                From the first sketch to what comes next. The right expertise,
                connected around one clear ambition.
              </p>
              <Action className="services-heading-action" onClick={onContact}>
                Tell us about your project
              </Action>
            </div>
            <Services onContact={onContact} />
          </div>
        </section>
        <section className="cinematic-brand" id="work">
          <div className="wrap brand-story-heading" data-reveal="stagger">
            <Eyebrow>Our identity, in the world</Eyebrow>
            <h2>
              We don’t chase attention. <br />
              <span>We attract it.</span>
            </h2>
            <p>The OrgTik identity. From a clear idea to every touchpoint.</p>
          </div>
          <Projects />
        </section>
        <section className="cinematic-process section-pad" id="approach">
          <div className="wrap">
            <div className="process-heading" data-reveal="stagger">
              <h2>
                A shared direction.
                <br />
                <span>At every step.</span>
              </h2>
              <p>
                A considered process. A connected team.
                <br />
                Something worth building.
              </p>
            </div>
            <div>
              <Process />
            </div>
          </div>
        </section>
        <Testimonials />
        <section
          className="faq-section section-pad light-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="wrap faq-layout">
            <div className="faq-intro" data-reveal="stagger">
              <h2 id="faq-title">
                Before we <br />
                <span>begin.</span>
              </h2>
              <p>A few answers to help you take the first step.</p>
            </div>
            <div>
              <FAQ />
            </div>
            <div className="faq-contact-band" data-reveal>
              <img
                src="/assets/logo/orgtik-mark-white.svg"
                alt=""
                aria-hidden="true"
                className="faq-contact-mark"
                loading="lazy"
                width="247"
                height="250"
              />
              <div>
                <h3>Still have a question?</h3>
                <p>
                  Bring us the part that is still unclear.
                  <br />
                  We’ll find a way forward.
                </p>
              </div>
              <Action onClick={onContact} tone="light">
                Talk to us
              </Action>
            </div>
          </div>
        </section>
        <Closing onContact={onContact} />
      </main>
      <Footer onContact={onContact} onPlan={onPlan} />
    </div>
  );
}

import React from "react";
import { toSiteHref } from "./navigation";
import "./site-footer.css";

// The full footer used by the original website, including its confirmed routes.
const footExplore = [
  { label: "Software", href: "/software" },
  { label: "Services", href: "/services" },
  { label: "Selected work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About OrgTik", href: "/about" },
];
const footStart = [
  { label: "Build a software plan", href: "/software" },
  { label: "Plans & pricing", href: "/plans" },
  { label: "Tell us about your project", href: "/contact" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Sitemap", href: "/legal#/sitemap" },
];
const socials = [
  ["Facebook", "ph-fill ph-facebook-logo"],
  ["Instagram", "ph-fill ph-instagram-logo"],
  ["LinkedIn", "ph-fill ph-linkedin-logo"],
  ["X", "ph ph-x-logo"],
  ["TikTok", "ph-fill ph-tiktok-logo"],
  ["Pinterest", "ph-fill ph-pinterest-logo"],
  ["Snapchat", "ph-fill ph-snapchat-logo"],
  ["YouTube", "ph-fill ph-youtube-logo"],
].map(([name, cls]) => ({ name, cls }));

export function SiteFooter() {
  const v = {
    footExplore,
    footStart,
    socials,
    footTalk: () => {
      if (window.__orgNav) window.__orgNav("/contact");
      else window.location.assign("/contact");
    },
  };
  return (
    <footer
      className="site-footer"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "clip",
        padding: "64px clamp(20px,4.4vw,64px) 32px",
        background: "#0d0814",
        color: "#f7f1fa",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: "-2",
          inset: "0",
          background:
            "linear-gradient(180deg,#0d0814 0%,#0d0814f0 52%,#150a21cc 100%),radial-gradient(circle at 50% 105%,#54277e,transparent 60%)",
        }}
      ></div>
      <div
        data-aurora={""}
        style={{
          position: "absolute",
          zIndex: "-1",
          left: "7%",
          right: "7%",
          bottom: "-230px",
          height: "430px",
          pointerEvents: "none",
          opacity: ".7",
          filter: "blur(42px)",
          background:
            "radial-gradient(ellipse at 24% 62%,#8d4ce5 0%,#622ba380 27%,transparent 58%),radial-gradient(ellipse at 72% 58%,#bf78e4cc 0%,#7440c375 30%,transparent 60%)",
        }}
      ></div>
      <div
        style={{
          maxWidth: "1312px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          paddingBottom: "32px",
          borderBottom: "1px solid #d8b8ed26",
        }}
      >
        <a href={toSiteHref("#top")}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={"/assets/logo/orgtik-mark-white.svg"}
              alt={""}
              style={{
                width: "38px",
                height: "38px",
                objectFit: "contain",
              }}
            />
            <img
              src={"/assets/logo/orgtik-wordmark-white.svg"}
              alt={"OrgTik"}
              style={{ width: "145px", height: "auto" }}
            />
          </span>
        </a>
        <a
          href={toSiteHref("#top")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            color: "#cab9d5",
            fontSize: "13px",
            lineHeight: "1.5",
          }}
        >
          <span>{"Back to top"}</span>
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: "46px",
              height: "46px",
              border: "1px solid #cba8e05c",
              borderRadius: "50%",
              transition: "background 250ms, color 250ms, transform 350ms",
            }}
            className={"reference-state-21"}
          >
            <i
              aria-hidden={true}
              style={{ fontSize: "20px" }}
              className={"ph ph-arrow-up-right"}
            ></i>
          </span>
        </a>
      </div>
      <div
        data-reveal={"stagger"}
        style={{
          maxWidth: "1312px",
          margin: "48px auto 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "48px clamp(56px,8vw,116px)",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: "1 1 420px", minWidth: "0" }}>
          <h2
            style={{
              maxWidth: "520px",
              fontSize: "var(--section-title-size)",
              lineHeight: "1.12",
              letterSpacing: "-.04em",
              fontWeight: "500",
            }}
            data-hw={""}
          >
            {"Make the next move "}
            <em
              data-acc={""}
              style={{
                color: "#c9a0f3",
                fontStyle: "normal",
                fontWeight: "500",
              }}
            >
              {"matter."}
            </em>
          </h2>
          <p
            style={{
              fontFamily: "Arial,Helvetica,sans-serif",
              maxWidth: "470px",
              marginTop: "22px",
              color: "#baabc5",
              fontSize: "15px",
              lineHeight: "1.75",
            }}
          >
            {
              "Strategy, design, and technology brought together around one clear ambition: moving your business forward."
            }
          </p>
          <button
            onClick={v.footTalk}
            style={{
              marginTop: "30px",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              minHeight: "50px",
              padding: "7px 7px 7px 22px",
              border: "1px solid #d4b7ec66",
              borderRadius: "999px",
              background: "transparent",
              color: "inherit",
              fontSize: "12px",
              fontWeight: "600",
              lineHeight: "1.4",
              transition:
                "background 250ms, border-color 250ms, transform 350ms cubic-bezier(.22,1,.36,1)",
            }}
            className={"reference-state-22"}
          >
            <span>{"Talk to us"}</span>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#eee3f7",
                color: "#28123b",
              }}
            >
              <i
                aria-hidden={true}
                style={{ fontSize: "18px" }}
                className={"ph ph-arrow-up-right"}
              ></i>
            </span>
          </button>
        </div>
        <nav
          style={{
            flex: "1 1 420px",
            display: "grid",
            gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#bba4ca",
                margin: "0 0 18px",
                lineHeight: "1.5",
              }}
            >
              {"Explore"}
            </h3>
            {(v.footExplore || []).map((fl, flIndex) => (
              <React.Fragment key={flIndex}>
                <a
                  href={toSiteHref(fl.href)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "38px",
                    padding: "7px 0",
                    color: "#f2e8f8",
                    fontSize: "16px",
                    fontWeight: "450",
                    lineHeight: "1.5",
                    textUnderlineOffset: "6px",
                    transition: "color 250ms",
                  }}
                  className={"reference-state-23"}
                >
                  {fl.label}
                </a>
              </React.Fragment>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "6px",
            }}
          >
            <h3
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#bba4ca",
                margin: "0 0 18px",
                lineHeight: "1.5",
              }}
            >
              {"Start here"}
            </h3>
            {(v.footStart || []).map((fl, flIndex) => (
              <React.Fragment key={flIndex}>
                <a
                  href={toSiteHref(fl.href)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "38px",
                    padding: "7px 0",
                    color: "#f2e8f8",
                    fontSize: "16px",
                    fontWeight: "450",
                    lineHeight: "1.5",
                    textUnderlineOffset: "6px",
                    transition: "color 250ms",
                  }}
                  className={"reference-state-24"}
                >
                  {fl.label}
                </a>
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
      <div
        style={{
          maxWidth: "1312px",
          margin: "48px auto 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px 32px",
          paddingTop: "28px",
          borderTop: "1px solid #d8b8ed26",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {(v.socials || []).map((so, soIndex) => (
            <React.Fragment key={soIndex}>
              <span
                title={so.name}
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "46px",
                  height: "46px",
                  border: "1px solid #d2afe533",
                  borderRadius: "50%",
                  color: "#f7f1fa",
                  transition: "background 250ms, border-color 250ms",
                }}
                className={"reference-state-25"}
              >
                <i
                  aria-hidden={true}
                  style={{ fontSize: "22px" }}
                  className={so.cls}
                ></i>
              </span>
            </React.Fragment>
          ))}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            color: "#e0cfea",
            fontSize: "13px",
            lineHeight: "1.5",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              flex: "0 0 20px",
              width: "20px",
              height: "20px",
              background: "#da291c",
            }}
            className={"reference-state-26 reference-state-27"}
          ></span>
          {"Made in Switzerland"}
        </span>
      </div>
      <div
        style={{
          maxWidth: "1312px",
          margin: "28px auto 0",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "12px 24px",
          fontSize: "12px",
          lineHeight: "1.6",
          color: "#b9a6c7",
        }}
      >
        <span>{"© 2026 OrgTik."}</span>
        <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <i
            aria-hidden={true}
            style={{
              width: "6px",
              height: "6px",
              background: "#d2a3fa",
              borderRadius: "50%",
            }}
          ></i>
          {" Independent digital partner"}
        </span>
        <span>{"Strategy. Design. Technology."}</span>
      </div>
    </footer>
  );
}

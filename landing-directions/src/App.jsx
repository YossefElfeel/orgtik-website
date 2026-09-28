import React, { lazy, Suspense, useEffect, useState } from "react";
import { toSiteHref, normalizeLocation } from "./reference/navigation";

const pages = {
  "/": lazy(() => import("./reference/Home")),
  "/services": lazy(() => import("./reference/Services")),
  "/software": lazy(() => import("./reference/Software")),
  "/work": lazy(() => import("./reference/Work")),
  "/about": lazy(() => import("./reference/About")),
  "/insights": lazy(() => import("./reference/Insights")),
  "/contact": lazy(() => import("./reference/Contact")),
  "/roadmap": lazy(() => import("./reference/Roadmap")),
  "/legal": lazy(() => import("./reference/Legal")),
  "/sign-in": lazy(() => import("./reference/SignIn")),
};
normalizeLocation();

export function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => {
      normalizeLocation();
      setPath(window.location.pathname);
    };
    const navigate = (destination) => {
      const url = new URL(toSiteHref(destination), window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.assign(url.href);
        return;
      }
      const previous = window.location.href;
      const changedPage = url.pathname !== window.location.pathname;
      window.history.pushState({}, "", url.pathname + url.search + url.hash);
      update();
      if (changedPage) window.scrollTo({ top: 0, behavior: "instant" });
      else
        window.dispatchEvent(
          new HashChangeEvent("hashchange", {
            oldURL: previous,
            newURL: url.href,
          }),
        );
    };
    window.__orgNav = navigate;
    const click = (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target ||
        anchor.hasAttribute("download")
      )
        return;
      const href = toSiteHref(anchor.getAttribute("href"));
      if (href.startsWith("#")) return;
      const url = new URL(href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        !/^https?:$/.test(url.protocol)
      )
        return;
      event.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", click);
    window.addEventListener("popstate", update);
    return () => {
      delete window.__orgNav;
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", update);
    };
  }, []);
  useEffect(() => {
    document.title = `${path === "/" ? "Digital studio + business software" : path.slice(1).replace(/-/g, " ")} | OrgTik`;
  }, [path]);
  const Page = pages[path];
  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <Suspense
        fallback={
          <div className="page-loading" role="status">
            Loading OrgTik…
          </div>
        }
      >
        {Page ? (
          <Page key={path} />
        ) : (
          <main className="not-found">
            <img src="/assets/logo/orgtik-lockup-white.svg" alt="OrgTik" />
            <h1>Page not found.</h1>
            <p>Explore our services, software, and ideas from the homepage.</p>
            <a href="/">Back to home ↗</a>
          </main>
        )}
      </Suspense>
    </>
  );
}

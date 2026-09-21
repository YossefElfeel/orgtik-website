import { useCallback, useEffect, useState } from "react";
import Cinematic from "./Cinematic";
import { RoutePage } from "./Pages";
import { useReveals } from "./shared";
import { useSmoothScroll } from "./useSmoothScroll";

export function App() {
  const [location, setLocation] = useState(() => ({
    path: window.location.pathname.replace(/\/$/, "") || "/",
    search: window.location.search,
    hash: window.location.hash,
  }));
  useReveals();
  useSmoothScroll();

  useEffect(() => {
    const update = () =>
      setLocation({
        path: window.location.pathname.replace(/\/$/, "") || "/",
        search: window.location.search,
        hash: window.location.hash,
      });
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const navigate = useCallback((destination) => {
    const url = new URL(destination, window.location.origin);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setLocation({
      path: url.pathname.replace(/\/$/, "") || "/",
      search: url.search,
      hash: url.hash,
    });
  }, []);

  useEffect(() => {
    const handleInternalLink = (event) => {
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
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      const samePageHash =
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash;
      if (samePageHash) return;
      event.preventDefault();
      navigate(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener("click", handleInternalLink);
    return () => document.removeEventListener("click", handleInternalLink);
  }, [navigate]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash)
        document.querySelector(location.hash)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.path, location.search, location.hash]);

  useEffect(() => {
    if (location.path === "/")
      document.title = "OrgTik | Digital services and business software";
  }, [location.path]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {location.path === "/" ? (
        <Cinematic
          onContact={() => navigate("/contact")}
          onAccount={() => navigate("/sign-in")}
          onPlan={(module) =>
            navigate(
              typeof module === "string"
                ? `/pricing?module=${module}&mode=single`
                : "/pricing",
            )
          }
        />
      ) : (
        <RoutePage
          path={location.path}
          search={location.search}
          navigate={navigate}
        />
      )}
    </>
  );
}

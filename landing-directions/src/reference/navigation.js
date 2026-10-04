const files = {
  "OrgTik Home": "/",
  Home: "/",
  Software: "/software",
  Services: "/services",
  Work: "/work",
  About: "/about",
  Insights: "/insights",
  Contact: "/contact",
  Roadmap: "/roadmap",
  Legal: "/legal",
  SignIn: "/sign-in",
};
export function toSiteHref(href) {
  if (!href || typeof href !== "string") return href;
  const match = href.match(/^(?:\.\/)?([^/#]+)\.dc\.html(.*)$/);
  if (!match) return href;
  return (files[decodeURIComponent(match[1])] || "/") + match[2];
}
export function normalizeLocation() {
  const { pathname, search, hash } = window.location;
  let path = pathname.replace(/\/$/, "") || "/",
    target = toSiteHref(path.slice(1));
  if (target !== path.slice(1)) path = target;
  let fragment = hash;
  const params = new URLSearchParams(search);
  if (path === "/platform" || path === "/pricing") {
    path = "/software";
    fragment ||= "#plan-builder";
  } else if (path.startsWith("/platform/")) {
    fragment = "#/product/" + path.split("/")[2];
    path = "/software";
  } else if (path === "/pricing/plans") {
    path = "/software";
    fragment =
      "#/plans/" +
      (params.get("mode") || "single") +
      "/" +
      (params.get("duration") || "annual") +
      "/" +
      (params.get("modules") || params.get("module") || "hr");
  } else if (/^\/services\/[^/]+/.test(path)) {
    const parts = path.split("/").slice(2);
    fragment =
      "#/" + (parts.length > 1 ? "service/" : "family/") + parts.join("/");
    path = "/services";
  } else if (path === "/projects") path = "/work";
  else if (path.startsWith("/projects/")) {
    fragment = "#/project/" + path.split("/")[2];
    path = "/work";
  } else if (path.startsWith("/insights/")) {
    fragment = "#/article/" + path.split("/")[2];
    path = "/insights";
  } else if (["/privacy", "/terms", "/imprint", "/sitemap"].includes(path)) {
    fragment = "#/" + path.slice(1);
    path = "/legal";
  }
  if (path !== pathname || fragment !== hash)
    window.history.replaceState(
      window.history.state,
      "",
      path + search + fragment,
    );
}

export function cartBackTarget() {
  const internalPage = (href) => {
    if (typeof href !== "string" || !href) return null;
    try {
      const url = new URL(href, window.location.origin);
      if (
        url.origin !== window.location.origin ||
        url.pathname.replace(/\/+$/, "") === "/cart"
      )
        return null;
      return url.pathname + url.search + url.hash;
    } catch {
      return null;
    }
  };
  const previousPage = internalPage(window.history.state?.cartReturnTo);
  return {
    href: previousPage || internalPage(document.referrer) || "/plans",
    useHistory: !!previousPage && window.history.length > 1,
  };
}

export function readWorkspaceQuery(search = window.location.search) {
  const query = new URLSearchParams(search);
  const ids = ["hr", "crm", "files", "tasks", "marketing", "website"];
  // "complete" is the older name for the all-in-one suite.
  const presets = {
    operations: ["hr", "tasks", "files"],
    growth: ["crm", "marketing", "website"],
    suite: ids,
    complete: ids,
  };
  const raw = query.get("modules") || query.get("module");
  const selected = raw
    ? [...new Set(raw.split(",").filter((id) => ids.includes(id)))]
    : presets[query.get("mode")];
  const duration = query.get("duration");
  const plan = query.get("plan");
  return {
    ...(selected?.length ? { selected } : {}),
    ...(["monthly", "annual", "biennial"].includes(duration)
      ? { duration, prodDur: duration }
      : {}),
    ...(["starter", "complete", "ongoing"].includes(plan) ? { plan } : {}),
  };
}

import React from "react";
import { LanguageMenu } from "./LanguageMenu";
import { AccountControl } from "./AccountControl";
import { CartLink } from "./CartControls";
import { ReferencePage } from "./ReferencePage";
import { toSiteHref } from "./navigation";

export default class Roadmap extends ReferencePage {
  RM = [
    {
      year: "2025",
      period: "Past",
      status: "Shipped",
      progress: 100,
      timing: "Completed 2025",
      theme: "Brand",
      title: "OrgTik identity system",
      body: "The renewed identity moved from a clear core idea into a flexible set of digital and physical applications.",
    },
    {
      year: "2025",
      period: "Past",
      status: "Shipped",
      progress: 100,
      timing: "Completed 2025",
      theme: "Website",
      title: "Cinematic website direction",
      body: "A motion-led public experience connected the services and software story inside one visual system.",
    },
    {
      year: "2026",
      period: "Now",
      status: "In progress",
      progress: 62,
      timing: "Active preview",
      theme: "Platform",
      title: "Connected business-suite preview",
      body: "Six modular systems are being expressed as one configurable public product journey.",
    },
    {
      year: "2026",
      period: "Now",
      status: "Open",
      progress: 18,
      timing: "Open for definition",
      theme: "Hosting",
      title: "Managed hosting service experience",
      body: "Hosting, monitoring, backups, performance care, and support are being brought into one service story.",
    },
    {
      year: "2027",
      period: "Next",
      status: "Planned",
      progress: 12,
      timing: "Proposed 2027",
      theme: "Accessibility",
      title: "Accessibility as a standard delivery layer",
      body: "A proposed roadmap direction for making inclusive review part of every relevant digital engagement.",
    },
    {
      year: "2027",
      period: "Next",
      status: "Planned",
      progress: 8,
      timing: "Proposed 2027",
      theme: "Support",
      title: "Clearer self-service support journeys",
      body: "A proposed direction for helping clients understand requests, progress, and next actions in one place.",
    },
  ];
  IDEAS = [
    {
      id: "workspace-guide",
      status: "Open",
      theme: "SaaS products",
      title: "A clearer workspace setup guide",
      body: "Help a new team understand which modules to begin with and how their first workflow connects.",
      votes: 53,
      comments: 4,
    },
    {
      id: "request-view",
      status: "Open",
      theme: "Support",
      title: "A clearer view of every service request",
      body: "Show context, ownership, priority, and the next useful action without asking clients to chase an update.",
      votes: 47,
      comments: 2,
    },
    {
      id: "accessible-review",
      status: "Planned",
      theme: "Accessibility",
      title: "Accessible review built into delivery",
      body: "Make keyboard, contrast, motion, and content checks visible throughout a digital project.",
      votes: 98,
      comments: 6,
    },
    {
      id: "project-summary",
      status: "Planned",
      theme: "Projects",
      title: "One shared project summary",
      body: "Turn milestones, decisions, files, and responsibilities into one view that stays useful after handover.",
      votes: 39,
      comments: 3,
    },
    {
      id: "continuity-view",
      status: "In progress",
      theme: "Hosting",
      title: "Simpler continuity and recovery views",
      body: "Explain monitoring, backups, maintenance, and recovery readiness in language a business can use.",
      votes: 142,
      comments: 8,
    },
    {
      id: "consent-view",
      status: "Shipped",
      theme: "Website",
      title: "Privacy choices people can understand",
      body: "Present consent, analytics, and preference controls as a clear part of the website experience.",
      votes: 118,
      comments: 5,
    },
    {
      id: "delivery-checks",
      status: "Shipped",
      theme: "Accessibility",
      title: "Accessibility checks in every delivery",
      body: "Make the agreed accessibility review visible as part of the delivery record for every relevant project.",
      votes: 64,
      comments: 3,
    },
  ];
  onKey = (e) => {
    if (e.key === "Escape" && this.state.active)
      this.setState({ active: null });
  };
  SOCIALS = [
    ["Facebook", "ph-fill ph-facebook-logo"],
    ["Instagram", "ph-fill ph-instagram-logo"],
    ["LinkedIn", "ph-fill ph-linkedin-logo"],
    ["X", "ph ph-x-logo"],
    ["TikTok", "ph-fill ph-tiktok-logo"],
    ["Pinterest", "ph-fill ph-pinterest-logo"],
    ["Snapchat", "ph-fill ph-snapchat-logo"],
    ["YouTube", "ph-fill ph-youtube-logo"],
  ];
  E = "cubic-bezier(.16,1,.3,1)";
  H = "OrgTik%20Home.dc.html";
  CONTACT = "Contact.dc.html";
  state = {
    route: this.parseRoute(location.hash) || { view: "index" },
    period: "All",
    theme: "All themes",
    q: "",
    year: "2026",
    iq: "",
    votes: {},
    active: null,
    copied: false,
    topic: "",
    ideaSent: false,
    ideaErr: "",
    ideaName: "",
    hoverCard: null,
    narrow: window.innerWidth < 900,
    xwide: window.innerWidth >= 1180,
    menuOpen: false,
  };
  rootRef = React.createRef();
  headerRef = React.createRef();
  videoRef = React.createRef();
  heroMediaRef = React.createRef();
  parallaxRef = React.createRef();
  closingRef = React.createRef();
  glowRef = React.createRef();
  magnetRef = React.createRef();
  cursorRef = React.createRef();
  cursorBubble = React.createRef();
  parseRoute(hash) {
    const h = decodeURIComponent(String(hash || "").replace(/^#/, ""));
    if (h === "" || h === "/") return { view: "index" };
    if (h.charAt(0) !== "/") return null;
    const p = h.slice(1).split("/");
    return { view: "index" };
  }
  routeKey(r) {
    return JSON.stringify(r);
  }
  componentDidMount() {
    super.componentDidMount();
    const root = this.rootRef.current;
    if (!root) return;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    this.setupHeroVideo();
    this.onScroll = () => this.syncScroll();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.syncScroll();
    this.measure = () => {
      const el = this.rootRef.current;
      if (!el) return;
      const w = el.offsetWidth || window.innerWidth,
        n = w < 900,
        x = w >= 1180;
      if (n !== this.state.narrow || x !== this.state.xwide)
        this.setState({
          narrow: n,
          xwide: x,
          menuOpen: x ? false : this.state.menuOpen,
        });
    };
    window.addEventListener("resize", this.measure);
    requestAnimationFrame(this.measure);
    setTimeout(this.measure, 300);
    this.onHash = () => {
      const r = this.parseRoute(location.hash);
      if (r) this.setState({ route: r, menuOpen: false });
    };
    window.addEventListener("hashchange", this.onHash);
    this.srcMO = new MutationObserver(() => this.applyDataSrc());
    this.srcMO.observe(root, { childList: true, subtree: true });
    this.afterView(true);
    window.addEventListener("keydown", this.onKey);
  }
  componentDidUpdate(pp, ps) {
    pp = pp || {};
    ps = ps || this._prev || this.state;
    this._prev = this.state;
    if (this.routeKey(ps.route) !== this.routeKey(this.state.route)) {
      const c = this.cursorRef.current;
      if (c) c.style.opacity = "0";
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        this.afterView(false);
      });
    }
    this.applyDataSrc();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.measure);
    window.removeEventListener("hashchange", this.onHash);
    document.removeEventListener("visibilitychange", this.onVis);
    [this.io, this.heroIO, this.srcMO].forEach((o) => o && o.disconnect());
    (this.loops || []).forEach((a) => a.cancel());
  }
  afterView(first) {
    const rt = this.rootRef.current;
    if (rt && !this.reduced && rt.animate)
      rt.querySelectorAll("[data-marquee]").forEach((el) => {
        if (el.__loop) return;
        el.__loop = true;
        this.loops = this.loops || [];
        this.loops.push(
          el.animate(
            [
              { transform: "translate3d(0,0,0)" },
              { transform: "translate3d(-50%,0,0)" },
            ],
            { duration: 70000, iterations: Infinity },
          ),
        );
      });
    this.applyDataSrc();
    setTimeout(() => this.applyDataSrc(), 60);
    this.observeReveals();
    this.bindCursors();
    this.setupLoops();
    this.heroIntro(first);
  }
  nav(u) {
    if (window.__orgNav) window.__orgNav(u);
    else location.href = u;
  }
  go(id) {
    const root = this.rootRef.current,
      el = root && root.querySelector("#" + id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 90,
      behavior: this.reduced ? "auto" : "smooth",
    });
  }
  goBuilder(mode, sel, dur) {
    const patch = {};
    if (mode) patch.mode = mode;
    if (sel && sel.length) patch.selected = sel;
    if (dur) patch.duration = dur;
    if (this.state.route.view === "overview") {
      this.setState(patch, () => this.go("plan-builder"));
      return;
    }
    this.pendingScroll = "plan-builder";
    this.setState(patch);
    location.hash = "#/";
  }
  setupHeroVideo() {
    const v = this.videoRef.current;
    if (!v) return;
    if (window.innerWidth < 700) {
      v.src = "/assets/cinematic-mobile.mp4";
      v.poster = "/assets/cinematic-mobile.webp";
    }
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const play = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    v.addEventListener("loadeddata", play);
    v.addEventListener("ended", () => {
      v.currentTime = 0;
      play();
    });
    this.heroIO = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) play();
        else v.pause();
      },
      { threshold: 0.05 },
    );
    this.heroIO.observe(v);
    this.onVis = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", this.onVis);
    play();
  }
  syncScroll() {
    const h = this.headerRef.current;
    if (!h) return;
    const y = window.scrollY;
    Object.assign(
      h.style,
      y > 40
        ? {
            left: "20px",
            right: "20px",
            height: "72px",
            padding: "0 12px 0 22px",
            transform: "translateY(14px)",
            background: "#120A1Bd1",
            backdropFilter: "blur(18px) saturate(140%)",
            borderColor: "#ffffff1f",
            borderRadius: "22px",
            boxShadow: "0 20px 50px #0904114d, inset 0 1px 0 #ffffff12",
          }
        : {
            left: "0",
            right: "0",
            height: "96px",
            padding: "0 max(clamp(20px,4.4vw,64px), calc((100% - 1312px) / 2))",
            transform: "none",
            background: "transparent",
            backdropFilter: "none",
            borderColor: "transparent",
            borderRadius: "0",
            boxShadow: "none",
          },
    );
    const p = this.parallaxRef.current;
    if (p && !this.reduced && y < 1400)
      p.style.transform = "translate3d(0," + y * 0.3 + "px,0)";
  }
  heroIntro(first) {
    const root = this.rootRef.current;
    if (!root || this.reduced || !root.animate) return;
    root.querySelectorAll("[data-hero-line]").forEach((l, i) =>
      l.animate([{ transform: "translateY(112%)" }, { transform: "none" }], {
        duration: 1300,
        delay: (first ? 200 : 60) + i * 120,
        easing: this.E,
        fill: "backwards",
      }),
    );
    root.querySelectorAll("[data-hero-fade]").forEach((l, i) =>
      l.animate(
        [
          { opacity: 0, filter: "blur(8px)", transform: "translateY(22px)" },
          { opacity: 1, filter: "blur(0px)", transform: "none" },
        ],
        {
          duration: 1000,
          delay: (first ? 600 : 220) + i * 90,
          easing: this.E,
          fill: "backwards",
        },
      ),
    );
    const hm = this.heroMediaRef.current;
    if (first && hm)
      hm.animate(
        [
          { transform: "scale(1.14)", opacity: 0 },
          { transform: "scale(1)", opacity: 1 },
        ],
        { duration: 2600, easing: this.E, fill: "backwards" },
      );
  }
  observeReveals() {
    const root = this.rootRef.current;
    if (!root || this.reduced || !root.animate) return;
    if (!this.io)
      this.io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              this.runReveal(e.target);
              this.io.unobserve(e.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
      );
    root.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.__rv) return;
      el.__rv = true;
      this.io.observe(el);
    });
  }
  runReveal(el) {
    const E = this.E,
      t = el.getAttribute("data-reveal");
    if (t === "mask")
      el.querySelectorAll("[data-line]").forEach((l, i) =>
        l.animate(
          [
            { opacity: 0, filter: "blur(18px)", transform: "translateY(22px)" },
            { opacity: 1, filter: "blur(0px)", transform: "none" },
          ],
          { duration: 1300, delay: i * 160, easing: E, fill: "backwards" },
        ),
      );
    else if (t === "stagger")
      Array.from(el.children).forEach((c, i) =>
        c.animate(
          [
            { opacity: 0, filter: "blur(12px)", transform: "translateY(28px)" },
            { opacity: 1, filter: "blur(0px)", transform: "none" },
          ],
          {
            duration: 1150,
            delay: Math.min(i * 90, 540),
            easing: E,
            fill: "backwards",
          },
        ),
      );
    else if (t === "clip") {
      el.animate(
        [
          { clipPath: "inset(10% 6% 10% 6% round 24px)", opacity: 0.4 },
          { clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 },
        ],
        { duration: 1400, easing: E, fill: "backwards" },
      );
      const im = el.querySelector("image-slot");
      if (im)
        im.animate([{ transform: "scale(1.25)" }, { transform: "scale(1)" }], {
          duration: 1800,
          easing: E,
          fill: "backwards",
        });
    } else
      el.animate(
        [
          { opacity: 0, filter: "blur(12px)", transform: "translateY(26px)" },
          { opacity: 1, filter: "blur(0px)", transform: "none" },
        ],
        { duration: 1150, easing: E, fill: "backwards" },
      );
  }
  bindCursors() {
    const root = this.rootRef.current,
      c = this.cursorRef.current,
      b = this.cursorBubble.current;
    if (!root || !c || !b || !this.fine || this.reduced) return;
    const label = b.querySelector("[data-cursor-label]");
    root.querySelectorAll("[data-cursor]").forEach((t) => {
      if (t.__cur) return;
      t.__cur = true;
      t.addEventListener("pointerenter", (e) => {
        if (e.pointerType !== "mouse") return;
        t.style.cursor = "none";
        if (label) label.textContent = t.getAttribute("data-cursor");
        c.style.opacity = "1";
        b.style.transform = "translate(-50%,-50%) scale(1)";
      });
      t.addEventListener("pointerleave", () => {
        c.style.opacity = "0";
        b.style.transform = "translate(-50%,-50%) scale(.5)";
      });
      t.addEventListener("pointermove", (e) => {
        const r = root.getBoundingClientRect(),
          k = r.width / root.offsetWidth || 1;
        c.style.transform =
          "translate3d(" +
          (e.clientX - r.left) / k +
          "px," +
          (e.clientY - r.top) / k +
          "px,0)";
      });
    });
  }
  setupLoops() {
    const root = this.rootRef.current;
    if (!root || this.reduced || !root.animate) return;
    this.loops = this.loops || [];
    const add = (sel, fn) =>
      root.querySelectorAll(sel).forEach((el) => {
        if (el.__loop) return;
        el.__loop = true;
        this.loops.push(fn(el));
      });
    add("[data-spin]", (el) =>
      el.animate([{ rotate: "0deg" }, { rotate: "360deg" }], {
        duration: +el.getAttribute("data-spin"),
        iterations: Infinity,
      }),
    );
    add("[data-pulse]", (el) =>
      el.animate(
        [
          { boxShadow: "0 0 60px #9458F455, inset 0 0 0 1px #ffffff2b" },
          { boxShadow: "0 0 130px #9458F48c, inset 0 0 0 1px #ffffff40" },
        ],
        {
          duration: 3200,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        },
      ),
    );
    add("[data-aurora]", (el) =>
      el.animate(
        [
          { opacity: 0.52, transform: "translate3d(-3%,5%,0) scaleX(.95)" },
          {
            opacity: 0.78,
            transform: "translate3d(4%,-3%,0) scaleX(1.06)",
            offset: 0.55,
          },
          { opacity: 0.62, transform: "translate3d(-1%,0,0) scaleX(1.02)" },
        ],
        {
          duration: 12000,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        },
      ),
    );
  }
  swapIn(sel) {
    const root = this.rootRef.current;
    if (!root || this.reduced) return;
    root.querySelectorAll(sel).forEach((el) =>
      el.animate(
        [
          { opacity: 0, filter: "blur(10px)", transform: "translateY(14px)" },
          { opacity: 1, filter: "blur(0px)", transform: "none" },
        ],
        { duration: 800, easing: this.E },
      ),
    );
  }

  applyDataSrc() {
    const root = this.rootRef.current;
    if (!root) return;
    root.querySelectorAll("image-slot[data-src]").forEach((el) => {
      const v = el.getAttribute("data-src");
      if (v && v.indexOf("{{") < 0 && el.getAttribute("src") !== v)
        el.setAttribute("src", v);
    });
  }
  price(sel, mode, durId) {
    const d = this.DURATIONS.find((x) => x.id === durId) || this.DURATIONS[1];
    const sub = this.MODS.filter((m) => sel.indexOf(m.id) >= 0).reduce(
      (a, m) => a + m.monthlyPrice,
      0,
    );
    const bd =
      mode === "complete"
        ? 0.25
        : mode === "operations" || mode === "growth"
          ? 0.15
          : sel.length > 1
            ? 0.1
            : 0;
    const monthly = Math.round(sub * (1 - bd) * (1 - d.discount));
    return { d: d, bd: bd, monthly: monthly, total: monthly * d.months };
  }

  renderVals() {
    const s = this.state,
      r = s.route,
      v = r.view,
      H = this.H;
    const hov = (k) => {
      const on = s.hoverCard === k;
      return {
        imgT: on ? "scale(1.06)" : "scale(1)",
        arrowBg: on ? "#EEE3F7" : "#0D081459",
        arrowC: on ? "#28123B" : "#F6F1FA",
        arrowT: on ? "rotate(45deg)" : "none",
        enter: () => this.setState({ hoverCard: k }),
        leave: () => this.setState({ hoverCard: null }),
      };
    };
    const toContact = () => this.nav(this.CONTACT);
    let hero = {},
      cta = {},
      ticker = [],
      page = {};
    const RM = this.RM,
      ST = ["Open", "Planned", "In progress", "Shipped"],
      q = s.q.trim().toLowerCase();
    const match = RM.filter(
      (x) =>
        (s.period === "All" || x.period === s.period) &&
        (s.theme === "All themes" || x.theme === s.theme) &&
        (x.title + " " + x.theme + " " + x.body).toLowerCase().indexOf(q) >= 0,
    );
    const years = Array.from(new Set(match.map((x) => x.year))).sort(),
      ay =
        years.indexOf(s.year) >= 0
          ? s.year
          : years.indexOf("2026") >= 0
            ? "2026"
            : years[years.length - 1],
      vis = match.filter((x) => x.year === ay),
      N = Math.max(years.length, 1),
      ai = Math.max(years.indexOf(ay), 0);
    const SC = {
      Shipped: ["#EEE3F7", "#28123B", "#EEE3F7"],
      "In progress": ["#9458F4", "#FFFFFF", "#9458F4"],
      Open: ["#ffffff1f", "#F6F1FA", "#F6F1FA"],
      Planned: ["#C9A0F326", "#EEE3F7", "#C9A0F3"],
    };
    const DESC = {
      Open: "Ideas ready for your vote.",
      Planned: "Accepted into the journey.",
      "In progress": "Being shaped right now.",
      Shipped: "Delivered in the preview.",
    };
    const open = (it) => this.setState({ active: it, copied: false }),
      A = s.active,
      iq = s.iq.trim().toLowerCase(),
      ideas = this.IDEAS.filter(
        (x) =>
          (x.title + " " + x.theme + " " + x.body).toLowerCase().indexOf(iq) >=
          0,
      ),
      mv = Object.keys(s.votes).length;
    ticker = RM.map((x) => x.title);
    hero = {
      hasCrumb: false,
      root: "Roadmap",
      crumb: "",
      crumbRootC: "#FFFFFF",
      eyebrow: "OrgTik timeline · Frontend demonstration",
      l1: "From first commit",
      l2: "",
      acc: "to what’s next.",
      body: "A living map of what has been shaped, what is being explored, and how useful ideas can move through the system.",
      primary: "Explore the timeline",
      primaryGo: () => this.go("timeline"),
      secondary: "Submit an idea",
      secondaryGo: () => this.go("submit-idea"),
    };
    page = {
      periods: ["All", "Past", "Now", "Next"].map((p) => {
        const on = s.period === p;
        return {
          label: p,
          n: p === "All" ? RM.length : RM.filter((x) => x.period === p).length,
          bg: on ? "#EEE3F7" : "transparent",
          c: on ? "#28123B" : "#E9E0F0",
          nBg: on ? "#28123B1a" : "#ffffff12",
          pick: () => this.setState({ period: p }),
        };
      }),
      theme: s.theme,
      onTheme: (e) => this.setState({ theme: e.target.value }),
      q: s.q,
      onQ: (e) => this.setState({ q: e.target.value }),
      hasQ: !!s.q,
      clearQ: () => this.setState({ q: "" }),
      countLabel:
        match.length +
        " preview " +
        (match.length === 1 ? "project" : "projects") +
        " across " +
        years.length +
        (years.length === 1 ? " year" : " years"),
      hasVis: vis.length > 0,
      noMatch: match.length === 0,
      resetAll: () =>
        this.setState({ period: "All", theme: "All themes", q: "" }),
      railCols:
        "repeat(" + N + ",minmax(" + (s.narrow ? "110px" : "0") + ",1fr))",
      trackL: 50 / N + "%",
      trackW: ((N - 1) * 100) / N + "%",
      fillW: (ai * 100) / N + "%",
      rail: years.map((y, i) => {
        const on = i === ai,
          past = i < ai,
          n = match.filter((x) => x.year === y).length;
        return {
          y: y,
          n: n + (n === 1 ? " milestone" : " milestones"),
          pressed: on ? "true" : "false",
          dot: on ? "#EEE3F7" : past ? "#D4B7EC" : "#2A1B38",
          ring: on ? "#9458F4" : past ? "#D4B7EC" : "#ffffff33",
          glow: on ? "0 0 0 6px #9458F42e, 0 0 26px #9458F4" : "none",
          yc: on ? "#FFFFFF" : past ? "#CFC2DB" : "#8E7BA0",
          nc: on ? "#D4B7EC" : "#8E7BA0",
          pick: () => this.setState({ year: y }),
        };
      }),
      ay: ay,
      yearCount: vis.length + (vis.length === 1 ? " milestone" : " milestones"),
      summary: ST.map((k) => ({
        k: k,
        n: vis.filter((x) => x.status === k).length,
        dot: SC[k][2],
      })).filter((x) => x.n > 0),
      miles: vis.map((x) => {
        const hv = hov("m" + x.title);
        return {
          status: x.status,
          theme: x.theme,
          timing: x.timing,
          title: x.title,
          body: x.body,
          pLabel: x.status === "Shipped" ? "Complete" : "Preview progress",
          pct: x.progress + "%",
          sBg: SC[x.status][0],
          sC: SC[x.status][1],
          accent:
            x.status === "Shipped"
              ? "#EEE3F7"
              : x.status === "In progress"
                ? "linear-gradient(90deg,#9458F4,#D4B7EC)"
                : x.status === "Planned"
                  ? "#C9A0F366"
                  : "#ffffff26",
          arrowBg: hv.arrowBg,
          arrowC: hv.arrowC,
          arrowT: hv.arrowT,
          enter: hv.enter,
          leave: hv.leave,
          open: () => open(Object.assign({ kind: "m" }, x)),
        };
      }),
      iq: s.iq,
      onIQ: (e) => this.setState({ iq: e.target.value }),
      myVotes: mv
        ? "You’ve voted on " + mv + (mv === 1 ? " idea" : " ideas")
        : "Vote for the ideas that matter to you",
      boardCols: s.xwide
        ? "repeat(4,minmax(0,1fr))"
        : "repeat(4,minmax(280px,1fr))",
      cols: ST.map((k, ci) => {
        const list = ideas.filter((x) => x.status === k);
        return {
          k: k,
          n: list.length,
          idx: "0" + (ci + 1),
          desc: DESC[k],
          accent:
            k === "In progress"
              ? "linear-gradient(90deg,#9458F4,#D4B7EC)"
              : SC[k][2],
          arrow: ci < 3,
          empty: list.length === 0,
          cards: list.map((x) => {
            const vd = !!s.votes[x.id],
              vt = x.votes + (vd ? 1 : 0);
            return {
              theme: x.theme,
              title: x.title,
              body: x.body,
              votes: vt,
              vBg: vd ? "#EEE3F7" : "transparent",
              vC: vd ? "#28123B" : "#F6F1FA",
              vB: vd ? "#EEE3F7" : "#ffffff2e",
              vLabel: (vd ? "Remove vote from " : "Vote for ") + x.title,
              vPressed: vd ? "true" : "false",
              vote: () =>
                this.setState((st) => {
                  const o = Object.assign({}, st.votes);
                  if (o[x.id]) delete o[x.id];
                  else o[x.id] = true;
                  return { votes: o };
                }),
              comments:
                x.comments + (x.comments === 1 ? " comment" : " comments"),
              comment: () =>
                open({
                  kind: "c",
                  status: x.status,
                  theme: x.theme,
                  title: x.title,
                  votes: vt,
                  comments: x.comments,
                  body:
                    x.body +
                    " Commenting remains a local frontend preview; no information is transmitted or stored.",
                }),
            };
          }),
        };
      }),
      topics: [
        "A new project",
        "A product idea",
        "A service improvement",
        "Hosting and support",
      ].map((t) => {
        const on = s.topic === t;
        return {
          label: t,
          pressed: on ? "true" : "false",
          bg: on ? "#190B25" : "#FFFFFF",
          c: on ? "#F6F1FA" : "#190B25",
          border: on ? "#190B25" : "#190B2526",
          pick: () => this.setState({ topic: t, ideaErr: "" }),
        };
      }),
      ideaForm: !s.ideaSent,
      ideaSent: s.ideaSent,
      ideaErr: s.ideaErr,
      hasIdeaErr: !!s.ideaErr,
      ideaName: s.ideaName,
      submitIdea: (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget),
          n = String(f.get("name") || "").trim(),
          em = String(f.get("email") || "").trim(),
          m = String(f.get("message") || "").trim();
        if (!this.state.topic) {
          this.setState({ ideaErr: "Choose what we should discuss." });
          return;
        }
        if (!n || !em || !m) {
          this.setState({
            ideaErr: "Please add your name, email and a short message.",
          });
          return;
        }
        this.setState({
          ideaSent: true,
          ideaErr: "",
          ideaName: n.split(" ")[0],
        });
      },
      goTL: (e) => {
        e.preventDefault();
        this.go("timeline");
      },
      goCM: (e) => {
        e.preventDefault();
        this.go("community");
      },
      ideaReset: () =>
        this.setState({ ideaSent: false, ideaErr: "", topic: "" }),
      hasActive: !!A,
      closeDlg: () => this.setState({ active: null }),
      stop: (e) => e.stopPropagation(),
      dlg: A
        ? {
            eyebrow: A.status + " · " + A.theme + " · Demo content",
            title: A.title,
            body: A.body,
            facts: (A.kind === "m"
              ? [
                  ["Year", A.year],
                  ["Timing", A.timing],
                  ["Theme", A.theme],
                ]
              : [
                  ["Votes", String(A.votes)],
                  ["Comments", String(A.comments)],
                  ["Theme", A.theme],
                ]
            ).map((x) => ({ k: x[0], v: x[1] })),
            hasBar: A.kind === "m",
            pct: (A.kind === "m" ? A.progress : 0) + "%",
            pLabel: A.status === "Shipped" ? "Complete" : "Preview progress",
            steps: ST.map((k) => {
              const d =
                k === "Open" ||
                (k === "Planned" && A.status !== "Open") ||
                (k === "In progress" &&
                  (A.status === "In progress" || A.status === "Shipped")) ||
                (k === "Shipped" && A.status === "Shipped");
              return {
                k: k,
                bg: d ? "#EEE3F7" : "transparent",
                c: d ? "#28123B" : "#9D8BAE",
                b: d ? "#EEE3F7" : "#ffffff26",
                icon: d ? "ph-fill ph-check-circle" : "ph ph-circle",
              };
            }),
          }
        : {
            eyebrow: "",
            title: "",
            body: "",
            facts: [],
            hasBar: false,
            pct: "0%",
            pLabel: "",
            steps: [],
          },
      copyLabel: s.copied ? "Link copied" : "Copy page link",
      copy: () => {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(location.href);
        } catch (err) {}
        this.setState({ copied: true });
      },
    };
    Object.assign(hero, {
      showStrip: false,
      noStrip: true,
      stripLabel: "",
      links: [],
      tags: [],
    });
    return Object.assign(
      {
        xwide: !!s.xwide,
        notXwide: !s.xwide,
        narrow: s.narrow,
        menuOpen: s.menuOpen,
        openMenu: () => this.setState({ menuOpen: true }),
        closeMenu: () => this.setState({ menuOpen: false }),
        menuLinks: [
          ["Home", "OrgTik%20Home.dc.html"],
          ["Services", "Services.dc.html"],
          ["Software", "Software.dc.html"],
          ["Work", "Work.dc.html"],
          ["About", "About.dc.html"],
          ["Insights", "Insights.dc.html"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        hero: hero,
        cta: cta,
        tickerLabel: "Roadmap",
        tickerList: [ticker, ticker],
        closingMove: (e) => {
          const sec = this.closingRef.current,
            g = this.glowRef.current;
          if (!sec || !g || !this.fine) return;
          const rr = sec.getBoundingClientRect(),
            k = rr.width / sec.offsetWidth || 1;
          g.style.left = (e.clientX - rr.left) / k + "px";
          g.style.top = (e.clientY - rr.top) / k + "px";
          const m = this.magnetRef.current;
          if (!m) return;
          const mr = m.getBoundingClientRect(),
            dx = e.clientX - (mr.left + mr.width / 2),
            dy = e.clientY - (mr.top + mr.height / 2);
          m.style.transform =
            Math.hypot(dx, dy) < 170
              ? "translate3d(" +
                (dx * 0.14) / k +
                "px," +
                (dy * 0.18) / k +
                "px,0)"
              : "";
        },
        closingLeave: () => {
          const m = this.magnetRef.current;
          if (m) m.style.transform = "";
        },
        footExplore: [
          ["Software", "Software.dc.html"],
          ["Services", "Services.dc.html"],
          ["Selected work", "Work.dc.html"],
          ["Insights", "Insights.dc.html"],
          ["About OrgTik", "About.dc.html"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        footStart: [
          ["Build a software plan", "Software.dc.html"],
          ["Plans & pricing", "/plans"],
          ["Tell us about your project", "Contact.dc.html"],
          ["Roadmap", "Roadmap.dc.html"],
          ["Sitemap", "Legal.dc.html#/sitemap"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        footTalk: () => {
          if (window.__orgNav) window.__orgNav("Contact.dc.html");
          else location.href = "Contact.dc.html";
        },
        socials: this.SOCIALS.map((x) => ({ name: x[0], cls: x[1] })),
        rootRef: this.rootRef,
        headerRef: this.headerRef,
        videoRef: this.videoRef,
        heroMediaRef: this.heroMediaRef,
        parallaxRef: this.parallaxRef,
        closingRef: this.closingRef,
        glowRef: this.glowRef,
        magnetRef: this.magnetRef,
        cursorRef: this.cursorRef,
        cursorBubble: this.cursorBubble,
      },
      page,
    );
  }

  render() {
    const v = this.renderVals();
    return (
      <>
        <div
          ref={v.rootRef}
          data-screen-label={"Roadmap"}
          style={{
            position: "relative",
            background: "#0D0814",
            color: "#F6F1FA",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            overflowX: "clip",
          }}
        >
          <div
            ref={v.cursorRef}
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              width: "0",
              height: "0",
              zIndex: "60",
              pointerEvents: "none",
              opacity: "0",
              transition: "opacity .25s",
            }}
          >
            <span
              ref={v.cursorBubble}
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "6px",
                width: "104px",
                height: "104px",
                borderRadius: "50%",
                background: "#EEE3F7",
                color: "#28123B",
                fontSize: "12px",
                lineHeight: "1.25",
                fontWeight: "600",
                textAlign: "center",
                boxShadow: "0 18px 40px #09041159",
                transform: "translate(-50%,-50%) scale(.5)",
                transition: "transform .45s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <span data-cursor-label={""}>{"View project"}</span>
              <i
                aria-hidden={true}
                style={{ fontSize: "17px" }}
                className={"ph ph-arrow-up-right"}
              ></i>
            </span>
          </div>
          <div
            style={{ position: "sticky", top: "0", height: "0", zIndex: "50" }}
          >
            <header
              className="site-header"
              ref={v.headerRef}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "96px",
                display: "flex",
                alignItems: "center",
                gap: v.xwide ? "28px" : "10px",
                padding:
                  "0 max(clamp(20px,4.4vw,64px), calc((100% - 1312px) / 2))",
                color: "#F6F1FA",
                border: "1px solid transparent",
                transition: "all .5s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <a
                href={toSiteHref("OrgTik%20Home.dc.html")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: "0",
                  color: "#F6F1FA",
                }}
              >
                <img
                  src={"/assets/logo/orgtik-mark-white.svg"}
                  alt={""}
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                  }}
                />
                <img
                  src={"/assets/logo/orgtik-wordmark-white.svg"}
                  alt={"OrgTik"}
                  style={{ width: "104px", height: "auto" }}
                />
              </a>
              {v.xwide && (
                <>
                  <nav
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      margin: "0 auto",
                      padding: "5px",
                      borderRadius: "999px",
                      background: "#ffffff0b",
                      border: "1px solid #ffffff17",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <a
                      href={toSiteHref("OrgTik%20Home.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-162"}
                    >
                      {"Home"}
                    </a>
                    <a
                      href={toSiteHref("Services.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-163"}
                    >
                      {"Services"}
                    </a>
                    <a
                      href={toSiteHref("Software.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-164"}
                    >
                      {"Software"}
                    </a>
                    <a
                      href={toSiteHref("Work.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-165"}
                    >
                      {"Work"}
                    </a>
                    <a
                      href={toSiteHref("About.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-166"}
                    >
                      {"About"}
                    </a>
                    <a
                      href={toSiteHref("Insights.dc.html")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-167"}
                    >
                      {"Insights"}
                    </a>
                  </nav>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      flexShrink: "0",
                    }}
                  >
                    <CartLink />
                    <LanguageMenu />
                    <AccountControl />
                    <a
                      href={toSiteHref("Contact.dc.html")}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "16px",
                        minHeight: "48px",
                        padding: "6px 6px 6px 20px",
                        borderRadius: "999px",
                        background: "#EEE3F7",
                        color: "#28123B",
                        fontSize: "13px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        transition:
                          "background .3s, transform .45s cubic-bezier(.22,1,.36,1)",
                      }}
                      className={"reference-state-169"}
                    >
                      {"Start a project"}
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#28123B",
                          color: "#EEE3F7",
                        }}
                      >
                        <i
                          aria-hidden={true}
                          style={{ fontSize: "16px" }}
                          className={"ph ph-arrow-up-right"}
                        ></i>
                      </span>
                    </a>
                  </div>
                </>
              )}
              {v.notXwide && (
                <>
                  <CartLink />
                  <LanguageMenu compact />
                  <AccountControl compact />
                  <button
                    onClick={v.openMenu}
                    aria-label="Open menu"
                    aria-expanded={v.menuOpen}
                    className="site-menu-trigger"
                    style={{
                      marginLeft: "0",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      height: "46px",
                      padding: "0 18px",
                      borderRadius: "999px",
                      border: "1px solid #ffffff2b",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    <span className="site-menu-trigger__label">{"Menu"}</span>
                    <i
                      aria-hidden={true}
                      style={{ fontSize: "17px" }}
                      className={"ph ph-list"}
                    ></i>
                  </button>
                </>
              )}
            </header>
          </div>
          {v.menuOpen && (
            <>
              <div
                style={{
                  position: "fixed",
                  inset: "0",
                  zIndex: "80",
                  background: "#0D0814",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"/assets/logo/orgtik-wordmark-white.svg"}
                    alt={"OrgTik"}
                    style={{ width: "104px" }}
                  />
                  <button
                    aria-label="Close menu"
                    onClick={v.closeMenu}
                    style={{
                      width: "46px",
                      height: "46px",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      border: "1px solid #ffffff2b",
                    }}
                  >
                    <i
                      aria-hidden={true}
                      style={{ fontSize: "18px" }}
                      className={"ph ph-x"}
                    ></i>
                  </button>
                </div>
                <AccountControl
                  menu
                  onNavigate={v.closeMenu}
                  onSignOut={v.closeMenu}
                />
                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "48px",
                  }}
                >
                  {(v.menuLinks || []).map((ml, mlIndex) => (
                    <React.Fragment key={mlIndex}>
                      <a
                        href={toSiteHref(ml.href)}
                        onClick={v.closeMenu}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "20px 0",
                          borderBottom: "1px solid #ffffff17",
                          fontSize: "27px",
                          fontWeight: "500",
                          letterSpacing: "-.03em",
                          color: "#F6F1FA",
                        }}
                      >
                        {ml.label}
                        <i
                          aria-hidden={true}
                          style={{ fontSize: "20px", color: "#C9A0F3" }}
                          className={"ph ph-arrow-up-right"}
                        ></i>
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
                <a
                  href={toSiteHref("Contact.dc.html")}
                  onClick={v.closeMenu}
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "52px",
                    padding: "8px 8px 8px 24px",
                    borderRadius: "999px",
                    background: "#EEE3F7",
                    color: "#28123B",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {"Start a project"}
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "#28123B",
                      color: "#EEE3F7",
                    }}
                  >
                    <i
                      aria-hidden={true}
                      className={"ph ph-arrow-up-right"}
                    ></i>
                  </span>
                </a>
              </div>
            </>
          )}
          <main id={"top"}>
            <section
              style={{
                position: "relative",
                minHeight: "100svh",
                display: "flex",
                flexDirection: "column",
                overflow: "clip",
                isolation: "isolate",
              }}
            >
              <div
                ref={v.heroMediaRef}
                style={{
                  position: "absolute",
                  inset: "0",
                  zIndex: "-2",
                  background: "#190B25",
                }}
              >
                <div
                  ref={v.parallaxRef}
                  style={{
                    position: "absolute",
                    inset: "0",
                    willChange: "transform",
                  }}
                >
                  <img
                    src={"/assets/cinematic-desktop.webp"}
                    alt={""}
                    style={{
                      position: "absolute",
                      inset: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "72% 40%",
                    }}
                  />
                  <video
                    ref={v.videoRef}
                    src={"/assets/cinematic-desktop.mp4"}
                    poster={"/assets/cinematic-desktop.webp"}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    autoPlay={true}
                    preload={"auto"}
                    style={{
                      position: "absolute",
                      inset: "0",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "72% 40%",
                    }}
                  ></video>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  zIndex: "-1",
                  pointerEvents: "none",
                  background:
                    "linear-gradient(90deg,#0D0814 0%,#0D0814f0 26%,#0D0814a8 48%,#0D081400 76%),linear-gradient(0deg,#0D0814 0%,#0D081400 45%),linear-gradient(180deg,#0D0814c7 0%,#0D081400 24%)",
                }}
              ></div>
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "1440px",
                  margin: "0 auto",
                  padding: "112px clamp(20px,4.4vw,64px) 44px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "40px 56px",
                  }}
                >
                  <div
                    style={{
                      flex: "1 1 560px",
                      minWidth: "0",
                      maxWidth: "860px",
                    }}
                  >
                    <div
                      data-hero-fade={""}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#B5A6C4",
                      }}
                    >
                      <a
                        href={toSiteHref("OrgTik%20Home.dc.html")}
                        style={{ color: "#B5A6C4" }}
                        className={"reference-state-170"}
                      >
                        {"Home"}
                      </a>
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "12px", opacity: ".7" }}
                        className={"ph ph-caret-right"}
                      ></i>
                      <a
                        href={toSiteHref("#/")}
                        style={{ color: String(v.hero.crumbRootC) }}
                        className={"reference-state-171"}
                      >
                        {v.hero.root}
                      </a>
                      {v.hero.hasCrumb && (
                        <>
                          <i
                            aria-hidden={true}
                            style={{ fontSize: "12px", opacity: ".7" }}
                            className={"ph ph-caret-right"}
                          ></i>
                          <span style={{ color: "#FFFFFF" }}>
                            {v.hero.crumb}
                          </span>
                        </>
                      )}
                    </div>
                    <div
                      data-hero-fade={""}
                      style={{
                        marginTop: "26px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "#DCD0E6",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          flexShrink: 0,
                          height: "7px",
                          borderRadius: "50%",
                          background: "#B98AF7",
                          boxShadow: "0 0 0 5px #9458F42b",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "normal", lineHeight: 1.5 }}>
                        {v.hero.eyebrow}
                      </span>
                    </div>
                    <h1
                      data-hw={""}
                      style={{
                        fontSize: "clamp(33px,min(5.08vw,8.2vh),80px)",
                        lineHeight: ".96",
                        fontWeight: "500",
                        letterSpacing: "-.05em",
                        margin: "28px 0 0",
                        textWrap: "balance",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          paddingBottom: ".1em",
                          marginBottom: "-.1em",
                        }}
                      >
                        <span data-hero-line={""} style={{ display: "block" }}>
                          {v.hero.l1}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          paddingBottom: ".1em",
                          marginBottom: "-.1em",
                        }}
                      >
                        <span data-hero-line={""} style={{ display: "block" }}>
                          {v.hero.l2}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "block",
                          overflow: "hidden",
                          paddingBottom: ".12em",
                          marginBottom: "-.12em",
                        }}
                      >
                        <span
                          data-hero-line={""}
                          data-acc={""}
                          style={{
                            display: "block",
                            color: "#D4B7EC",
                            letterSpacing: "-.045em",
                          }}
                        >
                          {v.hero.acc}
                        </span>
                      </span>
                    </h1>
                    <p
                      data-hero-fade={""}
                      style={{
                        fontFamily: "Arial,Helvetica,sans-serif",
                        marginTop: "32px",
                        maxWidth: "580px",
                        fontSize: "clamp(16px,1.2vw,18px)",
                        lineHeight: "1.6",
                        color: "#DCD0E6",
                        textWrap: "pretty",
                      }}
                    >
                      {v.hero.body}
                    </p>
                    <div
                      data-hero-fade={""}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "14px",
                        marginTop: "34px",
                      }}
                    >
                      <button
                        onClick={v.hero.primaryGo}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "20px",
                          minHeight: "52px",
                          padding: "8px 8px 8px 26px",
                          borderRadius: "999px",
                          background: "#EEE3F7",
                          color: "#28123B",
                          fontSize: "14px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          transition:
                            "background .3s, transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s",
                        }}
                        className={"reference-state-172"}
                      >
                        {v.hero.primary}
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: "#28123B",
                            color: "#EEE3F7",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            style={{ fontSize: "17px" }}
                            className={"ph ph-arrow-down"}
                          ></i>
                        </span>
                      </button>
                      <button
                        onClick={v.hero.secondaryGo}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "20px",
                          minHeight: "52px",
                          padding: "8px 8px 8px 26px",
                          borderRadius: "999px",
                          border: "1px solid #D4B7EC55",
                          background: "#0D081440",
                          backdropFilter: "blur(10px)",
                          color: "#F6F1FA",
                          fontSize: "14px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          transition: "background .3s, border-color .3s",
                        }}
                        className={"reference-state-173"}
                      >
                        {v.hero.secondary}
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: "#ffffff14",
                            color: "#F6F1FA",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            style={{ fontSize: "17px" }}
                            className={"ph ph-arrow-right"}
                          ></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-hero-fade={""}
                style={{
                  borderTop: "1px solid #ffffff1a",
                  background: "linear-gradient(180deg,#0D081400,#0D0814d9)",
                  overflow: "hidden",
                }}
              >
                <div
                  data-marquee={""}
                  style={{ display: "flex", width: "max-content" }}
                >
                  {(v.tickerList || []).map((tk, tkIndex) => (
                    <React.Fragment key={tkIndex}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "34px",
                          padding: "22px 34px 22px 0",
                          flexShrink: "0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: ".24em",
                            textTransform: "uppercase",
                            color: "#C9A0F3",
                          }}
                        >
                          {v.tickerLabel}
                        </span>
                        {(tk || []).map((w, wIndex) => (
                          <React.Fragment key={wIndex}>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "34px",
                              }}
                            >
                              <span
                                style={{ fontSize: "17px", color: "#E9E0F0" }}
                              >
                                {w}
                              </span>
                              <img
                                src={"/assets/logo/orgtik-mark-white.svg"}
                                alt={""}
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  opacity: ".35",
                                }}
                              />
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
            <section
              id={"timeline"}
              style={{ padding: "var(--section-space) 0" }}
            >
              <div
                style={{
                  maxWidth: "1440px",
                  margin: "0 auto",
                  padding: "0 clamp(20px,4.4vw,64px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "32px 64px",
                    marginBottom: "clamp(28px,2.8vw,40px)",
                  }}
                >
                  <div style={{ minWidth: "0" }}>
                    <div
                      data-reveal={"up"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "#B5A6C4",
                      }}
                    >
                      <span style={{ color: "#C9A0F3" }}>{"(01)"}</span>
                      <span
                        style={{
                          width: "36px",
                          height: "1px",
                          background: "#ffffff2e",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {"Every milestone, mapped"}
                      </span>
                    </div>
                    <h2
                      data-reveal={"mask"}
                      data-hw={""}
                      style={{
                        fontSize: "var(--section-title-size)",
                        lineHeight: "1.02",
                        fontWeight: "500",
                        letterSpacing: "-.045em",
                        marginTop: "22px",
                        textWrap: "balance",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        <span data-line={""} style={{ display: "block" }}>
                          {"See what moved —"}
                        </span>
                      </span>
                      <span style={{ display: "block" }}>
                        <span
                          data-line={""}
                          data-acc={""}
                          style={{ display: "block", color: "#D4B7EC" }}
                        >
                          {"and what is moving next."}
                        </span>
                      </span>
                    </h2>
                  </div>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      maxWidth: "440px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#CFC2DB",
                    }}
                  >
                    {
                      "Choose a period, switch the year or narrow by theme. Delivery status stays separate, so Open, Planned, In progress and Shipped are easy to compare."
                    }
                  </p>
                </div>
                <div
                  data-reveal={"up"}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div
                    role={"group"}
                    aria-label={"Roadmap period"}
                    style={{
                      flex: "0 0 auto",
                      maxWidth: "100%",
                      overflowX: "auto",
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "4px",
                      padding: "5px",
                      borderRadius: "999px",
                      background: "#120A1B",
                      border: "1px solid #ffffff17",
                    }}
                  >
                    {(v.periods || []).map((pr, prIndex) => (
                      <React.Fragment key={prIndex}>
                        <button
                          onClick={pr.pick}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "9px 16px",
                            borderRadius: "999px",
                            background: String(pr.bg),
                            color: String(pr.c),
                            fontSize: "13px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            transition: "all .3s",
                          }}
                        >
                          {pr.label}
                          <span
                            style={{
                              minWidth: "22px",
                              padding: "1px 7px",
                              borderRadius: "999px",
                              background: String(pr.nBg),
                              fontSize: "11px",
                              fontWeight: "700",
                              textAlign: "center",
                            }}
                          >
                            {pr.n}
                          </span>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      flex: "1 1 380px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <label
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        flex: "0 1 220px",
                        minWidth: "180px",
                      }}
                    >
                      <select
                        aria-label={"Filter roadmap by theme"}
                        value={v.theme}
                        onChange={v.onTheme}
                        style={{
                          width: "100%",
                          height: "46px",
                          padding: "0 40px 0 18px",
                          borderRadius: "999px",
                          border: "1px solid #ffffff26",
                          background: "#120A1B",
                          color: "#F6F1FA",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          appearance: "none",
                          WebkitAppearance: "none",
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option
                          value={"All themes"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"All themes"}
                        </option>
                        <option
                          value={"Brand"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Brand"}
                        </option>
                        <option
                          value={"Website"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Website"}
                        </option>
                        <option
                          value={"Platform"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Platform"}
                        </option>
                        <option
                          value={"Hosting"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Hosting"}
                        </option>
                        <option
                          value={"Accessibility"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Accessibility"}
                        </option>
                        <option
                          value={"Support"}
                          style={{ background: "#FFFFFF", color: "#190B25" }}
                        >
                          {"Support"}
                        </option>
                      </select>
                      <i
                        aria-hidden={true}
                        style={{
                          position: "absolute",
                          right: "16px",
                          fontSize: "14px",
                          color: "#B5A6C4",
                          pointerEvents: "none",
                        }}
                        className={"ph ph-caret-down"}
                      ></i>
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flex: "1 1 240px",
                        maxWidth: "360px",
                        height: "46px",
                        padding: "0 16px",
                        borderRadius: "999px",
                        border: "1px solid #ffffff26",
                        background: "#0D0814",
                        color: "#B5A6C4",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "16px" }}
                        className={"ph ph-magnifying-glass"}
                      ></i>
                      <input
                        aria-label={"Search milestones"}
                        value={v.q}
                        onChange={v.onQ}
                        placeholder={"Search milestones"}
                        style={{
                          flex: "1",
                          minWidth: "0",
                          background: "transparent",
                          border: "0",
                          outline: "none",
                          color: "#F6F1FA",
                          fontFamily: "Arial,Helvetica,sans-serif",
                          fontSize: "14px",
                        }}
                      />
                      {v.hasQ && (
                        <>
                          <button
                            onClick={v.clearQ}
                            aria-label={"Clear search"}
                            style={{
                              display: "grid",
                              placeItems: "center",
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              color: "#CFC2DB",
                            }}
                            className={"reference-state-174"}
                          >
                            <i
                              aria-hidden={true}
                              style={{ fontSize: "13px" }}
                              className={"ph ph-x"}
                            ></i>
                          </button>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <p
                  aria-live={"polite"}
                  style={{
                    margin: "18px 4px 0",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#B5A6C4",
                  }}
                >
                  {v.countLabel}
                </p>
                {v.hasVis && (
                  <>
                    <div
                      data-reveal={"up"}
                      style={{
                        marginTop: "16px",
                        borderRadius: "30px",
                        border: "1px solid #ffffff17",
                        background:
                          "radial-gradient(60% 90% at 50% 0%,#9458F41f,transparent 70%),#110A19",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          overflowX: "auto",
                          padding:
                            "clamp(26px,2.8vw,38px) clamp(12px,2vw,28px) 24px",
                          borderBottom: "1px solid #ffffff12",
                        }}
                      >
                        <div
                          role={"group"}
                          aria-label={"Roadmap years"}
                          style={{
                            position: "relative",
                            display: "grid",
                            gridTemplateColumns: String(v.railCols),
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: String(v.trackL),
                              width: String(v.trackW),
                              height: "2px",
                              background: "#ffffff1f",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "8px",
                              left: String(v.trackL),
                              width: String(v.fillW),
                              height: "2px",
                              background:
                                "linear-gradient(90deg,#9458F4,#D4B7EC)",
                              transition: "width .8s cubic-bezier(.16,1,.3,1)",
                            }}
                          ></span>
                          {(v.rail || []).map((yr, yrIndex) => (
                            <React.Fragment key={yrIndex}>
                              <button
                                onClick={yr.pick}
                                aria-pressed={yr.pressed}
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: "14px",
                                  padding: "0 6px 4px",
                                  color: "#F6F1FA",
                                }}
                              >
                                <span
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    borderRadius: "50%",
                                    background: String(yr.dot),
                                    border: "2px solid " + yr.ring,
                                    boxShadow: String(yr.glow),
                                    transition: "all .5s",
                                  }}
                                ></span>
                                <span
                                  style={{
                                    fontSize: "clamp(18px,1.66vw,24px)",
                                    fontWeight: "500",
                                    letterSpacing: "-.02em",
                                    fontVariantNumeric: "tabular-nums",
                                    color: String(yr.yc),
                                    transition: "color .4s",
                                  }}
                                >
                                  {yr.y}
                                </span>
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    color: String(yr.nc),
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {yr.n}
                                </span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: "clamp(20px,2.6vw,36px)" }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                            marginBottom: "22px",
                          }}
                        >
                          <h3
                            data-hw={""}
                            style={{
                              fontSize: "clamp(25px,2.3vw,34px)",
                              lineHeight: "1.05",
                              fontWeight: "500",
                              letterSpacing: "-.04em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {v.ay}
                            <span style={{ color: "#D4B7EC" }}>
                              {" · " + v.yearCount}
                            </span>
                          </h3>
                          <div
                            aria-label={"Delivery status summary"}
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {(v.summary || []).map((sm, smIndex) => (
                              <React.Fragment key={smIndex}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 13px",
                                    borderRadius: "999px",
                                    border: "1px solid #ffffff1f",
                                    background: "#ffffff08",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                      background: String(sm.dot),
                                    }}
                                  ></span>
                                  {sm.n + " " + sm.k}
                                </span>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                            gap: "16px",
                          }}
                        >
                          {(v.miles || []).map((m, mIndex) => (
                            <React.Fragment key={mIndex}>
                              <button
                                onClick={m.open}
                                onMouseEnter={m.enter}
                                onMouseLeave={m.leave}
                                style={{
                                  position: "relative",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "stretch",
                                  gap: "16px",
                                  minHeight: "252px",
                                  padding: "26px",
                                  textAlign: "left",
                                  borderRadius: "24px",
                                  border: "1px solid #ffffff17",
                                  background:
                                    "linear-gradient(160deg,#1C0F2B,#140B1F)",
                                  color: "#F6F1FA",
                                  overflow: "hidden",
                                  transition:
                                    "border-color .4s, transform .6s cubic-bezier(.22,1,.36,1)",
                                }}
                                className={"reference-state-175"}
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "0",
                                    right: "0",
                                    top: "0",
                                    height: "3px",
                                    background: String(m.accent),
                                  }}
                                ></span>
                                <span
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <span
                                    style={{
                                      padding: "5px 11px",
                                      borderRadius: "999px",
                                      background: String(m.sBg),
                                      color: String(m.sC),
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {m.status}
                                  </span>
                                  <span
                                    style={{
                                      padding: "5px 11px",
                                      borderRadius: "999px",
                                      border: "1px solid #ffffff26",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      color: "#E9E0F0",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {m.theme}
                                  </span>
                                  <span
                                    style={{
                                      marginLeft: "auto",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      color: "#9D8BAE",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <i
                                      aria-hidden={true}
                                      style={{ fontSize: "14px" }}
                                      className={"ph ph-clock"}
                                    ></i>
                                    {m.timing}
                                  </span>
                                </span>
                                <span
                                  data-hw={""}
                                  style={{
                                    fontSize: "clamp(22px,1.93vw,29px)",
                                    lineHeight: "1.08",
                                    fontWeight: "500",
                                    letterSpacing: "-.035em",
                                    textWrap: "balance",
                                  }}
                                >
                                  {m.title}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Arial,Helvetica,sans-serif",
                                    maxWidth: "52ch",
                                    fontSize: "15px",
                                    lineHeight: "1.6",
                                    color: "#CFC2DB",
                                  }}
                                >
                                  {m.body}
                                </span>
                                <span
                                  style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "20px",
                                  }}
                                >
                                  <span
                                    style={{
                                      flex: "1",
                                      minWidth: "0",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: "12px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "600",
                                          color: "#9D8BAE",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {m.pLabel}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "700",
                                          fontVariantNumeric: "tabular-nums",
                                        }}
                                      >
                                        {m.pct}
                                      </span>
                                    </span>
                                    <span
                                      style={{
                                        display: "block",
                                        height: "6px",
                                        borderRadius: "6px",
                                        background: "#ffffff14",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: "block",
                                          height: "100%",
                                          width: String(m.pct),
                                          borderRadius: "6px",
                                          background:
                                            "linear-gradient(90deg,#9458F4,#D4B7EC)",
                                        }}
                                      ></span>
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      flexShrink: "0",
                                      display: "grid",
                                      placeItems: "center",
                                      width: "46px",
                                      height: "46px",
                                      borderRadius: "50%",
                                      border: "1px solid #ffffff38",
                                      background: String(m.arrowBg),
                                      color: String(m.arrowC),
                                      transform: String(m.arrowT),
                                      transition:
                                        "all .5s cubic-bezier(.22,1,.36,1)",
                                    }}
                                  >
                                    <i
                                      aria-hidden={true}
                                      style={{ fontSize: "17px" }}
                                      className={"ph ph-arrow-up-right"}
                                    ></i>
                                  </span>
                                </span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {v.noMatch && (
                  <>
                    <div
                      style={{
                        marginTop: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                        padding: "64px 24px",
                        borderRadius: "30px",
                        border: "1px dashed #ffffff2e",
                        textAlign: "center",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "25px", color: "#D4B7EC" }}
                        className={"ph ph-magnifying-glass"}
                      ></i>
                      <div
                        data-hw={""}
                        style={{ fontSize: "24px", fontWeight: "500" }}
                      >
                        {"No projects match"}
                      </div>
                      <p
                        style={{
                          fontFamily: "Arial,Helvetica,sans-serif",
                          fontSize: "15px",
                          color: "#CFC2DB",
                        }}
                      >
                        {"Try another period, theme or search phrase."}
                      </p>
                      <button
                        onClick={v.resetAll}
                        style={{
                          padding: "11px 20px",
                          borderRadius: "999px",
                          background: "#EEE3F7",
                          color: "#28123B",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {"Clear filters"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </section>
            <section
              id={"community"}
              style={{
                padding: "var(--section-space) 0",
                background: "#190B25",
                borderTop: "1px solid #ffffff12",
                borderBottom: "1px solid #ffffff12",
              }}
            >
              <div
                style={{
                  maxWidth: "1440px",
                  margin: "0 auto",
                  padding: "0 clamp(20px,4.4vw,64px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    gap: "32px 64px",
                    marginBottom: "clamp(28px,2.8vw,40px)",
                  }}
                >
                  <div style={{ minWidth: "0" }}>
                    <div
                      data-reveal={"up"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        color: "#B5A6C4",
                      }}
                    >
                      <span style={{ color: "#C9A0F3" }}>{"(02)"}</span>
                      <span
                        style={{
                          width: "36px",
                          height: "1px",
                          background: "#ffffff2e",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {"Voted by you"}
                      </span>
                    </div>
                    <h2
                      data-reveal={"mask"}
                      data-hw={""}
                      style={{
                        fontSize: "var(--section-title-size)",
                        lineHeight: "1.02",
                        fontWeight: "500",
                        letterSpacing: "-.045em",
                        marginTop: "22px",
                        textWrap: "balance",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        <span data-line={""} style={{ display: "block" }}>
                          {"The community"}
                        </span>
                      </span>
                      <span style={{ display: "block" }}>
                        <span
                          data-line={""}
                          data-acc={""}
                          style={{ display: "block", color: "#D4B7EC" }}
                        >
                          {"roadmap."}
                        </span>
                      </span>
                    </h2>
                  </div>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      maxWidth: "440px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#CFC2DB",
                    }}
                  >
                    {
                      "Suggestions are grouped by delivery status, so clients and partners can vote, comment and see how useful questions move through the journey."
                    }
                  </p>
                </div>
                <div
                  data-reveal={"up"}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    marginBottom: "20px",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flex: "1 1 240px",
                      maxWidth: "360px",
                      height: "46px",
                      padding: "0 16px",
                      borderRadius: "999px",
                      border: "1px solid #ffffff26",
                      background: "#0D0814",
                      color: "#B5A6C4",
                    }}
                  >
                    <i
                      aria-hidden={true}
                      style={{ fontSize: "16px" }}
                      className={"ph ph-magnifying-glass"}
                    ></i>
                    <input
                      aria-label={"Search suggestions"}
                      value={v.iq}
                      onChange={v.onIQ}
                      placeholder={"Search suggestions"}
                      style={{
                        flex: "1",
                        minWidth: "0",
                        background: "transparent",
                        border: "0",
                        outline: "none",
                        color: "#F6F1FA",
                        fontFamily: "Arial,Helvetica,sans-serif",
                        fontSize: "14px",
                      }}
                    />
                  </label>
                  <span
                    aria-live={"polite"}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "11px 16px",
                      borderRadius: "999px",
                      border: "1px solid #ffffff1f",
                      background: "#ffffff08",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#E9E0F0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <i
                      aria-hidden={true}
                      style={{ fontSize: "15px", color: "#D4B7EC" }}
                      className={"ph-fill ph-arrow-fat-up"}
                    ></i>
                    {v.myVotes}
                  </span>
                </div>
                <div
                  data-reveal={"up"}
                  style={{ overflowX: "auto", paddingBottom: "6px" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: String(v.boardCols),
                      gap: "14px",
                      alignItems: "start",
                    }}
                  >
                    {(v.cols || []).map((cl, clIndex) => (
                      <React.Fragment key={clIndex}>
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            padding: "16px",
                            borderRadius: "22px",
                            border: "1px solid #ffffff17",
                            background: "#0D0814b3",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "0",
                              right: "0",
                              top: "0",
                              height: "3px",
                              background: String(cl.accent),
                            }}
                          ></span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "10px",
                              padding: "6px 4px 0",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  color: "#9D8BAE",
                                  fontVariantNumeric: "tabular-nums",
                                }}
                              >
                                {cl.idx}
                              </span>
                              <span
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                {cl.k}
                              </span>
                              <span
                                style={{
                                  minWidth: "24px",
                                  padding: "2px 8px",
                                  borderRadius: "999px",
                                  background: "#ffffff12",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  textAlign: "center",
                                }}
                              >
                                {cl.n}
                              </span>
                            </span>
                            {cl.arrow && (
                              <>
                                <i
                                  aria-hidden={true}
                                  style={{ fontSize: "15px", color: "#6B5680" }}
                                  className={"ph ph-arrow-right"}
                                ></i>
                              </>
                            )}
                          </div>
                          <p
                            style={{
                              fontFamily: "Arial,Helvetica,sans-serif",
                              padding: "0 4px",
                              fontSize: "14px",
                              lineHeight: "1.5",
                              color: "#B5A6C4",
                            }}
                          >
                            {cl.desc}
                          </p>
                          {(cl.cards || []).map((cd, cdIndex) => (
                            <React.Fragment key={cdIndex}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  padding: "16px",
                                  borderRadius: "16px",
                                  border: "1px solid #ffffff14",
                                  background: "#1A0D27",
                                  transition: "border-color .3s",
                                }}
                                className={"reference-state-176"}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <span
                                    style={{
                                      padding: "4px 10px",
                                      borderRadius: "999px",
                                      border: "1px solid #ffffff26",
                                      fontSize: "11px",
                                      fontWeight: "700",
                                      letterSpacing: ".06em",
                                      textTransform: "uppercase",
                                      color: "#D4B7EC",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {cd.theme}
                                  </span>
                                  <button
                                    onClick={cd.vote}
                                    aria-pressed={cd.vPressed}
                                    aria-label={cd.vLabel}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      padding: "6px 12px",
                                      borderRadius: "999px",
                                      border: "1px solid " + cd.vB,
                                      background: String(cd.vBg),
                                      color: String(cd.vC),
                                      fontSize: "13px",
                                      fontWeight: "700",
                                      fontVariantNumeric: "tabular-nums",
                                      whiteSpace: "nowrap",
                                      transition: "all .3s",
                                    }}
                                  >
                                    <i
                                      aria-hidden={true}
                                      style={{ fontSize: "14px" }}
                                      className={"ph ph-arrow-fat-up"}
                                    ></i>
                                    {cd.votes}
                                  </button>
                                </div>
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    lineHeight: "1.3",
                                    letterSpacing: "-.01em",
                                  }}
                                >
                                  {cd.title}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Arial,Helvetica,sans-serif",
                                    fontSize: "14px",
                                    lineHeight: "1.55",
                                    color: "#CFC2DB",
                                  }}
                                >
                                  {cd.body}
                                </span>
                                <button
                                  onClick={cd.comment}
                                  style={{
                                    alignSelf: "flex-start",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#D4B7EC",
                                    whiteSpace: "nowrap",
                                  }}
                                  className={"reference-state-177"}
                                >
                                  <i
                                    aria-hidden={true}
                                    style={{ fontSize: "15px" }}
                                    className={"ph ph-chat-circle-text"}
                                  ></i>
                                  {cd.comments}
                                </button>
                              </div>
                            </React.Fragment>
                          ))}
                          {cl.empty && (
                            <>
                              <div
                                style={{
                                  padding: "18px",
                                  borderRadius: "14px",
                                  border: "1px dashed #ffffff26",
                                  fontFamily: "Arial,Helvetica,sans-serif",
                                  fontSize: "13px",
                                  color: "#9D8BAE",
                                  textAlign: "center",
                                }}
                              >
                                {"No suggestions match."}
                              </div>
                            </>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    marginTop: "20px",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px dashed #ffffff33",
                    fontFamily: "Arial,Helvetica,sans-serif",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "#CFC2DB",
                  }}
                >
                  <i
                    aria-hidden={true}
                    style={{
                      fontSize: "16px",
                      color: "#D4B7EC",
                      flexShrink: "0",
                      marginTop: "1px",
                    }}
                    className={"ph ph-info"}
                  ></i>
                  <span>
                    {
                      "Votes update only in this browser session. Comments and suggestions are demonstration content; nothing is sent or stored."
                    }
                  </span>
                </div>
              </div>
            </section>
            <section
              id={"submit-idea"}
              style={{
                background:
                  "radial-gradient(70% 60% at 100% 0%,#9458F424,transparent 70%),#EEE8F7",
                color: "#190B25",
                padding: "var(--section-space) 0",
              }}
            >
              <div
                style={{
                  maxWidth: "1440px",
                  margin: "0 auto",
                  padding: "0 clamp(20px,4.4vw,64px)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: "40px clamp(40px,5vw,80px)",
                }}
              >
                <div style={{ flex: "1 1 420px", minWidth: "0" }}>
                  <div
                    data-reveal={"up"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "#6E6178",
                    }}
                  >
                    <span style={{ color: "#6C3CAA" }}>{"(03)"}</span>
                    <span
                      style={{
                        width: "36px",
                        height: "1px",
                        background: "#190B252e",
                      }}
                    ></span>
                    <span style={{ whiteSpace: "nowrap" }}>{"Contact us"}</span>
                  </div>
                  <h2
                    data-reveal={"mask"}
                    data-hw={""}
                    style={{
                      fontSize: "var(--section-title-size)",
                      lineHeight: "1.02",
                      fontWeight: "500",
                      letterSpacing: "-.045em",
                      marginTop: "22px",
                      textWrap: "balance",
                    }}
                  >
                    <span style={{ display: "block" }}>
                      <span data-line={""} style={{ display: "block" }}>
                        {"Put the useful question"}
                      </span>
                    </span>
                    <span style={{ display: "block" }}>
                      <span
                        data-line={""}
                        data-acc={""}
                        style={{ display: "block", color: "#6C3CAA" }}
                      >
                        {"on the map."}
                      </span>
                    </span>
                  </h2>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      marginTop: "22px",
                      maxWidth: "520px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#4A3A57",
                    }}
                  >
                    {
                      "Share the need, the people it affects, and what a better outcome would change. We can connect it to the right service, product or roadmap conversation."
                    }
                  </p>
                  <div
                    data-reveal={"stagger"}
                    style={{
                      marginTop: "32px",
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "1px solid #190B251f",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "18px 0",
                        borderBottom: "1px solid #190B251f",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: "0",
                          display: "grid",
                          placeItems: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#190B25",
                          color: "#EEE3F7",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {"01"}
                      </span>
                      <span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#190B25",
                          }}
                        >
                          {"Tell us the need"}
                        </span>
                        <span
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            display: "block",
                            marginTop: "4px",
                            fontSize: "15px",
                            lineHeight: "1.55",
                            color: "#4A3A57",
                          }}
                        >
                          {"Start with the problem and the people it affects."}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "18px 0",
                        borderBottom: "1px solid #190B251f",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: "0",
                          display: "grid",
                          placeItems: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#190B25",
                          color: "#EEE3F7",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {"02"}
                      </span>
                      <span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#190B25",
                          }}
                        >
                          {"We connect the context"}
                        </span>
                        <span
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            display: "block",
                            marginTop: "4px",
                            fontSize: "15px",
                            lineHeight: "1.55",
                            color: "#4A3A57",
                          }}
                        >
                          {
                            "We relate the question to the right discipline and current direction."
                          }
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "18px 0",
                        borderBottom: "1px solid #190B251f",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: "0",
                          display: "grid",
                          placeItems: "center",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#190B25",
                          color: "#EEE3F7",
                          fontSize: "14px",
                          fontWeight: "700",
                        }}
                      >
                        {"03"}
                      </span>
                      <span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#190B25",
                          }}
                        >
                          {"The next step becomes visible"}
                        </span>
                        <span
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            display: "block",
                            marginTop: "4px",
                            fontSize: "15px",
                            lineHeight: "1.55",
                            color: "#4A3A57",
                          }}
                        >
                          {
                            "A useful idea can become a project, a planned improvement, or a future conversation."
                          }
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  data-reveal={"up"}
                  style={{
                    flex: "1 1 480px",
                    minWidth: "0",
                    padding: "clamp(24px,3vw,40px)",
                    borderRadius: "30px",
                    background: "#FFFFFFd9",
                    border: "1px solid #190B2514",
                    boxShadow: "0 40px 90px #3B1E591f",
                    color: "#190B25",
                  }}
                >
                  {v.ideaForm && (
                    <>
                      <form
                        onSubmit={v.submitIdea}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              letterSpacing: ".16em",
                              textTransform: "uppercase",
                              color: "#6C3CAA",
                            }}
                          >
                            {"Your idea"}
                          </div>
                          <div
                            data-hw={""}
                            style={{
                              marginTop: "8px",
                              fontSize: "clamp(24px,2.21vw,31px)",
                              fontWeight: "500",
                              letterSpacing: "-.035em",
                              lineHeight: "1.08",
                            }}
                          >
                            {"Suggest an idea"}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#3B1E59",
                              marginBottom: "10px",
                            }}
                          >
                            {"What should we discuss?"}
                          </div>
                          <div
                            role={"group"}
                            aria-label={"What should we discuss?"}
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {(v.topics || []).map((tp, tpIndex) => (
                              <React.Fragment key={tpIndex}>
                                <button
                                  type={"button"}
                                  onClick={tp.pick}
                                  aria-pressed={tp.pressed}
                                  style={{
                                    padding: "10px 16px",
                                    borderRadius: "999px",
                                    border: "1px solid " + tp.border,
                                    background: String(tp.bg),
                                    color: String(tp.c),
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    whiteSpace: "nowrap",
                                    transition: "all .3s",
                                  }}
                                >
                                  {tp.label}
                                </button>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                            gap: "16px",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#3B1E59",
                            }}
                          >
                            {"Your name"}
                            <input
                              name={"name"}
                              type={"text"}
                              placeholder={"Alex Taylor"}
                              autoComplete={"off"}
                              style={{
                                height: "52px",
                                padding: "0 16px",
                                borderRadius: "14px",
                                border: "1px solid #190B2526",
                                background: "#FFFFFF",
                                color: "#190B25",
                                fontFamily: "Arial,Helvetica,sans-serif",
                                fontSize: "15px",
                                outline: "none",
                              }}
                              className={"reference-state-178"}
                            />
                          </label>
                          <label
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#3B1E59",
                            }}
                          >
                            {"Email address"}
                            <input
                              name={"email"}
                              type={"email"}
                              placeholder={"alex@example.com"}
                              autoComplete={"off"}
                              style={{
                                height: "52px",
                                padding: "0 16px",
                                borderRadius: "14px",
                                border: "1px solid #190B2526",
                                background: "#FFFFFF",
                                color: "#190B25",
                                fontFamily: "Arial,Helvetica,sans-serif",
                                fontSize: "15px",
                                outline: "none",
                              }}
                              className={"reference-state-179"}
                            />
                          </label>
                        </div>
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#3B1E59",
                          }}
                        >
                          {"Message"}
                          <textarea
                            name={"message"}
                            rows={"5"}
                            placeholder={"What needs to work better?"}
                            style={{
                              padding: "14px 16px",
                              borderRadius: "14px",
                              border: "1px solid #190B2526",
                              background: "#FFFFFF",
                              color: "#190B25",
                              fontFamily: "Arial,Helvetica,sans-serif",
                              fontSize: "15px",
                              lineHeight: "1.6",
                              resize: "vertical",
                              outline: "none",
                            }}
                            className={"reference-state-180"}
                          ></textarea>
                        </label>
                        {v.hasIdeaErr && (
                          <>
                            <div
                              role={"alert"}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px 14px",
                                borderRadius: "12px",
                                background: "#A0254414",
                                color: "#8A1F3A",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "17px" }}
                                className={"ph ph-warning-circle"}
                              ></i>
                              {v.ideaErr}
                            </div>
                          </>
                        )}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Arial,Helvetica,sans-serif",
                              display: "flex",
                              gap: "8px",
                              fontSize: "13px",
                              lineHeight: "1.5",
                              color: "#4A3A57",
                            }}
                          >
                            <i
                              aria-hidden={true}
                              style={{
                                fontSize: "16px",
                                color: "#6C3CAA",
                                flexShrink: "0",
                              }}
                              className={"ph ph-info"}
                            ></i>
                            {"Frontend preview · nothing is sent."}
                          </span>
                          <button
                            type={"submit"}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "16px",
                              minHeight: "52px",
                              padding: "7px 7px 7px 24px",
                              borderRadius: "999px",
                              background: "#190B25",
                              color: "#F6F1FA",
                              fontSize: "15px",
                              fontWeight: "600",
                              whiteSpace: "nowrap",
                              transition:
                                "background .3s, transform .45s cubic-bezier(.22,1,.36,1)",
                            }}
                            className={"reference-state-181"}
                          >
                            {"Submit idea"}
                            <span
                              style={{
                                display: "grid",
                                placeItems: "center",
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                background: "#EEE3F7",
                                color: "#190B25",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "16px" }}
                                className={"ph ph-lightbulb"}
                              ></i>
                            </span>
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                  {v.ideaSent && (
                    <>
                      <div
                        role={"status"}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "16px",
                          padding: "8px 0",
                        }}
                      >
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            background: "#6C3CAA",
                            color: "#FFFFFF",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            style={{ fontSize: "27px" }}
                            className={"ph ph-check"}
                          ></i>
                        </span>
                        <div
                          data-hw={""}
                          style={{
                            fontSize: "clamp(25px,2.3vw,34px)",
                            fontWeight: "500",
                            letterSpacing: "-.04em",
                          }}
                        >
                          {"Thank you, " + v.ideaName + "."}
                        </div>
                        <p
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            maxWidth: "52ch",
                            fontSize: "16px",
                            lineHeight: "1.65",
                            color: "#4A3A57",
                          }}
                        >
                          {
                            "Your idea is on the preview map. Nothing was sent — this form shows how a suggestion reaches the team."
                          }
                        </p>
                        <button
                          onClick={v.ideaReset}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 18px",
                            borderRadius: "999px",
                            border: "1px solid #190B2533",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#190B25",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            className={"ph ph-arrow-counter-clockwise"}
                          ></i>
                          {"Submit another idea"}
                        </button>
                        <div
                          style={{
                            width: "100%",
                            marginTop: "8px",
                            paddingTop: "18px",
                            borderTop: "1px solid #190B251f",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              letterSpacing: ".16em",
                              textTransform: "uppercase",
                              color: "#6C3CAA",
                            }}
                          >
                            {"Where to next"}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                              marginTop: "12px",
                            }}
                          >
                            <a
                              href={toSiteHref("#timeline")}
                              onClick={v.goTL}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "11px 16px",
                                borderRadius: "999px",
                                background: "#190B25",
                                color: "#F6F1FA",
                                fontSize: "14px",
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                transition: "background .3s",
                              }}
                              className={"reference-state-182"}
                            >
                              {"Explore the timeline"}
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "14px" }}
                                className={"ph ph-arrow-up-right"}
                              ></i>
                            </a>
                            <a
                              href={toSiteHref("#community")}
                              onClick={v.goCM}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "11px 16px",
                                borderRadius: "999px",
                                background: "#190B25",
                                color: "#F6F1FA",
                                fontSize: "14px",
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                transition: "background .3s",
                              }}
                              className={"reference-state-183"}
                            >
                              {"Vote on ideas"}
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "14px" }}
                                className={"ph ph-arrow-up-right"}
                              ></i>
                            </a>
                            <a
                              href={toSiteHref("Contact.dc.html")}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "11px 16px",
                                borderRadius: "999px",
                                background: "#190B25",
                                color: "#F6F1FA",
                                fontSize: "14px",
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                transition: "background .3s",
                              }}
                              className={"reference-state-184"}
                            >
                              {"Talk to us"}
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "14px" }}
                                className={"ph ph-arrow-up-right"}
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
            {v.hasActive && (
              <>
                <div
                  onClick={v.closeDlg}
                  style={{
                    position: "fixed",
                    inset: "0",
                    zIndex: "300",
                    display: "grid",
                    placeItems: "center",
                    padding: "20px",
                    background: "#0D0814b8",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    role={"dialog"}
                    aria-modal={"true"}
                    aria-labelledby={"rm-dlg-title"}
                    onClick={v.stop}
                    style={{
                      width: "100%",
                      maxWidth: "660px",
                      maxHeight: "calc(100vh - 40px)",
                      overflow: "auto",
                      padding: "clamp(24px,3vw,38px)",
                      borderRadius: "28px",
                      border: "1px solid #ffffff1f",
                      background: "linear-gradient(160deg,#1E1030,#120A1B)",
                      boxShadow: "0 40px 120px #000000a6",
                      color: "#F6F1FA",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#C9A0F3",
                        }}
                      >
                        {v.dlg.eyebrow}
                      </span>
                      <button
                        onClick={v.closeDlg}
                        aria-label={"Close roadmap item"}
                        style={{
                          flexShrink: "0",
                          display: "grid",
                          placeItems: "center",
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          border: "1px solid #ffffff26",
                          color: "#F6F1FA",
                        }}
                        className={"reference-state-185"}
                      >
                        <i
                          aria-hidden={true}
                          style={{ fontSize: "17px" }}
                          className={"ph ph-x"}
                        ></i>
                      </button>
                    </div>
                    <h2
                      id={"rm-dlg-title"}
                      data-hw={""}
                      style={{
                        marginTop: "18px",
                        fontSize: "var(--section-title-size)",
                        lineHeight: "1.04",
                        fontWeight: "500",
                        letterSpacing: "-.04em",
                        textWrap: "balance",
                      }}
                    >
                      {v.dlg.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "Arial,Helvetica,sans-serif",
                        marginTop: "14px",
                        fontSize: "16px",
                        lineHeight: "1.65",
                        color: "#CFC2DB",
                      }}
                    >
                      {v.dlg.body}
                    </p>
                    <div
                      style={{
                        marginTop: "22px",
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(140px,1fr))",
                        gap: "1px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid #ffffff17",
                        background: "#ffffff17",
                      }}
                    >
                      {(v.dlg.facts || []).map((fc, fcIndex) => (
                        <React.Fragment key={fcIndex}>
                          <div
                            style={{
                              padding: "14px 16px",
                              background: "#150C20",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "11px",
                                fontWeight: "600",
                                letterSpacing: ".14em",
                                textTransform: "uppercase",
                                color: "#9D8BAE",
                              }}
                            >
                              {fc.k}
                            </div>
                            <div
                              style={{
                                marginTop: "6px",
                                fontSize: "15px",
                                fontWeight: "600",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {fc.v}
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {v.dlg.hasBar && (
                      <>
                        <div style={{ marginTop: "18px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#9D8BAE",
                            }}
                          >
                            <span>{v.dlg.pLabel}</span>
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#F6F1FA",
                              }}
                            >
                              {v.dlg.pct}
                            </span>
                          </div>
                          <div
                            style={{
                              marginTop: "8px",
                              height: "6px",
                              borderRadius: "6px",
                              background: "#ffffff14",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: String(v.dlg.pct),
                                borderRadius: "6px",
                                background:
                                  "linear-gradient(90deg,#9458F4,#D4B7EC)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )}
                    <div
                      aria-label={"Example roadmap status"}
                      style={{
                        marginTop: "22px",
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(120px,1fr))",
                        gap: "8px",
                      }}
                    >
                      {(v.dlg.steps || []).map((st, stIndex) => (
                        <React.Fragment key={stIndex}>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 12px",
                              borderRadius: "12px",
                              border: "1px solid " + st.b,
                              background: String(st.bg),
                              color: String(st.c),
                              fontSize: "13px",
                              fontWeight: "600",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <i
                              aria-hidden={true}
                              style={{ fontSize: "15px" }}
                              className={st.icon}
                            ></i>
                            {st.k}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        marginTop: "20px",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px dashed #ffffff33",
                        fontFamily: "Arial,Helvetica,sans-serif",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "#CFC2DB",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{
                          fontSize: "16px",
                          color: "#D4B7EC",
                          flexShrink: "0",
                          marginTop: "1px",
                        }}
                        className={"ph ph-info"}
                      ></i>
                      <span>
                        {
                          "This roadmap item is a synthetic frontend demonstration, not a public commitment."
                        }
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "22px",
                      }}
                    >
                      <button
                        onClick={v.closeDlg}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "13px 20px",
                          borderRadius: "999px",
                          background: "#EEE3F7",
                          color: "#28123B",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <i
                          aria-hidden={true}
                          className={"ph ph-arrow-left"}
                        ></i>
                        {"Return to roadmap"}
                      </button>
                      <button
                        onClick={v.copy}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "13px 20px",
                          borderRadius: "999px",
                          border: "1px solid #ffffff2e",
                          color: "#F6F1FA",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        className={"reference-state-186"}
                      >
                        <i aria-hidden={true} className={"ph ph-copy"}></i>
                        {v.copyLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
          <footer
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
              <a
                href={toSiteHref("OrgTik%20Home.dc.html")}
                aria-label={"OrgTik home"}
              >
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
                    transition:
                      "background 250ms, color 250ms, transform 350ms",
                  }}
                  className={"reference-state-187"}
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
                  className={"reference-state-188"}
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
                        className={"reference-state-189"}
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
                        className={"reference-state-190"}
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
                      className={"reference-state-191"}
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
                  className={"reference-state-192 reference-state-193"}
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
              <span
                style={{ display: "flex", alignItems: "center", gap: "9px" }}
              >
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
        </div>
      </>
    );
  }
}

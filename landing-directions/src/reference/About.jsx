import React from "react";
import { ReferencePage } from "./ReferencePage";
import { toSiteHref } from "./navigation";

export default class About extends ReferencePage {
  JR = [
    [
      "01",
      "Start with the real need",
      "Listen before defining the work. The first step is understanding what the business, its people and its customers need to do better.",
      "Shared context",
    ],
    [
      "02",
      "Connect the disciplines",
      "Bring strategy, brand, technology and operations into one conversation so decisions reinforce each other.",
      "One direction",
    ],
    [
      "03",
      "Build the useful system",
      "Turn the direction into experiences, software and services that people can understand, use and maintain.",
      "Working value",
    ],
    [
      "04",
      "Stay for what follows",
      "Support the work after launch, learn from it, and keep the next improvement connected to the bigger picture.",
      "Lasting progress",
    ],
  ];
  CAPS = [
    [
      "Brand & demand",
      "Shape how the business is understood.",
      "Positioning, identity, campaigns and content systems that give every touchpoint a clearer role.",
      ["Strategy", "Design", "Marketing"],
      "Services.dc.html#/family/marketing",
      "brand-cards.webp",
      "ph-megaphone",
      "Explore brand & marketing",
    ],
    [
      "Digital experiences",
      "Make the next interaction useful.",
      "Websites and digital products designed around the decisions people need to make.",
      ["UX & UI", "Web development", "Content"],
      "Services.dc.html#/family/development",
      "brand-tablet.webp",
      "ph-code",
      "Explore development",
    ],
    [
      "Business systems",
      "Connect the work behind the experience.",
      "Focused software for people, relationships, files, tasks, marketing and website operations.",
      ["Software", "Workflows", "Operations"],
      "Software.dc.html",
      "brand-phone.webp",
      "ph-circles-three-plus",
      "Explore the software",
    ],
    [
      "Continuity & care",
      "Keep the system dependable.",
      "Hosting, IT support, monitoring and ongoing improvement around the technology you depend on.",
      ["Hosting", "IT support", "Ongoing care"],
      "Services.dc.html#/family/hosting",
      "brand-glass.webp",
      "ph-lifebuoy",
      "Explore hosting & support",
    ],
  ];
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
    jr: 0,
    capA: 0,
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
    this.jT = setInterval(() => {
      if (!this.jHover && !this.reduced && !document.hidden)
        this.setState((st) => ({ jr: (st.jr + 1) % 4 }));
    }, 3600);
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
    clearInterval(this.jT);
    clearTimeout(this.capT);
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.measure);
    window.removeEventListener("hashchange", this.onHash);
    document.removeEventListener("visibilitychange", this.onVis);
    [this.io, this.heroIO, this.srcMO].forEach((o) => o && o.disconnect());
    (this.loops || []).forEach((a) => a.cancel());
  }
  afterView(first) {
    const hv = this.videoRef.current;
    if (hv && !hv.__ok) {
      hv.__ok = true;
      this.setupHeroVideo();
    }
    this.syncScroll();
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
      y > 40 || !this.videoRef.current
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

  SVC_FAM = [
    {
      slug: "design",
      name: "Web design services",
      short: "Design",
      kicker: "Make it unmistakably yours",
      title: "Identity and experiences with one clear direction.",
      intro:
        "Brand thinking, visual communication, and responsive interfaces connected across every useful touchpoint.",
      image: "brand-cards.webp",
      icon: "ph-palette",
      children: [
        {
          slug: "graphic-design",
          name: "Graphic design",
          outcome: "Give every communication a stronger visual point of view.",
          summary:
            "Brand-consistent digital and print communication, from campaign assets to the everyday materials people see and use.",
          capabilities: [
            "Campaign design",
            "Business materials",
            "Digital asset systems",
          ],
        },
        {
          slug: "brand-development",
          name: "Brand development and corporate branding",
          outcome:
            "Build an identity that stays coherent as the business grows.",
          summary:
            "Brand strategy, identity direction, visual systems, guidance, and a practical rollout across touchpoints.",
          capabilities: [
            "Brand strategy",
            "Visual identity",
            "Guidelines and rollout",
          ],
        },
        {
          slug: "web-and-app-design",
          name: "Web design and application development",
          outcome: "Make complex digital journeys feel clear and considered.",
          summary:
            "UX and UI, responsive design, implementation, usability testing, and ongoing experience improvement.",
          capabilities: [
            "UX direction",
            "Interface systems",
            "Responsive implementation",
          ],
        },
      ],
    },
    {
      slug: "development",
      name: "Development services",
      short: "Development",
      kicker: "Make the idea work",
      title: "Digital products built around the result.",
      intro:
        "From requirements and architecture to tested implementation, launch, and considered iteration.",
      image: "brand-tablet.webp",
      icon: "ph-code",
      children: [
        {
          slug: "web-development",
          name: "Web development and programming",
          outcome:
            "Turn a clear idea into a fast, dependable digital experience.",
          summary:
            "Requirements, architecture, frontend implementation, integrations, testing, deployment planning, and support.",
          capabilities: [
            "Technical architecture",
            "Frontend implementation",
            "Testing and launch",
          ],
        },
        {
          slug: "custom-app-development",
          name: "Custom app development",
          outcome:
            "Shape a focused application around the way your business works.",
          summary:
            "Product discovery, UX and UI, tailored application development, integrations, testing, launch, and iteration.",
          capabilities: [
            "Product discovery",
            "Application UX",
            "Iterative delivery",
          ],
        },
      ],
    },
    {
      slug: "marketing",
      name: "Marketing services",
      short: "Marketing",
      kicker: "Make the story travel",
      title: "Turn attention into meaningful momentum.",
      intro:
        "Strategy, campaigns, search, and content shaped around the people your business needs to reach.",
      image: "brand-glass.webp",
      icon: "ph-megaphone",
      children: [
        {
          slug: "social-media-marketing",
          name: "Social media marketing",
          outcome:
            "Build a social presence people recognize and want to follow.",
          summary:
            "Channel strategy, content planning, publishing, community care, campaign management, and useful performance reporting.",
          capabilities: [
            "Channel strategy",
            "Content systems",
            "Community and campaign care",
          ],
        },
        {
          slug: "digital-advertising-switzerland",
          name: "Digital advertising Switzerland",
          outcome:
            "Make every campaign clearer, more focused, and easier to improve.",
          summary:
            "Paid campaign planning for Swiss audiences, from targeting and creative through budget control and measured optimization.",
          capabilities: [
            "Audience planning",
            "Campaign creative",
            "Performance optimization",
          ],
        },
        {
          slug: "seo-services",
          name: "SEO services",
          outcome: "Help the right people find you when the need is real.",
          summary:
            "Technical and on-page improvements, search-led content, local relevance, and a sustainable measurement rhythm.",
          capabilities: [
            "Technical foundations",
            "Content and keywords",
            "Local search visibility",
          ],
        },
      ],
    },
    {
      slug: "it-support",
      name: "IT support",
      short: "IT support",
      kicker: "Keep the work moving",
      title: "Reliable support for the systems behind the day.",
      intro:
        "Ongoing care, troubleshooting, and thoughtful improvements for the digital tools your team depends on.",
      image: "brand-phone.webp",
      icon: "ph-lifebuoy",
      children: [
        {
          slug: "website-management",
          name: "Website management",
          outcome:
            "Keep your website current, secure, and ready for what comes next.",
          summary:
            "Content changes, maintenance, backups, monitoring, performance care, and practical day-to-day support.",
          capabilities: [
            "Content updates",
            "Performance care",
            "Maintenance and monitoring",
          ],
        },
        {
          slug: "software-support",
          name: "Software support and error fixing",
          outcome:
            "Find the cause, restore stability, and reduce repeat problems.",
          summary:
            "Diagnosis, bug fixing, compatibility work, maintenance, and responsive technical support for existing software.",
          capabilities: [
            "Issue diagnosis",
            "Stability fixes",
            "Ongoing maintenance",
          ],
        },
      ],
    },
    {
      slug: "hosting",
      name: "OrgTik hosting",
      short: "Hosting",
      kicker: "Keep it online",
      title: "A dependable home for your digital presence.",
      intro:
        "Managed hosting, monitoring, backups, and performance care connected to the people who already understand your website.",
      image: "brand-glass.webp",
      icon: "ph-hard-drives",
      children: [
        {
          slug: "managed-hosting",
          name: "Managed website hosting",
          outcome:
            "Keep the website available, maintained, and ready to perform.",
          summary:
            "A managed hosting relationship with monitoring, backup routines, performance care, and direct support—without unsupported uptime promises.",
          capabilities: [
            "Managed hosting",
            "Monitoring and backups",
            "Performance care",
          ],
        },
      ],
    },
  ];
  BX = { limit: 99, tail: 2, noun: ["capability", "capabilities"] };
  bxCats() {
    return [
      { label: "All", icon: "ph-squares-four" },
      { label: "Studio services", icon: "ph-sparkle" },
      { label: "Business software", icon: "ph-circles-three-plus" },
    ];
  }
  bxItems() {
    const fam = this.SVC_FAM.map((f) => ({
      slug: "svc-" + f.slug,
      cat: "Studio services",
      chip: f.short,
      meta:
        f.children.length +
        (f.children.length === 1 ? " service" : " services"),
      title: f.name,
      excerpt: f.intro,
      tags: f.children.map((c) => c.name),
      image: f.image,
      ph: f.short + " image",
      href: "Services.dc.html#/family/" + f.slug,
      foot: "Explore " + f.short,
      search: [f.name, f.short, f.intro, f.kicker]
        .concat(
          f.children.map(
            (c) =>
              c.name + " " + c.outcome + " " + (c.capabilities || []).join(" "),
          ),
        )
        .join(" "),
    }));
    const sw = [
      [
        "operations",
        "Operations",
        "People, files and tasks in one calm workspace.",
        ["HR", "Files", "Tasks"],
        "brand-tablet.webp",
      ],
      [
        "growth",
        "Growth",
        "Customers, campaigns and your website, connected.",
        ["CRM", "Marketing", "Website Manager"],
        "brand-phone.webp",
      ],
    ].map((x) => ({
      slug: "sw-" + x[0],
      cat: "Business software",
      chip: "Software",
      meta: x[3].length + " systems",
      title: x[1] + " systems",
      excerpt: x[2],
      tags: x[3],
      image: x[4],
      ph: x[1] + " systems image",
      href: "Software.dc.html",
      foot: "Explore software",
      search: ["software system", x[1], x[2]].concat(x[3]).join(" "),
    }));
    return fam.concat(sw);
  }
  bxSide() {
    return [
      [
        "Start a project",
        "Tell us what needs to work better",
        "Contact.dc.html",
      ],
      [
        "Build a software plan",
        "Pick systems and see an estimate",
        "Software.dc.html",
      ],
      [
        "Combine services",
        "Bundle services across departments",
        "Services.dc.html",
      ],
    ].map((x) => ({ href: x[2], title: x[0], meta: x[1] }));
  }
  bxVals() {
    const s = this.state,
      narrow = s.narrow,
      items = this.bxItems(),
      f = s.bxF || "All",
      f2 = s.bxF2 || "",
      qRaw = s.bxQ || "",
      q = qRaw.trim().toLowerCase(),
      N = this.BX.noun;
    const list = items.filter(
      (x) =>
        (f === "All" || x.cat === f) &&
        (!f2 || x.cat2 === f2) &&
        (!q || x.search.toLowerCase().indexOf(q) >= 0),
    );
    const lim = this.BX.limit,
      collapsed = f === "All" && !f2 && !q && !s.bxAll && list.length > lim,
      shown = collapsed ? list.slice(0, lim) : list,
      n = shown.length,
      tail = this.BX.tail;
    const BP = [
      ["1 / span 7", "1 / span 2"],
      ["8 / span 5", "1"],
      ["8 / span 5", "2"],
    ];
    const pos = (i) => {
      if (narrow) return ["auto", "auto"];
      if (n === 1) return ["1 / -1", "auto"];
      if (n === 2) return [i ? "8 / span 5" : "1 / span 7", "auto"];
      if (i < 3) return BP[i];
      const j = i - 3,
        rem = n - 3,
        full = Math.floor(rem / tail) * tail;
      if (j < full)
        return [
          tail === 3
            ? ["1 / span 4", "5 / span 4", "9 / span 4"][j % 3]
            : j % 2
              ? "7 / span 6"
              : "1 / span 6",
          "auto",
        ];
      const r = rem - full;
      if (r === 1) return ["1 / -1", "auto"];
      return [j - full ? "7 / span 6" : "1 / span 6", "auto"];
    };
    const hv = (k) => {
      const on = s.hoverCard === k;
      return {
        imgT: on ? "scale(1.06)" : "scale(1)",
        arrowT: on ? "rotate(45deg)" : "none",
        enter: () => this.setState({ hoverCard: k }),
        leave: () => this.setState({ hoverCard: null }),
      };
    };
    const btn = (c, cnt, on, pick) => ({
      label: c.label,
      icon: c.icon,
      n: cnt,
      on: on ? "true" : "false",
      bg: on ? "#EEE3F7" : "transparent",
      c: on ? "#28123B" : "#E9E0F0",
      hover: on ? "#EEE3F7" : "#ffffff0d",
      nBg: on ? "#28123B1a" : "#ffffff12",
      pick: pick,
    });
    const cats = this.bxCats(),
      cats2 = this.bxCats2 ? this.bxCats2() : [],
      side = this.bxSide ? this.bxSide() : [];
    return {
      bxAside: s.xwide ? "sticky" : "static",
      bxAsideFlex: s.xwide ? "0 1 300px" : "1 1 100%",
      bxAsideDisp: s.xwide ? "flex" : "grid",
      bxQ: qRaw,
      bxHasQ: !!qRaw,
      bxOnQ: (e) => this.setState({ bxQ: e.target.value }),
      bxClearQ: () => this.setState({ bxQ: "" }),
      bxClear: () => this.setState({ bxQ: "", bxF: "All", bxF2: "" }),
      bxIsF: !!q || f !== "All" || !!f2,
      bxCats: cats.map((c) =>
        btn(
          c,
          c.label === "All"
            ? items.length
            : items.filter((x) => x.cat === c.label).length,
          f === c.label,
          () => this.setState({ bxF: c.label, bxAll: false }),
        ),
      ),
      bxHasF2: cats2.length > 0,
      bxCats2: cats2.map((c) =>
        btn(
          c,
          items.filter((x) => x.cat2 === c.label).length,
          f2 === c.label,
          () =>
            this.setState({
              bxF2: f2 === c.label ? "" : c.label,
              bxAll: false,
            }),
        ),
      ),
      bxHasSide: side.length > 0,
      bxSide: side.map((x, i) =>
        Object.assign(
          { n: "0" + (i + 1), border: i ? "1px solid #ffffff14" : "none" },
          x,
        ),
      ),
      bxCount: collapsed
        ? "Showing " + n + " of " + list.length + " " + N[1]
        : n +
          " " +
          (n === 1 ? N[0] : N[1]) +
          (f !== "All" ? " in " + f : "") +
          (f2 ? " · " + f2 : "") +
          (qRaw.trim() ? " for “" + qRaw.trim() + "”" : ""),
      bxHas: n > 0,
      bxNone: n === 0,
      bxCols: narrow ? "minmax(0,1fr)" : "repeat(12,minmax(0,1fr))",
      bxMore: collapsed,
      bxMoreLabel:
        "View " +
        (list.length - lim) +
        " more " +
        (list.length - lim === 1 ? N[0] : N[1]),
      bxShowMore: () => this.setState({ bxAll: true }),
      bxList: shown.map((x, i) => {
        const lead = i === 0 && n > 2,
          p = pos(i),
          h = hv("bx-" + x.slug);
        return Object.assign({}, x, {
          lead: lead,
          col: p[0],
          row: p[1],
          size: lead ? "clamp(24px,2.3vw,34px)" : "clamp(18px,1.4vw,21px)",
          hasTags: !!(x.tags && x.tags.length),
          tags: (x.tags || []).map((t) => {
            const m = !!q && t.toLowerCase().indexOf(q) >= 0;
            return {
              label: t,
              bg: m ? "#EEE3F7" : "#0D081480",
              c: m ? "#28123B" : "#F6F1FA",
            };
          }),
          imgT: h.imgT,
          arrowT: h.arrowT,
          enter: h.enter,
          leave: h.leave,
        });
      }),
    };
  }
  renderVals() {
    return Object.assign(this.renderVals0(), this.bxVals());
  }
  renderVals0() {
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
    hero = {
      hasCrumb: false,
      root: "About",
      crumb: "",
      crumbRootC: "#FFFFFF",
      eyebrow: "About OrgTik · One connected direction",
      l1: "We connect the work",
      l2: "",
      acc: "behind progress.",
      body: "OrgTik brings strategy, design, technology and operations together so businesses can make clearer decisions and build with confidence.",
      primary: "Why we exist",
      primaryGo: () => this.go("purpose"),
      secondary: "Talk to us",
      secondaryGo: toContact,
      panelTitle: "At a glance",
      items: [
        ["ph-map-pin", "Belp, Switzerland", "Studio"],
        ["ph-squares-four", "5 service disciplines", "Studio"],
        ["ph-circles-three-plus", "6 software modules", "Software"],
        ["ph-path", "One team, start to finish", "Delivery"],
      ].map((x) => ({ icon: x[0], label: x[1], meta: x[2], href: "#/" })),
      panelNote: "Strategy. Design. Technology.",
    };
    cta = {
      eyebrow: "Start with what matters now",
      l1: "Bring the whole",
      acc: "problem.",
      body: "We’ll help find the most useful place to start, connect the right capabilities, and keep the wider system in view.",
      label: "Talk to us",
      go: toContact,
      second: "Explore services",
      secondGo: () => this.nav("Services.dc.html"),
    };
    ticker = [
      "Strategy",
      "Design",
      "Technology",
      "Operations",
      "Made in Switzerland",
      "One connected direction",
    ];
    const wideP = !s.narrow;
    page = {
      bentoCols: s.narrow ? "minmax(0,1fr)" : "repeat(12,minmax(0,1fr))",
      missionCol: s.narrow ? "auto" : "1 / span 7",
      missionRow: s.narrow ? "auto" : "1 / span 3",
      goalCol: s.narrow ? "auto" : "8 / span 5",
      jsteps: this.JR.map((j, i) => {
        const on = i === s.jr,
          past = i < s.jr;
        return {
          n: j[0],
          title: j[1],
          body: j[2],
          outcome: j[3],
          numC: on ? "#EEE3F7" : past ? "#6B5680" : "#3E2E4D",
          nameC: on ? "#FFFFFF" : "#CFC2DB",
          dot: on || past ? "#D4B7EC" : "#3E2E4D",
          glow: on ? "0 0 0 6px #D4B7EC26, 0 0 24px #9458F4" : "none",
          chipBg: on ? "#EEE3F7" : "transparent",
          chipC: on ? "#28123B" : "#CFC2DB",
          chipB: on ? "#EEE3F7" : "#ffffff26",
          select: () => {
            if (this.state.jr !== i) this.setState({ jr: i });
          },
        };
      }),
      railW: (s.jr + 1) * 25 + "%",
      jEnter: () => {
        this.jHover = true;
      },
      jLeave: () => {
        this.jHover = false;
      },
      panDir: wideP ? "row" : "column",
      panH: wideP ? "clamp(540px,44vw,640px)" : "auto",
      capLeave: () => clearTimeout(this.capT),
      capPanels: this.CAPS.map((c, i) => {
        const on = !wideP || s.capA === i;
        return {
          n: i + 1,
          eyebrow: c[0],
          title: c[1],
          body: c[2],
          tags: c[3],
          href: c[4],
          image: c[5],
          icon: c[6],
          label: c[7],
          grow: wideP ? (s.capA === i ? 3.6 : 1) : 1,
          minH: wideP ? "0px" : "440px",
          imgT: on ? "scale(1.04)" : "scale(1.15)",
          colO: on ? 0 : 1,
          expO: on ? 1 : 0,
          expY: on ? "0px" : "18px",
          expF: on ? "blur(0px)" : "blur(6px)",
          expD: on ? ".34s" : "0s",
          scrim: on
            ? "linear-gradient(180deg,#0D081459 0%,#0D081400 30%,#0D0814e6 100%)"
            : "linear-gradient(180deg,#0D0814a6,#0D0814d9)",
          enter: () => {
            clearTimeout(this.capT);
            this.capT = setTimeout(() => {
              if (this.state.capA !== i) this.setState({ capA: i });
            }, 130);
          },
        };
      }),
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
          ["About", "#/"],
          ["Insights", "Insights.dc.html"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        hero: hero,
        cta: cta,
        tickerLabel: "About",
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
          ["Tell us about your project", "Contact.dc.html"],
          ["Roadmap", "Roadmap.dc.html"],
          ["Sitemap", "Legal.dc.html#/sitemap"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        footTalk: () => {
          if (window.__orgNav) window.__orgNav("Contact.dc.html");
          else location.href = "Contact.dc.html";
        },
        showHero: false,
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
          data-screen-label={"About"}
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
              ref={v.headerRef}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "96px",
                display: "flex",
                alignItems: "center",
                gap: "28px",
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
                      className={"reference-state-218"}
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
                      className={"reference-state-219"}
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
                      className={"reference-state-220"}
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
                      className={"reference-state-221"}
                    >
                      {"Work"}
                    </a>
                    <a
                      href={toSiteHref("#/")}
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "500",
                        background: "#ffffff17",
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        transition: "background .3s, color .3s",
                      }}
                      className={"reference-state-222"}
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
                      className={"reference-state-223"}
                    >
                      {"Insights"}
                    </a>
                  </nav>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "22px",
                      flexShrink: "0",
                    }}
                  >
                    <a
                      href={toSiteHref("SignIn.dc.html")}
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#DCD0E6",
                        whiteSpace: "nowrap",
                      }}
                      className={"reference-state-224"}
                    >
                      {"Sign in"}
                    </a>
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
                      className={"reference-state-225"}
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
                  <button
                    onClick={v.openMenu}
                    aria-label="Open menu"
                    aria-expanded={v.menuOpen}
                    style={{
                      marginLeft: "auto",
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
                    {"Menu "}
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
          <main id={"top"} className="content-page">
            <section
              id={"purpose"}
              style={{
                padding: "clamp(128px,11vw,156px) 0 clamp(72px,7vw,108px)",
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
                    marginBottom: "clamp(32px,3.4vw,48px)",
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
                      <span
                        style={{
                          color: "#C9A0F3",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {"(01)"}
                      </span>
                      <span
                        style={{
                          width: "36px",
                          height: "1px",
                          background: "#ffffff2e",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {"Why OrgTik exists"}
                      </span>
                    </div>
                    <h1
                      data-reveal={"mask"}
                      data-hw={""}
                      style={{
                        fontSize: "clamp(34px,4.4vw,66px)",
                        lineHeight: "1.02",
                        fontWeight: "500",
                        letterSpacing: "-.045em",
                        marginTop: "22px",
                        textWrap: "balance",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        <span data-line={""} style={{ display: "block" }}>
                          {"One direction for the business"}
                        </span>
                      </span>
                      <span style={{ display: "block" }}>
                        <span
                          data-line={""}
                          data-acc={""}
                          style={{
                            display: "block",
                            color: "#D4B7EC",
                            letterSpacing: "-.045em",
                          }}
                        >
                          {"and the work behind it."}
                        </span>
                      </span>
                    </h1>
                  </div>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      maxWidth: "420px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#CFC2DB",
                    }}
                  >
                    {
                      "Businesses rarely experience brand, technology and operations as separate problems. We connect them around one useful outcome, then build the system that carries it forward."
                    }
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: String(v.bentoCols),
                    gap: "16px",
                  }}
                >
                  <div
                    data-reveal={"clip"}
                    style={{
                      position: "relative",
                      gridColumn: String(v.missionCol),
                      gridRow: String(v.missionRow),
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minHeight: "clamp(460px,40vw,600px)",
                      padding: "clamp(24px,2.6vw,40px)",
                      borderRadius: "26px",
                      overflow: "hidden",
                      isolation: "isolate",
                      background: "#1A0D27",
                      color: "#F6F1FA",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        zIndex: "-2",
                        color: "#D4B7EC",
                      }}
                    >
                      <image-slot
                        id={"ab-mission"}
                        shape={"rect"}
                        data-src={"/assets/brand-glass.webp"}
                        placeholder={"Team or studio image"}
                        style={{
                          position: "absolute",
                          inset: "0",
                          width: "100%",
                          height: "100%",
                        }}
                      ></image-slot>
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        inset: "0",
                        zIndex: "-1",
                        pointerEvents: "none",
                        background:
                          "linear-gradient(180deg,#0D081440 0%,#0D081400 30%,#0D0814f2 90%)",
                      }}
                    ></span>
                    <div style={{ pointerEvents: "none", maxWidth: "560px" }}>
                      <span
                        style={{
                          padding: "7px 12px",
                          borderRadius: "999px",
                          background: "#EEE3F7",
                          color: "#28123B",
                          fontSize: "12px",
                          fontWeight: "700",
                          letterSpacing: ".08em",
                        }}
                      >
                        {"MISSION"}
                      </span>
                      <h3
                        data-hw={""}
                        style={{
                          marginTop: "18px",
                          fontSize: "clamp(26px,2.46vw,37px)",
                          lineHeight: "1.05",
                          fontWeight: "500",
                          letterSpacing: "-.04em",
                        }}
                      >
                        {
                          "Make every part of the business easier to understand and use."
                        }
                      </h3>
                      <p
                        style={{
                          fontFamily: "Arial,Helvetica,sans-serif",
                          marginTop: "14px",
                          fontSize: "16px",
                          lineHeight: "1.6",
                          color: "#E4DAEC",
                        }}
                      >
                        {
                          "We unite the customer experience, the tools teams rely on, and the support around both, so the next decision starts with more context and less friction."
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    data-reveal={"up"}
                    style={{
                      gridColumn: String(v.goalCol),
                      display: "flex",
                      gap: "18px",
                      alignItems: "flex-start",
                      padding: "clamp(22px,2.2vw,30px)",
                      borderRadius: "24px",
                      border: "1px solid #ffffff17",
                      background: "linear-gradient(160deg,#1A0D27,#120A1B)",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: "0",
                        display: "grid",
                        placeItems: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid #D4B7EC4d",
                        color: "#D4B7EC",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "19px" }}
                        className={"ph ph-compass"}
                      ></i>
                    </span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#C9A0F3",
                        }}
                      >
                        {"Goal 01"}
                      </span>
                      <span
                        data-hw={""}
                        style={{
                          display: "block",
                          marginTop: "8px",
                          fontSize: "clamp(19px,1.6vw,23px)",
                          fontWeight: "500",
                          letterSpacing: "-.03em",
                          lineHeight: "1.15",
                        }}
                      >
                        {"Create clarity before complexity."}
                      </span>
                      <span
                        style={{
                          fontFamily: "Arial,Helvetica,sans-serif",
                          display: "block",
                          marginTop: "8px",
                          fontSize: "15px",
                          lineHeight: "1.6",
                          color: "#CFC2DB",
                        }}
                      >
                        {
                          "Find the most useful starting point, make the priorities visible, and give every decision a clear reason."
                        }
                      </span>
                    </span>
                  </div>
                  <div
                    data-reveal={"up"}
                    style={{
                      gridColumn: String(v.goalCol),
                      display: "flex",
                      gap: "18px",
                      alignItems: "flex-start",
                      padding: "clamp(22px,2.2vw,30px)",
                      borderRadius: "24px",
                      border: "1px solid #ffffff17",
                      background: "linear-gradient(160deg,#1A0D27,#120A1B)",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: "0",
                        display: "grid",
                        placeItems: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid #D4B7EC4d",
                        color: "#D4B7EC",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "19px" }}
                        className={"ph ph-graph"}
                      ></i>
                    </span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#C9A0F3",
                        }}
                      >
                        {"Goal 02"}
                      </span>
                      <span
                        data-hw={""}
                        style={{
                          display: "block",
                          marginTop: "8px",
                          fontSize: "clamp(19px,1.6vw,23px)",
                          fontWeight: "500",
                          letterSpacing: "-.03em",
                          lineHeight: "1.15",
                        }}
                      >
                        {"Build connected value."}
                      </span>
                      <span
                        style={{
                          fontFamily: "Arial,Helvetica,sans-serif",
                          display: "block",
                          marginTop: "8px",
                          fontSize: "15px",
                          lineHeight: "1.6",
                          color: "#CFC2DB",
                        }}
                      >
                        {
                          "Design every service, experience and system to strengthen the work around it."
                        }
                      </span>
                    </span>
                  </div>
                  <div
                    data-reveal={"up"}
                    style={{
                      gridColumn: String(v.goalCol),
                      display: "flex",
                      gap: "18px",
                      alignItems: "flex-start",
                      padding: "clamp(22px,2.2vw,30px)",
                      borderRadius: "24px",
                      border: "1px solid #ffffff17",
                      background: "linear-gradient(160deg,#1A0D27,#120A1B)",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: "0",
                        display: "grid",
                        placeItems: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        border: "1px solid #D4B7EC4d",
                        color: "#D4B7EC",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "19px" }}
                        className={"ph ph-users-three"}
                      ></i>
                    </span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#C9A0F3",
                        }}
                      >
                        {"Goal 03"}
                      </span>
                      <span
                        data-hw={""}
                        style={{
                          display: "block",
                          marginTop: "8px",
                          fontSize: "clamp(19px,1.6vw,23px)",
                          fontWeight: "500",
                          letterSpacing: "-.03em",
                          lineHeight: "1.15",
                        }}
                      >
                        {"Leave teams stronger."}
                      </span>
                      <span
                        style={{
                          fontFamily: "Arial,Helvetica,sans-serif",
                          display: "block",
                          marginTop: "8px",
                          fontSize: "15px",
                          lineHeight: "1.6",
                          color: "#CFC2DB",
                        }}
                      >
                        {
                          "Create practical tools and shared understanding that continue to work after delivery."
                        }
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section
              id={"journey"}
              style={{
                padding: "clamp(72px,7vw,108px) 0",
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
                    marginBottom: "clamp(32px,3.4vw,48px)",
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
                      <span
                        style={{
                          color: "#C9A0F3",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {"(02)"}
                      </span>
                      <span
                        style={{
                          width: "36px",
                          height: "1px",
                          background: "#ffffff2e",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {"How we work"}
                      </span>
                    </div>
                    <h2
                      data-reveal={"mask"}
                      data-hw={""}
                      style={{
                        fontSize: "clamp(34px,4.4vw,66px)",
                        lineHeight: "1.02",
                        fontWeight: "500",
                        letterSpacing: "-.045em",
                        marginTop: "22px",
                        textWrap: "balance",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        <span data-line={""} style={{ display: "block" }}>
                          {"From one useful question"}
                        </span>
                      </span>
                      <span style={{ display: "block" }}>
                        <span
                          data-line={""}
                          data-acc={""}
                          style={{
                            display: "block",
                            color: "#D4B7EC",
                            letterSpacing: "-.045em",
                          }}
                        >
                          {"to a system that keeps improving."}
                        </span>
                      </span>
                    </h2>
                  </div>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      maxWidth: "420px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#CFC2DB",
                    }}
                  >
                    {
                      "Our journey is a way of working: understand what matters, connect the right disciplines, deliver something useful, and stay close enough to help it evolve."
                    }
                  </p>
                </div>
                <div
                  onMouseEnter={v.jEnter}
                  onMouseLeave={v.jLeave}
                  data-reveal={"stagger"}
                  style={{
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit,minmax(min(100%,230px),1fr))",
                    columnGap: "clamp(20px,2.4vw,36px)",
                    rowGap: "48px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      right: "0",
                      top: "0",
                      height: "1px",
                      background: "#ffffff1f",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      height: "1px",
                      width: String(v.railW),
                      background: "linear-gradient(90deg,#9458F4,#D4B7EC)",
                      transition: "width 1s cubic-bezier(.22,1,.36,1)",
                    }}
                  ></div>
                  {(v.jsteps || []).map((j, jIndex) => (
                    <React.Fragment key={jIndex}>
                      <button
                        onMouseEnter={j.select}
                        onClick={j.select}
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          textAlign: "left",
                          paddingTop: "44px",
                          color: "#F6F1FA",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "0",
                            top: "-5px",
                            width: "11px",
                            height: "11px",
                            borderRadius: "50%",
                            background: String(j.dot),
                            boxShadow: String(j.glow),
                            transition: "all .5s",
                          }}
                        ></span>
                        <span
                          style={{
                            display: "block",
                            fontSize: "clamp(35px,2.95vw,45px)",
                            lineHeight: ".9",
                            fontWeight: "200",
                            letterSpacing: "-.06em",
                            color: String(j.numC),
                            transition: "color .6s",
                          }}
                        >
                          {j.n}
                        </span>
                        <span
                          data-hw={""}
                          style={{
                            display: "block",
                            marginTop: "22px",
                            fontSize: "clamp(25px,2.3vw,34px)",
                            fontWeight: "500",
                            letterSpacing: "-.04em",
                            lineHeight: "1.05",
                            textWrap: "balance",
                            color: String(j.nameC),
                            transition: "color .4s",
                          }}
                        >
                          {j.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            display: "block",
                            marginTop: "12px",
                            maxWidth: "34ch",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "#B5A6C4",
                          }}
                        >
                          {j.body}
                        </span>
                        <span
                          style={{
                            marginTop: "18px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: "1px solid " + j.chipB,
                            background: String(j.chipBg),
                            color: String(j.chipC),
                            fontSize: "13px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            transition: "all .45s",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            className={"ph-fill ph-check-circle"}
                          ></i>
                          {j.outcome}
                        </span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
            <section
              id={"capabilities"}
              data-screen-label={"About — What we can do"}
              style={{ padding: "clamp(72px,7vw,108px) 0" }}
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
                    gap: "24px 64px",
                    marginBottom: "clamp(32px,3.4vw,48px)",
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
                      <span
                        style={{
                          color: "#C9A0F3",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {"(03)"}
                      </span>
                      <span
                        style={{
                          width: "36px",
                          height: "1px",
                          background: "#ffffff2e",
                        }}
                      ></span>
                      <span style={{ whiteSpace: "nowrap" }}>
                        {"What we can do"}
                      </span>
                    </div>
                    <h2
                      data-reveal={"mask"}
                      data-hw={""}
                      style={{
                        fontSize: "clamp(34px,4.4vw,66px)",
                        lineHeight: "1.02",
                        fontWeight: "500",
                        letterSpacing: "-.045em",
                        marginTop: "22px",
                        textWrap: "balance",
                      }}
                    >
                      <span style={{ display: "block" }}>
                        <span data-line={""} style={{ display: "block" }}>
                          {"Build the experience."}
                        </span>
                      </span>
                      <span style={{ display: "block" }}>
                        <span
                          data-line={""}
                          data-acc={""}
                          style={{
                            display: "block",
                            color: "#D4B7EC",
                            letterSpacing: "-.045em",
                          }}
                        >
                          {"Connect the business behind it."}
                        </span>
                      </span>
                    </h2>
                  </div>
                  <p
                    data-reveal={"up"}
                    style={{
                      fontFamily: "Arial,Helvetica,sans-serif",
                      maxWidth: "420px",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#CFC2DB",
                    }}
                  >
                    {
                      "Start with one capability or bring several together. Every path stays connected to the same business direction."
                    }
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    gap: "20px",
                  }}
                >
                  <aside
                    data-reveal={"up"}
                    style={{
                      flex: String(v.bxAsideFlex),
                      minWidth: "250px",
                      position: String(v.bxAside),
                      top: "100px",
                      display: String(v.bxAsideDisp),
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <label
                      style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        height: "50px",
                        padding: "0 14px",
                        borderRadius: "16px",
                        border: "1px solid #ffffff26",
                        background: "#ffffff08",
                        color: "#B5A6C4",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "17px" }}
                        className={"ph ph-magnifying-glass"}
                      ></i>
                      <input
                        value={v.bxQ}
                        onChange={v.bxOnQ}
                        placeholder={"Search services or systems"}
                        aria-label={"Search services or systems"}
                        style={{
                          flex: "1",
                          minWidth: "0",
                          background: "transparent",
                          border: "0",
                          outline: "none",
                          color: "#F6F1FA",
                          fontFamily: "Arial,Helvetica,sans-serif",
                          fontSize: "15px",
                        }}
                      />
                      {v.bxHasQ && (
                        <>
                          <button
                            type={"button"}
                            onClick={v.bxClearQ}
                            title={"Clear search"}
                            style={{
                              display: "grid",
                              placeItems: "center",
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              color: "#CFC2DB",
                            }}
                            className={"reference-state-230"}
                          >
                            <i
                              aria-hidden={true}
                              style={{ fontSize: "14px" }}
                              className={"ph ph-x"}
                            ></i>
                          </button>
                        </>
                      )}
                    </label>
                    <div
                      style={{
                        padding: "14px",
                        borderRadius: "20px",
                        border: "1px solid #ffffff17",
                        background: "#120A1B",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: ".16em",
                          textTransform: "uppercase",
                          color: "#9D8BAE",
                          margin: "2px 4px 8px",
                        }}
                      >
                        {"Capabilities"}
                      </div>
                      {(v.bxCats || []).map((c, cIndex) => (
                        <React.Fragment key={cIndex}>
                          <button
                            type={"button"}
                            onClick={c.pick}
                            aria-pressed={c.on}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 12px",
                              marginTop: "2px",
                              borderRadius: "12px",
                              background: String(c.bg),
                              color: String(c.c),
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "left",
                              transition: "background .3s, color .3s",
                            }}
                            className={"reference-state-231"}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                minWidth: "0",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "16px", flexShrink: "0" }}
                                className={"ph " + c.icon}
                              ></i>
                              <span>{c.label}</span>
                            </span>
                            <span
                              style={{
                                minWidth: "26px",
                                padding: "2px 8px",
                                borderRadius: "999px",
                                background: String(c.nBg),
                                fontSize: "12px",
                                fontWeight: "700",
                                textAlign: "center",
                              }}
                            >
                              {c.n}
                            </span>
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                    {v.bxHasF2 && (
                      <>
                        <div
                          style={{
                            padding: "14px",
                            borderRadius: "20px",
                            border: "1px solid #ffffff17",
                            background: "#120A1B",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              letterSpacing: ".16em",
                              textTransform: "uppercase",
                              color: "#9D8BAE",
                              margin: "2px 4px 8px",
                            }}
                          ></div>
                          {(v.bxCats2 || []).map((c, cIndex) => (
                            <React.Fragment key={cIndex}>
                              <button
                                type={"button"}
                                onClick={c.pick}
                                aria-pressed={c.on}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "12px",
                                  padding: "10px 12px",
                                  marginTop: "2px",
                                  borderRadius: "12px",
                                  background: String(c.bg),
                                  color: String(c.c),
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  textAlign: "left",
                                  transition: "background .3s, color .3s",
                                }}
                                className={"reference-state-232"}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    minWidth: "0",
                                  }}
                                >
                                  <i
                                    aria-hidden={true}
                                    style={{
                                      fontSize: "16px",
                                      flexShrink: "0",
                                    }}
                                    className={"ph " + c.icon}
                                  ></i>
                                  <span>{c.label}</span>
                                </span>
                                <span
                                  style={{
                                    minWidth: "26px",
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    background: String(c.nBg),
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                  }}
                                >
                                  {c.n}
                                </span>
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    )}
                    {v.bxHasSide && (
                      <>
                        <div
                          style={{
                            padding: "14px",
                            borderRadius: "20px",
                            border: "1px solid #ffffff17",
                            background: "#120A1B",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              letterSpacing: ".16em",
                              textTransform: "uppercase",
                              color: "#9D8BAE",
                              margin: "2px 4px 8px",
                            }}
                          >
                            {"Ways to start"}
                          </div>
                          {(v.bxSide || []).map((p, pIndex) => (
                            <React.Fragment key={pIndex}>
                              <a
                                href={toSiteHref(p.href)}
                                onClick={p.go}
                                style={{
                                  display: "flex",
                                  gap: "12px",
                                  padding: "12px 4px",
                                  borderTop: String(p.border),
                                  color: "#F6F1FA",
                                }}
                                className={"reference-state-233"}
                              >
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "#C9A0F3",
                                    paddingTop: "2px",
                                  }}
                                >
                                  {p.n}
                                </span>
                                <span style={{ flex: "1", minWidth: "0" }}>
                                  <span
                                    style={{
                                      display: "block",
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      lineHeight: "1.35",
                                    }}
                                  >
                                    {p.title}
                                  </span>
                                  <span
                                    style={{
                                      display: "block",
                                      marginTop: "4px",
                                      fontSize: "12px",
                                      color: "#9D8BAE",
                                    }}
                                  >
                                    {p.meta}
                                  </span>
                                </span>
                                <i
                                  aria-hidden={true}
                                  style={{
                                    fontSize: "14px",
                                    color: "#9D8BAE",
                                    paddingTop: "2px",
                                  }}
                                  className={"ph ph-arrow-up-right"}
                                ></i>
                              </a>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    )}
                  </aside>
                  <div style={{ flex: "1 1 560px", minWidth: "0" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "14px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#B5A6C4",
                      }}
                    >
                      <span aria-live={"polite"}>{v.bxCount}</span>
                      {v.bxIsF && (
                        <>
                          <button
                            type={"button"}
                            onClick={v.bxClear}
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#D4B7EC",
                            }}
                            className={"reference-state-234"}
                          >
                            {"Clear filters"}
                          </button>
                        </>
                      )}
                    </div>
                    {v.bxHas && (
                      <>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: String(v.bxCols),
                            gridAutoRows: "minmax(224px,auto)",
                            gap: "12px",
                          }}
                        >
                          {(v.bxList || []).map((k, kIndex) => (
                            <React.Fragment key={kIndex}>
                              <a
                                href={toSiteHref(k.href)}
                                data-cursor={"Explore"}
                                onMouseEnter={k.enter}
                                onMouseLeave={k.leave}
                                style={{
                                  position: "relative",
                                  gridColumn: String(k.col),
                                  gridRow: String(k.row),
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  gap: "16px",
                                  padding: "20px",
                                  borderRadius: "22px",
                                  overflow: "hidden",
                                  isolation: "isolate",
                                  border: "1px solid #ffffff17",
                                  background:
                                    "linear-gradient(160deg,#1A0D27,#120A1B)",
                                  color: "#F6F1FA",
                                  transition:
                                    "border-color .4s, transform .6s cubic-bezier(.22,1,.36,1)",
                                }}
                                className={"reference-state-235"}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: "0",
                                    zIndex: "-2",
                                    color: "#D4B7EC",
                                  }}
                                >
                                  <image-slot
                                    id={"ab-cap-" + k.slug}
                                    shape={"rect"}
                                    data-src={"/assets/" + k.image}
                                    placeholder={k.ph}
                                    style={{
                                      position: "absolute",
                                      inset: "0",
                                      width: "100%",
                                      height: "100%",
                                      transform: String(k.imgT),
                                      transition:
                                        "transform 1.4s cubic-bezier(.22,1,.36,1)",
                                    }}
                                  ></image-slot>
                                </div>
                                <span
                                  style={{
                                    position: "absolute",
                                    inset: "0",
                                    zIndex: "-1",
                                    pointerEvents: "none",
                                    background:
                                      "linear-gradient(180deg,#0D081459 0%,#0D081400 30%,#0D0814f0 88%)",
                                  }}
                                ></span>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                    pointerEvents: "none",
                                  }}
                                >
                                  <span
                                    style={{
                                      padding: "5px 10px",
                                      borderRadius: "999px",
                                      background: "#EEE3F7",
                                      color: "#28123B",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {k.chip}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      color: "#CFC2DB",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {k.meta}
                                  </span>
                                </div>
                                <div style={{ pointerEvents: "none" }}>
                                  <h3
                                    data-hw={""}
                                    style={{
                                      fontSize: String(k.size),
                                      lineHeight: "1.12",
                                      fontWeight: "500",
                                      letterSpacing: "-.03em",
                                      textWrap: "balance",
                                    }}
                                  >
                                    {k.title}
                                  </h3>
                                  {k.lead && (
                                    <>
                                      <p
                                        style={{
                                          fontFamily:
                                            "Arial,Helvetica,sans-serif",
                                          marginTop: "10px",
                                          maxWidth: "46ch",
                                          fontSize: "14px",
                                          lineHeight: "1.6",
                                          color: "#DCD0E6",
                                        }}
                                      >
                                        {k.excerpt}
                                      </p>
                                    </>
                                  )}
                                  {k.hasTags && (
                                    <>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: "6px",
                                          marginTop: "12px",
                                        }}
                                      >
                                        {(k.tags || []).map((t, tIndex) => (
                                          <React.Fragment key={tIndex}>
                                            <span
                                              style={{
                                                padding: "5px 10px",
                                                borderRadius: "999px",
                                                background: String(t.bg),
                                                border: "1px solid #ffffff26",
                                                backdropFilter: "blur(10px)",
                                                color: String(t.c),
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                transition:
                                                  "background .3s, color .3s",
                                              }}
                                            >
                                              {t.label}
                                            </span>
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <span
                                    style={{
                                      marginTop: "14px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      gap: "12px",
                                      fontSize: "13px",
                                      fontWeight: "600",
                                      color: "#D4B7EC",
                                    }}
                                  >
                                    <span>{k.foot}</span>
                                    <i
                                      aria-hidden={true}
                                      style={{
                                        fontSize: "16px",
                                        transform: String(k.arrowT),
                                        transition: "transform .45s",
                                      }}
                                      className={"ph ph-arrow-up-right"}
                                    ></i>
                                  </span>
                                </div>
                              </a>
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    )}
                    {v.bxMore && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "22px",
                          }}
                        >
                          <button
                            type={"button"}
                            onClick={v.bxShowMore}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "14px",
                              minHeight: "52px",
                              padding: "6px 6px 6px 22px",
                              borderRadius: "999px",
                              border: "1px solid #D4B7EC55",
                              color: "#F6F1FA",
                              fontSize: "14px",
                              fontWeight: "600",
                              transition: "background .3s, border-color .3s",
                            }}
                            className={"reference-state-236"}
                          >
                            {v.bxMoreLabel}
                            <span
                              style={{
                                display: "grid",
                                placeItems: "center",
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                background: "#EEE3F7",
                                color: "#28123B",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "15px" }}
                                className={"ph ph-plus"}
                              ></i>
                            </span>
                          </button>
                        </div>
                      </>
                    )}
                    {v.bxNone && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                            padding: "56px 24px",
                            borderRadius: "22px",
                            border: "1px dashed #ffffff2e",
                            textAlign: "center",
                          }}
                        >
                          <i
                            aria-hidden={true}
                            style={{ fontSize: "26px", color: "#D4B7EC" }}
                            className={"ph ph-magnifying-glass"}
                          ></i>
                          <div
                            data-hw={""}
                            style={{ fontSize: "22px", fontWeight: "500" }}
                          >
                            {"Nothing matches yet"}
                          </div>
                          <p
                            style={{
                              fontFamily: "Arial,Helvetica,sans-serif",
                              fontSize: "15px",
                              color: "#CFC2DB",
                            }}
                          >
                            {
                              "Try another word, or talk to us about what you need."
                            }
                          </p>
                          <button
                            type={"button"}
                            onClick={v.bxClear}
                            style={{
                              padding: "10px 18px",
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
                </div>
              </div>
            </section>
            <section
              id={"closing"}
              ref={v.closingRef}
              onMouseMove={v.closingMove}
              onMouseLeave={v.closingLeave}
              style={{
                position: "relative",
                overflow: "clip",
                isolation: "isolate",
                padding: "clamp(84px,8.4vw,128px) 0",
                textAlign: "center",
                background: "#0B0612",
                borderTop: "1px solid #ffffff12",
              }}
            >
              <div
                ref={v.glowRef}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "55%",
                  width: "min(1100px,120vw)",
                  aspectRatio: "1",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,#9458F452 0%,#6C3CAA26 30%,transparent 62%)",
                  zIndex: "-1",
                  pointerEvents: "none",
                  transition:
                    "left .9s cubic-bezier(.22,1,.36,1), top .9s cubic-bezier(.22,1,.36,1)",
                }}
              ></div>
              <img
                data-spin={"160000"}
                src={"/assets/logo/orgtik-mark-white.svg"}
                alt={""}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "min(760px,90vw)",
                  height: "auto",
                  marginLeft: "calc(min(760px,90vw) / -2)",
                  marginTop: "calc(min(760px,90vw) / -2)",
                  opacity: ".04",
                  zIndex: "-1",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  maxWidth: "1440px",
                  margin: "0 auto",
                  padding: "0 clamp(20px,4.4vw,64px)",
                }}
              >
                <div
                  data-reveal={"up"}
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: ".24em",
                    textTransform: "uppercase",
                    color: "#C9A0F3",
                  }}
                >
                  {v.cta.eyebrow}
                </div>
                <h2
                  data-reveal={"mask"}
                  data-hw={""}
                  style={{
                    marginTop: "34px",
                    fontSize: "clamp(42px,6.6vw,104px)",
                    lineHeight: "1.04",
                    fontWeight: "500",
                    letterSpacing: "-.05em",
                    textWrap: "balance",
                  }}
                >
                  <span style={{ display: "block" }}>
                    <span data-line={""} style={{ display: "block" }}>
                      {v.cta.l1}
                    </span>
                  </span>
                  <span style={{ display: "block" }}>
                    <span
                      data-line={""}
                      data-acc={""}
                      style={{
                        display: "block",
                        color: "#D4B7EC",
                        letterSpacing: "-.045em",
                      }}
                    >
                      {v.cta.acc}
                    </span>
                  </span>
                </h2>
                <p
                  data-reveal={"up"}
                  style={{
                    fontFamily: "Arial,Helvetica,sans-serif",
                    margin: "30px auto 0",
                    maxWidth: "560px",
                    fontSize: "clamp(16px,1.2vw,18px)",
                    lineHeight: "1.6",
                    color: "#CFC2DB",
                  }}
                >
                  {v.cta.body}
                </p>
                <div
                  data-reveal={"up"}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "48px",
                  }}
                >
                  <button
                    ref={v.magnetRef}
                    onClick={v.cta.go}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "24px",
                      minHeight: "60px",
                      padding: "9px 9px 9px 32px",
                      borderRadius: "999px",
                      background: "#EEE3F7",
                      color: "#28123B",
                      fontSize: "16px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      transition:
                        "transform .5s cubic-bezier(.22,1,.36,1), background .3s, box-shadow .5s",
                    }}
                    className={"reference-state-237"}
                  >
                    {v.cta.label}
                    <span
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#28123B",
                        color: "#EEE3F7",
                      }}
                    >
                      <i
                        aria-hidden={true}
                        style={{ fontSize: "18px" }}
                        className={"ph ph-arrow-up-right"}
                      ></i>
                    </span>
                  </button>
                  <button
                    onClick={v.cta.secondGo}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: "60px",
                      padding: "0 30px",
                      borderRadius: "999px",
                      border: "1px solid #D4B7EC55",
                      color: "#F6F1FA",
                      fontSize: "16px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      transition: "background .3s, border-color .3s",
                    }}
                    className={"reference-state-238"}
                  >
                    {v.cta.second}
                  </button>
                </div>
              </div>
            </section>
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
                  className={"reference-state-239"}
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
                    fontSize: "clamp(32px,3vw,44px)",
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
                  className={"reference-state-240"}
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
                        className={"reference-state-241"}
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
                        className={"reference-state-242"}
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
                      className={"reference-state-243"}
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
                  className={"reference-state-244 reference-state-245"}
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

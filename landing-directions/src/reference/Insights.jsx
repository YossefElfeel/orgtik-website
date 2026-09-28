import { ContentHeading } from "./ContentHeading";
import React from "react";
import { ReferencePage } from "./ReferencePage";
import { toSiteHref } from "./navigation";

export default class Insights extends ReferencePage {
  INS = [
    {
      slug: "connected-digital-system",
      category: "Development",
      title: "When a website becomes part of the operating system",
      excerpt:
        "A practical way to connect customer experience, team workflow, and the tools behind both.",
      date: "18 September 2026",
      readingTime: "7 min read",
      image: "brand-tablet.webp",
    },
    {
      slug: "brand-system-that-scales",
      category: "Design",
      title: "A brand system should make the next decision easier",
      excerpt:
        "How a useful identity creates consistency without making every touchpoint feel the same.",
      date: "10 September 2026",
      readingTime: "5 min read",
      image: "brand-cards.webp",
    },
    {
      slug: "managed-hosting-questions",
      category: "IT support",
      title: "Five questions to ask before choosing managed hosting",
      excerpt:
        "Look beyond storage and compare the care, recovery, monitoring, and support around the service.",
      date: "2 September 2026",
      readingTime: "6 min read",
      image: "brand-glass.webp",
    },
    {
      slug: "campaigns-with-a-system",
      category: "Marketing",
      title: "Campaigns work better when the system is visible",
      excerpt:
        "Connect the brief, audience, content, decisions, and learning loop before activity accelerates.",
      date: "26 August 2026",
      readingTime: "8 min read",
      image: "brand-phone.webp",
    },
    {
      slug: "designing-for-change",
      category: "Design",
      title: "Designing a website that can change without losing itself",
      excerpt:
        "A clear hierarchy and reusable patterns help a website evolve without accumulating visual debt.",
      date: "14 August 2026",
      readingTime: "6 min read",
      image: "brand-glass.webp",
    },
    {
      slug: "frontend-performance-budget",
      category: "Development",
      title: "Performance budgets belong in the design conversation",
      excerpt:
        "Media, motion, type, and interaction decisions shape perceived speed long before deployment.",
      date: "4 August 2026",
      readingTime: "9 min read",
      image: "brand-tablet.webp",
    },
  ];
  ART = {
    "connected-digital-system": {
      t: [
        "Treat the website as part of how the business runs, not a separate brochure.",
        "Map the hand-offs between customer actions and team workflows before choosing tools.",
        "Start with one connected journey and extend from there.",
      ],
      b: [
        [
          "The website is already an operating tool",
          [
            "Every enquiry form, booking request and product page starts work somewhere inside the business. When the website is treated as a standalone brochure, that work arrives without context and someone has to re-type, forward or chase it.",
            "Seeing the website as part of the operating system changes the brief: the question is no longer only how a page looks, but what happens after someone uses it.",
          ],
        ],
        [
          "Map the hand-offs first",
          [
            "Before choosing tools, list the moments where a customer action becomes internal work: a request becomes a lead, a lead becomes a project, a project creates documents and follow-ups.",
            "For each hand-off, note who picks it up, what information they need and where it currently gets lost. That map is more valuable than any feature list.",
          ],
        ],
        [
          "Connect one journey at a time",
          [
            "Trying to connect everything at once usually stalls. Pick the journey that costs the most time today — often enquiry to first reply — and connect it end to end.",
            "Once that journey works, the next one is easier, because the shared records and habits already exist.",
          ],
        ],
      ],
    },
    "brand-system-that-scales": {
      t: [
        "A brand system is a set of decisions, not a collection of files.",
        "Define the few rules that matter most and make them easy to apply.",
        "Give room for variation so touchpoints do not all look the same.",
      ],
      b: [
        [
          "Consistency is a side effect, not the goal",
          [
            "Teams often ask for consistency when what they really want is fewer debates. A useful brand system answers the recurring questions — which colour, which type size, which tone — before they are asked.",
            "When those answers are clear, consistency follows without every piece looking identical.",
          ],
        ],
        [
          "Decide the few rules that matter",
          [
            "Most brands need a small core: how the logo behaves, the palette and its ratios, one or two typefaces with clear roles, and a voice that can be described in a sentence.",
            "Everything else can be guidance rather than law. Fewer hard rules make the system easier to adopt.",
          ],
        ],
        [
          "Design for the next decision",
          [
            "A good test for any guideline is whether it makes the next decision easier for someone who was not in the room. If it needs a meeting to interpret, it is not finished yet.",
            "Review the system after real use: which rules were followed naturally, and which were quietly ignored? The ignored ones usually need to be simpler.",
          ],
        ],
      ],
    },
    "managed-hosting-questions": {
      t: [
        "Compare the care around hosting, not only the server specification.",
        "Ask how recovery works before you ever need it.",
        "Make sure support knows the website, not just the infrastructure.",
      ],
      b: [
        [
          "1. What happens when something breaks?",
          [
            "Ask who notices first, how you are told and what the typical steps to recovery look like. A clear, honest answer is worth more than a headline availability figure.",
          ],
        ],
        [
          "2. How are backups taken and tested?",
          [
            "Backups only matter if they can be restored. Ask how often they run, where they are stored, and when a restore was last tested end to end.",
          ],
        ],
        [
          "3. Who looks after updates?",
          [
            "Platforms, plugins and dependencies need regular care. Clarify what is updated automatically, what is reviewed first and who checks the website afterwards.",
          ],
        ],
        [
          "4. How is performance watched?",
          [
            "Monitoring should cover what visitors experience, not only whether the server is up. Ask which signals are tracked and what happens when they drift.",
          ],
        ],
        [
          "5. Does support understand your website?",
          [
            "The most useful support comes from people who know how the website was built and why. Hosting that sits close to the team that designed and maintains the site shortens every conversation.",
          ],
        ],
      ],
    },
    "campaigns-with-a-system": {
      t: [
        "Write the brief before production starts, not after.",
        "Keep audience, message, channel and owner visible in one place.",
        "Close every campaign with a learning that informs the next one.",
      ],
      b: [
        [
          "Activity is not a strategy",
          [
            "Busy campaign calendars can hide a lack of direction. When each post, ad and email is planned in isolation, it becomes hard to say what worked and why.",
            "A visible system connects every piece of activity to the decision it is meant to support.",
          ],
        ],
        [
          "One brief, shared early",
          [
            "A short brief — the goal, the audience, the core message, the channels and the owner — gives everyone the same starting point. It also makes it easier to say no to work that does not fit.",
            "Keep the brief where the team already works, so it is referenced rather than forgotten.",
          ],
        ],
        [
          "Build the learning loop in",
          [
            "Decide up front which signal will tell you whether the campaign is working, and when you will look at it. Then record what you learned, even when the answer is inconclusive.",
            "Over time, those small notes become the most valuable marketing asset a team has.",
          ],
        ],
      ],
    },
    "designing-for-change": {
      t: [
        "Plan for the website to change from the first day.",
        "A clear hierarchy and reusable patterns prevent visual debt.",
        "Give content owners guardrails instead of blank canvases.",
      ],
      b: [
        [
          "Every website changes",
          [
            "New services, new team members and new priorities all end up on the website. Designs that only work for launch-day content start to fray within months.",
            "Designing for change means assuming the content will grow, shrink and move — and making that easy.",
          ],
        ],
        [
          "Patterns over pages",
          [
            "Instead of designing every page from scratch, define a small set of sections that can be combined: an introduction, a feature list, a story, a call to action. Each should work with more or less content than planned.",
            "New pages then become new combinations, not new designs, and the visual language stays coherent.",
          ],
        ],
        [
          "Guardrails for the people who edit",
          [
            "Content owners need freedom within limits. Sensible defaults, clear field labels and a preview that matches the live site prevent most layout problems before they happen.",
            "The best measure of success is simple: the site still looks considered a year after launch.",
          ],
        ],
      ],
    },
    "frontend-performance-budget": {
      t: [
        "Performance is shaped by design decisions long before development.",
        "Agree a budget for media, motion and fonts early.",
        "Measure what visitors feel, not only what tools score.",
      ],
      b: [
        [
          "Speed is a design outcome",
          [
            "Large hero media, many font weights and heavy animation all have a cost. By the time a design reaches development, most of the performance picture has already been decided.",
            "Bringing performance into the design conversation early avoids painful trade-offs later.",
          ],
        ],
        [
          "Set a budget together",
          [
            "A simple budget — how much media per page, how many font files, which interactions may animate — gives designers and developers a shared constraint to work within.",
            "The budget is not a limit on ambition; it is a way to spend weight where it matters most.",
          ],
        ],
        [
          "Measure perceived speed",
          [
            "Visitors judge speed by how quickly they can read and act, not by a single score. Watch how soon the main content appears, whether the layout jumps and how responsive the first interactions feel.",
            "Review these signals after every significant change, so the website stays fast as it evolves.",
          ],
        ],
      ],
    },
  };
  SVC = {
    Design: ["design", "Web design services", "Design"],
    Development: ["development", "Development services", "Development"],
    "IT support": ["it-support", "IT support", "IT support"],
    Marketing: ["marketing", "Marketing services", "Marketing"],
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
    filter: "All",
    q: "",
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
    if (p[0] === "article" && this.INS.some((x) => x.slug === p[1]))
      return { view: "article", slug: p[1] };
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
    const I = this.INS,
      A = v === "article" ? I.find((x) => x.slug === r.slug) : null;
    const card = (x, big) =>
      Object.assign(
        {
          href: "#/article/" + x.slug,
          slug: x.slug,
          image: x.image,
          category: x.category,
          date: x.date,
          time: x.readingTime,
          title: x.title,
          excerpt: x.excerpt,
          size: big ? "clamp(26px,2.58vw,39px)" : "clamp(18px,1.47vw,22px)",
          cols:
            big && !s.narrow
              ? "minmax(0,1.1fr) minmax(0,.9fr)"
              : "minmax(0,1fr)",
          imgH: big ? "360px" : "200px",
          arrowX: s.hoverCard === "a" + x.slug ? "translateX(4px)" : "none",
        },
        hov("a" + x.slug),
      );
    ticker = I.map((x) => x.title);
    const gridCols = s.narrow ? "minmax(0,1fr)" : "repeat(2,minmax(0,1fr))";
    if (A) {
      const sv = this.SVC[A.category] || this.SVC.Design,
        rel = I.filter((x) => x.slug !== A.slug && x.category === A.category)
          .concat(
            I.filter((x) => x.slug !== A.slug && x.category !== A.category),
          )
          .slice(0, 2);
      hero = {
        hasCrumb: true,
        root: "Insights",
        crumb: A.category,
        crumbRootC: "#B5A6C4",
        eyebrow: A.category + " · " + A.readingTime,
        l1: A.title,
        l2: "",
        acc: "",
        body: A.date,
        primary: "Read the summary",
        primaryGo: () => this.go("article"),
        secondary: "Explore " + sv[2],
        secondaryGo: () => this.nav("Services.dc.html#/family/" + sv[0]),
        panelTitle: "In this article",
        items: [
          ["ph-folder-simple", A.category],
          ["ph-calendar-blank", A.date],
          ["ph-clock", A.readingTime],
        ].map((x) => ({
          icon: x[0],
          label: x[1],
          meta: "",
          href: "#/article/" + A.slug,
        })),
        panelNote: "Linked to the service that helps you act on it.",
      };
      cta = {
        eyebrow: "Ideas into action",
        l1: "Turn this into",
        acc: "your next step.",
        body: "Tell us where you are today and we’ll suggest the most useful place to start.",
        label: "Talk to us",
        go: toContact,
        second: "All insights",
        secondGo: () => {
          location.hash = "#/";
        },
      };
      page = {
        isIndex: false,
        isArticle: true,
        gridCols: gridCols,
        ar: {
          takeaways: (this.ART[A.slug] || { t: [] }).t,
          body: (this.ART[A.slug] || { b: [] }).b.map((x) => ({
            h: x[0],
            p: x[1],
          })),
          slug: A.slug,
          image: A.image,
          excerpt: A.excerpt,
          svcTitle: sv[1],
          svcShort: sv[2],
          svcHref: "Services.dc.html#/family/" + sv[0],
          svcBody:
            "Our " +
            sv[2].toLowerCase() +
            " team works on exactly this kind of question.",
          meta: [
            ["Category", A.category],
            ["Published", A.date],
            ["Reading time", A.readingTime],
          ].map((x) => ({ k: x[0], v: x[1] })),
        },
        related: rel.map((x) => card(x, false)),
      };
    } else {
      const cats = ["All"].concat(
          Array.from(new Set(I.map((x) => x.category))),
        ),
        list = (
          s.filter === "All" ? I : I.filter((x) => x.category === s.filter)
        ).filter(
          (x) =>
            !s.q ||
            (x.title + " " + x.excerpt + " " + x.category)
              .toLowerCase()
              .indexOf(s.q.trim().toLowerCase()) >= 0,
        );
      hero = {
        hasCrumb: false,
        root: "Insights",
        crumb: "",
        crumbRootC: "#FFFFFF",
        eyebrow: "Insights · From the studio",
        l1: "Ideas that make",
        l2: "",
        acc: "the next decision easier.",
        body: "Practical notes on brand, development, IT support and marketing from the people who do the work.",
        primary: "Start reading",
        primaryGo: () => this.go("articles"),
        secondary: "Talk to us",
        secondaryGo: toContact,
        panelTitle: "Topics",
        items: cats.slice(1).map((c) => ({
          icon: "ph-hash",
          label: c,
          meta: I.filter((x) => x.category === c).length + " articles",
          href: "#/",
        })),
        panelNote: I.length + " articles · updated regularly",
      };
      cta = {
        eyebrow: "Have a question of your own?",
        l1: "Ask the people",
        acc: "who write these.",
        body: "Bring the challenge behind your reading and we’ll help you find a practical first step.",
        label: "Talk to us",
        go: toContact,
        second: "Explore services",
        secondGo: () => this.nav("Services.dc.html"),
      };
      const n = list.length,
        BP = [
          ["1 / span 7", "1 / span 2"],
          ["8 / span 5", "1"],
          ["8 / span 5", "2"],
        ];
      page = {
        isIndex: true,
        isArticle: false,
        gridCols: gridCols,
        asidePos: s.xwide ? "sticky" : "static",
        asideFlex: s.xwide ? "0 1 320px" : "1 1 100%",
        asideDisp: s.xwide ? "flex" : "grid",
        q: s.q,
        hasQ: !!s.q,
        onQ: (e) => this.setState({ q: e.target.value }),
        clearQ: () => this.setState({ q: "" }),
        clearAll: () => this.setState({ q: "", filter: "All" }),
        isFiltered: !!s.q || s.filter !== "All",
        hasResults: n > 0,
        noResults: n === 0,
        cats: cats.map((c) => {
          const on = s.filter === c;
          return {
            label: c,
            n:
              c === "All" ? I.length : I.filter((x) => x.category === c).length,
            bg: on ? "#EEE3F7" : "transparent",
            c: on ? "#28123B" : "#E9E0F0",
            nBg: on ? "#28123B1a" : "#ffffff12",
            pick: () => this.setState({ filter: c }),
          };
        }),
        pop: I.slice(0, 3).map((x, i) => ({
          n: "0" + (i + 1),
          href: "#/article/" + x.slug,
          title: x.title,
          cat: x.category,
          time: x.readingTime,
          border: i ? "1px solid #ffffff14" : "none",
        })),
        countLabel:
          n +
          (n === 1 ? " article" : " articles") +
          (s.filter !== "All" ? " in " + s.filter : "") +
          (s.q ? " for “" + s.q + "”" : ""),
        bentoCols: s.narrow ? "minmax(0,1fr)" : "repeat(12,minmax(0,1fr))",
        bento: list.map((x, i) => {
          const lead = i === 0 && n > 2,
            p = s.narrow
              ? ["auto", "auto"]
              : n === 1
                ? ["1 / -1", "auto"]
                : n === 2
                  ? [i ? "8 / span 5" : "1 / span 7", "auto"]
                  : i < 3
                    ? BP[i]
                    : [(i - 3) % 2 ? "7 / span 6" : "1 / span 6", "auto"];
          const hv = hov("b" + x.slug);
          return {
            lead: lead,
            href: "#/article/" + x.slug,
            slug: x.slug,
            image: x.image,
            category: x.category,
            time: x.readingTime,
            date: x.date,
            title: x.title,
            excerpt: x.excerpt,
            size: lead ? "clamp(24px,2.39vw,35px)" : "clamp(18px,1.42vw,21px)",
            col: p[0],
            row: p[1],
            imgT: hv.imgT,
            arrowT: hv.arrowT,
            enter: hv.enter,
            leave: hv.leave,
          };
        }),
      };
    }
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
          ["Insights", "#/"],
        ].map((x) => ({ label: x[0], href: x[1] })),
        hero: hero,
        cta: cta,
        tickerLabel: "Insights",
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
        showHero: this.state.route.view !== "index",
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
          data-screen-label={"Insights"}
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
                      className={"reference-state-246"}
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
                      className={"reference-state-247"}
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
                      className={"reference-state-248"}
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
                      className={"reference-state-249"}
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
                      className={"reference-state-250"}
                    >
                      {"About"}
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
                      className={"reference-state-251"}
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
                      className={"reference-state-252"}
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
                      className={"reference-state-253"}
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
            {v.isArticle && <ContentHeading title={v.hero} />}
            {v.isIndex && (
              <>
                <section
                  id={"articles"}
                  style={{
                    padding: "var(--section-space) 0 var(--section-space)",
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
                        marginBottom: "clamp(24px,3vh,32px)",
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
                            {"Latest thinking"}
                          </span>
                        </div>
                        <h1
                          data-reveal={"mask"}
                          data-hw={""}
                          style={{
                            fontSize: "clamp(30px,4vw,56px)",
                            lineHeight: "1.02",
                            fontWeight: "500",
                            letterSpacing: "-.045em",
                            marginTop: "22px",
                            textWrap: "balance",
                          }}
                        >
                          <span style={{ display: "block" }}>
                            <span data-line={""} style={{ display: "block" }}>
                              {"Practical notes"}
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
                              {"for better decisions."}
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
                          "Search, filter by topic, or start with a popular read. Every article links to the service that helps you act on it."
                        }
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        gap: "24px",
                      }}
                    >
                      <aside
                        data-reveal={"up"}
                        style={{
                          flex: String(v.asideFlex),
                          minWidth: "260px",
                          position: String(v.asidePos),
                          top: "104px",
                          display: String(v.asideDisp),
                          gridTemplateColumns:
                            "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                          flexDirection: "column",
                          gap: "14px",
                        }}
                      >
                        <label
                          style={{
                            gridColumn: "1 / -1",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "54px",
                            padding: "0 16px",
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
                            value={v.q}
                            onChange={v.onQ}
                            placeholder={"Search articles"}
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
                          {v.hasQ && (
                            <>
                              <button
                                onClick={v.clearQ}
                                title={"Clear search"}
                                style={{
                                  display: "grid",
                                  placeItems: "center",
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  color: "#CFC2DB",
                                }}
                                className={"reference-state-258"}
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
                            padding: "18px",
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
                              marginBottom: "8px",
                            }}
                          >
                            {"Topics"}
                          </div>
                          {(v.cats || []).map((c, cIndex) => (
                            <React.Fragment key={cIndex}>
                              <button
                                onClick={c.pick}
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  gap: "12px",
                                  padding: "11px 12px",
                                  marginTop: "2px",
                                  borderRadius: "12px",
                                  background: String(c.bg),
                                  color: String(c.c),
                                  fontSize: "15px",
                                  fontWeight: "600",
                                  textAlign: "left",
                                  transition: "background .3s",
                                }}
                                className={"reference-state-259"}
                              >
                                <span>{c.label}</span>
                                <span
                                  style={{
                                    minWidth: "28px",
                                    padding: "3px 8px",
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
                        <div
                          style={{
                            padding: "18px",
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
                              marginBottom: "4px",
                            }}
                          >
                            {"Popular reads"}
                          </div>
                          {(v.pop || []).map((p, pIndex) => (
                            <React.Fragment key={pIndex}>
                              <a
                                href={toSiteHref(p.href)}
                                style={{
                                  display: "flex",
                                  gap: "12px",
                                  padding: "14px 0",
                                  borderTop: String(p.border),
                                  color: "#F6F1FA",
                                }}
                                className={"reference-state-260"}
                              >
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    color: "#C9A0F3",
                                  }}
                                >
                                  {p.n}
                                </span>
                                <span>
                                  <span
                                    style={{
                                      display: "block",
                                      fontSize: "15px",
                                      fontWeight: "600",
                                      lineHeight: "1.35",
                                    }}
                                  >
                                    {p.title}
                                  </span>
                                  <span
                                    style={{
                                      display: "block",
                                      marginTop: "5px",
                                      fontSize: "12px",
                                      color: "#9D8BAE",
                                    }}
                                  >
                                    {p.cat + " · " + p.time}
                                  </span>
                                </span>
                              </a>
                            </React.Fragment>
                          ))}
                        </div>
                      </aside>
                      <div style={{ flex: "1 1 560px", minWidth: "0" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "16px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#B5A6C4",
                          }}
                        >
                          <span>{v.countLabel}</span>
                          {v.isFiltered && (
                            <>
                              <button
                                onClick={v.clearAll}
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  color: "#D4B7EC",
                                }}
                                className={"reference-state-261"}
                              >
                                {"Clear filters"}
                              </button>
                            </>
                          )}
                        </div>
                        {v.hasResults && (
                          <>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: String(v.bentoCols),
                                gridAutoRows: "minmax(224px,auto)",
                                gap: "14px",
                              }}
                            >
                              {(v.bento || []).map((k, kIndex) => (
                                <React.Fragment key={kIndex}>
                                  <a
                                    href={toSiteHref(k.href)}
                                    data-cursor={"Read"}
                                    onMouseEnter={k.enter}
                                    onMouseLeave={k.leave}
                                    style={{
                                      position: "relative",
                                      gridColumn: String(k.col),
                                      gridRow: String(k.row),
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      gap: "18px",
                                      padding: "22px",
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
                                    className={"reference-state-262"}
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
                                        id={"in-" + k.slug}
                                        shape={"rect"}
                                        data-src={"/assets/" + k.image}
                                        placeholder={"Article image"}
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
                                        {k.category}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "600",
                                          color: "#CFC2DB",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {k.time}
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
                                              marginTop: "12px",
                                              maxWidth: "46ch",
                                              fontSize: "15px",
                                              lineHeight: "1.6",
                                              color: "#DCD0E6",
                                            }}
                                          >
                                            {k.excerpt}
                                          </p>
                                        </>
                                      )}
                                      <span
                                        style={{
                                          marginTop: "16px",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          gap: "12px",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                          color: "#D4B7EC",
                                        }}
                                      >
                                        <span>{k.date}</span>
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
                        {v.noResults && (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "14px",
                                padding: "64px 24px",
                                borderRadius: "22px",
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
                                style={{ fontSize: "22px", fontWeight: "500" }}
                              >
                                {"No articles match"}
                              </div>
                              <p
                                style={{
                                  fontFamily: "Arial,Helvetica,sans-serif",
                                  fontSize: "15px",
                                  color: "#CFC2DB",
                                }}
                              >
                                {"Try another word or topic."}
                              </p>
                              <button
                                onClick={v.clearAll}
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
              </>
            )}
            {v.isArticle && (
              <>
                <section
                  id={"article"}
                  style={{ padding: "var(--section-space) 0" }}
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
                    <article
                      style={{
                        flex: "2 1 560px",
                        minWidth: "0",
                        maxWidth: "820px",
                      }}
                    >
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
                          {"Summary"}
                        </span>
                      </div>
                      <p
                        data-reveal={"mask"}
                        data-hw={""}
                        style={{
                          marginTop: "26px",
                          fontSize: "clamp(24px,2.39vw,37px)",
                          lineHeight: "1.25",
                          fontWeight: "500",
                          letterSpacing: "-.03em",
                          textWrap: "pretty",
                        }}
                      >
                        <span data-line={""} style={{ display: "block" }}>
                          {v.ar.excerpt}
                        </span>
                      </p>
                      <div
                        data-reveal={"clip"}
                        style={{
                          position: "relative",
                          marginTop: "36px",
                          aspectRatio: "16 / 9",
                          borderRadius: "24px",
                          overflow: "hidden",
                          background: "#1C1029",
                          color: "#D4B7EC",
                        }}
                      >
                        <image-slot
                          id={"in-" + v.ar.slug + "-cover"}
                          shape={"rect"}
                          data-src={"/assets/" + v.ar.image}
                          placeholder={"Article cover image"}
                          style={{
                            position: "absolute",
                            inset: "0",
                            width: "100%",
                            height: "100%",
                          }}
                        ></image-slot>
                      </div>
                      <div
                        data-reveal={"up"}
                        style={{
                          marginTop: "36px",
                          padding: "24px 26px",
                          borderRadius: "22px",
                          background: "#190B25",
                          border: "1px solid #ffffff17",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "#C9A0F3",
                          }}
                        >
                          {"Key takeaways"}
                        </div>
                        {(v.ar.takeaways || []).map((tk, tkIndex) => (
                          <React.Fragment key={tkIndex}>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "12px",
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "1.5",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{
                                  color: "#D4B7EC",
                                  marginTop: "3px",
                                  flexShrink: "0",
                                }}
                                className={"ph-fill ph-check-circle"}
                              ></i>
                              {tk}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                      {(v.ar.body || []).map((sec, secIndex) => (
                        <React.Fragment key={secIndex}>
                          <div data-reveal={"up"} style={{ marginTop: "44px" }}>
                            <h3
                              data-hw={""}
                              style={{
                                fontSize: "clamp(22px,2.02vw,29px)",
                                lineHeight: "1.15",
                                fontWeight: "500",
                                letterSpacing: "-.03em",
                              }}
                            >
                              {sec.h}
                            </h3>
                            {(sec.p || []).map((pp, ppIndex) => (
                              <React.Fragment key={ppIndex}>
                                <p
                                  style={{
                                    fontFamily: "Arial,Helvetica,sans-serif",
                                    marginTop: "14px",
                                    fontSize: "17px",
                                    lineHeight: "1.75",
                                    color: "#DCD0E6",
                                  }}
                                >
                                  {pp}
                                </p>
                              </React.Fragment>
                            ))}
                          </div>
                        </React.Fragment>
                      ))}
                    </article>
                    <aside
                      data-reveal={"up"}
                      style={{
                        flex: "1 1 300px",
                        position: "sticky",
                        top: "104px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          padding: "26px",
                          borderRadius: "24px",
                          background: "#190B25",
                          border: "1px solid #ffffff17",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "#C9A0F3",
                          }}
                        >
                          {"Put it into practice"}
                        </div>
                        <div
                          data-hw={""}
                          style={{
                            marginTop: "12px",
                            fontSize: "22px",
                            lineHeight: "1.15",
                            fontWeight: "500",
                            letterSpacing: "-.03em",
                          }}
                        >
                          {v.ar.svcTitle}
                        </div>
                        <p
                          style={{
                            fontFamily: "Arial,Helvetica,sans-serif",
                            marginTop: "10px",
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "#CFC2DB",
                          }}
                        >
                          {v.ar.svcBody}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "10px",
                            marginTop: "20px",
                          }}
                        >
                          <a
                            href={toSiteHref(v.ar.svcHref)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "7px 7px 7px 18px",
                              borderRadius: "999px",
                              background: "#EEE3F7",
                              color: "#28123B",
                              fontSize: "14px",
                              fontWeight: "600",
                              whiteSpace: "nowrap",
                              transition:
                                "transform .45s cubic-bezier(.22,1,.36,1)",
                            }}
                            className={"reference-state-263"}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              {"Explore " + v.ar.svcShort}
                            </span>
                            <span
                              style={{
                                display: "grid",
                                placeItems: "center",
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                background: "#28123B",
                                color: "#EEE3F7",
                              }}
                            >
                              <i
                                aria-hidden={true}
                                style={{ fontSize: "15px" }}
                                className={"ph ph-arrow-up-right"}
                              ></i>
                            </span>
                          </a>
                          <a
                            href={toSiteHref("Contact.dc.html")}
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#D4B7EC",
                            }}
                            className={"reference-state-264"}
                          >
                            {"Or talk to us →"}
                          </a>
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "22px 26px",
                          borderRadius: "24px",
                          border: "1px solid #ffffff17",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            color: "#9D8BAE",
                          }}
                        >
                          {"Details"}
                        </div>
                        {(v.ar.meta || []).map((m, mIndex) => (
                          <React.Fragment key={mIndex}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "12px",
                                padding: "12px 0",
                                borderTop: "1px solid #ffffff14",
                                marginTop: "12px",
                                fontSize: "14px",
                              }}
                            >
                              <span style={{ color: "#B5A6C4" }}>{m.k}</span>
                              <span style={{ fontWeight: "600" }}>{m.v}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </aside>
                  </div>
                </section>
                <section
                  style={{
                    padding: "var(--section-space) 0",
                    borderTop: "1px solid #ffffff12",
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
                        marginBottom: "clamp(24px,3vh,32px)",
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
                            {"Keep reading"}
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
                              {"More ideas"}
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
                              {"worth your time."}
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
                          "Two more notes from the studio, picked from the same discipline first."
                        }
                      </p>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: String(v.gridCols),
                        gap: "16px",
                      }}
                    >
                      {(v.related || []).map((a, aIndex) => (
                        <React.Fragment key={aIndex}>
                          <a
                            href={toSiteHref(a.href)}
                            data-reveal={"up"}
                            data-cursor={"Read"}
                            onMouseEnter={a.enter}
                            onMouseLeave={a.leave}
                            style={{
                              display: "grid",
                              gridTemplateColumns: String(a.cols),
                              alignItems: "stretch",
                              gap: "0",
                              borderRadius: "24px",
                              overflow: "hidden",
                              border: "1px solid #ffffff17",
                              background:
                                "linear-gradient(160deg,#1A0D27,#120A1B)",
                              color: "#F6F1FA",
                              transition:
                                "border-color .4s, transform .6s cubic-bezier(.22,1,.36,1)",
                            }}
                            className={"reference-state-265"}
                          >
                            <div
                              style={{
                                position: "relative",
                                minHeight: String(a.imgH),
                                overflow: "hidden",
                                color: "#D4B7EC",
                              }}
                            >
                              <image-slot
                                id={"in-" + a.slug}
                                shape={"rect"}
                                data-src={"/assets/" + a.image}
                                placeholder={"Article image"}
                                style={{
                                  position: "absolute",
                                  inset: "0",
                                  width: "100%",
                                  height: "100%",
                                  transform: String(a.imgT),
                                  transition:
                                    "transform 1.4s cubic-bezier(.22,1,.36,1)",
                                }}
                              ></image-slot>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                padding: "clamp(20px,2.2vw,30px)",
                                pointerEvents: "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  alignItems: "center",
                                  gap: "8px 12px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: "#B5A6C4",
                                }}
                              >
                                <span
                                  style={{
                                    padding: "5px 10px",
                                    borderRadius: "999px",
                                    background: "#EEE3F7",
                                    color: "#28123B",
                                    letterSpacing: ".04em",
                                  }}
                                >
                                  {a.category}
                                </span>
                                <span>{a.date}</span>
                                <span>{"· " + a.time}</span>
                              </div>
                              <h3
                                data-hw={""}
                                style={{
                                  fontSize: String(a.size),
                                  lineHeight: "1.12",
                                  fontWeight: "500",
                                  letterSpacing: "-.03em",
                                  textWrap: "balance",
                                }}
                              >
                                {a.title}
                              </h3>
                              <p
                                style={{
                                  fontFamily: "Arial,Helvetica,sans-serif",
                                  fontSize: "15px",
                                  lineHeight: "1.6",
                                  color: "#CFC2DB",
                                }}
                              >
                                {a.excerpt}
                              </p>
                              <span
                                style={{
                                  marginTop: "auto",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  color: "#D4B7EC",
                                }}
                              >
                                {"Read article "}
                                <i
                                  aria-hidden={true}
                                  style={{
                                    transform: String(a.arrowX),
                                    transition: "transform .4s",
                                  }}
                                  className={"ph ph-arrow-right"}
                                ></i>
                              </span>
                            </div>
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}
            <section
              id={"closing"}
              ref={v.closingRef}
              onMouseMove={v.closingMove}
              onMouseLeave={v.closingLeave}
              style={{
                position: "relative",
                overflow: "clip",
                isolation: "isolate",
                padding: "var(--section-space) 0",
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
                    fontSize: "var(--section-title-size)",
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
                    className={"reference-state-266"}
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
                    className={"reference-state-267"}
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
                  className={"reference-state-268"}
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
                  className={"reference-state-269"}
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
                        className={"reference-state-270"}
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
                        className={"reference-state-271"}
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
                      className={"reference-state-272"}
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
                  className={"reference-state-273 reference-state-274"}
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

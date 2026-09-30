export const SERVICE_FAMILIES = [
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
        outcome: "Build an identity that stays coherent as the business grows.",
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
        outcome: "Build a social presence people recognize and want to follow.",
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

// Keep cart details and service package cards on the same published scope.
export function getServicePlanFeatures(plan, capabilities) {
  switch (plan.toLowerCase()) {
    case "focus":
      return [
        capabilities[0],
        "Clear brief and success criteria",
        "Defined delivery window",
      ];
    case "connected":
      return capabilities.slice(0, 3).concat("One connected delivery roadmap");
    case "partnership":
      return capabilities
        .slice(0, 3)
        .concat("Ongoing support rhythm", "Improvement roadmap");
    default:
      return [...capabilities];
  }
}

// Resolve by the saved selection ID so existing carts gain details immediately.
export function getServiceFeatures(selectionId, plan = "") {
  const family = SERVICE_FAMILIES.find((entry) => entry.slug === selectionId);
  if (family) {
    return getServicePlanFeatures(
      plan,
      family.children.map((entry) => entry.name),
    );
  }
  for (const entry of SERVICE_FAMILIES) {
    const service = entry.children.find(
      (child) => `${entry.slug}/${child.slug}` === selectionId,
    );
    if (service) return getServicePlanFeatures(plan, service.capabilities);
  }
  return [];
}

import {
  UsersThree,
  ChartLineUp,
  FolderSimple,
  CheckSquare,
  Megaphone,
  Browser,
  Palette,
  Code,
  Lifebuoy,
  HardDrives,
} from "@phosphor-icons/react";

export const modules = [
  {
    id: "hr",
    name: "People",
    formal: "HR",
    icon: UsersThree,
    title: "A little less admin. A lot more human.",
    short: "Bring your people and their work together.",
    description:
      "Give people, documents, and everyday processes a clearer place in your business.",
    tasks: ["People & teams", "Leave & onboarding", "Employee documents"],
    category: "Operations",
    number: "01",
    monthlyPrice: 39,
    image: "brand-phone.webp",
    highlights: [
      {
        title: "One people directory",
        body: "Keep roles, teams, contacts, and essential employee information easy to understand.",
      },
      {
        title: "Guided people moments",
        body: "Turn onboarding, leave, and recurring HR requests into clear repeatable flows.",
      },
      {
        title: "Documents with context",
        body: "Connect employee records to the people and decisions they belong to.",
      },
    ],
    useCases: [
      {
        title: "Welcome a new teammate",
        body: "Create the profile, assign the onboarding checklist, and keep the right documents together.",
      },
      {
        title: "Coordinate leave",
        body: "Collect a request, make the decision visible, and keep the team calendar current.",
      },
      {
        title: "Answer a people question",
        body: "Move from the employee record to the policy or document without losing the context.",
      },
    ],
    testimonials: [
      {
        focus: "HR · Onboarding",
        quote:
          "A future client story about giving every new teammate a calmer, clearer first week.",
      },
      {
        focus: "HR · Leave",
        quote:
          "A future client perspective on replacing scattered leave messages with one visible flow.",
      },
      {
        focus: "HR · Team visibility",
        quote:
          "A future client story about keeping people information useful without adding more admin.",
      },
    ],
  },
  {
    id: "crm",
    name: "Relationships",
    formal: "CRM",
    icon: ChartLineUp,
    title: "Make the next conversation count.",
    short: "Keep relationships moving forward.",
    description:
      "Organize contacts, understand opportunities, and keep the next action in view.",
    tasks: [
      "Contacts & companies",
      "Pipeline visibility",
      "Follow-ups & activities",
    ],
    category: "Growth",
    number: "02",
    monthlyPrice: 49,
    image: "brand-glass.webp",
    highlights: [
      {
        title: "A shared customer picture",
        body: "Bring contacts, companies, conversations, and ownership into one clear relationship view.",
      },
      {
        title: "A pipeline people can read",
        body: "See opportunity stage, value, confidence, and the next action without reconstructing the story.",
      },
      {
        title: "Follow-ups that stay visible",
        body: "Keep the next conversation connected to the relationship that made it necessary.",
      },
    ],
    useCases: [
      {
        title: "Qualify a new lead",
        body: "Capture the relationship, decide its stage, and assign the next useful action.",
      },
      {
        title: "Review the pipeline",
        body: "Compare active opportunities and focus the team on work that needs attention.",
      },
      {
        title: "Prepare a follow-up",
        body: "Read the recent context, confirm the owner, and schedule the next conversation.",
      },
    ],
    testimonials: [
      {
        focus: "CRM · Pipeline",
        quote:
          "A future client story about seeing the next commercial decision without rebuilding the pipeline.",
      },
      {
        focus: "CRM · Relationships",
        quote:
          "A future client perspective on giving every customer conversation the context it needs.",
      },
      {
        focus: "CRM · Follow-up",
        quote:
          "A future client story about making timely follow-ups part of the team’s normal rhythm.",
      },
    ],
  },
  {
    id: "files",
    name: "Files",
    formal: "Files",
    icon: FolderSimple,
    title: "Find the file. Keep the flow.",
    short: "Give your business knowledge a home.",
    description:
      "Bring the documents that matter into a clear, shared structure your team can understand.",
    tasks: [
      "Folders & organization",
      "Document discovery",
      "Sharing workflows",
    ],
    category: "Operations",
    number: "03",
    monthlyPrice: 19,
    image: "brand-cards.webp",
    highlights: [
      {
        title: "A structure people recognize",
        body: "Create a shared filing pattern that reflects how the business actually works.",
      },
      {
        title: "Faster document discovery",
        body: "Use clear labels and useful context to reduce the time spent searching and asking.",
      },
      {
        title: "Sharing with purpose",
        body: "Keep documents connected to the team, project, or customer moment that needs them.",
      },
    ],
    useCases: [
      {
        title: "Build a shared library",
        body: "Turn scattered business documents into a structure the whole team can navigate.",
      },
      {
        title: "Find the current file",
        body: "Use the folder, label, and owner context to reach the right version quickly.",
      },
      {
        title: "Hand work to another team",
        body: "Share the document with its purpose, status, and next action already attached.",
      },
    ],
    testimonials: [
      {
        focus: "Files · Discovery",
        quote:
          "A future client story about finding the current document without asking three different people.",
      },
      {
        focus: "Files · Structure",
        quote:
          "A future client perspective on giving years of business knowledge one understandable home.",
      },
      {
        focus: "Files · Handoffs",
        quote:
          "A future client story about sharing work with enough context for the next team to continue.",
      },
    ],
  },
  {
    id: "tasks",
    name: "Work",
    formal: "Tasks",
    icon: CheckSquare,
    title: "From a good idea to a job well done.",
    short: "Turn priorities into progress.",
    description:
      "Connect projects, people, and next steps so everyone can see what moves the work forward.",
    tasks: [
      "Project planning",
      "Ownership & priorities",
      "Progress visibility",
    ],
    category: "Operations",
    number: "04",
    monthlyPrice: 25,
    image: "brand-tablet.webp",
    highlights: [
      {
        title: "Priorities in one view",
        body: "Connect projects, milestones, and daily actions without turning the workspace into noise.",
      },
      {
        title: "Ownership people can see",
        body: "Make every next step clear with an owner, status, and useful deadline.",
      },
      {
        title: "Progress with context",
        body: "Review what moved, what is blocked, and what decision will unlock the next stage.",
      },
    ],
    useCases: [
      {
        title: "Plan a new project",
        body: "Define the outcome, organize the milestones, and give the first actions clear owners.",
      },
      {
        title: "Run a weekly review",
        body: "Scan priorities, unblock stalled work, and agree what the team moves next.",
      },
      {
        title: "Hand off completed work",
        body: "Close the task with its files, decisions, and follow-on action still connected.",
      },
    ],
    testimonials: [
      {
        focus: "Tasks · Planning",
        quote:
          "A future client story about turning an ambitious project into a sequence the team could act on.",
      },
      {
        focus: "Tasks · Ownership",
        quote:
          "A future client perspective on making responsibility visible without adding meetings.",
      },
      {
        focus: "Tasks · Progress",
        quote:
          "A future client story about spotting blocked work early enough to keep momentum.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    formal: "Marketing",
    icon: Megaphone,
    title: "Give every campaign a direction.",
    short: "Make your next move more intentional.",
    description:
      "Bring campaign plans, content, and customer activity into a more considered marketing workflow.",
    tasks: ["Campaign planning", "Content calendar", "Performance overview"],
    category: "Growth",
    number: "05",
    monthlyPrice: 35,
    image: "brand-glass.webp",
    highlights: [
      {
        title: "Campaigns with a clear brief",
        body: "Connect the audience, message, channel, owner, and intended outcome before production begins.",
      },
      {
        title: "A useful content rhythm",
        body: "Plan, review, and publish content through one shared calendar and approval flow.",
      },
      {
        title: "Performance in context",
        body: "Relate campaign activity to the goal and decision it should inform next.",
      },
    ],
    useCases: [
      {
        title: "Shape a campaign",
        body: "Turn the business goal into an audience, message, channel mix, and delivery plan.",
      },
      {
        title: "Run the content calendar",
        body: "Coordinate briefs, production, approvals, and publishing across the team.",
      },
      {
        title: "Review what worked",
        body: "Bring the result back to the original goal and choose the next experiment.",
      },
    ],
    testimonials: [
      {
        focus: "Marketing · Campaigns",
        quote:
          "A future client story about giving every campaign one clear brief and accountable owner.",
      },
      {
        focus: "Marketing · Content",
        quote:
          "A future client perspective on moving from an improvised calendar to a dependable rhythm.",
      },
      {
        focus: "Marketing · Learning",
        quote:
          "A future client story about turning performance signals into a more confident next move.",
      },
    ],
  },
  {
    id: "website",
    name: "Website",
    formal: "Website Manager",
    icon: Browser,
    title: "Keep your digital front door open.",
    short: "Make your website easier to manage.",
    description:
      "See content, requests, and website priorities together, with a clearer path from update to action.",
    tasks: ["Content management", "Website requests", "Maintenance overview"],
    category: "Growth",
    number: "06",
    monthlyPrice: 29,
    image: "brand-tablet.webp",
    highlights: [
      {
        title: "Content changes in one queue",
        body: "Collect requests with the page, priority, owner, and approval context already attached.",
      },
      {
        title: "A visible publishing flow",
        body: "Move updates from request to review and release without losing the reason behind them.",
      },
      {
        title: "Maintenance people understand",
        body: "Keep routine checks, technical work, and improvement ideas visible in one operating view.",
      },
    ],
    useCases: [
      {
        title: "Request a page update",
        body: "Capture the change, reference the right page, and route it to the correct owner.",
      },
      {
        title: "Prepare a release",
        body: "Review content, approvals, dependencies, and publishing status in one sequence.",
      },
      {
        title: "Plan website care",
        body: "Organize maintenance, quality checks, and improvement work around business priorities.",
      },
    ],
    testimonials: [
      {
        focus: "Website · Updates",
        quote:
          "A future client story about making content requests clear before they reached production.",
      },
      {
        focus: "Website · Publishing",
        quote:
          "A future client perspective on knowing exactly what was ready to review and release.",
      },
      {
        focus: "Website · Care",
        quote:
          "A future client story about moving website maintenance into a visible, reliable rhythm.",
      },
    ],
  },
];

export const services = [
  {
    title: "Brand & digital design",
    category: "Make it matter",
    icon: Palette,
    text: "From the first impression to the smallest interaction. Identity and experiences built around your audience.",
    tags: ["Brand systems", "Visual identity", "UI/UX design"],
    image: "brand-cards.webp",
    imageAlt: "OrgTik identity applied to a premium business card system",
    caption: "Identity systems, made tangible",
    index: "01",
  },
  {
    title: "Web & app development",
    category: "Make it work",
    icon: Code,
    text: "Translate an ambitious idea into a considered digital experience. Websites and applications with a purpose.",
    tags: ["Web platforms", "Applications", "E-commerce"],
    image: "brand-tablet.webp",
    imageAlt: "OrgTik digital identity displayed on a tablet",
    caption: "Digital experiences with a clear purpose",
    index: "02",
  },
  {
    title: "Marketing & growth",
    category: "Make it move",
    icon: Megaphone,
    text: "Connect your story with the people who need to hear it. A clearer strategy for meaningful attention.",
    tags: ["Campaign strategy", "Search", "Content systems"],
    image: "brand-glass.webp",
    imageAlt: "The OrgTik mark suspended in a sculptural glass form",
    caption: "Attention shaped around a stronger story",
    index: "03",
  },
  {
    title: "IT & ongoing support",
    category: "Keep it moving",
    icon: Lifebuoy,
    text: "A dependable partner for the work after launch. Keep improving the systems your business relies on.",
    tags: ["Website care", "Technical support", "Improvements"],
    image: "brand-phone.webp",
    imageAlt: "OrgTik identity displayed on a mobile device",
    caption: "Ongoing care for the systems behind the work",
    index: "04",
  },
  {
    title: "OrgTik hosting",
    category: "Keep it online",
    icon: HardDrives,
    text: "Reliable hosting shaped for your website, with the performance, monitoring, backups, and support it needs to stay ready.",
    tags: ["Managed hosting", "Monitoring & backups", "Performance care"],
    image: "brand-glass.webp",
    imageAlt: "The OrgTik mark suspended in a sculptural glass form",
    caption: "A dependable home for your digital presence",
    index: "05",
  },
];

export const steps = [
  [
    "Understand",
    "Start with the right questions.",
    "Your business, your people, and what needs to work better.",
  ],
  [
    "Design",
    "Make the way forward clear.",
    "A shared direction, a considered experience, and a practical plan.",
  ],
  [
    "Deliver",
    "Bring the details together.",
    "Design and technology shaped into something people can use.",
  ],
  [
    "Evolve",
    "Keep making it better.",
    "Learn from the work, respond to change, and build on what matters.",
  ],
];

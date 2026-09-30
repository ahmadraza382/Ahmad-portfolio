// ============================================================
// Service pages — single source of truth for /services/*.
//
// One typed entry per service. The page shell at
// app/services/[slug]/page.tsx renders every entry with the same
// section components, so all six pages stay one cohesive design
// instead of six separate templates.
//
// All content here is REAL. Project references point at slugs in
// lib/data.ts — no invented clients, metrics or testimonials.
// ============================================================

export interface ServiceOffering {
  title: string;
  desc: string;
  /** Icon key — resolved to an inline SVG in components/services/ServiceIcon.tsx */
  icon: IconKey;
}

export interface ServiceStep {
  no: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceContent {
  /** URL segment — /services/<slug> */
  slug: string;
  /** Short label used in nav, breadcrumbs and cross-links. */
  name: string;
  /** Page <h1>. Split so the last word can be gold, matching the site's headings. */
  h1: string;
  h1Accent: string;
  /** Eyebrow pill above the H1. */
  badge: string;
  /** Hero paragraph — the value proposition, 2 sentences max. */
  tagline: string;
  /** Three short hero proof chips (capability statements, not metrics). */
  heroChips: string[];

  /** SEO */
  seoTitle: string;
  seoDescription: string;
  /** Keywords steer nothing on their own — used for the OG/Twitter description tone only. */
  ogDescription: string;

  /** Overview section */
  overviewHeading: string;
  overviewAccent: string;
  overviewBody: string[];
  /** "Good fit if…" bullets — who the service is for. */
  goodFit: string[];
  /**
   * Contextual closing line for the overview, with one in-body internal link.
   * `linkSlug` is a service slug or a site path; `linkText` is the anchor.
   */
  overviewLink: { before: string; linkText: string; href: string; after: string };

  /** What I offer */
  offerings: ServiceOffering[];


  /** Process — six steps, matching the home page's process language. */
  process: ServiceStep[];

  /** Why work with me — service-specific angles on the site's existing values. */
  reasons: { title: string; desc: string }[];

  /** Slugs from lib/data.ts PROJECTS that are genuinely relevant to this service. */
  projectSlugs: string[];

  faqs: ServiceFaq[];

  /** Final CTA copy. */
  ctaHeading: string;
  ctaAccent: string;
  ctaBody: string;

  /** Related services shown at the foot of the page (internal linking). */
  related: string[];
}

export type IconKey =
  | "browser"
  | "layers"
  | "cart"
  | "cloud"
  | "plug"
  | "gauge"
  | "phone"
  | "store"
  | "bell"
  | "sync"
  | "brain"
  | "chat"
  | "search"
  | "doc"
  | "workflow"
  | "chart"
  | "database"
  | "shield"
  | "desktop"
  | "link"
  | "graph"
  | "pin"
  | "pen"
  | "grid"
  | "wand"
  | "accessibility"
  | "handoff"
  | "flask";

// ------------------------------------------------------------
// Shared process wording. Each service overrides the descriptions
// so the steps stay specific rather than generic filler.
// ------------------------------------------------------------
const STEP_TITLES = [
  "Discovery",
  "Planning",
  "Design",
  "Development",
  "Testing",
  "Launch",
] as const;

function steps(descs: [string, string, string, string, string, string]): ServiceStep[] {
  return STEP_TITLES.map((title, i) => ({
    no: String(i + 1).padStart(2, "0"),
    title,
    desc: descs[i],
  }));
}

export const SERVICE_PAGES: ServiceContent[] = [
  // ==========================================================
  // 1. WEB DEVELOPMENT
  // ==========================================================
  {
    slug: "web-development",
    name: "Web Development",
    h1: "Web Development That Earns Its",
    h1Accent: "Keep",
    badge: "Web Development",
    tagline:
      "Fast, accessible websites and web applications built with React, Next.js and TypeScript — designed around what your business actually needs visitors to do.",
    heroChips: ["Next.js & TypeScript", "Mobile-first builds", "Built to scale"],

    seoTitle: "Web Development Services | React & Next.js Developer",
    seoDescription:
      "Web development by Ahmad Raza — business websites, web apps, e-commerce and SaaS platforms built with React, Next.js and TypeScript. Pakistan and worldwide.",
    ogDescription:
      "Business websites, web apps, online stores and SaaS platforms built end to end with React, Next.js and TypeScript.",

    overviewHeading: "Websites that do a",
    overviewAccent: "job",
    overviewBody: [
      "Most business websites are brochures that nobody reads. The ones that work are built around a single decision: what should a visitor do here, and what is stopping them? I start there, then build the site to make that path obvious and fast.",
      "That means real engineering underneath — server-rendered pages so Google can index them, sensible data models so content is easy to edit, and a codebase you or another developer can pick up later without a rewrite.",
    ],
    goodFit: [
      "You need a site that ranks and converts, not just one that exists",
      "Your current site is slow, dated, or painful to update",
      "You're launching a product and need the marketing site and app to match",
      "You want one developer accountable for the whole build",
    ],
    overviewLink: {
      before: "If the site also needs to be found on Google, that's ",
      linkText: "technical SEO work",
      href: "/services/seo",
      after: " — and it's much cheaper to build in now than to retrofit later.",
    },

    offerings: [
      {
        title: "Business Websites",
        desc: "Marketing sites that load fast, read well on a phone, and give you a CMS you can actually use to edit content.",
        icon: "browser",
      },
      {
        title: "Web Applications",
        desc: "Dashboards, portals and internal tools with authentication, role-based access and real data behind them.",
        icon: "layers",
      },
      {
        title: "E-commerce Websites",
        desc: "Storefronts with cart, checkout, payments and inventory — custom-built or on Shopify, depending on what fits.",
        icon: "cart",
      },
      {
        title: "SaaS Platforms",
        desc: "Subscription products end to end: sign-ups, billing, usage limits, customer dashboards and an admin back office.",
        icon: "cloud",
      },
      {
        title: "API Integrations",
        desc: "Connecting payments, CRMs, email and third-party services so your systems talk to each other without manual work.",
        icon: "plug",
      },
      {
        title: "Performance & Rebuilds",
        desc: "Taking a slow or legacy site and rebuilding it on a modern stack, keeping your content and search rankings intact.",
        icon: "gauge",
      },
    ],


    process: steps([
      "We talk through your goals, audience and budget, and agree what the site has to achieve before any design starts.",
      "I map the pages, content and data model, then give you a scope with a timeline and a fixed price.",
      "Wireframes and UI designs first, so you see exactly how it will look and can change things while it's still cheap.",
      "Frontend and backend built in reviewable milestones — you get a working link you can click through as it grows.",
      "Cross-browser and cross-device testing, performance checks, and the edge cases: empty states, errors, slow networks.",
      "Domain, hosting, SSL and analytics set up, then a handover walkthrough so you know how to run it.",
    ]),

    reasons: [
      {
        title: "One person accountable",
        desc: "Database to interface, I handle the whole stack myself. No handoffs between agencies, no gaps where things get lost.",
      },
      {
        title: "Built to be maintained",
        desc: "Typed, structured code with real conventions. If you hire another developer in two years, they can read it.",
      },
      {
        title: "Performance from the start",
        desc: "Server rendering, image optimisation and sensible bundles are part of the build, not a cleanup task afterwards.",
      },
      {
        title: "Straight answers on time and cost",
        desc: "If something will take three weeks, I say three weeks. If a feature isn't worth building, I'll tell you that too.",
      },
      {
        title: "Responsive by default",
        desc: "Every layout is designed mobile-first and tested on real screen sizes, not just resized in a browser.",
      },
      {
        title: "Remote, worldwide",
        desc: "I work with clients across time zones with clear written updates, so you always know where the project stands.",
      },
    ],

    projectSlugs: ["linkshort", "college-management-system", "luxeurs", "ar-hospitals"],

    faqs: [
      {
        q: "How much does a website cost?",
        a: "It depends on scope — a marketing site with a handful of pages is very different from a web app with accounts and payments. After a short call I give you a fixed price for an agreed scope, so there are no surprises mid-build.",
      },
      {
        q: "How long will my website take?",
        a: "A straightforward business site is usually a few weeks. Web applications and SaaS products take longer because of the backend work. You get an estimate with the scope, and milestone updates so you can see progress.",
      },
      {
        q: "Do you design the site as well, or do I need a designer?",
        a: "I can handle both. If you already have designs or a brand kit, I'll build to them. If not, I do wireframes and UI design as part of the project so you approve the look before development starts.",
      },
      {
        q: "Will I be able to update the content myself?",
        a: "Yes. Where it makes sense I build a simple admin area or wire up a CMS so you can edit text, images and posts without touching code. I walk you through it at handover.",
      },
      {
        q: "What happens after launch?",
        a: "You own the code and the accounts. I offer ongoing support and maintenance if you want it — fixes, improvements and updates — but you're never locked in.",
      },
      {
        q: "Can you rebuild my existing WordPress site?",
        a: "Yes, and it's a common request. I've migrated sites from WordPress to modern stacks before, keeping the content and URL structure so existing search rankings carry over.",
      },
    ],

    ctaHeading: "Have a website in",
    ctaAccent: "mind?",
    ctaBody:
      "Tell me what you're building and what it needs to do. I'll come back with an honest scope, a timeline and a price — no obligation.",

    related: ["ui-ux-design", "seo", "custom-software-development"],
  },

  // ==========================================================
  // 2. MOBILE APP DEVELOPMENT
  // ==========================================================
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    h1: "Mobile Apps For Android &",
    h1Accent: "iOS",
    badge: "Mobile Apps",
    tagline:
      "Cross-platform apps built with React Native — one codebase, both app stores, a native feel, and a build that's realistic to maintain on a small team's budget.",
    heroChips: ["React Native", "iOS & Android", "One codebase"],

    seoTitle: "Mobile App Development | React Native Developer",
    seoDescription:
      "React Native app development by Ahmad Raza — cross-platform iOS and Android apps with offline support, push notifications and app store launch. Worldwide.",
    ogDescription:
      "Cross-platform iOS and Android apps built with React Native — one codebase, both stores, easier to maintain.",

    overviewHeading: "One codebase, both",
    overviewAccent: "stores",
    overviewBody: [
      "Building separate native apps for iOS and Android means two codebases, two sets of bugs and roughly twice the budget. For most products that trade-off isn't worth it. React Native gives you one codebase that ships to both stores and still feels native to use.",
      "The parts that usually go wrong in mobile aren't the screens — they're offline behaviour, background sync, push notifications and the app store review process. Those are planned into the build from the start, not bolted on when the deadline is close.",
    ],
    goodFit: [
      "You need to be on both iOS and Android without doubling the budget",
      "You're validating a product idea and need to ship a real app, not a prototype",
      "You have a web platform and want a mobile companion that shares the same backend",
      "Your team needs an internal app for staff, field work or logistics",
    ],
    overviewLink: {
      before: "Most app projects need a backend too. If yours doesn't have one yet, that's ",
      linkText: "part of the web development work",
      href: "/services/web-development",
      after: " and can be built alongside the app so both share the same data.",
    },

    offerings: [
      {
        title: "Cross-Platform Apps",
        desc: "A single React Native codebase that ships to the App Store and Google Play, with platform-specific behaviour where it matters.",
        icon: "phone",
      },
      {
        title: "App Store Deployment",
        desc: "Builds, signing, store listings and the review process handled — including the rejections that usually catch first-time publishers.",
        icon: "store",
      },
      {
        title: "Push Notifications",
        desc: "Targeted notifications wired to real events in your product, with permission handling that doesn't annoy users into disabling them.",
        icon: "bell",
      },
      {
        title: "Offline & Sync",
        desc: "Apps that keep working without a connection and reconcile cleanly when it comes back, instead of showing an error screen.",
        icon: "sync",
      },
      {
        title: "API & Backend Integration",
        desc: "Connecting the app to your existing backend, or building one — authentication, data sync and secure storage included.",
        icon: "plug",
      },
      {
        title: "Ongoing Maintenance",
        desc: "OS updates, library upgrades and store policy changes handled so the app keeps working as iOS and Android move on.",
        icon: "gauge",
      },
    ],


    process: steps([
      "We define what the app is for, which platforms you need, and which features belong in version one versus later.",
      "Screens and user flows mapped out, plus the technical plan: backend, data sync, notifications and store requirements.",
      "Mobile-first UI designs covering the real states — loading, empty, error and offline — not just the happy path.",
      "The app built in React Native against your backend, with test builds you can install on your own phone as it progresses.",
      "Testing on physical iOS and Android devices across screen sizes, plus permissions, deep links and offline behaviour.",
      "Store listings, builds and submission to the App Store and Google Play, with the review process handled end to end.",
    ]),

    reasons: [
      {
        title: "Realistic scope for version one",
        desc: "I'll tell you which features to cut from the first release. Shipping something people can use beats a perfect app that never launches.",
      },
      {
        title: "Native feel, shared code",
        desc: "Platform conventions respected — navigation, gestures and typography that feel right on each OS, from one codebase.",
      },
      {
        title: "The store process handled",
        desc: "Signing, provisioning, listings and review rejections are part of the job. You don't need to learn Apple's rules.",
      },
      {
        title: "Backend included if you need it",
        desc: "I build full-stack, so the API, database and authentication your app needs can come from the same project.",
      },
      {
        title: "Tested on real devices",
        desc: "Simulators hide problems. Builds go onto actual phones before anything is called finished.",
      },
      {
        title: "Clear communication",
        desc: "Written updates at each milestone and an installable build you can try, so progress is something you can hold, not a status report.",
      },
    ],

    projectSlugs: ["linkshort", "described-ai"],

    faqs: [
      {
        q: "Should I build native or cross-platform?",
        a: "For most business apps, React Native is the better trade-off — one codebase, both stores, lower cost to build and maintain. Fully native makes sense if you need heavy graphics, deep hardware access or platform-specific features that dominate the app. I'll tell you honestly which situation you're in.",
      },
      {
        q: "Do you publish the app to the App Store and Google Play for me?",
        a: "Yes. Builds, signing certificates, store listings and submission are part of the project. You keep ownership of the developer accounts.",
      },
      {
        q: "How long does a mobile app take to build?",
        a: "A focused first version is typically several weeks depending on features and whether a backend needs building too. You get a scope and timeline before we start, and the store review adds a few days at the end.",
      },
      {
        q: "Can the app work with my existing website or backend?",
        a: "Usually yes. If your site already has an API I'll connect to it. If not, I can build one that both the app and the website use, so data stays in one place.",
      },
      {
        q: "What does it cost to maintain an app after launch?",
        a: "Apps need periodic updates as iOS and Android release new versions and store policies change. I can handle that on an ongoing basis, or hand over documentation so your own team can.",
      },
      {
        q: "Do I own the source code?",
        a: "Yes. The code, the accounts and the app are yours. I don't build on anything that locks you into working with me.",
      },
    ],

    ctaHeading: "Ready to build your",
    ctaAccent: "app?",
    ctaBody:
      "Tell me what the app needs to do and who it's for. I'll come back with a realistic first-version scope, a timeline and a price.",

    related: ["web-development", "ui-ux-design", "custom-software-development"],
  },

  // ==========================================================
  // 3. AI SOLUTIONS
  // ==========================================================
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    h1: "AI That Solves A Real",
    h1Accent: "Problem",
    badge: "AI Solutions",
    tagline:
      "Practical AI built into your product or workflow — chatbots, document processing and automation that save real hours, not demos that impress once and get switched off.",
    heroChips: ["LLM integration", "Chatbots & assistants", "Workflow automation"],

    seoTitle: "AI Solutions & Integration Services | AI Developer",
    seoDescription:
      "AI solutions by Ahmad Raza — AI chatbots, document processing, LLM integration and workflow automation built into real products. Pakistan and worldwide.",
    ogDescription:
      "AI chatbots, document processing and workflow automation built into real products — practical, measurable, and maintainable.",

    overviewHeading: "AI where it actually",
    overviewAccent: "pays",
    overviewBody: [
      "Adding AI to a product is easy. Adding it somewhere that saves money or time is the harder part. I start by finding the task in your business that is repetitive, text-heavy and currently done by a person — that's usually where an AI feature pays for itself.",
      "From there it's ordinary engineering: a well-scoped prompt, your own data as context, guardrails so it fails safely, and a way to measure whether it's helping. The AI is a component inside a normal application, not the whole architecture.",
    ],
    goodFit: [
      "Your team spends hours on repetitive reading, writing or data entry",
      "Customers ask the same questions and support can't keep up",
      "You have documents or records that need to be searched or summarised",
      "You want an AI feature in your product but need it built responsibly",
    ],
    overviewLink: {
      before: "If the AI feature belongs inside a larger internal system, it usually comes packaged with ",
      linkText: "custom software development",
      href: "/services/custom-software-development",
      after: " so the model has real data to work with.",
    },

    offerings: [
      {
        title: "AI Chatbots & Assistants",
        desc: "Assistants that answer from your own documentation and data, with clear limits so they say \"I don't know\" instead of inventing answers.",
        icon: "chat",
      },
      {
        title: "LLM Integration",
        desc: "Language models wired into your existing product — summaries, drafting, classification and extraction where they fit the workflow.",
        icon: "brain",
      },
      {
        title: "Document Processing",
        desc: "Pulling structured data out of invoices, forms, contracts and reports, with a review step for anything the model isn't confident about.",
        icon: "doc",
      },
      {
        title: "Semantic Search",
        desc: "Search that understands meaning rather than keywords, over your own content — built on embeddings and a vector store.",
        icon: "search",
      },
      {
        title: "Workflow Automation",
        desc: "Multi-step processes automated end to end, with AI handling the judgement calls and code handling everything that must be exact.",
        icon: "workflow",
      },
      {
        title: "AI Product Frontends",
        desc: "The interface around the model — streaming responses, history, editing and the states that make an AI feature feel reliable.",
        icon: "layers",
      },
    ],


    process: steps([
      "We look at where your time actually goes and pick one task where AI has a clear, measurable payoff — not a list of possibilities.",
      "I define the data the model needs, the guardrails it needs, and how we'll tell whether it's working before building anything.",
      "The interface around the AI is designed first: how results are shown, corrected and approved by a human where that matters.",
      "Built as a normal application with the model as one component — prompts versioned, outputs validated, costs tracked.",
      "Tested against real examples from your business, including the awkward ones, with accuracy checked rather than assumed.",
      "Deployed with monitoring on usage and cost, plus documentation so your team knows what it can and can't be trusted with.",
    ]),

    reasons: [
      {
        title: "Honest about what AI can't do",
        desc: "If a rules-based script would solve your problem more reliably and cheaper, I'll say so rather than sell you a model.",
      },
      {
        title: "Grounded in your data",
        desc: "Retrieval over your own documents and records, so answers come from your business rather than the model's imagination.",
      },
      {
        title: "Costs you can see",
        desc: "Token usage tracked and budgeted from day one, so an AI feature doesn't quietly become your largest monthly bill.",
      },
      {
        title: "Human review where it counts",
        desc: "Anything consequential gets an approval step. Automation should remove the typing, not the judgement.",
      },
      {
        title: "Built to be replaced",
        desc: "Model providers change fast. The integration is abstracted so switching models later is a change, not a rewrite.",
      },
      {
        title: "Real product experience",
        desc: "I've built AI features inside production apps, including a chatbot in a college management system now in daily use.",
      },
    ],

    projectSlugs: ["described-ai", "college-management-system", "linkshort"],

    faqs: [
      {
        q: "Will the AI make things up?",
        a: "Any language model can. The way to reduce it is to ground answers in your own documents, validate outputs in code, and design the interface so the assistant can say it doesn't know. I build all three in, and I'll be direct about what level of accuracy is realistic for your use case.",
      },
      {
        q: "Do you use my data to train models?",
        a: "No. Your data is used as context for answering, not for training, and the providers I use offer API terms that exclude training on your inputs. Anything sensitive can be filtered or kept on your own infrastructure.",
      },
      {
        q: "How much do the AI API costs run to?",
        a: "It depends on volume and which model the task needs. Part of the planning stage is estimating cost per use and per month, and I build in usage tracking so you can see it rather than guess.",
      },
      {
        q: "Can you add AI to my existing product?",
        a: "Yes — that's most of this work. I integrate with your current stack rather than asking you to rebuild around the AI feature.",
      },
      {
        q: "What if AI isn't the right answer for my problem?",
        a: "Then I'll tell you in the first call. Plenty of problems that sound like AI problems are better solved with a database query, a form or an integration, and those are cheaper and more reliable.",
      },
      {
        q: "Which models do you work with?",
        a: "Mainly the Claude and OpenAI APIs, chosen per task based on quality, latency and cost. The integration is built so the model can be swapped without rewriting the product.",
      },
    ],

    ctaHeading: "Where could AI save you",
    ctaAccent: "time?",
    ctaBody:
      "Tell me about the task that eats your week. I'll tell you honestly whether AI is the right tool — and if it is, what it would take to build.",

    related: ["custom-software-development", "web-development", "mobile-app-development"],
  },

  // ==========================================================
  // 4. CUSTOM SOFTWARE DEVELOPMENT
  // ==========================================================
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    h1: "Software Built Around Your",
    h1Accent: "Business",
    badge: "Custom Software",
    tagline:
      "Management systems, internal tools and platforms built for how your organisation actually works — instead of changing how you work to fit someone else's product.",
    heroChips: ["Management systems", "Internal tools", "Role-based access"],

    seoTitle: "Custom Software Development Services | Software Engineer",
    seoDescription:
      "Custom software development by Ahmad Raza — management systems, internal tools and business platforms built around how your organisation works. Worldwide.",
    ogDescription:
      "Management systems, internal tools and business platforms built end to end around how your organisation actually works.",

    overviewHeading: "When off-the-shelf stops",
    overviewAccent: "fitting",
    overviewBody: [
      "Most organisations outgrow their tools the same way: a spreadsheet becomes three spreadsheets, then a shared drive, then a subscription that does 60% of the job while someone re-keys the rest by hand. Custom software is worth building at the point where that manual work costs more than the build.",
      "I've shipped this kind of system before — a college management platform covering admissions, fees, timetables and records for five different user roles, now running in production at a government college with real staff and real student data.",
    ],
    goodFit: [
      "Your process runs on spreadsheets, email and manual re-entry",
      "Existing software almost fits, but the gaps cost you hours every week",
      "Different teams need different access to the same data",
      "You need reporting your current tools can't produce",
    ],
    overviewLink: {
      before: "You can see how that one was built in the ",
      linkText: "College Management System case study",
      href: "/work/college-management-system",
      after: ", including the role model and the reporting side.",
    },

    offerings: [
      {
        title: "Management Systems",
        desc: "Platforms covering a full operational workflow — records, scheduling, billing and reporting in one place instead of five.",
        icon: "layers",
      },
      {
        title: "Internal Tools & Dashboards",
        desc: "The admin interfaces your team lives in: searchable data, bulk actions, and views built for the people who use them daily.",
        icon: "chart",
      },
      {
        title: "Role-Based Platforms",
        desc: "Different users, different permissions, different dashboards — with access control enforced on the server, not just hidden in the UI.",
        icon: "shield",
      },
      {
        title: "Workflow Automation",
        desc: "Replacing the manual steps between systems: approvals, notifications, scheduled jobs and data moving where it should.",
        icon: "workflow",
      },
      {
        title: "Reporting & Exports",
        desc: "Reports your team can actually use — PDF, Word, Excel and CSV exports generated from live data rather than assembled by hand.",
        icon: "doc",
      },
      {
        title: "Desktop Applications",
        desc: "Windows and macOS software with Electron or Tauri, for tools that need to run locally or access the machine directly.",
        icon: "desktop",
      },
    ],


    process: steps([
      "I sit with how the work is done today — the spreadsheets, the workarounds, the steps nobody has written down — before proposing anything.",
      "The domain gets modelled properly: entities, roles, permissions and reports, agreed with you before a line of code is written.",
      "Interfaces designed around the people who'll use them every day, prioritising speed of data entry over decoration.",
      "Built in milestones by module, so you can start using the first part while the next is still being developed.",
      "Tested against real scenarios and real data volumes, including the permission edge cases that matter most in multi-role systems.",
      "Deployed, data migrated from your existing spreadsheets or systems, and your team trained on it before it goes live.",
    ]),

    reasons: [
      {
        title: "Shipped in production",
        desc: "My college management system runs daily at a government college with five user roles — not a portfolio demo.",
      },
      {
        title: "Your process, not a template",
        desc: "The software is built around how your organisation works. No forcing your workflow through someone else's assumptions.",
      },
      {
        title: "Scalable architecture",
        desc: "Proper data modelling, migrations and separation of concerns, so adding a module in year two doesn't mean starting again.",
      },
      {
        title: "Access control done properly",
        desc: "Permissions enforced server-side and tested per role. Hiding a button is not security, and I don't treat it as such.",
      },
      {
        title: "Migration included",
        desc: "Getting your existing data out of spreadsheets and into the system is part of the project, not a problem left for you.",
      },
      {
        title: "Documentation and handover",
        desc: "You get documented code and a trained team, so the system isn't dependent on one person remaining available.",
      },
    ],

    projectSlugs: ["college-management-system", "ar-hospitals", "linkshort", "described-ai"],

    faqs: [
      {
        q: "Is custom software worth it versus an off-the-shelf product?",
        a: "Not always, and I'll say so. If an existing product covers your process, buying it is cheaper. Custom makes sense when the gaps cost real hours every week, when your process is genuinely unusual, or when per-seat licensing has grown past what a build would cost.",
      },
      {
        q: "How long does a custom system take to build?",
        a: "Larger than a website — usually a few months for a full multi-role platform. I build module by module so you get working software early rather than waiting for everything at once.",
      },
      {
        q: "Can you migrate our existing data?",
        a: "Yes. Importing from spreadsheets, CSVs or an existing database is part of the work, including cleaning up the inconsistencies that always turn up in real data.",
      },
      {
        q: "What happens if we need changes after launch?",
        a: "Systems change as businesses do. I offer ongoing development and support, and the code is documented so another developer could take over if you'd rather bring it in-house.",
      },
      {
        q: "Who owns the software?",
        a: "You do — code, data and infrastructure. I build on standard open technologies so you're not tied to me or to a proprietary platform.",
      },
      {
        q: "Can different teams have different access levels?",
        a: "Yes, and it's usually a core requirement. I build role-based access with permissions enforced on the server, so what each role can see and do is properly controlled.",
      },
    ],

    ctaHeading: "Outgrown your",
    ctaAccent: "spreadsheets?",
    ctaBody:
      "Tell me how the work gets done today and where it breaks down. I'll map out what a system would need to cover, and what it would take to build.",

    related: ["web-development", "ai-solutions", "mobile-app-development"],
  },

  // ==========================================================
  // 5. SEO
  // ==========================================================
  {
    slug: "seo",
    name: "SEO Services",
    h1: "SEO Built On Technical",
    h1Accent: "Foundations",
    badge: "SEO Services",
    tagline:
      "Technical SEO, on-page work and content structure from a developer's side of the problem — fixing the things that stop search engines understanding and ranking your site.",
    heroChips: ["Technical SEO", "Core Web Vitals", "On-page & schema"],

    seoTitle: "SEO Services | Technical SEO by a Web Developer",
    seoDescription:
      "SEO services by Ahmad Raza — technical audits, Core Web Vitals, structured data and on-page optimisation, done in the code. Pakistan and worldwide.",
    ogDescription:
      "Technical SEO, Core Web Vitals, structured data and on-page optimisation — done from the developer's side of the problem.",

    overviewHeading: "Fix the foundations",
    overviewAccent: "first",
    overviewBody: [
      "A lot of SEO advice is content strategy sitting on top of a site that search engines can't crawl properly. Slow pages, JavaScript-rendered content, missing canonical tags, duplicate URLs and broken structured data will cap your results no matter how much you publish.",
      "I work on that layer first, because it's the part I can actually fix in the code. Once the technical foundation is solid, on-page work and content structure have something to build on — and you can measure whether it's working.",
    ],
    goodFit: [
      "Your site is slow or scores badly on Core Web Vitals",
      "Pages aren't getting indexed, or the wrong ones are",
      "You're publishing content but rankings aren't moving",
      "You're launching or rebuilding a site and don't want to lose existing rankings",
    ],
    overviewLink: {
      before: "Where the platform itself is the bottleneck, the honest answer is often a ",
      linkText: "rebuild on a modern stack",
      href: "/services/web-development",
      after: " rather than more optimisation on top of it.",
    },

    offerings: [
      {
        title: "Technical SEO Audits",
        desc: "A full crawl and review — indexing, canonicals, redirects, sitemaps, robots rules and the errors quietly costing you visibility.",
        icon: "search",
      },
      {
        title: "Core Web Vitals",
        desc: "Real performance work in the code: LCP, CLS and INP fixed through rendering, images and bundle size rather than a caching plugin.",
        icon: "gauge",
      },
      {
        title: "On-Page Optimisation",
        desc: "Titles, meta descriptions, heading hierarchy, internal linking and image alt text, done page by page with search intent in mind.",
        icon: "doc",
      },
      {
        title: "Structured Data",
        desc: "Schema markup for your organisation, articles, products, FAQs and breadcrumbs — implemented and validated, not just added.",
        icon: "graph",
      },
      {
        title: "Content Structure",
        desc: "Planning which pages should exist and how they link together, so each one targets a clear intent instead of competing with itself.",
        icon: "workflow",
      },
      {
        title: "Local & Migration SEO",
        desc: "Local search setup for businesses serving a region, and safe migrations that preserve rankings when a site is rebuilt or moved.",
        icon: "pin",
      },
    ],


    process: steps([
      "We establish what you actually want from search — which customers, which queries, which pages — and what's happening now.",
      "A full technical audit and keyword research, turned into a prioritised list ordered by impact rather than by how easy it is.",
      "Site structure and URL architecture planned so each page has one clear job and links sensibly to the rest.",
      "The fixes implemented in the code: performance, rendering, metadata, structured data, redirects and internal links.",
      "Everything validated — rich results tested, Core Web Vitals measured, crawl re-run to confirm the errors are actually gone.",
      "Changes submitted to Search Console, then tracked over following weeks so you can see what moved and what didn't.",
    ]),

    reasons: [
      {
        title: "A developer doing SEO",
        desc: "I can fix the rendering, the build and the code. Most SEO reports end with recommendations someone else has to implement.",
      },
      {
        title: "No ranking guarantees",
        desc: "Nobody can guarantee a position on Google, and anyone who does is selling something. I show you what changed and what it did.",
      },
      {
        title: "Measurable reporting",
        desc: "Search Console and analytics data, explained in plain terms — impressions, clicks and positions, not a vanity score out of 100.",
      },
      {
        title: "Rankings preserved on rebuilds",
        desc: "If you're redesigning, redirects and URL structure are planned up front so a new site doesn't reset your search visibility.",
      },
      {
        title: "Content that reads like a person wrote it",
        desc: "Pages written for the reader with the search intent in mind. Keyword stuffing hurts rankings and reads badly to customers.",
      },
      {
        title: "Honest about timelines",
        desc: "Technical fixes can show up in weeks; competitive rankings take months. I'll set expectations before you spend anything.",
      },
    ],

    projectSlugs: ["beat2k-studio", "luxeurs", "linkshort"],

    faqs: [
      {
        q: "Can you guarantee first-page rankings?",
        a: "No, and I'd be careful with anyone who does. Rankings depend on competition, domain history and factors outside anyone's control. What I can do is fix the technical issues holding your site back and improve the pages you want found — then show you what actually moved.",
      },
      {
        q: "How long before I see results from SEO?",
        a: "Technical fixes like indexing errors and Core Web Vitals can show up within a few weeks. Ranking improvements for competitive terms usually take a few months of consistent work. I'll give you a realistic picture for your specific market.",
      },
      {
        q: "What's the difference between technical SEO and content SEO?",
        a: "Technical SEO is whether search engines can crawl, render and understand your site — speed, indexing, structured data, URL structure. Content SEO is whether the pages answer what people are searching for. Both matter, but technical problems put a ceiling on what content can achieve.",
      },
      {
        q: "Will an SEO rebuild lose my existing rankings?",
        a: "Not if it's planned properly. URL structure is preserved where possible, redirects are mapped before launch, and metadata carries over. Rankings usually dip briefly after a migration and recover — the risk comes from doing it without a redirect plan.",
      },
      {
        q: "Do you work on WordPress sites as well?",
        a: "Yes. Technical SEO work on WordPress often means performance, theme-level fixes and cleaning up plugin conflicts. If the platform itself is the bottleneck, I'll tell you and give you the option of a rebuild.",
      },
      {
        q: "Do you do SEO as an ongoing service or a one-off?",
        a: "Both. A technical audit and fix is a defined project. Ongoing content and optimisation work is monthly. Most clients start with the audit, because it tells us whether ongoing work is worth doing yet.",
      },
    ],

    ctaHeading: "Want to know what's holding your site",
    ctaAccent: "back?",
    ctaBody:
      "Send me your URL and what you want to rank for. I'll take a look at the technical side and tell you what I find — honestly, including if there's not much wrong.",

    related: ["web-development", "ui-ux-design", "custom-software-development"],
  },

  // ==========================================================
  // 6. UI/UX DESIGN
  // ==========================================================
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    h1: "Interfaces Designed To Be",
    h1Accent: "Used",
    badge: "UI/UX Design",
    tagline:
      "Product and web interface design from someone who builds the result — so what gets designed is what actually ships, down to the states nobody thinks about.",
    heroChips: ["Web & product UI", "Design systems", "Built by the designer"],

    seoTitle: "UI/UX Design Services | Web & Product Interface Design",
    seoDescription:
      "UI/UX design by Ahmad Raza — web and mobile interface design, design systems and responsive layouts, designed by the developer who builds them.",
    ogDescription:
      "Web and product interface design, design systems and responsive layouts — designed by the developer who builds them.",

    overviewHeading: "Designed by someone who has to",
    overviewAccent: "build it",
    overviewBody: [
      "A lot of design handovers fall apart at the same place: the mockups cover the ideal screen, and everything else — loading, empty, error, long names, slow connections — gets improvised during development. That's where products start feeling cheap.",
      "Because I build what I design, those states are part of the design, not a surprise later. The result is an interface that survives contact with real data, real content lengths and real devices.",
    ],
    goodFit: [
      "Your product works but feels confusing or dated",
      "You need designs that a developer can actually build without guesswork",
      "You're starting a product and need the interface designed before development",
      "Your site looks fine on desktop and falls apart on a phone",
    ],
    overviewLink: {
      before: "Most clients take design and build together — the ",
      linkText: "web development side",
      href: "/services/web-development",
      after: " is where the design actually becomes a working product.",
    },

    offerings: [
      {
        title: "Website UI Design",
        desc: "Marketing and business site design with a clear visual hierarchy, built around the action you want visitors to take.",
        icon: "pen",
      },
      {
        title: "Product & App Interfaces",
        desc: "Dashboards, admin areas and app screens designed for the people who use them every day rather than for a screenshot.",
        icon: "grid",
      },
      {
        title: "Design Systems",
        desc: "Reusable components, type scales, colour tokens and spacing rules, so the tenth screen looks like it belongs with the first.",
        icon: "layers",
      },
      {
        title: "Responsive Layouts",
        desc: "Layouts designed at mobile, tablet and desktop — not one desktop mockup with the rest left to chance.",
        icon: "phone",
      },
      {
        title: "UX Review & Redesign",
        desc: "Going through an existing product to find where users get stuck, then fixing the flows rather than just repainting them.",
        icon: "wand",
      },
      {
        title: "Design to Code",
        desc: "Turning designs — mine, yours or your designer's — into pixel-accurate, responsive, accessible frontend code.",
        icon: "handoff",
      },
    ],


    process: steps([
      "We go through who uses the product, what they're trying to do, and where the current experience gets in their way.",
      "User flows and site structure mapped first, so the design solves the right navigation problem before any visuals.",
      "Wireframes, then full UI designs covering every state — including empty, loading, error and the long-content cases.",
      "Designs turned into a component system and built as responsive, accessible frontend code.",
      "Checked on real devices and against contrast and keyboard-navigation standards, not just reviewed as images.",
      "Design files, components and documentation handed over so your team can extend the system consistently.",
    ]),

    reasons: [
      {
        title: "Designs that ship as designed",
        desc: "I build what I design, so nothing gets quietly dropped in development because it turned out impractical.",
      },
      {
        title: "Every state considered",
        desc: "Empty, loading, error and long-content states are designed up front. That's where most complaints about a product come from.",
      },
      {
        title: "Accessible by default",
        desc: "Contrast, focus states, semantic structure and keyboard navigation are part of the design, not an audit finding later.",
      },
      {
        title: "Consistency through systems",
        desc: "A real component system with tokens for type, colour and spacing, so the product stays coherent as it grows.",
      },
      {
        title: "Mobile designed, not squeezed",
        desc: "Small screens get their own layout decisions instead of being a compressed version of the desktop design.",
      },
      {
        title: "Clear, practical feedback",
        desc: "I'll tell you when a design idea will hurt usability or cost far more to build than it's worth, and suggest the alternative.",
      },
    ],

    projectSlugs: ["described-ai", "beat2k-studio", "luxeurs", "linkshort"],

    faqs: [
      {
        q: "Do you do design only, or design and development?",
        a: "Both, and most clients take both — it removes the handover gap where designs get reinterpreted. If you only need design, I'll deliver Figma files and a component spec that a developer can build from cleanly.",
      },
      {
        q: "Can you work from designs I already have?",
        a: "Yes. If you have Figma files from a designer, I'll build them accurately and flag anything that will cause problems responsively or technically before I start.",
      },
      {
        q: "What deliverables do I get?",
        a: "Figma files with the full screen set including edge-case states, a component library with type, colour and spacing tokens, and responsive layouts for mobile, tablet and desktop. If I'm building it too, you get the coded components as well.",
      },
      {
        q: "How many rounds of revisions are included?",
        a: "Revisions are expected — that's what the design stage is for. I work in rounds at wireframe and UI stage, and we agree the scope up front so it stays clear rather than open-ended.",
      },
      {
        q: "Do you redesign existing products?",
        a: "Yes. That usually starts with a UX review to find where users actually get stuck, so the redesign fixes real problems instead of just updating the visual style.",
      },
      {
        q: "Will the design work on mobile?",
        a: "Yes, and it's designed for mobile rather than adapted to it. Mobile, tablet and desktop each get layout decisions, and everything is checked on real devices.",
      },
    ],

    ctaHeading: "Need an interface people can actually",
    ctaAccent: "use?",
    ctaBody:
      "Show me what you have or describe what you're building. I'll tell you what I'd change, what I'd keep, and what it would take.",

    related: ["web-development", "mobile-app-development", "seo"],
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICE_PAGES.map((s) => s.slug);

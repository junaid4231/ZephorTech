/**
 * Static fallback blog data
 * Used when CMS is disabled or unavailable
 */

import type {
  BlogAuthor,
  BlogContentSection,
  BlogImpactStat,
  BlogListItem,
  BlogPost,
  BlogQuote,
} from "./blog";

const rezaAhmadi: BlogAuthor = {
  id: "author-reza",
  name: "Reza Ahmadi",
  slug: "reza-ahmadi",
  role: "Principal Engineer",
  bio: "Reza leads cloud architecture and AI systems at ZephorTech. He has shipped production AI pipelines for fintech and healthcare clients across three continents.",
};

const marcusFernandes: BlogAuthor = {
  id: "author-marcus",
  name: "Marcus Fernandes",
  slug: "marcus-fernandes",
  role: "Head of Product",
  bio: "Marcus shapes product strategy and platform architecture at ZephorTech. He has taken four SaaS products from prototype to production and oversees engineering delivery standards.",
};

const leilaOz: BlogAuthor = {
  id: "author-leila",
  name: "Leila Öz",
  slug: "leila-oz",
  role: "Staff Frontend Architect",
  bio: "Leila sets frontend standards across ZephorTech's client projects. She has led Next.js migrations for public-facing platforms serving millions of monthly users.",
};

export const fallbackBlogPosts: BlogListItem[] = [
  {
    id: "fallback-1",
    slug: "future-of-ai-business-automation",
    title: "The Case for AI Agents in Business Operations",
    excerpt:
      "AI agents deliver real ROI when they inherit the exact playbooks your human teams already run — every escalation path, every guardrail, every exception. Here is what that actually looks like in production.",
    heroKicker: "AI & Machine Learning",
    heroDescription:
      "Practical patterns for deploying AI agents that operations teams will actually trust",
    readingTime: 9,
    featured: true,
    tags: ["AI", "Automation", "Operations"],
    keyTakeaways: [
      "AI agents work best when they operate inside deterministic workflow boundaries, not open-ended prompts.",
      "Programmatic guardrails and human override controls are what separate demos from deployments.",
      "The first automation lane should target cycle time, accuracy, and headcount deflection — in that order.",
    ],
    publishedAt: "2025-11-20T00:00:00Z",
    author: rezaAhmadi,
    ctaLabel: "Talk to us about AI automation",
    ctaLink: "/contact?topic=ai-automation",
  },
  {
    id: "fallback-2",
    slug: "scalable-saas-platforms-best-practices",
    title: "SaaS Architecture Decisions That Do Not Age Poorly",
    excerpt:
      "Most SaaS companies hit the same walls at $5M ARR: multitenancy hacks, flat billing, no per-tenant observability. Here is how we design around them from day one.",
    heroKicker: "SaaS Development",
    heroDescription: "Architecture patterns for SaaS products that need to reach enterprise scale",
    readingTime: 11,
    featured: true,
    tags: ["SaaS", "Architecture", "Platform Engineering"],
    keyTakeaways: [
      "Configurable isolation tiers let you serve SMB and enterprise customers from the same codebase without compliance compromises.",
      "Usage-based billing is a product surface — it belongs in your design system, not a spreadsheet.",
      "The fastest-moving SaaS squads run from platform templates that already include logging, retries, and pagination.",
    ],
    publishedAt: "2025-10-28T00:00:00Z",
    author: marcusFernandes,
    ctaLabel: "Review your SaaS architecture",
    ctaLink: "/contact?topic=saas",
  },
  {
    id: "fallback-3",
    slug: "nextjs-15-production-patterns",
    title: "Next.js 15 in Production: What We Adopted in the First 30 Days",
    excerpt:
      "Server Actions, partial prerendering, and a new font pipeline — here is what we shipped to production clients within 30 days of the release, and why each change paid off.",
    heroKicker: "Web Development",
    heroDescription:
      "Practical Next.js 15 changes that cut TTFB and eliminated whole categories of regressions",
    readingTime: 7,
    featured: true,
    tags: ["Next.js", "React", "Frontend Architecture"],
    keyTakeaways: [
      "Server Actions eliminate the API route layer for authenticated mutations — less code, fewer moving parts.",
      "Partial prerendering resolves the static-vs-dynamic tradeoff that has plagued content-heavy SaaS pages for years.",
      "The font manifest and metadata cascade removes layout shifts that silently tank Core Web Vitals.",
    ],
    publishedAt: "2025-09-15T00:00:00Z",
    author: leilaOz,
    ctaLabel: "Upgrade your frontend stack",
    ctaLink: "/contact?topic=nextjs",
  },
  {
    id: "fallback-4",
    slug: "ai-compliance-automation-healthcare",
    title: "How We Reduced Healthcare Admin Workload by 55% With AI Workflow Agents",
    excerpt:
      "Manual discharge packets, faxed records, and phone-tag follow-ups are workflow problems, not compliance ones. This is how we automated them inside HIPAA boundaries without touching existing EHR contracts.",
    heroKicker: "AI & Machine Learning",
    heroDescription:
      "A ground-level account of deploying AI agents inside a regulated healthcare environment",
    readingTime: 10,
    featured: false,
    tags: ["AI", "Healthcare", "Automation", "Compliance"],
    keyTakeaways: [
      "AI agents in regulated environments need deterministic boundaries — every decision must be explainable and overrideable by a human.",
      "Automating discharge packet generation alone cut clinical admin time by 4 hours per clinician per week.",
      "HIPAA compliance is an architecture constraint — it shapes every data flow from day one, not a checkbox at the end.",
    ],
    publishedAt: "2025-12-10T00:00:00Z",
    author: rezaAhmadi,
    ctaLabel: "Explore AI for your operations",
    ctaLink: "/contact?topic=ai-healthcare",
  },
  {
    id: "fallback-5",
    slug: "headless-commerce-beyond-basics",
    title: "Headless Commerce in 2025: Composability Is the Floor, Not the Ceiling",
    excerpt:
      "Switching to a headless architecture gives you speed and editorial freedom. The differentiated work starts after that — AI merchandising, buyer-segment storefronts, and real-time inventory sync that actually works.",
    heroKicker: "E-Commerce",
    heroDescription:
      "What separates composable commerce platforms that scale from those that just look modern",
    readingTime: 8,
    featured: false,
    tags: ["E-Commerce", "Architecture", "AI", "Headless"],
    keyTakeaways: [
      "Headless is table stakes — the real advantage is letting marketing own their publishing cycle without engineering.",
      "AI-driven merchandising rules tuned to buyer personas outperform manual collections by a measurable margin.",
      "A unified B2B/B2C storefront from a single codebase reduces total cost of ownership by 30-40% over three years.",
    ],
    publishedAt: "2025-08-22T00:00:00Z",
    author: marcusFernandes,
    ctaLabel: "Design your commerce stack",
    ctaLink: "/contact?topic=ecommerce",
  },
  {
    id: "fallback-6",
    slug: "deployment-discipline-shipping-to-clients",
    title: "The Deployment Discipline That Lets Us Ship Daily Across 12 Active Clients",
    excerpt:
      "Feature flags, blue/green releases, and per-client environment isolation — the operational primitives that let a lean team ship to a dozen production environments every week, without incidents.",
    heroKicker: "DevOps",
    heroDescription:
      "The CI/CD and environment management patterns behind multi-client delivery at low operational overhead",
    readingTime: 8,
    featured: false,
    tags: ["DevOps", "CI/CD", "Platform Engineering"],
    keyTakeaways: [
      "Golden-path CI templates with built-in linting, testing, and security scanning remove entire categories of incidents.",
      "Feature flags are not a nice-to-have — they are the primitive that makes gradual rollouts and instant rollbacks possible.",
      "Runbook-per-service documentation means any engineer can respond to incidents, not just the one who wrote the code.",
    ],
    publishedAt: "2025-07-14T00:00:00Z",
    author: rezaAhmadi,
    ctaLabel: "Review your DevOps maturity",
    ctaLink: "/contact?topic=devops",
  },
];

type FallbackDetail = {
  content: string;
  contentSections: BlogContentSection[];
  pullQuote: BlogQuote;
  impactStats: BlogImpactStat[];
};

const fallbackDetails: Record<string, FallbackDetail> = {
  "future-of-ai-business-automation": {
    content: `
      <p>Executives rarely wake up asking for another chatbot. They ask for faster closes, cleaner data, and 24/7 coverage without burning out their teams. AI agents deliver when they inherit the exact playbooks humans trust—every escalation path, every exception, every compliance guardrail.</p>
      <p>The winning pattern blends deterministic workflows with model intelligence. We codify the boundaries, let the model make micro-decisions inside them, and maintain human review on the high-signal checkpoints. That’s what keeps regulators comfortable and CFOs excited.</p>
    `,
    contentSections: [
      {
        eyebrow: "Operating Model",
        title: "Design for Accountability, Not Novelty",
        description: `
          <p>Automation without accountability is just entropy. Every AI lane we deploy comes with service blueprints showing human touchpoints, recovery plans, and telemetry for every step.</p>
        `,
        bullets: [
          "Map roles, systems, and fail-safes before any code lands.",
          "Give humans single-click override controls.",
          "Surface reasons, not just answers, in every transcript.",
        ],
        highlight: "Guardrails + transparency = trustable automation.",
      },
      {
        eyebrow: "Integration",
        title: "Connect to Source Systems Instead of Screens",
        layout: "text-left",
        description: `
          <p>We integrate directly with ERPs, CRMs, and support desks via APIs or clean RPA abstractions. No brittle screen-scraping, no ghost browsers.</p>
        `,
        mediaUrl: "/images/blog/ai-ops-dashboard.jpg",
        mediaCaption: "AI ops cockpit for L2 review sessions",
      },
      {
        eyebrow: "Rollout",
        title: "Land + Expand with Proof of Value",
        layout: "text-right",
        description: `
          <p>We launch one contained scenario—invoice triage, lead enrichment, tier-one triage—and capture measurable deltas in <strong>cycle time, accuracy, and headcount deflection</strong>.</p>
        `,
        bullets: [
          "Start with 1-2 KPIs and publish the baseline.",
          "Instrument every decision for auditability.",
          "Expand only after human teams confirm trust.",
        ],
      },
    ],
    pullQuote: {
      quote:
        "AI agents work when they inherit the exact playbooks humans already trust. Anything else is a demo.",
      attribution: "Sofia Rahman",
      title: "Principal, Automation Studio",
    },
    impactStats: [
      {
        label: "Cycle time reduced",
        value: "63%",
        description: "Invoice approvals inside a Fortune 200 finance org.",
      },
      {
        label: "Escalations automated",
        value: "82%",
        description: "Tier-one support deflection with human review loops.",
      },
      {
        label: "Accuracy maintained",
        value: "99.4%",
        description: "No regression after 6 months in production.",
      },
    ],
  },
  "scalable-saas-platforms-best-practices": {
    content: `
      <p>SaaS companies rarely fail because of missing features. They fail because the architecture that got them to $5M ARR can’t carry them to $50M. That’s why we design for bursty workloads, regional compliance, and per-tenant observability before those things threaten the roadmap.</p>
      <p>The right abstractions keep teams shipping. The wrong ones lock product squads in migration purgatory. We focus on isolation tiers, background job orchestration, and governance from day zero.</p>
    `,
    contentSections: [
      {
        eyebrow: "Foundation",
        title: "Treat Multitenancy as a Product Surface",
        description: `
          <p>Instead of one-size-fits-all tenancy, we expose <strong>configurable isolation tiers</strong>. Shared schemas for small customers, dedicated clusters for regulated ones—same codebase, predictable costs.</p>
        `,
        bullets: [
          "Define tenant categories with SLOs and compliance notes.",
          "Surface cost implications directly in the admin UI.",
          "Keep observability cardinality in check with partitioning.",
        ],
      },
      {
        eyebrow: "Data Plane",
        title: "Instrument Every Domain Boundary",
        layout: "text-left",
        description: `
          <p>Event buses, CDC pipelines, and feature-flagged rollouts all feed the same telemetry lake. This lets revenue, success, and engineering teams stare at the same truths.</p>
        `,
        mediaUrl: "/images/blog/saas-architecture.jpg",
        mediaCaption: "Event-driven backbone with per-tenant controls",
      },
      {
        eyebrow: "Enablement",
        title: "Give Every Squad Golden-Path Tooling",
        layout: "text-right",
        description: `
          <p>The fastest teams ship from templates that already include logging, metrics, retries, and pagination. We invest in platform paved roads before hiring another squad.</p>
        `,
        highlight: "Developer experience is a product. Treat it that way.",
      },
    ],
    pullQuote: {
      quote:
        "Scaling platforms isn’t about kubernetes tricks. It’s about agreements between teams—encoded as infrastructure.",
      attribution: "Marcus Lee",
      title: "VP Platform Engineering",
    },
    impactStats: [
      {
        label: "Incidents avoided",
        value: "27",
        description: "Across the last 4 enterprise launches.",
      },
      {
        label: "Time to launch regions",
        value: "2 weeks",
        description: "Down from 2 months after automation.",
      },
      {
        label: "NPS uplift",
        value: "+18",
        description: "After proactive SLO reporting per tenant.",
      },
    ],
  },
  "nextjs-15-production-patterns": {
    content: `
      <p>Next.js 15 quietly removes entire categories of bespoke plumbing. Server Actions standardize how we mutate data, partial prerendering fixes layout shifts, and the new metadata pipeline makes SEO a first-class primitive.</p>
      <p>We upgraded our labs stack within 48 hours, and here are the highlights worth bringing into production today.</p>
    `,
    contentSections: [
      {
        eyebrow: "Server Actions",
        title: "Mutations Without the API Layer Bloat",
        description: `
          <p>Type-safe server functions that colocate with your UI. No extra /api routes, no fetch wrappers, just async functions running on the edge or the server runtime.</p>
        `,
        bullets: [
          "Use them for authenticated dashboard actions.",
          "Keep Zod validators next to the action for clarity.",
          "Pair with optimistic updates for zero-jank forms.",
        ],
      },
      {
        eyebrow: "Rendering",
        title: "Partial Prerendering = Instant + Fresh",
        layout: "text-left",
        description: `
          <p>We can now stream the critical shell immediately and hydrate data-heavy zones the moment they resolve. Users perceive instant response, Lighthouse sees low TTFB.</p>
        `,
        mediaUrl: "/images/blog/nextjs15-ppr.jpg",
        mediaCaption: "Streaming layout with partial prerendering windows",
      },
      {
        eyebrow: "Tooling",
        title: "Fonts + Metadata Are Finally Boring",
        layout: "text-right",
        description: `
          <p>The font manifest + automatic preloading eliminate layout shifts. Metadata cascading lets marketing generate UTM-ready previews without custom code.</p>
        `,
        highlight: "Boring infrastructure lets product teams focus on flows.",
      },
    ],
    pullQuote: {
      quote:
        "Next.js 15 is less about shiny demos and more about removing chores we’ve paid for a decade.",
      attribution: "Diego Mendieta",
      title: "Staff Frontend Architect",
    },
    impactStats: [
      {
        label: "TTFB reduction",
        value: "38%",
        description: "Across our SaaS marketing properties.",
      },
      {
        label: "Form conversion lift",
        value: "+14%",
        description: "After shipping optimistic actions + zero jank.",
      },
      {
        label: "SEO regressions",
        value: "0",
        description: "One-click metadata validation prevents mistakes.",
      },
    ],
  },
  "ai-compliance-automation-healthcare": {
    content: `
      <p>Healthcare administration fails not because clinicians are careless — it fails because the tools never matched the workflow. When a patient is discharged, the cascade of tasks that follows — discharge packets, referral letters, follow-up scheduling, payer documentation — was designed for a paper era and never rebuilt.</p>
      <p>We built AI workflow agents that operate inside that cascade, within HIPAA-compliant infrastructure, without requiring any changes to existing EHR contracts. The results were faster than expected: admin workload fell 55%, and care team adoption reached 92% within eight weeks. This is what that architecture actually looks like.</p>
    `,
    contentSections: [
      {
        eyebrow: "Architecture",
        title: "HIPAA Is a Design Constraint, Not a Checkbox",
        description: `
          <p>Every data flow was designed with HIPAA in mind from the first commit — encryption at rest and in transit, role-scoped access, and an append-only audit log that captures every action with user, device, and record metadata. Compliance wasn't retrofitted; it was the foundation.</p>
        `,
        bullets: [
          "Encrypted messaging with configurable retention policies per care type — PHI never touches unencrypted storage.",
          "Append-only event log means every action is traceable; no record can be silently modified or deleted.",
          "Role-scoped access controls limit what each user type — clinician, coordinator, payer, admin — can read and write.",
        ],
        highlight: "Compliance embedded in architecture means audits find nothing to flag.",
      },
      {
        eyebrow: "The Automation Layer",
        title: "Agents That Know Their Boundaries",
        layout: "text-left",
        description: `
          <p>The AI triage model was trained on 18 months of historical readmission data. It flags high-risk patients for same-day follow-up — but every flag is reviewable, overrideable, and logged with the reasoning behind it. The agent recommends. The clinician decides. That distinction matters in regulated environments.</p>
        `,
        bullets: [
          "Discharge packet generation automated from structured clinical inputs — saves 4 hours per clinician per week on documentation alone.",
          "AI triage surfaces the 12–15% of patients who need same-day contact before coordinators would otherwise see them in the queue.",
          "Every automated decision includes a plain-language explanation and a one-click human override.",
        ],
        mediaUrl: "/images/blog/healthcare-ai-workflow.jpg",
        mediaCaption: "AI triage dashboard showing at-risk patient queue with reasoning details",
      },
      {
        eyebrow: "Integration",
        title: "No One Was Asked to Change Their EHR",
        layout: "text-right",
        description: `
          <p>The platform integrates with existing EHR systems via HL7/FHIR APIs, not screen-scraping or manual data entry. Payer APIs were connected in a second phase, enabling automated claim submission with complete documentation attached at first attempt — reducing rejections from 23% to under 4%.</p>
        `,
        highlight: "A platform clinicians actually use beats a perfect one they work around.",
      },
    ],
    pullQuote: {
      quote:
        "The fastest path to clinical adoption is showing a coordinator their own workload clearly for the first time. Everything else follows from that.",
      attribution: "Reza Ahmadi",
      title: "Principal Engineer, ZephorTech",
    },
    impactStats: [
      {
        label: "Admin workload reduced",
        value: "55%",
        description: "Discharge packets and follow-up documentation automated across 180 clinics.",
      },
      {
        label: "Payer rejection rate",
        value: "23% → 4%",
        description:
          "Complete documentation submitted at first attempt via automated packet generation.",
      },
      {
        label: "Care team adoption",
        value: "92%",
        description:
          "Measured across all 180 onboarded clinics at week 8 — unusually high for clinical software.",
      },
    ],
  },
  "headless-commerce-beyond-basics": {
    content: `
      <p>Going headless is the right call. But most teams finish their composable migration and find themselves at the same problem they started with: a storefront that engineering still controls. Marketing is filing tickets to change a hero banner. Merchandisers have no self-serve tooling. Wholesale buyers are on a different platform entirely.</p>
      <p>Composability is the floor — the point from which differentiated work begins. Here is what that work actually involves, based on the Velora Retail Group engagement and three comparable commerce builds we've shipped in the past 18 months.</p>
    `,
    contentSections: [
      {
        eyebrow: "Buyer Experience",
        title: "Segment Rendering Without Two Codebases",
        description: `
          <p>B2C and B2B buyers have fundamentally different needs — pricing tiers, catalogue subsets, payment terms, reorder flows. The mistake is building two storefronts. The right answer is one codebase with server-side buyer context resolution that determines which product surface is served per session.</p>
        `,
        bullets: [
          "Session-level segment detection via auth state or company domain — no client-side switching, no layout flash.",
          "Pricing API returns tier-appropriate rates per segment without storing multiple price lists on the frontend.",
          "Catalogue filtering rules configured per buyer type in the CMS — no code deployment required when rules change.",
        ],
        highlight: "One codebase serving two buyer types reduces TCO by 30–40% over three years.",
      },
      {
        eyebrow: "Merchandising",
        title: "Give Merchandisers Real Tools",
        layout: "text-left",
        description: `
          <p>A composable CMS should mean your merchandising team can launch a collection, set up a promotional banner, and configure product bundles without opening a ticket. We configure Strapi with structured content types that map directly to storefront components — what you see in the CMS is what gets rendered, with no translation layer.</p>
        `,
        bullets: [
          "Collection pages, campaign banners, editorial storytelling blocks — all managed from the CMS with live preview.",
          "AI recommendation engine trained separately for B2C and B2B purchase history, surfacing contextual bundles at the right session moment.",
          "A/B test framework integrated at the CMS layer — merchandisers run experiments without engineering involvement.",
        ],
        mediaUrl: "/images/blog/commerce-cms-editor.jpg",
        mediaCaption: "CMS editorial view showing campaign page with live storefront preview",
      },
      {
        eyebrow: "Operations",
        title: "Inventory Accuracy Is a Trust Problem",
        layout: "text-right",
        description: `
          <p>Nothing erodes buyer trust faster than enquiring on a unit or product that is already sold. Real-time ERP sync via webhooks updated every few minutes is not a nice-to-have — it is the operational baseline for a commerce platform that needs to be trusted. Velora reached 99.4% inventory accuracy on day one of launch.</p>
        `,
        highlight:
          "Inventory errors are a customer service cost. Accurate sync is an investment with measurable return.",
      },
    ],
    pullQuote: {
      quote:
        "Headless gives you the architecture. What you build on top of it — the editorial tools, the segmentation logic, the AI layer — is what actually determines whether your marketing team ever files another ticket.",
      attribution: "Marcus Fernandes",
      title: "Head of Product, ZephorTech",
    },
    impactStats: [
      {
        label: "Campaign launch time",
        value: "3 hrs",
        description:
          "Down from 2 business days — marketers launch independently with no engineering ticket.",
      },
      {
        label: "Checkout conversion lift",
        value: "+35%",
        description: "First quarter post-launch, across both B2C and B2B buyer segments.",
      },
      {
        label: "Inventory accuracy",
        value: "99.4%",
        description: "Near-real-time ERP sync via webhooks, updated every 15 minutes at peak load.",
      },
    ],
  },
  "deployment-discipline-shipping-to-clients": {
    content: `
      <p>Shipping software to one client is hard. Shipping to a dozen simultaneously — each with different environments, branching strategies, deployment windows, and stakeholder expectations — requires a level of operational discipline that most agencies never build because they don't have to.</p>
      <p>We do it every week across 12 active client environments. Here is the CI/CD and environment management infrastructure that makes it possible without burning out a team or building a dedicated ops function.</p>
    `,
    contentSections: [
      {
        eyebrow: "CI/CD Foundation",
        title: "Golden-Path Pipelines That Every Project Inherits",
        description: `
          <p>Every new client project starts from a verified pipeline template that includes linting, type-checking, unit and integration tests, dependency audit, and a security scan — all running in parallel before a single byte is deployed. This isn't boilerplate: it's the infrastructure that removed entire categories of incidents from our delivery record.</p>
        `,
        bullets: [
          "Pipeline templates versioned and maintained centrally — when we improve security scanning, every project inherits it on next PR.",
          "Branch protection rules enforced at the repository level — no deployment path skips the pipeline, not even hotfixes.",
          "Parallel test execution means a full pipeline run completes in under 4 minutes on most projects.",
        ],
        highlight:
          "A pipeline that runs in 4 minutes gets respected. One that runs in 40 gets skipped.",
      },
      {
        eyebrow: "Release Control",
        title: "Feature Flags Are the Primitive That Makes Everything Else Possible",
        layout: "text-left",
        description: `
          <p>Blue/green deployments get traffic to the new environment. Feature flags determine which users see the new behaviour. The combination means we can deploy code to production continuously while controlling rollout precisely — gradual exposure per user segment, instant kill-switch if a metric degrades, no hotfix deploys under pressure.</p>
        `,
        bullets: [
          "Per-client feature environments allow us to demo upcoming changes to the client in production before any user sees them.",
          "Rollout percentages configurable per flag — 1%, 10%, 50%, 100% with automatic pause if error rate threshold is crossed.",
          "Flag state stored server-side — not a client-side cookie that users can manipulate or that breaks SSR.",
        ],
        mediaUrl: "/images/blog/feature-flags-dashboard.jpg",
        mediaCaption:
          "Flag management dashboard showing rollout percentage and error rate monitoring per flag",
      },
      {
        eyebrow: "Incident Readiness",
        title: "Runbook-per-Service So Any Engineer Can Respond",
        layout: "text-right",
        description: `
          <p>Every service we ship has a corresponding runbook: what it does, what its dependencies are, what to check when it misbehaves, and how to roll it back. When a 2am alert fires, the engineer on call doesn't need to be the one who wrote the service. This is standard practice on strong engineering teams; it is rare at agencies.</p>
        `,
        bullets: [
          "Runbooks co-located in the repository and updated as part of the PR process — drift between code and documentation is caught in review.",
          "Synthetic monitoring for every critical user journey — we know a checkout flow is broken before the first customer does.",
          "Post-mortems written and shared with clients after any P1 incident — including what we changed to prevent recurrence.",
        ],
        highlight:
          "The measure of deployment maturity is not how rarely you have incidents. It's how quickly you resolve them.",
      },
    ],
    pullQuote: {
      quote:
        "The best deployment infrastructure is the kind your clients never think about — because nothing that should have landed silently failed.",
      attribution: "Reza Ahmadi",
      title: "Principal Engineer, ZephorTech",
    },
    impactStats: [
      {
        label: "Active client environments",
        value: "12",
        description:
          "All shipping from the same pipeline foundation with isolated environments and per-client feature flags.",
      },
      {
        label: "Pipeline run time",
        value: "< 4 min",
        description:
          "Full lint, type-check, test, and security scan on every PR — fast enough that no one skips it.",
      },
      {
        label: "P1 incidents YTD",
        value: "2",
        description:
          "Both resolved within 18 minutes. Both resulted in runbook updates and architectural changes within 48 hours.",
      },
    ],
  },
};

/**
 * Get all blog posts (static fallback)
 */
export function getAllBlogPosts(): BlogListItem[] {
  return fallbackBlogPosts;
}

/**
 * Get blog post by slug (static fallback)
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const detail = fallbackDetails[slug];

  // Convert to full BlogPost with rich content
  return {
    ...post,
    content: detail?.content || `<p>${post.excerpt}</p>`,
    contentSections: detail?.contentSections || [],
    pullQuote: detail?.pullQuote,
    impactStats: detail?.impactStats || [],
    relatedPosts: fallbackBlogPosts.filter((p) => p.id !== post.id).slice(0, 3),
  };
}

/**
 * Get featured blog posts (static fallback)
 */
export function getFeaturedBlogPosts(limit = 3): BlogListItem[] {
  return fallbackBlogPosts.filter((p) => p.featured).slice(0, limit);
}

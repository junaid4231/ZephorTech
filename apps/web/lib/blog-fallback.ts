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

const fallbackAuthor: BlogAuthor = {
  id: "author-1",
  name: "ZephorTech Team",
  slug: "zephortech-team",
  role: "Engineering Team",
  bio: "The ZephorTech engineering team shares insights from building production systems.",
};

export const fallbackBlogPosts: BlogListItem[] = [
  {
    id: "fallback-1",
    slug: "future-of-ai-business-automation",
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how AI agents are rewriting operating models, from finance to support, and why orchestration matters more than the models themselves.",
    heroKicker: "AI & Machine Learning",
    heroDescription: "Exploring the transformative power of AI in modern business",
    readingTime: 9,
    featured: true,
    tags: ["AI", "Automation", "Business"],
    keyTakeaways: [
      "AI agents eliminate swivel-chair work when paired with human oversight.",
      "Programmatic guardrails unlock 300%+ ROI without risking brand trust.",
      "Success depends on service blueprints, not experimental chatbots.",
    ],
    publishedAt: "2024-01-15T00:00:00Z",
    author: fallbackAuthor,
    ctaLabel: "Prototype an AI ops lane",
    ctaLink: "/contact?topic=ai-automation",
  },
  {
    id: "fallback-2",
    slug: "scalable-saas-platforms-best-practices",
    title: "Building Scalable SaaS Platforms: Best Practices",
    excerpt:
      "A pragmatic blueprint for SaaS teams moving from scrappy MVPs to multi-region, compliance-ready platforms.",
    heroKicker: "SaaS Development",
    heroDescription: "Architectural patterns for high-growth SaaS products",
    readingTime: 11,
    featured: true,
    tags: ["SaaS", "Architecture", "Scaling"],
    keyTakeaways: [
      "Adopt domain-aligned boundaries before you 'need' them.",
      "Offer toggled isolation tiers without duplicating code paths.",
      "Ship golden-path instrumentation to every squad.",
    ],
    publishedAt: "2024-01-10T00:00:00Z",
    author: fallbackAuthor,
    ctaLabel: "Audit your SaaS platform",
    ctaLink: "/contact?topic=saas",
  },
  {
    id: "fallback-3",
    slug: "nextjs-15-whats-new",
    title: "Next.js 15: What's New and Why It Matters",
    excerpt:
      "The release that turns server-first development from optional to default. Here’s what we adopted day one.",
    heroKicker: "Web Development",
    heroDescription: "Deep dive into Next.js 15 features and improvements",
    readingTime: 7,
    featured: true,
    tags: ["Next.js", "React", "Web Development"],
    keyTakeaways: [
      "Server Actions unlock safer mutations without API boilerplate.",
      "Partial prerendering finally makes streaming UX practical.",
      "The Font API + metadata registry remove entire classes of regressions.",
    ],
    publishedAt: "2024-01-05T00:00:00Z",
    author: fallbackAuthor,
    ctaLabel: "Replatform with confidence",
    ctaLink: "/contact?topic=nextjs",
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
      { label: "Incidents avoided", value: "27", description: "Across the last 4 enterprise launches." },
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
  "nextjs-15-whats-new": {
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
      { label: "TTFB reduction", value: "38%", description: "Across our SaaS marketing properties." },
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


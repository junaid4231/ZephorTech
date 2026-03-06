export interface CaseStudyStat {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudySection {
  title: string;
  description: string;
  bullets: string[];
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  excerpt: string;
  services: string[];
  timeline: string;
  headquarters: string;
  hero: {
    subtitle: string;
    description: string;
    stats: CaseStudyStat[];
  };
  highlights: string[];
  metrics: CaseStudyMetric[];
  challenge: CaseStudySection;
  strategy: CaseStudySection;
  outcome: CaseStudySection & { highlights?: string[] };
  testimonial: CaseStudyTestimonial;
  technologies: string[];
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "cs-neo-bank",
    slug: "apex-neobank-platform",
    title: "Apex NeoBank Platform",
    client: "Apex Finance",
    industry: "FinTech",
    summary:
      "Built a cloud-native banking core for a fast-scaling digital bank — unified KYC, payments, and compliance across four APAC markets in 16 weeks without a single hour of unplanned downtime.",
    excerpt:
      "Replaced a fragmented legacy stack with composable banking services, a rules-driven compliance engine, and near-real-time onboarding that cut KYC review time from 3 days to under 4 hours.",
    services: ["Cloud Architecture", "Web Platform", "AI Automation"],
    timeline: "16 Weeks",
    headquarters: "Singapore",
    hero: {
      subtitle: "Digital Banking Transformation",
      description:
        "Apex Finance was expanding across APAC but their manual compliance workflows and aging infrastructure couldn't keep pace. We architected a new banking core, migrated 420,000 accounts, and shipped automated KYC without taking the platform offline.",
      stats: [
        { value: 420000, suffix: "+", label: "Accounts Migrated", delay: 200 },
        { value: 94, suffix: "%", label: "Faster KYC Reviews", delay: 300 },
        { value: 99, suffix: ".97%", label: "Platform Uptime", delay: 400 },
        { value: 12, suffix: "ms", label: "Avg. API Latency", delay: 500 },
      ],
    },
    highlights: [
      "Multi-region deployment with zero-downtime blue/green releases",
      "Rules-driven AML/KYC engine cutting review time by 94%",
      "Unified design system deployed across web dashboard and mobile client portal",
    ],
    metrics: [
      { label: "KYC review time", value: "4 hrs", detail: "Down from 72 hours on average" },
      { label: "Ops overhead", value: "-45%", detail: "Automated compliance packet generation" },
      {
        label: "Customer NPS",
        value: "+18 pts",
        detail: "Post-launch onboarding survey, 2,400 respondents",
      },
    ],
    challenge: {
      title: "Compliance bottlenecks blocking expansion",
      description:
        "Apex Finance had ambitions to expand into three new APAC markets but their onboarding pipeline was the bottleneck. Every new account went through a manual KYC queue handled by a team capped at 40 simultaneous reviews. At peak, applicants waited up to 72 hours for approval — a commercial liability as competitors offered same-day accounts.",
      bullets: [
        "KYC team reviewing every application manually; queue times averaging 72 hours at peak",
        "Customer identity data spread across five disconnected systems with no canonical record",
        "Infrastructure deployed per-region independently, causing configuration drift and release delays",
        "Competitors offering same-day digital onboarding were visibly taking market share in target expansion markets",
      ],
    },
    strategy: {
      title: "Parallel-track modernisation",
      description:
        "We restructured delivery into three independent tracks — data, compliance, and experience — so progress could happen simultaneously without one track blocking another. A shadow-migration approach allowed the old system to remain live throughout.",
      bullets: [
        "Designed domain-isolated event-driven services for onboarding, identity, payments, and notifications",
        "Built a risk-scoring engine with configurable AML rule sets per market, replacing manual review for 91% of applications",
        "Introduced a shared component library enforced across the customer dashboard and back-office portal",
      ],
    },
    outcome: {
      title: "Four markets. Zero downtime. On time.",
      description:
        "The platform launched across Singapore, Malaysia, Indonesia, and Hong Kong within the 16-week commitment. The compliance team now handles only the 9% of applications that the risk engine escalates — everything else clears automatically.",
      bullets: [
        "KYC queue time dropped from 72 hours to under 4 hours on day one of launch",
        "Release cadence improved from bi-weekly to multiple times per week using feature flags",
        "Regulatory exports that previously took two days now generate in under 90 seconds",
      ],
      highlights: [
        "ISO 27001-aligned controls embedded in the CI/CD pipeline",
        "Security and compliance runbooks handed off to the internal team at launch",
      ],
    },
    testimonial: {
      quote:
        "We gave ZephorTech a hard constraint: rebuild the platform and don't take us offline. They delivered on both. The KYC automation alone saved us from hiring an additional compliance team.",
      author: "Priya Natarajan",
      role: "Chief Technology Officer",
      company: "Apex Finance",
    },
    technologies: ["Next.js", "Node.js", "AWS EKS", "Kafka", "LangChain", "Supabase"],
  },
  {
    id: "cs-commerce",
    slug: "velora-commerce-experience",
    title: "Velora Commerce Experience",
    client: "Velora Retail Group",
    industry: "E-commerce",
    summary:
      "Replaced a fragmented two-platform setup with a single headless commerce stack serving both B2C shoppers and B2B wholesale buyers — cutting campaign launch time from 2 days to 3 hours.",
    excerpt:
      "Built a composable storefront that unified retail and wholesale channels, gave marketers direct control over campaigns, and improved checkout conversion by 35% in the first quarter post-launch.",
    services: ["E-commerce", "Headless CMS", "Digital Marketing"],
    timeline: "12 Weeks",
    headquarters: "Berlin, Germany",
    hero: {
      subtitle: "Headless Commerce Acceleration",
      description:
        "Velora Retail Group operated two separate platforms for B2C and B2B — different stacks, different promotions, and no shared inventory view. We replaced both with a composable storefront that serves all buyer types from a single source of truth.",
      stats: [
        { value: 68, suffix: "%", label: "Faster Page Loads", delay: 200 },
        { value: 35, suffix: "%", label: "Lift in Conversion", delay: 300 },
        { value: 99, suffix: ".4%", label: "Inventory Accuracy", delay: 400 },
        { value: 3, suffix: " hrs", label: "Campaign Launch Time", delay: 500 },
      ],
    },
    highlights: [
      "Unified B2C + B2B storefront with segment-aware pricing and promotion logic",
      "Composable CMS enabling marketers to ship landing pages without engineering support",
      "AI-powered product recommendations tuned separately for consumer and wholesale buyer intent",
    ],
    metrics: [
      {
        label: "Checkout drop-off",
        value: "-42%",
        detail: "Streamlined flow with wallet + saved addresses",
      },
      {
        label: "Campaign velocity",
        value: "3 hrs",
        detail: "Down from 2 business days per campaign",
      },
      {
        label: "Inventory accuracy",
        value: "99.4%",
        detail: "Near-real-time ERP sync via webhooks",
      },
    ],
    challenge: {
      title: "Two platforms, one broken experience",
      description:
        "Velora maintained a Shopify storefront for consumers and a separate legacy portal for wholesale buyers. Neither team had visibility into the other's inventory. When promotions ran on the B2C side, wholesale pricing stayed static — leading to margin errors and customer complaints. Marketing waited up to two days for engineering to push new campaign pages.",
      bullets: [
        "Separate platforms meant promotions and stock levels were never in sync between channels",
        "Marketing campaigns required a developer ticket and 2-day turnaround to launch a new landing page",
        "Wholesale buyers on the legacy portal had no personalisation, filtered catalogue, or saved basket",
      ],
    },
    strategy: {
      title: "One composable foundation, two channel experiences",
      description:
        "Rather than rebuild twice, we designed a single commerce backbone with buyer-context rendering. Segment detection at the session level determined which pricing tier, catalogue subset, and content module was served — no separate codebases required.",
      bullets: [
        "Next.js storefront with server-side segment resolution, feeding into a shared product and pricing API",
        "Strapi CMS gave the marketing team direct control over collections, banners, campaign pages, and editorial blocks",
        "Recommendation engine trained on purchase history per buyer type, surfacing bundles and top-sellers contextually",
      ],
    },
    outcome: {
      title: "One platform, double the throughput",
      description:
        "Within 90 days of launch, Velora's marketing team had shipped more campaigns independently than they had in the previous six months combined. Wholesale partners reported a materially better buying experience, and checkout conversion improved across both segments.",
      bullets: [
        "Campaign launch time dropped from 2 days to 3 hours — no engineering ticket required",
        "Unified loyalty programme rewarding both B2C and B2B purchases from a single points engine",
        "Embedded analytics surfaced checkout drop-off by buyer segment, enabling rapid A/B testing",
        "Average order value rose 11% within 90 days as contextual bundle recommendations landed at the right moment in each session",
      ],
    },
    testimonial: {
      quote:
        "We had two platforms that barely talked to each other, and a marketing team filing tickets to change a banner. ZephorTech gave us one system our team actually owns.",
      author: "Lena Vogt",
      role: "VP Digital Experience",
      company: "Velora Retail Group",
    },
    technologies: ["Next.js", "Tailwind CSS", "Strapi", "Shopify Plus", "Algolia", "Cloudinary"],
  },
  {
    id: "cs-health",
    slug: "medsync-care-collaboration",
    title: "MedSync Care Collaboration",
    client: "MedSync Health",
    industry: "Healthcare",
    summary:
      "Built a HIPAA-compliant care coordination platform that digitised discharge and follow-up workflows across 180 clinics, reducing preventable readmissions by 27% and cutting admin workload by 55%.",
    excerpt:
      "Replaced fax-and-spreadsheet care handoffs with an encrypted collaboration portal, AI-assisted triage, and automated discharge packet generation — adopted by 92% of care teams within 8 weeks.",
    services: ["Product Strategy", "AI Agents", "Cloud & DevOps"],
    timeline: "20 Weeks",
    headquarters: "Austin, TX",
    hero: {
      subtitle: "Care Coordination Platform",
      description:
        "MedSync Health was coordinating patient care across dozens of clinics using fax machines, shared inboxes, and manual spreadsheets. We built a secure, HIPAA-compliant platform that connected clinicians, patients, and payers — and introduced AI triage to surface the cases that needed attention first.",
      stats: [
        { value: 27, suffix: "%", label: "Readmission Reduction", delay: 200 },
        { value: 92, suffix: "%", label: "Care Team Adoption", delay: 300 },
        { value: 55, suffix: "%", label: "Admin Workload Saved", delay: 400 },
        { value: 180, suffix: "+", label: "Clinics Onboarded", delay: 500 },
      ],
    },
    highlights: [
      "HIPAA-compliant encrypted messaging and document exchange with retention controls",
      "AI triage assistant prioritising high-risk patients based on discharge history patterns",
      "Tamper-evident audit log capturing every action with user, device, and record metadata",
    ],
    metrics: [
      {
        label: "Care team adoption",
        value: "92%",
        detail: "Measured across 180 clinics at week 8",
      },
      {
        label: "Admin workload",
        value: "-55%",
        detail: "Discharge packets generated automatically",
      },
      {
        label: "Payer approvals",
        value: "+31%",
        detail: "Complete documentation submitted at first attempt",
      },
    ],
    challenge: {
      title: "Paper workflows creating patient risk",
      description:
        "When a patient was discharged, their follow-up care depended on a fax arriving at the right clinic, a coordinator spotting it in a shared tray, and a manual entry into a spreadsheet. Records were incomplete. Insurers rejected claims for missing documentation. And with no shared visibility between providers, high-risk patients were slipping through without follow-up.",
      bullets: [
        "Discharge packets sent by fax, with no confirmation of receipt or action tracking",
        "Coordinators maintaining patient task lists in per-clinic spreadsheets with no audit trail",
        "Payer claim rejections at 23% due to missing or inconsistent discharge documentation",
      ],
    },
    strategy: {
      title: "HIPAA-native architecture from the first commit",
      description:
        "We treated compliance as an architectural constraint, not a feature to add later. The platform was designed around encrypted data at rest and in transit, role-scoped access, and an append-only event log — giving the compliance team evidence collection without any manual effort.",
      bullets: [
        "End-to-end encrypted messaging and document sharing with configurable retention policies per care type",
        "Workflow engine generating standardised discharge packets automatically from structured clinical inputs",
        "AI triage model trained on 18 months of historical readmission data, flagging at-risk patients for same-day follow-up",
      ],
    },
    outcome: {
      title: "Clinical adoption in 8 weeks. Compliance confidence on day one.",
      description:
        "The platform reached 92% adoption within 8 weeks — unusual for clinical software — because care teams could see their own workload clearly for the first time. Compliance and legal were satisfied from day one due to the audit architecture.",
      bullets: [
        "Readmission rate fell 27% in the first quarter, primarily by surfacing at-risk patients who previously had no follow-up scheduled",
        "Payer claim rejection rate dropped from 23% to under 4% within 60 days of launch",
        "EHR and payer API integrations shipped in phase two, eliminating all remaining manual data entry",
      ],
      highlights: [
        "Passed three third-party HIPAA compliance audits in the first six months post-launch",
        "Runbooks and incident response playbooks handed off to the MedSync security team at go-live",
      ],
    },
    testimonial: {
      quote:
        "Our coordinators were drowning in faxes and phone calls. Within two months of launch, they were working from a single screen and catching cases they would have missed entirely. I didn't expect clinical software to move this fast.",
      author: "Dr. Melissa Hart",
      role: "Chief Medical Information Officer",
      company: "MedSync Health",
    },
    technologies: ["Next.js", "Node.js", "Supabase", "Azure", "OpenAI", "Twilio"],
  },
  {
    id: "cs-saas",
    slug: "orbit-analytics-saas-suite",
    title: "Orbit Analytics SaaS Suite",
    client: "Orbit Labs",
    industry: "Analytics / SaaS",
    summary:
      "Transformed a stalled analytics prototype into a commercially viable SaaS product with multi-tenant workspaces, usage-based billing, and real-time collaboration — reaching 500 paying teams within six months of GA launch.",
    excerpt:
      "Productionised Orbit's analytics prototype by building the multi-tenant infrastructure, Stripe billing engine, and self-serve onboarding flows the team couldn't prioritise on their own.",
    services: ["SaaS Engineering", "Multi-tenant Architecture", "DevOps"],
    timeline: "18 Weeks",
    headquarters: "Toronto, Canada",
    hero: {
      subtitle: "Enterprise SaaS Launch",
      description:
        "Orbit Labs had built a genuinely impressive analytics product, but the prototype ran on shared infrastructure with manual workspace setup and no billing system. Enterprise prospects were interested but couldn't commit without SSO, RBAC, and usage-based invoicing. We made it GA-ready in 18 weeks.",
      stats: [
        { value: 500, suffix: "+", label: "Paying Teams", delay: 200 },
        { value: 99, suffix: ".95%", label: "Platform Uptime", delay: 300 },
        { value: 62, suffix: "%", label: "Fewer Support Tickets", delay: 400 },
        { value: 3, suffix: " min", label: "Workspace Provisioning", delay: 500 },
      ],
    },
    highlights: [
      "Fully isolated multi-tenant workspaces with automated provisioning and teardown",
      "Stripe usage-based billing with real-time event metering and configurable overage alerts",
      "In-app activation playbooks reducing churn by addressing drop-off at the first meaningful use moment",
    ],
    metrics: [
      {
        label: "Provisioning time",
        value: "3 min",
        detail: "Down from 45-minute manual setup scripts",
      },
      {
        label: "Support tickets",
        value: "-62%",
        detail: "Self-serve onboarding eliminated most setup queries",
      },
      { label: "Early churn", value: "-14%", detail: "In-app guidance at activation milestones" },
    ],
    challenge: {
      title: "Great product. No path to enterprise.",
      description:
        "Orbit's founding team had spent 18 months building excellent analytics tooling but almost none of the surrounding infrastructure that enterprise buyers require before signing a contract. Every new workspace was provisioned by running a script manually. Billing was a flat monthly invoice sent by hand. There was no SSO, no RBAC, and a single shared database with no tenant isolation.",
      bullets: [
        "Workspace provisioning done by a developer running scripts — averaging 45 minutes per new account",
        "No SSO, SAML, or RBAC, blocking procurement approval at every enterprise prospect",
        "Billing was flat-rate invoicing with no connection to actual usage or seat count",
        "No observability beyond basic uptime pings — the team learned about incidents from support tickets, not monitoring",
      ],
    },
    strategy: {
      title: "Platform plumbing first, then differentiation",
      description:
        "We prioritised the infrastructure that was blocking commercial progress — multi-tenancy, auth, billing — before touching any product features. Once the foundation was solid, we added the collaboration and observability features Orbit needed to compete at the enterprise tier.",
      bullets: [
        "Database-per-tenant isolation with automated provisioning, schema migrations, and teardown on cancellation",
        "SAML 2.0 SSO and attribute-based RBAC covering all workspace and resource permissions",
        "Stripe Billing with metered event ingestion, invoice previews, and configurable overage thresholds per plan",
      ],
    },
    outcome: {
      title: "500 paying teams in six months.",
      description:
        "Orbit launched to general availability on schedule. The enterprise auth and billing infrastructure unblocked three deals in the first week alone. Within six months, the platform had 500+ paying teams and a support load that had actually decreased despite the user growth.",
      bullets: [
        "Three stalled enterprise deals closed within 10 days of SSO and RBAC going live",
        "Workspace provisioning went from a 45-minute manual process to a 3-minute automated flow",
        "SOC 2 Type I evidence collected automatically from day one, with audit reporting available on demand",
      ],
      highlights: [
        "Feature flag framework enabling per-workspace progressive rollouts with no code changes",
        "Usage and adoption dashboards shipped to give Orbit's CS team workspace-level insight",
      ],
    },
    testimonial: {
      quote:
        "We had a product enterprises wanted but couldn't buy. ZephorTech solved the infrastructure gap in 18 weeks. The first three enterprise deals we closed after launch had been waiting on SSO for months.",
      author: "Mateo Alvarez",
      role: "Founder & CEO",
      company: "Orbit Labs",
    },
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Redis", "Vercel"],
  },
  {
    id: "cs-realestate",
    slug: "havenmark-agent-platform",
    title: "Havenmark Agent Platform",
    client: "Havenmark Properties",
    industry: "Real Estate",
    summary:
      "Built a multilingual property brokerage platform for a Dubai-based agency — real-time listing availability synced with DLD data, a buyer self-service portal in five languages, and an agent CRM that replaced WhatsApp threads and spreadsheets.",
    excerpt:
      "Gave Havenmark's international buyers a native-language experience from search to signed SPA, while equipping agents with a live pipeline dashboard, automated WhatsApp milestone alerts, and a document vault per transaction.",
    services: ["Web Platform", "CRM & Automation", "AI Automation"],
    timeline: "14 Weeks",
    headquarters: "Dubai, UAE",
    hero: {
      subtitle: "Multilingual Real Estate Platform",
      description:
        "Havenmark Properties serves high-net-worth buyers from Russia, China, Europe, and the Gulf — but their agents were running the entire business on WhatsApp groups, Excel pipelines, and emailed PDF brochures. We built a platform that gave international buyers a self-service experience in their own language, and gave agents a single workspace they could actually run a brokerage from.",
      stats: [
        { value: 68, suffix: "%", label: "Non-English Inquiries Served", delay: 200 },
        { value: 340, suffix: "+", label: "Properties Live at Launch", delay: 300 },
        { value: 3, suffix: "x", label: "Lead-to-Viewing Conversion", delay: 400 },
        { value: 40, suffix: "%", label: "Faster Time-to-Offer", delay: 500 },
      ],
    },
    highlights: [
      "Full platform in Arabic, English, Russian, Mandarin, and French — Arabic served with complete RTL layout",
      "Real-time unit availability synced with DLD registration feeds and developer inventory APIs every 15 minutes",
      "Buyer transaction portal for document uploads, SPA e-signing, and payment milestone tracking",
    ],
    metrics: [
      {
        label: "Inquiry-to-viewing rate",
        value: "3x",
        detail: "Buyers engaging in their native language converted at triple the previous rate",
      },
      {
        label: "Agent response time",
        value: "-58%",
        detail: "WhatsApp Business automation handles initial qualification and viewing scheduling",
      },
      {
        label: "Document turnaround",
        value: "< 24 hrs",
        detail:
          "NOC, SPA, and KYC tracked per transaction with expiry alerts; was averaging 3 days",
      },
    ],
    challenge: {
      title: "Five buyer nationalities, one overwhelmed WhatsApp group",
      description:
        "Havenmark's agents were closing deals worth millions of dirhams using informal tools. When a Russian or Mandarin-speaking buyer asked about payment plan options or availability on a specific unit, there was no system — just an agent manually translating a PDF message at 11pm across a significant time zone gap. High-value prospects were quietly dropping out of the funnel due to language friction and slow response times nobody was measuring.",
      bullets: [
        "No shared CRM — each agent ran their own spreadsheet, making handoffs and out-of-hours coverage impossible",
        "International buyers had no self-service channel; every question required live agent availability across 3–7 hour time zone differences",
        "Document collection (passport, Emirates ID, proof of funds) conducted over WhatsApp with no version control or expiry tracking",
        "Property availability displayed on a static website — agents regularly received enquiries on units already reserved or sold",
      ],
    },
    strategy: {
      title: "Localised buyer journey, unified agent workspace",
      description:
        "We designed the buyer portal and agent CRM as independent products connected through a shared API layer. Locale resolution happened at the CDN edge — the full UI was served in the detected language server-side, avoiding the flash of translated content that typically undermines trust in multilingual platforms. Arabic required a full RTL implementation across every layout component.",
      bullets: [
        "Next.js App Router with RSC-level locale resolution serving Arabic (RTL), English, Russian, Mandarin, and French at the edge with no client-side language switching",
        "Property availability engine polling DLD registration data and developer inventory APIs on a 15-minute cycle, surfacing live unit status badges on all listings",
        "Agent CRM built as a separate internal application — lead pipeline by stage, viewing calendar, commission tracker, and per-client document vault",
        "WhatsApp Business API integration handling viewing confirmations, payment plan reminders, document requests, and language-detected auto-replies",
      ],
    },
    outcome: {
      title: "International buyers close faster. Agents run one screen.",
      description:
        "Within 60 days of launch Havenmark's inquiry-to-viewing conversion had tripled for non-English speaking buyers. Agents reported spending materially less time on manual coordination. Three months post-launch, 68% of all inbound inquiries were in a language other than English — and every one of them was handled without agent intervention at the qualification stage.",
      bullets: [
        "Lead-to-viewing conversion tripled for Russian and Mandarin-speaking buyers in the first 60 days",
        "Agent response time improved by 58% — WhatsApp automation handles language detection, initial qualification, and viewing booking",
        "Document turnaround dropped from 3 days to under 24 hours through the transaction portal and automated expiry alerting",
        "Multi-currency widget showing live AED, USD, EUR, GBP, CNY, and RUB pricing eliminated the most common pre-viewing question",
      ],
      highlights: [
        "Matterport virtual tour integration reduced exploratory in-person viewings by 30%, freeing agents for serious buyers",
        "Agent analytics dashboard showing pipeline value, days-in-stage, and conversion rate per buyer nationality segment",
      ],
    },
    testimonial: {
      quote:
        "Our Russian and Chinese clients were the hardest to serve — not because of the properties, but because of the process. Now they get a platform in their own language, track their own documents, and on average they're moving faster to offer than our English-speaking clients used to. I did not expect that in 14 weeks.",
      author: "Tariq Al Mansoori",
      role: "Managing Director",
      company: "Havenmark Properties",
    },
    technologies: [
      "Next.js",
      "Supabase",
      "Vercel",
      "i18next",
      "WhatsApp Business API",
      "Matterport SDK",
    ],
  },
];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudiesData;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((study) => study.slug === slug);
}

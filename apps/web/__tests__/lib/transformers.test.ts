/// <reference types="@testing-library/jest-dom" />
import { transformGraphQLServiceToServiceDetail } from "@/lib/graphql/transformers";
import { transformGraphQLTestimonial } from "@/lib/graphql/testimonial-transformer";
import type { GetAllServicesQuery, GetAllTestimonialsQuery } from "@/lib/graphql/generated/operations";

describe("GraphQL transformers", () => {
  const baseService = {
    documentId: "svc-001",
    title: "Web Development",
    slug: "web-development",
    shortDescription: "High-performance web apps",
    fullDescription: "Detailed description",
    iconName: "web",
    heroStats: {
      projects: 120,
      successRate: 97,
      satisfaction: 98,
      deliveryTime: "6 weeks",
    },
    features: [
      { icon: "code", title: "Feature A", description: "Description A" },
      { icon: "design", title: "Feature B", description: "Description B" },
    ],
    useCases: [
      {
        industry: "FinTech",
        title: "Banking Platforms",
        description: "Description",
        examples: ["Project A", "Project B"],
      },
    ],
    techStack: {
      frontend: ["Next.js"],
      backend: ["Node.js"],
      tools: ["Jest"],
      cloud: ["AWS"],
    },
    process: [
      { step: 1, title: "Strategy", description: "Plan", duration: "1 week" },
    ],
    faq: [
      { question: "Timeline?", answer: "6 weeks" },
    ],
    benefits: ["Performance", "Security"],
    seoTitle: "SEO title",
    seoDescription: "SEO description",
    order: 1,
    publishedAt: "2024-01-01T00:00:00.000Z",
    relatedServices: [
      { documentId: "svc-002", title: "Mobile Apps", slug: "mobile-apps" },
    ],
  } as NonNullable<GetAllServicesQuery["services"][number]>;

  const baseTestimonial = {
    documentId: "test-001",
    clientName: "Jane Doe",
    role: "CTO",
    company: "Acme Corp",
    quote: "ZephorTech delivered beyond expectations.",
    rating: 5,
    featured: true,
    order: 1,
    avatar: { url: "/uploads/jane.png", alternativeText: "Jane" },
    companyLogo: null,
  } as NonNullable<GetAllTestimonialsQuery["testimonials"][number]>;

  it("transforms a GraphQL service into ServiceDetail format", () => {
    const result = transformGraphQLServiceToServiceDetail(baseService);
    expect(result).toBeTruthy();
    expect(result?.slug).toBe("web-development");
    expect(result?.heroStats.projects).toBe(120);
    expect(result?.features).toHaveLength(2);
    expect(result?.useCases[0]?.examples).toContain("Project A");
    expect(result?.relatedServices).toEqual(["mobile-apps"]);
  });

  it("defaults hero stats when values are missing", () => {
    const serviceWithoutStats = {
      ...baseService,
      heroStats: undefined,
    } as NonNullable<GetAllServicesQuery["services"][number]>;
    const result = transformGraphQLServiceToServiceDetail(serviceWithoutStats);
    expect(result?.heroStats.projects).toBe(0);
    expect(result?.heroStats.deliveryTime).toBe("N/A");
  });

  it("transforms testimonials with avatar and initials fallback", () => {
    const resultWithAvatar = transformGraphQLTestimonial(baseTestimonial);
    expect(resultWithAvatar?.clientName).toBe("Jane Doe");
    expect(resultWithAvatar?.avatarUrl).toBe("http://localhost:1337/uploads/jane.png");
    expect(resultWithAvatar?.initials).toBe("JD");

    const resultWithoutAvatar = transformGraphQLTestimonial({
      ...baseTestimonial,
      documentId: "test-002",
      clientName: "John Smith",
      avatar: null,
      rating: null,
      featured: null,
      order: null,
    });

    expect(resultWithoutAvatar?.avatarUrl).toBeUndefined();
    expect(resultWithoutAvatar?.initials).toBe("JS");
    expect(resultWithoutAvatar?.rating).toBe(5);
    expect(resultWithoutAvatar?.featured).toBe(false);
    expect(resultWithoutAvatar?.order).toBe(0);
  });
});


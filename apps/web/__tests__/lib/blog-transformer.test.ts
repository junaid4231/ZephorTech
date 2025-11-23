import { transformBlogPostDetail, transformBlogPostListItem } from "@/lib/graphql/blog-transformer";

const basePost = {
  documentId: "post-1",
  title: "Composable AI Ops",
  slug: "composable-ai-ops",
  excerpt: "How platform teams turn copilots into durable programs.",
  heroKicker: "AI Platforms",
  heroDescription: null,
  readingTime: 8,
  featured: true,
  tags: ["AI", "Platform"],
  keyTakeaways: ["Platform squads own guardrails"],
  publishedAt: "2024-01-01T00:00:00.000Z",
  heroVideoUrl: null,
  seoTitle: null,
  seoDescription: null,
  ctaLabel: null,
  ctaLink: null,
  author: {
    documentId: "author-1",
    name: "Maya Han",
    slug: "maya-han",
    role: "Chief Strategy Officer",
    bio: null,
    linkedinUrl: null,
    twitterUrl: null,
    websiteUrl: null,
  },
};

describe("blog transformer", () => {
  it("transforms blog list items", () => {
    const item = transformBlogPostListItem(basePost as any);
    expect(item).toMatchObject({
      id: "post-1",
      slug: "composable-ai-ops",
      tags: ["AI", "Platform"],
      author: expect.objectContaining({ name: "Maya Han" }),
    });
  });

  it("transforms blog detail posts with sections and stats", () => {
    const detail = transformBlogPostDetail({
      ...basePost,
      content: "<p>Hello</p>",
      contentSections: [
        {
          eyebrow: "01",
          title: "Section",
          description: "<p>Body</p>",
          bullets: ["One"],
          layout: "full",
          highlight: "Key insight",
        },
      ],
      impactStats: [{ label: "Latency", value: "40%", description: "Faster" }],
      relatedPosts: [
        {
          ...basePost,
          documentId: "post-2",
          slug: "related",
          title: "Related Post",
        },
      ],
      pullQuote: {
        quote: "Platforms > pilots",
        attribution: "Maya Han",
        title: "CSO",
      },
    } as any);

    expect(detail?.contentSections).toHaveLength(1);
    expect(detail?.impactStats[0]).toEqual(
      expect.objectContaining({ label: "Latency", value: "40%" })
    );
    expect(detail?.relatedPosts[0].slug).toBe("related");
    expect(detail?.pullQuote?.quote).toContain("Platforms > pilots");
  });
});



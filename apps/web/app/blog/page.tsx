import type { Metadata } from "next";
import { Header, Footer, PageHero } from "@/components";
import { InquirySection, FinalCTA } from "@/sections";
import { BlogTagTicker, FeaturedBlogPosts, BlogPostGrid } from "@/sections/blog";
import {
  getAllBlogPostsCached,
  getFeaturedBlogPostsCached,
} from "@/lib/blog-cms";

export const metadata: Metadata = {
  title: "ZephorTech Insights — AI, Platforms, Growth",
  description:
    "Deep dives from ZephorTech architects covering AI platforms, commerce, SaaS, and growth systems. Actionable blueprints from real programs.",
  openGraph: {
    title: "ZephorTech Insights",
    description:
      "Playbooks for AI, product platforms, and growth operating systems.",
    type: "website",
    url: "https://zephortech.com/blog",
  },
};

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([
    getAllBlogPostsCached(),
    getFeaturedBlogPostsCached(3),
  ]);

  const featuredIds = new Set(featured.map((post) => post.id));
  const remainingPosts = posts.filter((post) => !featuredIds.has(post.id));
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags?.forEach((tag) => tagSet.add(tag)));
  const tags = Array.from(tagSet);

  return (
    <>
      <Header />
      <PageHero
        title="Insight Library"
        subtitle="Playbooks • Frameworks • Deployments"
        description="Practical breakdowns of how we architect AI platforms, modernize commerce, and build growth operating systems. Zero fluff—only field-tested moves."
        stats={[
          { value: posts.length, suffix: "+", label: "Longform insights" },
          { value: 12, suffix: "+", label: "Industries covered" },
          { value: 3, suffix: "k", label: "Avg. words / article" },
          { value: 96, suffix: "%", label: "Exec readership" },
        ]}
        ctaText="Discuss an idea"
        ctaHref="/contact#quote"
        backgroundType="animation"
      />

      <BlogTagTicker tags={tags} />
      <FeaturedBlogPosts posts={featured.length > 0 ? featured : posts.slice(0, 3)} />
      <BlogPostGrid posts={remainingPosts.length > 0 ? remainingPosts : posts} />
      <InquirySection />
      <FinalCTA />
      <Footer />
    </>
  );
}



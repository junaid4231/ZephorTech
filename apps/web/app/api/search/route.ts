import { NextRequest, NextResponse } from "next/server";
import { getAllServicesCached } from "@/lib/services-cms";
import { getAllCaseStudiesCached } from "@/lib/case-studies-cms";
import { getAllBlogPostsCached } from "@/lib/blog-cms";

type SearchResult = {
  id: string;
  type: "service" | "case-study" | "blog";
  title: string;
  excerpt: string;
  url: string;
  tag?: string;
  meta?: string;
  score: number;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const normalizedQuery = query.toLowerCase();

  const [services, caseStudies, blogPosts] = await Promise.all([
    getAllServicesCached(),
    getAllCaseStudiesCached(),
    getAllBlogPostsCached(),
  ]);

  const results: SearchResult[] = [];

  services.forEach((service) => {
    const haystacks = [
      service.title,
      service.shortDescription,
      service.fullDescription,
      service.features?.map((feature) => feature.title).join(" "),
    ].filter(Boolean) as string[];

    const score = computeScore(normalizedQuery, haystacks);
    if (score > 0) {
      results.push({
        id: `service-${service.slug}`,
        type: "service",
        title: service.title,
        excerpt: service.shortDescription,
        url: `/services/${service.slug}`,
        tag: "Service",
        score,
      });
    }
  });

  caseStudies.forEach((study) => {
    const haystacks = [
      study.title,
      study.summary,
      study.excerpt,
      study.challenge?.description,
      study.strategy?.description,
    ].filter(Boolean) as string[];

    const score = computeScore(normalizedQuery, haystacks);
    if (score > 0) {
      results.push({
        id: `case-study-${study.slug}`,
        type: "case-study",
        title: study.title,
        excerpt: study.summary,
        url: `/case-studies/${study.slug}`,
        tag: "Case Study",
        meta: study.industry,
        score,
      });
    }
  });

  blogPosts.forEach((post) => {
    const haystacks = [post.title, post.excerpt, post.tags?.join(" ") ?? ""];
    const score = computeScore(normalizedQuery, haystacks);
    if (score > 0) {
      results.push({
        id: `blog-${post.slug}`,
        type: "blog",
        title: post.title,
        excerpt: post.excerpt,
        url: `/blog/${post.slug}`,
        tag: post.heroKicker || post.tags?.[0] || "Blog",
        meta: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : undefined,
        score,
      });
    }
  });

  const sorted = results
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(({ score: _score, ...result }) => result);

  return NextResponse.json({ results: sorted });
}

function computeScore(query: string, haystacks: string[]): number {
  return haystacks.reduce((score, text) => {
    const normalized = text.toLowerCase();
    if (normalized.includes(query)) {
      return score + (normalized.startsWith(query) ? 3 : 1);
    }
    return score;
  }, 0);
}


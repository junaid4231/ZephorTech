"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import type { BlogListItem } from "@/lib/blog";

interface BlogHighlightsProps {
  posts?: BlogListItem[];
}

const categoryColors: Record<string, string> = {
  "AI & Machine Learning": "#8B5CF6",
  "SaaS Development": "#10B981",
  "Web Development": "#0076D1",
  "Mobile Development": "#F59E0B",
  "Cloud Infrastructure": "#06B6D4",
  "E-Commerce": "#EF4444",
  default: "#0076D1",
};

const fallbackPosts = [
  {
    id: "fallback-1",
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how AI agents are revolutionizing business processes and creating unprecedented efficiency gains for modern companies.",
    category: "AI & Machine Learning",
    date: "2024-01-15",
    readTime: "5 min",
    slug: "future-of-ai-business-automation",
  },
  {
    id: "fallback-2",
    title: "Building Scalable SaaS Platforms: Best Practices",
    excerpt:
      "Learn the architectural patterns and strategies for building SaaS products that scale from startup to enterprise.",
    category: "SaaS Development",
    date: "2024-01-10",
    readTime: "8 min",
    slug: "scalable-saas-platforms-best-practices",
  },
];

export function BlogHighlights({ posts }: BlogHighlightsProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const mappedPosts =
    posts && posts.length > 0
      ? posts.slice(0, 2).map((post, index) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          category: post.heroKicker || post.tags[0] || "Insight",
          date: post.publishedAt || `2024-0${index + 1}-01`,
          readTime: post.readingTime ? `${post.readingTime} min` : "5 min",
          slug: post.slug,
        }))
      : fallbackPosts;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background: "#080D14",
      }}
    >
      <div className="container-standard relative z-10">
        {/* Section Header */}
        <div
          className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#0076D1]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
                Latest Insights
              </p>
            </div>
            <h2 className="heading-2 mb-2 text-white">From Our Blog</h2>
            <p className="max-w-xl text-sm text-white/60 md:text-base">
              Insights, strategies, and technical deep-dives from our engineering team.
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white md:inline-flex"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {mappedPosts.map((post, index) => {
            const accentColor = categoryColors[post.category] ?? categoryColors.default;
            return (
              <article
                key={post.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.5s ease ${index * 100}ms`,
                }}
              >
                {/* Category color bar */}
                <div className="h-1 w-full shrink-0" style={{ background: accentColor }} />

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {/* Category badge + meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins mb-3 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-white/90 md:text-lg">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/50">
                    {post.excerpt}
                  </p>

                  {/* Read link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 hover:gap-2.5"
                    style={{ color: accentColor }}
                  >
                    Read article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile "View all" button */}
        <div
          className="mt-8 text-center md:hidden"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: "all 0.5s ease 300ms",
          }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

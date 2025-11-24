"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import type { BlogListItem } from "@/lib/blog";

interface BlogHighlightsProps {
  posts?: BlogListItem[];
}

const fallbackPosts = [
  {
    id: "fallback-1",
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how AI agents are revolutionizing business processes and creating unprecedented efficiency gains.",
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
  {
    id: "fallback-3",
    title: "Next.js 15: What's New and Why It Matters",
    excerpt:
      "Exploring the latest features in Next.js 15 and how they can improve your web development workflow.",
    category: "Web Development",
    date: "2024-01-05",
    readTime: "6 min",
    slug: "nextjs-15-whats-new",
  },
];

export function BlogHighlights({ posts }: BlogHighlightsProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const mappedPosts =
    posts && posts.length > 0
      ? posts.slice(0, 3).map((post, index) => ({
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
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0076D1 1px, transparent 1px),
            linear-gradient(-45deg, #0076D1 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-standard relative z-10">
        <div
          className="mb-6 text-center transition-all duration-1000 ease-out md:mb-8"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Latest Insights
            </p>
          </div>
          <h2 className="heading-2 mb-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              From Our Blog
            </span>
          </h2>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3 md:gap-5">
          {mappedPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative block transition-all duration-700 ease-out"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(30px) scale(0.95)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div
                className="relative h-full overflow-hidden rounded-xl border p-4 transition-all duration-500 group-hover:scale-[1.02] md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0, 118, 209, 0.12), 0 4px 16px rgba(0, 0, 0, 0.4)";
                  e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-gray-400 md:text-sm">
                  <span
                    className="rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(0, 118, 209, 0.2)",
                      color: "#0076D1",
                    }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-poppins mb-2 text-lg font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-xl">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
                  {post.excerpt}
                </p>

                <div
                  className="flex items-center gap-2 text-xs font-semibold transition-all duration-300 group-hover:gap-3 md:text-sm"
                  style={{ color: "#0076D1" }}
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 md:h-4 md:w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="text-center transition-all duration-1000 ease-out"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "300ms",
          }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
              boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 118, 209, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
            }}
          >
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

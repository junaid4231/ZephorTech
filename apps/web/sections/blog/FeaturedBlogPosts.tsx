"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import type { BlogListItem } from "@/lib/blog";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface FeaturedBlogPostsProps {
  posts: BlogListItem[];
}

export function FeaturedBlogPosts({ posts }: FeaturedBlogPostsProps) {
  const limitedPosts = posts.slice(0, 3);
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  });

  if (limitedPosts.length === 0) return null;

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard max-w-6xl">
        <div
          className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <div>
            <p className="text-primary/80 mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
              Featured Articles
            </p>
            <h2 className="heading-2 mb-3 text-white">Signals from the build room</h2>
            <p className="max-w-2xl text-sm text-white/70 md:text-base">
              Playbooks from the trenches—architecture, growth, and automation moves we deploy on
              high-velocity engagements.
            </p>
          </div>
          <Link
            href="/contact#quote"
            className="hover:border-primary/60 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition hover:text-white md:px-5 md:text-sm"
          >
            Discuss featured insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {limitedPosts.map((post, index) => (
            <article
              key={post.id}
              className="hover:border-primary/40 group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 md:p-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.96)",
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div className="text-primary/80 mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <Tag className="h-3.5 w-3.5" />
                {post.heroKicker || post.tags[0] || "Insight"}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mb-4 flex flex-col gap-3 text-left md:mb-5"
              >
                <h3 className="heading-3 group-hover:text-primary font-semibold text-white transition-colors">
                  {post.title}
                </h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-white/70 md:text-base">
                  {post.excerpt}
                </p>
              </Link>

              <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-white/50 md:gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Fresh drop"}
                  </span>
                </div>
                {post.readingTime ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="group-hover:border-primary/40 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70 transition group-hover:text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:gap-3">
                <span>Read article</span>
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

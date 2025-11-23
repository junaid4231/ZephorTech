"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Filter } from "lucide-react";
import type { BlogListItem } from "@/lib/blog";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface BlogPostGridProps {
  posts: BlogListItem[];
  tags?: string[];
  enableFilters?: boolean;
  title?: string;
  description?: string;
  emptyState?: string;
}

export function BlogPostGrid({
  posts,
  tags,
  enableFilters = true,
  title = "All insights",
  description = "Filter by topic to zero in on platform, AI, or growth playbooks.",
  emptyState = "No posts match this filter yet.",
}: BlogPostGridProps) {
  const derivedTags = useMemo(() => {
    if (tags && tags.length > 0) return ["All", ...tags];
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => tag && tagSet.add(tag)));
    return ["All", ...Array.from(tagSet)];
  }, [posts, tags]);

  const [activeTag, setActiveTag] = useState(derivedTags[0] ?? "All");

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) => post.tags?.includes(activeTag));
  }, [posts, activeTag]);

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
      }}
    >
      <div className="container-standard max-w-6xl">
        <div
          className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between md:gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease",
          }}
        >
          <div>
            <p className="text-primary/80 mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
              <Filter className="h-4 w-4" />
              {title}
            </p>
            <h3 className="heading-2 text-white">{description}</h3>
          </div>
          {enableFilters && (
            <div className="flex flex-wrap gap-2">
              {derivedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-all ${
                    activeTag === tag
                      ? "border-primary bg-primary/10 text-white"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className="grid gap-4 md:grid-cols-2 md:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.1s",
          }}
        >
          {filteredPosts.length === 0 && (
            <div className="col-span-full rounded-xl border border-white/10 bg-white/5 px-5 py-8 text-center text-white/60 md:px-6 md:py-10">
              {emptyState}
            </div>
          )}

          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="hover:border-primary/40 group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 backdrop-blur-xl transition hover:shadow-[0_8px_32px_rgba(0,118,209,0.15)] md:p-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div className="mb-3 flex items-center gap-3 text-xs text-white/60 md:gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "New"}
                  </span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="mb-4 flex flex-col gap-3 text-left md:mb-5"
              >
                <h4 className="heading-3 group-hover:text-primary font-semibold text-white transition">
                  {post.title}
                </h4>
                <p className="line-clamp-4 text-sm leading-relaxed text-white/70 md:text-base">
                  {post.excerpt}
                </p>
              </Link>

              <div className="mb-4 flex flex-wrap gap-2 md:mb-5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="group-hover:border-primary/40 rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium text-white/70 transition group-hover:text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {post.author && (
                <div className="mb-5 flex items-center gap-3 text-xs text-white/70 md:mb-6 md:text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 font-semibold text-white/80 md:h-10 md:w-10">
                    {post.author.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author.name}</p>
                    <p className="text-xs text-white/60">{post.author.role}</p>
                  </div>
                </div>
              )}

              <div className="text-primary mt-auto inline-flex items-center gap-2 text-xs font-semibold transition group-hover:gap-3 md:text-sm">
                <span>Read article</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

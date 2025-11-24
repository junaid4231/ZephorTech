"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Filter, Search, X, ChevronDown } from "lucide-react";
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

type SortOption = "newest" | "oldest" | "alphabetical";

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

  const [activeTag, setActiveTag] = useState<string>("All");

  // Reset activeTag to "All" when posts or tags change
  useEffect(() => {
    setActiveTag("All");
    setPostsToShow(12);
    setSearchQuery("");
  }, [posts, tags]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [postsToShow, setPostsToShow] = useState(12);

  const filteredAndSearchedPosts = useMemo(() => {
    // Start with all posts
    let filtered = [...posts];

    // Filter by tag - only filter if a specific tag is selected
    if (activeTag && activeTag !== "All") {
      filtered = filtered.filter((post) => post.tags?.includes(activeTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
        case "oldest":
          return new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime();
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [posts, activeTag, searchQuery, sortBy]);

  const displayedPosts = useMemo(
    () => filteredAndSearchedPosts.slice(0, postsToShow),
    [filteredAndSearchedPosts, postsToShow]
  );

  const hasMore = filteredAndSearchedPosts.length > postsToShow;

  const handleLoadMore = () => {
    setPostsToShow((prev) => prev + 12);
  };

  const handleClearFilters = () => {
    setActiveTag("All");
    setSearchQuery("");
    setSortBy("newest");
    setPostsToShow(12);
  };

  const hasActiveFilters = activeTag !== "All" || searchQuery.trim() !== "" || sortBy !== "newest";

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard max-w-6xl">
        {/* Header Section */}
        <div
          className="mb-6 transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-4">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              <Filter className="h-4 w-4 md:h-5 md:w-5" />
              {title}
            </p>
            <h2 className="heading-2 mb-3 text-white">Browse All Articles</h2>
            <p className="max-w-3xl text-sm text-gray-400 md:text-base">{description}</p>
          </div>

          {/* Search and Sort Bar */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPostsToShow(12); // Reset pagination on search
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-10 py-2.5 text-sm text-white backdrop-blur-sm transition-all placeholder:text-white/40 focus:border-[#0076D1]/50 focus:bg-white/10 focus:outline-none md:py-3 md:text-base"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setPostsToShow(12);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/80"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 md:py-3 md:text-base"
              >
                <span>
                  Sort: {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "A-Z"}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
                />
              </button>
              {showSortMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowSortMenu(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 top-full z-20 mt-2 min-w-[180px] rounded-xl border border-white/10 bg-[#0F1419] shadow-xl backdrop-blur-xl">
                    {(["newest", "oldest", "alphabetical"] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSortBy(option);
                          setShowSortMenu(false);
                          setPostsToShow(12);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition ${
                          sortBy === option
                            ? "bg-[#0076D1]/20 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {option === "newest"
                          ? "Newest First"
                          : option === "oldest"
                            ? "Oldest First"
                            : "A-Z"}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Filter Tags */}
          {enableFilters && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {derivedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setActiveTag(tag);
                    setPostsToShow(12);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all md:px-4 md:py-2 md:text-sm ${
                    activeTag === tag
                      ? "border-[#0076D1] bg-[#0076D1]/10 text-white"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="ml-2 flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/60 transition-all hover:border-white/40 hover:text-white md:px-4 md:py-2 md:text-sm"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Results Count */}
          {filteredAndSearchedPosts.length > 0 && (
            <p className="text-xs text-white/60 md:text-sm">
              Showing {displayedPosts.length} of {filteredAndSearchedPosts.length} articles
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div
          className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.1s",
          }}
        >
          {displayedPosts.length === 0 && (
            <div className="col-span-full rounded-xl border border-white/10 bg-white/5 px-5 py-12 text-center md:px-6 md:py-16">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <Search className="h-8 w-8 text-white/40" />
              </div>
              <p className="mb-2 text-lg font-semibold text-white md:text-xl">{emptyState}</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {displayedPosts.map((post, index) => (
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

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center md:mt-10">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#0076D1]/50 hover:bg-[#0076D1]/10 hover:text-white md:px-8 md:py-3.5 md:text-base"
            >
              Load More Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

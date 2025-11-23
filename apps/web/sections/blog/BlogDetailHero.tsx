"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Share2 } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import HeroAnimation from "@/components/HeroAnimation";

interface BlogDetailHeroProps {
  post: BlogPost;
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "radial-gradient(circle at top, rgba(0,118,209,0.35), rgba(2,6,12,0.9))",
      }}
    >
      <div className="absolute inset-0 opacity-40">
        <HeroAnimation />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#02060C]/80 via-[#050B14]/90 to-[#02060C]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col gap-6 md:gap-8 lg:grid lg:grid-cols-[1.2fr,0.8fr]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:mb-4">
              {post.heroKicker || "Insight"}
            </div>
            <h1 className="heading-1 mb-4 text-white md:mb-5">{post.title}</h1>
            <p className="mb-5 text-base text-white/80 md:mb-6 md:text-lg">{post.excerpt}</p>

            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-white/60 md:mb-8 md:gap-4 md:text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Fresh drop"}
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </div>
              )}
              <button
                type="button"
                className="hover:border-primary/60 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: typeof window !== "undefined" ? window.location.href : undefined,
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {post.author && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:mt-8 md:gap-4 md:rounded-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-base font-semibold text-white md:h-14 md:w-14 md:text-lg">
                  {post.author.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  <p className="text-sm text-white/60">{post.author.role}</p>
                  {post.author.linkedinUrl && (
                    <Link
                      href={post.author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary/80 hover:text-primary text-xs font-semibold"
                    >
                      LinkedIn ↗
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            {post.heroVideoUrl ? (
              <video
                src={post.heroVideoUrl}
                className="h-full w-full rounded-2xl object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                poster="/images/blog-hero-placeholder.jpg"
              />
            ) : (
              <div className="from-primary/40 flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br to-[#00A8FF]/30 p-6 text-white shadow-2xl">
                <p className="text-sm uppercase tracking-[0.5em] text-white/80">Highlights</p>
                <div className="space-y-4">
                  {post.impactStats.slice(0, 3).map((stat) => (
                    <div key={stat.label}>
                      <p className="font-poppins text-3xl font-semibold">{stat.value}</p>
                      <p className="text-sm text-white/80">{stat.label}</p>
                      <p className="text-xs text-white/60">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

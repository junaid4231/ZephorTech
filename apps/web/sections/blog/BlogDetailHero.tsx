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
      className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16"
      style={{
        background: "radial-gradient(circle at top, rgba(0,118,209,0.35), rgba(2,6,12,0.9))",
      }}
    >
      <div className="absolute inset-0 opacity-40">
        <HeroAnimation />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#02060C]/80 via-[#050B14]/90 to-[#02060C]" />

      <div className="container-standard relative z-10">
        <div
          className="flex flex-col gap-8 rounded-[32px] border border-white/5 bg-white/5/5 p-6 shadow-[0_12px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:gap-10 md:p-10 lg:grid lg:grid-cols-[1.2fr,0.8fr]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s ease",
          }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 md:mb-5">
              {post.heroKicker || "Insight"}
            </div>
            <h1 className="heading-1 mb-5 max-w-3xl text-white md:mb-6">{post.title}</h1>
            <p className="text-soft mb-6 max-w-3xl text-base text-white/80 md:mb-7 md:text-lg">
              {post.excerpt}
            </p>

            <div className="mb-7 flex flex-wrap items-center gap-3 text-xs text-white/70 md:mb-9 md:gap-4 md:text-sm">
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
              {post.readingTime ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Insight drop
                </div>
              )}
              <button
                type="button"
                className="hover:border-primary/60 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:text-white"
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
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:mt-10 md:gap-4">
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

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-0 backdrop-blur-xl md:p-6">
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
              <div className="from-primary/40 flex h-full min-h-[260px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br to-[#00A8FF]/20 p-6 text-white shadow-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
                  Highlights
                </p>
                <div className="space-y-5">
                  {(post.impactStats.length > 0 ? post.impactStats : defaultImpactStats).slice(0, 3).map(
                    (stat) => (
                      <div key={stat.label}>
                        <p className="font-poppins text-3xl font-semibold md:text-4xl">{stat.value}</p>
                        <p className="text-sm text-white/80">{stat.label}</p>
                        {stat.description && <p className="text-xs text-white/60">{stat.description}</p>}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const defaultImpactStats = [
  { label: "Readers", value: "10k+", description: "Monthly exec readers across regions." },
  { label: "Industries", value: "12", description: "Verticals covered with field data." },
  { label: "Actionable takes", value: "100%", description: "Zero fluff, only battle-tested playbooks." },
];

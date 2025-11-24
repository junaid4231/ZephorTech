"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Quote, TrendingUp, CheckCircle2 } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  const articleRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  useEffect(() => {
    articleRef.current = ref.current;
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const element = articleRef.current;
      const articleTop = element.offsetTop - 120;
      const articleHeight = element.scrollHeight - window.innerHeight + 200;
      const scrolled = window.scrollY - articleTop;
      const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);
      setScrollProgress(Number.isFinite(progress) ? progress : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <article
      ref={ref}
      className="relative pt-10 pb-16 md:pt-12 md:pb-20"
      style={{
        background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
      }}
    >
      <div className="pointer-events-none fixed left-0 right-0 top-20 z-40 hidden h-1 bg-white/5 backdrop-blur lg:block">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#004E8F] via-[#0076D1] to-[#00A8FF] transition-[width]"
          style={{ width: `${scrollProgress * 100}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="container-standard max-w-4xl">
        {/* Main Content */}
        {post.content && (
          <div
            className="prose-zt mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease",
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Content Sections */}
        {post.contentSections && post.contentSections.length > 0 && (
          <div className="mb-8 space-y-5 md:mb-12 md:space-y-6">
            {post.contentSections.map((section, index) => (
              <ContentSection key={index} section={section} index={index} isVisible={isVisible} />
            ))}
          </div>
        )}

        {/* Pull Quote */}
        {post.pullQuote && (
          <div
            className="my-12 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5 backdrop-blur-xl md:my-16 md:p-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <Quote className="mb-3 h-6 w-6 text-primary md:mb-4 md:h-8 md:w-8" />
            <blockquote className="mb-3 text-xl font-semibold text-white md:mb-4 md:text-2xl">
              {post.pullQuote.quote}
            </blockquote>
            {post.pullQuote.attribution && (
              <p className="text-sm text-white/70 md:text-base">
                — {post.pullQuote.attribution}
                {post.pullQuote.title && `, ${post.pullQuote.title}`}
              </p>
            )}
          </div>
        )}

        {/* Impact Stats */}
        {post.impactStats && post.impactStats.length > 0 && (
          <div
            className="my-12 grid gap-4 md:my-16 md:grid-cols-3 md:gap-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.3s",
            }}
          >
            {post.impactStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6"
              >
                <TrendingUp className="mb-3 h-5 w-5 text-primary md:h-6 md:w-6" />
                <div className="mb-2 text-xl font-bold text-white md:text-2xl">{stat.value}</div>
                <div className="mb-1 text-xs font-semibold text-primary/90 md:text-sm">{stat.label}</div>
                {stat.description && (
                  <div className="text-xs text-white/60">{stat.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Key Takeaways */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div
            className="my-12 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:my-16 md:p-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.4s",
            }}
          >
            <h3 className="font-poppins mb-5 text-xl font-bold text-white md:mb-6 md:text-2xl">Key Takeaways</h3>
            <ul className="space-y-3 md:space-y-4">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2.5 md:gap-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                  <span className="text-sm leading-relaxed text-white/80 md:text-base">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        {post.ctaLabel && post.ctaLink && (
          <div
            className="mt-12 text-center md:mt-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s ease 0.5s",
            }}
          >
            <a
              href={post.ctaLink}
              className="border-primary/40 from-primary/20 to-primary/10 hover:border-primary/60 hover:from-primary/30 hover:to-primary/20 inline-flex items-center gap-2 rounded-xl border bg-gradient-to-r px-6 py-3 text-sm font-semibold text-white transition md:gap-3 md:px-8 md:py-4 md:text-base"
            >
              {post.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

function ContentSection({
  section,
  index,
  isVisible,
}: {
  section: BlogPost["contentSections"][number];
  index: number;
  isVisible: boolean;
}) {
  const layout = section.layout || "full";
  const hasMedia = Boolean(section.mediaUrl);

  return (
    <section
      className={`rounded-2xl border border-white/5 bg-white/[0.04] p-5 backdrop-blur-2xl md:p-6 ${
        layout === "full" ? "" : "grid items-center gap-5 md:grid-cols-2"
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s ease ${index * 0.1}s`,
      }}
    >
      {section.eyebrow && (
        <p className="text-primary/80 mb-2 text-xs font-semibold uppercase tracking-wider">
          {section.eyebrow}
        </p>
      )}

      {section.title && (
        <h3 className="font-poppins mb-4 text-xl font-bold text-white md:text-2xl">
          {section.title}
        </h3>
      )}

      {layout === "full" && (
        <div className="space-y-6">
          {section.description && (
            <div
              className="prose-zt max-w-none"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          )}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-2.5 md:space-y-3">
              {section.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 md:gap-3">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                  <span className="text-sm text-white/80 md:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {hasMedia && (
            <div className="mt-6">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={section.mediaUrl!}
                  alt={section.mediaCaption || section.title || "Content media"}
                  fill
                  className="object-cover"
                />
              </div>
              {section.mediaCaption && (
                <p className="mt-2 text-center text-xs text-white/60 md:text-sm">{section.mediaCaption}</p>
              )}
            </div>
          )}

          {section.highlight && (
            <div className="border-primary/30 bg-primary/10 mt-5 rounded-xl border p-3 md:mt-6 md:p-4">
              <p className="text-sm font-semibold text-primary md:text-base">{section.highlight}</p>
            </div>
          )}
        </div>
      )}

      {layout !== "full" && (
        <>
            <div className={layout === "text-left" ? "order-1" : "order-2"}>
            {section.description && (
              <div
                  className="prose-zt mb-4 max-w-none"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            )}

            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2.5 md:space-y-3">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3">
                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0 md:h-5 md:w-5" />
                    <span className="text-sm text-white/80 md:text-base">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.highlight && (
              <div className="border-primary/30 bg-primary/10 mt-5 rounded-xl border p-3 md:mt-6 md:p-4">
                <p className="text-sm font-semibold text-primary md:text-base">{section.highlight}</p>
              </div>
            )}
          </div>

          {hasMedia && (
            <div className={layout === "text-left" ? "order-2" : "order-1"}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={section.mediaUrl!}
                  alt={section.mediaCaption || section.title || "Content media"}
                  fill
                  className="object-cover"
                />
              </div>
              {section.mediaCaption && (
                <p className="mt-2 text-center text-sm text-white/60">{section.mediaCaption}</p>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

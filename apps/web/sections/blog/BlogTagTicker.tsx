"use client";

import React, { useEffect, useState } from "react";
import { Tag } from "lucide-react";

interface BlogTagTickerProps {
  tags: string[];
}

export function BlogTagTicker({ tags }: BlogTagTickerProps) {
  const [animationDuration, setAnimationDuration] = useState(30);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }

    // Adjust animation speed based on number of tags
    const baseDuration = 30;
    const tagCount = tags.length;
    const adjustedDuration = Math.max(20, Math.min(40, baseDuration + tagCount * 2));
    setAnimationDuration(adjustedDuration);

    // Disable animation on very small screens
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    if (mediaQuery.matches) {
      setShouldAnimate(false);
    }

    const handleResize = () => {
      const isSmall = window.matchMedia("(max-width: 640px)").matches;
      setShouldAnimate(!isSmall && !prefersReducedMotion);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tags.length]);

  if (!tags || tags.length === 0) return null;

  // Duplicate tags for seamless loop
  const duplicatedTags = [...tags, ...tags, ...tags];

  return (
    <section
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-white/5 via-white/3 to-white/5 py-4 md:py-5"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,7,11,0.95) 0%, rgba(7,13,23,0.9) 50%, rgba(5,7,11,0.95) 100%)",
      }}
    >
      <div className="relative flex items-center gap-4 md:gap-6">
        <div className="flex shrink-0 items-center gap-2 px-3 md:px-4">
          <Tag className="h-4 w-4 text-primary md:h-5 md:w-5" />
          <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-primary/90 md:text-sm">
            Topics
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className={`flex gap-4 ${shouldAnimate ? "animate-scroll" : ""} md:gap-6`}
            style={{
              animationDuration: `${animationDuration}s`,
            }}
            onMouseEnter={() => setShouldAnimate(false)}
            onMouseLeave={() => {
              const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches;
              if (!prefersReducedMotion) {
                setShouldAnimate(true);
              }
            }}
          >
            {duplicatedTags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition hover:border-primary/40 hover:bg-primary/10 hover:text-white md:px-4 md:py-2 md:text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </section>
  );
}


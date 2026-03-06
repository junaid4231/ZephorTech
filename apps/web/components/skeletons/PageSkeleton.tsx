import React from "react";

/**
 * PageSkeleton — reusable full-page loading skeleton.
 * Used by route-level loading.tsx files to render
 * a content-shaped placeholder while Next.js fetches data.
 */

interface SkeletonBlockProps {
  className?: string;
  style?: React.CSSProperties;
}

function SkeletonBlock({ className = "", style }: SkeletonBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
      style={{ background: "rgba(255,255,255,0.06)", ...style }}
    />
  );
}

interface PageSkeletonProps {
  /** Number of content card rows to render */
  cards?: number;
  /** Show a hero-height banner placeholder at the top */
  showHero?: boolean;
}

export function PageSkeleton({ cards = 6, showHero = true }: PageSkeletonProps) {
  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Nav placeholder */}
      <div
        className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-6 md:px-10"
        style={{
          background: "rgba(10,10,10,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <SkeletonBlock className="h-9 w-36" />
        <div className="hidden items-center gap-6 md:flex">
          {[80, 72, 96, 64, 80].map((w, i) => (
            <SkeletonBlock
              key={i}
              className="h-4"
              style={{ width: `${w}px` } as React.CSSProperties}
            />
          ))}
        </div>
        <SkeletonBlock className="h-9 w-28" />
      </div>

      {/* Hero banner placeholder */}
      {showHero && (
        <div
          className="flex flex-col items-center justify-center gap-6 pt-20"
          style={{
            minHeight: "55vh",
            background:
              "linear-gradient(135deg, rgba(0,78,143,0.15) 0%, rgba(0,118,209,0.08) 100%)",
          }}
        >
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-12 w-72 md:w-[480px]" />
          <SkeletonBlock className="h-5 w-64 md:w-96" />
          <SkeletonBlock className="h-5 w-48 md:w-80" />
          <div className="flex gap-4 pt-2">
            <SkeletonBlock className="h-12 w-36 rounded-xl" />
            <SkeletonBlock className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      )}

      {/* Content cards grid */}
      <div className="container-standard py-16">
        <div className="mb-10 flex flex-col items-center gap-4">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-9 w-64 md:w-80" />
          <SkeletonBlock className="h-4 w-48 md:w-72" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.07)",
                animationDelay: `${i * 60}ms`,
              }}
            >
              <SkeletonBlock className="mb-4 h-10 w-10 rounded-lg" />
              <SkeletonBlock className="mb-3 h-5 w-3/4" />
              <SkeletonBlock className="mb-2 h-3" />
              <SkeletonBlock className="mb-2 h-3 w-5/6" />
              <SkeletonBlock className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";

interface CaseStudiesShowcaseProps {
  studies: CaseStudy[];
}

export function CaseStudiesShowcase({ studies }: CaseStudiesShowcaseProps) {
  const services = useMemo(() => {
    const set = new Set<string>();
    studies.forEach((study) => study.services.forEach((service) => set.add(service)));
    return ["All", ...Array.from(set)];
  }, [studies]);

  const [activeFilter, setActiveFilter] = useState(services[0]);
  const filtered =
    activeFilter === "All"
      ? studies
      : studies.filter((study) => study.services.includes(activeFilter));

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section ref={ref} className="relative py-12 md:py-16" style={{ background: "#0A0A0A" }}>
      <div className="container-standard relative z-10">
        {/* Header with filter chips */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Filter by Service
            </p>
          </div>

          <h2 className="heading-2 mb-3 text-white">Explore Our Work</h2>

          <p className="mx-auto max-w-3xl text-sm text-gray-400 md:mb-6 md:text-base">
            Filter by capability to see relevant transformations. Each case study showcases
            measurable impact, client testimonials, and our engineering approach.
          </p>

          {/* Filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setActiveFilter(service)}
                className={`group relative rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeFilter === service
                    ? "border-[#0076D1] bg-[#0076D1]/10 text-white shadow-[0_0_20px_rgba(0,118,209,0.3)]"
                    : "border-white/10 text-white/60 hover:border-[#0076D1]/50 hover:bg-[#0076D1]/5 hover:text-white"
                }`}
              >
                {service}
                {activeFilter === service && (
                  <span
                    className="absolute inset-0 animate-pulse rounded-full"
                    style={{
                      boxShadow: "0 0 20px rgba(0,118,209,0.4)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Case studies grid */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "200ms",
          }}
        >
          {filtered.length === 0 ? (
            <div
              className="card-standard text-center"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <p className="text-lg text-gray-400">
                No case studies found for this service. Check back soon!
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "var(--section-inner-gap)" }}
            >
              {filtered.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} variant="compact" />
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <div
          className="mt-10 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#0076D1]">{filtered.length}</span> case{" "}
            {filtered.length === 1 ? "study" : "studies"}
            {activeFilter !== "All" && (
              <span>
                {" "}
                for <span className="text-white">{activeFilter}</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, Shield, Users } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface CaseStudyTeasersProps {
  caseStudies?: CaseStudy[];
}

const iconPalette = [TrendingUp, Target, Shield, Users];

export function CaseStudyTeasers({ caseStudies }: CaseStudyTeasersProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  const teasers = caseStudies.slice(0, 3);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #04070C 0%, #0A1018 55%, #04070C 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <div className="mb-8 text-center md:mb-10">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Latest Wins
          </p>
          <h2 className="heading-2 mb-3 text-white">Proof Points from the Field</h2>
          <p className="mx-auto max-w-2xl text-sm text-white/60 md:text-base">
            Three quick snapshots of how we ship measurable outcomes across AI platforms, commerce,
            and SaaS modernisation.
          </p>
        </div>

        <div
          className="grid gap-4 md:gap-5 lg:grid-cols-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          {teasers.map((study, index) => {
            const Icon = iconPalette[index % iconPalette.length];
            const accent = ["#0076D1", "#00A8FF", "#4F46E5"][index % 3];
            const metric = study.metrics[0];

            return (
              <article
                key={study.slug}
                className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] md:p-6"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${accent}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                      {study.industry}
                    </p>
                    <p className="text-xs text-white/40">{study.headquarters}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white md:text-xl">{study.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{study.summary}</p>

                {metric && (
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/50">Hero Metric</p>
                    <p className="numeric-value text-2xl font-black text-white md:text-3xl">
                      {metric.value}
                    </p>
                    <p className="text-xs text-white/60">{metric.label}</p>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-primary">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-white transition hover:border-primary hover:text-white"
                  >
                    View case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            Browse all success stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


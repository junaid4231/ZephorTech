"use client";

import Image from "next/image";
import { useState } from "react";
import { Quote, CheckCircle2, ArrowRight, Target } from "lucide-react";
import type { CaseStudy, CaseStudySection, CaseStudyVisualReference } from "@/lib/case-studies";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import Link from "next/link";

interface CaseStudyDetailContentProps {
  study: CaseStudy;
}

export function CaseStudyDetailContent({ study }: CaseStudyDetailContentProps) {
  const { ref: summaryRef, isVisible: summaryVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: challengeRef, isVisible: challengeVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: visualsRef, isVisible: visualsVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: outcomesRef, isVisible: outcomesVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: techRef, isVisible: techVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation({
    threshold: 0.2,
  });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <div className="container-standard space-y-6 md:space-y-8">
      {/* Summary */}
      <section
        ref={summaryRef}
        className="group rounded-xl border transition-all duration-500 md:rounded-2xl"
        style={{
          opacity: summaryVisible ? 1 : 0,
          transform: summaryVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        <div className="grid gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-5">
          <div>
            <div className="mb-2 flex items-center gap-3 md:mb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#0076D1]">
                Project Overview
              </p>
              {study.isInHouse && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.15))",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    color: "#10B981",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  In-House Product
                </span>
              )}
            </div>
            <h3 className="font-poppins mb-3 text-2xl font-bold text-white md:mb-4 md:text-3xl">{study.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400 md:text-base">{study.excerpt}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            <InfoTile label={study.isInHouse ? "Built By" : "Client"} value={study.client} />
            <InfoTile label="Industry" value={study.industry} />
            <InfoTile label="Headquarters" value={study.headquarters} />
            <InfoTile label="Timeline" value={study.timeline} />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section
        ref={highlightsRef}
        className="grid gap-4 md:grid-cols-3 md:gap-5"
        style={{
          opacity: highlightsVisible ? 1 : 0,
          transform: highlightsVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        {study.highlights.map((highlight, index) => (
          <div
            key={highlight}
            className="group rounded-xl border transition-all duration-500 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 118, 209, 0.05), rgba(255, 255, 255, 0.02))",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.05)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              transitionDelay: `${index * 100}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
            }}
          >
            <div className="p-4 md:p-5">
              <CheckCircle2 className="mb-3 h-5 w-5 text-[#0076D1] md:h-6 md:w-6" />
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">{highlight}</p>
            </div>
          </div>
        ))}
      </section>

      {study.visualReferences && study.visualReferences.length > 0 && (
        <section
          ref={visualsRef}
          className="rounded-xl border p-5 transition-all duration-500 md:rounded-2xl md:p-8"
          style={{
            opacity: visualsVisible ? 1 : 0,
            transform: visualsVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            background: "linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(0,118,209,0.04) 50%, rgba(255,255,255,0.02) 100%)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="mb-6 md:mb-8">
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "rgba(0, 118, 209, 0.15)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0076D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
                Product Showcase
              </p>
            </div>
            <h3 className="font-poppins mb-2 text-xl font-bold text-white md:text-2xl">
              Product experience highlights
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
              Actual production screens from the live application, showcasing the product's
              design language, user flows, and interaction quality.
            </p>
          </div>
          <div className={`grid gap-5 md:gap-6 ${
            study.visualReferences.length <= 3
              ? 'md:grid-cols-3'
              : study.visualReferences.length === 4
              ? 'md:grid-cols-2 lg:grid-cols-4'
              : 'md:grid-cols-3 lg:grid-cols-5'
          }`}>
            {study.visualReferences.map((visual, index) => (
              <VisualReferenceCard key={visual.title} visual={visual} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Challenge / Strategy */}
      <section
        ref={challengeRef}
        className="grid gap-4 md:grid-cols-2 md:gap-5"
        style={{
          opacity: challengeVisible ? 1 : 0,
          transform: challengeVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        <DetailSection title={study.challenge.title} section={study.challenge} label="Challenge" />
        <DetailSection title={study.strategy.title} section={study.strategy} label="Strategy" />
      </section>

      {/* Outcomes */}
      <section
        ref={outcomesRef}
        className="group rounded-xl border transition-all duration-500 md:rounded-2xl"
        style={{
          opacity: outcomesVisible ? 1 : 0,
          transform: outcomesVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        <div className="p-4 md:p-5">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#0076D1] md:mb-3">Results</p>
          <h3 className="font-poppins mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">{study.outcome.title}</h3>
          <p className="mb-5 text-sm leading-relaxed text-gray-400 md:mb-6 md:text-base">
            {study.outcome.description}
          </p>
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {study.outcome.bullets.map((bullet) => (
              <div
                key={bullet}
                className="group/bullet rounded-xl border p-3 transition-all duration-300 hover:scale-105 md:p-4"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                  e.currentTarget.style.background = "rgba(0, 118, 209, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.3)";
                }}
              >
                <div className="flex items-start gap-2.5 md:gap-3">
                  <Target className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#0076D1] md:h-4 md:w-4" />
                  <p className="text-xs text-gray-300 md:text-sm">{bullet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section
        ref={metricsRef}
        className="group rounded-xl border transition-all duration-500 md:rounded-2xl"
        style={{
          opacity: metricsVisible ? 1 : 0,
          transform: metricsVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          background: "linear-gradient(135deg, rgba(0, 118, 209, 0.08), rgba(255, 255, 255, 0.03))",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        <div className="grid gap-4 p-4 md:grid-cols-3 md:gap-5 md:p-5">
          {study.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="text-center"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <p className="font-poppins mb-2 text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-4xl">
                {metric.value}
              </p>
              <p className="mb-2 text-xs uppercase tracking-wide text-white/50 md:text-sm">{metric.label}</p>
              <p className="text-xs text-gray-400">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies & Services */}
      <section
        ref={techRef}
        className="grid gap-4 md:grid-cols-2 md:gap-5"
        style={{
          opacity: techVisible ? 1 : 0,
          transform: techVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        <TechSection title="Technologies" items={study.technologies} />
        <TechSection title="Services" items={study.services} isService />
      </section>

      {/* Testimonial */}
      <section
        ref={testimonialRef}
        className="group relative overflow-hidden rounded-xl border transition-all duration-500 md:rounded-2xl"
        style={{
          opacity: testimonialVisible ? 1 : 0,
          transform: testimonialVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          background: "linear-gradient(135deg, rgba(0, 118, 209, 0.05), rgba(255, 255, 255, 0.03))",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
        }}
      >
        <div className="p-5 md:p-6">
          <Quote className="mb-4 h-12 w-12 text-[#0076D1] opacity-20 md:mb-5 md:h-16 md:w-16" aria-hidden="true" />
          <p className="mb-5 text-lg italic leading-relaxed text-white md:mb-6 md:text-xl">
            "{study.testimonial.quote}"
          </p>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0076D1] to-[#00A8FF] font-bold text-white md:h-12 md:w-12">
              {study.testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white md:text-base">{study.testimonial.author}</p>
              <p className="text-xs text-gray-400 md:text-sm">
                {study.testimonial.role}, {study.testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="group rounded-xl border text-center transition-all duration-500 md:rounded-2xl"
        style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
          background: "linear-gradient(135deg, rgba(0, 118, 209, 0.1), rgba(255, 255, 255, 0.03))",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(0, 118, 209, 0.2)",
          boxShadow: "0 4px 16px rgba(0, 118, 209, 0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.4)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.1)";
        }}
      >
        <div className="p-5 md:p-6">
          <h3 className="font-poppins mb-3 text-2xl font-bold text-white md:mb-4 md:text-3xl">
            Ready for a similar transformation?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-400 md:mb-8 md:text-base">
            Let's design a roadmap tailored to your growth targets and market realities.
          </p>
          <Link
            href="/contact#quote"
            className="group/cta inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 md:gap-3 md:px-6 md:py-3 md:text-base"
            style={{
              background: "linear-gradient(90deg, #004E8F 0%, #0076D1 100%)",
              boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 118, 209, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
            }}
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1 md:h-5 md:w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function VisualReferenceCard({
  visual,
  index,
}: {
  visual: CaseStudyVisualReference;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-2"
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        borderColor: "rgba(255, 255, 255, 0.06)",
        transitionDelay: `${index * 80}ms`,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${visual.accent}40`;
        e.currentTarget.style.boxShadow = `0 12px 40px ${visual.accent}20, 0 4px 16px rgba(0, 0, 0, 0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Phone mockup area */}
      <div className="relative flex items-center justify-center px-4 pb-2 pt-5">
        {/* Subtle glow behind device */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{
            background: `radial-gradient(ellipse at center 30%, ${visual.accent}30, transparent 70%)`,
          }}
        />

        {/* Device frame */}
        <div
          className="relative w-full max-w-[200px] overflow-hidden rounded-[1.75rem] border transition-transform duration-500 group-hover:scale-[1.04]"
          style={{
            borderColor: "rgba(255, 255, 255, 0.12)",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.06)`,
            background: "#000",
            aspectRatio: "9 / 19.5",
          }}
        >

          {visual.image && !imageFailed ? (
            <Image
              src={visual.image}
              alt={`${visual.title} screenshot`}
              fill
              sizes="200px"
              className="object-cover object-top"
              unoptimized
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full flex-col p-3 pt-6" style={{ background: `linear-gradient(160deg, ${visual.accent}, #070B14 72%)` }}>
              <div className="mb-4 flex items-center justify-between text-[10px] text-white/65">
                <span>9:41</span>
                <span>● ● ●</span>
              </div>
              <div className="mb-4">
                <div className="mb-2 h-2 w-12 rounded-full bg-white/35" />
                <h4 className="text-lg font-bold leading-tight text-white">{visual.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-white/65">{visual.subtitle}</p>
              </div>
              <div className="space-y-2">
                {visual.points.map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/12 p-3">
                    <div className="mb-2 h-2 w-10 rounded-full bg-white/30" />
                    <p className="text-xs font-semibold text-white/85">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto grid grid-cols-4 gap-2 pt-5">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="h-8 rounded-xl bg-white/12" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h4 className="mb-1 text-center text-sm font-semibold text-white md:text-base">{visual.title}</h4>
        <p className="mx-auto mb-3 max-w-xs text-center text-xs leading-relaxed text-gray-500">
          {visual.subtitle}
        </p>

        {/* Feature tags */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-1.5">
          {visual.points.map((point) => (
            <span
              key={point}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium transition-all duration-300"
              style={{
                background: `${visual.accent}15`,
                color: `${visual.accent}`,
                border: `1px solid ${visual.accent}25`,
                filter: "brightness(1.6)",
              }}
            >
              {point}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="group rounded-xl border p-3 transition-all duration-300 hover:scale-105 md:p-4"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
        e.currentTarget.style.background = "rgba(0, 118, 209, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
      }}
    >
      <p className="mb-1 text-xs uppercase tracking-wide text-white/50">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function DetailSection({
  title,
  section,
  label,
}: {
  title: string;
  section: CaseStudySection;
  label: string;
}) {
  return (
    <div
      className="group rounded-xl border transition-all duration-500 hover:scale-[1.02] md:rounded-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      <div className="p-5 md:p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#0076D1] md:mb-3">{label}</p>
        <h4 className="font-poppins mb-3 text-xl font-bold text-white md:mb-4 md:text-2xl">{title}</h4>
        <p className="mb-4 text-sm leading-relaxed text-gray-400 md:text-base">{section.description}</p>
        <ul className="space-y-2.5 md:space-y-3">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-2.5 text-xs text-gray-300 md:gap-3 md:text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0076D1]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechSection({
  title,
  items,
  isService = false,
}: {
  title: string;
  items: string[];
  isService?: boolean;
}) {
  return (
    <div
      className="group rounded-xl border transition-all duration-500 hover:scale-[1.02] md:rounded-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
      }}
    >
      <div className="p-5 md:p-6">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#0076D1] md:mb-4 md:text-lg">{title}</p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="group/tag rounded-full border px-2.5 py-0.5 text-xs transition-all duration-300 hover:scale-105 md:px-3 md:py-1.5 md:text-sm"
              style={{
                borderColor: isService ? "rgba(0, 118, 209, 0.3)" : "rgba(255, 255, 255, 0.2)",
                background: isService ? "rgba(0, 118, 209, 0.05)" : "rgba(255, 255, 255, 0.05)",
                color: isService ? "#00A8FF" : "#E5E7EB",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.5)";
                e.currentTarget.style.background = "rgba(0, 118, 209, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isService
                  ? "rgba(0, 118, 209, 0.3)"
                  : "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.background = isService
                  ? "rgba(0, 118, 209, 0.05)"
                  : "rgba(255, 255, 255, 0.05)";
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

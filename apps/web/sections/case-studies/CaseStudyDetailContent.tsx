"use client";

import { Quote, CheckCircle2, ArrowRight, Target } from "lucide-react";
import type { CaseStudy, CaseStudySection } from "@/lib/case-studies";
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
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#0076D1] md:mb-3">
              Project Overview
            </p>
            <h3 className="font-poppins mb-3 text-2xl font-bold text-white md:mb-4 md:text-3xl">{study.title}</h3>
            <p className="text-sm leading-relaxed text-gray-400 md:text-base">{study.excerpt}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            <InfoTile label="Client" value={study.client} />
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

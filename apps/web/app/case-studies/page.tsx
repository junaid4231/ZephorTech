import type { Metadata } from "next";
import { Header, Footer, PageHero } from "@/components";
import { CaseStudiesShowcase } from "@/sections/case-studies/CaseStudiesShowcase";
import { CaseStudyCard } from "@/sections/case-studies/CaseStudyCard";
import { InquirySection } from "@/sections";
import { getAllCaseStudiesCached } from "@/lib/case-studies-cms";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio - ZephorTech",
  description:
    "Explore how ZephorTech delivers measurable impact across fintech, healthcare, SaaS, and commerce with modern engineering and AI.",
  openGraph: {
    title: "Case Studies & Portfolio - ZephorTech",
    description:
      "Digital transformation stories backed by metrics, testimonials, and premium execution.",
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudiesCached();

  return (
    <>
      <Header />
      <PageHero
        title="Case Studies"
        subtitle="Impact Delivered"
        description="Explore flagship engagements across fintech, healthcare, commerce, and SaaS—each engineered with ZephorTech’s architecture, AI, and delivery rigor."
        stats={[
          { value: caseStudies.length, suffix: "+", label: "Case Studies" },
          { value: 12, suffix: "+", label: "Industries" },
          { value: 96, suffix: "%", label: "Client Satisfaction" },
          { value: 500, suffix: "+", label: "Features Shipped" },
        ]}
        backgroundType="animation"
        ctaText="Plan your transformation"
        ctaHref="/contact#quote"
      />

      <CaseStudiesShowcase studies={caseStudies} />

      <section
        className="relative section-padding"
        style={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #0076D1 1px, transparent 1px),
                linear-gradient(to bottom, #0076D1 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container-standard relative z-10">
          <div className="mb-16 text-center">
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0076D1] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0076D1]" />
              Complete Portfolio
            </p>
            <h2 className="heading-2 mb-4">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                All Case Studies
              </span>
            </h2>
            <p className="subtitle text-gray-400 max-w-2xl mx-auto">
              Browse our complete collection of transformative projects across industries and technologies.
            </p>
          </div>
          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      <InquirySection />
      <Footer />
    </>
  );
}


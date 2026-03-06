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
          { value: 8, suffix: "+", label: "Industries" },
          { value: 96, suffix: "%", label: "Client Satisfaction" },
          { value: 120, suffix: "+", label: "Features Shipped" },
        ]}
        backgroundType="animation"
        ctaText="Plan your transformation"
        ctaHref="/contact#quote"
      />

      <CaseStudiesShowcase studies={caseStudies} />

      <section className="section-padding relative" style={{ background: "#080D14" }}>
        <div className="container-standard relative z-10">
          <div className="mb-16 text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-[#0076D1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0076D1]" />
              Complete Portfolio
            </p>
            <h2 className="heading-2 mb-4 text-white">All Case Studies</h2>
            <p className="subtitle mx-auto max-w-2xl text-gray-400">
              Browse our complete collection of transformative projects across industries and
              technologies.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
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

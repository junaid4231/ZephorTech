import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, PageHero } from "@/components";
import { CaseStudyDetailContent } from "@/sections/case-studies/CaseStudyDetailContent";
import {
  getAllCaseStudiesCached,
  getCaseStudyBySlugCached,
} from "@/lib/case-studies-cms";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await getAllCaseStudiesCached();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlugCached(slug);

  if (!study) {
    return {
      title: "Case Study Not Found - ZephorTech",
    };
  }

  return {
    title: `${study.title} - ZephorTech Case Study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} - ZephorTech Case Study`,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlugCached(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <Header />
      <PageHero
        title={study.title}
        subtitle={study.hero.subtitle}
        description={study.hero.description}
        stats={study.hero.stats}
        ctaText="Discuss a similar build"
        ctaHref="/contact#quote"
        backgroundType="animation"
      />
      <section
        className="relative py-24"
        style={{
          background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
        }}
      >
        <CaseStudyDetailContent study={study} />
      </section>
      <Footer />
    </>
  );
}


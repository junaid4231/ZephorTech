import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { StructuredData } from "@/components/StructuredData";
import {
  Hero,
  ServicesPreview,
  CaseStudyTeasers,
  ClientLogos,
  Testimonials,
  Technologies,
  BlogHighlights,
  NewsletterSection,
  InquirySection,
  FinalCTA,
  ProcessLink,
} from "@/sections";
import { getAllTestimonialsCached } from "@/lib/testimonials-cms";
import { getAllServicesCached } from "@/lib/services-cms";
import { getAllCaseStudiesCached } from "@/lib/case-studies-cms";
import { getFeaturedBlogPostsCached } from "@/lib/blog-cms";

export const metadata: Metadata = {
  title: "ZephorTech - Cutting-Edge IT Solutions & Digital Transformation",
  description:
    "Transform your business with ZephorTech's expert IT services. Web & mobile development, AI agents, SaaS solutions, e-commerce, and cloud services. 500+ projects delivered, 200+ happy clients.",
  keywords: [
    "IT services",
    "web development",
    "mobile apps",
    "AI agents",
    "SaaS development",
    "e-commerce solutions",
    "digital transformation",
    "cloud computing",
    "DevOps",
    "software development company",
  ],
  openGraph: {
    title: "ZephorTech - Cutting-Edge IT Solutions & Digital Transformation",
    description:
      "Transform your business with expert IT services. 500+ projects delivered, 200+ happy clients, 15+ years of experience.",
    type: "website",
    url: "https://zephortech.com",
  },
};

export default async function Home() {
  const [services, testimonials, caseStudies, featuredBlogPosts] = await Promise.all([
    getAllServicesCached(),
    getAllTestimonialsCached(),
    getAllCaseStudiesCached(),
    getFeaturedBlogPostsCached(3),
  ]);

  const featuredServices = services; // Show all services
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <>
      <StructuredData />
      <Header />
      <Hero />
      <ServicesPreview services={featuredServices} />
      <CaseStudyTeasers caseStudies={featuredCaseStudies} />
      <ClientLogos />
      <Testimonials testimonials={testimonials} />
      <Technologies />
      <BlogHighlights posts={featuredBlogPosts} />
      <NewsletterSection />
      <ProcessLink />
      <InquirySection />
      <FinalCTA />
      <Footer />
    </>
  );
}


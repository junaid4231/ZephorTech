import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer, PageHero } from "@/components";
import { InteractiveServices } from "./InteractiveServices";
import { WhyChooseSection } from "./WhyChooseSection";
import { InquirySection, ProjectPlanner } from "@/sections";
import { getAllServicesCached } from "@/lib/services-cms";

export const metadata: Metadata = {
  title: "Our Services - ZephorTech",
  description:
    "Comprehensive IT services including web development, mobile apps, AI agents, SaaS solutions, e-commerce, and cloud & DevOps. Transform your business with cutting-edge technology.",
  keywords: [
    "web development services",
    "mobile app development",
    "AI solutions",
    "SaaS development",
    "e-commerce solutions",
    "cloud services",
    "DevOps",
    "IT services",
  ],
  openGraph: {
    title: "Our Services - ZephorTech",
    description:
      "Comprehensive IT services to transform your business with cutting-edge technology.",
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await getAllServicesCached();

  return (
    <>
      <Header />
      <PageHero
        title="Our Services"
        subtitle="Comprehensive IT Solutions"
        description="Transform your business with our cutting-edge technology services. From web development to AI solutions, we deliver excellence in every project."
        stats={[
          { value: services.length, suffix: " Services", label: "Available" },
          { value: 500, suffix: "+", label: "Projects Delivered" },
          { value: 98, suffix: "%", label: "Success Rate" },
          { value: 200, suffix: "+", label: "Happy Clients" },
        ]}
        ctaText="Get Started"
        ctaHref="/contact#quote"
      />

      {/* Interactive Services */}
      <InteractiveServices
        services={services}
        title="Explore Our Services"
        subtitle="Click on any service to learn more about our comprehensive solutions"
      />

      <WhyChooseSection />

      <ProjectPlanner />

      <InquirySection />

      {/* CTA Section */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
        }}
      >
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-poppins mb-6 text-4xl font-black text-white md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-blue-50/90">
            Let's discuss how our services can transform your business. Get in touch for a free
            consultation.
          </p>
          <Link
            href="/contact#quote"
            className="font-inter text-primary group inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-4 text-lg font-bold shadow-2xl transition-all hover:scale-105"
          >
            <span>Request a Quote</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

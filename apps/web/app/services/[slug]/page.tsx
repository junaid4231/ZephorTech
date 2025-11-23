import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, PageHero } from "@/components";
import { getServiceBySlugCached, getAllServicesCached, getRelatedServicesCached } from "@/lib/services-cms";
import { ServiceDetailContent } from "./ServiceDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServicesCached();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugCached(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} - ZephorTech`,
    description: service.seoDescription || service.fullDescription,
    keywords: [
      service.title.toLowerCase(),
      "IT services",
      "software development",
      "technology solutions",
    ],
    openGraph: {
      title: `${service.title} - ZephorTech`,
      description: service.seoDescription || service.fullDescription,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugCached(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <PageHero
        title={service.title}
        subtitle={service.shortDescription}
        description={service.fullDescription}
        stats={[
          { value: service.heroStats.projects, suffix: "+", label: "Projects" },
          { value: service.heroStats.successRate, suffix: "%", label: "Success Rate" },
          { value: service.heroStats.satisfaction, suffix: "%", label: "Satisfaction" },
          { display: service.heroStats.deliveryTime, label: "Avg. Delivery" },
        ]}
        ctaText="Get Started"
        ctaHref="/contact#quote"
      />
      <ServiceDetailContent 
        service={service} 
        relatedServices={await getRelatedServicesCached(slug)}
      />
      <Footer />
    </>
  );
}


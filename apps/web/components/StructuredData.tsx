"use client";

import { siteConfig } from "@/config";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: "https://zephortech.com",
    logo: "https://zephortech.com/logo.png",
    description: siteConfig.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone.replace(/\s/g, ""),
      contactType: "Customer Service",
      email: siteConfig.email,
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.facebook,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "PK",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: "https://zephortech.com",
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: "https://zephortech.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        name: "Web Development",
        description: "Custom web applications and websites built with modern technologies",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
      {
        "@type": "Service",
        name: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
      {
        "@type": "Service",
        name: "AI Agents & Machine Learning",
        description: "Intelligent automation solutions powered by AI and ML",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
      {
        "@type": "Service",
        name: "SaaS Development",
        description: "Scalable Software as a Service platforms",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
      {
        "@type": "Service",
        name: "E-commerce Solutions",
        description: "Complete e-commerce platforms with Shopify, WooCommerce, and custom solutions",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
      {
        "@type": "Service",
        name: "Cloud & DevOps",
        description: "Cloud infrastructure, CI/CD, and DevOps automation",
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
    </>
  );
}


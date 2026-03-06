"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Cloud,
  Code,
  Globe,
  Megaphone,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Palette,
  Wrench,
} from "lucide-react";
import type { ServiceDetail } from "@/lib/services";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ServicesPreviewProps {
  services?: ServiceDetail[];
}

interface ServiceRow {
  id: string;
  iconName: string;
  title: string;
  shortDescription: string;
  slug: string;
}

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  web: Globe,
  mobile: Smartphone,
  ai: Brain,
  saas: Code,
  ecommerce: ShoppingCart,
  cloud: Cloud,
  marketing: Megaphone,
  seo: TrendingUp,
  uiux: Palette,
  maintenance: Wrench,
};

const serviceAccents: Record<string, string> = {
  web: "#3B82F6",
  mobile: "#A855F7",
  ai: "#6366F1",
  saas: "#10B981",
  ecommerce: "#F59E0B",
  cloud: "#06B6D4",
  marketing: "#EC4899",
  seo: "#F97316",
  uiux: "#8B5CF6",
  maintenance: "#64748B",
  default: "#0076D1",
};

const fallbackServices: ServiceRow[] = [
  {
    id: "web",
    iconName: "web",
    title: "Web Development",
    shortDescription:
      "Production-grade apps on Next.js and React — optimised for speed, SEO, and conversion.",
    slug: "web-development",
  },
  {
    id: "mobile",
    iconName: "mobile",
    title: "Mobile Apps",
    shortDescription:
      "Cross-platform iOS & Android apps that feel native and scale under real traffic.",
    slug: "mobile-apps",
  },
  {
    id: "ai",
    iconName: "ai",
    title: "AI Agents",
    shortDescription:
      "Practical AI that automates real business workflows — from prototype to production.",
    slug: "ai-agents",
  },
  {
    id: "saas",
    iconName: "saas",
    title: "SaaS Solutions",
    shortDescription:
      "Full-stack SaaS platforms with Stripe billing, auth, and multi-tenant architecture.",
    slug: "saas",
  },
  {
    id: "ecommerce",
    iconName: "ecommerce",
    title: "E-commerce",
    shortDescription:
      "Stores and marketplaces built around conversion — fast checkout, regional payments.",
    slug: "ecommerce",
  },
  {
    id: "cloud",
    iconName: "cloud",
    title: "Cloud & DevOps",
    shortDescription:
      "Infrastructure that ships reliably, scales automatically, and stays observable.",
    slug: "cloud-devops",
  },
  {
    id: "marketing",
    iconName: "marketing",
    title: "Digital Marketing",
    shortDescription:
      "Full-funnel growth — paid, organic, and retention — tied to revenue metrics that matter.",
    slug: "digital-marketing",
  },
  {
    id: "seo",
    iconName: "seo",
    title: "SEO & Performance",
    shortDescription:
      "Technical SEO, Core Web Vitals, and content strategy to win sustainable organic traffic.",
    slug: "seo-performance",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Single service card
// ─────────────────────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  sectionVisible,
}: {
  service: ServiceRow;
  index: number;
  sectionVisible: boolean;
}) {
  const Icon = iconMap[service.iconName] || Globe;
  const color = serviceAccents[service.iconName] || serviceAccents.default;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease-out ${index * 70}ms, transform 0.6s ease-out ${index * 70}ms, border 0.25s, background 0.25s, box-shadow 0.25s`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = `1px solid ${color}60`;
        el.style.background = `${color}0D`;
        el.style.boxShadow = `0 0 48px ${color}20, 0 8px 32px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.border = "1px solid rgba(255,255,255,0.1)";
        el.style.background = "rgba(255,255,255,0.04)";
        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25)";
      }}
    >
      {/* Colored top accent line */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }}
      />

      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Icon badge */}
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${color}20`,
            border: `1px solid ${color}40`,
            boxShadow: `0 4px 12px ${color}18`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="font-poppins text-[17px] font-bold leading-tight text-white">
            {service.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-white/55">
            {service.shortDescription}
          </p>
        </div>

        {/* Learn more — accent colour per service */}
        <div
          className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
          style={{ color }}
        >
          <span>Learn more</span>
          <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });

  const rows: ServiceRow[] =
    services.length > 0
      ? services
          .filter((s) => s && s.slug)
          .map((s) => ({
            id: s.slug,
            iconName: s.iconName || "web",
            title: s.title,
            shortDescription: s.shortDescription || s.fullDescription || "",
            slug: s.slug,
          }))
      : fallbackServices;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "#080D14" }}
      aria-labelledby="services-preview-heading"
      ref={sectionRef}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Ambient orbs */}
      <div
        className="pointer-events-none absolute -right-48 top-0 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(0,118,209,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[350px] w-[350px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10">
        {/* Header */}
        <div
          className="mb-12 text-center transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0076D1]">
            What We Build
          </p>
          <h2 id="services-preview-heading" className="heading-2 mb-4 text-white">
            Engineering First. Results Driven.
          </h2>
          <p className="mx-auto max-w-lg text-base text-white/50">
            From web and mobile to AI and cloud — end-to-end software delivery, not just consulting.
          </p>
        </div>

        {/* Service grid — 2 cols mobile, 4 cols desktop = clean 2×4 for all 8 services */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.slice(0, 8).map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              sectionVisible={sectionVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-10 flex justify-center transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "500ms",
          }}
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-[#0076D1]/50 hover:bg-[#0076D1]/10 hover:text-white"
          >
            Explore All Our Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

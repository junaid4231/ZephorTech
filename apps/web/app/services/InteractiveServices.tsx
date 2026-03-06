"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
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
  Server,
  GitBranch,
  Layers,
  CheckCircle2,
  Clock,
  BarChart3,
  Star,
  ChevronRight,
} from "lucide-react";
import type { ServiceDetail } from "@/lib/services";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface InteractiveServicesProps {
  services: ServiceDetail[];
  title?: string;
  subtitle?: string;
}

interface ServiceCardData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  slug: string;
  fullDescription?: string;
  techStack?: {
    frontend: string[];
    backend: string[];
    tools: string[];
    cloud: string[];
  };
  benefits?: string[];
  heroStats?: {
    projects: number;
    successRate: number;
    satisfaction: number;
    deliveryTime: string;
  };
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

const serviceAccents: Record<string, { color: string; glow: string; bg: string }> = {
  web: { color: "#3B82F6", glow: "rgba(59,130,246,0.25)", bg: "rgba(59,130,246,0.08)" },
  mobile: { color: "#A855F7", glow: "rgba(168,85,247,0.25)", bg: "rgba(168,85,247,0.08)" },
  ai: { color: "#6366F1", glow: "rgba(99,102,241,0.25)", bg: "rgba(99,102,241,0.08)" },
  saas: { color: "#10B981", glow: "rgba(16,185,129,0.25)", bg: "rgba(16,185,129,0.08)" },
  ecommerce: { color: "#F59E0B", glow: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.08)" },
  cloud: { color: "#06B6D4", glow: "rgba(6,182,212,0.25)", bg: "rgba(6,182,212,0.08)" },
  marketing: { color: "#EC4899", glow: "rgba(236,72,153,0.25)", bg: "rgba(236,72,153,0.08)" },
  seo: { color: "#F97316", glow: "rgba(249,115,22,0.25)", bg: "rgba(249,115,22,0.08)" },
  uiux: { color: "#8B5CF6", glow: "rgba(139,92,246,0.25)", bg: "rgba(139,92,246,0.08)" },
  maintenance: { color: "#64748B", glow: "rgba(100,116,139,0.25)", bg: "rgba(100,116,139,0.08)" },
  default: { color: "#0076D1", glow: "rgba(0,118,209,0.25)", bg: "rgba(0,118,209,0.08)" },
};

const getAccent = (iconName: string) => serviceAccents[iconName] || serviceAccents.default;

const techColors: Record<string, string> = {
  React: "#61DAFB",
  "Next.js": "#7C7C7C",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Vue.js": "#4FC08D",
  Angular: "#DD0031",
  "Node.js": "#339933",
  Python: "#3776AB",
  Express: "#999999",
  FastAPI: "#009688",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  Git: "#F05032",
  Docker: "#2496ED",
  Jest: "#C21325",
  Vite: "#646CFF",
  Vercel: "#888888",
  AWS: "#FF9900",
  Azure: "#0078D4",
  Cloudflare: "#F38020",
  Netlify: "#00C7B7",
  "React Native": "#61DAFB",
  Flutter: "#02569B",
  Swift: "#FA7343",
  Kotlin: "#7F52FF",
  TensorFlow: "#FF6F00",
  OpenAI: "#10A37F",
  LangChain: "#1C3C3C",
  PyTorch: "#EE4C2C",
  default: "#0076D1",
};

const getTechColor = (t: string) => techColors[t] || techColors.default;

// ─────────────────────────────────────────────────────────────────────────────
// Detail Panel (shared between desktop and mobile layouts)
// ─────────────────────────────────────────────────────────────────────────────
function DetailPanel({
  selectedService,
  activeTechTab,
  setActiveTechTab,
  accent,
  sectionVisible,
  getAvailableCategories,
}: {
  selectedService: ServiceCardData;
  activeTechTab: "frontend" | "backend" | "tools" | "cloud";
  setActiveTechTab: (cat: "frontend" | "backend" | "tools" | "cloud") => void;
  accent: { color: string; glow: string; bg: string };
  sectionVisible: boolean;
  getAvailableCategories: (
    s: ServiceCardData | null
  ) => Array<"frontend" | "backend" | "tools" | "cloud">;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border transition-all duration-500"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: "200ms",
        borderColor: accent.color + "35",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Header band */}
      <div
        className="relative overflow-hidden px-7 py-6"
        style={{ background: `linear-gradient(135deg, ${accent.bg}, ${accent.color}05)` }}
      >
        <div
          className="absolute right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: accent.glow }}
        />
        <div className="relative flex items-center gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl transition-all duration-300"
            style={{
              background: accent.color + "22",
              border: `1.5px solid ${accent.color}45`,
              boxShadow: `0 4px 24px ${accent.glow}`,
            }}
          >
            {React.createElement(iconMap[selectedService.iconName] || Globe, {
              className: "h-7 w-7",
              style: { color: accent.color } as React.CSSProperties,
            })}
          </div>
          <div>
            <h3 className="font-poppins text-2xl font-bold text-white">{selectedService.title}</h3>
            {selectedService.heroStats && (
              <p className="mt-0.5 text-xs text-white/40">
                {selectedService.heroStats.projects}+ projects ·{" "}
                {selectedService.heroStats.deliveryTime}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-6">
        {/* Stats row */}
        {selectedService.heroStats && (
          <div className="mb-7 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]">
            {[
              {
                icon: BarChart3,
                label: "Projects Delivered",
                value: `${selectedService.heroStats.projects}+`,
              },
              {
                icon: Star,
                label: "Success Rate",
                value: `${selectedService.heroStats.successRate}%`,
              },
              {
                icon: Clock,
                label: "Typical Delivery",
                value: selectedService.heroStats.deliveryTime,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center py-5 text-center">
                <Icon className="mb-2 h-4 w-4 opacity-50" style={{ color: accent.color }} />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/35">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="mb-7 text-[15px] leading-relaxed text-white/70">
          {selectedService.fullDescription || selectedService.description}
        </p>

        {/* Benefits */}
        {selectedService.benefits && selectedService.benefits.length > 0 && (
          <div className="mb-7">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: accent.color }}
            >
              Key Benefits
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {selectedService.benefits.slice(0, 6).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    style={{ color: accent.color }}
                  />
                  <span className="text-sm leading-snug text-white/65">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack */}
        {selectedService.techStack && (
          <div className="mb-7">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: accent.color }}
            >
              Technology Stack
            </p>
            {/* Category tabs */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {getAvailableCategories(selectedService).map((cat) => {
                const CatIcon = {
                  frontend: Layers,
                  backend: Server,
                  tools: GitBranch,
                  cloud: Cloud,
                }[cat];
                const catLabel = {
                  frontend: "Frontend",
                  backend: "Backend",
                  tools: "Tools",
                  cloud: "Cloud",
                }[cat];
                const isActive = activeTechTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTechTab(cat)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200"
                    style={{
                      background: isActive ? accent.color + "20" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? accent.color + "65" : "rgba(255,255,255,0.08)"}`,
                      color: isActive ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <CatIcon className="h-3 w-3" />
                    {catLabel}
                  </button>
                );
              })}
            </div>
            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {(selectedService.techStack[activeTechTab] || [])
                .filter((t) => t !== "N/A")
                .map((tech, idx) => {
                  const tc = getTechColor(tech);
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1]"
                    >
                      <div
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: tc }}
                      />
                      {tech}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/services/${selectedService.slug}`}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
          style={{
            background: `linear-gradient(135deg, ${accent.color}BB 0%, ${accent.color} 100%)`,
            boxShadow: `0 4px 24px ${accent.glow}`,
          }}
        >
          Deep-Dive Into {selectedService.title}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export function InteractiveServices({
  services,
  title = "Explore Our Services",
  subtitle = "Select a service to explore capabilities, technology stack, and delivery timelines",
}: InteractiveServicesProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px",
  });
  const tabsRef = useRef<HTMLDivElement>(null);

  const resolvedServices: ServiceCardData[] = services
    .filter((s) => s && s.slug)
    .map((s) => ({
      id: s.slug,
      iconName: s.iconName || "web",
      title: s.title,
      description: s.shortDescription || s.fullDescription || "",
      slug: s.slug,
      fullDescription: s.fullDescription,
      techStack: s.techStack,
      benefits: s.benefits,
      heroStats: s.heroStats,
    }));

  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(
    resolvedServices[0] || null
  );
  const [activeTechTab, setActiveTechTab] = useState<"frontend" | "backend" | "tools" | "cloud">(
    "frontend"
  );

  const getAvailableCategories = useCallback(
    (service: ServiceCardData | null): Array<"frontend" | "backend" | "tools" | "cloud"> => {
      if (!service?.techStack) return [];
      const cats: Array<"frontend" | "backend" | "tools" | "cloud"> = [];
      if (service.techStack.frontend?.length > 0) cats.push("frontend");
      if (service.techStack.backend?.length > 0) cats.push("backend");
      if (service.techStack.tools?.length > 0) cats.push("tools");
      if (service.techStack.cloud?.length > 0) cats.push("cloud");
      return cats;
    },
    []
  );

  useEffect(() => {
    if (resolvedServices.length > 0 && !selectedService) {
      setSelectedService(resolvedServices[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedService) {
      const available = getAvailableCategories(selectedService);
      if (available.length > 0 && !available.includes(activeTechTab)) {
        setActiveTechTab(available[0]);
      }
    }
  }, [selectedService, activeTechTab, getAvailableCategories]);

  const handleServiceClick = (service: ServiceCardData) => {
    setSelectedService(service);
    const available = getAvailableCategories(service);
    if (available.length > 0) setActiveTechTab(available[0]);
  };

  const accent = selectedService ? getAccent(selectedService.iconName) : getAccent("default");

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "#080D14" }}
      aria-labelledby="services-heading"
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
      {/* Ambient orbs — react to selected service */}
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[600px] w-[600px] rounded-full blur-[120px] transition-all duration-1000"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0,118,209,0.12) 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10">
        {/* Section Header */}
        <div
          className="mb-12 text-center transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0076D1]">
            What We Build
          </p>
          <h2 id="services-heading" className="heading-2 mb-4 text-white">
            {title}
          </h2>
          <p className="mx-auto max-w-xl text-base text-white/50">{subtitle}</p>
        </div>

        {/* ── MOBILE LAYOUT: horizontal scrollable tabs + detail panel ── */}
        <div className="lg:hidden">
          {/* Scrollable tab strip */}
          <div
            ref={tabsRef}
            className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {resolvedServices.map((service) => {
              const IconComponent = iconMap[service.iconName] || Globe;
              const isSelected = selectedService?.id === service.id;
              const ac = getAccent(service.iconName);
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
                  style={{
                    background: isSelected ? ac.bg : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? ac.color + "60" : "rgba(255,255,255,0.08)"}`,
                    color: isSelected ? "white" : "rgba(255,255,255,0.55)",
                  }}
                >
                  <IconComponent
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: isSelected ? ac.color : "rgba(255,255,255,0.4)" }}
                  />
                  {service.title}
                </button>
              );
            })}
          </div>
          {/* Detail panel */}
          {selectedService && (
            <DetailPanel
              selectedService={selectedService}
              activeTechTab={activeTechTab}
              setActiveTechTab={setActiveTechTab}
              accent={accent}
              sectionVisible={sectionVisible}
              getAvailableCategories={getAvailableCategories}
            />
          )}
        </div>

        {/* ── DESKTOP LAYOUT: two-panel ── */}
        <div className="hidden grid-cols-1 items-start gap-6 lg:grid lg:grid-cols-[320px_1fr]">
          {/* Left: service list */}
          <div className="flex flex-col gap-1.5">
            {resolvedServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Globe;
              const isSelected = selectedService?.id === service.id;
              const ac = getAccent(service.iconName);

              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className="group relative flex items-start gap-3.5 rounded-xl px-4 py-4 text-left transition-all duration-200"
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${index * 40}ms`,
                    background: isSelected ? ac.bg : "transparent",
                    border: `1px solid ${isSelected ? ac.color + "50" : "rgba(255,255,255,0.06)"}`,
                  }}
                  aria-label={`View ${service.title}`}
                  aria-pressed={isSelected}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute inset-y-0 left-0 w-[3px] rounded-r-full transition-all duration-200"
                    style={{ background: isSelected ? ac.color : "transparent" }}
                  />

                  {/* Icon */}
                  <div
                    className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200"
                    style={{
                      background: isSelected ? ac.color + "25" : "rgba(255,255,255,0.05)",
                      boxShadow: isSelected ? `0 0 12px ${ac.glow}` : "none",
                    }}
                  >
                    <IconComponent
                      className="h-[18px] w-[18px] transition-colors duration-200"
                      style={{ color: isSelected ? ac.color : "rgba(255,255,255,0.45)" }}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-semibold leading-tight transition-colors duration-200"
                      style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.75)" }}
                    >
                      {service.title}
                    </p>
                    {isSelected && service.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/45">
                        {service.description}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="mt-0.5 h-4 w-4 flex-shrink-0 transition-all duration-200"
                    style={{
                      color: isSelected ? ac.color : "rgba(255,255,255,0.2)",
                      opacity: isSelected ? 1 : 0.6,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          {selectedService && (
            <DetailPanel
              selectedService={selectedService}
              activeTechTab={activeTechTab}
              setActiveTechTab={setActiveTechTab}
              accent={accent}
              sectionVisible={sectionVisible}
              getAvailableCategories={getAvailableCategories}
            />
          )}
        </div>
      </div>
    </section>
  );
}

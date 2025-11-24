"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Database,
  Server,
  GitBranch,
  Layers,
  Target,
  CheckCircle2,
} from "lucide-react";
import type { ServiceDetail } from "@/lib/services";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ServicesPreviewProps {
  services?: ServiceDetail[];
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
}

const fallbackServices: ServiceCardData[] = [
  {
    id: "web",
    iconName: "web",
    title: "Web Development",
    description: "Next-gen web apps built with premium UX, speed, and scalability.",
    slug: "web-development",
    fullDescription:
      "Transform your digital presence with our cutting-edge web development services. We build responsive, scalable, and high-performance web applications using modern technologies like React, Next.js, and TypeScript. From single-page applications to complex enterprise solutions, we deliver web experiences that drive engagement and conversions.",
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
      backend: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
      tools: ["Git", "Docker", "Jest", "Webpack", "Vite", "ESLint"],
      cloud: ["Vercel", "AWS", "Azure", "Cloudflare", "Netlify"],
    },
    benefits: [
      "Increased online presence",
      "Improved user engagement",
      "Scalable architecture",
      "Mobile-responsive design",
    ],
  },
  {
    id: "mobile",
    iconName: "mobile",
    title: "Mobile Apps",
    description: "High-performance native and cross-platform experiences.",
    slug: "mobile-apps",
    fullDescription:
      "Create powerful mobile applications that engage users and drive business growth. We develop native iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. Our mobile apps are optimized for performance, user experience, and app store success.",
    techStack: {
      frontend: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
      backend: ["Node.js", "Firebase", "GraphQL", "REST APIs"],
      tools: ["Xcode", "Android Studio", "Git", "App Store Connect"],
      cloud: ["AWS", "Google Cloud", "Firebase", "App Store"],
    },
    benefits: [
      "Native performance",
      "Cross-platform compatibility",
      "App store optimization",
      "Real-time synchronization",
    ],
  },
  {
    id: "ai",
    iconName: "ai",
    title: "AI Agents",
    description: "Intelligent automation to reshape workflows and support.",
    slug: "ai-agents",
    fullDescription:
      "Leverage the power of artificial intelligence to automate processes, enhance decision-making, and create intelligent solutions that transform your business operations. We build custom AI agents using cutting-edge machine learning and natural language processing technologies.",
    techStack: {
      frontend: ["React", "Python", "TensorFlow", "Streamlit"],
      backend: ["Python", "OpenAI", "LangChain", "PyTorch"],
      tools: ["Jupyter", "MLflow", "Weights & Biases", "Docker"],
      cloud: ["AWS", "Google Cloud AI", "Azure AI", "Hugging Face"],
    },
    benefits: [
      "Automated workflows",
      "Enhanced decision-making",
      "24/7 intelligent support",
      "Data-driven insights",
    ],
  },
  {
    id: "saas",
    iconName: "saas",
    title: "SaaS Solutions",
    description: "Cloud-native platforms engineered for subscription growth.",
    slug: "saas",
    fullDescription:
      "Build scalable software-as-a-service platforms with subscription management, multi-tenancy, and enterprise-grade features that drive recurring revenue. We create SaaS solutions that scale with your business and provide exceptional user experiences.",
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Python", "PostgreSQL", "Redis"],
      tools: ["Stripe", "Auth0", "Docker", "Kubernetes"],
      cloud: ["AWS", "Vercel", "Heroku", "DigitalOcean"],
    },
    benefits: [
      "Recurring revenue model",
      "Scalable infrastructure",
      "Multi-tenant architecture",
      "Enterprise-grade security",
    ],
  },
  {
    id: "ecommerce",
    iconName: "ecommerce",
    title: "E-commerce",
    description: "Complete online stores with payment and inventory management.",
    slug: "ecommerce",
    fullDescription:
      "Create powerful e-commerce platforms with seamless payment processing, inventory management, and customer experience optimization. We build online stores that convert visitors into customers and drive sales growth.",
    techStack: {
      frontend: ["React", "Next.js", "Shopify", "WooCommerce"],
      backend: ["Node.js", "Stripe", "PayPal", "MongoDB"],
      tools: ["Payment Gateways", "Inventory Systems", "Analytics"],
      cloud: ["AWS", "Shopify", "BigCommerce", "Magento"],
    },
    benefits: [
      "Seamless checkout experience",
      "Inventory management",
      "Payment gateway integration",
      "Sales analytics",
    ],
  },
  {
    id: "uiux",
    iconName: "uiux",
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces that delight users.",
    slug: "ui-ux-design",
    fullDescription:
      "Design stunning user interfaces and experiences that combine aesthetics with functionality, ensuring your product is both beautiful and user-friendly. We create designs that users love and that drive engagement.",
    techStack: {
      frontend: ["Figma", "Adobe XD", "Sketch", "Framer"],
      backend: ["Prototyping", "User Research", "Design Systems"],
      tools: ["InVision", "Principle", "After Effects", "Illustrator"],
      cloud: ["Design Systems", "Component Libraries", "Design Tokens"],
    },
    benefits: [
      "User-centered design",
      "Improved conversion rates",
      "Brand consistency",
      "Accessible interfaces",
    ],
  },
  {
    id: "marketing",
    iconName: "marketing",
    title: "Digital Marketing",
    description: "Data-led acquisition campaigns with measurable ROI.",
    slug: "digital-marketing",
    fullDescription:
      "Drive growth with strategic digital marketing campaigns that leverage data analytics, SEO, content marketing, and social media to maximize your ROI. We create marketing strategies that deliver results.",
    techStack: {
      frontend: ["Analytics", "SEO Tools", "Social Media", "Content Management"],
      backend: ["Marketing Automation", "CRM Integration", "Email Marketing"],
      tools: ["Google Analytics", "HubSpot", "Mailchimp", "Hootsuite"],
      cloud: ["Marketing Platforms", "Ad Networks", "CDN", "Hosting"],
    },
    benefits: [
      "Increased brand visibility",
      "Higher conversion rates",
      "Data-driven strategies",
      "Measurable ROI",
    ],
  },
  {
    id: "maintenance",
    iconName: "maintenance",
    title: "Maintenance & Support",
    description: "Ongoing support and optimization for your digital products.",
    slug: "maintenance-support",
    fullDescription:
      "Ensure your digital products remain secure, performant, and up-to-date with our comprehensive maintenance and support services. We provide 24/7 monitoring, updates, and optimization to keep your systems running smoothly.",
    techStack: {
      frontend: ["Monitoring", "Performance Tools", "Error Tracking"],
      backend: ["Backup Systems", "Security Tools", "Logging"],
      tools: ["Sentry", "New Relic", "Datadog", "CI/CD"],
      cloud: ["AWS", "Azure", "Google Cloud", "Monitoring Services"],
    },
    benefits: [
      "24/7 monitoring",
      "Proactive security updates",
      "Performance optimization",
      "Rapid issue resolution",
    ],
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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

const gradientMap: Record<string, string> = {
  web: "from-blue-500/70 via-cyan-500/80 to-blue-600/80",
  mobile: "from-purple-500/70 via-pink-500/80 to-purple-600/80",
  ai: "from-indigo-500/70 via-purple-500/80 to-indigo-600/80",
  saas: "from-green-500/70 via-emerald-500/80 to-green-600/80",
  ecommerce: "from-orange-500/70 via-red-500/80 to-orange-600/80",
  cloud: "from-teal-500/70 via-cyan-500/80 to-teal-600/80",
  marketing: "from-rose-500/70 via-pink-500/80 to-rose-600/80",
  seo: "from-amber-500/70 via-yellow-500/80 to-amber-600/80",
  uiux: "from-pink-500/70 via-purple-500/80 to-pink-600/80",
  maintenance: "from-gray-500/70 via-slate-500/80 to-gray-600/80",
};

// Tech colors - actual brand colors for technologies
const techColors: Record<string, string> = {
  // Frontend
  React: "#61DAFB",
  "Next.js": "#000000",
  TypeScript: "#3178C6",
  "Tailwind CSS": "#06B6D4",
  "Vue.js": "#4FC08D",
  Angular: "#DD0031",
  // Backend
  "Node.js": "#339933",
  Python: "#3776AB",
  Express: "#000000",
  FastAPI: "#009688",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  // Tools
  Git: "#F05032",
  Docker: "#2496ED",
  Jest: "#C21325",
  Webpack: "#8DD6F9",
  Vite: "#646CFF",
  ESLint: "#4B32C3",
  // Cloud
  Vercel: "#000000",
  AWS: "#FF9900",
  Azure: "#0078D4",
  Cloudflare: "#F38020",
  Netlify: "#00C7B7",
  // Mobile
  "React Native": "#61DAFB",
  Flutter: "#02569B",
  Swift: "#FA7343",
  Kotlin: "#7F52FF",
  Ionic: "#3880FF",
  // AI
  TensorFlow: "#FF6F00",
  OpenAI: "#412991",
  LangChain: "#1C3C3C",
  PyTorch: "#EE4C2C",
  // Default
  default: "#0076D1",
};

// Tech icon mapping
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  React: Code,
  "Next.js": Code,
  TypeScript: Code,
  "Tailwind CSS": Layers,
  "Vue.js": Code,
  Angular: Code,
  "Node.js": Server,
  Python: Server,
  Express: Server,
  FastAPI: Server,
  PostgreSQL: Database,
  MongoDB: Database,
  Git: GitBranch,
  Docker: Cloud,
  Jest: Code,
  Webpack: Code,
  Vite: Code,
  ESLint: Code,
  Vercel: Cloud,
  AWS: Cloud,
  Azure: Cloud,
  Cloudflare: Cloud,
  Netlify: Cloud,
  "React Native": Smartphone,
  Flutter: Smartphone,
  Swift: Smartphone,
  Kotlin: Smartphone,
  Ionic: Smartphone,
  TensorFlow: Brain,
  OpenAI: Brain,
  LangChain: Brain,
  PyTorch: Brain,
  default: Code,
};

const getTechIcon = (techName: string): React.ComponentType<{ className?: string }> => {
  return techIconMap[techName] || techIconMap.default || Code;
};

const getTechColor = (techName: string): string => {
  return techColors[techName] || techColors.default;
};

export function ServicesPreview({ services = [] }: ServicesPreviewProps) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const resolvedServices: ServiceCardData[] =
    services.length > 0
      ? services
          .filter((service) => service && service.slug)
          .map((service) => ({
            id: service.slug,
            iconName: service.iconName || "web",
            title: service.title,
            description: service.shortDescription || service.fullDescription || "",
            slug: service.slug,
            fullDescription: service.fullDescription,
            techStack: service.techStack,
            benefits: service.benefits,
          }))
      : fallbackServices;

  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(
    resolvedServices[0] || null
  );

  const [activeTechTab, setActiveTechTab] = useState<"frontend" | "backend" | "tools" | "cloud">(
    "frontend"
  );

  // Get available tech categories for selected service
  const getAvailableCategories = useCallback(
    (service: ServiceCardData | null): Array<"frontend" | "backend" | "tools" | "cloud"> => {
      if (!service?.techStack) return [];
      const categories: Array<"frontend" | "backend" | "tools" | "cloud"> = [];
      if (service.techStack.frontend?.length > 0) categories.push("frontend");
      if (service.techStack.backend?.length > 0) categories.push("backend");
      if (service.techStack.tools?.length > 0) categories.push("tools");
      if (service.techStack.cloud?.length > 0) categories.push("cloud");
      return categories;
    },
    []
  );

  useEffect(() => {
    if (resolvedServices.length > 0 && !selectedService) {
      setSelectedService(resolvedServices[0]);
    }
  }, [resolvedServices, selectedService]);

  // Reset active tab when service changes
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
    // Set active tab to first available category
    const available = getAvailableCategories(service);
    if (available.length > 0) {
      setActiveTechTab(available[0]);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      aria-labelledby="services-heading"
      ref={sectionRef}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0076D1 1px, transparent 1px),
              linear-gradient(to bottom, #0076D1 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div
        className="absolute right-0 top-20 h-96 w-96 animate-pulse rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-20 left-0 h-96 w-96 animate-pulse rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #00A8FF 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />

      <div className="container-standard relative z-10">
        {/* Section Header */}
        <div
          className="mb-8 text-center transition-all duration-1000 ease-out md:mb-10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1]">
              Our Services
            </p>
          </div>
          <h2 id="services-heading" className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              Best Custom Software Development Services
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            Turn your vision into reality with ZephorTech's premium custom software solutions
          </p>
        </div>

        {/* Interactive Services Layout */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-[38%_62%]">
          {/* Left Side - Services Grid */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            {resolvedServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Globe;
              const gradient = gradientMap[service.iconName] || gradientMap.web;
              const isSelected = selectedService?.id === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`group relative flex aspect-square flex-col items-center justify-center rounded-lg border-2 p-3 transition-all duration-300 ${
                    isSelected
                      ? "scale-[1.02] border-[#FF6B35] bg-white/10 shadow-lg shadow-[#FF6B35]/30"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible
                      ? isSelected
                        ? "translateY(0) scale(1.02)"
                        : "translateY(0) scale(1)"
                      : "translateY(15px) scale(0.95)",
                    transitionDelay: `${index * 30}ms`,
                  }}
                  aria-label={`Select ${service.title} service`}
                  aria-pressed={isSelected}
                >
                  {/* Icon */}
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br sm:h-10 sm:w-10 ${gradient} transition-all duration-300 ${
                      isSelected ? "scale-110 ring-1 ring-[#FF6B35]" : "group-hover:scale-110"
                    }`}
                    style={
                      isSelected
                        ? {
                            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
                          }
                        : undefined
                    }
                  >
                    <IconComponent className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-center text-[10px] font-semibold leading-tight text-white transition-colors duration-300 sm:text-xs ${
                      isSelected ? "text-[#FF6B35]" : "group-hover:text-white"
                    }`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-[#FF6B35]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side - Service Details */}
          {selectedService && (
            <div
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              style={{
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? "translateX(0)" : "translateX(20px)",
                background: "rgba(255, 255, 255, 0.03)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Animated gradient background */}
              <div
                className="absolute right-0 top-0 h-64 w-64 rounded-full opacity-20 blur-[80px] transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${getTechColor(selectedService.techStack?.frontend[0] || "React")} 0%, transparent 70%)`,
                }}
              />

              {/* Service Title with gradient accent */}
              <div className="relative mb-5">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="h-1 w-12 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${getTechColor(selectedService.techStack?.frontend[0] || "React")}, transparent)`,
                    }}
                  />
                  <h3 className="font-poppins text-xl font-bold text-white md:text-2xl">
                    {selectedService.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                  {selectedService.fullDescription || selectedService.description}
                </p>
              </div>

              {/* Benefits Section */}
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="mb-6 rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#FF6B35]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                      Key Benefits
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedService.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#FF6B35]" />
                        <span className="text-[11px] leading-tight text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Stack with Clickable Categories */}
              {selectedService.techStack && (
                <div className="relative mb-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Code className="h-4 w-4 text-[#0076D1]" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                      Technologies We Use
                    </h4>
                  </div>

                  {/* Category Buttons */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {getAvailableCategories(selectedService).map((category) => {
                      const isActive = activeTechTab === category;
                      const categoryIcons = {
                        frontend: Layers,
                        backend: Server,
                        tools: GitBranch,
                        cloud: Cloud,
                      };
                      const CategoryIcon = categoryIcons[category];
                      const categoryLabels = {
                        frontend: "Frontend",
                        backend: "Backend",
                        tools: "Tools",
                        cloud: "Cloud",
                      };

                      return (
                        <button
                          key={category}
                          onClick={() => setActiveTechTab(category)}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-semibold capitalize transition-all duration-300 ${
                            isActive
                              ? "border-[#0076D1] bg-gradient-to-r from-[#004E8F]/20 to-[#0076D1]/20 text-white shadow-lg shadow-[#0076D1]/20"
                              : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <CategoryIcon className="h-3 w-3" />
                          <span>{categoryLabels[category]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Category Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {(selectedService.techStack[activeTechTab] || []).map((tech, idx) => {
                      const TechIcon = getTechIcon(tech);
                      const techColor = getTechColor(tech);
                      return (
                        <div
                          key={idx}
                          className="group/tech inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-medium text-white transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/15"
                          style={{
                            boxShadow: `0 2px 8px ${techColor}20`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 4px 12px ${techColor}40`;
                            e.currentTarget.style.borderColor = `${techColor}60`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = `0 2px 8px ${techColor}20`;
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                          }}
                        >
                          <div
                            className="rounded p-1"
                            style={{
                              background: `${techColor}20`,
                              color: techColor,
                            }}
                          >
                            <div style={{ color: techColor }}>
                              <TechIcon className="h-3.5 w-3.5" />
                            </div>
                          </div>
                          <span>{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA Button with enhanced styling */}
              <Link
                href={`/services/${selectedService.slug}`}
                className="focus:ring-primary focus:ring-offset-dark group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                  boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 118, 209, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.4)";
                }}
              >
                <span className="relative z-10">{selectedService.title}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}

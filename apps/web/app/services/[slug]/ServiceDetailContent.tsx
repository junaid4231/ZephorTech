"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Globe,
  Smartphone,
  Brain,
  Code,
  ShoppingCart,
  Cloud,
} from "lucide-react";
import type { ServiceDetail } from "@/lib/services";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { InquirySection } from "@/sections/InquirySection";

interface ServiceDetailContentProps {
  service: ServiceDetail;
  relatedServices: ServiceDetail[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  mobile: Smartphone,
  ai: Brain,
  saas: Code,
  ecommerce: ShoppingCart,
  cloud: Cloud,
};

export function ServiceDetailContent({ service, relatedServices }: ServiceDetailContentProps) {
  return (
    <>
      {/* Features Section */}
      <FeaturesSection features={service.features} />

      {/* Use Cases Section */}
      <UseCasesSection useCases={service.useCases} />

      {/* Technology Stack Section */}
      <TechStackSection techStack={service.techStack} />

      {/* Process Section */}
      <ProcessSection process={service.process} />

      {/* Stats Section */}
      <StatsSection stats={service.heroStats} />

      {/* Benefits Section */}
      <BenefitsSection benefits={service.benefits} />

      {/* FAQ Section */}
      <FAQSection faq={service.faq} />

      {/* Related Services */}
      {relatedServices.length > 0 && <RelatedServicesSection services={relatedServices} />}

      <InquirySection />

      {/* Final CTA */}
      <FinalCTASection />
    </>
  );
}

function FeaturesSection({ features }: { features: ServiceDetail["features"] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm"
          >
            Capabilities
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Features & Capabilities
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease-out ${index * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 118, 209, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="mb-3 inline-flex items-center justify-center rounded-xl p-2.5 md:mb-4 md:p-3"
                style={{
                  background: "rgba(0, 118, 209, 0.2)",
                }}
              >
                <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" style={{ color: "#0076D1" }} />
              </div>
              <h3 className="font-poppins mb-2 text-lg font-bold text-white md:text-xl">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400 md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ useCases }: { useCases: ServiceDetail["useCases"] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0F1419 0%, #0A0A0A 50%, #0F1419 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm"
          >
            Applications
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Use Cases & Industries
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-xl border p-5 transition-all duration-500 md:p-6"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease-out ${index * 150}ms`,
              }}
            >
              <div className="mb-3 md:mb-4">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(0, 118, 209, 0.2)",
                    color: "#0076D1",
                  }}
                >
                  {useCase.industry}
                </span>
              </div>
              <h3 className="font-poppins mb-2 text-xl font-bold text-white md:mb-3 md:text-2xl">{useCase.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-400 md:mb-4 md:text-base">{useCase.description}</p>
              <ul className="space-y-2">
                {useCase.examples.map((example, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-300 md:text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 md:h-4 md:w-4" style={{ color: "#0076D1" }} />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection({ techStack }: { techStack: ServiceDetail["techStack"] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  const categories = [
    { name: "Frontend", items: techStack.frontend },
    { name: "Backend", items: techStack.backend },
    { name: "Tools", items: techStack.tools },
    { name: "Cloud", items: techStack.cloud },
  ].filter((cat) => cat.items.length > 0);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm"
          >
            Technology
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Technology Stack
            </span>
          </h2>
        </div>

        <div
          className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-xl border p-4 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <h3 className="font-poppins mb-3 text-base font-bold text-white md:mb-4 md:text-lg">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg px-2.5 py-1 text-xs md:px-3 md:text-sm"
                    style={{
                      background: "rgba(0, 118, 209, 0.15)",
                      color: "#0076D1",
                      border: "1px solid rgba(0, 118, 209, 0.3)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ process }: { process: ServiceDetail["process"] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0F1419 0%, #0A0A0A 50%, #0F1419 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm"
          >
            Methodology
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Our Process
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div
            className="absolute bottom-0 left-8 top-0 hidden w-0.5 md:block"
            style={{
              background: "linear-gradient(to bottom, #0076D1, transparent)",
              opacity: 0.3,
            }}
          />

          <div className="space-y-6 md:space-y-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative flex gap-4 md:gap-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.6s ease-out ${index * 150}ms`,
                }}
              >
                {/* Step Number */}
                <div className="flex-shrink-0">
                  <div
                    className="font-poppins flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white md:h-14 md:w-14 md:text-2xl"
                    style={{
                      background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                      boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                    }}
                  >
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="flex-1 rounded-xl border p-4 md:p-5"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-poppins text-lg font-bold text-white md:text-xl">{step.title}</h3>
                    {step.duration && (
                      <span className="text-xs text-gray-400 md:text-sm">{step.duration}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400 md:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ stats }: { stats: ServiceDetail["heroStats"] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="heading-2 mb-3 text-white">Results & Metrics</h2>
        </div>

        <div
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <div className="text-center">
            <AnimatedCounter
              target={stats.projects}
              suffix="+"
              duration={2000}
              startDelay={500}
              label="Projects Delivered"
              className="text-center"
            />
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={stats.successRate}
              suffix="%"
              duration={2000}
              startDelay={700}
              label="Success Rate"
              className="text-center"
            />
          </div>
          <div className="text-center">
            <AnimatedCounter
              target={stats.satisfaction}
              suffix="%"
              duration={2000}
              startDelay={900}
              label="Client Satisfaction"
              className="text-center"
            />
          </div>
          <div className="text-center">
            <div
              className="font-poppins mb-2 font-bold text-white"
              style={{ fontSize: "clamp(1.875rem, 3vw + 0.5rem, 2.5rem)" }}
            >
              {stats.deliveryTime}
            </div>
            <div
              className="font-inter text-blue-50/90"
              style={{ fontSize: "clamp(0.875rem, 1vw + 0.25rem, 1rem)" }}
            >
              Average Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection({ benefits }: { benefits: string[] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Key Benefits
            </span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border p-4 md:gap-4 md:p-5"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease-out ${index * 100}ms`,
              }}
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 md:mt-1 md:h-6 md:w-6" style={{ color: "#0076D1" }} />
              <p className="text-sm leading-relaxed text-gray-300 md:text-base">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faq }: { faq: ServiceDetail["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0F1419 0%, #0A0A0A 50%, #0F1419 100%)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm"
          >
            Questions
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Frequently Asked Questions
            </span>
          </h2>
        </div>

        <div
          className="space-y-3 md:space-y-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {faq.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                borderColor:
                  openIndex === index ? "rgba(0, 118, 209, 0.3)" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-white/5 md:gap-4 md:p-5"
              >
                <h3 className="font-poppins flex-1 text-base font-bold text-white md:text-lg">
                  {item.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-4 w-4 flex-shrink-0 text-[#0076D1] md:h-5 md:w-5" />
                ) : (
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400 md:h-5 md:w-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 md:px-5 md:pb-5">
                  <p className="text-sm leading-relaxed text-gray-400 md:text-base">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServicesSection({ services }: { services: ServiceDetail[] }) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      <div className="container-standard">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Related Services
            </span>
          </h2>
        </div>

        <div
          className="grid gap-4 md:grid-cols-3 md:gap-5"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Code;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  transitionDelay: `${index * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div style={{ color: "#0076D1" }}>
                  <Icon className="mb-3 h-7 w-7 md:mb-4 md:h-8 md:w-8" />
                </div>
                <h3 className="font-poppins mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#0076D1] md:text-xl">
                  {service.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                  {service.shortDescription}
                </p>
                <div
                  className="flex items-center gap-2 text-xs font-semibold md:text-sm"
                  style={{ color: "#0076D1" }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-poppins mb-4 text-3xl font-black text-white md:mb-5 md:text-4xl">
          Ready to Transform Your Business?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-sm text-blue-50/90 md:mb-10 md:text-base">
          Let's discuss how we can help you achieve your goals. Get in touch for a free
          consultation.
        </p>
        <Link
          href="/contact#quote"
          className="font-inter group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-primary shadow-xl transition-all hover:scale-105 md:gap-3 md:px-8 md:py-4 md:text-lg"
        >
          <span>Get Started Today</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
        </Link>
      </div>
    </section>
  );
}

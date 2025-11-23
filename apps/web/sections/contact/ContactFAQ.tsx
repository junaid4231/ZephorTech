"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. A standard MVP typically takes 8-12 weeks, while enterprise platforms can range from 4-9 months. During our discovery call, we'll provide a detailed timeline tailored to your specific requirements and constraints.",
  },
  {
    question: "How do you determine project pricing?",
    answer:
      "We offer flexible engagement models: fixed-price for well-defined projects, time & materials for evolving scope, and dedicated teams for long-term partnerships. Pricing depends on project complexity, team composition, timeline, and technology stack. Most projects start from $25k.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We specialize in modern web technologies (React, Next.js, Node.js), mobile development (React Native, Swift, Kotlin), cloud platforms (AWS, Azure, GCP), AI/ML integration, and blockchain solutions. We select the optimal tech stack based on your specific business goals and scalability requirements.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes! We offer comprehensive post-launch support including bug fixes, feature enhancements, performance monitoring, security updates, and infrastructure scaling. Support packages range from basic (response within 48hrs) to premium (24/7 dedicated support with 2hr SLA).",
  },
  {
    question: "Can you work with our existing development team?",
    answer:
      "Absolutely. We frequently augment existing teams or work in hybrid models. We integrate seamlessly with your development workflow, follow your coding standards, participate in your sprint cycles, and use your preferred project management tools (Jira, Linear, etc.).",
  },
  {
    question: "What is your discovery and planning process?",
    answer:
      "Our discovery phase typically spans 1-2 weeks and includes stakeholder interviews, technical architecture review, competitive analysis, user research, and detailed sprint planning. We deliver wireframes, technical specifications, project roadmap, and resource allocation plan before development begins.",
  },
  {
    question: "How do you ensure code quality and security?",
    answer:
      "We follow industry best practices: peer code reviews, automated testing (unit, integration, e2e), continuous integration/deployment, security audits, OWASP compliance, penetration testing, and regular dependency updates. All code is documented and includes comprehensive test coverage.",
  },
  {
    question: "What happens if we need to scale the team mid-project?",
    answer:
      "We maintain a bench of pre-vetted engineers and can scale your team within 1-2 weeks. Whether you need additional frontend developers, DevOps expertise, or specialized roles like ML engineers, we can ramp up or down based on project velocity and changing requirements.",
  },
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0076D1 1px, transparent 1px),
              linear-gradient(to bottom, #0076D1 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div
        className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
      />

      <div className="container-standard relative z-10 max-w-4xl">
        {/* Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Frequently Asked Questions
            </p>
          </div>
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
              Got Questions? We've Got Answers
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            Everything you need to know about working with ZephorTech
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className="space-y-3 transition-all duration-1000 md:space-y-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "200ms",
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="group rounded-xl border transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: isOpen ? "rgba(0, 118, 209, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  boxShadow: isOpen
                    ? "0 4px 16px rgba(0, 118, 209, 0.15)"
                    : "0 4px 16px rgba(0, 0, 0, 0.3)",
                }}
              >
                <button
                  className="flex w-full items-start justify-between p-4 text-left md:p-5"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <h3 className="font-poppins mb-2 pr-4 text-base font-semibold text-white md:text-lg">
                      {faq.question}
                    </h3>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isOpen ? "500px" : "0",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p className="pt-2 text-sm leading-relaxed text-gray-400 md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 md:h-10 md:w-10"
                    style={{
                      background: isOpen
                        ? "linear-gradient(135deg, #004E8F, #0076D1)"
                        : "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-white md:h-5 md:w-5" />
                    ) : (
                      <Plus className="h-4 w-4 text-white md:h-5 md:w-5" />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div
          className="mt-8 text-center transition-all duration-1000 md:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="mb-3 text-sm text-gray-400 md:mb-4 md:text-base">Still have questions?</p>
          <a
            href="mailto:hello@zephortech.com"
            className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3"
            style={{ color: "#0076D1" }}
          >
            <span>Email us directly</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

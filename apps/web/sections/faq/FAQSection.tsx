"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqItems: FAQItem[] = [
  {
    category: "Engagement",
    question: "How soon can you start a new engagement?",
    answer:
      "Most projects kick off within 7-10 business days after scope assurance. Our Solution Architects work with you to finalize milestones while delivery pods free up capacity for the first sprint.",
  },
  {
    category: "Process",
    question: "Do you work with in-house teams?",
    answer:
      "Yes. 80% of our engagements operate as an embedded squad model alongside your PMs and engineers. We align on rituals, tooling, and delivery metrics so ZephorTech pods feel like an extension of your team.",
  },
  {
    category: "Pricing",
    question: "What pricing models do you support?",
    answer:
      "We offer fixed-scope delivery, milestone-based retainers, and dedicated pods for long-term roadmaps. Every engagement includes transparent velocity reports and burn forecasts.",
  },
  {
    category: "AI",
    question: "How do you handle AI and compliance?",
    answer:
      "We implement responsible AI guidelines with model cards, audit trails, alignment reviews, and human-in-the-loop workflows. Compliance teams receive playbooks covering data residency, retention, and monitoring.",
  },
  {
    category: "Delivery",
    question: "What does your hand-off look like?",
    answer:
      "Every launch ships with full documentation, architecture diagrams, runbooks, and optional enablement workshops. We stay on-call for hypercare and performance tuning after go-live.",
  },
  {
    category: "Support",
    question: "Do you offer post-launch support?",
    answer:
      "Absolutely. We run 30, 60, and 90-day optimization cycles to measure adoption, optimize performance, and plan follow-up features. Support tiers include 24/7 SLAs for mission-critical platforms.",
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  const filteredFaq = useMemo(() => {
    if (!query.trim()) return faqItems;
    const q = query.toLowerCase();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #050709 0%, #0A0F18 50%, #050709 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-white sm:px-6 lg:px-8">
        <div
          className="mb-6 text-center transition-all duration-700 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
          }}
        >
          <p className="text-primary mb-3 text-xs font-semibold uppercase tracking-[0.2em] md:text-sm">
            FAQ
          </p>
          <h1 className="heading-2 font-poppins mb-3 font-bold">
            Everything clients ask before launch
          </h1>
          <p className="text-sm text-white/70 md:text-base">
            Processes, pricing, pods, and the way we ship. If you need anything else, we're one
            email away.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions..."
              className="focus:border-primary focus:ring-primary/40 w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaq.map((item) => {
            const isOpen = openQuestion === item.question;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                >
                  <div>
                    <p className="text-primary mb-2 text-xs uppercase tracking-[0.4em]">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden text-white/70 transition-all duration-300 ${
                    isOpen ? "mt-4 max-h-[400px]" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}

          {filteredFaq.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-white/60">
              No questions match that search yet. Reach out via{" "}
              <a className="text-primary underline" href="mailto:info@zephortech.com">
                info@zephortech.com
              </a>
              .
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

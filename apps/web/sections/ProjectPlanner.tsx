"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import {
  ArrowRight,
  CalendarClock,
  Coins,
  Compass,
  Brain,
  Check,
  RefreshCw,
  CheckCircle2,
  Rocket,
  Users,
  Clock,
  DollarSign,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react";

type PlannerOption = {
  label: string;
  value: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
};

const budgetOptions: PlannerOption[] = [
  {
    label: "Under $10k",
    value: "bootstrap",
    description: "Audits, workshops, quick experiments",
    icon: Coins,
  },
  {
    label: "$10k - $25k",
    value: "starter",
    description: "MVP launch or single-feature build",
    icon: Rocket,
  },
  {
    label: "$25k - $50k",
    value: "growth",
    description: "Multi-feature platform with integrations",
    icon: TrendingUp,
  },
  {
    label: "$50k+",
    value: "enterprise",
    description: "Enterprise suite or transformation program",
    icon: Target,
  },
  {
    label: "Let's discuss",
    value: "custom",
    description: "Custom scope and flexible investment",
    icon: Compass,
  },
];

const timelineOptions: PlannerOption[] = [
  {
    label: "2-4 Weeks",
    value: "fast",
    description: "Sprint delivery or rapid prototype",
    icon: Clock,
  },
  {
    label: "1-2 Months",
    value: "standard",
    description: "Standard MVP timeline",
    icon: Clock,
  },
  {
    label: "3-6 Months",
    value: "extended",
    description: "Full platform or phased rollout",
    icon: CalendarClock,
  },
  {
    label: "Flexible",
    value: "flexible",
    description: "We'll align on milestones together",
    icon: Compass,
  },
];

const focusOptions: PlannerOption[] = [
  {
    label: "Launch New Product",
    value: "launch",
    description: "MVP, go-to-market, user onboarding",
    icon: Rocket,
  },
  {
    label: "Scale Existing",
    value: "scale",
    description: "Performance, architecture, automation",
    icon: TrendingUp,
  },
  {
    label: "AI & Intelligence",
    value: "ai",
    description: "AI agents, ML models, personalization",
    icon: Brain,
  },
  {
    label: "Growth & Marketing",
    value: "marketing",
    description: "SEO, campaigns, analytics",
    icon: BarChart3,
  },
];

export function ProjectPlanner() {
  const [budget, setBudget] = useState(budgetOptions[1]);
  const [timeline, setTimeline] = useState(timelineOptions[1]);
  const [focus, setFocus] = useState(focusOptions[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  const recommendation = useMemo(() => {
    const phases =
      focus.value === "marketing"
        ? ["Channel Research", "Campaign Execution", "Optimization & Scale"]
        : ["Strategy & Design", "Development & QA", "Launch & Growth"];

    const teamMap: Record<string, string[]> = {
      bootstrap: ["Consultant", "Designer", "Engineer"],
      starter: ["Lead Engineer", "Designer", "PM"],
      growth: ["Architect", "Engineering Squad", "QA", "PM"],
      enterprise: ["Program Director", "Engineering Pods", "DevOps", "QA"],
      custom: ["Principal Consultant", "Lead Engineer"],
    };

    const etaMap: Record<string, string> = {
      fast: "2-4 Weeks",
      standard: "6-8 Weeks",
      extended: "12-16 Weeks",
      flexible: "Custom timeline",
    };

    const team = teamMap[budget.value] || teamMap.starter;
    const eta = etaMap[timeline.value] || "Custom";

    return { phases, team, eta };
  }, [budget, timeline, focus]);

  const steps = [
    { name: "Budget", icon: Coins, options: budgetOptions, value: budget, setter: setBudget },
    {
      name: "Timeline",
      icon: CalendarClock,
      options: timelineOptions,
      value: timeline,
      setter: setTimeline,
    },
    { name: "Focus", icon: Compass, options: focusOptions, value: focus, setter: setFocus },
  ];

  const activeStep = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const isStepCompleted = (stepIndex: number) => {
    if (stepIndex === 0) return budget.value !== budgetOptions[1].value;
    if (stepIndex === 1) return timeline.value !== timelineOptions[1].value;
    if (stepIndex === 2) return focus.value !== focusOptions[0].value;
    return false;
  };

  const handleOptionSelect = (option: PlannerOption) => {
    setSelectedOptionId(option.value);
    activeStep.setter(option);

    // Auto-advance to next step after a short delay
    if (currentStep < steps.length - 1) {
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setSelectedOptionId(null);
          setIsTransitioning(false);
        }, 300);
      }, 800);
    } else {
      setSelectedOptionId(null);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleReset = () => {
    setBudget(budgetOptions[1]);
    setTimeline(timelineOptions[1]);
    setFocus(focusOptions[0]);
    setCurrentStep(0);
    setSelectedOptionId(null);
  };

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #030508 0%, #060B14 50%, #030508 100%)",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(0,118,209,0.35), transparent 60%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className="container-standard relative z-10 max-w-6xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease",
        }}
      >
        {/* Header */}
        <div className="mb-6 text-center md:mb-8">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#00A8FF" }}
          >
            Interactive Planner
          </div>
          <h2 className="heading-2 mb-3 text-white">
            Scope your project in <span style={{ color: "#00A8FF" }}>60 seconds</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            Answer three quick questions to receive a tailored delivery blueprint with team,
            timeline, and investment estimate.
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-inter text-sm font-semibold text-white/60">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="font-inter text-sm font-semibold text-white/60">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00A8FF 0%, #00F5FF 100%)",
                boxShadow: "0 0 20px rgba(0, 168, 255, 0.5)",
              }}
            />
            <div
              className="absolute left-0 top-0 h-full w-full rounded-full opacity-30"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>

        {/* Enhanced Step Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:mb-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = isStepCompleted(index);

            return (
              <button
                key={step.name}
                type="button"
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentStep(index);
                      setIsTransitioning(false);
                    }, 300);
                  }
                }}
                className={`group relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-[#00A8FF] bg-[#00A8FF]/10 text-white shadow-lg shadow-[#00A8FF]/20"
                    : isCompleted
                      ? "border-[#00A8FF]/50 bg-[#00A8FF]/5 text-white/90 hover:border-[#00A8FF] hover:bg-[#00A8FF]/10"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                {isCompleted && !isActive && <CheckCircle2 className="h-4 w-4 text-[#00A8FF]" />}
                <StepIcon className="h-4 w-4" />
                {step.name}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1/2 -translate-x-1/2 rounded-full bg-[#00A8FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Planner and Blueprint Container - Side by Side on Large Screens */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[52%_48%] lg:gap-8 xl:grid-cols-[50%_50%]">
          {/* Left Side - Wizard Card */}
          <div
            className={`rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition-all duration-300 md:p-6 ${
              isTransitioning ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            {/* Step Header */}
            <div className="mb-5 flex items-center gap-3 md:mb-6">
              {(() => {
                const StepIcon = activeStep.icon;
                return (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 md:h-12 md:w-12"
                    style={{
                      background: "linear-gradient(135deg, #00A8FF, #0076D1)",
                      boxShadow: "0 4px 16px rgba(0, 168, 255, 0.3)",
                    }}
                  >
                    <StepIcon className="h-5 w-5 text-white md:h-6 md:w-6" />
                  </div>
                );
              })()}
              <div>
                <h3 className="font-poppins text-xl font-bold text-white md:text-2xl">
                  {activeStep.name}
                </h3>
                <p className="font-inter mt-1 text-xs text-white/60 md:text-sm">
                  Select the option that best fits your needs
                </p>
              </div>
            </div>

            {/* Enhanced Options Grid */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 md:mb-8 md:gap-5">
              {activeStep.options.map((option) => {
                const isActive = option.value === activeStep.value.value;
                const isSelected = selectedOptionId === option.value;
                const OptionIcon = option.icon || Compass;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 md:p-5 ${
                      isActive
                        ? "scale-[1.02] border-[#00A8FF] bg-[#00A8FF]/10 shadow-lg shadow-[#00A8FF]/20"
                        : isSelected
                          ? "scale-[1.01] border-[#00A8FF]/70 bg-[#00A8FF]/5"
                          : "border-white/10 bg-white/5 hover:scale-[1.01] hover:border-[#00A8FF]/50 hover:bg-white/10"
                    }`}
                  >
                    {/* Selection Checkmark */}
                    {isActive && (
                      <div className="animate-in fade-in zoom-in absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#00A8FF] shadow-lg duration-300">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
                        isActive
                          ? "scale-110 bg-[#00A8FF]/20"
                          : "bg-white/5 group-hover:scale-105 group-hover:bg-[#00A8FF]/10"
                      }`}
                    >
                      <OptionIcon
                        className={`h-5 w-5 transition-colors duration-300 ${
                          isActive ? "text-[#00A8FF]" : "text-white/60 group-hover:text-[#00A8FF]"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h4
                        className={`font-poppins text-lg font-semibold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/90 group-hover:text-white"
                        }`}
                      >
                        {option.label}
                      </h4>
                    </div>
                    <p
                      className={`font-inter text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-white/80" : "text-white/60 group-hover:text-white/70"
                      }`}
                    >
                      {option.description}
                    </p>

                    {/* Hover Gradient Effect */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                      style={{
                        background: "radial-gradient(circle at center, #00A8FF, transparent)",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 md:pt-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0 || isTransitioning}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>
              </div>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1 || isTransitioning}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  background:
                    currentStep === steps.length - 1
                      ? "transparent"
                      : "linear-gradient(90deg, #00A8FF, #0076D1)",
                  boxShadow:
                    currentStep === steps.length - 1 ? "none" : "0 4px 16px rgba(0, 168, 255, 0.3)",
                }}
              >
                {currentStep === steps.length - 1 ? "Complete" : "Next"} →
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Recommendation Card (Blueprint) */}
          <div
            className={`sticky top-6 h-fit rounded-xl border border-white/10 bg-gradient-to-br from-[#00A8FF]/10 to-[#0076D1]/10 p-5 backdrop-blur-xl transition-all duration-500 md:p-6 lg:sticky lg:top-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-4 flex items-center gap-3 md:mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A8FF]/20 transition-all duration-300 hover:scale-110">
                <Target className="h-6 w-6 text-[#00A8FF]" />
              </div>
              <div>
                <h3 className="font-poppins text-xl font-bold text-white">Your Custom Blueprint</h3>
                <p className="font-inter text-sm text-white/60">Based on your selections</p>
              </div>
            </div>

            {/* Enhanced Summary */}
            <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-4 md:mb-5 md:p-5">
              <div className="grid gap-4 sm:grid-cols-3 md:gap-5">
                <div className="group rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-[#00A8FF]/30 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#00A8FF]" />
                    <p className="font-inter text-xs uppercase tracking-wider text-white/50">
                      Investment
                    </p>
                  </div>
                  <p className="font-poppins text-lg font-semibold text-white">{budget.label}</p>
                </div>
                <div className="group rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-[#00A8FF]/30 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#00A8FF]" />
                    <p className="font-inter text-xs uppercase tracking-wider text-white/50">
                      Timeline
                    </p>
                  </div>
                  <p className="font-poppins text-lg font-semibold text-white">
                    {recommendation.eta}
                  </p>
                </div>
                <div className="group rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-[#00A8FF]/30 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#00A8FF]" />
                    <p className="font-inter text-xs uppercase tracking-wider text-white/50">
                      Focus
                    </p>
                  </div>
                  <p className="font-poppins text-lg font-semibold text-white">{focus.label}</p>
                </div>
              </div>
            </div>

            {/* Enhanced Phases */}
            <div className="mb-4 md:mb-5">
              <div className="mb-3 flex items-center gap-2">
                <Rocket className="h-4 w-4 text-[#00A8FF]" />
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-white/60 md:text-sm">
                  Delivery Phases
                </p>
              </div>
              <div className="space-y-2.5">
                {recommendation.phases.map((phase, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 p-3 transition-all duration-300 hover:border-[#00A8FF]/30 hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A8FF]/20 text-sm font-bold text-[#00A8FF] transition-all duration-300 group-hover:scale-110">
                      {index + 1}
                    </div>
                    <p className="font-inter text-white/80">{phase}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Team */}
            <div className="mb-5 md:mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-[#00A8FF]" />
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-white/60 md:text-sm">
                  Recommended Team
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendation.team.map((member) => (
                  <span
                    key={member}
                    className="group inline-block rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 transition-all duration-300 hover:border-[#00A8FF]/50 hover:bg-[#00A8FF]/10 hover:text-white"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/70">
                Ready to act on this blueprint? Book a 30-minute strategy call and we'll shape the
                engagement together.
              </p>
              <Link
                href="/contact#quote"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] sm:w-auto"
                style={{
                  background: "linear-gradient(90deg, #00A8FF, #0076D1)",
                  boxShadow: "0 4px 16px rgba(0, 168, 255, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 168, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 168, 255, 0.4)";
                }}
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

"use client";
import {
  Shield,
  Bell,
  BookOpen,
  Mail,
  Send,
  TrendingUp,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";
import { NewsletterForm } from "@/components";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const perks = [
  {
    icon: Bell,
    title: "Product Announcements",
    description: "Early access to our newest frameworks, launch kits, and public demos.",
    color: "#00A8FF",
  },
  {
    icon: BookOpen,
    title: "Deep Dives & Playbooks",
    description: "Engineering breakdowns, growth blueprints, and AI implementation guides.",
    color: "#0076D1",
  },
  {
    icon: Bell,
    title: "Event Invites",
    description: "Private briefings, live AMAs, and roadmap reveals with the ZephorTech team.",
    color: "#A855F7",
  },
  {
    icon: Shield,
    title: "No Noise",
    description: "One thoughtful email per month, zero spam, unsubscribe anytime.",
    color: "#10B981",
  },
];

const newsletterStats = [
  { label: "Subscribers", value: "2.5K+", icon: Users },
  { label: "Open Rate", value: "68%", icon: TrendingUp },
  { label: "Monthly", value: "1 Email", icon: Mail },
];

export function NewsletterSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #050709 0%, #0F1419 60%, #050709 100%)",
      }}
    >
      {/* Enhanced Background Effects */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0,118,209,0.15) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(0,118,209,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />

      {/* Floating Mail Icons */}
      <div className="absolute left-10 top-20 opacity-5">
        <Mail className="h-16 w-16 animate-pulse" style={{ color: "#00A8FF" }} />
      </div>
      <div className="absolute right-20 top-32 opacity-5">
        <Send
          className="h-12 w-12 animate-pulse"
          style={{ color: "#0076D1", animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div
          className="mb-8 text-center transition-all duration-700 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00A8FF]/30 bg-[#00A8FF]/10 px-4 py-2">
            <Mail className="h-4 w-4 animate-pulse text-[#00A8FF]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00A8FF]">
              Newsletter
            </p>
          </div>
          <h2 className="heading-2 mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00A8FF 0%, #0076D1 50%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Build Smarter with ZephorTech Signals
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-white/70 md:text-base">
            Monthly insights from our CTO desk: frameworks, architecture notes, AI experiments, and
            launch debriefs. No fluff — just the playbooks we use with flagship clients.
          </p>

          {/* Stats Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 md:mt-8">
            {newsletterStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(10px)",
                    transition: `all 0.7s ease ${0.1 * index}s`,
                  }}
                >
                  <StatIcon className="h-4 w-4 text-[#00A8FF]" />
                  <div>
                    <span className="text-sm font-bold text-white">{stat.value}</span>
                    <span className="ml-2 text-xs text-white/60">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:gap-8">
          {/* Left Side - Form Card */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#00A8FF]/30 hover:shadow-[0_0_40px_rgba(0,168,255,0.2)] md:p-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            {/* Decorative Gradient */}
            <div
              className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-500 group-hover:opacity-30"
              style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
            />

            {/* Form Header */}
            <div className="relative mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#0076D1] shadow-lg shadow-[#00A8FF]/30">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-poppins text-xl font-bold text-white md:text-2xl">
                  Join the Community
                </h3>
                <p className="text-xs text-white/60 md:text-sm">
                  Get exclusive insights delivered monthly
                </p>
              </div>
            </div>

            {/* Newsletter Form */}
            <NewsletterForm />

            {/* Trust Indicators */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs text-white/70">No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs text-white/70">Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#0076D1]" />
                <span className="text-xs text-white/70">Privacy protected</span>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-[#00A8FF]/30 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-[#00A8FF]/10"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "none" : "translateY(20px)",
                    transition: `all 0.7s ease ${0.15 * index}s`,
                  }}
                >
                  {/* Icon with Gradient Background */}
                  <div
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${perk.color}20, ${perk.color}10)`,
                      border: `1px solid ${perk.color}30`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: perk.color }} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#00A8FF]">
                    {perk.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">{perk.description}</p>

                  {/* Hover Gradient Effect */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"
                    style={{
                      background: `radial-gradient(circle at center, ${perk.color}, transparent)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview Section */}
        <div
          className="mt-8 rounded-xl border border-white/10 bg-gradient-to-r from-[#00A8FF]/10 via-[#0076D1]/10 to-[#A855F7]/10 p-6 backdrop-blur-sm md:mt-10 md:p-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.4s",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#00A8FF]" />
                <h4 className="font-poppins text-lg font-bold text-white">What You'll Get</h4>
              </div>
              <p className="mb-4 text-sm text-white/80">
                Each newsletter includes actionable insights, real-world case studies, and exclusive
                access to our latest tools and frameworks.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Architecture Patterns",
                  "AI Insights",
                  "Growth Strategies",
                  "Tech Deep Dives",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden items-center gap-2 text-[#00A8FF] md:flex">
              <ArrowRight className="h-5 w-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

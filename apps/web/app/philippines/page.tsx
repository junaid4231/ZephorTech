"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MessageSquare,
  ShoppingCart,
  Bot,
  Globe,
  BarChart3,
  ChevronRight,
  Send,
  Star,
  Zap,
  Shield,
} from "lucide-react";

// ─── Minimal stripped header ─────────────────────────────────────────────────
function PhHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12"
      style={{
        background: scrolled ? "rgba(5, 8, 15, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <Link href="/" className="flex items-center gap-2">
        <span
          className="font-poppins text-xl font-black tracking-tight text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Zephor<span style={{ color: "#0076D1" }}>Tech</span>
        </span>
      </Link>

      <a
        href="/contact?ref=ph"
        className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #0055A5, #0076D1)",
          boxShadow: "0 0 20px rgba(0,118,209,0.3)",
        }}
      >
        <Send className="h-3.5 w-3.5" />
        Mag-usap tayo
      </a>
    </header>
  );
}

// ─── Pain points with Tagalog ─────────────────────────────────────────────────
const painPoints = [
  {
    tagalog: "Subok na kami.",
    translation: "We've been through it.",
    quote:
      "Nag-hire kami ng dev agency. After two months — Figma screens, half-built backend, project lead stopped responding. Sayang ang pera at oras.",
    english:
      "We hired a dev agency. Two months in — Figma screens, half-built backend, the project lead stopped responding. Wasted money and time.",
    who: "SaaS founder, BGC",
  },
  {
    tagalog: "Mahirap makakita ng senior.",
    translation: "Hard to find senior talent.",
    quote:
      "Ang local talent sa Makati ay either too junior or ₱200K+/month. Hindi sustainable mag-scale ng team sa ganitong cost.",
    english:
      "Local talent in Makati is either too junior or ₱200K+/month. I can't scale a team at that cost sustainably.",
    who: "E-commerce operator, Cebu",
  },
  {
    tagalog: "Lahat pareho ang sinasabi.",
    translation: "Everyone says the same thing.",
    quote:
      "Every agency — same buzzwords, same proposal template. Walang nagtatanong sa aming actual operations bago mag-quote.",
    english:
      "Every agency sent the same proposal with the same buzzwords. No one actually asked what our operations looked like before quoting.",
    who: "Operations director, logistics startup, Pasay",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: ShoppingCart,
    color: "#F59E0B",
    tagBg: "rgba(245,158,11,0.12)",
    title: "E-Commerce Platforms",
    tagalog: "Para sa inyong negosyo online",
    description:
      "Custom storefronts beyond Shopify limits — B2C, B2B wholesale, marketplace-seller tools, and D2C brand stores that own their data and checkout flow completely.",
    fit: "D2C brands · Shopee/Lazada sellers moving to owned platforms · Wholesale distributors",
  },
  {
    icon: BarChart3,
    color: "#8B5CF6",
    tagBg: "rgba(139,92,246,0.12)",
    title: "SaaS & Internal Tools",
    tagalog: "Palitan ang Excel, palakihin ang negosyo",
    description:
      "BPO operations moving to product, fintech-adjacent platforms, logistics dashboards — and the internal workflow tools that replace the spreadsheets your ops team still depends on.",
    fit: "BPO-to-product companies · Logistics operators · Fintech startups",
  },
  {
    icon: Bot,
    color: "#10B981",
    tagBg: "rgba(16,185,129,0.12)",
    title: "AI & Workflow Automation",
    tagalog: "Trabaho ng makina, oras para sa tao",
    description:
      "AI agents handling document processing, customer triage, back-office tasks, and data extraction — inside your existing systems, not replacing them entirely.",
    fit: "BPOs reducing manual headcount cost · Finance teams · Customer support operations",
  },
  {
    icon: Globe,
    color: "#0076D1",
    tagBg: "rgba(0,118,209,0.12)",
    title: "Web Platforms & Portals",
    tagalog: "Mabilis, maganda, at talagang gumagana",
    description:
      "Property listing portals, client portals, booking systems, and multi-role dashboards — built for performance and designed for the teams who run them every day.",
    fit: "Real estate brokerages · Travel & hospitality · Healthcare providers",
  },
];

// ─── Why us ───────────────────────────────────────────────────────────────────
const reasons = [
  {
    icon: Clock,
    color: "#0076D1",
    label: "Timezone na talaga nag-o-overlap",
    english: "A timezone that actually overlaps",
    detail:
      "Manila (UTC+8) at Dubai (UTC+4) — 4 na oras lang ang agwat. Ang inyong 9am PHT ay aming 1pm. Live na sagot, hindi async na mensahe kinabukasan.",
  },
  {
    icon: Shield,
    color: "#10B981",
    label: "Naayos ang scope bago magsimula",
    english: "Scope locked before we write a line",
    detail:
      "Bago mag-code, nagsu-sulat kami ng fixed-scope delivery brief. Alam ninyo ang makukuha, ang halaga, at kung kailan — bago kayo mag-commit ng kahit isang piso.",
  },
  {
    icon: Star,
    color: "#F59E0B",
    label: "Senior engineers sa inyong project",
    english: "Senior engineers on your project",
    detail:
      "Bawat engagement ay pinapatakbo ng mga engineers na nagpadala ng production systems sa malaking scale. Hindi ang inyong project ang training ground ng mga bata.",
  },
  {
    icon: Zap,
    color: "#8B5CF6",
    label: "Ibinibigay namin, hindi lang dine-deliver",
    english: "We hand over, not just deliver",
    detail:
      "Sa pagtatapos, makatatanggap kayo ng architecture documentation, runbooks, at code na kayang i-maintain ng inyong sariling team. Hindi kayo magiging dependent sa amin.",
  },
];

// ─── Case snapshots ───────────────────────────────────────────────────────────
const caseSnapshots = [
  {
    industry: "FinTech",
    color: "#10B981",
    stat: "94%",
    statLabel: "faster KYC",
    headline: "72 hours → 4 hours KYC review",
    detail:
      "Singapore digital bank expanding across APAC. Manual compliance blocked growth. We rebuilt onboarding, automated 91% of KYC reviews, launched 4 markets in 16 weeks — zero downtime.",
    slug: "apex-neobank-platform",
  },
  {
    industry: "E-Commerce",
    color: "#F59E0B",
    stat: "+35%",
    statLabel: "conversion",
    headline: "Campaign launch: 2 days → 3 hours",
    detail:
      "European retailer with split B2C/B2B platforms, mismatched inventory, marketing filing tickets to change a banner. One composable storefront. Conversion up 35% in Q1.",
    slug: "velora-commerce-experience",
  },
  {
    industry: "SaaS",
    color: "#8B5CF6",
    stat: "500+",
    statLabel: "paying teams",
    headline: "Prototype to 500 paying teams",
    detail:
      "Canadian analytics startup — great product, no path to enterprise. No SSO, no billing, manual provisioning. Three stalled enterprise deals closed within 10 days of launch.",
    slug: "orbit-analytics-saas-suite",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PhilippinesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedPain, setExpandedPain] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#05080F", color: "white" }}
    >
      <PhHeader />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* animated background glows */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-[80px]"
          style={{ background: "radial-gradient(circle, #FCD116 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-20 right-0 h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[80px]"
          style={{ background: "radial-gradient(circle, #0038A8 0%, transparent 70%)" }}
        />

        {/* grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-standard relative z-10 pb-16 pt-36 md:pt-44">
          <div className="mx-auto max-w-5xl">
            {/* eyebrow */}
            <div className="mb-7 flex items-center justify-center gap-3 md:justify-start">
              <span className="text-2xl">🇵🇭</span>
              <span
                className="rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em]"
                style={{
                  color: "#0076D1",
                  borderColor: "rgba(0,118,209,0.3)",
                  background: "rgba(0,118,209,0.07)",
                }}
              >
                Para sa mga negosyo sa Pilipinas
              </span>
            </div>

            {/* headline */}
            <h1
              className="font-poppins mb-4 text-center text-5xl font-black leading-[1.0] tracking-tight md:text-left md:text-7xl lg:text-8xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              <span className="text-white">Resulta,</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #0076D1 0%, #38BDF8 50%, #0076D1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                hindi pangako.
              </span>
            </h1>

            <p
              className="mb-3 text-center text-sm font-medium text-white/30 md:text-left md:text-base"
              style={{ fontStyle: "italic" }}
            >
              Results, not promises.
            </p>

            {/* sub-headline */}
            <p className="mx-auto mb-10 mt-8 max-w-2xl text-center text-lg leading-relaxed text-white/55 md:mx-0 md:text-left md:text-xl">
              Subukan na ninyo ang mura. Alam ninyo na ang presyo — hindi sa pera, kundi sa oras.{" "}
              <span className="text-white/75">
                ZephorTech works with Philippine businesses that need real engineers, a clearly
                scoped engagement, and a team that is live in your morning.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <a
                href="/contact?ref=ph"
                className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:gap-4 hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                  boxShadow: "0 4px 32px rgba(0,118,209,0.4)",
                }}
              >
                <Send className="h-4 w-4" />
                Send us a message
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-2xl border px-8 py-4 text-base font-semibold text-white/60 transition-all duration-300 hover:border-white/25 hover:text-white"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                Tingnan muna ang gawa
                <span className="ml-1 text-sm italic text-white/30">(See the work first)</span>
              </a>
            </div>

            {/* trust strip */}
            <div
              className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t pt-10 md:justify-start"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { label: "70+ projects delivered", sub: "naipadeliver na" },
                { label: "Fixed scope always", sub: "walang sorpresa" },
                { label: "PHT morning overlap", sub: "magkasamang oras" },
                { label: "English docs, always", sub: "malinaw na komunikasyon" },
              ].map((t) => (
                <span key={t.label} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#0076D1" }} />
                  <span className="text-sm text-white/50">
                    {t.label} <span className="text-xs italic text-white/20">— {t.sub}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: "#080D14" }}>
        <div className="container-standard">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#0076D1" }}
            >
              Narinig na namin ito
            </p>
            <h2 className="font-poppins text-3xl font-black text-white md:text-4xl">
              Pamilyar ba ito sa inyo?
            </h2>
            <p className="mt-3 text-sm italic text-white/35">Sound familiar?</p>
            <p className="mt-2 text-xs text-white/20">I-click ang bawat card para sa English</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    expandedPain === i ? "rgba(0,118,209,0.07)" : "rgba(255,255,255,0.025)",
                  borderColor:
                    expandedPain === i ? "rgba(0,118,209,0.3)" : "rgba(255,255,255,0.07)",
                  boxShadow: expandedPain === i ? "0 8px 32px rgba(0,118,209,0.12)" : "none",
                }}
                onClick={() => setExpandedPain(expandedPain === i ? null : i)}
              >
                <MessageSquare
                  className="mb-4 h-5 w-5 transition-colors duration-300"
                  style={{ color: expandedPain === i ? "#0076D1" : "rgba(255,255,255,0.2)" }}
                />
                <p className="mb-1 text-sm font-bold text-white">{p.tagalog}</p>
                <p className="mb-4 text-xs italic text-white/30">{p.translation}</p>
                <p className="text-sm italic leading-relaxed text-white/65">
                  &ldquo;{p.quote}&rdquo;
                </p>
                {expandedPain === i && (
                  <p
                    className="mt-3 border-t pt-3 text-xs leading-relaxed text-white/40"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    {p.english}
                  </p>
                )}
                <p className="mt-4 text-xs font-semibold text-white/25">{p.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ background: "#05080F" }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-standard relative z-10">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#0076D1" }}
            >
              Ang aming ginagawa — What we build
            </p>
            <h2 className="font-poppins text-3xl font-black text-white md:text-4xl">
              Para sa kung paano talaga gumagana
              <br />
              ang mga negosyo sa Pilipinas.
            </h2>
            <p className="mt-3 text-sm italic text-white/35">
              Built for how Philippine businesses actually operate.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    hoveredService === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                  borderColor: hoveredService === i ? `${s.color}50` : "rgba(255,255,255,0.07)",
                  boxShadow: hoveredService === i ? `0 12px 48px ${s.color}18` : "none",
                }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* corner glow on hover */}
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300"
                  style={{
                    background: s.color,
                    opacity: hoveredService === i ? 0.08 : 0,
                  }}
                />
                <div className="relative z-10">
                  <div className="mb-5 flex items-start justify-between">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: s.tagBg }}
                    >
                      <s.icon className="h-6 w-6" style={{ color: s.color }} />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-semibold italic"
                      style={{ color: s.color, background: s.tagBg }}
                    >
                      {s.tagalog}
                    </span>
                  </div>
                  <h3 className="font-poppins mb-2.5 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-white/55">{s.description}</p>
                  <div
                    className="rounded-xl border px-4 py-2.5"
                    style={{ borderColor: `${s.color}20`, background: `${s.color}08` }}
                  >
                    <p
                      className="mb-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: s.color }}
                    >
                      Pinaka-angkop para sa
                    </p>
                    <p className="text-xs text-white/45">{s.fit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ────────────────────────────────────────────────────────── */}
      <section id="work" className="py-24 md:py-32" style={{ background: "#080D14" }}>
        <div className="container-standard">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#0076D1" }}
            >
              Patunay, hindi pangako — Proof, not promises
            </p>
            <h2 className="font-poppins text-3xl font-black text-white md:text-4xl">
              Ito ang talagang na-ship namin.
            </h2>
            <p className="mt-3 text-sm italic text-white/35">Here is what we actually shipped.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {caseSnapshots.map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                {/* top gradient bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }}
                />
                <div className="p-6">
                  <div className="mb-5 flex items-end gap-2">
                    <span
                      className="font-poppins text-5xl font-black leading-none"
                      style={{ color: c.color }}
                    >
                      {c.stat}
                    </span>
                    <span className="mb-1 text-sm text-white/40">{c.statLabel}</span>
                  </div>
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-bold"
                    style={{ background: `${c.color}18`, color: c.color }}
                  >
                    {c.industry}
                  </span>
                  <h3 className="font-poppins mb-3 text-base font-bold leading-snug text-white">
                    {c.headline}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-white/50">{c.detail}</p>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 hover:gap-2.5"
                    style={{ color: c.color }}
                  >
                    Basahin ang buong kwento
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32" style={{ background: "#05080F" }}>
        <div className="container-standard">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "#0076D1" }}
            >
              Bakit kami — Why us
            </p>
            <h2 className="font-poppins text-3xl font-black text-white md:text-4xl">
              Tiwala na nakabatay sa mga detalye.
            </h2>
            <p className="mt-3 text-sm italic text-white/35">
              Trust built on specifics, not claims.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${r.color}18` }}
                  >
                    <r.icon className="h-4 w-4" style={{ color: r.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight text-white">{r.label}</p>
                    <p className="text-xs italic text-white/30">{r.english}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/55">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMEZONE ─────────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#080D14" }}>
        <div className="container-standard">
          <div
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,78,143,0.15) 0%, rgba(0,118,209,0.08) 100%)",
              borderColor: "rgba(0,118,209,0.25)",
            }}
          >
            <div className="flex flex-col items-center gap-6 p-8 md:flex-row md:justify-between">
              <div>
                <p className="font-poppins mb-1 text-lg font-bold text-white">
                  Magkasamang oras tayo.{" "}
                  <span className="text-base font-normal italic text-white/40">We overlap.</span>
                </p>
                <p className="max-w-md text-sm text-white/50">
                  Manila (UTC+8) at Dubai (UTC+4) — 4 na oras lang. Kapag 9am kayo, kami ay 1pm.
                  Live na sagot sa umaga ninyo, hindi kinabukasan.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-xl px-4 py-3 text-center"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <p className="text-xs text-white/40">Manila</p>
                    <p className="font-poppins text-xl font-black text-white">
                      9:00 <span className="text-sm font-normal">AM</span>
                    </p>
                    <p className="text-xs text-white/30">PHT · 🇵🇭</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg text-white/25">↔</div>
                    <p className="text-[10px] text-white/20">4 hrs</p>
                  </div>
                  <div
                    className="rounded-xl px-4 py-3 text-center"
                    style={{
                      background: "rgba(0,118,209,0.15)",
                      border: "1px solid rgba(0,118,209,0.3)",
                    }}
                  >
                    <p className="text-xs" style={{ color: "#0076D1" }}>
                      Dubai
                    </p>
                    <p className="font-poppins text-xl font-black" style={{ color: "#38BDF8" }}>
                      1:00 <span className="text-sm font-normal">PM</span>
                    </p>
                    <p className="text-xs" style={{ color: "#0076D1", opacity: 0.6 }}>
                      GST · 🇦🇪
                    </p>
                  </div>
                </div>
                <p className="text-[10px] italic text-white/20">Live overlap every working day</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-32 md:py-40"
        style={{ background: "#05080F" }}
      >
        {/* dramatic bg glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="h-[600px] w-[600px] rounded-full opacity-[0.1] blur-[100px]"
            style={{ background: "radial-gradient(circle, #0076D1 0%, transparent 70%)" }}
          />
        </div>

        <div className="container-standard relative z-10 text-center">
          <p
            className="mb-4 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "#0076D1" }}
          >
            Huwag nang mag-atubili
          </p>
          <h2
            className="font-poppins mx-auto mb-4 max-w-3xl text-4xl font-black leading-[1.05] text-white md:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Mag-usap tayo
            <br />
            bago kayo magdesisyon.
          </h2>
          <p className="mx-auto mb-3 max-w-lg text-base italic text-white/35">
            Let&apos;s talk before you decide.
          </p>
          <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white/55">
            Walang pitch deck. Walang pressure. Magtatanong kami tungkol sa inyong project,
            magsasabi ng totoo kung angkop kami, at bibigyan ng rough na scope at halaga — bago kayo
            mag-commit ng kahit ano.
          </p>

          <a
            href="/contact?ref=ph"
            className="group inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:gap-4 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
              boxShadow: "0 8px 48px rgba(0,118,209,0.45)",
            }}
          >
            <Send className="h-5 w-5" />
            Send us a message
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <p className="mt-7 text-sm text-white/25">
            O kaya mag-email sa{" "}
            <a
              href="mailto:info@zephortech.com"
              className="text-white/40 underline underline-offset-4 transition-colors hover:text-white/65"
            >
              info@zephortech.com
            </a>{" "}
            <span className="italic">— sasagutin namin sa loob ng 24 na oras.</span>
          </p>

          <p className="mt-16 text-2xl font-black tracking-tight text-white/10">
            Maraming salamat. 🇵🇭
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "rgba(255,255,255,0.05)", background: "#05080F" }}
      >
        <div className="container-standard flex flex-col items-center justify-between gap-3 text-sm text-white/20 md:flex-row">
          <Link
            href="/"
            className="font-poppins font-black text-white/30 transition-colors hover:text-white/60"
          >
            Zephor<span style={{ color: "#0076D1" }}>Tech</span>
          </Link>
          <span>© {new Date().getFullYear()} ZephorTech. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white/45">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/45">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

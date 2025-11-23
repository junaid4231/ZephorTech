"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight, Search } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const positions: Position[] = [
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Lead the development of scalable web applications using React, Node.js, and cloud technologies.",
    requirements: ["5+ years experience", "React/Next.js expert", "Node.js/TypeScript", "Cloud (AWS/GCP)"],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "AI & Innovation",
    location: "Remote",
    type: "Full-time",
    description: "Build intelligent systems and AI agents that transform how businesses operate.",
    requirements: ["3+ years ML experience", "Python/TensorFlow", "LLM experience", "Production ML systems"],
  },
  {
    id: "ui-ux-designer",
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Create beautiful, intuitive interfaces that delight users and drive engagement.",
    requirements: ["4+ years design experience", "Figma expert", "Design systems", "User research"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain robust infrastructure that powers our applications at scale.",
    requirements: ["3+ years DevOps", "Kubernetes/Docker", "CI/CD pipelines", "Infrastructure as Code"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Drive product strategy and execution for cutting-edge digital products.",
    requirements: ["4+ years PM experience", "Technical background", "Agile methodology", "B2B SaaS experience"],
  },
  {
    id: "mobile-developer",
    title: "Senior Mobile Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build high-performance mobile applications for iOS and Android platforms.",
    requirements: ["4+ years mobile dev", "React Native/Flutter", "Native iOS/Android", "App Store deployment"],
  },
];

export function OpenPositions() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const departments = ["All", ...Array.from(new Set(positions.map((p) => p.department)))];

  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || position.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <section
      id="positions"
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
          }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
            Open Positions
          </p>
          <h2 className="heading-2 mb-3 font-bold text-white md:mb-4">
            Join Our Team
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            We're always looking for talented individuals to join our mission. Explore our open positions and find your next adventure.
          </p>
        </div>

        {/* Filters */}
        <div
          className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.1s",
          }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-12 pr-4 text-sm text-white placeholder:text-white/40 transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:text-base"
            />
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all md:text-sm ${
                  selectedDepartment === dept
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Positions Grid */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {filteredPositions.map((position, index) => (
            <div
              key={position.id}
              className="group rounded-xl backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 md:rounded-2xl md:p-6"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${0.1 + index * 0.05}s`,
              }}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-poppins text-xl font-bold text-white transition-colors group-hover:text-primary md:text-2xl">
                    {position.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5 text-xs text-white/60 md:gap-3 md:text-sm">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {position.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {position.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {position.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-white/70 md:text-base">{position.description}</p>

              {/* Requirements */}
              <div className="mb-5 md:mb-6">
                <p className="mb-2 text-xs font-semibold text-white/80 md:text-sm">Key Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {position.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Link
                href={`/contact?position=${encodeURIComponent(position.title)}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2 md:text-base"
              >
                Apply Now
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPositions.length === 0 && (
          <div className="py-10 text-center md:py-12">
            <p className="text-base text-white/60 md:text-lg">
              No positions found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Don't See Your Role */}
        <div
          className="mt-12 rounded-xl p-5 text-center backdrop-blur-sm md:mt-16 md:rounded-2xl md:p-6"
          style={{
            background: "rgba(0, 118, 209, 0.05)",
            border: "1px solid rgba(0, 118, 209, 0.2)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <h3 className="font-poppins mb-3 text-xl font-bold text-white md:text-2xl">
            Don't see your perfect role?
          </h3>
          <p className="mx-auto mb-5 max-w-2xl text-sm text-white/70 md:mb-6 md:text-base">
            We're always looking for exceptional talent. Send us your resume and tell us how you can contribute to ZephorTech.
          </p>
          <Link
            href="/contact?subject=General%20Application"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 md:text-base"
            style={{
              background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
              boxShadow: "0 4px 16px rgba(0, 118, 209, 0.3)",
            }}
          >
            Submit General Application
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


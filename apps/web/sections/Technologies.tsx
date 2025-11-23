"use client";

import React from "react";
import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Brain,
  Server,
  GitBranch,
  Layers,
  Shield,
  Target,
} from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface Technology {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const technologies: Technology[] = [
  // Frontend
  { id: "1", name: "React", category: "Frontend", icon: Code, color: "#61DAFB" },
  { id: "2", name: "Next.js", category: "Frontend", icon: Code, color: "#000000" },
  { id: "3", name: "TypeScript", category: "Frontend", icon: Code, color: "#3178C6" },
  { id: "4", name: "Vue.js", category: "Frontend", icon: Code, color: "#4FC08D" },
  { id: "5", name: "Angular", category: "Frontend", icon: Code, color: "#DD0031" },
  { id: "6", name: "Tailwind CSS", category: "Frontend", icon: Layers, color: "#06B6D4" },

  // Backend
  { id: "7", name: "Node.js", category: "Backend", icon: Server, color: "#339933" },
  { id: "8", name: "Python", category: "Backend", icon: Server, color: "#3776AB" },
  { id: "9", name: "Java", category: "Backend", icon: Server, color: "#ED8B00" },
  { id: "10", name: "PHP", category: "Backend", icon: Server, color: "#777BB4" },
  { id: "11", name: "Ruby", category: "Backend", icon: Server, color: "#CC342D" },
  { id: "12", name: "Go", category: "Backend", icon: Server, color: "#00ADD8" },

  // Mobile
  { id: "13", name: "React Native", category: "Mobile", icon: Smartphone, color: "#61DAFB" },
  { id: "14", name: "Flutter", category: "Mobile", icon: Smartphone, color: "#02569B" },
  { id: "15", name: "Swift", category: "Mobile", icon: Smartphone, color: "#FA7343" },
  { id: "16", name: "Kotlin", category: "Mobile", icon: Smartphone, color: "#7F52FF" },
  { id: "17", name: "Ionic", category: "Mobile", icon: Smartphone, color: "#3880FF" },

  // Cloud & DevOps
  { id: "18", name: "AWS", category: "Cloud", icon: Cloud, color: "#FF9900" },
  { id: "19", name: "Azure", category: "Cloud", icon: Cloud, color: "#0078D4" },
  { id: "20", name: "Docker", category: "DevOps", icon: GitBranch, color: "#2496ED" },
  { id: "21", name: "Kubernetes", category: "DevOps", icon: GitBranch, color: "#326CE5" },
  { id: "22", name: "GitHub Actions", category: "DevOps", icon: GitBranch, color: "#2088FF" },
  { id: "23", name: "Terraform", category: "DevOps", icon: GitBranch, color: "#7B42BC" },

  // Databases
  { id: "24", name: "PostgreSQL", category: "Database", icon: Database, color: "#336791" },
  { id: "25", name: "MongoDB", category: "Database", icon: Database, color: "#47A248" },
  { id: "26", name: "MySQL", category: "Database", icon: Database, color: "#4479A1" },
  { id: "27", name: "Redis", category: "Database", icon: Database, color: "#DC382D" },
  { id: "28", name: "Elasticsearch", category: "Database", icon: Database, color: "#005571" },

  // AI/ML
  { id: "29", name: "TensorFlow", category: "AI/ML", icon: Brain, color: "#FF6F00" },
  { id: "30", name: "PyTorch", category: "AI/ML", icon: Brain, color: "#EE4C2C" },
  { id: "31", name: "OpenAI", category: "AI/ML", icon: Brain, color: "#412991" },
  { id: "32", name: "LangChain", category: "AI/ML", icon: Brain, color: "#1C3C3C" },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Code,
  Backend: Server,
  Mobile: Smartphone,
  Cloud: Cloud,
  DevOps: GitBranch,
  Database: Database,
  "AI/ML": Brain,
};

function TechCard({
  tech,
  IconComponent,
  index,
  categoryVisible,
}: {
  tech: Technology;
  IconComponent: React.ComponentType<{ className?: string }>;
  index: number;
  categoryVisible: boolean;
}) {
  const cardDelay = index * 30;

  return (
    <div
      className="group relative transition-all duration-700 ease-out"
      style={{
        opacity: categoryVisible ? 1 : 0,
        transform: categoryVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transitionDelay: `${cardDelay}ms`,
      }}
    >
      <div
        className="relative rounded-xl border p-3 transition-all duration-300 md:p-4"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 6px 20px ${tech.color}40`;
          e.currentTarget.style.borderColor = `${tech.color}60`;
          e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
        }}
      >
        {/* Icon */}
        <div className="mb-3 flex items-center justify-center">
          <div
            className="rounded-lg p-2 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 md:p-2.5"
            style={{
              background: `${tech.color}15`,
              border: `1px solid ${tech.color}30`,
            }}
          >
            <div style={{ color: tech.color }}>
              <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
        </div>

        {/* Name */}
        <h4 className="font-poppins text-center text-xs font-semibold text-white transition-colors duration-300 group-hover:text-[#00A8FF] md:text-sm">
          {tech.name}
        </h4>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  categoryTechs,
  CategoryIcon,
  index,
  sectionVisible,
}: {
  category: string;
  categoryTechs: Technology[];
  CategoryIcon: React.ComponentType<{ className?: string }>;
  index: number;
  sectionVisible: boolean;
}) {
  const { ref: categoryRef, isVisible: categoryVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  const delay = index * 150;
  const isVisible = sectionVisible && categoryVisible;

  return (
    <div
      ref={categoryRef}
      className="space-y-4 transition-all duration-1000 ease-out md:space-y-5"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3">
        <div
          className="rounded-lg p-2 md:p-2.5"
          style={{
            background: "rgba(0, 118, 209, 0.1)",
            border: "1px solid rgba(0, 118, 209, 0.2)",
          }}
        >
          <div style={{ color: "#0076D1" }}>
            <CategoryIcon className="h-4 w-4 md:h-5 md:w-5" />
          </div>
        </div>
        <h3 className="heading-3 text-white">{category}</h3>
        <div className="h-px flex-1" style={{ background: "rgba(255, 255, 255, 0.1)" }} />
        <span className="text-xs font-semibold text-gray-400 md:text-sm">
          {categoryTechs.length} Technologies
        </span>
      </div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
        {categoryTechs.map((tech, techIndex) => {
          const IconComponent = tech.icon;
          return (
            <TechCard
              key={tech.id}
              tech={tech}
              IconComponent={IconComponent}
              index={techIndex}
              categoryVisible={isVisible}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Technologies() {
  const categories = Array.from(new Set(technologies.map((tech) => tech.category)));
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
      aria-labelledby="technologies-heading"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0076D1 1px, transparent 1px),
            linear-gradient(-45deg, #0076D1 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute right-0 top-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-64 w-64 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
      />

      <div className="container-standard relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 ease-out md:mb-8"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2">
            <Code className="h-4 w-4 text-[#0076D1] md:h-5 md:w-5" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
              Technologies
            </p>
          </div>
          <h2 id="technologies-heading" className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Technologies We Work With
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            Cutting-edge tools and frameworks powering modern digital solutions
          </p>
        </div>

        {/* Technologies Grid by Category */}
        <div className="space-y-8 md:space-y-10">
          {categories.map((category) => {
            const categoryTechs = technologies.filter((tech) => tech.category === category);
            const CategoryIcon = categoryIcons[category] || Code;

            return (
              <CategorySection
                key={category}
                category={category}
                categoryTechs={categoryTechs}
                CategoryIcon={CategoryIcon}
                index={categories.indexOf(category)}
                sectionVisible={sectionVisible}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="mt-8 text-center transition-all duration-1000 ease-out md:mt-10"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="mb-4 text-sm text-gray-400 md:text-base">
            Need expertise in a specific technology? Let's discuss your project.
          </p>
          <a
            href="/contact#quote"
            className="group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
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
            <Shield className="h-4 w-4" />
            <span>Get Expert Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
}

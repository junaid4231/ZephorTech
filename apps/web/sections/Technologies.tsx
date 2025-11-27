"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, Workflow } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

type TechLogo = {
  name: string;
  logo: string;
  background: string;
  fallback?: string;
};

const marqueeLogos: TechLogo[] = [
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg",
    background: "#0A0A0A",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
    background: "#0B1520",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg",
    background: "#041833",
  },
  {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg",
    background: "#0B1520",
  },
  {
    name: "Vue",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg",
    background: "#08170F",
  },
  {
    name: "Svelte",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/svelte.svg",
    background: "#2C0F05",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/angular.svg",
    background: "#2A0B0D",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg",
    background: "#0C1F0C",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/express.svg",
    background: "#1A1A1A",
  },
  {
    name: "FastAPI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg",
    background: "#03201C",
  },
  {
    name: "Django",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/django.svg",
    background: "#02140F",
  },
  {
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg",
    background: "#2A0502",
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg",
    background: "#1E1A2B",
  },
  {
    name: "Ruby",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ruby.svg",
    background: "#2B0409",
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/go.svg",
    background: "#022026",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg",
    background: "#041222",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg",
    background: "#04150C",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg",
    background: "#04121F",
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redis.svg",
    background: "#300303",
  },
  {
    name: "Kafka",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apachekafka.svg",
    background: "#111111",
  },
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg",
    background: "#211104",
  },
  {
    name: "Azure",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg",
    background: "#04162C",
  },
  {
    name: "GCP",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg",
    background: "#03163A",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg",
    background: "#061231",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg",
    background: "#031B30",
  },
  {
    name: "Terraform",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/terraform.svg",
    background: "#12052D",
  },
  {
    name: "GitHub Actions",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg",
    background: "#0B1D35",
  },
  {
    name: "Supabase",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg",
    background: "#032017",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg",
    background: "#0E1117",
  },
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg",
    background: "#04162C",
  },
  {
    name: "Swift",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/swift.svg",
    background: "#2E0F00",
  },
  {
    name: "Kotlin",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kotlin.svg",
    background: "#200427",
  },
  {
    name: "Ionic",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ionic.svg",
    background: "#020C26",
  },
  {
    name: "OpenAI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    background: "#021D17",
  },
  {
    name: "LangChain",
    logo: "https://cdn.simpleicons.org/langchain/00A8FF",
    background: "#031812",
    fallback: "LC",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg",
    background: "#04162A",
  },
  {
    name: "Pinecone",
    logo: "https://cdn.simpleicons.org/pinecone/430098",
    background: "#03251C",
    fallback: "PC",
  },
  {
    name: "Elasticsearch",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/elasticsearch.svg",
    background: "#041E2C",
  },
  {
    name: "Whisper",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
    background: "#141414",
  },
  {
    name: "TensorFlow",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tensorflow.svg",
    background: "#2B1200",
  },
  {
    name: "PyTorch",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pytorch.svg",
    background: "#2A0B03",
  },
  {
    name: "Stable Diffusion",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stablediffusion.svg",
    background: "#2B0C00",
  },
  {
    name: "Vertex AI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg",
    background: "#021431",
  },
];

function TechLogoItem({ logo }: { logo: TechLogo }) {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(logo.logo);
  const initials =
    logo.fallback ||
    logo.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  // Try alternative sources if the primary fails
  const handleImageError = () => {
    if (currentSrc === logo.logo) {
      // Try v12 if we were using v11
      const altSrc = logo.logo.replace("@v11", "@v12").replace("@v12", "@v12");
      if (altSrc !== logo.logo) {
        setCurrentSrc(altSrc);
        return;
      }
    }
    setImageError(true);
  };

  return (
    <span className="tech-marquee__item">
      <span
        className="tech-marquee__icon"
        style={{
          background: logo.background,
        }}
      >
        {!imageError ? (
          <Image
            src={currentSrc}
            alt={logo.name}
            width={16}
            height={16}
            className="tech-marquee__icon-img"
            onError={handleImageError}
            unoptimized
          />
        ) : (
          <span className="tech-marquee__fallback">{initials}</span>
        )}
      </span>
      <span className="tech-marquee__text">{logo.name}</span>
    </span>
  );
}

export function Technologies() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "linear-gradient(180deg, #050709 0%, #0F1419 100%)" }}
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0,168,255,0.15), transparent 40%),
              radial-gradient(circle at 80% 0%, rgba(0,118,209,0.12), transparent 45%),
              radial-gradient(circle at 50% 80%, rgba(168,85,247,0.12), transparent 40%)
            `,
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00A8FF]">
            <Cpu className="h-4 w-4" />
            Tech Stack
          </p>
          <h2 className="heading-2 mb-3 text-white">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
              }}
            >
              Precision stacks for modern product companies
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
            We pair proven frameworks with emerging tech to deliver projects that are maintainable,
            measurable, and ready for scale.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-3 shadow-2xl md:p-5">
          <div className="tech-marquee-wrapper">
            <div className="tech-marquee">
              {/* Duplicate array 2 times for seamless infinite loop - shows all techs before looping */}
              {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
                <TechLogoItem key={`${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#00A8FF]/10 to-[#0076D1]/10 px-6 py-5 text-sm text-white/80"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.2s",
          }}
        >
          <p className="text-white/80">
            Want the full breakdown by capability? Explore our service catalogue.
          </p>
          <a
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:border-white"
          >
            View full stack
            <Workflow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

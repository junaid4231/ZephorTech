"use client";

import React from "react";
import {
  Globe,
  Smartphone,
  Brain,
  Code,
  ShoppingCart,
  Cloud,
} from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import type { ServiceDetail } from "@/lib/services";

interface ServicesGridProps {
  services: ServiceDetail[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    web: Globe,
    mobile: Smartphone,
    ai: Brain,
    saas: Code,
    ecommerce: ShoppingCart,
    cloud: Cloud,
  };

  const gradientMap: Record<string, string> = {
    web: "rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(37, 99, 235, 0.3)",
    mobile: "rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3), rgba(147, 51, 234, 0.3)",
    ai: "rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3), rgba(79, 70, 229, 0.3)",
    saas: "rgba(34, 197, 94, 0.3), rgba(16, 185, 129, 0.3), rgba(22, 163, 74, 0.3)",
    ecommerce: "rgba(249, 115, 22, 0.3), rgba(239, 68, 68, 0.3), rgba(234, 88, 12, 0.3)",
    cloud: "rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3), rgba(15, 118, 110, 0.3)",
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = iconMap[service.iconName] || Code;
        const gradient = gradientMap[service.iconName] || "rgba(0, 118, 209, 0.3)";
        
        return (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.shortDescription}
            features={service.features.map((f) => f.title)}
            href={`/services/${service.slug}`}
            icon={Icon}
            gradient={gradient}
            delay={index * 100}
          />
        );
      })}
    </div>
  );
}


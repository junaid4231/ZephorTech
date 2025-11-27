"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  ArrowRight,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { siteConfig } from "@/config";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { getAllServices } from "@/lib/services";

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  // Get all services dynamically
  const allServices = getAllServices();

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Enhanced Background Effects with Animations */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #0076D1 1px, transparent 1px),
            linear-gradient(-45deg, #0076D1 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      {/* Animated Gradient Orbs */}
      <div
        className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #0076D1, transparent)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00A8FF, transparent)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      {/* Floating Particles - Fixed positions to avoid hydration issues */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { size: 3, left: "10%", top: "20%", delay: 0, duration: 15 },
          { size: 2, left: "80%", top: "30%", delay: 2, duration: 18 },
          { size: 4, left: "30%", top: "60%", delay: 1, duration: 20 },
          { size: 2.5, left: "70%", top: "70%", delay: 3, duration: 16 },
          { size: 3.5, left: "50%", top: "40%", delay: 1.5, duration: 22 },
          { size: 2, left: "20%", top: "80%", delay: 2.5, duration: 17 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 blur-sm"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "#0076D1",
              left: particle.left,
              top: particle.top,
              animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="container-standard relative z-10 py-12 md:py-16 lg:py-20">
        {/* Newsletter Section - Compact */}
        <div
          className="group relative mb-8 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 backdrop-blur-xl transition-all duration-700 md:mb-10"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Shimmer Effect */}
          <div
            className="absolute -inset-x-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              animation: "shimmer 3s infinite",
            }}
          />

          <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 md:items-center md:gap-4">
            <div>
              <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#0076D1]/30 bg-[#0076D1]/10 px-2 py-0.5">
                <Sparkles className="h-2.5 w-2.5 animate-pulse text-[#0076D1]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0076D1]">
                  Newsletter
                </span>
              </div>
              <h3 className="mb-1 text-sm font-bold text-white md:text-base">
                Stay Ahead of the Curve
              </h3>
              <p className="text-xs leading-relaxed text-white/60">
                Monthly insights, playbooks, and exclusive updates. No spam.
              </p>
            </div>
            <div className="md:pl-2">
              <NewsletterForm variant="compact" />
            </div>
          </div>
        </div>

        {/* Main Footer Links - Enhanced Grid with Staggered Animation */}
        <div
          className="grid grid-cols-1 gap-8 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="focus:ring-primary group mb-6 inline-flex items-center rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="ZephorTech Home - Return to homepage"
            >
              <div className="relative flex h-16 w-auto items-center justify-center transition-all duration-300 group-hover:scale-105 md:h-20">
                <Image
                  src="/logo.png"
                  alt="ZephorTech Logo"
                  width={200}
                  height={64}
                  className="h-16 w-auto object-contain transition-all duration-300 md:h-20"
                  style={{
                    maxWidth: "180px",
                    height: "auto",
                  }}
                  onError={(e) => {
                    console.error("Logo failed to load:", e);
                  }}
                />
                {/* Logo Glow Effect */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"
                  style={{
                    background: "radial-gradient(circle, #0076D1, transparent)",
                  }}
                />
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-400">
              Cutting-edge IT solutions for modern businesses. We transform ideas into digital
              excellence with innovation, expertise, and unwavering commitment.
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(socialIcons).map(([key, Icon], index) => {
                const socialUrl = siteConfig.social[key as keyof typeof siteConfig.social];
                if (!socialUrl) return null;

                return (
                  <a
                    key={key}
                    href={socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/60 hover:bg-primary/10 focus:ring-primary/40 group relative rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0076D1] focus:outline-none focus:ring-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                    aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  >
                    <Icon className="h-4 w-4 transition-all duration-300 group-hover:rotate-12" />
                    {/* Social Icon Glow */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20"
                      style={{
                        background: "radial-gradient(circle, #0076D1, transparent)",
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-poppins mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {siteConfig.company.links.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    opacity: footerVisible ? 1 : 0,
                    transform: footerVisible ? "translateX(0)" : "translateX(-10px)",
                    transition: `all 0.5s ease ${index * 100}ms`,
                  }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:text-[#0076D1] focus:text-[#0076D1] focus:outline-none"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column - Enhanced with All Services */}
          <div className="lg:col-span-2">
            <h3 className="font-poppins mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {allServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:text-[#0076D1] focus:text-[#0076D1] focus:outline-none"
                  style={{
                    opacity: footerVisible ? 1 : 0,
                    transform: footerVisible ? "translateX(0)" : "translateX(-10px)",
                    transition: `all 0.5s ease ${index * 80}ms`,
                  }}
                >
                  <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {service.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-poppins mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li
                style={{
                  opacity: footerVisible ? 1 : 0,
                  transform: footerVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.5s ease 200ms",
                }}
              >
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-white"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Mail className="h-4 w-4 text-[#0076D1] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li
                style={{
                  opacity: footerVisible ? 1 : 0,
                  transform: footerVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.5s ease 300ms",
                }}
              >
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-white"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Phone className="h-4 w-4 text-[#0076D1] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li
                style={{
                  opacity: footerVisible ? 1 : 0,
                  transform: footerVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.5s ease 400ms",
                }}
              >
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="mt-0.5 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-[#0076D1]" />
                  </div>
                  <span>{siteConfig.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top - Enhanced */}
        <div
          className="mt-10 border-t border-white/10 pt-6 transition-all duration-1000 md:mt-12 md:pt-8"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "200ms",
          }}
        >
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-gray-500 md:text-sm">
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex items-center gap-4 sm:ml-4 sm:gap-6">
                <Link
                  href="/privacy"
                  className="text-xs text-gray-500 transition-colors hover:text-[#0076D1] md:text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-gray-500 transition-colors hover:text-[#0076D1] md:text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Back to Top Button - Enhanced with Animation */}
            <button
              onClick={scrollToTop}
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-[#0076D1] hover:bg-[#0076D1] hover:shadow-lg hover:shadow-[#0076D1]/20"
              aria-label="Scroll to top"
            >
              {/* Animated Background Gradient */}
              <div
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #004E8F, #0076D1, #00A8FF)",
                  animation: "gradientShift 3s ease infinite",
                }}
              />
              <ArrowUp className="relative z-10 h-4 w-4 text-gray-400 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.1);
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(30px, -30px) scale(1.5);
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </footer>
  );
}

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
} from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { siteConfig } from "@/config";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

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
      {/* Background Effects */}
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
        className="absolute right-0 top-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #00A8FF, transparent)" }}
      />

      <div className="container-standard relative z-10 py-16 md:py-20 lg:py-24">
        {/* Newsletter Section - High Visibility */}
        <div
          className="mb-16 grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8 md:grid-cols-2 md:items-center lg:mb-20 lg:p-10"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease-out",
          }}
        >
          <div>
            <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">Join our newsletter</h3>
            <p className="text-sm text-gray-400 sm:text-base">
              Get monthly product drops & engineering playbooks. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="md:pl-8 lg:pl-10">
            <NewsletterForm variant="compact" />
          </div>
        </div>

        {/* Main Footer Links */}
        <div
          className="grid grid-cols-1 gap-10 transition-all duration-1000 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="focus:ring-primary group mb-6 inline-flex items-center rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="ZephorTech Home - Return to homepage"
            >
              <div className="relative flex h-12 w-auto items-center justify-center transition-all duration-300 group-hover:scale-105 sm:h-14">
                <Image
                  src="/logo.png"
                  alt="ZephorTech Logo"
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain transition-all duration-300 sm:h-14"
                  style={{
                    maxWidth: "140px",
                    height: "auto",
                  }}
                  onError={(e) => {
                    console.error("Logo failed to load:", e);
                  }}
                />
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Cutting-edge IT solutions for modern businesses. We transform ideas into digital
              excellence.
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(socialIcons).map(([key, Icon]) => {
                const socialUrl = siteConfig.social[key as keyof typeof siteConfig.social];
                if (!socialUrl) return null;

                return (
                  <a
                    key={key}
                    href={socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:border-primary/60 hover:bg-primary/10 focus:ring-primary/40 group relative rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0076D1] focus:outline-none focus:ring-2"
                    aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  >
                    <Icon className="h-4 w-4 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-poppins mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {siteConfig.company.links.map((link) => (
                <li key={link.href}>
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

          {/* Services Column */}
          <div>
            <h3 className="font-poppins mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {siteConfig.services.links.map((link) => (
                <li key={link.href}>
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

          {/* Contact Column */}
          <div>
            <h3 className="font-poppins mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-white"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Mail className="h-4 w-4 text-[#0076D1]" />
                  </div>
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-white"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Phone className="h-4 w-4 text-[#0076D1]" />
                  </div>
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
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

        {/* Bottom Bar with Back to Top */}
        <div
          className="mt-12 border-t border-white/10 pt-6 transition-all duration-1000 md:mt-16 md:pt-8"
          style={{
            opacity: footerVisible ? 1 : 0,
            transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "200ms",
          }}
        >
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-xs text-gray-500 sm:text-left md:text-sm">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-[#0076D1] hover:bg-[#0076D1] hover:shadow-lg hover:shadow-[#0076D1]/20"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4 text-gray-400 transition-colors group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

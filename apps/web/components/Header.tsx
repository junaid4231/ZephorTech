"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Command,
  ChevronDown,
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  ShoppingCart,
  Cloud,
  Megaphone,
  LineChart,
} from "lucide-react";
import { mainNavigation, CTAButton } from "@/config";

const serviceItems = [
  { label: "Web Development", slug: "web-development", icon: Globe, color: "#0076D1" },
  { label: "Mobile Development", slug: "mobile-apps", icon: Smartphone, color: "#8B5CF6" },
  { label: "AI & Automation", slug: "ai-agents", icon: Bot, color: "#10B981" },
  { label: "SaaS Development", slug: "saas", icon: BarChart3, color: "#F59E0B" },
  { label: "E-Commerce", slug: "ecommerce", icon: ShoppingCart, color: "#EF4444" },
  { label: "Cloud & DevOps", slug: "cloud-devops", icon: Cloud, color: "#06B6D4" },
  { label: "Digital Marketing", slug: "digital-marketing", icon: Megaphone, color: "#EC4899" },
  { label: "SEO Services", slug: "seo-performance", icon: LineChart, color: "#F97316" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        router.push("/search");
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [router]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-dark/80 border-b border-white/5 shadow-2xl backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{
        background: isScrolled
          ? "rgba(10, 10, 10, 0.8)"
          : "linear-gradient(180deg, rgba(10, 10, 10, 0.3) 0%, transparent 100%)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
      }}
    >
      {/* Background gradient line */}
      {isScrolled && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #0076D1 50%, transparent 100%)",
            opacity: 0.3,
          }}
        />
      )}

      <nav className="container-standard" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between md:h-24 lg:h-20">
          {/* Logo - Optimized for all devices */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="focus:ring-primary group flex items-center rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="ZephorTech Home - Return to homepage"
            >
              <div className="relative flex h-10 w-auto items-center justify-center transition-all duration-300 group-hover:scale-105 sm:h-11 md:h-12">
                <Image
                  src="/logo.png"
                  alt="ZephorTech Logo"
                  width={160}
                  height={48}
                  priority
                  className="h-10 w-auto object-contain transition-all duration-300 sm:h-11 md:h-12"
                  style={{
                    maxWidth: "140px",
                    height: "auto",
                  }}
                  onError={() => {
                    console.error("Logo failed to load");
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 lg:flex">
            {mainNavigation.map((link, index) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (link.href === "/services") {
                return (
                  <div
                    key={link.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {/* Services trigger */}
                    <button
                      type="button"
                      className={`font-inter group relative inline-flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:text-white focus:text-white focus:outline-none ${
                        isActive ? "text-white" : "text-gray-300"
                      }`}
                    >
                      <span className="relative z-10">Services</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                      />
                      <span
                        className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                          isActive || isServicesOpen
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{
                          background: "rgba(0, 118, 209, 0.1)",
                          border: "1px solid rgba(0, 118, 209, 0.2)",
                        }}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-200"
                      style={{
                        background: "rgba(8, 13, 20, 0.97)",
                        backdropFilter: "blur(24px)",
                        opacity: isServicesOpen ? 1 : 0,
                        pointerEvents: isServicesOpen ? "auto" : "none",
                        transform: isServicesOpen
                          ? "translateX(-50%) translateY(0)"
                          : "translateX(-50%) translateY(-8px)",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Dropdown header */}
                      <div className="border-b border-white/[0.06] px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                          Our Services
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-px bg-white/[0.04] p-1">
                        {serviceItems.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setIsServicesOpen(false)}
                              className="group flex items-center gap-2.5 rounded-xl bg-[#080D14] p-3 transition-all duration-200 hover:bg-white/[0.04]"
                            >
                              <div
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                                style={{
                                  background: `${service.color}18`,
                                  border: `1px solid ${service.color}30`,
                                }}
                              >
                                <Icon className="h-3.5 w-3.5" style={{ color: service.color }} />
                              </div>
                              <span className="text-xs font-medium text-white/70 group-hover:text-white">
                                {service.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                      {/* View all services */}
                      <div className="border-t border-white/[0.06] p-2">
                        <Link
                          href="/services"
                          onClick={() => setIsServicesOpen(false)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 hover:bg-white/[0.04]"
                          style={{ color: "#0076D1" }}
                        >
                          View all services
                          <ChevronDown className="h-3 w-3 -rotate-90" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-inter group relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:text-white focus:text-white focus:outline-none ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                  style={{
                    transitionDelay: `${index * 20}ms`,
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{
                      background: "rgba(0, 118, 209, 0.1)",
                      border: "1px solid rgba(0, 118, 209, 0.2)",
                    }}
                  />
                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
                      isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                    style={{
                      background: "linear-gradient(90deg, transparent, #0076D1, transparent)",
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => router.push("/search")}
              className="hover:border-primary hover:bg-primary/10 focus:ring-primary inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white transition focus:outline-none focus:ring-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
              <span className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/60 xl:flex">
                <Command className="h-2.5 w-2.5" />K
              </span>
            </button>
            <Link
              href={CTAButton.href}
              className="btn-standard font-inter focus:ring-primary focus:ring-offset-dark group relative overflow-hidden rounded-xl px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
              }}
            >
              <span className="relative z-10">{CTAButton.label}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="focus:ring-primary group relative inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`transition-all duration-500 ease-in-out lg:hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <div
            className="space-y-1 border-t border-white/10 pb-6 pt-4"
            style={{
              background: "rgba(10, 10, 10, 0.95)",
              backdropFilter: "blur(20px)",
            }}
          >
            {mainNavigation.map((link, index) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-inter group block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none ${
                    isActive ? "bg-white/5 text-white" : "text-gray-300"
                  }`}
                  style={{
                    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transitionDelay: `${index * 50}ms`,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ background: "#0076D1" }}
                    />
                    {link.label}
                  </span>
                </Link>
              );
            })}

            {/* Mobile Search Link */}
            <Link
              href="/search"
              className="font-inter group flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-gray-300 transition-all duration-300 hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>

            {/* Mobile CTA Button */}
            <div className="px-4 pt-4">
              <Link
                href={CTAButton.href}
                className="font-inter focus:ring-primary group block rounded-xl bg-gradient-to-r from-[#004E8F] to-[#0076D1] px-5 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2"
                style={{
                  boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {CTAButton.label}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

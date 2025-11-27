"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { siteConfig } from "@/config";

const phoneHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const addressHref = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    primary: siteConfig.email,
    secondary: "For general inquiries",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    primary: siteConfig.phone,
    secondary: "Mon-Fri, 9AM-6PM GST",
    href: phoneHref,
  },
  {
    icon: MapPin,
    label: "Address",
    primary: siteConfig.address,
    secondary: "Global delivery hub",
    href: addressHref,
  },
  {
    icon: Clock,
    label: "Business Hours",
    primary: "Mon - Fri: 9AM - 6PM GST",
    secondary: "Weekend: By appointment",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com/company/zephortech",
    color: "#0A66C2",
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "https://twitter.com/zephortech",
    color: "#1DA1F2",
  },
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com/zephortech",
    color: "#FFFFFF",
  },
  {
    icon: MessageCircle,
    name: "Discord",
    href: "https://discord.gg/zephortech",
    color: "#5865F2",
  },
];

export function ContactMethods() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16"
      style={{
        background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0076D1 1px, transparent 1px),
              linear-gradient(to bottom, #0076D1 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-standard relative z-10">
        {/* Header */}
        <div
          className="mb-6 text-center transition-all duration-1000 md:mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0076D1] md:text-sm">
            Get in Touch
          </p>
          <h2 className="heading-2 mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #004E8F 0%, #0076D1 50%, #00A8FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Multiple Ways to Connect
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-400 md:text-base">
            Choose the method that works best for you. We're available across multiple channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-5 lg:grid-cols-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease",
            transitionDelay: "200ms",
          }}
        >
          {contactInfo.map((item, index) => {
            const Content = (
              <div
                className="group relative flex h-full flex-col rounded-xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-6"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  transitionDelay: `${index * 100}ms`,
                  minHeight: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 48px rgba(0, 118, 209, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.2)";
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #004E8F, #0076D1)",
                  }}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 font-poppins text-lg font-bold text-white">{item.label}</h3>
                <p className="mb-2 text-sm font-medium leading-relaxed text-white md:text-base">
                  {item.primary}
                </p>
                <p className="mt-auto text-xs text-white/60 md:text-sm">{item.secondary}</p>
              </div>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                target={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                className="block h-full"
              >
                {Content}
              </a>
            ) : (
              <div key={index} className="h-full">{Content}</div>
            );
          })}
        </div>

        {/* Social Links */}
        <div
          className="text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="mb-4 text-xs uppercase tracking-wider text-gray-400 md:mb-5 md:text-sm">
            Connect with us
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:scale-110 md:h-12 md:w-12"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = social.color;
                  e.currentTarget.style.background = `${social.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }}
                aria-label={social.name}
              >
                <social.icon
                  className="h-5 w-5 transition-colors duration-300"
                  style={{ color: social.color }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github, MessageCircle } from "lucide-react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    primary: "hello@zephortech.com",
    secondary: "For general inquiries",
    href: "mailto:hello@zephortech.com",
  },
  {
    icon: Phone,
    label: "Phone",
    primary: "+1 (555) 123-4567",
    secondary: "Mon-Fri, 9AM-6PM EST",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    primary: "123 Tech Street, Suite 400",
    secondary: "Innovation City, IC 12345",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    primary: "Mon - Fri: 9AM - 6PM EST",
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
                className="group relative rounded-xl border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-105 md:p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  transitionDelay: `${index * 100}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 118, 209, 0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 48px rgba(0, 118, 209, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12"
                  style={{
                    background: "linear-gradient(135deg, #004E8F, #0076D1)",
                  }}
                >
                  <item.icon className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <h3 className="heading-3 mb-2 text-white">{item.label}</h3>
                <p className="mb-1 text-sm font-medium text-white md:text-base">{item.primary}</p>
                <p className="text-xs text-gray-400 md:text-sm">{item.secondary}</p>
              </div>
            );

            return item.href ? (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
                {Content}
              </a>
            ) : (
              <div key={index}>{Content}</div>
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

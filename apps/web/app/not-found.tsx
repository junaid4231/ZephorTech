"use client";

import Link from "next/link";
import { Header, Footer } from "@/components";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  const popularPages = [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ];

  return (
    <>
      <Header />
      
      <main
        className="relative min-h-screen flex items-center justify-center px-4 py-24"
        style={{
          background: "linear-gradient(180deg, #05070B 0%, #0A111C 50%, #05070B 100%)",
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
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #0076D1, transparent)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="relative p-8 rounded-3xl backdrop-blur-sm"
              style={{
                background: "rgba(0, 118, 209, 0.05)",
                border: "1px solid rgba(0, 118, 209, 0.2)",
              }}
            >
              <FileQuestion className="w-24 h-24 text-primary" />
            </div>
          </div>

          {/* 404 Number */}
          <h1
            className="font-poppins text-9xl font-bold mb-6"
            style={{
              backgroundImage: "linear-gradient(135deg, #0076D1 0%, #00A8FF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </h1>

          {/* Title */}
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,118,209,0.6)]"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
              }}
            >
              <Home className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Popular Pages */}
          <div
            className="p-8 rounded-2xl backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="font-poppins text-xl font-semibold text-white">
                Looking for something? Try these popular pages:
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group px-6 py-3 rounded-xl font-medium text-white/70 transition-all duration-300 hover:text-white hover:scale-105 hover:bg-[rgba(0,118,209,0.1)] hover:border-[rgba(0,118,209,0.3)]"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <p className="mt-12 text-white/60 text-sm">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

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
        className="relative flex min-h-screen items-center justify-center px-4 py-24"
        style={{ background: "#0A0A0A" }}
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div
              className="relative rounded-3xl p-8 backdrop-blur-sm"
              style={{
                background: "rgba(0, 118, 209, 0.05)",
                border: "1px solid rgba(0, 118, 209, 0.2)",
              }}
            >
              <FileQuestion className="text-primary h-24 w-24" />
            </div>
          </div>

          {/* 404 Number */}
          <h1
            className="font-poppins mb-6 text-9xl font-bold"
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
          <h2 className="font-poppins mb-4 text-4xl font-bold text-white md:text-5xl">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-white/70">
            The page you're looking for doesn't exist or has been moved. Let's get you back on
            track.
          </p>

          {/* Action Buttons */}
          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,118,209,0.6)]"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
              }}
            >
              <Home className="h-5 w-5" />
              <span>Go to Homepage</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Popular Pages */}
          <div
            className="rounded-2xl p-8 backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="mb-6 flex items-center justify-center gap-2">
              <Search className="text-primary h-5 w-5" />
              <h3 className="font-poppins text-xl font-semibold text-white">
                Looking for something? Try these popular pages:
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group rounded-xl px-6 py-3 font-medium text-white/70 transition-all duration-300 hover:scale-105 hover:border-[rgba(0,118,209,0.3)] hover:bg-[rgba(0,118,209,0.1)] hover:text-white"
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
          <p className="mt-12 text-sm text-white/60">
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

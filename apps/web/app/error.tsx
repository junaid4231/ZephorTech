"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components";
import { AlertCircle, RefreshCw, Home, Mail } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-inter antialiased">
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

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div
                className="relative p-8 rounded-3xl backdrop-blur-sm animate-pulse"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <AlertCircle className="w-24 h-24 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-white mb-4">
              Oops! Something Went Wrong
            </h1>

            {/* Description */}
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div
                className="mb-12 p-4 rounded-xl text-left max-w-2xl mx-auto"
                style={{
                  background: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <p className="text-xs font-mono text-red-300 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-white/40 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={reset}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,118,209,0.6)]"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                  boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
                }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Home className="w-5 h-5" />
                <span>Go to Homepage</span>
              </Link>
            </div>

            {/* Help Text */}
            <div
              className="p-6 rounded-2xl backdrop-blur-sm"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <p className="text-white/70 mb-3">
                If this problem persists, please contact our support team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}

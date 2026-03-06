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
          className="relative flex min-h-screen items-center justify-center px-4 py-24"
          style={{ background: "#0A0A0A" }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Error Icon */}
            <div className="mb-8 flex justify-center">
              <div
                className="relative animate-pulse rounded-3xl p-8 backdrop-blur-sm"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <AlertCircle className="h-24 w-24 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-poppins mb-4 text-4xl font-bold text-white md:text-5xl">
              Oops! Something Went Wrong
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/70">
              We encountered an unexpected error. Don't worry, our team has been notified and we're
              working on a fix.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div
                className="mx-auto mb-12 max-w-2xl rounded-xl p-4 text-left"
                style={{
                  background: "rgba(239, 68, 68, 0.05)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <p className="break-all font-mono text-xs text-red-300">{error.message}</p>
                {error.digest && (
                  <p className="mt-2 font-mono text-xs text-white/40">Error ID: {error.digest}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={reset}
                className="group inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,118,209,0.6)]"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                  boxShadow: "0 10px 40px rgba(0, 118, 209, 0.4)",
                }}
              >
                <RefreshCw className="h-5 w-5" />
                <span>Try Again</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Home className="h-5 w-5" />
                <span>Go to Homepage</span>
              </Link>
            </div>

            {/* Help Text */}
            <div
              className="rounded-2xl p-6 backdrop-blur-sm"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <p className="mb-3 text-white/70">
                If this problem persists, please contact our support team.
              </p>
              <Link
                href="/contact"
                className="text-primary inline-flex items-center gap-2 font-semibold hover:underline"
              >
                <Mail className="h-4 w-4" />
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

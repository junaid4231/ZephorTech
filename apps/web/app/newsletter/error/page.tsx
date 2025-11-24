import Link from "next/link";
import { Header, Footer } from "@/components";

export const metadata = {
  title: "Subscription Error | ZephorTech",
  description: "We couldn't confirm your newsletter subscription.",
};

const errorMessages: Record<string, string> = {
  "missing-token": "We couldn't find a confirmation token. Please use the link from your email.",
  "invalid-token": "This confirmation link is invalid or has already been used.",
  config: "We're finishing our email configuration. Please try again shortly.",
  "database-error": "We encountered a database error. Please try again later.",
  "update-error": "We couldn't update your subscription. Please contact support.",
  "server-error": "An unexpected error occurred. Please try again later.",
  "rate-limit": "Too many requests. Please wait a moment and try again.",
};

interface PageProps {
  searchParams: Promise<{ reason?: string }>;
}

export default async function NewsletterErrorPage({ searchParams }: PageProps) {
  const { reason } = await searchParams;
  const message = reason ? errorMessages[reason] ?? errorMessages["invalid-token"] : errorMessages["invalid-token"];

  return (
    <>
      <Header />
      <main
        className="relative min-h-screen py-12 md:py-16"
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
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #DC2626 0%, transparent 70%)" }}
        />

        <div className="container-standard relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: "rgba(220, 38, 38, 0.2)",
                  border: "2px solid rgba(220, 38, 38, 0.4)",
                }}
              >
                <svg
                  className="h-10 w-10 text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-rose-400">Newsletter</p>
            <h1 className="heading-2 mb-4 text-white">Confirmation Error</h1>
            <p className="mb-8 text-lg text-white/70">{message}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                Back to homepage
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                  boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
                }}
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


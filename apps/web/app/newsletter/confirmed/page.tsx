import Link from "next/link";
import { Header, Footer } from "@/components";

export const metadata = {
  title: "Subscription Confirmed | ZephorTech",
  description: "Thanks for confirming your subscription to the ZephorTech newsletter.",
};

export default function NewsletterConfirmedPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen py-12 md:py-16" style={{ background: "#0A0A0A" }}>
        <div className="container-standard relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 118, 209, 0.2) 100%)",
                  border: "2px solid rgba(16, 185, 129, 0.4)",
                }}
              >
                <svg
                  className="h-10 w-10 text-[#10B981]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#0076D1]">
              Newsletter
            </p>
            <h1 className="heading-2 mb-4 text-white">Subscription Confirmed</h1>
            <p className="mb-8 text-lg text-white/70">
              Thanks for joining the ZephorTech insider list. We'll keep you posted with new case
              studies, product launches, and expert insights.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
                boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
              }}
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

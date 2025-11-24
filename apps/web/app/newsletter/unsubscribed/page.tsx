import Link from "next/link";
import { Header, Footer } from "@/components";
import { CheckCircle2, Mail } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ already?: string }>;
}

export const metadata = {
  title: "Unsubscribed | ZephorTech",
  description: "You have been unsubscribed from the ZephorTech newsletter.",
};

export default async function NewsletterUnsubscribedPage({ searchParams }: PageProps) {
  const { already } = await searchParams;
  const isAlreadyUnsubscribed = already === "true";

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
          style={{ background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }}
        />

        <div className="container-standard relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 118, 209, 0.2) 100%)",
                  border: "2px solid rgba(16, 185, 129, 0.4)",
                }}
              >
                <CheckCircle2 className="h-10 w-10 text-[#10B981]" />
              </div>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#10B981]">
              Newsletter
            </p>
            <h1 className="heading-2 mb-4 text-white">
              {isAlreadyUnsubscribed ? "Already Unsubscribed" : "Successfully Unsubscribed"}
            </h1>
            <p className="mb-8 text-lg text-white/70">
              {isAlreadyUnsubscribed
                ? "You were already unsubscribed from our newsletter."
                : "You have been successfully unsubscribed from the ZephorTech newsletter. You will no longer receive emails from us."}
            </p>

            {!isAlreadyUnsubscribed && (
              <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6 text-left">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#0076D1]" />
                  <h3 className="text-lg font-semibold text-white">What happens next?</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#10B981]">✓</span>
                    <span>You will no longer receive newsletter emails</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#10B981]">✓</span>
                    <span>Your email has been removed from our mailing list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-[#10B981]">✓</span>
                    <span>You can resubscribe anytime using the newsletter form</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
        </div>
      </main>
      <Footer />
    </>
  );
}


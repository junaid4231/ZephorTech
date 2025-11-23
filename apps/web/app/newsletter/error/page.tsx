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
};

interface PageProps {
  searchParams: { reason?: string };
}

export default function NewsletterErrorPage({ searchParams }: PageProps) {
  const { reason } = searchParams;
  const message = reason ? errorMessages[reason] ?? errorMessages["invalid-token"] : errorMessages["invalid-token"];

  return (
    <>
      <Header />
      <main className="section-padding min-h-[60vh]">
        <div className="container-standard max-w-3xl text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-4">Newsletter</p>
          <h1 className="heading-2 mb-4">Confirmation Error</h1>
          <p className="text-white/70 text-lg mb-8">{message}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Back to homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Contact support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


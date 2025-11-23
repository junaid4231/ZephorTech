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
      <main className="section-padding min-h-[60vh]">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Newsletter</p>
          <h1 className="heading-2 mb-4">Subscription Confirmed</h1>
          <p className="text-white/70 text-lg mb-8">
            Thanks for joining the ZephorTech insider list. We’ll keep you posted with new case studies,
            product launches, and expert insights.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            Back to homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}



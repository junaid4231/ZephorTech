import Link from "next/link";
import HeroAnimation from "@/components/HeroAnimation";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-primary px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="hero-heading"
    >
      {/* 3D Animation Canvas Container - Phase 3 */}
      <div
        id="hero-canvas"
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <HeroAnimation />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Main Heading */}
        <h1
          id="hero-heading"
          className="mb-6 font-poppins text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Cutting-Edge{" "}
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            IT Solutions
          </span>
          <br />
          For Your Business
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-3xl font-inter text-lg leading-relaxed text-blue-50 sm:text-xl md:text-2xl">
          We deliver innovative technology solutions including web & mobile
          development, AI agents, SaaS products, and comprehensive digital
          transformation services.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/contact#quote"
            className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-4 font-inter text-base font-semibold text-primary shadow-soft-lg transition-all hover:bg-blue-50 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 sm:w-auto"
          >
            Hire Us
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 font-inter text-base font-semibold text-white shadow-soft transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 sm:w-auto"
          >
            Our Work
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
        </div>

        {/* Trust Indicators / Stats (Optional Enhancement) */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 font-poppins text-3xl font-bold text-white sm:text-4xl">
              500+
            </div>
            <div className="font-inter text-sm text-blue-100 sm:text-base">
              Projects Delivered
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-poppins text-3xl font-bold text-white sm:text-4xl">
              200+
            </div>
            <div className="font-inter text-sm text-blue-100 sm:text-base">
              Happy Clients
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-poppins text-3xl font-bold text-white sm:text-4xl">
              15+
            </div>
            <div className="font-inter text-sm text-blue-100 sm:text-base">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 font-poppins text-3xl font-bold text-white sm:text-4xl">
              98%
            </div>
            <div className="font-inter text-sm text-blue-100 sm:text-base">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}


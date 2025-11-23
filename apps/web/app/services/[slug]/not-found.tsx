import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components";

export default function ServiceNotFound() {
  return (
    <>
      <Header />
      <div
        className="flex min-h-[70vh] flex-col items-center justify-center px-6"
        style={{
          background: "linear-gradient(180deg, #0A0A0A 0%, #0F1419 50%, #0A0A0A 100%)",
        }}
      >
        <div className="max-w-2xl text-center">
          <h1 className="scale-h1 font-poppins mb-4 font-bold" style={{ color: "#0076D1" }}>
            404
          </h1>
          <h2 className="font-poppins mb-4 text-3xl font-bold text-white">Service Not Found</h2>
          <p className="mb-6 text-gray-400">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/services"
              className="bg-primary group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Services</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

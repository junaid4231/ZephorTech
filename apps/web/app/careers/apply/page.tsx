import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { CareerApplicationForm } from "@/sections/careers/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Internship Application | ZephorTech Careers",
  description:
    "Apply for an internship at ZephorTech and start building real-world products with our team.",
  openGraph: {
    title: "Internship Application | ZephorTech Careers",
    description: "Apply for an internship at ZephorTech and grow with a remote-first technology team.",
    type: "website",
    url: "https://zephortech.com/careers/apply",
  },
};

export default function CareerApplicationPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-20" style={{ background: "#0A0A0A" }}>
        <CareerApplicationForm />
      </main>
      <Footer />
    </>
  );
}


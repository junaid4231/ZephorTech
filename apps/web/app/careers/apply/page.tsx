import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { CareerApplicationForm } from "@/sections/careers/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Join Our Talent Network | ZephorTech Careers",
  description:
    "Submit your profile to join ZephorTech's talent network. We'll reach out when opportunities match your expertise.",
  openGraph: {
    title: "Join Our Talent Network | ZephorTech Careers",
    description: "Connect with us and be the first to know about career opportunities at ZephorTech.",
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


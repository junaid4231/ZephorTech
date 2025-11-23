import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { FAQSection } from "@/sections/faq/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | ZephorTech",
  description: "Answers to common questions about ZephorTech's process, pricing, AI capabilities, and delivery model.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <FAQSection />
      <Footer />
    </>
  );
}



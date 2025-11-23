import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { ContactHero } from "@/sections/contact/ContactHero";
import { ContactMethods } from "@/sections/contact/ContactMethods";
import { ContactForm } from "@/sections/contact/ContactForm";
import { ContactFAQ } from "@/sections/contact/ContactFAQ";
import { ContactCTA } from "@/sections/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us - Let's Build Something Extraordinary | ZephorTech",
  description:
    "Get in touch with ZephorTech's team of experts. We respond within 24 hours. Book a strategy call, request a quote, or discuss your next digital transformation project.",
  keywords: [
    "contact ZephorTech",
    "IT consulting contact",
    "software development inquiry",
    "project quote",
    "strategy call",
    "technical consultation",
  ],
  openGraph: {
    title: "Contact Us - Let's Build Something Extraordinary | ZephorTech",
    description:
      "Get in touch with ZephorTech's team of experts. We respond within 24 hours.",
    type: "website",
    url: "https://zephortech.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactFAQ />
      <ContactCTA />
      <Footer />
    </>
  );
}


import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  CareersHero,
  BenefitsSection,
  CultureSection,
  CareersCTA,
} from "@/sections/careers";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | ZephorTech",
  description:
    "Join ZephorTech and help build the future of technology. We're hiring talented engineers, designers, and innovators across the globe. Remote-first culture with competitive benefits.",
  keywords: [
    "ZephorTech careers",
    "software engineer jobs",
    "remote tech jobs",
    "AI engineer jobs",
    "product designer jobs",
    "DevOps careers",
    "full-stack developer",
    "remote-first company",
  ],
  openGraph: {
    title: "Careers - Join Our Team | ZephorTech",
    description:
      "Join a team of innovators building cutting-edge digital products. Remote-first culture, competitive benefits, and meaningful work.",
    type: "website",
    url: "https://zephortech.com/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <CareersHero />
      <BenefitsSection />
      <CultureSection />
      <CareersCTA />
      <Footer />
    </>
  );
}


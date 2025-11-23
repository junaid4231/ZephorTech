import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import {
  AboutHero,
  AboutStory,
  AboutMission,
  AboutValues,
  AboutStats,
  AboutTeam,
  AboutCulture,
  AboutCTA,
} from "@/sections/about";

export const metadata: Metadata = {
  title: "About ZephorTech - Innovation, Excellence, Impact",
  description:
    "We're a team of world-class engineers, designers, and strategists building the future of digital experiences. 200+ clients, 15+ years of expertise, and a relentless drive for excellence.",
  keywords: [
    "about ZephorTech",
    "software development team",
    "technology experts",
    "digital transformation company",
    "IT consulting team",
    "engineering culture",
  ],
  openGraph: {
    title: "About ZephorTech - Innovation, Excellence, Impact",
    description:
      "Meet the team building the future of digital experiences. 200+ clients trust us with their most ambitious projects.",
    type: "website",
    url: "https://zephortech.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutCulture />
      <AboutCTA />
      <Footer />
    </>
  );
}


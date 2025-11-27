import type { Metadata } from "next";
import { Header, Footer, PageHero, HashScrollHandler } from "@/components";
import {
  AboutStory,
  AboutMission,
  AboutValues,
  AboutStats,
  AboutTeam,
  AboutCTA,
} from "@/sections/about";
import { OurProcess } from "@/sections";

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
      <HashScrollHandler />
      <Header />
      <PageHero
        title="We Build the Future of Technology"
        subtitle="Pioneering Digital Excellence Since 2010"
        description="A team of world-class engineers, designers, and strategists united by one mission: to transform ambitious ideas into exceptional digital experiences."
        stats={[
          { value: 15, suffix: "+", label: "Years of Excellence" },
          { value: 200, suffix: "+", label: "Happy Clients" },
          { value: 500, suffix: "+", label: "Projects Delivered" },
          { value: 50, suffix: "+", label: "Team Members" },
        ]}
        ctaText="Join Our Team"
        ctaHref="/careers"
        backgroundType="animation"
      />
      <AboutStory />
      <AboutStats />
      <AboutMission />
      <AboutValues />
      <OurProcess />
      <AboutTeam />
      <AboutCTA />
      <Footer />
    </>
  );
}

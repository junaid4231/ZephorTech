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
  title: "About ZephorTech - Our Story, Mission & Team",
  description:
    "We're a lean, expert team of engineers, designers, and strategists passionate about digital excellence. 70+ projects delivered across the MENA region and beyond.",
  keywords: [
    "about ZephorTech",
    "software development team",
    "technology experts",
    "digital transformation company",
    "IT consulting team",
    "engineering culture",
  ],
  openGraph: {
    title: "About ZephorTech - Our Story, Mission & Team",
    description:
      "Meet the team building exceptional digital products. 70+ projects delivered across fintech, e-commerce, healthcare, and more.",
    type: "website",
    url: "https://zephortech.com/about",
    images: [
      {
        url: "https://zephortech.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About ZephorTech",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <HashScrollHandler />
      <Header />
      <PageHero
        title="We Build the Software That Moves Business"
        subtitle="Building with Purpose Since 2020"
        description="A focused team of engineers, designers, and strategists united by one goal — to turn ambitious ideas into exceptional digital products."
        stats={[
          { value: 5, suffix: "+", label: "Years of Excellence" },
          { value: 40, suffix: "+", label: "Happy Clients" },
          { value: 70, suffix: "+", label: "Projects Delivered" },
          { value: 15, suffix: "+", label: "Years Combined Expertise" },
        ]}
        // Direct prospects to contact page for project inquiries
        ctaText="Start Your Project"
        ctaHref="/contact"
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

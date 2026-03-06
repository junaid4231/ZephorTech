import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZephorTech - IT Solutions & Digital Transformation",
    short_name: "ZephorTech",
    description:
      "Expert IT services including web & mobile development, AI agents, SaaS solutions, and digital transformation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0076D1",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["business", "productivity", "technology"],
    lang: "en",
  };
}

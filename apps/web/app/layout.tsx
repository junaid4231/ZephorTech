import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZephorTech - IT Solutions & Digital Transformation",
    template: "%s | ZephorTech",
  },
  description:
    "ZephorTech offers cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
  keywords: [
    "IT services",
    "web development",
    "mobile apps",
    "AI agents",
    "SaaS",
    "e-commerce",
    "digital transformation",
  ],
  authors: [{ name: "ZephorTech" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zephortech.com",
    title: "ZephorTech - IT Solutions & Digital Transformation",
    description:
      "ZephorTech offers cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
    siteName: "ZephorTech",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZephorTech - IT Solutions & Digital Transformation",
    description:
      "ZephorTech offers cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter antialiased bg-background text-text-dark">{children}</body>
    </html>
  );
}


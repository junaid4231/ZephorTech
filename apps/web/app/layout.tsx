import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0076D1",
};

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
    "cloud computing",
    "DevOps",
  ],
  authors: [{ name: "ZephorTech" }],
  creator: "ZephorTech",
  publisher: "ZephorTech",
  metadataBase: new URL("https://zephortech.com"),
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="font-inter antialiased bg-background text-text-dark min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}


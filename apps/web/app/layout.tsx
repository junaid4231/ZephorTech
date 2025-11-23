import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="font-inter antialiased bg-background text-text-dark min-h-screen flex flex-col" style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:rounded-lg focus:font-semibold focus:text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
            boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
          }}
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}


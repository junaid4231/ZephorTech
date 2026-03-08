import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics, SplashScreen } from "@/components";

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
    apple: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zephortech.com",
    title: "ZephorTech - IT Solutions & Digital Transformation",
    description:
      "ZephorTech offers cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
    siteName: "ZephorTech",
    images: [
      {
        url: "https://zephortech.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ZephorTech - IT Solutions & Digital Transformation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZephorTech - IT Solutions & Digital Transformation",
    description:
      "ZephorTech offers cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
    images: ["https://zephortech.com/opengraph-image"],
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
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-inter bg-dark flex min-h-screen flex-col text-white antialiased"
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
        }}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only transition-all focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:px-6 focus:py-3 focus:font-semibold focus:text-white"
          style={{
            background: "linear-gradient(135deg, #004E8F 0%, #0076D1 100%)",
            boxShadow: "0 4px 16px rgba(0, 118, 209, 0.4)",
          }}
        >
          Skip to main content
        </a>
        <SplashScreen />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}

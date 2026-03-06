import type { Metadata } from "next";

// This page is a targeted outreach landing page — not a public SEO page.
// noindex + nofollow keeps it out of Google entirely.
export const metadata: Metadata = {
  title: "ZephorTech — Software Engineering for Philippine Businesses",
  description:
    "Senior engineers. Fixed-scope delivery. Timezone-aligned with Manila. ZephorTech builds web platforms, SaaS, e-commerce, and AI automation for Philippine businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PhilippinesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

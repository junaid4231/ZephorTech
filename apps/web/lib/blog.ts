export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string | null;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
}

export interface BlogImpactStat {
  label: string;
  value: string;
  description?: string | null;
}

export interface BlogContentSection {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  bullets?: string[] | null;
  layout?: "text-left" | "text-right" | "full" | null;
  highlight?: string | null;
  mediaUrl?: string | null;
  mediaCaption?: string | null;
}

export interface BlogQuote {
  quote: string;
  attribution?: string | null;
  title?: string | null;
}

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  heroKicker?: string | null;
  heroDescription?: string | null;
  readingTime?: number | null;
  featured?: boolean;
  tags: string[];
  keyTakeaways: string[];
  publishedAt?: string | null;
  heroVideoUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ctaLabel?: string | null;
  ctaLink?: string | null;
  author: BlogAuthor | null;
}

export interface BlogPost extends BlogListItem {
  content: string;
  contentSections: BlogContentSection[];
  pullQuote?: BlogQuote | null;
  impactStats: BlogImpactStat[];
  relatedPosts: BlogListItem[];
}



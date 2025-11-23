import type {
  GetAllBlogPostsQuery,
  GetBlogPostBySlugQuery,
  GetFeaturedBlogPostsQuery,
} from "./generated/operations";
import type {
  BlogAuthor,
  BlogContentSection,
  BlogImpactStat,
  BlogListItem,
  BlogPost,
} from "../blog";

type BlogNode =
  | GetAllBlogPostsQuery["blogPosts"][number]
  | GetFeaturedBlogPostsQuery["blogPosts"][number]
  | GetBlogPostBySlugQuery["blogPosts"][number];

function buildMediaUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  return `${cmsUrl}${url}`;
}

function transformAuthor(
  author:
    | GetAllBlogPostsQuery["blogPosts"][number]["author"]
    | GetFeaturedBlogPostsQuery["blogPosts"][number]["author"]
    | GetBlogPostBySlugQuery["blogPosts"][number]["author"]
): BlogAuthor | null {
  if (!author) return null;

  const castAuthor = author as Record<string, any>;
  return {
    id: castAuthor.documentId,
    name: castAuthor.name,
    slug: castAuthor.slug,
    role: castAuthor.role,
    bio: castAuthor.bio ?? null,
    avatarUrl: castAuthor.avatar?.url ? buildMediaUrl(castAuthor.avatar.url) : undefined,
    linkedinUrl: castAuthor.linkedinUrl ?? undefined,
    twitterUrl: castAuthor.twitterUrl ?? undefined,
    websiteUrl: castAuthor.websiteUrl ?? undefined,
  };
}

function normalizeBullets(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  return [];
}

function normalizeSections(sections: any[] | null | undefined): BlogContentSection[] {
  if (!sections || sections.length === 0) return [];
  return sections.map((section) => ({
    eyebrow: section?.eyebrow ?? null,
    title: section?.title ?? null,
    description: section?.description ?? null,
    bullets: normalizeBullets(section?.bullets),
    layout: section?.layout ?? "full",
    highlight: section?.highlight ?? null,
    mediaUrl: section?.mediaUrl ? buildMediaUrl(section.mediaUrl) : null,
    mediaCaption: section?.mediaCaption ?? null,
  }));
}

function normalizeImpactStats(stats: any[] | null | undefined): BlogImpactStat[] {
  if (!stats || stats.length === 0) return [];
  return stats
    .filter((stat) => stat?.label && stat?.value)
    .map((stat) => ({
      label: stat.label,
      value: stat.value,
      description: stat.description ?? null,
    }));
}

function toBlogListItem(node: BlogNode): BlogListItem | null {
  if (!node) return null;
  const post = node as Record<string, any>;

  return {
    id: post.documentId,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    heroKicker: post.heroKicker ?? null,
    heroDescription: post.heroDescription ?? null,
    readingTime: post.readingTime ?? null,
    featured: post.featured ?? false,
    tags: Array.isArray(post.tags) ? (post.tags as string[]) : [],
    keyTakeaways: Array.isArray(post.keyTakeaways) ? (post.keyTakeaways as string[]) : [],
    publishedAt: post.publishedAt ?? null,
    heroVideoUrl: post.heroVideoUrl ?? null,
    seoTitle: post.seoTitle ?? null,
    seoDescription: post.seoDescription ?? null,
    ctaLabel: post.ctaLabel ?? null,
    ctaLink: post.ctaLink ?? null,
    author: transformAuthor(post.author),
  };
}

export function transformBlogPostListItem(
  post:
    | GetAllBlogPostsQuery["blogPosts"][number]
    | GetFeaturedBlogPostsQuery["blogPosts"][number]
): BlogListItem | null {
  return toBlogListItem(post);
}

export function transformBlogPostDetail(
  post: GetBlogPostBySlugQuery["blogPosts"][number]
): BlogPost | null {
  const base = toBlogListItem(post);
  if (!base) return null;

  const related = (post.relatedPosts || []).map((relatedPost) => {
    if (!relatedPost) return null;
    return toBlogListItem(relatedPost);
  });

  return {
    ...base,
    content: post.content ?? "",
    contentSections: normalizeSections(post.contentSections ?? []),
    pullQuote: post.pullQuote
      ? {
          quote: post.pullQuote.quote,
          attribution: post.pullQuote.attribution ?? null,
          title: post.pullQuote.title ?? null,
        }
      : null,
    impactStats: normalizeImpactStats(post.impactStats ?? []),
    relatedPosts: related.filter((item): item is BlogListItem => item !== null),
  };
}



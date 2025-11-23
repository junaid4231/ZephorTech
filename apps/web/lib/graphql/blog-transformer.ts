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

type BlogListItemNode =
  | GetAllBlogPostsQuery["blogPosts"][number]
  | GetFeaturedBlogPostsQuery["blogPosts"][number];

type AuthorType =
  | NonNullable<GetAllBlogPostsQuery["blogPosts"][number]>["author"]
  | NonNullable<GetFeaturedBlogPostsQuery["blogPosts"][number]>["author"]
  | NonNullable<GetBlogPostBySlugQuery["blogPosts"][number]>["author"];

function buildMediaUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  return `${cmsUrl}${url}`;
}

function transformAuthor(
  author: AuthorType | null | undefined
): BlogAuthor | null {
  if (!author) return null;

  const castAuthor = author as Record<string, any>;
  return {
    id: castAuthor.documentId,
    name: castAuthor.name,
    slug: castAuthor.slug ?? "",
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

function toBlogListItem(node: BlogListItemNode | null): BlogListItem | null {
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
    author: transformAuthor(post.author as AuthorType | null | undefined),
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
  post: GetBlogPostBySlugQuery["blogPosts"][number] | null
): BlogPost | null {
  if (!post) return null;
  
  // Create base list item manually since post has additional fields
  const postData = post as Record<string, any>;
  const base: BlogListItem = {
    id: postData.documentId,
    slug: postData.slug,
    title: postData.title,
    excerpt: postData.excerpt,
    heroKicker: postData.heroKicker ?? null,
    heroDescription: postData.heroDescription ?? null,
    readingTime: postData.readingTime ?? null,
    featured: postData.featured ?? false,
    tags: Array.isArray(postData.tags) ? (postData.tags as string[]) : [],
    keyTakeaways: Array.isArray(postData.keyTakeaways) ? (postData.keyTakeaways as string[]) : [],
    publishedAt: postData.publishedAt ?? null,
    heroVideoUrl: postData.heroVideoUrl ?? null,
    seoTitle: postData.seoTitle ?? null,
    seoDescription: postData.seoDescription ?? null,
    ctaLabel: postData.ctaLabel ?? null,
    ctaLink: postData.ctaLink ?? null,
    author: transformAuthor(postData.author as AuthorType | null | undefined),
  };

  // Transform related posts - they are simpler list items without content/relatedPosts
  const related = (post.relatedPosts || []).map((relatedPost) => {
    if (!relatedPost) return null;
    const relatedData = relatedPost as Record<string, any>;
    return {
      id: relatedData.documentId,
      slug: relatedData.slug,
      title: relatedData.title,
      excerpt: relatedData.excerpt,
      heroKicker: relatedData.heroKicker ?? null,
      heroDescription: null,
      readingTime: relatedData.readingTime ?? null,
      featured: false,
      tags: Array.isArray(relatedData.tags) ? (relatedData.tags as string[]) : [],
      keyTakeaways: Array.isArray(relatedData.keyTakeaways) ? (relatedData.keyTakeaways as string[]) : [],
      publishedAt: null,
      heroVideoUrl: null,
      seoTitle: null,
      seoDescription: null,
      ctaLabel: null,
      ctaLink: null,
      author: transformAuthor(relatedData.author as AuthorType | null | undefined),
    } as BlogListItem;
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



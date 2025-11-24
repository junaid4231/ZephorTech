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

type BlogPostDetailNode = NonNullable<GetBlogPostBySlugQuery["blogPosts"][number]>;

type ContentSectionNode = NonNullable<
  NonNullable<BlogPostDetailNode["contentSections"]>[number]
>;

type ImpactStatNode = NonNullable<
  NonNullable<BlogPostDetailNode["impactStats"]>[number]
>;

function hasAvatar(
  author: AuthorType
): author is AuthorType & { avatar: { url?: string | null } | null } {
  return "avatar" in author;
}

function buildMediaUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  return `${cmsUrl}${url}`;
}

function transformAuthor(author: AuthorType | null | undefined): BlogAuthor | null {
  if (!author) return null;

  return {
    id: author.documentId,
    name: author.name,
    slug: author.slug ?? "",
    role: author.role,
    bio: author.bio ?? null,
    avatarUrl: hasAvatar(author) && author.avatar?.url ? buildMediaUrl(author.avatar.url) : undefined,
    linkedinUrl: author.linkedinUrl ?? undefined,
    twitterUrl: author.twitterUrl ?? undefined,
    websiteUrl: author.websiteUrl ?? undefined,
  };
}

function normalizeBullets(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  return [];
}

function normalizeSections(
  sections: Array<ContentSectionNode | null> | null | undefined
): BlogContentSection[] {
  if (!sections || sections.length === 0) return [];
  return sections.map((section) => ({
    eyebrow: section?.eyebrow ?? null,
    title: section?.title ?? null,
    description: section?.description ?? null,
    bullets: normalizeBullets(section?.bullets ?? []),
    layout:
      section?.layout === "text_left"
        ? "text-left"
        : section?.layout === "text_right"
          ? "text-right"
          : "full",
    highlight: section?.highlight ?? null,
    mediaUrl: section?.mediaUrl ? buildMediaUrl(section.mediaUrl) : null,
    mediaCaption: section?.mediaCaption ?? null,
  }));
}

function normalizeImpactStats(
  stats: Array<ImpactStatNode | null> | null | undefined
): BlogImpactStat[] {
  if (!stats || stats.length === 0) return [];
  return stats
    .filter((stat): stat is ImpactStatNode => Boolean(stat?.label && stat?.value))
    .map((stat) => ({
      label: stat.label ?? "",
      value: stat.value ?? "",
      description: stat.description ?? null,
    }));
}

function normalizeJsonStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function toBlogListItem(node: BlogListItemNode | null): BlogListItem | null {
  if (!node) return null;
  return {
    id: node.documentId,
    slug: node.slug,
    title: node.title,
    excerpt: node.excerpt,
    heroKicker: node.heroKicker ?? null,
    heroDescription: node.heroDescription ?? null,
    readingTime: node.readingTime ?? null,
    featured: node.featured ?? false,
    tags: normalizeJsonStringArray(node.tags ?? []),
    keyTakeaways: normalizeJsonStringArray(node.keyTakeaways ?? []),
    publishedAt: node.publishedAt ?? null,
    heroVideoUrl: node.heroVideoUrl ?? null,
    seoTitle: node.seoTitle ?? null,
    seoDescription: node.seoDescription ?? null,
    ctaLabel: node.ctaLabel ?? null,
    ctaLink: node.ctaLink ?? null,
    author: transformAuthor(node.author as AuthorType | null | undefined),
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
  const base: BlogListItem = {
    id: post.documentId,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    heroKicker: post.heroKicker ?? null,
    heroDescription: post.heroDescription ?? null,
    readingTime: post.readingTime ?? null,
    featured: post.featured ?? false,
    tags: normalizeJsonStringArray(post.tags ?? []),
    keyTakeaways: normalizeJsonStringArray(post.keyTakeaways ?? []),
    publishedAt: post.publishedAt ?? null,
    heroVideoUrl: post.heroVideoUrl ?? null,
    seoTitle: post.seoTitle ?? null,
    seoDescription: post.seoDescription ?? null,
    ctaLabel: post.ctaLabel ?? null,
    ctaLink: post.ctaLink ?? null,
    author: transformAuthor(post.author as AuthorType | null | undefined),
  };

  // Transform related posts - they are simpler list items without content/relatedPosts
  const related = (post.relatedPosts || []).map((relatedPost) => {
    if (!relatedPost) return null;
    return {
      id: relatedPost.documentId,
      slug: relatedPost.slug,
      title: relatedPost.title,
      excerpt: relatedPost.excerpt,
      heroKicker: relatedPost.heroKicker ?? null,
      heroDescription: null,
      readingTime: relatedPost.readingTime ?? null,
      featured: false,
      tags: normalizeJsonStringArray(relatedPost.tags ?? []),
      keyTakeaways: normalizeJsonStringArray(relatedPost.keyTakeaways ?? []),
      publishedAt: null,
      heroVideoUrl: null,
      seoTitle: null,
      seoDescription: null,
      ctaLabel: null,
      ctaLink: null,
      author: transformAuthor(relatedPost.author as AuthorType | null | undefined),
    } as BlogListItem;
  });

  return {
    ...base,
    content: post.content ?? "",
    contentSections: normalizeSections(post.contentSections ?? null),
    pullQuote: post.pullQuote
      ? {
          quote: post.pullQuote.quote,
          attribution: post.pullQuote.attribution ?? null,
          title: post.pullQuote.title ?? null,
        }
      : null,
    impactStats: normalizeImpactStats(post.impactStats ?? null),
    relatedPosts: related.filter((item): item is BlogListItem => item !== null),
  };
}



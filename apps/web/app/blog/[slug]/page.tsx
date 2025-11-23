import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components";
import { InquirySection } from "@/sections";
import { BlogDetailHero, BlogContent, BlogPostGrid } from "@/sections/blog";
import {
  getAllBlogPostsCached,
  getBlogPostBySlugCached,
  getFeaturedBlogPostsCached,
} from "@/lib/blog-cms";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPostsCached();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPostBySlugCached(params.slug);
  if (!post) {
    return {
      title: "Insight not found — ZephorTech",
    };
  }

  return {
    title: `${post.title} | ZephorTech Insights`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: `https://zephortech.com/blog/${post.slug}`,
      authors: post.author ? [post.author.name] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const post = await getBlogPostBySlugCached(params.slug);
  if (!post) {
    notFound();
  }

  const fallbackRelated = await getFeaturedBlogPostsCached(3);
  const related = post.relatedPosts.length > 0 ? post.relatedPosts : fallbackRelated.filter((item) => item.slug !== post.slug);

  return (
    <>
      <Header />
      <BlogDetailHero post={post} />
      <BlogContent post={post} />
      {related.length > 0 && (
        <BlogPostGrid
          posts={related}
          enableFilters={false}
          title="Related plays"
          description="Dive deeper into adjacent architectures, AI ops, and growth moves."
          emptyState="More related articles shipping soon."
        />
      )}
      <InquirySection />
      <Footer />
    </>
  );
}



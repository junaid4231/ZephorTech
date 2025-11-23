import type {
  GetAllTestimonialsQuery,
  GetFeaturedTestimonialsQuery,
} from "./generated/operations";

export interface AppTestimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  featured: boolean;
  order: number;
  avatarUrl?: string;
  companyLogoUrl?: string;
  initials: string;
}

function buildMediaUrl(url?: string | null) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
  return `${cmsUrl}${url}`;
}

function generateInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function transformGraphQLTestimonial(
  testimonial:
    | GetAllTestimonialsQuery["testimonials"][number]
    | GetFeaturedTestimonialsQuery["testimonials"][number]
): AppTestimonial | null {
  if (!testimonial) return null;

  return {
    id: testimonial.documentId,
    clientName: testimonial.clientName,
    role: testimonial.role,
    company: testimonial.company,
    quote: testimonial.quote,
    rating: testimonial.rating ?? 5,
    featured: testimonial.featured ?? false,
    order: testimonial.order ?? 0,
    avatarUrl: buildMediaUrl(testimonial.avatar?.url),
    companyLogoUrl: buildMediaUrl(testimonial.companyLogo?.url),
    initials: generateInitials(testimonial.clientName),
  };
}


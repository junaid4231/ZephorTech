/**
 * Application-wide constants
 */

export const SITE_CONFIG = {
  name: "ZephorTech",
  description:
    "Cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
  url: "https://zephortech.com",
  email: "info@zephortech.com",
  phone: "+971521257034",
  address: "Dubai, United Arab Emirates",
} as const;

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/zephortech",
  linkedin: "https://linkedin.com/company/zephortech",
  github: "https://github.com/zephortech",
  facebook: "https://facebook.com/zephortech",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  caseStudies: "/case-studies",
  blog: "/blog",
  contact: "/contact",
  careers: "/careers",
  faq: "/faq",
} as const;

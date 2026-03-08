/**
 * Site Configuration
 */

export const siteConfig = {
  name: "ZephorTech",
  description:
    "Cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
  url: "https://zephortech.com",
  email: "info@zephortech.com",
  phone: "+971521257034",
  address: "Dubai, United Arab Emirates",
  social: {
    linkedin: "https://www.linkedin.com/company/zephortech",
    instagram: "https://www.instagram.com/zephortech",
    facebook: "https://www.facebook.com/profile.php?id=61585394263054",
  },
  company: {
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  services: {
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "SaaS Solutions", href: "/services/saas" },
      { label: "E-commerce", href: "/services/ecommerce" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    ],
  },
} as const;

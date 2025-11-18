/**
 * Site Configuration
 */

export const siteConfig = {
  name: "ZephorTech",
  description:
    "Cutting-edge IT services including web & mobile development, AI agents, SaaS solutions, e-commerce, and digital transformation.",
  url: "https://zephortech.com",
  email: "info@zephortech.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, Innovation City, IC 12345",
  social: {
    twitter: "https://twitter.com/zephortech",
    linkedin: "https://linkedin.com/company/zephortech",
    github: "https://github.com/zephortech",
    facebook: "https://facebook.com/zephortech",
  },
  company: {
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
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


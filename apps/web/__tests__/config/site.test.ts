import { describe, expect, it } from "@jest/globals";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/lib/services";

describe("siteConfig.services.links", () => {
  it("only references service slugs that exist", () => {
    const availableSlugs = new Set(servicesData.map((service) => service.slug));
    const missing = siteConfig.services.links
      .map((link) => link.href.replace("/services/", ""))
      .filter((slug) => !availableSlugs.has(slug));

    expect(missing).toEqual([]);
  });
});



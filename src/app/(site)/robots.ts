import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { BUSINESS, SERVICES, PROJECTS, ARTICLES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/insights",
    "/contact",
    "/3d-designing",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const articleRoutes = ARTICLES.map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...articleRoutes];
}

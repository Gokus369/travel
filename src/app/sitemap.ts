import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { packages } from "@/data/packages";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/packages",
    "/guides",
    "/hotels",
    "/about",
    "/contact",
    ...packages.map((p) => `/packages/${p.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
  ];
  return routes.map((route) => ({ url: `${site.url}${route}/` }));
}

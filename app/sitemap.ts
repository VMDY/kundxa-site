import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return [
    { url: site.url, lastModified: maj, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/mentions-legales`,
      lastModified: maj,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/confidentialite`,
      lastModified: maj,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

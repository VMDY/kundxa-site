import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const pages: { chemin: string; priorite: number; frequence: "monthly" | "yearly" }[] = [
  { chemin: "", priorite: 1, frequence: "monthly" },
  { chemin: "/realisations", priorite: 0.9, frequence: "monthly" },
  { chemin: "/methode", priorite: 0.8, frequence: "monthly" },
  { chemin: "/offres", priorite: 0.8, frequence: "monthly" },
  { chemin: "/a-propos", priorite: 0.7, frequence: "monthly" },
  { chemin: "/contact", priorite: 0.8, frequence: "monthly" },
  { chemin: "/mentions-legales", priorite: 0.3, frequence: "yearly" },
  { chemin: "/confidentialite", priorite: 0.3, frequence: "yearly" },
  { chemin: "/conditions-utilisation", priorite: 0.3, frequence: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();
  return pages.map(({ chemin, priorite, frequence }) => ({
    url: `${site.url}${chemin}`,
    lastModified: maj,
    changeFrequency: frequence,
    priority: priorite,
  }));
}

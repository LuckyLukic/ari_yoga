// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // aggiorneremo al deploy
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/catalogo`, lastModified: new Date() },
    { url: `${base}/playlist`, lastModified: new Date() },
  ];
}

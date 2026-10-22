import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/whatsapp", "/agendar/recebido", "/admin"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

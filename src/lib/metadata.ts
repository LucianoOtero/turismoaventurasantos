import type { Metadata } from "next";
import { site } from "@/content/site";

// O Next substitui o bloco `openGraph` inteiro quando a página define o seu;
// por isso cada página monta o bloco completo a partir daqui.
export const og = (url: string): NonNullable<Metadata["openGraph"]> => ({
  type: "website",
  locale: "pt_BR",
  siteName: site.name,
  url,
  images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
});

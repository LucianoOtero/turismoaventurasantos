import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Consentimento } from "@/components/consentimento";
import { ALLOW_INDEXING, SITE_URL, site } from "@/content/site";
import { og } from "@/lib/metadata";
import "./globals.css";

// Tipografia TAS: display com caráter (aventura) + corpo geométrico legível.
const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const fontText = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.tagline} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    ...og("/"),
    title: `${site.tagline} | ${site.name}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f4c81",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontText.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
        <Consentimento />
      </body>
    </html>
  );
}

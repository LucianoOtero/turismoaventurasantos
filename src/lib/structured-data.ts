import { SITE_URL, site } from "@/content/site";

// Gerado dos mesmos dados que a página exibe. Sem aggregateRating: o Google
// não exibe estrelas para avaliações que o próprio negócio controla.
export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#negocio`,
  name: site.name,
  description: site.description,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: site.contact.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
  ],
  priceRange: "R$ 400 - R$ 650",
});

export const serviceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Voo duplo de parapente",
  serviceType: "Voo de parapente",
  provider: { "@id": `${SITE_URL}/#negocio` },
  areaServed: [
    { "@type": "City", name: "Santos" },
    { "@type": "City", name: "São Vicente" },
  ],
  offers: site.packages.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: p.price,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/precos`,
  })),
});

export const breadcrumbJsonLd = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: site.name, item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

// Recomendação da documentação do Next.js: escapar "<" para evitar injeção.
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

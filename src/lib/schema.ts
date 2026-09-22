const SITE = "https://resttech33.lovable.app";

export const ORG = {
  "@type": "Organization",
  name: "Rest-Tech",
  url: SITE,
  telephone: "+7 916 603-40-63",
  email: "info@rest-tech.pro",
  areaServed: "RU",
  address: { "@type": "PostalAddress", addressLocality: "Москва", addressCountry: "RU" },
};

export function service(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: { name: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${SITE}${opts.path}`,
    provider: ORG,
    areaServed: { "@type": "Country", name: "Россия" },
    audience: { "@type": "BusinessAudience", name: "Рестораны, кафе, столовые, сети HoReCa" },
    ...(opts.offers
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o.name, ...(o.description ? { description: o.description } : {}) },
            })),
          },
        }
      : {}),
  };
}

export function faq(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function howTo(opts: { name: string; description: string; steps: { title: string; desc: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };
}

export function itemList(name: string, items: { name: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: it.name, description: it.description, provider: ORG },
    })),
  };
}

export { SITE };

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqPageSchema(
  items: { question: string; answerText: string }[],
  pageUrl?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pageUrl ? { url: pageUrl } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answerText,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.url ? { url: opts.url } : {}),
    step: opts.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** Lärinsikt-ekosystem — sameAs (gemensam knowledge graph). */
export const ECOSYSTEM_SAME_AS = [
  'https://larinsikt.se',
  'https://npmonstret.se',
  'https://npmonstret.se/npcoachen',
  'https://npmonstret.se/antagningskoll',
  'https://npmonstret.se/for-agents',
  'https://npguide.se',
  'https://npprov.se',
  'https://xn--prvning-b1a.se',
] as const;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prövning.se',
    url: 'https://xn--prvning-b1a.se',
    description:
      'Oberoende vägledning och matteövning inför prövning för vuxna. Inte Skolverket; tar inte emot anmälan.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Lärinsikt AB',
      url: 'https://larinsikt.se',
    },
    sameAs: [...ECOSYSTEM_SAME_AS],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prövning.se',
    url: 'https://xn--prvning-b1a.se',
    description:
      'Gratis vägledning och övning inför prövning i matematik. För vuxna som vill höja gymnasiebetyg.',
    inLanguage: 'sv-SE',
    publisher: organizationSchema(),
    sameAs: [...ECOSYSTEM_SAME_AS],
  };
}

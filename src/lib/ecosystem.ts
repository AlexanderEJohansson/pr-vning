/** Kanoniska länkar i Lärinsikt-ekosystemet.
 * UTM-standard (Fas 0): utm_source=provning&utm_medium=ecosystem&utm_campaign={page}
 * Använd withEcosystemUtm() när länken renderas från en specifik sida.
 */

const UTM_SOURCE = 'provning';
const UTM_MEDIUM = 'ecosystem';

export function withEcosystemUtm(href: string, campaign: string): string {
  try {
    const u = new URL(href);
    u.searchParams.set('utm_source', UTM_SOURCE);
    u.searchParams.set('utm_medium', UTM_MEDIUM);
    u.searchParams.set('utm_campaign', campaign);
    return u.toString();
  } catch {
    const sep = href.includes('?') ? '&' : '?';
    return `${href}${sep}utm_source=${UTM_SOURCE}&utm_medium=${UTM_MEDIUM}&utm_campaign=${encodeURIComponent(campaign)}`;
  }
}

export const ECOSYSTEM = {
  antagningskoll: {
    href: 'https://npmonstret.se/antagningskoll',
    label: 'NP-Monstrets antagningskoll',
    short: 'Antagningskoll',
    description: 'Se vad som brukar krävas för olika utbildningar innan du väljer kurs att pröva.',
  },
  npmonstret: {
    href: 'https://npmonstret.se',
    label: 'NP-Monstret',
    short: 'NP-Monstret',
    description: 'Träna mer — fler ämnen, komvux och nationella prov.',
  },
  npcoachen: {
    href: 'https://npmonstret.se/npcoachen',
    label: 'NPcoachen',
    short: 'NPcoachen',
    description: 'Personlig träningsloop utifrån dina luckor och betygsmål.',
  },
  pris: {
    href: 'https://npmonstret.se/pris',
    label: 'Priser på NP-Monstret',
    short: 'Priser',
    description: 'Vecka 19 kr, Bas 49 kr/mån, Premium 99 kr/mån.',
  },
  komvux: {
    href: 'https://npmonstret.se/komvux',
    label: 'Komvux-träning på NP-Monstret',
    short: 'Komvux på NP-Monstret',
    description: 'Övning anpassad för komvux i matte, svenska och engelska.',
  },
  npguide: {
    href: 'https://npguide.se',
    label: 'NP-guide',
    short: 'NP-guide',
    description: 'Regler, skolpersonal och forskning om nationella prov.',
  },
  npguideFaq: {
    href: 'https://npguide.se/faq',
    label: 'FAQ på NP-guide',
    short: 'NP-guide FAQ',
    description: 'Svar om nationella prov och regler.',
  },
  npguideForskning: {
    href: 'https://npguide.se/forskning',
    label: 'Forskning på NP-guide',
    short: 'Forskning',
    description: 'Forskningsbaserade artiklar om prov, betyg och likvärdighet.',
  },
  npprov: {
    href: 'https://npprov.se',
    label: 'npprov.se',
    short: 'npprov.se',
    description: 'Arkiv och proveniens för nationella prov.',
  },
  skolverketProvning: {
    href: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
    label: 'Skolverket: Prövning för betyg',
    short: 'Skolverket',
    description: 'Officiella regler om prövning.',
  },
} as const;

export type EcosystemKey = keyof typeof ECOSYSTEM;

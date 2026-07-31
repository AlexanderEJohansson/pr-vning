/**
 * Verifierade källor för prövning.se — myndighet först, sedan praktik.
 * Används av /kallor, sidfot, SourceList och FAQ-svar.
 */

export type SourceKind = 'myndighet' | 'lag' | 'kommun' | 'ekosystem' | 'stod';

export interface Source {
  id: string;
  title: string;
  url: string;
  kind: SourceKind;
  note: string;
}

export const SOURCES: Source[] = [
  {
    id: 'skolverket-provning',
    title: 'Skolverket: Prövning för betyg',
    url: 'https://www.skolverket.se/styrning-och-ansvar/regler-och-ansvar/ansvar-i-skolfragor/provning-for-betyg',
    kind: 'myndighet',
    note: 'Primär källa för vad prövning innebär, rättigheter i gymnasiet och komvux, samt övergångsbestämmelser.',
  },
  {
    id: 'skolverket-allmanna-rad',
    title: 'Skolverket: Betyg och prövning (allmänna råd och kommentarer)',
    url: 'https://www.skolverket.se/sok-publikationer/publikationsserier/allmanna-rad/2025/betyg-och-provning----kommentarer-till-skolverkets-allmanna-rad-om-betyg-och-provning',
    kind: 'myndighet',
    note: 'Stöd för hur prövning bör utformas och vad som ska kommuniceras till den prövande.',
  },
  {
    id: 'skollagen',
    title: 'Skollagen (2010:800) — prövning m.m.',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/skollag-2010800_sfs-2010-800/',
    kind: 'lag',
    note: 'Rättslig grund. Skolverket sammanfattar tillämpliga kapitel på sin prövningssida.',
  },
  {
    id: 'gy25',
    title: 'Skolverket: Gy25 och ämnesbetyg',
    url: 'https://www.skolverket.se/styrning-och-ansvar/forandringar-inom-skolomradet/gy25----amnesbetyg-pa-gymnasial-niva',
    kind: 'myndighet',
    note: 'Ny läroplan från 1 juli 2025. Påverkar hur kurser/nivåer och prövning beskrivs.',
  },
  {
    id: 'stockholm',
    title: 'Stockholm: Prövning i ämnen på gymnasial nivå (komvux)',
    url: 'https://vuxenutbildning.stockholm/gymnasial-komvux/provning-i-amnen-pa-gymnasieniva/',
    kind: 'kommun',
    note: 'Exempel på hur en kommun beskriver anmälan och prövning. Lokal rutin kan ändras.',
  },
  {
    id: 'malmo',
    title: 'Malmö: Prövning — gymnasiala kurser',
    url: 'https://malmo.se/Komvux-Malmo/Om-Komvux-Malmo/Provning-komvux/Provning---gymnasiala-kurser.html',
    kind: 'kommun',
    note: 'Exempelkommun. Kontrollera alltid aktuell information på malmo.se.',
  },
  {
    id: 'uppsala',
    title: 'Uppsala: Prövning på komvux',
    url: 'https://www.uppsala.se/skola-forskola-och-komvux/komvux/studera-pa-komvux/provning/',
    kind: 'kommun',
    note: 'Exempelkommun. Anmälan och avgifter styrs lokalt.',
  },
  {
    id: 'goteborg',
    title: 'Göteborg: Vuxenutbildning / komvux',
    url: 'https://goteborg.se/wps/portal/start/forskola-och-utbildning/vuxenutbildning',
    kind: 'kommun',
    note: 'Ingång till kommunens vuxenutbildning. Sök vidare på prövning.',
  },
  {
    id: 'npmonstret',
    title: 'NP-Monstret — träning och antagningskoll',
    url: 'https://npmonstret.se',
    kind: 'ekosystem',
    note: 'Övning inför nationella prov och komvux. Antagningskoll för behörighet.',
  },
  {
    id: 'antagningskoll',
    title: 'NP-Monstret: Antagningskoll',
    url: 'https://npmonstret.se/antagningskoll',
    kind: 'ekosystem',
    note: 'Verktyg för att se vad som krävs för olika utbildningar.',
  },
  {
    id: 'npguide',
    title: 'NP-guide — regler, skolpersonal och forskning',
    url: 'https://npguide.se',
    kind: 'ekosystem',
    note: 'Auktoritativt material om nationella prov, rutiner och forskningsbaserade guider.',
  },
  {
    id: 'npprov',
    title: 'npprov.se — arkiv över nationella prov',
    url: 'https://npprov.se',
    kind: 'ekosystem',
    note: 'Proveniens och strukturerade NP-uppgifter. Komplement till prövningsövning.',
  },
];

export function sourcesByKind(kind: SourceKind): Source[] {
  return SOURCES.filter((s) => s.kind === kind);
}

export function sourceById(id: string): Source | undefined {
  return SOURCES.find((s) => s.id === id);
}

/** Kommun-exempel för anmälan-sidan */
export const KOMMUN_EXAMPLES = [
  {
    name: 'Stockholm',
    label: 'Prövning gymnasial nivå (komvux)',
    url: 'https://vuxenutbildning.stockholm/gymnasial-komvux/provning-i-amnen-pa-gymnasieniva/',
  },
  {
    name: 'Malmö',
    label: 'Prövning — gymnasiala kurser',
    url: 'https://malmo.se/Komvux-Malmo/Om-Komvux-Malmo/Provning-komvux/Provning---gymnasiala-kurser.html',
  },
  {
    name: 'Uppsala',
    label: 'Prövning på komvux',
    url: 'https://www.uppsala.se/skola-forskola-och-komvux/komvux/studera-pa-komvux/provning/',
  },
  {
    name: 'Göteborg',
    label: 'Vuxenutbildning (sök prövning)',
    url: 'https://goteborg.se/wps/portal/start/forskola-och-utbildning/vuxenutbildning',
  },
  {
    name: 'Linköping',
    label: 'Komvux Linköping',
    url: 'https://www.linkoping.se/skola-och-forskola/vuxenutbildning/',
  },
  {
    name: 'Västerås',
    label: 'Vuxenutbildning Västerås',
    url: 'https://www.vasteras.se/utbildning-och-barnomsorg/vuxenutbildning.html',
  },
] as const;

export const SOURCES_UPDATED = '2026-07';

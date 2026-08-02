import type { Metadata } from 'next';
import './globals.css';
import { JsonLd, organizationSchema, webSiteSchema } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--prvning-b1a.se'),
  title: {
    default:
      'Prövning.se — Vägledning för vuxna: prövning, anmälan via kommun & Matte 1–3',
    template: '%s | Prövning.se',
  },
  description:
    'För vuxna som vill höja gymnasiebetyg: förstå prövning, hur du anmäler dig via kommun eller skola (vi tar inte emot anmälan), och öva Matematik 1–3 gratis. Inte Skolverket.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prövning.se — Vägledning om prövning (inte anmälningsportal)',
    description:
      'Hur prövning funkar, anmälan via kommun/skola, FAQ och gratis Matematik 1–3. Vi tar inte emot anmälan. Regler: Skolverket.',
    locale: 'sv_SE',
    type: 'website',
    url: 'https://xn--prvning-b1a.se',
    siteName: 'Prövning.se',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="Instructions for AI agents (llms.txt)"
        />
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

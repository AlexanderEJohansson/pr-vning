import type { Metadata } from 'next';
import './globals.css';
import { JsonLd, organizationSchema, webSiteSchema } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://xn--prvning-b1a.se'),
  title: {
    default: 'Prövning.se — Höj gymnasiebetyg, anmäl dig och öva matte',
    template: '%s | Prövning.se',
  },
  description:
    'För vuxna som vill höja gymnasiebetyg: förstå prövning, anmäla dig via kommun eller gymnasium, kolla behörighet och öva Matematik 1–3 gratis.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Prövning.se — Höj gymnasiebetyg via prövning',
    description:
      'Anmälan, vanliga frågor och gratis övning i Matematik 1–3. Inte en myndighetssajt — officiella regler hos Skolverket.',
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

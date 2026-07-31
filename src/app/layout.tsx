import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'Prövning.se — Öva gratis inför prövning i matematik',
    template: '%s | Prövning.se',
  },
  description:
    'Gratis övning inför prövning i matematik på komvux. Matematik 1, 2 och 3. För dig som läser upp betyg inför högskolan.',
  openGraph: {
    title: 'Prövning.se — Öva gratis inför prövning i matematik',
    description:
      'Gratis övning inför prövning i matematik på komvux. Matematik 1a/1b/1c, 2a/2b/2c, 3b/3c.',
    locale: 'sv_SE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

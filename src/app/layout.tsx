import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prövning.se — Öva gratis inför prövning i matematik',
  description: 'Gratis övning inför prövning i matematik på komvux. Matematik 1, 2 och 3. Vuxenutbildning och högskolebehörighet.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}

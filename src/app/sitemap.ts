import type { MetadataRoute } from 'next';
import { MATH_LEVELS } from '@/lib/math-catalog';

const BASE = 'https://xn--prvning-b1a.se';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/hoja-betyg',
    '/anmalan',
    '/faq',
    '/kallor',
    '/om',
    '/kurser',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const courseRoutes = MATH_LEVELS.flatMap((level) => [
    {
      url: `${BASE}/kurser/${level.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/kurser/${level.slug}/ova`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...courseRoutes];
}

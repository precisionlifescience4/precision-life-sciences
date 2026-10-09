import { SITE_URL } from '@/lib/site';
import { INFECTIOUS_ASSAYS } from '@/lib/assays';
import { LAB_SERVICES } from '@/lib/labServices';

export default function sitemap() {
  const base = SITE_URL;
  const routes = [
    '',
    '/about',
    '/services',
    '/molecular-services',
    '/resources',
    '/contact',
    ...INFECTIOUS_ASSAYS.map((assay) => `/assays/${assay.slug}`),
    ...LAB_SERVICES.map((service) => `/molecular-services/${service.slug}`),
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : route.startsWith('/assays/') ? 0.9 : route.startsWith('/molecular-services/') ? 0.85 : 0.8,
  }));
}

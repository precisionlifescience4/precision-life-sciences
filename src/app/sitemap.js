import { SITE_URL } from '@/lib/site';

export default function sitemap() {
  const base = SITE_URL;
  const routes = ['', '/about', '/services', '/resources', '/contact'];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
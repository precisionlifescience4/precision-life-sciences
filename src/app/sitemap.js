export default function sitemap() {
  const base = 'https://precisionlifesciences.com.pk';
  const routes = ['', '/about', '/services', '/resources', '/contact'];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
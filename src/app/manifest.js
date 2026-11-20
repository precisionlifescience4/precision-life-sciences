export default function manifest() {
  return {
    name: 'Precision Life Sciences',
    short_name: 'PLS Pakistan',
    description: 'Mugen-Plex PCR assays and molecular biology research services from Peshawar, Pakistan.',
    start_url: '/',
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: '#00205B',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    categories: ['science', 'medical', 'business'],
    lang: 'en-PK',
    dir: 'ltr',
  };
}

export const siteConfig = {
  name: 'Kye Gomez',
  title: 'Kye Gomez | Founder of Swarms.ai | AI Researcher',
  description:
    'Kye Gomez is the founder of Swarms.ai and an open-source AI researcher focused on multi-agent systems, model architectures, and production AI infrastructure.',
  url: 'https://kyegomez.com',
  ogImage: '/og?title=Kye%20Gomez',
  xHandle: '@KyeGomezB',
  email: 'kye@swarms.world',
};

export function absoluteUrl(path = '') {
  if (!path) {
    return siteConfig.url;
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

import type { Metadata } from 'next';
import RepositoriesPageClient from './repositories-page-client';
import { absoluteUrl } from 'app/seo';

export const metadata: Metadata = {
  title: 'Repositories',
  description:
    'Explore Kye Gomez\'s open-source repositories in AI, multi-agent systems, and production infrastructure.',
  alternates: {
    canonical: '/repositories',
  },
  openGraph: {
    title: 'Kye Gomez Repositories',
    description:
      'Filter and explore public repositories focused on multi-agent AI systems and infrastructure.',
    url: absoluteUrl('/repositories'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kye Gomez Repositories',
    description:
      'Filter and explore public repositories focused on multi-agent AI systems and infrastructure.',
  },
};

export default function RepositoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kye Gomez Repository Index',
            description:
              'Filterable index of public repositories focused on multi-agent systems and AI infrastructure.',
            url: absoluteUrl('/repositories'),
            isPartOf: {
              '@type': 'WebSite',
              name: 'Kye Gomez',
              url: absoluteUrl('/'),
            },
          }),
        }}
      />
      <RepositoriesPageClient />
    </>
  );
}

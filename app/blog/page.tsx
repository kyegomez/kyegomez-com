import type { Metadata } from 'next';
import { BlogPosts } from 'app/components/posts';
import { absoluteUrl } from 'app/seo';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on AI, systems, economics, and engineering.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Kye Gomez Blog',
    description: 'Essays, research notes, and practical engineering perspectives.',
    url: absoluteUrl('/blog'),
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="page-wrap">
      <section className="page-block">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Kye Gomez Blog',
              description: 'Essays, research notes, and practical engineering perspectives.',
              url: absoluteUrl('/blog'),
              inLanguage: 'en-US',
              author: {
                '@type': 'Person',
                name: 'Kye Gomez',
              },
            }),
          }}
        />
        <span className="section-kicker">Writing</span>
        <h1 className="page-title">Blog archive</h1>
        <p className="page-subtitle">Essays, research notes, and practical engineering perspectives.</p>
      </section>

      <section className="page-block" style={{ marginTop: '0.9rem' }}>
        <BlogPosts />
      </section>
    </div>
  );
}

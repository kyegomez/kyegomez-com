import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './seo';

export const metadata: Metadata = {
  title: 'Kye Gomez | AI Researcher and Founder of Swarms.ai',
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <div className="page-wrap">
      <section className="page-block">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Kye Gomez',
              description: siteConfig.description,
              url: absoluteUrl('/'),
              about: ['AI', 'Multi-agent systems', 'Open-source software'],
            }),
          }}
        />
        <h1 className="page-title">Hey 👋 Welcome to my site!</h1>
        <p className="page-subtitle">
          I am Kye Gomez, founder of both Swarms and previously led Agora Labs, my current focus is on researching large-scale multi-agent systems, alternative model architectures, and multi-modal models.
        </p>
        <p className="hero-reachout">
          Reach out to me via email:{' '}
          <a href="mailto:kye@swarms.world" className="hero-reachout-link">
            kye@swarms.world
          </a>
        </p>
      </section>

      <section style={{ marginTop: '0.9rem' }}>
        <div className="home-rows">
          <article className="card home-row-card">
            <span className="section-kicker">Experience</span>
            <div className="experience-stack">
              <div className="experience-item">
                <div className="experience-head">
                  <h3>Swarms.ai</h3>
                  <span className="experience-role">Founder & CEO</span>
                </div>
                <p>Multi-agent AI research and infrastructure company building production-ready collaborative intelligence.</p>
                <div className="meta-row">
                  <a className="button subtle" href="https://swarms.ai" target="_blank" rel="noopener noreferrer">
                    Visit swarms.ai
                  </a>
                </div>
              </div>

              <div className="experience-item">
                <div className="experience-head">
                  <h3>Agora Labs</h3>
                  <span className="experience-role">Founder</span>
                </div>
                <p>AI research lab focused on alternative model architectures and long-horizon technical exploration.</p>
                <div className="meta-row">
                  <a className="button subtle" href="https://agoralabs.ai" target="_blank" rel="noopener noreferrer">
                    Visit agoralabs.ai
                  </a>
                </div>
              </div>
            </div>
          </article>

          <article className="card home-row-card">
            <span className="section-kicker">Hobbies</span>
            <ul className="info-list">
              <li>Reading (library of over 1200 books)</li>
              <li>Basketball</li>
              <li>MMA</li>
              <li>Economics</li>
              <li>Go</li>
              <li>DJing (acid techno)</li>
              <li>Hiking</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

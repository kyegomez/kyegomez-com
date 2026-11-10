import type { Metadata } from 'next';
import Link from 'next/link';
import { formatDate, getBlogPosts } from './blog/utils';
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

const SCHOLAR_URL = 'https://scholar.google.com/citations?user=THxlKAUAAAAJ&hl=en';
const scholarPaper = (id: string) =>
  `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=THxlKAUAAAAJ&citation_for_view=THxlKAUAAAAJ:${id}`;

// Source: Google Scholar profile, newest first.
const papers: { title: string; authors: string; venue?: string; year?: string; href: string }[] = [
  {
    title:
      'The Gomez Character–Line Minimization Theorem: Existence, Bounds, and Uncomputability of Minimal Program Representations',
    authors: 'Kye Gomez',
    year: '2026',
    href: 'https://github.com/kyegomez/Gomez-Minimization-Paper/blob/main/paper.pdf',
  },
  {
    title: 'RouteHub: A Low-Overhead, SDK-Native LLM Gateway for Agentic Workloads',
    authors: 'Kye Gomez, Shryuk Grandhi',
    year: '2026',
    href: 'https://github.com/The-Swarm-Corporation/RouteHub/blob/main/docs/routehub.pdf',
  },
  {
    title: 'GraphWorkflow: A Low-Overhead Compile-Once Graph Execution Engine for Multi-Agent Systems',
    authors: 'Kye Gomez, Adi Chaudhary, Ayaan Gazali, Steve-Dusty',
    year: '2026',
    href: scholarPaper('qjMakFHDy7sC'),
  },
  {
    title: 'AgentRearrange: A General-Purpose Multi-Agent Orchestrator',
    authors: 'Kye Gomez, A. Chaudhary, K. Kuo',
    year: '2026',
    href: scholarPaper('u-x6o8ySG0sC'),
  },
  {
    title: 'OpenMythos: A Theoretical Reconstruction of the Claude Mythos Architecture',
    authors: 'Kye Gomez',
    venue: 'GitHub',
    year: '2026',
    href: scholarPaper('2osOgNQ5qMEC'),
  },
  {
    title: 'A Theory on Value Creation',
    authors: 'Kye Gomez',
    venue: 'SSRN 4968016',
    year: '2024',
    href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4968016',
  },
  {
    title: 'Tree of Thoughts',
    authors: 'Kye Gomez',
    year: '2023',
    href: scholarPaper('9yKSN-GCB0IC'),
  },
  {
    title: 'Multimodal-ToT',
    authors: 'Kye Gomez',
    year: '2023',
    href: scholarPaper('u5HHmVD_uO8C'),
  },
  {
    title: 'attn_res: Implementation of Attention Residuals',
    authors: 'Kye Gomez',
    href: scholarPaper('zYLM7Y9cAGgC'),
  },
];

export default function HomePage() {
  const latestPost = [...getBlogPosts()].sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )[0];

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
            <div className="research-head">
              <span className="section-kicker">My Research</span>
              <a className="button subtle" href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer">
                Google Scholar
              </a>
            </div>
            <ul className="research-list">
              {papers.map((paper) => (
                <li key={paper.title}>
                  <a className="research-item" href={paper.href} target="_blank" rel="noopener noreferrer">
                    <span className="research-year">{paper.year ?? '—'}</span>
                    <span className="research-body">
                      <span className="research-title">{paper.title}</span>
                      <span className="research-meta">
                        {paper.authors}
                        {paper.venue ? ` · ${paper.venue}` : ''}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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

      {latestPost && (
        <section style={{ marginTop: '0.9rem' }}>
          <Link className="latest-post-link" href={`/blog/${latestPost.slug}`}>
            <article className="card latest-post-card">
              <div className="latest-post-meta">
                <span className="section-kicker">Latest Post</span>
                <span className="latest-post-date">{formatDate(latestPost.metadata.publishedAt)}</span>
              </div>
              <h2 className="latest-post-title">{latestPost.metadata.title}</h2>
              {latestPost.metadata.summary && (
                <p className="latest-post-summary">{latestPost.metadata.summary}</p>
              )}
              <div className="latest-post-cta">Read the latest essay</div>
            </article>
          </Link>
        </section>
      )}
    </div>
  );
}

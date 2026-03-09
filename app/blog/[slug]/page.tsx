import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { absoluteUrl } from 'app/seo';

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }): Metadata | undefined {
  const post = getBlogPosts().find((item) => item.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(`/og?title=${encodeURIComponent(title)}`);
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: canonicalUrl,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getBlogPosts().find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <div className="page-wrap">
      <section className="page-block">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? absoluteUrl(post.metadata.image)
                : absoluteUrl(`/og?title=${encodeURIComponent(post.metadata.title)}`),
              url: postUrl,
              mainEntityOfPage: postUrl,
              author: {
                '@type': 'Person',
                name: 'Kye Gomez',
              },
              publisher: {
                '@type': 'Person',
                name: 'Kye Gomez',
              },
            }),
          }}
        />
        <span className="section-kicker">Essay</span>
        <h1 className="page-title">{post.metadata.title}</h1>
        <div className="article-meta">
          <span className="pill">Published {formatDate(post.metadata.publishedAt)}</span>
          <span className="pill">Reading mode</span>
        </div>
      </section>

      <section className="page-block" style={{ marginTop: '0.9rem' }}>
        <article className="mdx">
          <CustomMDX source={post.content} />
        </article>

        <div className="share-wrap">
          <p className="share-title">Share</p>
          <div className="share-links">
            <a
              className="button subtle"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent(postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              className="button subtle"
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.metadata.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="button subtle"
              href={`https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.metadata.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit
            </a>
            <a className="button subtle" href={`mailto:?subject=${encodeURIComponent(post.metadata.title)}&body=${encodeURIComponent(postUrl)}`}>
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title: `${title} - KYE_GOMEZ.exe`,
    description,
    openGraph: {
      title: `${title} - KYE_GOMEZ.exe`,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - KYE_GOMEZ.exe`,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex justify-center items-start pt-2 sm:pt-4">
      <div className="terminal-window max-w-6xl">
        <div className="terminal-header">
          <span className="text-xs sm:text-sm">BLOG ARTICLE - {post.metadata.title.toUpperCase()}</span>
        </div>
        <div className="terminal-content">
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
                  ? `${baseUrl}${post.metadata.image}`
                  : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                url: `${baseUrl}/blog/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'Kye Gomez',
                },
              }),
            }}
          />
          
          <div className="cyber-card mb-6 sm:mb-8">
            <h1 className="neon-text-red text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider mb-3 sm:mb-4">
              {post.metadata.title}
            </h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div>
                  <span className="neon-text-red text-xs uppercase tracking-wider">PUBLISHED</span>
                  <p className="text-gray-300">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </div>
                <div>
                  <span className="neon-text-white text-xs uppercase tracking-wider">STATUS</span>
                  <p className="text-red-400">ONLINE</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cyber-card">
            <article className="prose prose-invert max-w-none">
              <CustomMDX source={post.content} />
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

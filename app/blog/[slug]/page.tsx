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
            <div className="mt-8">
              <div className="font-bold neon-text-red text-sm sm:text-base mb-2 flex items-center gap-2">
                <svg className="inline-block h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.895-.635 1.747-1.08 2.54A9.956 9.956 0 0112 19a9.956 9.956 0 01-8.462-4.46A9.978 9.978 0 012.458 12z" /></svg>
                Share on Social Media
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.metadata.title)}&url=${encodeURIComponent('https://kyegomez.com/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className="cyber-button px-3 py-1 text-xs flex items-center gap-1"><svg className="h-4 w-4" fill="#1DA1F2" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.39 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.813 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg>Twitter</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://kyegomez.com/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className="cyber-button px-3 py-1 text-xs flex items-center gap-1"><svg className="h-4 w-4" fill="#1877F3" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>Facebook</a>
                <a href={`https://www.reddit.com/submit?url=${encodeURIComponent('https://kyegomez.com/blog/' + post.slug)}&title=${encodeURIComponent(post.metadata.title)}`} target="_blank" rel="noopener noreferrer" className="cyber-button px-3 py-1 text-xs flex items-center gap-1"><svg className="h-4 w-4" fill="#FF4500" viewBox="0 0 24 24"><path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.218.694.825.576C20.565 21.796 24 17.298 24 12"/></svg>Reddit</a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://kyegomez.com/blog/' + post.slug)}&title=${encodeURIComponent(post.metadata.title)}`} target="_blank" rel="noopener noreferrer" className="cyber-button px-3 py-1 text-xs flex items-center gap-1"><svg className="h-4 w-4" fill="#0077B5" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.271V1.723C24 .771 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM20.452 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.85-3.037-1.85 0-2.132 1.445-2.132 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.899 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286z"/></svg>LinkedIn</a>
                <a href={`mailto:?subject=${encodeURIComponent(post.metadata.title)}&body=${encodeURIComponent('https://kyegomez.com/blog/' + post.slug)}`} className="cyber-button px-3 py-1 text-xs flex items-center gap-1"><svg className="h-4 w-4" fill="#EA4335" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.99c.01-.01.02-.02.03-.03.18-.18.43-.28.68-.28h22.58c.25 0 .5.1.68.28.01.01.02.02.03.03L12 13.065zm11.99-7.99v13.85c0 .55-.45 1-1 1H1.01c-.55 0-1-.45-1-1V5.075l11.99 7.99 11.99-7.99z"/></svg>Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

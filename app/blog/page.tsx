import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { Link } from 'next-view-transitions'

export const metadata = {
  title: 'Blog | Kye Gomez',
  description: 'Read my thoughts on AI, economics, and building the future. Articles from Kye Gomez, founder of swarms.ai and agoralab.ai.',
  keywords: ['Kye Gomez', 'blog', 'AI', 'swarms.ai', 'agoralab.ai', 'open source', 'researcher', 'economics'],
}

export default function BlogPage() {
  let allBlogs = getBlogPosts()

  return (
    <div className="flex justify-center items-start pt-2 sm:pt-4">
      <div className="terminal-window max-w-6xl">
        <div className="terminal-header">
          <span className="text-xs sm:text-sm">BLOG DATABASE - ARTICLES & RESEARCH</span>
        </div>
        <div className="terminal-content">
          <h1 className="neon-text-red text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 uppercase tracking-wider">BLOG ARCHIVE</h1>
          <BlogPosts />
        </div>
      </div>
    </div>
  )
}

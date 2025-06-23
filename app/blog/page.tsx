import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog - KYE_GOMEZ.exe',
  description: 'Read my blog posts about AI, technology, and innovation.',
}

export default function Page() {
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

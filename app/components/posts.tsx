import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="space-y-3 sm:space-y-4">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block"
            href={`/blog/${post.slug}`}
          >
            <div className="cyber-card hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                <div className="flex-1">
                  <h3 className="neon-text-red text-base sm:text-lg lg:text-xl uppercase tracking-wide mb-2">
                    {post.metadata.title}
                  </h3>
                  {post.metadata.summary && (
                    <p className="text-gray-300 text-xs sm:text-sm mb-2">
                      {post.metadata.summary}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="text-center sm:text-left">
                    <div className="neon-text-white text-xs uppercase tracking-wider">
                      DATE
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm">
                      {formatDate(post.metadata.publishedAt, false)}
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="neon-text-red text-xs uppercase tracking-wider">
                      STATUS
                    </div>
                    <div className="text-red-400 text-xs sm:text-sm">
                      ONLINE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

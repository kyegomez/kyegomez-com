'use client';

import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { useEffect, useState } from 'react';

export function BlogPosts() {
  const [mounted, setMounted] = useState(false);
  
  const allBlogs = getBlogPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ease-out ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {allBlogs.map((post, index) => (
        <div
          key={post.slug}
          style={{ transitionDelay: `${index * 100}ms` }}
          className={`transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link 
            href={`/blog/${post.slug}`}
            className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl"
          >
            <article className="h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200">
              <div className="flex flex-col h-full">
                {/* Date Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt, false)}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </h2>

                {/* Summary */}
                {post.metadata.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {post.metadata.summary}
                  </p>
                )}

                {/* Footer Info */}
                <div className="mt-auto flex flex-wrap items-center gap-4">
                  {post.metadata.readingTime && (
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                        <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      </svg>
                      {post.metadata.readingTime} min read
                    </span>
                  )}
                  
                  {/* Tags */}
                  {post.metadata.tags && (
                    <div className="flex flex-wrap gap-2">
                      {post.metadata.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Link>
        </div>
      ))}

      {/* Empty State */}
      {allBlogs.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            No blog posts found.
          </p>
        </div>
      )}
    </div>
  );
}

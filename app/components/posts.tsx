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

  // Add fade-in effect on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {allBlogs.map((post, index) => (
        <div
          key={post.slug}
          className={`
            transform transition-all duration-300 ease-out
            opacity-0 translate-y-4
            ${mounted ? 'opacity-100 translate-y-0' : ''}
          `}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          <Link 
            href={`/blog/${post.slug}`}
            className="block h-full group"
          >
            <article className="h-full p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 
              bg-white dark:bg-black 
              transition-all duration-200 ease-in-out
              hover:bg-neutral-50 dark:hover:bg-neutral-900
              hover:shadow-lg dark:hover:shadow-neutral-800/30
              transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt, false)}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </h2>

                {post.metadata.summary && (
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                    {post.metadata.summary}
                  </p>
                )}

                <div className="mt-auto flex items-center space-x-4">
                  {post.metadata.readingTime && (
                    <span className="text-sm text-neutral-500 dark:text-neutral-500">
                      {post.metadata.readingTime} min read
                    </span>
                  )}
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

      {allBlogs.length === 0 && (
        <div 
          className={`
            col-span-full text-center py-12
            transition-opacity duration-300 ease-out
            opacity-0
            ${mounted ? 'opacity-100' : ''}
          `}
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            No blog posts found.
          </p>
        </div>
      )}

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

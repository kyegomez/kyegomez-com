import type { MetadataRoute } from 'next'
import { getBlogPosts } from 'app/blog/utils'
import { siteConfig } from 'app/seo'

export const baseUrl = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let routes = ['', '/blog', '/repositories', '/rss'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '/rss' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes, ...blogs]
}

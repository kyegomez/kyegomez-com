import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/blog/utils';

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="blog-list">
      {allBlogs
        .sort((a, b) => (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1))
        .map((post) => (
          <Link key={post.slug} className="blog-link" href={`/blog/${post.slug}`}>
            <article className="card blog-item">
              <div>
                <h3 className="blog-item-title">{post.metadata.title}</h3>
                {post.metadata.summary && <p className="blog-item-summary">{post.metadata.summary}</p>}
              </div>
              <div className="blog-item-meta">{formatDate(post.metadata.publishedAt, false)}</div>
            </article>
          </Link>
        ))}
    </div>
  );
}

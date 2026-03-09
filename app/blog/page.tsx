import { BlogPosts } from 'app/components/posts';

export const metadata = {
  title: 'Blog',
  description: 'Notes on AI, systems, economics, and engineering.',
};

export default function Page() {
  return (
    <div className="page-wrap">
      <section className="page-block">
        <span className="section-kicker">Writing</span>
        <h1 className="page-title">Blog archive</h1>
        <p className="page-subtitle">Essays, research notes, and practical engineering perspectives.</p>
      </section>

      <section className="page-block" style={{ marginTop: '0.9rem' }}>
        <BlogPosts />
      </section>
    </div>
  );
}

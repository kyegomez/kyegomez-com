export default function HomePage() {
  return (
    <div className="page-wrap">
      <section className="page-block">
        <h1 className="page-title">Hey 👋 Welcome to my site!</h1>
        <p className="page-subtitle">
          I am Kye Gomez, Co-Founder & CEO of Swarms and Previously Agora Labs. Presently researching large-scale multi-agent systems, alternative LLM model architectures, and more.
        </p>
        <p className="hero-reachout">
          Reach out to me via email:{' '}
          <a href="mailto:kye@swarms.world" className="hero-reachout-link">
            kye@swarms.world
          </a>
        </p>
      </section>

      <section className="page-block" style={{ marginTop: '0.9rem' }}>
        <div className="card-grid">
          <article className="card col-span-12 lg:col-span-7">
            <span className="section-kicker">Mission</span>
            <h2 className="section-title">Technology that compounds over decades.</h2>
            <p>
              I focus on systems that remain useful as they scale: clear abstractions, strong feedback loops, and research
              that translates to real products.
            </p>
          </article>

          <article className="card col-span-12 sm:col-span-6 lg:col-span-5">
            <span className="section-kicker">Principles</span>
            <ul className="info-list">
              <li>Good design is understandable.</li>
              <li>Good design is thorough down to the last detail.</li>
              <li>Good design is as little design as possible.</li>
            </ul>
          </article>

          <article className="card col-span-12 sm:col-span-6">
            <span className="section-kicker">Current Focus</span>
            <ul className="info-list">
              <li>Multi-agent AI architectures</li>
              <li>Economics and mechanism design</li>
              <li>Open source infrastructure</li>
            </ul>
          </article>

          <article className="card col-span-12 sm:col-span-6">
            <span className="section-kicker">Experience</span>
            <h3>Swarms.ai</h3>
            <p>Research lab for multi-agent systems and collaborative intelligence.</p>
            <div className="meta-row">
              <a className="button subtle" href="https://swarms.ai" target="_blank" rel="noopener noreferrer">
                Visit swarms.ai
              </a>
            </div>
          </article>

          <article className="card col-span-12 sm:col-span-6">
            <h3>Agora Labs</h3>
            <p>Research lab focused on alternative multi-modal model architectures.</p>
            <div className="meta-row">
              <a className="button subtle" href="https://agoralabs.ai" target="_blank" rel="noopener noreferrer">
                Visit agoralabs.ai
              </a>
            </div>
          </article>

          <article className="card col-span-12 sm:col-span-6">
            <span className="section-kicker">Personal</span>
            <ul className="info-list">
              <li>Reading, writing, and technical exploration</li>
              <li>Basketball and MMA training</li>
              <li>Long-range thinking about humanity's trajectory</li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}

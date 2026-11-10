function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const sections = [
    {
      title: 'Connect',
      links: [
        ['https://github.com/kyegomez', 'GitHub'],
        ['https://x.com/KyeGomezB', 'X / Twitter'],
        ['https://www.youtube.com/@kyegomez3242', 'YouTube'],
        ['https://medium.com/@kyeg', 'Medium'],
        ['https://www.linkedin.com/in/kye-g-38759a207/', 'LinkedIn'],
        ['https://scholar.google.com/citations?user=THxlKAUAAAAJ&hl=en&oi=ao', 'Google Scholar'],
        ['mailto:kye@swarms.world', 'Email'],
      ],
    },
    {
      title: 'Companies',
      links: [
        ['https://swarms.ai', 'Swarms'],
        ['https://agoralab.ai', 'Agora Lab'],
        ['https://apac.ai', 'APAC AI'],
      ],
    },
    {
      title: 'Resources',
      links: [
        ['/rss', 'RSS Feed'],
        ['https://lu.ma/swarms_calendar', 'Swarms Calendar'],
        ['https://cal.com/swarms', 'Book a Meeting'],
      ],
    },
    {
      title: 'Support',
      links: [
        ['https://github.com/sponsors/kyegomez', 'GitHub Sponsors'],
        ['https://buymeacoffee.com/kyegomez', 'Buy Me a Coffee'],
        ['https://polar.sh/kyegomez/', 'Polar Funding'],
      ],
    },
  ] as const;

  return (
    <footer className="footer-wrap">
      <div className="footer-panel">
        <nav className="footer-grid" aria-label="Footer">
          {sections.map((section) => (
            <section key={section.title} className="footer-col">
              <span className="section-kicker">{section.title}</span>
              <ul className="link-list">
                {section.links.map(([href, label]) => {
                  const external = href.startsWith('http');
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                      >
                        <span>{label}</span>
                        <ArrowIcon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kye Gomez</span>
          <span>Accelerating Technological Progress</span>
        </div>
      </div>
    </footer>
  );
}

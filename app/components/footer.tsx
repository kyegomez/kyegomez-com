function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  const LinkButton = ({ href, text, category }: { href: string; text: string; category: string }) => (
    <li className="w-full">
      <a
        href={href}
        className="flex w-full items-center justify-between rounded-md bg-black/50 border border-gray-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-all hover:border-red-500 hover:bg-red-500/20 hover:text-red-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{text}</span>
        <ArrowIcon />
      </a>
    </li>
  );

  const CategorySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6 sm:mb-8">
      <h3 className="mb-3 sm:mb-4 text-sm sm:text-lg font-semibold neon-text-red font-['Orbitron'] uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );

  return (
    <footer className="mx-auto max-w-7xl px-2 sm:px-4 py-8 sm:py-16">
      <div className="terminal-window mb-6 sm:mb-8">
        <div className="terminal-header">
          <span className="text-xs sm:text-sm">NETWORK CONNECTIONS - EXTERNAL LINKS</span>
        </div>
        <div className="terminal-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <CategorySection title="Connect">
              <LinkButton href="https://github.com/kyegomez" text="GitHub" category="social" />
              <LinkButton href="https://x.com/KyeGomezB" text="Twitter/X" category="social" />
              <LinkButton href="https://discord.gg/EamjgSaEQf" text="Discord" category="social" />
              <LinkButton href="https://www.youtube.com/@kyegomez3242" text="YouTube" category="social" />
              <LinkButton href="https://www.instagram.com/kye_gomez/" text="Instagram" category="social" />
              <LinkButton href="https://www.linkedin.com/in/kye-g-38759a207/" text="Linkedin" category="social" />
            </CategorySection>
            
            <CategorySection title="Resources">
              <LinkButton href="/rss" text="RSS Feed" category="resource" />
              <LinkButton href="https://lu.ma/swarms_calendar" text="Swarms Calendar" category="resource" />
            </CategorySection>

            <CategorySection title="Blog">
              <LinkButton href="https://medium.com/@kyeg" text="Medium" category="blog" />
              <LinkButton href="https://agoralab.ai" text="Agora Blog" category="blog" />
            </CategorySection>
            
            <CategorySection title="Contact">
              <LinkButton href="mailto:kye@kyegomez.com" text="Email" category="contact" />
              <LinkButton href="https://cal.com/swarms" text="Book a Meeting" category="contact" />
            </CategorySection>
            
            <CategorySection title="Support">
              <LinkButton href="https://github.com/sponsors/kyegomez" text="Sponsor on Github" category="support" />
              <LinkButton href="https://buymeacoffee.com/kyegomez" text="Buy Me a Coffee" category="support" />
              <LinkButton href="https://polar.sh/kyegomez/" text="Fund Issues on Polar" category="support" />
            </CategorySection>
            
            <CategorySection title="Company">
              <LinkButton href="https://swarms.world" text="Swarms" category="company" />
              <LinkButton href="https://agoralab.ai" text="Agora" category="company" />
              <LinkButton href="https://apac.ai" text="APAC AI" category="company" />
            </CategorySection>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="cyber-card inline-block">
          <p className="text-xs sm:text-sm text-gray-400">
            <span className="neon-text-red">© {new Date().getFullYear()}</span> | 
            <span className="neon-text-white"> KYE_GOMEZ.exe</span> | 
            <span className="neon-text-red"> MIT Licensed</span> | 
            <span className="neon-text-white"> Swarms Terminal v2.0.24</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
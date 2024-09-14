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
  const LinkButton = ({ href, text }: { href: string; text: string }) => (
    <li className="w-full">
      <a
        href={href}
        className="flex w-full items-center justify-between rounded-md bg-neutral-100 px-4 py-3 text-sm transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{text}</span>
        <ArrowIcon />
      </a>
    </li>
  );

  const CategorySection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );

  return (
    <footer className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <CategorySection title="Connect">
          <LinkButton href="https://github.com/kyegomez" text="GitHub" />
          <LinkButton href="https://x.com/KyeGomezB" text="Twitter/X" />
          <LinkButton href="https://discord.gg/agora-999382051935506503" text="Discord" />
          <LinkButton href="https://www.youtube.com/@kyegomez3242" text="YouTube" />
        </CategorySection>
        
        <CategorySection title="Resources">
          <LinkButton href="/rss" text="RSS" />
          <LinkButton href="https://lu.ma/swarms_calendar" text="Swarms Calendar" />
        </CategorySection>
        
        <CategorySection title="Contact">
          <LinkButton href="mailto:kye@kyegomez.com" text="Email" />
          <LinkButton href="tel:+17866955339" text="786-695-5339" />
          <LinkButton href="https://cal.com/swarms" text="Book a Meeting" />
        </CategorySection>
        
        <CategorySection title="Support">
          <LinkButton href="https://github.com/sponsors/kyegomez" text="Sponsor on Github" />
          <LinkButton href="https://buymeacoffee.com/kyegomez" text="Buy Me a Coffee" />
          <LinkButton href="https://polar.sh/kyegomez/" text="Fund Issues on Polar" />
        </CategorySection>
      </div>
      <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
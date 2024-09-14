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
    <li>
      <a
        href={href}
        className="flex items-center rounded-md bg-neutral-100 px-4 py-2 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ArrowIcon />
        <span className="ml-2">{text}</span>
      </a>
    </li>
  );

  return (
    <footer className="mb-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <LinkButton href="/rss" text="RSS" />
        <LinkButton href="https://github.com/kyegomez" text="GitHub" />
        <LinkButton href="https://x.com/KyeGomezB" text="Twitter/X" />
        <LinkButton href="https://discord.gg/agora-999382051935506503" text="Discord" />
        <LinkButton href="https://www.youtube.com/@kyegomez3242" text="YouTube" />
        <LinkButton href="https://lu.ma/swarms_calendar" text="Swarms Calendar" />
        <LinkButton href="https://cal.com/swarms" text="Book a Meeting" />
        <LinkButton href="mailto:kye@kyegomez.com" text="Email" />
        <LinkButton href="tel:+17866955339" text="786-695-5339" />
        <LinkButton href="https://github.com/sponsors/kyegomez" text="Sponsor Me on Github" />
        <LinkButton href="https://buymeacoffee.com/kyegomez" text="Buy Me a Coffee" />
        {/* <LinkButton href="https://buymeacoffee.com/kyegomez" text="Buy Me a Coffee" /> */}
      </div>
      <p className="mt-8 text-center text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
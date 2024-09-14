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
  return (
    <footer className="mb-16">
      <div className="flex flex-col space-y-4 md:space-y-8">
        <ul className="font-sm flex flex-col space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          <li>
            <a href="/rss">
              <ArrowIcon />
              <p className="ml-2 h-7">rss</p>
            </a>
          </li>
          <li>
            <a href="https://github.com/kyegomez">
              <ArrowIcon />
              <p className="ml-2 h-7">github</p>
            </a>
          </li>
          <li>
            <a href="https://x.com/KyeGomezB">
              <ArrowIcon />
              <p className="ml-2 h-7">Twitter/X</p>
            </a>
          </li>
          <li>
            <a href="https://discord.gg/agora-999382051935506503">
              <ArrowIcon />
              <p className="ml-2 h-7">Discord</p>
            </a>
          </li>
        </ul>
        <ul className="font-sm flex flex-col space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
          <li>
            <a href="https://www.youtube.com/@kyegomez3242">
              <ArrowIcon />
              <p className="ml-2 h-7">Youtube</p>
            </a>
          </li>
          <li>
            <a href="https://lu.ma/swarms_calendar">
              <ArrowIcon />
              <p className="ml-2 h-7">Swarms Calendar</p>
            </a>
          </li>
          <li>
            <a href="mailto:kye@kyegomez.com">
              <ArrowIcon />
              <p className="ml-2 h-7">Email</p>
            </a>
          </li>
          <li>
            <a>
              <ArrowIcon />
              <p className="ml-2 h-7">786-695-5339</p>
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
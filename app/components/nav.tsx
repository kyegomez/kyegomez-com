import Link from 'next/link'

const navItems = {
  '/': {
    name: 'HOME',
    icon: '⚡'
  },
  '/blog': {
    name: 'BLOG',
    icon: '📝'
  },
  '/repositories': {
    name: 'REPOSITORIES',
    icon: '📂'
  }
}

export function Navbar() {
  return (
    <nav className="cyber-nav">
      <div className="container-responsive">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="flex flex-col items-start w-full sm:w-auto">
            <span className="neon-text-red text-lg sm:text-xl font-bold">KYE_GOMEZ.exe</span>
            <div className="relative w-full h-2 mt-1 overflow-hidden rounded bg-black/60">
              <div className="loading-bar absolute left-0 top-0 h-full w-1/2 animate-loading-bar" />
            </div>
          </div>
          <div className="flex space-x-1">
            {Object.entries(navItems).map(([path, { name, icon }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                >
                  <span className="text-sm sm:text-lg">{icon}</span>
                  <span className="font-bold hidden sm:inline">{name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

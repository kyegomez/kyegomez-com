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
          <div className="flex items-center space-x-2">
            <span className="neon-text-red text-lg sm:text-xl font-bold">KYE_GOMEZ.exe</span>
            <div className="loading"></div>
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

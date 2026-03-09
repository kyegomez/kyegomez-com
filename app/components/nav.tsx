'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/repositories', label: 'Repositories' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div>
          <p className="brand-title">Kye Gomez</p>
          <p className="brand-subtitle">Research, Systems, and Open Source</p>
        </div>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

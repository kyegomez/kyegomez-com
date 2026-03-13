'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/repositories', label: 'Repositories' },
];

type ThemeMode = 'light' | 'dark';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemeMode>('light');

  const applyTheme = (next: ThemeMode) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply initial theme: stored preference wins, otherwise follow system
    applyTheme(stored ?? (mq.matches ? 'dark' : 'light'));

    // Follow system changes only when the user hasn't set a manual preference
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-title-link">
          <div className="brand-title-wrap">
            <span className="brand-mark" aria-hidden="true">
              KG
            </span>
            <p className="brand-title">Kye Gomez</p>
          </div>
        </Link>
        <div className="site-nav-wrap">
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
          <a
            href="https://x.com/KyeGomezB"
            className="nav-icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Kye Gomez on Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.46 4.03c-.63.37-1.32.64-2.05.78a3.54 3.54 0 0 0-6.07 2.42c0 .28.03.55.09.81-2.94-.15-5.55-1.56-7.29-3.71a3.54 3.54 0 0 0 1.1 4.73 3.52 3.52 0 0 1-1.6-.44v.04a3.55 3.55 0 0 0 2.84 3.47 3.6 3.6 0 0 1-1.59.06 3.55 3.55 0 0 0 3.31 2.46A7.12 7.12 0 0 1 3 18.07 10.06 10.06 0 0 0 8.52 20c6.27 0 9.7-5.2 9.7-9.7 0-.15 0-.3-.01-.45a6.93 6.93 0 0 0 1.7-1.77 6.9 6.9 0 0 1-2 .55 3.47 3.47 0 0 0 1.53-1.9z" />
            </svg>
          </a>
          <button
            type="button"
            className={`theme-toggle theme-toggle--${theme}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="theme-toggle-icons" aria-hidden="true">
              {/* Sun */}
              <svg className="theme-icon theme-icon--sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </svg>
              {/* Moon */}
              <svg className="theme-icon theme-icon--moon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

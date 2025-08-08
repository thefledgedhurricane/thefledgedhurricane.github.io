'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Recherche', href: '/#about' },
  { name: 'Publications', href: '/publications' },
  { name: 'Articles', href: '/posts' },
  { name: 'Enseignement', href: '/teaching' },
  { name: 'Événements', href: '/events' },
  { name: 'Projets', href: '/projects' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 'light');

  // Init theme from localStorage / system
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = (stored === 'dark' || (!stored && prefersDark)) ? 'dark' : 'light';
    setTheme(initial);
  }, []);

  // Apply theme class to html
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const pathname = usePathname();

  return (
  <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:dark:bg-gray-950/75 transition-colors">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="block">
                <span className="text-lg sm:text-xl font-light text-gray-900 dark:text-gray-100 tracking-wide">
                 <span className="hidden sm:inline">Ihababdelbasset </span>ANNAKI
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-light tracking-wider uppercase">
                  Recherche & Éducation
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((link) => {
              const isActive = pathname === link.href || 
                (link.href.includes('#') && pathname === '/' && link.href !== '/') ||
                (link.href === '/projects' && pathname === '/projects');
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-light tracking-wide transition-all duration-300 group ${
                    isActive
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {link.name}
                  {link.href !== '/projects' && (
                    <span className={`absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 01.993.883L11 3v1a1 1 0 01-1.993.117L9 4V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.497 1.32l-.083.094-.708.707a1 1 0 01-1.497-1.32l.083-.094.708-.707zM17 9a1 1 0 01.117 1.993L17 11h-1a1 1 0 01-.117-1.993L16 9h1zM5 9a1 1 0 01.117 1.993L5 11H4a1 1 0 01-.117-1.993L4 9h1zm9.071 4.243a1 1 0 011.32 1.497l-.094.083-.707.708a1 1 0 01-1.497-1.32l.083-.094.707-.707zM10 15a1 1 0 01.993.883L11 16v1a1 1 0 01-1.993.117L9 17v-1a1 1 0 011-1zm-4.243-1.757a1 1 0 011.32 1.497l-.094.083-.707.708a1 1 0 01-1.497-1.32l.083-.094.707-.707zM5.636 4.636a1 1 0 011.32 1.497l-.094.083-.707.708a1 1 0 01-1.497-1.32l.083-.094.707-.707z"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
              )}
            </button>
            <Link
                href="/contact"
                className="px-6 py-2 text-sm font-light text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25 dark:hover:shadow-gray-100/25"
              >
                Me Contacter
              </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href.includes('#') && pathname === '/' && link.href !== '/');
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block text-base font-light tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <button
                  onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center px-6 py-3 text-sm font-light border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900"
                >
                  {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                </button>
                <Link
                  href="/contact"
                  className="block w-full px-6 py-3 text-center text-sm font-light text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Me Contacter
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
'use client';

import { useState } from 'react';
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
  { name: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="block">
                <span className="text-lg sm:text-xl font-light text-gray-900 tracking-wide">
                 <span className="hidden sm:inline">Ihababdelbasset </span>ANNAKI
                </span>
                <div className="text-xs text-gray-500 font-light tracking-wider uppercase">
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
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {link.href !== '/projects' && (
                    <span className={`absolute -bottom-1 left-0 h-px bg-gray-900 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
                href="/#contact"
                className="px-6 py-2 text-sm font-light text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/25"
              >
                Me Contacter
              </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
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
          <div className="lg:hidden border-t border-gray-100">
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
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/#contact"
                  className="block w-full px-6 py-3 text-center text-sm font-light text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200"
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
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Research', href: '/publications' },
  { name: 'Teaching', href: '/teaching' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-center ${
        scrolled ? 'pt-4' : 'pt-6'
      }`}
    >
      <nav 
        className={`
          relative flex items-center justify-between 
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled 
            ? 'w-[90%] max-w-5xl bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full px-6 py-3 border border-white/20' 
            : 'w-full max-w-[1400px] px-6 lg:px-12 py-4 bg-transparent'
          }
        `}
      >
        {/* Logo */}
        <Link 
          href="/" 
          className={`text-base font-medium tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-mckinsey-navy-900' : 'text-white'
          } hover:opacity-70`}
        >
          iAnnaki <span className="font-light opacity-80">Edu & Research</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
                  ${scrolled 
                    ? isActive 
                      ? 'text-mckinsey-navy-900 bg-mckinsey-gray-100' 
                      : 'text-mckinsey-gray-600 hover:text-mckinsey-navy-900 hover:bg-gray-50'
                    : isActive
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? 'text-mckinsey-navy-900' : 'text-white'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 lg:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navigation.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-mckinsey-gray-100 text-mckinsey-navy-900'
                        : 'text-mckinsey-gray-600 hover:bg-gray-50 hover:text-mckinsey-navy-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
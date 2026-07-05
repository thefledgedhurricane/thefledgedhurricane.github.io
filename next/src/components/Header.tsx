'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { type Locale, locales } from '@/lib/dictionaries';

// Language display labels
const langLabels: Record<Locale, string> = {
  ar: 'ع',
  fr: 'FR',
  en: 'EN',
  es: 'ES',
};

const langFullNames: Record<Locale, string> = {
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
  es: 'Español',
};

// Navigation items keyed by locale
const navItems: Record<Locale, { name: string; segment: string }[]> = {
  ar: [
    { name: 'نبذة عني', segment: 'about' },
    { name: 'البحث العلمي', segment: 'publications' },
    { name: 'التدريس', segment: 'teaching' },
    { name: 'المشاريع', segment: 'projects' },
    { name: 'المدونة', segment: 'posts' },
  ],
  fr: [
    { name: 'À propos', segment: 'about' },
    { name: 'Recherche', segment: 'publications' },
    { name: 'Enseignement', segment: 'teaching' },
    { name: 'Projets', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
  ],
  en: [
    { name: 'About', segment: 'about' },
    { name: 'Research', segment: 'publications' },
    { name: 'Teaching', segment: 'teaching' },
    { name: 'Projects', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
  ],
  es: [
    { name: 'Sobre mí', segment: 'about' },
    { name: 'Investigación', segment: 'publications' },
    { name: 'Docencia', segment: 'teaching' },
    { name: 'Proyectos', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
  ],
};

const contactLabel: Record<Locale, string> = {
  ar: 'تواصل',
  fr: 'Contact',
  en: 'Contact',
  es: 'Contacto',
};

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on the home page for this locale
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 32);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close lang menu on outside click
  useEffect(() => {
    if (!langMenuOpen) return;
    const close = () => setLangMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [langMenuOpen]);

  const useWhiteText = !scrolled && isHomePage;
  const navigation = navItems[lang] ?? navItems.en;

  // Build switch-lang URL: replace /[currentLang]/ with /[newLang]/
  function switchLang(newLang: Locale): string {
    return pathname.replace(`/${lang}`, `/${newLang}`) || `/${newLang}`;
  }

  function rememberLanguage(newLang: Locale) {
    window.localStorage.setItem('preferred-locale', newLang);
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          flex justify-center
          ${scrolled ? 'pt-3 pb-0' : isHomePage ? 'pt-5 pb-0' : 'pt-0 pb-0'}
        `}
      >
        <nav
          className={`
            relative flex items-center justify-between
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled
              ? `w-[92%] max-w-5xl rounded-2xl px-5 py-2.5
                 bg-white/70 backdrop-blur-2xl
                 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]
                 border border-white/40 border-b-white/20`
              : isHomePage
                ? 'w-full max-w-[1400px] px-6 lg:px-14 py-5 bg-transparent'
                : `w-full max-w-none px-6 lg:px-14 py-4
                   bg-white/95 backdrop-blur-md
                   border-b border-mckinsey-gray-200/60`
            }
          `}
        >
          {/* Logo */}
          <Link href={`/${lang}`} className="group relative flex items-center gap-2 transition-all duration-300">
            <span
              className={`
                inline-block h-2 w-2 rounded-full
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-125
                ${useWhiteText
                  ? 'bg-mckinsey-teal-500 shadow-[0_0_8px_rgba(0,160,176,0.5)]'
                  : 'bg-gradient-to-br from-mckinsey-teal-500 to-mckinsey-teal-600 shadow-[0_0_6px_rgba(0,160,176,0.35)]'
                }
              `}
            />
            <span
              className={`
                text-[1.05rem] tracking-tight transition-colors duration-500
                ${useWhiteText ? 'text-white' : 'text-mckinsey-navy-900'}
              `}
            >
              <span className="font-bold">iAnnaki</span>
              <span
                className={`
                  ml-1.5 font-light text-sm
                  ${useWhiteText
                    ? 'text-white/60'
                    : 'bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600 bg-clip-text text-transparent'
                  }
                `}
              >
                Edu &amp; Research
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map((link) => {
              const href = `/${lang}/${link.segment}`;
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={link.segment}
                  href={href}
                  className={`
                    group relative px-4 py-2 text-[0.825rem] font-medium tracking-wide
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${useWhiteText
                      ? isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      : isActive ? 'text-mckinsey-navy-900' : 'text-mckinsey-gray-600 hover:text-mckinsey-navy-900'
                    }
                  `}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={`
                      absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isActive
                        ? useWhiteText ? 'w-5 bg-white' : 'w-5 bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600'
                        : 'w-0 group-hover:w-4 bg-mckinsey-teal-500/60'
                      }
                    `}
                  />
                </Link>
              );
            })}

            {/* Language Switcher */}
            <div className="relative ml-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold
                  transition-all duration-300 border
                  ${useWhiteText
                    ? 'text-white border-white/25 hover:bg-white/15 bg-white/10'
                    : 'text-mckinsey-navy-700 border-mckinsey-gray-200 hover:bg-mckinsey-gray-50'
                  }
                `}
                aria-label="Switch language"
              >
                <Globe size={13} />
                {langLabels[lang]}
              </button>
              {langMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[130px] z-50">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={switchLang(l)}
                      onClick={() => {
                        rememberLanguage(l);
                        setLangMenuOpen(false);
                      }}
                      className={`
                        flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                        ${l === lang
                          ? 'bg-mckinsey-teal-50 text-mckinsey-teal-700 font-semibold'
                          : 'text-mckinsey-gray-700 hover:bg-mckinsey-gray-50'
                        }
                      `}
                    >
                      {langFullNames[l]}
                      {l === lang && <span className="w-1.5 h-1.5 rounded-full bg-mckinsey-teal-500" />}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Contact Button */}
            <Link
              href={`/${lang}/contact`}
              className={`
                group ml-2 relative inline-flex items-center gap-1.5
                px-5 py-2 text-[0.8rem] font-semibold tracking-wide rounded-full
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${useWhiteText
                  ? `bg-white/15 text-white border border-white/25
                     hover:bg-white/25 hover:border-white/40
                     hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                     backdrop-blur-md`
                  : `bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600
                     text-white border border-mckinsey-teal-500/20
                     hover:shadow-[0_4px_20px_rgba(0,160,176,0.3)]
                     hover:scale-[1.03]
                     active:scale-[0.98]`
                }
              `}
            >
              {contactLabel[lang]}
              <ArrowUpRight
                size={13}
                strokeWidth={2.5}
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`
              lg:hidden relative z-[60] p-2 rounded-xl
              transition-all duration-300
              ${mobileMenuOpen
                ? 'text-white hover:bg-white/10'
                : useWhiteText
                  ? 'text-white hover:bg-white/10'
                  : 'text-mckinsey-navy-900 hover:bg-mckinsey-gray-100'
              }
            `}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`
                  absolute inset-0
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
                `}
              />
              <X
                size={24}
                className={`
                  absolute inset-0
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}
                `}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-Screen Mobile Overlay */}
      <div
        className={`
          fixed inset-0 z-[55] lg:hidden
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div
          className="absolute inset-0 bg-mckinsey-navy-950/90 backdrop-blur-2xl"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div className="relative flex flex-col justify-center items-start h-full px-8 sm:px-12">
          <nav className="flex flex-col gap-1 w-full max-w-md">
            {[...navigation.map(n => ({ name: n.name, href: `/${lang}/${n.segment}` })), { name: contactLabel[lang], href: `/${lang}/contact` }].map(
              (link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      group relative flex items-center justify-between
                      py-4 border-b border-white/[0.06]
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                    style={{ transitionDelay: mobileMenuOpen ? `${100 + i * 60}ms` : '0ms' }}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`
                          h-1.5 w-1.5 rounded-full transition-all duration-300
                          ${isActive ? 'bg-mckinsey-teal-500 scale-100' : 'bg-white/20 scale-75 group-hover:bg-mckinsey-teal-500/60 group-hover:scale-100'}
                        `}
                      />
                      <span
                        className={`
                          text-3xl sm:text-4xl font-light tracking-tight
                          transition-all duration-500
                          ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}
                        `}
                      >
                        {link.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-mckinsey-teal-500 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </Link>
                );
              }
            )}
          </nav>

          {/* Language switcher in mobile menu */}
          <div
            className={`
              mt-10 flex gap-3
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: mobileMenuOpen ? '480ms' : '0ms' }}
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLang(l)}
                onClick={() => {
                  rememberLanguage(l);
                  setMobileMenuOpen(false);
                }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${l === lang
                    ? 'bg-mckinsey-teal-500 text-white'
                    : 'text-white/40 border border-white/15 hover:text-white hover:border-white/30'
                  }
                `}
              >
                {langLabels[l]}
              </Link>
            ))}
          </div>

          <p
            className={`
              mt-6 text-xs text-white/20 tracking-widest uppercase font-light
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: mobileMenuOpen ? '540ms' : '0ms' }}
          >
            Education &amp; Research
          </p>
        </div>
      </div>
    </>
  );
}

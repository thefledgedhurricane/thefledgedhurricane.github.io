import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { type Locale } from '@/lib/dictionaries';

interface FooterProps {
  lang: Locale;
}

const exploreLabels: Record<Locale, string> = {
  ar: 'استكشف',
  fr: 'Explorer',
  en: 'Explore',
  es: 'Explorar',
};

const legalLabels: Record<Locale, string> = {
  ar: 'المعلومات القانونية',
  fr: 'Informations Légales',
  en: 'Legal & Info',
  es: 'Información Legal',
};

const ctaTitles: Record<Locale, string> = {
  ar: 'فلنبتكر المستقبل معاً',
  fr: 'Let\'s innovate the future together',
  en: 'Let\'s innovate the future together',
  es: 'Innovemos el futuro juntos',
};

const ctaDescs: Record<Locale, string> = {
  ar: 'مهتم باستشارات الذكاء الاصطناعي/الواقع الافتراضي، أو التعاون البحثي؟',
  fr: 'Interested in AI/VR consulting, research collaboration, or speaking engagements?',
  en: 'Interested in AI/VR consulting, research collaboration, or speaking engagements?',
  es: '¿Interesado en consultoría de IA/RV, colaboración en investigación o conferencias?',
};

const ctaBtns: Record<Locale, string> = {
  ar: 'ابدأ محادثة',
  fr: 'Start a conversation',
  en: 'Start a conversation',
  es: 'Iniciar conversación',
};

const taglines: Record<Locale, string> = {
  ar: 'نوسع آفاق الذكاء الاصطناعي والواقع الافتراضي من خلال أبحاث دقيقة وتعليم مبتكر.',
  fr: 'Advancing the frontiers of artificial intelligence and virtual reality through rigorous research and innovative education.',
  en: 'Advancing the frontiers of artificial intelligence and virtual reality through rigorous research and innovative education.',
  es: 'Avanzando las fronteras de la inteligencia artificial y la realidad virtual a través de investigación rigurosa y educación innovadora.',
};

const rightsLabels: Record<Locale, string> = {
  ar: 'جميع الحقوق محفوظة.',
  fr: 'Tous droits réservés.',
  en: 'All rights reserved.',
  es: 'Todos los derechos reservados.',
};

const designLabels: Record<Locale, string> = {
  ar: 'صُمم بـ ♥ للمستقبل',
  fr: 'Designed with ♥ for the Future',
  en: 'Designed with ♥ for the Future',
  es: 'Diseñado con ♥ para el Futuro',
};

const navItems: Record<Locale, { name: string; segment: string }[]> = {
  ar: [
    { name: 'نبذة عني', segment: 'about' },
    { name: 'البحث العلمي', segment: 'publications' },
    { name: 'التدريس', segment: 'teaching' },
    { name: 'المشاريع', segment: 'projects' },
    { name: 'المدونة', segment: 'posts' },
    { name: 'تواصل', segment: 'contact' },
  ],
  fr: [
    { name: 'À propos', segment: 'about' },
    { name: 'Recherche', segment: 'publications' },
    { name: 'Enseignement', segment: 'teaching' },
    { name: 'Projets', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
    { name: 'Contact', segment: 'contact' },
  ],
  en: [
    { name: 'About', segment: 'about' },
    { name: 'Research', segment: 'publications' },
    { name: 'Teaching', segment: 'teaching' },
    { name: 'Projects', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
    { name: 'Contact', segment: 'contact' },
  ],
  es: [
    { name: 'Sobre mí', segment: 'about' },
    { name: 'Investigación', segment: 'publications' },
    { name: 'Docencia', segment: 'teaching' },
    { name: 'Proyectos', segment: 'projects' },
    { name: 'Blog', segment: 'posts' },
    { name: 'Contacto', segment: 'contact' },
  ],
};

const legalItems: Record<Locale, string[]> = {
  ar: ['سياسة الخصوصية', 'شروط الخدمة', 'سياسة ملفات الارتباط', 'سهولة الوصول'],
  fr: ['Politique de confidentialité', 'Conditions d\'utilisation', 'Politique des cookies', 'Accessibilité'],
  en: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
  es: ['Política de privacidad', 'Términos de servicio', 'Política de cookies', 'Accesibilidad'],
};

export default function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();
  const navigation = navItems[lang] ?? navItems.en;
  const legal = legalItems[lang] ?? legalItems.en;

  return (
    <footer className="relative bg-mckinsey-navy-950 text-white pt-0 pb-12 border-t border-mckinsey-navy-900 overflow-hidden">
      {/* Background image Unsplash + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop"
          alt="AI Innovation and Collaboration"
          className="w-full h-full object-cover object-center brightness-[0.3]"
          loading="lazy"
        />
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        <h2 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight">
          {ctaTitles[lang]}
        </h2>
        <p className="text-lg lg:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
          {ctaDescs[lang]}
        </p>
        <Link 
          href={`/${lang}/contact`}
          className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-mckinsey-navy-900 text-lg font-medium rounded-full hover:bg-mckinsey-teal-50 transition-all hover:scale-105 duration-300"
        >
          {ctaBtns[lang]}
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="inline-block text-3xl font-light tracking-tight mb-8">
              iAnnaki <span className="font-normal text-mckinsey-teal-400">Edu &amp; Research</span>
            </Link>
            <p className="text-xl text-mckinsey-gray-300 max-w-md font-light leading-relaxed mb-8">
              {taglines[lang]}
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-lg font-medium mb-8 text-mckinsey-teal-400">{exploreLabels[lang]}</h4>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.segment}>
                  <Link href={`/${lang}/${item.segment}`} className="text-white hover:text-mckinsey-teal-400 transition-colors flex items-center gap-2 group font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-mckinsey-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-lg font-medium mb-8 text-mckinsey-teal-400">{legalLabels[lang]}</h4>
            <ul className="space-y-4">
              {legal.map((item) => (
                <li key={item}>
                  <a href="#" className="text-white hover:text-mckinsey-teal-400 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-mckinsey-navy-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-mckinsey-gray-500">
            © {year} Dr. Ihababdelbasset ANNAKI. {rightsLabels[lang]}
          </div>
          <div className="flex items-center gap-2 text-sm text-mckinsey-gray-500">
            <span>{designLabels[lang]}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

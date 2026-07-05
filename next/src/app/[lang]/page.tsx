import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, GraduationCap, BookOpen, Award, ChevronDown, ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Counter from '@/components/Counter';
import MagneticButton from '@/components/MagneticButton';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as any;
  return {
    title: dict.home?.meta_title || 'Dr. Ihababdelbasset ANNAKI',
    description: dict.home?.meta_desc || '',
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale) as any;
  const h = dict.home;

  return (
    <main className="min-h-screen bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
            alt="AI and Digital Intelligence"
            fill
            className="object-cover brightness-[0.35] scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl">
            <FadeIn delay={100}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tight mb-5 sm:mb-6 drop-shadow-lg">
                {h.hero_title} <br className="hidden sm:block" />
                <span className="text-white/80">{h.hero_subtitle}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                {h.hero_desc}
              </p>
            </FadeIn>
            <FadeIn delay={500}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <MagneticButton
                  href={`/${lang}/about`}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 bg-white text-mckinsey-navy-900 text-sm sm:text-base font-medium overflow-hidden hover:bg-gray-100 rounded-sm"
                  strength={0.4}
                >
                  <span className="relative z-10">{h.hero_cta_about}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton
                  href={`/${lang}/contact`}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3.5 border border-white/30 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-medium hover:bg-white/20 rounded-sm overflow-hidden"
                  strength={0.4}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                  <span className="relative z-10">{h.hero_cta_contact}</span>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 sm:py-18 lg:py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-14">
            {[
              { value: 6, label: h.stats_research, suffix: '+' },
              { value: 10, label: h.stats_publications, suffix: '+' },
              { value: 4, label: h.stats_projects, suffix: '+' },
              { value: 8, label: h.stats_digitalization, suffix: '+' },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="group cursor-default">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-mckinsey-navy-900 mb-1.5 group-hover:text-mckinsey-teal-600 transition-colors duration-300">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-0.5 w-8 sm:w-10 bg-mckinsey-gray-200 group-hover:w-full group-hover:bg-mckinsey-teal-500 transition-all duration-500 mb-2.5" />
                  <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-mckinsey-gray-500 group-hover:text-mckinsey-navy-700 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center py-16 sm:py-20 overflow-hidden bg-mckinsey-navy-950">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1617802690658-1173a812650d?q=80&w=2070&auto=format&fit=crop"
            alt="Virtual Reality Research and AI"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <FadeIn>
            <div className="max-w-xl lg:max-w-2xl bg-white/90 backdrop-blur-xl p-8 sm:p-10 lg:p-14 border border-white/20 shadow-2xl rounded-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mckinsey-navy-900 text-white text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase mb-5 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-mckinsey-teal-400 animate-pulse" />
                {h.featured_badge}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-mckinsey-navy-900 leading-tight mb-5 sm:mb-6">
                {h.featured_title} <br className="hidden sm:block" />
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-navy-800 to-mckinsey-teal-600">
                  {h.featured_subtitle}
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-mckinsey-gray-700 leading-relaxed mb-6 sm:mb-8">
                {h.featured_desc}
              </p>
              <Link
                href={`/${lang}/publications`}
                className="group inline-flex items-center gap-3 text-sm sm:text-base font-medium text-mckinsey-navy-900 hover:text-mckinsey-teal-600 transition-colors"
              >
                {h.featured_link}
                <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-mckinsey-gray-300 group-hover:border-mckinsey-teal-500 group-hover:bg-mckinsey-teal-50 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expertise Bento Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <FadeIn>
            <div className="mb-10 sm:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-mckinsey-navy-900 mb-3 sm:mb-4">
                  {h.expertise_title}
                </h2>
                <p className="text-base sm:text-lg text-mckinsey-gray-600 max-w-md">{h.expertise_desc}</p>
              </div>
              <Link
                href={`/${lang}/about`}
                className="hidden lg:flex items-center gap-2 text-mckinsey-navy-800 hover:text-mckinsey-teal-600 transition-colors font-medium text-sm"
              >
                {h.expertise_view_profile} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-[280px] sm:auto-rows-[320px] lg:auto-rows-[340px]">
            <FadeIn className="md:col-span-2 group relative overflow-hidden bg-mckinsey-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href={`/${lang}/teaching`} className="block h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="w-6 h-6 text-mckinsey-teal-600" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-mckinsey-teal-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-mckinsey-navy-900 mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300">{h.card_teaching_title}</h3>
                  <p className="text-sm sm:text-base text-mckinsey-gray-600 max-w-md group-hover:text-mckinsey-navy-700 transition-colors line-clamp-3">{h.card_teaching_desc}</p>
                </div>
              </Link>
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mckinsey-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </FadeIn>

            <FadeIn delay={100} className="md:row-span-2 group relative overflow-hidden bg-mckinsey-navy-900 text-white hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href={`/${lang}/publications`} className="block h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors duration-500">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-xl sm:text-2xl font-normal text-white mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300">{h.card_research_title}</h3>
                  <p className="text-sm sm:text-base text-white/70 mb-5 sm:mb-6 group-hover:text-white transition-colors line-clamp-3">{h.card_research_desc}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {['AI', 'VR', 'Cognition', 'Neuroscience'].map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 text-[0.65rem] sm:text-xs border border-white/20 rounded-full text-white/80">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url('https://www.transparenttextures.com/patterns/cubes.png')"}} />
            </FadeIn>

            <FadeIn delay={200} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-mckinsey-teal-500 hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href={`/${lang}/projects`} className="block h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-mckinsey-gray-50 rounded-full group-hover:bg-mckinsey-teal-50 transition-colors duration-500">
                    <Award className="w-6 h-6 text-mckinsey-navy-600 group-hover:text-mckinsey-teal-600" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-mckinsey-teal-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal text-mckinsey-navy-900 mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300">{h.card_projects_title}</h3>
                  <p className="text-sm sm:text-base text-mckinsey-gray-600 group-hover:text-mckinsey-navy-700 transition-colors line-clamp-3">{h.card_projects_desc}</p>
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={300} className="group relative overflow-hidden bg-gradient-to-br from-mckinsey-teal-500 to-mckinsey-navy-600 text-white hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href={`/${lang}/contact`} className="block h-full p-6 sm:p-8 lg:p-9 flex flex-col justify-center items-center text-center relative z-10">
                <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-5">{h.card_contact_title}</h3>
                <div className="px-6 py-2.5 bg-white text-mckinsey-navy-900 text-sm sm:text-base font-medium rounded-full group-hover:scale-105 transition-transform">
                  {h.card_contact_btn}
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Teaching section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-mckinsey-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
            <FadeIn>
              <div className="space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase text-mckinsey-navy-800 rounded-full">
                  {h.teaching_badge}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-mckinsey-navy-900 leading-[1.1]">
                  {h.teaching_title} <br />
                  <span className="font-normal text-mckinsey-teal-600">{h.teaching_title2}</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-mckinsey-gray-700 leading-relaxed max-w-lg">{h.teaching_desc}</p>
                <Link
                  href={`/${lang}/teaching`}
                  className="inline-flex items-center gap-2.5 text-sm sm:text-base font-medium text-mckinsey-navy-900 hover:text-mckinsey-teal-600 transition-colors group"
                >
                  {h.teaching_cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={200} className="relative h-[300px] sm:h-[380px] lg:h-[440px] group">
              <div className="absolute inset-0 bg-mckinsey-teal-500/10 rounded-sm transform translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
              <div className="relative h-full w-full overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
                  alt="AI and Technology Education"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

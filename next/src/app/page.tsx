import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, GraduationCap, BookOpen, Award, ChevronDown, ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Counter from '@/components/Counter';
import MagneticButton from '@/components/MagneticButton';

export const metadata: Metadata = {
  title: 'Dr. Ihababdelbasset Annaki — Portfolio académique',
  description: "Recherche, enseignement et projets en Intelligence Artificielle, Réalité Virtuelle et Neurosciences.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      {/* Hero Section - 2026 Immersive Style */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
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

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-5xl">
            <FadeIn delay={100}>
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-light text-white leading-[0.9] tracking-tight mb-8 drop-shadow-lg">
                Advancing AI & VR <br />
                <span className="text-white/80">for transformative consulting</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={300}>
              <p className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed mb-12 max-w-2xl backdrop-blur-sm">
                Research-driven innovation at the intersection of artificial intelligence, virtual reality, and cognitive science. Shaping the future of consulting and education.
              </p>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex flex-col sm:flex-row gap-6">
                <MagneticButton 
                  href="/about"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-mckinsey-navy-900 text-lg font-medium overflow-hidden hover:bg-gray-100 rounded-sm"
                  strength={0.4}
                >
                  <span className="relative z-10">Learn more</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton 
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 bg-white/10 backdrop-blur-md text-white text-lg font-medium hover:bg-white/20 rounded-sm overflow-hidden"
                  strength={0.4}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                  <span className="relative z-10">Get in touch</span>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Stats Bar - Modern & Clean */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {[
              { value: 6, label: "Years of Research (2020–present)", suffix: "+" },
              { value: 10, label: "Publications", suffix: "+" },
              { value: 4, label: "Research Projects", suffix: "+" },
              { value: 8, label: "Years as Digitalization Expert (2017–present)", suffix: "+" },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="group cursor-default">
                  <div className="text-6xl lg:text-7xl font-light text-mckinsey-navy-900 mb-2 group-hover:text-mckinsey-teal-600 transition-colors duration-300">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="h-0.5 w-12 bg-mckinsey-gray-200 group-hover:w-full group-hover:bg-mckinsey-teal-500 transition-all duration-500 mb-4" />
                  <div className="text-sm font-medium uppercase tracking-wider text-mckinsey-gray-500 group-hover:text-mckinsey-navy-700 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Research - Glassmorphism Card */}
      <section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden bg-mckinsey-navy-950">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1617802690658-1173a812650d?q=80&w=2070&auto=format&fit=crop"
            alt="Virtual Reality Research and AI"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <FadeIn>
            <div className="max-w-2xl bg-white/90 backdrop-blur-xl p-12 lg:p-16 border border-white/20 shadow-2xl rounded-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mckinsey-navy-900 text-white text-xs font-bold tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-mckinsey-teal-400 animate-pulse" />
                Featured Research
              </div>
              <h2 className="text-4xl lg:text-6xl font-light text-mckinsey-navy-900 leading-tight mb-8">
                AI-powered VR for <br/>
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-navy-800 to-mckinsey-teal-600">
                  cognitive innovation
                </span>
              </h2>
              <p className="text-lg text-mckinsey-gray-700 leading-relaxed mb-10">
                Pioneering innovative VR platforms powered by AI that revolutionize spatial navigation assessment and working memory evaluation, pushing neuropsychological testing beyond traditional boundaries.
              </p>
              <Link 
                href="/publications"
                className="group inline-flex items-center gap-4 text-lg font-medium text-mckinsey-navy-900 hover:text-mckinsey-teal-600 transition-colors"
              >
                View research
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-mckinsey-gray-300 group-hover:border-mckinsey-teal-500 group-hover:bg-mckinsey-teal-50 transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expertise Areas - Bento Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <h2 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-6">
                  Expertise areas
                </h2>
                <p className="text-xl text-mckinsey-gray-600 max-w-xl">
                  Leading-edge research and consulting in AI, VR, and transformative cognitive technologies.
                </p>
              </div>
              <Link href="/about" className="hidden lg:flex items-center gap-2 text-mckinsey-navy-800 hover:text-mckinsey-teal-600 transition-colors font-medium">
                View full profile <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[400px]">
            {/* Large Card - Teaching */}
            <FadeIn className="md:col-span-2 group relative overflow-hidden bg-mckinsey-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href="/teaching" className="block h-full p-10 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="w-8 h-8 text-mckinsey-teal-600" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-mckinsey-teal-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-3xl font-normal text-mckinsey-navy-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">Teaching & Education</h3>
                  <p className="text-mckinsey-gray-600 max-w-md group-hover:text-mckinsey-navy-700 transition-colors">
                    AI-powered courses and innovative pedagogy for engineering students. Preparing future leaders in technology and innovation.
                  </p>
                </div>
              </Link>
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mckinsey-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </FadeIn>

            {/* Tall Card - Research */}
            <FadeIn delay={100} className="md:row-span-2 group relative overflow-hidden bg-mckinsey-navy-900 text-white hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href="/publications" className="block h-full p-10 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-full group-hover:bg-white/20 transition-colors duration-500">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div className="mt-auto">
                  <h3 className="text-3xl font-normal text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">Research & <br/>Publications</h3>
                  <p className="text-white/70 mb-8 group-hover:text-white transition-colors">
                    Cutting-edge research in AI-powered VR, spatial cognition, and next-generation consulting solutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['AI', 'VR', 'Cognition', 'Neuroscience'].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </FadeIn>

            {/* Standard Card - Projects */}
            <FadeIn delay={200} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-mckinsey-teal-500 hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href="/projects" className="block h-full p-10 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-mckinsey-gray-50 rounded-full group-hover:bg-mckinsey-teal-50 transition-colors duration-500">
                    <Award className="w-8 h-8 text-mckinsey-navy-600 group-hover:text-mckinsey-teal-600" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-mckinsey-teal-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-3xl font-normal text-mckinsey-navy-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">Innovation Projects</h3>
                  <p className="text-mckinsey-gray-600 group-hover:text-mckinsey-navy-700 transition-colors">
                    Transformative applications of AI and VR in consulting, education, and cognitive innovation.
                  </p>
                </div>
              </Link>
            </FadeIn>

            {/* New Card - Contact/Collaboration */}
            <FadeIn delay={300} className="group relative overflow-hidden bg-gradient-to-br from-mckinsey-teal-500 to-mckinsey-navy-600 text-white hover:shadow-xl transition-all duration-500 rounded-sm">
              <Link href="/contact" className="block h-full p-10 flex flex-col justify-center items-center text-center relative z-10">
                <h3 className="text-3xl font-light mb-6">Ready to collaborate?</h3>
                <div className="px-8 py-3 bg-white text-mckinsey-navy-900 font-medium rounded-full group-hover:scale-105 transition-transform">
                  Get in touch
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Teaching Section - Split with Modern Typography */}
      <section className="py-32 bg-mckinsey-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Block */}
            <FadeIn>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 text-xs font-bold tracking-widest uppercase text-mckinsey-navy-800 rounded-full">
                  Teaching Excellence
                </div>
                <h2 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 leading-[1.1]">
                  Shaping the <br/>
                  <span className="font-normal text-mckinsey-teal-600">next generation</span> <br/>
                  of tech leaders
                </h2>
                <p className="text-xl text-mckinsey-gray-700 leading-relaxed max-w-lg">
                  Leading artificial intelligence, algorithms, and advanced programming education for engineering students. Interactive, project-based learning with real-world consulting applications.
                </p>
                <Link 
                  href="/teaching"
                  className="inline-flex items-center gap-3 text-lg font-medium text-mckinsey-navy-900 hover:text-mckinsey-teal-600 transition-colors group"
                >
                  Explore courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </FadeIn>

            {/* Image Block with "Float" effect */}
            <FadeIn delay={200} className="relative h-[600px] group">
              <div className="absolute inset-0 bg-mckinsey-teal-500/10 rounded-sm transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
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

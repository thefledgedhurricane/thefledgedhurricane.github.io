import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import Counter from '@/components/Counter';
import { logos } from '@/components/about-logos';
import { getDictionary, locales, type Locale } from '@/lib/dictionaries';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang) as any;
  return {
    title: dict.about?.meta_title || 'About',
    description: dict.about?.meta_desc || '',
  };
}

interface Experience {
  id: string; company: string; position: string; duration: string;
  location: string; type: string; description: string; skills: string[]; current?: boolean;
}
interface Education {
  id: string; institution: string; degree: string; field: string;
  duration: string; grade?: string; description: string; skills: string[];
}

const experiences: Experience[] = [
  { id: 'ump-professor', company: 'Université Mohammed Premier Oujda', position: 'Assistant Professor', duration: 'Sep 2024 - Present', location: 'Oujda Metropolitan Area · On-site', type: 'Full-time', description: "Maître de Conférences à l'École Supérieure de l'Éducation et de la Formation (ESEF). Teaching and research in AI and advanced development, focusing on educational technologies.", skills: ['University Lecturing', 'Artificial Intelligence (AI)', 'Educational Technology'], current: true },
  { id: 'larsa-researcher', company: 'LARSA Laboratory', position: 'PhD & Researcher in AI & VR', duration: 'Jan 2020 - Present', location: 'Remote', type: 'Research', description: 'Pioneering AI researcher specializing in deep learning architectures, transformers, and RL. Expert in VR technologies for immersive behavioral analysis environments.', skills: ['Data Science', 'Virtual Reality (VR)', 'Machine Learning', 'Deep Learning', 'Neuroscience'], current: true },
  { id: 'kaggle-mentor', company: 'Kaggle', position: 'KaggleX BIPOC Mentor', duration: 'Aug 2023 - Nov 2023', location: 'Remote', type: 'Seasonal', description: 'Mentoring the next generation of data science pioneers. Sharing expertise in data science, digital transformation, and blockchain.', skills: ['Data Science', 'Teamwork', 'Mentorship'] },
  { id: 'kertys-consultant', company: 'Kertys', position: 'Consultant, Strategic BI', duration: 'Oct 2017 - Nov 2019', location: 'Casablanca, Morocco', type: 'Full-time', description: 'Expert in planning, ECM, and Business Intelligence. Full-stack developer with expertise in modern JS frameworks and data visualization.', skills: ['Data Science', 'Digital Strategy', 'Full-stack Development', 'Business Intelligence'] },
];

const education: Education[] = [
  { id: 'ump-phd', institution: 'Université Mohammed Premier Oujda', degree: 'Doctor of Science', field: 'AI & Data Science for Neuroscience', duration: 'Jan 2020 - May 2024', grade: 'PhD with Highest Honors', description: 'Doctoral research in Data Science and AI, pushing innovation boundaries at LARSA. Specialized in time-series deep learning and advanced neural architectures.', skills: ['Data Analytics', 'Project Management', 'Data Science', 'Research', 'AI'] },
  { id: 'wharton', institution: 'The Wharton School', degree: 'Non-degree', field: 'Entrepreneurship Studies', duration: 'Jun 2021 - Dec 2021', description: 'Entrepreneurship specialization covering venture design, organization, and management.', skills: ['Entrepreneurship', 'Start-up Ventures', 'Project Management', 'Fundraising'] },
  { id: 'insea', institution: 'INSEA', degree: 'State Engineer Diploma', field: 'Data Engineering & BI', duration: '2014 - 2017', description: 'Focus on BI systems design, Big Data, and Cloud Computing technologies.', skills: ['Data Science', 'Business Intelligence', 'Big Data', 'Cloud Computing'] },
  { id: 'cpge', institution: 'CPGE', degree: 'Preparatory Classes', field: 'Mathematics and Physics', duration: 'Sep 2012 - Jul 2014', description: 'Intensive training in mathematics and physics preparing for engineering school entrance exams.', skills: ['Mathematics', 'Physics', 'Analytical Thinking'] },
];

export default async function AboutPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang) as any;
  const a = dict.about;
  const lang = params.lang;

  return (
    <main className="bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mckinsey-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mckinsey-navy-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 rounded-full text-xs font-medium text-mckinsey-navy-800 mb-8 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full animate-pulse" />
                  {a.hero_badge}
                </div>
                <h1 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-4 leading-[1.1] tracking-tight break-words">
                  {a.hero_title} <br />
                  <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-navy-800 to-mckinsey-teal-600">
                    {a.hero_subtitle}
                  </span>
                </h1>
                <div className="mb-6 flex flex-wrap gap-3 items-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-mckinsey-navy-900 text-white text-xs font-semibold shadow">Assistant Professor</span>
                  <span className="inline-block px-4 py-1 rounded-full bg-mckinsey-teal-500 text-mckinsey-navy-900 text-xs font-semibold shadow">PhD</span>
                  <span className="inline-block px-4 py-1 rounded-full bg-mckinsey-gray-200 text-mckinsey-navy-900 text-xs font-semibold shadow">Engineer</span>
                </div>
                <p className="text-xl text-mckinsey-gray-600 font-light leading-relaxed mb-10 max-w-lg">{a.hero_desc}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#experience" className="group inline-flex items-center gap-2 bg-mckinsey-navy-900 text-white px-8 py-4 rounded-full hover:bg-mckinsey-teal-600 transition-all duration-300">
                    {a.hero_cta_exp}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a href="/cv.pdf" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-mckinsey-gray-200 hover:border-mckinsey-navy-900 transition-all duration-300">
                    {a.hero_cta_cv}
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={200} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/portrait-academique.jpg" alt="Dr. Ihababdelbasset ANNAKI" fill className="object-cover hover:scale-105 transition-transform duration-700" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-mckinsey-navy-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="text-3xl font-light mb-2">Dr. Annaki</div>
                  <div className="text-white/80 text-sm">PhD in Artificial Intelligence</div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-[200px] hidden lg:block">
                <div className="text-4xl font-light text-mckinsey-navy-900 mb-1"><Counter end={10} suffix="+" /></div>
                <div className="text-xs text-mckinsey-gray-500 uppercase tracking-wider">Years of Experience</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 bg-mckinsey-gray-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn>
              <h2 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-6 tracking-tight">
                {a.exp_title.split(' ').slice(0, -1).join(' ')} <span className="font-normal text-mckinsey-teal-600">{a.exp_title.split(' ').slice(-1)}</span>
              </h2>
              <p className="text-xl text-mckinsey-gray-600 max-w-xl leading-relaxed">{a.exp_desc}</p>
            </FadeIn>
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-mckinsey-gray-200 to-transparent ml-12 mb-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {experiences.map((exp, index) => {
              let logo = null;
              if (exp.company.toLowerCase().includes('mohammed premier') || exp.description.toLowerCase().includes('esef')) {
                logo = logos.find(l => l.name.toLowerCase().includes('esef')) || logos.find(l => l.name.toLowerCase().includes('université'));
              } else if (exp.company.toLowerCase().includes('kertys')) {
                logo = logos.find(l => l.name.toLowerCase().includes('kertys'));
              } else if (exp.company.toLowerCase().includes('kaggle')) {
                logo = logos.find(l => l.name.toLowerCase().includes('kaggle'));
              } else if (exp.company.toLowerCase().includes('larsa')) {
                logo = logos.find(l => l.name.toLowerCase().includes('université'));
              }
              const isFirst = index === 0;
              const colSpan = isFirst ? 'md:col-span-8' : (index === 1 ? 'md:col-span-4' : 'md:col-span-6');
              return (
                <FadeIn key={exp.id} delay={index * 100} className={colSpan}>
                  <div className="group relative h-full p-8 lg:p-10 rounded-[2rem] bg-white border border-gray-100 hover:border-mckinsey-teal-200/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out overflow-hidden flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-mckinsey-teal-50/0 via-mckinsey-teal-50/0 to-mckinsey-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                        {logo ? (
                          <div className="relative w-20 h-20 flex-shrink-0 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <Image src={logo.src} alt={logo.alt} fill className="object-contain p-1" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-mckinsey-gray-50 flex items-center justify-center text-mckinsey-gray-400 group-hover:bg-mckinsey-teal-50 group-hover:text-mckinsey-teal-600 transition-colors">
                            <Briefcase className="w-8 h-8" />
                          </div>
                        )}
                        <div className="flex flex-col items-start">
                          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-mckinsey-teal-700 mb-3 bg-mckinsey-teal-50 px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3" />{exp.duration}
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-medium text-mckinsey-navy-900 group-hover:text-mckinsey-teal-700 transition-colors leading-tight mb-1">{exp.position}</h3>
                          <div className="text-lg text-mckinsey-gray-500 flex items-center gap-2">
                            {exp.company}<span className="w-1 h-1 rounded-full bg-gray-300" /><span className="text-sm text-mckinsey-gray-400">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-mckinsey-gray-600 leading-relaxed text-lg mb-8 max-w-3xl">{exp.description}</p>
                      <div className="mt-auto pt-6 border-t border-gray-50">
                        <div className="mb-4 inline-block">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mckinsey-navy-50 text-mckinsey-navy-700 text-xs font-bold border border-mckinsey-navy-100 uppercase tracking-wide">{exp.type}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-mckinsey-gray-50 text-mckinsey-gray-600 text-xs font-medium rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeIn>
              <h2 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-6 tracking-tight">
                {a.edu_title.split(' ').slice(0, -1).join(' ')} <span className="font-normal text-mckinsey-teal-600">{a.edu_title.split(' ').slice(-1)}</span>
              </h2>
              <p className="text-xl text-mckinsey-gray-600 max-w-xl leading-relaxed">{a.edu_desc}</p>
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {education.map((edu, idx) => {
              let logo = null;
              if (edu.institution.toLowerCase().includes('mohammed premier')) {
                logo = edu.degree.toLowerCase().includes('doctor') ? logos.find(l => l.name.toLowerCase().includes('université')) : logos.find(l => l.name.toLowerCase().includes('esef')) || logos.find(l => l.name.toLowerCase().includes('université'));
              } else if (edu.institution.toLowerCase().includes('insea')) {
                logo = logos.find(l => l.name.toLowerCase().includes('insea'));
              } else if (edu.institution.toLowerCase().includes('wharton')) {
                logo = logos.find(l => l.name.toLowerCase().includes('wharton'));
              }
              const colSpan = idx === 0 ? 'md:col-span-8' : (idx === 1 ? 'md:col-span-4' : 'md:col-span-6');
              return (
                <FadeIn key={edu.id} delay={idx * 100} className={colSpan}>
                  <div className="group relative h-full p-8 lg:p-10 rounded-[2rem] bg-white border border-gray-100 hover:border-mckinsey-teal-200/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out overflow-hidden flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-mckinsey-teal-50/0 to-mckinsey-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                        {logo ? (
                          <div className="relative w-20 h-20 flex-shrink-0 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <Image src={logo.src} alt={logo.alt} fill className="object-contain p-1" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-mckinsey-gray-50 flex items-center justify-center text-mckinsey-gray-400 group-hover:bg-mckinsey-teal-50 group-hover:text-mckinsey-teal-600 transition-colors">
                            <GraduationCap className="w-8 h-8" />
                          </div>
                        )}
                        <div className="flex flex-col items-start">
                          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-mckinsey-teal-700 mb-3 bg-mckinsey-teal-50 px-3 py-1 rounded-full">
                            <Calendar className="w-3 h-3" />{edu.duration}
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-medium text-mckinsey-navy-900 group-hover:text-mckinsey-teal-700 transition-colors leading-tight mb-1">{edu.institution}</h3>
                          <div className="text-lg text-mckinsey-gray-500">{edu.degree} in <span className="text-mckinsey-navy-700">{edu.field}</span></div>
                        </div>
                      </div>
                      <p className="text-mckinsey-gray-600 leading-relaxed text-lg mb-8 max-w-3xl">{edu.description}</p>
                      <div className="mt-auto pt-6 border-t border-gray-50">
                        {edu.grade && (
                          <div className="mb-4 inline-block">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />{edu.grade}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {edu.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="px-3 py-1.5 bg-mckinsey-gray-50 text-mckinsey-gray-600 text-xs font-medium rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-mckinsey-navy-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 6, label: a.stats_research },
              { end: 10, label: a.stats_publications },
              { end: 4, label: a.stats_projects },
              { end: 8, label: a.stats_digitalization },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="text-4xl lg:text-5xl font-light mb-2"><Counter end={s.end} suffix="+" /></div>
                <div className="text-sm text-mckinsey-gray-300 uppercase tracking-wider">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-light text-mckinsey-navy-900 mb-8 leading-tight">{a.cta_title}</h2>
            <p className="text-xl text-mckinsey-gray-600 font-light leading-relaxed mb-12 max-w-2xl mx-auto">{a.cta_desc}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={`/${lang}/contact`} className="group inline-flex items-center justify-center gap-3 bg-mckinsey-navy-900 text-white px-10 py-5 rounded-full hover:bg-mckinsey-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                {a.cta_btn}<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href={`/${lang}/publications`} className="group inline-flex items-center justify-center gap-3 bg-white text-mckinsey-navy-900 border border-gray-200 px-10 py-5 rounded-full hover:border-mckinsey-navy-900 transition-all duration-300">
                {a.cta_publications}<ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

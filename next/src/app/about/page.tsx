import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'À Propos | Dr. Ihababdelbasset Annaki',
  description: 'Découvrez le parcours académique et professionnel du Dr. Ihababdelbasset Annaki, expert en Intelligence Artificielle et développement avancé.',
};

// Experience data structure
interface Experience {
  id: string;
  company: string;
  logo?: string;
  position: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  skills: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 'ump-professor',
    company: 'Université Mohammed Premier Oujda',
    position: 'Assistant Professor',
    duration: 'Sep 2024 - Present',
    location: 'Oujda Metropolitan Area · On-site',
    type: 'Full-time',
    description: 'Maître de Conférences à l\'École Supérieure de l\'Éducation et de la Formation (ESEF), partie de l\'Université Mohammed Premier Oujda. Mon travail se concentre sur l\'enseignement et la recherche en Intelligence Artificielle et développement avancé, particulièrement dans le contexte des technologies éducatives et de l\'innovation.',
    skills: ['University Lecturing', 'Artificial Intelligence (AI)', 'Educational Technology'],
    current: true
  },
  {
    id: 'larsa-researcher',
    company: 'LARSA - Laboratory of Research in Applied Sciences',
    position: 'PhD & Researcher in AI & VR for Healthcare | Specializing in Neuroscience',
    duration: 'Jan 2020 - Present',
    location: 'Remote',
    type: 'Research',
    description: 'Chercheur en IA pionnier spécialisé dans les architectures d\'apprentissage profond de pointe, incluant les modèles transformers, l\'apprentissage par renforcement et la recherche d\'architecture neuronale. Expert en développement de systèmes de traitement du langage naturel état-de-l\'art, algorithmes de vision par ordinateur et modèles IA multimodaux. Dans mon travail, j\'exploite les technologies VR pour créer des environnements immersifs qui simulent des scénarios du monde réel pour l\'observation détaillée et l\'analyse des comportements de locomotion.',
    skills: ['Data Science', 'Virtual Reality (VR)', 'Machine Learning', 'Deep Learning', 'Neuroscience', 'Healthcare AI'],
    current: true
  },
  {
    id: 'kaggle-mentor',
    company: 'Kaggle',
    position: 'KaggleX BIPOC Mentor',
    duration: 'Aug 2023 - Nov 2023',
    location: 'Remote',
    type: 'Seasonal',
    description: 'Mentor BIPOC chez KaggleX, guidant la prochaine génération de pionniers en science des données. Partage de mon expertise en science des données, transformation numérique et blockchain avec des talents aspirants de divers horizons. Avec plus de 5 ans d\'expérience en VR et JavaScript, j\'apporte une perspective unique.',
    skills: ['Data Science', 'Teamwork', 'Mentorship']
  },
  {
    id: 'kertys-consultant',
    company: 'Kertys',
    position: 'Consultant, Strategic Business and Technology Intelligence',
    duration: 'Oct 2017 - Nov 2019',
    location: 'Casablanca, Morocco',
    type: 'Full-time',
    description: 'Expert en planification, gestion de contenu d\'entreprise (ECM) et Business Intelligence. Développeur Full-stack polyvalent avec expertise en ExpressJS, ReactJS, ElectronJS, React Native et visualisation de données avec D3.js. Portfolio de 7 projets remarquables avec collaborations dans 6 pays. Orchestration de stratégies de contenu transparentes et création de solutions personnalisées innovantes.',
    skills: ['Data Science', 'Digital Strategy', 'Full-stack Development', 'Business Intelligence', 'ECM']
  }
];

// Education data structure
interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade?: string;
  description: string;
  skills: string[];
}

const education: Education[] = [
  {
    id: 'ump-phd',
    institution: 'Université Mohammed Premier Oujda',
    degree: 'Doctor of Science',
    field: 'Artificial Intelligence and Data Science for Neuroscience',
    duration: 'Jan 2020 - May 2024',
    grade: 'PhD with Highest Honors',
    description: 'Candidat au doctorat et chercheur dédié dans le domaine dynamique de la science des données (DS) et de l\'intelligence artificielle (IA), repoussant les limites de l\'innovation depuis le prestigieux Laboratoire de Recherche en Sciences Appliquées (LARSA). Spécialisé dans l\'apprentissage profond des séries temporelles et le développement de techniques avancées de clustering et de classification.',
    skills: ['Data Analytics and Visualization', 'Project Management', 'Data Science', 'Research', 'Artificial Intelligence (AI)']
  },
  {
    id: 'wharton',
    institution: 'The Wharton School',
    degree: 'Non-degree',
    field: 'Entrepreneurship/Entrepreneurial Studies',
    duration: 'Jun 2021 - Dec 2021',
    description: 'Programme de spécialisation en entrepreneuriat en ligne de Wharton couvrant la conception, la conception, l\'organisation et la gestion de nouvelles entreprises. Cette série de cinq cours est conçue pour vous emmener de l\'identification des opportunités au lancement, à la croissance, au financement et à la rentabilité.',
    skills: ['Entrepreneurship', 'Start-up Ventures', 'Project Management', 'Fundraising']
  },
  {
    id: 'insea',
    institution: 'Institut National de Statistique et d\'Économie Appliquée (INSEA)',
    degree: 'Diploma as State Engineer',
    field: 'Ingénierie de données et informatique décisionnelle',
    duration: '2014 - 2017',
    description: 'Formation permettant à l\'ingénieur informatique de l\'INSEA de se concentrer sur la conception et la production de systèmes d\'information décisionnels. Cette option se concentre sur les nouvelles technologies BI (Business Intelligence), Big Data et Cloud Computing.',
    skills: ['Data Science', 'Business Intelligence', 'Big Data', 'Cloud Computing']
  },
  {
    id: 'cpge',
    institution: 'CPGE - Classes préparatoires aux grandes écoles',
    degree: 'Classes Préparatoires',
    field: 'Mathematics and Physics',
    duration: 'Sep 2012 - Jul 2014',
    description: 'Formation intensive en mathématiques et physique préparant aux concours des grandes écoles d\'ingénieurs.',
    skills: ['Mathematics', 'Physics', 'Analytical Thinking']
  }
];

function HeroSection() {
  return (
  <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 relative overflow-hidden pt-20 transition-colors">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-purple-500/20 to-transparent -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-gradient-to-b from-green-500/20 to-transparent rotate-12"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Parcours Académique & Professionnel
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tighter leading-none">
              À Propos de
              <br />
              <span className="font-bold text-black">
                Dr. Annaki
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Découvrez mon parcours unique qui combine excellence académique, recherche de pointe 
              et impact pratique dans le domaine de l&apos;Intelligence Artificielle et des technologies avancées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#experience"
                className="bg-black hover:bg-gray-800 text-white font-medium py-4 px-8 transition-all duration-200 text-sm uppercase tracking-wider text-center"
              >
                Expérience Professionnelle
              </Link>
              <Link
                href="#education"
                className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-medium py-4 px-8 transition-all duration-200 text-sm uppercase tracking-wider text-center"
              >
                Formation Académique
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden shadow-lg">
              <Image
                src="/portrait-academique.jpg"
                alt="Dr. Ihababdelbasset Annaki"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-black/5 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Parcours Professionnel
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-12 leading-tight max-w-4xl">
            Expérience <span className="font-bold">Professionnelle</span>
          </h2>
        </div>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="group relative">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-3">
                  <div className="sticky top-8">
                    <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-bold text-black">{exp.company}</h3>
                      {exp.current && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{exp.duration}</div>
                    <div className="text-xs text-gray-400 mb-2">{exp.location}</div>
                    <div className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs uppercase tracking-wider">
                      {exp.type}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-9">
                  <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-2xl font-light text-black mb-6 leading-tight">
                      {exp.position}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connector line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 lg:left-24 top-20 w-px h-16 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
  <section id="education" className="py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-8">
            Formation Académique
          </div>
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-12 leading-tight max-w-4xl">
            Parcours <span className="font-bold">Académique</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div key={edu.id} className="group bg-gray-50 p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{edu.institution}</h3>
                <div className="text-lg text-gray-700 mb-1">{edu.degree}</div>
                <div className="text-base text-gray-600 mb-2">{edu.field}</div>
                <div className="text-sm text-gray-500 mb-2">{edu.duration}</div>
                {edu.grade && (
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded text-xs uppercase tracking-wider">
                    {edu.grade}
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {edu.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {edu.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-light mb-4">8+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Années d&apos;Expérience</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light mb-4">10+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Publications</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light mb-4">6</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Pays de Collaboration</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light mb-4">3</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Domaines d&apos;Expertise</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-8 leading-tight">
          Collaborons sur l&apos;Avenir de l&apos;
          <span className="font-bold">Intelligence Artificielle</span>
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
          Mon parcours unique combine recherche académique de pointe, expertise technique pratique 
          et passion pour l&apos;innovation. Explorons ensemble les possibilités de collaboration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-black hover:bg-gray-800 text-white font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Discutons d&apos;un Projet
          </Link>
          
          <Link
            href="/publications"
            className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-medium py-4 px-12 transition-all duration-200 text-sm uppercase tracking-wider"
          >
            Voir mes Publications
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <EducationSection />
      <StatsSection />
      <CTASection />
    </>
  );
}

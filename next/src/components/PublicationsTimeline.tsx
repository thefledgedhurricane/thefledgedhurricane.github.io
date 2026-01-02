'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const publications = [
  {
    year: 2025,
    title: 'Computational Analysis of Human Locomotor Patterns in Virtual Carpet Paradigm™ Using Ant Colony Algorithm',
    authors: 'Annaki I., Rahmoune M.',
    journal: 'Lecture Notes in Networks and Systems',
    doi: 'https://doi.org/10.1007/978-3-031-90921-4_40',
    citations: 0,
  },
  {
    year: 2024,
    title: 'Overview of Data Augmentation Techniques in Time Series Analysis',
    authors: 'Annaki I., Rahmoune M., Bourhaleb M.',
    journal: 'International Journal of Advanced Computer Science and Applications',
    doi: 'https://doi.org/10.14569/IJACSA.2024.01501118',
    citations: 7,
  },
];

export default function PublicationsTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = timeline.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 bg-luxury-charcoal-950 border-t border-luxury-charcoal-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white mb-6">
              Publications
            </h2>
            <p className="text-luxury-charcoal-400 text-lg max-w-xl font-light">
              Contributions à la recherche en IA et Neurosciences.
            </p>
          </div>
          <Link 
            href="/publications" 
            className="group flex items-center gap-3 text-luxury-gold-400 uppercase tracking-widest text-sm hover:text-luxury-gold-500 transition-colors"
          >
            Bibliographie complète
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        <div ref={timelineRef} className="space-y-12">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="timeline-item opacity-0 group border-b border-luxury-charcoal-900 pb-12 last:border-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="grid md:grid-cols-[100px_1fr] gap-8">
                <div className="text-luxury-gold-500 font-mono text-sm pt-2">
                  {pub.year}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-luxury-gold-400 transition-colors duration-300">
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  </h3>
                  <div className="text-luxury-charcoal-400 font-light mb-2">
                    {pub.authors}
                  </div>
                  <div className="text-sm text-luxury-charcoal-500 italic">
                    {pub.journal}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .timeline-item:nth-child(1) { animation-delay: 0.1s; }
        .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
}

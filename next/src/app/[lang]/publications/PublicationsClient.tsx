'use client';

import { useState } from 'react';

export interface Publication {
  id: string;
  title: string;
  authors: string;
  year: string;
  journal: string;
  doi: string;
  citedBy: number;
  type: string;
  abstract: string;
  keywords: string[];
  link: string;
}

interface PublicationsClientProps {
  dict: { publications?: Record<string, string> };
  publications: Publication[];
}

export default function PublicationsClient({ dict, publications }: PublicationsClientProps) {
  const p = dict.publications || {};
  
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [filterYear, setFilterYear] = useState<string>('all');
  
  const years = ['all', ...Array.from(new Set(publications.map(pub => pub.year))).sort().reverse()];
  
  const filteredPublications = filterYear === 'all' 
    ? publications 
    : publications.filter(pub => pub.year === filterYear);

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citedBy, 0);

  if (selectedPublication) {
    return (
      <div className="min-h-screen bg-white py-32">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => setSelectedPublication(null)}
            className="mb-12 flex items-center gap-3 text-mckinsey-navy-600 hover:text-mckinsey-navy-700 transition-colors text-sm tracking-normal"
          >
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            {p.back_to_list || 'Retour aux publications'}
          </button>

          <div className="bg-white border border-gray-200 p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-gray-100 text-mckinsey-navy-600 text-xs tracking-wider border border-gray-200">
                {selectedPublication.type}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs tracking-wider border border-gray-200">
                {selectedPublication.year}
              </span>
              {selectedPublication.citedBy > 0 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs tracking-wider border border-gray-200">
                  {selectedPublication.citedBy} {p.citations_short || 'citations'}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-sans font-medium text-gray-900 mb-6 leading-tight">
              {selectedPublication.title}
            </h1>

            <p className="text-mckinsey-teal-500 mb-6 font-normal text-lg">
              {selectedPublication.authors}
            </p>

            <p className="text-lg text-mckinsey-gray-600 mb-8 italic font-sans border-l-2 border-mckinsey-teal-500/30 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
              {selectedPublication.journal}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {selectedPublication.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-white text-mckinsey-gray-700 rounded-full text-xs border border-white/5"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <h2 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-4">
                {p.abstract_label || 'Abstract'}
              </h2>
              <p className="text-mckinsey-gray-600 leading-relaxed font-normal">
                {selectedPublication.abstract}
              </p>
            </div>

            <div className="flex gap-6 pt-8 border-t border-white/5">
              <a
                href={selectedPublication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-mckinsey-teal-500 hover:text-mckinsey-navy-800 transition-colors tracking-normal text-xs font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {p.view_scopus || 'View on Scopus'}
              </a>
              {selectedPublication.doi && (
                <a
                  href={`https://doi.org/${selectedPublication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-mckinsey-gray-700 hover:text-mckinsey-navy-800 transition-colors tracking-normal text-xs font-medium"
                >
                  DOI: {selectedPublication.doi}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-mckinsey-teal-500/20 rounded-full text-xs tracking-normal text-mckinsey-teal-500 mb-8">
            <div className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full"></div>
            {p.badge || 'Recherche'}
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-medium text-mckinsey-navy-800 mb-8">
            {p.title || 'Publications'} <span className="text-mckinsey-teal-500 italic">&amp;</span> {p.title_gradient || 'Travaux'}
          </h1>
          <p className="text-xl text-mckinsey-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
            {p.desc || 'Publications scientifiques et travaux de recherche'}
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 border-y border-white/5 py-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {publications.length}
              </div>
              <div className="text-xs tracking-normal text-mckinsey-teal-500">
                {p.publications_stat || 'Publications'}
              </div>
            </div>
            <div className="text-center px-12 border-x border-white/5">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {totalCitations}
              </div>
              <div className="text-xs tracking-normal text-mckinsey-teal-500">
                {p.citations_stat || 'Citations'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {years.length - 1}
              </div>
              <div className="text-xs tracking-normal text-mckinsey-teal-500">
                {p.years_stat || 'AnnÃ©es'}
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-4 flex-wrap mt-12">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setFilterYear(year)}
                className={`px-6 py-2 text-sm uppercase tracking-normal transition-all duration-300 ${
                  filterYear === year
                    ? 'bg-mckinsey-teal-500 text-mckinsey-navy-800 font-medium'
                    : 'bg-transparent text-mckinsey-gray-700 hover:text-mckinsey-navy-800 border border-white/10 hover:border-mckinsey-teal-500/50'
                }`}
              >
                {year === 'all' ? (p.filter_all || 'Toutes') : year}
              </button>
            ))}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <article
              key={pub.id}
              className="group bg-mckinsey-gray-50 border border-white/5 p-8 hover:border-mckinsey-teal-500/30 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedPublication(pub)}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-mckinsey-teal-500 text-xs tracking-wider font-medium">
                      {pub.year}
                    </span>
                    <span className="w-1 h-1 bg-mckinsey-gray-300 rounded-full"></span>
                    <span className="text-mckinsey-gray-700 text-xs tracking-wider">
                      {pub.type}
                    </span>
                    {pub.citedBy > 0 && (
                      <>
                        <span className="w-1 h-1 bg-mckinsey-gray-300 rounded-full"></span>
                        <span className="text-mckinsey-gray-700 text-xs tracking-wider">
                          {pub.citedBy} {p.citations_short || 'citations'}
                        </span>
                      </>
                    )}
                  </div>

                  <h2 className="text-2xl font-sans font-medium mb-3 text-mckinsey-navy-800 group-hover:text-mckinsey-teal-500 transition-colors">
                    {pub.title}
                  </h2>

                  <p className="text-mckinsey-gray-600 text-sm mb-3 font-normal">
                    {pub.authors}
                  </p>

                  <p className="text-mckinsey-gray-700 text-sm italic mb-6 font-sans">
                    {pub.journal}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {pub.keywords.slice(0, 4).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-white text-mckinsey-gray-600 rounded text-xs border border-white/5"
                      >
                        {keyword}
                      </span>
                    ))}
                    {pub.keywords.length > 4 && (
                      <span className="px-2 py-1 bg-white text-mckinsey-gray-600 rounded text-xs border border-white/5">
                        +{pub.keywords.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/5 text-mckinsey-teal-500 group-hover:bg-mckinsey-teal-500 group-hover:text-mckinsey-navy-800 transition-all duration-500">
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}



'use client';
import { useState } from 'react';
import { Metadata } from 'next';

interface Publication {
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

const publications: Publication[] = [
  {
    id: '2025-ant-colony',
    title: 'Computational Analysis of Human Locomotor Patterns in Virtual Carpet Paradigm™ Using Ant Colony Algorithm',
    authors: 'Annaki I.; Rahmoune M.',
    year: '2025',
    journal: 'Lecture Notes in Networks and Systems, Vol. 1397',
    doi: '10.1007/978-3-031-90921-4_40',
    citedBy: 0,
    type: 'Conference paper',
    abstract: 'In this paper, we study human locomotor patterns using the Virtual Carpet Paradigm™, a neuropsychological assessment in virtual reality. This setup captures participants\' movements as raw spatial data, which we analyze using kinematic methods. By applying the Ant Colony Optimization algorithm, we identify 3 distinct clusters of navigation behaviors. The algorithm distinguishes between individuals with cognitive spatial impairments and healthy participants. These findings highlight key behavioral differences and support earlier research.',
    keywords: ['Ant colony optimization', 'Cognitive impairments', 'Kinematic analysis', 'Spatial memory assessment', 'Virtual reality navigation'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-105007526886&doi=10.1007%2f978-3-031-90921-4_40&partnerID=40'
  },
  {
    id: '2024-data-augmentation',
    title: 'Overview of Data Augmentation Techniques in Time Series Analysis',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.',
    year: '2024',
    journal: 'International Journal of Advanced Computer Science and Applications, Vol. 15(1)',
    doi: '10.14569/IJACSA.2024.01501118',
    citedBy: 7,
    type: 'Article',
    abstract: 'Time series data analysis is vital in numerous fields, driven by advancements in deep learning and machine learning. This paper presents a comprehensive overview of data augmentation techniques in time series analysis, with a specific focus on their applications within deep learning and machine learning. We commence with a systematic methodology for literature selection, curating 757 articles from prominent databases. Subsequent sections delve into various data augmentation techniques, encompassing traditional approaches like interpolation and advanced methods like Synthetic Data Generation, Generative Adversarial Networks (GANs), and Variational Autoencoders (VAEs).',
    keywords: ['data augmentation', 'deep learning', 'machine learning', 'synthetic data generation', 'Time series'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85184990793&doi=10.14569%2fIJACSA.2024.01501118&partnerID=40'
  },
  {
    id: '2023-joint-unsupervised',
    title: 'Joint Unsupervised Deep Temporal Clustering for Modeling Human Behavior in Vestibular Dysfunction: A Study of Navigation Pattern',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Rahmoun N.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2023',
    journal: 'Lecture Notes in Networks and Systems, Vol. 669',
    doi: '10.1007/978-3-031-29860-8_96',
    citedBy: 0,
    type: 'Conference paper',
    abstract: 'Human behavior modeling aims to extract and understand patterns of behavior in one\'s daily life. Our proposed method utilizes deep time series clustering architectures, in which we employ auto-encoders to extract features and then cluster our data using unsupervised machine learning techniques. This approach will provide us with initial insights into human navigation patterns and meaningful clustering. Our developed framework combines unsupervised learning with a dataset obtained from a neuropsychological evaluation in a virtual reality setting called "The VR Magic Carpet".',
    keywords: ['Artificial Intelligence', 'Cognitive Impairments', 'Deep time-series clustering', 'Deep-Learning', 'Neuropsychological assessments', 'Virtual Reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85161441625&doi=10.1007%2f978-3-031-29860-8_96&partnerID=40'
  },
  {
    id: '2023-spatiotemporal',
    title: 'Spatiotemporal Clustering of Human Locomotion Neuropsychological Assessment in Virtual Reality Using Multi-step Model',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2023',
    journal: 'Lecture Notes in Networks and Systems, Vol. 669',
    doi: '10.1007/978-3-031-29860-8_98',
    citedBy: 0,
    type: 'Conference paper',
    abstract: 'In this study, We implemented a spatiotemporal clustering approach to analyze the outcome of a virtual reality human navigation neuropsychological assessment (the VR Magic Carpet). Our main objective was to establish a clustering of participants using a deep multi-step clustering model on velocity signals extracted during clinical trials. We used a multi-step neural network architecture to analyze the feature extraction and the clustering stage separately. This method enabled us to comprehend, to a certain extent, the clustering results.',
    keywords: ['Artificial Intelligence', 'Cognitive Impairments', 'Deep time-series clustering', 'Deep-Learning', 'Neuropsychological assessments', 'Virtual Reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85161421059&doi=10.1007%2f978-3-031-29860-8_98&partnerID=40'
  },
  {
    id: '2023-kmeans',
    title: 'Computational Analysis of Human Navigation Trajectories in the VR Magic Carpet ™ Using K-Means',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.',
    year: '2023',
    journal: 'Lecture Notes in Electrical Engineering, Vol. 954',
    doi: '10.1007/978-981-19-6223-3_9',
    citedBy: 1,
    type: 'Conference paper',
    abstract: 'In this research, we use unsupervised machine learning clustering techniques, notably K-means, to explore human navigation using the VR Magic Carpet. This is a variant of the Corsi Block Tapping task (CBT) that was carried out within the experimental framework of virtual reality. Our previous research found three distinct groups. However, the classification remained unclear. Based on this premise, we used K-means to distinguish patients\' navigation behavior from that of healthy people, highlighting the most significant differences.',
    keywords: ['Artificial intelligence', 'Cognitive impairments', 'Machine learning', 'Neuropsychological assessments', 'Virtual reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85159466173&doi=10.1007%2f978-981-19-6223-3_9&partnerID=40'
  },
  {
    id: '2023-mlp',
    title: 'Evaluating the Efficiency of Multilayer Perceptron Neural Network Architecture in Classifying Cognitive Impairments Related to Human Bipedal Spatial Navigation',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2023',
    journal: 'Lecture Notes in Networks and Systems, Vol. 668',
    doi: '10.1007/978-3-031-29857-8_6',
    citedBy: 0,
    type: 'Conference paper',
    abstract: 'In this study, We evaluated the efficiency of Multilayer perceptron for classification tasks related to cognitive impairments assessed in a virtual reality environment and on spatial data, "The VR Magic carpet". We used multilayer perceptron (MLP) architectures to benefit from using layers for feature extraction on velocity time series and solve our classification problem. The experimental results of the model in this study provide an enhancement because it can distinguish with more accuracy between healthy individuals and patients.',
    keywords: ['Artificial Intelligence', 'Cognitive Impairments', 'Deep-Learning', 'Multilayer perceptron', 'Neuropsychological assessments', 'Virtual Reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85161400308&doi=10.1007%2f978-3-031-29857-8_6&partnerID=40'
  },
  {
    id: '2023-residual',
    title: 'Residual Neural Network Architecture for Identifying Vestibular Disease Based on Head Kinematic Characteristics (Velocity)',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2023',
    journal: 'Lecture Notes in Networks and Systems, Vol. 669',
    doi: '10.1007/978-3-031-29860-8_94',
    citedBy: 0,
    type: 'Conference paper',
    abstract: 'In this paper, we assess human navigation in a virtual reality neuropsychological test named the VR magic carpet. We used residual neural network topologies, with layers used for feature extraction and classification, to establish an identification model for vestibular dysfunction. The experimental results of the model in this study demonstrate an improvement since they more accurately distinguish between healthy and patients.',
    keywords: ['Artificial Intelligence', 'Cognitive Impairments', 'Deep-Learning', 'Neuropsychological assessments', 'Residual neural network', 'Virtual Reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85161427925&doi=10.1007%2f978-3-031-29860-8_94&partnerID=40'
  },
  {
    id: '2022-clustering',
    title: 'Clustering analysis of human navigation trajectories in a visuospatial memory locomotor task using K-Means and hierarchical agglomerative clustering',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Berrich J.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2022',
    journal: 'E3S Web of Conferences, Vol. 351',
    doi: '10.1051/e3sconf/202235101042',
    citedBy: 31,
    type: 'Conference paper',
    abstract: 'Throughout this study, we employed unsupervised machine learning clustering algorithms, namely K-Means and hierarchical agglomerative clustering (HAC), to explore human locomotion and wayfinding using a VR Magic Carpet (VMC), a table test version known as the Corsi Block Tapping task (CBT). The participants were required to memorize a sequence of target positions projected on the rug and walk to each target figuring in the displayed sequence. We utilized K-Means and HAC to distinguish the navigation behavior of patients from normal individuals.',
    keywords: ['Machine Learning', 'Clustering', 'Virtual Reality', 'Navigation', 'Cognitive Assessment'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85144673002&doi=10.1051%2fe3sconf%2f202235101042&partnerID=40'
  },
  {
    id: '2022-dbscan',
    title: 'Computational Analysis of Human Navigation in a VR Spatial Memory Locomotor Assessment Using Density-Based Clustering Algorithm of Applications with Noise DBSCAN',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Rahmoun N.; Zaoui M.; Castilla A.; Berthoz A.; Cohen B.',
    year: '2022',
    journal: 'Lecture Notes in Networks and Systems, Vol. 455',
    doi: '10.1007/978-3-031-02447-4_20',
    citedBy: 10,
    type: 'Conference paper',
    abstract: 'In this study, we explore human navigation as evaluated by the VR Magic Carpet TM (VMC), a variation of the Corsi Block Tapping task (CBT), employing Density-based spatial clustering of applications with noise (DBSCAN). We utilized DBSCAN to compare patients\' navigation behavior to healthy individuals, highlighting the most notable differences and assessing our existing classifiers. Our research aims to produce insights that may help clinicians and neuroscientists adopt machine learning, especially clustering algorithms, to identify cognitive impairments.',
    keywords: ['Artificial intelligence', 'Cognitive impairments', 'DBSCAN', 'Human navigation', 'Machine-learning', 'Neuropsychological assessments', 'Virtual reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85130378102&doi=10.1007%2f978-3-031-02447-4_20&partnerID=40'
  },
  {
    id: '2021-computational',
    title: 'Computational Analysis of Human Navigation Trajectories in a Spatial Memory Locomotor Task',
    authors: 'Annaki I.; Rahmoune M.; Bourhaleb M.; Berrich J.; Zaoui M.; Ferro A.C.; Berthoz A.',
    year: '2021',
    journal: 'Lecture Notes in Networks and Systems, Vol. 211',
    doi: '10.1007/978-3-030-73882-2_22',
    citedBy: 9,
    type: 'Conference paper',
    abstract: 'In this paper, we use computational tools to explore human navigation through an example of a visuomotor spatial memory locomotor task, the Walking Corsi task (WCT) variant from a well-known table test known as the Corsi Block Tapping task (CBT). This variant was performed using the "Virtual Carpet" ™ experimental setup. Generic tools that computational data analytics provides and through computer simulations by replicating visually this data allowed categorization of the different features of the behavior of the subjects providing a new powerful tool for both normal and pathological behavior characterization.',
    keywords: ['Artificial intelligence', 'Computer simulation', 'Corsi block tapping test', 'Data analytics', 'Human navigation', 'Virtual reality'],
    link: 'https://www.scopus.com/inward/record.uri?eid=2-s2.0-85111265202&doi=10.1007%2f978-3-030-73882-2_22&partnerID=40'
  }
];

export default function PublicationsPage() {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [filterYear, setFilterYear] = useState<string>('all');
  
  const years = ['all', ...Array.from(new Set(publications.map(p => p.year))).sort().reverse()];
  
  const filteredPublications = filterYear === 'all' 
    ? publications 
    : publications.filter(p => p.year === filterYear);

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citedBy, 0);

  if (selectedPublication) {
    return (
      <div className="min-h-screen bg-white py-32">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => setSelectedPublication(null)}
            className="mb-12 flex items-center gap-3 text-mckinsey-navy-600 hover:text-mckinsey-navy-700 transition-colors text-sm  tracking-normal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux publications
          </button>

          <div className="bg-white border border-gray-200 p-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-gray-100 text-mckinsey-navy-600 text-xs  tracking-wider border border-gray-200">
                {selectedPublication.type}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs  tracking-wider border border-gray-200">
                {selectedPublication.year}
              </span>
              {selectedPublication.citedBy > 0 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs  tracking-wider border border-gray-200">
                  {selectedPublication.citedBy} citations
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-sans font-medium text-gray-900 mb-6 leading-tight">
              {selectedPublication.title}
            </h1>

            <p className="text-mckinsey-teal-500 mb-6 font-normal text-lg">
              {selectedPublication.authors}
            </p>

            <p className="text-lg text-mckinsey-gray-600 mb-8 italic font-sans border-l-2 border-mckinsey-teal-500/30 pl-4">
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
              <h2 className="text-xl font-sans font-medium text-mckinsey-navy-800 mb-4">Abstract</h2>
              <p className="text-mckinsey-gray-600 leading-relaxed font-normal">
                {selectedPublication.abstract}
              </p>
            </div>

            <div className="flex gap-6 pt-8 border-t border-white/5">
              <a
                href={selectedPublication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-mckinsey-teal-500 hover:text-mckinsey-navy-800 transition-colors  tracking-normal text-xs font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Scopus
              </a>
              {selectedPublication.doi && (
                <a
                  href={`https://doi.org/${selectedPublication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-mckinsey-gray-700 hover:text-mckinsey-navy-800 transition-colors  tracking-normal text-xs font-medium"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-mckinsey-teal-500/20 rounded-full text-xs  tracking-normal text-mckinsey-teal-500 mb-8">
            <div className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full"></div>
            Recherche
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-medium text-mckinsey-navy-800 mb-8">
            Publications <span className="text-mckinsey-teal-500 italic">&</span> Travaux
          </h1>
          <p className="text-xl text-mckinsey-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Publications scientifiques et travaux de recherche en Intelligence Artificielle, 
            Réalité Virtuelle et Neuropsychologie
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 border-y border-white/5 py-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {publications.length}
              </div>
              <div className="text-xs  tracking-normal text-mckinsey-teal-500">Publications</div>
            </div>
            <div className="text-center px-12 border-x border-white/5">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {totalCitations}
              </div>
              <div className="text-xs  tracking-normal text-mckinsey-teal-500">Citations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-sans font-medium text-mckinsey-navy-800 mb-2">
                {years.length - 1}
              </div>
              <div className="text-xs  tracking-normal text-mckinsey-teal-500">Années</div>
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
                {year === 'all' ? 'Toutes' : year}
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
                    <span className="text-mckinsey-teal-500 text-xs  tracking-wider font-medium">
                      {pub.year}
                    </span>
                    <span className="w-1 h-1 bg-mckinsey-gray-300 rounded-full"></span>
                    <span className="text-mckinsey-gray-700 text-xs  tracking-wider">
                      {pub.type}
                    </span>
                    {pub.citedBy > 0 && (
                      <>
                        <span className="w-1 h-1 bg-mckinsey-gray-300 rounded-full"></span>
                        <span className="text-mckinsey-gray-700 text-xs  tracking-wider">
                          {pub.citedBy} citations
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
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
'use client';

import dynamic from 'next/dynamic';

const CourseOverview = dynamic(() => import('@/components/lms/CourseOverview'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500 font-light">Chargement du tableau de bord...</div>
    </div>
  ),
});

export default function CoursePageClient(props: any) {
  return <CourseOverview {...props} />;
}

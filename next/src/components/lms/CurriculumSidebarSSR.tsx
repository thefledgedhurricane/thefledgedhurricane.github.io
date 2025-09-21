import { learningPaths, courseModules } from '@/lib/curriculum-structure';
import CurriculumSidebarFixed from './CurriculumSidebarFixed';

export default function CurriculumSidebarSSR() {
  return (
    <CurriculumSidebarFixed 
      learningPaths={learningPaths}
      courseModules={courseModules}
    />
  );
}
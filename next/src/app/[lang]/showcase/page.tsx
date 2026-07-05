import { Metadata } from 'next';
import { locales, type Locale } from '@/lib/dictionaries';
import ShowcaseClient from './ShowcaseClient';


const showcaseText = {
  ar: {
    title: "الغرفة الصفية الغامرة (واقع افتراضي)",
    desc: "ادخل إلى صف ثلاثي الأبعاد/واقع افتراضي: اضبط الإضاءة، غير لون الجدران وتنقّل بالانتقال الآني.",
  },
  fr: {
    title: "Immersive Classroom (VR)",
    desc: "Entrez dans une salle de classe 3D/VR: ajustez l’éclairage, changez la couleur des murs et déplacez-vous par téléportation.",
  },
  en: {
    title: "Immersive Classroom (VR)",
    desc: "Step into a 3D/VR classroom: adjust lighting, change wall colors, and move around using teleportation.",
  },
  es: {
    title: "Aula Inmersiva (RV)",
    desc: "Ingrese a un aula 3D/RV: ajuste la iluminación, cambie el color de las paredes y muévase por teletransportación.",
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = showcaseText[lang] || showcaseText.en;
  return {
    title: t.title,
    description: t.desc,
  };
}

export default async function ShowcasePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = showcaseText[lang] || showcaseText.en;

  return (
    <div className="flex-1 min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight mb-3 text-mckinsey-navy-900">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          {t.desc}
        </p>
      </section>

      <div className="border-t border-gray-100">
        <ShowcaseClient lang={lang} />
      </div>
    </div>
  );
}

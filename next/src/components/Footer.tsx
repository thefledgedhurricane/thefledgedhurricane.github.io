export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © {year} Dr. Ihababdelbasset ANNAKI. Tous droits réservés.
        </div>
        <div className="opacity-80">
          Propulsé par Next.js & Sanity. Thème accessible et optimisé performance.
        </div>
      </div>
    </footer>
  );
}

'use client';

export default function ProgressBar({ percent }: { percent: number }) {
  const pct = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
        style={{ width: pct + '%' }}
      />
    </div>
  );
}

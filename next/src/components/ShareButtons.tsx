"use client";

import React from 'react';

type Props = {
  url: string;
  title: string;
  summary?: string;
  className?: string;
};

export default function ShareButtons({ url, title, summary = '', className = '' }: Props) {
  const shareData = { title, text: summary || title, url };

  const onNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (e) {
      // user cancelled; no-op
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Optional: toast could be added later
    } catch (e) {}
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary || '');

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {typeof navigator !== 'undefined' && (navigator as any).share && (
        <button
          onClick={onNativeShare}
          className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          aria-label="Partager"
        >
          Partager
        </button>
      )}
      <a
        className="inline-flex items-center px-3 py-1.5 rounded-md bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity"
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur X (Twitter)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
          <path d="M18.244 2H21.5l-7.51 8.583L23.5 22h-6.9l-5.4-6.54L4.9 22H1.64l8.05-9.2L.5 2h7.05l4.91 5.98L18.244 2Zm-1.21 18.2h1.92L7.05 3.68H5.01l12.023 16.52Z"/>
        </svg>
        X
      </a>
      <a
        className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#0A66C2] text-white text-sm font-medium hover:brightness-110 transition"
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v1.97h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.37c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.45 1.66-2.45 3.37V23h-4V8.5z"/>
        </svg>
        LinkedIn
      </a>
      <button
        onClick={onCopy}
        className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Copier le lien"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        Copier le lien
      </button>
    </div>
  );
}

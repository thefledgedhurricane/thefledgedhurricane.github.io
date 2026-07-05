'use client';

import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}

const modalText = {
  ar: { title: 'تم إرسال الرسالة', message: 'تم استلام رسالتك بنجاح! سأرد عليك في أقرب وقت ممكن.', follow: 'في انتظار ذلك، يمكنك متابعتي على:', close: 'إغلاق' },
  fr: { title: 'Message envoyé', message: 'Votre message a bien été reçu ! Je vous répondrai dans les plus brefs délais.', follow: "En attendant, n'hésitez pas à me suivre sur :", close: 'Fermer' },
  en: { title: 'Message sent', message: 'Your message was received successfully! I will reply as soon as possible.', follow: 'In the meantime, feel free to follow me on:', close: 'Close' },
  es: { title: 'Mensaje enviado', message: '¡Tu mensaje se recibió correctamente! Responderé lo antes posible.', follow: 'Mientras tanto, puedes seguirme en:', close: 'Cerrar' },
} satisfies Record<Locale, { title: string; message: string; follow: string; close: string }>;

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ihababdelbasset-annaki/' },
  { label: 'GitHub', href: 'https://github.com/thefledgedhurricane/' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Ihababdelbasset-Annaki' },
];

export default function SuccessModal({ isOpen, onClose, lang }: SuccessModalProps) {
  const t = modalText[lang];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="success-title">
      <button className="absolute inset-0 bg-luxury-charcoal-900/80 backdrop-blur-sm" onClick={onClose} aria-label={t.close} />
      <div className="relative w-full max-w-md bg-white dark:bg-luxury-charcoal-950 p-8 shadow-2xl border border-luxury-charcoal-100 dark:border-luxury-charcoal-800">
        <button type="button" className="absolute top-5 end-5 text-gray-400 hover:text-gray-700" onClick={onClose} aria-label={t.close}>
          <X className="h-5 w-5" />
        </button>
        <CheckCircle2 className="h-10 w-10 text-luxury-gold-600 mb-5" />
        <h3 id="success-title" className="text-xl font-serif font-medium text-luxury-charcoal-900 dark:text-white">{t.title}</h3>
        <p className="mt-3 text-sm text-gray-500">{t.message}</p>
        <p className="mt-6 text-sm text-gray-600">{t.follow}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200">
              {link.label}
            </a>
          ))}
        </div>
        <button type="button" className="mt-7 w-full bg-mckinsey-navy-900 px-4 py-3 text-sm font-medium text-white hover:bg-mckinsey-teal-600" onClick={onClose}>
          {t.close}
        </button>
      </div>
    </div>
  );
}

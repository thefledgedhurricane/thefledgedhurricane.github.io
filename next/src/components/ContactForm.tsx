'use client';

import { useState } from 'react';
import { z } from 'zod';
import type { Locale } from '@/lib/dictionaries';
import SuccessModal from './SuccessModal';

const uiText = {
  ar: {
    namePlaceholder: 'اسمك الكامل', emailPlaceholder: 'بريدك الإلكتروني', subjectPlaceholder: 'ما موضوع رسالتك؟', messagePlaceholder: 'اكتب رسالتك...',
    sending: 'جارٍ الإرسال...', error: 'حدث خطأ. يرجى المحاولة مجددًا أو التواصل معي مباشرة عبر البريد الإلكتروني.',
    nameError: 'يجب ألا يقل الاسم عن حرفين', emailError: 'يرجى إدخال بريد إلكتروني صحيح', subjectError: 'يجب ألا يقل الموضوع عن 5 أحرف', messageError: 'يجب ألا تقل الرسالة عن 10 أحرف',
  },
  fr: {
    namePlaceholder: 'Votre nom complet', emailPlaceholder: 'votre.email@exemple.com', subjectPlaceholder: "De quoi s'agit-il ?", messagePlaceholder: 'Votre message...',
    sending: 'Envoi en cours...', error: 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.',
    nameError: 'Le nom doit contenir au moins 2 caractères', emailError: 'Veuillez saisir une adresse email valide', subjectError: 'Le sujet doit contenir au moins 5 caractères', messageError: 'Le message doit contenir au moins 10 caractères',
  },
  en: {
    namePlaceholder: 'Your full name', emailPlaceholder: 'your.email@example.com', subjectPlaceholder: 'What would you like to discuss?', messagePlaceholder: 'Your message...',
    sending: 'Sending...', error: 'Something went wrong. Please try again or contact me directly by email.',
    nameError: 'Name must be at least 2 characters', emailError: 'Please enter a valid email address', subjectError: 'Subject must be at least 5 characters', messageError: 'Message must be at least 10 characters',
  },
  es: {
    namePlaceholder: 'Tu nombre completo', emailPlaceholder: 'tu.correo@ejemplo.com', subjectPlaceholder: '¿De qué te gustaría hablar?', messagePlaceholder: 'Tu mensaje...',
    sending: 'Enviando...', error: 'Se produjo un error. Inténtalo de nuevo o contáctame directamente por correo electrónico.',
    nameError: 'El nombre debe tener al menos 2 caracteres', emailError: 'Introduce una dirección de correo válida', subjectError: 'El asunto debe tener al menos 5 caracteres', messageError: 'El mensaje debe tener al menos 10 caracteres',
  },
} satisfies Record<Locale, Record<string, string>>;

function schemaFor(lang: Locale) {
  const t = uiText[lang];
  return z.object({
    name: z.string().min(2, t.nameError),
    email: z.string().email(t.emailError),
    subject: z.string().min(5, t.subjectError),
    message: z.string().min(10, t.messageError),
    honeypot: z.string().max(0, 'Bot detected'),
  });
}

type ContactFormData = z.infer<ReturnType<typeof schemaFor>>;
type ContactCopy = { form_name: string; form_email: string; form_subject: string; form_message: string; form_submit: string };

export default function ContactForm({ lang, copy }: { lang: Locale; copy: ContactCopy }) {
  const t = uiText[lang];
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    setErrors({});

    try {
      const validated = schemaFor(lang).parse(formData);
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) throw new Error('Form endpoint is not configured');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: validated.name, email: validated.email, subject: validated.subject, message: validated.message }),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setShowSuccessModal(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        for (const issue of error.issues) {
          const field = issue.path[0] as keyof ContactFormData;
          if (field) fieldErrors[field] = issue.message;
        }
        setErrors(fieldErrors);
      } else {
        setSubmitError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', label: copy.form_name, placeholder: t.namePlaceholder },
    { name: 'email', type: 'email', label: copy.form_email, placeholder: t.emailPlaceholder },
    { name: 'subject', type: 'text', label: copy.form_subject, placeholder: t.subjectPlaceholder },
  ] as const;

  const inputClass = 'w-full bg-transparent border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700 py-3 text-luxury-charcoal-900 dark:text-white focus:border-luxury-gold-500 focus:outline-none transition-colors duration-300 placeholder-luxury-charcoal-300 dark:placeholder-luxury-charcoal-600';
  const labelClass = 'block text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2';

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} method="POST" className="space-y-8">
        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

        {fields.map((field) => (
          <div className="group" key={field.name}>
            <label htmlFor={field.name} className={labelClass}>{field.label}</label>
            <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} className={inputClass} placeholder={field.placeholder} required />
            {errors[field.name] && <p className="mt-2 text-xs text-red-500">{errors[field.name]}</p>}
          </div>
        ))}

        <div className="group">
          <label htmlFor="message" className={labelClass}>{copy.form_message}</label>
          <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder={t.messagePlaceholder} required />
          {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-luxury-charcoal-900 dark:bg-white text-white dark:text-luxury-charcoal-900 text-sm uppercase tracking-widest hover:bg-luxury-gold-600 dark:hover:bg-luxury-gold-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t.sending : copy.form_submit}
        </button>

        {submitError && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"><p className="text-red-800 dark:text-red-200 text-sm text-center">{t.error}</p></div>}
      </form>

      <SuccessModal lang={lang} isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}

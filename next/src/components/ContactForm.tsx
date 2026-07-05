'use client';

import { useState } from 'react';
import { z } from 'zod';
import type { Locale } from '@/lib/dictionaries';
import SuccessModal from './SuccessModal';

export type ContactCopy = {
  form_name: string; form_email: string; form_subject: string; form_message: string; form_submit: string;
  form_name_placeholder: string; form_email_placeholder: string; form_subject_placeholder: string; form_message_placeholder: string;
  form_sending: string; form_error: string; form_name_error: string; form_email_error: string;
  form_subject_error: string; form_message_error: string; success_title: string; success_message: string;
  success_follow: string; success_close: string;
};

function schemaFor(copy: ContactCopy) {
  return z.object({
    name: z.string().min(2, copy.form_name_error),
    email: z.string().email(copy.form_email_error),
    subject: z.string().min(5, copy.form_subject_error),
    message: z.string().min(10, copy.form_message_error),
    honeypot: z.string().max(0, 'Bot detected'),
  });
}

type FormData = z.infer<ReturnType<typeof schemaFor>>;
type FieldName = 'name' | 'email' | 'subject';

export default function ContactForm({ lang, copy }: { lang: Locale; copy: ContactCopy }) {
  const [data, setData] = useState<FormData>({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true); setSubmitError(false); setErrors({});
    try {
      const valid = schemaFor(copy).parse(data);
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) throw new Error('Form endpoint is not configured');
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: valid.name, email: valid.email, subject: valid.subject, message: valid.message }),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      setData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const nextErrors: Partial<Record<keyof FormData, string>> = {};
        for (const issue of error.issues) nextErrors[issue.path[0] as keyof FormData] = issue.message;
        setErrors(nextErrors);
      } else setSubmitError(true);
    } finally { setSubmitting(false); }
  };

  const fields: { name: FieldName; type: string; label: string; placeholder: string }[] = [
    { name: 'name', type: 'text', label: copy.form_name, placeholder: copy.form_name_placeholder },
    { name: 'email', type: 'email', label: copy.form_email, placeholder: copy.form_email_placeholder },
    { name: 'subject', type: 'text', label: copy.form_subject, placeholder: copy.form_subject_placeholder },
  ];
  const inputClass = 'w-full bg-transparent border-b border-luxury-charcoal-200 py-3 focus:border-luxury-gold-500 focus:outline-none';
  const labelClass = 'block text-xs uppercase tracking-widest text-luxury-charcoal-500 mb-2';

  return <div className="w-full">
    <form onSubmit={submit} className="space-y-8">
      <input type="text" name="honeypot" value={data.honeypot} onChange={change} className="hidden" tabIndex={-1} autoComplete="off" />
      {fields.map((field) => <div key={field.name}>
        <label htmlFor={field.name} className={labelClass}>{field.label}</label>
        <input {...field} id={field.name} value={data[field.name]} onChange={change} className={inputClass} required />
        {errors[field.name] && <p className="mt-2 text-xs text-red-500">{errors[field.name]}</p>}
      </div>)}
      <div>
        <label htmlFor="message" className={labelClass}>{copy.form_message}</label>
        <textarea id="message" name="message" rows={4} value={data.message} onChange={change} className={`${inputClass} resize-none`} placeholder={copy.form_message_placeholder} required />
        {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
      </div>
      <button type="submit" disabled={submitting} className="w-full py-4 bg-luxury-charcoal-900 text-white text-sm uppercase tracking-widest disabled:opacity-50">
        {submitting ? copy.form_sending : copy.form_submit}
      </button>
      {submitError && <p className="p-4 bg-red-50 text-red-800 text-sm text-center">{copy.form_error}</p>}
    </form>
    <SuccessModal lang={lang} copy={copy} isOpen={success} onClose={() => setSuccess(false)} />
  </div>;
}

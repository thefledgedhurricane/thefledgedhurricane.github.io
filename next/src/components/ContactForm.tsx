'use client';

import { useState } from 'react';
import { z } from 'zod';
import SuccessModal from './SuccessModal';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected') // Honeypot field for spam protection
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus('idle');

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Check honeypot (spam protection)
      if (validatedData.honeypot) {
        throw new Error('Spam detected');
      }

      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      // Debug logging
      console.log('Formspree endpoint:', endpoint);
      
      if (!endpoint) {
        console.error('NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set');
        throw new Error('Formspree endpoint not configured. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your environment variables.');
      }

      // Submit to Formspree
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Formspree error response:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        });
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }

      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} method="POST" className="space-y-8">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="group">
          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700 py-3 text-luxury-charcoal-900 dark:text-white focus:border-luxury-gold-500 focus:outline-none transition-colors duration-300 placeholder-luxury-charcoal-300 dark:placeholder-luxury-charcoal-600"
            placeholder="Votre nom complet"
            required
          />
          {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="group">
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700 py-3 text-luxury-charcoal-900 dark:text-white focus:border-luxury-gold-500 focus:outline-none transition-colors duration-300 placeholder-luxury-charcoal-300 dark:placeholder-luxury-charcoal-600"
            placeholder="votre.email@exemple.com"
            required
          />
          {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="group">
          <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2">
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700 py-3 text-luxury-charcoal-900 dark:text-white focus:border-luxury-gold-500 focus:outline-none transition-colors duration-300 placeholder-luxury-charcoal-300 dark:placeholder-luxury-charcoal-600"
            placeholder="De quoi s'agit-il ?"
            required
          />
          {errors.subject && <p className="mt-2 text-xs text-red-500">{errors.subject}</p>}
        </div>

        <div className="group">
          <label htmlFor="message" className="block text-xs uppercase tracking-widest text-luxury-charcoal-500 dark:text-luxury-charcoal-400 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-luxury-charcoal-200 dark:border-luxury-charcoal-700 py-3 text-luxury-charcoal-900 dark:text-white focus:border-luxury-gold-500 focus:outline-none transition-colors duration-300 placeholder-luxury-charcoal-300 dark:placeholder-luxury-charcoal-600 resize-none"
            placeholder="Votre message..."
            required
          />
          {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-luxury-charcoal-900 dark:bg-white text-white dark:text-luxury-charcoal-900 text-sm uppercase tracking-widest hover:bg-luxury-gold-600 dark:hover:bg-luxury-gold-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 text-sm text-center">
              Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.
            </p>
          </div>
        )}
      </form>
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
     </div>
   );
 }
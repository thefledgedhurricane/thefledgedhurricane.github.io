import { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MapPin, ArrowRight, Linkedin, Github } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Contact | Dr. Ihababdelbasset Annaki',
  description: 'Get in touch with me for collaborations, questions, or just to say hello.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-mckinsey-teal-100 selection:text-mckinsey-navy-900 pt-24">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mckinsey-teal-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mckinsey-navy-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 py-12 lg:py-24">
          
          {/* Left Column: Info */}
          <div className="space-y-12">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-mckinsey-gray-200 rounded-full text-xs font-medium text-mckinsey-navy-800 mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 bg-mckinsey-teal-500 rounded-full animate-pulse" />
                Contact
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-light text-mckinsey-navy-900 mb-8 leading-[0.95] tracking-tight">
                Let's start a <br />
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-mckinsey-navy-800 to-mckinsey-teal-600">
                  conversation
                </span>
              </h1>
              
              <p className="text-xl text-mckinsey-gray-600 font-light leading-relaxed max-w-lg">
                Whether you're interested in research collaboration, academic consulting, or just want to say hello, I'm always open to discussing new ideas.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-8">
                <div className="group flex items-start gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-mckinsey-teal-200 hover:shadow-lg transition-all duration-300">
                  <div className="p-4 bg-mckinsey-gray-50 rounded-xl group-hover:bg-mckinsey-teal-50 transition-colors">
                    <Mail className="w-6 h-6 text-mckinsey-navy-700 group-hover:text-mckinsey-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-1">Email</h3>
                    <a href="mailto:contact@example.com" className="text-mckinsey-gray-600 hover:text-mckinsey-teal-600 transition-colors text-lg">
                      contact@example.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-6 bg-white rounded-2xl border border-gray-100 hover:border-mckinsey-teal-200 hover:shadow-lg transition-all duration-300">
                  <div className="p-4 bg-mckinsey-gray-50 rounded-xl group-hover:bg-mckinsey-teal-50 transition-colors">
                    <MapPin className="w-6 h-6 text-mckinsey-navy-700 group-hover:text-mckinsey-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-mckinsey-navy-900 mb-1">Location</h3>
                    <p className="text-mckinsey-gray-600 text-lg">
                      Morocco
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-sm font-medium text-mckinsey-gray-500 uppercase tracking-wider mb-6">Connect on Social</h3>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-mckinsey-gray-50 rounded-full hover:bg-mckinsey-navy-900 hover:text-white transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-mckinsey-gray-50 rounded-full hover:bg-mckinsey-navy-900 hover:text-white transition-all duration-300">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Form */}
          <FadeIn delay={300} className="lg:mt-12">
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl shadow-mckinsey-navy-900/5 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mckinsey-teal-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
              <div className="relative z-10">
                <h3 className="text-2xl font-light text-mckinsey-navy-900 mb-8">Send a message</h3>
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
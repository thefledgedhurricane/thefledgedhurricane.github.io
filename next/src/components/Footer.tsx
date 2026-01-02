import Link from 'next/link';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-mckinsey-navy-950 text-white pt-0 pb-12 border-t border-mckinsey-navy-900 overflow-hidden">
      {/* Background image Unsplash + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop"
          alt="AI Innovation and Collaboration"
          className="w-full h-full object-cover object-center brightness-[0.3]"
          loading="lazy"
        />
      </div>
      {/* CTA fusionnée */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        <h2 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight">
          Let's innovate <br className="hidden md:block"/> the future together
        </h2>
        <p className="text-lg lg:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
          Interested in AI/VR consulting, research collaboration, or speaking engagements?
        </p>
        <Link 
          href="/contact"
          className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-mckinsey-navy-900 text-lg font-medium rounded-full hover:bg-mckinsey-teal-50 transition-all hover:scale-105 duration-300"
        >
          Start a conversation
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block text-3xl font-light tracking-tight mb-8">
              iAnnaki <span className="font-normal text-mckinsey-teal-400">Edu & Research</span>
            </Link>
            <p className="text-xl text-mckinsey-gray-300 max-w-md font-light leading-relaxed mb-8">
              Advancing the frontiers of artificial intelligence and virtual reality through rigorous research and innovative education.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-mckinsey-teal-500 hover:text-white transition-all duration-300 group">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-lg font-medium mb-8 text-mckinsey-teal-400">Explore</h4>
            <ul className="space-y-4">
              {['About', 'Research', 'Teaching', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-white hover:text-mckinsey-teal-400 transition-colors flex items-center gap-2 group font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-mckinsey-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-lg font-medium mb-8 text-mckinsey-teal-400">Legal & Info</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white hover:text-mckinsey-teal-400 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-mckinsey-navy-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-mckinsey-gray-500">
            © {year} Dr. Ihababdelbasset Annaki. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-sm text-mckinsey-gray-500">
            <span>Designed with</span>
            <span className="text-red-500">♥</span>
            <span>for the Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

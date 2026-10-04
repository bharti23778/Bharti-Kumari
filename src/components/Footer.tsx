import React from 'react';
import { Compass, Github, Linkedin, Twitter, Instagram, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDashboard }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-indigo-100" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Students Trust
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              “Discover opportunities. Build your future.”
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              One trusted place for college and university students to discover internships, scholarships, hackathons, fellowships, and research programs.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links 1: Opportunities */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Opportunities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('explore-section')} className="hover:text-white transition-colors">
                  Internships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore-section')} className="hover:text-white transition-colors">
                  Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore-section')} className="hover:text-white transition-colors">
                  Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore-section')} className="hover:text-white transition-colors">
                  Research Grants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore-section')} className="hover:text-white transition-colors">
                  Fellowships
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('categories-section')} className="hover:text-white transition-colors">
                  All Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deadlines-section')} className="hover:text-white transition-colors">
                  Deadline Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recommendations-section')} className="hover:text-white transition-colors">
                  Personalized For You
                </button>
              </li>
              <li>
                <button onClick={onOpenDashboard} className="hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 3: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('trust-section')} className="hover:text-white transition-colors">
                  Verification Standards
                </button>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('trust-section'); }} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert('For student queries or verification requests, contact support@studentstrust.org'); }} className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Students Trust values student privacy: No tracking cookies or commercial ad reselling.'); }} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Students Trust Terms: 100% Free platform for students.'); }} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Students Trust. Built for students.</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <span>Empowering university discovery worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

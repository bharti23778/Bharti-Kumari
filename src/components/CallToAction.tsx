import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface CallToActionProps {
  onExploreClick: () => void;
  onDashboardClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  onExploreClick,
  onDashboardClick
}) => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Join thousands of ambitious students today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
          Stop searching everywhere. Start discovering.
        </h2>

        <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
          Your next internship, scholarship, hackathon or research opportunity could be one search away.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-white hover:bg-slate-100 text-indigo-900 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Compass className="w-5 h-5 text-indigo-600" />
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onDashboardClick}
            className="px-6 py-4 bg-indigo-950/60 hover:bg-indigo-950/80 text-white border border-indigo-400/40 rounded-xl font-semibold transition-colors text-sm sm:text-base focus:outline-none"
          >
            Open Student Dashboard
          </button>
        </div>

        <p className="text-xs text-indigo-300 pt-2">
          Free forever for college & university students · No credit card or fee required
        </p>

      </div>
    </section>
  );
};

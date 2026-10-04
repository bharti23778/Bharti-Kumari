import React from 'react';
import { Sparkles } from 'lucide-react';

export const StudentStatistics: React.FC = () => {
  const stats = [
    { value: '10K+', label: 'Curated Opportunities', sub: 'Internships, hackathons & research' },
    { value: '5K+', label: 'Active Students', sub: 'Across 120+ colleges & universities' },
    { value: '500+', label: 'Organizations', sub: 'Tech leaders, labs & foundations' },
    { value: '20+', label: 'Academic Categories', sub: 'Engineering, design, science & finance' }
  ];

  return (
    <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {stats.map((stat, idx) => (
            <div key={idx} className={`pt-4 lg:pt-0 ${idx > 0 ? 'lg:pl-6' : ''}`}>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400 tracking-tight font-sans tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Honest MVP footnote */}
        <div className="text-center mt-8 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
          Demo prototype platform metrics for hackathon evaluation · Verified partner data mock
        </div>

      </div>
    </section>
  );
};

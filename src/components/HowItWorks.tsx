import React from 'react';
import { Search, Filter, Kanban, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartExploring: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartExploring }) => {
  const steps = [
    {
      step: '01',
      title: 'Discover',
      description: 'Search thousands of student opportunities in one place without jumping between fragmented job boards and campus chats.',
      icon: Search,
      accent: 'from-blue-600 to-indigo-600'
    },
    {
      step: '02',
      title: 'Filter',
      description: 'Find opportunities based on your interests, skills, eligibility and deadline with instant multi-facet filters.',
      icon: Filter,
      accent: 'from-indigo-600 to-purple-600'
    },
    {
      step: '03',
      title: 'Apply & Track',
      description: 'Save opportunities, track deadlines and manage applications across their full lifecycle in your student dashboard.',
      icon: Kanban,
      accent: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span>Simple 3-Step Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            How Students Trust Works
          </h2>
          <p className="text-base text-slate-500">
            From initial discovery to landing your offer letter or research grant.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-200/90 hover:border-indigo-200 transition-all duration-200 flex flex-col justify-between relative group hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-indigo-600">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-indigo-200 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 shadow-2xs transition-colors">
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs text-slate-400 font-medium">
                  {idx === 0 && 'Instant keyword & type query'}
                  {idx === 1 && 'Domain-specific match score'}
                  {idx === 2 && 'Personal kanban pipeline tracker'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center mt-12">
          <button
            onClick={onStartExploring}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>Start exploring opportunities now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

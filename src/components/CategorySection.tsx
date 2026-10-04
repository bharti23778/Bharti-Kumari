import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Microscope, 
  Terminal, 
  Presentation, 
  Trophy, 
  ArrowRight
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockOpportunities';
import { OpportunityType } from '../types';

interface CategorySectionProps {
  onSelectCategory: (category: OpportunityType) => void;
  selectedCategory: OpportunityType | 'All';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Microscope,
  Terminal,
  Presentation,
  Trophy
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  return (
    <section id="categories-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <span>Browse by Category</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Explore Opportunities
          </h2>
          <p className="text-base text-slate-600">
            Find opportunities that match your goals.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Briefcase;
            const isCurrent = selectedCategory === cat.type;

            return (
              <div
                key={cat.type}
                onClick={() => onSelectCategory(cat.type)}
                className={`group relative bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isCurrent 
                    ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/20' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top row: Icon and count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-700 group-hover:text-indigo-600 transition-colors`}>
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 tabular-nums">
                      {cat.count}
                    </span>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Card Action */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(cat.type);
                  }}
                  className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between cursor-pointer group-hover:border-indigo-100"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCategory(cat.type);
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors focus:outline-none"
                  >
                    <span>{isCurrent ? `Viewing Active ${cat.title}` : `Explore ${cat.title} & Apply Links`}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  {isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {cat.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

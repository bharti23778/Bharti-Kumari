import React from 'react';
import { 
  X, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Microscope, 
  Terminal, 
  Presentation, 
  Trophy, 
  Layers, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { OpportunityType } from '../types';
import { CATEGORIES_DATA } from '../data/mockOpportunities';

interface TypeMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedType: OpportunityType | 'All';
  onSelectType: (type: OpportunityType | 'All') => void;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  Internship: Briefcase,
  Scholarship: GraduationCap,
  Fellowship: Award,
  Hackathon: Code,
  Research: Microscope,
  'Coding Contest': Terminal,
  Workshop: Presentation,
  Competition: Trophy
};

export const TypeMenuDrawer: React.FC<TypeMenuDrawerProps> = ({
  isOpen,
  onClose,
  selectedType,
  onSelectType
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div 
        className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 z-10 animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* The 3 lines menu symbol */}
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex flex-col justify-center items-center gap-1 p-2 shadow-xs">
              <span className="w-4 h-0.5 bg-white rounded-full" />
              <span className="w-4 h-0.5 bg-white rounded-full" />
              <span className="w-4 h-0.5 bg-white rounded-full" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                Opportunity Types Menu
              </h3>
              <p className="text-[11px] text-slate-500">
                Browse programs by Type
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close type menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Types */}
        <div className="p-4 overflow-y-auto flex-1 space-y-1.5 divide-y divide-slate-100">
          
          {/* Option: All Types */}
          <button
            onClick={() => {
              onSelectType('All');
              onClose();
            }}
            className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between group ${
              selectedType === 'All'
                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold'
                : 'hover:bg-slate-50 text-slate-700 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                selectedType === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:text-indigo-600'
              }`}>
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">All Opportunity Types</span>
                <span className="text-[11px] text-slate-400">View complete catalog</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Individual Category Types */}
          <div className="pt-2 space-y-1.5">
            {CATEGORIES_DATA.map((cat) => {
              const IconComp = TYPE_ICONS[cat.type] || Briefcase;
              const isSelected = selectedType === cat.type;

              return (
                <button
                  key={cat.type}
                  onClick={() => {
                    onSelectType(cat.type);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{cat.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({cat.count})</span>
                      </div>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {cat.description}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Type Filter</span>
            <span className="text-[11px] text-indigo-600 font-bold">
              {selectedType === 'All' ? 'Showing All Types' : `Filtered by: ${selectedType}`}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

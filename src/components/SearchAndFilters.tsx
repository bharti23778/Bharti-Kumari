import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Briefcase, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  Cpu
} from 'lucide-react';
import { FilterState, OpportunityType } from '../types';

interface SearchAndFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalMatches: number;
  onSearchSubmit?: () => void;
  onOpenTypeMenu?: () => void;
}

const TYPE_OPTIONS: (OpportunityType | 'All')[] = [
  'All',
  'Internship',
  'Scholarship',
  'Fellowship',
  'Hackathon',
  'Research',
  'Coding Contest',
  'Workshop',
  'Competition'
];

const MODE_OPTIONS = ['All', 'Remote', 'Hybrid', 'On-site'] as const;

const FIELD_OPTIONS = [
  'All Fields',
  'Software & Tech',
  'AI & Data Science',
  'Research & Academic',
  'Engineering & Innovation',
  'Design & Creative',
  'Business & Entrepreneurship',
  'Finance & Business'
];

const ELIGIBILITY_OPTIONS = [
  'All Eligibility',
  'Undergraduates',
  'Graduates',
  'Women in Tech',
  'Open to All'
];

const DEADLINE_OPTIONS = [
  { label: 'Any Deadline', value: 'all' },
  { label: 'Closing in 7 Days (Urgent)', value: '7days' },
  { label: 'Closing in 14 Days', value: '14days' },
  { label: 'Next 30 Days', value: '30days' },
  { label: 'Next 60 Days', value: '60days' }
] as const;

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  setFilters,
  totalMatches,
  onSearchSubmit,
  onOpenTypeMenu
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(filters.searchQuery);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);
    setFilters(prev => ({ ...prev, searchQuery: val }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery: localQuery }));
    if (onSearchSubmit) onSearchSubmit();
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setLocalQuery('');
    setFilters({
      searchQuery: '',
      type: 'All',
      mode: 'All',
      field: 'All Fields',
      location: 'All',
      eligibility: 'All Eligibility',
      deadlineUrgency: 'all',
      fee: 'All'
    });
  };

  const activeFiltersCount = [
    filters.searchQuery ? 1 : 0,
    filters.type !== 'All' ? 1 : 0,
    filters.mode !== 'All' ? 1 : 0,
    filters.field !== 'All Fields' && filters.field !== '' ? 1 : 0,
    filters.eligibility !== 'All Eligibility' && filters.eligibility !== '' ? 1 : 0,
    filters.deadlineUrgency !== 'all' ? 1 : 0,
    filters.fee !== 'All' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div id="search-section" className="bg-white border-y border-slate-200 shadow-xs py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Main Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-slate-50 border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-100 rounded-2xl shadow-xs transition-all">
            
            <div className="flex items-center flex-1 px-3 py-2">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={localQuery}
                onChange={handleQueryChange}
                placeholder="Search internships, scholarships, hackathons, research opportunities..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-normal focus:outline-none"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalQuery('');
                    setFilters(prev => ({ ...prev, searchQuery: '' }));
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  aria-label="Clear search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Type Dropdown within Search bar */}
            <div className="hidden md:flex items-center border-l border-slate-200 pl-3 pr-2">
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as OpportunityType | 'All' }))}
                className="text-xs font-semibold text-slate-700 bg-transparent py-1.5 focus:outline-none cursor-pointer"
              >
                {TYPE_OPTIONS.map(type => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Categories' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit & Filter toggle buttons */}
            <div className="flex items-center gap-2 px-1">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium rounded-xl border transition-colors ${
                  showAdvancedFilters || activeFiltersCount > 0
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </form>

        {/* Quick Type Selection Pills (interactive segmented controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span 
            onClick={onOpenTypeMenu}
            className="text-slate-700 font-bold shrink-0 mr-1 text-[11px] inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg cursor-pointer transition-colors"
            title="Click to open Opportunity Types (3-lines menu)"
          >
            <span className="flex flex-col gap-[2px] w-2.5" aria-hidden="true">
              <span className="h-[1.5px] bg-slate-600 group-hover:bg-indigo-600 rounded-full w-full" />
              <span className="h-[1.5px] bg-indigo-600 rounded-full w-full" />
              <span className="h-[1.5px] bg-slate-600 group-hover:bg-indigo-600 rounded-full w-full" />
            </span>
            <span>Type:</span>
          </span>
          {TYPE_OPTIONS.map((t) => {
            const isSelected = filters.type === t;
            return (
              <button
                key={t}
                onClick={() => setFilters(prev => ({ ...prev, type: t }))}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {t === 'All' ? 'All Types' : t}
              </button>
            );
          })}
        </div>

        {/* Expanded Filter Panel */}
        {showAdvancedFilters && (
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                Refine by Specific Criteria
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Filter 1: Remote / On-site */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  Workplace Mode
                </label>
                <select
                  value={filters.mode}
                  onChange={(e) => setFilters(prev => ({ ...prev, mode: e.target.value as any }))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  {MODE_OPTIONS.map(m => (
                    <option key={m} value={m}>{m === 'All' ? 'All Modes (Remote/Hybrid/On-site)' : m}</option>
                  ))}
                </select>
              </div>

              {/* Filter 2: Field / Domain */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                  Field & Domain
                </label>
                <select
                  value={filters.field}
                  onChange={(e) => setFilters(prev => ({ ...prev, field: e.target.value }))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  {FIELD_OPTIONS.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Eligibility */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  Eligibility Target
                </label>
                <select
                  value={filters.eligibility}
                  onChange={(e) => setFilters(prev => ({ ...prev, eligibility: e.target.value }))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  {ELIGIBILITY_OPTIONS.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
              </div>

              {/* Filter 4: Deadline Urgency */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  Deadline Horizon
                </label>
                <select
                  value={filters.deadlineUrgency}
                  onChange={(e) => setFilters(prev => ({ ...prev, deadlineUrgency: e.target.value as any }))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:border-indigo-600"
                >
                  {DEADLINE_OPTIONS.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Additional toggle: Free / Paid */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200/80 gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Compensation & Prizes:
                </span>
                {(['All', 'Paid', 'Free'] as const).map(fee => (
                  <label key={fee} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="fee_filter"
                      checked={filters.fee === fee}
                      onChange={() => setFilters(prev => ({ ...prev, fee }))}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{fee === 'All' ? 'All Listings' : fee === 'Paid' ? 'Paid / Stipend / Cash Prizes' : 'Free Entry'}</span>
                  </label>
                ))}
              </div>

              <span className="text-slate-500 text-[11px]">
                Showing filtered results in real-time
              </span>
            </div>
          </div>
        )}

        {/* Results Count & Active Status Strip */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 tabular-nums text-sm">
              {totalMatches} {totalMatches === 1 ? 'Opportunity' : 'Opportunities'} Found
            </span>
            {activeFiltersCount > 0 && (
              <span className="text-slate-400">
                (Filtered by {activeFiltersCount} active {activeFiltersCount === 1 ? 'rule' : 'rules'})
              </span>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              Clear filters
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, Check, Compass, Sliders, ChevronRight } from 'lucide-react';
import { Opportunity } from '../types';
import { AVAILABLE_INTERESTS } from '../data/mockOpportunities';
import { calculateMatchScore } from '../utils/helpers';
import { OpportunityCard } from './OpportunityCard';

interface PersonalizedDiscoveryProps {
  selectedInterests: string[];
  onToggleInterest: (interest: string) => void;
  allOpportunities: Opportunity[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (opportunity: Opportunity) => void;
}

export const PersonalizedDiscovery: React.FC<PersonalizedDiscoveryProps> = ({
  selectedInterests,
  onToggleInterest,
  allOpportunities,
  bookmarkedIds,
  onToggleBookmark,
  onViewDetails
}) => {
  // Score and sort opportunities according to selected interests
  const scoredOpportunities = allOpportunities.map(opp => {
    const { score, matchedTags } = calculateMatchScore(opp, selectedInterests);
    return {
      opportunity: opp,
      score,
      matchedTags
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3); // top 3 recommendations

  return (
    <section id="recommendations-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-2xl mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tailored Algorithm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Opportunities For You
          </h2>
          <p className="text-base text-slate-600">
            Select your fields of interest to curate recommendations tuned specifically to your career ambitions.
          </p>
        </div>

        {/* Interactive Interest Picker Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs mb-10">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-700">
            <span>Select one or more domain interests:</span>
            <span className="text-indigo-600 font-bold">
              {selectedInterests.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => onToggleInterest(interest)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 focus:outline-none border ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtitle for recommendations */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Recommended for you
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked by semantic tag alignment with {selectedInterests.length > 0 ? selectedInterests.join(', ') : 'general student goals'}.
            </p>
          </div>
        </div>

        {/* Recommended Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoredOpportunities.map(({ opportunity, score, matchedTags }) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              isBookmarked={bookmarkedIds.includes(opportunity.id)}
              onToggleBookmark={onToggleBookmark}
              onViewDetails={onViewDetails}
              matchScore={score}
              highlightReason={matchedTags.length > 0 ? `Matches ${matchedTags.slice(0, 2).join(', ')}` : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

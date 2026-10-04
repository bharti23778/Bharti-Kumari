import React from 'react';
import { 
  Bookmark, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Opportunity } from '../types';
import { getDaysRemaining, formatDeadlineDate } from '../utils/helpers';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (opportunity: Opportunity) => void;
  matchScore?: number;
  highlightReason?: string;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  matchScore,
  highlightReason
}) => {
  const daysRemaining = getDaysRemaining(opportunity.deadline);
  const isUrgent = daysRemaining <= 7;
  const isApproaching = daysRemaining <= 15 && daysRemaining > 7;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between p-5 sm:p-6 relative">
      
      <div>
        {/* Top Header Row: Trust & Verification + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs">
            {/* Verification Label */}
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{opportunity.verificationBadge}</span>
            </span>

            {/* Opportunity Type Kicker */}
            <span className="text-slate-400">·</span>
            <span className="font-semibold text-indigo-700 text-xs">
              {opportunity.type}
            </span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(opportunity.id, e)}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isBookmarked
                ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isBookmarked ? 'Remove from saved' : 'Save opportunity'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Opportunity Title & Organization */}
        <div className="mb-2.5">
          <h3 
            onClick={() => onViewDetails(opportunity)}
            className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
          >
            {opportunity.title}
          </h3>
          <p className="text-sm font-semibold text-slate-600 mt-0.5">
            {opportunity.organization}
          </p>
        </div>

        {/* Clean Unboxed Metadata with Typographic Separators */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-3.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{opportunity.location}</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-medium text-slate-700">
            {opportunity.mode}
          </span>
          {opportunity.stipendOrPrize && (
            <>
              <span className="text-slate-300">·</span>
              <span className="font-bold text-emerald-700">
                {opportunity.stipendOrPrize}
              </span>
            </>
          )}
          <span className="text-slate-300">·</span>
          <span>{opportunity.duration}</span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {opportunity.shortDescription}
        </p>

        {/* Key Eligibility Summary */}
        <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-4">
          <span className="font-semibold text-slate-800">Eligibility: </span>
          <span>{opportunity.eligibility}</span>
        </div>

        {/* Optional Match Score Badge for Personalized Section */}
        {matchScore && (
          <div className="mb-3.5 flex items-center gap-1.5 text-xs text-indigo-700 font-semibold bg-indigo-50/80 px-2.5 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{matchScore}% Match for your profile</span>
            {highlightReason && <span className="text-slate-500 font-normal">({highlightReason})</span>}
          </div>
        )}
      </div>

      {/* Card Footer: Deadline & Action */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Deadline Urgency Indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          <Clock className={`w-3.5 h-3.5 ${
            isUrgent ? 'text-rose-600' : isApproaching ? 'text-amber-600' : 'text-slate-400'
          }`} />
          <span className="text-slate-500">
            Due {formatDeadlineDate(opportunity.deadline)}
          </span>
          <span className={`font-bold ml-1 ${
            isUrgent 
              ? 'text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded text-[11px]' 
              : isApproaching 
              ? 'text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded text-[11px]' 
              : 'text-slate-600'
          }`}>
            {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
          </span>
        </div>

        {/* Card Action Buttons: Details + Apply Directly */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onViewDetails(opportunity)}
            className="text-xs font-semibold text-slate-700 hover:text-indigo-700 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
          >
            Details
          </button>

          <a
            href={opportunity.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
            title="Apply directly on official portal"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};

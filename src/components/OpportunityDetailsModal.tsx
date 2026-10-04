import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Award,
  BookOpen,
  Briefcase,
  Check,
  Kanban,
  Phone
} from 'lucide-react';
import { Opportunity, ApplicationStatus } from '../types';
import { getDaysRemaining, formatDeadlineDate, calculateMatchScore } from '../utils/helpers';

interface OpportunityDetailsModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  userInterests: string[];
  onTrackApplication: (opp: Opportunity, status: ApplicationStatus) => void;
  currentTrackerStatus?: ApplicationStatus;
  candidatePhone?: string | null;
  onOpenCandidateRegistration?: () => void;
}

export const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  opportunity,
  onClose,
  isBookmarked,
  onToggleBookmark,
  userInterests,
  onTrackApplication,
  currentTrackerStatus,
  candidatePhone,
  onOpenCandidateRegistration
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(currentTrackerStatus || 'Saved');
  const [statusUpdatedToast, setStatusUpdatedToast] = useState(false);

  if (!opportunity) return null;

  const daysRemaining = getDaysRemaining(opportunity.deadline);
  const { score, matchedTags } = calculateMatchScore(opportunity, userInterests);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#' + opportunity.id);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleStatusChange = (status: ApplicationStatus) => {
    setSelectedStatus(status);
    onTrackApplication(opportunity, status);
    setStatusUpdatedToast(true);
    setTimeout(() => setStatusUpdatedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 via-white to-indigo-50/40 border-b border-slate-200 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{opportunity.verificationBadge}</span>
            </span>

            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              {opportunity.type}
            </span>

            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              Verified by {opportunity.verifiedBy}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {opportunity.title}
          </h2>

          <p className="text-base font-semibold text-slate-600 mt-1">
            {opportunity.organization}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{opportunity.location} ({opportunity.mode})</span>
            </div>

            {opportunity.stipendOrPrize && (
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{opportunity.stipendOrPrize}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Duration: {opportunity.duration}</span>
            </div>

            <div className="flex items-center gap-1.5 text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded">
              <Calendar className="w-3.5 h-3.5 text-rose-600" />
              <span>Deadline: {formatDeadlineDate(opportunity.deadline)} ({daysRemaining} days left)</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Personalized Relevance Box */}
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50/60 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Why this opportunity may be relevant to you ({score}% Match)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {matchedTags.length > 0 
                  ? `This position strongly aligns with your interest in ${matchedTags.join(' & ')}. The role allows direct hands-on project experience with ${opportunity.field}.`
                  : `Matches your current degree level and provides verified accreditation recognized across academic institutions.`
                }
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Overview & Scope
            </h4>
            <p className="leading-relaxed text-slate-600">
              {opportunity.fullDescription}
            </p>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Eligibility Criteria
            </h4>
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs sm:text-sm font-medium text-slate-800">
              {opportunity.eligibility}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Skills & Requirements
            </h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.skillsRequired.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits & Perks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Program Benefits & Grants
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {opportunity.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Dates Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Application Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {opportunity.importantDates.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">{item.label}:</span>
                  <span className="text-slate-500 font-mono text-[11px]">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Tracking Picker */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Kanban className="w-4 h-4 text-indigo-600" />
                Track Application in your Student Dashboard:
              </span>
              {statusUpdatedToast && (
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Updated!
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['Saved', 'Applied', 'Shortlisted', 'Interview', 'Selected'] as ApplicationStatus[]).map(st => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    selectedStatus === st
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
          {/* Candidate Phone Credential Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-200/90 text-xs">
            {candidatePhone ? (
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Applying with candidate phone: <strong className="font-mono text-slate-900">{candidatePhone}</strong>
                </span>
                <span className="hidden md:inline text-[11px] text-slate-500 font-medium">· Same credentials across all your devices</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-indigo-900">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Only phone number required to track and apply from any device.</span>
              </div>
            )}

            {onOpenCandidateRegistration && (
              <button
                type="button"
                onClick={onOpenCandidateRegistration}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline self-start sm:self-auto shrink-0"
              >
                {candidatePhone ? 'Switch Device / Number' : 'Register Phone'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(opportunity.id, e)}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isBookmarked 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
                <span>{isBookmarked ? 'Saved to Profile' : 'Save Opportunity'}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <a
              href={opportunity.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (selectedStatus === 'Saved') {
                  handleStatusChange('Applied');
                }
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-colors ml-auto"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

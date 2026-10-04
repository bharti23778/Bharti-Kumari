import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  ShieldCheck,
  Check,
  FileCheck2,
  Filter
} from 'lucide-react';
import { Opportunity, TrackedApplication } from '../types';
import { formatDeadlineDate, getDaysRemaining } from '../utils/helpers';

interface TopScholarshipDeadlineTrackerProps {
  opportunities: Opportunity[];
  trackedApplications: TrackedApplication[];
  onUpdateApplicationStatus: (opportunityId: string, status: any, notes?: string) => void;
  onViewDetails: (opportunity: Opportunity) => void;
}

export const TopScholarshipDeadlineTracker: React.FC<TopScholarshipDeadlineTrackerProps> = ({
  opportunities,
  trackedApplications,
  onUpdateApplicationStatus,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'applied' | 'eligible' | 'all'>('eligible');

  // Filter all scholarship opportunities
  const allScholarships = useMemo(() => {
    return opportunities.filter(opp => opp.type === 'Scholarship');
  }, [opportunities]);

  // Applied Scholarships: Matches trackedApplications where status is 'Applied', 'Shortlisted', 'Interview', etc.
  const appliedScholarships = useMemo(() => {
    return allScholarships
      .map(scholarship => {
        const tracked = trackedApplications.find(app => app.opportunityId === scholarship.id);
        return {
          scholarship,
          tracked: tracked || null,
          isApplied: tracked && (tracked.status === 'Applied' || tracked.status === 'Shortlisted' || tracked.status === 'Interview' || tracked.status === 'Selected')
        };
      })
      .filter(item => item.isApplied)
      .sort((a, b) => {
        return new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
      });
  }, [allScholarships, trackedApplications]);

  // Eligible Scholarships (Not applied yet, open for Indian students)
  const eligibleScholarships = useMemo(() => {
    return allScholarships
      .map(scholarship => {
        const tracked = trackedApplications.find(app => app.opportunityId === scholarship.id);
        const isAlreadyApplied = tracked && (tracked.status === 'Applied' || tracked.status === 'Shortlisted' || tracked.status === 'Interview' || tracked.status === 'Selected');
        return {
          scholarship,
          isAlreadyApplied,
          tracked
        };
      })
      .filter(item => !item.isAlreadyApplied)
      .sort((a, b) => {
        return new Date(a.scholarship.deadline).getTime() - new Date(b.scholarship.deadline).getTime();
      });
  }, [allScholarships, trackedApplications]);

  // Urgent upcoming deadline among open eligible scholarships
  const nextClosingScholarship = eligibleScholarships[0]?.scholarship;

  return (
    <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Top Header Row with Summary Counters & Collapse Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Title & Live Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-400" />
                  Live Scholarship Status & Deadlines
                </span>
                <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Applied & Eligible Scholarships Tracker</span>
              </h2>
            </div>
          </div>

          {/* Quick Counter Tabs & Expand/Collapse Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            
            {/* Tab: Applied Count */}
            <button
              onClick={() => {
                setActiveTab('applied');
                setIsExpanded(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'applied' && isExpanded
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-emerald-300'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Applied</span>
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-950/80 text-emerald-200 text-[10px] rounded-full font-mono">
                {appliedScholarships.length}
              </span>
            </button>

            {/* Tab: Eligible to Apply Count */}
            <button
              onClick={() => {
                setActiveTab('eligible');
                setIsExpanded(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                activeTab === 'eligible' && isExpanded
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-indigo-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Eligible to Apply</span>
              <span className="ml-1 px-1.5 py-0.2 bg-indigo-950/80 text-indigo-200 text-[10px] rounded-full font-mono">
                {eligibleScholarships.length}
              </span>
            </button>

            {/* Toggle Expand / Collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/10"
              title={isExpanded ? 'Collapse scholarship tracker' : 'Expand scholarship tracker'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>

        {/* Collapsed State: Sleek Summary Banner */}
        {!isExpanded && (
          <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {appliedScholarships.length} Scholarship Applied
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-indigo-300 font-semibold">
                {eligibleScholarships.length} Verified Scholarships Open for You
              </span>
              {nextClosingScholarship && (
                <>
                  <span className="hidden md:inline text-slate-500">|</span>
                  <span className="hidden md:flex items-center gap-1 text-amber-300">
                    <Clock className="w-3.5 h-3.5" /> Next deadline: {nextClosingScholarship.title.slice(0, 30)}... on {formatDeadlineDate(nextClosingScholarship.deadline)} at {nextClosingScholarship.deadlineTime || '11:59 PM IST'}
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="text-xs text-indigo-300 hover:text-white font-semibold underline flex items-center gap-1"
            >
              <span>View Timings & Apply Links</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Expanded State: Detailed Tab Content */}
        {isExpanded && (
          <div className="mt-4 pt-3.5 border-t border-white/10 space-y-4 animate-fadeIn">
            
            {/* Sub-header Context bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {activeTab === 'applied' 
                    ? `Showing ${appliedScholarships.length} scholarships you have applied for with live submission tracking and verification status.` 
                    : `Showing ${eligibleScholarships.length} verified national & corporate scholarships you are eligible for with exact closing dates and timings.`
                  }
                </span>
              </div>

              <div className="text-[11px] font-mono text-indigo-300 shrink-0">
                All timings listed in Indian Standard Time (IST)
              </div>
            </div>

            {/* TAB 1: APPLIED SCHOLARSHIPS */}
            {activeTab === 'applied' && (
              <div className="space-y-3">
                {appliedScholarships.length === 0 ? (
                  <div className="p-6 text-center bg-white/5 rounded-2xl border border-white/10 space-y-2">
                    <GraduationCap className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-bold text-slate-200">No scholarships marked as applied yet</p>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Explore the "Eligible to Apply" tab to view scholarships you qualify for, submit your application on the official portal, and mark them as applied here to track deadlines!
                    </p>
                    <button
                      onClick={() => setActiveTab('eligible')}
                      className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-1.5"
                    >
                      <span>Browse Eligible Scholarships</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {appliedScholarships.map(({ scholarship, tracked }) => {
                      const daysLeft = getDaysRemaining(scholarship.deadline);
                      const isUrgent = daysLeft <= 15;

                      return (
                        <div 
                          key={scholarship.id}
                          className="bg-white/10 hover:bg-white/15 border border-emerald-500/40 rounded-2xl p-4 transition-all flex flex-col justify-between"
                        >
                          <div>
                            {/* Top Badge Row */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold border border-emerald-500/40 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>{tracked?.status || 'Applied'}</span>
                              </span>

                              <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                                {tracked?.appliedDate ? `Applied: ${tracked.appliedDate}` : 'Application Submitted'}
                              </span>
                            </div>

                            {/* Title & Organization */}
                            <h4 className="text-sm font-bold text-white line-clamp-1">
                              {scholarship.title}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {scholarship.organization}
                            </p>

                            {/* Financial Grant */}
                            <div className="mt-2 py-1 px-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-xs font-semibold text-emerald-300 flex items-center justify-between">
                              <span>Scholarship Benefit:</span>
                              <strong className="text-white">{scholarship.stipendOrPrize}</strong>
                            </div>

                            {/* Notes / Reference */}
                            {tracked?.notes && (
                              <p className="mt-2 text-[11px] text-slate-300 bg-black/20 p-2 rounded-lg italic">
                                "{tracked.notes}"
                              </p>
                            )}
                          </div>

                          {/* Footer: Deadline Date & Precise Timing */}
                          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Closing Deadline: </span>
                              <strong className="text-amber-300 font-mono">
                                {formatDeadlineDate(scholarship.deadline)} at {scholarship.deadlineTime || '11:59 PM IST'}
                              </strong>
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                isUrgent ? 'bg-rose-500/30 text-rose-300' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {daysLeft}d left
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onViewDetails(scholarship)}
                                className="text-xs font-semibold text-indigo-300 hover:text-white underline"
                              >
                                View Guidelines
                              </button>

                              <a
                                href={scholarship.applicationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 flex items-center gap-1"
                                title="Check official portal status"
                              >
                                <span>Portal</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ELIGIBLE SCHOLARSHIPS TO APPLY */}
            {activeTab === 'eligible' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {eligibleScholarships.slice(0, 6).map(({ scholarship }) => {
                  const daysLeft = getDaysRemaining(scholarship.deadline);
                  const isUrgent = daysLeft <= 15;

                  return (
                    <div 
                      key={scholarship.id}
                      className="bg-white/10 hover:bg-white/15 border border-indigo-500/30 hover:border-indigo-400/60 rounded-2xl p-4 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Row: Eligibility Badge + Grant */}
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Eligible to Apply</span>
                          </span>

                          <span className="text-xs font-extrabold text-amber-300 font-mono">
                            {scholarship.stipendOrPrize}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h4 className="text-sm font-bold text-white line-clamp-1" title={scholarship.title}>
                          {scholarship.title}
                        </h4>
                        <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                          {scholarship.organization}
                        </p>

                        {/* Eligibility Criteria Snippet */}
                        <div className="mt-2 p-2 bg-indigo-950/50 border border-indigo-500/20 rounded-xl text-[11px] text-indigo-200">
                          <span className="font-semibold text-white">Eligibility: </span>
                          <span className="line-clamp-2">{scholarship.eligibility}</span>
                        </div>
                      </div>

                      {/* Bottom Section: Deadline Date, Timing & Direct Actions */}
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                        
                        {/* Deadline Date & Timing */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-slate-300">
                            <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-rose-400' : 'text-amber-400'}`} />
                            <span>Deadline:</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-amber-300 font-mono block">
                              {formatDeadlineDate(scholarship.deadline)}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              at {scholarship.deadlineTime || '11:59 PM IST'} ({daysLeft}d left)
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons: Apply Directly & Mark as Applied */}
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={scholarship.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm"
                            title="Open official scholarship application portal"
                          >
                            <span>Apply Now</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            onClick={() => {
                              onUpdateApplicationStatus(scholarship.id, 'Applied', `Applied via official portal on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.`);
                            }}
                            className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-indigo-200 hover:text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1 whitespace-nowrap"
                            title="Mark as Applied to track in Applied tab"
                          >
                            <PlusCircle className="w-3 h-3" />
                            <span>Mark Applied</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

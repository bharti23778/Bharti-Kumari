import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2, 
  Bookmark,
  Bell,
  ArrowUpRight
} from 'lucide-react';
import { Opportunity } from '../types';
import { getDaysRemaining, formatDeadlineDate } from '../utils/helpers';

interface DeadlineTrackerProps {
  opportunities: Opportunity[];
  bookmarkedIds: string[];
  onViewDetails: (opportunity: Opportunity) => void;
}

export const DeadlineTracker: React.FC<DeadlineTrackerProps> = ({
  opportunities,
  bookmarkedIds,
  onViewDetails
}) => {
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  // Sort by deadline urgency
  const sortedDeadlines = [...opportunities]
    .filter(opp => !filterSavedOnly || bookmarkedIds.includes(opp.id))
    .sort((a, b) => getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline));

  const displayList = expandedView ? sortedDeadlines : sortedDeadlines.slice(0, 4);

  const handleSetReminder = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminderToast(`Reminder set for: ${title}`);
    setTimeout(() => setReminderToast(null), 3500);
  };

  return (
    <section id="deadlines-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Urgency Monitor</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Never Miss a Deadline
            </h2>
            <p className="text-base text-slate-500 mt-1 max-w-xl">
              Track closing registration dates across hackathons, internships, fellowships, and scholarship grants.
            </p>
          </div>

          {/* Toggle saved vs all */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterSavedOnly(false)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                !filterSavedOnly 
                  ? 'bg-slate-900 border-slate-900 text-white' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Programs ({opportunities.length})
            </button>
            <button
              onClick={() => setFilterSavedOnly(true)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                filterSavedOnly 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3 h-3" />
              <span>My Saved ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Reminder Notification Banner if clicked */}
        {reminderToast && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{reminderToast} (Browser notification scheduled)</span>
          </div>
        )}

        {/* Deadlines Timeline / Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayList.map((opp) => {
            const daysLeft = getDaysRemaining(opp.deadline);
            const isCritical = daysLeft <= 7;
            const isSoon = daysLeft <= 15 && daysLeft > 7;

            return (
              <div
                key={opp.id}
                onClick={() => onViewDetails(opp)}
                className="group p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all bg-white flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-indigo-700">{opp.type}</span>
                      <span>·</span>
                      <span>{opp.organization}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {opp.title}
                    </h3>
                  </div>

                  {/* Urgency Badge */}
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 ${
                    isCritical 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : isSoon 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{daysLeft} days remaining</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Deadline: {formatDeadlineDate(opp.deadline)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleSetReminder(opp.title, e)}
                      className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                      title="Set reminder notification"
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-indigo-600 group-hover:underline font-semibold flex items-center gap-0.5">
                      Details <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Deadlines Trigger Button */}
        {sortedDeadlines.length > 4 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setExpandedView(!expandedView)}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <span>{expandedView ? 'Show Fewer Deadlines' : 'View All Deadlines'}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expandedView ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

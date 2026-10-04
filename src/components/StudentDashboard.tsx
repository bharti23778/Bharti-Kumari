import React, { useState } from 'react';
import { 
  Bookmark, 
  Sparkles, 
  Clock, 
  Kanban, 
  CheckCircle2, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Edit3, 
  Calendar,
  User,
  GraduationCap,
  LogOut,
  Users
} from 'lucide-react';
import { Opportunity, TrackedApplication, ApplicationStatus } from '../types';
import { OpportunityCard } from './OpportunityCard';
import { getDaysRemaining, formatDeadlineDate } from '../utils/helpers';

interface StudentDashboardProps {
  onBackToHome: () => void;
  savedOpportunities: Opportunity[];
  recommendedOpportunities: Opportunity[];
  trackedApplications: (TrackedApplication & { opportunity: Opportunity })[];
  onUpdateApplicationStatus: (appId: string, newStatus: ApplicationStatus, notes?: string) => void;
  onRemoveTrackedApplication: (appId: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (opportunity: Opportunity) => void;
  userName: string;
  userRole: string;
  userInstitution: string;
  selectedInterests: string[];
  onLogout?: () => void;
  onSwitchApplicant?: () => void;
}

const STATUS_COLUMNS: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: 'Saved', label: 'Saved', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { status: 'Applied', label: 'Applied', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { status: 'Shortlisted', label: 'Shortlisted', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { status: 'Interview', label: 'Interview', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { status: 'Selected', label: 'Selected / Offer', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { status: 'Rejected', label: 'Archived', color: 'bg-rose-50 text-rose-700 border-rose-200' }
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onBackToHome,
  savedOpportunities,
  recommendedOpportunities,
  trackedApplications,
  onUpdateApplicationStatus,
  onRemoveTrackedApplication,
  onToggleBookmark,
  onViewDetails,
  userName,
  userRole,
  userInstitution,
  selectedInterests,
  onLogout,
  onSwitchApplicant
}) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'saved' | 'recommended' | 'deadlines'>('tracker');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation & Profile Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Opportunities Discovery</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-500 hidden md:inline">
              Applicant: <strong className="text-slate-800">{userName}</strong>
            </span>

            {onSwitchApplicant && (
              <button
                onClick={onSwitchApplicant}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                title="Switch applicant account on this device"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Switch Applicant</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                title="Log out of this applicant session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-indigo-100 border border-indigo-200 shrink-0 shadow-xs">
              <img
                src="/src/assets/images/avatar_student_priya_1791094405888.jpg"
                alt={userName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome back, {userName} 👋
                </h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  Verified Student
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <span>{userRole}</span>
                <span>·</span>
                <span>{userInstitution}</span>
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="text-xs text-slate-400 mr-1">Interests:</span>
                {selectedInterests.map(interest => (
                  <span key={interest} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-center">
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 tabular-nums">
                {savedOpportunities.length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Saved</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                {trackedApplications.filter(a => a.status === 'Applied').length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Applied</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 tabular-nums">
                {trackedApplications.filter(a => a.status === 'Interview' || a.status === 'Selected').length}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">In Progress</div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tracker'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Application Tracker ({trackedApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Opportunities ({savedOpportunities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Recommended for You</span>
          </button>

          <button
            onClick={() => setActiveTab('deadlines')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'deadlines'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Upcoming Deadlines</span>
          </button>
        </div>

        {/* Tab 1: Application Tracker */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Application Pipeline</h2>
                <p className="text-xs text-slate-500">
                  Track stages from initial bookmarks to interviews and offers.
                </p>
              </div>
              <button
                onClick={onBackToHome}
                className="px-3.5 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Opportunities</span>
              </button>
            </div>

            {trackedApplications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <Kanban className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Your tracker is empty</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Browse opportunities and click "Save" or "Track Application" on any opportunity card to monitor your progress here.
                </p>
                <button
                  onClick={onBackToHome}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore Opportunities
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trackedApplications.map(app => {
                  const opp = app.opportunity;
                  const isEditingThis = editingNotesId === app.id;

                  return (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Status Select Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            {STATUS_COLUMNS.map(col => (
                              <option key={col.status} value={col.status}>
                                {col.label}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => onRemoveTrackedApplication(app.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Remove from tracker"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Title & Organization */}
                        <h3 
                          onClick={() => onViewDetails(opp)}
                          className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer leading-snug"
                        >
                          {opp.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {opp.organization} · {opp.type}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Deadline: {formatDeadlineDate(opp.deadline)}</span>
                        </div>

                        {/* Notes Section */}
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          {isEditingThis ? (
                            <div className="space-y-2">
                              <textarea
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add custom notes (e.g. submitted via portal, referral info)..."
                                className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:outline-none focus:border-indigo-600 h-16"
                              />
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-100 rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => {
                                    onUpdateApplicationStatus(app.id, app.status, tempNotes);
                                    setEditingNotesId(null);
                                  }}
                                  className="px-2 py-1 text-[11px] font-semibold bg-indigo-600 text-white rounded"
                                >
                                  Save Note
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setTempNotes(app.notes || '');
                                setEditingNotesId(app.id);
                              }}
                              className="group/note cursor-pointer p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-600 min-h-[38px] flex items-center justify-between"
                            >
                              <span className="italic">
                                {app.notes || '+ Add application notes or follow-up dates...'}
                              </span>
                              <Edit3 className="w-3 h-3 text-slate-400 group-hover/note:text-slate-600 shrink-0" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom: View Details & Apply link */}
                      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                        <button
                          onClick={() => onViewDetails(opp)}
                          className="font-semibold text-indigo-600 hover:underline"
                        >
                          View Full Details
                        </button>
                        <a
                          href={opp.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Opportunities */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Bookmarked Opportunities</h2>
              <p className="text-xs text-slate-500">
                Opportunities you saved for later review.
              </p>
            </div>

            {savedOpportunities.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No saved opportunities</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Click the bookmark icon on any opportunity card to save it to your student profile.
                </p>
                <button
                  onClick={onBackToHome}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore Opportunities
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOpportunities.map(opp => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isBookmarked={true}
                    onToggleBookmark={onToggleBookmark}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recommended for You */}
        {activeTab === 'recommended' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Personalized Recommendations</h2>
              <p className="text-xs text-slate-500">
                Curated specifically for your selected interests: {selectedInterests.join(', ')}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedOpportunities.map(opp => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  isBookmarked={savedOpportunities.some(s => s.id === opp.id)}
                  onToggleBookmark={onToggleBookmark}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Upcoming Deadlines */}
        {activeTab === 'deadlines' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Saved Opportunities Deadlines</h2>
              <p className="text-xs text-slate-500">
                Never miss an application cut-off.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
              {savedOpportunities.map(opp => {
                const days = getDaysRemaining(opp.deadline);
                return (
                  <div key={opp.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold text-indigo-600">{opp.type}</div>
                      <h4 
                        onClick={() => onViewDetails(opp)}
                        className="text-base font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {opp.title}
                      </h4>
                      <p className="text-xs text-slate-500">{opp.organization}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        days <= 7 ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {days} days remaining
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Due {formatDeadlineDate(opp.deadline)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

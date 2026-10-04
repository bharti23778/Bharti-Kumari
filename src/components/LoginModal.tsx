import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Building2, 
  Check, 
  ArrowRight, 
  Sparkles, 
  LogOut, 
  Phone, 
  Users, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { AVAILABLE_INTERESTS } from '../data/mockOpportunities';
import { ApplicantAccount } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApplicant: ApplicantAccount | null;
  savedApplicants: ApplicantAccount[];
  onSelectApplicant: (applicant: ApplicantAccount) => void;
  onCreateApplicant: (name: string, role: string, institution: string, phone: string, interests: string[]) => void;
  onLogoutApplicant: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentApplicant,
  savedApplicants,
  onSelectApplicant,
  onCreateApplicant,
  onLogoutApplicant
}) => {
  const [mode, setMode] = useState<'switch' | 'new'>(savedApplicants.length > 0 ? 'switch' : 'new');
  
  // New applicant form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('1st Year Undergraduate');
  const [institution, setInstitution] = useState('');
  const [interests, setInterests] = useState<string[]>(['Web Development', 'AI / ML']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleQuickDemoFill = (type: 'cs' | 'research' | 'design') => {
    if (type === 'cs') {
      setName('Priya Sharma');
      setPhone('+91 98765 43210');
      setRole('3rd Year B.Tech Computer Science');
      setInstitution('National Institute of Technology (NIT)');
      setInterests(['Web Development', 'AI / ML', 'Cybersecurity']);
    } else if (type === 'research') {
      setName('Aarav Mehta');
      setPhone('+91 91234 56789');
      setRole('Master of Science in Data & Intelligence');
      setInstitution('Indian Institute of Science (IISc Bengaluru)');
      setInterests(['Research', 'AI / ML', 'Data Science']);
    } else {
      setName('Ananya Verma');
      setPhone('+91 94567 12345');
      setRole('Undergraduate Product & Visual Design');
      setInstitution('National Institute of Design (NID)');
      setInterests(['Design', 'Web Development', 'Entrepreneurship']);
    }
  };

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter the applicant full name');
      return;
    }
    const cleanPhone = phone.trim() || `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`;
    const cleanRole = role.trim() || 'Undergraduate Student';
    const cleanInstitution = institution.trim() || 'State University';

    onCreateApplicant(name.trim(), cleanRole, cleanInstitution, cleanPhone, interests);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Applicant Account & Shared Device Login</span>
              </h3>
              <p className="text-[11px] text-slate-300">
                Log in, log out, or switch between multiple applicants on this device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Active Applicant Banner if Logged In */}
        {currentApplicant && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentApplicant.name.charAt(0)}
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Currently Active: {currentApplicant.name}</span>
                </div>
                <span className="text-[11px] text-emerald-800">
                  {currentApplicant.institution} · {currentApplicant.trackedApplications?.length || 0} Applications
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogoutApplicant();
                setMode('switch');
              }}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
              title="Log out of this applicant session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Tab Switcher: Existing Accounts on this Device vs New Login */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('switch')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'switch'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Saved Applicants ({savedApplicants.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('new')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'new'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Login Another Applicant</span>
            </button>
          </div>

          {/* VIEW 1: SWITCH TO AN EXISTING APPLICANT ON THIS DEVICE */}
          {mode === 'switch' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Select an applicant profile to activate on this device. Each applicant has their own private applications, bookmarks, and recommendations.
              </p>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {savedApplicants.map(applicant => {
                  const isCurrent = currentApplicant?.id === applicant.id;

                  return (
                    <div
                      key={applicant.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{applicant.name}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                                Active
                              </span>
                            )}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {applicant.role} · {applicant.institution}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {applicant.phone || 'Candidate ID: ' + applicant.id.slice(0, 12)} · {applicant.trackedApplications?.length || 0} tracked
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <button
                            onClick={() => {
                              onLogoutApplicant();
                            }}
                            className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
                            title="Log out"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Log Out</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onSelectApplicant(applicant);
                              onClose();
                            }}
                            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1"
                          >
                            <span>Switch</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('new')}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Log in as a different student</span>
                </button>

                {currentApplicant && (
                  <button
                    type="button"
                    onClick={() => {
                      onLogoutApplicant();
                    }}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out of this Device</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: LOGIN AS NEW APPLICANT */}
          {mode === 'new' && (
            <form onSubmit={handleNewSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Quick Demo Pre-fill */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-indigo-900 block">
                  ⚡ Quick Demo Accounts (Test Multi-Applicant Login):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('cs')}
                    className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 text-[11px] font-semibold rounded-lg border border-indigo-200 transition-colors"
                  >
                    Priya Sharma (CS - NIT)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('research')}
                    className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 text-[11px] font-semibold rounded-lg border border-indigo-200 transition-colors"
                  >
                    Aarav Mehta (Research - IISc)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoFill('design')}
                    className="px-2.5 py-1 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 text-[11px] font-semibold rounded-lg border border-indigo-200 transition-colors"
                  >
                    Ananya Verma (Design - NID)
                  </button>
                </div>
              </div>

              {/* Applicant Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Applicant Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="e.g. Rahul Kumar or Priya Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone / Mobile */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Mobile Number / Student ID (for multi-device sync)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                  />
                </div>
              </div>

              {/* Academic Level & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Degree / Year
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. 2nd Year B.Tech"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. IIT Delhi / Delhi University"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Opportunity Interests */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Opportunity Interests:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_INTERESTS.slice(0, 8).map(interest => {
                    const isSelected = interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? `✓ ${interest}` : `+ ${interest}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                {savedApplicants.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMode('switch')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
                  >
                    Back to saved applicants
                  </button>
                )}

                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Log In as Applicant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

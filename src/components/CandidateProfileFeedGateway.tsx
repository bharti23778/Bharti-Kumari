import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  ExternalLink, 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal, 
  RefreshCw, 
  X, 
  Check, 
  MapPin, 
  Clock, 
  Flame,
  ChevronRight,
  ShieldCheck,
  Laptop
} from 'lucide-react';
import { Opportunity, OpportunityType, CandidateProfile } from '../types';
import { calculateCandidateRecommendation, formatDeadlineDate, getDaysRemaining, STORAGE_KEYS } from '../utils/helpers';

interface CandidateProfileFeedGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (opportunity: Opportunity) => void;
  onProfileComplete: (profile: CandidateProfile) => void;
  initialPhone?: string | null;
}

const FIELD_OPTIONS = [
  'Computer Science & IT',
  'AI & Data Science',
  'Electronics & Communication',
  'Mechanical & Aerospace',
  'Business & Finance',
  'Natural & Basic Sciences',
  'Medicine & Health',
  'Public Policy & Humanities'
];

const YEAR_OPTIONS = [
  '1st Year Undergraduate',
  '2nd Year Undergraduate',
  '3rd / Pre-Final Year',
  'Final Year (Graduating 2026/2027)',
  'Postgraduate / Master\'s / PhD'
];

const TYPE_OPTIONS: OpportunityType[] = [
  'Internship',
  'Scholarship',
  'Fellowship',
  'Hackathon',
  'Research',
  'Coding Contest',
  'Workshop',
  'Competition'
];

const POPULAR_SKILLS = [
  'Python',
  'Web Development',
  'AI / ML',
  'Data Structures',
  'Cloud Computing',
  'Cybersecurity',
  'Research & Papers',
  'Public Policy',
  'Finance & FinTech',
  'Space Tech',
  'Java / C++',
  'Mobile Apps'
];

const PRESETS = [
  {
    name: '💻 B.Tech CS Internships',
    field: 'Computer Science & IT',
    year: '3rd / Pre-Final Year',
    types: ['Internship', 'Hackathon'] as OpportunityType[],
    skills: ['Python', 'Web Development', 'Data Structures', 'AI / ML']
  },
  {
    name: '🎓 1st Year Scholarship Seeker',
    field: 'Computer Science & IT',
    year: '1st Year Undergraduate',
    types: ['Scholarship', 'Internship'] as OpportunityType[],
    skills: ['Python', 'Web Development', 'Research & Papers']
  },
  {
    name: '🔬 Science & Research Scholar',
    field: 'Natural & Basic Sciences',
    year: 'Postgraduate / Master\'s / PhD',
    types: ['Fellowship', 'Research', 'Scholarship'] as OpportunityType[],
    skills: ['Research & Papers', 'Python', 'AI / ML']
  },
  {
    name: '🚀 Big Tech & SDE Career Track',
    field: 'Computer Science & IT',
    year: 'Final Year (Graduating 2026/2027)',
    types: ['Internship', 'Coding Contest'] as OpportunityType[],
    skills: ['Data Structures', 'Java / C++', 'Cloud Computing', 'Web Development']
  }
];

export const CandidateProfileFeedGateway: React.FC<CandidateProfileFeedGatewayProps> = ({
  isOpen,
  onClose,
  opportunities,
  bookmarkedIds,
  onToggleBookmark,
  onViewDetails,
  onProfileComplete,
  initialPhone
}) => {
  // Load saved profile if entered before
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATE_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      phone: initialPhone || localStorage.getItem('students_trust_candidate_phone') || '+91 98765-43210',
      candidateName: 'Priya Sharma',
      fieldOfStudy: 'Computer Science & IT',
      yearOfStudy: '3rd / Pre-Final Year',
      preferredTypes: ['Internship', 'Scholarship', 'Hackathon'],
      skills: ['Python', 'Web Development', 'AI / ML'],
      modePreference: 'All'
    };
  });

  const [hasCompletedProfile, setHasCompletedProfile] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(STORAGE_KEYS.CANDIDATE_PROFILE);
    } catch {
      return false;
    }
  });

  const [activeView, setActiveView] = useState<'feed' | 'edit'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATE_PROFILE);
    return saved ? 'feed' : 'edit';
  });

  const [phoneInput, setPhoneInput] = useState(profile.phone || '+91 98765-43210');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (initialPhone) {
      setPhoneInput(initialPhone);
      setProfile(prev => ({ ...prev, phone: initialPhone }));
    }
  }, [initialPhone]);

  if (!isOpen) return null;

  // Toggle Type Selection
  const handleToggleType = (type: OpportunityType) => {
    setProfile(prev => {
      const exists = prev.preferredTypes.includes(type);
      return {
        ...prev,
        preferredTypes: exists 
          ? prev.preferredTypes.filter(t => t !== type)
          : [...prev.preferredTypes, type]
      };
    });
  };

  // Toggle Skill Selection
  const handleToggleSkill = (skill: string) => {
    setProfile(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists 
          ? prev.skills.filter(s => s !== skill)
          : [...prev.skills, skill]
      };
    });
  };

  // Apply Quick Preset
  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setProfile(prev => ({
      ...prev,
      fieldOfStudy: preset.field,
      yearOfStudy: preset.year,
      preferredTypes: preset.types,
      skills: preset.skills
    }));
  };

  // Submit Profile Form
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneInput.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setPhoneError('');

    const completedProfile: CandidateProfile = {
      ...profile,
      phone: phoneInput.startsWith('+') ? phoneInput : `+91 ${phoneInput}`,
      completedAt: new Date().toISOString()
    };

    setProfile(completedProfile);
    localStorage.setItem(STORAGE_KEYS.CANDIDATE_PROFILE, JSON.stringify(completedProfile));
    localStorage.setItem('students_trust_candidate_phone', completedProfile.phone);
    setHasCompletedProfile(true);
    setActiveView('feed');
    onProfileComplete(completedProfile);
  };

  // Calculate Personalized Feed: "Recommended For You"
  const recommendedFeed = useMemo(() => {
    return opportunities
      .map(opp => {
        const rec = calculateCandidateRecommendation(opp, {
          fieldOfStudy: profile.fieldOfStudy,
          yearOfStudy: profile.yearOfStudy,
          preferredTypes: profile.preferredTypes,
          skills: profile.skills
        });
        return {
          ...opp,
          matchScore: rec.score,
          recommendationReason: rec.reason,
          matchedTags: rec.matchedTags
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12);
  }, [opportunities, profile]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 lg:p-7 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 sm:p-7 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shrink-0 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-40 -bottom-20 w-52 h-52 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold text-indigo-100 mb-2 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>One-Time Candidate Onboarding & Personalized Gateway</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
                <span>Personalized Opportunity Feed</span>
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 max-w-xl">
                Enter your profile details once. The platform automatically curates a custom <strong className="text-amber-300">"Recommended For You"</strong> feed with direct application links before entering the main website.
              </p>
            </div>

            {/* Toggle between Feed & Profile Edit */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              {hasCompletedProfile && (
                <div className="inline-flex p-1 bg-white/15 backdrop-blur-xs rounded-xl border border-white/20 text-xs">
                  <button
                    onClick={() => setActiveView('feed')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeView === 'feed'
                        ? 'bg-white text-indigo-900 shadow-sm'
                        : 'text-indigo-100 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended For You</span>
                  </button>
                  <button
                    onClick={() => setActiveView('edit')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeView === 'edit'
                        ? 'bg-white text-indigo-900 shadow-sm'
                        : 'text-indigo-100 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}

              {/* Close / Skip button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/20 transition-colors"
                title="Enter Website Directly"
                aria-label="Close gateway"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Profile Status Badge */}
          {hasCompletedProfile && activeView === 'feed' && (
            <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Active Profile: <strong className="text-white">{profile.fieldOfStudy}</strong> ({profile.yearOfStudy})</span>
                <span className="text-indigo-300">·</span>
                <span className="text-indigo-200">Phone: {profile.phone}</span>
              </div>
              <button
                onClick={() => setActiveView('edit')}
                className="text-xs text-amber-300 hover:text-amber-200 underline font-semibold flex items-center gap-1"
              >
                <span>Change Preferences</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body: Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* ======================================================== */}
          {/* VIEW 1: CANDIDATE PROFILE FORM (Enter profile once)      */}
          {/* ======================================================== */}
          {activeView === 'edit' && (
            <form onSubmit={handleSubmitProfile} className="space-y-6 animate-fadeIn">
              
              {/* Presets header for fast 1-click completion */}
              <div className="p-4 bg-indigo-50/80 border border-indigo-100 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Quick 1-Click Profile Presets (Instant Setup)
                  </span>
                  <span className="text-[11px] text-indigo-600 font-semibold">Click to auto-fill</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {PRESETS.map((pr) => (
                    <button
                      key={pr.name}
                      type="button"
                      onClick={() => handleApplyPreset(pr)}
                      className="px-3 py-2 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl border border-indigo-200 transition-all text-left shadow-2xs group"
                    >
                      <span>{pr.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Candidate Phone Number (Required as per single credential rule) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Candidate Mobile / Phone Number <span className="text-rose-500">*</span></span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Universal Credential
                    </span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value);
                        setPhoneError('');
                      }}
                      placeholder="e.g. +91 98765-43210"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                      required
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-rose-600 font-medium">{phoneError}</p>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Your phone number links your personalized feed across all your devices.
                  </p>
                </div>

                {/* Candidate Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.candidateName || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, candidateName: e.target.value }))}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                  <p className="text-[11px] text-slate-400">
                    Used to address you on recommendation headers and applications.
                  </p>
                </div>

                {/* Field of Study */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Field of Study / Academic Stream <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={profile.fieldOfStudy}
                    onChange={(e) => setProfile(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
                  >
                    {FIELD_OPTIONS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Year of Study */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Current Year / Educational Level <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={profile.yearOfStudy}
                    onChange={(e) => setProfile(prev => ({ ...prev, yearOfStudy: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white cursor-pointer"
                  >
                    {YEAR_OPTIONS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Preferred Opportunity Types */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block">
                  Select Opportunities to Include in Your Feed <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TYPE_OPTIONS.map((t) => {
                    const isSelected = profile.preferredTypes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleToggleType(t)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{t}s</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core Skills & Technical Interests */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 block">
                    Top Skills & Topics for High-Match Recommendations
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {profile.skills.length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SKILLS.map((sk) => {
                    const isSelected = profile.skills.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => handleToggleSkill(sk)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                            : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline order-2 sm:order-1"
                >
                  Skip and browse catalog without profile
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <span>Generate My Personalized Feed</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </form>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: PERSONALIZED FEED ("Recommended For You")        */}
          {/* ======================================================== */}
          {activeView === 'feed' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Feed Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 mb-1">
                    <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>Curated AI Match Feed</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Recommended For You</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing top opportunities matched to <strong className="text-slate-800">{profile.fieldOfStudy}</strong> ({profile.yearOfStudy}). Apply directly using the official links.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveView('edit')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Adjust Preferences</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5"
                  >
                    <span>Enter Main Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Feed Grid: Recommended Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedFeed.map((opp) => {
                  const isSaved = bookmarkedIds.includes(opp.id);
                  const daysRemaining = getDaysRemaining(opp.deadline);

                  return (
                    <div 
                      key={opp.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group relative"
                    >
                      {/* Top Match Tag & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black border border-emerald-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{opp.matchScore}% Match</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {opp.type}
                          </span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => onToggleBookmark(opp.id, e)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                          }`}
                          title={isSaved ? 'Saved in Profile' : 'Save opportunity'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-600' : ''}`} />
                        </button>
                      </div>

                      {/* Opportunity Title & Organization */}
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                          {opp.organization}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mt-0.5">
                          {opp.title}
                        </h4>

                        {/* Personalized match explanation */}
                        <div className="my-2 px-2.5 py-1 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 font-medium">
                          ✨ <strong>Why Recommended:</strong> {opp.recommendationReason}
                        </div>

                        {/* Stipend / Award & Deadline */}
                        <div className="flex items-center justify-between text-xs py-1.5 text-slate-600 border-t border-slate-100 mt-2">
                          <span className="font-bold text-emerald-700">
                            {opp.stipendOrPrize || 'Free Participation'}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Due {formatDeadlineDate(opp.deadline)} ({daysRemaining}d left)</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Action Controls: Apply Directly + Details */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-3">
                        <button
                          onClick={() => onViewDetails(opp)}
                          className="text-xs font-semibold text-slate-700 hover:text-indigo-600 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          View Details
                        </button>

                        <a
                          href={opp.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <span>Apply Directly</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your profile and recommended opportunities are saved to candidate credential: <strong className="font-mono text-slate-900">{profile.phone}</strong>.
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Enter Website with My Feed</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

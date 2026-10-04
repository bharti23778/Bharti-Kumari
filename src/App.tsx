/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Opportunity, 
  FilterState, 
  OpportunityType, 
  TrackedApplication, 
  ApplicationStatus 
} from './types';
import { MOCK_OPPORTUNITIES } from './data/mockOpportunities';
import { 
  loadSavedBookmarks, 
  saveBookmarksToStorage, 
  loadUserInterests, 
  saveUserInterestsToStorage,
  getDaysRemaining,
  calculateMatchScore
} from './utils/helpers';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchAndFilters } from './components/SearchAndFilters';
import { CategorySection } from './components/CategorySection';
import { FeaturedOpportunities } from './components/FeaturedOpportunities';
import { PersonalizedDiscovery } from './components/PersonalizedDiscovery';
import { DeadlineTracker } from './components/DeadlineTracker';
import { TrustSection } from './components/TrustSection';
import { HowItWorks } from './components/HowItWorks';
import { StudentStatistics } from './components/StudentStatistics';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { OpportunityDetailsModal } from './components/OpportunityDetailsModal';
import { StudentDashboard } from './components/StudentDashboard';
import { LoginModal } from './components/LoginModal';
import { CandidateRegistrationModal } from './components/CandidateRegistrationModal';
import { TypeMenuDrawer } from './components/TypeMenuDrawer';
import { CandidateProfileFeedGateway } from './components/CandidateProfileFeedGateway';
import { TopScholarshipDeadlineTracker } from './components/TopScholarshipDeadlineTracker';
import { CandidateProfile, ApplicantAccount } from './types';
import { 
  getStoredApplicants, 
  saveApplicantAccount, 
  getActiveApplicantId, 
  setActiveApplicantId 
} from './utils/applicantSession';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  type: 'All',
  mode: 'All',
  field: 'All Fields',
  location: 'All',
  eligibility: 'All Eligibility',
  deadlineUrgency: 'all',
  fee: 'All'
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Multi-Applicant Account State
  const [savedApplicants, setSavedApplicants] = useState<ApplicantAccount[]>(() => getStoredApplicants());
  const [activeApplicant, setActiveApplicant] = useState<ApplicantAccount | null>(() => {
    const all = getStoredApplicants();
    const activeId = getActiveApplicantId();
    if (activeId === 'LOGGED_OUT') return null;
    if (activeId) {
      const found = all.find(a => a.id === activeId);
      if (found) return found;
    }
    return all[0] || null;
  });

  const [userName, setUserName] = useState<string>(() => activeApplicant?.name || 'Guest Applicant');
  const [userRole, setUserRole] = useState<string>(() => activeApplicant?.role || 'Student Applicant');
  const [userInstitution, setUserInstitution] = useState<string>(() => activeApplicant?.institution || 'Institution');
  const [candidatePhone, setCandidatePhone] = useState<string | null>(() => activeApplicant?.phone || null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => activeApplicant ? activeApplicant.bookmarkedIds : []);
  const [userInterests, setUserInterests] = useState<string[]>(() => activeApplicant ? activeApplicant.selectedInterests : ['Web Development', 'AI / ML']);
  const [trackedApplications, setTrackedApplications] = useState<TrackedApplication[]>(() => activeApplicant ? activeApplicant.trackedApplications : []);

  const [selectedOpportunityModal, setSelectedOpportunityModal] = useState<Opportunity | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  // Set to false by default so the main website first page is displayed directly on load
  const [profileFeedGatewayOpen, setProfileFeedGatewayOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize bookmarks to local storage
  useEffect(() => {
    saveBookmarksToStorage(bookmarkedIds);
  }, [bookmarkedIds]);

  // Synchronize interests to local storage
  useEffect(() => {
    saveUserInterestsToStorage(userInterests);
  }, [userInterests]);

  // Synchronize applications pipeline & cross-device candidate store
  useEffect(() => {
    try {
      localStorage.setItem('students_trust_applications_pipeline', JSON.stringify(trackedApplications));
      if (candidatePhone) {
        const clean = candidatePhone.replace(/\D/g, '');
        localStorage.setItem(`students_trust_candidate_apps_${clean}`, JSON.stringify(trackedApplications));
      }
    } catch (e) {
      console.error(e);
    }
  }, [trackedApplications, candidatePhone]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Candidate Phone Registration Success & Multi-Device Sync
  const handleRegisterCandidateSuccess = (phone: string, isExistingAccount: boolean) => {
    setCandidatePhone(phone);
    localStorage.setItem('students_trust_candidate_phone', phone);
    
    // Cross-device sync: restore any applications previously associated with this phone credential
    const clean = phone.replace(/\D/g, '');
    const storedApps = localStorage.getItem(`students_trust_candidate_apps_${clean}`);
    if (storedApps) {
      try {
        const parsed = JSON.parse(storedApps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTrackedApplications(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (isExistingAccount) {
      showToast(`Welcome back! Restored applications for ${phone} on this device`);
    } else {
      showToast(`Candidate registered! ${phone} is your credential on any device.`);
    }
  };

  // Candidate Profile Completion & Personalized Feed Creation
  const handleProfileComplete = (candProfile: CandidateProfile) => {
    setCandidatePhone(candProfile.phone);
    localStorage.setItem('students_trust_candidate_phone', candProfile.phone);
    if (candProfile.skills && candProfile.skills.length > 0) {
      setUserInterests(candProfile.skills);
    }
    if (candProfile.candidateName) {
      setUserName(candProfile.candidateName);
    }
    if (candProfile.fieldOfStudy) {
      setUserRole(`${candProfile.yearOfStudy} · ${candProfile.fieldOfStudy}`);
    }
    showToast(`Personalized "Recommended For You" feed generated for ${candProfile.fieldOfStudy}!`);
  };

  // Enter main website: closes onboarding gateway, resets view to starting home page, and scrolls to top
  const handleEnterMainWebsite = () => {
    setProfileFeedGatewayOpen(false);
    setCurrentView('home');
    setFilters(INITIAL_FILTERS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark Handler
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(item => item !== id));
      showToast('Removed from saved opportunities');
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      showToast('Saved to your student profile');
      
      // Also add to tracker if not present
      if (!trackedApplications.some(a => a.opportunityId === id)) {
        setTrackedApplications(prev => [
          ...prev,
          {
            id: `app-${Date.now()}`,
            opportunityId: id,
            status: 'Saved',
            updatedAt: new Date().toISOString().split('T')[0],
            notes: 'Saved from discovery catalog'
          }
        ]);
      }
    }
  };

  // Toggle Interest Handler
  const handleToggleInterest = (interest: string) => {
    setUserInterests(prev => {
      const updated = prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest];
      return updated;
    });
  };

  // Category select from Category section
  const handleSelectCategory = (cat: OpportunityType) => {
    setFilters(prev => ({
      ...prev,
      type: cat
    }));
    const el = document.getElementById('explore-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Update application status
  const handleUpdateApplicationStatus = (appId: string, newStatus: ApplicationStatus, notes?: string) => {
    setTrackedApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          notes: notes !== undefined ? notes : app.notes,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    }));
    showToast(`Application status moved to ${newStatus}`);
  };

  // Remove tracked application
  const handleRemoveTrackedApplication = (appId: string) => {
    setTrackedApplications(prev => prev.filter(a => a.id !== appId));
    showToast('Removed application from pipeline');
  };

  // Track application from modal
  const handleTrackFromModal = (opp: Opportunity, status: ApplicationStatus) => {
    setTrackedApplications(prev => {
      const existing = prev.find(a => a.opportunityId === opp.id);
      if (existing) {
        return prev.map(a => a.id === existing.id ? { ...a, status, updatedAt: new Date().toISOString().split('T')[0] } : a);
      }
      return [
        ...prev,
        {
          id: `app-${Date.now()}`,
          opportunityId: opp.id,
          status,
          updatedAt: new Date().toISOString().split('T')[0],
          notes: `Added as ${status}`
        }
      ];
    });

    if (!bookmarkedIds.includes(opp.id)) {
      setBookmarkedIds(prev => [...prev, opp.id]);
    }
    showToast(`Opportunity marked as ${status} in tracker`);
  };

  // Multi-Applicant Session Handlers
  const handleSelectApplicant = (applicant: ApplicantAccount) => {
    // Persist current active applicant before switching
    if (activeApplicant) {
      saveApplicantAccount({
        ...activeApplicant,
        bookmarkedIds,
        trackedApplications,
        selectedInterests: userInterests,
        name: userName,
        role: userRole,
        institution: userInstitution,
        phone: candidatePhone || undefined,
        lastActive: new Date().toISOString()
      });
    }

    setActiveApplicant(applicant);
    setActiveApplicantId(applicant.id);
    setUserName(applicant.name);
    setUserRole(applicant.role);
    setUserInstitution(applicant.institution);
    setCandidatePhone(applicant.phone || null);
    setBookmarkedIds(applicant.bookmarkedIds || []);
    setUserInterests(applicant.selectedInterests || ['Web Development']);
    setTrackedApplications(applicant.trackedApplications || []);

    setSavedApplicants(getStoredApplicants());
    showToast(`Switched applicant session to: ${applicant.name}`);
  };

  const handleCreateApplicant = (name: string, role: string, institution: string, phone: string, interests: string[]) => {
    // Persist current active applicant before switching
    if (activeApplicant) {
      saveApplicantAccount({
        ...activeApplicant,
        bookmarkedIds,
        trackedApplications,
        selectedInterests: userInterests,
        name: userName,
        role: userRole,
        institution: userInstitution,
        phone: candidatePhone || undefined,
        lastActive: new Date().toISOString()
      });
    }

    const newAcc: ApplicantAccount = {
      id: `applicant-${Date.now()}`,
      name,
      role,
      institution,
      phone,
      selectedInterests: interests,
      bookmarkedIds: [],
      trackedApplications: [],
      lastActive: new Date().toISOString()
    };

    saveApplicantAccount(newAcc);
    setActiveApplicant(newAcc);
    setActiveApplicantId(newAcc.id);
    setUserName(name);
    setUserRole(role);
    setUserInstitution(institution);
    setCandidatePhone(phone);
    setBookmarkedIds([]);
    setUserInterests(interests);
    setTrackedApplications([]);

    setSavedApplicants(getStoredApplicants());
    showToast(`Logged in as new applicant: ${name}`);
  };

  const handleLogoutApplicant = () => {
    if (activeApplicant) {
      // Save applicant's data before logout so it is preserved
      saveApplicantAccount({
        ...activeApplicant,
        bookmarkedIds,
        trackedApplications,
        selectedInterests: userInterests,
        name: userName,
        role: userRole,
        institution: userInstitution,
        phone: candidatePhone || undefined,
        lastActive: new Date().toISOString()
      });
    }

    const loggedOutName = userName;
    setActiveApplicant(null);
    setActiveApplicantId('LOGGED_OUT');
    setUserName('Guest Applicant');
    setUserRole('Student Applicant');
    setUserInstitution('Institution');
    setCandidatePhone(null);
    setBookmarkedIds([]);
    setTrackedApplications([]);
    setSavedApplicants(getStoredApplicants());

    if (currentView === 'dashboard') {
      setCurrentView('home');
    }

    showToast(`${loggedOutName} logged out. Another applicant can now log in on this device.`);
  };

  // Filter Opportunities logic
  const filteredOpportunities = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter(opp => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const inTitle = opp.title.toLowerCase().includes(q);
        const inOrg = opp.organization.toLowerCase().includes(q);
        const inDesc = opp.shortDescription.toLowerCase().includes(q) || opp.fullDescription.toLowerCase().includes(q);
        const inTags = opp.tags.some(t => t.toLowerCase().includes(q));
        const inField = opp.field.toLowerCase().includes(q);
        const inSkills = opp.skillsRequired.some(s => s.toLowerCase().includes(q));
        if (!inTitle && !inOrg && !inDesc && !inTags && !inField && !inSkills) {
          return false;
        }
      }

      // 2. Type
      if (filters.type !== 'All' && opp.type !== filters.type) {
        return false;
      }

      // 3. Mode (Remote / Hybrid / On-site)
      if (filters.mode !== 'All' && opp.mode !== filters.mode) {
        return false;
      }

      // 4. Field
      if (filters.field && filters.field !== 'All Fields') {
        if (!opp.field.toLowerCase().includes(filters.field.toLowerCase())) {
          return false;
        }
      }

      // 5. Eligibility
      if (filters.eligibility && filters.eligibility !== 'All Eligibility') {
        const eligQ = filters.eligibility.toLowerCase();
        if (!opp.eligibility.toLowerCase().includes(eligQ)) {
          return false;
        }
      }

      // 6. Deadline Urgency
      if (filters.deadlineUrgency !== 'all') {
        const days = getDaysRemaining(opp.deadline);
        if (filters.deadlineUrgency === '7days' && days > 7) return false;
        if (filters.deadlineUrgency === '14days' && days > 14) return false;
        if (filters.deadlineUrgency === '30days' && days > 30) return false;
        if (filters.deadlineUrgency === '60days' && days > 60) return false;
      }

      // 7. Fee / Compensation
      if (filters.fee === 'Paid') {
        if (!opp.stipendOrPrize) return false;
      }

      return true;
    });
  }, [filters]);

  // Derived lists for Dashboard
  const savedOpportunitiesList = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter(opp => bookmarkedIds.includes(opp.id));
  }, [bookmarkedIds]);

  const recommendedOpportunitiesList = useMemo(() => {
    return [...MOCK_OPPORTUNITIES]
      .map(opp => ({ opp, ...calculateMatchScore(opp, userInterests) }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.opp)
      .slice(0, 6);
  }, [userInterests]);

  const fullTrackedApplications = useMemo(() => {
    return trackedApplications.map(app => {
      const opp = MOCK_OPPORTUNITIES.find(o => o.id === app.opportunityId) || MOCK_OPPORTUNITIES[0];
      return {
        ...app,
        opportunity: opp
      };
    });
  }, [trackedApplications]);

  const scrollToExplore = () => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('search-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToHowItWorks = () => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        savedCount={bookmarkedIds.length}
        onOpenSearch={scrollToExplore}
        onOpenLogin={() => setLoginModalOpen(true)}
        userLoggedIn={activeApplicant !== null}
        userName={userName}
        candidatePhone={candidatePhone}
        onOpenCandidateRegistration={() => setProfileFeedGatewayOpen(true)}
        onOpenTypeMenu={() => setTypeMenuOpen(true)}
        onOpenProfileFeed={() => setProfileFeedGatewayOpen(true)}
        onLogout={handleLogoutApplicant}
      />

      {/* Top of Screen: Live Applied & Eligible Scholarships with Exact Deadlines & Timings */}
      <TopScholarshipDeadlineTracker
        opportunities={MOCK_OPPORTUNITIES}
        trackedApplications={trackedApplications}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
        onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
      />

      {/* Main View Router */}
      {currentView === 'dashboard' ? (
        <main className="flex-1">
          <StudentDashboard
            onBackToHome={() => setCurrentView('home')}
            savedOpportunities={savedOpportunitiesList}
            recommendedOpportunities={recommendedOpportunitiesList}
            trackedApplications={fullTrackedApplications}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onRemoveTrackedApplication={handleRemoveTrackedApplication}
            onToggleBookmark={handleToggleBookmark}
            onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
            userName={userName}
            userRole={userRole}
            userInstitution={userInstitution}
            selectedInterests={userInterests}
            onLogout={handleLogoutApplicant}
            onSwitchApplicant={() => setLoginModalOpen(true)}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onExploreClick={scrollToExplore}
            onHowItWorksClick={scrollToHowItWorks}
            onSelectCategoryQuick={(cat) => handleSelectCategory(cat as any)}
            onOpenProfileFeed={() => setProfileFeedGatewayOpen(true)}
          />

          {/* 2. Prominent Search Section */}
          <SearchAndFilters
            filters={filters}
            setFilters={setFilters}
            totalMatches={filteredOpportunities.length}
            onSearchSubmit={() => {}}
            onOpenTypeMenu={() => setTypeMenuOpen(true)}
          />

          {/* 3. Category Exploration Section */}
          <CategorySection
            onSelectCategory={handleSelectCategory}
            selectedCategory={filters.type}
          />

          {/* 4. Featured Opportunities Section */}
          <FeaturedOpportunities
            opportunities={filteredOpportunities}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
            onClearFilters={() => setFilters(INITIAL_FILTERS)}
            currentType={filters.type}
            onSelectType={(t) => setFilters(prev => ({ ...prev, type: t }))}
          />

          {/* 5. Personalized Discovery Section */}
          <PersonalizedDiscovery
            selectedInterests={userInterests}
            onToggleInterest={handleToggleInterest}
            allOpportunities={MOCK_OPPORTUNITIES}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
          />

          {/* 6. Deadline Tracker Section */}
          <DeadlineTracker
            opportunities={MOCK_OPPORTUNITIES}
            bookmarkedIds={bookmarkedIds}
            onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
          />

          {/* 7. Trust & Verification Guarantee */}
          <TrustSection />

          {/* 8. How It Works */}
          <HowItWorks onStartExploring={scrollToExplore} />

          {/* 9. Student Statistics */}
          <StudentStatistics />

          {/* 10. Final Call To Action */}
          <CallToAction
            onExploreClick={scrollToExplore}
            onDashboardClick={() => setCurrentView('dashboard')}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(sectionId) => {
          if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(() => {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      {/* Opportunity Details Slide-over / Modal */}
      <OpportunityDetailsModal
        opportunity={selectedOpportunityModal}
        onClose={() => setSelectedOpportunityModal(null)}
        isBookmarked={selectedOpportunityModal ? bookmarkedIds.includes(selectedOpportunityModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        userInterests={userInterests}
        onTrackApplication={handleTrackFromModal}
        currentTrackerStatus={
          selectedOpportunityModal 
            ? trackedApplications.find(a => a.opportunityId === selectedOpportunityModal.id)?.status
            : undefined
        }
        candidatePhone={candidatePhone}
        onOpenCandidateRegistration={() => setRegistrationModalOpen(true)}
      />

      {/* Student Profile / Multi-Applicant Login & Switch Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        currentApplicant={activeApplicant}
        savedApplicants={savedApplicants}
        onSelectApplicant={handleSelectApplicant}
        onCreateApplicant={handleCreateApplicant}
        onLogoutApplicant={handleLogoutApplicant}
      />

      {/* Candidate Profile Entry & Personalized Opportunity Feed ("Recommended For You" - displayed before login) */}
      <CandidateProfileFeedGateway
        isOpen={profileFeedGatewayOpen}
        onClose={handleEnterMainWebsite}
        opportunities={MOCK_OPPORTUNITIES}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
        onViewDetails={(opp) => setSelectedOpportunityModal(opp)}
        onProfileComplete={handleProfileComplete}
        initialPhone={candidatePhone}
      />

      {/* Candidate Registration Gateway (Phone verification & multi-device sync) */}
      <CandidateRegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        candidatePhone={candidatePhone}
        onRegisterSuccess={handleRegisterCandidateSuccess}
        onSwitchDeviceDemo={(phone) => handleRegisterCandidateSuccess(phone, true)}
      />

      {/* Three Lines Menu of Type (top most corner of right side) */}
      <TypeMenuDrawer
        isOpen={typeMenuOpen}
        onClose={() => setTypeMenuOpen(false)}
        selectedType={filters.type}
        onSelectType={(type) => {
          setFilters(prev => ({ ...prev, type }));
          const el = document.getElementById('explore-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}

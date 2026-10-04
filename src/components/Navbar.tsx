import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Bookmark, 
  LayoutDashboard, 
  Menu, 
  X, 
  Sparkles,
  UserCheck,
  Phone,
  Layers,
  LogOut,
  Users
} from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'dashboard';
  setCurrentView: (view: 'home' | 'dashboard') => void;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  userLoggedIn: boolean;
  userName: string;
  candidatePhone: string | null;
  onOpenCandidateRegistration: () => void;
  onOpenTypeMenu: () => void;
  onOpenProfileFeed?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  savedCount,
  onOpenSearch,
  onOpenLogin,
  userLoggedIn,
  userName,
  candidatePhone,
  onOpenCandidateRegistration,
  onOpenTypeMenu,
  onOpenProfileFeed,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Zone 1: Brand title with modern opportunity/growth logo */}
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 text-indigo-100 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Students Trust
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Platform" />
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-tight leading-none hidden sm:block">
                Discover opportunities. Build your future.
              </p>
            </div>
          </button>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button 
              onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`transition-colors hover:text-indigo-600 ${currentView === 'home' ? 'text-indigo-600 font-semibold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('explore-section')}
              className="transition-colors hover:text-indigo-600"
            >
              Explore Opportunities
            </button>
            <button 
              onClick={() => scrollToSection('categories-section')}
              className="transition-colors hover:text-indigo-600"
            >
              Categories
            </button>
            <button 
              onClick={onOpenProfileFeed || (() => scrollToSection('recommendations-section'))}
              className="transition-colors hover:text-indigo-600 flex items-center gap-1 text-indigo-700 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>For You</span>
            </button>
            <button 
              onClick={() => scrollToSection('deadlines-section')}
              className="transition-colors hover:text-indigo-600"
            >
              Deadlines
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="transition-colors hover:text-indigo-600"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('trust-section')}
              className="transition-colors hover:text-indigo-600"
            >
              About & Trust
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Search opportunities"
              aria-label="Search opportunities"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                currentView === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              title="Open Student Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Dashboard</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-indigo-600 text-white text-[10px] font-bold rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Recommended For You Personalized Feed Button */}
            <button
              onClick={onOpenProfileFeed || onOpenCandidateRegistration}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-900 bg-gradient-to-r from-amber-50 to-indigo-50 hover:from-amber-100 hover:to-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-2xs"
              title="Open your personalized opportunity feed (Recommended For You)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Recommended For You</span>
            </button>

            {userLoggedIn ? (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
                  title="Active Applicant Account — Click to switch or edit"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="max-w-[100px] truncate">{userName.split(' ')[0]}</span>
                </button>

                <div className="w-[1px] h-4 bg-slate-300 mx-0.5" />

                <button
                  onClick={onLogout}
                  className="px-2 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                  title="Log out of this applicant session so another applicant can log in from this device"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                title="Login or switch applicant on this device"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Applicant Login</span>
              </button>
            )}

            <button
              onClick={() => {
                if (currentView === 'home') {
                  scrollToSection('explore-section');
                } else {
                  setCurrentView('home');
                }
              }}
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
            >
              Get Started
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Three lines menu of thing which are included in type on top most corner of right side */}
            <button
              onClick={onOpenTypeMenu}
              className="flex flex-col justify-center items-center gap-[3px] w-9 h-9 p-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 rounded-xl transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shrink-0"
              title="Opportunity Types (Three Lines Menu)"
              aria-label="Open Opportunity Types 3-lines menu"
            >
              <span className="w-4 h-[2px] bg-slate-800 rounded-full" />
              <span className="w-4 h-[2px] bg-indigo-600 rounded-full" />
              <span className="w-4 h-[2px] bg-slate-800 rounded-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-indigo-600 font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('explore-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Explore Opportunities
            </button>
            <button
              onClick={() => scrollToSection('categories-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Categories
            </button>
            <button
              onClick={() => { 
                setMobileMenuOpen(false);
                if (onOpenProfileFeed) onOpenProfileFeed();
                else scrollToSection('recommendations-section');
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center justify-between text-indigo-700 font-bold"
            >
              <span>Recommended For You (My Feed)</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            </button>
            <button
              onClick={() => scrollToSection('deadlines-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Deadlines Tracker
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('trust-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Built Around Trust
            </button>
            <button
              onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-semibold flex items-center justify-between"
            >
              <span>Student Dashboard & Tracker</span>
              <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">{savedCount} saved</span>
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100 space-y-2">
            {userLoggedIn ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-2 text-xs text-slate-500">
                  <span>Active Applicant:</span>
                  <strong className="text-slate-900 font-bold">{userName}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                    className="w-full py-2 text-center text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Switch</span>
                  </button>
                  <button
                    onClick={() => { onLogout?.(); setMobileMenuOpen(false); }}
                    className="w-full py-2 text-center text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onOpenLogin(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Applicant Login / Switch</span>
              </button>
            )}
            <button
              onClick={() => { scrollToSection('explore-section'); setMobileMenuOpen(false); }}
              className="w-full py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
            >
              Explore Opportunities
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

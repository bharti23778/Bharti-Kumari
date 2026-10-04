import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  Code,
  GraduationCap
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
  onSelectCategoryQuick: (cat: string) => void;
  onOpenProfileFeed?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onHowItWorksClick,
  onSelectCategoryQuick,
  onOpenProfileFeed
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
      {/* Subtle decorative background blur gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-blue-200/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge kicker with Students Trust name */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-indigo-200/80 shadow-xs rounded-xl text-xs font-semibold text-indigo-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-extrabold text-indigo-700 tracking-wide uppercase text-[11px]">Students Trust</span>
              <span className="text-slate-300">·</span>
              <span>Official Student Portal</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-700 font-bold">100% Free & Verified</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]" style={{ textWrap: 'balance' }}>
              Your Direct Path to Verified Internships, Scholarships & Fellowships
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong className="text-indigo-900 font-bold">Students Trust</strong> brings verified internships, national scholarships, research fellowships, hackathons, coding contests and workshops together in one unified platform with direct official apply links.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenProfileFeed}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-50 to-indigo-50 hover:from-amber-100 hover:to-indigo-100 text-indigo-950 text-sm font-bold rounded-xl border border-indigo-200 shadow-xs transition-all flex items-center gap-2"
                title="View your custom personalized opportunity feed"
              >
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Recommended For You</span>
              </button>

              <button
                onClick={onHowItWorksClick}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                How It Works
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Direct from Employers & Universities</span>
              </div>
              <span className="hidden sm:inline text-slate-300">|</span>
              <p className="italic text-slate-600">
                “Helping students discover opportunities without the endless searching.”
              </p>
            </div>

            {/* Quick Category Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium mr-1">Trending:</span>
              {[
                { name: 'Internships', icon: Briefcase },
                { name: 'Hackathons', icon: Code },
                { name: 'Scholarships', icon: GraduationCap },
                { name: 'Fellowships', icon: Award }
              ].map(cat => (
                <button
                  key={cat.name}
                  onClick={() => onSelectCategoryQuick(cat.name)}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 rounded-md transition-colors font-medium flex items-center gap-1 text-[11px]"
                >
                  <cat.icon className="w-3 h-3 text-indigo-500" />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Visual illustration showing opportunity cards, student dashboard elements, notification icons, and opportunity categories */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/hero_students_growth_1791094385681.jpg"
                    alt="University students discovering opportunities together"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Overlay text on image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 mb-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Official Source Verified</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-tight">
                      Curated & Authenticated for University Students
                    </p>
                  </div>
                </div>

                {/* Simulated Opportunity Card inside container */}
                <div className="p-4 bg-white space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <span className="font-semibold text-indigo-600">TechNova Labs</span>
                        <span>·</span>
                        <span>Remote</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">Stipend ₹25K/mo</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        Software Engineering Internship
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-semibold text-[10px] rounded border border-indigo-100 shrink-0">
                      Internship
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      18 days remaining
                    </span>
                    <span className="text-indigo-600 font-medium hover:underline cursor-pointer" onClick={onExploreClick}>
                      View details →
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Student Dashboard Notification (Top Right / Above) */}
              <div className="absolute -top-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg rounded-xl p-3 max-w-[210px] animate-bounce-subtle z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">3 Matched Grants</p>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Based on your CS interests</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: Deadline Urgency Tracker (Bottom Left) */}
              <div className="absolute -bottom-6 -left-3 sm:-left-6 bg-slate-900 text-white shadow-xl rounded-xl p-3 border border-slate-800 max-w-[230px] z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-white">National Hackathon</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <p className="text-[10px] text-amber-300 font-medium">Registration: 5 days left</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

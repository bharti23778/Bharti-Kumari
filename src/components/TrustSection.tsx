import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  CalendarCheck, 
  Building2, 
  Lock, 
  Search, 
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-indigo-50/30 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>The Students Trust Pledge</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Built around trust.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            “We want students to spend less time wondering whether an opportunity is genuine and more time applying for it.”
          </p>
        </div>

        {/* 3 Verification Badges Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              ✓ Verified Opportunity
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Direct Recruiter Verification
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every internship and fellowship is confirmed directly with verified university career boards or HR hiring teams. No ghost postings or scraped spam.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              ✓ Official Source
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Institutional Grants & Labs
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Research fellowships, government scholarships, and international student competitions point directly to their accredited university roots and domain portals.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <CalendarCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
              ✓ Deadline Verified
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Fresh & Active Timelines
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated dead-link detection and human verification ensure deadlines are current. Expired opportunities are archived to respect your valuable preparation time.
            </p>
          </div>

        </div>

        {/* The 4 Anti-Exploitation Standards */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Quality Assurance
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Protecting students from scams and information chaos.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                College students waste hundreds of hours filtering through WhatsApp forwards, paywalled forms, and misleading recruitment ads. We eliminate that noise.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Zero Exploitative Fees</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  We reject and blacklist opportunities asking students for unpaid registration fees or fake training deposits.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-indigo-400" />
                  <span>Transparent Stipends</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Clear compensation figures, grant values, and prize pools displayed openly with zero misleading promises.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>No Endless Rabbit Holes</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Clean summaries of eligibility and skills so you immediately know if you qualify before clicking apply.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Community Flagging</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Students can instantly flag stale listings or closed forms, triggering rapid moderator re-audits.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

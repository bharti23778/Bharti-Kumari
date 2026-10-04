import React, { useState } from 'react';
import { Sparkles, Filter, CheckCircle, Info } from 'lucide-react';
import { Opportunity, OpportunityType } from '../types';
import { OpportunityCard } from './OpportunityCard';

interface FeaturedOpportunitiesProps {
  opportunities: Opportunity[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onViewDetails: (opportunity: Opportunity) => void;
  onClearFilters: () => void;
  currentType?: OpportunityType | 'All';
  onSelectType?: (type: OpportunityType | 'All') => void;
}

export const FeaturedOpportunities: React.FC<FeaturedOpportunitiesProps> = ({
  opportunities,
  bookmarkedIds,
  onToggleBookmark,
  onViewDetails,
  onClearFilters,
  currentType = 'All',
  onSelectType
}) => {
  const [internalTab, setInternalTab] = useState<OpportunityType | 'All'>('All');

  // Sync internal tab if currentType from parent changes
  const activeTab: OpportunityType | 'All' = currentType || internalTab;

  const handleTabClick = (tab: OpportunityType | 'All') => {
    setInternalTab(tab);
    if (onSelectType) {
      onSelectType(tab);
    }
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'All') return true;
    return opp.type === activeTab;
  });

  // Dynamic Content Map for Category Headers
  const getCategoryMeta = (tab: OpportunityType | 'All') => {
    switch (tab) {
      case 'Hackathon':
        return {
          title: 'Featured Opportunities — Verified Hackathons',
          subtitle: 'Direct registration links for Smart India Hackathon (SIH 2026), Flipkart GRiD 6.0, Microsoft Imagine Cup & Google Girl Hackathon.',
          bannerTitle: 'Active National & Global Student Hackathons',
          bannerDesc: 'Direct application links to SIH (Ministry of Education), Flipkart GRiD, Microsoft Imagine Cup ($100K USD), and Google Girl Hackathon with verified deadlines and direct portal links.'
        };
      case 'Research':
        return {
          title: 'Featured Opportunities — Research Opportunities',
          subtitle: 'Elite academic research programs at TIFR (VSRP), IISc/IASc Science Academies, IIT Bombay & CERN Summer Student Programme in Geneva.',
          bannerTitle: 'Premier Funded Laboratory & University Fellowships',
          bannerDesc: 'Official application links for TIFR VSRP, Indian Academy of Sciences (IASc-INSA-NASI), IIT Bombay Research Internship, and CERN Switzerland Large Hadron Collider student fellowships.'
        };
      case 'Coding Contest':
        return {
          title: 'Featured Opportunities — Verified Coding Contests',
          subtitle: 'Direct registration for ICPC Asia-India Regionals, Meta Hacker Cup, TCS CodeVita (Guinness Record), and Google Summer of Code (GSoC).',
          bannerTitle: 'Global Algorithmic Championships & Open Source Grants',
          bannerDesc: 'Official portals for ICPC Global Regionals, Meta Hacker Cup, TCS CodeVita Turbo Hiring, and Google Summer of Code with verified stipend and prize information.'
        };
      case 'Fellowship':
        return {
          title: 'Featured Opportunities — Verified Fellowships',
          subtitle: 'Nationally acclaimed fellowships including Prime Minister\'s Research Fellowship (PMRF), Teach For India, Young India Fellowship, SBI Youth for India & LAMP.',
          bannerTitle: 'Prestigious Multi-Year Leadership & Research Fellowships',
          bannerDesc: 'Official application links for PMRF (₹80K/mo), Teach For India, Ashoka University YIF, SBI Foundation Rural Fellowship, and PRS Legislative LAMP Fellowship.'
        };
      case 'Workshop':
        return {
          title: 'Featured Opportunities — Verified Technical Workshops',
          subtitle: 'Certified hands-on training series by Google Cloud Skills Boost, Amazon Web Services (AWS), NPTEL-IIT Madras & DeepLearning.AI.',
          bannerTitle: 'Certified Industry Workshops & Cloud Masterclasses',
          bannerDesc: 'Direct enrollment links for official Google Cloud Generative AI Study Jams, AWS Cloud Practitioner sessions, NPTEL IIT Madras emerging tech workshops, and Andrew Ng labs.'
        };
      case 'Competition':
        return {
          title: 'Featured Opportunities — Merit-Based Competitions',
          subtitle: 'Elite knowledge and strategic challenges including Tata Crucible Campus Quiz, L\'Oréal Brandstorm, Reliance TUP & Mahindra War Room.',
          bannerTitle: 'National Campus Case Challenges & Merit Competitions',
          bannerDesc: 'Direct registration portals for Tata Crucible Quiz, L\'Oréal Brandstorm (Paris Grand Finale), Reliance The Ultimate Pitch, and Mahindra Campus War Room with direct executive hiring.'
        };
      case 'Scholarship':
        return {
          title: 'Featured Opportunities — Verified Scholarships',
          subtitle: 'Government of India and philanthropic grants with verified application portals for college and university students.',
          bannerTitle: 'Direct Official Portals for Indian Students',
          bannerDesc: 'Verified apply links to National Scholarship Portal (NSP), Reliance Foundation, AICTE Pragati, HDFC Parivartan, ONGC, DST INSPIRE, PMRF, and Kotak Kanya.'
        };
      case 'Internship':
        return {
          title: 'Featured Opportunities — Verified Internships',
          subtitle: 'Direct official application portals for student internships at Google, Microsoft, Amazon, NITI Aayog, ISRO, RBI, Flipkart & Goldman Sachs.',
          bannerTitle: 'Direct Internship Application Portals Active',
          bannerDesc: 'Click "Apply" on any internship card to navigate directly to the official careers portal (Google, Microsoft, Amazon, NITI Aayog, RBI, ISRO, Flipkart) and apply directly.'
        };
      default:
        return {
          title: 'Featured Opportunities',
          subtitle: 'Hand-verified positions across all streams with direct official application links and authentic deadlines.',
          bannerTitle: 'Direct Official Portals for Students',
          bannerDesc: 'Verified apply links for top internships, scholarships, hackathons, research positions, coding contests, workshops, fellowships, and merit competitions.'
        };
    }
  };

  const meta = getCategoryMeta(activeTab);

  const TABS_LIST: (OpportunityType | 'All')[] = [
    'All',
    'Internship',
    'Scholarship',
    'Hackathon',
    'Research',
    'Coding Contest',
    'Fellowship',
    'Workshop',
    'Competition'
  ];

  return (
    <section id="explore-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Listings</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {meta.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              {meta.subtitle}
            </p>
          </div>

          {/* Quick Filter Tabs (All 8 Functional Categories) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
            {TABS_LIST.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? 'All' : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Banner */}
        <div className="mb-6 px-4 py-3 bg-gradient-to-r from-indigo-50/90 via-emerald-50/70 to-indigo-50/90 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-indigo-950">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">
                {meta.bannerTitle}
              </span>
              <span className="text-slate-600 text-[11px]">
                {meta.bannerDesc}
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-100 shrink-0 tabular-nums shadow-2xs">
            {filteredOpportunities.length} Available
          </span>
        </div>

        {/* Opportunities Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map(opp => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isBookmarked={bookmarkedIds.includes(opp.id)}
                onToggleBookmark={onToggleBookmark}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 border border-dashed border-slate-300 rounded-2xl bg-slate-50">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No matching opportunities found
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any opportunities matching your active filters. Try loosening some criteria.
            </p>
            <button
              onClick={onClearFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

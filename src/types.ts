export type OpportunityType = 
  | 'Internship' 
  | 'Scholarship' 
  | 'Fellowship' 
  | 'Hackathon' 
  | 'Research' 
  | 'Coding Contest' 
  | 'Workshop' 
  | 'Competition';

export type OpportunityMode = 'Remote' | 'On-site' | 'Hybrid';

export type ApplicationFee = 'Free' | 'Paid';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  location: string;
  mode: OpportunityMode;
  field: string;
  tags: string[];
  deadline: string; // YYYY-MM-DD
  deadlineTime?: string; // e.g. '11:59 PM IST' or '5:00 PM IST'
  stipendOrPrize?: string;
  eligibility: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  skillsRequired: string[];
  benefits: string[];
  applicationUrl: string;
  importantDates: { label: string; date: string }[];
  isVerified: boolean;
  verificationBadge: 'Verified Opportunity' | 'Official Source' | 'Deadline Verified';
  featured?: boolean;
  applicationFee: ApplicationFee;
  verifiedBy: string;
  officialSourceUrl?: string;
}

export type ApplicationStatus = 
  | 'Saved' 
  | 'Applied' 
  | 'Shortlisted' 
  | 'Interview' 
  | 'Selected' 
  | 'Rejected';

export interface TrackedApplication {
  id: string;
  opportunityId: string;
  opportunity?: Opportunity;
  status: ApplicationStatus;
  updatedAt: string;
  notes?: string;
  appliedDate?: string;
  nextStep?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  institution: string;
  avatar: string;
  selectedInterests: string[];
  savedOpportunityIds: string[];
}

export interface ApplicantAccount {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: string;
  institution: string;
  selectedInterests: string[];
  bookmarkedIds: string[];
  trackedApplications: TrackedApplication[];
  lastActive: string;
}

export interface CandidateProfile {
  phone: string;
  fieldOfStudy: string;
  yearOfStudy: string;
  preferredTypes: OpportunityType[];
  skills: string[];
  modePreference: 'All' | OpportunityMode;
  candidateName?: string;
  institution?: string;
  completedAt?: string;
}

export interface FilterState {
  searchQuery: string;
  type: OpportunityType | 'All';
  mode: OpportunityMode | 'All';
  field: string;
  location: string;
  eligibility: string;
  deadlineUrgency: 'all' | '7days' | '14days' | '30days' | '60days';
  fee: 'All' | 'Free' | 'Paid';
}

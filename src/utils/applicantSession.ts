import { ApplicantAccount, TrackedApplication } from '../types';

const STORAGE_ACTIVE_ID_KEY = 'students_trust_active_applicant_id';
const STORAGE_APPLICANTS_KEY = 'students_trust_all_applicant_accounts';

// Seed demo applicants if empty so users can test multi-applicant login immediately
export const DEFAULT_SEED_APPLICANTS: ApplicantAccount[] = [
  {
    id: 'applicant-priya-sharma',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@nit.edu.in',
    role: '3rd Year B.Tech Computer Science',
    institution: 'National Institute of Technology (NIT)',
    selectedInterests: ['Web Development', 'AI / ML', 'Cybersecurity'],
    bookmarkedIds: ['opp-1', 'opp-in-1', 'opp-hack-1'],
    trackedApplications: [
      {
        id: 'app-init-1',
        opportunityId: 'opp-1',
        status: 'Applied',
        updatedAt: '2026-10-02',
        appliedDate: '2026-10-02',
        notes: 'Submitted resume via career portal. Technical assessment link received.'
      },
      {
        id: 'app-init-scholarship-1',
        opportunityId: 'opp-in-1',
        status: 'Applied',
        updatedAt: '2026-09-28',
        appliedDate: '2026-09-28',
        notes: 'One-Time Registration (OTR) completed on NSP scholarships.gov.in. Under college nodal officer verification.'
      },
      {
        id: 'app-init-3',
        opportunityId: 'opp-3',
        status: 'Shortlisted',
        updatedAt: '2026-10-03',
        notes: 'Faculty advisor endorsed proposal in generative models.'
      }
    ],
    lastActive: '2026-10-04T08:00:00.000Z'
  },
  {
    id: 'applicant-aarav-mehta',
    name: 'Aarav Mehta',
    phone: '+91 91234 56789',
    email: 'aarav.mehta@iisc.ac.in',
    role: 'Master of Science in Data & Intelligence',
    institution: 'Indian Institute of Science (IISc Bengaluru)',
    selectedInterests: ['Research', 'AI / ML', 'Data Science', 'Electronics'],
    bookmarkedIds: ['opp-res-1', 'opp-code-1', 'opp-fel-1'],
    trackedApplications: [
      {
        id: 'app-aarav-1',
        opportunityId: 'opp-res-1',
        status: 'Applied',
        updatedAt: '2026-10-03',
        appliedDate: '2026-10-03',
        notes: 'Submitted VSRP research proposal on theoretical physics and generative models.'
      },
      {
        id: 'app-aarav-2',
        opportunityId: 'opp-fel-1',
        status: 'Shortlisted',
        updatedAt: '2026-10-01',
        notes: 'Qualified for national discipline selection interviews at IISc.'
      }
    ],
    lastActive: '2026-10-03T15:30:00.000Z'
  }
];

export const getStoredApplicants = (): ApplicantAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_APPLICANTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading applicants list:', e);
  }
  // Initialize with seed accounts
  localStorage.setItem(STORAGE_APPLICANTS_KEY, JSON.stringify(DEFAULT_SEED_APPLICANTS));
  return DEFAULT_SEED_APPLICANTS;
};

export const saveApplicantAccount = (account: ApplicantAccount): void => {
  try {
    const all = getStoredApplicants();
    const existingIndex = all.findIndex(a => a.id === account.id || (account.phone && a.phone === account.phone));
    if (existingIndex >= 0) {
      all[existingIndex] = { ...all[existingIndex], ...account, lastActive: new Date().toISOString() };
    } else {
      all.push({ ...account, lastActive: new Date().toISOString() });
    }
    localStorage.setItem(STORAGE_APPLICANTS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving applicant account:', e);
  }
};

export const getActiveApplicantId = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
  } catch (e) {
    return null;
  }
};

export const setActiveApplicantId = (id: string | null): void => {
  try {
    if (id) {
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, id);
    } else {
      localStorage.removeItem(STORAGE_ACTIVE_ID_KEY);
    }
  } catch (e) {
    console.error('Error setting active applicant ID:', e);
  }
};

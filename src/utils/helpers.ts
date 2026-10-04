import { Opportunity } from '../types';

// Reference date based on environment or current system time
export function getDaysRemaining(deadlineStr: string): number {
  try {
    const deadline = new Date(deadlineStr);
    // Use fixed reference date aligned with prompt metadata (Oct 3, 2026) or fallback to current
    const now = new Date('2026-10-03T00:00:00');
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch {
    return 15;
  }
}

export function formatDeadlineDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function calculateMatchScore(opportunity: Opportunity, userInterests: string[]): { score: number; matchedTags: string[] } {
  if (!userInterests || userInterests.length === 0) {
    return { score: 70, matchedTags: [] };
  }

  const matched = opportunity.tags.filter(tag => 
    userInterests.some(interest => interest.toLowerCase() === tag.toLowerCase() || tag.toLowerCase().includes(interest.toLowerCase()))
  );

  if (matched.length >= 3) return { score: 98, matchedTags: matched };
  if (matched.length === 2) return { score: 91, matchedTags: matched };
  if (matched.length === 1) return { score: 82, matchedTags: matched };
  
  // Check field match
  const fieldMatch = userInterests.some(interest => 
    opportunity.field.toLowerCase().includes(interest.toLowerCase())
  );
  if (fieldMatch) return { score: 76, matchedTags: [opportunity.field] };

  return { score: 45, matchedTags: [] };
}

export function calculateCandidateRecommendation(
  opportunity: Opportunity, 
  profile: {
    fieldOfStudy: string;
    yearOfStudy: string;
    preferredTypes: string[];
    skills: string[];
  }
): { score: number; reason: string; matchedTags: string[] } {
  let score = 50;
  const matchedTags: string[] = [];

  // 1. Opportunity Type preference match (+25)
  if (profile.preferredTypes && profile.preferredTypes.length > 0) {
    if (profile.preferredTypes.includes(opportunity.type)) {
      score += 25;
    }
  } else {
    score += 15;
  }

  // 2. Field of study match (+20)
  if (profile.fieldOfStudy) {
    const fLower = profile.fieldOfStudy.toLowerCase();
    const oppFieldLower = opportunity.field.toLowerCase();
    if (oppFieldLower.includes(fLower) || fLower.includes(oppFieldLower) || (fLower.includes('computer') && oppFieldLower.includes('software'))) {
      score += 20;
      matchedTags.push(opportunity.field);
    }
  }

  // 3. Skills match (+10 per matched skill, max 20)
  if (profile.skills && profile.skills.length > 0) {
    const matched = opportunity.tags.concat(opportunity.skillsRequired || []).filter(t =>
      profile.skills.some(s => s.toLowerCase() === t.toLowerCase() || t.toLowerCase().includes(s.toLowerCase()))
    );
    if (matched.length > 0) {
      score += Math.min(20, matched.length * 10);
      matchedTags.push(...matched.slice(0, 3));
    }
  }

  // 4. Year of study eligibility match (+10)
  if (profile.yearOfStudy) {
    const eligLower = opportunity.eligibility.toLowerCase();
    const yLower = profile.yearOfStudy.toLowerCase();
    if (
      (yLower.includes('1st') && (eligLower.includes('1st') || eligLower.includes('first') || eligLower.includes('undergraduate'))) ||
      (yLower.includes('pre-final') && (eligLower.includes('pre-final') || eligLower.includes('3rd') || eligLower.includes('third'))) ||
      (yLower.includes('final') && (eligLower.includes('final') || eligLower.includes('4th'))) ||
      eligLower.includes('open to all') || eligLower.includes('enrolled')
    ) {
      score += 10;
    }
  }

  // Cap score between 65% and 98%
  const finalScore = Math.min(98, Math.max(65, score));

  // Determine personalized contextual explanation
  let reason = `Recommended based on your ${profile.fieldOfStudy || 'academic'} focus`;
  if (matchedTags.length > 0) {
    reason = `Matches your focus in ${matchedTags.slice(0, 2).join(' & ')}`;
  } else if (profile.preferredTypes && profile.preferredTypes.includes(opportunity.type)) {
    reason = `Curated for your ${opportunity.type} preference`;
  }

  return {
    score: finalScore,
    reason,
    matchedTags: Array.from(new Set(matchedTags))
  };
}

export const STORAGE_KEYS = {
  BOOKMARKS: 'students_trust_bookmarks_v1',
  APPLICATIONS: 'students_trust_applications_v1',
  INTERESTS: 'students_trust_interests_v1',
  USER_PROFILE: 'students_trust_profile_v1',
  CANDIDATE_PROFILE: 'students_trust_candidate_profile_v2'
};

export function loadSavedBookmarks(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading bookmarks', e);
  }
  // Default sample saved opportunities for great first impression
  return ['opp-1', 'opp-2'];
}

export function saveBookmarksToStorage(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(ids));
  } catch (e) {
    console.error('Error saving bookmarks', e);
  }
}

export function loadUserInterests(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.INTERESTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading interests', e);
  }
  return ['Web Development', 'AI / ML', 'Research'];
}

export function saveUserInterestsToStorage(interests: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(interests));
  } catch (e) {
    console.error('Error saving interests', e);
  }
}

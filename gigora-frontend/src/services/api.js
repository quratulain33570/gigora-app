// 🌐 Centralized API Service for Gigora Backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

/**
 * 1️⃣ Optimize Gig SEO
 */
export const optimizeGigSeoApi = async ({ title, category, description }) => {
  const response = await fetch(`${API_BASE_URL}/api/seo/optimize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, category, description }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to optimize Gig SEO 🚨');
  }

  return response.json();
};

/**
 * 2️⃣ Generate Proposal
 */
export const generateProposalApi = async ({ jobDescription, clientName, tone, mySkillHighlight }) => {
  const response = await fetch(`${API_BASE_URL}/api/proposal/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      job_description: jobDescription,
      client_name: clientName,
      tone: tone,
      skill_highlight: mySkillHighlight,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to generate proposal 🚨');
  }

  return response.json();
};

/**
 * 3️⃣ Analyze Freelancer Profile
 */
export const analyzeProfileApi = async ({ profileText, targetRole }) => {
  const response = await fetch(`${API_BASE_URL}/api/profile/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile_text: profileText,
      target_role: targetRole,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to analyze profile 🚨');
  }

  return response.json();
};
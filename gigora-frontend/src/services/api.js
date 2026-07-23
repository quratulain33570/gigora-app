const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = Array.isArray(body.detail) ? body.detail[0]?.msg : body.detail;
    const error = new Error(detail || 'Something went wrong.');
    error.status = response.status;
    error.remainingUses = body.remaining_uses;
    throw error;
  }

  return response.json();
};

export const optimizeGigSeoApi = ({ title, category, description }) => request('/api/seo/optimize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, category, description }),
});

export const generateProposalApi = (payload) => request('/api/proposal/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    job_description: payload?.jobDescription || payload?.job_description || payload || '',
    client_name: payload?.clientName || payload?.client_name || '',
    tone: payload?.tone || 'Professional',
    skill_highlight: payload?.mySkillHighlight || payload?.skill_highlight || '',
  }),
});

export const analyzeProfileApi = (payload) => request('/api/profile/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    profile_text: typeof payload === 'string' ? payload : (payload?.profileText || payload?.profile_text || ''),
    target_role: typeof payload === 'object' ? (payload?.targetRole || '') : '',
  }),
});

export const getDashboardStatsApi = () => request('/api/dashboard/stats');
export const getHistoryApi = (limit) => request(`/api/history${limit ? `?limit=${limit}` : ''}`);
export const deleteHistoryApi = (id) => request(`/api/history/${id}`, { method: 'DELETE' });
export const getUserProfileApi = () => request('/api/user/profile');

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

export const decisions = {
  getAll: (params) => api.get('/decisions', { params }),
  getById: (id) => api.get(`/decisions/${id}`),
  create: (data) => api.post('/decisions', data),
  update: (id, data) => api.put(`/decisions/${id}`, data),
  delete: (id) => api.delete(`/decisions/${id}`),
  getMyDecisions: () => api.get('/decisions/my'),
  addOption: (decisionId, data) => api.post(`/decisions/${decisionId}/options`, data),
  removeOption: (decisionId, optionId) => api.delete(`/decisions/${decisionId}/options/${optionId}`),
  addFactor: (decisionId, data) => api.post(`/decisions/${decisionId}/factors`, data),
  setScore: (decisionId, data) => api.post(`/decisions/${decisionId}/scores`, data),
  addProCon: (decisionId, data) => api.post(`/decisions/${decisionId}/procons`, data),
  search: (query) => api.get('/decisions/search', { params: { q: query } }),
};

export const polls = {
  getByDecision: (decisionId) => api.get(`/polls/decision/${decisionId}`),
  getById: (id) => api.get(`/polls/${id}`),
  create: (data) => api.post('/polls', data),
  vote: (id, data) => api.post(`/polls/${id}/vote`, data),
  getResults: (id) => api.get(`/polls/${id}/results`),
  close: (id) => api.post(`/polls/${id}/close`),
  getActive: () => api.get('/polls/active'),
  hasVoted: (id) => api.get(`/polls/${id}/hasVoted`),
};

export const comments = {
  getByDecision: (decisionId) => api.get(`/comments/decision/${decisionId}`),
  create: (data) => api.post('/comments', data),
  update: (id, data) => api.put(`/comments/${id}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
};

export const communities = {
  getAll: () => api.get('/communities'),
  getById: (id) => api.get(`/communities/${id}`),
  create: (data) => api.post('/communities', data),
  update: (id, data) => api.put(`/communities/${id}`, data),
  getMy: () => api.get('/communities/my'),
  join: (id) => api.post(`/communities/${id}/join`),
  leave: (id) => api.post(`/communities/${id}/leave`),
  getMembers: (id) => api.get(`/communities/${id}/members`),
  search: (query) => api.get('/communities/search', { params: { q: query } }),
};

export const notifications = {
  getAll: () => api.get('/notifications'),
  getUnreadCount: () => api.get('/notifications/unread/count'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read/all'),
  delete: (id) => api.delete(`/notifications/${id}`),
};

export const analytics = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getVoteDistribution: (decisionId) => api.get(`/analytics/votes/${decisionId}`),
  getTrends: () => api.get('/analytics/trends'),
  getCategories: () => api.get('/analytics/categories'),
  getUserActivity: () => api.get('/analytics/activity'),
};

export const reports = {
  getDecisionPdf: (id) => api.get(`/reports/decision/${id}/pdf`, { responseType: 'blob' }),
  getPollCsv: (id) => api.get(`/reports/poll/${id}/csv`, { responseType: 'blob' }),
};

export default {
  auth, decisions, polls, comments, communities, notifications, analytics, reports
};

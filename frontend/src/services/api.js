import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = BACKEND_URL ? `${BACKEND_URL}/api` : null;

// Create axios instance only if backend URL is available
const api = API_BASE ? axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}) : null;

// API Services
export const portfolioAPI = {
  // Fetch projects from GitHub
  getProjects: async () => {
    if (!api) throw new Error('Backend not configured');
    try {
      const response = await api.get('/projects');
      return response.data.projects;
    } catch (error) {
      throw error;
    }
  },

  // Fetch all portfolio data
  getPortfolioData: async () => {
    if (!api) throw new Error('Backend not configured');
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit contact form
  submitContact: async (formData) => {
    if (!api) throw new Error('Backend not configured');
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;

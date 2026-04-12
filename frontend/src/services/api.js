import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API Services
export const portfolioAPI = {
  // Fetch projects from GitHub
  getProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data.projects;
    } catch (error) {
      // Silent fail - return empty array
      throw error;
    }
  },

  // Fetch all portfolio data
  getPortfolioData: async () => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      // Silent fail
      throw error;
    }
  },

  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      // Silent fail
      throw error;
    }
  }
};

export default api;

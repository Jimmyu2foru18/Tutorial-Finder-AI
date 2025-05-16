/**
 * API service for Tutorial Finder AI
 * Handles all communication with the backend server
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  /**
   * Search for tutorials based on query and filters
   * @param {string} query - Search query or category
   * @param {Object} filters - Optional filters for search results
   * @returns {Promise} - Promise resolving to search results
   */
  searchTutorials: async (query, filters = {}) => {
    try {
      // Build query parameters
      const params = { q: query, ...filters };
      
      // Add sources parameter if specified
      if (filters.sources && Array.isArray(filters.sources)) {
        params.sources = filters.sources.join(',');
      }
      
      const response = await axios.get(`${API_URL}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching tutorials:', error);
      throw error;
    }
  },

  /**
   * Get a specific tutorial by ID and source
   * @param {string} id - Tutorial ID
   * @param {string} source - Source platform (youtube, steam, etc.)
   * @returns {Promise} - Promise resolving to tutorial data
   */
  getTutorial: async (id, source) => {
    try {
      const params = { source };
      const response = await axios.get(`${API_URL}/tutorials/${id}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching tutorial:', error);
      throw error;
    }
  },

  /**
   * Get sample tutorials (fallback when APIs are not configured)
   * @returns {Promise} - Promise resolving to sample tutorial data
   */
  getSampleTutorials: async () => {
    try {
      const response = await axios.get(`${API_URL}/sample/tutorials`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sample tutorials:', error);
      throw error;
    }
  },

  /**
   * Submit feedback for a tutorial
   * @param {string} id - Tutorial ID
   * @param {boolean} helpful - Whether the tutorial was helpful
   * @returns {Promise} - Promise resolving to feedback submission result
   */
  submitFeedback: async (id, helpful) => {
    try {
      const response = await axios.post(`${API_URL}/feedback`, {
        tutorialId: id,
        helpful
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
};

export default api;
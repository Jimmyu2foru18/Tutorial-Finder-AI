/**
 * Steam API Service
 * Handles all interactions with the Steam Web API
 */

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_API_URL = 'https://api.steampowered.com';
const STEAM_STORE_API_URL = 'https://store.steampowered.com/api';

/**
 * Steam API Service
 */
const steamService = {
  /**
   * Search for games on Steam
   * @param {string} query - Search query
   * @param {Object} options - Search options
   * @returns {Promise} - Promise resolving to search results
   */
  searchGames: async (query, options = {}) => {
    try {
      if (!STEAM_API_KEY) {
        throw new Error('Steam API key is not configured');
      }

      // Steam doesn't have a direct search API, so we use the store search API
      const params = {
        term: query,
        count: options.count || 10,
        language: options.language || 'english'
      };

      const response = await axios.get(`${STEAM_STORE_API_URL}/storesearch/`, { params });
      
      return response.data.items.map(item => ({
        id: item.id.toString(),
        type: 'game',
        title: item.name,
        source: 'Steam',
        thumbnail: item.tiny_image,
        price: item.price ? item.price.final / 100 : 0, // Convert to dollars
        currency: item.price ? item.price.currency : 'USD'
      }));
    } catch (error) {
      console.error('Error searching Steam games:', error.message);
      if (error.response) {
        console.error('Steam API response error:', error.response.data);
      }
      throw error;
    }
  },

  /**
   * Get detailed information about a specific game
   * @param {string} appId - Steam application ID
   * @returns {Promise} - Promise resolving to game details
   */
  getGameDetails: async (appId) => {
    try {
      if (!STEAM_API_KEY) {
        throw new Error('Steam API key is not configured');
      }

      const params = {
        appids: appId,
        key: STEAM_API_KEY
      };

      const response = await axios.get(`${STEAM_STORE_API_URL}/appdetails/`, { params });
      
      if (!response.data[appId].success) {
        throw new Error('Game not found');
      }

      const gameData = response.data[appId].data;
      
      return {
        id: appId,
        type: 'game',
        title: gameData.name,
        source: 'Steam',
        description: gameData.short_description,
        thumbnail: gameData.header_image,
        price: gameData.price_overview ? gameData.price_overview.final / 100 : 0,
        currency: gameData.price_overview ? gameData.price_overview.currency : 'USD',
        developers: gameData.developers,
        publishers: gameData.publishers,
        genres: gameData.genres.map(genre => genre.description),
        releaseDate: gameData.release_date.date
      };
    } catch (error) {
      console.error('Error fetching Steam game details:', error.message);
      if (error.response) {
        console.error('Steam API response error:', error.response.data);
      }
      throw error;
    }
  },

  /**
   * Get community guides for a specific game
   * @param {string} appId - Steam application ID
   * @param {Object} options - Options for fetching guides
   * @returns {Promise} - Promise resolving to game guides
   */
  getGameGuides: async (appId, options = {}) => {
    try {
      if (!STEAM_API_KEY) {
        throw new Error('Steam API key is not configured');
      }

      // This is a workaround as Steam doesn't have a direct API for guides
      // In a real implementation, you might need to scrape the Steam community pages
      // or use a different approach
      
      // For now, we'll return a mock response
      return [
        {
          id: `guide_${appId}_1`,
          type: 'guide',
          title: 'Beginner\'s Guide',
          creator: 'SteamUser123',
          source: 'Steam Community',
          thumbnail: 'https://placehold.co/400x200/3366CC/FFFFFF?text=Steam+Guide',
          description: 'A comprehensive guide for beginners',
          publishedAt: new Date().toISOString(),
          views: Math.floor(Math.random() * 10000),
          rating: 4.5
        },
        {
          id: `guide_${appId}_2`,
          type: 'guide',
          title: 'Advanced Techniques',
          creator: 'ProGamer456',
          source: 'Steam Community',
          thumbnail: 'https://placehold.co/400x200/CC3366/FFFFFF?text=Advanced+Guide',
          description: 'Advanced techniques and strategies',
          publishedAt: new Date().toISOString(),
          views: Math.floor(Math.random() * 5000),
          rating: 4.8
        }
      ];
    } catch (error) {
      console.error('Error fetching Steam game guides:', error.message);
      if (error.response) {
        console.error('Steam API response error:', error.response.data);
      }
      throw error;
    }
  }
};

module.exports = steamService;
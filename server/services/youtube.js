/**
 * YouTube API Service
 * Handles all interactions with the YouTube Data API
 */

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * YouTube API Service
 */
const youtubeService = {
  /**
   * Search for tutorial videos on YouTube
   * @param {string} query - Search query
   * @param {Object} options - Search options (maxResults, relevanceLanguage, etc.)
   * @returns {Promise} - Promise resolving to search results
   */
  searchTutorials: async (query, options = {}) => {
    try {
      if (!YOUTUBE_API_KEY) {
        throw new Error('YouTube API key is not configured');
      }

      const params = {
        part: 'snippet',
        q: `${query} tutorial`,
        type: 'video',
        maxResults: options.maxResults || 10,
        relevanceLanguage: options.language || 'en',
        videoDuration: options.duration || 'any', // short, medium, long
        key: YOUTUBE_API_KEY
      };

      const response = await axios.get(`${YOUTUBE_API_URL}/search`, { params });
      
      // Transform the response to match our application's data structure
      return response.data.items.map(item => ({
        id: item.id.videoId,
        type: 'video',
        title: item.snippet.title,
        creator: item.snippet.channelTitle,
        source: 'YouTube',
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt
      }));
    } catch (error) {
      console.error('Error searching YouTube tutorials:', error.message);
      if (error.response) {
        console.error('YouTube API response error:', error.response.data);
      }
      throw error;
    }
  },

  /**
   * Get detailed information about a specific YouTube video
   * @param {string} videoId - YouTube video ID
   * @returns {Promise} - Promise resolving to video details
   */
  getVideoDetails: async (videoId) => {
    try {
      if (!YOUTUBE_API_KEY) {
        throw new Error('YouTube API key is not configured');
      }

      const params = {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: YOUTUBE_API_KEY
      };

      const response = await axios.get(`${YOUTUBE_API_URL}/videos`, { params });
      
      if (!response.data.items || response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const video = response.data.items[0];
      
      return {
        id: video.id,
        type: 'video',
        title: video.snippet.title,
        creator: video.snippet.channelTitle,
        source: 'YouTube',
        thumbnail: video.snippet.thumbnails.high.url,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        duration: video.contentDetails.duration, // ISO 8601 format
        views: video.statistics.viewCount,
        likes: video.statistics.likeCount,
        commentCount: video.statistics.commentCount
      };
    } catch (error) {
      console.error('Error fetching YouTube video details:', error.message);
      if (error.response) {
        console.error('YouTube API response error:', error.response.data);
      }
      throw error;
    }
  }
};

module.exports = youtubeService;
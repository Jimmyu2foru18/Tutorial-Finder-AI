/**
 * API Services Index
 * Centralizes all external API integrations
 */

const youtubeService = require('./youtube');
const steamService = require('./steam');

/**
 * Integrated API Service
 * Combines results from multiple content sources
 */
const apiService = {
  /**
   * Search for tutorials across all integrated platforms
   * @param {string} query - Search query
   * @param {Object} options - Search options including source filters
   * @returns {Promise} - Promise resolving to combined search results
   */
  searchTutorials: async (query, options = {}) => {
    try {
      const results = [];
      const errors = [];
      
      // Determine which sources to search based on options
      const sources = options.sources || ['youtube', 'steam'];
      
      // Search YouTube if included in sources
      if (sources.includes('youtube')) {
        try {
          const youtubeResults = await youtubeService.searchTutorials(query, {
            maxResults: options.maxResults || 5,
            language: options.language,
            duration: options.videoDuration
          });
          results.push(...youtubeResults);
        } catch (error) {
          console.error('YouTube search error:', error.message);
          errors.push({ source: 'youtube', message: error.message });
        }
      }
      
      // Search Steam if included in sources
      if (sources.includes('steam')) {
        try {
          // First search for games
          const games = await steamService.searchGames(query, {
            count: 3 // Limit to top 3 games
          });
          
          // For each game, get guides if available
          for (const game of games) {
            try {
              const guides = await steamService.getGameGuides(game.id);
              // Add game information to each guide
              const gameGuides = guides.map(guide => ({
                ...guide,
                gameTitle: game.title,
                gameId: game.id
              }));
              results.push(...gameGuides);
            } catch (guideError) {
              console.error(`Error fetching guides for ${game.title}:`, guideError.message);
            }
          }
        } catch (error) {
          console.error('Steam search error:', error.message);
          errors.push({ source: 'steam', message: error.message });
        }
      }
      
      // Sort results by relevance (in a real app, this would be more sophisticated)
      // For now, we'll just randomize to simulate mixed results from different sources
      results.sort(() => Math.random() - 0.5);
      
      return {
        results,
        errors: errors.length > 0 ? errors : null,
        sources: sources,
        query: query,
        totalResults: results.length
      };
    } catch (error) {
      console.error('Error in integrated tutorial search:', error.message);
      throw error;
    }
  },
  
  /**
   * Get detailed information about a specific tutorial
   * @param {string} id - Tutorial ID
   * @param {string} source - Source platform (youtube, steam, etc.)
   * @returns {Promise} - Promise resolving to tutorial details
   */
  getTutorialDetails: async (id, source) => {
    try {
      switch (source.toLowerCase()) {
        case 'youtube':
          return await youtubeService.getVideoDetails(id);
        
        case 'steam':
          if (id.startsWith('guide_')) {
            // This is a guide ID, we need to parse the game ID
            const [, gameId] = id.match(/guide_([^_]+)_\d+/) || [];
            if (gameId) {
              const guides = await steamService.getGameGuides(gameId);
              return guides.find(guide => guide.id === id) || null;
            }
            throw new Error('Invalid guide ID format');
          } else {
            // This is a game ID
            return await steamService.getGameDetails(id);
          }
        
        default:
          throw new Error(`Unsupported content source: ${source}`);
      }
    } catch (error) {
      console.error(`Error fetching tutorial details from ${source}:`, error.message);
      throw error;
    }
  }
};

module.exports = {
  integrated: apiService,
  youtube: youtubeService,
  steam: steamService
};
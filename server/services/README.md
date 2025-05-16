# Tutorial Finder AI - External API Integrations

This directory contains service modules for integrating with external content platforms to retrieve tutorial content.

## Available Services

### YouTube API Service

The YouTube API service allows searching for and retrieving video tutorials from YouTube.

**Key Features:**
- Search for tutorials based on query terms
- Get detailed information about specific videos
- Configurable search parameters (language, duration, etc.)

### Steam API Service

The Steam API service allows searching for games and retrieving game-related guides and tutorials.

**Key Features:**
- Search for games on the Steam platform
- Get detailed information about specific games
- Retrieve community guides for games

## Integrated API Service

The integrated API service combines results from all available content sources to provide a unified search experience.

**Key Features:**
- Search across multiple platforms simultaneously
- Filter results by source
- Handle errors gracefully when specific APIs are unavailable

## Setup Instructions

1. Obtain API keys for each service:
   - YouTube: Get an API key from the [Google Cloud Console](https://console.cloud.google.com/)
   - Steam: Get an API key from the [Steam Web API](https://steamcommunity.com/dev/apikey)

2. Add your API keys to the `.env` file in the project root:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key
   STEAM_API_KEY=your_steam_api_key
   ```

3. The services will automatically use these keys when making API requests.

## Usage Examples

### Searching for Tutorials

```javascript
const apiServices = require('./services');

// Search across all platforms
const results = await apiServices.integrated.searchTutorials('elden ring boss guide', {
  sources: ['youtube', 'steam'],
  videoDuration: 'medium',
  maxResults: 10
});

// Search only YouTube
const youtubeResults = await apiServices.youtube.searchTutorials('elden ring boss guide', {
  maxResults: 5,
  language: 'en',
  duration: 'medium'
});

// Search Steam games
const steamGames = await apiServices.steam.searchGames('elden ring', {
  count: 3
});
```

### Getting Tutorial Details

```javascript
const apiServices = require('./services');

// Get YouTube video details
const videoDetails = await apiServices.youtube.getVideoDetails('video_id');

// Get Steam game details
const gameDetails = await apiServices.steam.getGameDetails('game_id');

// Get Steam game guides
const gameGuides = await apiServices.steam.getGameGuides('game_id');
```

## Error Handling

All service methods include proper error handling and will throw descriptive errors when API calls fail. Common error scenarios include:

- Missing API keys
- Rate limiting by external APIs
- Network connectivity issues
- Invalid parameters

It's recommended to implement try/catch blocks when using these services to handle potential errors gracefully.

## Future Integrations

Additional content sources planned for future implementation:

- Twitch API for streaming tutorials
- GitHub API for code examples and technical tutorials
- Discord API for community-sourced information

When adding new integrations, follow the existing pattern of creating a dedicated service module and then updating the integrated service to include the new source.
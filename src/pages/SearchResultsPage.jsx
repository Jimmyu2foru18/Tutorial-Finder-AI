import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Typography,
  Box,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Divider,
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import { VIDEO_LENGTH_OPTIONS } from '../constants/filters';

// Sample data for UI demonstration
const sampleResults = [
  {
    id: 1,
    type: 'video',
    title: 'How to Beat Malenia - Complete Strategy Guide',
    thumbnail: 'https://placehold.co/400x200/3366CC/FFFFFF?text=Malenia+Guide',
    source: 'YouTube',
    creator: 'GameGuideGuru',
    views: '1.2M',
    duration: '15:24',
    rating: 4.8,
    ratingCount: 2345,
    description: 'This comprehensive guide covers all phases of the Malenia boss fight with strategies for different builds and playstyles.',
  },
  {
    id: 2,
    type: 'text',
    title: 'Malenia Boss Fight - Tips and Tricks for All Builds',
    source: 'GameFAQs',
    updated: '3 days ago',
    rating: 5.0,
    ratingCount: 876,
    description: 'A detailed walkthrough with specific tips for defeating Malenia with different character builds and weapon combinations.',
  },
  {
    id: 3,
    type: 'video',
    title: 'Elden Ring: Defeating Malenia with a Level 1 Character',
    thumbnail: 'https://placehold.co/400x200/FF9900/FFFFFF?text=Level1+Challenge',
    source: 'Twitch',
    creator: 'EliteSoulsPlayer',
    views: '450K',
    duration: '22:15',
    rating: 4.9,
    ratingCount: 1250,
    description: 'Watch this incredible challenge run where Malenia is defeated without leveling up the character at all.',
  },
  {
    id: 4,
    type: 'text',
    title: 'Malenia\'s Attacks and How to Counter Them',
    source: 'Reddit',
    updated: '1 week ago',
    rating: 4.7,
    ratingCount: 532,
    description: 'A comprehensive breakdown of every attack in Malenia\'s moveset with frame data and recommended counters.',
  },
];

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || queryParams.get('category') || '';
  
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    characterBuild: '',
    difficulty: '',
    videoLength: '',
    source: '',
  });

  // Fetch results from API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setResults([]); // Clear results while loading
        const data = await api.searchTutorials(searchQuery, filters);
        setResults(data.results || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        // Fallback to sample data in case of error
        setResults(sampleResults);
      }
    };
    
    if (searchQuery) {
      fetchResults();
    } else {
      setResults(sampleResults); // Use sample data for empty searches
    }
  }, [searchQuery, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewTutorial = (id) => {
    navigate(`/tutorial/${id}`);
  };

  return (
    <Box>
      {/* Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search: "{searchQuery}"
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">
            {results.length} results found
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
            onClick={() => console.log('Filter clicked')}
          >
            Filter
          </Button>
        </Box>
      </Box>

      {/* Filter Options */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Refine your search:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Character Build</InputLabel>
              <Select
                name="characterBuild"
                value={filters.characterBuild}
                label="Character Build"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="strength">Strength</MenuItem>
                <MenuItem value="dexterity">Dexterity</MenuItem>
                <MenuItem value="intelligence">Intelligence</MenuItem>
                <MenuItem value="faith">Faith</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Difficulty</InputLabel>
              <Select
                name="difficulty"
                value={filters.difficulty}
                label="Difficulty"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="expert">Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Video Length</InputLabel>
              <Select
                name="videoLength"
                value={filters.videoLength}
                label="Video Length"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                {VIDEO_LENGTH_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Source</InputLabel>
              <Select
                name="source"
                value={filters.source}
                label="Source"
                onChange={handleFilterChange}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="youtube">YouTube</MenuItem>
                <MenuItem value="twitch">Twitch</MenuItem>
                <MenuItem value="gamefaqs">GameFAQs</MenuItem>
                <MenuItem value="reddit">Reddit</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results List */}
      <Box>
        {results.map((result) => (
          <Paper 
            key={result.id} 
            sx={{ 
              p: 2, 
              mb: 2, 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'flex-start' }
            }}
          >
            {/* Thumbnail for video results */}
            {result.type === 'video' && (
              <Box 
                sx={{ 
                  width: { xs: '100%', md: 200 }, 
                  height: { xs: 180, md: 120 },
                  mr: { md: 2 },
                  mb: { xs: 2, md: 0 },
                  flexShrink: 0,
                  position: 'relative'
                }}
              >
                <CardMedia
                  component="img"
                  image={result.thumbnail}
                  alt={result.title}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 8, 
                    right: 8, 
                    bgcolor: 'rgba(0,0,0,0.7)', 
                    color: 'white',
                    px: 1,
                    borderRadius: 0.5,
                    fontSize: '0.75rem'
                  }}
                >
                  {result.duration}
                </Box>
              </Box>
            )}
            
            {/* Icon for text results */}
            {result.type === 'text' && (
              <Box 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  mr: 2,
                  bgcolor: 'primary.light',
                  color: 'white',
                  borderRadius: 1,
                  flexShrink: 0
                }}
              >
                <ArticleIcon sx={{ fontSize: 40 }} />
              </Box>
            )}
            
            {/* Content */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {result.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {result.type === 'video' ? `${result.duration} · ` : ''}
                  {result.source} 
                  {result.creator ? ` · ${result.creator}` : ''}
                  {result.views ? ` · ${result.views} views` : ''}
                  {result.updated ? ` · Updated ${result.updated}` : ''}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating 
                  value={result.rating} 
                  precision={0.1} 
                  readOnly 
                  size="small" 
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({result.rating}) · {result.ratingCount} ratings
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                {result.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                {result.type === 'video' ? (
                  <>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<VideoLibraryIcon />}
                      onClick={() => handleViewTutorial(result.id)}
                    >
                      Watch Video
                    </Button>
                    <Button variant="outlined" size="small">
                      Listen to Audio
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<ArticleIcon />}
                      onClick={() => handleViewTutorial(result.id)}
                    >
                      Read Guide
                    </Button>
                    <Button variant="outlined" size="small">
                      Listen to Audio
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      
      {/* Load More Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="outlined" size="large">
          Load More Results
        </Button>
      </Box>
    </Box>
  );
}

export default SearchResultsPage;
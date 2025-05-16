import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Box,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Sample data for UI demonstration
const popularCategories = [
  'RPG', 'FPS', 'Strategy', 'Puzzle', 'MMO', 'Fighting', 'Racing', 'Simulation'
];

const recentSearches = [
  'Elden Ring boss strategies',
  'Minecraft redstone tutorials',
  'League of Legends jungle routes',
];

const featuredTutorials = [
  {
    id: 1,
    title: 'Advanced Valorant Aiming Techniques',
    thumbnail: 'https://placehold.co/400x200/3366CC/FFFFFF?text=Valorant+Aiming',
    description: 'Master advanced aiming techniques to improve your gameplay in Valorant.',
  },
  {
    id: 2,
    title: 'Zelda: Tears of the Kingdom Shrine Guides',
    thumbnail: 'https://placehold.co/400x200/FF9900/FFFFFF?text=Zelda+Shrines',
    description: 'Complete walkthrough for all shrines in Zelda: Tears of the Kingdom.',
  },
  {
    id: 3,
    title: 'Minecraft Redstone Computer Basics',
    thumbnail: 'https://placehold.co/400x200/28A745/FFFFFF?text=Minecraft+Redstone',
    description: 'Learn how to build basic computing systems using redstone in Minecraft.',
  },
  {
    id: 4,
    title: 'Baldur\'s Gate 3 Class Builds',
    thumbnail: 'https://placehold.co/400x200/DC3545/FFFFFF?text=BG3+Builds',
    description: 'Optimal class builds and strategies for Baldur\'s Gate 3.',
  },
];

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Box className="search-container">
      <Typography variant="h3" component="h1" className="search-title" gutterBottom>
        Find the perfect tutorial for any game
      </Typography>
      
      {/* Search Box */}
      <Paper 
        component="form" 
        onSubmit={handleSearch}
        elevation={2} 
        className="search-box"
        sx={{ p: 0.5, display: 'flex', alignItems: 'center' }}
      >
        <TextField
          fullWidth
          placeholder="Search for tutorials..."
          variant="standard"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            disableUnderline: true,
            sx: { px: 2, py: 1 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Popular Categories */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Popular categories:</Typography>
        <Box>
          {popularCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategoryClick(category)}
              className="category-chip"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {/* Recent Searches */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Recent searches:</Typography>
        {recentSearches.map((search, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            className="recent-search-item"
            onClick={() => handleRecentSearchClick(search)}
          >
            {search}
          </Typography>
        ))}
      </Box>

      {/* Featured Tutorials */}
      <Box mt={4} className="featured-tutorials">
        <Typography variant="h6" gutterBottom>Featured tutorials:</Typography>
        <Grid container spacing={3}>
          {featuredTutorials.map((tutorial) => (
            <Grid item xs={12} sm={6} md={3} key={tutorial.id}>
              <Card className="tutorial-card">
                <CardMedia
                  component="img"
                  className="tutorial-card-media"
                  image={tutorial.thumbnail}
                  alt={tutorial.title}
                />
                <CardContent className="tutorial-card-content">
                  <Typography gutterBottom variant="h6" component="div">
                    {tutorial.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tutorial.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/tutorial/${tutorial.id}`)}
                  >
                    View Tutorial
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
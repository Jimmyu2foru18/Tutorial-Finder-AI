import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { AuthService } from './services/authService.js';
import { ErrorHandler } from './services/errorHandler.js';
import tutorialRoutes from './routes/tutorialRoutes.js';
import apiServices from './services/index.js';
import { VIDEO_LENGTH_OPTIONS } from './constants/filters.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for demonstration
const sampleTutorials = [
  {
    id: '1',
    type: 'video',
    title: 'How to Beat Malenia - Complete Strategy Guide',
    creator: 'GameGuideGuru',
    source: 'YouTube',
    duration: '15:24',
    views: '1.2M',
    rating: 4.8,
    ratingCount: 2345,
    thumbnail: 'https://placehold.co/400x200/3366CC/FFFFFF?text=Malenia+Guide',
    description: 'This comprehensive guide covers all phases of the Malenia boss fight with strategies for different builds and playstyles.',
  },
  {
    id: '2',
    type: 'text',
    title: 'Malenia Boss Fight - Tips and Tricks for All Builds',
    creator: 'GameFAQs',
    source: 'GameFAQs',
    updated: '3 days ago',
    rating: 5.0,
    ratingCount: 876,
    description: 'A detailed walkthrough with specific tips for defeating Malenia with different character builds and weapon combinations.',
  },
  // More sample tutorials would be added here
];

// API Routes

// Search tutorials across all platforms
app.get('/api/search', async (req, res) => {
  try {
    const { q, category, characterBuild, difficulty, videoLength, sources } = req.query;
    const query = q || category || '';
    
    console.log(`Search query received: ${query}`);
    
    // Parse sources if provided
    const sourcesList = sources ? sources.split(',') : ['youtube', 'steam'];
    
    // Search using integrated API service
    const results = await apiServices.integrated.searchTutorials(query, {
      sources: sourcesList,
      videoDurationMin: VIDEO_LENGTH_OPTIONS.find(o => o.value === videoLength)?.min,
      videoDurationMax: VIDEO_LENGTH_OPTIONS.find(o => o.value === videoLength)?.max
    });
    
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search service unavailable',
      fallback: sampleTutorials 
    });
  }
});

// Get tutorial details by ID and source
app.get('/api/tutorials/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { source } = req.query;
    
    if (!source) {
      return res.status(400).json({ error: 'Source parameter is required' });
    }
    
    console.log(`Fetching tutorial details for ID: ${id} from source: ${source}`);
    
    const tutorialDetails = await apiServices.integrated.getTutorialDetails(id, source);
    
    if (!tutorialDetails) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    res.json(tutorialDetails);
  } catch (error) {
    console.error('Error fetching tutorial details:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching tutorial details', message: error.message });
  }
});

// Fallback to sample data when APIs are not configured
app.get('/api/sample/tutorials', (req, res) => {
  res.json({
    results: sampleTutorials,
    totalResults: sampleTutorials.length
  });
});

// Get sample tutorial by ID (fallback when APIs are not configured)
app.get('/api/sample/tutorials/:id', (req, res) => {
  const { id } = req.params;
  
  // In a real implementation, this would query a database
  const tutorial = sampleTutorials.find(t => t.id === id);
  
  if (!tutorial) {
    return res.status(404).json({ error: 'Tutorial not found' });
  }
  
  res.json(tutorial);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tutorial_finder')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
AuthService.initializePassport();

// Routes
app.use('/api/tutorials', tutorialRoutes);

// Error handling
app.use(ErrorHandler.handleErrors);
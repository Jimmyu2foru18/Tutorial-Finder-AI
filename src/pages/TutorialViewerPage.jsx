import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  IconButton,
  Link,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// Sample data for UI demonstration
const sampleTutorials = [
  {
    id: '1',
    type: 'video',
    title: 'How to Beat Malenia - Complete Strategy Guide',
    creator: 'GameGuideGuru',
    source: 'YouTube',
    duration: '15:24',
    videoUrl: 'https://example.com/video1.mp4', // Placeholder URL
    thumbnail: 'https://placehold.co/800x450/3366CC/FFFFFF?text=Malenia+Guide',
    keyPoints: [
      { title: 'Phase 1 strategy', timestamp: '01:23' },
      { title: 'Recommended builds and equipment', timestamp: '04:56' },
      { title: 'Avoiding Waterfowl Dance', timestamp: '08:12' },
      { title: 'Phase 2 strategy', timestamp: '10:37' },
    ],
    relatedTutorials: [
      { id: '5', title: 'Elden Ring Stat Builds for Malenia' },
      { id: '6', title: 'Waterfowl Dance Dodge Timing' },
    ],
  },
  {
    id: '2',
    type: 'text',
    title: 'Malenia Boss Fight - Tips and Tricks for All Builds',
    creator: 'GameFAQs',
    source: 'GameFAQs',
    audioUrl: 'https://example.com/audio2.mp3', // Placeholder URL
    content: `
      # Malenia Boss Fight Guide

      Malenia, Blade of Miquella is widely considered one of the most challenging bosses in Elden Ring. This guide will help you overcome this difficult encounter.

      ## Equipment Recommendations

      For this fight, you'll want to prioritize weapons with bleed effects as Malenia is susceptible to hemorrhage. The Rivers of Blood katana is particularly effective when upgraded to +9 or +10. Alternatively, any weapon with the Seppuku ash of war will provide excellent damage output.

      ## Phase 1 Strategy

      Malenia's first phase is characterized by quick slashing attacks and her infamous Waterfowl Dance. Keep these tips in mind:

      1. Maintain medium distance to bait her lunge attacks, which are easier to punish
      2. Roll towards her and to the right for most of her standard attacks
      3. When she jumps into the air for Waterfowl Dance, immediately run away for the first flurry, then roll through the second and third flurries
      4. Use jump attacks to break her poise and create opportunities for critical hits

      ## Phase 2 Strategy

      In the second phase, Malenia gains Scarlet Rot abilities and becomes more aggressive:

      1. Bring Boluses to cure Scarlet Rot or high immunity gear
      2. When she blooms at the start, run away and wait for the flower attack to end
      3. Her dive bomb attack is telegraphed by her flying high into the air - run away when you see this
      4. Be more conservative with attacks as her punishes are more severe in this phase
    `,
    sections: [
      { title: 'Introduction', timestamp: '00:00' },
      { title: 'Equipment', timestamp: '01:45' },
      { title: 'Phase 1', timestamp: '03:30' },
      { title: 'Waterfowl Dance', timestamp: '07:15' },
      { title: 'Phase 2', timestamp: '09:20' },
    ],
  },
];

function TutorialViewerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tutorial data from API
  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const data = await api.getTutorial(id);
        setTutorial(data);
      } catch (error) {
        console.error('Error fetching tutorial:', error);
        // Fallback to sample data in case of error
        const found = sampleTutorials.find(t => t.id === id);
        if (found) {
          setTutorial(found);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTutorial();
  }, [id]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!tutorial) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>Tutorial Not Found</Typography>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box>
      {/* Back Button */}
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to results
      </Button>

      {/* Tutorial Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        {tutorial.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        By {tutorial.creator} · Original source: {tutorial.source}
        {tutorial.duration && ` · ${tutorial.duration}`}
      </Typography>

      {/* Video Player */}
      {tutorial.type === 'video' && (
        <Box sx={{ mb: 3 }}>
          <Paper 
            sx={{ 
              width: '100%', 
              aspectRatio: '16/9',
              bgcolor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img 
              src={tutorial.thumbnail} 
              alt={tutorial.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {!isPlaying && (
              <IconButton 
                sx={{ 
                  position: 'absolute',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  p: 2,
                }}
                onClick={togglePlayPause}
              >
                <PlayArrowIcon sx={{ fontSize: 60 }} />
              </IconButton>
            )}
          </Paper>
          
          {/* Video Controls */}
          <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton size="small">
                <SkipPreviousIcon />
              </IconButton>
              <IconButton size="small" onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton size="small">
                <SkipNextIcon />
              </IconButton>
              <IconButton size="small">
                <VolumeUpIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small">
                <FullscreenIcon />
              </IconButton>
              <IconButton size="small">
                <SettingsIcon />
              </IconButton>
              <Typography variant="body2">
                {currentTime} / {tutorial.duration}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Audio Player for Text Content */}
      {tutorial.type === 'text' && tutorial.audioUrl && (
        <Paper 
          sx={{ 
            p: 2, 
            mb: 3, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="h6" align="center">
            🔊 Audio Version
          </Typography>
          
          <Box sx={{ width: '100%', height: 60, bgcolor: 'primary.light', borderRadius: 1 }}>
            {/* Audio waveform visualization would go here */}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
              <IconButton>
                <VolumeUpIcon />
              </IconButton>
              <Button>1.0x</Button>
            </Box>
            
            <Typography>
              00:00 / {tutorial.duration || '00:00'}
            </Typography>
          </Box>
          
          <Typography variant="subtitle1">
            Current Section: {tutorial.sections?.[0]?.title || 'Introduction'}
          </Typography>
        </Paper>
      )}

      {/* Text Content */}
      {tutorial.type === 'text' && tutorial.content && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>Transcript:</Typography>
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
            {tutorial.content}
          </Typography>
        </Paper>
      )}

      {/* Key Points */}
      {tutorial.keyPoints && tutorial.keyPoints.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>Key Points:</Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {tutorial.keyPoints.map((point, index) => (
              <Typography component="li" key={index} sx={{ mb: 1 }}>
                {point.title} {point.timestamp && `begins at ${point.timestamp}`}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {/* Jump to Section (for text/audio content) */}
      {tutorial.sections && tutorial.sections.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>Jump to section:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {tutorial.sections.map((section, index) => (
              <Chip 
                key={index} 
                label={`${section.title} (${section.timestamp})`} 
                onClick={() => console.log(`Jump to ${section.timestamp}`)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Related Tutorials */}
      {tutorial.relatedTutorials && tutorial.relatedTutorials.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>Related Tutorials:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {tutorial.relatedTutorials.map((related, index) => (
              <Card key={index} sx={{ maxWidth: 300, flex: '1 1 300px' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {related.title}
                  </Typography>
                  <Button 
                    sx={{ mt: 1 }}
                    onClick={() => navigate(`/tutorial/${related.id}`)}
                  >
                    View Tutorial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Feedback */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Typography>Was this helpful?</Typography>
        <IconButton color="primary">
          <ThumbUpIcon />
        </IconButton>
        <IconButton>
          <ThumbDownIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TutorialViewerPage;
import { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Slider, Typography, Box } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, Speed } from '@mui/icons-material';

export default function MediaPlayer({ src, transcript }) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={togglePlay} color="primary">
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        
        <Slider
          value={currentTime}
          max={audioRef.current?.duration || 0}
          onChange={handleSeek}
          sx={{ flexGrow: 1 }}
        />
        
        <Typography variant="body2">
          {formatTime(currentTime)} / {formatTime(audioRef.current?.duration || 0)}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VolumeUp />
          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.1}
            onChange={(e, v) => setVolume(v)}
            sx={{ width: 100 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Speed />
          <Slider
            value={playbackRate}
            min={0.5}
            max={2}
            step={0.25}
            onChange={(e, v) => setPlaybackRate(v)}
            sx={{ width: 100 }}
          />
        </Box>
      </Box>
      
      {transcript && (
        <Box sx={{ mt: 2, maxHeight: 200, overflowY: 'auto' }}>
          {transcript.map((entry, index) => (
            <Typography
              key={index}
              sx={{
                bgcolor: currentTime >= entry.start && currentTime < entry.end ? 'action.selected' : 'background.paper',
                p: 1,
                borderRadius: 1
              }}
            >
              {entry.text}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

MediaPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  transcript: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  )
};
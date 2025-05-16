export const VIDEO_LENGTH_OPTIONS = [
  {
    value: 'short',
    label: 'Short (&lt; 5 min)',
    min: 0,
    max: 300
  },
  {
    value: 'medium',
    label: 'Medium (5-15 min)',
    min: 300,
    max: 900
  },
  {
    value: 'long',
    label: 'Long (&gt; 15 min)',
    min: 900,
    max: Infinity
  }
];

export const DEFAULT_FILTERS = {
  CHARACTER_BUILD_OPTIONS: ['strength', 'dexterity', 'intelligence', 'faith', 'hybrid'],
  DIFFICULTY_OPTIONS: ['beginner', 'intermediate', 'advanced', 'expert'],
  SOURCE_OPTIONS: ['youtube', 'twitch', 'gamefaqs', 'steam']
};
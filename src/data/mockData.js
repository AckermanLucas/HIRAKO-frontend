export const GENRES = [
  { id: 1, name: 'Pop', color: '#ec4899', emoji: '🎤' },
  { id: 2, name: 'Hip-Hop', color: '#f59e0b', emoji: '🎧' },
  { id: 3, name: 'Electronic', color: '#7c3aed', emoji: '🎛️' },
  { id: 4, name: 'R&B', color: '#ef4444', emoji: '🎵' },
  { id: 5, name: 'Rock', color: '#10b981', emoji: '🎸' },
  { id: 6, name: 'Jazz', color: '#3b82f6', emoji: '🎺' },
  { id: 7, name: 'Classical', color: '#8b5cf6', emoji: '🎻' },
  { id: 8, name: 'Lofi', color: '#06b6d4', emoji: '☕' },
  { id: 9, name: 'Metal', color: '#6b7280', emoji: '🤘' },
  { id: 10, name: 'Soul', color: '#f97316', emoji: '💫' },
];

export const ARTISTS = [
  {
    id: 1, name: 'Luna Violet',
    image: 'https://picsum.photos/seed/artist1/300/300',
    followers: '12.4M', genre: 'Pop', verified: true,
    bio: 'Luna Violet est une artiste pop contemporaine connue pour ses mélodies envoûtantes et ses paroles poétiques.',
    color: '#7c3aed',
  },
  {
    id: 2, name: 'Neo Drift',
    image: 'https://picsum.photos/seed/artist2/300/300',
    followers: '8.1M', genre: 'Electronic', verified: true,
    bio: 'Neo Drift repousse les frontières de la musique électronique avec des sons futuristes et hypnotiques.',
    color: '#3b82f6',
  },
  {
    id: 3, name: 'Zara Storm',
    image: 'https://picsum.photos/seed/artist3/300/300',
    followers: '15.7M', genre: 'R&B', verified: true,
    bio: 'Zara Storm captive le monde avec sa voix puissante et ses compositions soul/R&B authentiques.',
    color: '#ec4899',
  },
  {
    id: 4, name: 'Marcus Bell',
    image: 'https://picsum.photos/seed/artist4/300/300',
    followers: '6.3M', genre: 'Hip-Hop', verified: true,
    bio: 'Marcus Bell est un rappeur et producteur qui redéfinit le hip-hop avec des beats innovants.',
    color: '#f59e0b',
  },
  {
    id: 5, name: 'Aria Keys',
    image: 'https://picsum.photos/seed/artist5/300/300',
    followers: '4.8M', genre: 'Jazz', verified: false,
    bio: 'Aria Keys est une pianiste de jazz qui mélange tradition et modernité avec une virtuosité rare.',
    color: '#10b981',
  },
  {
    id: 6, name: 'KYRO',
    image: 'https://picsum.photos/seed/artist6/300/300',
    followers: '9.2M', genre: 'Electronic', verified: true,
    bio: 'KYRO est un DJ et producteur reconnu pour ses sets électriques et ses collaborations mondiales.',
    color: '#ef4444',
  },
];

export const TRACKS = [
  { id: 1, title: 'Midnight Dreams', artist: 'Luna Violet', artistId: 1, album: 'Violet Sky', duration: 214, image: 'https://picsum.photos/seed/track1/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', plays: '24.5M', liked: true, explicit: false, year: 2024 },
  { id: 2, title: 'Neon Pulse', artist: 'Neo Drift', artistId: 2, album: 'Digital Horizon', duration: 187, image: 'https://picsum.photos/seed/track2/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', plays: '18.2M', liked: false, explicit: false, year: 2024 },
  { id: 3, title: 'Ocean Fire', artist: 'Zara Storm', artistId: 3, album: 'Tempest', duration: 243, image: 'https://picsum.photos/seed/track3/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', plays: '31.7M', liked: true, explicit: true, year: 2023 },
  { id: 4, title: 'Street Philosophy', artist: 'Marcus Bell', artistId: 4, album: 'Bell Tower', duration: 198, image: 'https://picsum.photos/seed/track4/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', plays: '14.9M', liked: false, explicit: true, year: 2024 },
  { id: 5, title: 'Blue Note', artist: 'Aria Keys', artistId: 5, album: 'Ivory', duration: 312, image: 'https://picsum.photos/seed/track5/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', plays: '8.4M', liked: false, explicit: false, year: 2023 },
  { id: 6, title: 'Ultraviolet', artist: 'KYRO', artistId: 6, album: 'Spectrum', duration: 267, image: 'https://picsum.photos/seed/track6/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', plays: '22.1M', liked: true, explicit: false, year: 2024 },
  { id: 7, title: 'Starfall', artist: 'Luna Violet', artistId: 1, album: 'Violet Sky', duration: 221, image: 'https://picsum.photos/seed/track7/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', plays: '19.8M', liked: false, explicit: false, year: 2024 },
  { id: 8, title: 'Deep Space', artist: 'Neo Drift', artistId: 2, album: 'Digital Horizon', duration: 334, image: 'https://picsum.photos/seed/track8/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', plays: '11.3M', liked: true, explicit: false, year: 2023 },
  { id: 9, title: 'Gold Rush', artist: 'Marcus Bell', artistId: 4, album: 'Bell Tower', duration: 176, image: 'https://picsum.photos/seed/track9/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', plays: '27.6M', liked: false, explicit: true, year: 2024 },
  { id: 10, title: 'Phoenix Rise', artist: 'Zara Storm', artistId: 3, album: 'Tempest', duration: 289, image: 'https://picsum.photos/seed/track10/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', plays: '35.2M', liked: true, explicit: false, year: 2024 },
  { id: 11, title: 'Frequency', artist: 'KYRO', artistId: 6, album: 'Spectrum', duration: 203, image: 'https://picsum.photos/seed/track11/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', plays: '16.4M', liked: false, explicit: false, year: 2023 },
  { id: 12, title: 'Midnight Rain', artist: 'Aria Keys', artistId: 5, album: 'Ivory', duration: 278, image: 'https://picsum.photos/seed/track12/300/300', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', plays: '9.7M', liked: true, explicit: false, year: 2023 },
];

export const PLAYLISTS = [
  { id: 1, name: 'Chill Vibes ✨', description: 'Perfect soundtrack for your relaxing moments', image: 'https://picsum.photos/seed/playlist1/300/300', tracks: [1, 5, 8, 12, 7], owner: 'Hirako', followers: '2.1M', color: '#7c3aed' },
  { id: 2, name: 'Workout Beast Mode 💪', description: 'High energy tracks to fuel your workout', image: 'https://picsum.photos/seed/playlist2/300/300', tracks: [3, 6, 9, 4, 10], owner: 'Hirako', followers: '3.4M', color: '#ef4444' },
  { id: 3, name: 'Late Night Drive 🌙', description: 'The perfect companion for night drives', image: 'https://picsum.photos/seed/playlist3/300/300', tracks: [2, 1, 11, 7, 5], owner: 'Hirako', followers: '1.8M', color: '#3b82f6' },
  { id: 4, name: 'Top Hits 2024 🔥', description: "This year's biggest bangers", image: 'https://picsum.photos/seed/playlist4/300/300', tracks: [10, 9, 6, 3, 1, 4, 7], owner: 'Hirako', followers: '8.9M', color: '#ec4899' },
  { id: 5, name: 'Focus Flow 🧠', description: 'Music to help you concentrate and be productive', image: 'https://picsum.photos/seed/playlist5/300/300', tracks: [5, 12, 8, 2, 11], owner: 'Hirako', followers: '1.2M', color: '#10b981' },
  { id: 6, name: 'My Favorites ❤️', description: 'All your liked songs in one place', image: 'https://picsum.photos/seed/playlist6/300/300', tracks: [1, 3, 6, 8, 10, 12], owner: 'You', followers: null, color: '#f59e0b' },
];

export const ALBUMS = [
  { id: 1, name: 'Violet Sky', artist: 'Luna Violet', artistId: 1, year: 2024, image: 'https://picsum.photos/seed/album1/300/300', tracks: [1, 7], color: '#7c3aed' },
  { id: 2, name: 'Digital Horizon', artist: 'Neo Drift', artistId: 2, year: 2024, image: 'https://picsum.photos/seed/album2/300/300', tracks: [2, 8], color: '#3b82f6' },
  { id: 3, name: 'Tempest', artist: 'Zara Storm', artistId: 3, year: 2023, image: 'https://picsum.photos/seed/album3/300/300', tracks: [3, 10], color: '#ec4899' },
  { id: 4, name: 'Bell Tower', artist: 'Marcus Bell', artistId: 4, year: 2024, image: 'https://picsum.photos/seed/album4/300/300', tracks: [4, 9], color: '#f59e0b' },
  { id: 5, name: 'Ivory', artist: 'Aria Keys', artistId: 5, year: 2023, image: 'https://picsum.photos/seed/album5/300/300', tracks: [5, 12], color: '#10b981' },
  { id: 6, name: 'Spectrum', artist: 'KYRO', artistId: 6, year: 2024, image: 'https://picsum.photos/seed/album6/300/300', tracks: [6, 11], color: '#ef4444' },
];

export const RECENT_SEARCHES = ['Luna Violet', 'Lofi Study', 'Neo Drift', 'Top 50'];

export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatNumber = (num) => {
  if (typeof num === 'string') return num;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

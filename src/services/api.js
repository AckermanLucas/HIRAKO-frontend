// Utilise la variable d'environnement selon l'environnement
const BACKEND = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const API = `${BACKEND}/api`;

// ============================================================
// TRANSFORMERS
// ============================================================
export const transformTrack = (t) => {
  if (!t) return null;
  return {
    id: t.id,
    title: t.title || t.title_short || 'Unknown Title',
    artist: t.artist?.name || 'Unknown Artist',
    artistId: t.artist?.id || null,
    album: t.album?.title || 'Unknown Album',
    albumId: t.album?.id || null,
    duration: t.duration || 0,
    image: t.album?.cover_xl || t.album?.cover_big || t.album?.cover_medium ||
           `https://picsum.photos/seed/${t.id}/300/300`,
    audioUrl: t.preview || null,
    plays: t.rank ? `${(t.rank / 100000).toFixed(1)}M` : '—',
    liked: false,
    explicit: t.explicit_lyrics || false,
    year: t.album?.release_date
      ? new Date(t.album.release_date).getFullYear()
      : new Date().getFullYear(),
    deezerUrl: t.link || null,
    isReal: true,
  };
};

export const transformArtist = (a) => {
  if (!a) return null;
  const fans = a.nb_fan || 0;
  return {
    id: a.id,
    name: a.name,
    image: a.picture_xl || a.picture_big || a.picture_medium ||
           `https://picsum.photos/seed/artist${a.id}/300/300`,
    followers: fans >= 1000000
      ? `${(fans / 1000000).toFixed(1)}M`
      : fans >= 1000 ? `${(fans / 1000).toFixed(0)}K` : `${fans}`,
    genre: 'Music',
    verified: fans > 100000,
    bio: `Découvrez ${a.name} sur Hirako.`,
    color: '#7c3aed',
    isReal: true,
  };
};

export const transformAlbum = (a) => {
  if (!a) return null;
  return {
    id: a.id,
    name: a.title,
    artist: a.artist?.name || 'Unknown',
    artistId: a.artist?.id || null,
    year: a.release_date ? new Date(a.release_date).getFullYear() : null,
    image: a.cover_xl || a.cover_big || a.cover_medium ||
           `https://picsum.photos/seed/album${a.id}/300/300`,
    tracks: [],
    color: '#7c3aed',
    tracksCount: a.nb_tracks || 0,
    isReal: true,
  };
};

// ============================================================
// FETCH HELPER
// ============================================================
const apiFetch = async (url, options = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
};

// ============================================================
// BACKEND STATUS
// ============================================================
export const checkBackend = async () => {
  try {
    const data = await apiFetch(`${BACKEND}/health`);
    return data.status === 'OK';
  } catch {
    return false;
  }
};

// ============================================================
// SEARCH
// ============================================================
export const searchAll = async (query) => {
  try {
    const [tracks, artists, albums] = await Promise.all([
      apiFetch(`${API}/deezer/search/track?q=${encodeURIComponent(query)}&limit=20`),
      apiFetch(`${API}/deezer/search/artist?q=${encodeURIComponent(query)}&limit=8`),
      apiFetch(`${API}/deezer/search/album?q=${encodeURIComponent(query)}&limit=8`),
    ]);
    return {
      tracks: (tracks.data || []).map(transformTrack).filter(t => t?.audioUrl),
      artists: (artists.data || []).map(transformArtist).filter(Boolean),
      albums: (albums.data || []).map(transformAlbum).filter(Boolean),
    };
  } catch (err) {
    console.error('Search error:', err);
    return { tracks: [], artists: [], albums: [] };
  }
};

// ============================================================
// HOME
// ============================================================
export const getCharts = async () => {
  try {
    const data = await apiFetch(`${API}/deezer/chart`);
    return {
      tracks: (data.tracks?.data || []).map(transformTrack).filter(t => t?.audioUrl),
      artists: (data.artists?.data || []).map(transformArtist).filter(Boolean),
      albums: (data.albums?.data || []).map(transformAlbum).filter(Boolean),
    };
  } catch (err) {
    console.error('Charts error:', err);
    return { tracks: [], artists: [], albums: [] };
  }
};

export const getGenres = async () => {
  try {
    const data = await apiFetch(`${API}/deezer/genres`);
    const colors = ['#ec4899','#f59e0b','#7c3aed','#ef4444','#10b981',
                    '#3b82f6','#8b5cf6','#06b6d4','#6b7280','#f97316','#14b8a6','#a855f7'];
    const emojis = ['🎤','🎧','🎛️','🎵','🎸','🎺','🎻','☕','🤘','💫','🌊','✨'];
    return (data.data || [])
      .filter(g => g.id !== 0)
      .slice(0, 12)
      .map((g, i) => ({
        id: g.id,
        name: g.name,
        image: g.picture_big,
        color: colors[i % colors.length],
        emoji: emojis[i % emojis.length],
      }));
  } catch {
    return [];
  }
};

export const getNewReleases = async () => {
  try {
    const data = await apiFetch(`${API}/deezer/editorial/0/releases?limit=20`);
    return (data.data || []).map(transformAlbum).filter(Boolean);
  } catch {
    return [];
  }
};

export const getHomeData = async () => {
  const [charts, genres, releases] = await Promise.allSettled([
    getCharts(),
    getGenres(),
    getNewReleases(),
  ]);
  return {
    charts: charts.status === 'fulfilled' ? charts.value : { tracks: [], artists: [], albums: [] },
    genres: genres.status === 'fulfilled' ? genres.value : [],
    releases: releases.status === 'fulfilled' ? releases.value : [],
  };
};

// ============================================================
// ARTIST
// ============================================================
export const getArtistFull = async (artistId) => {
  try {
    const [artist, topTracks, albums] = await Promise.all([
      apiFetch(`${API}/deezer/artist/${artistId}`),
      apiFetch(`${API}/deezer/artist/${artistId}/top?limit=10`),
      apiFetch(`${API}/deezer/artist/${artistId}/albums`),
    ]);
    return {
      artist: transformArtist(artist),
      tracks: (topTracks.data || []).map(transformTrack).filter(t => t?.audioUrl),
      albums: (albums.data || []).slice(0, 8).map(transformAlbum).filter(Boolean),
    };
  } catch (err) {
    console.error('Artist error:', err);
    return null;
  }
};

// ============================================================
// ALBUM
// ============================================================
export const getAlbumFull = async (albumId) => {
  try {
    const data = await apiFetch(`${API}/deezer/album/${albumId}`);
    const album = transformAlbum(data);
    album.tracks = (data.tracks?.data || []).map(t => transformTrack({
      ...t,
      album: {
        title: data.title,
        cover_xl: data.cover_xl,
        cover_big: data.cover_big,
        cover_medium: data.cover_medium,
        release_date: data.release_date,
      },
    })).filter(t => t?.audioUrl);
    return album;
  } catch (err) {
    console.error('Album error:', err);
    return null;
  }
};

// ============================================================
// LYRICS
// ============================================================
export const getLyrics = async (artist, title) => {
  try {
    const data = await apiFetch(
      `${API}/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`
    );
    return data.lyrics || null;
  } catch {
    return null;
  }
};

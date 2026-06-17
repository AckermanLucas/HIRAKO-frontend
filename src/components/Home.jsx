import React, { useState, useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { getHomeData, checkBackend } from '../services/api';
import { TRACKS, PLAYLISTS, ARTISTS, ALBUMS, GENRES } from '../data/mockData';
import MIcon from './MIcon';

const Home = () => {
  const { navigate, playTrack } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendOk, setBackendOk] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const ok = await checkBackend();
        if (!mounted) return;
        setBackendOk(ok);

        const data = await getHomeData();
        if (!mounted) return;
        setApiData(data);
      } catch (e) {
        console.error('Home load error:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const topTracks = apiData?.charts?.tracks?.slice(0, 10) || TRACKS;
  const topArtists = apiData?.charts?.artists?.slice(0, 8) || ARTISTS;
  const newAlbums = apiData?.releases?.slice(0, 8) || ALBUMS;
  const genres = apiData?.genres?.length > 0 ? apiData.genres : GENRES;
  const featuredTracks = topTracks.slice(0, 5);
  const featured = featuredTracks[0];

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? t.morning : h < 18 ? t.afternoon : t.evening;
  };

  if (!featured && loading) {
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.textPrimary
      }}>
        Chargement...
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      <div style={{ color: theme.textPrimary }}>
        <h1>{greeting()}</h1>
        <p>{backendOk ? 'Backend connecté' : 'Backend indisponible'}</p>
      </div>
    </div>
  );
};

export default Home;

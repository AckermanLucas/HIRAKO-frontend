import React, { useEffect, useState } from 'react';
import { MusicProvider, useMusicContext } from './context/MusicContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Player from './components/Player';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import Playlist from './components/Playlist';
import ArtistPage from './components/ArtistPage';
import Settings from './components/Settings';
import LocalFiles from './components/LocalFiles';
import './styles/globals.css';

// Dynamic Album page (loads from API if needed)
const AlbumPage = ({ album }) => {
  const { playTrack } = useMusicContext();
  const { theme, isDark } = useTheme();
  const { navigate } = useMusicContext();
  const [fullAlbum, setFullAlbum] = useState(album);
  const [loading, setLoading] = useState(album.fromApi && (!album.tracks || album.tracks.length === 0));

  useEffect(() => {
    if (album.fromApi && (!album.tracks || album.tracks.length === 0)) {
      import('./services/api').then(({ getAlbumFull }) => {
        getAlbumFull(album.id).then(data => {
          if (data) setFullAlbum(data);
          setLoading(false);
        });
      });
    }
  }, [album]);

  const tracks = fullAlbum.tracks || [];

  return (
    <Playlist playlist={{
      ...fullAlbum,
      name: fullAlbum.name,
      description: `${fullAlbum.artist} • ${fullAlbum.year} • ${fullAlbum.tracksCount || tracks.length} titres`,
      owner: fullAlbum.artist,
      tracks: tracks,
      followers: null,
    }} />
  );
};

// Dynamic Artist page
const DynamicArtistPage = ({ artist }) => {
  const [fullData, setFullData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (artist.fromApi) {
      import('./services/api').then(({ getArtistFull }) => {
        getArtistFull(artist.id).then(data => {
          setFullData(data);
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, [artist]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'rotate 0.8s linear infinite' }} />
    </div>
  );

  if (fullData) {
    const mergedArtist = { ...artist, ...fullData.artist, bio: fullData.artist?.bio || artist.bio };
    return <ArtistPage artist={mergedArtist} apiTracks={fullData.tracks} apiAlbums={fullData.albums} />;
  }
  return <ArtistPage artist={artist} />;
};

const MainContent = () => {
  const { currentView, viewData } = useMusicContext();
  const { theme } = useTheme();

  const renderView = () => {
    switch (currentView) {
      case 'home':     return <Home />;
      case 'search':   return <Search />;
      case 'library':  return <Library />;
      case 'playlist': return viewData ? <Playlist playlist={viewData} /> : <Home />;
      case 'artist':   return viewData ? <DynamicArtistPage artist={viewData} /> : <Home />;
      case 'album':    return viewData ? <AlbumPage album={viewData} /> : <Home />;
      case 'liked':    return <Library />;
      case 'settings': return <Settings />;
      case 'localfiles': return <LocalFiles />;
      default:         return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: theme.bgPrimary }}>
        <Header />
        <div style={{ flex: 1, overflow: 'hidden' }}>{renderView()}</div>
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <MusicProvider>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <MainContent />
        <Player />
      </div>
    </MusicProvider>
  </ThemeProvider>
);

export default App;

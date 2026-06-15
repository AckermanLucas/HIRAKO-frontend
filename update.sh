#!/bin/bash

echo "🔄 Mise à jour de Hirako v2.0..."

cd hirako

# ============================================================
# src/context/ThemeContext.jsx
# ============================================================
cat > src/context/ThemeContext.jsx << 'ENDOFFILE'
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

const translations = {
  fr: {
    home: 'Accueil',
    search: 'Recherche',
    library: 'Bibliothèque',
    settings: 'Paramètres',
    quickAccess: 'Accès rapide',
    likedSongs: 'Titres likés',
    createPlaylist: 'Créer une playlist',
    myPlaylists: 'Mes Playlists',
    premium: 'Premium',
    chooseMusic: 'Choisissez une musique pour commencer',
    playNow: 'Écouter maintenant',
    viewPlaylist: 'Voir la playlist',
    weekPlaylist: 'Playlist de la semaine',
    followers: 'Abonnés',
    tracks: 'Titres',
    morning: 'Bonjour',
    afternoon: 'Bon après-midi',
    evening: 'Bonsoir',
    exploreGenre: 'Explorer par genre',
    trending: '🔥 Tendances du moment',
    popularArtists: '⭐ Artistes populaires',
    newAlbums: '💿 Nouveaux albums',
    seeAll: 'Voir tout',
    searchPlaceholder: 'Que voulez-vous écouter ?',
    recentSearches: 'Recherches récentes',
    exploreGenres: 'Explorer les genres',
    noResults: 'Aucun résultat trouvé',
    tryOther: "Essayez avec d'autres mots-clés",
    all: 'Tout',
    artists: 'Artistes',
    playlists: 'Playlists',
    myLibrary: 'Ma Bibliothèque',
    followedArtists: 'Artistes suivis',
    noLiked: 'Aucun titre liké',
    clickLike: 'Cliquez sur ❤️ sur vos titres préférés',
    about: 'À propos',
    popularTracks: 'Titres populaires',
    discography: 'Discographie',
    follow: 'Suivre',
    following: 'Suivi',
    verified: 'Artiste Vérifié',
    plays: 'Écoutes',
    duration: 'Durée',
    album: 'Album',
    title: 'Titre',
    playlist: 'Playlist',
    approx: 'environ',
    min: 'min',
    nowPlaying: 'En cours de lecture',
    upNext: 'À suivre',
    lyrics: 'Paroles',
    queue: 'File d\'attente',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    language: 'Langue',
    audioQuality: 'Qualité audio',
    importMusic: 'Importer de la musique',
    localFiles: 'Fichiers locaux',
    appearance: 'Apparence',
    general: 'Général',
    importSettings: 'Import & Qualité',
    high: 'Haute (320 kbps)',
    medium: 'Moyenne (192 kbps)',
    low: 'Basse (128 kbps)',
    lossless: 'Sans perte (FLAC)',
    importLocal: 'Importer des fichiers',
    importDesc: 'Glissez ou cliquez pour importer vos fichiers MP3, WAV, FLAC, OGG',
    importedTracks: 'Titres importés',
    noImported: 'Aucun titre importé',
    close: 'Fermer',
    fullscreen: 'Plein écran',
    minimize: 'Réduire',
    monthlyListeners: 'abonnés mensuels',
    genre: 'Genre',
    albums: 'Albums',
    seeLess: 'Voir moins',
  },
  en: {
    home: 'Home',
    search: 'Search',
    library: 'Library',
    settings: 'Settings',
    quickAccess: 'Quick Access',
    likedSongs: 'Liked Songs',
    createPlaylist: 'Create a playlist',
    myPlaylists: 'My Playlists',
    premium: 'Premium',
    chooseMusic: 'Choose a song to start',
    playNow: 'Play now',
    viewPlaylist: 'View playlist',
    weekPlaylist: 'Playlist of the week',
    followers: 'Followers',
    tracks: 'Tracks',
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    exploreGenre: 'Browse by genre',
    trending: '🔥 Trending now',
    popularArtists: '⭐ Popular artists',
    newAlbums: '💿 New albums',
    seeAll: 'See all',
    searchPlaceholder: 'What do you want to listen to?',
    recentSearches: 'Recent searches',
    exploreGenres: 'Browse genres',
    noResults: 'No results found',
    tryOther: 'Try different keywords',
    all: 'All',
    artists: 'Artists',
    playlists: 'Playlists',
    myLibrary: 'My Library',
    followedArtists: 'Followed Artists',
    noLiked: 'No liked songs',
    clickLike: 'Click ❤️ on your favorite songs',
    about: 'About',
    popularTracks: 'Popular tracks',
    discography: 'Discography',
    follow: 'Follow',
    following: 'Following',
    verified: 'Verified Artist',
    plays: 'Plays',
    duration: 'Duration',
    album: 'Album',
    title: 'Title',
    playlist: 'Playlist',
    approx: 'about',
    min: 'min',
    nowPlaying: 'Now Playing',
    upNext: 'Up Next',
    lyrics: 'Lyrics',
    queue: 'Queue',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    language: 'Language',
    audioQuality: 'Audio Quality',
    importMusic: 'Import Music',
    localFiles: 'Local Files',
    appearance: 'Appearance',
    general: 'General',
    importSettings: 'Import & Quality',
    high: 'High (320 kbps)',
    medium: 'Medium (192 kbps)',
    low: 'Low (128 kbps)',
    lossless: 'Lossless (FLAC)',
    importLocal: 'Import files',
    importDesc: 'Drag or click to import your MP3, WAV, FLAC, OGG files',
    importedTracks: 'Imported tracks',
    noImported: 'No imported tracks',
    close: 'Close',
    fullscreen: 'Fullscreen',
    minimize: 'Minimize',
    monthlyListeners: 'monthly listeners',
    genre: 'Genre',
    albums: 'Albums',
    seeLess: 'See less',
  },
  es: {
    home: 'Inicio',
    search: 'Buscar',
    library: 'Biblioteca',
    settings: 'Ajustes',
    quickAccess: 'Acceso rápido',
    likedSongs: 'Canciones que te gustan',
    createPlaylist: 'Crear una playlist',
    myPlaylists: 'Mis Playlists',
    premium: 'Premium',
    chooseMusic: 'Elige una canción para empezar',
    playNow: 'Escuchar ahora',
    viewPlaylist: 'Ver playlist',
    weekPlaylist: 'Playlist de la semana',
    followers: 'Seguidores',
    tracks: 'Canciones',
    morning: 'Buenos días',
    afternoon: 'Buenas tardes',
    evening: 'Buenas noches',
    exploreGenre: 'Explorar por género',
    trending: '🔥 Tendencias',
    popularArtists: '⭐ Artistas populares',
    newAlbums: '💿 Nuevos álbumes',
    seeAll: 'Ver todo',
    searchPlaceholder: '¿Qué quieres escuchar?',
    recentSearches: 'Búsquedas recientes',
    exploreGenres: 'Explorar géneros',
    noResults: 'Sin resultados',
    tryOther: 'Intenta con otras palabras',
    all: 'Todo',
    artists: 'Artistas',
    playlists: 'Playlists',
    myLibrary: 'Mi Biblioteca',
    followedArtists: 'Artistas seguidos',
    noLiked: 'No hay canciones favoritas',
    clickLike: 'Haz clic en ❤️ en tus canciones favoritas',
    about: 'Acerca de',
    popularTracks: 'Canciones populares',
    discography: 'Discografía',
    follow: 'Seguir',
    following: 'Siguiendo',
    verified: 'Artista Verificado',
    plays: 'Reproducciones',
    duration: 'Duración',
    album: 'Álbum',
    title: 'Título',
    playlist: 'Playlist',
    approx: 'aprox',
    min: 'min',
    nowPlaying: 'Reproduciendo',
    upNext: 'Siguiente',
    lyrics: 'Letra',
    queue: 'Cola',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    language: 'Idioma',
    audioQuality: 'Calidad de audio',
    importMusic: 'Importar música',
    localFiles: 'Archivos locales',
    appearance: 'Apariencia',
    general: 'General',
    importSettings: 'Import y Calidad',
    high: 'Alta (320 kbps)',
    medium: 'Media (192 kbps)',
    low: 'Baja (128 kbps)',
    lossless: 'Sin pérdida (FLAC)',
    importLocal: 'Importar archivos',
    importDesc: 'Arrastra o haz clic para importar tus archivos MP3, WAV, FLAC, OGG',
    importedTracks: 'Canciones importadas',
    noImported: 'No hay canciones importadas',
    close: 'Cerrar',
    fullscreen: 'Pantalla completa',
    minimize: 'Minimizar',
    monthlyListeners: 'oyentes mensuales',
    genre: 'Género',
    albums: 'Álbumes',
    seeLess: 'Ver menos',
  },
  ja: {
    home: 'ホーム',
    search: '検索',
    library: 'ライブラリ',
    settings: '設定',
    quickAccess: 'クイックアクセス',
    likedSongs: 'お気に入りの曲',
    createPlaylist: 'プレイリストを作成',
    myPlaylists: 'マイプレイリスト',
    premium: 'プレミアム',
    chooseMusic: '曲を選んで再生を開始',
    playNow: '今すぐ再生',
    viewPlaylist: 'プレイリストを見る',
    weekPlaylist: '今週のプレイリスト',
    followers: 'フォロワー',
    tracks: '曲',
    morning: 'おはようございます',
    afternoon: 'こんにちは',
    evening: 'こんばんは',
    exploreGenre: 'ジャンルで探す',
    trending: '🔥 トレンド',
    popularArtists: '⭐ 人気アーティスト',
    newAlbums: '💿 新作アルバム',
    seeAll: 'すべて表示',
    searchPlaceholder: '何を聴きたいですか？',
    recentSearches: '最近の検索',
    exploreGenres: 'ジャンルを探す',
    noResults: '結果が見つかりません',
    tryOther: '他のキーワードを試してください',
    all: 'すべて',
    artists: 'アーティスト',
    playlists: 'プレイリスト',
    myLibrary: 'マイライブラリ',
    followedArtists: 'フォロー中のアーティスト',
    noLiked: 'お気に入りの曲はありません',
    clickLike: '好きな曲の❤️をクリック',
    about: '概要',
    popularTracks: '人気の曲',
    discography: 'ディスコグラフィー',
    follow: 'フォロー',
    following: 'フォロー中',
    verified: '認証済みアーティスト',
    plays: '再生回数',
    duration: '時間',
    album: 'アルバム',
    title: 'タイトル',
    playlist: 'プレイリスト',
    approx: '約',
    min: '分',
    nowPlaying: '再生中',
    upNext: '次の曲',
    lyrics: '歌詞',
    queue: 'キュー',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    language: '言語',
    audioQuality: 'オーディオ品質',
    importMusic: '音楽をインポート',
    localFiles: 'ローカルファイル',
    appearance: '外観',
    general: '一般',
    importSettings: 'インポートと品質',
    high: '高音質 (320 kbps)',
    medium: '標準 (192 kbps)',
    low: '低音質 (128 kbps)',
    lossless: 'ロスレス (FLAC)',
    importLocal: 'ファイルをインポート',
    importDesc: 'MP3、WAV、FLAC、OGGファイルをドラッグまたはクリック',
    importedTracks: 'インポートされた曲',
    noImported: 'インポートされた曲はありません',
    close: '閉じる',
    fullscreen: 'フルスクリーン',
    minimize: '最小化',
    monthlyListeners: '月間リスナー',
    genre: 'ジャンル',
    albums: 'アルバム',
    seeLess: '折りたたむ',
  },
};

const darkTheme = {
  bgPrimary: '#0a0a0f',
  bgSecondary: '#111118',
  bgCard: '#1a1a2e',
  bgHover: '#16213e',
  accentPrimary: '#7c3aed',
  accentSecondary: '#a855f7',
  accentPink: '#ec4899',
  textPrimary: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#52525b',
  borderColor: '#27272a',
  sidebarBg: 'linear-gradient(180deg, #0d0d1a 0%, #0a0a0f 100%)',
  playerBg: 'rgba(10,10,15,0.97)',
  headerBg: 'rgba(10,10,15,0.8)',
  cardShadow: 'rgba(0,0,0,0.3)',
};

const lightTheme = {
  bgPrimary: '#f8f9fc',
  bgSecondary: '#ffffff',
  bgCard: '#ffffff',
  bgHover: '#f0f0f5',
  accentPrimary: '#7c3aed',
  accentSecondary: '#a855f7',
  accentPink: '#ec4899',
  textPrimary: '#1a1a2e',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  borderColor: '#e2e8f0',
  sidebarBg: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
  playerBg: 'rgba(255,255,255,0.97)',
  headerBg: 'rgba(255,255,255,0.9)',
  cardShadow: 'rgba(0,0,0,0.08)',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('hirako-theme');
    return saved ? saved === 'dark' : true;
  });
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('hirako-lang') || 'fr';
  });
  const [audioQuality, setAudioQualityState] = useState(() => {
    return localStorage.getItem('hirako-quality') || 'high';
  });
  const [importedTracks, setImportedTracks] = useState(() => {
    try {
      const saved = localStorage.getItem('hirako-imported');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const theme = isDark ? darkTheme : lightTheme;
  const t = translations[language] || translations.fr;

  useEffect(() => {
    localStorage.setItem('hirako-theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', theme.bgPrimary);
    root.style.setProperty('--bg-secondary', theme.bgSecondary);
    root.style.setProperty('--bg-card', theme.bgCard);
    root.style.setProperty('--bg-hover', theme.bgHover);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-secondary', theme.textSecondary);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--border-color', theme.borderColor);
    document.body.style.backgroundColor = theme.bgPrimary;
    document.body.style.color = theme.textPrimary;
  }, [isDark, theme]);

  useEffect(() => {
    localStorage.setItem('hirako-lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('hirako-quality', audioQuality);
  }, [audioQuality]);

  useEffect(() => {
    localStorage.setItem('hirako-imported', JSON.stringify(importedTracks));
  }, [importedTracks]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const setLanguage = (lang) => setLanguageState(lang);
  const setAudioQuality = (q) => setAudioQualityState(q);

  const addImportedTrack = (track) => {
    setImportedTracks(prev => [...prev, track]);
  };
  const removeImportedTrack = (id) => {
    setImportedTracks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ThemeContext.Provider value={{
      isDark, theme, toggleTheme,
      language, setLanguage, t,
      audioQuality, setAudioQuality,
      importedTracks, addImportedTrack, removeImportedTrack,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
ENDOFFILE

# ============================================================
# src/components/FullScreenPlayer.jsx
# ============================================================
cat > src/components/FullScreenPlayer.jsx << 'ENDOFFILE'
import React, { useState, useEffect, useRef } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { formatDuration } from '../data/mockData';
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward,
  FaRandom, FaRedo, FaVolumeUp, FaVolumeMute,
  FaVolumeDown, FaHeart, FaRegHeart, FaChevronDown,
  FaListUl, FaMusic
} from 'react-icons/fa';
import { MdRepeatOne, MdQueueMusic, MdLyrics } from 'react-icons/md';

const FullScreenPlayer = ({ onClose }) => {
  const {
    currentTrack, isPlaying, progress, duration,
    volume, isMuted, isShuffled, repeatMode, likedTracks,
    togglePlay, handleNext, handlePrev, seekTo,
    setVolume, setIsMuted, toggleLike, toggleShuffle, cycleRepeat,
    queue, currentIndex,
  } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('cover');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);
  const canvasRef = useRef(null);

  const isLiked = currentTrack && likedTracks.includes(currentTrack.id);
  const currentTime = duration ? (progress / 100) * duration : 0;
  const RepeatIcon = repeatMode === 'one' ? MdRepeatOne : FaRedo;

  useEffect(() => {
    if (currentTrack?.image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, 1, 1);
          const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
          setDominantColor(`${r}, ${g}, ${b}`);
        } catch {
          setDominantColor('124, 58, 237');
        }
        setImageLoaded(true);
      };
      img.onerror = () => {
        setDominantColor('124, 58, 237');
        setImageLoaded(true);
      };
      img.src = currentTrack.image;
    }
  }, [currentTrack]);

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(Math.max(0, Math.min(100, pct)));
  };

  if (!currentTrack) return null;

  const bgColor = dominantColor || '124, 58, 237';

  const upcomingTracks = queue.slice(currentIndex + 1, currentIndex + 6);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: isDark
        ? `linear-gradient(180deg, rgba(${bgColor}, 0.4) 0%, rgba(10,10,15,0.98) 40%, rgba(10,10,15,1) 100%)`
        : `linear-gradient(180deg, rgba(${bgColor}, 0.3) 0%, rgba(248,249,252,0.98) 40%, rgba(248,249,252,1) 100%)`,
      display: 'flex', flexDirection: 'column',
      animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(${bgColor}, 0.3); }
          50% { box-shadow: 0 0 80px rgba(${bgColor}, 0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes progressShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .fs-progress-bar { position: relative; height: 6px; background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 3px; cursor: pointer; transition: height 0.2s; }
        .fs-progress-bar:hover { height: 8px; }
        .fs-progress-fill { height: 100%; border-radius: 3px; position: relative; transition: width 0.1s linear;
          background: linear-gradient(90deg, rgba(${bgColor}, 0.8), rgba(${bgColor}, 1), rgba(${bgColor}, 0.8));
          background-size: 200% 100%; animation: progressShine 3s linear infinite; }
        .fs-progress-fill::after { content: ''; position: absolute; right: -8px; top: -5px; width: 16px; height: 16px;
          background: white; border-radius: 50%; opacity: 0; transition: opacity 0.2s; box-shadow: 0 0 15px rgba(${bgColor}, 0.8); }
        .fs-progress-bar:hover .fs-progress-fill::after { opacity: 1; }
        .fs-btn { background: none; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .fs-btn:hover { transform: scale(1.1); }
        .fs-btn:active { transform: scale(0.95); }
        @media (max-width: 768px) {
          .fs-desktop { display: none !important; }
          .fs-mobile-layout { flex-direction: column !important; padding: 16px !important; }
          .fs-cover-size { width: 280px !important; height: 280px !important; }
          .fs-title-size { font-size: 22px !important; }
          .fs-controls-gap { gap: 24px !important; }
        }
        @media (min-width: 769px) {
          .fs-mobile-only { display: none !important; }
        }
      `}</style>

      {/* Background particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${60 + i * 40}px`, height: `${60 + i * 40}px`,
            borderRadius: '50%',
            background: `rgba(${bgColor}, ${0.03 + i * 0.01})`,
            filter: 'blur(40px)',
            top: `${10 + i * 15}%`, left: `${5 + i * 15}%`,
            animation: `float ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}
      </div>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px', position: 'relative', zIndex: 10,
        flexShrink: 0,
      }}>
        <button onClick={onClose} className="fs-btn" style={{
          color: isDark ? 'white' : theme.textPrimary, fontSize: '20px',
          padding: '8px',
        }}>
          <FaChevronDown />
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '2px', color: isDark ? 'rgba(255,255,255,0.5)' : theme.textMuted }}>
            {t.nowPlaying}
          </p>
          <p style={{ fontSize: '13px', fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.7)' : theme.textSecondary, marginTop: '2px' }}>
            {currentTrack.album}
          </p>
        </div>

        <button className="fs-btn" style={{
          color: isDark ? 'rgba(255,255,255,0.5)' : theme.textMuted, fontSize: '18px',
          padding: '8px',
        }}>
          <FaListUl />
        </button>
      </div>

      {/* Main content */}
      <div className="fs-mobile-layout" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 64px', gap: '80px', overflow: 'hidden',
        position: 'relative', zIndex: 10,
      }}>
        {/* Cover Art */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          flex: activeTab === 'cover' ? 1 : 0.6,
          transition: 'flex 0.3s',
        }}>
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="fs-cover-size"
              style={{
                width: '380px', height: '380px',
                objectFit: 'cover', borderRadius: '20px',
                boxShadow: isPlaying
                  ? `0 30px 80px rgba(${bgColor}, 0.4), 0 0 0 1px rgba(255,255,255,0.05)`
                  : `0 20px 60px rgba(0,0,0,0.4)`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isPlaying ? 'scale(1)' : 'scale(0.95)',
                animation: isPlaying ? 'pulseGlow 4s ease-in-out infinite' : 'none',
              }}
            />

            {isPlaying && (
              <div style={{
                position: 'absolute', bottom: '16px', left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', gap: '3px', alignItems: 'flex-end',
                height: '24px', padding: '4px 12px',
                background: 'rgba(0,0,0,0.6)', borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}>
                {[0, 0.15, 0.3, 0.1, 0.25].map((delay, i) => (
                  <div key={i} style={{
                    width: '3px', borderRadius: '2px',
                    background: `rgba(${bgColor}, 1)`,
                    animation: 'equalizer 0.8s ease-in-out infinite',
                    animationDelay: `${delay}s`,
                    height: '4px',
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Track Info */}
          <div style={{ textAlign: 'center', maxWidth: '380px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
                <h2 className="fs-title-size" style={{
                  fontSize: '28px', fontWeight: 800, fontFamily: 'Poppins',
                  color: isDark ? 'white' : theme.textPrimary,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {currentTrack.title}
                </h2>
                <p style={{
                  fontSize: '16px', color: isDark ? 'rgba(255,255,255,0.6)' : theme.textSecondary,
                  marginTop: '4px',
                }}>
                  {currentTrack.artist}
                </p>
              </div>
              <button onClick={() => toggleLike(currentTrack.id)} className="fs-btn" style={{
                color: isLiked ? '#ec4899' : (isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted),
                fontSize: '22px', padding: '8px', flexShrink: 0,
              }}>
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>

          {/* Progress */}
          <div style={{ width: '100%', maxWidth: '380px', marginTop: '24px' }}>
            <div className="fs-progress-bar" onClick={handleProgressClick}>
              <div className="fs-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted }}>
                {formatDuration(Math.floor(currentTime))}
              </span>
              <span style={{ fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted }}>
                {formatDuration(Math.floor(duration))}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="fs-controls-gap" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '32px', marginTop: '24px', width: '100%', maxWidth: '380px',
          }}>
            <button onClick={toggleShuffle} className="fs-btn" style={{
              color: isShuffled
                ? `rgb(${bgColor})`
                : (isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted),
              fontSize: '20px',
            }}>
              <FaRandom />
            </button>
            <button onClick={handlePrev} className="fs-btn" style={{
              color: isDark ? 'rgba(255,255,255,0.8)' : theme.textPrimary, fontSize: '28px',
            }}>
              <FaStepBackward />
            </button>
            <button onClick={togglePlay} className="fs-btn" style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: isDark ? 'white' : theme.textPrimary,
              color: isDark ? '#0a0a0f' : 'white',
              fontSize: '24px',
              boxShadow: `0 8px 30px rgba(${bgColor}, 0.4)`,
            }}>
              {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={handleNext} className="fs-btn" style={{
              color: isDark ? 'rgba(255,255,255,0.8)' : theme.textPrimary, fontSize: '28px',
            }}>
              <FaStepForward />
            </button>
            <button onClick={cycleRepeat} className="fs-btn" style={{
              color: repeatMode !== 'none'
                ? `rgb(${bgColor})`
                : (isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted),
              fontSize: '20px',
            }}>
              <RepeatIcon />
            </button>
          </div>

          {/* Volume (desktop) */}
          <div className="fs-desktop" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginTop: '24px', width: '100%', maxWidth: '250px',
          }}>
            <button onClick={() => setIsMuted(!isMuted)} className="fs-btn" style={{
              color: isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted, fontSize: '16px',
            }}>
              {isMuted || volume === 0 ? <FaVolumeMute /> : volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
            </button>
            <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
              onChange={e => { setVolume(parseFloat(e.target.value)); if (isMuted) setIsMuted(false); }}
              style={{ flex: 1 }} />
          </div>
        </div>

        {/* Right panel - Queue (desktop only) */}
        <div className="fs-desktop" style={{
          width: '340px', maxHeight: '500px',
          background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          borderRadius: '20px', padding: '24px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`,
          backdropFilter: 'blur(20px)', overflowY: 'auto', flexShrink: 0,
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderRadius: '12px', padding: '3px' }}>
            {[
              { id: 'queue', label: t.upNext, icon: MdQueueMusic },
              { id: 'lyrics', label: t.lyrics, icon: MdLyrics },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: 1, padding: '8px 12px', borderRadius: '10px', border: 'none',
                background: activeTab === tab.id ? `rgba(${bgColor}, 0.3)` : 'transparent',
                color: activeTab === tab.id ? (isDark ? 'white' : theme.textPrimary) : (isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted),
                cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
                <tab.icon style={{ fontSize: '14px' }} /> {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'queue' && (
            <>
              <p style={{
                fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '1px',
                color: isDark ? 'rgba(255,255,255,0.3)' : theme.textMuted,
                marginBottom: '12px',
              }}>
                {t.upNext}
              </p>
              {upcomingTracks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <FaMusic style={{ fontSize: '32px', color: isDark ? 'rgba(255,255,255,0.1)' : theme.textMuted, marginBottom: '8px' }} />
                  <p style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.3)' : theme.textMuted }}>
                    {t.queue}
                  </p>
                </div>
              ) : (
                upcomingTracks.map((track, i) => (
                  <div key={track.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 8px', borderRadius: '10px',
                    cursor: 'pointer', transition: 'background 0.2s',
                    marginBottom: '4px',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={track.image} alt={track.title} style={{
                      width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover',
                    }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <p style={{
                        fontSize: '13px', fontWeight: 600,
                        color: isDark ? 'rgba(255,255,255,0.8)' : theme.textPrimary,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{track.title}</p>
                      <p style={{
                        fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.4)' : theme.textMuted,
                      }}>{track.artist}</p>
                    </div>
                    <span style={{ fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.3)' : theme.textMuted }}>
                      {formatDuration(track.duration)}
                    </span>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'lyrics' && (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <MdLyrics style={{ fontSize: '48px', color: `rgba(${bgColor}, 0.5)`, marginBottom: '16px' }} />
              <p style={{ fontSize: '14px', color: isDark ? 'rgba(255,255,255,0.5)' : theme.textSecondary, lineHeight: 1.8 }}>
                {t.lyrics}
              </p>
              <p style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.3)' : theme.textMuted, marginTop: '8px' }}>
                ♪ ♫ ♪ ♫
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
ENDOFFILE

# ============================================================
# src/components/Settings.jsx
# ============================================================
cat > src/components/Settings.jsx << 'ENDOFFILE'
import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMusicContext } from '../context/MusicContext';
import {
  FaSun, FaMoon, FaGlobe, FaHeadphones, FaFileImport,
  FaTrash, FaPlay, FaChevronRight, FaPalette, FaCog,
  FaDownload, FaMusic, FaCheck
} from 'react-icons/fa';

const Settings = () => {
  const { isDark, toggleTheme, language, setLanguage, t, audioQuality, setAudioQuality, importedTracks, addImportedTrack, removeImportedTrack, theme } = useTheme();
  const { playTrack } = useMusicContext();
  const [activeSection, setActiveSection] = useState('appearance');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const qualities = [
    { id: 'lossless', label: t.lossless, desc: 'FLAC / WAV', icon: '💎' },
    { id: 'high', label: t.high, desc: 'MP3 320kbps', icon: '🔥' },
    { id: 'medium', label: t.medium, desc: 'MP3 192kbps', icon: '🎵' },
    { id: 'low', label: t.low, desc: 'MP3 128kbps', icon: '📱' },
  ];

  const sections = [
    { id: 'appearance', icon: FaPalette, label: t.appearance },
    { id: 'general', icon: FaCog, label: t.general },
    { id: 'import', icon: FaDownload, label: t.importSettings },
  ];

  const handleFileImport = (files) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/ogg', 'audio/mp3', 'audio/x-wav'];
    Array.from(files).forEach(file => {
      if (validTypes.includes(file.type) || file.name.match(/\.(mp3|wav|flac|ogg)$/i)) {
        const url = URL.createObjectURL(file);
        const track = {
          id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: file.name.replace(/\.(mp3|wav|flac|ogg)$/i, ''),
          artist: 'Local',
          artistId: null,
          album: t.localFiles,
          duration: 0,
          image: 'https://picsum.photos/seed/local/300/300',
          audioUrl: url,
          plays: '0',
          liked: false,
          explicit: false,
          year: new Date().getFullYear(),
          isLocal: true,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          fileType: file.name.split('.').pop().toUpperCase(),
        };
        addImportedTrack(track);
      }
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileImport(e.dataTransfer.files);
  };

  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const hoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '32px', color: theme.textPrimary }}>
        ⚙️ {t.settings}
      </h1>

      <div style={{ display: 'flex', gap: '32px', maxWidth: '900px' }}>
        {/* Section Nav */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          {sections.map(sec => (
            <button key={sec.id} onClick={() => setActiveSection(sec.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '12px', border: 'none',
              background: activeSection === sec.id ? `rgba(124,58,237,0.15)` : 'transparent',
              color: activeSection === sec.id ? '#a855f7' : theme.textSecondary,
              cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
              marginBottom: '4px', textAlign: 'left', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (activeSection !== sec.id) e.currentTarget.style.background = hoverBg; }}
              onMouseLeave={e => { if (activeSection !== sec.id) e.currentTarget.style.background = 'transparent'; }}
            >
              <sec.icon style={{ fontSize: '16px' }} /> {sec.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary }}>
                {t.appearance}
              </h2>

              {/* Theme Toggle */}
              <div style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: isDark ? 'linear-gradient(135deg, #1e1b4b, #312e81)' : 'linear-gradient(135deg, #fef3c7, #fde68a)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}>
                      {isDark ? <FaMoon style={{ color: '#a78bfa' }} /> : <FaSun style={{ color: '#f59e0b' }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>
                        {isDark ? t.darkMode : t.lightMode}
                      </p>
                      <p style={{ fontSize: '13px', color: theme.textSecondary }}>
                        {isDark ? 'Thème sombre activé' : 'Thème clair activé'}
                      </p>
                    </div>
                  </div>
                  <button onClick={toggleTheme} style={{
                    width: '56px', height: '28px', borderRadius: '14px',
                    background: isDark ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : '#e2e8f0',
                    border: 'none', cursor: 'pointer', position: 'relative',
                    transition: 'all 0.3s',
                  }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: 'white', position: 'absolute', top: '3px',
                      left: isDark ? '31px' : '3px', transition: 'left 0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* General */}
          {activeSection === 'general' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary }}>
                {t.general}
              </h2>

              {/* Language */}
              <div style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FaGlobe style={{ color: 'white', fontSize: '20px' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{t.language}</p>
                    <p style={{ fontSize: '13px', color: theme.textSecondary }}>
                      {languages.find(l => l.code === language)?.name}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => setLanguage(lang.code)} style={{
                      padding: '14px 16px', borderRadius: '12px',
                      background: language === lang.code ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: `1px solid ${language === lang.code ? 'rgba(124,58,237,0.4)' : cardBorder}`,
                      color: language === lang.code ? '#a855f7' : theme.textSecondary,
                      cursor: 'pointer', display: 'flex', alignItems: 'center',
                      gap: '12px', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
                      transition: 'all 0.2s',
                    }}>
                      <span style={{ fontSize: '20px' }}>{lang.flag}</span>
                      {lang.name}
                      {language === lang.code && <FaCheck style={{ marginLeft: 'auto', fontSize: '12px' }} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Import & Quality */}
          {activeSection === 'import' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary }}>
                {t.importSettings}
              </h2>

              {/* Audio Quality */}
              <div style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FaHeadphones style={{ color: 'white', fontSize: '20px' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{t.audioQuality}</p>
                    <p style={{ fontSize: '13px', color: theme.textSecondary }}>
                      {qualities.find(q => q.id === audioQuality)?.label}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {qualities.map(q => (
                    <button key={q.id} onClick={() => setAudioQuality(q.id)} style={{
                      padding: '16px', borderRadius: '12px',
                      background: audioQuality === q.id ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: `1px solid ${audioQuality === q.id ? 'rgba(124,58,237,0.4)' : cardBorder}`,
                      color: theme.textPrimary,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px',
                      fontSize: '14px', fontFamily: 'Inter', transition: 'all 0.2s', textAlign: 'left',
                    }}>
                      <span style={{ fontSize: '20px' }}>{q.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, color: audioQuality === q.id ? '#a855f7' : theme.textPrimary }}>{q.label}</p>
                        <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>{q.desc}</p>
                      </div>
                      {audioQuality === q.id && <FaCheck style={{ color: '#a855f7', fontSize: '14px' }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Import Files */}
              <div style={{
                padding: '24px', borderRadius: '16px',
                background: cardBg, border: `1px solid ${cardBorder}`,
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <FaFileImport style={{ color: 'white', fontSize: '20px' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{t.importLocal}</p>
                    <p style={{ fontSize: '13px', color: theme.textSecondary }}>{t.importDesc}</p>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: '40px', borderRadius: '16px',
                    border: `2px dashed ${dragOver ? '#7c3aed' : cardBorder}`,
                    background: dragOver ? 'rgba(124,58,237,0.1)' : 'transparent',
                    textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.3s',
                    marginBottom: '20px',
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp3,.wav,.flac,.ogg"
                    multiple
                    style={{ display: 'none' }}
                    onChange={e => handleFileImport(e.target.files)}
                  />
                  <FaMusic style={{ fontSize: '40px', color: dragOver ? '#7c3aed' : theme.textMuted, marginBottom: '12px' }} />
                  <p style={{ fontSize: '15px', fontWeight: 600, color: dragOver ? '#7c3aed' : theme.textSecondary, marginBottom: '4px' }}>
                    {t.importLocal}
                  </p>
                  <p style={{ fontSize: '12px', color: theme.textMuted }}>
                    MP3, WAV, FLAC, OGG
                  </p>
                </div>

                {/* Imported Tracks List */}
                {importedTracks.length > 0 && (
                  <>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: theme.textPrimary, marginBottom: '12px' }}>
                      {t.importedTracks} ({importedTracks.length})
                    </p>
                    {importedTracks.map(track => (
                      <div key={track.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px', borderRadius: '10px',
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        marginBottom: '8px',
                        border: `1px solid ${cardBorder}`,
                      }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '8px',
                          background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <FaMusic style={{ color: 'white', fontSize: '14px' }} />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {track.title}
                          </p>
                          <p style={{ fontSize: '11px', color: theme.textMuted }}>
                            {track.fileType} • {track.fileSize}
                          </p>
                        </div>
                        <button onClick={() => playTrack(track, importedTracks)} style={{
                          background: 'none', border: 'none', color: '#10b981',
                          cursor: 'pointer', fontSize: '14px', padding: '6px',
                        }}>
                          <FaPlay />
                        </button>
                        <button onClick={() => removeImportedTrack(track.id)} style={{
                          background: 'none', border: 'none', color: '#ef4444',
                          cursor: 'pointer', fontSize: '14px', padding: '6px',
                        }}>
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
ENDOFFILE

# ============================================================
# Update src/components/Player.jsx - with fullscreen button
# ============================================================
cat > src/components/Player.jsx << 'ENDOFFILE'
import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { formatDuration } from '../data/mockData';
import {
  FaPlay, FaPause, FaStepForward, FaStepBackward,
  FaRandom, FaRedo, FaVolumeUp, FaVolumeMute,
  FaVolumeDown, FaHeart, FaRegHeart, FaListUl, FaExpand
} from 'react-icons/fa';
import { MdRepeatOne } from 'react-icons/md';
import FullScreenPlayer from './FullScreenPlayer';

const Player = () => {
  const {
    currentTrack, isPlaying, progress, duration,
    volume, isMuted, isShuffled, repeatMode, likedTracks,
    togglePlay, handleNext, handlePrev, seekTo,
    setVolume, setIsMuted, toggleLike, toggleShuffle, cycleRepeat, isLoading,
  } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [showVolume, setShowVolume] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isLiked = currentTrack && likedTracks.includes(currentTrack.id);
  const currentTime = duration ? (progress / 100) * duration : 0;
  const RepeatIcon = repeatMode === 'one' ? MdRepeatOne : FaRedo;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(Math.max(0, Math.min(100, pct)));
  };

  if (isFullScreen && currentTrack) {
    return <FullScreenPlayer onClose={() => setIsFullScreen(false)} />;
  }

  if (!currentTrack) {
    return (
      <div style={{ height: 'var(--player-height)', background: isDark ? 'rgba(10,10,15,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderTop: `1px solid ${theme.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <p style={{ color: theme.textMuted, fontSize: '14px' }}>🎵 {t.chooseMusic}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .player-desktop { display: none !important; }
          .player-mobile-info { max-width: 150px !important; }
          .player-container { padding: 0 12px !important; gap: 8px !important; }
        }
        @media (min-width: 769px) {
          .player-mobile-only { display: none !important; }
        }
      `}</style>
      <div className="player-container" style={{ height: 'var(--player-height)', background: isDark ? 'rgba(10,10,15,0.97)' : 'rgba(255,255,255,0.97)', backdropFilter: 'blur(30px)', borderTop: `1px solid ${isDark ? 'rgba(124,58,237,0.2)' : theme.borderColor}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', flexShrink: 0, position: 'relative', zIndex: 100 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, #7c3aed ${progress}%, transparent)` }} />

        {/* Track Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '280px', flexShrink: 0, cursor: 'pointer' }} onClick={() => setIsFullScreen(true)}>
          <div style={{ position: 'relative' }}>
            <img src={currentTrack.image} alt={currentTrack.title} className={`vinyl-record ${isPlaying ? 'playing' : ''}`} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', boxShadow: isPlaying ? '0 0 20px rgba(124,58,237,0.5)' : 'none' }} />
            {isLoading && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '20px', height: '20px', border: '2px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'rotate 0.8s linear infinite' }} />
              </div>
            )}
          </div>
          <div className="player-mobile-info" style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{currentTrack.title}</p>
            <p style={{ fontSize: '12px', color: theme.textSecondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{currentTrack.artist}</p>
            {isPlaying && (
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px', alignItems: 'flex-end', height: '14px' }}>
                {[0, 0.2, 0.4, 0.1].map((delay, i) => <div key={i} className="eq-bar" style={{ animationDelay: `${delay}s`, height: '4px' }} />)}
              </div>
            )}
          </div>
          <button onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack.id); }} className="player-desktop" style={{ background: 'none', border: 'none', color: isLiked ? '#ec4899' : theme.textMuted, cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Center Controls */}
        <div className="player-desktop" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={toggleShuffle} style={{ background: 'none', border: 'none', color: isShuffled ? '#a855f7' : theme.textMuted, cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              <FaRandom />
              {isShuffled && <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#a855f7' }} />}
            </button>
            <button onClick={handlePrev} style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: '20px' }} onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary} onMouseLeave={e => e.currentTarget.style.color = theme.textSecondary}><FaStepBackward /></button>
            <button onClick={togglePlay} style={{ width: '44px', height: '44px', borderRadius: '50%', background: isDark ? 'white' : theme.textPrimary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: isDark ? '#0a0a0f' : 'white', boxShadow: '0 0 20px rgba(124,58,237,0.4)', flexShrink: 0 }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
            </button>
            <button onClick={handleNext} style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: '20px' }} onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary} onMouseLeave={e => e.currentTarget.style.color = theme.textSecondary}><FaStepForward /></button>
            <button onClick={cycleRepeat} style={{ background: 'none', border: 'none', color: repeatMode !== 'none' ? '#a855f7' : theme.textMuted, cursor: 'pointer', fontSize: '16px', position: 'relative' }}>
              <RepeatIcon />
              {repeatMode !== 'none' && <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#a855f7' }} />}
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
            <span style={{ fontSize: '11px', color: theme.textMuted, minWidth: '35px', textAlign: 'right' }}>{formatDuration(Math.floor(currentTime))}</span>
            <div className="progress-bar" style={{ flex: 1 }} onClick={handleProgressClick}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span style={{ fontSize: '11px', color: theme.textMuted, minWidth: '35px' }}>{formatDuration(Math.floor(duration))}</span>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="player-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' }}>
          <button onClick={togglePlay} style={{ width: '40px', height: '40px', borderRadius: '50%', background: isDark ? 'white' : theme.textPrimary, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#0a0a0f' : 'white', fontSize: '14px' }}>
            {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
          </button>
        </div>

        {/* Right Controls (desktop) */}
        <div className="player-desktop" style={{ width: '280px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flexShrink: 0 }}>
          <button style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '14px' }}><FaListUl /></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
            <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '16px' }} onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}>
              {isMuted || volume === 0 ? <FaVolumeMute /> : volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
            </button>
            <div style={{ width: showVolume ? '80px' : '60px', transition: 'width 0.2s ease' }}>
              <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={e => { setVolume(parseFloat(e.target.value)); if (isMuted) setIsMuted(false); }} style={{ width: '100%' }} />
            </div>
          </div>
          <button onClick={() => setIsFullScreen(true)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted} title={t.fullscreen}>
            <FaExpand />
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
ENDOFFILE

# ============================================================
# Update Sidebar with Settings + Theme
# ============================================================
cat > src/components/Sidebar.jsx << 'ENDOFFILE'
import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaSearch, FaBook, FaHeart, FaPlus, FaChevronRight, FaBars, FaCog } from 'react-icons/fa';
import { RiMusic2Fill } from 'react-icons/ri';

const Sidebar = () => {
  const { navigate, currentView, userPlaylists } = useMusicContext();
  const { t, theme, isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'home', icon: FaHome, label: t.home },
    { id: 'search', icon: FaSearch, label: t.search },
    { id: 'library', icon: FaBook, label: t.library },
    { id: 'settings', icon: FaCog, label: t.settings },
  ];

  const sidebarWidth = collapsed ? '72px' : '280px';

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
      <div className="sidebar-desktop" style={{ width: sidebarWidth, minWidth: sidebarWidth, height: '100%', background: theme.sidebarBg, borderRight: `1px solid ${theme.borderColor}`, display: 'flex', flexDirection: 'column', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', overflow: 'hidden', flexShrink: 0, zIndex: 50 }}>
        {/* Logo */}
        <div style={{ padding: collapsed ? '24px 16px' : '28px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: `1px solid ${theme.borderColor}`, justifyContent: collapsed ? 'center' : 'space-between' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}>
                <RiMusic2Fill style={{ color: 'white', fontSize: '18px' }} />
              </div>
              <span style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Poppins', letterSpacing: '-0.5px' }}>Hirako</span>
            </div>
          )}
          {collapsed && (
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setCollapsed(false)}>
              <RiMusic2Fill style={{ color: 'white', fontSize: '18px' }} />
            </div>
          )}
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '14px', padding: '6px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }} onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = theme.textMuted; }}>
              <FaBars />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding: collapsed ? '16px 8px' : '16px 12px' }}>
          {navItems.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => navigate(id)} className={`nav-link ${currentView === id ? 'active' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: collapsed ? '12px' : '12px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '4px', color: currentView === id ? theme.textPrimary : theme.textSecondary, background: 'transparent', justifyContent: collapsed ? 'center' : 'flex-start', fontSize: '14px', fontWeight: 500 }} title={collapsed ? label : ''}>
              <Icon style={{ fontSize: '18px', color: currentView === id ? '#a855f7' : 'inherit', flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ height: '1px', background: theme.borderColor, margin: '0 16px' }} />

        {/* Quick Access */}
        <div style={{ padding: collapsed ? '16px 8px' : '16px 12px' }}>
          {!collapsed && <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 14px 12px' }}>{t.quickAccess}</p>}
          <button onClick={() => navigate('liked')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: collapsed ? '10px' : '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', justifyContent: collapsed ? 'center' : 'flex-start', fontSize: '13px' }} onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FaHeart style={{ color: 'white', fontSize: '13px' }} />
            </div>
            {!collapsed && <span>{t.likedSongs}</span>}
          </button>
          {!collapsed && (
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', fontSize: '13px' }} onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px dashed ${theme.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FaPlus style={{ fontSize: '12px' }} />
              </div>
              <span>{t.createPlaylist}</span>
            </button>
          )}
        </div>

        <div style={{ height: '1px', background: theme.borderColor, margin: '0 16px' }} />

        {/* Playlists */}
        {!collapsed && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 14px 12px' }}>{t.myPlaylists}</p>
            {userPlaylists.map(playlist => (
              <button key={playlist.id} onClick={() => navigate('playlist', playlist)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', fontSize: '13px', marginBottom: '2px', textAlign: 'left' }} onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}>
                <img src={playlist.image} alt={playlist.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontWeight: 500, color: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{playlist.name}</p>
                  <p style={{ fontSize: '11px', color: theme.textMuted }}>{playlist.owner} • {playlist.tracks.length} {t.tracks}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* User */}
        {!collapsed && (
          <div style={{ padding: '16px', borderTop: `1px solid ${theme.borderColor}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: 'white', flexShrink: 0 }}>H</div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textPrimary }}>Hirako User</p>
              <p style={{ fontSize: '11px', color: theme.textMuted }}>{t.premium} ✨</p>
            </div>
            <button style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '14px' }}><FaChevronRight /></button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
ENDOFFILE

# ============================================================
# Update Header
# ============================================================
cat > src/components/Header.jsx << 'ENDOFFILE'
import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { FaChevronLeft, FaChevronRight, FaBell, FaSearch, FaSun, FaMoon, FaHome, FaBook, FaCog } from 'react-icons/fa';
import { RiMusic2Fill } from 'react-icons/ri';

const Header = () => {
  const { navigate, currentView } = useMusicContext();
  const { t, theme, isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .header-desktop-search { display: none !important; }
          .header-container { padding: 0 16px !important; height: 60px !important; }
        }
      `}</style>
      <div className="header-container" style={{ height: '70px', background: isDark ? 'rgba(10,10,15,0.8)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.borderColor}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', flexShrink: 0, position: 'sticky', top: 0, zIndex: 90 }}>
        {/* Mobile logo */}
        <div className="header-mobile-logo" style={{ display: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiMusic2Fill style={{ color: 'white', fontSize: '16px' }} />
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .header-mobile-logo { display: flex !important; } }`}</style>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate('home')} style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', color: theme.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }} onMouseEnter={e => { e.currentTarget.style.color = theme.textPrimary; }} onMouseLeave={e => { e.currentTarget.style.color = theme.textSecondary; }}><FaChevronLeft /></button>
        </div>

        {currentView !== 'search' && (
          <div className="header-desktop-search" style={{ flex: 1, maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted, fontSize: '14px' }} />
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => navigate('search')} className="search-input" style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: '24px', fontSize: '14px', fontFamily: 'Inter' }} />
            </div>
          </div>
        )}

        {currentView === 'search' && <h1 style={{ fontSize: '20px', fontWeight: 700, color: theme.textPrimary, flex: 1 }}>{t.search}</h1>}

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={toggleTheme} style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${theme.borderColor}`, cursor: 'pointer', color: isDark ? '#f59e0b' : '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: `1px solid ${theme.borderColor}`, cursor: 'pointer', color: theme.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', position: 'relative' }}>
            <FaBell />
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', border: `2px solid ${theme.bgPrimary}` }} />
          </button>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: 'white', cursor: 'pointer' }}>H</div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <style>{`
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .mobile-nav {
            display: flex !important;
            position: fixed; bottom: var(--player-height); left: 0; right: 0;
            background: ${isDark ? 'rgba(10,10,15,0.95)' : 'rgba(255,255,255,0.95)'};
            backdrop-filter: blur(20px);
            border-top: 1px solid ${theme.borderColor};
            padding: 8px 0 12px; z-index: 90;
            justify-content: space-around;
          }
        }
      `}</style>
      <div className="mobile-nav">
        {[
          { id: 'home', icon: FaHome, label: t.home },
          { id: 'search', icon: FaSearch, label: t.search },
          { id: 'library', icon: FaBook, label: t.library },
          { id: 'settings', icon: FaCog, label: t.settings },
        ].map(item => (
          <button key={item.id} onClick={() => navigate(item.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            color: currentView === item.id ? '#a855f7' : theme.textMuted,
            fontSize: '10px', fontWeight: 600, fontFamily: 'Inter',
            padding: '4px 12px',
          }}>
            <item.icon style={{ fontSize: '20px' }} />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Header;
ENDOFFILE

# ============================================================
# Update App.jsx
# ============================================================
cat > src/App.jsx << 'ENDOFFILE'
import React from 'react';
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
import './styles/globals.css';

const MainContent = () => {
  const { currentView, viewData } = useMusicContext();
  const { theme } = useTheme();

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home />;
      case 'search': return <Search />;
      case 'library': return <Library />;
      case 'playlist': return viewData ? <Playlist playlist={viewData} /> : <Home />;
      case 'artist': return viewData ? <ArtistPage artist={viewData} /> : <Home />;
      case 'liked': return <Library />;
      case 'settings': return <Settings />;
      default: return <Home />;
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
ENDOFFILE

# ============================================================
# Update globals.css for responsive + light mode support
# ============================================================
cat >> src/styles/globals.css << 'ENDOFFILE'

/* ===== RESPONSIVE ADDITIONS ===== */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;
    --player-height: 72px;
  }
  body { padding-bottom: 52px; }
}

@media (max-width: 480px) {
  :root { --player-height: 64px; }
}

/* Mobile grid fixes */
@media (max-width: 768px) {
  .track-row {
    grid-template-columns: 40px 1fr 80px !important;
  }
}

/* Smooth theme transitions */
body, div, p, span, h1, h2, h3, h4, button, input, a {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Light mode scrollbar */
@media (prefers-color-scheme: light) {
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
  }
}
ENDOFFILE

echo ""
echo "✅ Hirako v2.0 mis à jour avec succès !"
echo ""
echo "Nouvelles fonctionnalités :"
echo "  🌙☀️  Mode sombre / clair"
echo "  🌍    4 langues (FR, EN, ES, JA)"
echo "  🎵    Player plein écran magnifique"
echo "  📁    Import de musiques locales"
echo "  🎧    Choix qualité audio"
echo "  📱    Responsive mobile + tablette"
echo "  ⚙️    Page Paramètres complète"
echo ""
echo "👉 Relance l'app :"
echo "   cd hirako"
echo "   npm start"
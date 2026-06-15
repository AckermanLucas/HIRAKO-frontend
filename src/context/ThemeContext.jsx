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

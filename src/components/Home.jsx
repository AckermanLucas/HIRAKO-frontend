import React, { useState, useEffect, useCallback } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { getHomeData } from '../services/api';
import { TRACKS, PLAYLISTS, ARTISTS, ALBUMS, GENRES } from '../data/mockData';
import MIcon from './MIcon';

// ---- Skeleton loader ----
const SkeletonCard = ({ theme, isDark }) => (
  <div style={{
    minWidth: '180px', maxWidth: '180px', borderRadius: '16px',
    padding: '16px',
    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${theme.borderColor}`,
  }}>
    <div style={{ width: '100%', aspectRatio: '1', borderRadius: '10px', marginBottom: '14px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <div style={{ height: '14px', borderRadius: '7px', marginBottom: '8px', width: '80%', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <div style={{ height: '12px', borderRadius: '6px', width: '60%', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', animation: 'pulse 1.5s ease-in-out infinite' }} />
    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
  </div>
);

// ---- Music Card ----
const MusicCard = ({ item, type, onClick, onPlay, theme, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const isArtist = type === 'artist';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        borderRadius: '16px', padding: '16px',
        minWidth: '180px', maxWidth: '180px',
        border: `1px solid ${hovered ? 'rgba(124,58,237,0.3)' : theme.borderColor}`,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.15)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <img
          src={item.image}
          alt={item.name || item.title}
          style={{
            width: '100%', aspectRatio: '1', objectFit: 'cover',
            borderRadius: isArtist ? '50%' : '10px', display: 'block',
            boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.2)' : 'none',
            transition: 'box-shadow 0.3s',
          }}
          onError={e => { e.target.src = `https://picsum.photos/seed/${item.id}/300/300`; }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: isArtist ? '50%' : '10px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button
            onClick={e => { e.stopPropagation(); onPlay && onPlay(); }}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              opacity: hovered ? 1 : 0,
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: '0 8px 24px rgba(124,58,237,0.6)',
            }}
          >
            <MIcon name="play_arrow" size={24} />
          </button>
        </div>
      </div>

      <p style={{
        fontSize: '14px', fontWeight: 700, color: theme.textPrimary,
        marginBottom: '4px', whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis',
        fontFamily: 'var(--font-display)',
      }}>
        {item.name || item.title}
      </p>
      <p style={{
        fontSize: '12px', color: theme.textSecondary,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {isArtist
          ? `${item.followers} fans`
          : type === 'album'
            ? item.artist
            : item.description || item.owner || ''}
      </p>

      {isArtist && item.verified && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          marginTop: '6px', padding: '2px 8px',
          background: 'rgba(124,58,237,0.15)', borderRadius: '12px',
          fontSize: '11px', color: '#a855f7', fontWeight: 600,
        }}>
          <MIcon name="verified" size={12} /> Vérifié
        </div>
      )}
    </div>
  );
};

// ---- Section horizontale ----
const Section = ({ title, items, type, navigate, playTrack, loading, theme, isDark }) => (
  <div style={{ marginBottom: '44px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
      <button
        style={{
          background: 'none', border: 'none', color: theme.textMuted,
          cursor: 'pointer', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '4px',
          fontFamily: 'var(--font-main)', fontWeight: 600, transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary}
        onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}
      >
        Voir tout <MIcon name="chevron_right" size={16} />
      </button>
    </div>
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
      {loading
        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} theme={theme} isDark={isDark} />)
        : items.map(item => (
          <MusicCard
            key={item.id}
            item={item}
            type={type}
            theme={theme}
            isDark={isDark}
            onClick={() => {
              if (type === 'playlist') navigate('playlist', item);
              else if (type === 'artist') navigate('artist', { ...item, fromApi: true });
              else if (type === 'album') navigate('album', { ...item, fromApi: true });
            }}
            onPlay={() => {
              const tracks = (item.tracks || []).filter(Boolean);
              if (tracks.length > 0) {
                playTrack(tracks[0], tracks);
              }
            }}
          />
        ))
      }
    </div>
  </div>
);

// ---- Composant principal ----
const Home = () => {
  const { navigate, playTrack } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendOk, setBackendOk] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const health = await fetch('http://localhost:3001/health').then(r => r.json()).catch(() => null);
        if (!mounted) return;
        if (health?.status === 'OK') {
          setBackendOk(true);
          const data = await getHomeData();
          if (mounted && data) setApiData(data);
        }
      } catch {
        if (mounted) setError(true);
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

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>

      {/* Backend status banner */}
      {!loading && !backendOk && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '14px 20px', borderRadius: '14px', marginBottom: '24px',
          background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.3)',
        }}>
          <MIcon name="warning" size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>
              Backend non connecté — Données de démonstration affichées
            </p>
            <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>
              Lance le backend : <code style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>cd hirako-backend && npm start</code>
            </p>
          </div>
        </div>
      )}

      {backendOk && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 16px', borderRadius: '12px', marginBottom: '24px',
          background: isDark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.2)',
          width: 'fit-content',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>
            Deezer API connectée — Données en temps réel
          </p>
        </div>
      )}

      {/* Hero Section */}
      {featured && (
        <div style={{
          borderRadius: '24px', overflow: 'hidden', marginBottom: '44px',
          position: 'relative', minHeight: '280px',
          background: isDark ? '#1a0a3e' : '#f0ebff',
          border: `1px solid ${isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.15)'}`,
        }}>
          {/* BG image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${featured.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: isDark ? 0.15 : 0.08, filter: 'blur(4px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: isDark
              ? 'linear-gradient(135deg, rgba(124,58,237,0.85) 0%, rgba(236,72,153,0.4) 50%, rgba(10,10,15,0.9) 100%)'
              : 'linear-gradient(135deg, rgba(124,58,237,0.7) 0%, rgba(236,72,153,0.3) 50%, rgba(240,235,255,0.9) 100%)',
          }} />
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(168,85,247,0.2)', filter: 'blur(60px)' }} />

          <div style={{ position: 'relative', padding: '44px 48px', display: 'flex', alignItems: 'center', gap: '48px' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '5px 14px', borderRadius: '20px',
                background: 'rgba(124,58,237,0.3)',
                border: '1px solid rgba(124,58,237,0.5)',
                marginBottom: '16px',
              }}>
                <MIcon name="local_fire_department" size={14} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: '12px', color: 'white', fontWeight: 600 }}>
                  {backendOk ? '🔴 Live Deezer Charts' : 'Playlist de la semaine'}
                </span>
              </div>

              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px', fontWeight: 500 }}>
                {greeting()} 👋
              </p>
              <h1 style={{
                fontSize: '38px', fontWeight: 900, color: 'white',
                lineHeight: 1.1, marginBottom: '8px',
                fontFamily: 'var(--font-display)',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}>
                {featured.title}
              </h1>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', fontWeight: 500 }}>
                {featured.artist}
              </p>
              {featured.album && (
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '28px' }}>
                  {featured.album}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => featuredTracks.length > 0 && playTrack(featuredTracks[0], featuredTracks)}
                  style={{
                    padding: '13px 28px', borderRadius: '50px',
                    background: 'white', border: 'none',
                    color: '#7c3aed', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'var(--font-main)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <MIcon name="play_arrow" size={20} style={{ color: '#7c3aed' }} /> {t.playNow}
                </button>
                <button
                  onClick={() => navigate('search')}
                  style={{
                    padding: '13px 22px', borderRadius: '50px',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  Explorer
                </button>
              </div>
            </div>

            {/* Album art stack */}
            <div style={{ position: 'relative', width: '180px', height: '180px', flexShrink: 0 }}>
              {featuredTracks.slice(0, 3).map((track, i) => (
                <img
                  key={track.id}
                  src={track.image}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '130px', height: '130px', objectFit: 'cover',
                    borderRadius: '12px',
                    top: `${i * 18}px`, left: `${i * 18}px`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    zIndex: 3 - i,
                    transform: `rotate(${(i - 1) * 5}deg)`,
                    border: '2px solid rgba(255,255,255,0.15)',
                  }}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${track.id}/300/300`; }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Access playlists mock */}
      <div style={{ marginBottom: '44px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: theme.textPrimary, marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
          Accès rapide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
          {PLAYLISTS.slice(0, 6).map(playlist => (
            <div
              key={playlist.id}
              onClick={() => navigate('playlist', playlist)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
                border: `1px solid ${theme.borderColor}`, transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                const btn = e.currentTarget.querySelector('.qp-btn');
                if (btn) btn.style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
                e.currentTarget.style.borderColor = theme.borderColor;
                e.currentTarget.style.transform = 'none';
                const btn = e.currentTarget.querySelector('.qp-btn');
                if (btn) btn.style.opacity = '0';
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={playlist.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${playlist.color}50, transparent)` }} />
              </div>
              <div style={{ flex: 1, padding: '0 14px', overflow: 'hidden' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {playlist.name}
                </p>
                <p style={{ fontSize: '11px', color: theme.textMuted }}>{playlist.tracks.length} titres</p>
              </div>
              <button
                className="qp-btn"
                onClick={e => {
                  e.stopPropagation();
                  const tracks = playlist.tracks.map(id => TRACKS.find(t => t.id === id)).filter(Boolean);
                  const firstWithAudio = tracks.find(t => t.audioUrl) || tracks[0];
                  if (firstWithAudio) playTrack(firstWithAudio, tracks);
                }}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', marginRight: '12px', flexShrink: 0,
                  opacity: 0, transition: 'opacity 0.2s',
                  boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
                }}
              >
                <MIcon name="play_arrow" size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div style={{ marginBottom: '44px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: theme.textPrimary, marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
          Explorer par genre
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
          {(loading ? Array(10).fill({ id: Math.random(), name: '...', color: '#7c3aed', emoji: '🎵' }) : genres).map((genre, i) => (
            <div
              key={genre.id || i}
              onClick={() => !loading && navigate('search', { query: genre.name })}
              style={{
                padding: '20px 12px', borderRadius: '14px',
                background: `${genre.color}18`,
                border: `1px solid ${genre.color}35`,
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                opacity: loading ? 0.5 : 1,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${genre.color}30`;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${genre.color}25`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${genre.color}18`;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute', bottom: '-8px', right: '-4px', fontSize: '40px', opacity: 0.2 }}>
                {genre.emoji}
              </div>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{genre.emoji}</div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: genre.color, fontFamily: 'var(--font-display)' }}>
                {genre.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <Section
        title={backendOk ? "🔥 Top Charts Deezer" : "🔥 Tendances"}
        items={topArtists}
        type="artist"
        navigate={navigate}
        playTrack={playTrack}
        loading={loading && backendOk}
        theme={theme}
        isDark={isDark}
      />

      <Section
        title={backendOk ? "⭐ Artistes populaires" : "⭐ Artistes populaires"}
        items={topArtists}
        type="artist"
        navigate={navigate}
        playTrack={playTrack}
        loading={loading && backendOk}
        theme={theme}
        isDark={isDark}
      />

      <Section
        title={backendOk ? "💿 Nouveautés" : "💿 Albums récents"}
        items={newAlbums}
        type="album"
        navigate={navigate}
        playTrack={playTrack}
        loading={loading && backendOk}
        theme={theme}
        isDark={isDark}
      />
    </div>
  );
};

export default Home;

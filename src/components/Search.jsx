import React, { useState, useEffect, useRef } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { searchAll } from '../services/api';
import { GENRES, RECENT_SEARCHES } from '../data/mockData';
import MIcon from './MIcon';
import TrackList from './TrackList';

const Search = () => {
  const { playTrack, navigate } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ tracks: [], artists: [], albums: [] });
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const debounceRef = useRef(null);

  const filters = ['all', 'tracks', 'artists', 'albums'];
  const filterLabels = { all: t.all, tracks: t.tracks, artists: t.artists, albums: 'Albums' };

  useEffect(() => {
    if (!query.trim()) { setResults({ tracks: [], artists: [], albums: [] }); return; }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await searchAll(query);
      setResults(res);
      setLoading(false);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const hasResults = results.tracks.length > 0 || results.artists.length > 0 || results.albums.length > 0;

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '28px', maxWidth: '600px' }}>
        <MIcon name="search" size={22} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted, zIndex: 1 }} />
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          className="search-input"
          style={{ width: '100%', padding: '16px 20px 16px 52px', borderRadius: '16px', fontSize: '16px', fontFamily: 'var(--font-main)', fontWeight: 500 }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', display: 'flex' }}>
            <MIcon name="cancel" size={20} />
          </button>
        )}
        {loading && (
          <div style={{ position: 'absolute', right: query ? '44px' : '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', border: '2px solid #7c3aed', borderTopColor: 'transparent', borderRadius: '50%', animation: 'rotate 0.8s linear infinite' }} />
        )}
      </div>

      {/* Filters */}
      {query && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '8px 20px', borderRadius: '24px',
              border: activeFilter === f ? 'none' : `1px solid ${theme.borderColor}`,
              background: activeFilter === f ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'transparent',
              color: activeFilter === f ? 'white' : theme.textSecondary,
              cursor: 'pointer', fontSize: '13px', fontWeight: 700,
              fontFamily: 'var(--font-main)', transition: 'all 0.2s',
            }}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      )}

      {/* No query */}
      {!query && (
        <>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '16px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MIcon name="history" size={20} style={{ color: '#a855f7' }} /> {t.recentSearches}
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {RECENT_SEARCHES.map((s, i) => (
                <button key={i} onClick={() => setQuery(s)} style={{
                  padding: '8px 18px', borderRadius: '24px',
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${theme.borderColor}`,
                  color: theme.textSecondary, cursor: 'pointer',
                  fontSize: '13px', fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#a855f7'; e.currentTarget.style.color = theme.textPrimary; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderColor; e.currentTarget.style.color = theme.textSecondary; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '16px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MIcon name="local_fire_department" size={20} style={{ color: '#f59e0b' }} /> {t.exploreGenres}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {GENRES.map(genre => (
              <div key={genre.id} onClick={() => setQuery(genre.name)} style={{
                height: '90px', borderRadius: '14px',
                background: `linear-gradient(135deg, ${genre.color}55, ${genre.color}25)`,
                border: `1px solid ${genre.color}35`,
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column', gap: '6px',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = `0 8px 24px ${genre.color}35`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: '28px' }}>{genre.emoji}</span>
                <p style={{ fontSize: '13px', fontWeight: 700, color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>{genre.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No results */}
      {query && !loading && !hasResults && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <MIcon name="search_off" size={64} style={{ color: theme.textMuted, marginBottom: '16px', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '20px', fontWeight: 700, color: theme.textPrimary, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{t.noResults}</p>
          <p style={{ color: theme.textMuted }}>{t.tryOther}</p>
        </div>
      )}

      {/* Results */}
      {query && hasResults && (
        <>
          {(activeFilter === 'all' || activeFilter === 'tracks') && results.tracks.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                🎵 {t.tracks} ({results.tracks.length})
              </h3>
              <TrackList tracks={results.tracks.slice(0, 8)} />
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'artists') && results.artists.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                👤 {t.artists}
              </h3>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {results.artists.map(artist => (
                  <div key={artist.id} onClick={() => navigate('artist', { ...artist, fromApi: true })} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 18px',
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    borderRadius: '14px', cursor: 'pointer',
                    flex: '1', minWidth: '260px',
                    border: `1px solid ${theme.borderColor}`, transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = theme.borderColor; }}
                  >
                    <img src={artist.image} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} onError={e => { e.target.src = `https://picsum.photos/seed/${artist.id}/100/100`; }} />
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: theme.textPrimary }}>{artist.name}</p>
                      <p style={{ fontSize: '12px', color: theme.textMuted }}>{artist.followers} fans</p>
                    </div>
                    {artist.verified && <MIcon name="verified" size={18} style={{ color: '#a855f7', marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeFilter === 'all' || activeFilter === 'albums') && results.albums.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                💿 Albums
              </h3>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {results.albums.map(album => (
                  <div key={album.id} onClick={() => navigate('album', { ...album, fromApi: true })} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px 16px',
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    borderRadius: '12px', cursor: 'pointer',
                    flex: '1', minWidth: '240px',
                    border: `1px solid ${theme.borderColor}`, transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'; }}
                  >
                    <img src={album.image} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} onError={e => { e.target.src = `https://picsum.photos/seed/${album.id}/100/100`; }} />
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: theme.textPrimary }}>{album.name}</p>
                      <p style={{ fontSize: '12px', color: theme.textMuted }}>{album.artist} • {album.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;

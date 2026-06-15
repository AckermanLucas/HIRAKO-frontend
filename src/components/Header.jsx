import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import MIcon from './MIcon';

const Header = () => {
  const { navigate, currentView } = useMusicContext();
  const { t, theme, isDark, toggleTheme, importedTracks } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .header-desktop-search { display: none !important; }
          .header-container { padding: 0 16px !important; height: 56px !important; }
        }
      `}</style>
      <div className="header-container" style={{
        height: '64px',
        background: isDark ? 'rgba(10,10,15,0.85)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.borderColor}`,
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 90,
      }}>
        <div className="header-mobile-logo" style={{ display: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MIcon name="music_note" size={18} style={{ color: 'white' }} />
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .header-mobile-logo { display: flex !important; } }`}</style>

        <button onClick={() => navigate('home')} style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
          border: 'none', cursor: 'pointer', color: theme.textSecondary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MIcon name="arrow_back" size={20} />
        </button>

        {currentView !== 'search' && (
          <div className="header-desktop-search" style={{ flex: 1, maxWidth: '420px' }}>
            <div style={{ position: 'relative' }}>
              <MIcon name="search" size={20} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }} />
              <input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => navigate('search')} className="search-input" style={{ width: '100%', padding: '10px 14px 10px 42px', borderRadius: '14px', fontSize: '14px', fontFamily: 'var(--font-main)', fontWeight: 500 }} />
            </div>
          </div>
        )}

        {currentView === 'search' && <h1 style={{ fontSize: '20px', fontWeight: 700, color: theme.textPrimary, flex: 1, fontFamily: 'var(--font-display)' }}>{t.search}</h1>}

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={toggleTheme} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${theme.borderColor}`, cursor: 'pointer',
            color: isDark ? '#f59e0b' : '#6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MIcon name={isDark ? 'light_mode' : 'dark_mode'} size={20} />
          </button>
          <button style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${theme.borderColor}`, cursor: 'pointer',
            color: theme.textMuted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <MIcon name="notifications" size={20} />
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
            padding: 6px 0 10px; z-index: 90;
            justify-content: space-around;
          }
        }
      `}</style>
      <div className="mobile-nav">
        {[
          { id: 'home', icon: 'home', label: t.home },
          { id: 'search', icon: 'search', label: t.search },
          { id: 'library', icon: 'library_music', label: t.library },
          { id: 'localfiles', icon: 'folder_open', label: t.localFiles },
          { id: 'settings', icon: 'settings', label: t.settings },
        ].map(item => (
          <button key={item.id} onClick={() => navigate(item.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            color: currentView === item.id ? '#a855f7' : theme.textMuted,
            fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-main)',
            padding: '4px 8px',
          }}>
            <MIcon name={item.icon} size={22} filled={currentView === item.id} />
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Header;

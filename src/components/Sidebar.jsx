import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import MIcon from './MIcon';

const Sidebar = () => {
  const { navigate, currentView, userPlaylists } = useMusicContext();
  const { t, theme, isDark, importedTracks } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'home', icon: 'home', label: t.home },
    { id: 'search', icon: 'search', label: t.search },
    { id: 'library', icon: 'library_music', label: t.library },
    { id: 'localfiles', icon: 'folder_open', label: t.localFiles, badge: importedTracks.length > 0 ? importedTracks.length : null },
    { id: 'settings', icon: 'settings', label: t.settings },
  ];

  const sidebarWidth = collapsed ? '72px' : '280px';

  return (
    <>
      <style>{`
        @media (max-width: 768px) { .sidebar-desktop { display: none !important; } }
      `}</style>
      <div className="sidebar-desktop" style={{
        width: sidebarWidth, minWidth: sidebarWidth, height: '100%',
        background: theme.sidebarBg,
        borderRight: `1px solid ${theme.borderColor}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden', flexShrink: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '24px 16px' : '28px 24px',
          display: 'flex', alignItems: 'center', gap: '12px',
          borderBottom: `1px solid ${theme.borderColor}`,
          justifyContent: collapsed ? 'center' : 'space-between',
        }}>
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}>
                <MIcon name="music_note" size={20} style={{ color: 'white' }} />
              </div>
              <span style={{ fontSize: '22px', fontWeight: 800, background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>Hirako</span>
            </div>
          ) : (
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setCollapsed(false)}>
              <MIcon name="music_note" size={20} style={{ color: 'white' }} />
            </div>
          )}
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex' }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = theme.textMuted; }}
            >
              <MIcon name="menu" size={20} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding: collapsed ? '16px 8px' : '16px 12px' }}>
          {navItems.map(({ id, icon, label, badge }) => (
            <button key={id} onClick={() => navigate(id)} className={`nav-link ${currentView === id ? 'active' : ''}`} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
              padding: collapsed ? '12px' : '12px 14px', borderRadius: '10px', border: 'none',
              cursor: 'pointer', marginBottom: '4px',
              color: currentView === id ? theme.textPrimary : theme.textSecondary,
              background: 'transparent',
              justifyContent: collapsed ? 'center' : 'flex-start',
              fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-main)',
              position: 'relative',
            }} title={collapsed ? label : ''}>
              <MIcon name={icon} size={22} filled={currentView === id} style={{ color: currentView === id ? '#a855f7' : 'inherit', flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && badge && (
                <span style={{
                  marginLeft: 'auto', padding: '2px 8px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  color: 'white', fontSize: '11px', fontWeight: 700,
                }}>{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ height: '1px', background: theme.borderColor, margin: '0 16px' }} />

        {/* Quick Access */}
        <div style={{ padding: collapsed ? '16px 8px' : '16px 12px' }}>
          {!collapsed && <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 14px 12px', fontFamily: 'var(--font-main)' }}>{t.quickAccess}</p>}
          <button onClick={() => navigate('liked')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: collapsed ? '10px' : '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', justifyContent: collapsed ? 'center' : 'flex-start', fontSize: '13px', fontFamily: 'var(--font-main)' }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MIcon name="favorite" size={16} style={{ color: 'white' }} />
            </div>
            {!collapsed && <span>{t.likedSongs}</span>}
          </button>
          {!collapsed && (
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', fontSize: '13px', fontFamily: 'var(--font-main)' }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: `1px dashed ${theme.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MIcon name="add" size={16} />
              </div>
              <span>{t.createPlaylist}</span>
            </button>
          )}
        </div>

        <div style={{ height: '1px', background: theme.borderColor, margin: '0 16px' }} />

        {/* Playlists */}
        {!collapsed && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', padding: '0 14px 12px', fontFamily: 'var(--font-main)' }}>{t.myPlaylists}</p>
            {userPlaylists.map(playlist => (
              <button key={playlist.id} onClick={() => navigate('playlist', playlist)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer', color: theme.textSecondary, background: 'transparent', fontSize: '13px', marginBottom: '2px', textAlign: 'left', fontFamily: 'var(--font-main)' }}
                onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textPrimary; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; }}
              >
                <img src={playlist.image} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontWeight: 600, color: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{playlist.name}</p>
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
              <p style={{ fontSize: '13px', fontWeight: 700, color: theme.textPrimary }}>Hirako User</p>
              <p style={{ fontSize: '11px', color: theme.textMuted }}>{t.premium} ✨</p>
            </div>
            <MIcon name="chevron_right" size={18} style={{ color: theme.textMuted }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

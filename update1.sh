#!/bin/bash

echo "🔄 Hirako v3.0 - Upgrade majeure..."

cd hirako

# ============================================================
# Update public/index.html - Nouvelle police
# ============================================================
cat > public/index.html << 'ENDOFFILE'
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0a0a0f" />
    <meta name="description" content="Hirako - Your Premium Music Experience" />
    <title>Hirako</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;1,6..12,400&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
ENDOFFILE

# ============================================================
# FULL REWRITE: src/styles/globals.css
# ============================================================
cat > src/styles/globals.css << 'ENDOFFILE'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-card: #1a1a2e;
  --bg-hover: #16213e;
  --accent-primary: #7c3aed;
  --accent-secondary: #a855f7;
  --accent-pink: #ec4899;
  --accent-blue: #3b82f6;
  --accent-green: #10b981;
  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;
  --border-color: #27272a;
  --gradient-1: linear-gradient(135deg, #7c3aed, #ec4899);
  --sidebar-width: 280px;
  --player-height: 90px;
  --font-main: 'Nunito Sans', 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Quicksand', 'Nunito Sans', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-main);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 0.01em;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

#root {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes equalizer {
  0%, 100% { height: 4px; }
  50% { height: 20px; }
}
@keyframes shimmer {
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.3); }
  50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.8); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 40px rgba(124,58,237, 0.3); }
  50% { box-shadow: 0 0 80px rgba(124,58,237, 0.6); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-fadeIn { animation: fadeIn 0.4s ease forwards; }

.eq-bar {
  width: 3px;
  background: var(--accent-secondary);
  border-radius: 2px;
  animation: equalizer 0.8s ease-in-out infinite;
}
.eq-bar:nth-child(2) { animation-delay: 0.2s; }
.eq-bar:nth-child(3) { animation-delay: 0.4s; }
.eq-bar:nth-child(4) { animation-delay: 0.1s; }

.track-row { transition: all 0.2s ease; }
.track-row:hover { background: rgba(124,58,237,0.06); border-radius: 8px; }

.music-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}
.music-card:hover { transform: translateY(-4px); }
.music-card:hover .card-overlay { opacity: 1 !important; }
.music-card:hover .card-play-btn {
  transform: translateY(0) !important;
  opacity: 1 !important;
}

.nav-link {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
.nav-link::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 3px; height: 0;
  background: var(--gradient-1);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s ease;
}
.nav-link.active::before { height: 70%; }
.nav-link:hover { background: rgba(124,58,237,0.06); }
.nav-link.active { background: rgba(124, 58, 237, 0.12); color: var(--text-primary); }

.progress-bar {
  position: relative; height: 4px;
  background: var(--border-color);
  border-radius: 2px; cursor: pointer;
}
.progress-fill {
  height: 100%;
  background: var(--gradient-1);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;
}
.progress-fill::after {
  content: ''; position: absolute;
  right: -6px; top: -4px;
  width: 12px; height: 12px;
  background: white; border-radius: 50%;
  opacity: 0; transition: opacity 0.2s;
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.8);
}
.progress-bar:hover .progress-fill::after { opacity: 1; }

.vinyl-record { border-radius: 50%; transition: all 0.3s ease; }
.vinyl-record.playing {
  animation: rotate 8s linear infinite;
  box-shadow: 0 0 40px rgba(124, 58, 237, 0.5);
}

.search-input {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  outline: none;
  transition: all 0.3s ease;
  font-family: var(--font-main);
}
.search-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}
.search-input::placeholder { color: var(--text-muted); }

.btn-primary {
  background: var(--gradient-1);
  border: none; color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-main);
}
.btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
.btn-primary:active { transform: scale(0.97); }

input[type="range"] {
  -webkit-appearance: none; appearance: none;
  background: transparent; cursor: pointer;
}
input[type="range"]::-webkit-slider-track {
  background: var(--border-color);
  height: 4px; border-radius: 2px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  background: white;
  height: 12px; width: 12px;
  border-radius: 50%; margin-top: -4px;
  transition: transform 0.1s;
}
input[type="range"]:hover::-webkit-slider-thumb {
  transform: scale(1.3);
  background: var(--accent-secondary);
}

::selection { background: rgba(124, 58, 237, 0.3); color: white; }

body, div, p, span, h1, h2, h3, h4, button, input, a {
  transition: background-color 0.3s ease, color 0.15s ease, border-color 0.3s ease;
}

/* Material symbols config */
.material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;
    --player-height: 72px;
  }
}
@media (max-width: 480px) {
  :root { --player-height: 64px; }
}
ENDOFFILE

# ============================================================
# src/components/MIcon.jsx - Material Symbol wrapper
# ============================================================
cat > src/components/MIcon.jsx << 'ENDOFFILE'
import React from 'react';

const MIcon = ({ name, size = 24, filled = true, style = {}, className = '', ...props }) => (
  <span
    className={`material-symbols-rounded ${className}`}
    style={{
      fontSize: `${size}px`,
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 500, 'GRAD' 0, 'opsz' ${size}`,
      lineHeight: 1,
      userSelect: 'none',
      ...style,
    }}
    {...props}
  >
    {name}
  </span>
);

export default MIcon;
ENDOFFILE

# ============================================================
# NEW: src/components/LocalFiles.jsx
# ============================================================
cat > src/components/LocalFiles.jsx << 'ENDOFFILE'
import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMusicContext } from '../context/MusicContext';
import MIcon from './MIcon';
import TrackList from './TrackList';

const LocalFiles = () => {
  const { isDark, t, theme, importedTracks, addImportedTrack, removeImportedTrack } = useTheme();
  const { playTrack } = useMusicContext();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileImport = (files) => {
    Array.from(files).forEach(file => {
      if (file.name.match(/\.(mp3|wav|flac|ogg|m4a|aac)$/i)) {
        const url = URL.createObjectURL(file);
        const track = {
          id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: file.name.replace(/\.(mp3|wav|flac|ogg|m4a|aac)$/i, ''),
          artist: t.localFiles,
          artistId: null,
          album: t.localFiles,
          duration: 0,
          image: `https://picsum.photos/seed/${Date.now()}/300/300`,
          audioUrl: url,
          plays: '—',
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

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFileImport(e.dataTransfer.files); };

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>
            <MIcon name="folder_open" size={28} style={{ marginRight: '12px', verticalAlign: 'middle', color: '#f59e0b' }} />
            {t.localFiles}
          </h1>
          <p style={{ fontSize: '14px', color: theme.textSecondary, marginTop: '8px' }}>
            {importedTracks.length} {t.tracks}
          </p>
        </div>
        {importedTracks.length > 0 && (
          <button
            onClick={() => playTrack(importedTracks[0], importedTracks)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 28px', borderRadius: '50px',
              background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
              border: 'none', color: 'white', cursor: 'pointer',
              fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-main)',
              boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
            }}
          >
            <MIcon name="play_arrow" size={20} /> {t.playNow}
          </button>
        )}
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: dragOver ? '48px' : '44px',
          borderRadius: '20px',
          border: `2px dashed ${dragOver ? '#7c3aed' : theme.borderColor}`,
          background: dragOver
            ? (isDark ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.05)')
            : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'),
          textAlign: 'center', cursor: 'pointer',
          transition: 'all 0.3s', marginBottom: '32px',
        }}
      >
        <input ref={fileInputRef} type="file" accept=".mp3,.wav,.flac,.ogg,.m4a,.aac" multiple style={{ display: 'none' }} onChange={e => handleFileImport(e.target.files)} />
        <MIcon name="cloud_upload" size={56} style={{ color: dragOver ? '#7c3aed' : theme.textMuted, marginBottom: '16px', display: 'block', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '17px', fontWeight: 700, color: dragOver ? '#7c3aed' : theme.textPrimary, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
          {t.importLocal}
        </p>
        <p style={{ fontSize: '13px', color: theme.textMuted }}>
          {t.importDesc}
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
          {['MP3', 'WAV', 'FLAC', 'OGG', 'M4A'].map(fmt => (
            <span key={fmt} style={{
              padding: '4px 12px', borderRadius: '20px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              fontSize: '11px', fontWeight: 700, color: theme.textMuted,
              border: `1px solid ${theme.borderColor}`,
            }}>{fmt}</span>
          ))}
        </div>
      </div>

      {/* Imported tracks list */}
      {importedTracks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <MIcon name="library_music" size={64} style={{ color: theme.textMuted, marginBottom: '16px', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{t.noImported}</p>
          <p style={{ color: theme.textMuted, fontSize: '14px' }}>{t.importDesc}</p>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>
              {t.importedTracks} ({importedTracks.length})
            </h2>
          </div>
          {importedTracks.map((track, i) => (
            <div key={track.id} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '12px 16px', borderRadius: '12px',
              background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              marginBottom: '6px', transition: 'background 0.2s',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
            }}
              onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
            >
              <span style={{ fontSize: '14px', color: theme.textMuted, width: '24px', textAlign: 'center' }}>{i + 1}</span>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `linear-gradient(135deg, hsl(${(i * 40) % 360}, 70%, 50%), hsl(${(i * 40 + 60) % 360}, 70%, 40%))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <MIcon name="music_note" size={22} style={{ color: 'white' }} />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</p>
                <p style={{ fontSize: '12px', color: theme.textMuted }}>{track.fileType} • {track.fileSize}</p>
              </div>
              <button onClick={() => playTrack(track, importedTracks)} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <MIcon name="play_circle" size={24} />
              </button>
              <button onClick={() => removeImportedTrack(track.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <MIcon name="delete" size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocalFiles;
ENDOFFILE

# ============================================================
# Update Settings (quality only, no import)
# ============================================================
cat > src/components/Settings.jsx << 'ENDOFFILE'
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import MIcon from './MIcon';

const Settings = () => {
  const { isDark, toggleTheme, language, setLanguage, t, audioQuality, setAudioQuality, theme } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const qualities = [
    { id: 'lossless', label: t.lossless, desc: 'FLAC / WAV', icon: 'diamond' },
    { id: 'high', label: t.high, desc: 'MP3 320kbps', icon: 'local_fire_department' },
    { id: 'medium', label: t.medium, desc: 'MP3 192kbps', icon: 'music_note' },
    { id: 'low', label: t.low, desc: 'MP3 128kbps', icon: 'smartphone' },
  ];

  const sections = [
    { id: 'appearance', icon: 'palette', label: t.appearance },
    { id: 'general', icon: 'settings', label: t.general },
    { id: 'quality', icon: 'headphones', label: t.audioQuality },
  ];

  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '32px', color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>
        <MIcon name="settings" size={28} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
        {t.settings}
      </h1>

      <div style={{ display: 'flex', gap: '32px', maxWidth: '900px' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>
          {sections.map(sec => (
            <button key={sec.id} onClick={() => setActiveSection(sec.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', borderRadius: '12px', border: 'none',
              background: activeSection === sec.id ? 'rgba(124,58,237,0.12)' : 'transparent',
              color: activeSection === sec.id ? '#a855f7' : theme.textSecondary,
              cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-main)',
              marginBottom: '4px', textAlign: 'left', transition: 'all 0.2s',
            }}>
              <MIcon name={sec.icon} size={20} /> {sec.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>{t.appearance}</h2>
              <div style={{ padding: '24px', borderRadius: '16px', background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: isDark ? 'linear-gradient(135deg, #1e1b4b, #312e81)' : 'linear-gradient(135deg, #fef3c7, #fde68a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MIcon name={isDark ? 'dark_mode' : 'light_mode'} size={24} style={{ color: isDark ? '#a78bfa' : '#f59e0b' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{isDark ? t.darkMode : t.lightMode}</p>
                      <p style={{ fontSize: '13px', color: theme.textSecondary }}>{isDark ? 'Dark theme active' : 'Light theme active'}</p>
                    </div>
                  </div>
                  <button onClick={toggleTheme} style={{ width: '56px', height: '28px', borderRadius: '14px', background: isDark ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : '#e2e8f0', border: 'none', cursor: 'pointer', position: 'relative' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', left: isDark ? '31px' : '3px', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* General */}
          {activeSection === 'general' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>{t.general}</h2>
              <div style={{ padding: '24px', borderRadius: '16px', background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MIcon name="language" size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{t.language}</p>
                    <p style={{ fontSize: '13px', color: theme.textSecondary }}>{languages.find(l => l.code === language)?.name}</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => setLanguage(lang.code)} style={{
                      padding: '14px 16px', borderRadius: '12px',
                      background: language === lang.code ? 'rgba(124,58,237,0.12)' : 'transparent',
                      border: `1px solid ${language === lang.code ? 'rgba(124,58,237,0.4)' : cardBorder}`,
                      color: language === lang.code ? '#a855f7' : theme.textSecondary,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                      fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-main)', transition: 'all 0.2s',
                    }}>
                      <span style={{ fontSize: '20px' }}>{lang.flag}</span> {lang.name}
                      {language === lang.code && <MIcon name="check_circle" size={18} style={{ marginLeft: 'auto', color: '#a855f7' }} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audio Quality */}
          {activeSection === 'quality' && (
            <div className="animate-fadeIn">
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>{t.audioQuality}</h2>
              <div style={{ padding: '24px', borderRadius: '16px', background: cardBg, border: `1px solid ${cardBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MIcon name="headphones" size={24} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary }}>{t.audioQuality}</p>
                    <p style={{ fontSize: '13px', color: theme.textSecondary }}>{qualities.find(q => q.id === audioQuality)?.label}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {qualities.map(q => (
                    <button key={q.id} onClick={() => setAudioQuality(q.id)} style={{
                      padding: '16px', borderRadius: '12px',
                      background: audioQuality === q.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                      border: `1px solid ${audioQuality === q.id ? 'rgba(124,58,237,0.4)' : cardBorder}`,
                      color: theme.textPrimary, cursor: 'pointer', display: 'flex', alignItems: 'center',
                      gap: '14px', fontSize: '14px', fontFamily: 'var(--font-main)', textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      <MIcon name={q.icon} size={22} style={{ color: audioQuality === q.id ? '#a855f7' : theme.textMuted }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, color: audioQuality === q.id ? '#a855f7' : theme.textPrimary }}>{q.label}</p>
                        <p style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>{q.desc}</p>
                      </div>
                      {audioQuality === q.id && <MIcon name="check_circle" size={20} style={{ color: '#a855f7' }} />}
                    </button>
                  ))}
                </div>
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
# FULL REWRITE: FullScreenPlayer.jsx - Desktop Deezer-like
# ============================================================
cat > src/components/FullScreenPlayer.jsx << 'ENDOFFILE'
import React, { useState, useEffect } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { useTheme } from '../context/ThemeContext';
import { formatDuration } from '../data/mockData';
import MIcon from './MIcon';

const FullScreenPlayer = ({ onClose }) => {
  const {
    currentTrack, isPlaying, progress, duration,
    volume, isMuted, isShuffled, repeatMode, likedTracks,
    togglePlay, handleNext, handlePrev, seekTo,
    setVolume, setIsMuted, toggleLike, toggleShuffle, cycleRepeat,
    queue, currentIndex,
  } = useMusicContext();
  const { t, theme, isDark } = useTheme();

  const [activePanel, setActivePanel] = useState('queue');
  const isLiked = currentTrack && likedTracks.includes(currentTrack.id);
  const currentTime = duration ? (progress / 100) * duration : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seekTo(Math.max(0, Math.min(100, pct)));
  };

  if (!currentTrack) return null;

  const upcomingTracks = queue.slice(currentIndex + 1, currentIndex + 10);
  const pastTracks = queue.slice(Math.max(0, currentIndex - 3), currentIndex);

  const bgBase = isDark ? '#0a0a0f' : '#f0f0f5';
  const panelBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const panelBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const subtle = isDark ? 'rgba(255,255,255,' : 'rgba(0,0,0,';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: bgBase,
      display: 'flex', flexDirection: 'column',
      animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden',
    }}>
      {/* Ambient background glow */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '60%', height: '60%', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(124,58,237,${isDark ? 0.08 : 0.04}), transparent 70%)`,
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: '50%', height: '50%', borderRadius: '50%',
          background: `radial-gradient(circle, rgba(236,72,153,${isDark ? 0.06 : 0.03}), transparent 70%)`,
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', position: 'relative', zIndex: 10, flexShrink: 0,
      }}>
        <button onClick={onClose} style={{
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          border: 'none', cursor: 'pointer',
          color: theme.textSecondary, borderRadius: '12px',
          padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-main)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = theme.textPrimary; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = theme.textSecondary; }}
        >
          <MIcon name="keyboard_arrow_down" size={22} /> {t.minimize}
        </button>

        <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '2px' }}>
          {t.nowPlaying}
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => toggleLike(currentTrack.id)} style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: 'none', cursor: 'pointer', borderRadius: '12px',
            padding: '10px', display: 'flex', transition: 'all 0.2s',
            color: isLiked ? '#ec4899' : theme.textMuted,
          }}>
            <MIcon name={isLiked ? 'favorite' : 'favorite_border'} size={22} />
          </button>
          <button style={{
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            border: 'none', cursor: 'pointer', borderRadius: '12px',
            padding: '10px', display: 'flex', color: theme.textMuted,
          }}>
            <MIcon name="more_horiz" size={22} />
          </button>
        </div>
      </div>

      {/* Main Layout - 3 columns desktop */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'stretch',
        padding: '0 32px 24px', gap: '32px',
        position: 'relative', zIndex: 10, overflow: 'hidden',
        minHeight: 0,
      }}>

        {/* Left Panel - Queue */}
        <div style={{
          width: '320px', flexShrink: 0,
          background: panelBg, borderRadius: '20px',
          border: `1px solid ${panelBorder}`,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Panel tabs */}
          <div style={{ padding: '16px 16px 0', flexShrink: 0 }}>
            <div style={{
              display: 'flex', gap: '2px',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              borderRadius: '12px', padding: '3px',
            }}>
              {[
                { id: 'queue', icon: 'queue_music', label: t.queue },
                { id: 'lyrics', icon: 'lyrics', label: t.lyrics },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActivePanel(tab.id)} style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                  background: activePanel === tab.id ? (isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.1)') : 'transparent',
                  color: activePanel === tab.id ? '#a855f7' : theme.textMuted,
                  cursor: 'pointer', fontSize: '12px', fontWeight: 700,
                  fontFamily: 'var(--font-main)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s',
                }}>
                  <MIcon name={tab.icon} size={18} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Panel Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {activePanel === 'queue' && (
              <>
                {pastTracks.length > 0 && (
                  <>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      Précédent
                    </p>
                    {pastTracks.map(track => (
                      <div key={track.id} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '8px', borderRadius: '10px', marginBottom: '2px', opacity: 0.5,
                      }}>
                        <img src={track.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</p>
                          <p style={{ fontSize: '11px', color: theme.textMuted }}>{track.artist}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Current */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px', borderRadius: '12px', marginBottom: '12px',
                  background: isDark ? 'rgba(124,58,237,0.12)' : 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}>
                  <img src={currentTrack.image} alt="" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#a855f7', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.title}</p>
                    <p style={{ fontSize: '11px', color: theme.textSecondary }}>{currentTrack.artist}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                    {isPlaying && [0, 0.15, 0.3].map((d, i) => (
                      <div key={i} className="eq-bar" style={{ animationDelay: `${d}s`, width: '3px' }} />
                    ))}
                  </div>
                </div>

                {/* Upcoming */}
                <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  {t.upNext}
                </p>
                {upcomingTracks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px' }}>
                    <MIcon name="queue_music" size={32} style={{ color: theme.textMuted, marginBottom: '8px' }} />
                    <p style={{ fontSize: '13px', color: theme.textMuted }}>{t.queue}</p>
                  </div>
                ) : (
                  upcomingTracks.map((track, i) => (
                    <div key={track.id} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '8px', borderRadius: '10px', marginBottom: '2px',
                      cursor: 'pointer', transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <img src={track.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</p>
                        <p style={{ fontSize: '11px', color: theme.textMuted }}>{track.artist}</p>
                      </div>
                      <span style={{ fontSize: '12px', color: theme.textMuted }}>{formatDuration(track.duration)}</span>
                    </div>
                  ))
                )}
              </>
            )}

            {activePanel === 'lyrics' && (
              <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                <MIcon name="lyrics" size={56} style={{ color: 'rgba(124,58,237,0.3)', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px', fontWeight: 700, color: theme.textPrimary, marginBottom: '8px', fontFamily: 'var(--font-display)' }}>{t.lyrics}</p>
                <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 2.2 }}>
                  ♪ No lyrics available ♪<br />
                  ♫ for this track ♫
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Center - Cover & Controls */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minWidth: 0,
        }}>
          {/* Cover Art */}
          <div style={{ position: 'relative', marginBottom: '40px' }}>
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              style={{
                width: '340px', height: '340px',
                objectFit: 'cover', borderRadius: '16px',
                boxShadow: isPlaying
                  ? `0 40px 100px ${subtle}0.25), 0 0 60px rgba(124,58,237,0.15)`
                  : `0 20px 60px ${subtle}0.15)`,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isPlaying ? 'scale(1)' : 'scale(0.96)',
              }}
            />
            {isPlaying && (
              <div style={{
                position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)',
                width: '80%', height: '20px', borderRadius: '50%',
                background: `radial-gradient(ellipse, ${subtle}0.12), transparent)`,
                filter: 'blur(8px)',
              }} />
            )}
          </div>

          {/* Track Info */}
          <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '400px', width: '100%' }}>
            <h2 style={{
              fontSize: '26px', fontWeight: 800, color: theme.textPrimary,
              fontFamily: 'var(--font-display)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              marginBottom: '6px',
            }}>
              {currentTrack.title}
            </h2>
            <p style={{ fontSize: '16px', color: theme.textSecondary, fontWeight: 500 }}>
              {currentTrack.artist}
            </p>
            <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>
              {currentTrack.album}
            </p>
          </div>

          {/* Progress */}
          <div style={{ width: '100%', maxWidth: '420px', marginBottom: '28px' }}>
            <div style={{
              position: 'relative', height: '5px',
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              borderRadius: '3px', cursor: 'pointer',
            }}
              onClick={handleProgressClick}
              onMouseEnter={e => e.currentTarget.style.height = '7px'}
              onMouseLeave={e => e.currentTarget.style.height = '5px'}
            >
              <div style={{
                height: '100%', borderRadius: '3px',
                background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                width: `${progress}%`, transition: 'width 0.1s linear',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', right: '-7px', top: '-4px',
                  width: '14px', height: '14px', background: '#a855f7',
                  borderRadius: '50%', boxShadow: '0 0 10px rgba(124,58,237,0.6)',
                }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: theme.textMuted }}>{formatDuration(Math.floor(currentTime))}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: theme.textMuted }}>{formatDuration(Math.floor(duration))}</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginBottom: '28px' }}>
            <button onClick={toggleShuffle} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isShuffled ? '#a855f7' : theme.textMuted,
              transition: 'all 0.2s', padding: '8px', borderRadius: '50%',
            }}>
              <MIcon name="shuffle" size={24} />
            </button>
            <button onClick={handlePrev} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: theme.textSecondary, transition: 'all 0.2s', padding: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary}
              onMouseLeave={e => e.currentTarget.style.color = theme.textSecondary}
            >
              <MIcon name="skip_previous" size={36} />
            </button>
            <button onClick={togglePlay} style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MIcon name={isPlaying ? 'pause' : 'play_arrow'} size={36} />
            </button>
            <button onClick={handleNext} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: theme.textSecondary, transition: 'all 0.2s', padding: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.color = theme.textPrimary}
              onMouseLeave={e => e.currentTarget.style.color = theme.textSecondary}
            >
              <MIcon name="skip_next" size={36} />
            </button>
            <button onClick={cycleRepeat} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: repeatMode !== 'none' ? '#a855f7' : theme.textMuted,
              transition: 'all 0.2s', padding: '8px',
            }}>
              <MIcon name={repeatMode === 'one' ? 'repeat_one' : 'repeat'} size={24} />
            </button>
          </div>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '200px' }}>
            <button onClick={() => setIsMuted(!isMuted)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: theme.textMuted, padding: '4px',
            }}>
              <MIcon name={isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'} size={22} />
            </button>
            <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
              onChange={e => { setVolume(parseFloat(e.target.value)); if (isMuted) setIsMuted(false); }}
              style={{ flex: 1 }} />
          </div>
        </div>

        {/* Right Panel - Artist Info */}
        <div style={{
          width: '320px', flexShrink: 0,
          background: panelBg, borderRadius: '20px',
          border: `1px solid ${panelBorder}`,
          padding: '24px', overflow: 'auto',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            {t.about}
          </p>

          {/* Artist mini */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img src={currentTrack.image} alt="" style={{
              width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover',
              border: `3px solid rgba(124,58,237,0.3)`,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              marginBottom: '12px',
            }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: theme.textPrimary, fontFamily: 'var(--font-display)' }}>
              {currentTrack.artist}
            </h3>
            <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>{currentTrack.plays} {t.plays}</p>
          </div>

          {/* Track details */}
          <div style={{
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            borderRadius: '14px', padding: '16px', marginBottom: '16px',
          }}>
            {[
              { label: t.album, value: currentTrack.album },
              { label: t.duration, value: formatDuration(currentTrack.duration) },
              { label: 'Year', value: currentTrack.year },
              { label: t.plays, value: currentTrack.plays },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: i < 3 ? `1px solid ${panelBorder}` : 'none',
              }}>
                <span style={{ fontSize: '13px', color: theme.textMuted, fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: '13px', color: theme.textPrimary, fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Quality badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px', borderRadius: '12px',
            background: isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.05)',
            border: '1px solid rgba(124,58,237,0.15)',
          }}>
            <MIcon name="headphones" size={20} style={{ color: '#a855f7' }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#a855f7' }}>{t.audioQuality}</p>
              <p style={{ fontSize: '11px', color: theme.textMuted }}>320 kbps • MP3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPlayer;
ENDOFFILE

# ============================================================
# Update Sidebar with LocalFiles tab + Material icons
# ============================================================
cat > src/components/Sidebar.jsx << 'ENDOFFILE'
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
ENDOFFILE

# ============================================================
# Update Header with Material icons + mobile nav fix
# ============================================================
cat > src/components/Header.jsx << 'ENDOFFILE'
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
ENDOFFILE

# ============================================================
# Update App.jsx - add LocalFiles route
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
import LocalFiles from './components/LocalFiles';
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
      case 'localfiles': return <LocalFiles />;
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

echo ""
echo "✅ Hirako v3.0 - Upgrade terminée !"
echo ""
echo "🔄 Changements :"
echo "  ✏️  Police Nunito Sans + Quicksand (style Deezer)"
echo "  🎯  Icônes Material Symbols Rounded (style Deezer)"
echo "  🖥️  Player plein écran desktop 3 colonnes"
echo "  ☀️  Mode clair : tous les textes visibles"
echo "  📁  Fichiers locaux : onglet dédié (pas dans settings)"
echo "  ⚙️  Settings : apparence + langue + qualité uniquement"
echo "  📱  Responsive : mobile bottom nav + layouts adaptatifs"
echo ""
echo "👉 Relance :"
echo "   cd hirako && npm start"
echo ""
echo "═══════════════════════════════════════════════"
echo "💡 AVIS D'AMÉLIORATION POUR LA SUITE :"
echo "═══════════════════════════════════════════════"
echo ""
echo "1. 🔐 AUTHENTIFICATION"
echo "   → Ajouter login/signup avec JWT"
echo "   → Profil utilisateur personnalisable"
echo ""
echo "2. 📡 BACKEND API"
echo "   → Node.js/Express + MongoDB"
echo "   → Stocker playlists, likes, historique"
echo ""
echo "3. 🎤 PAROLES EN TEMPS RÉEL"
echo "   → Intégrer l'API Musixmatch ou Genius"
echo "   → Afficher les paroles synchronisées"
echo ""
echo "4. 📊 VISUALISEUR AUDIO"
echo "   → Web Audio API pour analyzer"
echo "   → Barres de fréquence ou cercle animé"
echo ""
echo "5. 🔍 RECHERCHE AVANCÉE"
echo "   → Filtres par genre, année, durée"
echo "   → Auto-complétion avec suggestions"
echo ""
echo "6. 📲 PWA (Progressive Web App)"
echo "   → Manifest + Service Worker"
echo "   → Installable sur mobile/desktop"
echo "   → Mode hors-ligne pour les imports locaux"
echo ""
echo "7. 🎨 THÈMES PERSONNALISÉS"
echo "   → Palette de couleurs au choix"
echo "   → Accent color personnalisable"
echo ""
echo "8. ⌨️  RACCOURCIS CLAVIER"
echo "   → Espace = play/pause"
echo "   → Flèches = prev/next"
echo "   → M = mute, F = fullscreen"
echo ""
echo "9. 📤 PARTAGE SOCIAL"
echo "   → Partager un titre/playlist"
echo "   → Générer un lien ou image"
echo ""
echo "10. 🤖 RECOMMANDATIONS IA"
echo "    → Suggestions basées sur l'historique"
echo "    → Mix personnalisés automatiques"
echo "═══════════════════════════════════════════════"
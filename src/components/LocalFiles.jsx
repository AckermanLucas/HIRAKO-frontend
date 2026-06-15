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

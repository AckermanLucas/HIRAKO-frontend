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

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

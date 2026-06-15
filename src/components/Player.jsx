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

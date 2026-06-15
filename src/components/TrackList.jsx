import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { formatDuration } from '../data/mockData';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaMusic } from 'react-icons/fa';

const TrackList = ({ tracks, showAlbum = true, showImage = true }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedTracks, toggleLike } = useMusicContext();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `40px 1fr ${showAlbum ? '1fr' : ''} 100px 80px 40px`, gap: '16px', padding: '8px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '8px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', textAlign: 'center' }}>#</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Titre</span>
        {showAlbum && <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Album</span>}
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Écoutes</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', textAlign: 'right' }}>⏱</span>
        <span></span>
      </div>
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const isLiked = likedTracks.includes(track.id);
        const isHovered = hoveredId === track.id;
        return (
          <div key={track.id} className="track-row" onMouseEnter={() => setHoveredId(track.id)} onMouseLeave={() => setHoveredId(null)} onDoubleClick={() => isCurrentTrack ? togglePlay() : playTrack(track, tracks)} style={{ display: 'grid', gridTemplateColumns: `40px 1fr ${showAlbum ? '1fr' : ''} 100px 80px 40px`, gap: '16px', padding: '10px 16px', borderRadius: '8px', cursor: 'default', background: isCurrentTrack ? 'rgba(124,58,237,0.1)' : 'transparent', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isHovered ? (
                <button onClick={() => isCurrentTrack ? togglePlay() : playTrack(track, tracks)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
                  {isCurrentTrack && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              ) : isCurrentTrack ? (
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                  {isPlaying ? [0, 0.2, 0.4].map((delay, i) => <div key={i} className="eq-bar" style={{ animationDelay: `${delay}s` }} />) : <FaMusic style={{ color: '#a855f7', fontSize: '12px' }} />}
                </div>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{index + 1}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
              {showImage && <img src={track.image} alt={track.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />}
              <div style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: isCurrentTrack ? '#a855f7' : 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</p>
                  {track.explicit && <span style={{ fontSize: '9px', padding: '1px 4px', background: 'var(--text-muted)', color: 'var(--bg-primary)', borderRadius: '2px', fontWeight: 700, flexShrink: 0 }}>E</span>}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.artist}</p>
              </div>
            </div>
            {showAlbum && <p style={{ fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.album}</p>}
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{track.plays}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
              {isHovered && <button onClick={() => toggleLike(track.id)} style={{ background: 'none', border: 'none', color: isLiked ? '#ec4899' : 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s' }}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>}
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', minWidth: '35px', textAlign: 'right' }}>{formatDuration(track.duration)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;

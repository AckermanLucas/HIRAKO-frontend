import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { TRACKS } from '../data/mockData';
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaRandom, FaEllipsisH, FaShare, FaDownload, FaChevronLeft } from 'react-icons/fa';
import TrackList from './TrackList';

const Playlist = ({ playlist }) => {
  const { playTrack, currentTrack, isPlaying, togglePlay, navigate } = useMusicContext();
  const [isLiked, setIsLiked] = useState(false);
  const tracks = (playlist.tracks || []).map(id => typeof id === 'number' ? TRACKS.find(t => t.id === id) : id).filter(Boolean);
  const isPlaylistPlaying = tracks.some(t => t.id === currentTrack?.id) && isPlaying;
  const totalMins = Math.floor(tracks.reduce((acc, t) => acc + t.duration, 0) / 60);

  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <div style={{ position: 'relative', minHeight: '320px', background: `linear-gradient(135deg, ${playlist.color || '#7c3aed'}60 0%, rgba(10,10,15,0.8) 100%)`, padding: '32px 40px', display: 'flex', alignItems: 'flex-end', gap: '32px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${playlist.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, filter: 'blur(4px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${playlist.color || '#7c3aed'}40, #0a0a0f)` }} />
        <div style={{ position: 'absolute', top: '-80px', left: '40px', width: '300px', height: '300px', borderRadius: '50%', background: `${playlist.color || '#7c3aed'}20`, filter: 'blur(60px)' }} />
        <button onClick={() => navigate('home')} style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(0,0,0,0.4)', border: 'none', color: 'white', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', backdropFilter: 'blur(10px)', zIndex: 10 }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.7)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.4)'}><FaChevronLeft /></button>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src={playlist.image} alt={playlist.name} style={{ width: '200px', height: '200px', borderRadius: '16px', objectFit: 'cover', boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${playlist.color || '#7c3aed'}40` }} />
          {isPlaylistPlaying && (
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', borderRadius: '8px', padding: '4px 8px', display: 'flex', gap: '2px', alignItems: 'flex-end', height: '24px' }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} className="eq-bar" style={{ animationDelay: `${d}s`, width: '3px' }} />)}
            </div>
          )}
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: playlist.color || '#a855f7', marginBottom: '8px' }}>Playlist</p>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '12px', fontFamily: 'Poppins', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{playlist.name}</h1>
          {playlist.description && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '12px' }}>{playlist.description}</p>}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            <span style={{ color: 'white', fontWeight: 600 }}>{playlist.owner}</span>
            {playlist.followers && ` • ${playlist.followers} abonnés`}
            {` • ${tracks.length} titres • environ ${totalMins} min`}
          </p>
        </div>
      </div>

      <div style={{ padding: '24px 40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => isPlaylistPlaying ? togglePlay() : tracks.length > 0 && playTrack(tracks[0], tracks)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '22px', boxShadow: '0 8px 32px rgba(124,58,237,0.6)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          {isPlaylistPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
        </button>
        <button style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}><FaRandom /></button>
        <button onClick={() => setIsLiked(!isLiked)} style={{ background: 'none', border: 'none', color: isLiked ? '#ec4899' : 'var(--text-muted)', cursor: 'pointer', fontSize: '22px' }}>{isLiked ? <FaHeart /> : <FaRegHeart />}</button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px' }}><FaShare /></button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px' }}><FaDownload /></button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px', marginLeft: 'auto' }}><FaEllipsisH /></button>
      </div>

      <div style={{ padding: '0 24px 120px' }}>
        <TrackList tracks={tracks} />
      </div>
    </div>
  );
};

export default Playlist;

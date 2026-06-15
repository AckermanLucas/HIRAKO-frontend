import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { TRACKS, ALBUMS } from '../data/mockData';
import { FaPlay, FaPause, FaUserCheck, FaUserPlus, FaChevronLeft, FaStar, FaEllipsisH } from 'react-icons/fa';
import TrackList from './TrackList';

const ArtistPage = ({ artist }) => {
  const { navigate, playTrack, currentTrack, isPlaying, togglePlay } = useMusicContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const artistTracks = TRACKS.filter(t => t.artistId === artist.id);
  const artistAlbums = ALBUMS.filter(a => a.artistId === artist.id);
  const isArtistPlaying = artistTracks.some(t => t.id === currentTrack?.id) && isPlaying;
  const displayedTracks = showAllTracks ? artistTracks : artistTracks.slice(0, 5);

  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src={artist.image} alt={artist.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${artist.color}20 0%, rgba(10,10,15,0.95) 100%)` }} />
        <button onClick={() => navigate('home')} style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', backdropFilter: 'blur(10px)', zIndex: 10 }}><FaChevronLeft /></button>
        <div style={{ position: 'absolute', bottom: '32px', left: '40px', right: '40px' }}>
          {artist.verified && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', marginBottom: '12px' }}>
              <FaStar style={{ color: '#a855f7', fontSize: '10px' }} />
              <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: 600 }}>Artiste Vérifié</span>
            </div>
          )}
          <h1 style={{ fontSize: '56px', fontWeight: 900, color: 'white', lineHeight: 1, fontFamily: 'Poppins', textShadow: '0 4px 30px rgba(0,0,0,0.8)', marginBottom: '8px' }}>{artist.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{artist.followers} abonnés mensuels</p>
        </div>
      </div>

      <div style={{ padding: '24px 40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => isArtistPlaying ? togglePlay() : artistTracks.length > 0 && playTrack(artistTracks[0], artistTracks)} style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '22px', boxShadow: '0 8px 32px rgba(124,58,237,0.6)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          {isArtistPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
        </button>
        <button onClick={() => setIsFollowing(!isFollowing)} style={{ padding: '12px 28px', borderRadius: '50px', background: isFollowing ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'transparent', border: isFollowing ? 'none' : '2px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter' }}>
          {isFollowing ? <><FaUserCheck /> Suivi</> : <><FaUserPlus /> Suivre</>}
        </button>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px', marginLeft: 'auto' }}><FaEllipsisH /></button>
      </div>

      <div style={{ padding: '0 24px 120px' }}>
        <div style={{ padding: '24px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: `${artist.color}20`, filter: 'blur(20px)' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>À propos</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '14px' }}>{artist.bio}</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <div><p style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>{artist.followers}</p><p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Abonnés</p></div>
            <div><p style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>{artistTracks.length}</p><p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Titres</p></div>
            <div><p style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>{artistAlbums.length}</p><p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Albums</p></div>
            <div><p style={{ fontSize: '18px', fontWeight: 800, color: artist.color }}>{artist.genre}</p><p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Genre</p></div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white' }}>Titres populaires</h2>
            <button onClick={() => setShowAllTracks(!showAllTracks)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '13px', fontFamily: 'Inter' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>{showAllTracks ? 'Voir moins' : 'Voir tout'}</button>
          </div>
          <TrackList tracks={displayedTracks} />
        </div>

        {artistAlbums.length > 0 && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '16px' }}>Discographie</h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {artistAlbums.map(album => (
                <div key={album.id} style={{ width: '180px', cursor: 'pointer', background: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${album.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <img src={album.image} alt={album.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{album.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{album.year} • Album</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;

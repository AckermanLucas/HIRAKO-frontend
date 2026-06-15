import React, { useState } from 'react';
import { useMusicContext } from '../context/MusicContext';
import { TRACKS, ARTISTS } from '../data/mockData';
import { FaHeart, FaPlay, FaSearch, FaPlus } from 'react-icons/fa';
import TrackList from './TrackList';

const Library = () => {
  const { userPlaylists, likedTracks, navigate, playTrack } = useMusicContext();
  const [activeTab, setActiveTab] = useState('playlists');
  const [searchLibrary, setSearchLibrary] = useState('');
  const tabs = [{ id: 'playlists', label: 'Playlists' }, { id: 'liked', label: 'Titres likés' }, { id: 'artists', label: 'Artistes suivis' }];
  const likedTracksList = TRACKS.filter(t => likedTracks.includes(t.id));
  const followedArtists = ARTISTS.slice(0, 4);
  const filteredPlaylists = userPlaylists.filter(p => p.name.toLowerCase().includes(searchLibrary.toLowerCase()));

  return (
    <div style={{ padding: '32px', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'white' }}>Ma Bibliothèque</h1>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '24px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Inter', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}>
          <FaPlus /> Créer une playlist
        </button>
      </div>
      <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', borderRadius: '16px', padding: '4px', marginBottom: '24px', width: 'fit-content', border: '1px solid var(--border-color)' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 24px', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? 'linear-gradient(135deg, #7c3aed, #ec4899)' : 'transparent', color: activeTab === tab.id ? 'white' : 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', transition: 'all 0.2s' }}>{tab.label}</button>
        ))}
      </div>
      <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
        <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }} />
        <input type="text" placeholder="Rechercher dans la bibliothèque..." value={searchLibrary} onChange={e => setSearchLibrary(e.target.value)} className="search-input" style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: '12px', fontSize: '14px', fontFamily: 'Inter' }} />
      </div>

      {activeTab === 'playlists' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filteredPlaylists.map(playlist => (
            <div key={playlist.id} onClick={() => navigate('playlist', playlist)} style={{ background: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border-color)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ position: 'relative' }}>
                <img src={playlist.image} alt={playlist.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8))' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${playlist.color}, transparent)` }} />
              </div>
              <div style={{ padding: '14px' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{playlist.name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{playlist.owner} • {playlist.tracks.length} titres</p>
                {playlist.followers && <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{playlist.followers} abonnés</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'liked' && (
        likedTracksList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <FaHeart style={{ fontSize: '60px', color: 'var(--text-muted)', marginBottom: '16px' }} />
            <p style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Aucun titre liké</p>
            <p style={{ color: 'var(--text-muted)' }}>Cliquez sur ❤️ sur vos titres préférés</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1))', borderRadius: '16px', marginBottom: '24px', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}>❤️</div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Titres likés</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{likedTracksList.length} titres</p>
              </div>
              <button onClick={() => playTrack(likedTracksList[0], likedTracksList)} style={{ marginLeft: 'auto', width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', boxShadow: '0 8px 24px rgba(124,58,237,0.5)' }}><FaPlay /></button>
            </div>
            <TrackList tracks={likedTracksList} />
          </>
        )
      )}

      {activeTab === 'artists' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
          {followedArtists.map(artist => (
            <div key={artist.id} onClick={() => navigate('artist', artist)} style={{ textAlign: 'center', cursor: 'pointer', padding: '24px 16px', borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.transform = 'none'; }}>
              <img src={artist.image} alt={artist.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', boxShadow: `0 8px 24px ${artist.color}40`, border: `3px solid ${artist.color}60` }} />
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{artist.name}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{artist.genre}</p>
              <p style={{ fontSize: '11px', color: artist.color, marginTop: '6px' }}>{artist.followers} abonnés</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { TRACKS, PLAYLISTS } from '../data/mockData';

const MusicContext = createContext();

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusicContext must be used within MusicProvider');
  return context;
};

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none');
  const [likedTracks, setLikedTracks] = useState(TRACKS.filter(t => t.liked).map(t => t.id));
  const [userPlaylists, setUserPlaylists] = useState(PLAYLISTS);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [viewData, setViewData] = useState(null);

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => handleNext();
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [queue, currentIndex, repeatMode]);

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const playTrack = useCallback((track, trackList = null) => {
    if (trackList) {
      setQueue(trackList);
      const idx = trackList.findIndex(t => t.id === track.id);
      setCurrentIndex(idx >= 0 ? idx : 0);
    } else {
      if (!queue.find(t => t.id === track.id)) {
        setQueue(prev => [...prev, track]);
        setCurrentIndex(queue.length);
      }
    }
    setCurrentTrack(track);
    audioRef.current.src = track.audioUrl;
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, [queue]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const handleNext = useCallback(() => {
    if (repeatMode === 'one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') nextIndex = 0;
        else { setIsPlaying(false); return; }
      }
    }
    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      setCurrentIndex(nextIndex);
      setCurrentTrack(nextTrack);
      audioRef.current.src = nextTrack.audioUrl;
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, queue, isShuffled, repeatMode]);

  const handlePrev = useCallback(() => {
    if (audioRef.current.currentTime > 3) { audioRef.current.currentTime = 0; return; }
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = repeatMode === 'all' ? queue.length - 1 : 0;
    const prevTrack = queue[prevIndex];
    if (prevTrack) {
      setCurrentIndex(prevIndex);
      setCurrentTrack(prevTrack);
      audioRef.current.src = prevTrack.audioUrl;
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, queue, repeatMode]);

  const seekTo = useCallback((percentage) => {
    const time = (percentage / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(percentage);
  }, []);

  const toggleLike = useCallback((trackId) => {
    setLikedTracks(prev => prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]);
  }, []);

  const toggleShuffle = useCallback(() => setIsShuffled(prev => !prev), []);
  const cycleRepeat = useCallback(() => {
    setRepeatMode(prev => prev === 'none' ? 'all' : prev === 'all' ? 'one' : 'none');
  }, []);

  const navigate = useCallback((view, data = null) => {
    setCurrentView(view);
    setViewData(data);
  }, []);

  const value = {
    currentTrack, isPlaying, progress, duration, volume, isMuted,
    isShuffled, repeatMode, likedTracks, userPlaylists, isLoading,
    currentView, viewData, queue,
    playTrack, togglePlay, handleNext, handlePrev, seekTo,
    setVolume, setIsMuted, toggleLike, toggleShuffle, cycleRepeat,
    navigate, setUserPlaylists, audioRef,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

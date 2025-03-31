import { useState, useEffect, useRef } from "react";
import { Song } from "@/data/songs";

export function useAudioPlayer(songs: Song[]) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.75);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;
    
    // Set up event listeners
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => handleSongEnd();
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    // Load the first song
    loadSong(currentSongIndex);
    
    // Clean up event listeners
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);
  
  // Handle song changes
  useEffect(() => {
    if (audioRef.current) {
      loadSong(currentSongIndex);
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Playback failed:', err));
      }
    }
  }, [currentSongIndex]);

  // Handle play/pause changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Playback failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const loadSong = (index: number) => {
    if (audioRef.current && songs[index]) {
      audioRef.current.src = songs[index].file;
      audioRef.current.load();
      setCurrentTime(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playSong = (index?: number) => {
    if (index !== undefined && index !== currentSongIndex) {
      setCurrentSongIndex(index);
    }
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const playNext = () => {
    if (isShuffle) {
      // Play a random song excluding current song
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (songs.length > 1 && randomIndex === currentSongIndex);
      setCurrentSongIndex(randomIndex);
    } else {
      // Play next song in sequence
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    }
  };

  const playPrevious = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const seekTo = (value: number) => {
    if (audioRef.current) {
      const newTime = value * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.error('Replay failed:', err));
      }
    } else {
      playNext();
    }
  };

  return {
    currentSongIndex,
    currentSong: songs[currentSongIndex],
    isPlaying,
    currentTime,
    duration,
    volume,
    isRepeat,
    isShuffle,
    songs, // Add songs array to the return object
    togglePlayPause,
    playSong,
    pauseSong,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle
  };
}

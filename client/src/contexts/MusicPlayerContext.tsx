import React, { createContext, ReactNode } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { songs, Song } from "@/data/songs";

type MusicPlayerContextType = ReturnType<typeof useAudioPlayer>;

// Create default context with all required properties
const defaultContext: MusicPlayerContextType = {
  currentSongIndex: 0,
  currentSong: {
    title: "",
    artist: "",
    album: "",
    cover: "",
    file: "",
    duration: "0:00"
  },
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.75,
  isRepeat: false,
  isShuffle: false,
  songs: [],
  togglePlayPause: () => {},
  playSong: () => {},
  pauseSong: () => {},
  playNext: () => {},
  playPrevious: () => {},
  seekTo: () => {},
  setVolume: () => {},
  toggleMute: () => {},
  toggleRepeat: () => {},
  toggleShuffle: () => {}
};

export const MusicPlayerContext = createContext<MusicPlayerContextType>(defaultContext);

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export function MusicPlayerProvider({ children }: MusicPlayerProviderProps) {
  const playerState = useAudioPlayer(songs);
  
  return (
    <MusicPlayerContext.Provider value={playerState}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

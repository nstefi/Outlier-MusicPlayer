import { useContext } from "react";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";
import AlbumCover from "./AlbumCover";
import { songs as fallbackSongs } from "@/data/songs"; // Import songs directly as a fallback

export default function Playlist() {
  const { 
    songs, 
    currentSongIndex, 
    isPlaying, 
    playSong, 
    pauseSong 
  } = useContext(MusicPlayerContext);

  // Use the songs from context if available, otherwise use the imported songs
  const songsToRender = Array.isArray(songs) && songs.length > 0 ? songs : fallbackSongs;

  const handleSongClick = (index: number) => {
    if (index === currentSongIndex && isPlaying) {
      pauseSong();
    } else {
      playSong(index);
    }
  };

  return (
    <div className="space-y-2">
      {songsToRender.map((song, index) => (
        <div 
          key={index}
          className={`group flex items-center p-3 mb-2 rounded-md hover:bg-accent/10 transition-colors cursor-pointer ${
            index === currentSongIndex ? "bg-accent/10" : ""
          }`}
          onClick={() => handleSongClick(index)}
        >
          <AlbumCover 
            coverUrl={song.cover} 
            title={song.title} 
            small
          />
          <div className="flex-grow min-w-0 ml-3">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          </div>
          <div className="text-muted-foreground text-sm ml-2">{song.duration}</div>
        </div>
      ))}
    </div>
  );
}

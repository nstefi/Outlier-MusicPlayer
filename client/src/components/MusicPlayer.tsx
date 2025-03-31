import { useContext } from "react";
import AlbumCover from "./AlbumCover";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import Playlist from "./Playlist";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";

export default function MusicPlayer() {
  const { 
    currentSong,
    currentTime,
    duration
  } = useContext(MusicPlayerContext);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      {/* Main Player Section */}
      <div className="lg:w-2/3 p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8 mt-4">
          {/* Now Playing Title */}
          <h2 className="text-xl font-semibold mb-6">Now Playing</h2>
          
          {/* Current Album Cover */}
          <AlbumCover 
            coverUrl={currentSong?.cover} 
            title={currentSong?.title}
            large
          />

          {/* Song Information */}
          <div className="text-center mb-6 w-full">
            <h3 className="text-xl font-semibold truncate">
              {currentSong?.title || "No song selected"}
            </h3>
            <p className="text-muted-foreground truncate">
              {currentSong?.artist || ""}
            </p>
            <p className="text-muted-foreground text-sm truncate">
              {currentSong?.album || ""}
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar 
            currentTime={currentTime} 
            duration={duration} 
          />

          {/* Playback Controls */}
          <PlayerControls />

          {/* Volume Control */}
          <VolumeControl />
        </div>
      </div>

      {/* Playlist Section */}
      <div className="lg:w-1/3 bg-secondary p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Playlist</h2>
        <Playlist />
      </div>
    </div>
  );
}

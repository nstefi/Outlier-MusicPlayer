import { useContext } from "react";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

export default function PlayerControls() {
  const { 
    isPlaying, 
    togglePlayPause, 
    playNext, 
    playPrevious,
    isRepeat,
    toggleRepeat,
    isShuffle,
    toggleShuffle
  } = useContext(MusicPlayerContext);

  return (
    <div className="flex items-center justify-center space-x-6 mt-6">
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-muted-foreground hover:text-foreground transition-colors ${isShuffle ? 'text-accent' : ''}`}
        onClick={toggleShuffle}
      >
        <Shuffle className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={playPrevious}
      >
        <SkipBack className="h-6 w-6" />
      </Button>
      
      <Button 
        className="bg-white hover:bg-white/90 rounded-full w-12 h-12 flex items-center justify-center" 
        onClick={togglePlayPause}
        size="icon"
      >
        {isPlaying ? (
          <Pause className="text-black h-6 w-6" />
        ) : (
          <Play className="text-black h-6 w-6 ml-1" />
        )}
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={playNext}
      >
        <SkipForward className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`text-muted-foreground hover:text-foreground transition-colors ${isRepeat ? 'text-accent' : ''}`}
        onClick={toggleRepeat}
      >
        <Repeat className="h-5 w-5" />
      </Button>
    </div>
  );
}

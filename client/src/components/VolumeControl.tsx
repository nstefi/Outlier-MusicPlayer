import { useContext } from "react";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";
import { Button } from "@/components/ui/button";
import { 
  Volume2, 
  Volume1, 
  VolumeX 
} from "lucide-react";

export default function VolumeControl() {
  const { volume, setVolume, toggleMute } = useContext(MusicPlayerContext);
  
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className="flex items-center mt-6 space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={toggleMute}
      >
        {getVolumeIcon()}
      </Button>
      
      <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-accent relative transition-all duration-100" 
          style={{ width: `${volume * 100}%` }}
        />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01"
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>
    </div>
  );
}

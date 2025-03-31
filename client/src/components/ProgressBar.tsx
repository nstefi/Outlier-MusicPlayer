import { useContext } from "react";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";
import { formatTime } from "@/utils/formatTime";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

export default function ProgressBar({ currentTime, duration }: ProgressBarProps) {
  const { seekTo } = useContext(MusicPlayerContext);
  
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekPosition = parseFloat(e.target.value);
    seekTo(seekPosition);
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-accent relative transition-all duration-100"
          style={{ width: `${progressPercentage}%` }}
        />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.001"
          value={currentTime / (duration || 1)}
          onChange={handleSeek}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" 
        />
      </div>
    </div>
  );
}

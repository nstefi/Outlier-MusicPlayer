import { useContext } from "react";
import { MusicPlayerContext } from "@/contexts/MusicPlayerContext";
import { Play, Pause } from "lucide-react";

interface AlbumCoverProps {
  coverUrl?: string;
  title?: string;
  large?: boolean;
  small?: boolean;
}

export default function AlbumCover({ coverUrl, title, large, small }: AlbumCoverProps) {
  const { isPlaying, togglePlayPause } = useContext(MusicPlayerContext);
  
  const defaultCover = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
  
  if (small) {
    return (
      <div className="w-10 h-10 mr-0 rounded overflow-hidden flex-shrink-0">
        <img 
          src={coverUrl || defaultCover} 
          alt={`${title || 'Album'} Cover`} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`relative group mb-6 shadow-lg rounded-lg overflow-hidden ${
        large ? "w-64 h-64 md:w-80 md:h-80" : "w-32 h-32"
      }`}
    >
      <img 
        src={coverUrl || defaultCover} 
        alt={`${title || 'Album'} Cover`} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div 
        className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        onClick={togglePlayPause}
      >
        <button className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
          {isPlaying ? (
            <Pause className="text-black h-6 w-6" />
          ) : (
            <Play className="text-black h-6 w-6 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
}

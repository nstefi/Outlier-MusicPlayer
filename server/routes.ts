import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for music player (if needed in the future)
  app.get('/api/songs', (req, res) => {
    res.json({
      songs: [
        {
          title: "Slow Motion",
          artist: "Bensound",
          album: "Royalty Free Music",
          cover: "https://images.unsplash.com/photo-1593697972672-b1c1902219e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
          duration: "3:26"
        },
        {
          title: "Memories",
          artist: "Benjamin Tissot",
          album: "Bensound Collection",
          cover: "https://images.unsplash.com/photo-1513544466683-32c565343f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
          duration: "3:50"
        },
        {
          title: "Acoustic Breeze",
          artist: "Acoustic",
          album: "Unplugged Sessions",
          cover: "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
          duration: "4:05"
        },
        {
          title: "Summer",
          artist: "Chill Corp",
          album: "Summer Vibes",
          cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
          duration: "3:18"
        },
        {
          title: "Happy Rock",
          artist: "Bensound",
          album: "Upbeat Collection",
          cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
          duration: "1:45"
        },
        {
          title: "Jazzy Frenchy",
          artist: "Benjamin Tissot",
          album: "Jazz Collection",
          cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          file: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
          duration: "1:44"
        }
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

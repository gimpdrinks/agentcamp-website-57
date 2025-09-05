
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

type AudioContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: string, volume?: number) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// A simple cache for audio elements
const audioCache: { [key: string]: HTMLAudioElement } = {};

const getAudioElement = (src: string) => {
  if (!audioCache[src]) {
    const audio = new Audio(src);
    // Setting crossorigin is important for loading audio from different domains
    audio.crossOrigin = "anonymous";
    audioCache[src] = audio;
  }
  return audioCache[src];
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false); // Start unmuted by default
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Setup background music from the external Archive.org URL
    // Note: Using the direct download link for the MP3 to ensure it works.
    const audio = getAudioElement('https://archive.org/download/ambient-music_202506/ambient-music.mp3');
    audio.loop = true;
    audio.volume = 0.1; // Keep it subtle
    backgroundMusicRef.current = audio;

    audio.onerror = () => {
      console.error("Error: Could not load background music from the external source.");
    };

    // Auto-play background music when component mounts (since we start unmuted)
    const playBackgroundMusic = async () => {
      try {
        await audio.play();
        console.log("Background music started playing");
      } catch (error) {
        console.log("Autoplay was prevented, user will need to interact first:", error);
        // If autoplay fails, we'll try again when user toggles mute
      }
    };

    playBackgroundMusic();
    
    return () => {
        if (backgroundMusicRef.current) {
            backgroundMusicRef.current.pause();
            // Clean up the audio element from cache if we want to. For now, we keep it.
        }
        backgroundMusicRef.current = null;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
        const newMutedState = !prev;
        if (backgroundMusicRef.current) {
            if (newMutedState) {
                backgroundMusicRef.current.pause();
            } else {
                backgroundMusicRef.current.play().catch(e => console.log("Autoplay was prevented.", e));
            }
        }
        return newMutedState;
    });
  }, []);

  const playSound = useCallback((sound: string, volume = 0.5) => {
    if (!isMuted) {
      try {
        const soundSrc = `/audio/${sound}.mp3`;
        const audioElement = getAudioElement(soundSrc);
        audioElement.volume = volume;
        audioElement.currentTime = 0;
        audioElement.play().catch(e => console.error(`Error playing sound: ${sound}`, e));
      } catch (error) {
        console.error("Failed to play sound", error);
      }
    }
  }, [isMuted]);

  const value = { isMuted, toggleMute, playSound };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

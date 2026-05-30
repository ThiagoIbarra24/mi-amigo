import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src?: string;
  playing: boolean;
}

// This component is ready to play music when a src is provided.
// To add music later: place an mp3 file in /public/music/ and pass src="/music/tu-cancion.mp3"
export default function AudioPlayer({ src, playing }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src || !audioRef.current) return;
    setLoaded(true);
  }, [src]);

  useEffect(() => {
    if (!loaded || !audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playing, loaded]);

  if (!src) return null;

  return (
    <audio
      ref={audioRef}
      src={src}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}

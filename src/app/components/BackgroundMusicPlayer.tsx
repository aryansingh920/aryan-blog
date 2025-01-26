import React, { useEffect, useRef } from "react";

interface Props {
  isPlaying: boolean;
}

const BackgroundMusicPlayer: React.FC<Props> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return <audio ref={audioRef} src="/Interstellar.mp3" loop />;
};

export default BackgroundMusicPlayer;

import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import ReactPlayer from 'react-player';

import { IProgress } from '../../types/player';
import Video from '../Video';
import VideoControllers from '../VideoControllers';
import screenfull from 'screenfull';

type PlayerContainerProps = {
  isFullMode: boolean;
};

const PlayerContainer = styled.div<PlayerContainerProps>`
  background-color: black;

  ${({ isFullMode }) =>
    isFullMode
      ? `
    margin: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    `
      : `
    margin: 50px auto 0;
    max-width: 640px;
    position: relative;

    @media (max-width: 768px) {
      margin: 20px auto 0;
    }
    `}
`;

interface PlayerProps {
  src: string;
  setError: (error: string) => void;
}

const Player: React.FC<PlayerProps> = ({ src, setError }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPip, setIsPip] = useState<boolean>(false);
  const [progress, setProgress] = useState<IProgress>({
    playedSeconds: 0,
    played: 0,
    loadedSeconds: 0,
    loaded: 0,
  });
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullMode, setIsFullMode] = useState<boolean>(false);

  useEffect(() => {
    if (screenfull.isEnabled) {
      (screenfull as typeof screenfull).on('change', () => {
        if (screenfull.isEnabled) {
          (screenfull as typeof screenfull).isFullscreen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto');
          setIsFullMode((screenfull as typeof screenfull).isFullscreen);
        }
      });
    }
  }, []);

  const VideoRef = useRef() as React.RefObject<ReactPlayer> | undefined;

  return (
    <PlayerContainer isFullMode={isFullMode}>
      <Video
        refVideo={VideoRef}
        src={src}
        setError={setError}
        isPip={isPip}
        volume={volume}
        isMuted={isMuted}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setDuration={setDuration}
        setProgress={setProgress}
        setIsPip={setIsPip}
      />

      <VideoControllers
        refVideo={VideoRef}
        duration={duration}
        progress={progress}
        volume={volume}
        isPip={isPip}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isPlaying={isPlaying}
        setPlaying={() => setIsPlaying(!isPlaying)}
        setVolume={setVolume}
        setPip={() => setIsPip(!isPip)}
      />
    </PlayerContainer>
  );
};

export default memo(Player);

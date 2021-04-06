import React, { memo, useRef, useState } from 'react';
import styled from 'styled-components/macro';

import { IProgress } from '../../types/player';
import Video from '../Video';
import VideoControllers from '../VideoControllers';

const PlayerContainer = styled.div`
  margin: 50px auto 0;
  max-width: 640px;
  position: relative;
  background-color: black;

  @media (max-width: 768px) {
    margin: 20px auto 0;
  }
`;

interface PlayerProps {
  src: string;
}

const Player: React.FC<PlayerProps> = ({ src }) => {
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
  const VideoRef = useRef(null);

  return (
    <PlayerContainer>
      <Video
        reference={VideoRef}
        src={src}
        isPip={isPip}
        volume={volume}
        isPlaying={isPlaying}
        setDuration={setDuration}
        setProgress={setProgress}
      />

      <VideoControllers
        reference={VideoRef}
        duration={duration}
        progress={progress}
        volume={volume}
        isPlaying={isPlaying}
        setPlaying={() => setIsPlaying(!isPlaying)}
        setVolume={setVolume}
        setPip={() => setIsPip(!isPip)}
      />
    </PlayerContainer>
  );
};

export default memo(Player);

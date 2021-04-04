import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';

import { IProgress } from '../../types/player';
import Video from '../Video';
import VideoControllers from '../VideoControllers';

const PlayerContainer = styled.div`
  margin: 50px auto 0;
  max-width: 640px;
  /* max-height: calc(100% - 189px); */
  position: relative;
  background-color: black;
`;

interface PlayerProps {
  src: string;
}

const Player: React.FC<PlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<IProgress>({
    playedSeconds: 0,
    played: 0,
    loadedSeconds: 0,
    loaded: 0,
  });
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  return (
    <PlayerContainer>
      <Video
        src={src}
        volume={volume}
        isPlaying={isPlaying}
        setDuration={setDuration}
        setProgress={setProgress}
      />

      <VideoControllers
        duration={duration}
        progress={progress}
        volume={volume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setVolume={setVolume}
      />
    </PlayerContainer>
  );
};

export default memo(Player);

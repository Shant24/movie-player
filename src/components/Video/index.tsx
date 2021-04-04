import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';

import { IProgress } from '../../types/player';

const VideoContainer = styled.div`
  width: 100%;
  height: calc(100% - 186px);
  max-height: 100%;
`;

interface VideoProps {
  src: string;
  volume: number;
  isPlaying: boolean;
  setDuration: (duration: number) => void;
  setProgress: (process: IProgress) => void;
}

const Video: React.FC<VideoProps> = ({
  src,
  volume,
  isPlaying,
  setDuration,
  setProgress,
}) => {
  return (
    <VideoContainer>
      <ReactPlayer
        width="100%"
        height="100%"
        url={src}
        loop={true}
        // controls={true}s
        volume={volume}
        playing={isPlaying}
        progressInterval={200}
        onDuration={(duration: number) => setDuration(duration)}
        onProgress={(progress: IProgress) => setProgress(progress)}
      />
    </VideoContainer>
  );
};

export default Video;

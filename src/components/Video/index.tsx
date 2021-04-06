import React, { memo, MutableRefObject } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';

import { IProgress } from '../../types/player';

const VideoContainer = styled.div`
  width: 100%;
  height: calc(100% - 186px);
  max-height: 100%;
`;

interface VideoProps {
  reference: MutableRefObject<null>;
  src: string;
  isPip: boolean;
  volume: number;
  isPlaying: boolean;
  setDuration: (duration: number) => void;
  setProgress: (process: IProgress) => void;
}

const Video: React.FC<VideoProps> = ({
  reference,
  src,
  isPip,
  volume,
  isPlaying,
  setDuration,
  setProgress,
}) => {
  return (
    <VideoContainer>
      <ReactPlayer
        ref={reference}
        width="100%"
        height="100%"
        url={src}
        pip={isPip}
        loop={true}
        volume={volume}
        playing={isPlaying}
        progressInterval={500}
        onError={(e) => console.log('onError', e)}
        onDuration={(duration: number) => setDuration(duration)}
        onProgress={(progress: IProgress) => setProgress(progress)}
      />
    </VideoContainer>
  );
};

export default memo(Video);

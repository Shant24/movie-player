import React, { memo } from 'react';
import styled from 'styled-components/macro';
import ReactPlayer from 'react-player';

import { IProgress } from '../../types/player';

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

interface VideoProps {
  refVideo: React.RefObject<ReactPlayer> | undefined;
  src: string;
  isPip: boolean;
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setDuration: (duration: number) => void;
  setProgress: (process: IProgress) => void;
  setError: (error: string) => void;
  setIsPip: (isPip: boolean) => void;
}

const Video: React.FC<VideoProps> = ({
  refVideo,
  src,
  isPip,
  volume,
  isMuted,
  isPlaying,
  setIsPlaying,
  setDuration,
  setProgress,
  // setError,
  setIsPip,
}) => {
  return (
    <VideoContainer>
      <ReactPlayer
        ref={refVideo}
        width="100%"
        height="100%"
        url={src}
        pip={isPip}
        loop={true}
        volume={volume}
        muted={isMuted}
        playing={isPlaying}
        playsinline={false}
        progressInterval={500}
        controls={false}
        onError={(e) => console.log('onError', e)}
        onDuration={(duration: number) => setDuration(duration)}
        onProgress={(progress: IProgress) => setProgress(progress)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onSeek={(e) => console.log('onSeek', e)}
        onEnablePIP={() => setIsPip(true)}
        onDisablePIP={() => setIsPip(false)}
      />
    </VideoContainer>
  );
};

export default memo(Video);

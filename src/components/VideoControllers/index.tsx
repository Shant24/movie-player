import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { IProgress } from '../../types/player';

const VideoControllersContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const PlayPauseButtonsContainer = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  ${VideoControllersContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
`;

const PlayBtnControllerContainer = styled.div`
  margin: 0 0 0 1.5%;
  padding: 4.5px 8px 2px 8px;
  height: max-content;
  font-size: 20px;
  color: white;
  display: inline-block;
  cursor: pointer;

  svg {
    margin: 0 0 0 2px;
  }
`;

type VideoControllersProps = {
  duration: number;
  progress: IProgress;
  volume: number;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
};

const VideoControllers: React.FC<VideoControllersProps> = ({
  duration,
  progress,
  volume,
  isPlaying,
  setIsPlaying,
}) => {
  const handlePlay = () => setIsPlaying(!isPlaying);

  return (
    <VideoControllersContainer onClick={handlePlay}>
      {!isPlaying && (
        <PlayPauseButtonsContainer>
          <FontAwesomeIcon icon={faPlay} />
        </PlayPauseButtonsContainer>
      )}

      <ProgressBarContainer onClick={(e) => e.stopPropagation()}>
        <PlayBtnControllerContainer onClick={handlePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </PlayBtnControllerContainer>
      </ProgressBarContainer>
    </VideoControllersContainer>
  );
};

export default memo(VideoControllers);

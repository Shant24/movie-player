import React, { memo } from 'react';
import styled from 'styled-components/macro';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClone,
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeDown,
  faVolumeMute,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import Progress from '../Progress';
import { IProgress } from '../../types/player';
import { formatTime } from '../../helpers/timeHelper';
import {
  getFullModeValue,
  toggleFullScreen,
} from '../../helpers/fullScreenHelper';

const VideoControllersContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const HoveringStyle = styled.div`
  opacity: 0;
  transition: all 0.4s ease-in-out;

  ${VideoControllersContainer}:hover & {
    opacity: 1;
  }
`;

const PlayPauseButtonsContainer = styled(HoveringStyle)`
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

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 500px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
`;

const ProgressBarContainer = styled(HoveringStyle)`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  color: white;

  @media (max-width: 500px) {
    height: 40px;
  }
`;

const PlayBtnControllerContainer = styled.div`
  margin: 0 0 0 5px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50%;
  transition: all 0.4 ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 500px) {
    min-width: 30px;
    width: 30px;
    height: 30px;
  }

  svg {
    font-size: 20px;

    @media (max-width: 500px) {
      font-size: 15px;
    }
  }
`;

const CurrentTime = styled.div`
  margin: 0 5px;
  user-select: none;
  cursor: default;
  min-width: 62px;
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    margin: 0;
    font-size: 12px;
    min-width: 45px;
  }
`;

const Deadline = styled(CurrentTime)``;

const PipContainer = styled(HoveringStyle)`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transition: all 0.4 ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: 20px;
    color: white;
  }
`;

const VolumeIconsContainer = styled(PlayBtnControllerContainer)``;

const Wrapper = styled.div`
  padding: 0 5px;
`;

const ProgressWrapper = styled(Wrapper)`
  width: 100%;

  @media (max-width: 500px) {
    width: 55%;
  }
`;

const VolumeProgressWrapper = styled(Wrapper)`
  max-width: 200px;
  width: 40%;

  @media (max-width: 500px) {
    width: 45%;
  }
`;

const FullScreenContainer = styled(PlayBtnControllerContainer)`
  margin: 0 5px;
`;

type VideoControllersProps = {
  refVideo: React.RefObject<ReactPlayer> | undefined;
  duration: number;
  progress: IProgress;
  volume: number;
  isPip: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  setPlaying: () => void;
  setVolume: (volume: number) => void;
  setPip: () => void;
  setIsMuted: (isMuted: boolean) => void;
};

const VideoControllers: React.FC<VideoControllersProps> = (props) => {
  const {
    refVideo,
    duration,
    progress,
    volume,
    isPip,
    isMuted,
    isPlaying,
    setPlaying,
    setVolume,
    setPip,
    setIsMuted,
  } = props;

  const onPip = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPip();
  };

  const handleChangeProgress = (changedProgress: number) => {
    refVideo?.current?.seekTo(changedProgress, 'fraction');
  };

  const handlePlayPause = () => {
    setPlaying();
  };

  const handleMute = () => setIsMuted(!isMuted);

  const handleChangeVolume = (progress: number) => setVolume(progress);

  return (
    <VideoControllersContainer
      onClick={handlePlayPause}
      onDoubleClick={toggleFullScreen}
    >
      <PipContainer onClick={onPip}>
        {isPip ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faClone} />
        )}
      </PipContainer>

      {!isPlaying && (
        <PlayPauseButtonsContainer>
          <FontAwesomeIcon icon={faPlay} />
        </PlayPauseButtonsContainer>
      )}

      <ProgressBarContainer onClick={(e) => e.stopPropagation()}>
        <PlayBtnControllerContainer onClick={handlePlayPause}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </PlayBtnControllerContainer>

        <CurrentTime>{formatTime(progress.playedSeconds)}</CurrentTime>

        <ProgressWrapper>
          <Progress
            type="progress"
            duration={duration}
            currentProgress={progress.played}
            loadedProgress={progress.loaded}
            handleChangeVolume={handleChangeProgress}
          />
        </ProgressWrapper>

        <Deadline>{formatTime(duration)}</Deadline>

        <VolumeIconsContainer onClick={handleMute}>
          {volume >= 0.5 && !isMuted && <FontAwesomeIcon icon={faVolumeUp} />}

          {volume < 0.5 && volume > 0 && !isMuted && (
            <FontAwesomeIcon icon={faVolumeDown} />
          )}

          {(volume === 0 || isMuted) && <FontAwesomeIcon icon={faVolumeMute} />}
        </VolumeIconsContainer>

        <VolumeProgressWrapper>
          <Progress
            type="volume"
            currentProgress={volume}
            handleChangeVolume={handleChangeVolume}
          />
        </VolumeProgressWrapper>

        <FullScreenContainer onClick={toggleFullScreen}>
          {getFullModeValue() ? (
            <FontAwesomeIcon icon={faCompressArrowsAlt} />
          ) : (
            <FontAwesomeIcon icon={faExpandArrowsAlt} />
          )}
        </FullScreenContainer>
      </ProgressBarContainer>
    </VideoControllersContainer>
  );
};

export default memo(VideoControllers);

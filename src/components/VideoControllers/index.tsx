import React, { memo, MutableRefObject, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
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
} from '@fortawesome/free-solid-svg-icons';

import { IProgress } from '../../types/player';
import { formatTime } from '../../helpers/timeHelper';
import Progress from '../Progress';

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
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  color: white;
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

  svg {
    font-size: 20px;
  }
`;

const CurrentTime = styled.div`
  margin: 0 5px;
  user-select: none;
  cursor: default;
`;

const Deadline = styled(CurrentTime)``;

const PipContainer = styled.div`
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

    /* svg {
      color: rgba(255, 255, 255, 0.5);
    } */
  }

  svg {
    font-size: 20px;
    color: white;
  }
`;

const VolumeIconsContainer = styled(PlayBtnControllerContainer)``;

const FullScreenContainer = styled(PlayBtnControllerContainer)`
  margin: 0 5px;
`;

type VideoControllersProps = {
  reference: MutableRefObject<null>;
  duration: number;
  progress: IProgress;
  volume: number;
  isPlaying: boolean;
  setPlaying: () => void;
  setVolume: (volume: number) => void;
  setPip: () => void;
};

const VideoControllers: React.FC<VideoControllersProps> = ({
  reference,
  duration,
  progress,
  volume,
  isPlaying,
  setPlaying,
  setVolume,
  setPip,
}) => {
  const [propsVolume, setPropsVolume] = useState<number>(volume);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const onPip = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPip();
  };

  const handleChangeProgress = (changedProgress: number) => {
    if (reference) {
      if (reference.current) {
        // @ts-ignore
        reference?.current?.seekTo(changedProgress, 'fraction');
      }
    }
  };

  useEffect(() => {
    volume && setIsMuted(false);
  }, [volume]);

  const handleMute = () => {
    isMuted ? setVolume(propsVolume) : setVolume(0);
    setIsMuted(!isMuted);
  };

  const handleChangeVolume = (progress: number) => {
    setVolume(progress);
    setPropsVolume(progress);
  };

  return (
    <VideoControllersContainer onClick={setPlaying}>
      <PipContainer onClick={onPip}>
        <FontAwesomeIcon icon={faClone} />
      </PipContainer>

      {!isPlaying && (
        <PlayPauseButtonsContainer>
          <FontAwesomeIcon icon={faPlay} />
        </PlayPauseButtonsContainer>
      )}

      <ProgressBarContainer onClick={(e) => e.stopPropagation()}>
        <PlayBtnControllerContainer onClick={setPlaying}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </PlayBtnControllerContainer>

        <CurrentTime>{formatTime(progress.playedSeconds)}</CurrentTime>

        <Progress
          type="progress"
          duration={duration}
          currentProgress={progress.played}
          loadedProgress={progress.loaded}
          onClick={handleChangeProgress}
        />

        <Deadline>{formatTime(duration)}</Deadline>

        <VolumeIconsContainer onClick={handleMute}>
          {volume >= 0.5 && !isMuted && <FontAwesomeIcon icon={faVolumeUp} />}

          {volume < 0.5 && volume > 0 && !isMuted && (
            <FontAwesomeIcon icon={faVolumeDown} />
          )}

          {(volume === 0 || isMuted) && <FontAwesomeIcon icon={faVolumeMute} />}
        </VolumeIconsContainer>

        <Progress
          type="volume"
          width="40%"
          currentProgress={propsVolume}
          onClick={handleChangeVolume}
        />

        <FullScreenContainer onClick={() => {}}>
          {true ? (
            <FontAwesomeIcon icon={faExpandArrowsAlt} />
          ) : (
            <FontAwesomeIcon icon={faCompressArrowsAlt} />
          )}
        </FullScreenContainer>
      </ProgressBarContainer>
    </VideoControllersContainer>
  );
};

export default memo(VideoControllers);

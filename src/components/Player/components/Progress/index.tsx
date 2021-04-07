import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { isMobile } from 'react-device-detect';

import { COLORS } from '../../../../assets/styles/GlobalStyles';
import { formatTime } from '../../../../helpers/timeHelper';

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  position: relative;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${COLORS.primaryDark};
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

type CurrentProgressProps = { value: number };

const CurrentProgress = styled.div.attrs(({ value }: CurrentProgressProps) => ({
  style: { width: `${value * 100}%` },
}))<CurrentProgressProps>`
  height: 100%;
  position: absolute;
  border-radius: 0 5px 5px 0;
  background-color: ${COLORS.primarySemiDark};
`;

const LoadedProgress = styled(CurrentProgress)`
  background-color: ${COLORS.primary};
`;

type ProgressShowProps = { value: number };

const ProgressShower = styled.div.attrs(({ value }: ProgressShowProps) => ({
  style: { left: `${value * 100}%` },
}))<ProgressShowProps>`
  padding: 6px 10px;
  position: absolute;
  bottom: calc(100% + 10px);
  transform: translateX(-50%);
  border-radius: 10px;
  background-color: ${COLORS.primarySemiDark};
  user-select: none;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: calc(100% - 2px);
    left: 50%;
    width: 18px;
    height: 12px;
    transform: translateX(-50%);
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    background-color: ${COLORS.primarySemiDark};
    user-select: none;
    pointer-events: none;
  }
`;

type ProgressProps = {
  type: 'progress' | 'volume';
  duration?: number;
  currentProgress: number;
  loadedProgress?: number;
  handleChangeProgress: (changedProgress: number) => void;
};

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    type,
    duration,
    currentProgress,
    loadedProgress,
    handleChangeProgress,
  } = props;

  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [hoveredProgress, setHoveredProgress] = useState<number>(0);
  const [isShowHoveredProgress, setIsShowHoveredProgress] = useState<boolean>(
    false,
  );

  const handleClick = (value?: number) => {
    handleChangeProgress(value || hoveredProgress);
  };

  const changeProgress = (
    pageX: number,
    width: number,
    left: number,
    isTouchStart: boolean = false,
  ) => {
    !isShowHoveredProgress && setIsShowHoveredProgress(true);
    let position: number = (pageX - left) / width + 0.0016612317725958285; // 0.0001912317725958285

    if (type === 'volume') {
      if (position <= 0.04) {
        position = 0;
      }
      if (position >= 0.96) {
        position = 1;
      }
    } else {
      if (position <= 0) {
        position = 0;
      }
      if (position >= 1) {
        position = 1;
      }
    }

    setHoveredProgress(position);
    if (isChanging || isTouchStart) {
      handleClick(position);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    changeProgress(e.pageX, width, left);
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>,
    isTouchStart: boolean = false,
  ) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    changeProgress(e.changedTouches[0].pageX, width, left, isTouchStart);
  };

  const handleStartChanging = () => setIsChanging(true);
  const handleStopChanging = () => setIsChanging(false);

  const handleMouseLeave = () => {
    setHoveredProgress(0);
    setIsShowHoveredProgress(false);
    handleStopChanging();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStartChanging();
    handleTouchMove(e, true);
  };

  const handleTouchEnd = () => {
    setIsShowHoveredProgress(false);
    handleStopChanging();
  };

  const eventsInit = () => {
    return isMobile
      ? {
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          onTouchMove: handleTouchMove,
        }
      : {
          onClick: () => handleClick(),
          onMouseDown: handleStartChanging,
          onMouseUp: handleStopChanging,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
        };
  };

  return (
    <ProgressContainer {...eventsInit()}>
      <ProgressWrapper>
        {!!loadedProgress && <LoadedProgress value={loadedProgress} />}

        <CurrentProgress value={hoveredProgress || currentProgress} />
      </ProgressWrapper>

      {isShowHoveredProgress && (
        <ProgressShower value={hoveredProgress}>
          {type === 'progress' && duration
            ? formatTime(duration * hoveredProgress)
            : Math.ceil(hoveredProgress * 100)}
        </ProgressShower>
      )}
    </ProgressContainer>
  );
};

export default memo(Progress);

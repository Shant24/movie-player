import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { COLORS } from '../../assets/styles/GlobalStyles';
import { formatTime } from '../../helpers/timeHelper';

type ProgressContainerProps = {
  value: string;
};

const ProgressContainer = styled.div.attrs(
  ({ value }: ProgressContainerProps) => ({
    style: { width: value },
  }),
)<ProgressContainerProps>`
  margin: 0 5px;
  height: 10px;
  position: relative;
  border-radius: 5px;
  background-color: ${COLORS.primaryDark};
  cursor: pointer;
`;

type CurrentProgressProps = { value: number };

const CurrentProgress = styled.div.attrs(({ value }: CurrentProgressProps) => ({
  style: { width: `${value * 100}%` },
}))<CurrentProgressProps>`
  height: 100%;
  position: absolute;
  border-radius: 5px;
  background-color: ${COLORS.primarySemiDark};
`;

const LoadedProgress = styled(CurrentProgress)`
  background-color: ${COLORS.primary};
`;

type ProgressShowProps = { value: number };

const ProgressShower = styled.div.attrs(({ value }: ProgressShowProps) => ({
  style: { left: `${value * 100}%` },
}))<ProgressShowProps>`
  padding: 10px;
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
    top: 100%;
    left: 50%;
    width: 15px;
    height: 10px;
    transform: translateX(-50%);
    clip-path: polygon(100% 0, 0 0, 50% 100%);
    background-color: ${COLORS.primarySemiDark};
  }
`;

type ProgressProps = {
  type: 'progress' | 'volume';
  width?: string;
  duration?: number;
  currentProgress: number;
  loadedProgress?: number;
  onClick: (changedProgress: number) => void;
};

const Progress: React.FC<ProgressProps> = ({
  type,
  width = '100%',
  duration,
  currentProgress,
  loadedProgress,
  onClick,
}) => {
  const [hoveredProgress, setHoveredProgress] = useState<number>(0);
  const [isShowHoveredProgress, setIsShowHoveredProgress] = useState<boolean>(
    false,
  );

  const handleClick = () => onClick(hoveredProgress);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    !isShowHoveredProgress && setIsShowHoveredProgress(true);
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x: number = e.clientX - left;

    let position: number = x / width + 0.0016612317725958285; // 0.0001912317725958285

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
  };

  const handleMouseLeave = () => {
    setHoveredProgress(0);
    setIsShowHoveredProgress(false);
  };

  return (
    <ProgressContainer
      value={width}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleClick}
    >
      {loadedProgress && <LoadedProgress value={loadedProgress} />}

      <CurrentProgress value={hoveredProgress || currentProgress} />

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

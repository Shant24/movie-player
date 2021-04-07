import screenfull from 'screenfull';

export const getFullModeValue = (): boolean => {
  if (screenfull.isEnabled) {
    return (screenfull as typeof screenfull).isFullscreen;
  }
  return false;
};

export const enableFullMode = () => {
  if (screenfull.isEnabled) {
    (screenfull as typeof screenfull).request();
  }
};

export const disableFullMode = () => {
  if (screenfull.isEnabled) {
    (screenfull as typeof screenfull).exit();
  }
};

export const toggleFullScreen = () => {
  if (screenfull.isEnabled) {
    (screenfull as typeof screenfull).toggle();
  }
};

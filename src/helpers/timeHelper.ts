const sz = (time: number) => `0${time}`.slice(-2);

export const formatTime = (seconds: number): string => {
  const date = new Date(seconds * 1000);

  const hh = Math.floor(date.getUTCHours());
  const mm = Math.floor(date.getUTCMinutes());
  const ss = sz(Math.floor(date.getUTCSeconds()));

  return hh !== 0 ? `${hh}:${sz(mm)}:${ss}` : `${mm}:${ss}`;
};

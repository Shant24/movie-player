const floor = (time: number) => `0${Math.floor(time)}`.slice(-2);

export const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000);

  const hh = floor(date.getUTCHours());
  const mm = floor(date.getUTCMinutes());
  const ss = floor(date.getUTCSeconds());

  return hh !== '00' ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
};

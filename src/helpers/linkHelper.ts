import { IQuality } from '../types/player';

const mp4UrlRegExp = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?(.mp4)$/;
const lastSashRegExp = /[^/]+$/;
const youTubeUrlRegExp = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

export const checkLink = (link: string) => {
  return link.match(mp4UrlRegExp) || link.match(youTubeUrlRegExp);
};

export const getQuality = (link: string) => {
  const indexOfLastSlash = link.search(lastSashRegExp);
  return Number(link.slice(indexOfLastSlash, link.length - 4));
};

export const changeLink = (link: string, quality: IQuality | null) => {
  if (!quality) return link;
  const indexOfLastSlash = link.search(lastSashRegExp);
  const linkWithoutQuality = link.slice(0, indexOfLastSlash);
  return `${linkWithoutQuality}${quality.value}.mp4`;
};

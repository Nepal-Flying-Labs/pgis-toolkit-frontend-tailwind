// https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
export default function secondsToHMS(seconds) {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  const hDisplay =
    h > 0 ? h + (h === 1 ? ' hr' : ' hrs') + (m > 0 || s > 0 ? ', ' : '') : '';
  const mDisplay =
    m > 0 ? m + (m === 1 ? ' min' : ' mins') + (s > 0 ? ', ' : '') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';
  return hDisplay + mDisplay + sDisplay;
}

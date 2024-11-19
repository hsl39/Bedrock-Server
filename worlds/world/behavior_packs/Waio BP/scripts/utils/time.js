export function time(tick) {
  const min = Math.floor(tick / 1200);
  const sec = Math.floor(tick / 20) - min * 60;
  return `${min}:${sec.toString().length === 1 ? `0${sec}` : sec}`;
}

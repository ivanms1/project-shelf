export default function kFormatter(num: number) {
  if (!num) return 0;
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed() + 'k'
    : Math.sign(num) * Math.abs(num);
}

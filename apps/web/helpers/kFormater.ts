export default function kFormatter(num: number) {
  return Math.abs(num) > 999
    ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed() + 'k'
    : Math.sign(num) * Math.abs(num);
}

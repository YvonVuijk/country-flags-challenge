export function formatNumber(num: Number | undefined | null) {
  if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}


function formatShort(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return '0';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(0);
}

window.formatShort = formatShort;

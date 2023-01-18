export default function meterToKM(meter) {
  if (meter < 1000) return `${meter} m`;
  const km = meter / 1000;
  return `${km.toFixed(1)} km`;
}

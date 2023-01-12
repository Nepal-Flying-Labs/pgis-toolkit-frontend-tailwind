export default function hasKey(obj, key) {
  return Object.keys(obj).some(item => item === key);
}

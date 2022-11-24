export default function capitalizeFirstLetter(word) {
  return word
    .split('_')
    .map(str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(' ');
}

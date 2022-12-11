export default function removeObjectKeys(data, keyArr) {
  return Object.keys(data).reduce(
    (obj, key) =>
      keyArr.includes(key) ? { ...obj } : { ...obj, [key]: data[key] },
    {},
  );
}

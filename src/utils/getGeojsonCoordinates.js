export default function getGeojsonCoordinates(geojson) {
  const {
    coordinates: [lat, lng],
  } = geojson.geometry || geojson;
  const latitude = lat.toFixed(5);
  const longitude = lng.toFixed(5);
  return `${latitude}, ${longitude}`;
}

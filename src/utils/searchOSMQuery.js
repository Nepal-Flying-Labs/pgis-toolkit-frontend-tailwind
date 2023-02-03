export default async function searchOSMQuery(params) {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${searchParams}`,
  );
  const json = await res.json();
  return json;
}

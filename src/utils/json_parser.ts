export const parseGeoJson = (raw_geojson: any) => {
  if (!raw_geojson) {
    return [];
  }
  const array = raw_geojson.features.map((feature: any) => ({
    id: feature.properties.id, //kolejno podczytujemy atrybuty
    name: feature.properties.name,
    address: feature.properties.address,
    category: feature.properties.category,
    tags: feature.properties.tags,
    discounts: feature.properties.discounts,
    coordinates: feature.geometry.coordinates,
  }));

  return array;
};

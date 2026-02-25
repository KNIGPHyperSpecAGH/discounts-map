// eslint-disable-next-line
export const parseGeoJson = (raw_geojson: any) => {
  if (!raw_geojson) {
    return [];
  }
  // eslint-disable-next-line
  const array = raw_geojson.features.map((feature: any) => ({
    id: feature.properties.id, //kolejno podczytujemy atrybuty
    name: feature.properties.name,
    address: feature.properties.address,
    url: feature.properties.url,
    category: feature.properties.category,
    conditions_raw: feature.properties.conditions_raw,
    tags: feature.properties.tags,
    discounts: feature.properties.discounts,
    coordinates: feature.geometry.coordinates,
  }));

  return array;
};

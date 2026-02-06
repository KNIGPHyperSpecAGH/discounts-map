import { useEffect, useState } from "react";
import MapView from "../features/map/MapView";
import "../index.css";
import { parseGeoJson } from "../utils/json_parser";

export default function MapPage() {
  const GEOJSON_PATH = "/discounts.json";
  const [discountsArray, setDiscount] = useState([]);
  useEffect(() => {
    fetch(GEOJSON_PATH)
      .then((response) => response.json())
      .then((geoJson) => {
        const discounts = parseGeoJson(geoJson);
        setDiscount(discounts);
      });
  }, []);

  return (
    <div className="h-screen w-screen">
      <MapView />
    </div>
  );
}

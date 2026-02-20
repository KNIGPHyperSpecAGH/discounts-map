import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { parseGeoJson } from "@/utils/json_parser";
import { useMapLibreMap } from "./hooks/useMapLibreMap";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const GEOJSON_PATH = "/discounts.json";
const MAP_CENTER: [number, number] = [19.94, 50.06];
const MAP_ZOOM = 12;

type DiscountPoint = {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
};

export default function MapView() {
  const { mapContainerRef, mapRef } = useMapLibreMap({
    style: MAP_STYLE,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
  });
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [discountsArray, setDiscount] = useState<DiscountPoint[]>([]);

  useEffect(() => {
    fetch(GEOJSON_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch discounts data: ${response.status}`);
        }

        return response.json();
      })
      .then((geoJson) => {
        const discounts = parseGeoJson(geoJson) as DiscountPoint[];
        setDiscount(discounts);
      })
      .catch((error) => {
        console.error(error);
        setDiscount([]);
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    discountsArray.forEach((discount) => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<strong>${discount.name}</strong><br />${discount.address}`,
      );

      const marker = new maplibregl.Marker({ color: "#c57b57" })
        .setLngLat(discount.coordinates)
        .setPopup(popup)
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  }, [discountsArray]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eee",
      }}
    />
  );
}

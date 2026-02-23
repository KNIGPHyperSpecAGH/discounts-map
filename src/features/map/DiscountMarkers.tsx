import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

type DiscountPoint = {
  id: number;
  name: string;
  coordinates: [number, number];
};

type DiscountMarkersProps = {
  map: maplibregl.Map | null;
  discounts: DiscountPoint[];
  onSelect: (id: number) => void;
};

export default function DiscountMarkers({
  map,
  discounts,
  onSelect,
}: DiscountMarkersProps) {
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    discounts.forEach((discount) => {
      const marker = new maplibregl.Marker()
        .setLngLat(discount.coordinates)
        .addTo(map);

      const markerElement = marker.getElement();
      markerElement.title = discount.name;
      markerElement.setAttribute("aria-label", `Pokaż szczegóły: ${discount.name}`);
      markerElement.addEventListener("click", () => {
        onSelect(discount.id);
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [map, discounts, onSelect]);

  return null;
}

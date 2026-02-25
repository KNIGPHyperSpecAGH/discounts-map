import { useEffect } from "react";
import maplibregl from "maplibre-gl";

interface DiscountMarkersProps {
  map: maplibregl.Map | null;
  discounts: Array<{
    coordinates: [number, number];
  }>;
  onMarkerClick: () => void;
}

export default function DiscountMarkers({
  map,
  discounts,
  onMarkerClick,
}: DiscountMarkersProps) {
  useEffect(() => {
    if (!map) {
      return;
    }

    const markerInstances: maplibregl.Marker[] = [];
    const markerListeners: Array<{
      element: HTMLElement;
      handler: () => void;
    }> = [];

    discounts.forEach((discount) => {
      const marker = new maplibregl.Marker()
        .setLngLat(discount.coordinates)
        .addTo(map);

      const markerElement = marker.getElement();
      const handleClick = () => onMarkerClick();
      markerElement.addEventListener("click", handleClick);
      markerListeners.push({ element: markerElement, handler: handleClick });

      markerInstances.push(marker);
    });

    return () => {
      markerListeners.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      markerInstances.forEach((marker) => marker.remove());
    };
  }, [map, discounts, onMarkerClick]);

  return null;
}

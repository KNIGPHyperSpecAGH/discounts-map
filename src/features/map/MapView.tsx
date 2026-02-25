import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { parseGeoJson } from "../../utils/json_parser";

interface MapViewProps {
  onMarkerClick: (data: any) => void;
}

export default function MapView({ onMarkerClick }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [discountsArray, setDiscountsArray] = useState<any[]>([]);
  const extraMarkersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/assets/discounts.json");
      const data = await response.json();
      const parsedData = parseGeoJson(data);
      setDiscountsArray(parsedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [19.94, 50.06],
      zoom: 12,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const markerListeners: Array<{
      element: HTMLElement;
      handler: () => void;
    }> = [];

    extraMarkersRef.current.forEach((marker) => marker.remove());
    extraMarkersRef.current = discountsArray.map((discount) => {
      const marker = new maplibregl.Marker()
        .setLngLat(discount.coordinates)
        .addTo(mapRef.current!);

      const markerElement = marker.getElement();
      const handleClick = () => onMarkerClick(discount);
      markerElement.addEventListener("click", handleClick);
      markerListeners.push({ element: markerElement, handler: handleClick });

      return marker;
    });

    return () => {
      markerListeners.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      extraMarkersRef.current.forEach((marker) => marker.remove());
      extraMarkersRef.current = [];
    };
  }, [discountsArray, onMarkerClick]);

  return <div ref={mapContainerRef} className="w-full h-full bg-gray-200" />;
}

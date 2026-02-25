import { useCallback, useEffect, useRef, useState } from "react";
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

  const handleMarkerClick = useCallback(() => {
    onMarkerClick({
      // TODO (Integracja z parserem):
      // Zeby zintegrować to z reszta aplikacji
      // A to tylko do testowania dane mozna usunac po tescie
      id: 47,
      nazwa: "Pizzeria Filutek :PPPP",
      wartosc: "-20% na dużą pizzę",
    });
  }, [onMarkerClick]);

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

    const marker = new maplibregl.Marker()
      .setLngLat([19.94, 50.06])
      .addTo(mapRef.current);

    const markerElement = marker.getElement();
    markerElement.addEventListener("click", handleMarkerClick);

    return () => {
      markerElement.removeEventListener("click", handleMarkerClick);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [handleMarkerClick]);

  useEffect(() => {
    if (!mapRef.current) return;

    extraMarkersRef.current.forEach((marker) => marker.remove());
    extraMarkersRef.current = discountsArray.map((discount) => {
      const marker = new maplibregl.Marker()
        .setLngLat(discount.coordinates)
        .addTo(mapRef.current!);

      marker.getElement().addEventListener("click", handleMarkerClick);

      return marker;
    });

    return () => {
      extraMarkersRef.current.forEach((marker) => marker.remove());
      extraMarkersRef.current = [];
    };
  }, [discountsArray, handleMarkerClick]);

  return <div ref={mapContainerRef} className="w-full h-full bg-gray-200" />;
}

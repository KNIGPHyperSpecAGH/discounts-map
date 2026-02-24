import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

interface MapViewProps {
  onMarkerClick: (data: any) => void;
}

export default function MapView({ onMarkerClick }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

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

    const handleMarkerClick = () => {
      // TODO (Integracja z parserem):
      // Zeby zintegrować to z reszta aplikacji
      // A to tylko do testowania dane mozna usunac po tescie
      onMarkerClick({
        id: 47,
        nazwa: "Pizzeria Filutek :PPPP",
        wartosc: "-20% na dużą pizzę",
      });
    };

    const markerElement = marker.getElement();
    markerElement.addEventListener("click", handleMarkerClick);

    return () => {
      markerElement.removeEventListener("click", handleMarkerClick);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [onMarkerClick]);

  return <div ref={mapContainerRef} className="w-full h-full bg-gray-200" />;
}

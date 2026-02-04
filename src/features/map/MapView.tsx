import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [19.94, 50.06],
      zoom: 12,
    });
    
    const marker = new maplibregl.Marker()
        .setLngLat([19.94, 50.06])
        .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eee", // debug
      }}
    />
  );
}

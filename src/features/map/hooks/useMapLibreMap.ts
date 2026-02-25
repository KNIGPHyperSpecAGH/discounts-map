import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

type UseMapLibreMapParams = {
  style: string;
  center: [number, number];
  zoom: number;
};

export const useMapLibreMap = ({
  style,
  center,
  zoom,
}: UseMapLibreMapParams) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style,
      center,
      zoom,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [style, center, zoom]);

  return { mapContainerRef, mapRef };
};

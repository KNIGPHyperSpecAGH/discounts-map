import { useEffect, useRef, useState } from "react";
import maplibregl, { type LngLatLike } from "maplibre-gl";
import { parseGeoJson } from "../../utils/json_parser";
import { type ActiveDiscount } from "./SideBar";
import { useMapLibreMap } from "./hooks/useMapLibreMap";
import DiscountMarkers from "./DiscountMarkers";

type DiscountDetails = NonNullable<ActiveDiscount>;
type DiscountMapItem = DiscountDetails & {
  coordinates: [number, number];
};

interface MapViewProps {
  onMarkerClick: (data: DiscountDetails) => void;
}

const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const MAP_CENTER: [number, number] = [19.94, 50.06];
const MAP_ZOOM = 12;

export default function MapView({ onMarkerClick }: MapViewProps) {
  const { mapContainerRef, mapRef } = useMapLibreMap({
    style: MAP_STYLE,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
  });
  const [discountsArray, setDiscountsArray] = useState<DiscountMapItem[]>([]);
  const extraMarkersRef = useRef<maplibregl.Marker[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/assets/discounts.json");
      const data = await response.json();
      const parsedData = parseGeoJson(data) as DiscountMapItem[];
      setDiscountsArray(parsedData);
    };

    fetchData();
  }, []);

  return (
    <div ref={mapContainerRef} className="w-full h-full bg-gray-200">
      {
        <DiscountMarkers
          map={mapRef.current}
          discounts={discountsArray}
          onMarkerClick={onMarkerClick}
        />
      }
    </div>
  );
}

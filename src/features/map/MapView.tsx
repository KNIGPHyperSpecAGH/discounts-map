import { useEffect, useRef, useState } from "react";
import maplibregl, { type LngLatLike } from "maplibre-gl";
import { parseGeoJson } from "../../utils/json_parser";
import { type ActiveDiscount } from "./SideBar";
import { useMapLibreMap } from "./hooks/useMapLibreMap";
import DiscountMarkers from "./DiscountMarkers";
import { type Category } from "./CategoryFilter";

type DiscountDetails = NonNullable<ActiveDiscount>;
type DiscountMapItem = DiscountDetails & {
  coordinates: [number, number];
};

interface MapViewProps {
  activeCategory: Category | "Wszystkie";
  onMarkerClick: (data: DiscountDetails) => void;
  onMapClick: () => void;
}

const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const MAP_CENTER: [number, number] = [19.94, 50.06];
const MAP_ZOOM = 12;

export default function MapView({
  activeCategory,
  onMarkerClick,
  onMapClick,
}: MapViewProps) {
  const { mapContainerRef, mapRef } = useMapLibreMap({
    style: MAP_STYLE,
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
  });
  const [discountsArray, setDiscountsArray] = useState<DiscountMapItem[]>([]);
  const extraMarkersRef = useRef<maplibregl.Marker[]>([]);
  const onMarkerClickRef = useRef(onMarkerClick);

  const onMapClickRef = useRef(onMapClick);
  useEffect(() => {
    onMapClickRef.current = onMapClick;
  }, [onMapClick]);

  useEffect(() => {
    onMarkerClickRef.current = onMarkerClick;
  }, [onMarkerClick]);

  // --- ZMIANA: Zmiana tablicy zależności z [mapRef] na [mapRef.current] ---
  // Reagujemy na moment, w którym referencja wypełni się załadowaną mapą,
  // a nie na sam stały obiekt referencji.
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const handleMapClick = () => {
      if (onMapClickRef.current) {
        onMapClickRef.current();
      }
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [mapRef.current]);
  // --- KONIEC ZMIANY ---

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/src/assets/discounts.json");
      const data = await response.json();
      const parsedData = parseGeoJson(data) as DiscountMapItem[];
      setDiscountsArray(parsedData);
    };

    fetchData();
  }, []);

  // Filtrowanie wyliczonej tablicy przed przekazaniem do DiscountMarkers
  const filteredDiscounts = discountsArray.filter(
    (discount) =>
      activeCategory === "Wszystkie" || discount.category === activeCategory,
  );

  return (
    <div ref={mapContainerRef} className="w-full h-full bg-gray-200">
      {
        <DiscountMarkers
          map={mapRef.current}
          discounts={filteredDiscounts}
          onMarkerClick={onMarkerClick}
        />
      }
    </div>
  );
}

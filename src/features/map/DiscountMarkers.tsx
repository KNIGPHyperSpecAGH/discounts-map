import { useEffect } from "react";
import maplibregl from "maplibre-gl";

interface DiscountMarkersProps {
  map: maplibregl.Map | null;
  discounts: Array<{
    coordinates: [number, number];
    category: string;
  }>;
  onMarkerClick: (discount: any) => void;
}

const ICON_MAP: Record<string, string> = {
  Gastronomia: 'url("/icons/znacznik_gastronomia.svg")',
  Inne: 'url("/icons/znacznik_inne.svg")',
  Rozrywka: 'url("/icons/znacznik_kultura_sztuka.svg")',
  Sport: 'url("/icons/znacznik_zdrowie_sport.svg")',
  default: 'url("/icons/znacznik_inne.svg")',
};

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
      // --- ZMIANA: Aktualizacja typu handlera, by przyjmował obiekt zdarzenia myszy ---
      handler: (e: MouseEvent) => void;
      // --- KONIEC ZMIANY ---
    }> = [];

    discounts.forEach((discount) => {
      const dom_element = document.createElement("div");
      dom_element.className =
        "w-10 h-10 cursor-pointer bg-contain bg-no-repeat bg-center";
      const icon = ICON_MAP[discount.category] || ICON_MAP.default;
      dom_element.style.backgroundImage = icon;
      console.log(icon);
      const marker = new maplibregl.Marker({
        element: dom_element,
        anchor: "bottom",
      })
        .setLngLat(discount.coordinates)
        .addTo(map);

      const markerElement = marker.getElement();
      
      // --- ZMIANA: Przechwycenie obiektu 'e' i zatrzymanie bąbelkowania przed uderzeniem w mapę ---
      const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        onMarkerClick(discount);
      };
      // --- KONIEC ZMIANY ---
      
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
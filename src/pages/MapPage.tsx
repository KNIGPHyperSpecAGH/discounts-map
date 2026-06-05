import { useCallback, useState } from "react";
import MapView from "../features/map/MapView";
import SideBar, { type ActiveDiscount } from "../features/map/SideBar";
import CategoryFilter, { type Category } from "../features/map/CategoryFilter";

export default function MapPage() {
  const [activeDiscount, setActiveDiscount] = useState<ActiveDiscount>(null);
  const [activeCategory, setActiveCategory] = useState<Category | "Wszystkie">(
    "Wszystkie",
  );

  const handleMarkerClick = useCallback((data: NonNullable<ActiveDiscount>) => {
    setActiveDiscount(data);
  }, []);

  const handleCategoryChange = useCallback(
    (category: Category | "Wszystkie") => {
      setActiveCategory(category);
      setActiveDiscount(null); // Zamknięcie SideBar'a przy zmianie filtru
    },
    [],
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <SideBar
        isOpen={activeDiscount !== null}
        onClose={() => setActiveDiscount(null)}
        activeDiscount={activeDiscount}
      />

      {/* --- ZMIANA: Zamykanie panelu tylko na urządzeniach mobilnych (poniżej 768px) --- */}
      <MapView
        activeCategory={activeCategory}
        onMarkerClick={handleMarkerClick}
        onMapClick={() => {
          if (window.innerWidth < 768) {
            setActiveDiscount(null);
          }
        }}
      />
      {/* --- KONIEC ZMIANY --- */}
    </div>
  );
}

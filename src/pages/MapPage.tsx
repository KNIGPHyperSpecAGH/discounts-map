import { useCallback, useState } from "react";
import MapView from "../features/map/MapView";
import SideBar, { type ActiveDiscount } from "../features/map/SideBar";

export default function MapPage() {
  const [activeDiscount, setActiveDiscount] = useState<ActiveDiscount>(null);
  const handleMarkerClick = useCallback((data: NonNullable<ActiveDiscount>) => {
    setActiveDiscount(data);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SideBar
        isOpen={activeDiscount !== null}
        onClose={() => setActiveDiscount(null)}
        activeDiscount={activeDiscount}
      />

      {/* --- ZMIANA: Zamykanie panelu tylko na urządzeniach mobilnych (poniżej 768px) --- */}
      <MapView 
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
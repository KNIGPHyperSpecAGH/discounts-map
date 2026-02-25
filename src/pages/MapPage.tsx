import { useState } from "react";
import MapView from "../features/map/MapView";
import SideBar from "../features/map/SideBar";

export default function MapPage() {
  const [activeDiscount, setActiveDiscount] = useState<any>(null);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <SideBar
        isOpen={activeDiscount !== null}
        onClose={() => setActiveDiscount(null)}
        activeDiscount={activeDiscount}
      />

      <MapView onMarkerClick={(data) => setActiveDiscount(data)} />
    </div>
  );
}

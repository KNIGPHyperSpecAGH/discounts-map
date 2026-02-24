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
      >
        {activeDiscount && (
          <div>
            {/* TODO: Integracja z reszta aplikacji: 
              Parser JSON do dodania
              Tutaj tylko jakieś testowe dane i testowy wyglad znizki
            */}
            <h2 className="text-2xl text-gray-800">{activeDiscount.nazwa}</h2>
            <p className="mt-2 text-xl text-green-600">
              {activeDiscount.wartosc}
            </p>
          </div>
        )}
      </SideBar>

      <MapView onMarkerClick={(data) => setActiveDiscount(data)} />
    </div>
  );
}

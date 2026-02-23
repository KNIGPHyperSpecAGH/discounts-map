import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { parseGeoJson } from "@/utils/json_parser";
import discountsGeoJson from "@/assets/discounts.json";
import DiscountMarkers from "./DiscountMarkers";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const MAP_CENTER: [number, number] = [19.94, 50.06];

type DiscountValue = {
  label: string;
  value: number;
  type: string;
  conditions: string | null;
};

type DiscountPoint = {
  id: number;
  name: string;
  address: string;
  category: string;
  tags: string[];
  discounts: DiscountValue[];
  coordinates: [number, number];
};

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [discountsArray, setDiscount] = useState<DiscountPoint[]>([]);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  const selectedDiscount = useMemo(
    () => discountsArray.find((discount) => discount.id === selectedDiscountId) ?? null,
    [discountsArray, selectedDiscountId],
  );

  useEffect(() => {
    const discounts = parseGeoJson(discountsGeoJson) as DiscountPoint[];
    setDiscount(discounts);
    if (discounts.length > 0) {
      setSelectedDiscountId(discounts[0].id);
    }
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: MAP_CENTER,
      zoom: 12,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="flex h-full w-full">
      <aside className="w-[320px] max-w-[85vw] border-r border-black/10 bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">Szczegoly punktu</h2>
        {!selectedDiscount && <p className="text-sm text-black/60">Wybierz marker na mapie.</p>}
        {selectedDiscount && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-black/50">Nazwa</p>
              <p className="font-semibold">{selectedDiscount.name}</p>
            </div>
            <div>
              <p className="text-black/50">Adres</p>
              <p>{selectedDiscount.address}</p>
            </div>
            <div>
              <p className="text-black/50">Kategoria</p>
              <p>{selectedDiscount.category}</p>
            </div>
            <div>
              <p className="text-black/50">Tagi</p>
              <p>{selectedDiscount.tags?.join(", ") || "Brak"}</p>
            </div>
            <div>
              <p className="text-black/50">Znizki</p>
              <ul className="list-disc pl-5">
                {selectedDiscount.discounts.map((discount, idx) => (
                  <li key={`${selectedDiscount.id}-${idx}`}>
                    {discount.label}
                    {discount.type === "percent" ? "%" : ""}{" "}
                    {discount.conditions ? `(${discount.conditions})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </aside>
      <div
        ref={mapContainerRef}
        className="h-full flex-1"
        style={{
          backgroundColor: "#eee",
        }}
      >
        <DiscountMarkers
          map={mapRef.current}
          discounts={discountsArray}
          onSelect={setSelectedDiscountId}
        />
      </div>
    </div>
  );
}

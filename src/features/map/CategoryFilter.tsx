import React, { useState } from "react";

export type Category = "Gastronomia" | "Sport" | "Rozrywka" | "Inne";

interface CategoryFilterProps {
  activeCategory: Category | "Wszystkie";
  onCategoryChange: (category: Category | "Wszystkie") => void;
}

const CATEGORIES: {
  id: Category;
  label: string;
  icon: string;
}[] = [
  {
    id: "Gastronomia",
    label: "Gastronomia",
    icon: "/icons/znacznik_gastronomia.svg",
  },
  {
    id: "Sport",
    label: "Sport i zdrowie",
    icon: "/icons/znacznik_zdrowie_sport.svg",
  },
  {
    id: "Rozrywka",
    label: "Kultura i sztuka",
    icon: "/icons/znacznik_kultura_sztuka.svg",
  },
  {
    id: "Inne",
    label: "Inne",
    icon: "/icons/znacznik_inne.svg",
  },
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCatObj = CATEGORIES.find((c) => c.id === activeCategory) || {
    id: "Wszystkie",
    label: "Wszystkie",
    icon: "/icons/znacznik_inne.svg",
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none md:absolute md:bottom-auto md:top-4 md:left-4 md:w-72 md:px-0">
      {/* =========================================
          Wersja Desktopowa (Dropdown)
          ========================================= */}
      <div className="hidden md:block pointer-events-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f0f0f4] rounded-full shadow-inner">
              <img
                src={activeCatObj.icon}
                alt={activeCatObj.label}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Kategoria
              </span>
              <span className="font-bold text-gray-800 text-lg leading-tight">
                {activeCatObj.label}
              </span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`flex-col px-2 pb-2 gap-1.5 transition-all ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onCategoryChange(isActive ? "Wszystkie" : cat.id);
                  setIsOpen(true);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl w-full transition-all
                  ${
                    isActive
                      ? "bg-[#515271] text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                <div
                  className={`p-1.5 rounded-full ${
                    isActive
                      ? "bg-white/20"
                      : "bg-white shadow-sm border border-gray-200"
                  }`}
                >
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="w-7 h-7 object-contain drop-shadow-sm"
                  />
                </div>
                <span className="font-bold text-base">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================
          Wersja Mobilna (Pasek na dole)
          ========================================= */}
      <div className="w-full bg-[#f0f0f4] px-4 py-3 flex justify-between sm:justify-around gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.1)] pointer-events-auto md:hidden">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#f0f0f4] px-4 py-1 rounded-t-xl border-t border-x border-gray-200">
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            Kategorie
          </span>
        </div>

        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? "Wszystkie" : cat.id)}
              title={cat.label}
              className={`flex flex-col items-center justify-center transition-all shrink-0
                ${isActive ? "scale-105" : "opacity-80 hover:opacity-100"}`}
            >
              <div
                className={`p-2 rounded-full border-2 transition-all shadow-sm
                ${
                  isActive
                    ? "bg-white border-[#e06666] scale-110"
                    : "bg-white border-transparent"
                }`}
              >
                <img
                  src={cat.icon}
                  alt={cat.label}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span
                className={`text-[10px] mt-1 font-semibold
                ${isActive ? "text-gray-900 font-bold" : "text-gray-600"}`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

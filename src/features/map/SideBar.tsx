/**
 *  Tutaj wygląd i animacja SideBara dane są przekazywane przez prop children
 */
export type DiscountItem = {
  label: string;
  type: string;
  conditions: string | null;
};

export type ActiveDiscount = {
  id: number;
  name: string;
  address: string;
  category: string;
  discounts: DiscountItem[];
  conditions_raw?: string;
  url?: string;
} | null;

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activeDiscount: ActiveDiscount;
}

const SideBar = ({ isOpen, onClose, activeDiscount }: SideBarProps) => {
  return (
    <aside
      className={`
        absolute z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out
        w-full h-1/2 bottom-0 left-0 rounded-t-2xl border-t border-gray-200
        md:w-80 md:h-full md:bottom-auto md:top-0 md:rounded-none md:border-t-0 md:border-r
        ${
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:-translate-x-full"
        }
      `}
    >
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 md:hidden"></div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Zamknij panel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-6 h-full overflow-y-auto p-6 pb-8">
        {activeDiscount && (
          <div className="flex h-full flex-col gap-4 text-gray-700">
            <h2 className="text-center text-3xl font-bold leading-tight text-[#515271] md:text-4xl">
              {activeDiscount.name}
            </h2>
            <p className="text-center text-2xl text-[#515271] md:text-3xl">
              {activeDiscount.address}
            </p>

            <div className="mt-2 text-xl md:text-2xl">
              Kategoria: {activeDiscount.category}
            </div>

            <div className="text-xl md:text-2xl">
              <p>Zniżki:</p>
              <ul className="list-disc pl-7">
                {(activeDiscount.discounts ?? []).map(
                  (discount: DiscountItem, idx: number) => (
                    <li key={`${activeDiscount.id}-${idx}`}>
                      {discount.label}
                      {discount.type === "percent" ? "%" : ""}
                      {discount.conditions ? ` - ${discount.conditions}` : ""}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {activeDiscount.url && (
              <a
                href={activeDiscount.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 mb-4 rounded-xl bg-[#515271] px-8 py-4 text-center text-xl font-bold text-white md:text-2xl"
              >
                Google Maps
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;

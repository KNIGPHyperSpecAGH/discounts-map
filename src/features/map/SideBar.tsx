const SideBar = ({ isOpen, onClose, children }) => {
  return (
    <aside
      className={`
        absolute z-50 bg-white shadow-2xl transition-transform duration-300 ease-in-out
        w-full h-1/2 bottom-0 left-0 rounded-t-2xl border-t border-gray-200
        md:w-80 md:h-full md:bottom-auto md:top-0 md:rounded-none md:border-t-0 md:border-r
        ${
          /* Logika animacji sterowana stanem: */
          isOpen
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:-translate-x-full"
        }
      `}
    >
      {/* Uchwyt dla urządzeń mobilnych (wskazówka UX) */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 md:hidden"></div>

      {/* Przycisk zamknięcia panelu */}
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

      {/* Kontener na wstrzykniętą treść (Inversion of Control) */}
      <div className="p-6 mt-6 h-full overflow-y-auto">{children}</div>
    </aside>
  );
};

export default SideBar;

# Mapa ze znizkami Krakowskimi
Projekt studencki rozwijany przez KNIGP Hyperspec AGH

## Uruchomienie lokalne

1. Zainstaluj Node.js (zalecane LTS).
2. Zainstaluj zaleznosci:
   ```bash
   npm install
   ```
3. Uruchom serwer developerski:
   ```bash
   npm run dev
   ```
4. Otworz adres podany w terminalu (domyslnie `http://localhost:5173`).

## Co aktualnie dziala

- Render mapy Krakowa w oparciu o MapLibre GL.
- Wczytanie danych znizek z pliku `public/discounts.json`.
- Render markerow na mapie na podstawie sparsowanego JSON.
- Panel boczny z danymi wybranego punktu:
  - nazwa,
  - adres,
  - kategoria,
  - tagi,
  - lista znizek i warunki.
- Klikniecie markera aktualizuje dane w panelu bocznym.

## Najwazniejsze pliki

- `src/features/map/MapView.tsx` - mapa + markery + panel boczny.
- `src/utils/json_parser.ts` - mapowanie GeoJSON na obiekty aplikacji.
- `public/discounts.json` - dane punktow znizek.

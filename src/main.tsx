import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MapPage from './pages/MapPage.tsx'
import "maplibre-gl/dist/maplibre-gl.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapPage />
  </StrictMode>,
)

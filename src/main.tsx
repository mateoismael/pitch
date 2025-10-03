import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CyberpunkPresentation from './CyberpunkPresentation'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CyberpunkPresentation />
  </StrictMode>,
)

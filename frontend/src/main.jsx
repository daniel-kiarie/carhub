import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { FavouritesProvider } from './context/FavouritesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </AuthProvider>
  </StrictMode>
)
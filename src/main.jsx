import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DisplayProvider } from './DisplayProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DisplayProvider>
        <App />
      </DisplayProvider>
    </BrowserRouter>
  </StrictMode>,
)

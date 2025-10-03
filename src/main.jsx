import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Import i18n configuration
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)

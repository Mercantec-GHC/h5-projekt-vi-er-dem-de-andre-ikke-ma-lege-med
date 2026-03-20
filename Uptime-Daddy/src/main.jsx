import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const savedTheme = localStorage.getItem('theme')
const defaultDark = savedTheme ? savedTheme === 'dark' : true
document.documentElement.classList.toggle('dark', defaultDark)
document.body.classList.toggle('dark', defaultDark)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
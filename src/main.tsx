
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render with StrictMode disabled to prevent double mounting of components
// which can cause issues with WebRTC connections
createRoot(document.getElementById("root")!).render(<App />);

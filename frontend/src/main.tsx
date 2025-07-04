import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeDatabase } from './services/db';

// Initialize database and seed data if needed
initializeDatabase().then((success) => {
  if (!success) {
    console.error('Failed to initialize database');
  }
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
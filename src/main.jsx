// src/main.jsx
import { StrictMode } from 'react'; // Importa StrictMode
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Importa anche Bootstrap CSS e React Bootstrap Router DOM se non l'hai già fatto
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom'; // Se usi il router in App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Avvolgi l'App in StrictMode */}
    <BrowserRouter> {/* Se usi il router in App.jsx, avvolgi qui */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);

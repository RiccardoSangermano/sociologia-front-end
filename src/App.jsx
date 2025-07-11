import React, { useState } from 'react'; // Importa useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TheoryList from './component/TheoryList';
import TheoryDetail from './component/TheoryDetails'; // Assicurati che il nome del file sia corretto (es. TheoryDetails.jsx)
import SearchBar from './component/SearchBar'; // <-- Importa SearchBar direttamente qui!

function App() {
  // Stato per il termine di ricerca globale.
  // Questo stato è "sollevato" in App.js per essere condiviso.
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Funzione per aggiornare il termine di ricerca globale.
  // Verrà passata alla SearchBar.
  const handleGlobalSearchChange = (term) => {
    setGlobalSearchTerm(term);
  };

  return (
    <Router>
      <div style={{ padding: '10px', background: '#f0f0f0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <SearchBar onSearchChange={handleGlobalSearchChange} />
      </div>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<TheoryList searchTerm={globalSearchTerm} />} />
          <Route path="/theories/:id" element={<TheoryDetail />} />
          <Route path="*" element={<h2>404 - Pagina Non Trovata</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

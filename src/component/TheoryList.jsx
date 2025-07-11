// src/components/TheoryList.jsx
import React, { useState, useEffect } from 'react';

const TheoryList = () => {
    console.log("TheoryList component is rendering!");
  const [theories, setTheories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funzione per recuperare le teorie dal backend usando Promise
  const fetchTheories = () => {
    setLoading(true); // Inizia il caricamento
    setError(null);   // Resetta eventuali errori precedenti

    fetch('http://localhost:8080/api/theories') // Inizia la richiesta
      .then(response => {
        // Controlla se la risposta è andata a buon fine (status 2xx)
        if (!response.ok) {
          // Se c'è un errore HTTP, lancia un'eccezione
          throw new Error(`Errore HTTP: ${response.status} - ${response.statusText}`);
        }
        return response.json(); // Parsa la risposta JSON e restituisce una nuova Promise
      })
      .then(data => {
        console.log("Risposta completa dall'API (oggetto data):", data);
                console.log("Contenuto delle teorie (data.content):", data.content);
                console.log("Le teorie sono un array?", Array.isArray(data.content));
                console.log("Numero di teorie in data.content:", data.content ? data.content.length : 0);
        setTheories(data.content || data);
        console.log("Stato 'theories' dopo setTheories:", data.content || data); // Aggiorna lo stato con le teorie
      })
      
      .catch(err => {
        // Cattura errori di rete o errori dall'API
        console.error("Errore nel caricamento delle teorie:", err);
        setError("Impossibile caricare le teorie. Riprova più tardi.");
      })
      .finally(() => {
        setLoading(false); // Termina il caricamento, sia in caso di successo che di errore
      });
  };

  // useEffect per chiamare l'API al montaggio del componente
  useEffect(() => {
    fetchTheories();
  }, []); // L'array vuoto fa sì che venga eseguito solo una volta al montaggio

  if (loading) {
    return <p>Caricamento teorie...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Tutte le Teorie Sociologiche</h2>
      {theories.length === 0 ? (
        <p>Nessuna teoria trovata.</p>
      ) : (
        <ul>
          {theories.map(theory => (
            <li key={theory.id}>
              <h3>{theory.nomeTeoria}</h3>
              <p>Autore: {theory.autore}</p>
              <p>{theory.spiegazione.substring(0, 150)}...</p> {/* Mostra un'anteprima */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TheoryList;
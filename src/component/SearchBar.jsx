import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ onSearchChange, suggestions, onSelectSuggestion }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(''); 
  const [showSuggestions, setShowSuggestions] = useState(false); 

  const handleInputChange = (event) => {
    const term = event.target.value;
    setInputValue(term); 
    onSearchChange(term); 
    setShowSuggestions(term.length > 0 && suggestions && suggestions.length > 0); 
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion); 
    onSearchChange(suggestion); 
    onSelectSuggestion(suggestion); 
    setShowSuggestions(false); 
  };

  const handleFocus = () => {
    
    setShowSuggestions(inputValue.length > 0 && suggestions && suggestions.length > 0);
  };

  const handleBlur = () => {
   
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}> 
      <input
        type="text"
        placeholder="Cerca teorie, autori..." 
        value={inputValue} 
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginRight: '10px',
          width: '100%', 
          boxSizing: 'border-box', 
        }}
      />
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%', 
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            listStyle: 'none',
            padding: 0,
            margin: '5px 0 0 0',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000, 
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px 10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

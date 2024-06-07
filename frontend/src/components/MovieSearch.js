import React, { useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';

const MovieSearch = ({ onSearchResults }) => {
  const [title, setTitle] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', title);
    axios.get(`/api/movies/search?title=${title}`)
      .then(response => {
        console.log('Search results:', response.data);
        onSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error searching movies:', error);
      });
  };

  return (
    <div className="container">
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
      
    </div>
  );
};

export default MovieSearch;

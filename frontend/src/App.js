// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'
import MovieList from './components/MovieList';
import Favourites from './components/Favourites';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const featuredMovie = movies.find(movie => movie.title === 'Interstellar');

  useEffect(() => {
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data);
        setSearchResults(response.data); // Initialize searchResults with all movies
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });

    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  const addToFavourites = (movie) => {
    const isDuplicate = favourites.some(fav => fav.id === movie.id);
    if (!isDuplicate) {
      const updatedFavourites = [...favourites, movie];
      setFavourites(updatedFavourites);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
      console.log('Movie is already in favourites.');
    }
  };

  const clearFavourites = () => {
    setFavourites([]);
    localStorage.removeItem('favourites');
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults(movies); // Reset to all movies if search term is empty
    } else {
      axios.get(`/api/movies/search?title=${searchTerm}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error searching movies:', error);
        });
    }
  };

  return (
    <Router>
      <NavBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={
          <div>
            {featuredMovie && (
              <div className="featured-movie" style={{ backgroundImage: `url(${featuredMovie.banner_image})` }}>
                <div className="featured-movie-content">
                  <h2>{featuredMovie.title}</h2>
                  <p>{featuredMovie.description}</p>
                </div>
              </div>
            )}
            <MovieList movies={searchResults} onAddToFavourites={addToFavourites} />
          </div>
        } />
        <Route path="/favorites" element={
          <div>
            <Favourites favourites={favourites} />
            <button onClick={clearFavourites}>Clear Favourites</button>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;

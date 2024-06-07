// src/components/MovieList.js
import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, onAddToFavourites }) => {
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={movie.banner_image} alt={`${movie.title} Banner`} className="movie-banner" />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <button onClick={() => onAddToFavourites(movie)}>Add to Favourites</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieList;

// src/components/Favourites.js
import React from 'react';
import './Favourites.css';

const Favourites = ({ favourites }) => {
  return (
    <div className="favourites">
      <h2>Favourite Movies</h2>
      {favourites.length === 0 ? (
        <p>No favourite movies yet.</p>
      ) : (
        favourites.map(movie => (
          <div key={movie.id} className="favourite-item">
            <img src={movie.banner_image} alt={`${movie.title} Banner`} className="movie-banner" />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;

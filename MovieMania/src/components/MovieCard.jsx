import React from "react";
import "../styles/moviecard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="movie-poster"
      />
      <div className="movie-details">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;

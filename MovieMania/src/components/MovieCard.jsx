import React from "react";
import { useState, useEffect } from "react";
import "../styles/moviecard.css";
import DetailedView from "./DetailedView";

const MovieCard = ({ movie }) => {
  const [goToDetails, setGoToDetails] = useState(false);

  const handleClick = () => {
    setGoToDetails(true);
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };

  return (
    <div className="movie-card">
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="movie-poster"
        onClick={handleClick}
      />
      <div className="movie-details" onClick={handleClick}>
        <h3>{movie.title}</h3>
      </div>
      {/* {goToDetails && (
        <DetailedView movieId={movie.id} onClose={hideDetailedView} />
      )} */}
    </div>
  );
};

export default MovieCard;

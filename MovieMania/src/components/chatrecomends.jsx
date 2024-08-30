import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard";

const ChatRecomends = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [goToDetails, setGoToDetails] = useState(false);

  fetch("http://localhost:5000/chatMovieDetails")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });

  const handleClick = (id) => {
    console.log("Clicked");
    setGoToDetails(true);
    setSelectedMovieId(id);
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };
  return (
    <>
      {movies.map((movie) => {
        return (
          <>
            <div onClick={() => handleClick(movie.id)}>
              <MovieCard
                key={movie.id}
                movie={{
                  title: movie.title,
                  ratings: movie.ratings,
                  posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  id: movie.id,
                }}
              />
            </div>
            ;
          </>
        );
      })}
    </>
  );
};
export default ChatRecomends;

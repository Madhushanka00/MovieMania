import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard";
import DetailedView from "./DetailedView";

const ChatRecomends = () => {
  const [movies, setMovies] = useState([]);
  const [goToDetails, setGoToDetails] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

  fetch("https://dspndkpg-5000.asse.devtunnels.ms/chatMovieDetails")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });

  const handleClick = (details) => {
    console.log("Clicked");
    setGoToDetails(true);
    console.log("Details:", details);
    setSelectedMovieDetails(details);
    // console.log("Selected Movie Details:", selectedMovieDetails);
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };
  return (
    <>
      {movies.map((movie) => {
        return (
          <>
            {console.log("Movie:", movie)}
            <div onClick={() => handleClick(movie)}>
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
      {goToDetails && (
        <DetailedView
          movie={selectedMovieDetails}
          onClose={hideDetailedView}
          type={"none"}
        />
      )}
    </>
  );
};
export default ChatRecomends;

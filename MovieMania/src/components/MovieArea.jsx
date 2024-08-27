import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";

import io from "socket.io-client";

const socket = io("http://localhost:5000");
// dotenv.config();

const MoviesArea = ({ category }) => {
  const [movies, setMovies] = useState([]);
  // console.log("API Key:", process.env.REACT_APP_TMDB_API_KEY);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");

      socket.emit("get_movies");

      socket.on("response", (data) => {
        console.log(data.message);
        // Handle movie data here
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="moviesArea_next">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            title: movie.title,
            ratings: movie.ratings,
            posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
      ))}
    </div>
  );
};

export default MoviesArea;

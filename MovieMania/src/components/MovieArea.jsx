import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";

// dotenv.config();

const MoviesArea = ({ category }) => {
  const [movies, setMovies] = useState([]);
  // console.log("API Key:", process.env.REACT_APP_TMDB_API_KEY);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [category]); // Dependency on category to refetch when it changes
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

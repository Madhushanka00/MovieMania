import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";

const MoviesArea = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=d71c0d1fc2dbb217c92ab366689201ae&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
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

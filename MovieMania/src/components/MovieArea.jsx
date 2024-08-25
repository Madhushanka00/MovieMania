import React from "react";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";

const movies = [
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500//9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500//rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  // Add more movies here
];

const MoviesArea = () => {
  return (
    <div className="moviesArea">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesArea;

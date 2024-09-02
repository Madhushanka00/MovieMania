import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./styles/genres.css";

const Genres = ({ media_type, genre_ID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://dspndkpg-5000.asse.devtunnels.ms/getGenreMovies?media_type=${media_type}&genreId=${genre_ID}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, [media_type, genre_ID]);

  return (
    <div className="movieGenreSugestArea">
      {movies.map((movie) => {
        return (
          <>
            <div>
              <MovieCard
                key={movie.id}
                movie={{
                  title:
                    media_type === "movie" ? movie.title : movie.original_name,
                  ratings: movie.ratings,
                  posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  id: movie.id,
                }}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Genres;

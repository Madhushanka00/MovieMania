import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";
import DetailedView from "./DetailedView";

const MoviesArea = ({ mode }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [goToDetails, setGoToDetails] = useState(false);

  const handleClick = (id) => {
    console.log("Clicked");
    setGoToDetails(true);
    setSelectedMovieId(id);
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };
  // console.log("Mode:", mode);
  // const [Mode, setMode] = useState("");
  // setMode(mode);
  // console.log("API Key:", process.env.REACT_APP_TMDB_API_KEY);
  useEffect(() => {
    if (mode === "popular") {
      fetch(`http://localhost:5000/movies/popular`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
    } else if (mode === "topRated") {
      fetch(`http://localhost:5000/movies/top-rated`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMovies(data.results);
        });
    } else if (mode === "popularTV") {
      fetch(`http://localhost:5000/TV/popular`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMovies(data.results);
        });
    }
  }, []);

  return (
    <>
      <div className="moviesArea_next">
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
        {goToDetails && (
          <DetailedView movieId={selectedMovieId} onClose={hideDetailedView} />
        )}
      </div>
    </>
  );
};

export default MoviesArea;

import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";
import DetailedView from "./DetailedView";

const MoviesArea = ({ mode, tab, type }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [selectedGenras, setSelectedGenres] = useState(null);
  const [goToDetails, setGoToDetails] = useState(false);

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
  // console.log("Mode:", mode);
  // const [Mode, setMode] = useState("");
  // setMode(mode);
  // console.log("API Key:", process.env.REACT_APP_TMDB_API_KEY);
  useEffect(() => {
    if (type === "movie") {
      if (mode === "popular") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms//movies/popular`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setMovies(data.results);
          });
      } else if (mode === "topRated") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms//movies/top-rated`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMovies(data.results);
          });
      } else if (mode === "upcoming") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms/movies/upcoming`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMovies(data.results);
          });
      }
    } else if (type === "tv") {
      if (mode === "popularTV") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms/TV/popular`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMovies(data.results);
          });
      } else if (mode === "topRatedTV") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms/tv/top-rated`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setMovies(data.results);
          });
      }
    }
  }, [tab]);

  return (
    <>
      <div className="moviesArea_next">
        {movies.map((movie) => {
          // console.log("Movie:", movie);
          return (
            <>
              <div onClick={() => handleClick(movie)}>
                <MovieCard
                  key={movie.id}
                  movie={{
                    title: type === "movie" ? movie.title : movie.original_name,
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
            type={type}
          />
        )}
        {console.log("type:", type)}
      </div>
    </>
  );
};

export default MoviesArea;

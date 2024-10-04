import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import dotenv from "dotenv";
import MovieCard from "./MovieCard"; // import your MovieCard component
import "../styles/movieArea.css";
import DetailedView from "./DetailedView";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const MoviesArea = ({ mode, tab, type }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [selectedGenras, setSelectedGenres] = useState(null);
  const [goToDetails, setGoToDetails] = useState(false);

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 800, behavior: "smooth" });
  };

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
      } else if (mode == "trending") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms/getTrending?type=movie`)
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
      } else if (mode == "trending") {
        fetch(`https://dspndkpg-5000.asse.devtunnels.ms/getTrending?type=tv`)
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
      <div className="allWrap">
        <button className="carousel-btn left" onClick={scrollLeft}>
          &#8249;
        </button>
        {movies && movies.length > 0 ? (
          <div className="moviesArea_next" ref={carouselRef}>
            {movies.map((movie) => {
              // console.log("Movie:", movie);
              return (
                <>
                  <div onClick={() => handleClick(movie)}>
                    <MovieCard
                      key={movie.id}
                      movie={{
                        title:
                          type === "movie" ? movie.title : movie.original_name,
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
        ) : (
          <>
            {[...Array(6)].map((_, index) => (
              <div className="box" key={index}>
                <Skeleton
                  className="skeleton_rect"
                  variant="rounded"
                  animation="wave"
                  // width={20v}
                  // height={180}
                  color={"white"}
                />
                <Skeleton
                  className="skeleton_text"
                  variant="text"
                  animation="wave"
                  // width={200}
                  sx={{ fontSize: "1.5rem" }}
                />
              </div>
            ))}
          </>
        )}
        <button className="carousel-btn right" onClick={scrollRight}>
          &#8250;
        </button>
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

import React, { useContext, useState, useEffect } from "react";
import "./styles/mainpage.css";
import MoviesArea from "./components/MovieArea";
import { MovieContext } from "./components/movieContext";
import MovieCard from "./components/MovieCard";
import axios from "axios";

const MainPage = () => {
  const { selectItem, setSelectItem } = useContext(MovieContext);
  const [type, setType] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [movies, setMovies] = useState([]);
  console.log("Selected Item:", selectItem);

  useEffect(() => {
    if (selectItem) {
      if (selectItem.title) {
        setType("movie");
      } else {
        setType("tv");
      }
      setMovieTitle(
        selectItem.title ? selectItem.title : selectItem.original_name
      );
      axios
        .get(
          `https://dspndkpg-5000.asse.devtunnels.ms/similar?type=${selectItem.media_type}&id=${selectItem.id}`
        )
        .then((response) => {
          // console.log(response.data); // Access the data in the response
          setMovies(response.data.results);
          console.log("similar,", response.data);
        })
        .catch((error) => {
          console.error("Error fetching similar details:", error);
        });
    }
  }, [selectItem]);

  return (
    <div className="HomeMain">
      <div className="titlebox">
        <div className="mainTitle">Welcome to MovieMania</div>
        <h2>
          Explore, Discover, and Craft Your Perfect Movie Universe with
          MovieMania!
        </h2>
      </div>
      <div className="Searchresults">
        <div className="devider">
          <div className="subtitle1">Search Result</div>
          <div className="subtitle2">Similar Movies</div>
        </div>

        <div className="searcharea">
          <div className="searchedMovie">
            {selectItem && (
              <MovieCard
                key={selectItem.id}
                movie={{
                  title: selectItem.title
                    ? selectItem.title
                    : selectItem.original_name,
                  ratings: selectItem.ratings,
                  posterUrl: `https://image.tmdb.org/t/p/w500${selectItem.poster_path}`,
                  id: selectItem.id,
                }}
              />
            )}
          </div>
          <div className="moviesArea_next">
            {console.log("Movies:", movies)}
            {console.log("Type:", type)}
            {/* {movies && */}
            {movies.map((movie) => {
              return (
                <div key={movie.id}>
                  <MovieCard
                    key={movie.id}
                    movie={{
                      title: movie.title ? movie.title : movie.original_name,
                      ratings: movie.ratings,
                      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      id: movie.id,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="subtitle">Movies You might like</div>
        <div className="moveara">
          <MoviesArea mode="topRated" tab={"Home"} type="movie" />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
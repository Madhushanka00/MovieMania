import React from "react";
import { useState, useEffect, useContext } from "react";
import "../styles/searchpop.css";
import MovieContext from "./movieContext";

const SearchPopup = ({ searchResults, openPopup, setOpenPopup }) => {
  const [movies, setMovies] = useState([]);
  //   const [selectItem, setSelectItem] = useState(null);
  //   const [isFound, setIsFound] = useState(true);

  const { setSelectItem, selectItem } = useContext(MovieContext);

  const handleClick = (movie) => {
    return () => {
      setSelectItem(movie);
      setOpenPopup(false);
      console.log("Selected Movie:", movie);
    };
  };
  useEffect(() => {
    console.log("Search Results:", searchResults);
    if (searchResults.length != 0) {
      if (searchResults && searchResults.results.length > 0) {
        setMovies(searchResults.results);
      }
    }
  }, [searchResults]);

  return (
    <div className="searchpopup">
      {searchResults.length > 0 ? (
        <p>
          no results found
          {console.log("No results found")}
        </p>
      ) : (
        movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="searchcard"
              onClick={handleClick(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="search-poster"
              />
              <div className="search-details">
                <h3>{movie.title ? movie.title : movie.original_name}</h3>
                <h6>{movie.release_date ? movie.release_date : "TV"}</h6>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default SearchPopup;

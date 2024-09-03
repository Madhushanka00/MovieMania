import React from "react";
import { useState, useEffect } from "react";
import "../styles/searchpop.css";
const SearchPopup = ({ searchResults, openPopup }) => {
  const [movies, setMovies] = useState([]);
  //   const [isFound, setIsFound] = useState(true);
  useEffect(() => {
    if (searchResults.results.length > 0) {
      setMovies(searchResults.results);
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
            <div key={movie.id} className="searchcard">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="search-poster"
              />
              <div className="search-details">
                <h3>{movie.title}</h3>
                <h6>{movie.release_date}</h6>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default SearchPopup;

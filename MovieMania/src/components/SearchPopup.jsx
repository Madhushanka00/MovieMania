import React from "react";
import { useState, useEffect, useContext } from "react";
import "../styles/searchpop.css";
import MovieContext from "./movieContext";
import axios from "axios";

const SearchPopup = ({ searchResults, openPopup, setOpenPopup }) => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState(null);
  // const { currentUserId, setCurrentUserId } = useContext(MovieContext);
  //   const [selectItem, setSelectItem] = useState(null);
  //   const [isFound, setIsFound] = useState(true);

  const {
    setSelectItem,
    selectItem,
    clickedItem,
    SetClickedItem,
    similarMovies,
    setSimilarMovies,
    currentUserId,
    setCurrentUserId,
  } = useContext(MovieContext);

  const searchForSimilar = (movie) => {
    console.log("Searching for similar movies", movie.title);
    axios
      .get(
        `https://dspndkpg-5000.asse.devtunnels.ms/sililarNew?type=${movie.media_type}&id=${movie.id}&movie=${movie.title}`
      )
      .then((response) => {
        // console.log(response.data); // Access the data in the response
        // setMovies(response.data.results);
        console.log("found the data similar,", response.data);
        setSimilarMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching similar details:", error);
      });
  };

  const handleClick = (movie) => {
    return () => {
      setSelectItem(movie);
      SetClickedItem(movie);

      setOpenPopup(false);
      console.log("Selected Movie:", movie);
      searchForSimilar(movie);
      if (movie) {
        let title = movie.title ? movie.title : movie.original_name;
        const endpoint = "https://dspndkpg-3000.asse.devtunnels.ms/addHistory"; // Ensure the endpoint matches
        const payload = {
          userId: currentUserId, // Replace with actual user ID
          movieId: movie.id, // Replace with actual movie ID
          movieTitle: title, // Replace with actual movie title
          media_type: movie.media_type,
        };

        axios
          .post(endpoint, payload)
          .then((response) => {
            console.log("Movie history updated successfully:");
          })
          .catch((error) => {
            console.error("Error updating movie history:", error);
          });
      }
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

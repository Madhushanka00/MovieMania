import React from "react";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import "../styles/watchlist.css";
import { MovieContext } from "./movieContext";
import axios from "axios";
import Switch from "@mui/material/Switch";

const Watchlist = ({ setWatchlistRender, watchlistRender }) => {
  const watchRef = useRef(null);
  const { currentUserId } = useContext(MovieContext);
  const [watchlist, setWatchlist] = useState([]);
  const [isVisible, setIsVisible] = useState(watchlistRender);
  const [checked, setChecked] = React.useState(true);
  const [watchedStatus, setWatchedStatus] = useState({});
  const [toDelete, setToDelete] = useState([]);
  const toDeleteRef = useRef(toDelete);

  useEffect(() => {
    toDeleteRef.current = toDelete;
  }, [toDelete]);

  const handleChange = (movieId) => {
    // print("MovieId: ", movieId);
    // console.log("WatchedStatus: ", watchedStatus);
    setWatchedStatus((prevStatus) => ({
      ...prevStatus,
      [movieId]: !prevStatus[movieId],
      // Toggle the watched status for the clicked movie
    }));
    setToDelete((prevSetToDelete) => {
      if (prevSetToDelete.includes(movieId)) {
        // Remove the movieId from the array if it exists
        return prevSetToDelete.filter((id) => id !== movieId);
      } else {
        // Add the movieId to the array if it doesn't exist
        return [...prevSetToDelete, movieId];
      }
    });
  };

  const deleteSelected = (listitems) => {
    axios.post("https://dspndkpg-3000.asse.devtunnels.ms/removeFromWatchlist", {
      userId: currentUserId,
      movieIds: listitems,
    });
    //

    console.log(listitems);
  };

  const handleClickOutside = (event) => {
    if (watchRef.current && !watchRef.current.contains(event.target)) {
      setIsVisible(false); // Close the profile when clicked

      setTimeout(() => setWatchlistRender(false), 500);

      deleteSelected(toDeleteRef.current);
      // setRatingRender(false); // Close the profile when clicked outside
      // console.log("Clicked Outside");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/getWatchlist?userId=${currentUserId}`
      )
      .then((res) => {
        setWatchlist(res.data.watchlist);
        const initialStatus = {};
        res.data.watchlist.forEach((movie) => {
          initialStatus[movie.movieId] = false; // Assuming each movie has a unique 'movieId'
        });
        setWatchedStatus(initialStatus);
      });
  }, []);

  return (
    <div
      className={`watchlistWindow ${
        isVisible ? "slide-inrate" : "slide-outrate"
      }`}
      ref={watchRef}
    >
      <h1>My WatchList</h1>
      <div className="watchlist">
        {watchlist
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((watch, index) => (
            <div className="watch" key={index}>
              <h3>{index + 1}.</h3>
              <div className="title">{watch.movieTitle}</div>
              <div className="watchDetails">
                <Switch
                  checked={watchedStatus[watch.movieId] || false}
                  onChange={() => handleChange(watch.movieId)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div
                  className={`${
                    watchedStatus[watch.movieId] || false
                      ? "watched"
                      : "notWatched"
                  }`}
                >
                  watched
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Watchlist;

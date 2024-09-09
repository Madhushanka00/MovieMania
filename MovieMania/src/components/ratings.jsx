import React from "react";
import "../styles/ratings.css";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { MovieContext } from "./movieContext";
import StarIcon from "@mui/icons-material/Star";
// import { set } from "mongoose";

const Ratings = ({ setRatingRender, ratingRender }) => {
  const rateRef = useRef(null);
  const { currentUserId } = useContext(MovieContext);
  const [ratings, setRatings] = useState([]);
  const [isVisible, setIsVisible] = useState(ratingRender);

  useEffect(() => {
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/getRatings?userId=${currentUserId}`
      )
      .then((res) => {
        console.log(res.data);
        setRatings(res.data.ratings);
      });
  }, []);

  const handleClickOutside = (event) => {
    if (rateRef.current && !rateRef.current.contains(event.target)) {
      setIsVisible(false); // Close the profile when clicked
      setTimeout(() => setRatingRender(false), 500);
      //   setRatingRender(false); // Close the profile when clicked outside
      //   console.log("Clicked Outside");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`ratingsWindow ${
        isVisible ? "slide-inrate" : "slide-outrate"
      }`}
      ref={rateRef}
    >
      <h1>My Ratings</h1>
      <div className="ratings">
        {ratings
          .sort((a, b) => b.rating - a.rating)
          .map((rating, index) => (
            <div className="rating" key={index}>
              <h3>{index + 1}.</h3>
              <div className="title">{rating.movieTitle}</div>
              <div className="starsratings">
                <StarIcon className="star" />
                {rating.rating}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ratings;

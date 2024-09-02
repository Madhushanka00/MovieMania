import react from "react";
import { useState, useEffect } from "react";
import "../styles/DetailedView.css";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { Rate } from "antd";
import { yellow } from "@mui/material/colors";

const DetailedView = ({ movieId, onClose, type }) => {
  const [movie, setMovie] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [rating, setRating] = useState(0);
  // console.log("Movie ID:", movieId);
  // const movieId = 533535;
  const handleRateChange = (value) => {
    console.log("Rating:", value);
    setRating(value);
  };

  useEffect(() => {
    fetch(
      `https://dspndkpg-5000.asse.devtunnels.ms/getDetails?movieId=${movieId}&type=${type}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  const handleClose = () => {
    setIsVisible(false); // Hide DetailedView when CloseIcon is clicked
  };

  if (!isVisible) {
    return null; // Render nothing if DetailedView is not visible
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="glass">
        {movie ? (
          <div className="Construction">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="movie-backdrop"
            />
            <div className="DetailsSection_">
              <CloseIcon className="close" onClick={onClose} />
              <div className="titleSection_">
                {type === "movie" ? (
                  <h3>{movie.title}</h3>
                ) : (
                  <h3>{movie.original_name}</h3>
                )}

                <div className="releaseDate">
                  <h6>{movie.tagline}</h6>
                  <h6 className="date">{movie.release_date}</h6>
                </div>
              </div>
              <div className="wrapAround">
                <div className="ratingSection">
                  <StarIcon className="star" />
                  {"  "}
                  {movie.vote_average}
                </div>
                <div className="genras">
                  {movie.genres && movie.genres.length > 0 ? (
                    movie.genres.map((genre, index) => (
                      <span key={genre.id} className="genre">
                        {genre.name}
                        {index < movie.genres.length - 1 && " | "}
                      </span>
                    ))
                  ) : (
                    <span>No genres available</span>
                  )}
                </div>
              </div>
              <div className="Overview">
                <h3 className="ttle">Overview</h3>
                <p>{movie.overview}</p>
              </div>
              <div className="myRatings">
                How much I like {"  "}
                <Rate
                  allowHalf
                  className="stars"
                  style={{ colorPrimary: yellow[500] }}
                  onChange={handleRateChange}
                  value={rating}
                />
              </div>
              {/* Render other movie details here */}
            </div>
          </div>
        ) : (
          <p className="loadingScreen">Loading...</p>
        )}
      </div>
    </>
  );
};
export default DetailedView;

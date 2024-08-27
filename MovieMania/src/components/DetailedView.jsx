import react from "react";
import { useState, useEffect } from "react";
import "../styles/DetailedView.css";

const DetailedView = () => {
  const [movie, setMovie] = useState("");
  const movieId = 533535;

  useEffect(() => {
    fetch(`http://localhost:5000/getDetails?movieId=${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  return (
    <div className="glass">
      {movie ? (
        <div className="Construction">
          <img
            // src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="movie-backdrop"
          />
          <div className="DetailsDection">
            <div className="titleSection">{movie.title}</div>

            <p>{movie.overview}</p>
            {/* Render other movie details here */}
          </div>
        </div>
      ) : (
        <p className="loadingScreen">Loading...</p>
      )}
    </div>
  );
};
export default DetailedView;

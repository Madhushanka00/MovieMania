import react from "react";
import { useState, useEffect, useContext, useRef } from "react";
import "../styles/DetailedView.css";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { MovieContext } from "./movieContext";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const DetailedView = ({ movie, onClose, type }) => {
  console.log("Movie:", movie);
  const detailsRef = useRef(null);
  const { currentUserId } = useContext(MovieContext);
  const [torrents, setTorrents] = useState([]);
  const [selectUrl, setSelectUrl] = useState("");
  const [initialRating, setInitialRating] = useState(0);
  const [added, setAdded] = useState(false);
  const genreDetails = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
  ];
  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      onClose();
    }
  };

  const addToWatchlist = () => {
    let title = movie.title ? movie.title : movie.original_name;
    let mediaType = movie.media_type; // Assuming `media_type` is part of the `movie` object
    let userId = currentUserId; // Replace with the actual user ID logic
    let movieId = movie.id; // Assuming `movie.id` is the movie ID

    // Construct the data object that matches the backend endpoint's expected structure
    const data = {
      userId: userId,
      movieId: movieId,
      movieTitle: title,
      media_type: mediaType,
    };

    axios
      .post("https://dspndkpg-3000.asse.devtunnels.ms/addToWatchlist", data)
      .then((res) => {
        console.log("Added to watchlist:", res.data);
        setAdded(true);
      })
      .catch((err) => {
        console.error("Error adding to watchlist:", err);
      });
  };

  useEffect(() => {
    if (selectUrl) {
      console.log("Downloading torrent link:", selectUrl);
      // Create an anchor element
      const link = document.createElement("a");
      link.href = selectUrl;

      // Set the download attribute (optional, you can specify a filename here if needed)
      link.setAttribute("download", "");

      // Append the link to the body (necessary for some browsers)
      document.body.appendChild(link);

      // Programmatically trigger the click event on the link to download the file
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    }
  }, [selectUrl]);

  const searchForTorrent = () => {
    // console.log("Searching for torrent");
    let title = movie.title ? movie.title : movie.original_name;
    let Id = movie.id;
    console.log("Searching for torrent", title);
    axios
      .get(`http://localhost:5000/getTorrentLinks?id=${Id}`)
      .then((res) => {
        console.log("Torrent links:", res.data);
        setTorrents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching torrent links:", err);
      });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const [movie, setMovie] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [rating, setRating] = useState(0);
  // console.log("Movie ID:", movieId);
  // const movieId = 533535;
  const handleRateChange = (event, value) => {
    console.log("Rating:", value);
    setRating(value);
    let title = movie.title ? movie.title : movie.original_name;
    let media_type = movie.title ? "movie" : "tv";
    const endpoint = "https://dspndkpg-3000.asse.devtunnels.ms/addratings"; // Ensure the endpoint matches
    const payload = {
      userId: currentUserId, // Replace with actual user ID
      movieId: movie.id, // Replace with actual movie ID
      movieTitle: title, // Replace with actual movie title
      media_type: media_type,
      rating: value,
    };
    axios
      .post(endpoint, payload)
      .then((response) => {
        console.log("Movie ratings updated successfully:");
      })
      .catch((error) => {
        console.error("Error updating movie ratings:", error);
      });
  };
  console.log("Current User ID:", currentUserId);
  console.log("Movie ID:", movie.id);

  useEffect(() => {
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/getRating?userId=${currentUserId}&movieId=${movie.id}`
      )
      .then((response) => {
        console.log("rating details here :", response.data.rating.rating);
        setRating(response.data.rating.rating);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
    console.log("watchlist");
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/checkWatchList?userId=${currentUserId}&movieId=${movie.id}`
      )
      .then((response) => {
        console.log("watchlist details here :", response.request.status);
        if (response.request.status === 200) {
          setAdded(true);
        } else {
          setAdded(false);
        }
        // if(response.data);
      });
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Hide DetailedView when CloseIcon is clicked
  };

  if (!isVisible) {
    return null; // Render nothing if DetailedView is not visible
  }

  return (
    <>
      <div className="overlay"></div>
      <div ref={detailsRef} className="glass">
        {movie ? (
          <div className="Construction">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="movie-backdrop"
            />
            <div className="DetailsSection_">
              <CloseIcon className="close" onClick={onClose} />
              <div className="WholeSection">
                <div className="titleSection_">
                  <h3>{movie.title ? movie.title : movie.original_name}</h3>

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
                    {console.log("genre_ids", movie.genre_ids)}
                    {movie.genre_ids && movie.genre_ids.length > 0
                      ? movie.genre_ids.map((genre, index) => {
                          const genrename = genreDetails.find(
                            (g) => g.id === genre
                          );
                          return (
                            <span key={genrename.id} className="genre">
                              {genrename.name}
                              {index < movie.genre_ids.length - 1 && " | "}
                            </span>
                          );
                        })
                      : // {console.log("genres", movie.genres)}
                        movie.genres.map((genre, index) => {
                          return (
                            <span key={genre.id} className="genre">
                              {genre.name}
                              {index < movie.genres.length - 1 && " | "}
                            </span>
                          );
                        })}
                  </div>
                </div>
                <div className="Overview">
                  <h3 className="ttle">Overview</h3>
                  <p>{movie.overview}</p>
                </div>
              </div>
              {/* <button className="watchlist">Watch Trailer</button> */}
              <button
                className={`${added ? "Watchlistadded" : "watchlist"}`}
                onClick={addToWatchlist}
              >
                {added ? "Remove From Watchlist" : "Add to Watchlist"}
              </button>
              <button className="Download" onClick={searchForTorrent}>
                Download Torrent
              </button>
              {torrents && torrents.length > 0 ? (
                <>
                  <h3 className="titletorents">Available Torrents</h3>
                  <div className="Torrents">
                    {torrents.map((torrent, index) => {
                      return (
                        <div
                          className="torrents"
                          key={index}
                          href={torrent.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setSelectUrl(torrent.url)}
                        >
                          <div className="type">{torrent.type}</div>
                          <div className="quality">{torrent.quality}</div>
                          <div className="size">{torrent.size}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="myRatings">
                <div className="txt">How much I like {"  "}</div>
                {/* <Rate
                  allowHalf
                  className="stars"
                  style={{ colorPrimary: yellow[500] }}
                  onChange={handleRateChange}
                  value={rating}
                /> */}
                <Stack spacing={1}>
                  {console.log("rating", rating)}
                  <Rating
                    className="stars"
                    name="half-rating"
                    // Bind the rating value from the state
                    // value={rating} // Bind the rating value from the state
                    precision={0.5}
                    onChange={handleRateChange} // Handles rating changes
                    value={rating}
                  />
                </Stack>
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

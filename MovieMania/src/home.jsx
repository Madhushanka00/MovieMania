import React, { act, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/nav_bar";
import LeftBar from "./components/leftBar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import MoviesArea from "./components/MovieArea";
import DetailedView from "./components/DetailedView";
import MainPage from "./mainpage";
import Asistant from "./components/Asistant";
import logo from "../public/movimanialogoTransp.png";
import Genres from "./genres";
import MovieContext from "./components/movieContext";
import Ratings from "./components/ratings";
import History from "./components/history";
import Watchlist from "./components/watchlist";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
// import
import "./styles/home.css";
import { set } from "date-fns";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [activeType, setActiveType] = useState("");
  const [activeGenreName, setActiveGenreName] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [movietype, setMovieType] = useState("");
  const [tab, setTab] = useState("Home");
  const [selectItem, setSelectItem] = useState(null);
  const [clickedItem, SetClickedItem] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [ratingRender, setRatingRender] = useState(false);
  const [historyRender, setHistoryRender] = useState(false);
  const [watchlistRender, setWatchlistRender] = useState(false);
  const [draver, setDraver] = useState(false);
  const popularRef = useRef(null);
  const upcomingRef = useRef(null);
  const topRatedRef = useRef(null);

  useEffect(() => {
    setMovieType("movie");
    setActiveType("movie");
    fetch(`https://dspndkpg-5000.asse.devtunnels.ms/genres?media_type=movie`)
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
        // console.log(data.genres);
      });
    setActiveGenreName("Action");
    setActiveGenre(28);
  }, []);

  const scrollLeft = () => {
    popularRef.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    popularRef.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // Access the userId from state

  const gotoRatings = () => {
    setRatingRender(true);
    setHistoryRender(false);
    setWatchlistRender(false);
  };

  const gotoHistory = () => {
    setHistoryRender(true);
    setRatingRender(false);
    setWatchlistRender(false);
  };
  const gotoWatchlist = () => {
    setWatchlistRender(true);
    setRatingRender(false);
    setHistoryRender(false);
  };
  const toggleDrawer = () => {
    setDraver(!draver);
    console.log(draver);
  };

  useEffect(() => {
    if (userId) {
      console.log("User ID:", userId);
      setCurrentUserId(userId);
      // Perform any operations with userId here
    }
  }, [userId]);

  useEffect(() => {
    console.log("Selected Item:", selectItem);
  }, [selectItem]);

  useEffect(() => {
    console.log("Movie Type:", movietype);
    fetch(
      `https://dspndkpg-5000.asse.devtunnels.ms/genres?media_type=${movietype}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
        // console.log(data.genres);
      });
  }, [movietype]);

  const handleClick = (type) => {
    // console.log(type);
    setMovieType(type);
    setActiveType(type);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const selectGenre = (id, name) => {
    // console.log(genre);
    setActiveGenre(id);
    setActiveGenreName(name);
  };

  const changeTab = (tab) => {
    setTab(tab);
  };

  const renderContent = () => {
    if (tab == "Movies") {
      return (
        <div className="mainWrapper">
          <h1>Most Popular</h1>

          <div className="moviesArea" ref={popularRef}>
            {/* <button className="carousel-btn left" onClick={scrollLeft}>
              &#8249;
            </button> */}
            <MoviesArea
              mode="popular"
              tab={tab}
              type="movie"
              className="moviesArea_next"
            />
            {/* <button className="carousel-btn right" onClick={scrollRight}>
              &#8250;
            </button> */}
          </div>

          <h1>Upcoming Movies</h1>
          <div className="moviesArea">
            <MoviesArea mode="upcoming" tab={tab} type="movie" />
          </div>
          <h1>Trending Today</h1>
          <div className="moviesArea">
            <MoviesArea mode="trending" tab={tab} type="movie" />
          </div>
          <h1>Top rated Movies</h1>
          <div className="moviesArea">
            <MoviesArea mode="topRated" tab={tab} type="movie" />
          </div>
        </div>
      );
    } else if (tab == "Series") {
      return (
        <div className="mainWrapper">
          <h1>Popular TV Series</h1>
          <div className="moviesArea">
            <MoviesArea mode="popularTV" tab={tab} type="tv" />
          </div>
          <h1>Trending Today</h1>
          <div className="moviesArea">
            <MoviesArea mode="trending" tab={tab} type="tv" />
          </div>
          <h1>Top rated TV series</h1>
          <div className="moviesArea">
            <MoviesArea mode="topRatedTV" tab={tab} type="tv" />
          </div>
        </div>
      );
    } else if (tab == "Genres") {
      return (
        <>
          <div className="typemainSection">
            <div className="typeSelect">
              <div
                className={`typeButton ${
                  movietype === "movie" ? "active" : ""
                }`}
                onClick={() => handleClick("movie")}
              >
                Movies
              </div>
              <div
                className={`typeButton ${movietype === "tv" ? "active" : ""}`}
                onClick={() => handleClick("tv")}
              >
                TV Series
              </div>
            </div>
            <div className="typeSelect">
              {genres.map((genre) => {
                return (
                  <div
                    className={`typeButton ${
                      activeGenreName === genre.name ? "active" : ""
                    }`}
                    key={genre.id}
                    onClick={() => selectGenre(genre.id, genre.name)}
                  >
                    {genre.name}
                  </div>
                );
              })}
            </div>
          </div>
          {activeGenre && activeType ? (
            <div className="genresArea">
              {/* <div className="movieGenreSugestArea"> */}
              <Genres
                className=""
                media_type={activeType}
                genre_ID={activeGenre}
              />
              {/* </div> */}
            </div>
          ) : (
            ""
          )}
        </>
      );
    } else if (tab == "Ask AI") {
      return (
        <>
          <Asistant />
        </>
      );
    } else {
      return (
        <>
          <MainPage />
        </>
      );
    }
  };

  return (
    <MovieContext.Provider
      value={{
        selectItem,
        setSelectItem,
        clickedItem,
        SetClickedItem,
        similarMovies,
        setSimilarMovies,
        currentUserId,
        setCurrentUserId,
      }}
    >
      <div className="mainlayout">
        <div className="drawer">
          <img src="../public/logo-02.svg" className="mainicon" />
          <StarOutlinedIcon className="Icons" onClick={gotoRatings} />
          <AccessTimeIcon className="Icons" onClick={gotoHistory} />
          <BookmarkAddIcon className="Icons" onClick={gotoWatchlist} />
          <SettingsOutlinedIcon className="Icons" />
          <LogoutOutlinedIcon className="bottomIcon" onClick={handleLogout} />
        </div>
        <NavigateNextRoundedIcon
          className={`expandIcon ${draver ? "rotate" : ""}`}
          onClick={toggleDrawer}
        />
        <div className={`drawermenu ${draver ? "open" : ""}`}>
          <img src="../public/logo-02.svg" className="mainicon" />
          <StarOutlinedIcon className="Icons" onClick={gotoRatings} />
          <AccessTimeIcon className="Icons" onClick={gotoHistory} />
          <BookmarkAddIcon className="Icons" />
          <SettingsOutlinedIcon className="Icons" />
          <LogoutOutlinedIcon className="bottomIcon" onClick={handleLogout} />
        </div>

        {ratingRender ? (
          <Ratings
            setRatingRender={setRatingRender}
            ratingRender={ratingRender}
          />
        ) : (
          ""
        )}
        {historyRender ? (
          <History
            setHistoryRender={setHistoryRender}
            historyRender={historyRender}
          />
        ) : (
          ""
        )}
        {watchlistRender ? (
          <Watchlist
            setWatchlistRender={setWatchlistRender}
            watchlistRender={watchlistRender}
          />
        ) : (
          ""
        )}
        <div className="content">
          <NavBar className="navSection" changeTab={changeTab} />
          <div className="section">
            {/* <h1>Most Popular</h1>
          // <div className="moviesArea">
          //   <MoviesArea mode="popular" />
          // </div>
          // <h1>You might like</h1>
          // <div className="moviesArea">
          //   <MoviesArea mode="topRated" />
          </div> */}
            {renderContent()}
          </div>
        </div>
      </div>
    </MovieContext.Provider>
  );
};
export default Home;

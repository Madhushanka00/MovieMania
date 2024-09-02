import React, { act, useEffect } from "react";
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
import Asistant from "./components/Asistant";
import Genres from "./genres";
// import
import "./styles/home.css";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [activeType, setActiveType] = useState("");
  const [activeGenreName, setActiveGenreName] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [movietype, setMovieType] = useState("");
  const [tab, setTab] = useState("Home");

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

  const selectGenre = (id, name) => {
    // console.log(genre);
    setActiveGenre(id);
    setActiveGenreName(name);
  };

  const changeTab = (tab) => {
    // console.log(tab);
    setTab(tab);
  };

  const renderContent = () => {
    if (tab == "Movies") {
      return (
        <div className="mainWrapper">
          <h1>Most Popular</h1>
          <div className="moviesArea">
            <MoviesArea mode="popular" tab={tab} type="movie" />
          </div>
          <h1>Upcoming Movies</h1>
          <div className="moviesArea">
            <MoviesArea mode="upcoming" tab={tab} type="movie" />
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
      return <h1>Welcome</h1>;
    }
  };

  return (
    <div className="mainlayout">
      <div className="drawer">
        <AcUnitIcon className="mainicon" />
        <StarOutlinedIcon className="Icons" />
        <AccessTimeIcon className="Icons" />
        <HelpOutlineIcon className="Icons" />
        <SettingsOutlinedIcon className="Icons" />
        <LogoutOutlinedIcon className="bottomIcon" />
      </div>
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
  );
};
export default Home;

import React from "react";
import "./styles/mainpage.css";
import MoviesArea from "./components/MovieArea";

const MainPage = () => {
  return (
    <div className="HomeMain">
      <div className="titlebox">
        <div className="mainTitle">Welcome to MovieMania</div>
        <h2>
          Explore, Discover, and Craft Your Perfect Movie Universe with
          MovieMania!
        </h2>
      </div>
      <div className="Searchresults">
        <div className="devider">
          <div className="subtitle1">Search Result</div>
          <div className="subtitle2">Similar Movies</div>
        </div>

        <div className="searcharea">
          <div className="searchedMovie"></div>
          <div className="moveara">
            <MoviesArea mode="popular" tab={"Home"} type="movie" />
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="subtitle">Movies You might like</div>
        <div className="moveara">
          <MoviesArea mode="topRated" tab={"Home"} type="movie" />
        </div>
      </div>
    </div>
  );
};
export default MainPage;

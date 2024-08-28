import React from "react";
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
// import
import "./styles/home.css";

const Home = () => {
  const [tab, setTab] = useState("Movies");

  const changeTab = (tab) => {
    console.log(tab);
    setTab(tab);
  };

  const renderContent = () => {
    switch (tab) {
      case "Movies":
        return (
          <>
            <h1>Most Popular</h1>
            <div className="moviesArea">
              <MoviesArea mode="popular" />
            </div>
            <h1>You might like</h1>
            <div className="moviesArea">
              <MoviesArea mode="topRated" />
            </div>
          </>
        );
      case "Series":
        return (
          <>
            <h1>Popular TV Series</h1>
            <div className="moviesArea">
              <MoviesArea mode="popularTV" />
            </div>
          </>
        );
      case "Animation":
        return <h1>Animation</h1>;

      case "Genres":
        return <h1>Genres</h1>;
      case "Ask AI":
        return <h1>Ask AI</h1>;
      default:
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
          <div className="moviesArea">
            <MoviesArea mode="popular" />
          </div>
          <h1>You might like</h1>
          <div className="moviesArea">
            <MoviesArea mode="topRated" />
          </div> */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default Home;

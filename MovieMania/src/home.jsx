import React from "react";
import NavBar from "./components/nav_bar";
import LeftBar from "./components/leftBar";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import MoviesArea from "./components/MovieArea";
// import
import "./styles/home.css";

const Home = () => {
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
        <NavBar className="navSection" />
        <div className="section">
          <h1>Most Popular</h1>
          <div className="moviesArea">
            <MoviesArea mode="popular" />
          </div>
          <h1>You might like</h1>
          <div className="moviesArea">
            <MoviesArea mode="topRated" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

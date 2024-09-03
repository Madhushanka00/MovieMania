import React from "react";
import { useState } from "react";
import "../styles/nacBar.css";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import { InputBase } from "@mui/material";

const NavBar = ({ changeTab }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleClick = (content) => {
    // console.log(content);
    setActiveTab(content);
  };

  return (
    <div className="ribbon">
      <div className="left">
        <div
          className={`tabs ${activeTab === "Home" ? "active" : ""}`}
          onClick={() => {
            changeTab("Home");
            handleClick("Home");
          }}
        >
          Home
        </div>
        <div
          className={`tabs ${activeTab === "Movies" ? "active" : ""}`}
          onClick={() => {
            changeTab("Movies");
            handleClick("Movies");
          }}
        >
          Movies
        </div>
        <div
          className={`tabs ${activeTab === "Series" ? "active" : ""}`}
          onClick={() => {
            changeTab("Series");
            handleClick("Series");
          }}
        >
          TV
        </div>
        <div
          className={`tabs ${activeTab === "Genres" ? "active" : ""}`}
          onClick={() => {
            changeTab("Genres");
            handleClick("Genres");
          }}
        >
          Genres
        </div>
        <div
          className={`tabs ${activeTab === "Ask AI" ? "active" : ""}`}
          onClick={() => {
            changeTab("Ask AI");
            handleClick("Ask AI");
          }}
        >
          Ask AI
        </div>
      </div>
      <div className="mid">
        <SearchBar changeTab={changeTab} />
      </div>

      <div className="right">
        <AccountCircleIcon className="apps" />
        <AppsIcon className="apps" />
        <NotificationsIcon className="apps" />
      </div>
    </div>
  );
};
export default NavBar;

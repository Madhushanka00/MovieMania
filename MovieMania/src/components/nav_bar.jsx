import React from "react";
import "../styles/nacBar.css";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import { InputBase } from "@mui/material";

const NavBar = ({ changeTab }) => {
  const handleClick = (content) => {
    console.log(content);
  };

  return (
    <div className="ribbon">
      <div className="left">
        <div
          className="tabs"
          onClick={() => {
            changeTab("Movies");
          }}
        >
          Movies
        </div>
        <div
          className="tabs"
          onClick={() => {
            changeTab("Series");
          }}
        >
          Series
        </div>
        <div
          className="tabs"
          onClick={() => {
            changeTab("Animation");
          }}
        >
          Animation
        </div>
        <div
          className="tabs"
          onClick={() => {
            changeTab("Genres");
          }}
        >
          Genres
        </div>
        <div
          className="tabs"
          onClick={() => {
            changeTab("Ask AI");
          }}
        >
          Ask AI
        </div>
      </div>
      <div className="mid">
        <SearchBar />
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

import React from "react";
import "../styles/nacBar.css";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import { InputBase } from "@mui/material";

const NavBar = () => {
  return (
    <div className="ribbon">
      <div className="left">
        <div className="tabs">Movies</div>
        <div className="tabs">Series</div>
        <div className="tabs">Animation</div>
        <div className="tabs">Genres</div>
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

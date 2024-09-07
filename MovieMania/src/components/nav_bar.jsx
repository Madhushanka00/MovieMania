import React from "react";
import { useState, useEffect, useContext } from "react";
import "../styles/nacBar.css";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import MovieContext from "./movieContext";
import { InputBase } from "@mui/material";
import axios from "axios";
import Profile from "./profile";

const NavBar = ({ changeTab }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const { currentUserId, setCurrentUserId } = useContext(MovieContext);
  const [profile, setProfile] = useState(false);
  const [details, setDetails] = useState({});

  const handleClick = (content) => {
    // console.log(content);
    setActiveTab(content);
  };

  const ShowProfile = () => {
    console.log("Current User ID:", currentUserId);
    axios
      .get(`http://localhost:3000/getUserData?userId=${currentUserId}`)
      .then((res) => {
        const { user } = res.data;
        const { username, email } = user;
        console.log("Username:", username);
        console.log("Email:", email);
        setDetails({ username, email, currentUserId });
      });
    setProfile(true);
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
        <SearchBar changeTab={changeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="right">
        <AccountCircleIcon className="apps" onClick={ShowProfile} />
        <AppsIcon className="apps" />
        <NotificationsIcon className="apps" />
      </div>
      {profile && (
        <Profile details={details} setProfile={setProfile} profile={profile} />
      )}
    </div>
  );
};
export default NavBar;

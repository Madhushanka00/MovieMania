import React, { act } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const NavBar = ({ changeTab }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const { currentUserId, setCurrentUserId } = useContext(MovieContext);
  const [profile, setProfile] = useState(false);
  const [details, setDetails] = useState({});
  const [menuOpen, setMenuOpen] = useState(false); // State for handling the menu

  const handleClick = (content) => {
    // console.log(content);
    setActiveTab(content);
  };

  const ShowProfile = () => {
    console.log("Current User ID:", currentUserId);
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/getUserData?userId=${currentUserId}`
      )
      .then((res) => {
        const { user } = res.data;
        const { username, email } = user;
        console.log("Username:", username);
        console.log("Email:", email);
        setDetails({ username, email, currentUserId });
      });
    setProfile(true);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {/* Hamburger icon for mobile */}
      <MenuIcon className="hamburger" onClick={toggleMenu} />
      <div className={`menu ${menuOpen ? "open" : ""}`}>
        <div
          className={`tabs ${activeTab === "Home" ? "active" : ""}`}
          onClick={() => {
            changeTab("Home");
            handleClick("Home");
            setMenuOpen(false); // Close the menu after selecting
          }}
        >
          Home
        </div>
        <div
          className={`tabs ${activeTab === "Movies" ? "active" : ""}`}
          onClick={() => {
            changeTab("Movies");
            handleClick("Movies");
            setMenuOpen(false); // Close the menu after selecting
          }}
        >
          Movies
        </div>
        <div
          className={`tabs ${activeTab === "Series" ? "active" : ""}`}
          onClick={() => {
            changeTab("Series");
            handleClick("Series");
            setMenuOpen(false); // Close the menu after selecting
          }}
        >
          TV
        </div>
        <div
          className={`tabs ${activeTab === "Genres" ? "active" : ""}`}
          onClick={() => {
            changeTab("Genres");
            handleClick("Genres");
            setMenuOpen(false); // Close the menu after selecting
          }}
        >
          Genres
        </div>
        <div
          className={`tabs ${activeTab === "Ask AI" ? "active" : ""}`}
          onClick={() => {
            changeTab("Ask AI");
            handleClick("Ask AI");
            setMenuOpen(false); // Close the menu after selecting
          }}
        >
          Ask AI
        </div>
      </div>

      <div
        className="mid"
        onClick={() => {
          changeTab("Home");
          handleClick("Home");
        }}
      >
        <SearchBar
          changeTab={changeTab}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>

      <div className="right">
        <AccountCircleIcon className="apps" onClick={ShowProfile} />
        <AppsIcon className="appsApps" />
        <NotificationsIcon className="appsNotifi" />
      </div>

      {profile && (
        <Profile details={details} setProfile={setProfile} profile={profile} />
      )}
    </div>
  );
};
export default NavBar;

import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "../styles/profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Profile = ({ details, setProfile, profile }) => {
  console.log("Details:", details);
  const [isVisible, setIsVisible] = useState(profile);

  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsVisible(false); // Close the profile when clicked
      setTimeout(() => setProfile(false), 500);
      // setProfile(false); // Close the profile when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={profileRef}
      className={`ProfileArea ${isVisible ? "slide-in" : "slide-out"}`}
    >
      <div className="title">
        <h1>My Profile</h1>

        <AccountCircleIcon className="avatar" />
      </div>
      <div className="details">
        <h2>Username: {details.username}</h2>
        <h2>Email: {details.email}</h2>
        <h2>UserId: {details.currentUserId}</h2>
      </div>
    </div>
  );
};
export default Profile;

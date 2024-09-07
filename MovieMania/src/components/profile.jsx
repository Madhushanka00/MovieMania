import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "../styles/profile.css";

const Profile = ({ details, setProfile, profile }) => {
  console.log("Details:", details);

  const profileRef = useRef(null);

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfile(false); // Close the profile when clicked outside
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
      className={`ProfileArea ${profile ? "slide-in" : "slide-out"}`}
    >
      <h1>Profile</h1>
      <h2>UserId: {details.userId}</h2>
    </div>
  );
};
export default Profile;

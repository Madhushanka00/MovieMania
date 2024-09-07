import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "../styles/profile.css";

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
  //   // Monitor changes in `profile` prop to trigger slide out and delay removal
  //   useEffect(() => {
  //     if (profile) {
  //       setIsVisible(true); // Show profile (slide-in)
  //     } else {
  //       setTimeout(() => setIsVisible(false), 500); // Delay hiding profile to allow slide-out animation to finish
  //     }
  //   }, [profile]);

  //   if (!isVisible) {
  //     return null; // Remove the component from the DOM when the animation completes
  //   }

  return (
    <div
      ref={profileRef}
      className={`ProfileArea ${isVisible ? "slide-in" : "slide-out"}`}
    >
      <h1>Profile</h1>
      <h2>UserId: {details.userId}</h2>
    </div>
  );
};
export default Profile;

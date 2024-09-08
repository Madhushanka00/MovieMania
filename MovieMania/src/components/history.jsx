import React from "react";
import { MovieContext } from "./movieContext";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../styles/ratings.css";

const History = ({ setHistoryRender, historyRender }) => {
  const histRef = useRef(null);
  const { currentUserId } = useContext(MovieContext);
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(historyRender);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/getHistory?userId=${currentUserId}`)
      .then((res) => {
        console.log(res.data);
        setHistory(res.data.ratings);
      });
  }, []);

  const handleClickOutside = (event) => {
    if (histRef.current && !histRef.current.contains(event.target)) {
      setIsVisible(false); // Close the profile when clicked
      setTimeout(() => setHistoryRender(false), 500);
      //   setRatingRender(false); // Close the profile when clicked outside
      //   console.log("Clicked Outside");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ratingsWindow" ref={histRef}>
      <h1>History</h1>
    </div>
  );
};
export default History;

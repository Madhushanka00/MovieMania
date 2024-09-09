import React from "react";
import { MovieContext } from "./movieContext";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../styles/history.css";
import { formatDistanceToNow } from "date-fns";

const History = ({ setHistoryRender, historyRender }) => {
  const histRef = useRef(null);
  const { currentUserId } = useContext(MovieContext);
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(historyRender);

  useEffect(() => {
    axios
      .get(
        `https://dspndkpg-3000.asse.devtunnels.ms/getHistory?userId=${currentUserId}`
      )
      .then((res) => {
        console.log(res.data);
        setHistory(res.data.history);
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
    <div
      className={`historyWindow ${
        isVisible ? "slide-inrate" : "slide-outrate"
      }`}
      ref={histRef}
    >
      <h1>Search History</h1>
      <div className="ratings">
        {history
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((rating, index) => (
            <div className="history" key={index}>
              <h3>{index + 1}.</h3>
              <div className="title">{rating.movieTitle}</div>
              <div className="historyDetails">
                {formatDistanceToNow(new Date(rating.updatedAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default History;

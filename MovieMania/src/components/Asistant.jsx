import React from "react";
import "../styles/assistant.css";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";

const Asistant = () => {
  return (
    <div className="box">
      <div className="chatArea">
        <div className="chatWindow">
          <div className="chatbox">
            <div className="bot">
              Hi, I am FilmSeeker, your personal movie assistant. How can I help
            </div>
            <div className="user">
              Hi, I am looking for a movie to watch with my family
            </div>
          </div>
          <div className="chatInput">
            <input type="text" placeholder="Type here..." />
            <ArrowCircleUpTwoToneIcon className="send" />
          </div>
        </div>
      </div>
      <div className="moviesSugest"></div>
    </div>
  );
};
export default Asistant;

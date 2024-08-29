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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              accusantium vitae incidunt odio dolores dolor aspernatur aut
              praesentium porro? Cupiditate nam possimus voluptatum rerum cumque
              eveniet alias dolorem repudiandae esse.
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

import React from "react";
import { useRef, useState } from "react";
import "../styles/assistant.css";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";

const Asistant = () => {
  const chatref = useRef();
  const msgRef = useRef();
  // const [msg, setMsg] = useState("");

  const sendMsg = () => {
    let newUsermsg = document.createElement("div");
    newUsermsg.className = "user";
    let text = document.createElement("p");
    text.innerText = msgRef.current.value;
    newUsermsg.appendChild(text);
    chatref.current.appendChild(newUsermsg);
  };

  return (
    <div className="box">
      <div className="chatArea">
        <div className="chatWindow">
          <div className="chatbox" ref={chatref}>
            <div className="bot">
              <p>
                Hi, I am FilmSeeker, your personal movie assistant. How can I
                help
              </p>
            </div>
            <div className="user">
              <p>
                Hi, I am looking for a movie to watch with my family Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Officiis fuga
                rerum sit neque autem modi minima facere quaerat dignissimos
                molestiae aspernatur tempore sed tenetur dolores, esse
                voluptatibus reiciendis corporis natus!
              </p>
            </div>
          </div>
          <div className="chatInput">
            <input type="text" placeholder="Type here..." ref={msgRef} />
            <ArrowCircleUpTwoToneIcon className="send" onClick={sendMsg} />
          </div>
        </div>
      </div>
      <div className="moviesSugest"></div>
    </div>
  );
};
export default Asistant;

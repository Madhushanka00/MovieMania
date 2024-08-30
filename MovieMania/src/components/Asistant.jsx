import React, { useEffect } from "react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/assistant.css";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import { TypeAnimation } from "react-type-animation";

const Asistant = () => {
  const chatref = useRef();
  const msgRef = useRef();
  const [msg, setMsg] = useState("");
  const [movieslist, setMovieslist] = useState([]);
  const [messages, setMessages] = useState([
    {
      text: `**FilmSeeker**:  
      Welcome to FilmSeeker, your ultimate movie guide! 🎬✨  
**How can I assist you today?**

1. **Looking for something specific?**  
   Tell me about a plot or genre you're interested in, and I'll find movies that match.

2. **Got a favorite movie?**  
   Share it with me, and I’ll recommend similar films you might enjoy.

Let’s explore the world of movies together! 🍿🎥`,
      sender: "bot",
    },
  ]);

  // useEffect(() => {
  //   setMessages[
  //     {
  //       text: "Hi, I am FilmSeeker, your personal movie assistant. How can I help",
  //       sender: "bot",
  //     }
  //   ];
  // }, []);
  const sendMsg = () => {
    const userMessage = msgRef.current.value.trim();
    if (userMessage === "") return;

    // Add the user's message to the state
    setMessages([...messages, { text: userMessage, sender: "user" }]);

    // Clear the text input
    msgRef.current.value = "";

    // Fetch the bot response
    fetch(
      `http://127.0.0.1:5000/chatagent/ask?query=${encodeURIComponent(
        userMessage
      )}`
    )
      .then((res) => res.text())
      .then((data) => {
        // Add the bot's message to the state
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data, sender: "bot" },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    // Scroll to the bottom of the chatbox whenever messages change
    if (chatref.current) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
    fetch("http://localhost:5000/requestIds")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      });
  }, [messages]);

  return (
    <div className="box">
      <div className="chatArea">
        <div className="chatWindow">
          <div className="chatbox" ref={chatref}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                {msg.sender === "bot" ? (
                  <div className="markdown">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    {/* <TypeAnimation>{msg.text}</TypeAnimation> */}
                  </div>
                ) : (
                  <div className="markdown">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {/* <div className="bot">
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
            </div> */}
          </div>
          <div className="chatInput">
            <input
              type="text"
              placeholder="Type here..."
              ref={msgRef}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMsg();
                }
              }}
            />
            <ArrowCircleUpTwoToneIcon className="send" onClick={sendMsg} />
          </div>
        </div>
      </div>
      <div className="moviesSugest"></div>
    </div>
  );
};
export default Asistant;

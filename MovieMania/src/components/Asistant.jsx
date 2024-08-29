import React, { useEffect } from "react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/assistant.css";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";

const Asistant = () => {
  const chatref = useRef();
  const msgRef = useRef();
  const [msg, setMsg] = useState("");
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
      `http://localhost:5000/chatagent/ask?query=${encodeURIComponent(
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
  }, [messages]);

  // const sendMsg = () => {
  //   const userMessage = msgRef.current.value;

  //   let newUsermsg = document.createElement("div");
  //   newUsermsg.className = "user";
  //   let text = document.createElement("p");
  //   text.innerText = userMessage;
  //   newUsermsg.appendChild(text);
  //   chatref.current.appendChild(newUsermsg);

  //   // Clear the text input
  //   msgRef.current.value = "";

  //   fetch(
  //     `http://localhost:5000/chatagent/ask?query=${encodeURIComponent(
  //       userMessage
  //     )}`
  //   )
  //     .then((res) => res.text())
  //     .then((data) => {
  //       console.log(data);
  //       setMsg(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  // useEffect(() => {
  //   // Scroll to the bottom of the chatbox whenever a new message is added
  //   if (chatref.current) {
  //     chatref.current.scrollTop = chatref.current.scrollHeight;
  //   }
  // }, [msg]);

  // useEffect(() => {
  //   // Create the bot response element if msg is not empty
  //   if (msg !== "") {
  //     let newBotmsg = document.createElement("div");
  //     newBotmsg.className = "bot";

  //     // Append the ReactMarkdown component to render markdown content
  //     const botTextElement = (
  //       <div className="markdown">
  //         <ReactMarkdown>{msg}</ReactMarkdown>
  //       </div>
  //     );
  //     // Append the ReactMarkdown component to the chat
  //     chatref.current.appendChild(newBotmsg);

  //     // // Render the botTextElement into the newBotmsg
  //     // newBotmsg
  //     //   .appendChild(document.createElement("div"))
  //     //   .appendChild(document.createElement("div")).outerHTML =
  //     //   ReactDOMServer.renderToStaticMarkup(botTextElement);

  //     let botText = document.createElement("p");
  //     // let botText = document.createElement("div");
  //     botText.innerText = msg; // 'msg' contains the response text
  //     // botText.innerText = `<div class="markdown"><ReactMarkdown>${msg}</ReactMarkdown></div>`;
  //     newBotmsg.appendChild(botText);
  //     chatref.current.appendChild(newBotmsg);
  //   }
  // }, [msg]);

  return (
    <div className="box">
      <div className="chatArea">
        <div className="chatWindow">
          <div className="chatbox" ref={chatref}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                <div className="markdown">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
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

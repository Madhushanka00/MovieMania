import React, { useEffect } from "react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/assistant.css";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
// import { TypeAnimation } from "react-type-animation";
import ChatRecomends from "./chatrecomends";
import MovieCard from "./MovieCard";
import axios from "axios";
import DetailedView from "./DetailedView";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const endpointAddr = "https://dspndkpg-5000.asse.devtunnels.ms/";

const Asistant = () => {
  const chatref = useRef();
  const msgRef = useRef();
  const [msg, setMsg] = useState("");
  const [movies, setMovies] = useState([]);
  const [goToDetails, setGoToDetails] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

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
    {
      text: "1. give me some recomendations based on my movie ratings",
      sender: "init",
    },
    {},
  ]);

  const handleClick = (details) => {
    console.log("Clicked");
    setGoToDetails(true);
    console.log("Details:", details);
    setSelectedMovieDetails(details);
    // console.log("Selected Movie Details:", selectedMovieDetails);
  };

  const recomendMovies = (msg) => {
    if (msg == "init") {
      console.log("msg", msg);
    }
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };

  const sendMsg = () => {
    const userMessage = msgRef.current.value.trim();
    if (userMessage === "") return;

    // Add the user's message to the state
    setMessages([...messages, { text: userMessage, sender: "user" }]);

    setLoading(true); // Set loading to true when message is sent

    // Clear the text input
    msgRef.current.value = "";

    // Fetch the bot response
    fetch(
      `https://dspndkpg-5000.asse.devtunnels.ms/chatagent/ask?query=${encodeURIComponent(
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
        setLoading(false); // Set loading to false when message is received
      })
      .catch((error) => {
        console.error("Error:", error);

        setLoading(false); // Set loading to false when message is received
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Oops! Something went wrong 🔌❌ . Please try again later.",
            sender: "bot",
          },
        ]);
      });
  };
  useEffect(() => {
    // Scroll to the bottom of the chatbox whenever messages change
    if (chatref.current) {
      chatref.current.scrollTop = chatref.current.scrollHeight;
    }
    fetch("https://dspndkpg-5000.asse.devtunnels.ms/requestIds")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (!data || data.length === 0 || data.trim() === "") {
          console.log("no movies");
        } else {
          console.log("data", data, "data.length", data.length);
          axios
            .get("https://dspndkpg-5000.asse.devtunnels.ms/chatMovieDetails")
            .then((response) => {
              console.log("response length", response.data.length);
              if (response.data.length != 0) {
                setMovies(response.data);
              }
              console.log("movies,", response.data);
            })
            .catch((error) => {
              console.error("Error fetching movie details:", error);
              // Add an error message to the chat
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: "Oops! Something went wrong. Please try again later.",
                  sender: "bot",
                },
              ]);
            });
        }
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
                    <ReactMarkdown onClick={() => recomendMovies(msg.sender)}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {/* Show 'thinking...' message while waiting for response */}
            {loading && (
              <div className="bot">
                <div className="markdown">
                  <div className="thinking-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
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
      <div className="moviesSugest">
        <div className="moviesArea_next">
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => {
              return (
                <div onClick={() => handleClick(movie)} key={index}>
                  <MovieCard
                    key={movie.id}
                    movie={{
                      title: movie.title,
                      ratings: movie.ratings,
                      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      id: movie.id,
                    }}
                  />
                </div>
              );
            })
          ) : (
            // <p>OOps! No movies found.</p>

            <>
              {[...Array(4)].map((_, index) => (
                <Box className="box" key={index}>
                  <Skeleton
                    className="skeleton_box"
                    variant="rounded"
                    // width={200}
                    // height={180}
                    animation="wave"
                    color={"white"}
                  />
                  <Skeleton
                    className="skeleton_text"
                    variant="text"
                    animation="wave"
                    // width={200}
                    sx={{ fontSize: "1.5rem" }}
                  />
                </Box>
              ))}
            </>
          )}
          {goToDetails && (
            <DetailedView
              movie={selectedMovieDetails}
              onClose={hideDetailedView}
              type={"none"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Asistant;

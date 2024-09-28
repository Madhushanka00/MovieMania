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

  const handleClick = (details) => {
    console.log("Clicked");
    setGoToDetails(true);
    console.log("Details:", details);
    setSelectedMovieDetails(details);
    // console.log("Selected Movie Details:", selectedMovieDetails);
  };

  const hideDetailedView = () => {
    setGoToDetails(false);
  };

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
    fetch("https://dspndkpg-5000.asse.devtunnels.ms/requestIds")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (data == {} || data == [] || data.trim() === "") {
          console.log("no movies");
        } else {
          axios
            .get("https://dspndkpg-5000.asse.devtunnels.ms/chatMovieDetails")
            .then((response) => {
              console.log(response.data); // Access the data in the response
              setMovies(response.data);
              console.log("movies,", response.data);
            })
            .catch((error) => {
              console.error("Error fetching movie details:", error);
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
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
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

            <Box
              className="grid-container"
              sx={{
                display: "grid",
                gap: 5,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {[...Array(4)].map((_, index) => (
                <Box className="box" key={index}>
                  <Skeleton
                    className="skeleton"
                    variant="rounded"
                    width={200}
                    height={180}
                    color={"white"}
                  />
                  <Skeleton
                    className="skeleton"
                    variant="text"
                    width={200}
                    sx={{ fontSize: "1.5rem" }}
                  />
                </Box>
              ))}
            </Box>
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

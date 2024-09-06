import * as React from "react";
import { useEffect, useState, useContext } from "react";
import MovieContext from "./movieContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputBase } from "@mui/material";
import "../styles/searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SearchPopup from "./SearchPopup";

export default function SearchBar({ changeTab, setActiveTab }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const { currentUserId, setCurrentUserId } = useContext(MovieContext);

  const handleSearchClick = () => {
    if (query != "") {
      console.log(query);
      changeTab("home");
      setActiveTab("Home");
      axios
        .get(
          `https://dspndkpg-5000.asse.devtunnels.ms/searchmovies?query=${query}`
        )
        .then((response) => {
          // console.log(response.data); // Access the data in the response
          setSearchResults(response.data);
          // console.log("movies,", response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
      setOpenPopup(true);
    } else {
      setOpenPopup(false);
    }
  };

  const autosearch = (quary) => {
    if (quary == "") {
      setOpenPopup(false);
    } else {
      setOpenPopup(true);
      axios
        .get(
          `https://dspndkpg-5000.asse.devtunnels.ms/searchmovies?query=${quary}`
        )
        .then((response) => {
          // console.log(response.data); // Access the data in the response
          setSearchResults(response.data);
          // console.log("movies,", response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <div className="Searchbar">
        <div className="inputSearch">
          <SearchIcon
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />
          <input
            type="text"
            placeholder="Search Movies here..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              autosearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            // onClick={() => setOpenPopup(true)}
          />
        </div>
      </div>
      {openPopup && (
        <SearchPopup
          searchResults={searchResults}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      )}
    </>
  );
}

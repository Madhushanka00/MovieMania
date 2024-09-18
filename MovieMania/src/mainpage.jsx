import React, { useContext, useState, useEffect, useRef } from "react";
import "./styles/mainpage.css";
import MoviesArea from "./components/MovieArea";
import { MovieContext } from "./components/movieContext";
import MovieCard from "./components/MovieCard";
import axios from "axios";
import DetailedView from "./components/DetailedView";

const MainPage = () => {
  const {
    selectItem,
    setSelectItem,
    clickedItem,
    SetClickedItem,
    similarMovies,
    setSimilarMovies,
  } = useContext(MovieContext);

  const [type, setType] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState(null);
  console.log("Selected Item:", selectItem);
  const [fakeState, setFakeState] = useState(0);
  const [goToDetails, setGoToDetails] = useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

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

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -800, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 800, behavior: "smooth" });
  };

  useEffect(() => {
    if (selectItem) {
      if (selectItem.title) {
        setType("movie");
        setTitle(selectItem.title);
      } else {
        setType("tv");
        setTitle(selectItem.original_name);
      }
      setMovieTitle(
        selectItem.title ? selectItem.title : selectItem.original_name
      );
      console.log("Movies:", movies);
    }
  }, [selectItem]);

  useEffect(() => {
    console.log("similar movies recieved:", similarMovies);
    setMovies(similarMovies);
  }, [similarMovies]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div className="HomeMain">
      <div className="titlebox">
        <div className="mainTitle">Welcome to MovieMania</div>
        <h2>
          Explore, Discover, and Craft Your Perfect Movie Universe with
          MovieMania!
        </h2>
      </div>
      <div className="Searchresults">
        <div className="devider">
          <div className="subtitle1">Search Result</div>
          <div className="subtitle2">Similar Movies</div>
        </div>

        <div className="searcharea">
          <div className="subtitle1_mobile">Search Result</div>
          <div className="searchedMovie">
            {selectItem && (
              <>
                <div onClick={() => handleClick(selectItem)}>
                  <MovieCard
                    key={selectItem.id}
                    movie={{
                      title: selectItem.title
                        ? selectItem.title
                        : selectItem.original_name,
                      ratings: selectItem.ratings,
                      posterUrl: `https://image.tmdb.org/t/p/w500${selectItem.poster_path}`,
                      id: selectItem.id,
                    }}
                  />
                </div>
              </>
            )}
            {goToDetails && (
              <DetailedView
                movie={selectedMovieDetails}
                onClose={hideDetailedView}
                type={type}
              />
            )}
          </div>

          {/* <Slider {...settings}> */}
          <button className="carousel-btn left" onClick={scrollLeft}>
            &#8249;
          </button>
          <div className="moviesArea_Mainpage" ref={carouselRef}>
            {console.log("Movies:", movies)}
            {console.log("Type:", type)}

            {movies.map((movie) => {
              return (
                <div key={movie.id} onClick={() => handleClick(movie)}>
                  <MovieCard
                    key={movie.id}
                    movie={{
                      title: movie.title ? movie.title : movie.original_name,
                      ratings: movie.ratings,
                      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                      id: movie.id,
                    }}
                  />
                </div>
              );
            })}
            {/* </Slider> */}
          </div>
          <button className="carousel-btn right" onClick={scrollRight}>
            &#8250;
          </button>
          <div className="subtitle2_mobile">Similar Movies</div>
          <div className="mobileSimilarmovies">
            <div className="moviesArea_Mainpage" ref={carouselRef}>
              {console.log("Movies:", movies)}
              {console.log("Type:", type)}

              {movies.map((movie) => {
                return (
                  <div key={movie.id} onClick={() => handleClick(movie)}>
                    <MovieCard
                      key={movie.id}
                      movie={{
                        title: movie.title ? movie.title : movie.original_name,
                        ratings: movie.ratings,
                        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        id: movie.id,
                      }}
                    />
                  </div>
                );
              })}
              {/* </Slider> */}
            </div>
          </div>

          {/* </Slider> */}
        </div>
      </div>
      <div className="recommendations">
        <div className="subtitle">Movies You might like</div>
        <div className="moveara">
          <MoviesArea mode="topRated" tab={"Home"} type="movie" />
        </div>
      </div>
    </div>
  );
};
export default MainPage;

import React from "react";
import NavBar from "./components/nav_bar";
import LeftBar from "./components/leftBar";
// import
import "./styles/home.css";

const Home = () => {
  return (
    <div className="mainlayout">
      <div className="drawer">
        <LeftBar />
      </div>
      <div className="content">
        <NavBar />
        <div className="moviesArea" />
      </div>
    </div>
  );
};
export default Home;

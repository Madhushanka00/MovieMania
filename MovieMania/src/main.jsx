import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Home from "./home.jsx";
import "./index.css";
import "./Signin.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Home />
  // </React.StrictMode>
  <Router>
    <Routes>
      {/* <Route path="/" element={<User />} /> */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/server" element={<Server />} /> */}
    </Routes>
  </Router>
);

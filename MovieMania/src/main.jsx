import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Home from "./home.jsx";
import Form from "../src/components/form.jsx";
import "./index.css";
import "./Signin.jsx";
// import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Home />
  // </React.StrictMode>
  <Router>
    <Routes>
      {/* <Route path="/" element={<User />} /> */}
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/server" element={<Server />} /> */}
    </Routes>
  </Router>
);

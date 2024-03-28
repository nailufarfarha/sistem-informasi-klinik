import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/users/Home";
import About from "./components/About";
import Fasilitas from "./components/Fasilitas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/fasilitas" Component={Fasilitas} />
    </Routes>
  </BrowserRouter>
);

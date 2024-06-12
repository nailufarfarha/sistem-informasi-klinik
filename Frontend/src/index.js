import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/users/Home";
import About from "./components/About";
import Fasilitas from "./components/Fasilitas";
import Layanan from "./components/Layanan";
import Login from "./pages/admin/Login";
import Daftar from "./pages/admin/Daftar";
import Dashboard from "./pages/admin/Dashboard";
import AdmFasilitas from "./pages/admin/AdmFasilitas";
import AdmLayanan from "./pages/admin/AdmLayanan";
// import DataFasilitas from "./pages/admin/DataFasilitas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/fasilitas" Component={Fasilitas} />
      <Route path="/layanan" Component={Layanan} />
      <Route path="/login" Component={Login} />
      <Route path="/daftar" Component={Daftar} />
      <Route path="/dashboard" Component={Dashboard} />

      <Route path="/dashboard/fasilitas" Component={AdmFasilitas} />
      <Route path="/dashboard/layanan" Component={AdmLayanan} />
    </Routes>
  </BrowserRouter>
);

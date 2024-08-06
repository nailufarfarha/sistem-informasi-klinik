import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/users/Home";
import About from "./components/About";
import Fasilitas from "./components/Fasilitas";
import Layanan from "./components/Layanan";
import Jadwal from "./components/Jadwal";
import Janji from "./pages/users/Janji";
import LoginAdmin from "./pages/admin/Login";
import DaftarAdmin from "./pages/admin/Daftar";
import DashboardAdmin from "./pages/admin/Dashboard";
import AdmFasilitas from "./pages/admin/AdmFasilitas";
import AdmLayanan from "./pages/admin/AdmLayanan";
import AdmJadwal from "./pages/admin/AdmJadwal";
import DataJanji from "./pages/admin/AdmJanji";

// import DataPasien from "./pages/admin/AdmData";

// import Login from "./pages/users/Login";
// import Daftar from "./pages/users/Daftar";
// import JanjiTemu from "./pages/users/JanjiTemu";
// import Akun from "./pages/users/Akun";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
      <Route path="/fasilitas" Component={Fasilitas} />
      <Route path="/layanan" Component={Layanan} />
      <Route path="/jadwal-layanan" Component={Jadwal} />
      <Route path="/janji-temu" Component={Janji} />

      {/* <Route path="/login" Component={Login} /> */}
      {/* <Route path="/daftar" Component={Daftar} /> */}
      {/* <Route path="/janji-temu" Component={JanjiTemu} /> */}
      {/* <Route path="/akun" Component={Akun} /> */}

      <Route path="/login" Component={LoginAdmin} />
      <Route path="/daftar" Component={DaftarAdmin} />
      <Route path="/dashboard" Component={DashboardAdmin} />
      <Route path="/dashboard/fasilitas" Component={AdmFasilitas} />
      <Route path="/dashboard/layanan" Component={AdmLayanan} />
      <Route path="/dashboard/jadwal" Component={AdmJadwal} />
      <Route path="/dashboard/janji-temu" Component={DataJanji} />
      {/* <Route path="/admin/dashboard/data-pasien" Component={DataPasien} /> */}
    </Routes>
  </BrowserRouter>
);

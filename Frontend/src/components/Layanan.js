import React, { useState, useEffect, useRef } from "react";
// import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";

import axios from "axios";

const Layanan = () => {
  const [layanan, setLayanan] = useState([]);

  // get data dari server
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/layanan")
      .then((response) => {
        setLayanan(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="body">
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>LAYANAN KLINIK</h2>
      </div>
      <h2 className="layanan-header">
        <span>Layanan </span>
        <span className="text-orange">Klinik Fatimah</span>
      </h2>
      <div className="layanan-body">
        {layanan.map((item, index) => (
          <div className="card" key={index}>
            <img src={`http://localhost:8081/api/v1/layanan/image/${item._id}`} alt="Logo" className="layanan-logo" />
            <h6>{item.judul}</h6>
            <p>{item.deskripsi}</p>
          </div>
        ))}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Layanan;

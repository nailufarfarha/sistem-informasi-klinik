import React, { useState, useEffect } from "react";
import "../../App.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import clinic from "../../assets/clinic.jpeg";
import { Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [fasilitas, setFasilitas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/fasilitas")
      .then((response) => {
        setFasilitas(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      <Navigation />
      <div className="hero">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
      </div>
      {/* tentang */}
      <div className="about">
        <h2 className="welcome">
          <span>Selamat Datang di Website </span>
          <span className="text-orange">FATIMAH MEDICAL CLINIC</span>
        </h2>
        <div className="about-1">
          <Row>
            <Col>
              <img src={logo} alt="Fatimah Medical Clinic" />
            </Col>
            <Col className="overview">
              Fatimah Medical Clinic adalah sebuah klinik pratama atau fasilitas kesehatan yang menyelenggarakan dan menyediakan pelayanan medik dasar yang didirikan pada tanggal 08 November 2021 dan dibentuk oleh lebih dari satu tenaga
              kesehatan yang dipimpin oleh seorang tenaga medis yaitu Dokter yang terletak di Jl. Cikeris Desa Cikeris Kecamatan Bojong Kabupaten Purwakarta.
              {/* <br /> */}
              <div className="more">
                <Link to="/about" style={{ textDecoration: "none" }}>
                  Baca Selengkapnya <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "15px" }} />
                </Link>
              </div>
              {/* <p>Baca Selengkapnya</p> */}
            </Col>
          </Row>
        </div>
      </div>
      {/* layanan */}
      <div className="layanan">
        <h2 className="layanan-header">
          <span>Layanan </span>
          <span className="text-orange">FATIMAH MEDICAL CLINIC</span>
        </h2>
        <div className="grid-container">
          {layanan.map((item, index) => (
            <div className="card" key={index}>
              <img src={`http://localhost:8081/api/v1/layanan/image/${item._id}`} alt="Logo" className="icon-layanan" />
              <h6>{item.judul}</h6>
            </div>
          ))}
        </div>

        {/* <div className="grid-container">
          <div className="card">
            <FontAwesomeIcon icon={faStethoscope} className="icon-layanan" style={{ color: "#12835e" }} />
            <h6>Poli Umum</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faPersonBreastfeeding} className="icon-layanan" />
            <h6>Poli Kia</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faHospital} className="icon-layanan" />
            <h6>IGD 24 Jam</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faMortarPestle} className="icon-layanan" />
            <h6>Farmasi</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faFlask} className="icon-layanan" />
            <h6>Laboratorium</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faHouseMedical} className="icon-layanan" />
            <h6>Home Care</h6>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faUserNurse} className="icon-layanan" />
            <h6>Tindakan Medis</h6>
          </div>
        </div> */}
      </div>
      {/* fasilitas */}
      <div className="fasilitas">
        <h2 className="fasilitas-header">
          <span>Fasilitas </span>
          <span className="text-orange">FATIMAH MEDICAL CLINIC</span>
        </h2>
        <div className="grid-container-fas">
          {/* <Images></Images> */}
          <div className="card">
            <img src={`http://localhost:8081/api/v1/fasilitas/image/667c54e9da1974a3d6f57882`} alt="Klinik Fatimah" className="img-fluid" />
          </div>
          <div className="card">
            <img src={`http://localhost:8081/api/v1/fasilitas/image/667c580bda1974a3d6f57892`} alt="Tempat Registrasi" className="img-fluid" />
          </div>
          <div className="card">
            <img src={`http://localhost:8081/api/v1/fasilitas/image/667c57f4da1974a3d6f5788f`} alt="Ruang IGD" className="img-fluid" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/fasilitas" style={{ textDecoration: "none" }}>
            Lihat Fasilitas Selengkapnya <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "15px" }} />
          </Link>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import "../../App.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import clinic from "../../assets/clinic.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faPersonBreastfeeding, faFlask, faMortarPestle, faUserNurse, faHouseMedical, faHospital } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
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
              kesehatan yang dipimpin oleh seorang tenaga medis yaitu Dokter yang terletak di Jl. Cikeris Desa Cikeris Kecamatan Bojong Kabupaten Purwakarta
              <p>Baca Selengkapnya</p>
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
        </div>
      </div>
      {/* fasilitas */}
      <div className="fasilitas">
        <h2 className="fasilitas-header">
          <span>Fasilitas </span>
          <span className="text-orange">FATIMAH MEDICAL CLINIC</span>
        </h2>
        <div className="grid-container-fas">
          <div className="card">
            <img src={clinic} alt="IGD" />
          </div>
          <div className="card">
            <img src={clinic} alt="IGD" />
          </div>
          <div className="card">
            <img src={clinic} alt="IGD" />
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;

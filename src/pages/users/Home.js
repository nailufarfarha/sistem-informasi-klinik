import React from "react";
import "../../App.css";
import Navigation from "../../components/Navigation";
import clinic from "../../assets/clinic.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <div className="Home">
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
            <img src={require("../../assets/poli-umum.png")} alt="Poli Umum" style={{ width: "60px", height: "60px" }} />
            <h6>Poli Umum</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/polikia.png")} alt="Poli Kia" />
            <h6>Poli Kia</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/igd.png")} alt="IGD 24 Jam" style={{ width: "60px", height: "60px" }} />
            <h6>IGD 24 Jam</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/farmasi.png")} alt="Farmasi" style={{ width: "55px", height: "55px" }} />
            <h6>Farmasi</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/laboratory.png")} alt="Laboratorium" style={{ width: "55px", height: "55px" }} />
            <h6>Laboratorium</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/homecare.png")} alt="Home Care" style={{ width: "60px", height: "60px" }} />
            <h6>Home Care</h6>
          </div>
          <div className="card">
            <img src={require("../../assets/medis.png")} alt="Tindakan Medis" style={{ width: "60px", height: "60px" }} />
            <h6>Tindakan Medis</h6>
          </div>
        </div>
      </div>
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
      <div className="footer">
        <div className="footer-column">
          <img src={require("../../assets/logofooter.png")} />
        </div>
        <div className="footer-column">
          <h5>Hubungi Kami</h5>
          <p>08123456789</p>
          <p>fatimahmedicalclinic@gmail.com</p>
          <p>Jl. Cikeris, Desa Cikeris, Kecamatan Bojong, Kabupaten Purwakarta</p>
        </div>
        <div className="footer-column">
          <h5>Sosial Media</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor lorem et ipsum luctus, ut feugiat velit fermentum.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

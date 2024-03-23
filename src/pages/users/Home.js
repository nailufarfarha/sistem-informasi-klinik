import React from "react";
import "../../App.css";
import Navigation from "../../components/Navigation";
import clinic from "../../assets/clinic.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../assets/logo.png";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import icon_pomum from "../../assets/poli-umum.png";

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
        <CardGroup className="card-layanan">
          <Card style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <Card.Img variant="top" src={icon_pomum} />
            <Card.Body>
              <Card.Title>Poli Umum</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ backgroundColor: "transparent", border: "none", boxShadow: "none" }}>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
      <div className="fasilitas"></div>
      <div className="footer"></div>
    </div>
  );
};

export default Home;

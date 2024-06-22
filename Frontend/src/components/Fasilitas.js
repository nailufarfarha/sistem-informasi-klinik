import React, { useState, useEffect } from "react";
import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";

const Fasilitas = () => {
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

  const chunkArray = (myArray, chunkSize) => {
    const results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
    }
    return results;
  };

  const chunkedArray = chunkArray([...fasilitas], 3);

  return (
    <div className="body">
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>FASILITAS KLINIK</h2>
      </div>
      <h2 className="fasilitas-header">
        <span>Fasilitas </span>
        <span className="text-orange">Klinik Fatimah</span>
      </h2>
      <div className="fasilitas-body">
        <Container>
          {chunkedArray.map((chunk, index) => (
            <Row key={index} className="justify-content-center">
              {chunk.map((gambar, idx) => (
                <Col sm={4} key={idx}>
                  <div className="img-fasilitas">
                    <img src={`http://localhost:8081/api/v1/fasilitas/image/${gambar._id}`} alt="Gambar" className="img-fluid" />
                    <div className="img-text-fasilitas">{gambar.keterangan}</div>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Fasilitas;

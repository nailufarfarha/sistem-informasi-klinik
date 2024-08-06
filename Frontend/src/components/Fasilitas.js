// React Hooks adalah alat yang disediakan oleh React untuk memudahkan kita dalam menambahkan fitur-fitur tertentu ke dalam komponen tanpa harus menggunakan kelas.
// useState untuk menyimpan dan mengubah data di dalam komponen React.
// useEffect adalah cara untuk menjalankan sesuatu setelah komponen ditampilkan di layar.
import React, { useState, useEffect } from "react";
import "../App.css";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

// request data
import axios from "axios";

const Fasilitas = () => {
  // useState([]): state awalnya adalah array kosong
  // fasilitas: variabel yang menyimpan nilai state saat ini.
  // setFasilitas: Fungsi yang digunakan untuk mengubah nilai fasilitas.
  const [fasilitas, setFasilitas] = useState([]);

  //  useEffect menjalankan kode setelah komponen muncul di layar.
  // axios.get mengambil data dari server.
  // .then menangani data yang diterima dari server.
  // .catch menangani kesalahan jika permintaan gagal.
  // [] berarti efek ini hanya dijalankan sekali saat komponen pertama kali ditampilkan.
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

  //  untuk membagi array
  const chunkArray = (myArray, chunkSize) => {
    // untuk menyimpan
    const results = [];
    // lakukan loop untuk membagi array.
    while (myArray.length) {
      // mengambil chunkSize elemen dari awal myArray dan hapus dari myArray
      results.push(myArray.splice(0, chunkSize));
    }
    return results;
  };

  // memanggil fungsi chunkArray untuk membagi array fasilitas menjadi 3 elemen
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
          {/* .map() digunakan untuk mengulang setiap elemen dalam chunkedArray. */}
          {/* setiap potongan gambar (chunk), kita menjalankan kode di dalam tanda kurung (). index adalah posisi potongan dalam array */}
          {chunkedArray.map((chunk, index) => (
            <Row key={index} className="justify-content-center">
              {/* Untuk setiap gambar (gambar), kita menjalankan kode di dalam tanda kurung (). idx adalah posisi gambar dalam potongan */}
              {chunk.map((gambar, idx) => (
                // sm={4}: Mengatur ukuran kolom pada layar kecil. 4 berarti kolom akan mengambil 4 dari 12 bagian layar.
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

// useState untuk menyimpan dan mengubah data di dalam komponen React.
// useEffect adalah cara untuk menjalankan sesuatu setelah komponen ditampilkan di layar.
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";

// request data
import axios from "axios";

const Jadwal = () => {
  const [jadwals, setJadwals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/v1/jadwal")
      .then((response) => {
        setJadwals(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <div className="hero-1">
        <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" />
        <h2>JADWAL LAYANAN</h2>
      </div>
      <h2 className="layanan-header">
        <span>Jadwal Layanan </span>
        <span className="text-orange">Klinik Fatimah</span>
      </h2>

      <div className="content-jadwal">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Layanan</th>
              <th>Nama Dokter</th>
              <th>Hari</th>
              <th>Jam</th>
            </tr>
          </thead>
          <tbody>
            {
              jadwals
                .sort((a, b) => a.layanan.localeCompare(b.layanan)) // mengurutkan data berdasarkan layanan
                // mengubah array jadwal menjadi array baris tabel.
                .reduce(
                  // acc: mengakumulasi hasil proses pengurangan, yaitu prevLayanan, colspanCount, dan rows.
                  // array: array jadwals yang sedang diproses, digunakan untuk menghitung colspan.
                  (acc, jadwal, index, array) => {
                    const colspan = array.filter((j) => j.layanan === jadwal.layanan).length; //menghitung berapa banyak jadwal yang memiliki layanan yang sama, untuk menentukan jumlah baris (rowSpan) yang dibutuhkan.
                    //periksa layanan saat ini berbeda dari layanan sebelumnya (prevLayanan). jika berbeda, perbarui prevLayanan dan colspanCount. jika sama, kurangi colspanCount.
                    if (acc.prevLayanan !== jadwal.layanan) {
                      acc.prevLayanan = jadwal.layanan;
                      acc.colspanCount = colspan;
                    } else {
                      acc.colspanCount--;
                    }

                    acc.rows.push(
                      //menambahkan baris baru ke dalam array rows
                      <tr key={index}>
                        {/* jika colspanCount sama dengan jumlah total baris untuk layanan tersebut, tambahkan sel dengan atribut rowSpan untuk menggabungkan */}
                        {acc.colspanCount === colspan ? <td rowSpan={colspan}>{jadwal.layanan}</td> : null}
                        <td>{jadwal.dokter}</td>
                        <td>{jadwal.hari}</td>
                        <td>{jadwal.jam}</td>
                      </tr>
                    );

                    return acc;
                  },
                  { prevLayanan: null, colspanCount: 0, rows: [] }
                ).rows
            }
          </tbody>
          {/* <tbody>
            {jadwals.map((jadwal, index) => (
              <tr key={index}>
                <td>{jadwal.layanan}</td>
                <td>{jadwal.dokter}</td>
                <td>{jadwal.hari}</td>
                <td>{jadwal.jam}</td>
              </tr>
            ))}
          </tbody> */}
        </Table>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Jadwal;

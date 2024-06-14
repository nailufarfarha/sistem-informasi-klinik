import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import clinic from "../assets/clinic.jpeg";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
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
        {/* <img src={clinic} alt="Fatimah Medical Clinic" className="img-fluid" /> */}
        <img src="https://awsimages.detik.net.id/community/media/visual/2022/02/14/ilustrasi-dokter_169.jpeg?w=650&q=80" className="img-fluid"></img>
        {/* <h2>Jadwal Layanan</h2> */}
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
                .reduce(
                  (acc, jadwal, index, array) => {
                    const colspan = array.filter((j) => j.layanan === jadwal.layanan).length;
                    if (acc.prevLayanan !== jadwal.layanan) {
                      acc.prevLayanan = jadwal.layanan;
                      acc.colspanCount = colspan;
                    } else {
                      acc.colspanCount--;
                    }

                    acc.rows.push(
                      <tr key={index}>
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

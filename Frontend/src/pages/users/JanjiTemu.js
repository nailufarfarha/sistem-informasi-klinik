import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import logo from "../../assets/logofooter.png";
import "../../App.css";

import axios from "axios";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [jadwals, setJadwals] = useState([]);
  const [layanan, setLayanan] = useState("");
  const [dokter, setDokter] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [jamTerpilih, setJamTerpilih] = useState([]);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  const [janjis, setJanjis] = useState([]);

  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const startHour = 7;
  const endHour = 21;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });
  // Filter jam yang sudah dipilih
  const availableHours = hours.filter((hour) => !jamTerpilih.includes(hour));
  // Filter options based on previous selections
  const filteredDokters = jadwals.filter((jadwal) => jadwal.layanan === layanan);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedLayanan = localStorage.getItem("layanan");
    const storedDokter = localStorage.getItem("dokter");
    const storedHari = localStorage.getItem("hari");
    const storedJam = localStorage.getItem("jam");

    if ((token && storedUsername) || (storedLayanan && storedDokter && storedDokter && storedHari && storedJam)) {
      setUsername(storedUsername);
      setLayanan(storedLayanan);
      setDokter(storedDokter);
      setHari(storedHari);
      setJam(storedJam);

      axios
        .get("http://localhost:8081/api/v1/jadwal")
        .then((response) => {
          setJadwals(response.data);
        })
        .catch((error) => {
          console.error("Error fetching jadwal:", error);
        });

      axios
        .get(`http://localhost:8081/api/v1/janji`)
        .then((response) => {
          const userJanji = response.data;
          setJanjis(response.data);
          setLayanan(userJanji.Layanan);
          setDokter(userJanji.Dokter);
          setHari(userJanji.Hari);
          setJam(userJanji.Jam);
        })
        .catch((error) => {
          console.error("Error fetching janji:", error);
        });
    } else {
      <Navigate to="/login" />;
    }

    // axios
    //   .get("http://localhost:8081/api/v1/janji")
    //   .then((response) => {
    //     setJanjis(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onChangeJam = (e) => {
    const jam = e.target.value;
    setJam(jam);
    // if (jam && !jamTerpilih.includes(jam)) {
    //   setJamTerpilih([...jamTerpilih, jam]);
    // }
    setJamTerpilih([...jamTerpilih, jam]);
  };

  const handleSubmit = () => {
    // cek input
    if (!layanan || !dokter || !hari || !jam) {
      setMessage("Semua data harus diisi!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const data = {
      layanan: layanan,
      dokter: dokter,
      hari: hari,
      jam: jam,
      username: username,
    };

    axios
      .post("http://localhost:8081/api/v1/janji")
      .then((response) => {
        setJanjis([...janjis, response.data]);
        setLayanan("");
        setDokter("");
        setHari("");
        setJam("");

        setMessage("Janji berhasil dibuat!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setLayanan("");
    setDokter("");
    setHari("");
    setJam("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    <Navigate to="/login" />;
  };

  return (
    <div>
      {/* SIDEBAR */}
      <div>
        <ul className={`navbar-nav admin-sidebar sidebar`} id="accordionSidebar">
          <li className="nav-item active">
            {" "}
            <Link id="sidebarToggleTop" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
              <div className="sidebar-brand-logo">
                <img src={logo}></img>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/janji-temu" className="nav-link collapsed" href="#" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <FontAwesomeIcon icon={faNotesMedical} />
              <span className="ms-3">Janji Temu</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/akun" className="nav-link collapsed" href="#" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <FontAwesomeIcon icon={faUser} />
              <span className="ms-3">Informasi Akun</span>
            </Link>
          </li>

          <li className="sb-logout nav-item">
            <button onClick={handleLogout} className="btn-logout">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="icon-logout" />
              <span>Keluar</span>
            </button>
          </li>
        </ul>
      </div>
      {/* END SIDEBAR */}

      <div className="dashboard-admin">
        <h2>Hallo, Selamat Datang {username}!</h2>
        <h4>Silahkan buat janji temu dengan dokter!</h4>
      </div>
      <div className="adm-jadwal">
        <div className="tambah-jadwal">
          <h4>Buat Janji Temu</h4>

          {message && show && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <div className="tambah-form">
            <label>Layanan</label>
            <select name="layanan" value={layanan} onChange={(e) => setLayanan(e.target.value)}>
              <option value="">Pilih Layanan</option>
              {[...new Set(jadwals.map((jadwal) => jadwal.layanan))].map((layanan, index) => (
                <option key={index} value={layanan}>
                  {layanan}
                </option>
              ))}
            </select>

            <label>Dokter</label>
            <select name="dokter" value={dokter} onChange={(e) => setDokter(e.target.value)}>
              <option value="">Pilih Dokter</option>
              {[...new Set(filteredDokters.map((jadwal) => jadwal.dokter))].map((dokter, index) => (
                <option key={index} value={dokter}>
                  {dokter}
                </option>
              ))}
            </select>

            <label>Hari</label>
            <select name="hari" value={hari} onChange={(e) => setHari(e.target.value)}>
              <option value="">Pilih Hari</option>
              {daysOfWeek.map((hari, index) => (
                <option key={index} value={hari}>
                  {hari}
                </option>
              ))}
            </select>

            <label>Jam</label>
            <select name="jam" value={jam} onChange={onChangeJam}>
              <option value="">Pilih Jam</option>
              {availableHours.map((jam, index) => (
                <option key={index} value={jam}>
                  {jam}
                </option>
              ))}
              {/* {hours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))} */}
            </select>

            <div className="form-buttons">
              <Button type="submit" variant="success" onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="button" variant="danger" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <div className="content-fasilitas-data">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Layanan</th>
                <th>Dokter</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {janjis.map((janji, index) => (
                <tr key={index}>
                  <td>{janji.layanan}</td>
                  <td>{janji.dokter}</td>
                  <td>{janji.hari}</td>
                  <td>{janji.jam}</td>
                  <td>Contoh</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

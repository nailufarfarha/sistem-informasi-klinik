import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import logo from "../../assets/logofooter.png";
import "../../App.css";
import axios from "axios";

function Akun() {
  const [namalengkap, setNamalengkap] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nohp, setNohp] = useState("");
  const [akun, setAkun] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // get data dari server
  useEffect(() => {
    axios
      .get("http://localhost:8081/daftar")
      .then((response) => {
        setAkun(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedNamalengkap = localStorage.getItem("namalengkap");
    const storedUmur = localStorage.getItem("umur");
    const storedNohp = localStorage.getItem("nohp");
    const storedAlamat = localStorage.getItem("alamat");
    if (token && storedNamalengkap && storedUmur && storedNohp && storedAlamat) {
      setNamalengkap(storedNamalengkap);
      setUmur(storedUmur);
      setNohp(storedNohp);
      setAlamat(storedAlamat);
    } else {
      // Optionally fetch from API if data is not in local storage
      axios
        .get("http://localhost:8081/daftar")
        .then((response) => {
          // Assuming response.data contains the user's data
          const userData = response.data;
          setNamalengkap(userData.namalengkap);
          setUmur(userData.umur);
          setAlamat(userData.alamat);
          setNohp(userData.nohp);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const onChangeNamalengkap = (e) => {
    setNamalengkap(e.target.value);
  };

  const onChangeUmur = (e) => {
    setUmur(e.target.value);
  };

  const onChangeAlamat = (e) => {
    setAlamat(e.target.value);
  };

  const onChangeNohp = (e) => {
    setNohp(e.target.value);
  };

  //   const handleUpdate = async () => {
  //     const token = localStorage.getItem("token");
  //     const storedUser = localStorage.getItem("user");

  //     if (!token || !storedUser) {
  //       console.error("No token or user found in local storage");
  //       return;
  //     }

  //     const user = JSON.parse(storedUser);
  //     const updatedData = {
  //       namalengkap,
  //       umur,
  //       alamat,
  //       nohp,
  //     };

  //     try {
  //       const response = await axios.put(`http://localhost:8081/daftar/${user.id}`, updatedData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Perbarui data di local storage
  //       const updatedUser = { ...user, ...updatedData };
  //       localStorage.setItem("user", JSON.stringify(updatedUser));

  //       // Update state dengan data terbaru
  //       setIsEditing(false);
  //       console.log("User data updated successfully");
  //     } catch (error) {
  //       console.error("Error updating user data:", error);
  //     }
  //   };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Ambil data pengguna dari local storage
      const userId = JSON.parse(localStorage.getItem("user")).id;

      // Buat data yang akan dikirim ke server
      const updatedData = {
        namalengkap,
        umur,
        alamat,
        nohp,
      };

      // Kirim request ke server untuk update data pengguna
      const response = await axios.put(`http://localhost:8081/daftar/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Perbarui data di local storage
      localStorage.setItem("namalengkap", namalengkap);
      localStorage.setItem("umur", umur);
      localStorage.setItem("alamat", alamat);
      localStorage.setItem("nohp", nohp);

      // Update state dengan data terbaru
      setAkun(response.data);
      setIsEditing(false);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  //   Lama
  //   const handleUpdate = async () => {
  //     //   const token = localStorage.getItem("token");
  //     //   const data = {
  //     //       namalengkap: namalengkap,
  //     //       umur:umur,
  //     //       nohp: nohp,
  //     //       alamat: alamat
  //     //     };
  //     //   if (token) {
  //     //     const userId = token.id;
  //     //     try {
  //     //       await axios.put(`http://localhost:8081/daftar/${userId}`, data).then((response) => {
  //     //         console.log(response);
  //     //         localStorage.setItem("user", JSON.stringify(user));
  //     //         setIsEditing(false);
  //     //       });
  //     //     } catch (error) {
  //     //       console.error("Error during update:", error);
  //     //     }
  //     //   } else {
  //     //     console.error("No token found");
  //     //   }
  //   };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* SIDEBAR */}
      <div>
        <ul className={`navbar-nav admin-sidebar sidebar`} id="accordionSidebar">
          <li className="nav-item active">
            <Link id="sidebarToggleTop" className="nav-link sidebar-brand d-flex align-items-center justify-content-center">
              <div className="sidebar-brand-logo">
                <img src={logo} alt="Logo" />
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/janji-temu" className="nav-link collapsed" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
              <FontAwesomeIcon icon={faNotesMedical} />
              <span className="ms-3">Janji Temu</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/akun" className="nav-link collapsed" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
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

      {/* INFORMASI AKUN */}
      <div className="content-fasilitas">
        <div className="tambah-fasilitas">
          <h4>Informasi Akun</h4>
          {!isEditing ? (
            <div>
              <p>Nama Lengkap: {namalengkap}</p>
              <p>Umur: {umur} Tahun</p>
              <p>Alamat: {alamat}</p>
              <p>No Hp: {nohp}</p>
              <Button variant="success" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </div>
          ) : (
            <div className="tambah-form">
              <label>Nama Lengkap</label>
              <input type="text" name="namalengkap" value={namalengkap} onChange={onChangeNamalengkap} />
              <label>Umur</label>
              <input type="text" name="umur" value={umur} onChange={onChangeUmur} />
              <label>Alamat</label>
              <input type="text" name="alamat" value={alamat} onChange={onChangeAlamat} />
              <label>No Hp</label>
              <input type="number" name="nohp" value={nohp} onChange={onChangeNohp} />
              <div className="form-buttons">
                <Button type="submit" variant="success" onClick={handleUpdate}>
                  Perbaharui
                </Button>
                <Button type="button" variant="danger" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* END INFORMASI AKUN */}
    </div>
  );
}

export default Akun;

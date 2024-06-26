import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRightToBracket, faFolderOpen, faRectangleList, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logofooter.png";
import "../App.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHouse} />
            <span className="ms-3">Beranda</span>
          </Link>
        </li>
        <hr className="sidebar-divider text-white" />

        <li className="nav-item">
          <Link to="/dashboard/fasilitas" className="nav-link" href="tables.html">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span className="ms-3">Fasilitas</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/layanan" className="nav-link collapsed" href="#" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <FontAwesomeIcon icon={faBoxArchive} />
            <span className="ms-3">Layanan</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/jadwal" className="nav-link collapsed" href="#" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <FontAwesomeIcon icon={faRectangleList} />
            <span className="ms-3">Jadwal</span>
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
  );
};

export default Sidebar;

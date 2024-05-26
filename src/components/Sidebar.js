// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faChartBar, faDatabase, faEnvelopeOpenText, faHouse, faBars, faArrowRightToBracket, faFolderOpen, faRectangleList } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logofooter.png";
import "../App.css";

const Sidebar = () => {
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
            <span className="ms-2">Beranda</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider text-white" />

        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <Link to="/dashboard/fasilitas" className="nav-link" href="tables.html">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span className="ms-2">Fasilitas</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard/layanan"
            className="nav-link collapsed"
            href="#"
            // data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <FontAwesomeIcon icon={faRectangleList} />
            <span className="ms-2">Layanan</span>
          </Link>
        </li>
        {/* Nav Item - Charts */}

        <li className="sb-logout nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <span className="ms-2">Keluar</span>
          </Link>
        </li>
        {/* Sidebar Toggler (Sidebar) */}
      </ul>
    </div>
  );
};

export default Sidebar;

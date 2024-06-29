import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
//library untuk mengelola navigasi dan routing
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="body">
      <div className="footer">
        <div className="footer-column">
          <img src={require("../assets/logofooter.png")} />
        </div>
        <div className="footer-column">
          <h5>Hubungi Kami</h5>
          <p className="contact">
            <Link to="https://wa.me/6282123898188?text=Halo,%20Fatimah%20Medical%20Clinic%20......%20" target="_blank" className="link">
              <FontAwesomeIcon icon={faPhone} /> 082123898188
            </Link>
          </p>
          {/* <p className="contact">
            <FontAwesomeIcon icon={faEnvelope} /> fatimahmedicalclinic@gmail.com
          </p> */}
          <p className="contact">
            <Link to="https://maps.app.goo.gl/U12vUb4Ttnd49exLA" target="_blank" rel="noopener noreferrer" className="link">
              <FontAwesomeIcon icon={faLocationDot} /> Jl. Cikeris, Desa Cikeris, Kecamatan Bojong, Kabupaten Purwakarta
            </Link>
          </p>
        </div>
        <div className="footer-column">
          <h5>Sosial Media</h5>
          <span className="sosmed">
            <p className="contact">
              <Link to="https://www.instagram.com/fatimahmedical" target="_blank" rel="noopener noreferrer" className="link">
                <FontAwesomeIcon icon={faInstagram} /> Fatimah Medical Clinic
              </Link>
            </p>
            <p className="contact">
              <Link to="https://www.tiktok.com/@fatimah.medical.cl" target="_blank" rel="noopener noreferrer" className="link">
                <FontAwesomeIcon icon={faTiktok} /> Fatimah Medical Clinic
              </Link>
            </p>
            {/* <FontAwesomeIcon icon={faFacebook} /> <FontAwesomeIcon icon={faTwitter} /> <FontAwesomeIcon icon={faSquareInstagram} /> <FontAwesomeIcon icon={faYoutube} /> */}
          </span>
        </div>
      </div>
      <div className="credit">
        <span>Copyright © Nailufar Farha Afifah</span>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faSquareInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-column">
          <img src={require("../assets/logofooter.png")} />
        </div>
        <div className="footer-column">
          <h5>Hubungi Kami</h5>
          <p className="contact">
            <FontAwesomeIcon icon={faPhone} /> 08123456789
          </p>
          <p className="contact">
            <FontAwesomeIcon icon={faEnvelope} /> fatimahmedicalclinic@gmail.com
          </p>
          <p className="contact">
            <Link to="https://maps.app.goo.gl/U12vUb4Ttnd49exLA" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              <FontAwesomeIcon icon={faLocationDot} /> Jl. Cikeris, Desa Cikeris, Kecamatan Bojong, Kabupaten Purwakarta
            </Link>
          </p>
        </div>
        <div className="footer-column">
          <h5>Sosial Media</h5>
          <span className="sosmed">
            <FontAwesomeIcon icon={faFacebook} /> <FontAwesomeIcon icon={faTwitter} /> <FontAwesomeIcon icon={faSquareInstagram} /> <FontAwesomeIcon icon={faYoutube} />
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

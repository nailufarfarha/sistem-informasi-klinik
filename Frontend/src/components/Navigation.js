import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../assets/logo.png";

const Navigation = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" width="140" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "end" }}>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Beranda
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Tentang Kami
            </Nav.Link>
            <NavDropdown title="Fasilitas & Layanan" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/fasilitas">
                Fasilitas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/layanan">
                Layanan
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/jadwal-layanan">
              Jadwal Layanan
            </Nav.Link>
            <Nav.Link as={Link} to="/janji-temu">
              Janji Temu
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

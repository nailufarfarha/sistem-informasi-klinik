// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";

const Navigation = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" width="140" height="50" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: "end" }}>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Beranda</Nav.Link>
            <Nav.Link href="/about">Tentang Kami</Nav.Link>
            <NavDropdown title="Fasilitas & Layanan" id="basic-nav-dropdown">
              <NavDropdown.Item href="/fasilitas">Fasilitas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Layanan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

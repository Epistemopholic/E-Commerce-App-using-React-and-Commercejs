import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import React from "react";
import "./NavBar.css";
import logo from "../assets/logo.png";
import Navbar from "react-bootstrap/Navbar";
import NavBarCart from "./NavBarCart";

function NavBar() {
  return (
    <Navbar className="navbar-bg-new custom-padding">
      <Container py="true">
        <Link to="/" className="Navbar.Brand">
          <img src={logo} alt="Logo" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navbar-nav-new">
            <Link to="/" className="nav-link-new nav-link-ltr-new">
              Home
            </Link>
            <NavBarCart />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

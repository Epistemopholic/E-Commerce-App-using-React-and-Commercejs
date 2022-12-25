import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import "./Footer.css";
function Footer() {
  return (
    <Container fluid>
      <Row className="bg-primary-new p-2">
        <Col className="mx-5 fs-6 fw-bold">
          <span className="sf1">Follow us on Social Media</span>
          <span className="float-end sf2">
            <BsFacebook className="mx-2" size={18} />
            <BsInstagram className="mx-2" size={18} />
            <BsTwitter className="mx-2" size={18} />
            <BsLinkedin className="mx-2" size={18} />
            <BsYoutube className="mx-2" size={18} />
          </span>
        </Col>
      </Row>
      <Row xs={1} md={3} className="bg-black text-white p-4">
        <Col>
          <div className="fs-5 fw-bold p-1">About</div>
          <div className="p-1">
            The moment you enter one of our stores you will experience a new
            level of serenity and good taste. Worth mentioning is that you can
            take the very same experience and class home.
          </div>
        </Col>
        <Col>
          <div className="fs-5 fw-bold p-1">Subscribe to Newsletter</div>
          <Form>
            <Form.Group className="mb-2 p-1" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Button
              type="submit"
              className="float-end btn-primary-new"
              onClick={(event) => event.preventDefault()}
            >
              Subscribe
            </Button>
          </Form>
        </Col>
        <Col className="d-flex justify-content-start align-items-start flex-column">
          <div className="fs-5 fw-bold p-1 ">Contact Us</div>
          <div className="my-2">
            <AiOutlinePhone size={20} />
            <span className="m-2">+92 301-1234567</span>
          </div>
          <div className="my-2">
            <AiOutlineMail size={20} />
            <span className="m-2">support@steinfield.com.pk</span>
          </div>
          <div className="my-2">
            <GoLocation size={20} />
            <span className="m-2">Pakistan</span>
          </div>
        </Col>
      </Row>
      <Row className="bg-dark text-center p-3 font-monospace text-white text-uppercase">
        <Col>
          <div>© Copyright 2022 - Steinfield</div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

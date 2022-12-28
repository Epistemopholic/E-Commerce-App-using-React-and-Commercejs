import React, { useState } from "react";
import Button from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { FaStream } from "react-icons/fa";
import { commerce } from "../lib/commerce";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

function CheckoutSidebar({ cartToken, data, info }) {
  const [creditCard, setCC] = useState("");
  const [sCode, setSC] = useState("");
  const [expMon, setMonth] = useState("");
  const [expYr, setYear] = useState("");
  const [validated, setValidated] = useState(false);
  const [cur_error, setError] = useState("");
  const [cur_order, setOrder] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const checkoutForm = async () => {
    await commerce.checkout
      .capture(cartToken.id, {
        customer: {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
        },
        shipping: {
          name: data.firstName,
          street: data.address,
          town_city: data.city,
          county_state: data.province,
          postal_zip_code: data.postalCode,
          country: data.country,
        },
        fulfillment: {
          shipping_method: data.shipping,
        },
        billing: {
          name: data.firstName,
          street: data.address,
          town_city: data.city,
          county_state: data.province,
          postal_zip_code: data.postalCode,
          country: data.country,
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: creditCard,
            expiry_month: expMon,
            expiry_year: expYr,
            cvc: sCode,
            postal_zip_code: data.postalCode,
          },
        },
      })
      .then((order) => {
        setOrder(order);
        handleShow2();
      })
      .catch((error) => {
        setError(error.message);
        handleShow();
      });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      checkoutForm();
    }
  };
  return (
    <Container className="py-2">
      <p className="bg-primary-new">test gateway</p>
      <Form noValidate validated={validated}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Credit Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Credit Card Number"
                value={creditCard}
                onChange={(e) => {
                  setCC(e.target.value);
                }}
                required
                disabled={info}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Expiry Month</Form.Label>
              <Form.Control
                type="number"
                placeholder="Expiry Month"
                value={expMon}
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
                required
                disabled={info}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Expiry Year</Form.Label>
              <Form.Control
                type="year"
                placeholder="Expiry Year"
                value={expYr}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                required
                disabled={info}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 pb-2">
            <Form.Group>
              <Form.Label className="fw-bold">CVC Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="CVC"
                value={sCode}
                onChange={(e) => {
                  setSC(e.target.value);
                }}
                required
                disabled={info}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="d-flex justify-content-center">
            <Button
              type="submit"
              className="btn btn-sm shadow-sm rounded btn-primary-new d-flex align-items-center "
              style={{ width: "fit-content" }}
              onClick={handleSubmit}
            >
              <FaStream size={20} />
              <div className="p-1 d-flex justify-content-end">Submit</div>
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Failed!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="msg-body">
            <div>
              <FcCancel size={50} />
            </div>
            <div>
              <span className="fw-bold">Reason: </span>
              {cur_error}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              varient="primary"
              className="btn btn-primary-new"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Order Sucessful!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="msg-body">
            <div>
              <FcOk size={50} />
              <p>Order Successfully Placed</p>
            </div>
            <div>
              <p className="fw-bold">Order ID# </p>
              <span>{cur_order.id}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              varient="primary"
              className="btn btn-primary-new"
              onClick={handleClose2}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
}

export default CheckoutSidebar;

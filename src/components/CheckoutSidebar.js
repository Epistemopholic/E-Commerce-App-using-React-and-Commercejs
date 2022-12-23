import React, { useState } from "react";
import Button from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { FaStream } from "react-icons/fa";
import { commerce } from "../lib/commerce";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function CheckoutSidebar({ cartToken }) {
  const [creditCard, setCC] = useState("");
  const [sCode, setSC] = useState("");
  const [expMon, setEM] = useState("");

  const checkoutForm = () => {
    commerce.checkout
      .capture(cartToken.id, {
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "02",
            expiry_year: "24",
            cvc: "123",
            postal_zip_code: "94107",
          },
        },
      })
      .then((order) => {
        console.log(order);
      })
      .catch((error) => {
        // Something went wrong during capture:
        console.log(error);
      });
    alert("done");
  };
  return (
    <Container className="py-2">
      <p className="bg-primary-new">test gateway</p>
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
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="fw-bold">CVC Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="CVC"
              value={sCode}
              onChange={(e) => {
                setSC(e.target.value);
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="fw-bold">Expiry Month/Year</Form.Label>
            <Form.Control
              type="date"
              placeholder="Expiry Month/Year"
              value={expMon}
              onChange={(e) => {
                setEM(e.target.value);
              }}
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
          >
            <FaStream size={20} />
            <div
              className="p-1 d-flex justify-content-end"
              onClick={checkoutForm}
            >
              Submit
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutSidebar;

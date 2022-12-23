import React from "react";
import "./CheckoutCard.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckoutForm from "./CheckoutForm";
import CheckoutSidebar from "./CheckoutSidebar";
function CheckoutCard({ cartToken }) {
  return (
    <>
      <Container fluid className="px-5 py-4">
        <Row xs={1} md={2}>
          <Col className="col-md-8">
            <Card className="shadow-lg border-0">
              <CheckoutForm cartToken={cartToken} />
            </Card>
          </Col>
          <Col className="col-md-4 sidebar">
            <Card className="shadow-lg border-0">
              <CheckoutSidebar cartToken={cartToken} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutCard;

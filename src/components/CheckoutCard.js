import React, { useState } from "react";
import "./CheckoutCard.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckoutForm from "./CheckoutForm";
import CheckoutSidebar from "./CheckoutSidebar";
function CheckoutCard({ cartToken }) {
  const [data, setData] = useState({});
  const getCheckoutData = (
    country,
    province,
    shipping,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    postalCode
  ) => {
    setData({
      country: country,
      province: province,
      shipping: shipping,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      postalCode: postalCode,
    });
  };

  return (
    <>
      <Container fluid className="px-5 py-4">
        <Row xs={1} md={2}>
          <Col className="col-md-8">
            <Card className="shadow-lg border-0">
              <CheckoutForm
                cartToken={cartToken}
                getCheckoutData={getCheckoutData}
              />
            </Card>
          </Col>
          <Col className="col-md-4 sidebar">
            <Row className="gap-2">
              <Card className="shadow-lg border-0">
                <CheckoutSidebar cartToken={cartToken} data={data} />
              </Card>
              <Card className="shadow-lg border-0"></Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutCard;

import React from "react";
import "./CheckoutCard.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckoutForm from "./CheckoutForm";
function CheckoutCard({ cartToken }) {
  return (
    <>
      <Container className="p-5">
        <Row>
          <Col>
            <Card className="shadow-lg border-0">
              <CheckoutForm cartToken={cartToken} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CheckoutCard;
/*
import CheckoutSidebar from "./CheckoutSidebar";


const [data, setData] = useState({});
  const [info, setValue] = useState("");
  const getInfo = (value) => {
    setValue(value);
  };
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

  
<Col className="col-md-4 sidebar">
            <Row className="gap-2">
              <Card className="shadow-lg border-0">
                <CheckoutSidebar
                  cartToken={cartToken}
                  data={data}
                  info={info}
                />
              </Card>
              <Card className="shadow-lg border-0"></Card>
            </Row>
          </Col>

          getCheckoutData={getCheckoutData}
                getInfo={getInfo}
*/

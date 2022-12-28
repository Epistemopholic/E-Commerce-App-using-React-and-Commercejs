import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";
import { MdPayment } from "react-icons/md";
import Button from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import Container from "react-bootstrap/Container";
import "./CheckoutForm.css";
import SpinnerButton from "./Spinner";
function CheckoutForm({ cartToken }) {
  const [showLoading, setShowLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [shipping, setShipping] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [validated, setValidated] = useState(false);
  const [creditCard, setCC] = useState("");
  const [sCode, setSC] = useState("");
  const [expMon, setMonth] = useState("");
  const [expYr, setYear] = useState("");

  const [cur_error, setError] = useState("");
  const [cur_order, setOrder] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const checkoutForm = async () => {
    setShowLoading(true);
    await commerce.checkout
      .capture(cartToken.id, {
        customer: {
          firstname: firstName,
          lastname: lastName,
          email: email,
        },
        shipping: {
          name: firstName,
          street: address,
          town_city: city,
          county_state: province,
          postal_zip_code: postalCode,
          country: country,
        },
        fulfillment: {
          shipping_method: shipping,
        },
        billing: {
          name: firstName,
          street: address,
          town_city: city,
          county_state: province,
          postal_zip_code: postalCode,
          country: country,
        },
        payment: {
          gateway: "test_gateway",
          card: {
            number: creditCard,
            expiry_month: expMon,
            expiry_year: expYr,
            cvc: sCode,
            postal_zip_code: postalCode,
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
    setShowLoading(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
    }
    if (validated === true) checkoutForm();
  };
  const checkoutCountry = async () => {
    await commerce.services
      .localeListShippingCountries(cartToken.id)
      .then((c) => {
        setCountries(c.countries);
        setCountry(Object.keys(c.countries)[1]);
      });
  };

  const c_countries = Object.entries(countries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const checkoutProvince = async (countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        cartToken.id,
        countryCode
      );
    setProvinces(subdivisions);
    setProvince(Object.keys(subdivisions)[5]);
  };

  const c_provinces = Object.entries(provinces).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const checkoutShipping = async (country, region) => {
    await commerce.checkout
      .getShippingOptions(cartToken.id, {
        country,
        region,
      })
      .then((options) => {
        setShippings(options);
        setShipping(options[1].id);
      });
  };

  const c_options = shippings.map((s) => ({
    id: s.id,
    label: `${s.description} - (${s.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    checkoutCountry(cartToken);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (country) checkoutProvince(country);
    // eslint-disable-next-line
  }, [country]);

  useEffect(() => {
    if (country) checkoutShipping(country);
    // eslint-disable-next-line
  }, [country]);
  return (
    <>
      <div className="m-2 px-2 pt-2 fs-3 fw-500">
        Enter Your Details
        <hr></hr>
      </div>
      <Form
        className="mx-2 py-2 px-2"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Form.Group>
            <Form.Label className="fw-bold">Name</Form.Label>
          </Form.Group>
          <Col>
            <Form.Group controlId="validationCustom01">
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="validationCustom02">
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col>
            <Form.Group controlId="validationCustom03">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="validationCustom04">
              <Form.Label className="fw-bold">Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="col-md-8">
            <Form.Group controlId="validationCustom05">
              <Form.Label className="fw-bold">Shipping Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Shipping Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="validationCustom06">
              <Form.Label className="fw-bold">Postal Code</Form.Label>
              <Form.Control
                type="number"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="validationCustom07">
              <Form.Label className="fw-bold">City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="validationCustom08">
              <Form.Label className="fw-bold">Province</Form.Label>
              <Form.Select
                type="text"
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                multiple={false}
                required
              >
                {c_provinces.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="validationCustom09">
              <Form.Label className="fw-bold">Country</Form.Label>
              <Form.Select
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                multiple={false}
                required
              >
                {c_countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col className="col-md-6">
            <Form.Group controlId="validationCustom10">
              <Form.Label className="fw-bold">Shipping Method</Form.Label>
              <Form.Select
                value={shipping}
                onChange={(e) => {
                  setShipping(e.target.value);
                }}
                multiple={false}
                required
              >
                {c_options.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-md-6">
            <Form.Group controlId="validationCustom11">
              <Form.Label className="fw-bold">Payment Method</Form.Label>
              <Form.Select
                value={payment}
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                required
                disabled
              >
                <option>Credit Card</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <Row className=" d-flex justify-content-center">
          <Container className="py-2 col-md-6">
            <p className="bg-primary-new">test gateway: 4242424242424242</p>
            <Row>
              <Col>
                <Form.Group controlId="validationCustom12">
                  <Form.Label className="fw-bold">
                    Credit Card Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Credit Card Number"
                    value={creditCard}
                    onChange={(e) => {
                      setCC(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-2">
              <Col>
                <Form.Group controlId="validationCustom13">
                  <Form.Label className="fw-bold">Expiry Month</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Expiry Month"
                    value={expMon}
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="validationCustom14">
                  <Form.Label className="fw-bold">Expiry Year</Form.Label>
                  <Form.Control
                    type="year"
                    placeholder="Expiry Year"
                    value={expYr}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="col-md-6 pb-2">
                <Form.Group controlId="validationCustom15">
                  <Form.Label className="fw-bold">CVC Code</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="CVC"
                    value={sCode}
                    onChange={(e) => {
                      setSC(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Row>
        <Row className="py-2">
          <Col className="d-flex justify-content-center">
            <Button
              type="submit"
              className="btn btn-sm shadow-sm rounded btn-primary-new d-flex align-items-center "
              style={{ width: "fit-content" }}
              onClick={handleSubmit}
            >
              {showLoading ? <SpinnerButton /> : <MdPayment size={20} />}
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
    </>
  );
}

export default CheckoutForm;

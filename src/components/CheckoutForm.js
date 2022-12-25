import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";
import { FaStream } from "react-icons/fa";
import Button from "react-bootstrap/Form";

function CheckoutForm({ cartToken, getCheckoutData, getInfo }) {
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
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      getCheckoutData(
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
      );
      getInfo(false);
    }
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
    getInfo(true);
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
      <Form className="mx-2 py-2 px-2" noValidate validated={validated}>
        <Row>
          <Form.Group>
            <Form.Label className="fw-bold">Name</Form.Label>
          </Form.Group>
          <Col>
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
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
        <Row className="py-2">
          <Col className="d-flex justify-content-center">
            <Form.Group>
              <Button
                type="submit"
                className="btn btn-sm shadow-sm rounded btn-primary-new d-flex align-items-center "
                style={{ width: "fit-content" }}
                onClick={handleSubmit}
              >
                <FaStream size={20} />
                <div className="p-1 d-flex justify-content-end">
                  Submit Details
                </div>
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CheckoutForm;

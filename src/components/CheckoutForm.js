import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

function CheckoutForm({ cartToken }) {
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
        setShipping(options[0].id);
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
      <Form className="mx-2 py-2 px-2">
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
                required={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="py-2">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Province</Form.Label>
              <Form.Select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                multiple={false}
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
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                multiple={false}
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
              >
                <option>Credit Card</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CheckoutForm;

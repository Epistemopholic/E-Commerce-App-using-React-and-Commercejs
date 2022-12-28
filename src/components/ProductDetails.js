import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { AiOutlineShopping } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";
import "./ProductDetails.css";
import Form from "react-bootstrap/Form";
import SpinnerButton from "./Spinner";

function ProductDetails({ singleProduct, onAddToCart, show }) {
  const clickHandler = () => {
    onAddToCart(singleProduct.id, count, vG, varient);
  };
  let [count, SetCount] = useState(1);
  let incButton = () => {
    count++;
    SetCount(count);
    if (count > 5) {
      count = 5;
      SetCount(count);
    }
  };
  let decButton = () => {
    count -= 1;
    SetCount(count);
    if (count < 1) {
      count = 1;
      SetCount(count);
    }
  };
  let changeHandler = (event) => {
    SetCount(event.target.value);
  };
  const [varient, setVarient] = useState("");
  const [vG, setVG] = useState("");

  return (
    <>
      <Container fluid>
        <Row s={1} className="m-4">
          <Col className="col-md-6 d-flex justify-content-center">
            <img
              src={singleProduct.image.url}
              width="300px"
              alt="Product"
              className="rounded my-3"
            />
          </Col>
          <Col className="col-md-6 d-flex justify-content-start">
            <div>
              <h3>{singleProduct.name}</h3>
              <p className="mb-0">
                <span className="fw-bold">Categories:</span>{" "}
                {singleProduct.categories[0].name}
              </p>
              <Badge
                pill
                bg="primary-new"
                className="rounded-pill my-3 shadow-sm text-black"
              >
                {singleProduct.price.formatted_with_symbol}/-
              </Badge>
              <p
                className="p-2 new rounded"
                dangerouslySetInnerHTML={{ __html: singleProduct.description }}
                style={{ background: "whitesmoke" }}
              />
              <p className="fw-bold">Quantity:</p>
              <div className="quantity-control">
                <Button
                  onClick={decButton}
                  className="quantity-btn btn shadow-lg rounded btn-primary-new"
                >
                  -
                </Button>
                <input
                  type="number"
                  onChange={changeHandler}
                  value={count}
                  className="quantity-input"
                  min={1}
                  max={5}
                  disabled={true}
                ></input>
                <Button
                  onClick={incButton}
                  className="quantity-btn btn shadow-lg rounded btn-primary-new"
                >
                  +
                </Button>
              </div>
              <Row>
                {singleProduct.variant_groups.map((data) => (
                  <Col key={data.id}>
                    <Form.Group>
                      <Form.Label className="fw-bold">{data.name}</Form.Label>
                      <Form.Select
                        value={varient}
                        onChange={(e) => {
                          setVarient(e.target.value);
                          setVG(data.id);
                        }}
                        multiple={false}
                      >
                        {data.options.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
              <Col className="pt-4">
                <Button
                  className="btn btn-sm shadow-sm rounded btn-primary-new d-flex align-items-center "
                  style={{ width: "fit-content" }}
                  onClick={clickHandler}
                >
                  {show ? <SpinnerButton /> : <AiOutlineShopping size={20} />}
                  <span className="p-1">Add to Cart</span>
                </Button>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetails;
/*
<Row className="d-flex align-content-center">
  <Col className="d-flex justify-content-evenly p-2">
    <img src="{singleProduct.assets[0].url}" width="100px" alt="Product" />
  </Col>
  <Col className="d-flex justify-content-evenly">
<<<<<<< HEAD
    <img src="{singleProduct.assets[2].url}" width="100px" alt="Product" />
=======
    <img src="{singleProduct.assets[1].url}" width="100px" alt="Product" />
>>>>>>> d081ebb30e83e31a0ac9f124f9911dab12efb15a
  </Col>
</Row>;
*/
